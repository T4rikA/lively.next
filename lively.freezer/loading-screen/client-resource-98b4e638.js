System.register(["./__root_module__-3c9a1ccb.js","kld-intersections","./client-command-d13304f8.js"],function(sa){var lb,Eb,Wb,Qb,Bd,Fc;return{setters:[function(wd){lb=wd.s;Eb=wd._;Wb=wd.a4;Qb=wd.bC;Bd=wd.a5},function(){},function(wd){Fc=wd.runCommand}],execute:function(){function wd(Ra,tb){var dc,bc,Xc,Oc,$b;return $jscomp.asyncExecutePromiseGeneratorProgram(function(zc){if(1==zc.nextAddress)return dc=jd.fileInfoCommandString(Ra,tb),bc=jd.runCommand(dc,tb),zc.yield(bc.whenDone(),2);if(Xc=0!=
bc.exitCode?bc.output:null)throw Xc;Oc=$jscomp.makeIterator(jd.parseDirectoryListFromLs(bc.stdout,tb.rootDirectory||"."));$b=Oc.next().value;return zc.return($b)})}function Kc(Ra,tb){return jd.string.lines(Ra).map(function(dc){return dc.trim().length?(new jd.FileInfo(tb)).readFromDirectoryListLine(dc):null}).filter(Boolean)}function Gc(Ra,tb){var dc,bc,Xc,Oc,$b,zc,Fb,Cb,pc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Pc){dc=Object.assign({findFilesGroup:"default-find-files-process"},
tb);bc=dc.findFilesGroup;Xc=dc.rootDirectory;$b=Oc=jd.findFilesProcesses[bc]||(jd.findFilesProcesses[bc]={promiseState:null,commands:[]});zc=$b.commands;Fb=$b.promiseState;Fb||(Oc.promiseState=Fb=jd.promise.deferred());Cb=jd.findFilesCommandString(Ra,tb);zc.forEach(function(wb){return wb.kill()});pc=jd.runCommand(Cb,tb);zc.push(pc);pc.whenDone().then(function(){jd.arr.remove(zc,pc);if(zc.some(function(db){return db.startTime>pc.startTime}))console.log("[findFiles] command "+pc+" exited but a newer findFiles command was started for group "+
bc+", discarding output");else{var wb=0!=pc.exitCode?pc.output:null;wb&&console.warn(wb);wb=wb?[]:jd.parseDirectoryListFromLs(pc.stdout,Xc)||[];Fb.resolve(wb);Object.assign(Oc,{promiseState:null,commands:[]})}}).catch(function(wb){return console.error(wb)});return Pc.return(Fb.promise)})}function Yc(Ra){function tb(dc){return Array.prototype.concat.apply([dc],dc.children?dc.children.map(tb):[])}return tb(Ra).map(function(dc){var bc=dc.fullPath.replace(/^\//,"");return{fileName:bc,path:bc,rootDirectory:"./",
isDirectory:dc.isDirectory,isLink:void 0,lastModified:void 0,linkCount:void 0,mode:void 0,size:void 0,group:void 0,user:void 0}})}var jd=lively.FreezerRuntime.recorderFor("lively.shell/client-fs-helper.js");jd.fileInfo=wd;jd.fileInfoCommandString=function(Ra,tb){var dc=tb=void 0===tb?{}:tb;tb=dc.rootDirectory;dc=dc.platform;tb=tb||".";var bc="win32"===dc?"\\":"/";"win32"===dc||tb.endsWith(bc)||(tb+=bc);return"win32"===dc?"cd "+tb+' && ls -lLd --time-style=locale "'+Ra+'"':'if [ "$(uname)" = "Darwin" ];\n      then timeformat=\'-T\'; else\n      timeformat="--time-style=+%b %d %T %Y";\n    fi && env TZ=GMT LANG=en_US.UTF-8 cd '+
(tb+' && ls -lLd "$timeformat" "'+Ra+'"')};jd.parseDirectoryListFromLs=Kc;jd.findFiles=Gc;jd.findFilesCommandString=function(Ra,tb){var dc=tb=void 0===tb?{}:tb,bc=dc.rootDirectory,Xc=dc.exclude,Oc=dc.depth;dc=dc.platform;bc=bc||".";Xc=Xc||"-iname "+jd.defaultExcludes.map(jd.string.print).join(" -o -iname ");var $b="win32"===dc?"\\":"/";"win32"===dc||bc.endsWith($b)||(bc+=$b);Ra=jd.string.format('%s "%s"',tb.re?"-iregex":tb.matchPath?"-ipath":"-iname",Ra);Oc="number"===typeof Oc?" -maxdepth "+Oc:"";
return"win32"===dc?jd.string.format("find %s %s ( %s ) -prune -o %s %s -print0 | xargs -0 -I{} ls -lLd --time-style=locale {}",bc,tb.re?"-E ":"",Xc.replace(/"/g,""),Ra.replace(/"/g,""),Oc):'if [ "$(uname)" = "Darwin" ];\n      then timeformat=\'-T\'; else\n      timeformat="--time-style=+%b %d %T %Y";\n    fi && '+jd.string.format('env TZ=GMT LANG=en_US.UTF-8 find %s %s \\( %s \\) -prune -o %s %s -print0 | xargs -0 -I{} ls -lLd "$timeformat" "{}"',bc,tb.re?"-E ":"",Xc,Ra,Oc)};jd.convertDirectoryUploadEntriesToFileInfos=
Yc;jd.runCommand=Fc;jd.string=lb;jd.promise=Eb;jd.arr=Wb;jd.fileInfo=wd;jd.fileInfo=wd;jd.parseDirectoryListFromLs=Kc;jd.parseDirectoryListFromLs=Kc;var Dd=function(Ra){this.rootDirectory=Ra;this.fileName=this.path="";this.isDirectory=!1;this.lastModified=null;this.mode="";this.isLink=!1;this.linkCount=0;this.group=this.user="";this.size=0;this.rootDirectory=null};Dd.prototype.readFromDirectoryListLine=function(Ra){var tb=this;if(!Ra.trim().length)return null;var dc=Ra;this.reader.forEach(function(bc){return dc=
bc(dc,tb)});return this};Dd.prototype.toString=function(){return this.path};$jscomp.global.Object.defineProperties(Dd.prototype,{reader:{configurable:!0,enumerable:!0,get:function(){return[function(Ra,tb){var dc=Ra.indexOf(" ");tb.mode=Ra.slice(0,dc);tb.isDirectory="d"===tb.mode[0];return Ra.slice(dc+1).trim()},function(Ra,tb){var dc=Ra.indexOf(" ");tb.linkCount=Number(Ra.slice(0,dc));return Ra.slice(dc+1).trim()},function(Ra,tb){var dc=Ra.indexOf(" ");tb.user=Ra.slice(0,dc);return Ra.slice(dc+1).trim()},
function(Ra,tb){var dc=jd.string.peekRight(Ra,0,/\s+[0-9]/);tb.group=Ra.slice(0,dc).trim();return Ra.slice(dc).trim()},function(Ra,tb){var dc=Ra.indexOf(" ");tb.size=Number(Ra.slice(0,dc));return Ra.slice(dc+1).trim()},function(Ra,tb){var dc=jd.string.reMatches(Ra,/[^s]+\s+[0-9:\s]+/);if(!dc||!dc[0])return Ra;tb.lastModified=new Date(dc[0].match+" GMT");return Ra.slice(dc[0].end).trim()},function(Ra,tb){var dc=(Ra=Ra.replace(/^\.\/+/g,"").replace(/\/\//g,"/"))&&Ra.split(" -> "),bc=""===Ra?!1:Ra&&
2===dc.length,Xc=(dc=bc?dc[0]:Ra)&&0===dc.indexOf(tb.rootDirectory)?dc.slice(tb.rootDirectory.length):dc;tb.fileName=""===Ra?".":Xc;tb.path=dc;tb.isLink=bc;return Xc}]}}});jd.FileInfo=Dd;jd.findFilesProcesses={};jd.findFiles=Gc;jd.findFiles=Gc;jd.defaultExcludes=[".svn",".git","node_modules",".module_cache"];jd.convertDirectoryUploadEntriesToFileInfos=Yc;jd.convertDirectoryUploadEntriesToFileInfos=Yc;var od=lively.FreezerRuntime.recorderFor("lively.shell/client-resource.js");od.Resource=Qb;od.runCommand=
Fc;od.fileInfo=wd;od.findFiles=Gc;od.string=lb;od.promise=Eb;od.arr=Wb;od.obj=Bd;Dd=function(Ra,tb,dc){dc=void 0===dc?{}:dc;Ra=od.Resource.call(this,Ra)||this;Ra.options=Object.assign({},dc,{l2lClient:tb||Ra.constructor.defaultL2lClient});return Ra};$jscomp.inherits(Dd,od.Resource);Dd.prototype.newResource=function(Ra){return new this.constructor(Ra,this.options.l2lClient,this.options)};Dd.prototype.read=function(){var Ra=this,tb=od.runCommand('cat "'+this.url+'"',this.options);return tb.whenDone().then(function(){if(tb.exitCode)throw Error("Read "+
Ra.url+" failed: "+tb.stderr);return tb.output})};Dd.prototype.write=function(Ra){var tb=this,dc,bc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Xc){switch(Xc.nextAddress){case 1:return Ra?Xc.yield(od.runCommand('touch "'+tb.url+'" && tee "'+tb.url+'"',Object.assign({stdin:String(Ra)},tb.options)).whenDone(),4):Xc.yield(od.runCommand('echo -n > "'+tb.url+'"',Object.assign({},tb.options)).whenDone(),5);case 4:dc=Xc.yieldResult;Xc.jumpTo(3);break;case 5:dc=Xc.yieldResult;case 3:bc=dc;
if(bc.exitCode)throw Error("Write "+tb.url+" failed: "+bc.stderr);return Xc.return(tb)}})};Dd.prototype.mkdir=function(){var Ra=this,tb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(dc){if(1==dc.nextAddress)return dc.yield(od.runCommand('mkdir -p "'+Ra.url+'"',Ra.options).whenDone(),2);tb=dc.yieldResult;if(tb.exitCode)throw Error(Ra+" cannot create directory: "+tb.stderr);return dc.return(Ra)})};Dd.prototype.exists=function(){var Ra=od.runCommand('test -d "'+this.url+'" || test -f "'+
this.url+'"',this.options);return Ra.whenDone().then(function(){return 0===Ra.exitCode})};Dd.prototype.remove=function(){var Ra=this,tb=od.runCommand('rm -rf "'+this.url+'"',this.options);return tb.whenDone().then(function(){if(tb.exitCode)throw Error("Remove of "+Ra.url+" failed: "+tb.stderr);return Ra})};Dd.prototype.gzip=function(Ra){var tb=this,dc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(bc){dc=od.runCommand('gzip > "'+tb.url+'"',Object.assign({stdin:String(Ra)},tb.options));
return bc.return(dc.whenDone().then(function(){if(dc.exitCode)throw Error("Gzip compression of "+tb.url+" failed: "+dc.stderr);return tb}))})};Dd.prototype.brotli=function(Ra){var tb=this,dc;return $jscomp.asyncExecutePromiseGeneratorProgram(function(bc){dc=od.runCommand('brotli > "'+tb.url+'"',Object.assign({stdin:String(Ra)},tb.options));return bc.return(dc.whenDone().then(function(){if(dc.exitCode)throw Error("Brotli compression of "+tb.url+" failed: "+dc.stderr);return tb}))})};Dd.prototype.readProperties=
function(){var Ra=this,tb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(dc){if(1==dc.nextAddress)return dc.yield(od.fileInfo(Ra.url,Ra.options),2);tb=dc.yieldResult;Ra.assignProperties(od.obj.dissoc(tb,["fileName","path","rootDirectory"]));return dc.return(Ra)})};Dd.prototype.dirList=function(Ra,tb){Ra=void 0===Ra?1:Ra;tb=void 0===tb?{}:tb;var dc=this,bc,Xc,Oc,$b,zc,Fb,Cb;return $jscomp.asyncExecutePromiseGeneratorProgram(function(pc){if(1==pc.nextAddress)return bc=tb,Xc=bc.exclude,
Array.isArray(Xc)&&(Xc="-iname "+Xc.map(od.string.print).join(" -o -iname ")),Oc=dc,$b=Oc.url,zc=Oc.options,Fb=zc.l2lClient,pc.yield(od.findFiles("*",{exclude:Xc,depth:Ra,rootDirectory:$b,l2lClient:Fb}),2);Cb=pc.yieldResult;Cb[0].path.replace(/\/$/,"")===dc.url.replace(/\/$/,"")&&Cb.shift();return pc.return(Cb.map(function(Pc){var wb=Pc.path;Pc.isDirectory&&(wb=wb.replace(/\/?$/,"/"));wb=new dc.constructor(wb,Fb,dc.options);wb.assignProperties(od.obj.dissoc(Pc,["fileName","path","rootDirectory"]));
return wb}))})};$jscomp.global.Object.defineProperties(Dd,{defaultL2lClient:{configurable:!0,enumerable:!0,get:function(){return this._defaultL2lClient||od._defaultL2LClient},set:function(Ra){this._defaultL2lClient=od._defaultL2LClient=Ra}}});sa("default",Dd);od.ShellClientResource=Dd;od._defaultL2LClient=od._defaultL2LClient||void 0;var Zc=sa("resourceExtension",{name:"shell-client",matches:function(Ra){return Ra.startsWith("/")||Ra.match(/[a-z]:\\/i)},resourceClass:od.ShellClientResource});od.resourceExtension=
Zc;od.resourceExtension=Zc;od.resourceExtension=Zc;od.default=Dd}}});