# Parallel Backup / Restore

pgBackRest offers parallel processing to improve performance of compression and transfer. The number of processes to be used for this feature is set using the `--process-max` option.

```bash
# repository ⇒ Check the number of CPUs
sudo lscpu
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                8
On-line CPU(s) list:   0-7
Thread(s) per core:    1
       [filtered 17 lines of output]
```

It is usually best not to use more than 25% of the available CPUs for the backup command. Backups don't have to run that fast as long as they are performed regularly and the backup process should not impact database performance, if at all possible.

The restore command can and should use all available CPUs because during a restore the PostgreSQL cluster is shut down and there is generally no other important work being done on the host. If the host contains multiple clusters then that should be considered when setting restore parallelism.

```bash
# repository ⇒ Perform a backup with single process
sudo -u pgbackrest pgbackrest --stanza=demo --type=full backup
```

```ini
# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Configure pgBackRest to use multiple backup processes
[demo]
pg1-host=pg-primary
pg1-host-user=postgres
pg1-path=/var/lib/postgresql/9.4/demo

[global]
process-max=3
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2
start-fast=y
```

```bash
# repository ⇒ Perform a backup with multiple processes
sudo -u pgbackrest pgbackrest --stanza=demo --type=full backup
```

```bash
# repository ⇒ Get backup info for the demo cluster
sudo -u pgbackrest pgbackrest info
stanza: demo
    status: ok

    db (current)
        wal archive min/max (9.4-1): 000000080000000000000022 / 000000080000000000000023

        full backup: 20180506-152004F
            timestamp start/stop: 2018-05-06 15:20:04 / 2018-05-06 15:20:13
            wal start/stop: 000000080000000000000022 / 000000080000000000000022
            database size: 25.5MB, backup size: 25.5MB
            repository size: 3MB, repository backup size: 3MB

        full backup: 20180506-152014F
            timestamp start/stop: 2018-05-06 15:20:14 / 2018-05-06 15:20:19
            wal start/stop: 000000080000000000000023 / 000000080000000000000023
            database size: 25.5MB, backup size: 25.5MB
            repository size: 3MB, repository backup size: 3MB
```

The performance of the last backup should be improved by using multiple processes. For very small backups the difference may not be very apparent, but as the size of the database increases so will time savings.
