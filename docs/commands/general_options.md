# General Options

## --buffer-size

Buffer size for file operations.

Set the buffer size used for copy, compress, and uncompress functions. A maximum of 3 buffers will be in use at a time per process. An additional maximum of 256K per process may be used for zlib buffers.

Size can be entered in bytes (default) or KB, MB, GB, TB, or PB where the multiplier is a power of 1024.

```
default: 4194304
example: --buffer-size=32K
```

## --cmd-ssh

Path to ssh client executable.

Use a specific SSH client when an alternate is desired or the ssh executable is not in $PATH.

```
default: ssh
example: --cmd-ssh=/usr/bin/ssh
```

## --compress

Use gzip file compression.

Backup files are compatible with command-line gzip tools.

```
default: y
example: --no-compress
```

## --compress-level

Compression level for stored files.

Sets the zlib level to be used for file compression when compress=y.

```
default: 6
allowed: 0-9
example: --compress-level=9
```

## --compress-level-network

Compression level for network transfer when `compress=n`.

Sets the zlib level to be used for protocol compression when `compress=n` and the database cluster is not on the same host as the repository. Protocol compression is used to reduce network traffic but can be disabled by setting `compress-level-network=0`. When compress=y the `compress-level-network` setting is ignored and `compress-level` is used instead so that the file is only compressed once. SSH compression is always disabled.

```
default: 3
allowed: 0-9
example: --compress-level-network=1
```

## --config

pgBackRest configuration file.

Use this option to specify a different configuration file than the default.

```
default: /etc/pgbackrest/pgbackrest.conf
example: --config=/conf/pgbackrest/pgbackrest.conf
```

## --config-include-path

Path to additional pgBackRest configuration files.

Configuration files existing in the specified location with extension `.conf` will be concatenated with the pgBackRest configuration file, resulting in one configuration file.

```
default: /etc/pgbackrest/conf.d
example: --config-include-path=/conf/pgbackrest/conf.d
```

## --config-path

Base path of pgBackRest configuration files.

This setting is used to override the default base path setting for the `--config` and `--config-include-path` options unless they are explicitly set on the command-line.

For example, passing only `--config-path=/conf/pgbackrest` results in the `--config` default being set to `/conf/pgbackrest/pgbackrest.conf` and the `--config-include-path` default being set to `/conf/pgbackrest/conf.d`.

```
default: /etc/pgbackrest
example: --config-path=/conf/pgbackrest
```

## --db-timeout

Database query timeout.

Sets the timeout, in seconds, for queries against the database. This includes the `pg_start_backup()` and `pg_stop_backup()` functions which can each take a substantial amount of time. Because of this the timeout should be kept high unless you know that these functions will return quickly (i.e. if you have set `startfast=y` and you know that the database cluster will not generate many WAL segments during the backup).

```
default: 1800
allowed: 0.1-604800
example: --db-timeout=600
```

## --lock-path

Path where lock files are stored.

The lock path provides a location for pgBackRest to create lock files to prevent conflicting operations from being run concurrently.

```
default: /tmp/pgbackrest
example: --lock-path=/backup/db/lock
```

## --neutral-umask

Use a neutral umask.

Sets the umask to `0000` so modes in the repository are created in a sensible way. The default directory mode is `0750` and default file mode is `0640`. The lock and log directories set the directory and file mode to `0770` and `0660` respectively.

To use the executing user's umask instead specify neutral-umask=n in the config file or `--no-neutral-umask` on the command line.

```
default: y
example: --no-neutral-umask
```

## --process-max

Max processes to use for compress/transfer.

Each process will perform compression and transfer to make the command run faster, but don't set process-max so high that it impacts database performance.

```
default: 1
allowed: 1-96
example: --process-max=4
```

## --protocol-timeout

Protocol timeout.

Sets the timeout, in seconds, that the local or remote process will wait for a new message to be received on the protocol layer. This prevents processes from waiting indefinitely for a message. The `protocol-timeout` option must be greater than the `db-timeout` option.

```
default: 1830
allowed: 0.1-604800
example: --protocol-timeout=630
```

## --spool-path

Path where transient data is stored.

This path is used to store data for the asynchronous `archive-push` and `archive-get` command.

The asynchronous `archive-push` command writes acknowledgements into the spool path when it has successfully stored WAL in the archive (and errors on failure) so the foreground process can quickly notify PostgreSQL. Acknowledgement files are very small (zero on success and a few hundred bytes on error).

The asynchronous archive-push process queues WAL in the spool path so it can be provided very quickly when PostgreSQL requests it. Moving files to PostgreSQL is most efficient when the spool path is on the same filesystem as `pg_xlog/pg_wal`.

The data stored in the spool path is not strictly temporary since it can and should survive a reboot. However, loss of the data in the spool path is not a problem. pgBackRest will simply recheck each WAL segment to ensure it is safely archived for `archive-push` and rebuild the queue for `archive-get`.

The spool path is intended to be located on a local Posix-compatible filesystem, not a remote filesystem such as NFS or CIFS.

```
default: /var/spool/pgbackrest
example: --spool-path=/backup/db/spool
```

## --stanza

Defines the stanza.

A stanza is the configuration for a PostgreSQL database cluster that defines where it is located, how it will be backed up, archiving options, etc. Most db servers will only have one Postgres database cluster and therefore one stanza, whereas backup servers will have a stanza for every database cluster that needs to be backed up.

It is tempting to name the stanza after the primary cluster but a better name describes the databases contained in the cluster. Because the stanza name will be used for the primary and all replicas it is more appropriate to choose a name that describes the actual function of the cluster, such as app or dw, rather than the local cluster name, such as main or prod.

```
example: --stanza=main
```
