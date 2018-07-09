# Backup From a Standby

pgBackRest can perform backups on a standby instead of the primary. Standby backups require the pg-standby host to be configured and the backup-standby option enabled. If more than one standby is configured then the first running standby found will be used for the backup.

```ini
# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Configure pg2-host/pg2-host-user and pg2-path
[demo]
pg1-host=pg-primary
pg1-host-user=postgres
pg1-path=/var/lib/postgresql/9.4/demo
pg2-host=pg-standby
pg2-host-user=postgres
pg2-path=/var/lib/postgresql/9.4/demo

[global]
backup-standby=y
process-max=3
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
```

Both the primary and standby databases are required to perform the backup, though the vast majority of the files will be copied from the standby to reduce load on the primary. The database hosts can be configured in any order. pgBackRest will automatically determine which is the primary and which is the standby.

```bash
# repository ⇒ Backup the demo cluster from pg2
sudo -u pgbackrest pgbackrest --stanza=demo --log-level-console=detail backup
       [filtered 2 lines of output]
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:21:29": backup begins after the requested immediate checkpoint completes
P00   INFO: backup start archive = 00000008000000000000002C, lsn = 0/2C000028
P00   INFO: wait for replay on the standby to reach 0/2C000028
P00   INFO: replay on the standby reached 0/2C000348
P04   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/base/12139/12009 (240KB, 12%) checksum 405f32d2767ec0f4e3357dfa948c9ed2c0c2874b
P04   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/base/12139/12010 (232KB, 24%) checksum 80452b9a6bdeefb037869efd15bfa5e03b97e965
       [filtered 11 lines of output]
P04   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/base/12139/11900_fsm (24KB, 75%) checksum 190512e3d1ba5a439c22abe7fbc6c74d267bf4b2
P02   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/global/11884 (16KB, 76%) checksum 7b60e09a77005bdaf60a4199e44d526db194a97f
P01   INFO: backup file pg-primary:/var/lib/postgresql/9.4/demo/global/pg_control (8KB, 76%) checksum eeb0ac404201f00751e20f242444240a6c3de180
P02   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/base/12139/11928 (16KB, 77%) checksum 984ba9ffb2732f63c72d00f631ccf68839c91621
P01   INFO: backup file pg-primary:/var/lib/postgresql/9.4/demo/backup_label (238B, 77%) checksum b39fd9e1cf56fb9bfbb28905e60fdc254b9a0ddf
P02   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/base/12139/11927 (16KB, 78%) checksum b704cfc15485a76acdd8606421f6f66aa88948f1
P04   INFO: backup file pg-standby:/var/lib/postgresql/9.4/demo/global/11883 (16KB, 78%) checksum a08294d34a3bc32fd18f2eacd730504b06f29018
       [filtered 19 lines of output]
```

This incremental backup shows that most of the files are copied from the pg-standby host and only a few are copied from the pg-primary host.

pgBackRest creates a standby backup that is identical to a backup performed on the primary. It does this by starting/stopping the backup on the pg-primary host, copying only files that are replicated from the pg-standby host, then copying the remaining few files from the pg-primary host. This means that logs and statistics from the primary database will be included in the backup.
