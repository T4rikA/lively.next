System.register(["./__root_module__-6d2e743c.js","kld-intersections"],function(Ma){var rb,Db,hc,Kb,id,Zc,yd,Kc,sc,bd,hd,se,xe,ne,Rc,Pd;return{setters:[function(Hb){rb=Hb.c;Db=Hb.P;hc=Hb.b;Kb=Hb.x;id=Hb.y;Zc=Hb.z;yd=Hb.A;Kc=Hb.r;sc=Hb.D;bd=Hb.E;hd=Hb.F;se=Hb.G;xe=Hb.H;ne=Hb.J;Rc=Hb.K;Pd=Hb.N},function(){}],execute:function(){function Hb(Fb,Ac,$c,Bc){Bc=void 0===Bc?{}:Bc;Bc=Bc.package||Vc.ObjectPackage.lookupModuleForClass(Fb.constructor,Bc);if(!Bc)throw Error("Object is not part of an object package: "+
Fb);return Bc.addScript(Fb,Ac,$c)}function Gc(Fb,Ac){Ac=Vc.normalizeOptions(Ac).System;Fb=(Fb=Fb[Symbol.for("lively-module-meta")])?Fb.package.name:null;return(Ac=(Fb?Vc.lookupPackage(Ac,Fb):{}).pkg)?!!Vc.ObjectPackage.forSystemPackage(Ac):!1}function ud(Fb,Ac){var $c,Bc,vd,pb,lb,Zb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Mb){return 1==Mb.nextAddress?($c=Fb.constructor,Vc.withSuperclasses($c),Symbol.for("lively-module-meta"),vd=Bc=Vc.ObjectPackage.lookupPackageForObject(Fb),pb=
vd.baseURL,lb=vd.System,Mb.yield(Bc.fork(Ac,{baseURL:pb,System:lb}),2)):3!=Mb.nextAddress?(Zb=Mb.yieldResult,Mb.yield(Vc.adoptObject(Fb,Zb.objectClass),3)):Mb.return(Zb.objectClass[Symbol.for("__LivelyClassName__")])})}Ma({addScript:Hb,interactivelyForkPackage:ud,isObjectClass:Gc});var Vc=lively.FreezerRuntime.recorderFor("lively.classes/object-classes.js");Vc.normalizeOptions=function(Fb){Fb=Object.assign({baseURL:Vc.defaultBaseURL,System:System},Fb);Fb.baseURL=Fb.baseURL.replace(/\/$/,"");return Fb};
Vc.addScript=Hb;Vc.isObjectClass=Gc;Vc.interactivelyForkPackage=ud;Vc.string=rb;Vc.Path=Db;Vc.arr=hc;Vc.parse=Kb;Vc.isValidIdentifier=id;Vc.stringify=Zc;Vc.parseFunction=yd;Vc.resource=Kc;Vc.runEval=sc;Vc.scripting=bd;Vc.ExportLookup=hd;var Id=Vc.scripting;Vc.ensurePackage=Id.ensurePackage;Vc.registerPackage=Id.registerPackage;Vc.importPackage=Id.importPackage;Vc.lookupPackage=Id.lookupPackage;Vc.module=Id.module;Vc.ImportInjector=Id.ImportInjector;Vc.RuntimeSourceDescriptor=se;Vc.toJsIdentifier=
xe;Vc.withSuperclasses=ne;Vc.adoptObject=Rc;Vc.classToFunctionTransform=Pd;Vc.objectPackageSym=Symbol.for("lively-object-package-data");Vc.defaultBaseURL="local://lively-object-modules";Vc.globalClasses=Object.keys(System.global).map(function(Fb){Fb=System.global[Fb];return"function"===typeof Fb&&Fb.name&&Fb}).filter(Boolean);Vc.addScript=Hb;Vc.addScript=Hb;Vc.isObjectClass=Gc;Vc.isObjectClass=Gc;Vc._packageStore=Vc._packageStore||{};Vc.interactivelyForkPackage=ud;Vc.interactivelyForkPackage=ud;Id=
function(Fb,Ac){this._id=Fb;this.options=Vc.normalizeOptions(Ac)};Id.lookupPackageForObject=function(Fb,Ac){return this.lookupPackageForClass(Fb.constructor,Ac)};Id.lookupPackageForClass=function(Fb,Ac){Ac=Vc.normalizeOptions(Ac).System;Fb=(Fb=Fb[Symbol.for("lively-module-meta")])?Fb.package.name:null;return(Ac=(Fb?Vc.lookupPackage(Ac,Fb):{}).pkg)?Vc.ObjectPackage.forSystemPackage(Ac):null};Id.lookupModuleForClass=function(Fb,Ac){Vc.normalizeOptions(Ac);Ac=this.lookupPackageForClass(Fb,Ac);Fb=Fb[Symbol.for("lively-module-meta")];
return new Vc.ObjectModule(Fb.pathInPackage,Ac)};Id.forSystemPackage=function(Fb){return this.packageStore[Fb.name]};Id.withId=function(Fb,Ac){return this.packageStore[Fb]||(this.packageStore[Fb]=new this(Fb,Ac))};Id.prototype.ensureSubModule=function(Fb){Fb=void 0===Fb?"index":Fb;var Ac=this,$c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Bc){return 1==Bc.nextAddress?($c=new Vc.ObjectModule(Fb,Ac),Bc.yield($c.ensureExistance(),2)):Bc.return($c)})};Id.prototype.resource=function(Fb){Fb=
void 0===Fb?"":Fb;return Vc.resource(this.packageURL).join(Fb)};Id.prototype.load=function(){return Vc.importPackage(this.System,this.packageURL)};Id.prototype.ensureExistance=function(){var Fb=this,Ac,$c,Bc,vd,pb,lb,Zb,Mb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(ub){switch(ub.nextAddress){case 1:return Ac=Fb.resource("/"),ub.yield(Ac.exists(),2);case 2:if(ub.yieldResult)return ub.return();$c=[{resource:Ac}];Bc=[{resource:Fb.resource("package.json"),content:JSON.stringify(Fb.config,
null,2)}];return ub.yield(Promise.all($c.map(function(rc){return rc.resource.mkdir()})),3);case 3:return ub.yield(Promise.all(Bc.map(function(rc){var Ua;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Lb){switch(Lb.nextAddress){case 1:return Lb.yield(rc.resource.exists(),2);case 2:if(!(Ua=!Lb.yieldResult)){Lb.jumpTo(3);break}return Lb.yield(rc.resource.write(rc.content),4);case 4:Ua=Lb.yieldResult;case 3:return Lb.return(Ua)}})})),4);case 4:return ub.yield(Fb.objectModule.ensureExistance(),
5);case 5:return vd=Fb,pb=vd.System,lb=vd.packageURL,Zb=vd.config,ub.yield(Vc.ensurePackage(pb,lb),6);case 6:return Mb=ub.yieldResult,Mb.registerWithConfig(Zb),console.log(Fb.packageURL+" REGISTERED"),ub.return(Fb)}})};Id.prototype.ensureObjectClass=function(Fb){var Ac=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function($c){return 1==$c.nextAddress?$c.yield(Ac.ensureExistance(),2):$c.return(Ac.objectModule.ensureObjectClass(Fb))})};Id.prototype.adoptObject=function(Fb){var Ac=this,$c;
return $jscomp.asyncExecutePromiseGeneratorProgram(function(Bc){if(1==Bc.nextAddress)return Ac.objectClass===Fb.constructor?Bc.return():Bc.yield(Ac.ensureObjectClass(Fb.constructor),2);$c=Bc.yieldResult;Vc.adoptObject(Fb,$c);Bc.jumpToEnd()})};Id.prototype.addScript=function(Fb,Ac,$c){return this.objectModule.addScript(Fb,Ac,$c)};Id.prototype.remove=function(){this.systemPackage.remove();delete Vc.ObjectPackage.packageStore[this.id];return this.resource().remove()};Id.prototype.renameObjectClass=function(Fb,
Ac){Ac=void 0===Ac?[]:Ac;var $c=this,Bc,vd,pb,lb,Zb,Mb,ub,rc,Ua,Lb,mb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Gb){if(1==Gb.nextAddress){Bc=$c;vd=Bc.objectClass;pb=Bc.System;if(!vd||vd[Symbol.for("__LivelyClassName__")]===Fb)return Gb.return(vd);if(!Vc.isValidIdentifier(Fb))throw Error(Fb+" is not a valid name for a class");Zb=lb=Vc.RuntimeSourceDescriptor.for(vd,pb);Mb=Zb.source;ub=Zb.ast;rc=ub.id;Ua=rc.start;Lb=rc.end;return Gb.yield(lb.changeSource(Mb.slice(0,Ua)+Fb+Mb.slice(Lb)),
2)}mb=$c.objectClass;Ac.forEach(function(vc){vc.constructor=mb;vc.__proto__=mb.prototype});return Gb.return(mb)})};Id.prototype.fork=function(Fb,Ac){var $c=this,Bc,vd,pb,lb,Zb,Mb,ub,rc,Ua,Lb,mb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Gb){switch(Gb.nextAddress){case 1:return Bc=$c,vd=Bc.System,pb=Bc.baseURL,lb=Bc.objectClass,Ac=Object.assign({System:vd,baseURL:pb},Ac),Zb=Vc.RuntimeSourceDescriptor.for(lb),Mb=Zb._renamedSource(Fb),ub=Mb.moduleSource,rc=Vc.ObjectPackage.withId(Fb,
Ac),Gb.yield(rc.ensureExistance(),2);case 2:return Ua=rc,Lb=Ua.objectModule,mb=Lb.systemModule,Gb.yield(mb.load({format:"esm"}),3);case 3:return Gb.yield(mb.changeSource(ub),4);case 4:return Gb.return(rc)}})};$jscomp.global.Object.defineProperties(Id.prototype,{id:{configurable:!0,enumerable:!0,get:function(){return this._id}},name:{configurable:!0,enumerable:!0,get:function(){return this.id}},System:{configurable:!0,enumerable:!0,get:function(){return this.options.System}},baseURL:{configurable:!0,
enumerable:!0,get:function(){return this.options.baseURL}},packageURL:{configurable:!0,enumerable:!0,get:function(){return this.baseURL+("/"+this.id)}},config:{configurable:!0,enumerable:!0,get:function(){return{name:this.name,version:"0.1.0",lively:{isObjectPackage:!0}}}},systemPackage:{configurable:!0,enumerable:!0,get:function(){return Vc.lookupPackage(this.System,this.packageURL,!0).pkg}},objectModule:{configurable:!0,enumerable:!0,get:function(){return this._objectModule||(this._objectModule=
new Vc.ObjectModule("index.js",this))}},objectClass:{configurable:!0,enumerable:!0,get:function(){return this.objectModule.objectClass}}});$jscomp.global.Object.defineProperties(Id,{packageStore:{configurable:!0,enumerable:!0,get:function(){return this._packageStore||(this._packageStore=Vc._packageStore)}}});Ma("default",Id);Vc.ObjectPackage=Id;var ie=function(Fb,Ac){if(!Fb)throw Error("ObjectModule needs package!");if(!Ac)throw Error("ObjectModule needs package!");this._moduleName=Fb;this._objectPackage=
Ac};ie.prototype.read=function(){return this.resource.read()};ie.prototype.write=function(Fb){return this.resource.write(Fb)};ie.prototype.ensureExistance=function(){var Fb=this,Ac,$c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Bc){switch(Bc.nextAddress){case 1:return Ac=Fb.resource,Bc.yield(Ac.exists(),2);case 2:if(Bc.yieldResult){Bc.jumpTo(3);break}return Bc.yield(Ac.write("'format esm';\n"),4);case 4:$c={},Fb.System.config({meta:($c[Fb.url]={format:"esm"},$c)});case 3:return Bc.return(Fb)}})};
ie.prototype.adoptObject=function(Fb,Ac){var $c=this,Bc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(vd){if(1==vd.nextAddress)return $c.objectClass===Fb.constructor?vd.return():vd.yield($c.ensureObjectClass(Fb.constructor,Ac),2);Bc=vd.yieldResult;Vc.adoptObject(Fb,Bc);vd.jumpToEnd()})};ie.prototype.ensureObjectClass=function(Fb,Ac){var $c=this,Bc=this.objectClass;return Bc&&Bc.prototype.__proto__===Fb.prototype?Bc:Promise.resolve(this.ensureObjectClassSource(Fb,Ac)).then(function(vd){var pb=
vd.source,lb=vd.moduleId,Zb=vd.className,Mb=vd.bindings,ub=$c.System;vd=Vc.module(ub,lb);if(Mb)for(var rc in Mb)vd.define(rc,Mb[rc]);pb=Vc.runEval(pb,{classTransform:Vc.classToFunctionTransform,sync:!0,targetModule:lb,System:ub});if(pb.isError)throw pb.value;pb=vd.recorder[Zb];if(!pb)throw Error("Failed to define class "+Zb+" in "+lb);return pb})};ie.prototype.ensureObjectClassSource=function(Fb,Ac){return this.createDefaultClassDeclaration(Fb,Ac)};ie.prototype.createDefaultClassDeclaration=function(Fb,
Ac){Fb=void 0===Fb?Object:Fb;Ac=void 0===Ac?!1:Ac;var $c=this,Bc,vd,pb,lb,Zb,Mb,ub,rc,Ua,Lb,mb,Gb,vc,Lc,cc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Vb){switch(Vb.nextAddress){case 1:Bc=$c;vd=Bc.System;pb=Bc.systemModule;lb=Bc.objectPackage;Ac=Ac||Vc.string.capitalize(Vc.toJsIdentifier(lb.id));Zb=Fb[Symbol.for("__LivelyClassName__")];Mb=!Zb;ub=Vc.globalClasses.includes(Fb);rc="";Ua=null;if(Mb){Zb="__anonymous_superclass__";Lb={};Ua=(Lb[Zb]=Fb,Lb);Vb.jumpTo(2);break}if(ub){Vb.jumpTo(2);
break}return Vb.yield(Vc.ExportLookup.findExportOfValue(Fb,vd),4);case 4:(mb=Vb.yieldResult)?(Gb=Vc.ImportInjector.run(vd,pb.id,pb.package(),"",mb),vc=Gb.standaloneImport,rc+=vc+"\n\n"):(Lc={},Ua=(Lc[Zb]=Fb,Lc));case 2:return Ac===Zb&&(Ac="Object"+Ac),cc="Object"===Zb?"class "+Ac+" {}\n":"class "+Ac+" extends "+Zb+" {}\n",rc+="export default "+cc+"\n",Vb.yield(pb.changeSource(rc),5);case 5:return Vb.yield(pb.load(),6);case 6:return Vb.return({source:rc,className:Ac,moduleId:$c.url,bindings:Ua})}})};
ie.prototype.addScript=function(Fb,Ac,$c){var Bc=this,vd,pb,lb,Zb,Mb,ub,rc,Ua,Lb,mb,Gb,vc,Lc,cc,Vb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Ub){switch(Ub.nextAddress){case 1:if(Fb.constructor===Bc.objectClass){vd=Fb.constructor;Ub.jumpTo(2);break}return Ub.yield(Bc.ensureObjectClass(Fb.constructor),3);case 3:vd=Ub.yieldResult;case 2:pb=vd;lb="function"===typeof Ac?String(Ac):Ac;Zb=Vc.parseFunction(lb);Mb=Vc.RuntimeSourceDescriptor.for(pb,Bc.System);$c||($c=Vc.Path("id.name").get(Zb));
if(!$c)throw Error("No name, cannot add "+Vc.string.truncate(lb,30).replace(/\n/g,"")+"!");ub=Vc.toJsIdentifier($c);console.assert("FunctionExpression"===Zb.type||"ArrowFunctionExpression"===Zb.type,"not a function expression but: "+Zb.type);rc=Zb.params.map(function(Ga){return lb.slice(Ga.start,Ga.end)});Ua="BlockStatement"===Zb.body.type?lb.slice(Zb.body.start,Zb.body.end):"{ return "+lb.slice(Zb.body.start,Zb.body.end)+" }";Lb=ub+"("+rc.join(",")+") "+Ua;"ArrowFunctionExpression"===Zb.type&&(Zb.type=
"FunctionExpression");mb=Mb.source;Gb=Mb.ast;if(!Gb)throw Error("cannot find class decl of "+Mb.module.id);(vc=Gb.body.body.find(function(Ga){return Ga.key.name===ub&&!Ga.static}))?mb=mb.slice(0,vc.start)+Lb+mb.slice(vc.end):(Lc=mb.lastIndexOf("}"),cc=mb.slice(0,Lc),Vb=mb.slice(Lc),/\n\s*$/m.test(cc)||(cc+="\n"),Lb=Vc.string.changeIndent(Lb,"  ",1),/^[ ]*\n/m.test(Vb)||(Vb="\n"+Vb),mb=cc+Lb+Vb);return Ub.yield(Mb.changeSource(mb),4);case 4:return Ub.return({script:pb.prototype[ub],klass:pb,module:Mb.module.id,
methodName:ub})}})};$jscomp.global.Object.defineProperties(ie.prototype,{objectPackage:{configurable:!0,enumerable:!0,get:function(){return this._objectPackage}},objectClass:{configurable:!0,enumerable:!0,get:function(){var Fb=this.systemModule;return Fb.isLoaded()?Fb.System.get(Fb.id).default:null}},moduleName:{configurable:!0,enumerable:!0,get:function(){return this._moduleName}},systemModule:{configurable:!0,enumerable:!0,get:function(){return Vc.module(this.System,this.url)}},System:{configurable:!0,
enumerable:!0,get:function(){return this.objectPackage.System}},resource:{configurable:!0,enumerable:!0,get:function(){return this.objectPackage.resource(this.moduleName)}},url:{configurable:!0,enumerable:!0,get:function(){return this.resource.url}}});Vc.ObjectModule=ie;Vc.default=Id}}});