# stop

Does not allow any new pgBackRest processes to run. By default running processes will be allowed to complete successfully. Use the `--force` option to terminate running processes.

pgBackRest processes will return an error if they are run after the stop command completes.

## --force

Force all pgBackRest processes to stop.

This option will send `TERM` signals to all running pgBackRest processes to effect a graceful but immediate shutdown. Note that this will also shutdown processes that were initiated on another system but have remotes running on the current system. For instance, if a backup was started on the backup server then running `stop --force` on the database server will shutdown the backup process on the backup server.

```
default: n
example: --force
```
