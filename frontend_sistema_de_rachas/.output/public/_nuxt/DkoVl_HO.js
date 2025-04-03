import{v as Dt,r as j,aa as U,ah as ht,$ as mt}from"./DJoCQzgD.js";import{e as Mt,u as Tt,f as St}from"./BhaXg5TM.js";import{P as g}from"./BdHHas3-.js";import{g as yt}from"./C932wzq6.js";import{f as Et,b as bt}from"./Ct042bsD.js";var ut={exports:{}},Ot=ut.exports,pt;function wt(){return pt||(pt=1,function(p,f){(function($,y){p.exports=y()})(Ot,function(){var $=1e3,y=6e4,x=36e5,M="millisecond",F="second",O="minute",h="hour",I="day",H="week",S="month",B="quarter",A="year",P="date",c="Invalid Date",E=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,L=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,C={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var a=["th","st","nd","rd"],t=i%100;return"["+i+(a[(t-20)%10]||a[t]||a[0])+"]"}},b=function(i,a,t){var r=String(i);return!r||r.length>=a?i:""+Array(a+1-r.length).join(t)+i},Q={s:b,z:function(i){var a=-i.utcOffset(),t=Math.abs(a),r=Math.floor(t/60),e=t%60;return(a<=0?"+":"-")+b(r,2,"0")+":"+b(e,2,"0")},m:function i(a,t){if(a.date()<t.date())return-i(t,a);var r=12*(t.year()-a.year())+(t.month()-a.month()),e=a.clone().add(r,S),o=t-e<0,u=a.clone().add(r+(o?-1:1),S);return+(-(r+(t-e)/(o?e-u:u-e))||0)},a:function(i){return i<0?Math.ceil(i)||0:Math.floor(i)},p:function(i){return{M:S,y:A,w:H,d:I,D:P,h,m:O,s:F,ms:M,Q:B}[i]||String(i||"").toLowerCase().replace(/s$/,"")},u:function(i){return i===void 0}},Y="en",_={};_[Y]=C;var N="$isDayjsObject",W=function(i){return i instanceof d||!(!i||!i[N])},R=function i(a,t,r){var e;if(!a)return Y;if(typeof a=="string"){var o=a.toLowerCase();_[o]&&(e=o),t&&(_[o]=t,e=o);var u=a.split("-");if(!e&&u.length>1)return i(u[0])}else{var m=a.name;_[m]=a,e=m}return!r&&e&&(Y=e),e||!r&&Y},s=function(i,a){if(W(i))return i.clone();var t=typeof a=="object"?a:{};return t.date=i,t.args=arguments,new d(t)},n=Q;n.l=R,n.i=W,n.w=function(i,a){return s(i,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var d=function(){function i(t){this.$L=R(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[N]=!0}var a=i.prototype;return a.parse=function(t){this.$d=function(r){var e=r.date,o=r.utc;if(e===null)return new Date(NaN);if(n.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var u=e.match(E);if(u){var m=u[2]-1||0,v=(u[7]||"0").substring(0,3);return o?new Date(Date.UTC(u[1],m,u[3]||1,u[4]||0,u[5]||0,u[6]||0,v)):new Date(u[1],m,u[3]||1,u[4]||0,u[5]||0,u[6]||0,v)}}return new Date(e)}(t),this.init()},a.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},a.$utils=function(){return n},a.isValid=function(){return this.$d.toString()!==c},a.isSame=function(t,r){var e=s(t);return this.startOf(r)<=e&&e<=this.endOf(r)},a.isAfter=function(t,r){return s(t)<this.startOf(r)},a.isBefore=function(t,r){return this.endOf(r)<s(t)},a.$g=function(t,r,e){return n.u(t)?this[r]:this.set(e,t)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(t,r){var e=this,o=!!n.u(r)||r,u=n.p(t),m=function(z,w){var G=n.w(e.$u?Date.UTC(e.$y,w,z):new Date(e.$y,w,z),e);return o?G:G.endOf(I)},v=function(z,w){return n.w(e.toDate()[z].apply(e.toDate("s"),(o?[0,0,0,0]:[23,59,59,999]).slice(w)),e)},D=this.$W,T=this.$M,k=this.$D,X="set"+(this.$u?"UTC":"");switch(u){case A:return o?m(1,0):m(31,11);case S:return o?m(1,T):m(0,T+1);case H:var q=this.$locale().weekStart||0,rt=(D<q?D+7:D)-q;return m(o?k-rt:k+(6-rt),T);case I:case P:return v(X+"Hours",0);case h:return v(X+"Minutes",1);case O:return v(X+"Seconds",2);case F:return v(X+"Milliseconds",3);default:return this.clone()}},a.endOf=function(t){return this.startOf(t,!1)},a.$set=function(t,r){var e,o=n.p(t),u="set"+(this.$u?"UTC":""),m=(e={},e[I]=u+"Date",e[P]=u+"Date",e[S]=u+"Month",e[A]=u+"FullYear",e[h]=u+"Hours",e[O]=u+"Minutes",e[F]=u+"Seconds",e[M]=u+"Milliseconds",e)[o],v=o===I?this.$D+(r-this.$W):r;if(o===S||o===A){var D=this.clone().set(P,1);D.$d[m](v),D.init(),this.$d=D.set(P,Math.min(this.$D,D.daysInMonth())).$d}else m&&this.$d[m](v);return this.init(),this},a.set=function(t,r){return this.clone().$set(t,r)},a.get=function(t){return this[n.p(t)]()},a.add=function(t,r){var e,o=this;t=Number(t);var u=n.p(r),m=function(T){var k=s(o);return n.w(k.date(k.date()+Math.round(T*t)),o)};if(u===S)return this.set(S,this.$M+t);if(u===A)return this.set(A,this.$y+t);if(u===I)return m(1);if(u===H)return m(7);var v=(e={},e[O]=y,e[h]=x,e[F]=$,e)[u]||1,D=this.$d.getTime()+t*v;return n.w(D,this)},a.subtract=function(t,r){return this.add(-1*t,r)},a.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||c;var o=t||"YYYY-MM-DDTHH:mm:ssZ",u=n.z(this),m=this.$H,v=this.$m,D=this.$M,T=e.weekdays,k=e.months,X=e.meridiem,q=function(w,G,at,ct){return w&&(w[G]||w(r,o))||at[G].slice(0,ct)},rt=function(w){return n.s(m%12||12,w,"0")},z=X||function(w,G,at){var ct=w<12?"AM":"PM";return at?ct.toLowerCase():ct};return o.replace(L,function(w,G){return G||function(at){switch(at){case"YY":return String(r.$y).slice(-2);case"YYYY":return n.s(r.$y,4,"0");case"M":return D+1;case"MM":return n.s(D+1,2,"0");case"MMM":return q(e.monthsShort,D,k,3);case"MMMM":return q(k,D);case"D":return r.$D;case"DD":return n.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return q(e.weekdaysMin,r.$W,T,2);case"ddd":return q(e.weekdaysShort,r.$W,T,3);case"dddd":return T[r.$W];case"H":return String(m);case"HH":return n.s(m,2,"0");case"h":return rt(1);case"hh":return rt(2);case"a":return z(m,v,!0);case"A":return z(m,v,!1);case"m":return String(v);case"mm":return n.s(v,2,"0");case"s":return String(r.$s);case"ss":return n.s(r.$s,2,"0");case"SSS":return n.s(r.$ms,3,"0");case"Z":return u}return null}(w)||u.replace(":","")})},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(t,r,e){var o,u=this,m=n.p(r),v=s(t),D=(v.utcOffset()-this.utcOffset())*y,T=this-v,k=function(){return n.m(u,v)};switch(m){case A:o=k()/12;break;case S:o=k();break;case B:o=k()/3;break;case H:o=(T-D)/6048e5;break;case I:o=(T-D)/864e5;break;case h:o=T/x;break;case O:o=T/y;break;case F:o=T/$;break;default:o=T}return e?o:n.a(o)},a.daysInMonth=function(){return this.endOf(S).$D},a.$locale=function(){return _[this.$L]},a.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),o=R(t,r,!0);return o&&(e.$L=o),e},a.clone=function(){return n.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},i}(),l=d.prototype;return s.prototype=l,[["$ms",M],["$s",F],["$m",O],["$H",h],["$W",I],["$M",S],["$y",A],["$D",P]].forEach(function(i){l[i[1]]=function(a){return this.$g(a,i[0],i[1])}}),s.extend=function(i,a){return i.$i||(i(a,d,s),i.$i=!0),s},s.locale=R,s.isDayjs=W,s.unix=function(i){return s(1e3*i)},s.en=_[Y],s.Ls=_,s.p={},s})}(ut)),ut.exports}var Ft=wt();const vt=yt(Ft);var dt={exports:{}},It=dt.exports,$t;function At(){return $t||($t=1,function(p,f){(function($,y){p.exports=y()})(It,function(){var $="minute",y=/[+-]\d\d(?::?\d\d)?/g,x=/([+-]|\d\d)/g;return function(M,F,O){var h=F.prototype;O.utc=function(c){var E={date:c,utc:!0,args:arguments};return new F(E)},h.utc=function(c){var E=O(this.toDate(),{locale:this.$L,utc:!0});return c?E.add(this.utcOffset(),$):E},h.local=function(){return O(this.toDate(),{locale:this.$L,utc:!1})};var I=h.parse;h.parse=function(c){c.utc&&(this.$u=!0),this.$utils().u(c.$offset)||(this.$offset=c.$offset),I.call(this,c)};var H=h.init;h.init=function(){if(this.$u){var c=this.$d;this.$y=c.getUTCFullYear(),this.$M=c.getUTCMonth(),this.$D=c.getUTCDate(),this.$W=c.getUTCDay(),this.$H=c.getUTCHours(),this.$m=c.getUTCMinutes(),this.$s=c.getUTCSeconds(),this.$ms=c.getUTCMilliseconds()}else H.call(this)};var S=h.utcOffset;h.utcOffset=function(c,E){var L=this.$utils().u;if(L(c))return this.$u?0:L(this.$offset)?S.call(this):this.$offset;if(typeof c=="string"&&(c=function(Y){Y===void 0&&(Y="");var _=Y.match(y);if(!_)return null;var N=(""+_[0]).match(x)||["-",0,0],W=N[0],R=60*+N[1]+ +N[2];return R===0?0:W==="+"?R:-R}(c),c===null))return this;var C=Math.abs(c)<=16?60*c:c,b=this;if(E)return b.$offset=C,b.$u=c===0,b;if(c!==0){var Q=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(b=this.local().add(C+Q,$)).$offset=C,b.$x.$localOffset=Q}else b=this.utc();return b};var B=h.format;h.format=function(c){var E=c||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return B.call(this,E)},h.valueOf=function(){var c=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*c},h.isUTC=function(){return!!this.$u},h.toISOString=function(){return this.toDate().toISOString()},h.toString=function(){return this.toDate().toUTCString()};var A=h.toDate;h.toDate=function(c){return c==="s"&&this.$offset?O(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():A.call(this)};var P=h.diff;h.diff=function(c,E,L){if(c&&this.$u===c.$u)return P.call(this,c,E,L);var C=this.local(),b=O(c).local();return P.call(C,b,E,L)}}})}(dt)),dt.exports}var _t=At();const kt=yt(_t);vt.extend(kt);const Pt=p=>{const f=vt(p).utc();return f.isValid()?f.format("DD/MM/YYYY"):"Invalid Date"},Yt={domingo:0,segunda:1,terca:2,quarta:3,quinta:4,sexta:5,sabado:6},xt=[0,1,2,3,4,5,6];class ot extends Error{}ot.prototype.name="InvalidTokenError";function Ct(p){return decodeURIComponent(atob(p).replace(/(.)/g,(f,$)=>{let y=$.charCodeAt(0).toString(16).toUpperCase();return y.length<2&&(y="0"+y),"%"+y}))}function Lt(p){let f=p.replace(/-/g,"+").replace(/_/g,"/");switch(f.length%4){case 0:break;case 2:f+="==";break;case 3:f+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Ct(f)}catch{return atob(f)}}function Rt(p,f){if(typeof p!="string")throw new ot("Invalid token specified: must be a string");f||(f={});const $=f.header===!0?0:1,y=p.split(".")[$];if(typeof y!="string")throw new ot(`Invalid token specified: missing part #${$+1}`);let x;try{x=Lt(y)}catch(M){throw new ot(`Invalid token specified: invalid base64 for part #${$+1} (${M.message})`)}try{return JSON.parse(x)}catch(M){throw new ot(`Invalid token specified: invalid json for part #${$+1} (${M.message})`)}}const lt=()=>{try{const p=localStorage.getItem("userToken");return p&&Rt(p).id||null}catch(p){return console.error("Erro ao decodificar o token:",p),null}},gt={[g.GOALKEEPER]:"GL",[g.DEFENDER]:"ZG",[g.RIGHT_BACK]:"LD",[g.LEFT_BACK]:"LE",[g.MIDFIELDER]:"ME",[g.DEFENSIVE_MIDFIELDER]:"VOL",[g.ATTACKING_MIDFIELDER]:"MA",[g.RIGHT_WINGER]:"PD",[g.LEFT_WINGER]:"PE",[g.FORWARD]:"AT",[g.STRIKER]:"CA"},jt=Object.keys(g).map((p,f)=>({label:`${gt[g[p]]} - ${g[p]}`,value:g[p]})),Ut={name:"",stars:1,position:g.GOALKEEPER},Ht={name:"",players:[]},st=U({name:"",stars:1,position:g.GOALKEEPER}),V=U([]),Nt=U([]),Z=U([]),tt=U({name:"",players:[]});j();const Wt=j(""),Gt=j(""),K=j({startTime:"",finishTime:"",day:""}),nt=j(),J=U([]),Vt=new Date().getFullYear(),Kt=Pt(new Date().toISOString().split("T")[0]),ft=j([]),et=U({}),it=j([]),Qt=()=>{const p=mt();ht();const f=Dt(),$=j(!1),y=j(!1),x={description:"",name:"",players:[],schedules:[],soccerField:"",teams:[],thumb:"",user:lt()},M=U({...x}),F=U({}),O=()=>{Object.assign(M,x),Object.assign(F,{}),y.value=!1},h=()=>{V.push({name:st.name,stars:st.stars||1,position:st.position||g.GOALKEEPER}),Object.assign(st,Ut)},I=s=>{console.log(s),V.splice(s,1)},H=(s,n)=>{V[s]&&(V[s].stars=n)},S=()=>{tt!=null&&tt.name&&(Z.push({...tt,players:[]}),Object.assign(tt,{...Ht}))},B=s=>{Z.splice(s,1)},A=(s,n)=>{Z[s].players.splice(n,1)},P=s=>s.players.reduce((n,d)=>n+(d.stars||0),0),c=async()=>{const s=await bt();ft.value=s.map(n=>({...n,name:`${n.name} - R$ ${n.rentalValue.toFixed(2)}`}))},E=async s=>{try{if(s===200)p.push("/dashboard-client"),f.add({severity:"success",summary:"Partida registrada com sucesso!",life:3e3});else throw new Error(`Erro ao salvar partida, STATUS_CODE: ${s}`)}catch{f.add({severity:"error",summary:"Erro ao salvar partida",life:3e3})}},L=async s=>{try{if($.value=!0,y.value=!0,!lt()){f.add({severity:"error",summary:"Erro de autenticação",detail:"Realize o login para continuar",life:3e3});return}const n={};if(s.name||(n.name="O nome da partida é obrigatório"),s.soccerField||(n.soccerField="Selecione um campo para a partida"),J.length||(n.schedules="Adicione pelo menos um horário para a partida"),Object.keys(n).length>0){Object.assign(F,n),f.add({severity:"error",summary:"Erro de validação",detail:"Por favor, preencha todos os campos obrigatórios",life:3e3});return}const d={name:s.name,description:s.description||"",thumb:s.thumb||"",soccerField:s.soccerField,schedules:J.map(l=>({day:l.day,startTime:l.startTime,finishTime:l.finishTime})),players:V.map(l=>({id:"",name:l.name,position:l.position,stars:l.stars})),teams:Z.map(l=>({name:l.name,players:l.players.map(i=>({id:"",name:i.name,position:i.position,stars:i.stars}))})),user:lt()};console.log("Dados a serem enviados:",d);try{const l=et.id?await Tt(et.id,d):await St(d);if(console.log("Resposta da API:",l),l.status===200||l.status===201)f.add({severity:"success",summary:et.id?"Partida atualizada":"Partida criada",detail:et.id?"Partida atualizada com sucesso!":"Partida criada com sucesso!",life:3e3}),p.push("/dashboard-client");else throw new Error(`Erro ao salvar partida: ${l.status}`)}catch(l){console.error("Erro na chamada da API:",l);const i=l.message||"Erro ao salvar partida. Tente novamente.";f.add({severity:"error",summary:"Erro ao salvar partida",detail:i,life:3e3})}}catch(n){console.error("Erro ao submeter formulário:",n),f.add({severity:"error",summary:"Erro ao salvar partida",detail:"Verifique os dados e tente novamente",life:3e3})}finally{$.value=!1}},C=async(s,n)=>{try{const d=await Et(s,n);return d?Array.isArray(d)?d:typeof d=="object"?Object.values(d).reduce((l,i)=>l.concat(i),[]):[]:[]}catch(d){throw console.error("Erro ao buscar horários disponíveis:",d),d}},b=async()=>{try{if(!nt.value||!M.soccerField){it.value=[],K.value={startTime:"",finishTime:"",day:""};return}$.value=!0;const s=new Date(nt.value),n=s.getFullYear(),d=String(s.getMonth()+1).padStart(2,"0"),l=String(s.getDate()).padStart(2,"0"),i=`${n}-${d}-${l}`,a=`${l}/${d}/${n}`;console.log("Data formatada para API:",i);const t=await C(M.soccerField,i);if(!(t!=null&&t.length)){it.value=[],K.value={startTime:"",finishTime:"",day:""},f.add({severity:"info",summary:"Sem horários",detail:"Não há horários disponíveis para esta data",life:3e3});return}it.value=t.map(r=>({label:`${r.startTime} - ${r.finishTime}`,value:{startTime:r.startTime,finishTime:r.finishTime,day:a}}))}catch(s){console.error("Erro ao buscar horários disponíveis:",s),f.add({severity:"error",summary:"Erro",detail:"Não foi possível carregar os horários disponíveis",life:3e3}),it.value=[],K.value={startTime:"",finishTime:"",day:""}}finally{$.value=!1}},Q=()=>{if(!K.value||!nt.value)return;const s=new Date(nt.value),n=s.getFullYear(),d=String(s.getMonth()+1).padStart(2,"0"),l=String(s.getDate()).padStart(2,"0"),i=`${n}-${d}-${l}`;J.push({day:i,startTime:K.value.startTime,finishTime:K.value.finishTime}),K.value={startTime:"",finishTime:"",day:""}},Y=s=>J.splice(s,1),_=(s,n)=>{W(s)&&(n.preventDefault(),n.stopPropagation())},N=()=>{const s=ft.value.find(d=>d.id===M.soccerField);if(!s||!s.workDays)return[];const n=s.workDays.map(d=>Yt[d]);return xt.filter(d=>!n.includes(d))},W=s=>{const n=new Date(s.year,s.month,s.day).getDay();return N().includes(n)};return{dateError:Wt,scheduleError:Gt,selectedSchedule:K,schedules:J,selectedDate:nt,currentYear:Vt,currentDate:Kt,match:et,isLoading:$,form:M,formErrors:F,submitted:y,playerForm:st,players:V,editPlayers:Nt,playerPositionOptions:jt,playerPositionAbbreviations:gt,teamForm:tt,teams:Z,scheduleOptions:it,fieldOptions:ft,onSubmit:L,resetForm:O,isDateDisabled:W,handleSelectDate:b,addSchedule:Q,removeSchedule:Y,handleDateClick:_,fetchSoccerFields:c,addPlayer:h,removePlayer:I,updatePlayerStars:H,countPlayerStars:P,removeTeamPlayers:A,addTeam:S,removeTeam:B,handleNotificate:E,handleOnMountedForm:async()=>{var l,i,a,t;const s=ht(),n=mt(),d=s.params.id;if(d)try{const r=await Mt(d);r&&(Object.assign(et,{id:r.id,teams:r.teams||[],players:r.players||[],schedules:r.schedules||[]}),M.name=r.name,M.description=r.description,M.soccerField=r.soccerField.id,(l=r.players)!=null&&l.length&&V.splice(0,V.length,...r.players.map(e=>({id:e.id,name:e.name,stars:e.stars||1,position:e.position||g.GOALKEEPER}))),(i=r.teams)!=null&&i.length&&Z.splice(0,Z.length,...r.teams.map(e=>({id:e.id,name:e.name,players:e.players.map(o=>({id:o.id,name:o.name,stars:o.stars||1,position:o.position||g.GOALKEEPER}))}))),(a=r.schedules)!=null&&a.length&&J.splice(0,J.length,...r.schedules.map(e=>({day:e.day,startTime:e.startTime,finishTime:e.finishTime}))))}catch(r){if(console.error("Erro ao carregar dados da partida:",r),((t=r==null?void 0:r.response)==null?void 0:t.status)===401){f.add({severity:"error",summary:"Erro de autenticação",detail:"Por favor, faça login novamente",life:3e3}),n.push("/login");return}f.add({severity:"error",summary:"Erro",detail:"Não foi possível carregar os dados da partida",life:3e3}),n.push("/dashboard-client");return}await c()},getAvailableTimes:C}};export{Qt as useMatch};
