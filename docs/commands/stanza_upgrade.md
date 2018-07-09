# stanza-upgrade

::: warning NOTE:
Immediately after upgrading PostgreSQL to a newer major version, the `pg-path` for all pgBackRest configurations must be set to the new database location and the stanza-upgrade run on the repository host.
:::

If the database is offline use the `--no-online` option.

## --backup-standby

Backup from the standby cluster.

Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.

```
default: n
example: --backup-standby
```

## --online

Update an online cluster.

Specifying `--no-online` prevents pgBackRest from connecting to PostgreSQL when upgrading the stanza.

```
default: y
example: --no-online
```
