# Starting And Stopping

Sometimes it is useful to prevent pgBackRest from running on a system. For example, when failing over from a primary to a standby it's best to prevent pgBackRest from running on the old primary in case PostgreSQL gets restarted or can't be completely killed. This will also prevent pgBackRest from running on cron.

```bash
# pg-primary ⇒ Stop the pgBackRest services
sudo -u postgres pgbackrest stop
```

New pgBackRest processes will no longer run.

```bash{3}
# repository ⇒ Attempt a backup
sudo -u pgbackrest pgbackrest --stanza=demo backup
P00  ERROR: [062]: raised from remote process on 'pg-primary': stop file exists for all stanzas
```

Specify the `--force` option to terminate any pgBackRest process that are currently running. If pgBackRest is already stopped then stopping again will generate a warning.

```bash{3}
# pg-primary ⇒ Stop the pgBackRest services again
sudo -u postgres pgbackrest stop
P00   WARN: stop file already exists for all stanzas
```

Start pgBackRest processes again with the start command.

```bash
# pg-primary ⇒ Start the pgBackRest services
sudo -u postgres pgbackrest start
```

It is also possible to stop pgBackRest for a single stanza.

```bash
# pg-primary ⇒ Stop pgBackRest services for the demo stanza
sudo -u postgres pgbackrest --stanza=demo stop
```

New pgBackRest processes for the specified stanza will no longer run.

```bash{3}
# repository ⇒ Attempt a backup
sudo -u pgbackrest pgbackrest --stanza=demo backup
P00  ERROR: [062]: raised from remote process on 'pg-primary': stop file exists for stanza demo
```

The stanza must also be specified when starting the pgBackRest processes for a single stanza.

```bash
# pg-primary ⇒ Start the pgBackRest services for the demo stanza
sudo -u postgres pgbackrest --stanza=demo start
```
