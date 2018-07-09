# Asynchronous Archiving

Asynchronous archiving is enabled with the archive-async option. This option enables asynchronous operation for both the archive-push and archive-get commands.

A spool path is required. The commands will store transient data here but each command works quite a bit differently so spool path usage is described in detail in each section.

```bash
# pg-primary ⇒ Create the spool directory
sudo mkdir -m 750 /var/spool/pgbackrest
sudo chown postgres:postgres /var/spool/pgbackrest
```

```bash
# pg-standby ⇒ Create the spool directory
sudo mkdir -m 750 /var/spool/pgbackrest
sudo chown postgres:postgres /var/spool/pgbackrest
```

The spool path must be configured and asynchronous archiving enabled. Asynchronous archiving automatically confers some benefit by reducing the number of connections made to remote storage, but setting process-max can drastically improve performance by parallelizing operations. Be sure not to set `process-max` so high that it affects normal database operations.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure the spool path and asynchronous archiving
[demo]
pg1-path=/var/lib/postgresql/9.4/demo

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
# pg-standby:/etc/pgbackrest/pgbackrest.conf ⇒ Configure the spool path and asynchronous archiving
[demo]
pg1-path=/var/lib/postgresql/9.4/demo
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

Note that `process-max` is configured using command sections so that the option is not used by backup and restore. This also allows different values for archive-push and archive-get.
For demonstration purposes streaming replication will be broken to force PostgreSQL to get WAL using the restore_command.

```bash
# pg-primary ⇒ Break streaming replication by changing the replication password
sudo -u postgres psql -c "alter user replicator password 'bogus'"
ALTER ROLE
```

```bash
# pg-standby ⇒ Restart standby to break connection
sudo pg_ctlcluster 9.4 demo restart
```

## Archive Push

The asynchronous archive-push command offloads WAL archiving to a separate process (or processes) to improve throughput. It works by looking ahead to see which WAL segments are ready to be archived beyond the request that PostgreSQL is currently making via the archive_command. WAL segments are transferred to the archive directly from the `pg_xlog/pg_wal` directory and success is only returned by the archive_command when the WAL segment has been safely stored in the archive.

The spool path holds the current status of WAL archiving. Status files written into the spool directory are typically zero length and should consume a minimal amount of space (a few MB at most) and very little IO. All the information in this directory can be recreated so it is not necessary to preserve the spool directory if the cluster is moved to new hardware.

::: tip NOTE:
In the original implementation of asynchronous archiving, WAL segments were copied to the spool directory before compression and transfer. The new implementation copies WAL directly from the `pg_xlog` directory. If asynchronous archiving was utilized in v1.12 or prior, read the v1.13 release notes carefully before upgrading.
:::

The `[stanza]-archive-push-async.log` file can be used to monitor the activity of the asynchronous process. A good way to test this is to quickly push a number of WAL segments.

```bash
# pg-primary ⇒ Test parallel asynchronous archiving
sudo -u postgres psql -c " \
       select pg_create_restore_point('test async push'); select pg_switch_xlog(); \
       select pg_create_restore_point('test async push'); select pg_switch_xlog(); \
       select pg_create_restore_point('test async push'); select pg_switch_xlog(); \
       select pg_create_restore_point('test async push'); select pg_switch_xlog(); \
       select pg_create_restore_point('test async push'); select pg_switch_xlog();"
sudo -u postgres pgbackrest --stanza=demo --log-level-console=info check
P00   INFO: check command begin 2.02: --log-level-console=info --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-host=repository --stanza=demo
P00   INFO: WAL segment 00000008000000000000002A successfully stored in the archive at '/var/lib/pgbackrest/archive/demo/9.4-1/0000000800000000/00000008000000000000002A-2b54769baadaec580e9b8814868ced3aeef7d951.gz'
P00   INFO: check command end: completed successfully
```

Now the log file will contain parallel, asynchronous activity.

```bash
# pg-primary ⇒ Check results in the log
sudo -u postgres cat /var/log/pgbackrest/demo-archive-push-async.log
-------------------PROCESS START-------------------
P00   INFO: archive-push command begin 2.02: [pg_xlog/000000080000000000000025] --archive-async --log-level-console=off --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=2 --repo1-host=repository --spool-path=/var/spool/pgbackrest --stanza=demo
P00   INFO: push 2 WAL file(s) to archive: 000000080000000000000025...000000080000000000000026
P01 DETAIL: pushed WAL file 000000080000000000000025 to archive
P02 DETAIL: pushed WAL file 000000080000000000000026 to archive
P00   INFO: archive-push command end: completed successfully

-------------------PROCESS START-------------------
P00   INFO: archive-push command begin 2.02: [pg_xlog/000000080000000000000027] --archive-async --log-level-console=off --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=2 --repo1-host=repository --spool-path=/var/spool/pgbackrest --stanza=demo
P00   INFO: push 3 WAL file(s) to archive: 000000080000000000000027...000000080000000000000029
P01 DETAIL: pushed WAL file 000000080000000000000027 to archive
P02 DETAIL: pushed WAL file 000000080000000000000028 to archive
P01 DETAIL: pushed WAL file 000000080000000000000029 to archive
P00   INFO: archive-push command end: completed successfully

-------------------PROCESS START-------------------
P00   INFO: archive-push command begin 2.02: [pg_xlog/00000008000000000000002A] --archive-async --log-level-console=off --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=2 --repo1-host=repository --spool-path=/var/spool/pgbackrest --stanza=demo
P00   INFO: push 1 WAL file(s) to archive: 00000008000000000000002A
P01 DETAIL: pushed WAL file 00000008000000000000002A to archive
P00   INFO: archive-push command end: completed successfully
```

## Archive Get

The asynchronous archive-get command maintains a local queue of WAL to improve throughput. If a WAL segment is not found in the queue it is fetched from the repository along with enough consecutive WAL to fill the queue. The maximum size of the queue is defined by archive-get-queue-max. Whenever the queue is less than half full more WAL will be fetched to fill it.

Asynchronous operation is most useful in environments that generate a lot of WAL or have a high latency connection to the repository storage (i.e., S3). In the case of a high latency connection it may be a good idea to increase `process-max`.
The `[stanza]-archive-get-async.log` file can be used to monitor the activity of the asynchronous process.

```bash
# pg-standby ⇒ Check results in the log
sudo -u postgres cat /var/log/pgbackrest/demo-archive-get-async.log
-------------------PROCESS START-------------------
P00   INFO: archive-get command begin 2.02: [000000080000000000000023, 000000080000000000000024, 000000080000000000000025, 000000080000000000000026, 000000080000000000000027, 000000080000000000000028, 000000080000000000000029, 00000008000000000000002A] --archive-async --log-level-console=off --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=2 --repo1-host=repository --spool-path=/var/spool/pgbackrest --stanza=demo
P00   INFO: get 8 WAL file(s) from archive: 000000080000000000000023...00000008000000000000002A
P01 DETAIL: got WAL file 000000080000000000000023 from archive
P02 DETAIL: got WAL file 000000080000000000000024 from archive
P01 DETAIL: WAL file 000000080000000000000025 not found in archive
P02 DETAIL: WAL file 000000080000000000000026 not found in archive
       [filtered 33 lines of output]
P00   INFO: archive-get command begin 2.02: [000000080000000000000025, 000000080000000000000026, 000000080000000000000027, 000000080000000000000028, 000000080000000000000029, 00000008000000000000002A, 00000008000000000000002B, 00000008000000000000002C] --archive-async --log-level-console=off --log-level-file=detail --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --process-max=2 --repo1-host=repository --spool-path=/var/spool/pgbackrest --stanza=demo
P00   INFO: get 8 WAL file(s) from archive: 000000080000000000000025...00000008000000000000002C
P01 DETAIL: got WAL file 000000080000000000000025 from archive
P02 DETAIL: got WAL file 000000080000000000000026 from archive
P01 DETAIL: got WAL file 000000080000000000000027 from archive
P02 DETAIL: got WAL file 000000080000000000000028 from archive
P02 DETAIL: WAL file 00000008000000000000002A not found in archive
P02 DETAIL: WAL file 00000008000000000000002B not found in archive
P02 DETAIL: WAL file 00000008000000000000002C not found in archive
P01 DETAIL: got WAL file 000000080000000000000029 from archive
P00   INFO: archive-get command end: completed successfully

       [filtered 5 lines of output]
P02 DETAIL: WAL file 00000008000000000000002D not found in archive
P02 DETAIL: WAL file 00000008000000000000002E not found in archive
P01 DETAIL: got WAL file 00000008000000000000002A from archive
P00   INFO: archive-get command end: completed successfully

       [filtered 24 lines of output]
```

```bash
# pg-primary ⇒ Fix streaming replication by changing the replication password
sudo -u postgres psql -c "alter user replicator password 'jw8s0F4'"
ALTER ROLE
```