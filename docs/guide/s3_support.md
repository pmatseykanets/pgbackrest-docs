# AWS S3 Support

pgBackRest supports storing repositories in [Amazon S3](https://aws.amazon.com/s3/). The bucket used to store the repository must be created in advance — pgBackRest will not do it automatically.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure S3
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

[global]
process-max=4
repo1-cipher-type=none
repo1-path=/
repo1-retention-diff=2
repo1-retention-full=2
repo1-s3-bucket=demo-bucket
repo1-s3-endpoint=s3.amazonaws.com
repo1-s3-key=accessKey1
repo1-s3-key-secret=verySecretKey1
repo1-s3-region=us-east-1
repo1-s3-verify-ssl=n
repo1-type=s3
start-fast=y
stop-auto=y

[global:archive-push]
compress-level=3
```

Commands are run exactly as if the repository were stored on a local disk.

```bash
# pg-primary ⇒ Create the stanza
sudo -u postgres pgbackrest --stanza=demo --log-level-console=info stanza-create
P00   INFO: stanza-create command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-type=none --repo1-path=/ --repo1-s3-bucket=demo-bucket --repo1-s3-endpoint=s3.amazonaws.com --repo1-s3-key= --repo1-s3-key-secret= --repo1-s3-region=us-east-1 --no-repo1-s3-verify-ssl --repo1-type=s3 --stanza=demo
P00   INFO: stanza-create command end: completed successfully
```

File creation time in S3 is relatively slow so commands benefit by increasing process-max to parallelize file creation.

```bash
# pg-primary ⇒ Backup the demo cluster
sudo -u postgres pgbackrest --stanza=demo \
       --log-level-console=info backup
P00   INFO: backup command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=4 --repo1-cipher-type=none --repo1-path=/ --repo1-retention-diff=2 --repo1-retention-full=2 --repo1-s3-bucket=demo-bucket --repo1-s3-endpoint=s3.amazonaws.com --repo1-s3-key= --repo1-s3-key-secret= --repo1-s3-region=us-east-1 --no-repo1-s3-verify-ssl --repo1-type=s3 --stanza=demo --start-fast --stop-auto
P00   WARN: no prior backup exists, incr backup has been changed to full
P00   INFO: execute exclusive pg_start_backup() with label "pgBackRest backup started at 2018-05-06 15:18:34": backup begins after the requested immediate checkpoint completes
P00   INFO: backup start archive = 00000007000000000000001B, lsn = 0/1B000028
       [filtered 995 lines of output]
P01   INFO: backup file /var/lib/postgresql/9.4/demo/base/1/11895 (0B, 100%)
P03   INFO: backup file /var/lib/postgresql/9.4/demo/base/1/11885 (0B, 100%)
P00   INFO: full backup size = 25.5MB
P00   INFO: execute exclusive pg_stop_backup() and wait for all WAL segments to archive
P00   INFO: backup stop archive = 00000007000000000000001B, lsn = 0/1B000128
       [filtered 4 lines of output]
```
