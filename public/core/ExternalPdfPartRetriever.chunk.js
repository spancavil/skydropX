/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[8],{331:function(Ca,va,aa){aa.r(va);var pa=aa(2);Ca=aa(44);var ja=aa(126),la=aa(283),fa=aa(344),ca=window;aa=function(){function z(w,r){this.JL=function(b){b=b.split(".");return b[b.length-1].match(/(jpg|jpeg|png|gif)$/i)};r=r||{};this.url=w;this.filename=r.filename||w;this.ie=r.customHeaders;this.x8=!!r.useDownloader;this.withCredentials=!!r.withCredentials}z.prototype.Jy=function(w){this.ie=w};z.prototype.getCustomHeaders=function(){return this.ie};
z.prototype.getFileData=function(w){var r=this,b=this,a=new XMLHttpRequest,e=0===this.url.indexOf("blob:")?"blob":"arraybuffer";a.open("GET",this.url,!0);a.withCredentials=this.withCredentials;a.responseType=e;this.ie&&Object.keys(this.ie).forEach(function(x){a.setRequestHeader(x,r.ie[x])});var f=/^https?:/i.test(this.url);a.addEventListener("load",function(x){return Object(pa.b)(this,void 0,void 0,function(){var n,h,y,ba,ka,ha;return Object(pa.d)(this,function(ia){switch(ia.label){case 0:if(200!==
this.status&&(f||0!==this.status))return[3,10];b.trigger(z.Events.DOCUMENT_LOADING_PROGRESS,[x.loaded,x.loaded]);if("blob"!==this.responseType)return[3,4];n=this.response;return b.JL(b.filename)?[4,Object(fa.a)(n)]:[3,2];case 1:return h=ia.ia(),b.fileSize=h.byteLength,w(new Uint8Array(h)),[3,3];case 2:y=new FileReader,y.onload=function(ea){ea=new Uint8Array(ea.target.result);b.fileSize=ea.length;w(ea)},y.readAsArrayBuffer(n),ia.label=3;case 3:return[3,9];case 4:ia.pi.push([4,8,,9]);ba=new Uint8Array(this.response);
if(!b.JL(b.filename))return[3,6];n=new Blob([ba.buffer]);return[4,Object(fa.a)(n)];case 5:return h=ia.ia(),b.fileSize=h.byteLength,w(new Uint8Array(h)),[3,7];case 6:b.fileSize=ba.length,w(ba),ia.label=7;case 7:return[3,9];case 8:return ia.ia(),b.trigger(z.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:ka=x.currentTarget,ha=Object(ja.b)(ka),b.trigger(z.Events.ERROR,["pdfLoad",this.status+" "+ka.statusText,ha]),ia.label=11;case 11:return b.Ut=null,[2]}})})},!1);a.onprogress=
function(x){b.trigger(z.Events.DOCUMENT_LOADING_PROGRESS,[x.loaded,0<x.total?x.total:0])};a.addEventListener("error",function(){b.trigger(z.Events.ERROR,["pdfLoad","Network failure"]);b.Ut=null},!1);a.send();this.Ut=a};z.prototype.getFile=function(){var w=this;return new Promise(function(r){ca.utils.isJSWorker&&r(w.url);if(w.x8){var b=Object(pa.a)({url:w.url},w.ie?{customHeaders:w.ie}:{});r(b)}r(null)})};z.prototype.abort=function(){this.Ut&&(this.Ut.abort(),this.Ut=null)};z.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",
ERROR:"error"};return z}();Object(Ca.a)(aa);Object(la.a)(aa);Object(la.b)(aa);va["default"]=aa}}]);}).call(this || window)
