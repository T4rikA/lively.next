System.register("./__root_module__-39b2be6e.js lively.collab kld-intersections ./user-ui-ad881150.js ./index-ba611f8a.js ./world-477420c5.js ./index-bc3e9fbd.js ./index-8c1367cc.js".split(" "),function(wa,bb){var ib,Qb,Ib,ed,qc,pd,uc,Ac,dd,Ad,le,Le,ae,lc,Wc,Ed,Tb,Bd,Sd,hc,mc,Hb,ec,vc,gd,Zc;return{setters:[function(Za){ib=Za.av;Qb=Za.aK;Ib=Za.aV;ed=Za.ab;qc=Za.ac;pd=Za.aZ;uc=Za.aX;Ac=Za.aY;dd=Za.I;Ad=Za.aW;le=Za.aA;Le=Za.a3;ae=Za.a1;lc=Za.C;Wc=Za.a6;Ed=Za.a8;Tb=Za.L;Bd=Za.r;Sd=Za.be;hc=Za.aF;
mc=Za.bh;Hb=Za.aj;ec=Za.aJ},function(){},function(){},function(){},function(){},function(Za){vc=Za.C;gd=Za.S;Zc=Za.a},function(){},function(){}],execute:function(){var Za=lively.FreezerRuntime.recorderFor("LivelyTopBar/index.js");Za.Morph=ib;Za.Icon=Qb;Za.Tooltip=Ib;Za.morph=ed;Za.Text=qc;Za.Polygon=pd;Za.Label=uc;Za.Path=Ac;Za.Image=dd;Za.HTMLMorph=Ad;Za.Ellipse=le;Za.pt=Le;Za.Rectangle=ae;Za.Color=lc;Za.arr=Wc;Za.obj=Ed;Za.LoadingIndicator=Tb;Za.resource=Bd;Za.Canvas=vc;Za.getClassName=Sd;Za.Selection=
gd;Za.SelectionElement=Zc;Za.connect=hc;Za.disconnect=mc;Za.CommentBrowser=Hb;var Xa=function(jb){var Fa=lively.FreezerRuntime.recorderFor("LivelyTopBar/index.js"),Ea=Fa.hasOwnProperty("LivelyTopBar")&&"function"===typeof Fa.LivelyTopBar?Fa.LivelyTopBar:Fa.LivelyTopBar=function(ka){ka&&ka[Symbol.for("lively-instance-restorer")]||this[Symbol.for("lively-instance-initialize")].apply(this,arguments)};return ec(Ea,jb,[{key:"beforePublish",value:function(){this.activeSideBars=[];this.currentShapeMode=
"Rectangle";this.setEditMode("Halo")}},{key:"onLoad",value:function(){var ka=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(ja){if(1==ja.nextAddress)return ka.isComponent?ja.return():ja.yield(ka.whenRendered(),2);document.body.style.background="black";ka.setEditMode("Halo");ka.getSubmorphNamed("fast load toggler").refresh();ja.jumpToEnd()})}},{key:"onUserChanged",value:function(ka){this.userFlap.onUserChanged(ka)}},{key:"relayout",value:function(){this.respondsToVisibleWindow&&(this.width=
this.world().visibleBounds().width,this.position=Za.pt(0,0))}},{key:"adjustElements",value:function(){var ka=this.get("ipad status bar");ka&&(ka.width=this.width);this.userFlap.owner==this&&(this.userFlap.right=this.width-10)}},{key:"getShapeMenuItems",value:function(){var ka=this;return Object.entries(this.shapeToIcon).map(function(ja){ja=$jscomp.makeIterator(ja);var Ca=ja.next().value,mb=ja.next().value;ja=mb.shortcut;mb=mb.args;return[[].concat($jscomp.arrayFromIterable(ka.currentShapeMode===Ca?
[].concat($jscomp.arrayFromIterable(Za.Icon.textAttribute("check",{fontSize:11,paddingTop:"2px"})),["   ",{}]):["     ",{}]),$jscomp.arrayFromIterable(Za.Icon.textAttribute.apply(Za.Icon,$jscomp.arrayFromIterable(mb))),["   "+Ca+" ",{float:"none"},"      "+ja,{float:"right",fontSize:11,opacity:.5,fontFamily:"IBM Plex Mono"}]),function(){ka.currentShapeMode=Ca;ka.setEditMode("Shape")}]})}},{key:"getSideBarMenuItems",value:function(){var ka=this;return Object.entries(this.sideBarToIcon).map(function(ja){ja=
$jscomp.makeIterator(ja);var Ca=ja.next().value;ja=ja.next().value.args;return[[].concat($jscomp.arrayFromIterable(ka.activeSideBars.includes(Ca)?[].concat($jscomp.arrayFromIterable(Za.Icon.textAttribute("check",{fontSize:11,paddingTop:"2px"})),["   ",{}]):["     ",{}]),$jscomp.arrayFromIterable(Za.Icon.textAttribute.apply(Za.Icon,$jscomp.arrayFromIterable(ja))),["   "+Ca+" ",{float:"none"}]),function(){return ka.openSideBar(Ca)}]})}},{key:"reloadSidebar",value:function(){this.sideBar.remove();this.sideBar=
null;this.stylingPalette.remove();this.stylingPalette=null;this.openSideBar("Scene Graph");this.openSideBar("Styling Palette")}},{key:"onKeyUp",value:function(ka){"Hand"==this._tmpEditMode&&this.setEditMode("Hand",!0)}},{key:"onKeyDown",value:function(ka){ec._get(Object.getPrototypeOf(Ea.prototype),"onKeyDown",this).call(this,ka);if(ka.isCommandKey()&&"Hand"==this._tmpEditMode)this.setEditMode("Halo",!0);else if(!ka.isAltDown()){var ja={R:"Rectangle",E:"Ellipse",I:"Image",P:"Path",Q:"Polygon",L:"Label",
C:"Canvas",H:"HTML"};switch(ka.key){case "Escape":this.setEditMode("Halo");break;case "R":case "E":case "I":case "P":case "Q":case "L":case "C":case "H":this.currentShapeMode=ja[ka.key];this.setEditMode("Shape");break;case "T":this.setEditMode("Text")}}}},{key:"openSideBar",value:function(ka){var ja=this,Ca,mb,Ub,Ya,$a,Ua;return $jscomp.asyncExecutePromiseGeneratorProgram(function(U){switch(U.nextAddress){case 1:ja.activeSideBars.includes(ka)?Za.arr.remove(ja.activeSideBars,ka):ja.activeSideBars.push(ka);
if("Scene Graph"!=ka){U.jumpTo(2);break}if(ja.sideBar){U.jumpTo(3);break}Ca=Za.LoadingIndicator.open("loading side bar");return U.yield(Ca.whenRendered(),4);case 4:return mb=ja,U.yield(bb.import("./scene graph side bar master-939fc836.js"),6);case 6:if(!(Ub=U.yieldResult)){U.jumpTo(7);break}return U.yield(Za.resource("part://SystemIDE/scene graph side bar master"),8);case 8:Ub=U.yieldResult;case 7:return U.yield(Ub.read(),5);case 5:return mb.sideBar=U.yieldResult,ja.sideBar.hasFixedPosition=!0,ja.sideBar.respondsToVisibleWindow=
!0,ja.sideBar.openInWorld(),ja.sideBar.right=0,U.yield(ja.sideBar.whenRendered(),9);case 9:Ca.remove();case 3:ja.sideBar.toggle(ja.activeSideBars.includes("Scene Graph"));case 2:if("Styling Palette"!=ka){U.jumpTo(0);break}if(ja.stylingPalette){U.jumpTo(11);break}Ya=Za.LoadingIndicator.open("loading side bar");return U.yield(Ya.whenRendered(),12);case 12:return $a=ja,U.yield(bb.import("./styling side bar master-9dc5ec5d.js"),14);case 14:if(!(Ua=U.yieldResult)){U.jumpTo(15);break}return U.yield(Za.resource("part://SystemIDE/styling side bar master"),
16);case 16:Ua=U.yieldResult;case 15:return U.yield(Ua.read(),13);case 13:return $a.stylingPalette=U.yieldResult,ja.stylingPalette.collapseAll(),ja.stylingPalette.hasFixedPosition=!0,ja.stylingPalette.respondsToVisibleWindow=!0,ja.stylingPalette.openInWorld(),ja.stylingPalette.left=ja.world().width,U.yield(ja.stylingPalette.whenRendered(),17);case 17:Ya.remove();case 11:ja.stylingPalette.toggle(ja.activeSideBars.includes("Styling Palette")),U.jumpToEnd()}})}},{key:"onMouseDown",value:function(ka){var ja=
this.get("select shape type"),Ca=this.get("shape mode button"),mb=this.get("side bar selector");ka.targetMorph==ja&&(this.world().openWorldMenu(ka,this.getShapeMenuItems()).position=Ca.globalBounds().bottomLeft().subPt(this.world().scroll));"undo button"==ka.targetMorph.name&&$world.execCommand("undo");"redo button"==ka.targetMorph.name&&$world.execCommand("redo");"save button"==ka.targetMorph.name&&$world.execCommand("save world");ka.targetMorph==Ca&&this.setEditMode("Shape");"text mode button"==
ka.targetMorph.name&&this.setEditMode("Text");"hand mode button"==ka.targetMorph.name&&this.setEditMode("Hand");"halo mode button"==ka.targetMorph.name&&this.setEditMode("Halo");"open component browser"==ka.targetMorph.name&&this.interactivelyLoadComponent();"load world button"==ka.targetMorph.name&&this.world().execCommand("load world");"comment browser button"==ka.targetMorph.name&&this.toggleCommentBrowser();ka.targetMorph==mb&&(this.world().openWorldMenu(ka,this.getSideBarMenuItems()).position=
mb.globalBounds().bottomLeft().subPt(this.world().scroll))}},{key:"colorCommentBrowserButton",value:function(){var ka=this.get("user flap"),ja=ka.haloShadow;ka=ka.haloColor;var Ca=this.get("comment browser button");Ca.fontColor=ka;Ca.dropShadow=ja}},{key:"uncolorCommentBrowserButton",value:function(){var ka=this.get("comment browser button"),ja=Za.Color.rgb(102,102,102);ka.dropShadow=!1;ka.fontColor=ja}},{key:"toggleCommentBrowser",value:function(){var ka=this;return $jscomp.asyncExecutePromiseGeneratorProgram(function(ja){Za.CommentBrowser.isOpen()?
ka.uncolorCommentBrowserButton():ka.colorCommentBrowserButton();return ja.yield(ka.world().execCommand("toggle comment browser"),0)})}},{key:"commentCountBadge",get:function(){return this.get("comment browser button").get("comment count badge")}},{key:"interactivelyLoadComponent",value:function(){var ka=this,ja,Ca,mb,Ub,Ya;return $jscomp.asyncExecutePromiseGeneratorProgram(function($a){if(1==$a.nextAddress)return ja=ka.get("open component browser"),Ca=ka.userFlap,mb=Ca.haloShadow,Ub=Ca.haloColor,
Ya=Za.Color.rgb(102,102,102),ja.fontColor=Ub,ja.dropShadow=mb,$a.yield(ka.world().execCommand("browse and load component"),2);ja.dropShadow=!1;ja.fontColor=Ya;$a.jumpToEnd()})}},{key:"setEditMode",value:function(ka,ja){var Ca=this;ja=void 0===ja?!1:ja;this.editMode=ka;var mb=this.primaryTarget||this.world(),Ub=this.userFlap,Ya=Ub.haloShadow,$a=Ub.haloColor,Ua=Za.Color.rgb(102,102,102);ja||(this._tmpEditMode=ka);ja=this.get("shape mode button");Ub=this.get("text mode button");var U=this.get("hand mode button"),
Ba=this.get("halo mode button");[["Shape",ja.submorphs],["Text",[Ub]],["Hand",[U]],["Halo",[Ba]]].forEach(function(K){var V=$jscomp.makeIterator(K);K=V.next().value;V=V.next().value;"Shape"==ka?Ca.toggleShapeMode(mb,!0,Ca.currentShapeMode):"Text"==ka?Ca.toggleShapeMode(mb,!0,"Text"):Ca.toggleShapeMode(mb,!1);Ca.showHaloPreviews("Halo"==ka);K==ka?V.forEach(function(ra){ra.dropShadow=Ya;ra.fontColor=$a}):V.forEach(function(ra){ra.dropShadow=null;ra.fontColor=Ua})})}},{key:"canBeCreatedViaDrag",value:function(ka){return[Za.Morph,
Za.Ellipse,Za.HTMLMorph,Za.Canvas,Za.Text,Za.Polygon,Za.Path,Za.Image].includes(ka)}},{key:"toggleShapeMode",value:function(ka,ja,Ca){var mb={Rectangle:Za.Morph,Ellipse:Za.Ellipse,HTML:Za.HTMLMorph,Canvas:Za.Canvas,Image:Za.Image,Path:Za.Path,Label:Za.Label,Polygon:Za.Polygon,Text:Za.Text};ja?(ka.nativeCursor="crosshair",ka._yieldShapeOnClick=mb[Ca]):(ka._yieldShapeOnClick=!1,ka.nativeCursor="auto")}},{key:"handleShapeCreation",value:function(ka){var ja=this.primaryTarget||this.world(),Ca=ja._yieldShapeOnClick;
if(!Ca)return!1;ja._sizeTooltip&&ja._sizeTooltip.remove();if(ka.targetMorph!=ja)return!1;if(ja._shapeRequest&&Ca&&!ja._yieldedShape){var mb=ja.localize(this.world().firstHand.position);switch(Ca){case Za.Image:ja.addMorph(Za.morph({type:Ca,position:mb,extent:Za.pt(150,150),fill:Za.Color.transparent,imageUrl:"https://i.imgur.com/uGRFZEs.jpg"}));break;case Za.Label:ja.addMorph(Za.morph({type:Ca,position:mb,value:"I am a label!",fill:Za.Color.transparent}));break;case Za.Text:if(ka.targetMorph.isText)return;
this.addMorph(Za.morph({type:Ca,position:mb,textString:"I am a text field!",fill:Za.Color.transparent}))}}Ca==Za.Text&&ja._yieldedShape?ja._yieldedShape.focus():ja._yieldedShape&&this.world().showHaloFor(ja._yieldedShape);ja._yieldedShape=null;ja._shapeRequest=!1}},{key:"prepareShapeCreation",value:function(ka){var ja=this.primaryTarget||this.world(),Ca=ja._yieldShapeOnClick;if(!Ca||!this.canBeCreatedViaDrag(Ca))return!1;ja._yieldedShape=ja.addMorph(Za.morph(Object.assign({type:Ca,position:ka.positionIn(ja),
extent:Za.pt(1,1),fill:Za.Color.transparent,borderWidth:1,borderColor:Za.Color.rgb(23,160,251),fixedHeight:!0,fixedWidth:!0,lineWrapping:!0},Ca==Za.Image?this.getImageDefaultAttrs():{},{},Ca==Za.Polygon?this.getPolyDefaultAttrs():{},{},Ca==Za.Path?this.getPathDefaultAttrs():{})));ja._sizeTooltip=Za.morph({type:Za.Tooltip,padding:Za.Rectangle.inset(5,5,5,5),styleClasses:["Tooltip"]}).openInWorld();return!0}},{key:"getPolyDefaultAttrs",value:function(){return{vertices:[Za.pt(131.4,86.3),Za.pt(171,139.6),
Za.pt(105.9,119.9),Za.pt(65.3,172.5),Za.pt(64.7,107),Za.pt(0,86.3),Za.pt(64.7,65.5),Za.pt(65.3,0),Za.pt(105.9,52.6),Za.pt(171,32.9),Za.pt(131.4,86.3)],borderWidth:1}}},{key:"getPathDefaultAttrs",value:function(){return{vertices:[Za.pt(0,0),Za.pt(1,1)],borderWidth:1}}},{key:"getImageDefaultAttrs",value:function(){return{imageUrl:"https://i.imgur.com/uGRFZEs.jpg"}}},{key:"yieldShapeIfNeeded",value:function(ka){var ja=this.primaryTarget||this.world();return ja._yieldedShape?(ja._yieldedShape.extent=
ka.positionIn(ja.world()).subPt(ka.state.dragStartPosition).subPt(Za.pt(1,1)).maxPt(Za.pt(1,1)),ja._sizeTooltip.description=ja._yieldShapeOnClick[Symbol.for("__LivelyClassName__")]+": "+ja._yieldedShape.width.toFixed(0)+"x"+ja._yieldedShape.height.toFixed(0),ja._sizeTooltip.topLeft=ka.positionIn(ja.world()).addXY(15,15),!0):!1}},{key:"handleHaloSelection",value:function(ka){var ja=this.world(),Ca=this.primaryTarget||ja;this._showHaloPreview&&this._currentlyHighlighted&&0==ja.halos().length&&(ka.stop(),
ja.getSubmorphsByStyleClassName("HaloPreview").forEach(function(mb){return mb.remove()}),ja.showHaloFor(this._currentlyHighlighted));ka.targetMorph==Ca&&(Ca._shapeRequest=!0)}},{key:"handleHaloPreview",value:function(ka){if(this._showHaloPreview){var ja=this.primaryTarget||this.world();ka=ja.morphsContainingPoint(ka.positionIn(ja));ja=ka.filter(function(Ca){return Ca.halosEnabled&&[Ca].concat($jscomp.arrayFromIterable(Ca.ownerChain())).every(function(mb){return mb.visible&&0<mb.opacity&&!mb.styleClasses.includes("HaloPreview")})})[0];
ka.find(function(Ca){return Ca.isMenuItem})||this.showHaloPreviewFor(ja)}}},{key:"showHaloPreviewFor",value:function(ka){var ja=this.primaryTarget||this.world();if(ka&&(![ka].concat($jscomp.arrayFromIterable(ka.ownerChain())).find(function(Ca){return Ca.isComponent})&&ka.getWindow()?ka=null:[ka].concat($jscomp.arrayFromIterable(ka.ownerChain())).find(function(Ca){return Ca.isEpiMorph})?ka=null:ka==ja&&(ka=null),this._currentlyHighlighted!=ka&&(this.clearHaloPreviews(),this._currentlyHighlighted=ka),
!(0<this.world().halos().length)&&ka)){this._previewCache||(this._previewCache=new WeakMap);ja=Za.Morph;switch(Za.getClassName(ka)){case "Ellipse":ja=Za.Ellipse}ja=this._previewCache.get(ka)||Za.morph({type:ja,styleClasses:["HaloPreview"],epiMorph:!0,fill:Za.Color.transparent,reactsToPointer:!1,halosEnabled:!1,acceptsDrops:!1,border:{color:Za.Color.rgb(23,160,251),width:1}});ja.owner||this.world().addMorph(ja);ja.setBounds(ka.globalBounds());ja.borderColor=Za.Color.rgb(23,160,251);ja.borderStyle=
"solid";ka.master&&(ja.borderColor=Za.Color.purple);ka.ownerChain().find(function(Ca){return Ca.master&&Ca.master.managesMorph(ka)})&&(ja.borderColor=Za.Color.purple,ja.borderStyle="dotted");ka.isComponent&&(ja.borderColor=Za.Color.magenta);this._previewCache.set(ka,ja)}}},{key:"showHaloPreviews",value:function(ka){ka||this.clearHaloPreviews();this._showHaloPreview=ka}},{key:"clearHaloPreviews",value:function(){this.world().getSubmorphsByStyleClassName("HaloPreview").forEach(function(ka){return ka.remove()})}},
{key:"prepareDragSelection",value:function(ka){var ja=(this.primaryTarget||this.world()).world();this._selectionStartPos=ka.positionIn(ja);this._morphSelection=ja.addMorph({type:Za.Selection,epiMorph:!0,reactsToPointer:!1,position:this._selectionStartPos,extent:ka.state.dragDelta});this._selectedMorphs={}}},{key:"adjustDragSelection",value:function(ka){var ja=this,Ca=this.primaryTarget||this.world(),mb=Ca.world(),Ub=Za.Rectangle.fromAny(ka.position,this._selectionStartPos);this._morphSelection.setBounds(Ub);
Ca.submorphs.forEach(function(Ya){if(!Ya.isSelectionElement&&!Ya.isHand){var $a=Ya.globalBounds(),Ua=Ub.containsRect($a);!ja._selectedMorphs[Ya.id]&&Ua&&(ja._selectedMorphs[Ya.id]=mb.addMorph({type:Za.SelectionElement,bounds:$a},ja._morphSelection));ja._selectedMorphs[Ya.id]&&!Ua&&(ja._selectedMorphs[Ya.id].remove(),delete ja._selectedMorphs[Ya.id])}})}},{key:"finishDragSelectionIfNeeded",value:function(ka){if(this._morphSelection){var ja=this.world();this._morphSelection.fadeOut(200);Za.obj.values(this._selectedMorphs).map(function(Ca){return Ca.remove()});
ja.showHaloForSelection(Object.keys(this._selectedMorphs).map(function(Ca){return ja.getMorphWithId(Ca)}));this._selectedMorphs={};this._morphSelection=null}}},{key:"onTargetDragStart",value:function(ka){!this.prepareShapeCreation(ka)&&ka.leftMouseButtonPressed()&&this.prepareDragSelection(ka)}},{key:"onTargetDrag",value:function(ka){!this.yieldShapeIfNeeded(ka)&&this._morphSelection&&this.adjustDragSelection(ka)}},{key:"detachFromTarget",value:function(ka){Za.disconnect(ka,"onMouseMove",this,"handleHaloPreview");
Za.disconnect(ka,"onMouseDown",this,"handleHaloSelection");Za.disconnect(ka,"onMouseUp",this,"handleShapeCreation");Za.disconnect(ka,"onDragStart",this,"onTargetDragStart");Za.disconnect(ka,"onDrag",this,"onTargetDrag");Za.disconnect(ka,"onDragEnd",this,"finishDragSelectionIfNeeded")}},{key:"attachToTarget",value:function(ka){this.primaryTarget&&this.detachFromTarget(this.primaryTarget);this.primaryTarget=ka;Za.connect(ka,"onMouseMove",this,"handleHaloPreview",{garbageCollect:!0});Za.connect(ka,"onMouseDown",
this,"handleHaloSelection",{garbageCollect:!0});Za.connect(ka,"onMouseUp",this,"handleShapeCreation",{garbageCollect:!0});Za.connect(ka,"onDragStart",this,"onTargetDragStart",{garbageCollect:!0});Za.connect(ka,"onDrag",this,"onTargetDrag",{garbageCollect:!0});Za.connect(ka,"onDragEnd",this,"finishDragSelectionIfNeeded",{garbageCollect:!0})}}],[{key:Symbol.for("__LivelyClassName__"),get:function(){return"LivelyTopBar"}},{key:"properties",get:function(){return{isTopBar:{readOnly:!0,get:function(){return!0}},
primaryTarget:{doc:"A reference to the morph that the top bar considers its primary target",defaultValue:null},userFlap:{},activeSideBars:{},currentShapeMode:{after:["submorphs"],set:function(ka){this.setProperty("currentShapeMode",ka);this.get("shape status icon").textAndAttributes=Za.Icon.textAttribute(this.shapeToIcon[ka].args[0])}},sideBarToIcon:{readOnly:!0,get:function(){return{"Scene Graph":{args:["sitemap",{textStyleClasses:["fas"]}]},"Styling Palette":{args:["palette",{textStyleClasses:["fas"]}]}}}},
shapeToIcon:{readOnly:!0,get:function(){return{Rectangle:{shortcut:"R",args:["square",{textStyleClasses:["fas"]}]},Ellipse:{shortcut:"E",args:["circle",{textStyleClasses:["fas"]}]},Image:{shortcut:"I",args:["image",{textStyleClasses:["fas"],paddingTop:"1px"}]},Path:{shortcut:"P",args:["bezier-curve",{fontSize:13,paddingTop:"3px"}]},Polygon:{shortcut:"Q",args:["draw-polygon",{fontSize:17}]},Label:{shortcut:"L",args:["tag",{paddingTop:"1px"}]},Canvas:{shortcut:"C",args:["chess-board",{paddingTop:"1px"}]},
HTML:{shortcut:"H",args:["code",{paddingTop:"1px"}]}}}}}}}],Fa,{pathInPackage:function(){return"index.js"},unsubscribeFromToplevelDefinitionChanges:function(){return function(){}},subscribeToToplevelDefinitionChanges:function(){return function(){}},package:function(){return{name:"LivelyTopBar",version:"0.1.1-218"}}},{start:717,end:21724})}(Za.Morph);Xa=Za.LivelyTopBar;Za.default=Xa}}});