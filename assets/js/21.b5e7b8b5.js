(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{179:function(e,t,s){"use strict";s.r(t);var a=s(0),r=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"stop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stop","aria-hidden":"true"}},[e._v("#")]),e._v(" stop")]),s("p",[e._v("Does not allow any new pgBackRest processes to run. By default running processes will be allowed to complete successfully. Use the "),s("code",[e._v("--force")]),e._v(" option to terminate running processes.")]),s("p",[e._v("pgBackRest processes will return an error if they are run after the stop command completes.")]),s("h2",{attrs:{id:"force"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#force","aria-hidden":"true"}},[e._v("#")]),e._v(" --force")]),s("p",[e._v("Force all pgBackRest processes to stop.")]),s("p",[e._v("This option will send "),s("code",[e._v("TERM")]),e._v(" signals to all running pgBackRest processes to effect a graceful but immediate shutdown. Note that this will also shutdown processes that were initiated on another system but have remotes running on the current system. For instance, if a backup was started on the backup server then running "),s("code",[e._v("stop --force")]),e._v(" on the database server will shutdown the backup process on the backup server.")]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("default: n\nexample: --force\n")])])])])}],!1,null,null,null);t.default=r.exports}}]);