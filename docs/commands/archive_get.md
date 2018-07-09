# archive-get

WAL segments are required for restoring a PostgreSQL cluster or maintaining a replica.

## --archive-async

Push/get WAL segments asynchronously.

Enables asynchronous operation for the archive-push and archive-get commands.

Asynchronous operation is more efficient because it can reuse connections and take advantage of parallelism. See the `spool-path`, `archive-get-queue-max`, and `archive-push-queue-max` options for more information.

```
default: n
example: --archive-async
```

## --archive-get-queue-max

Maximum size of the pgBackRest archive-get queue.

Specifies the maximum size of the archive-get queue when archive-async is enabled. The queue is stored in the spool-path and is used to speed providing WAL to PostgreSQL.

Size can be entered in bytes (default) or KB, MB, GB, TB, or PB where the multiplier is a power of 1024.

```
default: 134217728
allowed: 0-4503599627370496
example: --archive-get-queue-max=1073741824
```

## --archive-timeout

Archive timeout.

Set maximum time, in seconds, to wait for each WAL segment to reach the pgBackRest archive repository. The timeout applies to the check and backup commands when waiting for WAL segments required for backup consistency to be archived.

```
default: 60
allowed: 0.1-86400
example: --archive-timeout=30
```
