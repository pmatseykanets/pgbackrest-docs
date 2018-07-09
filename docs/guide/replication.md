# Replication

Replication allows multiple copies of a PostgreSQL cluster (called standbys) to be created from a single primary. The standbys are useful for balancing reads and to provide redundancy in case the primary host fails.

## Installation

A new host named pg-standby is created to run the standby.

pgBackRest is written in Perl which is included with Debian/Ubuntu by default. Some additional modules must also be installed but they are available as standard packages.

```bash
pg-standby ⇒ Install required Perl packages
sudo apt-get update
sudo apt-get install libdbd-pg-perl libio-socket-ssl-perl libxml-libxml-perl
```

Debian/Ubuntu packages for pgBackRest are available at [apt.postgresql.org](https://www.postgresql.org/download/linux/ubuntu/). If they are not provided for your distribution/version it is easy to download the source and install manually.

```bash
# pg-standby ⇒ Download version 2.02 of pgBackRest
sudo wget -q -O - \
       https://github.com/pgbackrest/pgbackrest/archive/release/2.02.tar.gz | \
       sudo tar zx -C /root
pg-standby ⇒ Install pgBackRest
sudo cp -r /root/pgbackrest-release-2.02/lib/pgBackRest \
       /usr/share/perl5
sudo find /usr/share/perl5/pgBackRest -type f -exec chmod 644 {} +
sudo find /usr/share/perl5/pgBackRest -type d -exec chmod 755 {} +
sudo mkdir -m 770 /var/log/pgbackrest
sudo chown postgres:postgres /var/log/pgbackrest
sudo mkdir /etc/pgbackrest
sudo mkdir /etc/pgbackrest/conf.d
sudo touch /etc/pgbackrest/pgbackrest.conf
sudo chmod 640 /etc/pgbackrest/pgbackrest.conf
sudo chown postgres:postgres /etc/pgbackrest/pgbackrest.conf
```

pgBackRest requires a companion C library that enhances performance and enables the `checksum-page` option and encryption. Pre-built packages are generally a better option than building the C library manually but the steps required are given below for completeness. Depending on the distribution a number of packages may be required which will not be enumerated here.

```bash
# pg-standby ⇒ Build and Install C Library
sudo sh -c 'cd /root/pgbackrest-release-2.02/libc && \
       perl Makefile.PL INSTALLMAN1DIR=none INSTALLMAN3DIR=none'
sudo make -C /root/pgbackrest-release-2.02/libc test
sudo make -C /root/pgbackrest-release-2.02/libc install
```

Although most of pgBackRest is written in Perl, the main executable is written in C. This allows certain time-critical commands (like async archive-push) to run more quickly.

```bash
# pg-standby ⇒ Build and Install Binary
sudo make -C /root/pgbackrest-release-2.02/src
sudo make -C /root/pgbackrest-release-2.02/src install
```

## Setup Trusted SSH

pgBackRest requires trusted (no password) SSH to enable communication between the hosts.

```bash
# pg-standby ⇒ Create pg-standby host key pair
sudo -u postgres mkdir -m 750 -p /home/postgres/.ssh
sudo -u postgres ssh-keygen -f /home/postgres/.ssh/id_rsa \
       -t rsa -b 4096 -N ""
```

Exchange keys between repository and pg-standby.

```bash
# repository ⇒ Copy pg-standby public key to repository
sudo ssh root@pg-standby cat /home/postgres/.ssh/id_rsa.pub | \
       sudo -u pgbackrest tee -a /home/pgbackrest/.ssh/authorized_keys
```

```bash
# pg-standby ⇒ Copy repository public key to pg-standby
sudo ssh root@repository cat /home/pgbackrest/.ssh/id_rsa.pub | \
       sudo -u postgres tee -a /home/postgres/.ssh/authorized_keys
```

Test that connections can be made from repository to pg-standby and vice versa.

```bash
# repository ⇒ Test connection from repository to pg-standby
sudo -u pgbackrest ssh postgres@pg-standby
```

```bash
# pg-standby ⇒ Test connection from pg-standby to repository
sudo -u postgres ssh pgbackrest@repository
```

## Hot Standby

A hot standby performs replication using the WAL archive and allows read-only queries.
pgBackRest configuration is very similar to pg-primary except that the standby_mode setting will be enabled to keep the cluster in recovery mode when the end of the WAL stream has been reached.

```ini
# pg-standby:/etc/pgbackrest/pgbackrest.conf ⇒ Configure pgBackRest on the standby
[demo]
pg1-path=/var/lib/postgresql/9.4/demo
recovery-option=standby_mode=on

[global]
log-level-file=detail
repo1-host=repository
```

The demo cluster must be created (even though it will be overwritten restore) in order to create the PostgreSQL configuration files.

```bash
pg-standby ⇒ Create demo cluster
sudo pg_createcluster 9.4 demo
```

Now the standby can be created with the restore command.

```bash
# pg-standby ⇒ Restore the demo standby cluster
sudo -u postgres pgbackrest --stanza=demo --delta restore
sudo -u postgres cat /var/lib/postgresql/9.4/demo/recovery.conf
standby_mode = 'on'
restore_command = 'pgbackrest --stanza=demo archive-get %f "%p"'
```

Note that the standby_mode setting has been written into the `recovery.conf` file. Configuring recovery settings in pgBackRest means that the `recovery.conf` file does not need to be stored elsewhere since it will be properly recreated with each restore. The `--type=preserve` option can be used with the restore to leave the existing `recovery.conf` file in place if that behavior is preferred.

The `hot_standby` setting must be enabled before starting PostgreSQL to allow read-only connections on pg-standby. Otherwise, connection attempts will be refused.

```ini
# pg-standby:/etc/postgresql/9.4/demo/postgresql.conf ⇒ Enable hot_standby and configure logging
hot_standby = on
log_filename = 'postgresql.log'
log_line_prefix = ''
```

```bash
# pg-standby ⇒ Start PostgreSQL
sudo pg_ctlcluster 9.4 demo start
```

The PostgreSQL log gives valuable information about the recovery. Note especially that the cluster has entered standby mode and is ready to accept read-only connections.

```bash
# pg-standby ⇒ Examine the PostgreSQL log output for log messages indicating success
sudo -u postgres cat /var/log/postgresql/postgresql-9.4-demo.log
LOG:  could not bind IPv6 socket: Cannot assign requested address
HINT:  Is another postmaster already running on port 5432? If not, wait a few seconds and retry.
LOG:  database system was interrupted; last known up at 2018-05-06 15:20:15 UTC
LOG:  entering standby mode
LOG:  restored log file "00000008.history" from archive
LOG:  incomplete startup packet
LOG:  restored log file "000000080000000000000023" from archive
LOG:  redo starts at 0/23000028
LOG:  consistent recovery state reached at 0/230000F0
LOG:  database system is ready to accept read only connections
```

An easy way to test that replication is properly configured is to create a table on pg-primary.

```bash
# pg-primary ⇒ Create a new table on the primary
sudo -u postgres psql -c " \
       begin; \
       create table replicated_table (message text); \
       insert into replicated_table values ('Important Data'); \
       commit; \
       select * from replicated_table";
    message
----------------
 Important Data
(1 row)
```

And then query the same table on pg-standby.

```bash
# pg-standby ⇒ Query new table on the standby
sudo -u postgres psql -c "select * from replicated_table;"
ERROR:  relation "replicated_table" does not exist
LINE 1: select * from replicated_table;
                      ^
```

So, what went wrong? Since PostgreSQL is pulling WAL segments from the archive to perform replication, changes won't be seen on the standby until the WAL segment that contains those changes is pushed from pg-primary.

This can be done manually by calling `pg_switch_xlog()` which pushes the current WAL segment to the archive (a new WAL segment is created to contain further changes).

```bash
# pg-primary ⇒ Call pg_switch_xlog()
sudo -u postgres psql -c "select *, current_timestamp from pg_switch_xlog()";
 pg_switch_xlog |              now              
----------------+-------------------------------
 0/24019A60     | 2018-05-06 15:20:56.974643+00
(1 row)
```

Now after a short delay the table will appear on pg-standby.

```bash
# pg-standby ⇒ Now the new table exists on the standby (may require a few retries)
sudo -u postgres psql -c " \
       select *, current_timestamp from replicated_table"
    message     |              now              
----------------+-------------------------------
 Important Data | 2018-05-06 15:20:59.232628+00
(1 row)
```

Check the standby configuration for access to the repository.

```bash
# pg-standby ⇒ Check the configuration
sudo -u postgres pgbackrest --stanza=demo --log-level-console=info check
P00   INFO: check command begin 2.02: --log-level-console=info --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-host=repository --stanza=demo
P00   INFO: switch xlog cannot be performed on the standby, all other checks passed successfully
P00   INFO: check command end: completed successfully
```

## Streaming Replication

Instead of relying solely on the WAL archive, streaming replication makes a direct connection to the primary and applies changes as soon as they are made on the primary. This results in much less lag between the primary and standby.

Streaming replication requires a user with the replication privilege.

```bash
# pg-primary ⇒ Create replication user
sudo -u postgres psql -c " \
       create user replicator password 'jw8s0F4' replication";
CREATE ROLE
```

The `pg_hba.conf` file must be updated to allow the standby to connect as the replication user. Be sure to replace the IP address below with the actual IP address of your pg-primary. A reload will be required after modifying the `pg_hba.conf` file.

```bash
# pg-primary ⇒ Create pg_hba.conf entry for replication user
sudo -u postgres sh -c 'echo \
       "host    replication     replicator      172.17.0.5/32           md5" \
       >> /etc/postgresql/9.4/demo/pg_hba.conf'
sudo pg_ctlcluster 9.4 demo reload
```

The standby needs to know how to contact the primary so the `primary_conninfo` setting will be configured in pgBackRest.

```ini
# pg-standby:/etc/pgbackrest/pgbackrest.conf ⇒ Set primary_conninfo
[demo]
pg1-path=/var/lib/postgresql/9.4/demo
recovery-option=standby_mode=on
recovery-option=primary_conninfo=host=172.17.0.3 port=5432 user=replicator

[global]
log-level-file=detail
repo1-host=repository
```

It is possible to configure a password in the primary_conninfo setting but using a `.pgpass` file is more flexible and secure.

```bash
# pg-standby ⇒ Configure the replication password in the .pgpass file.
sudo -u postgres sh -c 'echo \
       "172.17.0.3:*:replication:replicator:jw8s0F4" \
       >> /home/postgres/.pgpass'
sudo -u postgres chmod 600 /home/postgres/.pgpass
```

Now the standby can be created with the restore command.

```bash
# pg-standby ⇒ Stop PostgreSQL and restore the demo standby cluster
sudo pg_ctlcluster 9.4 demo stop
sudo -u postgres pgbackrest --stanza=demo --delta restore
sudo -u postgres cat /var/lib/postgresql/9.4/demo/recovery.conf
primary_conninfo = 'host=172.17.0.3 port=5432 user=replicator'
standby_mode = 'on'
restore_command = 'pgbackrest --stanza=demo archive-get %f "%p"'
```

```bash
# pg-standby ⇒ Start PostgreSQL
sudo pg_ctlcluster 9.4 demo start
```

The PostgreSQL log will confirm that streaming replication has started.

```bash
# pg-standby ⇒ Examine the PostgreSQL log output for log messages indicating success
sudo -u postgres cat /var/log/postgresql/postgresql-9.4-demo.log
       [filtered 9 lines of output]
LOG:  database system is ready to accept read only connections
LOG:  restored log file "000000080000000000000024" from archive
LOG:  started streaming WAL from primary at 0/25000000 on timeline 8
```

Now when a table is created on pg-primary it will appear on pg-standby quickly and without the need to call `pg_switch_xlog()`.

```bash
# pg-primary ⇒ Create a new table on the primary
sudo -u postgres psql -c " \
       begin; \
       create table stream_table (message text); \
       insert into stream_table values ('Important Data'); \
       commit; \
       select *, current_timestamp from stream_table";
    message     |             now
----------------+------------------------------
 Important Data | 2018-05-06 15:21:11.41956+00
(1 row)
```

```bash
# pg-standby ⇒ Query table on the standby
sudo -u postgres psql -c " \
       select *, current_timestamp from stream_table"
    message     |              now
----------------+-------------------------------
 Important Data | 2018-05-06 15:21:11.711161+00
(1 row)
```
