(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4820],{28857:function(e,t,r){"use strict";var o=r(33227),n=r(88361),l=r(85971),i=r(52715),a=r(91193);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return p}});var u=r(38754),c=u._(r(67294)),s=u._(r(62268)),f={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function _getInitialProps(e){var t=e.res,r=e.err;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}var d={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}},p=function(e){l(Error,e);var t,r=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r=a(Error);if(t){var o=a(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return i(this,e)});function Error(){return o(this,Error),r.apply(this,arguments)}return n(Error,[{key:"render",value:function(){var e=this.props,t=e.statusCode,r=e.withDarkMode,o=this.props.title||f[t]||"An unexpected error has occurred";return c.default.createElement("div",{style:d.error},c.default.createElement(s.default,null,c.default.createElement("title",null,t?t+": "+o:"Application error: a client-side exception has occurred")),c.default.createElement("div",{style:d.desc},c.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(void 0===r||r?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),t?c.default.createElement("h1",{className:"next-error-h1",style:d.h1},t):null,c.default.createElement("div",{style:d.wrap},c.default.createElement("h2",{style:d.h2},this.props.title||t?o:c.default.createElement(c.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}]),Error}(c.default.Component);p.displayName="ErrorPage",p.getInitialProps=_getInitialProps,p.origGetInitialProps=_getInitialProps,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},81981:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_error",function(){return r(28857)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=81981)}),_N_E=e.O()}]);