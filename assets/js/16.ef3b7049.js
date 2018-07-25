(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{184:function(e,t,a){"use strict";a.r(t);var s=a(0),r=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"stanza-create"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stanza-create","aria-hidden":"true"}},[e._v("#")]),e._v(" stanza-create")]),a("p",[e._v("The stanza-create command must be run on the host where the repository is located after the stanza has been configured in "),a("code",[e._v("pgbackrest.conf")]),e._v(".")]),a("h2",{attrs:{id:"backup-standby"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backup-standby","aria-hidden":"true"}},[e._v("#")]),e._v(" --backup-standby")]),a("p",[e._v("Backup from the standby cluster.")]),a("p",[e._v("Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: n\nexample: --backup-standby\n")])])]),a("h2",{attrs:{id:"force"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#force","aria-hidden":"true"}},[e._v("#")]),e._v(" --force")]),a("p",[e._v("Force stanza creation.")]),a("div",{staticClass:"warning custom-block"},[a("p",{staticClass:"custom-block-title"},[e._v("CAUTION:")]),a("p",[e._v("Use "),a("code",[e._v("--force")]),e._v(" only as a last resort, when all else fails. If data is missing from the repository then the recreated .info files will likely be corrupt.")])]),a("p",[e._v("If the required stanza "),a("code",[e._v(".info")]),e._v(" files do not exist in the repository but backups or WAL segments do exist, then this option can be used to force the stanza to be created from the existing data in the repository. This is most likely to be useful after corruption or an incomplete restore of the repository from elsewhere.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: n\nexample: --no-force\n")])])]),a("h2",{attrs:{id:"online"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#online","aria-hidden":"true"}},[e._v("#")]),e._v(" --online")]),a("p",[e._v("Create on an online cluster.")]),a("p",[e._v("Specifying "),a("code",[e._v("--no-online")]),e._v(" prevents pgBackRest from connecting to PostgreSQL when creating the stanza.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("default: y\nexample: --no-online\n")])])])])}],!1,null,null,null);t.default=r.exports}}]);