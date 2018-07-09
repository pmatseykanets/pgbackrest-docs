# Stanza Options

## --pg-path

PostgreSQL data directory.

This should be the same as the `data_directory` setting in `postgresql.conf`. Even though this value can be read from postgresql.conf or PostgreSQL it is prudent to set it in case those resources are not available during a restore or offline backup scenario.

The `pg-path` option is tested against the value reported by PostgreSQL on every online backup so it should always be current.

```
example: --pg1-path=/data/db
Deprecated Name: db-path
```
