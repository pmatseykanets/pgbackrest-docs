# stanza-create

The stanza-create command must be run on the host where the repository is located after the stanza has been configured in `pgbackrest.conf`.

## --backup-standby

Backup from the standby cluster.

Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.

```
default: n
example: --backup-standby
```

## --force

Force stanza creation.

::: warning CAUTION:
Use `--force` only as a last resort, when all else fails. If data is missing from the repository then the recreated .info files will likely be corrupt.
:::

If the required stanza `.info` files do not exist in the repository but backups or WAL segments do exist, then this option can be used to force the stanza to be created from the existing data in the repository. This is most likely to be useful after corruption or an incomplete restore of the repository from elsewhere.

```
default: n
example: --no-force
```

## --online

Create on an online cluster.

Specifying `--no-online` prevents pgBackRest from connecting to PostgreSQL when creating the stanza.

```
default: y
example: --no-online
```
