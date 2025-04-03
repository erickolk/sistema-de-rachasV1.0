import{s as O}from"./Lk2AerRB.js";import{a as I}from"./DDSFaLPl.js";import{B as L,z as o,c as s,C as u,o as i,D as f,a8 as y,E as v,t as C,q as k,a as B,a0 as g,a1 as P,b as d,A as N,m as S,a5 as U,w as h,y as V,d as z,_ as A}from"./DJoCQzgD.js";var D=function(a){var t=a.dt;return`
.p-breadcrumb {
    background: `.concat(t("breadcrumb.background"),`;
    padding: `).concat(t("breadcrumb.padding"),`;
    overflow-x: auto;
}

.p-breadcrumb-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: `).concat(t("breadcrumb.gap"),`;
}

.p-breadcrumb-separator {
    display: flex;
    align-items: center;
    color: `).concat(t("breadcrumb.separator.color"),`;
}

.p-breadcrumb-separator-icon:dir(rtl) {
    transform: rotate(180deg);
}

.p-breadcrumb::-webkit-scrollbar {
    display: none;
}

.p-breadcrumb-item-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: `).concat(t("breadcrumb.item.gap"),`;
    transition: background `).concat(t("breadcrumb.transition.duration"),", color ").concat(t("breadcrumb.transition.duration"),", outline-color ").concat(t("breadcrumb.transition.duration"),", box-shadow ").concat(t("breadcrumb.transition.duration"),`;
    border-radius: `).concat(t("breadcrumb.item.border.radius"),`;
    outline-color: transparent;
    color: `).concat(t("breadcrumb.item.color"),`;
}

.p-breadcrumb-item-link:focus-visible {
    box-shadow: `).concat(t("breadcrumb.item.focus.ring.shadow"),`;
    outline: `).concat(t("breadcrumb.item.focus.ring.width")," ").concat(t("breadcrumb.item.focus.ring.style")," ").concat(t("breadcrumb.item.focus.ring.color"),`;
    outline-offset: `).concat(t("breadcrumb.item.focus.ring.offset"),`;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-label {
    color: `).concat(t("breadcrumb.item.hover.color"),`;
}

.p-breadcrumb-item-label {
    transition: inherit;
}

.p-breadcrumb-item-icon {
    color: `).concat(t("breadcrumb.item.icon.color"),`;
    transition: inherit;
}

.p-breadcrumb-item-link:hover .p-breadcrumb-item-icon {
    color: `).concat(t("breadcrumb.item.icon.hover.color"),`;
}
`)},E={root:"p-breadcrumb p-component",list:"p-breadcrumb-list",homeItem:"p-breadcrumb-home-item",separator:"p-breadcrumb-separator",separatorIcon:"p-breadcrumb-separator-icon",item:function(a){var t=a.instance;return["p-breadcrumb-item",{"p-disabled":t.disabled()}]},itemLink:"p-breadcrumb-item-link",itemIcon:"p-breadcrumb-item-icon",itemLabel:"p-breadcrumb-item-label"},M=L.extend({name:"breadcrumb",theme:D,classes:E}),R={name:"BaseBreadcrumb",extends:I,props:{model:{type:Array,default:null},home:{type:null,default:null}},style:M,provide:function(){return{$pcBreadcrumb:this,$parentInstance:this}}},w={name:"BreadcrumbItem",hostName:"Breadcrumb",extends:I,props:{item:null,templates:null,index:null},methods:{onClick:function(a){this.item.command&&this.item.command({originalEvent:a,item:this.item})},visible:function(){return typeof this.item.visible=="function"?this.item.visible():this.item.visible!==!1},disabled:function(){return typeof this.item.disabled=="function"?this.item.disabled():this.item.disabled},label:function(){return typeof this.item.label=="function"?this.item.label():this.item.label},isCurrentUrl:function(){var a=this.item,t=a.to,c=a.url,m=typeof window<"u"?window.location.pathname:"";return t===m||c===m?"page":void 0}},computed:{ptmOptions:function(){return{context:{item:this.item,index:this.index}}},getMenuItemProps:function(){var a=this;return{action:o({class:this.cx("itemLink"),"aria-current":this.isCurrentUrl(),onClick:function(c){return a.onClick(c)}},this.ptm("itemLink",this.ptmOptions)),icon:o({class:[this.cx("icon"),this.item.icon]},this.ptm("icon",this.ptmOptions)),label:o({class:this.cx("label")},this.ptm("label",this.ptmOptions))}}}},_=["href","target","aria-current"];function q(e,a,t,c,m,r){return r.visible()?(i(),s("li",o({key:0,class:[e.cx("item"),t.item.class]},e.ptm("item",r.ptmOptions)),[t.templates.item?(i(),f(v(t.templates.item),{key:1,item:t.item,label:r.label(),props:r.getMenuItemProps},null,8,["item","label","props"])):(i(),s("a",o({key:0,href:t.item.url||"#",class:e.cx("itemLink"),target:t.item.target,"aria-current":r.isCurrentUrl(),onClick:a[0]||(a[0]=function(){return r.onClick&&r.onClick.apply(r,arguments)})},e.ptm("itemLink",r.ptmOptions)),[t.templates&&t.templates.itemicon?(i(),f(v(t.templates.itemicon),{key:0,item:t.item,class:y(e.cx("itemIcon",r.ptmOptions))},null,8,["item","class"])):t.item.icon?(i(),s("span",o({key:1,class:[e.cx("itemIcon"),t.item.icon]},e.ptm("itemIcon",r.ptmOptions)),null,16)):u("",!0),t.item.label?(i(),s("span",o({key:2,class:e.cx("itemLabel")},e.ptm("itemLabel",r.ptmOptions)),C(r.label()),17)):u("",!0)],16,_))],16)):u("",!0)}w.render=q;var x={name:"Breadcrumb",extends:R,inheritAttrs:!1,components:{BreadcrumbItem:w,ChevronRightIcon:O}};function F(e,a,t,c,m,r){var n=k("BreadcrumbItem"),b=k("ChevronRightIcon");return i(),s("nav",o({class:e.cx("root")},e.ptmi("root")),[B("ol",o({class:e.cx("list")},e.ptm("list")),[e.home?(i(),f(n,o({key:0,item:e.home,class:e.cx("homeItem"),templates:e.$slots,pt:e.pt,unstyled:e.unstyled},e.ptm("homeItem")),null,16,["item","class","templates","pt","unstyled"])):u("",!0),(i(!0),s(g,null,P(e.model,function(l,p){return i(),s(g,{key:l.label+"_"+p},[e.home||p!==0?(i(),s("li",o({key:0,class:e.cx("separator"),ref_for:!0},e.ptm("separator")),[N(e.$slots,"separator",{},function(){return[d(b,o({"aria-hidden":"true",class:e.cx("separatorIcon"),ref_for:!0},e.ptm("separatorIcon")),null,16,["class"])]})],16)):u("",!0),d(n,{item:l,index:p,templates:e.$slots,pt:e.pt,unstyled:e.unstyled},null,8,["item","index","templates","pt","unstyled"])],64)}),128))],16)],16)}x.render=F;const T={class:"flex border-b border-black-20 px-0 py-2 mb-4 text-zinc-600"},j=S({__name:"PageBreadcrumb",props:{items:{}},setup(e,{expose:a}){const t=e,c=r=>r.map(n=>({label:n.label,to:n==null?void 0:n.to,icon:n==null?void 0:n.icon,current:n==null?void 0:n.current,children:n.children?c(n.children):void 0})),m=U(()=>c(t.items));return a({breadcrumbItems:m}),(r,n)=>{const b=k("router-link");return i(),s("div",T,[d(V(x),{home:void 0,model:m.value},{item:h(({item:l})=>[d(b,{to:l.to??"#",class:y(["flex items-center gap-x-2",l.current?"opacity-50 cursor-not-allowed":""])},{default:h(()=>[l.icon?(i(),s("span",{key:0,class:y(l.icon)},null,2)):u("",!0),B("span",null,C(l.label),1)]),_:2},1032,["to","class"])]),separator:h(()=>n[0]||(n[0]=[z(" / ")])),_:1},8,["model"])])}}}),K=A(j,[["__scopeId","data-v-828eba98"]]);export{K as default};
