(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7242],{88899:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var r=n(11163),l=n(24295);n(93936);var a=n(59499),u=n(4730);n(56120);var o=n(74253);n(45673);var i=n(8448),d=n(17621),c=n(87536),f=n(60099),s=n(67294),p=n(9473),v=n(40682);n(36368);var h=n(47255),m=n(94386),b=["ref","value"],y=["ref","value"],Z=["ref","value"],_=["ref","value"],S=["ref","value"],g=["ref","value","onChange"];function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){(0,a.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var AdminSupportInquiryTemplate_AdminSupportInquiryDetailTemplate=function(){var e,t=(0,p.I0)(),n=(0,p.v9)(function(e){return null==e?void 0:e.optician}).opticianDetail,l=(0,s.useState)(null),a=l[0],w=l[1],O=(0,s.useRef)(null),j=((null==n?void 0:null===(e=n.fsSaleItem)||void 0===e?void 0:e.split(","))||[]).shift(),q=(0,p.v9)(function(e){return e.optician}),E=q.opticianList;q.paging;var D=(0,r.useRouter)();D.query,D.back,D.push;var k=(0,r.useRouter)(),P=(0,c.cI)({}),N=P.handleSubmit,T=P.control,C=P.setValue,X=P.formState.errors,saveEditorImageID=function(e){w(e)};(0,s.useEffect)(function(){return a&&(t(updateUsingImageListAction({usingImageId:a})),w(null)),function(){return w(null)}},[a,t]);var handleSendData=function(e){t((0,v.rr)({id:k.query.id,sendObject:e}))};return(0,s.useEffect)(function(){E.length||t((0,v.Yy)())},[t,E.length]),(0,s.useEffect)(function(){return k.query.id&&t((0,v.Uk)({id:k.query.id,callback:k})),function(){t((0,v.VG)())}},[k,t]),(0,s.useEffect)(function(){n&&(C("store_show_status",null==n?void 0:n.store_show_status),C("store_name",null==n?void 0:n.fsStoreName),C("abc_segment",null==n?void 0:n.fsStoreABC),C("store_phone",null==n?void 0:n.fsStorePhone),C("reg_num",null==n?void 0:n.fsStoreRegNum),C("store_group",j))},[n,j,C]),(0,m.BX)(m.HY,{children:[(0,m.tZ)("div",{css:f.Y2,children:(0,m.tZ)(h.Z,{title:"\uD83D\uDC49\uD83C\uDFFC App 채널의 1:1 문의 상세 페이지입니다. 답변을 등록할 수 있습니다. "})}),(0,m.tZ)(d.n,{border:!1}),(0,m.BX)(d.l0,{onSubmit:N(function(e){return handleSendData(e)},function(e){return console.log("fail",e)}),children:[(0,m.BX)(d._L,{children:[(0,m.BX)(i.default,{title:"문의 회원 정보",bordered:!0,children:[(0,m.tZ)(i.default.Item,{span:1,label:"이름",children:null==n?void 0:n.fsStoreOwnerName}),(0,m.tZ)(i.default.Item,{span:2,label:"아이디",children:null==n?void 0:n.fsSaleEmpCode}),(0,m.tZ)(i.default.Item,{span:1,label:"연락처",children:null==n?void 0:n.fsStorePhone}),(0,m.tZ)(i.default.Item,{span:2,label:"이메일",children:null==n?void 0:n.fsStoreName})]}),(0,m.tZ)(o.Z,{border:!0,dashed:!0}),(0,m.BX)(i.default,{title:"문의 정보",labelStyle:{width:"200px"},bordered:!0,children:[(0,m.tZ)(i.default.Item,{span:4,label:"처리상태",children:(0,m.tZ)(c.Qr,{name:"status",control:T,defaultValue:"",render:function(e){var t=e.field,n=(t.ref,t.value),r=(0,u.Z)(t,b);return e.fieldState,(0,m.tZ)(d.kq,_objectSpread({type:"text",placeholder:"",css:I,value:n||null},r))}})}),(0,m.tZ)(i.default.Item,{span:4,label:"문의 등록일",children:(0,m.tZ)(c.Qr,{name:"q_date",control:T,defaultValue:"",render:function(e){var t=e.field,n=(t.ref,t.value),r=(0,u.Z)(t,y);return e.fieldState,(0,m.tZ)(d.kq,_objectSpread({type:"text",placeholder:"",css:I,value:n||null},r))}})}),(0,m.tZ)(i.default.Item,{span:4,label:"카테고리",children:(0,m.tZ)(c.Qr,{name:"category_name",control:T,defaultValue:"",render:function(e){var t=e.field,n=(t.ref,t.value),r=(0,u.Z)(t,Z);return e.fieldState,(0,m.tZ)(d.kq,_objectSpread({type:"text",placeholder:"",css:I,value:n||null},r))}})}),(0,m.tZ)(i.default.Item,{span:4,label:"문의 제목",children:(0,m.tZ)(c.Qr,{name:"q_title",control:T,defaultValue:"",render:function(e){var t=e.field,n=(t.ref,t.value),r=(0,u.Z)(t,_);return e.fieldState,(0,m.tZ)(d.kq,_objectSpread({type:"text",placeholder:"",css:I,value:n||null},r))}})}),(0,m.tZ)(i.default.Item,{span:4,label:"문의 내용",children:(0,m.tZ)(c.Qr,{name:"pro_memo",control:T,defaultValue:"",render:function(e){var t=e.field,n=(t.ref,t.value),r=(0,u.Z)(t,S);return e.fieldState,(0,m.tZ)(d.FF,_objectSpread({height:100,value:n||null,placeholder:"프로모션에 대한 설명을 작성해주세요"},r))}})}),(0,m.tZ)(i.default.Item,{span:4,label:"문의 답변 ⭐️",children:(0,m.tZ)(c.Qr,{name:"pro_subTitle",control:T,render:function(e){var t=e.field,n=(t.ref,t.value),r=t.onChange;return(0,u.Z)(t,g),e.fieldState,(0,m.tZ)(d.ML,{border:!1,value:n||"",onChange:r,isError:null==X?void 0:X.content,forwardRef:O,saveEditorImageID:saveEditorImageID})}})})]}),(0,m.tZ)(d.n,{border:!1})]}),(0,m.tZ)(d.n,{border:!1}),(0,m.tZ)(d._L,{children:(0,m.BX)(d.sw,{justify:"space-between",children:[(0,m.tZ)(d.EK,{type:"default",name:"취소",htmlType:"button",onClick:function(){return k.push("/admin/support/inquiry-one")}}),(0,m.tZ)(d.EK,{type:"primary",name:"답변 등록",htmlType:"submit"})]})})]})]})},I={name:"xjt14x",styles:"width:60%"},InquiryDetail=function(){var e=(0,r.useRouter)();return e.query,e.back,e.push,(0,m.tZ)(m.HY,{children:(0,m.tZ)(AdminSupportInquiryTemplate_AdminSupportInquiryDetailTemplate,{})})};InquiryDetail.getLayout=function(e){return(0,m.tZ)(l.L,{children:e})};var w=InquiryDetail},64773:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/support/inquiry-one/[id]",function(){return n(88899)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=64773)}),_N_E=e.O()}]);