# Retention

Generally it is best to retain as many backups as possible to provide a greater window for Point-in-Time Recovery, but practical concerns such as disk space must also be considered. Retention options remove older backups once they are no longer needed.

## Full Backup Retention
Set `repo1-retention-full` to the number of full backups required. New backups must be completed before expiration will occur — that means if repo1-retention-full=2 then there will be three full backups stored before the oldest one is expired.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure repo1-retention-full
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

Backup `repo1-retention-full=2` but currently there is only one full backup so the next full backup to run will not expire any full backups.

```bash
# pg-primary ⇒ Perform a full backup
sudo -u postgres pgbackrest --stanza=demo --type=full \
       --log-level-console=detail backup
       [filtered 763 lines of output]
P00   INFO: backup command end: completed successfully
P00   INFO: expire command begin
P00 DETAIL: archive retention on backup 20180506-151611F, archiveId = 9.4-1, start = 000000010000000000000002
P00 DETAIL: no archive to remove, archiveId = 9.4-1
P00   INFO: expire command end: completed successfully
```

Archive is expired because WAL segments were generated before the oldest backup. These are not useful for recovery — only WAL segments generated after a backup can be used to recover that backup.

```bash
# pg-primary ⇒ Perform a full backup
sudo -u postgres pgbackrest --stanza=demo --type=full \
       --log-level-console=info backup
       [filtered 763 lines of output]
P00   INFO: backup command end: completed successfully
P00   INFO: expire command begin
P00   INFO: expire full backup set: 20180506-151611F, 20180506-151611F_20180506-151616D, 20180506-151611F_20180506-151632I, 20180506-151611F_20180506-151637I, 20180506-151611F_20180506-151645I
P00   INFO: remove expired backup 20180506-151611F_20180506-151645I
P00   INFO: remove expired backup 20180506-151611F_20180506-151637I
       [filtered 3 lines of output]
```

The `20180506-151611F` full backup is expired and archive retention is based on the `20180506-151655F` which is now the oldest full backup.

## Differential Backup Retention

Set `repo1-retention-diff` to the number of differential backups required. Differentials only rely on the prior full backup so it is possible to create a rolling set of differentials for the last day or more. This allows quick restores to recent points-in-time but reduces overall space consumption.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure repo1-retention-diff
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
repo1-cipher-pass=zWaf6XtpjIVZC5444yXB+cgFDFl7MxGlgkZSaoPvTGirhPygu4jOKOXf9LO4vjfO
repo1-cipher-type=aes-256-cbc
repo1-path=/var/lib/pgbackrest
repo1-retention-diff=1
repo1-retention-full=2
start-fast=y
stop-auto=y

[global:archive-push]
compress-level=3
```

Backup `repo1-retention-diff=1` so two differentials will need to be performed before one is expired. An incremental backup is added to demonstrate incremental expiration. Incremental backups cannot be expired independently — they are always expired with their related full or differential backup.

```bash
# pg-primary ⇒ Perform differential and incremental backups
sudo -u postgres pgbackrest --stanza=demo --type=diff backup
sudo -u postgres pgbackrest --stanza=demo --type=incr backup
```

Now performing a differential backup will expire the previous differential and incremental backups leaving only one differential backup.

```bash
# pg-primary ⇒ Perform a differential backup
sudo -u postgres pgbackrest --stanza=demo --type=diff \
       --log-level-console=info backup
       [filtered 10 lines of output]
P00   INFO: backup command end: completed successfully
P00   INFO: expire command begin
P00   INFO: expire diff backup set: 20180506-151702F_20180506-151709D, 20180506-151702F_20180506-151714I
P00   INFO: remove expired backup 20180506-151702F_20180506-151714I
P00   INFO: remove expired backup 20180506-151702F_20180506-151709D
```

## Archive Retention

Although pgBackRest automatically removes archived WAL segments when expiring backups (the default expires WAL for full backups based on the repo1-retention-full option), it may be useful to expire archive more aggressively to save disk space. Note that full backups are treated as differential backups for the purpose of differential archive retention.

Expiring archive will never remove WAL segments that are required to make a backup consistent. However, since Point-in-Time-Recovery (PITR) only works on a continuous WAL stream, care should be taken when aggressively expiring archive outside of the normal backup expiration process.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure repo1-retention-diff
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
repo1-cipher-pass=zWaf6XtpjIVZC5444yXB+cgFDFl7MxGlgkZSaoPvTGirhPygu4jOKOXf9LO4vjfO
repo1-cipher-type=aes-256-cbc
repo1-path=/var/lib/pgbackrest
repo1-retention-diff=2
repo1-retention-full=2
start-fast=y
stop-auto=y

[global:archive-push]
compress-level=3
```

```bash{6}
# pg-primary ⇒ Perform differential backup
sudo -u postgres pgbackrest --stanza=demo --type=diff \
       --log-level-console=info backup
       [filtered 7 lines of output]
P00   INFO: execute exclusive pg_stop_backup() and wait for all WAL segments to archive
P00   INFO: backup stop archive = 000000020000000000000014, lsn = 0/140000F0
P00   INFO: new backup label = 20180506-151702F_20180506-151724D
P00   INFO: backup command end: completed successfully
P00   INFO: expire command begin
```

```bash{7,9,10}
# pg-primary ⇒ Expire archive
sudo -u postgres pgbackrest --stanza=demo --log-level-console=detail \
       --repo1-retention-archive-type=diff --repo1-retention-archive=1 expire
P00   INFO: expire command begin 2.02: --log-level-console=detail --log-level-stderr=off --no-log-timestamp --repo1-cipher-pass= --repo1-cipher-type=aes-256-cbc --repo1-path=/var/lib/pgbackrest --repo1-retention-archive=1 --repo1-retention-archive-type=diff --repo1-retention-diff=2 --repo1-retention-full=2 --stanza=demo
P00 DETAIL: archive retention on backup 20180506-151655F, archiveId = 9.4-1, start = 00000002000000000000000B, stop = 00000002000000000000000B
P00 DETAIL: archive retention on backup 20180506-151702F, archiveId = 9.4-1, start = 00000002000000000000000C, stop = 00000002000000000000000C
P00 DETAIL: archive retention on backup 20180506-151702F_20180506-151718D, archiveId = 9.4-1, start = 000000020000000000000010, stop = 000000020000000000000010
P00 DETAIL: archive retention on backup 20180506-151702F_20180506-151724D, archiveId = 9.4-1, start = 000000020000000000000014
P00 DETAIL: remove archive: archiveId = 9.4-1, start = 00000002000000000000000D, stop = 00000002000000000000000F
P00 DETAIL: remove archive: archiveId = 9.4-1, start = 000000020000000000000011, stop = 000000020000000000000013
P00   INFO: expire command end: completed successfully
```

The `20180506-151702F_20180506-151718D` differential backup has archived WAL segments that must be retained to make the older backups consistent even though they cannot be played any further forward with PITR. WAL segments generated after `20180506-151702F_20180506-151718D` but before `20180506-151702F_20180506-151724D` are removed. WAL segments generated after the new backup `20180506-151702F_20180506-151724D` remain and can be used for PITR.

Since full backups are considered differential backups for the purpose of differential archive retention, if a full backup is now performed with the same settings, only the archive for that full backup is retained for PITR.
