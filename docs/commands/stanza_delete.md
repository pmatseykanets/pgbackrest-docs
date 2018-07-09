# stanza-delete

The `stanza-delete` command removes data in the repository associated with a stanza.

::: warning NOTE:
Use this command with caution — it will permanently remove all backups and archives from the pgBackRest repository for the specified stanza.
:::

To delete a stanza:

- Shut down the PostgreSQL cluster associated with the stanza (or use `--force` to override).
- Run the `stop` command on the repository host.
- Run the `stanza-delete` command on the repository host.

Once the command successfully completes, it is the responsibility of the user to remove the stanza from all pgBackRest configuration files.

## --force

Force stanza delete.

If PostgreSQL is still running for the stanza, then this option can be used to force the stanza to be deleted from the repository.

```
default: n
example: --no-force
```
