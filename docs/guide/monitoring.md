# Monitoring

Monitoring is an important part of any production system. There are many tools available and pgBackRest can be monitored on any of them with a little work.

pgBackRest can output information about the repository in JSON format which includes a list of all backups for each stanza and WAL archive info. A script is needed to extract information in a format that the monitoring system can understand.

```bash
# pg-primary ⇒ Get pgBackRest info in JSON format
sudo -u postgres pgbackrest --output=json info
[
    {
        "archive" : [
            {
                "database" : {
                    "id" : 1
                },
                "id" : "9.4-1",
                "max" : "000000020000000000000009",
                "min" : "000000010000000000000002"
            }
        ],
        "backup" : [
            {
                "archive" : {
                    "start" : "000000010000000000000002",
                    "stop" : "000000010000000000000002"
                },
                "backrest" : {
                    "format" : 5,
                    "version" : "2.02"
                },
                "database" : {
                    "id" : 1
                },
                "info" : {
                    "delta" : 20162900,
                    "repository" : {
                        "delta" : 2389280,
                        "size" : 2389280
                    },
                    "size" : 20162900
                },
                "label" : "20180506-151611F",
                "prior" : null,
                "reference" : null,
                "timestamp" : {
                    "start" : 1525619771,
                    "stop" : 1525619776
                },
                "type" : "full"
            },
            {
                "archive" : {
                    "start" : "000000010000000000000004",
                    "stop" : "000000010000000000000004"
                },
                "backrest" : {
                    "format" : 5,
                    "version" : "2.02"
                },
                "database" : {
                    "id" : 1
                },
                "info" : {
                    "delta" : 8428,
                    "repository" : {
                        "delta" : 400,
                        "size" : 2389280
                    },
                    "size" : 20162900
                },
                "label" : "20180506-151611F_20180506-151616D",
                "prior" : "20180506-151611F",
                "reference" : [
                    "20180506-151611F"
                ],
                "timestamp" : {
                    "start" : 1525619776,
                    "stop" : 1525619780
                },
                "type" : "diff"
            },
            {
                "archive" : {
                    "start" : "000000020000000000000006",
                    "stop" : "000000020000000000000006"
                },
                "backrest" : {
                    "format" : 5,
                    "version" : "2.02"
                },
                "database" : {
                    "id" : 1
                },
                "info" : {
                    "delta" : 24812,
                    "repository" : {
                        "delta" : 544,
                        "size" : 2389280
                    },
                    "size" : 20162900
                },
                "label" : "20180506-151611F_20180506-151632I",
                "prior" : "20180506-151611F_20180506-151616D",
                "reference" : [
                    "20180506-151611F"
                ],
                "timestamp" : {
                    "start" : 1525619792,
                    "stop" : 1525619796
                },
                "type" : "incr"
            },
            {
                "archive" : {
                    "start" : "000000020000000000000007",
                    "stop" : "000000020000000000000007"
                },
                "backrest" : {
                    "format" : 5,
                    "version" : "2.02"
                },
                "database" : {
                    "id" : 1
                },
                "info" : {
                    "delta" : 8428,
                    "repository" : {
                        "delta" : 400,
                        "size" : 2389280
                    },
                    "size" : 20162900
                },
                "label" : "20180506-151611F_20180506-151637I",
                "prior" : "20180506-151611F_20180506-151632I",
                "reference" : [
                    "20180506-151611F",
                    "20180506-151611F_20180506-151632I"
                ],
                "timestamp" : {
                    "start" : 1525619797,
                    "stop" : 1525619800
                },
                "type" : "incr"
            },
            {
                "archive" : {
                    "start" : "000000020000000000000009",
                    "stop" : "000000020000000000000009"
                },
                "backrest" : {
                    "format" : 5,
                    "version" : "2.02"
                },
                "database" : {
                    "id" : 1
                },
                "info" : {
                    "delta" : 8428,
                    "repository" : {
                        "delta" : 400,
                        "size" : 2389280
                    },
                    "size" : 20162900
                },
                "label" : "20180506-151611F_20180506-151645I",
                "prior" : "20180506-151611F_20180506-151637I",
                "reference" : [
                    "20180506-151611F",
                    "20180506-151611F_20180506-151632I"
                ],
                "timestamp" : {
                    "start" : 1525619805,
                    "stop" : 1525619810
                },
                "type" : "incr"
            }
        ],
        "db" : [
            {
                "id" : 1,
                "system-id" : 6552486958504244113,
                "version" : "9.4"
            }
        ],
        "name" : "demo",
        "status" : {
            "code" : 0,
            "message" : "ok"
        }
    }
]
```

## In PostgreSQL

The PostgreSQL `COPY` command allows pgBackRest info to be loaded into a table. The following example wraps that logic in a function that can be used to perform real-time queries.

```bash
# pg-primary ⇒ Load pgBackRest info function for PostgreSQL
sudo -u postgres cat \
       /home/postgres/pgbackrest/doc/example/pgsql-pgbackrest-info.sql
-- An example of monitoring pgBackRest from within PostgresSQL
--
-- Use copy to export data from the pgBackRest info command into the jsonb
-- type so it can be queried directly by PostgresSQL.

-- Create monitor schema
create schema monitor;

-- Get pgBackRest info in JSON format
create function monitor.pgbackrest_info()
    returns jsonb AS $$
declare
    data jsonb;
begin
    -- Create a temp table to hold the JSON data
    create temp table temp_pgbackrest_data (data jsonb);

    -- Copy data into the table directory from the pgBackRest into command
    copy temp_pgbackrest_data (data)
        from program
            'pgbackrest --output=json info | tr ''\n'' '' ''' (format text);

    select temp_pgbackrest_data.data
      into data
      from temp_pgbackrest_data;

    drop table temp_pgbackrest_data;

    return data;
end $$ language plpgsql;
sudo -u postgres psql -f \
       /home/postgres/pgbackrest/doc/example/pgsql-pgbackrest-info.sql
```

Now the `monitor.pgbackrest_info()` function can be used to determine the last successful backup time and archived WAL for a stanza.

```bash
pg-primary ⇒ Query last successful backup time and archived WAL
sudo -u postgres cat \
       /home/postgres/pgbackrest/doc/example/pgsql-pgbackrest-query.sql
-- Get last successful backup for each stanza
--
-- Requires the monitor.pgbackrest_info function.
with stanza as
(
    select data->'name' as name,
           data->'backup'->(
               jsonb_array_length(data->'backup') - 1) as last_backup,
           data->'archive'->(
               jsonb_array_length(data->'archive') - 1) as current_archive
      from jsonb_array_elements(monitor.pgbackrest_info()) as data
)
select name,
       to_timestamp(
           (last_backup->'timestamp'->>'stop')::numeric) as last_successful_backup,
       current_archive->>'max' as last_archived_wal
  from stanza;
sudo -u postgres psql -f \
       /home/postgres/pgbackrest/doc/example/pgsql-pgbackrest-query.sql
  name  | last_successful_backup |    last_archived_wal     
--------+------------------------+--------------------------
 "demo" | 2018-05-06 15:16:50+00 | 000000020000000000000009
(1 row)
```

## Using jq

[`jq`](https://stedolan.github.io/jq/) is a command-line utility that can easily extract data from JSON.

```bash
# pg-primary ⇒ Install jq utility
sudo apt-get install jq
```

Now `jq` can be used to query the last successful backup time for a stanza.

```bash
# pg-primary ⇒ Query last successful backup time
sudo -u postgres pgbackrest --output=json --stanza=demo info | \
       jq '.[0] | .backup[-1] | .timestamp.stop'
1525619810
```

Or the last archived WAL.

```bash
# pg-primary ⇒ Query last archived WAL
sudo -u postgres pgbackrest --output=json --stanza=demo info | \
       jq '.[0] | .archive[-1] | .max'
"000000020000000000000009"
```

Note that this syntax requires `jq` v1.5.
