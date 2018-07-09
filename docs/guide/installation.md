# Installation

A new host named `pg1` is created to contain the demo cluster and run pgBackRest examples.
pgBackRest supports 32-bit distributions that build Perl with 64-bit integer support.

```bash
# pg-primary ⇒ Check for 64-bit integers
sudo -u postgres perl -V | grep USE_64_BIT_INT USE_64_BIT_ALL USE_64_BIT_INT USE_ITHREADS
```

If pgBackRest has been installed before it's best to be sure that no prior copies of it are still installed. Depending on how old the version of pgBackRest is it may have been installed in a few different locations. The following commands will remove all prior versions of pgBackRest.

```bash
# pg-primary ⇒ Remove prior pgBackRest installations
sudo rm -f /usr/bin/pgbackrest
sudo rm -f /usr/bin/pg_backrest
sudo rm -rf /usr/lib/perl5/BackRest
sudo rm -rf /usr/share/perl5/BackRest
sudo rm -rf /usr/lib/perl5/pgBackRest
sudo rm -rf /usr/share/perl5/pgBackRest
```

pgBackRest is written in Perl which is included with Debian/Ubuntu by default. Some additional modules must also be installed but they are available as standard packages.

```bash
# pg-primary ⇒ Install required Perl packages
sudo apt-get update
sudo apt-get install libdbd-pg-perl libio-socket-ssl-perl libxml-libxml-perl
```

Debian/Ubuntu packages for pgBackRest are available at apt.postgresql.org. If they are not provided for your distribution/version it is easy to download the source and install manually.

```bash
# pg-primary ⇒ Download version 2.02 of pgBackRest
sudo wget -q -O - \
       https://github.com/pgbackrest/pgbackrest/archive/release/2.02.tar.gz | \
       sudo tar zx -C /root
```

```bash
# pg-primary ⇒ Install pgBackRest
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
# pg-primary ⇒ Build and Install C Library
sudo sh -c 'cd /root/pgbackrest-release-2.02/libc && \
       perl Makefile.PL INSTALLMAN1DIR=none INSTALLMAN3DIR=none'
sudo make -C /root/pgbackrest-release-2.02/libc test
sudo make -C /root/pgbackrest-release-2.02/libc install
```

Although most of pgBackRest is written in Perl, the main executable is written in C. This allows certain time-critical commands (like async archive-push) to run more quickly.

```bash
# pg-primary ⇒ Build and Install Binary
sudo make -C /root/pgbackrest-release-2.02/src
sudo make -C /root/pgbackrest-release-2.02/src install
```

pgBackRest should now be properly installed but it is best to check. If any dependencies were missed then you will get an error when running pgBackRest from the command line.

```bash
# pg-primary ⇒ Make sure the installation worked
sudo -u postgres pgbackrest
pgBackRest 2.02 - General help

Usage:
    pgbackrest [options] [command]

Commands:
    archive-get     Get a WAL segment from the archive.
    archive-push    Push a WAL segment to the archive.
    backup          Backup a database cluster.
    check           Check the configuration.
    expire          Expire backups that exceed retention.
    help            Get help.
    info            Retrieve information about backups.
    restore         Restore a database cluster.
    stanza-create   Create the required stanza data.
    stanza-delete   Delete a stanza.
    stanza-upgrade  Upgrade a stanza.
    start           Allow pgBackRest processes to run.
    stop            Stop pgBackRest processes from running.
    version         Get version.

Use 'pgbackrest help [command]' for more information.
```