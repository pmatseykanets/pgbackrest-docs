(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{176:function(e,a,t){"use strict";t.r(a);var i=t(0),r=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"archive"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#archive","aria-hidden":"true"}},[e._v("#")]),e._v(" archive")]),t("h2",{attrs:{id:"archive-async"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#archive-async","aria-hidden":"true"}},[e._v("#")]),e._v(" archive-async")]),t("p",[e._v("Push/get WAL segments asynchronously.")]),t("p",[e._v("Enables asynchronous operation for the "),t("code",[e._v("archive-push")]),e._v(" and "),t("code",[e._v("archive-get")]),e._v(" commands.")]),t("p",[e._v("Asynchronous operation is more efficient because it can reuse connections and take advantage of parallelism. See the "),t("code",[e._v("spool-path")]),e._v(", "),t("code",[e._v("archive-get-queue-max")]),e._v(", and "),t("code",[e._v("archive-push-queue-max")]),e._v(" options for more information.")]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("default: n\nexample: archive-async=y\n")])])]),t("h2",{attrs:{id:"archive-get-queue-max"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#archive-get-queue-max","aria-hidden":"true"}},[e._v("#")]),e._v(" archive-get-queue-max")]),t("p",[e._v("Maximum size of the pgBackRest archive-get queue.")]),t("p",[e._v("Specifies the maximum size of the archive-get queue when "),t("code",[e._v("archive-async")]),e._v(" is enabled. The queue is stored in the spool-path and is used to speed providing WAL to PostgreSQL.")]),t("p",[e._v("Size can be entered in bytes (default) or KB, MB, GB, TB, or PB where the multiplier is a power of 1024.")]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("default: 134217728\nallowed: 0-4503599627370496\nexample: archive-get-queue-max=1073741824\n")])])]),t("h2",{attrs:{id:"archive-push-queue-max"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#archive-push-queue-max","aria-hidden":"true"}},[e._v("#")]),e._v(" archive-push-queue-max")]),t("p",[e._v("Maximum size of the PostgreSQL archive queue.")]),t("p",[e._v("After the limit is reached, the following will happen:")]),t("ul",[t("li",[e._v("pgBackRest will notify PostgreSQL that the WAL was successfully archived, then "),t("code",[e._v("DROP IT")]),e._v(".")]),t("li",[e._v("A warning will be output to the Postgres log.")])]),t("p",[e._v("If this occurs then the archive log stream will be interrupted and PITR will not be possible past that point. A new backup will be required to regain full restore capability.")]),t("p",[e._v("In asynchronous mode the entire queue will be dropped to prevent spurts of WAL getting through before the queue limit is exceeded again.")]),t("p",[e._v("The purpose of this feature is to prevent the log volume from filling up at which point Postgres will stop completely. Better to lose the backup than have PostgreSQL go down.")]),t("p",[e._v("Size can be entered in bytes (default) or KB, MB, GB, TB, or PB where the multiplier is a power of 1024.")]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("allowed: 0-4503599627370496\nexample: archive-push-queue-max=1GB\nDeprecated Name: archive-queue-max\n")])])]),t("h2",{attrs:{id:"archive-timeout"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#archive-timeout","aria-hidden":"true"}},[e._v("#")]),e._v(" archive-timeout")]),t("p",[e._v("Archive timeout.")]),t("p",[e._v("Set maximum time, in seconds, to wait for each WAL segment to reach the pgBackRest archive repository. The timeout applies to the check and backup commands when waiting for WAL segments required for backup consistency to be archived.")]),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("default: 60\nallowed: 0.1-86400\nexample: archive-timeout=30\n")])])])])}],!1,null,null,null);a.default=r.exports}}]);