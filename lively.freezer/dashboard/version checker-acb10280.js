System.register(["./__root_module__-896eff71.js","./index-8182bffa.js","kld-intersections","./index-e10873ad.js"],function(){var $a,Vb,jc,Wc,wc;return{setters:[function(Ud){$a=Ud.M;Vb=Ud.bc;jc=Ud.r;Wc=Ud.i},function(Ud){wc=Ud.e},function(){},function(){}],execute:function(){var Ud=lively.FreezerRuntime.recorderFor("VersionChecker/index.js");Ud.Morph=$a;Ud.runCommand=Vb;Ud.evalOnServer=wc;Ud.resource=jc;var Kd=function(he){var xd=lively.FreezerRuntime.recorderFor("VersionChecker/index.js"),gd=
xd.hasOwnProperty("VersionChecker")&&"function"===typeof xd.VersionChecker?xd.VersionChecker:xd.VersionChecker=function(Ld){Ld&&Ld[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return Wc(gd,he,[{key:"onLoad",value:function(){this.isComponent||this.withAllSubmorphsDo(function(Ld){return Ld.halosEnabled=!1})}},{key:"checkVersion",value:function(){this.reset();this.checkIfUpToDate()}},{key:"onMouseDown",value:function(Ld){Wc._get(Object.getPrototypeOf(gd.prototype),
"onMouseDown",this).call(this,Ld);this.isComponent||this.checkVersion()}},{key:"relayout",value:function(){var Ld=this;this.world().withTopBarDo(function(Pd){Ld.bottomLeft=Pd.sideBar&&Pd.sideBar.visible?Pd.sideBar.bottomRight.addXY(10,-10):Ld.world().visibleBounds().insetBy(10).bottomLeft()})}},{key:"checkIfUpToDate",value:function(){var Ld=this,Pd,af,bf,Ve,Ad,xe,qc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(td){switch(td.nextAddress){case 1:return Pd="git rev-parse master",td.yield(Ud.evalOnServer("System.baseURL").then(function(be){return be.replace("file://",
"")}),2);case 2:return af=td.yieldResult,td.yield(Ud.runCommand("git fetch",{cwd:af}).whenDone(),3);case 3:return td.yield(Ud.runCommand(Pd,{cwd:af}).whenDone(),4);case 4:return bf=td.yieldResult,Ve=bf.stdout,Ad=Ve.split("\n")[0],td.yield(Ud.resource("https://api.github.com/repos/LivelyKernel/lively.next/commits/master").readJson(),5);case 5:return xe=td.yieldResult,qc=xe.sha,Ad!=qc?td.return(Ld.showOutdated(Ad.slice(0,6))):td.return(Ld.showUpToDate(Ad.slice(0,6)))}})}},{key:"showOutdated",value:function(Ld){var Pd=
this.ui,af=Pd.checking,bf=Pd.outdated;Pd.status.value=["Version: ",{},"["+Ld+"]",{fontWeight:"bold"}," (Please update!)"];af.visible=af.isLayoutable=!1;bf.visible=bf.isLayoutable=!0}},{key:"showUpToDate",value:function(Ld){var Pd=this.ui,af=Pd.checking,bf=Pd.latest;Pd.status.value=["Version: ",{},"["+Ld+"]",{fontWeight:"bold"}];af.visible=af.isLayoutable=!1;bf.visible=bf.isLayoutable=!0}},{key:"reset",value:function(){var Ld=this.ui,Pd=Ld.checking,af=Ld.outdated,bf=Ld.latest;Ld.status.value="Checking version...";
Pd.visible=Pd.isLayoutable=!0;af.visible=bf.visible=af.isLayoutable=bf.isLayoutable=!1}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"VersionChecker"}},{key:"properties",get:function(){return{isEpiMorph:{derived:!0,get:function(){return!this.isComponent}},respondsToVisibleWindow:{derived:!0,get:function(){return!this.isComponent}},ui:{derived:!0,get:function(){return{status:this.get("version status label"),checking:this.get("loading indicator"),outdated:this.get("icon outdated"),
latest:this.get("icon latest")}}}}}}],xd,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"VersionChecker",version:"0.1.1-27"}}},{start:232,end:2913})}(Ud.Morph);Kd=Ud.VersionChecker;Ud.default=Kd}}});