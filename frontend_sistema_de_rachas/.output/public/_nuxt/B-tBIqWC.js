import D from"./DRnmrXaE.js";import{_ as N}from"./BODeONSb.js";import U from"./Dv-jmtlH.js";import{g as M,u as z}from"./BMutFdwR.js";import{B as F,c as l,o as i,z as g,a as n,m as I,r as p,v as j,a5 as A,p as O,D as T,w as _,b as t,y as c,C as k,d as y,a8 as b,t as x}from"./DJoCQzgD.js";import{s as h}from"./D8NCiHfp.js";import{s as W}from"./BKAYiMY5.js";import{a as L}from"./DDSFaLPl.js";import"./Lk2AerRB.js";import"./BF-rSLMc.js";import"./D781cylh.js";var q=function(m){var e=m.dt;return`
.p-progressspinner {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    display: inline-block;
}

.p-progressspinner::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.p-progressspinner-spin {
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: p-progressspinner-rotate 2s linear infinite;
}

.p-progressspinner-circle {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: 0;
    stroke: `.concat(e("progressspinner.color.1"),`;
    animation: p-progressspinner-dash 1.5s ease-in-out infinite, p-progressspinner-color 6s ease-in-out infinite;
    stroke-linecap: round;
}

@keyframes p-progressspinner-rotate {
    100% {
        transform: rotate(360deg);
    }
}
@keyframes p-progressspinner-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
}
@keyframes p-progressspinner-color {
    100%,
    0% {
        stroke: `).concat(e("progressspinner.color.1"),`;
    }
    40% {
        stroke: `).concat(e("progressspinner.color.2"),`;
    }
    66% {
        stroke: `).concat(e("progressspinner.color.3"),`;
    }
    80%,
    90% {
        stroke: `).concat(e("progressspinner.color.4"),`;
    }
}
`)},G={root:"p-progressspinner",spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},H=F.extend({name:"progressspinner",theme:q,classes:G}),J={name:"BaseProgressSpinner",extends:L,props:{strokeWidth:{type:String,default:"2"},fill:{type:String,default:"none"},animationDuration:{type:String,default:"2s"}},style:H,provide:function(){return{$pcProgressSpinner:this,$parentInstance:this}}},S={name:"ProgressSpinner",extends:J,inheritAttrs:!1,computed:{svgStyle:function(){return{"animation-duration":this.animationDuration}}}},K=["fill","stroke-width"];function Q(a,m,e,u,d,r){return i(),l("div",g({class:a.cx("root"),role:"progressbar"},a.ptmi("root")),[(i(),l("svg",g({class:a.cx("spin"),viewBox:"25 25 50 50",style:r.svgStyle},a.ptm("spin")),[n("circle",g({class:a.cx("circle"),cx:"50",cy:"50",r:"20",fill:a.fill,"stroke-width":a.strokeWidth,strokeMiterlimit:"10"},a.ptm("circle")),null,16,K)],16))],16)}S.render=Q;const R={class:"profile"},X={key:0,class:"flex justify-center items-center py-8"},Y={key:1,class:"space-y-4"},Z={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},ee={class:"space-y-1"},se={key:0,class:"text-red-500"},re={class:"space-y-1"},ne={key:0,class:"text-red-500"},ae={class:"space-y-1"},oe={class:"flex justify-end"},ye=I({__name:"index",setup(a){const m=p([{label:"Dashboard",to:"/dashboard",icon:"pi pi-home"},{label:"Meu Perfil",current:!0}]),e=p({name:"",email:"",role:""}),u=p(!0),d=p(!1),r=p({name:"",email:""}),f=j(),P=async()=>{try{const o=await M();e.value=o}catch(o){console.error("Erro ao carregar o perfil:",o),f.add({severity:"error",summary:"Erro",detail:"Erro ao carregar o perfil.",life:3e3})}finally{u.value=!1}},w=A(()=>Number(e.value.role)===2?"Cliente":"Dono"),$=()=>{var o,s;return r.value={name:"",email:""},(o=e.value.name)!=null&&o.trim()||(r.value.name="O nome é obrigatório"),(s=e.value.email)!=null&&s.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.email)||(r.value.email="Email inválido"):r.value.email="O email é obrigatório",!r.value.name&&!r.value.email},V=async()=>{if($()){d.value=!0;try{await z(e.value),f.add({severity:"success",summary:"Sucesso",detail:"Perfil atualizado com sucesso!",life:3e3})}catch(o){console.error("Erro ao salvar o perfil:",o);const s=o.message||"Erro ao salvar o perfil.";f.add({severity:"error",summary:"Erro",detail:s,life:5e3})}finally{d.value=!1}}};return O(()=>{P()}),(o,s)=>{const B=D,E=N,C=U;return i(),T(C,null,{default:_(()=>[t(B,{items:m.value},null,8,["items"]),n("div",R,[u.value?(i(),l("div",X,[t(c(S))])):(i(),l("div",Y,[t(E,{title:"Informações Pessoais"},{content:_(()=>[n("div",Z,[n("div",ee,[s[2]||(s[2]=n("label",{for:"name",class:"flex items-center"},[n("i",{class:"pi pi-user mr-2"}),y("Nome ")],-1)),t(c(h),{id:"name",type:"text",modelValue:e.value.name,"onUpdate:modelValue":s[0]||(s[0]=v=>e.value.name=v),class:b(["w-full",{"p-invalid":r.value.name}])},null,8,["modelValue","class"]),r.value.name?(i(),l("small",se,x(r.value.name),1)):k("",!0)]),n("div",re,[s[3]||(s[3]=n("label",{for:"email",class:"flex items-center"},[n("i",{class:"pi pi-envelope mr-2"}),y("Email ")],-1)),t(c(h),{id:"email",type:"email",modelValue:e.value.email,"onUpdate:modelValue":s[1]||(s[1]=v=>e.value.email=v),class:b(["w-full",{"p-invalid":r.value.email}])},null,8,["modelValue","class"]),r.value.email?(i(),l("small",ne,x(r.value.email),1)):k("",!0)]),n("div",ae,[s[4]||(s[4]=n("label",{for:"role",class:"flex items-center"},[n("i",{class:"pi pi-id-card mr-2"}),y("Função ")],-1)),t(c(h),{id:"role",type:"text",value:w.value,class:"w-full bg-gray-100",disabled:""},null,8,["value"])])])]),_:1})]))]),n("div",oe,[t(c(W),{label:"Salvar Alterações",icon:"pi pi-save",onClick:V,loading:d.value,class:"p-button-success"},null,8,["loading"])])]),_:1})}}});export{ye as default};
