# Upgrading PostgreSQL

Immediately after upgrading PostgreSQL to a newer major version, the `pg-path` for all pgBackRest configurations must be set to the new database location and the `stanza-upgrade` run on the repository host. If the database is offline use the `--no-online` option.

::: warning NOTE:
The following instructions are not meant to be a comprehensive guide for upgrading PostgreSQL, rather they outline the general process for upgrading a primary and standby with the intent of demonstrating the steps required to reconfigure pgBackRest. It is recommended that a backup be taken prior to upgrading.
:::

```bash
# pg-primary ⇒ Stop old cluster and install new PostgreSQL version
sudo pg_ctlcluster 9.4 demo stop
sudo apt-get install postgresql-9.5
```

Stop the old cluster on the standby since it will be restored from the newly upgraded cluster.

```bash
# pg-standby ⇒ Stop old cluster and install new PostgreSQL version
sudo pg_ctlcluster 9.4 demo stop
sudo apt-get install postgresql-9.5
```

Create the new cluster and perform upgrade.

```bash
# pg-primary ⇒ Create new cluster and perform the upgrade
sudo -u postgres /usr/lib/postgresql/9.5/bin/initdb \
       -D /var/lib/postgresql/9.5/demo -k -A peer
sudo pg_createcluster 9.5 demo
sudo -u postgres sh -c 'cd /var/lib/postgresql && \
       /usr/lib/postgresql/9.5/bin/pg_upgrade \
       --old-bindir=/usr/lib/postgresql/9.4/bin \
       --new-bindir=/usr/lib/postgresql/9.5/bin \
       --old-datadir=/var/lib/postgresql/9.4/demo \
       --new-datadir=/var/lib/postgresql/9.5/demo \
       --old-options=" -c config_file=/etc/postgresql/9.4/demo/postgresql.conf" \
       --new-options=" -c config_file=/etc/postgresql/9.5/demo/postgresql.conf"'
       [filtered 68 lines of output]
Creating script to delete old cluster                       ok
Upgrade Complete
----------------
Optimizer statistics are not transferred by pg_upgrade so,
       [filtered 4 lines of output]
```

Configure the new cluster settings and port.

```ini
# pg-primary:/etc/postgresql/9.5/demo/postgresql.conf ⇒ Configure PostgreSQL
archive_command = 'pgbackrest --stanza=demo archive-push %p'
archive_mode = on
listen_addresses = '*'
log_line_prefix = ''
max_wal_senders = 3
port = 5432
wal_level = hot_standby
```

Update the pgBackRest configuration on all systems to point to the new cluster.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade the pg1-path
[demo]
pg1-path=/var/lib/postgresql/9.5/demo

[global]
archive-async=y
log-level-file=detail
repo1-host=repository
spool-path=/var/spool/pgbackrest

[global:archive-get]
process-max=2

[global:archive-push]
process-max=2
```

```ini
# pg-standby:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade the pg-path
[demo]
pg1-path=/var/lib/postgresql/9.5/demo
recovery-option=standby_mode=on
recovery-option=primary_conninfo=host=172.17.0.3 port=5432 user=replicator

[global]
archive-async=y
log-level-file=detail
repo1-host=repository
spool-path=/var/spool/pgbackrest

[global:archive-get]
process-max=2

[global:archive-push]
process-max=2
```

```ini
# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade pg1-path and pg2-path, disable backup from standby
[demo]
pg1-host=pg-primary
pg1-host-user=postgres
pg1-path=/var/lib/postgresql/9.5/demo
pg2-host=pg-standby
pg2-host-user=postgres
pg2-path=/var/lib/postgresql/9.5/demo

[global]
backup-standby=n
process-max=3
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
```

```bash
# pg-primary ⇒ Copy hba configuration
sudo cp /etc/postgresql/9.4/demo/pg_hba.conf \
       /etc/postgresql/9.5/demo/pg_hba.conf
```

Before starting the new cluster, the stanza-upgrade command must be run on the server where the pgBackRest repository is located.

```bash
# repository ⇒ Upgrade the stanza
sudo -u pgbackrest pgbackrest --stanza=demo --no-online \
       --log-level-console=info stanza-upgrade
P00   INFO: stanza-upgrade command begin 2.02: --no-backup-standby --log-level-console=info --log-level-stderr=off --no-log-timestamp --no-online --pg1-host=pg-primary --pg2-host=pg-standby --pg1-host-user=postgres --pg2-host-user=postgres --pg1-path=/var/lib/postgresql/9.5/demo --pg2-path=/var/lib/postgresql/9.5/demo --repo1-path=/var/lib/pgbackrest --stanza=demo
P00   INFO: stanza-upgrade command end: completed successfully
```

Start the new cluster and confirm it is successfully installed.

```bash
# pg-primary ⇒ Start new cluster
sudo pg_ctlcluster 9.5 demo start
```

Test configuration using the check command.

```bash
# pg-primary ⇒ Check configuration
sudo -u postgres pg_lsclusters
Ver Cluster Port Status Owner    Data directory               Log file
9.4 demo    5432 down   postgres /var/lib/postgresql/9.4/demo /var/log/postgresql/postgresql-9.4-demo.log
9.5 demo    5432 online postgres /var/lib/postgresql/9.5/demo /var/log/postgresql/postgresql-9.5-demo.log
sudo -u postgres pgbackrest --stanza=demo check
```

Remove the old cluster.

```bash
# pg-primary ⇒ Remove old cluster
sudo pg_dropcluster 9.4 demo
```

Install the new PostgreSQL binaries on the standby and create the cluster.

```bash
# pg-standby ⇒ Remove old cluster and create the new cluster
sudo pg_dropcluster 9.4 demo
sudo pg_createcluster 9.5 demo
```

Run the check on the repository host. The warning regarding the standby being down is expected since the standby cluster is down. Running this command demonstrates that the repository server is aware of the standby and is configured properly for the primary server.

```bash
# repository ⇒ Check configuration
sudo -u pgbackrest pgbackrest --stanza=demo check
P00   WARN: [056]: raised from remote process on 'pg-standby': could not connect to server: No such file or directory
            	Is the server running locally and accepting
            	connections on Unix domain socket "/var/run/postgresql/.s.PGSQL.5432"?
```

Run a full backup on the new cluster and then restore the standby from the backup. The backup type will automatically be changed to full if incr or diff is requested.

```bash
# repository ⇒ Run a full backup
sudo -u pgbackrest pgbackrest --stanza=demo --type=full backup
pg-standby ⇒ Restore the demo standby cluster
sudo -u postgres pgbackrest --stanza=demo --delta restore
```

```ini
# pg-standby:/etc/postgresql/9.5/demo/postgresql.conf ⇒ Configure PostgreSQL
hot_standby = on
```

```bash
# pg-standby ⇒ Start PostgreSQL and check the pgBackRest configuration
sudo pg_ctlcluster 9.5 demo start
sudo -u postgres pgbackrest --stanza=demo check
```

Backup from standby can be enabled now that the standby is restored.

```ini
# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Reenable backup from standby
[demo]
pg1-host=pg-primary
pg1-host-user=postgres
pg1-path=/var/lib/postgresql/9.5/demo
pg2-host=pg-standby
pg2-host-user=postgres
pg2-path=/var/lib/postgresql/9.5/demo

[global]
backup-standby=y
process-max=3
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
```