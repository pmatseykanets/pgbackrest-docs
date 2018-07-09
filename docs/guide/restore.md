# Restore

The Restore section introduces additional restore command features.

## Delta Option

[Restore a Backup](/guide/quick_start.md#restore_a_backup) in [Quick Start](/guide/quick_start.md) required the database cluster directory to be cleaned before the restore could be performed. The delta option allows pgBackRest to automatically determine which files in the database cluster directory can be preserved and which ones need to be restored from the backup — it also removes files not present in the backup manifest so it will dispose of divergent changes. This is accomplished by calculating a [SHA-1](https://en.wikipedia.org/wiki/SHA-1) cryptographic hash for each file in the database cluster directory. If the SHA-1 hash does not match the hash stored in the backup then that file will be restored. This operation is very efficient when combined with the process-max option. Since the PostgreSQL server is shut down during the restore, a larger number of processes can be used than might be desirable during a backup when the PostgreSQL server is running.

```bash
# pg-primary ⇒ Stop the demo cluster, perform delta restore
sudo pg_ctlcluster 9.4 demo stop
sudo -u postgres pgbackrest --stanza=demo --delta \
       --log-level-console=detail restore
       [filtered 692 lines of output]
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/base/12134/PG_VERSION - exists and matches backup (4B, 99%) checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/base/1/PG_VERSION - exists and matches backup (4B, 99%) checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/PG_VERSION - exists and matches backup (4B, 100%) checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/global/12086 - exists and is zero size (0B, 100%)
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/global/12038 - exists and is zero size (0B, 100%)
       [filtered 83 lines of output]
P01 DETAIL: restore file /var/lib/postgresql/9.4/demo/base/1/11885 - exists and is zero size (0B, 100%)
P00   INFO: write /var/lib/postgresql/9.4/demo/recovery.conf
P00   INFO: restore global/pg_control (performed last to ensure aborted restores cannot be started)
P00   INFO: restore command end: completed successfully
```

```bash
# pg-primary ⇒ Restart PostgreSQL
sudo pg_ctlcluster 9.4 demo start
```

## Restore Selected Databases

There may be cases where it is desirable to selectively restore specific databases from a cluster backup. This could be done for performance reasons or to move selected databases to a machine that does not have enough space to restore the entire cluster backup.

To demonstrate this feature two databases are created: test1 and test2. A fresh backup is run so pgBackRest is aware of the new databases.

```bash
# pg-primary ⇒ Create two test databases and perform a backup
sudo -u postgres psql -c "create database test1;"
CREATE DATABASE
sudo -u postgres psql -c "create database test2;"
CREATE DATABASE
sudo -u postgres pgbackrest --stanza=demo --type=incr backup
```

Each test database will be seeded with tables and data to demonstrate that recovery works with selective restore.

```bash
# pg-primary ⇒ Create a test table in each database
sudo -u postgres psql -c "create table test1_table (id int); \
       insert into test1_table (id) values (1);" test1
INSERT 0 1
sudo -u postgres psql -c "create table test2_table (id int); \
       insert into test2_table (id) values (2);" test2
INSERT 0 1
```

One of the main reasons to use selective restore is to save space. The size of the test1 database is shown here so it can be compared with the disk utilization after a selective restore.

```bash
pg-primary ⇒ Show space used by test1 database
sudo -u postgres du -sh /var/lib/postgresql/9.4/demo/base/24576
6.5M	/var/lib/postgresql/9.4/demo/base/24576
```

Stop the cluster and restore only the `test2` database. Built-in databases (`template0`, `template1`, and `postgres`) are always restored.

```bash
# pg-primary ⇒ Restore from last backup including only the test2 database
sudo pg_ctlcluster 9.4 demo stop
sudo -u postgres pgbackrest --stanza=demo --delta \
       --db-include=test2 restore
sudo pg_ctlcluster 9.4 demo start
```

Once recovery is complete the test2 database will contain all previously created tables and data.

```bash
# pg-primary ⇒ Demonstrate that the test2 database was recovered
sudo -u postgres psql -c "select * from test2_table;" test2
 id 
----
  2
(1 row)
```

The test1 database, despite successful recovery, is not accessible. This is because the entire database was restored as sparse, zeroed files. PostgreSQL can successfully apply WAL on the zeroed files but the database as a whole will not be valid because key files contain no data. This is purposeful to prevent the database from being accidentally used when it might contain partial data that was applied during WAL replay.

```bash
pg-primary ⇒ Attempting to connect to the test1 database will produce an error
sudo -u postgres psql -c "select * from test1_table;" test1
psql: FATAL:  relation mapping file "base/24576/pg_filenode.map" contains invalid data
```

Since the test1 database is restored with sparse, zeroed files it will only require as much space as the amount of WAL that is written during recovery. While the amount of WAL generated during a backup and applied during recovery can be significant it will generally be a small fraction of the total database size, especially for large databases where this feature is most likely to be useful.

It is clear that the test1 database uses far less disk space during the selective restore than it would have if the entire database had been restored.

```bash
# pg-primary ⇒ Show space used by test1 database after recovery
sudo -u postgres du -sh /var/lib/postgresql/9.4/demo/base/24576
152K	/var/lib/postgresql/9.4/demo/base/24576
```

At this point the only action that can be taken on the invalid test1 database is drop database. pgBackRest does not automatically drop the database since this cannot be done until recovery is complete and the cluster is accessible.

```bash
# pg-primary ⇒ Drop the test1 database
sudo -u postgres psql -c "drop database test1;"
DROP DATABASE
```

Now that the invalid test1 database has been dropped only the test2 and built-in databases remain.

```bash
# pg-primary ⇒ List remaining databases
sudo -u postgres psql -c "select oid, datname from pg_database order by oid;"
  oid  |  datname  
-------+-----------
     1 | template1
 12134 | template0
 12139 | postgres
 24577 | test2
(4 rows)
```
