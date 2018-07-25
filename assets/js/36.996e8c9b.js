(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{164:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("The configuration described in Quickstart is suitable for simple installations but for enterprise configurations it is more typical to have a dedicated repository host where the backups and WAL archive files are stored. This separates the backups and WAL archive from the database server so database host failures have less impact. It is still a good idea to employ traditional backup software to backup the repository host.")]),t._m(1),a("p",[t._v("A new host named repository is created to store the cluster backups.\nThe pgbackrest user is created to own the pgBackRest repository. Any user can own the repository but it is best not to use postgres (if it exists) to avoid confusion.")]),t._m(2),a("p",[t._v("pgBackRest is written in Perl which is included with Debian/Ubuntu by default. Some additional modules must also be installed but they are available as standard packages.")]),t._m(3),a("p",[t._v("Debian/Ubuntu packages for pgBackRest are available at "),a("a",{attrs:{href:"https://www.postgresql.org/download/linux/ubuntu/",target:"_blank",rel:"noopener noreferrer"}},[t._v("apt.postgresql.org"),a("OutboundLink")],1),t._v(". If they are not provided for your distribution/version it is easy to download the source and install manually.")]),t._m(4),t._m(5),t._m(6),t._m(7),a("p",[t._v("Although most of pgBackRest is written in Perl, the main executable is written in C. This allows certain time-critical commands (like async archive-push) to run more quickly.")]),t._m(8),t._m(9),t._m(10),a("p",[t._v("pgBackRest requires trusted (no password) SSH to enable communication between the hosts.")]),t._m(11),t._m(12),a("p",[t._v("Exchange keys between repository and pg-primary.")]),t._m(13),t._m(14),a("p",[t._v("Test that connections can be made from repository to pg-primary and vice versa.")]),t._m(15),t._m(16),a("p",[t._v("The repository host must be configured with the pg-primary host/user and database path. The primary will be configured as db1 to allow a standby to be added later.")]),t._m(17),a("p",[t._v("The database host must be configured with the repository host/user. The default for the repo1-host-user option is pgbackrest. If the postgres user does restores on the repository host it is best not to also allow the postgres user to perform backups. However, the postgres user can read the repository directly if it is in the same group as the pgbackrest user.")]),t._m(18),a("p",[t._v("Commands are run the same as on a single host configuration except that some commands such as backup and expire are run from the repository host instead of the database host.")]),a("p",[t._v("Create the stanza in the new repository.")]),t._m(19),a("p",[t._v("Check that the configuration is correct on both the database and repository hosts. More information about the check command can be found in Check the Configuration.")]),t._m(20),t._m(21),a("p",[t._v("To perform a backup of the PostgreSQL cluster run pgBackRest with the backup command on the repository host.")]),t._m(22),a("p",[t._v("Since a new repository was created on the repository host the warning about the incremental backup changing to a full backup was emitted.")]),t._m(23),a("p",[t._v("To perform a restore of the PostgreSQL cluster run pgBackRest with the restore command on the database host.")]),t._m(24),a("p",[t._v("A new backup must be performed due to the timeline switch.")]),t._m(25)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"dedicated-repository-host"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dedicated-repository-host","aria-hidden":"true"}},[this._v("#")]),this._v(" Dedicated Repository Host")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation","aria-hidden":"true"}},[this._v("#")]),this._v(" Installation")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# repository ⇒ Create pgbackrest")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" adduser --disabled-password --gecos "),s("span",{attrs:{class:"token string"}},[this._v('""')]),this._v(" pgbackrest\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Install required Perl packages")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" update\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v(" libdbd-pg-perl libio-socket-ssl-perl libxml-libxml-perl\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Download version 2.02 of pgBackRest")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("wget")]),t._v(" -q -O - \\\n       https://github.com/pgbackrest/pgbackrest/archive/release/2.02.tar.gz "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" \\\n       "),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("tar")]),t._v(" zx -C /root\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Install pgBackRest")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("cp")]),t._v(" -r /root/pgbackrest-release-2.02/lib/pgBackRest \\\n       /usr/share/perl5\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("find")]),t._v(" /usr/share/perl5/pgBackRest -type f -exec "),a("span",{attrs:{class:"token function"}},[t._v("chmod")]),t._v(" 644 "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" +\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("find")]),t._v(" /usr/share/perl5/pgBackRest -type d -exec "),a("span",{attrs:{class:"token function"}},[t._v("chmod")]),t._v(" 755 "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" +\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -m 770 /var/log/pgbackrest\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("chown")]),t._v(" pgbackrest:pgbackrest /var/log/pgbackrest\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" /etc/pgbackrest\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" /etc/pgbackrest/conf.d\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("touch")]),t._v(" /etc/pgbackrest/pgbackrest.conf\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("chmod")]),t._v(" 640 /etc/pgbackrest/pgbackrest.conf\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("chown")]),t._v(" pgbackrest:pgbackrest /etc/pgbackrest/pgbackrest.conf\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("pgBackRest requires a companion C library that enhances performance and enables the "),s("code",[this._v("checksum-page")]),this._v(" option and encryption. Pre-built packages are generally a better option than building the C library manually but the steps required are given below for completeness. Depending on the distribution a number of packages may be required which will not be enumerated here.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Build and Install C Library")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" sh -c "),a("span",{attrs:{class:"token string"}},[t._v("'cd /root/pgbackrest-release-2.02/libc && \\\n       perl Makefile.PL INSTALLMAN1DIR=none INSTALLMAN3DIR=none'")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("make")]),t._v(" -C /root/pgbackrest-release-2.02/libc "),a("span",{attrs:{class:"token function"}},[t._v("test")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("make")]),t._v(" -C /root/pgbackrest-release-2.02/libc "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Build and Install Binary")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("make")]),t._v(" -C /root/pgbackrest-release-2.02/src\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("make")]),t._v(" -C /root/pgbackrest-release-2.02/src "),a("span",{attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Create the pgBackRest repository")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -p /var/lib/pgbackrest\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("chmod")]),t._v(" 750 /var/lib/pgbackrest\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("chown")]),t._v(" pgbackrest:pgbackrest /var/lib/pgbackrest\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"setup-trusted-ssh"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setup-trusted-ssh","aria-hidden":"true"}},[this._v("#")]),this._v(" Setup Trusted SSH")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Create repository host key pair")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -m 750 /home/pgbackrest/.ssh\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest ssh-keygen -f /home/pgbackrest/.ssh/id_rsa \\\n       -t rsa -b 4096 -N "),a("span",{attrs:{class:"token string"}},[t._v('""')]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Create pg-primary host key pair")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres "),a("span",{attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" -m 750 -p /home/postgres/.ssh\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres ssh-keygen -f /home/postgres/.ssh/id_rsa \\\n       -t rsa -b 4096 -N "),a("span",{attrs:{class:"token string"}},[t._v('""')]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Copy pg-primary public key to repository")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("ssh")]),t._v(" root@pg-primary "),a("span",{attrs:{class:"token function"}},[t._v("cat")]),t._v(" /home/postgres/.ssh/id_rsa.pub "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" \\\n       "),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest "),a("span",{attrs:{class:"token function"}},[t._v("tee")]),t._v(" -a /home/pgbackrest/.ssh/authorized_keys\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Copy repository public key to pg-primary")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("ssh")]),t._v(" root@repository "),a("span",{attrs:{class:"token function"}},[t._v("cat")]),t._v(" /home/pgbackrest/.ssh/id_rsa.pub "),a("span",{attrs:{class:"token operator"}},[t._v("|")]),t._v(" \\\n       "),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres "),a("span",{attrs:{class:"token function"}},[t._v("tee")]),t._v(" -a /home/postgres/.ssh/authorized_keys\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# repository ⇒ Test connection from repository to pg-primary")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest "),a("span",{attrs:{class:"token function"}},[t._v("ssh")]),t._v(" postgres@pg-primary\npg-primary ⇒ Test connection from pg-primary to repository\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres "),a("span",{attrs:{class:"token function"}},[t._v("ssh")]),t._v(" pgbackrest@repository\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration","aria-hidden":"true"}},[this._v("#")]),this._v(" Configuration")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# repository:/etc/pgbackrest/pgbackrest.conf ⇒ Configure pg1-host/pg1-host-user and pg1-path\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("pg-primary")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-host-user")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("postgres")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.4/demo")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/pgbackrest")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-retention-full")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("2")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("start-fast")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("y")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-ini extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ini"}},[a("code",[t._v("# pg-primary:/etc/pgbackrest/pgbackrest.conf ⇒ Configure repo1-host/repo1-host-user\n"),a("span",{attrs:{class:"token selector"}},[t._v("[demo]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("pg1-path")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("/var/lib/postgresql/9.4/demo")]),t._v("\n\n"),a("span",{attrs:{class:"token selector"}},[t._v("[global]")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("log-level-file")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("detail")]),t._v("\n"),a("span",{attrs:{class:"token constant"}},[t._v("repo1-host")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),t._v("repository")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# repository ⇒ Create the stanza")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u pgbackrest pgbackrest --stanza"),s("span",{attrs:{class:"token operator"}},[this._v("=")]),this._v("demo stanza-create\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Check the configuration")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo check\nrepository ⇒ Check the configuration\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u pgbackrest pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo check\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"perform-a-backup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#perform-a-backup","aria-hidden":"true"}},[this._v("#")]),this._v(" Perform a Backup")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# repository ⇒ Backup the demo cluster")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u pgbackrest pgbackrest --stanza"),s("span",{attrs:{class:"token operator"}},[this._v("=")]),this._v("demo backup\nP00   WARN: no prior backup exists, incr backup has been changed to full\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"restore-a-backup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#restore-a-backup","aria-hidden":"true"}},[this._v("#")]),this._v(" Restore a Backup")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("# pg-primary ⇒ Stop the demo cluster, restore, and restart PostgreSQL")]),t._v("\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo stop\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" -u postgres pgbackrest --stanza"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("demo --delta restore\n"),a("span",{attrs:{class:"token function"}},[t._v("sudo")]),t._v(" pg_ctlcluster 9.4 demo start\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{attrs:{class:"token comment"}},[this._v("# repository ⇒ Backup the demo cluster")]),this._v("\n"),s("span",{attrs:{class:"token function"}},[this._v("sudo")]),this._v(" -u pgbackrest pgbackrest --stanza"),s("span",{attrs:{class:"token operator"}},[this._v("=")]),this._v("demo backup\n")])])])}],!1,null,null,null);s.default=n.exports}}]);