(()=>{"use strict";const e=class{constructor(e){this.root=e,this.name="한동룡",this.render()}render(){return`<div>웃을 때 마다${this.name}</div>`}},t=class{constructor(e){this.root=e,this.render()}render(){return"<div>사랑을 할 순 없어도 그리울 순 있잖아요</div>"}},n=async()=>{const n=[{path:"/",element:e},{path:"/write",element:t}].map((e=>({route:e,isMatch:e.path===location.pathname})));console.log(n);const r=n.find((e=>e.isMatch));if(r){const e=new r.route.element;document.querySelector("#root").innerHTML=e.render()}else document.querySelector("#root").innerHTML="<div>not found page</div>"};document.querySelector("#push-state").addEventListener("click",(()=>{history.pushState({data:"write"},"작성페이지","/write"),n()})),window.addEventListener("popstate",n);const r=n;new class{constructor(e){this.body=e,this.render()}render(){document.addEventListener("DOMContentLoaded",(()=>{r()}))}}(document.querySelector("body"))})();