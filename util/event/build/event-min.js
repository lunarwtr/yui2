/*                                                                                                                                                      Copyright (c) 2006, Yahoo! Inc. All rights reserved.Code licensed under the BSD License:http://developer.yahoo.net/yui/license.txtversion: 0.11.3*/ YAHOO.util.CustomEvent=function(_1,_2,_3){this.type=_1;this.scope=_2||window;this.silent=_3;this.subscribers=[];if(!this.silent){}};YAHOO.util.CustomEvent.prototype={subscribe:function(fn,_5,_6){if(this.subscribeEvent){this.subscribeEvent.fire(fn,_5,_6);}this.subscribers.push(new YAHOO.util.Subscriber(fn,_5,_6));},unsubscribe:function(fn,_7){var _8=false;for(var i=0,len=this.subscribers.length;i<len;++i){var s=this.subscribers[i];if(s&&s.contains(fn,_7)){this._delete(i);_8=true;}}return _8;},fire:function(){var len=this.subscribers.length;if(!len&&this.silent){return;}var _12=[];for(var i=0;i<arguments.length;++i){_12.push(arguments[i]);}if(!this.silent){}for(i=0;i<len;++i){var s=this.subscribers[i];if(s){if(!this.silent){}var _13=(s.override)?s.obj:this.scope;s.fn.call(_13,this.type,_12,s.obj);}}},unsubscribeAll:function(){for(var i=0,len=this.subscribers.length;i<len;++i){this._delete(len-1-i);}},_delete:function(_14){var s=this.subscribers[_14];if(s){delete s.fn;delete s.obj;}this.subscribers.splice(_14,1);},toString:function(){return "CustomEvent: "+"'"+this.type+"', "+"scope: "+this.scope;}};YAHOO.util.Subscriber=function(fn,obj,_16){this.fn=fn;this.obj=obj||null;this.override=(_16);};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){return (this.fn==fn&&this.obj==obj);};YAHOO.util.Subscriber.prototype.toString=function(){return "Subscriber { obj: "+(this.obj||"")+", override: "+(this.override||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var _17=false;var _18=[];var _19=[];var _20=[];var _21=[];var _22=[];var _23=0;var _24=[];var _25=[];var _26=0;return {POLL_RETRYS:200,POLL_INTERVAL:50,EL:0,TYPE:1,FN:2,WFN:3,SCOPE:3,ADJ_SCOPE:4,isSafari:(/Safari|Konqueror|KHTML/gi).test(navigator.userAgent),isIE:(!this.isSafari&&!navigator.userAgent.match(/opera/gi)&&navigator.userAgent.match(/msie/gi)),addDelayedListener:function(el,_28,fn,_29,_30){_19[_19.length]=[el,_28,fn,_29,_30];if(_17){_23=this.POLL_RETRYS;this.startTimeout(0);}},startTimeout:function(_31){var i=(_31||_31===0)?_31:this.POLL_INTERVAL;var _32=this;var _33=function(){_32._tryPreloadAttach();};this.timeout=setTimeout(_33,i);},onAvailable:function(_34,_35,_36,_37){_24.push({id:_34,fn:_35,obj:_36,override:_37});_23=this.POLL_RETRYS;this.startTimeout(0);},addListener:function(el,_38,fn,_39,_40){if(!fn||!fn.call){return false;}if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=(this.on(el[i],_38,fn,_39,_40)&&ok);}return ok;}else{if(typeof el=="string"){var oEl=this.getEl(el);if(_17&&oEl){el=oEl;}else{this.addDelayedListener(el,_38,fn,_39,_40);return true;}}}if(!el){return false;}if("unload"==_38&&_39!==this){_20[_20.length]=[el,_38,fn,_39,_40];return true;}var _43=(_40)?_39:el;var _44=function(e){return fn.call(_43,YAHOO.util.Event.getEvent(e),_39);};var li=[el,_38,fn,_44,_43];var _47=_18.length;_18[_47]=li;if(this.useLegacyEvent(el,_38)){var _48=this.getLegacyIndex(el,_38);if(_48==-1||el!=_21[_48][0]){_48=_21.length;_25[el.id+_38]=_48;_21[_48]=[el,_38,el["on"+_38]];_22[_48]=[];el["on"+_38]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),_48);};}_22[_48].push(_47);}else{if(el.addEventListener){el.addEventListener(_38,_44,false);}else{if(el.attachEvent){el.attachEvent("on"+_38,_44);}}}return true;},fireLegacyEvent:function(e,_49){var ok=true;var le=_22[_49];for(var i=0,len=le.length;i<len;++i){var _51=le[i];if(_51){var li=_18[_51];if(li&&li[this.WFN]){var _52=li[this.ADJ_SCOPE];var ret=li[this.WFN].call(_52,e);ok=(ok&&ret);}else{delete le[i];}}}return ok;},getLegacyIndex:function(el,_54){var key=this.generateId(el)+_54;if(typeof _25[key]=="undefined"){return -1;}else{return _25[key];}},useLegacyEvent:function(el,_56){if(!el.addEventListener&&!el.attachEvent){return true;}else{if(this.isSafari){if("click"==_56||"dblclick"==_56){return true;}}}return false;},removeListener:function(el,_57,fn,_58){if(!fn||!fn.call){return false;}if(typeof el=="string"){el=this.getEl(el);}else{if(this._isValidCollection(el)){var ok=true;for(var i=0,len=el.length;i<len;++i){ok=(this.removeListener(el[i],_57,fn)&&ok);}return ok;}}if("unload"==_57){for(i=0,len=_20.length;i<len;i++){var li=_20[i];if(li&&li[0]==el&&li[1]==_57&&li[2]==fn){_20.splice(i,1);return true;}}return false;}var _59=null;if("undefined"==typeof _58){_58=this._getCacheIndex(el,_57,fn);}if(_58>=0){_59=_18[_58];}if(!el||!_59){return false;}if(el.removeEventListener){el.removeEventListener(_57,_59[this.WFN],false);}else{if(el.detachEvent){el.detachEvent("on"+_57,_59[this.WFN]);}}delete _18[_58][this.WFN];delete _18[_58][this.FN];_18.splice(_58,1);return true;},getTarget:function(ev,_61){var t=ev.target||ev.srcElement;return this.resolveTextNode(t);},resolveTextNode:function(_63){if(_63&&_63.nodeName&&"#TEXT"==_63.nodeName.toUpperCase()){return _63.parentNode;}else{return _63;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}return y;},getXY:function(ev){return [this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else{if(ev.type=="mouseover"){t=ev.fromElement;}}}return this.resolveTextNode(t);},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(e){return t;}}return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}c=c.caller;}}return ev;},getCharCode:function(ev){return ev.charCode||((ev.type=="keypress")?ev.keyCode:0);},_getCacheIndex:function(el,_67,fn){for(var i=0,len=_18.length;i<len;++i){var li=_18[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==_67){return i;}}return -1;},generateId:function(el){var id=el.id;if(!id){id="yuievtautoid-"+_26;++_26;el.id=id;}return id;},_isValidCollection:function(o){return (o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){},_load:function(e){_17=true;},_tryPreloadAttach:function(){if(this.locked){return false;}this.locked=true;var _70=!_17;if(!_70){_70=(_23>0);}var _71=[];for(var i=0,len=_19.length;i<len;++i){var d=_19[i];if(d){var el=this.getEl(d[this.EL]);if(el){this.on(el,d[this.TYPE],d[this.FN],d[this.SCOPE],d[this.ADJ_SCOPE]);delete _19[i];}else{_71.push(d);}}}_19=_71;var _73=[];for(i=0,len=_24.length;i<len;++i){var _74=_24[i];if(_74){el=this.getEl(_74.id);if(el){var _75=(_74.override)?_74.obj:el;_74.fn.call(_75,_74.obj);delete _24[i];}else{_73.push(_74);}}}_23=(_71.length===0&&_73.length===0)?0:_23-1;if(_70){this.startTimeout();}this.locked=false;return true;},purgeElement:function(el,_76,_77){var _78=this.getListeners(el,_77);if(_78){for(var i=0,len=_78.length;i<len;++i){var l=_78[i];this.removeListener(el,l.type,l.fn);}}if(_76&&el&&el.childNodes){for(i=0,len=el.childNodes.length;i<len;++i){this.purgeElement(el.childNodes[i],_76,_77);}}},getListeners:function(el,_80){var _81=[];if(_18&&_18.length>0){for(var i=0,len=_18.length;i<len;++i){var l=_18[i];if(l&&l[this.EL]===el&&(!_80||_80===l[this.TYPE])){_81.push({type:l[this.TYPE],fn:l[this.FN],obj:l[this.SCOPE],adjust:l[this.ADJ_SCOPE],index:i});}}}return (_81.length)?_81:null;},_unload:function(e,me){for(var i=0,len=_20.length;i<len;++i){var l=_20[i];if(l){var _83=(l[this.ADJ_SCOPE])?l[this.SCOPE]:window;l[this.FN].call(_83,this.getEvent(e),l[this.SCOPE]);}}if(_18&&_18.length>0){var j=_18.length;while(j){var _85=j-1;l=_18[_85];if(l){this.removeListener(l[this.EL],l[this.TYPE],l[this.FN],_85);}j=j-1;}this.clearCache();}for(i=0,len=_21.length;i<len;++i){delete _21[i][0];delete _21[i];}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement,db=document.body;if(dd&&dd.scrollTop){return [dd.scrollTop,dd.scrollLeft];}else{if(db){return [db.scrollTop,db.scrollLeft];}else{return [0,0];}}}};}();YAHOO.util.Event.on=YAHOO.util.Event.addListener;if(document&&document.body){YAHOO.util.Event._load();}else{YAHOO.util.Event.on(window,"load",YAHOO.util.Event._load,YAHOO.util.Event,true);}YAHOO.util.Event.on(window,"unload",YAHOO.util.Event._unload,YAHOO.util.Event,true);YAHOO.util.Event._tryPreloadAttach();}