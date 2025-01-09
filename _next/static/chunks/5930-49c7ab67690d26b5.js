"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5930],{35930:function(e,n,t){t.d(n,{Z:function(){return template_BannerTemplate}}),t(48145);var r=t(40987),a=t(59499),c=t(4730);t(1131);var i=t(28465),o=t(67294),l=t(60099),s=t(17621),d=t(87536),p=t(87462),u={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"}}]},name:"retweet",theme:"outlined"},f=t(84145),b=o.forwardRef(function(e,n){return o.createElement(f.Z,(0,p.Z)({},e,{ref:n,icon:u}))}),h={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"plus-circle",theme:"outlined"},m=o.forwardRef(function(e,n){return o.createElement(f.Z,(0,p.Z)({},e,{ref:n,icon:h}))}),g=t(72252),_=t(9473),x=t(18759),v=t(25675),w=t.n(v),y=t(32244),Z=t(86752),k=t(94386),j=t(83454),z=["ref","value"],O=["ref","value"],B=["ref","value"];function ownKeys(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function _objectSpread(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?ownKeys(Object(t),!0).forEach(function(n){(0,a.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var S={name:"zl1inp",styles:"display:flex;justify-content:center"},E={name:"1pzk433",styles:"width:100px"},template_BannerTemplate=function(){var e=(0,_.v9)(function(e){return e.banner.bannerList}),n=(0,_.I0)(),t=(0,d.cI)({}),a=t.control,p=t.handleSubmit,u=t.setValue,f=t.getValues;t.formState.errors;var handleUpdateBanner=function(e){var t={banner_page_link:f("banner_page_link-".concat(e.id))||null,banner_open_new_page:!0===f("banner_open_new_page-".concat(e.id))?"Y":"N",banner_order:parseInt(f("banner_order-".concat(e.id))),banner_title:e.banner_title,id:e.id};n((0,y.Ih)({sendObject:t}))},handleUpload=function(e,t){var r=e.fileList[0].originFileObj,a=t.banner_img_path.split("".concat(j.env.NEXT_PUBLIC_IMAGE_URL,"/"))[1],c=new FormData;c.append("image",r),c.append("past_image_path",a),c.append("id",t.id),n((0,y.hx)({sendObject:c}))},handleDeleteBanner=function(e){n((0,y.rm)({sendObject:{id:e}}))};return(0,o.useEffect)(function(){e&&e.forEach(function(e,n){var t=(null==e?void 0:e.banner_open_new_page)==="Y";u("banner_page_link-".concat(e.id),e.banner_page_link),u("banner_open_new_page-".concat(e.id),t),u("banner_order-".concat(e.id),e.banner_order)})},[e,u]),(0,o.useEffect)(function(){return n((0,y.j3)()),function(){n((0,y.MB)())}},[n]),(0,k.BX)(k.HY,{children:[(0,k.tZ)(s.l0,{onSubmit:p(function(e){return console.log(e)},function(e){return console.log(e)}),css:V,children:null==e?void 0:e.map(function(e){var n=null!=e&&e.banner_modify_date?"수정일 : ".concat((0,Z.Ie)(null==e?void 0:e.banner_modify_date,"YYYY.MM.DD")):"등록일 : ".concat((0,Z.Ie)(null==e?void 0:e.banner_register_date,"YYYY.MM.DD"));return(0,k.BX)(o.Fragment,{children:[(0,k.tZ)(g.Z,{size:"default",title:null==e?void 0:e.banner_title,extra:n,bordered:!1,style:{width:900},children:(0,k.BX)(s.sw,{children:[(0,k.tZ)(s.z2,{span:10,children:(0,k.BX)("div",{css:Y,children:[(0,k.tZ)(w(),{src:null==e?void 0:e.banner_img_path,alt:"배너 이미지",layout:"fill"}),(0,k.tZ)(i.Z,{css:D,listType:"picture-card",fileList:[],maxCount:1,onChange:function(n){return handleUpload(n,e)},children:(0,k.tZ)("div",{css:[X,l.A8,"",""],children:(0,k.tZ)(b,{})})})]})}),(0,k.tZ)(s.z2,{span:2}),(0,k.BX)(s.z2,{span:12,children:[(0,k.BX)(s.sw,{children:[(0,k.tZ)(s.z2,{span:2,css:l.A8,children:(0,k.tZ)("span",{children:"링크"})}),(0,k.tZ)(s.z2,{span:22,children:(0,k.tZ)(d.Qr,{name:"banner_page_link-".concat(e.id),control:a,defaultValue:"",render:function(e){var n=e.field,t=(n.ref,n.value),r=(0,c.Z)(n,z);return e.fieldState,(0,k.tZ)(s.kq,_objectSpread({type:"text",value:t||null,placeholder:"https://"},r))}})})]}),(0,k.tZ)(s.n,{border:!1}),(0,k.BX)(s.sw,{children:[(0,k.tZ)(s.z2,{span:16}),(0,k.tZ)(s.z2,{span:5,css:l.Ax,children:(0,k.tZ)("span",{children:"새창 적용"})}),(0,k.tZ)(s.z2,{span:3,css:l.Ax,children:(0,k.tZ)(d.Qr,{name:"banner_open_new_page-".concat(e.id),control:a,defaultValue:"",render:function(e){var n=e.field,t=(n.ref,n.value),a=(0,c.Z)(n,O);return e.fieldState,(0,k.tZ)(r.Z,_objectSpread({checked:t||null},a))}})})]}),(0,k.tZ)(s.n,{border:!1}),(0,k.tZ)(s.sw,{children:(0,k.tZ)(s.z2,{span:24,css:l.Ax,children:(0,k.tZ)(d.Qr,{name:"banner_order-".concat(e.id),control:a,defaultValue:"",render:function(n){var t=n.field,r=(t.ref,t.value),a=(0,c.Z)(t,B);return n.fieldState,(0,k.tZ)(s.kq,_objectSpread(_objectSpread({type:"number",value:r||(null==e?void 0:e.banner_order),placeholder:"1 ~ 10"},a),{},{css:E}))}})})}),(0,k.tZ)(s.n,{border:!1}),(0,k.tZ)(s.sw,{children:(0,k.BX)(s.z2,{span:24,css:l.Ax,children:[(0,k.tZ)(s.EK,{type:"danger",name:"삭제하기",htmlType:"button",onClick:function(){return handleDeleteBanner(e.id)}}),(0,k.tZ)(s.EK,{type:"primary",name:"수정하기",htmlType:"button",onClick:function(){return handleUpdateBanner(e)},css:(0,l.Lh)(5)})]})})]})]})}),(0,k.tZ)(s.n,{border:!1})]},e.id)})}),(0,k.tZ)(s.sw,{children:(0,k.tZ)(s.z2,{span:24,css:S,children:(0,k.BX)("button",{className:"btn",css:[C,(0,l.Y)(20),"",""],onClick:function(){n((0,x.FJ)({show:!0,type:"drawer-root",name:"createBanner",items:[]}))},children:[(0,k.tZ)("p",{className:"paragraph",children:"추가하기"}),(0,k.tZ)("span",{className:"icon-wrapper",children:(0,k.tZ)(m,{className:"icon",size:30})})]})})})]})},V={name:"zigog8",styles:"display:flex;flex-direction:column;align-items:center"},Y={name:"mnarvd",styles:"width:100%;height:200px;position:relative;cursor:pointer"},D={name:"14xv3g7",styles:".ant-upload{width:100%;height:200px;margin:0;border:none;}"},X={name:"1c1ogk8",styles:"width:100%;height:200px;z-index:5;background:rgba(0, 0, 0, 0);justify-content:center;span{opacity:0;font-size:46px;}&:hover{background:rgba(0, 0, 0, 0.3);transition:all 1ms ease-in;}&:hover>span{opacity:0.6;color:#f4f2f6;}"},C={name:"1dka670",styles:"cursor:pointer;height:50px;border:none;position:relative;border-radius:10px;background-color:#14bd7e;-webkit-box-shadow:1px 1px 5px 0.2px #00000035;box-shadow:1px 1px 5px 0.2px #00000035;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:space-between;width:150px;.paragraph{color:#fff;font-size:18px;margin-bottom:0;padding-left:20px;font-weight:bold;text-transform:uppercase;}.icon-wrapper{width:50px;height:50px;position:absolute;top:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background-color:#14bd7e;border-radius:8px;}.icon{color:#fff;font-size:30px;}"}}}]);