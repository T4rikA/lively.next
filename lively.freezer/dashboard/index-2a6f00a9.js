System.register(["./__root_module__-64e296ea.js"],function(){var Ba,Ab,Qb;return{setters:[function(dc){Ba=dc.b5;Ab=dc.C;Qb=dc.at}],execute:function(){var dc=lively.FreezerRuntime.recorderFor("StripeButton/index.js");dc.Button=Ba;dc.Color=Ab;var Xb=function(Xd){var ad=lively.FreezerRuntime.recorderFor("StripeButton/index.js"),Nd=ad.hasOwnProperty("StripeButton")&&"function"===typeof ad.StripeButton?ad.StripeButton:ad.StripeButton=function(dd){dd&&dd[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,
arguments)};return Qb(Nd,Xd,[{key:"onDrop",value:function(dd){(dd=$jscomp.makeIterator(dd.hand.grabbedMorphs).next().value)&&dd.isLabel&&(this.label=dd.textAndAttributes,dd.remove())}},{key:"onHoverIn",value:function(dd){Qb._get(Object.getPrototypeOf(Nd.prototype),"onHoverIn",this).call(this,dd);!1!==this.haloShadowEnabled&&(dd=this.dropShadow.toJson(),dd.blur=10,dd.distance=3,this.animate({dropShadow:dd,duration:200}))}},{key:"onHoverOut",value:function(dd){Qb._get(Object.getPrototypeOf(Nd.prototype),
"onHoverOut",this).call(this,dd);!1!==this.haloShadowEnabled&&(dd=this.dropShadow.toJson(),dd.blur=6,dd.distance=1,this.animate({dropShadow:dd,duration:200}))}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"StripeButton"}},{key:"properties",get:function(){return{haloShadowEnabled:{defaultValue:!0},toggleFill:{}}}}],ad,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},
package:function(){return{name:"StripeButton",version:"0.1.1-26"}}},{start:121,end:1027})}(dc.Button);Xb=dc.StripeButton;dc.default=Xb}}});System.register("19",["./__root_module__-64e296ea.js","kld-intersections","./index-2a6f00a9.js"],function(){return{setters:[function(){},function(){},function(){}],execute:function(){}}});