# Quick Start

The Quick Start section will cover basic configuration of pgBackRest and PostgreSQL and introduce the backup, restore, and info commands.

## Setup Demo Cluster

Creating the demo cluster is optional but is strongly recommended, especially for new users, since the example commands in the user guide reference the demo cluster; the examples assume the demo cluster is running on the default port (i.e. 5432). The cluster will not be started until a later section because there is still some configuration to do.

```bash
# pg-primary ⇒ Create the demo cluster
sudo -u postgres /usr/lib/postgresql/9.4/bin/initdb \
       -D /var/lib/postgresql/9.4/demo -k -A peer
sudo pg_createcluster 9.4 demo
Configuring already existing cluster (configuration: /etc/postgresql/9.4/demo, data: /var/lib/postgresql/9.4/demo, owner: 5000:5000)
Ver Cluster Port Status Owner    Data directory               Log file
9.4 demo    5432 down   postgres /var/lib/postgresql/9.4/demo /var/log/postgresql/postgresql-9.4-demo.log
```

By default PostgreSQL will only accept local connections. The examples in this guide will require connections from other servers so listen_addresses is configured to listen on all interfaces. This may not be appropriate for secure installations.

```ini
# pg-primary:/etc/postgresql/9.4/demo/postgresql.conf ⇒ Set listen_addresses
listen_addresses = '*'
```

For demonstration purposes the log_line_prefix setting will be minimally configured. This keeps the log output as brief as possible to better illustrate important information.

```ini
# pg-primary:/etc/postgresql/9.4/demo/postgresql.conf ⇒ Set log_line_prefix
listen_addresses = '*'
log_line_prefix = ''
```

## Configure Cluster Stanza

A stanza is the configuration for a PostgreSQL database cluster that defines where it is located, how it will be backed up, archiving options, etc. Most db servers will only have one Postgres database cluster and therefore one stanza, whereas backup servers will have a stanza for every database cluster that needs to be backed up.

It is tempting to name the stanza after the primary cluster but a better name describes the databases contained in the cluster. Because the stanza name will be used for the primary and all replicas it is more appropriate to choose a name that describes the actual function of the cluster, such as app or dw, rather than the local cluster name, such as main or prod.

The name `'demo'` describes the purpose of this cluster accurately so that will also make a good stanza name.

pgBackRest needs to know where the base data directory for the PostgreSQL cluster is located. The path can be requested from PostgreSQL directly but in a recovery scenario the PostgreSQL process will not be available. During backups the value supplied to pgBackRest will be compared against the path that PostgreSQL is running on and they must be equal or the backup will return an error. Make sure that pg-path is exactly equal to data_directory in postgresql.conf.

By default Debian/Ubuntu stores clusters in `/var/lib/postgresql/[version]/[cluster]` so it is easy to determine the correct path for the data directory.

When creating the `/etc/pgbackrest/pgbackrest.conf` file, the database owner (usually postgres) must be granted read privileges.

```ini
# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure the PostgreSQL cluster data directory
[demo]
pg1-path=/var/lib/postgresql/9.4/demo
```

pgBackRest configuration files follow the Windows INI convention. Sections are denoted by text in brackets and key/value pairs are contained in each section. Lines beginning with # are ignored and can be used as comments.

There are multiple ways the pgBackRest configuration files can be loaded:

- `config` and `config-include-path` are default: the default config file will be loaded, if it exists, and *.conf files in the default config include path will be appended, if they exist.
- `config` option is specified: only the specified config file will be loaded and is expected to exist.
- `config-include-path` is specified: `*.conf` files in the config include path will be loaded and the path is required to exist. The default config file will be be loaded if it exists. If it is desireable to load only the files in the specified config include path, then the `--no-config` option can also be passed.
- `config` and `config-include-path` are specified: using the user-specified values, the config file will be loaded and *.conf files in the config include path will be appended. The files are expected to exist.
- `config-path` is specified: this setting will override the base path for the default location of the config file and/or the base path of the default config-include-path setting unless the config and/or `config-incude-path` option is explicitly set.

The files are concatenated as if they were one big file; order doesn't matter, but there is precedence based on sections.

The precedence (highest to lowest) is:

- `[stanza:command]`
- `[stanza]`
- `[global:command]`
- `[global]`

::: tip NOTE:
`--config`, `--config-include-path` and `--config-path` are command-line only options.
:::
