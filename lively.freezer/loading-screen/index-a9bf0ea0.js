System.register(["./__root_module__-590131e3.js"],function(){var Sa,Lb,Vb,Fc;return{setters:[function(jc){Sa=jc.M;Lb=jc.I;Vb=jc.C;Fc=jc.i}],execute:function(){var jc=lively.FreezerRuntime.recorderFor("FastLoadToggler/index.js");jc.Morph=Sa;jc.Icon=Lb;jc.Color=Vb;var sd=function(kd){var Cd=lively.FreezerRuntime.recorderFor("FastLoadToggler/index.js"),ed=Cd.hasOwnProperty("FastLoadToggler")&&"function"===typeof Cd.FastLoadToggler?Cd.FastLoadToggler:Cd.FastLoadToggler=function(Zc){Zc&&Zc[Symbol.for("lively-instance-restorer")]||
this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Fc(ed,kd,[{key:"onLoad",value:function(){localStorage.getItem("lively.load-config")||localStorage.setItem("lively.load-config",JSON.stringify({"lively.lang":"dynamic","lively.ast":"dynamic","lively.source-transform":"dynamic","lively.classes":"dynamic","lively.vm":"dynamic","lively.modules":"dynamic","lively.user":"dynamic","lively.storage":"dynamic","lively.morphic":"dynamic"}))}},{key:"onMouseDown",value:function(Zc){Fc._get(Object.getPrototypeOf(ed.prototype),
"onMouseDown",this).call(this,Zc);this.toggleFastLoad()}},{key:"refresh",value:function(){var Zc=this.getSubmorphNamed("toggle indicator"),bd=this.getSubmorphNamed("label"),yd=this.getSubmorphNamed("bolt"),ke=Object.values(this.loadConfig).every(function(He){return"frozen"==He}),ue=ke?this.owner.haloColor:this.owner.get("label").fontColor;Zc.fontColor=bd.fontColor=yd.fontColor=ue;Zc.textAndAttributes=jc.Icon.textAttribute(ke?"toggle-on":"toggle-off")}},{key:"toggleFastLoad",value:function(){var Zc=
this.loadConfig,bd=Object.values(Zc).every(function(ke){return"frozen"==ke}),yd;for(yd in Zc)Zc[yd]=bd?"dynamic":"frozen";this.loadConfig=Zc;this.refresh()}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"FastLoadToggler"}},{key:"properties",get:function(){return{loadConfig:{derived:!0,get:function(){return JSON.parse(localStorage.getItem("lively.load-config")||"{}")},set:function(Zc){localStorage.setItem("lively.load-config",JSON.stringify(Zc))}}}}}],Cd,{pathInPackage:function(){return"index.js"},
unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"FastLoadToggler",version:"0.1.1-17"}}},{start:112,end:1847})}(jc.Morph);sd=jc.FastLoadToggler;jc.default=sd}}});