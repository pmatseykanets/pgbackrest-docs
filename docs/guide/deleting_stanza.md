# Deleting a Stanza

The `stanza-delete` command removes data in the repository associated with a stanza. Use this command with caution — it will permanently remove all backups and archives from the pgBackRest repository for the specified stanza.

To delete a stanza:

- Shut down the PostgreSQL cluster associated with the stanza (or use `--force` to override).
- Run the stop command on the repository host.
- Run the stanza-delete command on the repository host.

Once the command successfully completes, it is the responsibility of the user to remove the stanza from all pgBackRest configuration files.

```bash
# pg-primary ⇒ Stop PostgreSQL cluster to be removed
sudo pg_ctlcluster 9.4 demo stop
```

```bash{4}
# pg-primary ⇒ Stop pgBackRest for the stanza
sudo -u postgres pgbackrest --stanza=demo --log-level-console=info stop
P00   INFO: stop command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --repo1-cipher-type=none --repo1-path=/ --repo1-s3-bucket=demo-bucket --repo1-s3-endpoint=s3.amazonaws.com --repo1-s3-key= --repo1-s3-key-secret= --repo1-s3-region=us-east-1 --no-repo1-s3-verify-ssl --repo1-type=s3 --stanza=demo
P00   INFO: stop command end: completed successfully
```

```bash{4}
# pg-primary ⇒ Delete the stanza
sudo -u postgres pgbackrest --stanza=demo --log-level-console=info stanza-delete
P00   INFO: stanza-delete command begin 2.02: --log-level-console=info --log-level-stderr=off --no-log-timestamp --pg1-path=/var/lib/postgresql/9.4/demo --repo1-cipher-type=none --repo1-path=/ --repo1-s3-bucket=demo-bucket --repo1-s3-endpoint=s3.amazonaws.com --repo1-s3-key= --repo1-s3-key-secret= --repo1-s3-region=us-east-1 --no-repo1-s3-verify-ssl --repo1-type=s3 --stanza=demo
P00   INFO: stanza-delete command end: completed successfully
```
