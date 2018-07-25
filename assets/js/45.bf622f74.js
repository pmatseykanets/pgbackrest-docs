(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{155:function(t,s,e){"use strict";e.r(s);var a=e(0),n=Object(a.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[t._m(0),e("p",[t._v("The Restore section introduces additional restore command features.")]),t._m(1),e("p",[e("router-link",{attrs:{to:"/guide/quick_start.html#restore_a_backup"}},[t._v("Restore a Backup")]),t._v(" in "),e("router-link",{attrs:{to:"/guide/quick_start.html"}},[t._v("Quick Start")]),t._v(" required the database cluster directory to be cleaned before the restore could be performed. The delta option allows pgBackRest to automatically determine which files in the database cluster directory can be preserved and which ones need to be restored from the backup — it also removes files not present in the backup manifest so it will dispose of divergent changes. This is accomplished by calculating a "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/SHA-1",target:"_blank",rel:"noopener noreferrer"}},[t._v("SHA-1"),e("OutboundLink")],1),t._v(" cryptographic hash for each file in the database cluster directory. If the SHA-1 hash does not match the hash stored in the backup then that file will be restored. This operation is very efficient when combined with the process-max option. Since the PostgreSQL server is shut down during the restore, a larger number of processes can be used than might be desirable during a backup when the PostgreSQL server is running.")],1),t._m(2),t._m(3),t._m(4),e("p",[t._v("There may be cases where it is desirable to selectively restore specific databases from a cluster backup. This could be done for performance reasons or to move selected databases to a machine that does not have enough space to restore the entire cluster backup.")]),e("p",[t._v("To demonstrate this feature two databases are created: test1 and test2. A fresh backup is run so pgBackRest is aware of the new databases.")]),t._m(5),e("p",[t._v("Each test database will be seeded with tables and data to demonstrate that recovery works with selective restore.")]),t._m(6),e("p",[t._v("One of the main reasons to use selective restore is to save space. The size of the test1 database is shown here so it can be compared with the disk utilization after a selective restore.")]),t._m(7),t._m(8),t._m(9),e("p",[t._v("Once recovery is complete the test2 database will contain all previously created tables and data.")]),t._m(10),e("p",[t._v("The test1 database, despite successful recovery, is not accessible. This is because the entire database was restored as sparse, zeroed files. PostgreSQL can successfully apply WAL on the zeroed files but the database as a whole will not be valid because key files contain no data. This is purposeful to prevent the database from being accidentally used when it might contain partial data that was applied during WAL replay.")]),t._m(11),e("p",[t._v("Since the test1 database is restored with sparse, zeroed files it will only require as much space as the amount of WAL that is written during recovery. While the amount of WAL generated during a backup and applied during recovery can be significant it will generally be a small fraction of the total database size, especially for large databases where this feature is most likely to be useful.")]),e("p",[t._v("It is clear that the test1 database uses far less disk space during the selective restore than it would have if the entire database had been restored.")]),t._m(12),e("p",[t._v("At this point the only action that can be taken on the invalid test1 database is drop database. pgBackRest does not automatically drop the database since this cannot be done until recovery is complete and the cluster is accessible.")]),t._m(13),e("p",[t._v("Now that the invalid test1 database has been dropped only the test2 and built-in databases remain.")]),t._m(14)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"restore"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restore","aria-hidden":"true"}},[this._v("#")]),this._v(" Restore")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"delta-option"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delta-option","aria-hidden":"true"}},[this._v("#")]),this._v(" Delta Option")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Stop the demo cluster, perform delta restore")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo stop\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --delta \\\n       --log-level-console"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("detail restore\n       "),e("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filtered 692 lines of output"),e("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/base/12134/PG_VERSION - exists and matches backup "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("4B, 99%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/base/1/PG_VERSION - exists and matches backup "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("4B, 99%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/PG_VERSION - exists and matches backup "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("4B, 100%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" checksum 8dbabb96e032b8d9f1993c0e4b9141e71ade01a1\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/global/12086 - exists and is zero size "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0B, 100%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/global/12038 - exists and is zero size "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0B, 100%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n       "),e("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filtered 83 lines of output"),e("span",{attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nP01 DETAIL: restore "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" /var/lib/postgresql/9.4/demo/base/1/11885 - exists and is zero size "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0B, 100%"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nP00   INFO: "),e("span",{attrs:{class:"token function"}},[t._v("write")]),t._v(" /var/lib/postgresql/9.4/demo/recovery.conf\nP00   INFO: restore global/pg_control "),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("performed last to ensure aborted restores cannot be started"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nP00   INFO: restore "),e("span",{attrs:{class:"token function"}},[t._v("command")]),t._v(" end: completed successfully\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# pg-primary ⇒ Restart PostgreSQL")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" pg_ctlcluster 9.4 demo start\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"restore-selected-databases"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restore-selected-databases","aria-hidden":"true"}},[this._v("#")]),this._v(" Restore Selected Databases")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Create two test databases and perform a backup")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"create database test1;"')]),t._v("\nCREATE DATABASE\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"create database test2;"')]),t._v("\nCREATE DATABASE\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --type"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("incr backup\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Create a test table in each database")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"create table test1_table (id int); \\\n       insert into test1_table (id) values (1);"')]),t._v(" test1\nINSERT 0 1\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"create table test2_table (id int); \\\n       insert into test2_table (id) values (2);"')]),t._v(" test2\nINSERT 0 1\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[this._v("pg-primary ⇒ Show space used by test1 database\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u postgres "),s("span",{attrs:{class:"token function"}},[this._v("du")]),this._v(" -sh /var/lib/postgresql/9.4/demo/base/24576\n6.5M\t/var/lib/postgresql/9.4/demo/base/24576\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("Stop the cluster and restore only the "),e("code",[t._v("test2")]),t._v(" database. Built-in databases ("),e("code",[t._v("template0")]),t._v(", "),e("code",[t._v("template1")]),t._v(", and "),e("code",[t._v("postgres")]),t._v(") are always restored.")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Restore from last backup including only the test2 database")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo stop\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --delta \\\n       --db-include"),e("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("test2 restore\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo start\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Demonstrate that the test2 database was recovered")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"select * from test2_table;"')]),t._v(" test2\n "),e("span",{attrs:{class:"token function"}},[t._v("id")]),t._v(" \n----\n  2\n"),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1 row"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("pg-primary ⇒ Attempting to connect to the test1 database will produce an error\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"select * from test1_table;"')]),t._v(" test1\npsql: FATAL:  relation mapping "),e("span",{attrs:{class:"token function"}},[t._v("file")]),t._v(" "),e("span",{attrs:{class:"token string"}},[t._v('"base/24576/pg_filenode.map"')]),t._v(" contains invalid data\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# pg-primary ⇒ Show space used by test1 database after recovery")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u postgres "),s("span",{attrs:{class:"token function"}},[this._v("du")]),this._v(" -sh /var/lib/postgresql/9.4/demo/base/24576\n152K\t/var/lib/postgresql/9.4/demo/base/24576\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# pg-primary ⇒ Drop the test1 database")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u postgres psql -c "),s("span",{attrs:{class:"token string"}},[this._v('"drop database test1;"')]),this._v("\nDROP DATABASE\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ List remaining databases")]),t._v("\n"),e("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres psql -c "),e("span",{attrs:{class:"token string"}},[t._v('"select oid, datname from pg_database order by oid;"')]),t._v("\n  oid  "),e("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v("  datname  \n-------+-----------\n     1 "),e("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" template1\n 12134 "),e("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" template0\n 12139 "),e("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" postgres\n 24577 "),e("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" test2\n"),e("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("4 rows"),e("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])}],!1,null,null,null);s.default=n.exports}}]);