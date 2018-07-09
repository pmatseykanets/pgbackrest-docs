# Introduction

Commands are used to execute the various pgBackRest functions. Here the command options are listed exhaustively, that is, each option applicable to a command is listed with that command even if it applies to one or more other commands. This includes all the options that may also configured in `pgbackrest.conf`.

Non-boolean options configured in `pgbackrest.conf` can be reset to default on the command-line by using the reset- prefix. This feature may be used to restore a backup directly on a repository host. Normally, pgBackRest will error because it can see that the database host is remote and restores cannot be done remotely. By adding `--reset-pg1-host` on the command-line, pgBackRest will ignore the remote database host and restore locally. It may be necessary to pass a new `--pg-path` to force the restore to happen in a specific path, i.e. not the path used on the database host.

The `no-` prefix may be used to set a boolean option to false on the command-line.
