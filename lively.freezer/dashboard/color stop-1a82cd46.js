System.register(["./__root_module__-db735625.js"],function(){var db,Zb,lc,Uc;return{setters:[function(Bc){db=Bc.Q;Zb=Bc.g;lc=Bc.r;Uc=Bc.i}],execute:function(){var Bc=lively.FreezerRuntime.recorderFor("ColorStop/index.js");Bc.Polygon=db;Bc.signal=Zb;Bc.resource=lc;var Vd=function(Od){var je=lively.FreezerRuntime.recorderFor("ColorStop/index.js"),Bd=je.hasOwnProperty("ColorStop")&&"function"===typeof je.ColorStop?je.ColorStop:je.ColorStop=function(jd){jd&&jd[Symbol.for("lively-instance-restorer")]||
this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Uc(Bd,Od,[{key:"forStop",value:function(jd){this.stop=jd;this.refresh();return this}},{key:"refresh",value:function(){this.getSubmorphNamed("transparent").fill=this.stop.color;this.getSubmorphNamed("opaque").fill=this.stop.color.withA(1)}},{key:"positionIn",value:function(jd){this.bottomCenter=jd.getPositionFor(this.stop)}},{key:"onDrag",value:function(jd){jd=this.getGlobalTransform().inverse().transformDirection(jd.state.dragDelta);
Bc.signal(this,"moveColorStop",[this.stop,jd.x])}},{key:"onMouseDown",value:function(jd){Uc._get(Object.getPrototypeOf(Bd.prototype),"onMouseDown",this).call(this,jd);this.select(this)}},{key:"select",value:function(jd){this.master="styleguide://SystemWidgets/gradient editor/color stop/selected"}},{key:"deselect",value:function(){this.master="styleguide://SystemWidgets/gradient editor/color stop/default"}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"ColorStop"}},{key:"properties",
get:function(){return{isSelected:{derived:!0,get:function(){return this.master.equals("styleguide://SystemWidgets/gradient editor/color stop/selected")}}}}}],je,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"ColorStop",version:"0.1.1-17"}}},{start:163,end:1235})}(Bc.Polygon);Vd=Bc.ColorStop;Bc.default=Vd}}});