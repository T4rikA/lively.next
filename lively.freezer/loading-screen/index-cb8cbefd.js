System.register(["./__root_module__-c4f77fb9.js"],function(){var ra,jb,pb;return{setters:[function(Ub){ra=Ub.b6;jb=Ub.C;pb=Ub.aw}],execute:function(){var Ub=lively.FreezerRuntime.recorderFor("StripeButton/index.js");Ub.Button=ra;Ub.Color=jb;var Jb=function(jd){var uc=lively.FreezerRuntime.recorderFor("StripeButton/index.js"),nd=uc.hasOwnProperty("StripeButton")&&"function"===typeof uc.StripeButton?uc.StripeButton:uc.StripeButton=function(wc){wc&&wc[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,
arguments)};return pb(nd,jd,[{key:"onDrop",value:function(wc){(wc=$jscomp.makeIterator(wc.hand.grabbedMorphs).next().value)&&wc.isLabel&&(this.label=wc.textAndAttributes,wc.remove())}},{key:"onHoverIn",value:function(wc){pb._get(Object.getPrototypeOf(nd.prototype),"onHoverIn",this).call(this,wc);!1!==this.haloShadowEnabled&&(wc=this.dropShadow.toJson(),wc.blur=10,wc.distance=3,this.animate({dropShadow:wc,duration:200}))}},{key:"onHoverOut",value:function(wc){pb._get(Object.getPrototypeOf(nd.prototype),
"onHoverOut",this).call(this,wc);!1!==this.haloShadowEnabled&&(wc=this.dropShadow.toJson(),wc.blur=6,wc.distance=1,this.animate({dropShadow:wc,duration:200}))}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"StripeButton"}},{key:"properties",get:function(){return{haloShadowEnabled:{defaultValue:!0},toggleFill:{}}}}],uc,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},
package:function(){return{name:"StripeButton",version:"0.1.1-26"}}},{start:121,end:1027})}(Ub.Button);Jb=Ub.StripeButton;Ub.default=Jb}}});System.register("16",["./__root_module__-c4f77fb9.js","kld-intersections","./index-cb8cbefd.js"],function(){return{setters:[function(){},function(){},function(){}],execute:function(){}}});