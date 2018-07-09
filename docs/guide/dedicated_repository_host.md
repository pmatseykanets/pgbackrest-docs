# Dedicated Repository Host

The configuration described in Quickstart is suitable for simple installations but for enterprise configurations it is more typical to have a dedicated repository host where the backups and WAL archive files are stored. This separates the backups and WAL archive from the database server so database host failures have less impact. It is still a good idea to employ traditional backup software to backup the repository host.

## Installation

A new host named repository is created to store the cluster backups.
The pgbackrest user is created to own the pgBackRest repository. Any user can own the repository but it is best not to use postgres (if it exists) to avoid confusion.

```bash
# repository ⇒ Create pgbackrest
sudo adduser --disabled-password --gecos "" pgbackrest
```

pgBackRest is written in Perl which is included with Debian/Ubuntu by default. Some additional modules must also be installed but they are available as standard packages.

```bash
# repository ⇒ Install required Perl packages
sudo apt-get update
sudo apt-get install libdbd-pg-perl libio-socket-ssl-perl libxml-libxml-perl
```

Debian/Ubuntu packages for pgBackRest are available at [apt.postgresql.org](https://www.postgresql.org/download/linux/ubuntu/). If they are not provided for your distribution/version it is easy to download the source and install manually.

```bash
# repository ⇒ Download version 2.02 of pgBackRest
sudo wget -q -O - \
       https://github.com/pgbackrest/pgbackrest/archive/release/2.02.tar.gz | \
       sudo tar zx -C /root
```

```bash
# repository ⇒ Install pgBackRest
sudo cp -r /root/pgbackrest-release-2.02/lib/pgBackRest \
       /usr/share/perl5
sudo find /usr/share/perl5/pgBackRest -type f -exec chmod 644 {} +
sudo find /usr/share/perl5/pgBackRest -type d -exec chmod 755 {} +
sudo mkdir -m 770 /var/log/pgbackrest
sudo chown pgbackrest:pgbackrest /var/log/pgbackrest
sudo mkdir /etc/pgbackrest
sudo mkdir /etc/pgbackrest/conf.d
sudo touch /etc/pgbackrest/pgbackrest.conf
sudo chmod 640 /etc/pgbackrest/pgbackrest.conf
sudo chown pgbackrest:pgbackrest /etc/pgbackrest/pgbackrest.conf
```

pgBackRest requires a companion C library that enhances performance and enables the `checksum-page` option and encryption. Pre-built packages are generally a better option than building the C library manually but the steps required are given below for completeness. Depending on the distribution a number of packages may be required which will not be enumerated here.

```bash
# repository ⇒ Build and Install C Library
sudo sh -c 'cd /root/pgbackrest-release-2.02/libc && \
       perl Makefile.PL INSTALLMAN1DIR=none INSTALLMAN3DIR=none'
sudo make -C /root/pgbackrest-release-2.02/libc test
sudo make -C /root/pgbackrest-release-2.02/libc install
```

Although most of pgBackRest is written in Perl, the main executable is written in C. This allows certain time-critical commands (like async archive-push) to run more quickly.

```bash
# repository ⇒ Build and Install Binary
sudo make -C /root/pgbackrest-release-2.02/src
sudo make -C /root/pgbackrest-release-2.02/src install
```

```bash
# repository ⇒ Create the pgBackRest repository
sudo mkdir -p /var/lib/pgbackrest
sudo chmod 750 /var/lib/pgbackrest
sudo chown pgbackrest:pgbackrest /var/lib/pgbackrest
```

## Setup Trusted SSH

pgBackRest requires trusted (no password) SSH to enable communication between the hosts.

```bash
# repository ⇒ Create repository host key pair
sudo -u pgbackrest mkdir -m 750 /home/pgbackrest/.ssh
sudo -u pgbackrest ssh-keygen -f /home/pgbackrest/.ssh/id_rsa \
       -t rsa -b 4096 -N ""
```

```bash
# pg-primary ⇒ Create pg-primary host key pair
sudo -u postgres mkdir -m 750 -p /home/postgres/.ssh
sudo -u postgres ssh-keygen -f /home/postgres/.ssh/id_rsa \
       -t rsa -b 4096 -N ""
```

Exchange keys between repository and pg-primary.

```bash
# repository ⇒ Copy pg-primary public key to repository
sudo ssh root@pg-primary cat /home/postgres/.ssh/id_rsa.pub | \
       sudo -u pgbackrest tee -a /home/pgbackrest/.ssh/authorized_keys
```

```bash
# pg-primary ⇒ Copy repository public key to pg-primary
sudo ssh root@repository cat /home/pgbackrest/.ssh/id_rsa.pub | \
       sudo -u postgres tee -a /home/postgres/.ssh/authorized_keys
```

Test that connections can be made from repository to pg-primary and vice versa.

```bash
# repository ⇒ Test connection from repository to pg-primary
sudo -u pgbackrest ssh postgres@pg-primary
pg-primary ⇒ Test connection from pg-primary to repository
sudo -u postgres ssh pgbackrest@repository
```

## Configuration

The repository host must be configured with the pg-primary host/user and database path. The primary will be configured as db1 to allow a standby to be added later.

```ini
# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Configure pg1-host/pg1-host-user and pg1-path
[demo]
pg1-host=pg-primary
pg1-host-user=postgres
pg1-path=/var/lib/postgresql/9.4/demo

[global]
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
```

The database host must be configured with the repository host/user. The default for the repo1-host-user option is pgbackrest. If the postgres user does restores on the repository host it is best not to also allow the postgres user to perform backups. However, the postgres user can read the repository directly if it is in the same group as the pgbackrest user.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure repo1-host/repo1-host-user
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
log-level-file=detail
repo1-host=repository
```

Commands are run the same as on a single host configuration except that some commands such as backup and expire are run from the repository host instead of the database host.

Create the stanza in the new repository.

```bash
# repository ⇒ Create the stanza
sudo -u pgbackrest pgbackrest --stanza=demo stanza-create
```

Check that the configuration is correct on both the database and repository hosts. More information about the check command can be found in Check the Configuration.

```bash
# pg-primary ⇒ Check the configuration
sudo -u postgres pgbackrest --stanza=demo check
repository ⇒ Check the configuration
sudo -u pgbackrest pgbackrest --stanza=demo check
```

## Perform a Backup

To perform a backup of the PostgreSQL cluster run pgBackRest with the backup command on the repository host.

```bash
# repository ⇒ Backup the demo cluster
sudo -u pgbackrest pgbackrest --stanza=demo backup
P00   WARN: no prior backup exists, incr backup has been changed to full
```

Since a new repository was created on the repository host the warning about the incremental backup changing to a full backup was emitted.

## Restore a Backup

To perform a restore of the PostgreSQL cluster run pgBackRest with the restore command on the database host.

```bash
# pg-primary ⇒ Stop the demo cluster, restore, and restart PostgreSQL
sudo pg_ctlcluster 9.4 demo stop
sudo -u postgres pgbackrest --stanza=demo --delta restore
sudo pg_ctlcluster 9.4 demo start
```

A new backup must be performed due to the timeline switch.

```bash
# repository ⇒ Backup the demo cluster
sudo -u pgbackrest pgbackrest --stanza=demo backup
```