# Backup

## Fast Start Option

By default pgBackRest will wait for the next regularly scheduled checkpoint before starting a backup. Depending on the checkpoint_timeout and checkpoint_segments settings in PostgreSQL it may be quite some time before a checkpoint completes and the backup can begin.

```bash
# pg-primary ⇒ Incremental backup of the demo cluster with the regularly scheduled checkpoint
sudo -u postgres pgbackrest --stanza=demo --type=incr \
       --log-level-console=info backup
P00   INFO: backup command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-pass= --repo1-cipher-type=aes-256-cbc --repo1-path=/var/lib/pgbackrest --repo1-retention-full=2 --stanza=demo --type=incr
P00   INFO: last backup label = 20180506-151611F_20180506-151616D, version = 2.02
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:16:32": backup begins after the next regular checkpoint completes
P00   INFO: backup start archive = 000000020000000000000006, lsn = 0/6000028
P01   INFO: backup file /var/lib/postgresql/9.4/demo/pg_multixact/offsets/0000 (8KB, 33%) checksum 0631457264ff7f8d5fb1edc2c0211992a67c73e6
       [filtered 10 lines of output]
```

When `--start-fast` is passed on the command-line or start-fast=y is set in `/etc/pgbackrest/pgbackrest.conf` an immediate checkpoint is requested and the backup will start more quickly. This is convenient for testing and for ad-hoc backups. For instance, if a backup is being taken at the beginning of a release window it makes no sense to wait for a checkpoint. Since regularly scheduled backups generally only happen once per day it is unlikely that enabling the start-fast in `/etc/pgbackrest/pgbackrest.conf` will negatively affect performance, however for high-volume transactional systems you may want to pass --start-fast on the command-line instead. Alternately, it is possible to override the setting in the configuration file by passing --no-start-fast on the command-line.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Enable the start-fast option
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
repo1-cipher-pass=zWaf6XtpjIVZC5444yXB+cgFDFl7MxGlgkZSaoPvTGirhPygu4jOKOXf9LO4vjfO
repo1-cipher-type=aes-256-cbc
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y

[global:archive-push]
compress-level=3
```

```bash
# pg-primary ⇒ Incremental backup of the demo cluster with an immediate checkpoint
sudo -u postgres pgbackrest --stanza=demo --type=incr \
       --log-level-console=info backup
P00   INFO: backup command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-pass= --repo1-cipher-type=aes-256-cbc --repo1-path=/var/lib/pgbackrest --repo1-retention-full=2 --stanza=demo --start-fast --type=incr
P00   INFO: last backup label = 20180506-151611F_20180506-151632I, version = 2.02
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:16:37": backup begins after the requested immediate checkpoint completes
P00   INFO: backup start archive = 000000020000000000000007, lsn = 0/7000028
P01   INFO: backup file /var/lib/postgresql/9.4/demo/global/pg_control (8KB, 97%) checksum 8500029d8dec8b2403e77a7c8946db1e4a896834
       [filtered 8 lines of output]
```

## Automatic Stop Option

Sometimes pgBackRest will exit unexpectedly and the backup in progress on the PostgreSQL cluster will not be properly stopped. pgBackRest exits as quickly as possible when an error occurs so that the cause can be reported accurately and is not masked by another problem that might happen during a more extensive cleanup.

Here an error is intentionally caused by removing repository permissions.

```bash
# pg-primary ⇒ Revoke write privileges in the pgBackRest repository and attempt a backup
sudo chmod 550 /var/lib/pgbackrest/backup/demo/
sudo -u postgres pgbackrest --stanza=demo --type=incr \
       --log-level-console=info backup
       [filtered 2 lines of output]
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:16:41": backup begins after the requested immediate checkpoint completes
P00   INFO: backup start archive = 000000020000000000000008, lsn = 0/8000028
P00  ERROR: [047]: unable to create path '/var/lib/pgbackrest/backup/demo/20180506-151611F_20180506-151641I': Permission denied
P00   INFO: backup command end: aborted with exception [047]
```

Even when the permissions are fixed pgBackRest will still be unable to perform a backup because the PostgreSQL cluster is stuck in backup mode.

```bash
# pg-primary ⇒ Restore write privileges in the pgBackRest repository and attempt a backup
sudo chmod 750 /var/lib/pgbackrest/backup/demo/
sudo -u postgres pgbackrest --stanza=demo --type=incr \
       --log-level-console=info backup
P00   INFO: backup command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-pass= --repo1-cipher-type=aes-256-cbc --repo1-path=/var/lib/pgbackrest --repo1-retention-full=2 --stanza=demo --start-fast --type=incr
P00   INFO: last backup label = 20180506-151611F_20180506-151637I, version = 2.02
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:16:43": backup begins after the requested immediate checkpoint completes
P00  ERROR: [057]: ERROR:  a backup is already in progress
            HINT:  Run pg_stop_backup() and try again.:
            select to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS.US TZ'), pg_xlogfile_name(lsn), lsn::text from pg_start_backup('pgBackRest backup started at 2018-05-06 15:16:43', true) as lsn
```

Enabling the `stop-auto` option allows pgBackRest to stop the current backup if it detects that no other pgBackRest backup process is running.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Enable the stop-auto option
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
repo1-cipher-pass=zWaf6XtpjIVZC5444yXB+cgFDFl7MxGlgkZSaoPvTGirhPygu4jOKOXf9LO4vjfO
repo1-cipher-type=aes-256-cbc
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
stop-auto=y

[global:archive-push]
compress-level=3
```

Now pgBackRest will stop the old backup and start a new one so the process completes successfully.

```bash
# pg-primary ⇒ Perform an incremental backup
sudo -u postgres pgbackrest --stanza=demo --type=incr \
       --log-level-console=info backup
P00   INFO: backup command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-pass= --repo1-cipher-type=aes-256-cbc --repo1-path=/var/lib/pgbackrest --repo1-retention-full=2 --stanza=demo --start-fast --stop-auto --type=incr
P00   INFO: last backup label = 20180506-151611F_20180506-151637I, version = 2.02
P00   WARN: the cluster is already in backup mode but no pgBackRest backup process is running. pg_stop_backup() will be called so a new backup can be started.
P00   INFO: execute exclusive pg_stop_backup() and wait for all WAL segments to archive
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:16:45": backup begins after the requested immediate checkpoint completes
P00   INFO: backup start archive = 000000020000000000000009, lsn = 0/9000028
P01   INFO: backup file /var/lib/postgresql/9.4/demo/global/pg_control (8KB, 97%) checksum 725279f91ec80c37072f7c1cb71fd27c36e9f0b8
       [filtered 8 lines of output]
```

Although useful this feature may not be appropriate when another third-party backup solution is being used to take online backups as pgBackRest will not recognize that the other software is running and may terminate a backup started by that software. However, it would be unusual to run more than one third-party backup solution at the same time so this is not likely to be a problem.

::: tip NOTE
`pg_dump` and `pg_basebackup` do not take online backups so are not affected. It is safe to run them in conjunction with pgBackRest.
:::

## Archive Timeout

During an online backup pgBackRest waits for WAL segments that are required for backup consistency to be archived. This wait time is governed by the pgBackRest `archive-timeout` option which defaults to 60 seconds. If archiving an individual segment is known to take longer then this option should be increased.