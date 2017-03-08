var fluid_1_5=fluid_1_5||{},fluid=fluid||fluid_1_5;!function($,fluid){"use strict";function generate(c,count){for(var togo="",i=0;count>i;++i)togo+=c;return togo}function printImpl(obj,small,options){var big=small+options.indentChars;if(null===obj)return"null";if(fluid.isPrimitive(obj))return JSON.stringify(obj);var i,j=[];if(fluid.isArrayable(obj)){if(0===obj.length)return"[]";for(i=0;i<obj.length;++i)j[i]=printImpl(obj[i],big,options);return"[\n"+big+j.join(",\n"+big)+"\n"+small+"]"}return i=0,fluid.each(obj,function(value,key){j[i++]=JSON.stringify(key)+": "+printImpl(value,big,options)}),"{\n"+big+j.join(",\n"+big)+"\n"+small+"}"}fluid.renderTimestamp=function(date){var zeropad=function(num,width){width||(width=2);var numstr=void 0===num?"":num.toString();return"00000".substring(5-width+numstr.length)+numstr};return zeropad(date.getHours())+":"+zeropad(date.getMinutes())+":"+zeropad(date.getSeconds())+"."+zeropad(date.getMilliseconds(),3)},fluid.isTracing=!1,fluid.registerNamespace("fluid.tracing"),fluid.tracing.pathCount=[],fluid.tracing.summarisePathCount=function(pathCount){pathCount=pathCount||fluid.tracing.pathCount;for(var togo={},i=0;i<pathCount.length;++i){var path=pathCount[i];togo[path]?++togo[path]:togo[path]=1}var toReallyGo=[];return fluid.each(togo,function(el,path){toReallyGo.push({path:path,count:el})}),toReallyGo.sort(function(a,b){return b.count-a.count}),toReallyGo},fluid.tracing.condensePathCount=function(prefixes,pathCount){prefixes=fluid.makeArray(prefixes);var prefixCount={};fluid.each(prefixes,function(prefix){prefixCount[prefix]=0});var togo=[];return fluid.each(pathCount,function(el){var path=el.path;fluid.find(prefixes,function(prefix){return 0===path.indexOf(prefix)?(prefixCount[prefix]+=el.count,!0):void 0})||togo.push(el)}),fluid.each(prefixCount,function(count,path){togo.unshift({path:path,count:count})}),togo},fluid.detectStackStyle=function(e){var style="other",stackStyle={offset:0};return e.arguments?style="chrome":"undefined"!=typeof window&&window.opera&&e.stacktrace?style="opera10":e.stack?(style="firefox",stackStyle.offset=-1===e.stack.indexOf("Trace exception")?1:0):"undefined"==typeof window||!window.opera||"stacktrace"in e||(style="opera"),stackStyle.style=style,stackStyle},fluid.obtainException=function(){try{throw new Error("Trace exception")}catch(e){return e}};var stackStyle=fluid.detectStackStyle(fluid.obtainException());fluid.registerNamespace("fluid.exceptionDecoders"),fluid.decodeStack=function(){if("firefox"!==stackStyle.style)return null;var e=fluid.obtainException();return fluid.exceptionDecoders[stackStyle.style](e)},fluid.exceptionDecoders.firefox=function(e){var lines=e.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^\(/gm,"{anonymous}(").split("\n");return fluid.transform(lines,function(line){var atind=line.indexOf("@");return-1===atind?[line]:[line.substring(atind+1),line.substring(0,atind)]})},fluid.getCallerInfo=function(atDepth){atDepth=(atDepth||3)-stackStyle.offset;var stack=fluid.decodeStack();return stack?stack[atDepth][0]:null},fluid.prettyPrintJSON=function(obj,options){return options=$.extend({indent:4},options),options.indentChars=generate(" ",options.indent),printImpl(obj,"",options)},fluid.dumpEl=function(element){var togo;if(!element)return"null";if(3===element.nodeType||8===element.nodeType)return"[data: "+element.data+"]";if(9===element.nodeType)return"[document: location "+element.location+"]";if(!element.nodeType&&fluid.isArrayable(element)){togo="[";for(var i=0;i<element.length;++i)togo+=fluid.dumpEl(element[i]),i<element.length-1&&(togo+=", ");return togo+"]"}return element=$(element),togo=element.get(0).tagName,element.id&&(togo+="#"+element.id),element.attr("class")&&(togo+="."+element.attr("class")),togo}}(jQuery,fluid_1_5);
