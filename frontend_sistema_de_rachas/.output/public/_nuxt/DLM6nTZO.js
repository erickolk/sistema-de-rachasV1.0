import{m as i,c as a,C as c,a as e,t as d,A as s,o as n}from"./DJoCQzgD.js";const l={class:"mb-8"},r={key:0,class:"flex justify-between items-center mb-4"},m={class:"text-lg font-medium"},u={class:"page-section-action"},_={class:"bg-white/5 p-4 rounded-lg shadow-md"},f=i({__name:"PageSection",props:{title:{type:String,required:!0},withoutHeader:{type:Boolean,default:!1}},setup(o){return(t,h)=>(n(),a("div",l,[o.withoutHeader?c("",!0):(n(),a("div",r,[e("h2",m,d(o.title),1),e("div",u,[s(t.$slots,"action")])])),e("div",_,[s(t.$slots,"content")]),e("div",null,[s(t.$slots,"actions")])]))}});export{f as _};
