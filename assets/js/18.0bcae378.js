(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{182:function(t,e,a){"use strict";a.r(e);var s=a(0),r=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"stanza-options"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stanza-options","aria-hidden":"true"}},[t._v("#")]),t._v(" Stanza Options")]),a("h2",{attrs:{id:"pg-path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#pg-path","aria-hidden":"true"}},[t._v("#")]),t._v(" --pg-path")]),a("p",[t._v("PostgreSQL data directory.")]),a("p",[t._v("This should be the same as the "),a("code",[t._v("data_directory")]),t._v(" setting in "),a("code",[t._v("postgresql.conf")]),t._v(". Even though this value can be read from postgresql.conf or PostgreSQL it is prudent to set it in case those resources are not available during a restore or offline backup scenario.")]),a("p",[t._v("The "),a("code",[t._v("pg-path")]),t._v(" option is tested against the value reported by PostgreSQL on every online backup so it should always be current.")]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("example: --pg1-path=/data/db\nDeprecated Name: db-path\n")])])])])}],!1,null,null,null);e.default=r.exports}}]);