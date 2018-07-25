(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{181:function(a,t,e){"use strict";e.r(t);var n=e(0),s=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"stanza-upgrade"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#stanza-upgrade","aria-hidden":"true"}},[a._v("#")]),a._v(" stanza-upgrade")]),e("div",{staticClass:"warning custom-block"},[e("p",{staticClass:"custom-block-title"},[a._v("NOTE:")]),e("p",[a._v("Immediately after upgrading PostgreSQL to a newer major version, the "),e("code",[a._v("pg-path")]),a._v(" for all pgBackRest configurations must be set to the new database location and the stanza-upgrade run on the repository host.")])]),e("p",[a._v("If the database is offline use the "),e("code",[a._v("--no-online")]),a._v(" option.")]),e("h2",{attrs:{id:"backup-standby"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#backup-standby","aria-hidden":"true"}},[a._v("#")]),a._v(" --backup-standby")]),e("p",[a._v("Backup from the standby cluster.")]),e("p",[a._v("Enable backup from standby to reduce load on the primary cluster. This option requires that both the primary and standby hosts be configured.")]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("default: n\nexample: --backup-standby\n")])])]),e("h2",{attrs:{id:"online"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#online","aria-hidden":"true"}},[a._v("#")]),a._v(" --online")]),e("p",[a._v("Update an online cluster.")]),e("p",[a._v("Specifying "),e("code",[a._v("--no-online")]),a._v(" prevents pgBackRest from connecting to PostgreSQL when upgrading the stanza.")]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("default: y\nexample: --no-online\n")])])])])}],!1,null,null,null);t.default=s.exports}}]);