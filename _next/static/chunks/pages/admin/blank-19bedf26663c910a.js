(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[278],{41982:function(e,n,t){"use strict";t.r(n);var o=t(16835),i=t(17621),a=t(67294),s=t(52820),d=t(94386);n.default=function(){var e=(0,s.Z)(["loginToken"]),n=(0,o.Z)(e,3),t=n[0],r=n[1],c=n[2],l=(0,a.useState)(),u=l[0],f=l[1],w=(0,a.useState)(),g=w[0],k=w[1];console.log("first"),(0,a.useEffect)(function(){return window.addEventListener("message",messageHandler),function(){window.removeEventListener("message",messageHandler)}},[]);var messageHandler=function(e){var n=e.data;console.log("event.data야!!!!!!!!!",n);try{var t=JSON.parse(n).data;console.log("Received token:",t),k(t),window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(JSON.stringify({ttt:t}))}catch(e){console.error("Failed to parse message:",e)}},sendTokenToApp=function(e,n){window.ReactNativeWebView?window.ReactNativeWebView.postMessage(JSON.stringify({action:e,token:n})):console.log("Not in React Native WebView environment")};return(0,a.useEffect)(function(){t.loginToken?f(t.loginToken):f()},[t]),(0,d.BX)(d.HY,{children:[(0,d.tZ)(i.EK,{name:"로그인",onClick:function(){var e="dddddddddddddd";r("loginToken",e,{path:"/"}),sendTokenToApp("LOGIN",e)}}),(0,d.tZ)("br",{}),(0,d.tZ)("p",{children:u}),(0,d.tZ)("br",{}),(0,d.BX)("p",{children:["receivedToken : ",g]}),(0,d.tZ)("br",{}),(0,d.tZ)(i.EK,{name:"로그아웃",onClick:function(){c("loginToken",{path:"/"}),sendTokenToApp("LOGOUT")}})]})}},38333:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/blank",function(){return t(41982)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=38333)}),_N_E=e.O()}]);