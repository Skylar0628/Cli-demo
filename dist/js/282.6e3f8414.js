"use strict";(self["webpackChunkmy_project"]=self["webpackChunkmy_project"]||[]).push([[282],{5282:function(e,t,o){function s(e,t,o,s,c,n){return" dashboard "}o.r(t),o.d(t,{default:function(){return u}});o(4114);var c={created(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)MyToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=`${e}`;const t="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(t).then((e=>{e.data.success||this.$router.push("login"),console.log(e)})).catch((e=>{console.log(e)}))}},n=o(1241);const r=(0,n.A)(c,[["render",s]]);var u=r}}]);
//# sourceMappingURL=282.6e3f8414.js.map