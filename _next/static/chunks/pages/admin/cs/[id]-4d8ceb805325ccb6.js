(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[959],{79506:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return T}});var n=r(11163),a=r(24295);r(36368);var l=r(60099),s=r(17621);r(1131);var u=r(28465);r(1025);var o=r(65400);r(45673);var i=r(8448),c=r(59499),d=r(4730),p=r(16835);r(7940);var f=r(31059),m=r(88484),_=r(71878),h=r(95966),y=r(67294),b=r(87536),v=r(9473),Z=r(94386),w=["ref","value"],S=["ref","value"],g=["ref","value"],C=["ref","value","onChange"];function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){(0,c.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var O=[{id:1,value:"N",label:"미발행"},{id:2,value:"Y",label:"발행"}],P=[{id:1,value:"P",label:"Point"},{id:2,value:"A",label:"App"}],j=f.default.Group,CustomerSupportTemplate_CustomerSupportCreateTemplate=function(){var e=(0,v.I0)(),t=(0,n.useRouter)(),r=(0,_.Z)("termsTypeCode"),a=(0,p.Z)(r,2),c=a[0];a[1];var f=(0,_.Z)("termsShowStatusCode"),T=(0,p.Z)(f,2);T[0],T[1];var E=(0,_.Z)("termsEssentialStatusCode"),k=(0,p.Z)(E,2);k[0],k[1];var q=(0,y.useState)(""),D=(q[0],q[1]),N=(0,y.useState)([]),L=N[0];N[1];var I=(0,y.useRef)(null),K=(0,b.cI)({}),U=(K.register,K.handleSubmit),V=K.control,X=K.setValue,x=K.formState.errors,Q=K.watch,handleSendData=function(r){var n=r.terms_type,a=r.terms_title,l=r.terms_content,s=r.terms_version,u=r.terms_essential_status,o=r.terms_shot_type;e(registerTermsAction({sendObject:{terms_type:n,terms_title:a,terms_content:l,terms_version:s,terms_essential_status:u,terms_show_status:o},callback:t}))},handleError=function(t){null!=t&&t.terms_type&&e((0,h.lh)({message:"뉴스 등록 실패",description:"필수 정보가 기입되지 않았습니다."}))};return(0,y.useEffect)(function(){"U"===t.query.termsType?X("terms_type","U"):"P"===t.query.termsType?X("terms_type","P"):"L"===t.query.termsType?X("terms_type","L"):"M"===t.query.termsType&&X("terms_type","M"),D("P"===Q("terms_type")?X("terms_essential_status","Y"):"U"===Q("terms_type")?X("terms_essential_status","Y"):X("terms_essential_status","N"))},[t,L,c]),(0,Z.BX)(s.l0,{onSubmit:U(function(e){return handleSendData(e)},function(e){return handleError(e)}),children:[(0,Z.tZ)(s._L,{children:(0,Z.BX)(i.default,{labelStyle:{width:"250px"},bordered:!0,children:[(0,Z.tZ)(i.default.Item,{span:3,label:"채널*",children:(0,Z.tZ)(b.Qr,{name:"terms_type",control:V,defaultValue:"",render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,d.Z)(t,w);return e.fieldState,(0,Z.tZ)(j,_objectSpread({options:P,checked:r,onChange:function(e){return console.log(r)}},n))},rules:{required:!0}})}),(0,Z.tZ)(i.default.Item,{span:3,label:"발행여부*",children:(0,Z.tZ)(b.Qr,{name:"terms_title",control:V,defaultValue:"N",render:function(e){var t=e.field,r=(t.ref,t.value),n=(0,d.Z)(t,S);return e.fieldState,(0,Z.tZ)(s.Tr,_objectSpread({options:O,value:r,defaultValue:"N",style:{width:"100%"}},n))},rules:{required:!0}})}),(0,Z.tZ)(i.default.Item,{span:3,label:"뉴스제목*",children:(0,Z.tZ)(b.Qr,{name:"terms_title",control:V,defaultValue:"",render:function(e){var t=e.field,r=(t.ref,t.value,(0,d.Z)(t,g));return e.fieldState,(0,Z.tZ)(s.kq,_objectSpread({type:"text",placeholder:"뉴스 제목을 입력해주세요."},r))},rules:{required:!0}})}),(0,Z.tZ)(i.default.Item,{span:3,label:"뉴스 내용*",children:(0,Z.tZ)(b.Qr,{name:"terms_content",control:V,render:function(e){var t=e.field,r=(t.ref,t.value),n=t.onChange;return(0,d.Z)(t,C),(0,Z.tZ)(s.ML,{border:!1,value:r||"",onChange:n,isError:null==x?void 0:x.content,forwardRef:I,customHeight:"700px",addFiles:!1,placeholder:"약관 내용을 입력해주세요."})},rules:{required:!0}})}),(0,Z.tZ)(i.default.Item,{span:3,label:"파일 첨부",children:(0,Z.tZ)(u.Z,{listType:"text",fileList:[],onPreview:"",onChange:"",beforeUpload:function(){return!1},children:(0,Z.tZ)(o.default,{icon:(0,Z.tZ)(m.Z,{}),children:"Upload"})})})]})}),(0,Z.tZ)(s.n,{border:!1}),(0,Z.tZ)(s.sw,{children:(0,Z.BX)(s.z2,{span:24,css:l.eg,children:[(0,Z.tZ)(s.EK,{type:"default",name:"취소",htmlType:"button",css:(0,l.g4)(5),onClick:function(){return t.push("/support/terms")}}),(0,Z.tZ)(s.EK,{type:"primary",name:"등록",htmlType:"submit",css:(0,l.Lh)(5)})]})})]})},PointCsDetail=function(){var e=(0,n.useRouter)(),t=e.query;return e.back,e.push,(0,Z.tZ)(s.y3,{css:l.$E,shadow:!1,children:"create"===t.id&&(0,Z.tZ)(CustomerSupportTemplate_CustomerSupportCreateTemplate,{})})};PointCsDetail.getLayout=function(e){return(0,Z.tZ)(a.L,{children:e})};var T=PointCsDetail},46413:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/cs/[id]",function(){return r(79506)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=46413)}),_N_E=e.O()}]);