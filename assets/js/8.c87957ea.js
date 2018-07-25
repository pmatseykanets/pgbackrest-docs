(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{192:function(e,t,a){"use strict";a.r(t);var s=a(0),c=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"check"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#check","aria-hidden":"true"}},[e._v("#")]),e._v(" check")]),a("p",[e._v("The check command validates that pgBackRest and the a"),a("code",[e._v("rchive_command")]),e._v(" setting are configured correctly for archiving and backups. It detects misconfigurations, particularly in archiving, that result in incomplete backups because required WAL segments did not reach the archive. The command can be run on the database or the repository host. The command may also be run on the standby host, however, since "),a("code",[e._v("pg_switch_xlog()")]),e._v("/"),a("code",[e._v("pg_switch_wal()")]),e._v(" cannot be performed on the standby, the command will only test the repository configuration.")]),a("div",{staticClass:"tip custom-block"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE:")]),a("p",[e._v("Note that "),a("code",[e._v("pg_create_restore_point('pgBackRest Archive Check')")]),e._v(" and "),a("code",[e._v("pg_switch_xlog()")]),e._v("/"),a("code",[e._v("pg_switch_wal()")]),e._v(" are called to force PostgreSQL to archive a WAL segment. Restore points are only supported in PostgreSQL >= 9.1 so for older versions the "),a("code",[e._v("check")]),e._v(" command may fail if there has been no write activity since the last log rotation, therefore it is recommended that activity be generated by the user if there have been no writes since the last WAL switch before running the check command.")])]),a("h2",{attrs:{id:"archive-check"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#archive-check","aria-hidden":"true"}},[e._v("#")]),e._v(" --archive-check")]),a("p",[e._v("Check that WAL segments are in the archive before backup completes.")]),a("p",[e._v("Checks that all WAL segments required to make the backup consistent are present in the WAL archive. It's a good idea to leave this as the default unless you are using another method for archiving.")]),a("p",[e._v("This option must be enabled if "),a("code",[e._v("archive-copy")]),e._v(" is enabled.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: y\nexample: --no-archive-check\n")])])]),a("h2",{attrs:{id:"archive-timeout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#archive-timeout","aria-hidden":"true"}},[e._v("#")]),e._v(" --archive-timeout")]),a("p",[e._v("Archive timeout.")]),a("p",[e._v("Set maximum time, in seconds, to wait for each WAL segment to reach the pgBackRest archive repository. The timeout applies to the check and backup commands when waiting for WAL segments required for backup consistency to be archived.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: 60\nallowed: 0.1-86400\nexample: --archive-timeout=30\n")])])]),a("h2",{attrs:{id:"backup-standby"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backup-standby","aria-hidden":"true"}},[e._v("#")]),e._v(" --backup-standby")]),a("p",[e._v("Backup from the standby cluster.")]),a("p",[e._v("Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: n\nexample: --backup-standby\n")])])]),a("h2",{attrs:{id:"online"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#online","aria-hidden":"true"}},[e._v("#")]),e._v(" --online")]),a("p",[e._v("Check an online cluster.")]),a("p",[e._v("Specifying "),a("code",[e._v("--no-online")]),e._v(" prevents pgBackRest from connecting to PostgreSQL and will disable some checks.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: y\nexample: --no-online\n")])])])])}],!1,null,null,null);t.default=c.exports}}]);