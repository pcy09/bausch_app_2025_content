(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9951],{37038:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var n=r(11163),l=r(24295);r(82451),r(1131);var a=r(28465);r(45673);var o=r(8448),u=r(59499),i=r(4730);r(75314);var c=r(11187),d=r(17621),p=r(87536),s=r(47255);r(77809);var f=r(24969),h=r(88484),b=r(67294),v=r(60099);r(36368);var Z=r(94386),m=["ref","value"],y=["ref","value"],w=["ref","value"],_=["ref","value"],S=["ref","value"];function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){(0,u.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var g=[{id:1,value:"point",label:"BAUSCH POINT"},{id:2,value:"app",label:"BAUSCH APP"}],O=[{id:1,value:"N",label:"미발행"},{id:2,value:"Y",label:"발행"}],SupportNewsTemplate_SupportNewsDetailTemplate=function(){var e=(0,b.useState)([]),t=e[0],r=e[1],l=(0,n.useRouter)(),u=(0,p.cI)({}),j=(u.register,u.handleSubmit),T=u.control,N=(u.setValue,u.formState.errors,u.watch),handleAddData=function(e){console.log(e)},handleError=function(e){console.log(e)};(0,Z.BX)("div",{children:[(0,Z.tZ)(f.Z,{}),(0,Z.tZ)("div",{style:{marginTop:8},children:"Upload"})]});var E=N("pro_channel","point");return(0,Z.BX)(Z.HY,{children:[(0,Z.tZ)(s.Z,{title:"\uD83D\uDC49\uD83C\uDFFCPOINT site, LESLY site, App 채널에 바슈롬 소식을 등록하는 뉴스 등록 페이지입니다."}),(0,Z.tZ)(d.n,{border:!1}),(0,Z.BX)(d.l0,{onSubmit:j(function(e){handleAddData(e),l.push("/admin/support/news")},function(e){return handleError(e)}),children:[(0,Z.tZ)(d._L,{size:"default",bordered:!1,children:(0,Z.BX)(o.default,{labelStyle:{width:"250px"},bordered:!0,column:4,children:[(0,Z.tZ)(o.default.Item,{span:4,label:"채널 ⭐️",children:(0,Z.tZ)(p.Qr,{name:"pro_channel",control:T,defaultValue:"point",render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,i.Z)(t,m);return e.fieldState,(0,Z.tZ)(d.Tr,_objectSpread({options:g,value:r},n))},rules:{required:!0}})}),(0,Z.tZ)(o.default.Item,{span:4,label:"뉴스 제목 ⭐️",children:(0,Z.tZ)(p.Qr,{name:"pro_title",control:T,render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,i.Z)(t,y);return e.fieldState,(0,Z.tZ)(d.kq,_objectSpread({type:"text",placeholder:"프로모션명을 입력해주세요",value:r||null},n))}})}),(0,Z.tZ)(o.default.Item,{span:4,label:"뉴스 내용 ⭐️",children:(0,Z.tZ)(p.Qr,{name:"pro_subTitle",control:T,render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,i.Z)(t,w);return e.fieldState,(0,Z.tZ)(d.FF,_objectSpread({height:100,value:r||null,placeholder:"뉴스 내용에 대한 설명을 작성해주세요"},n))}})}),(0,Z.tZ)(o.default.Item,{span:4,label:"관련 링크",children:(0,Z.tZ)(p.Qr,{name:"pro_memo",control:T,defaultValue:"",render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,i.Z)(t,_);return e.fieldState,(0,Z.tZ)(d.kq,_objectSpread({type:"text",placeholder:"https://",value:r||null},n))}})}),"point"===E&&(0,Z.tZ)(o.default.Item,{span:4,label:"파일 첨부",children:(0,Z.BX)(a.Z,{maxCount:5,fileList:t,beforeUpload:function(e){"image/jpeg"===e.type||e.type;var t=e.size/1024/1024<1;return console.log(t,"isLt2MisLt2M"),t||(console.log("여기 나오누?"),c.default.error("파일 업로드 실패:용량 초과")),t},children:[(0,Z.tZ)(d.EK,{onChange:function(e){return r(e.fileList)},type:"dashed",icon:(0,Z.tZ)(h.Z,{}),name:"Upload"}),(0,Z.tZ)("span",{css:v.xA,children:"*파일 용량은 20MB까지 가능합니다. "})]})}),(0,Z.tZ)(o.default.Item,{span:2,label:"발행 여부 ⭐️",children:(0,Z.tZ)(p.Qr,{name:"pro_subTitle",control:T,defaultValue:"Y",render:function(e){var t=e.field,r=(t.ref,t.value);return(0,i.Z)(t,S),e.fieldState,(0,Z.tZ)(d.Tr,{options:O,value:r})},rules:{required:!0}})})]})}),(0,Z.tZ)(d.n,{border:!1}),(0,Z.tZ)(d._L,{children:(0,Z.tZ)(d.sw,{justify:"space-between",children:(0,Z.BX)(d.z2,{span:24,css:v.eg,children:[(0,Z.BX)("div",{children:[(0,Z.tZ)(d.EK,{type:"default",name:"이전",htmlType:"button",css:(0,v.g4)(5),onClick:function(){return l.push("/admin/support/news")}}),(0,Z.tZ)(d.EK,{type:"danger",name:"삭제",htmlType:"button",css:(0,v.g4)(5),onClick:function(){return l.push("/users")}})]}),(0,Z.tZ)("div",{children:(0,Z.tZ)(d.EK,{type:"primary",name:"수정하기",htmlType:"submit",css:(0,v.Lh)(5)})})]})})})]})]})},NewsDetail=function(){var e=(0,n.useRouter)();return e.query,e.back,e.push,(0,Z.tZ)(Z.HY,{children:(0,Z.tZ)(SupportNewsTemplate_SupportNewsDetailTemplate,{})})};NewsDetail.getLayout=function(e){return(0,Z.tZ)(l.L,{children:e})};var j=NewsDetail},75419:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/support/news/[id]",function(){return r(37038)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=75419)}),_N_E=e.O()}]);