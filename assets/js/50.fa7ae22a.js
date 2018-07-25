(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{202:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"upgrading-postgresql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#upgrading-postgresql","aria-hidden":"true"}},[t._v("#")]),t._v(" Upgrading PostgreSQL")]),a("p",[t._v("Immediately after upgrading PostgreSQL to a newer major version, the "),a("code",[t._v("pg-path")]),t._v(" for all pgBackRest configurations must be set to the new database location and the "),a("code",[t._v("stanza-upgrade")]),t._v(" run on the repository host. If the database is offline use the "),a("code",[t._v("--no-online")]),t._v(" option.")]),a("div",{staticClass:"warning custom-block"},[a("p",{staticClass:"custom-block-title"},[t._v("NOTE:")]),a("p",[t._v("The following instructions are not meant to be a comprehensive guide for upgrading PostgreSQL, rather they outline the general process for upgrading a primary and standby with the intent of demonstrating the steps required to reconfigure pgBackRest. It is recommended that a backup be taken prior to upgrading.")])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Stop old cluster and install new PostgreSQL version")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo stop\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" postgresql-9.5\n")])])]),a("p",[t._v("Stop the old cluster on the standby since it will be restored from the newly upgraded cluster.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-standby ⇒ Stop old cluster and install new PostgreSQL version")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo stop\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" postgresql-9.5\n")])])]),a("p",[t._v("Create the new cluster and perform upgrade.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Create new cluster and perform the upgrade")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres /usr/lib/postgresql/9.5/bin/initdb \\\n       -D /var/lib/postgresql/9.5/demo -k -A peer\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_createcluster 9.5 demo\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres sh -c "),a("span",{attrs:{class:"token string"}},[t._v('\'cd /var/lib/postgresql && \\\n       /usr/lib/postgresql/9.5/bin/pg_upgrade \\\n       --old-bindir=/usr/lib/postgresql/9.4/bin \\\n       --new-bindir=/usr/lib/postgresql/9.5/bin \\\n       --old-datadir=/var/lib/postgresql/9.4/demo \\\n       --new-datadir=/var/lib/postgresql/9.5/demo \\\n       --old-options=" -c config_file=/etc/postgresql/9.4/demo/postgresql.conf" \\\n       --new-options=" -c config_file=/etc/postgresql/9.5/demo/postgresql.conf"\'')]),t._v("\n       "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filtered 68 lines of output"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nCreating script to delete old cluster                       ok\nUpgrade Complete\n----------------\nOptimizer statistics are not transferred by pg_upgrade so,\n       "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filtered 4 lines of output"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("p",[t._v("Configure the new cluster settings and port.")]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# pg-primary:/etc/postgresql/9.5/demo/postgresql.conf ⇒ Configure PostgreSQL\n"),a("span",{attrs:{class:"token constant"}},[t._v("archive_command")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" 'pgbackrest --stanza=demo archive-push %p'")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("archive_mode")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" on")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("listen_addresses")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" '*'")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("log_line_prefix")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" ''")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("max_wal_senders")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" 3")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("port")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" 5432")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("wal_level")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" hot_standby")]),t._v("\n")])])]),a("p",[t._v("Update the pgBackRest configuration on all systems to point to the new cluster.")]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade the pg1-path\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("archive-async")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("log-level-file")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("detail")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("repository")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("spool-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/spool/pgbackrest")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global:archive-get]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global:archive-push]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n")])])]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# pg-standby:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade the pg-path\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("recovery-option")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("standby_mode=on")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("recovery-option")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("primary_conninfo=host=172.17.0.3 port=5432 user=replicator")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("archive-async")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("log-level-file")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("detail")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("repository")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("spool-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/spool/pgbackrest")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global:archive-get]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global:archive-push]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n")])])]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Upgrade pg1-path and pg2-path, disable backup from standby\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("pg-primary")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host-user")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("postgres")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("pg-standby")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-host-user")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("postgres")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("backup-standby")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("n")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("3")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/pgbackrest")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-retention-full")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("start-fast")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Copy hba configuration")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("cp")]),t._v(" /etc/postgresql/9.4/demo/pg_hba.conf \\\n       /etc/postgresql/9.5/demo/pg_hba.conf\n")])])]),a("p",[t._v("Before starting the new cluster, the stanza-upgrade command must be run on the server where the pgBackRest repository is located.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Upgrade the stanza")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --no-online \\\n       --log-level-console"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("info stanza-upgrade\nP00   INFO: stanza-upgrade "),a("span",{attrs:{class:"token function"}},[t._v("command")]),t._v(" begin 2.02: --no-backup-standby --log-level-console"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("info --log-level-stderr"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("off --no-log-timestamp --no-online --pg1-host"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("pg-primary --pg2-host"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("pg-standby --pg1-host-user"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("postgres --pg2-host-user"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("postgres --pg1-path"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo --pg2-path"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo --repo1-path"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("/var/lib/pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo\nP00   INFO: stanza-upgrade "),a("span",{attrs:{class:"token function"}},[t._v("command")]),t._v(" end: completed successfully\n")])])]),a("p",[t._v("Start the new cluster and confirm it is successfully installed.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Start new cluster")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.5 demo start\n")])])]),a("p",[t._v("Test configuration using the check command.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Check configuration")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pg_lsclusters\nVer Cluster Port Status Owner    Data directory               Log "),a("span",{attrs:{class:"token function"}},[t._v("file")]),t._v("\n9.4 demo    5432 down   postgres /var/lib/postgresql/9.4/demo /var/log/postgresql/postgresql-9.4-demo.log\n9.5 demo    5432 online postgres /var/lib/postgresql/9.5/demo /var/log/postgresql/postgresql-9.5-demo.log\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo check\n")])])]),a("p",[t._v("Remove the old cluster.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Remove old cluster")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_dropcluster 9.4 demo\n")])])]),a("p",[t._v("Install the new PostgreSQL binaries on the standby and create the cluster.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-standby ⇒ Remove old cluster and create the new cluster")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_dropcluster 9.4 demo\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_createcluster 9.5 demo\n")])])]),a("p",[t._v("Run the check on the repository host. The warning regarding the standby being down is expected since the standby cluster is down. Running this command demonstrates that the repository server is aware of the standby and is configured properly for the primary server.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Check configuration")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo check\nP00   WARN: "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("056"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v(": raised from remote process on "),a("span",{attrs:{class:"token string"}},[t._v("'pg-standby'")]),a("span",{attrs:{class:"token keyword"}},[t._v(":")]),t._v(" could not connect to server: No such "),a("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" or directory\n            \tIs the server running locally and accepting\n            \tconnections on Unix domain socket "),a("span",{attrs:{class:"token string"}},[t._v('"/var/run/postgresql/.s.PGSQL.5432"')]),t._v("?\n")])])]),a("p",[t._v("Run a full backup on the new cluster and then restore the standby from the backup. The backup type will automatically be changed to full if incr or diff is requested.")]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Run a full backup")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --type"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("full backup\npg-standby ⇒ Restore the demo standby cluster\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --delta restore\n")])])]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# pg-standby:/etc/postgresql/9.5/demo/postgresql.conf ⇒ Configure PostgreSQL\n"),a("span",{attrs:{class:"token constant"}},[t._v("hot_standby")]),t._v(" "),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v(" on")]),t._v("\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-standby ⇒ Start PostgreSQL and check the pgBackRest configuration")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.5 demo start\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo check\n")])])]),a("p",[t._v("Backup from standby can be enabled now that the standby is restored.")]),a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Reenable backup from standby\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("pg-primary")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host-user")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("postgres")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("pg-standby")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-host-user")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("postgres")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg2-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.5/demo")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("backup-standby")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("process-max")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("3")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/pgbackrest")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-retention-full")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("start-fast")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n")])])])])}],!1,null,null,null);s.default=e.exports}}]);