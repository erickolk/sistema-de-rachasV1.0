import{s as k}from"./BKAYiMY5.js";import{s as U}from"./BQ82tAHq.js";import{s as h}from"./D8NCiHfp.js";import{m as C,u as R,v as T,n as E,p as N,H as P,c as B,a as e,b as r,x as n,y as t,t as i,w as M,s as H,o as A,d as D}from"./DJoCQzgD.js";import{u as F,a as u,t as I}from"./DUiLKHvw.js";import{registerUserSchema as $}from"./DNqnEX4y.js";import{U as L}from"./B_yX5pYK.js";import{r as j}from"./BMutFdwR.js";import"./D781cylh.js";import"./DDSFaLPl.js";import"./CZGk8w3r.js";import"./1R96cE9n.js";import"./BcjbkUIV.js";import"./BF-rSLMc.js";import"./CQSCTBfY.js";const q={class:"form-container"},z={class:"space-y-4"},G={class:"border border-custom rounded-md p-4 space-x-4 flex"},J={class:"mb-4 w-1/2"},K={class:"text-red-500 text-sm"},O={class:"mb-4 w-1/2"},Q={class:"text-red-500 text-sm"},W={class:"border border-custom rounded-md p-4 flex space-x-4"},X={class:"mb-4 w-1/2"},Y={class:"text-red-500 text-sm"},Z={class:"mb-4 w-1/2"},ss={class:"text-red-500 text-sm"},es={class:"border border-custom rounded-md p-4 space-x-4 flex"},os={class:"mb-4 w-1/2"},ts={class:"text-red-500 text-sm"},Vs=C({__name:"index",setup(as){const V=R(),c=T(),g=I($),{handleSubmit:y,errors:m}=F({validationSchema:g}),{value:f}=u("name"),{value:b}=u("email"),{value:v}=u("password"),{value:w}=u("confirmPassword"),{value:x}=u("phone"),{loadAuthState:S}=E();N(()=>{S()});const _=y(async p=>{var s,l,d;try{const a={name:p.name||"",email:p.email||"",password:p.password||"",role:L.CLIENT},o=await j(a);(o==null?void 0:o.status)===P.Created?(c.add({severity:"success",summary:"Registro efetuado com sucesso!"}),V.push("/auth/login")):c.add({severity:"error",summary:((s=o==null?void 0:o.data)==null?void 0:s.message)||"Houve um problema enesperado"})}catch(a){console.log(a),c.add({severity:"error",summary:((d=(l=a==null?void 0:a.response)==null?void 0:l.data)==null?void 0:d.message)||"Erro inesperado ao registrar usuário!"})}});return(p,s)=>{const l=h,d=U,a=k;return A(),B("div",q,[s[12]||(s[12]=e("h1",{class:"text-2xl font-bold mb-4"},"Registrar",-1)),e("form",{onSubmit:s[5]||(s[5]=H((...o)=>t(_)&&t(_)(...o),["prevent"]))},[e("div",z,[e("div",G,[e("div",J,[s[6]||(s[6]=e("label",{class:"block mb-2",for:"username"},"Nome:",-1)),r(l,{id:"name",modelValue:t(f),"onUpdate:modelValue":s[0]||(s[0]=o=>n(f)?f.value=o:null),class:"border p-2 w-full"},null,8,["modelValue"]),e("span",K,i(t(m).name),1)]),e("div",O,[s[7]||(s[7]=e("label",{class:"block mb-2",for:"email"},"Email:",-1)),r(l,{id:"email",modelValue:t(b),"onUpdate:modelValue":s[1]||(s[1]=o=>n(b)?b.value=o:null),type:"email",class:"border p-2 w-full"},null,8,["modelValue"]),e("span",Q,i(t(m).email),1)])]),e("div",W,[e("div",X,[s[8]||(s[8]=e("label",{class:"block mb-2",for:"password"},"Senha:",-1)),r(d,{modelValue:t(v),"onUpdate:modelValue":s[2]||(s[2]=o=>n(v)?v.value=o:null),toggleMask:"",fluid:""},null,8,["modelValue"]),e("span",Y,i(t(m).password),1)]),e("div",Z,[s[9]||(s[9]=e("label",{class:"block mb-2",for:"confirmPassword"},"Confirme sua Senha:",-1)),r(d,{modelValue:t(w),"onUpdate:modelValue":s[3]||(s[3]=o=>n(w)?w.value=o:null),toggleMask:"",fluid:"",class:"w-full"},null,8,["modelValue"]),e("span",ss,i(t(m).confirmPassword),1)])]),e("div",es,[e("div",os,[s[10]||(s[10]=e("label",{class:"block mb-2",for:"phone"},"Telefone:",-1)),r(l,{modelValue:t(x),"onUpdate:modelValue":s[4]||(s[4]=o=>n(x)?x.value=o:null),class:"border p-2 w-full"},null,8,["modelValue"]),e("span",ts,i(t(m).phone),1)])]),r(a,{type:"submit",class:"w-1/4 mt-4"},{default:M(()=>s[11]||(s[11]=[D("Registrar")])),_:1})])],32)])}}});export{Vs as default};
