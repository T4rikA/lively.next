System.register(["./__root_module__-590131e3.js","./index-c8605e13.js","./index-1bb77cad.js"],function(){var Sa,Lb,Vb,Fc,jc;return{setters:[function(sd){Sa=sd.M;Lb=sd.ba;Vb=sd.r;Fc=sd.i},function(sd){jc=sd.e},function(){}],execute:function(){var sd=lively.FreezerRuntime.recorderFor("VersionChecker/index.js");sd.Morph=Sa;sd.runCommand=Lb;sd.evalOnServer=jc;sd.resource=Vb;var kd=function(Cd){var ed=lively.FreezerRuntime.recorderFor("VersionChecker/index.js"),Zc=ed.hasOwnProperty("VersionChecker")&&
"function"===typeof ed.VersionChecker?ed.VersionChecker:ed.VersionChecker=function(bd){bd&&bd[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Fc(Zc,Cd,[{key:"onLoad",value:function(){this.isComponent||this.withAllSubmorphsDo(function(bd){return bd.halosEnabled=!1})}},{key:"checkVersion",value:function(){this.reset();this.checkIfUpToDate()}},{key:"onMouseDown",value:function(bd){Fc._get(Object.getPrototypeOf(Zc.prototype),"onMouseDown",
this).call(this,bd);this.isComponent||this.checkVersion()}},{key:"relayout",value:function(){var bd=this;this.world().withTopBarDo(function(yd){bd.bottomLeft=yd.sideBar&&yd.sideBar.visible?yd.sideBar.bottomRight.addXY(10,-10):bd.world().visibleBounds().insetBy(10).bottomLeft()})}},{key:"checkIfUpToDate",value:function(){var bd=this,yd,ke,ue,He,ld,Wd,gc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(cd){switch(cd.nextAddress){case 1:return yd="git rev-parse master",cd.yield(sd.evalOnServer("System.baseURL").then(function(Bd){return Bd.replace("file://",
"")}),2);case 2:return ke=cd.yieldResult,cd.yield(sd.runCommand("git fetch",{cwd:ke}).whenDone(),3);case 3:return cd.yield(sd.runCommand(yd,{cwd:ke}).whenDone(),4);case 4:return ue=cd.yieldResult,He=ue.stdout,ld=He.split("\n")[0],cd.yield(sd.resource("https://api.github.com/repos/LivelyKernel/lively.next/commits/master").readJson(),5);case 5:return Wd=cd.yieldResult,gc=Wd.sha,ld!=gc?cd.return(bd.showOutdated(ld.slice(0,6))):cd.return(bd.showUpToDate(ld.slice(0,6)))}})}},{key:"showOutdated",value:function(bd){var yd=
this.ui,ke=yd.checking,ue=yd.outdated;yd.status.value=["Version: ",{},"["+bd+"]",{fontWeight:"bold"}," (Please update!)"];ke.visible=ke.isLayoutable=!1;ue.visible=ue.isLayoutable=!0}},{key:"showUpToDate",value:function(bd){var yd=this.ui,ke=yd.checking,ue=yd.latest;yd.status.value=["Version: ",{},"["+bd+"]",{fontWeight:"bold"}];ke.visible=ke.isLayoutable=!1;ue.visible=ue.isLayoutable=!0}},{key:"reset",value:function(){var bd=this.ui,yd=bd.checking,ke=bd.outdated,ue=bd.latest;bd.status.value="Checking version...";
yd.visible=yd.isLayoutable=!0;ke.visible=ue.visible=ke.isLayoutable=ue.isLayoutable=!1}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"VersionChecker"}},{key:"properties",get:function(){return{isEpiMorph:{derived:!0,get:function(){return!this.isComponent}},respondsToVisibleWindow:{derived:!0,get:function(){return!this.isComponent}},ui:{derived:!0,get:function(){return{status:this.get("version status label"),checking:this.get("loading indicator"),outdated:this.get("icon outdated"),
latest:this.get("icon latest")}}}}}}],ed,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"VersionChecker",version:"0.1.1-27"}}},{start:232,end:2913})}(sd.Morph);kd=sd.VersionChecker;sd.default=kd}}});