# restore

This command is generally run manually, but there are instances where it might be automated.

## --db-include

Restore only specified databases.

This feature allows only selected databases to be restored. Databases not specifically included will be restored as sparse, zeroed files to save space but still allow PostgreSQL to perform recovery. After recovery the databases that were not included will not be accessible but can be removed with the drop database command.

::: tip NOTE:
Note that built-in databases (`template0`, `template1`, and `postgres`) are always restored.
:::

The `--db-include` option can be passed multiple times to specify more than one database to include.

```
example: --db-include=db_main
```

## --delta

Restore using delta.

By default the PostgreSQL data and tablespace directories are expected to be present but empty. This option performs a delta restore using checksums.

```
default: n
example: --delta
```

## --force

Force a restore.

By itself this option forces the PostgreSQL data and tablespace paths to be completely overwritten. In combination with `--delta` a timestamp/size delta will be performed instead of using checksums.

```
default: n
example: --force
```

## --link-all

Restore all symlinks.

By default symlinked directories and files are restored as normal directories and files in $PGDATA. This is because it may not be safe to restore symlinks to their original destinations on a system other than where the original backup was performed. This option restores all the symlinks just as they were on the original system where the backup was performed.

```
default: n
example: --link-all
```

## --link-map

Modify the destination of a symlink.

Allows the destination file or path of a symlink to be changed on restore. This is useful for restoring to systems that have a different storage layout than the original system where the backup was generated.

```
example: --link-map=pg_xlog=/data/xlog
```

## --recovery-option

Set an option in `recovery.conf`.

See `http://www.postgresql.org/docs/X.X/static/recovery-config.html` for details on recovery.conf options (replace `X.X` with your PostgreSQL version). This option can be used multiple times.

::: warning NOTE:
The restore_command option will be automatically generated but can be overridden with this option. Be careful about specifying your own `restore_command` as pgBackRest is designed to handle this for you. Target Recovery options (`recovery_target_name`, `recovery_target_time`, etc.) are generated automatically by pgBackRest and should not be set with this option.
:::

Since pgBackRest does not start PostgreSQL after writing the `recovery.conf` file, it is always possible to edit/check `recovery.conf` before manually restarting.

```
example: --recovery-option=primary_conninfo=db.mydomain.com
```

## --set

Backup set to restore.

The backup set to be restored. latest will restore the latest backup, otherwise provide the name of the backup to restore.

```
default: latest
example: --set=20150131-153358F_20150131-153401I
```

## --tablespace-map

Restore a tablespace into the specified directory.

Moves a tablespace to a new location during the restore. This is useful when tablespace locations are not the same on a replica, or an upgraded system has different mount points.

Since PostgreSQL 9.2 tablespace locations are not stored in `pg_tablespace` so moving tablespaces can be done with impunity. However, moving a tablespace to the data_directory is not recommended and may cause problems. For more information on moving tablespaces [http://www.databasesoup.com/2013/11/moving-tablespaces.html](http://www.databasesoup.com/2013/11/moving-tablespaces.html) is a good resource.

```
example: --tablespace-map=ts_01=/db/ts_01
```

## --tablespace-map-all

Restore all tablespaces into the specified directory.

By default tablespaces are restored into their original locations and while this behavior can be modified by with the tablespace-map open it is sometime preferable to remap all tablespaces to a new directory all at once. This is particularly useful for development or staging systems that may not have the same storage layout as the original system where the backup was generated.

The path specified will be the parent path used to create all the tablespaces in the backup.

```
example: --tablespace-map-all=/data/tablespace
```

## --target

Recovery target.

Defines the recovery target when `--type` is name, xid, or time.

```
example: --target=2015-01-30 14:15:11 EST
```

## --target-action

Action to take when recovery target is reached.

The following actions are supported:

- `pause` - pause when recovery target is reached.
- `promote` - promote and switch timeline when recovery target is reached.
- `shutdown` - shutdown server when recovery target is reached.

This option is only supported on PostgreSQL >= 9.5.

```
default: pause
example: --target-action=promote
```

## --target-exclusive

Stop just before the recovery target is reached.

Defines whether recovery to the target would be exclusive (the default is inclusive) and is only valid when `--type` is time or xid. For example, using `--target-exclusive` would exclude the contents of transaction `1007` when `--type=xid` and `--target=1007`. See the `recovery_target_inclusive` option in the [PostgreSQL docs](https://www.postgresql.org/docs/current/static/recovery-target-settings.html) for more information.

```
default: n
example: --no-target-exclusive
```

## --target-timeline

Recover along a timeline.

See `recovery_target_timeline` in the [PostgreSQL docs](https://www.postgresql.org/docs/current/static/recovery-target-settings.html) for more information.

```
example: --target-timeline=3
```

### --type

Recovery type.

The following recovery types are supported:

- `default` - recover to the end of the archive stream.
- `immediate` - recover only until the database becomes consistent. This option is only supported on PostgreSQL >= 9.4.
- `name` - recover the restore point specified in `--target`.
- `xid` - recover to the transaction id specified in `--target`.
- `time` - recover to the time specified in `--target`.
- `preserve` - preserve the existing `recovery.conf` file.
- `none` - no `recovery.conf` file is written so PostgreSQL will attempt to achieve consistency using WAL segments present in `pg_xlog/pg_wal`. Provide the required WAL segments or use the `archive-copy` setting to include them with the backup.

```
default: default
example: --type=xid
```
