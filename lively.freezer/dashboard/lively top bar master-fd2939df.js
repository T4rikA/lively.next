System.register("./__root_module__-073d42f8.js ./index-a6b774e2.js kld-intersections ./world-c2e9176a.js ./index-ae6defdd.js ./index-88d60c6b.js ./color-picker-4f0cbbda.js ./object-classes-9843baee.js ./user-ui-65e0b9a5.js ./index-720f8632.js".split(" "),function(){var $a,Vb,jc,Wc,wc,Ud,Kd,he,xd,gd,Ld,Pd,af,bf,Ve,Ad,xe,qc,td,be,Bd,pe,Se,nc,$c,ge,ad,ie,Yb;return{setters:[function(zb){$a=zb.M;Vb=zb.I;jc=zb.T;Wc=zb.m;wc=zb.O;Ud=zb.Q;Kd=zb.S;he=zb.V;xd=zb.W;gd=zb.X;Ld=zb.Y;Pd=zb.p;af=zb.R;bf=zb.C;
Ve=zb.b;Ad=zb.Z;xe=zb._;qc=zb.v;td=zb.r;be=zb.$;Bd=zb.a0;pe=zb.d;Se=zb.g;nc=zb.o;$c=zb.a1;ge=zb.i},function(){},function(){},function(zb){ad=zb.Selection;ie=zb.SelectionElement},function(zb){Yb=zb._},function(){},function(){},function(){},function(){},function(){}],execute:function(){var zb=lively.FreezerRuntime.recorderFor("LivelyTopBar/index.js");zb.Morph=$a;zb.Icon=Vb;zb.Tooltip=jc;zb.morph=Wc;zb.Text=wc;zb.Polygon=Ud;zb.Label=Kd;zb.Path=he;zb.Image=xd;zb.HTMLMorph=gd;zb.Ellipse=Ld;zb.pt=Pd;zb.Rectangle=
af;zb.Color=bf;zb.arr=Ve;zb.Closure=Ad;zb.obj=xe;zb.LoadingIndicator=qc;zb.resource=td;zb.Canvas=be;zb.getClassName=Bd;zb.Selection=ad;zb.SelectionElement=ie;zb.connect=pe;zb.signal=Se;zb.once=nc;zb.disconnect=$c;zb.CommentBrowser=Yb;var Rc=function(Mc){var tc=lively.FreezerRuntime.recorderFor("LivelyTopBar/index.js"),Tc=tc.hasOwnProperty("LivelyTopBar")&&"function"===typeof tc.LivelyTopBar?tc.LivelyTopBar:tc.LivelyTopBar=function(fb){fb&&fb[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,
arguments)};return ge(Tc,Mc,[{key:"__additionally_serialize__",value:function(fb,uc,Rb,Fc){ge._get(Object.getPrototypeOf(Tc.prototype),"__additionally_serialize__",this).call(this,fb,uc,Rb,Fc);Fc("haloFilterFn",this.getProperty("haloFilterFn"))}},{key:"registerCustomShape",value:function(fb,uc,Rb,Fc){this.shapeToClass[fb]=uc;this.keyToShape[Rb]=fb;this.shapeToIcon[fb]={shortcut:Rb,args:Fc};this.shapesCreatedViaDrag.push(uc)}},{key:"beforePublish",value:function(){this.activeSideBars=[];this.currentShapeMode=
"Rectangle";this.setEditMode("Halo")}},{key:"onLoad",value:function(){var fb=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(uc){if(1==uc.nextAddress)return fb.isComponent?uc.return():uc.yield(fb.whenRendered(),2);delete fb.shapeToIcon._rev;document.body.style.background="black";fb.setEditMode("Halo");fb.userFlap.getSubmorphNamed("fast load toggler").refresh();uc.jumpToEnd()})}},{key:"onUserChanged",value:function(fb){this.userFlap.onUserChanged(fb)}},{key:"relayout",value:function(){this.respondsToVisibleWindow&&
(this.width=this.world().visibleBounds().width,this.position=zb.pt(0,0))}},{key:"adjustElements",value:function(){var fb=this.get("ipad status bar");fb&&(fb.width=this.width);this.userFlap.owner==this&&(this.userFlap.right=this.width-10,this.userFlap.visible=750<this.width)}},{key:"getShapeMenuItems",value:function(){var fb=this;return Object.entries(this.shapeToIcon).map(function(uc){uc=$jscomp.makeIterator(uc);var Rb=uc.next().value,Fc=uc.next().value;uc=Fc.shortcut;Fc=Fc.args;return[[].concat($jscomp.arrayFromIterable(fb.currentShapeMode===
Rb?[].concat($jscomp.arrayFromIterable(zb.Icon.textAttribute("check",{fontSize:11,paddingTop:"2px"})),["   ",{}]):["     ",{}]),$jscomp.arrayFromIterable(zb.Icon.textAttribute.apply(zb.Icon,$jscomp.arrayFromIterable(Fc))),["   "+Rb+" ",{float:"none"},"      "+uc,{float:"right",fontSize:11,opacity:.5,fontFamily:"IBM Plex Mono"}]),function(){fb.currentShapeMode=Rb;fb.setEditMode("Shape")}]})}},{key:"getSideBarMenuItems",value:function(){var fb=this;return Object.entries(this.sideBarToIcon).map(function(uc){uc=
$jscomp.makeIterator(uc);var Rb=uc.next().value;uc=uc.next().value.args;return[[].concat($jscomp.arrayFromIterable(fb.activeSideBars.includes(Rb)?[].concat($jscomp.arrayFromIterable(zb.Icon.textAttribute("check",{fontSize:11,paddingTop:"2px"})),["   ",{}]):["     ",{}]),$jscomp.arrayFromIterable(zb.Icon.textAttribute.apply(zb.Icon,$jscomp.arrayFromIterable(uc))),["   "+Rb+" ",{float:"none"}]),function(){return fb.openSideBar(Rb)}]})}},{key:"reloadSidebar",value:function(){this.sideBar.remove();this.sideBar=
null;this.stylingPalette.remove();this.stylingPalette=null;this.openSideBar("Scene Graph");this.openSideBar("Styling Palette")}},{key:"onKeyUp",value:function(fb){"Hand"==this._tmpEditMode&&this.setEditMode("Hand",!0)}},{key:"onKeyDown",value:function(fb){ge._get(Object.getPrototypeOf(Tc.prototype),"onKeyDown",this).call(this,fb);if(fb.isCommandKey()&&"Hand"==this._tmpEditMode)this.setEditMode("Halo",!0);else if(!fb.isAltDown()){var uc=this.keyToShape;if(uc[fb.key])this.currentShapeMode=uc[fb.key],
this.setEditMode("Shape");else switch(fb.key){case "Escape":this.setEditMode("Halo");break;case "T":this.setEditMode("Text")}}}},{key:"openSideBar",value:function(fb){var uc=this,Rb,Fc,Uc,vd,Xd;return $jscomp.asyncExecutePromiseGeneratorProgram(function(vc){switch(vc.nextAddress){case 1:uc.activeSideBars.includes(fb)?zb.arr.remove(uc.activeSideBars,fb):uc.activeSideBars.push(fb);if("Scene Graph"!=fb){vc.jumpTo(2);break}if(uc.sideBar){vc.jumpTo(3);break}Rb=zb.LoadingIndicator.open("loading side bar");
return vc.yield(Rb.whenRendered(),4);case 4:return Fc=uc,vc.yield(zb.resource("part://SystemIDE/scene graph side bar master").read(),5);case 5:return Fc.sideBar=vc.yieldResult,uc.sideBar.hasFixedPosition=!0,uc.sideBar.respondsToVisibleWindow=!0,uc.sideBar.openInWorld(),uc.sideBar.right=0,vc.yield(uc.sideBar.whenRendered(),6);case 6:Rb.remove();case 3:return vc.yield(uc.sideBar.toggle(uc.activeSideBars.includes("Scene Graph")),2);case 2:if("Styling Palette"!=fb){vc.jumpTo(8);break}if(uc.stylingPalette){vc.jumpTo(9);
break}Uc=zb.LoadingIndicator.open("loading side bar");return vc.yield(Uc.whenRendered(),10);case 10:return vd=uc,vc.yield(zb.resource("part://SystemIDE/styling side bar master").read(),11);case 11:return vd.stylingPalette=vc.yieldResult,uc.stylingPalette.collapseAll(),uc.stylingPalette.hasFixedPosition=!0,uc.stylingPalette.respondsToVisibleWindow=!0,uc.stylingPalette.openInWorld(),uc.stylingPalette.left=uc.world().width,uc.stylingPalette.relayout(),vc.yield(uc.stylingPalette.whenRendered(),12);case 12:Uc.remove();
case 9:return vc.yield(uc.stylingPalette.toggle(uc.activeSideBars.includes("Styling Palette")),8);case 8:(Xd=uc.get("lively version checker"))&&Xd.owner==$world&&Xd.relayout(),vc.jumpToEnd()}})}},{key:"onMouseDown",value:function(fb){var uc=this.get("select shape type"),Rb=this.get("shape mode button"),Fc=this.get("side bar selector"),Uc=this.primaryTarget||this.world();fb.targetMorph==uc&&(this.world().openWorldMenu(fb,this.getShapeMenuItems()).position=Rb.globalBounds().bottomLeft().subPt(this.world().scroll));
"undo button"==fb.targetMorph.name&&Uc.execCommand("undo");"redo button"==fb.targetMorph.name&&Uc.execCommand("redo");"save button"==fb.targetMorph.name&&$world.execCommand("save world");fb.targetMorph==Rb&&this.setEditMode("Shape");"text mode button"==fb.targetMorph.name&&this.setEditMode("Text");"hand mode button"==fb.targetMorph.name&&this.setEditMode("Hand");"halo mode button"==fb.targetMorph.name&&this.setEditMode("Halo");"open component browser"==fb.targetMorph.name&&this.interactivelyLoadComponent();
"load world button"==fb.targetMorph.name&&this.world().execCommand("load world");"comment browser button"==fb.targetMorph.name&&this.toggleCommentBrowser();fb.targetMorph==Fc&&(this.world().openWorldMenu(fb,this.getSideBarMenuItems()).position=Fc.globalBounds().bottomLeft().subPt(this.world().scroll))}},{key:"colorCommentBrowserButton",value:function(){var fb=this.get("user flap"),uc=fb.haloShadow;fb=fb.haloColor;var Rb=this.get("comment browser button");Rb.fontColor=fb;Rb.dropShadow=uc}},{key:"uncolorCommentBrowserButton",
value:function(){var fb=this.get("comment browser button"),uc=zb.Color.rgb(102,102,102);fb.dropShadow=!1;fb.fontColor=uc}},{key:"toggleCommentBrowser",value:function(){var fb=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(uc){zb.CommentBrowser.isOpen()?fb.uncolorCommentBrowserButton():fb.colorCommentBrowserButton();return uc.yield(fb.world().execCommand("toggle comment browser"),0)})}},{key:"commentCountBadge",get:function(){return this.get("comment browser button").get("comment count badge")}},
{key:"interactivelyLoadComponent",value:function(){var fb=this,uc,Rb,Fc,Uc,vd;return $jscomp.asyncExecutePromiseGeneratorProgram(function(Xd){if(1==Xd.nextAddress)return uc=fb.get("open component browser"),Rb=fb.userFlap,Fc=Rb.haloShadow,Uc=Rb.haloColor,vd=zb.Color.rgb(102,102,102),uc.fontColor=Uc,uc.dropShadow=Fc,Xd.yield(fb.world().execCommand("browse and load component"),2);uc.dropShadow=!1;uc.fontColor=vd;Xd.jumpToEnd()})}},{key:"setEditMode",value:function(fb,uc){var Rb=this;uc=void 0===uc?!1:
uc;this.editMode=fb;var Fc=this.primaryTarget||this.world(),Uc=this.userFlap,vd=Uc.haloShadow,Xd=Uc.haloColor,vc=zb.Color.rgb(102,102,102);uc||(this._tmpEditMode=fb);Uc=this.get("shape mode button");var Oc=this.get("text mode button"),pc=this.get("hand mode button"),bb=this.get("halo mode button");[["Shape",Uc.submorphs],["Text",[Oc]],["Hand",[pc]],["Halo",[bb]]].forEach(function(Ma){var oa=$jscomp.makeIterator(Ma);Ma=oa.next().value;oa=oa.next().value;"Shape"==fb?Rb.toggleShapeMode(Fc,!0,Rb.currentShapeMode):
"Text"==fb?Rb.toggleShapeMode(Fc,!0,"Text"):Rb.toggleShapeMode(Fc,!1);Rb.showHaloPreviews("Halo"==fb);uc||"Halo"==fb||Rb.world().halos().forEach(function(La){return La.remove()});Ma==fb?oa.forEach(function(La){La.dropShadow=vd;La.fontColor=Xd}):oa.forEach(function(La){La.dropShadow=null;La.fontColor=vc})})}},{key:"canBeCreatedViaDrag",value:function(fb){return this.shapesCreatedViaDrag.includes(fb)}},{key:"toggleShapeMode",value:function(fb,uc,Rb){var Fc=this.shapeToClass;uc?(fb.nativeCursor="crosshair",
fb._yieldShapeOnClick=Fc[Rb]):(fb._yieldShapeOnClick=!1,fb.nativeCursor="auto")}},{key:"handleShapeCreation",value:function(fb){var uc=this.primaryTarget||this.world(),Rb=uc._yieldShapeOnClick;if(!Rb)return!1;uc._sizeTooltip&&uc._sizeTooltip.remove();if(fb.targetMorph!=uc)return!1;if(uc._shapeRequest&&Rb&&!uc._yieldedShape){var Fc=uc.localize(this.world().firstHand.position);switch(Rb){case zb.Image:uc.addMorph(zb.morph({type:Rb,position:Fc,extent:zb.pt(150,150),fill:zb.Color.transparent,imageUrl:"https://i.imgur.com/uGRFZEs.jpg"}));
break;case zb.Label:uc.addMorph(zb.morph({type:Rb,position:Fc,value:"I am a label!",fill:zb.Color.transparent}));break;case zb.Text:if(fb.targetMorph.isText)return;uc.addMorph(zb.morph({type:Rb,position:Fc,readOnly:!0,textString:"I am a text field!",fill:zb.Color.transparent}))}}Rb==zb.Text&&uc._yieldedShape?uc._yieldedShape.focus():uc._yieldedShape&&uc._yieldedShape.owner&&this.showHaloFor(uc._yieldedShape);uc._yieldedShape=null;uc._shapeRequest=!1}},{key:"prepareShapeCreation",value:function(fb){var uc=
this.primaryTarget||this.world(),Rb=uc._yieldShapeOnClick;if(!Rb||!this.canBeCreatedViaDrag(Rb))return!1;uc._yieldedShape=zb.morph(Object.assign({type:Rb,position:fb.positionIn(uc),extent:zb.pt(1,1),fill:zb.Color.transparent,borderWidth:1,borderColor:zb.Color.rgb(23,160,251),fixedHeight:!0,fixedWidth:!0,lineWrapping:!0},Rb==zb.Text?this.getDefaultTextAttrs():{},{},Rb==zb.Image?this.getImageDefaultAttrs():{},{},Rb==zb.Polygon?this.getPolyDefaultAttrs():{},{},Rb==zb.Path?this.getPathDefaultAttrs():
{}));uc._sizeTooltip=zb.morph({type:zb.Tooltip,padding:zb.Rectangle.inset(5,5,5,5),styleClasses:["Tooltip"]}).openInWorld();return!0}},{key:"getPolyDefaultAttrs",value:function(){return{vertices:[zb.pt(131.4,86.3),zb.pt(171,139.6),zb.pt(105.9,119.9),zb.pt(65.3,172.5),zb.pt(64.7,107),zb.pt(0,86.3),zb.pt(64.7,65.5),zb.pt(65.3,0),zb.pt(105.9,52.6),zb.pt(171,32.9),zb.pt(131.4,86.3)],borderWidth:1}}},{key:"getPathDefaultAttrs",value:function(){return{vertices:[zb.pt(0,0),zb.pt(1,1)],borderWidth:1}}},{key:"getImageDefaultAttrs",
value:function(){return{imageUrl:"https://i.imgur.com/uGRFZEs.jpg"}}},{key:"getDefaultTextAttrs",value:function(){return{readOnly:!0}}},{key:"yieldShapeIfNeeded",value:function(fb){var uc=this.primaryTarget||this.world();return uc._yieldedShape?(!uc._yieldedShape.owner&&10<fb.state.absDragDelta.r()&&uc.addMorph(uc._yieldedShape),uc._yieldedShape.extent=fb.positionIn(uc.world()).subPt(fb.state.dragStartPosition).subPt(zb.pt(1,1)).maxPt(zb.pt(1,1)),uc._sizeTooltip.description=uc._yieldShapeOnClick[Symbol.for("__LivelyClassName__")]+
": "+uc._yieldedShape.width.toFixed(0)+"x"+uc._yieldedShape.height.toFixed(0),uc._sizeTooltip.topLeft=fb.positionIn(uc.world()).addXY(15,15),!0):!1}},{key:"handleHaloSelection",value:function(fb){var uc=this.world(),Rb=this.primaryTarget||uc,Fc=$jscomp.makeIterator(uc.halos()).next().value;this._showHaloPreview&&this._currentlyHighlighted&&0==uc.halos().length&&(fb.stop(),uc.getSubmorphsByStyleClassName("HaloPreview").forEach(function(Uc){return Uc.remove()}),this.showHaloFor(this._currentlyHighlighted));
Fc&&Fc.target==fb.state.prevClick.clickedOnMorph&&"border-box"==fb.targetMorph.name&&50>fb.state.timeOfLastActivity-fb.state.prevClick.clickedAtTime?Fc.temporaryEditTextMorph(fb):fb.targetMorph==Rb&&(Rb._shapeRequest=!0)}},{key:"showHaloFor",value:function(fb){var uc=this;if(fb){if(zb.obj.isArray(fb)){if(0==fb.length)return;var Rb=this.world().showHaloForSelection(fb)}else Rb=this.world().showHaloFor(fb);zb.once(Rb,"remove",function(){Rb.target!=uc.world().focusedMorph&&zb.signal(uc.primaryTarget,
"onHaloRemoved",fb)});this.activeHaloItems.includes("*")||(Rb.activeItems=this.activeHaloItems);Rb.topBar=this;zb.signal(this.primaryTarget,"onHaloOpened",fb)}}},{key:"handleHaloPreview",value:function(fb){var uc=this;if(this._showHaloPreview){var Rb=this.haloFilterFn,Fc=this.primaryTarget||this.world(),Uc=Fc.morphsContainingPoint(fb.positionIn(Fc.world()));"hoverout"==fb.type&&(Uc=[Fc]);fb=Uc.filter(function(vd){return Rb(vd)&&vd.halosEnabled&&[vd].concat($jscomp.arrayFromIterable(vd.ownerChain())).every(function(Xd){return Xd.visible&&
0<Xd.opacity&&!Xd.styleClasses.includes("HaloPreview")})})[0];Uc.find(function(vd){return vd.isMenuItem||vd==uc.sideBar||vd==uc.stylingPalette})?(this._currentlyHighlighted=!1,this.clearHaloPreviews()):this.showHaloPreviewFor(fb)}}},{key:"showHaloPreviewFor",value:function(fb){var uc=this.primaryTarget||this.world();if(fb&&(![fb].concat($jscomp.arrayFromIterable(fb.ownerChain())).find(function(Rb){return Rb.isComponent})&&fb.getWindow()?fb=null:[fb].concat($jscomp.arrayFromIterable(fb.ownerChain())).find(function(Rb){return Rb.isEpiMorph})?
fb=null:fb==uc&&(fb=null),this._currentlyHighlighted!=fb&&(this.clearHaloPreviews(),this._currentlyHighlighted=fb),!(0<this.world().halos().length)&&fb)){this._previewCache||(this._previewCache=new WeakMap);uc=zb.Morph;switch(zb.getClassName(fb)){case "Ellipse":uc=zb.Ellipse}uc=this._previewCache.get(fb)||zb.morph({type:uc,styleClasses:["HaloPreview"],epiMorph:!0,fill:zb.Color.transparent,reactsToPointer:!1,halosEnabled:!1,acceptsDrops:!1,border:{color:zb.Color.rgb(23,160,251),width:1}});uc.owner||
this.world().addMorph(uc);uc.setBounds(fb.globalBounds());uc.borderColor=zb.Color.rgb(23,160,251);uc.borderStyle="solid";fb.master&&(uc.borderColor=zb.Color.purple);fb.ownerChain().find(function(Rb){return Rb.master&&Rb.master.managesMorph(fb)})&&(uc.borderColor=zb.Color.purple,uc.borderStyle="dotted");fb.isComponent&&(uc.borderColor=zb.Color.magenta);this._previewCache.set(fb,uc)}}},{key:"showHaloPreviews",value:function(fb){fb||this.clearHaloPreviews();this._showHaloPreview=fb}},{key:"clearHaloPreviews",
value:function(){this.world().getSubmorphsByStyleClassName("HaloPreview").forEach(function(fb){return fb.remove()})}},{key:"prepareDragSelection",value:function(fb){var uc=(this.primaryTarget||this.world()).world();this._selectionStartPos=fb.positionIn(uc);this._morphSelection=uc.addMorph({type:zb.Selection,epiMorph:!0,reactsToPointer:!1,position:this._selectionStartPos,extent:fb.state.dragDelta});this._selectedMorphs={}}},{key:"adjustDragSelection",value:function(fb){var uc=this,Rb=this.primaryTarget||
this.world(),Fc=Rb.world(),Uc=zb.Rectangle.fromAny(fb.position,this._selectionStartPos);this._morphSelection.setBounds(Uc);Rb.submorphs.forEach(function(vd){if(!vd.isSelectionElement&&!vd.isHand){var Xd=vd.globalBounds(),vc=Uc.containsRect(Xd);!uc._selectedMorphs[vd.id]&&vc&&(uc._selectedMorphs[vd.id]=Fc.addMorph({type:zb.SelectionElement,bounds:Xd},uc._morphSelection));uc._selectedMorphs[vd.id]&&!vc&&(uc._selectedMorphs[vd.id].remove(),delete uc._selectedMorphs[vd.id])}})}},{key:"finishDragSelectionIfNeeded",
value:function(fb){if(this._morphSelection){var uc=this.world();this._morphSelection.fadeOut(200);zb.obj.values(this._selectedMorphs).map(function(Rb){return Rb.remove()});this.showHaloFor(Object.keys(this._selectedMorphs).map(function(Rb){return uc.getMorphWithId(Rb)}));this._selectedMorphs={};this._morphSelection=null}}},{key:"onTargetDragStart",value:function(fb){!this.prepareShapeCreation(fb)&&fb.leftMouseButtonPressed()&&this.prepareDragSelection(fb)}},{key:"onTargetDrag",value:function(fb){!this.yieldShapeIfNeeded(fb)&&
this._morphSelection&&this.adjustDragSelection(fb)}},{key:"detachFromTarget",value:function(fb){zb.disconnect(fb,"onMouseMove",this,"handleHaloPreview");zb.disconnect(fb,"onMouseDown",this,"handleHaloSelection");zb.disconnect(fb,"onMouseUp",this,"handleShapeCreation");zb.disconnect(fb,"onDragStart",this,"onTargetDragStart");zb.disconnect(fb,"onDrag",this,"onTargetDrag");zb.disconnect(fb,"onDragEnd",this,"finishDragSelectionIfNeeded")}},{key:"attachToTarget",value:function(fb){this.primaryTarget&&
this.detachFromTarget(this.primaryTarget);this.primaryTarget=fb;this.setEditMode("Halo");zb.connect(fb,"onMouseMove",this,"handleHaloPreview",{garbageCollect:!0});zb.connect(fb,"onHoverOut",this,"handleHaloPreview",{garbageCollect:!0});zb.connect(fb,"onMouseDown",this,"handleHaloSelection",{garbageCollect:!0});zb.connect(fb,"onMouseUp",this,"handleShapeCreation",{garbageCollect:!0});zb.connect(fb,"onDragStart",this,"onTargetDragStart",{garbageCollect:!0});zb.connect(fb,"onDrag",this,"onTargetDrag",
{garbageCollect:!0});zb.connect(fb,"onDragEnd",this,"finishDragSelectionIfNeeded",{garbageCollect:!0})}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"LivelyTopBar"}},{key:"properties",get:function(){return{isTopBar:{readOnly:!0,get:function(){return!0}},activeHaloItems:{initialize:function(fb){fb||(this.activeHaloItems=["*"])}},primaryTarget:{doc:"A reference to the morph that the top bar considers its primary target",defaultValue:null},haloFilterFn:{defaultValue:"() => true",derived:!0,
set:function(fb){this.setProperty("haloFilterFn",fb)},get:function(){return zb.Closure.fromSource(this.getProperty("haloFilterFn"),{target:this.primaryTarget}).asFunction()}},userFlap:{},activeSideBars:{},currentShapeMode:{after:["submorphs"],set:function(fb){this.setProperty("currentShapeMode",fb);this.get("shape status icon").textAndAttributes=zb.Icon.textAttribute(this.shapeToIcon[fb].args[0])}},sideBarToIcon:{readOnly:!0,get:function(){return{"Scene Graph":{args:["sitemap",{textStyleClasses:["fas"]}]},
"Styling Palette":{args:["palette",{textStyleClasses:["fas"]}]}}}},shapeToIcon:{initialize:function(fb){this.shapeToIcon=fb||{Rectangle:{shortcut:"R",args:["square",{textStyleClasses:["fas"]}]},Ellipse:{shortcut:"E",args:["circle",{textStyleClasses:["fas"]}]},Image:{shortcut:"I",args:["image",{textStyleClasses:["fas"],paddingTop:"1px"}]},Path:{shortcut:"P",args:["bezier-curve",{fontSize:13,paddingTop:"3px"}]},Polygon:{shortcut:"Q",args:["draw-polygon",{fontSize:17}]},Label:{shortcut:"L",args:["tag",
{paddingTop:"1px"}]},Canvas:{shortcut:"C",args:["chess-board",{paddingTop:"1px"}]},HTML:{shortcut:"H",args:["code",{paddingTop:"1px"}]}}}},keyToShape:{initialize:function(fb){this.keyToShape=fb||{R:"Rectangle",E:"Ellipse",I:"Image",P:"Path",Q:"Polygon",L:"Label",C:"Canvas",H:"HTML"}}},shapeToClass:{serialize:!1,defaultValue:{Rectangle:zb.Morph,Ellipse:zb.Ellipse,HTML:zb.HTMLMorph,Canvas:zb.Canvas,Image:zb.Image,Path:zb.Path,Label:zb.Label,Polygon:zb.Polygon,Text:zb.Text}},shapesCreatedViaDrag:{serialize:!1,
initialize:function(){this.shapesCreatedViaDrag=[zb.Morph,zb.Ellipse,zb.HTMLMorph,zb.Canvas,zb.Text,zb.Polygon,zb.Path,zb.Image]}}}}}],tc,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"LivelyTopBar",version:"0.1.1-281"}}},{start:740,end:25196})}(zb.Morph);Rc=zb.LivelyTopBar;zb.default=Rc}}});