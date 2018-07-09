# backup

pgBackRest does not have a built-in scheduler so it's best to run it from cron or some other scheduling mechanism.

## --archive-check

Check that WAL segments are in the archive before backup completes.

Checks that all WAL segments required to make the backup consistent are present in the WAL archive. It's a good idea to leave this as the default unless you are using another method for archiving.

This option must be enabled if archive-copy is enabled.

```
default: y
example: --no-archive-check
```

## --archive-copy

Copy WAL segments needed for consistency to the backup.

This slightly paranoid option protects against corruption in the WAL segment archive by storing the WAL segments required for consistency directly in the backup. WAL segments are still stored in the archive so this option will use additional space.

On restore, the WAL segments will be present in `pg_xlog/pg_wal` and PostgreSQL will use them in preference to calling the `restore_command`.

The `archive-check` option must be enabled if `archive-copy` is enabled.

```
default: n
example: --archive-copy
```

## --archive-timeout

Archive timeout.

Set maximum time, in seconds, to wait for each WAL segment to reach the pgBackRest archive repository. The timeout applies to the check and backup commands when waiting for WAL segments required for backup consistency to be archived.

```
default: 60
allowed: 0.1-86400
example: --archive-timeout=30
```

## --backup-standby

Backup from the standby cluster.

Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.

```
default: n
example: --backup-standby
```

## --checksum-page

Validate data page checksums.

Directs pgBackRest to validate all data page checksums while backing up a cluster. This option is automatically enabled when data page checksums are enabled on the cluster.

Failures in checksum validation will not abort a backup. Rather, warnings will be emitted in the log (and to the console with default settings) and the list of invalid pages will be stored in the backup manifest.

```
example: --no-checksum-page
```

## --force

Force an offline backup.

When used with `--no-start-stop` a backup will be run even if pgBackRest thinks that PostgreSQL is running. This option should be used with extreme care as it will likely result in a bad backup.

There are some scenarios where a backup might still be desirable under these conditions. For example, if a server crashes and the database cluster volume can only be mounted read-only, it would be a good idea to take a backup even if postmaster.pid is present. In this case it would be better to revert to the prior backup and replay WAL, but possibly there is a very important transaction in a WAL segment that did not get archived.

```
default: n
example: --force
```

## --manifest-save-threshold

Manifest save threshold during backup.

Defines how often the manifest will be saved during a backup. Saving the manifest is important because it stores the checksums and allows the resume function to work efficiently. The actual threshold used is 1% of the backup size or `manifest-save-threshold`, whichever is greater.

Size can be entered in bytes (default) or KB, MB, GB, TB, or PB where the multiplier is a power of 1024.

```
default: 1073741824
allowed: 1-1099511627776
example: --manifest-save-threshold=5G
```

## --online

Perform an online backup.

Specifying `--no-online` prevents pgBackRest from running `pg_start_backup()` and `pg_stop_backup()` on the database cluster. In order for this to work PostgreSQL should be shut down and pgBackRest will generate an error if it is not.

The purpose of this option is to allow offline backups. The `pg_xlog/pg_wal` directory is copied as-is and archive-check is automatically disabled for the backup.

```
default: y
example: --no-online
```

## --resume

Allow resume of failed backup.

Defines whether the resume feature is enabled. Resume can greatly reduce the amount of time required to run a backup after a previous backup of the same type has failed. It adds complexity, however, so it may be desirable to disable in environments that do not require the feature.

```
default: y
example: --no-resume
```

## --start-fast

Force a checkpoint to start backup quickly.

Forces a checkpoint (by passing y to the fast parameter of `pg_start_backup()`) so the backup begins immediately. Otherwise the backup will start after the next regular checkpoint.

This feature only works in PostgreSQL >= 8.4.

```
default: n
example: --start-fast
```

## --stop-auto

Stop prior failed backup on new backup.

This will only be done if an exclusive advisory lock can be acquired to demonstrate that the prior failed backup process has really stopped.

This feature relies on `pg_is_in_backup()` so only works on PostgreSQL >= 9.3.

The setting is disabled by default because it assumes that pgBackRest is the only process doing exclusive online backups. It depends on an advisory lock that only pgBackRest sets so it may abort other processes that do exclusive online backups. Note that base_backup and pg_dump are safe to use with this setting because they do not call `pg_start_backup()` so are not exclusive.

```
default: n
example: --stop-auto
```

## --type

Backup type.

The following backup types are supported:

- `full` - all database cluster files will be copied and there will be no dependencies on previous backups.
- `incr` - incremental from the last successful backup.
- `diff` - like an incremental backup but always based on the last full backup.

```
default: incr
example: --type=full
```
