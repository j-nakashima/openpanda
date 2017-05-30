/*
 * Fluid Infusion v1.4
 *
 * Infusion is distributed under the Educational Community License 2.0 and new BSD licenses: 
 * http://wiki.fluidproject.org/display/fluid/Fluid+Licensing
 *
 * For information on copyright, see the individual Infusion source code files: 
 * https://github.com/fluid-project/infusion/
 */
var fluid_1_4=fluid_1_4||{};var fluid=fluid||fluid_1_4;(function($,fluid){fluid.version="Infusion 1.4";fluid.environment={fluid:fluid};var globalObject=window||{};var softFailure=[true];fluid.describeActivity=function(){return[]};fluid.fail=function(message){fluid.setLogging(true);fluid.log.apply(null,["ASSERTION FAILED: "].concat(fluid.makeArray(arguments)).concat(fluid.describeActivity()));if(softFailure[0]){throw new Error(message)}else{message.fail()}};fluid.pushSoftFailure=function(condition){if(typeof (condition)==="boolean"){softFailure.unshift(condition)}else{if(condition===-1){softFailure.shift()}}};fluid.notrycatch=false;fluid.tryCatch=function(tryfun,catchfun,finallyfun){finallyfun=finallyfun||fluid.identity;if(fluid.notrycatch){var togo=tryfun();finallyfun();return togo}else{try{return tryfun()}catch(e){if(catchfun){catchfun(e)}else{throw (e)}}finally{finallyfun()}}};fluid.expect=function(name,members,target){fluid.transform(fluid.makeArray(members),function(key){if(typeof target[key]==="undefined"){fluid.fail(name+" missing required parameter "+key)}})};var logging;fluid.isLogging=function(){return logging};fluid.setLogging=function(enabled){if(typeof enabled==="boolean"){logging=enabled}else{logging=false}};fluid.applyHostFunction=function(obj,func,args){if(func.apply){func.apply(obj,args)}else{var applier=Function.prototype.bind.call(func,obj);applier.apply(obj,args)}};fluid.log=function(message){if(logging){var arg0=fluid.renderTimestamp(new Date())+":  ";var args=[arg0].concat(fluid.makeArray(arguments));var str=args.join("");if(typeof (console)!=="undefined"){if(console.debug){fluid.applyHostFunction(console,console.debug,args)}else{if(typeof (console.log)==="function"){fluid.applyHostFunction(console,console.log,args)}else{console.log(str)}}}else{if(typeof (YAHOO)!=="undefined"){YAHOO.log(str)}else{if(typeof (opera)!=="undefined"){opera.postError(str)}}}}};fluid.wrap=function(obj){return((!obj||obj.jquery)?obj:$(obj))};fluid.unwrap=function(obj){return obj&&obj.jquery&&obj.length===1?obj[0]:obj};fluid.identity=function(arg){return arg};fluid.isValue=function(value){return value!==undefined&&value!==null};fluid.isPrimitive=function(value){var valueType=typeof (value);return !value||valueType==="string"||valueType==="boolean"||valueType==="number"||valueType==="function"};fluid.isDOMNode=function(obj){return obj&&typeof (obj.nodeType)==="number"};fluid.isArrayable=function(totest){return totest&&!fluid.isPrimitive(totest)&&typeof (totest.length)==="number"};fluid.freshContainer=function(tocopy){return fluid.isArrayable(tocopy)?[]:{}};fluid.copy=function(tocopy){if(fluid.isPrimitive(tocopy)){return tocopy}return $.extend(true,fluid.freshContainer(tocopy),tocopy)};fluid.makeArray=function(arg){if(arg===null||arg===undefined){return[]}else{return $.makeArray(arg)}};function transformInternal(source,togo,key,args){var transit=source[key];for(var j=0;j<args.length-1;++j){transit=args[j+1](transit,key)}togo[key]=transit}fluid.transform=function(source){var togo=fluid.freshContainer(source);if(fluid.isArrayable(source)){for(var i=0;i<source.length;++i){transformInternal(source,togo,i,arguments)}}else{for(var key in source){transformInternal(source,togo,key,arguments)}}return togo};fluid.each=function(source,func){if(fluid.isArrayable(source)){for(var i=0;i<source.length;++i){func(source[i],i)}}else{for(var key in source){func(source[key],key)}}};fluid.find=function(source,func,deflt){var disp;if(fluid.isArrayable(source)){for(var i=0;i<source.length;++i){disp=func(source[i],i);if(disp!==undefined){return disp}}}else{for(var key in source){disp=func(source[key],key);if(disp!==undefined){return disp}}}return deflt};fluid.accumulate=function(list,fn,arg){for(var i=0;i<list.length;++i){arg=fn(list[i],arg,i)}return arg};fluid.remove_if=function(source,fn){if(fluid.isArrayable(source)){for(var i=0;i<source.length;++i){if(fn(source[i],i)){source.splice(i,1);--i}}}else{for(var key in source){if(fn(source[key],key)){delete source[key]}}}return source};fluid.filterKeys=function(toFilter,keys,exclude){return fluid.remove_if($.extend({},toFilter),function(value,key){return exclude^($.inArray(key,keys)===-1)})};fluid.censorKeys=function(toCensor,keys){return fluid.filterKeys(toCensor,keys,true)};fluid.keys=function(obj){var togo=[];fluid.each(obj,function(value,key){togo.push(key)});return togo};fluid.contains=function(obj,value){return obj?fluid.find(obj,function(thisValue,key){if(value===thisValue){return true}}):undefined};fluid.keyForValue=function(obj,value){return fluid.find(obj,function(thisValue,key){if(value===thisValue){return key}})};fluid.findKeyInObject=fluid.keyForValue;fluid.arrayToHash=function(array){var togo={};fluid.each(array,function(el){togo[el]=true});return togo};fluid.clear=function(target){if(fluid.isArrayable(target)){target.length=0}else{for(var i in target){delete target[i]}}};fluid.model={};fluid.VALUE={type:"fluid.marker",value:"VALUE"};fluid.NO_VALUE={type:"fluid.marker",value:"NO_VALUE"};fluid.EXPAND={type:"fluid.marker",value:"EXPAND"};fluid.EXPAND_NOW={type:"fluid.marker",value:"EXPAND_NOW"};fluid.isMarker=function(totest,type){if(!totest||typeof (totest)!=="object"||totest.type!=="fluid.marker"){return false}if(!type){return true}return totest===type};fluid.model.copyModel=function(target,source){fluid.clear(target);$.extend(true,target,source)};fluid.model.parseEL=function(EL){return EL===""?[]:String(EL).split(".")};fluid.model.composePath=function(prefix,suffix){return prefix===""?suffix:(suffix===""?prefix:prefix+"."+suffix)};fluid.model.composeSegments=function(){return $.makeArray(arguments).join(".")};fluid.path=fluid.model.composeSegments;fluid.composePath=fluid.model.composePath;fluid.model.environmentStrategy=function(initEnvironment){return{init:function(){var environment=initEnvironment;return function(root,segment,index){var togo;if(environment&&environment[segment]){togo=environment[segment]}environment=null;return togo}}}};fluid.model.defaultCreatorStrategy=function(root,segment){if(root[segment]===undefined){root[segment]={};return root[segment]}};fluid.model.defaultFetchStrategy=function(root,segment){return segment===""?root:root[segment]};fluid.model.funcResolverStrategy=function(root,segment){if(root.resolvePathSegment){return root.resolvePathSegment(segment)}};fluid.model.applyStrategy=function(strategy,root,segment,index){if(typeof (strategy)==="function"){return strategy(root,segment,index)}else{if(strategy&&strategy.next){return strategy.next(root,segment,index)}}};fluid.model.initStrategy=function(baseStrategy,index,oldStrategies){return baseStrategy.init?baseStrategy.init(oldStrategies?oldStrategies[index]:undefined):baseStrategy};fluid.model.makeTrundler=function(root,config,oldStrategies){var that={root:root,strategies:fluid.isArrayable(config)?config:fluid.transform(config.strategies,function(strategy,index){return fluid.model.initStrategy(strategy,index,oldStrategies)})};that.trundle=function(EL,uncess){uncess=uncess||0;var newThat=fluid.model.makeTrundler(that.root,config,that.strategies);newThat.segs=fluid.model.parseEL(EL);newThat.index=0;newThat.step(newThat.segs.length-uncess);return newThat};that.next=function(){if(!that.root){return }var accepted;for(var i=0;i<that.strategies.length;++i){var value=fluid.model.applyStrategy(that.strategies[i],that.root,that.segs[that.index],that.index);if(accepted===undefined){accepted=value}}if(accepted===fluid.NO_VALUE){accepted=undefined}that.root=accepted;++that.index};that.step=function(limit){for(var i=0;i<limit;++i){that.next()}that.last=that.segs[that.index]};return that};fluid.model.defaultSetConfig={strategies:[fluid.model.funcResolverStrategy,fluid.model.defaultFetchStrategy,fluid.model.defaultCreatorStrategy]};fluid.model.trundleImpl=function(trundler,EL,config,uncess){if(typeof (EL)==="string"){trundler=trundler.trundle(EL,uncess)}else{var key=EL.type||"default";var resolver=config.resolvers[key];if(!resolver){fluid.fail("Unable to find resolver of type "+key)}trundler=resolver(EL,trundler)||{};if(EL.path&&trundler.trundle&&trundler.root!==undefined){trundler=fluid.model.trundleImpl(trundler,EL.path,config,uncess)}}return trundler};fluid.model.trundle=function(root,EL,config,uncess){EL=EL||"";config=config||fluid.model.defaultGetConfig;var trundler=fluid.model.makeTrundler(root,config);return fluid.model.trundleImpl(trundler,EL,config,uncess)};fluid.model.getPenultimate=function(root,EL,config){return fluid.model.trundle(root,EL,config,1)};fluid.set=function(root,EL,newValue,config){config=config||fluid.model.defaultSetConfig;var trundler=fluid.model.getPenultimate(root,EL,config);trundler.root[trundler.last]=newValue};fluid.model.defaultGetConfig={strategies:[fluid.model.funcResolverStrategy,fluid.model.defaultFetchStrategy]};fluid.get=function(root,EL,config){return fluid.model.trundle(root,EL,config).root};fluid.model.setBeanValue=fluid.set;fluid.model.getBeanValue=fluid.get;fluid.getGlobalValue=function(path,env){if(path){env=env||fluid.environment;var envFetcher=fluid.model.environmentStrategy(env);return fluid.get(globalObject,path,{strategies:[envFetcher].concat(fluid.model.defaultGetConfig.strategies)})}};fluid.invokeGlobalFunction=function(functionPath,args,environment){var func=fluid.getGlobalValue(functionPath,environment);if(!func){fluid.fail("Error invoking global function: "+functionPath+" could not be located")}else{return func.apply(null,args)}};fluid.registerGlobalFunction=function(functionPath,func,env){env=env||fluid.environment;var envFetcher=fluid.model.environmentStrategy(env);fluid.set(globalObject,functionPath,func,{strategies:[envFetcher].concat(fluid.model.defaultSetConfig.strategies)})};fluid.setGlobalValue=fluid.registerGlobalFunction;fluid.registerNamespace=function(naimspace,env){env=env||fluid.environment;var existing=fluid.getGlobalValue(naimspace,env);if(!existing){existing={};fluid.setGlobalValue(naimspace,existing,env)}return existing};fluid.dumpEl=fluid.identity;fluid.renderTimestamp=fluid.identity;fluid.registerNamespace("fluid.event");fluid.generateUniquePrefix=function(){return(Math.floor(Math.random()*1000000000000)).toString(36)+"-"};var fluid_prefix=fluid.generateUniquePrefix();var fluid_guid=1;fluid.allocateGuid=function(){return fluid_prefix+(fluid_guid++)};fluid.event.identifyListener=function(listener){if(typeof (listener)==="string"){return listener}if(!listener.$$guid){listener.$$guid=fluid.allocateGuid()}return listener.$$guid};fluid.event.mapPriority=function(priority,count){return(priority===null||priority===undefined?-count:(priority==="last"?-Number.MAX_VALUE:(priority==="first"?Number.MAX_VALUE:priority)))};fluid.event.listenerComparator=function(recA,recB){return recB.priority-recA.priority};fluid.event.sortListeners=function(listeners){var togo=[];fluid.each(listeners,function(listener){togo.push(listener)});return togo.sort(fluid.event.listenerComparator)};fluid.event.getEventFirer=function(unicast,preventable){var listeners={};var sortedListeners=[];function fireToListeners(listeners,args,wrapper){for(var i in listeners){var lisrec=listeners[i];var listener=lisrec.listener;if(typeof (listener)==="string"){var listenerFunc=fluid.getGlobalValue(listener);if(!listenerFunc){fluid.fail("Unable to look up name "+listener+" as a global function")}else{listener=lisrec.listener=listenerFunc}}if(lisrec.predicate&&!lisrec.predicate(listener,args)){continue}var value=fluid.tryCatch(function(){var ret=(wrapper?wrapper(listener):listener).apply(null,args);if(preventable&&ret===false){return false}if(unicast){return ret}},function(e){fluid.log("FireEvent received exception "+e.message+" e "+e+" firing to listener "+i);throw (e)});if(value!==undefined){return value}}}return{addListener:function(listener,namespace,predicate,priority){if(!listener){return }if(unicast){namespace="unicast"}if(!namespace){namespace=fluid.event.identifyListener(listener)}listeners[namespace]={listener:listener,predicate:predicate,priority:fluid.event.mapPriority(priority,sortedListeners.length)};sortedListeners=fluid.event.sortListeners(listeners)},removeListener:function(listener){if(typeof (listener)==="string"){delete listeners[listener]}else{if(listener.$$guid){delete listeners[listener.$$guid]}}sortedListeners=fluid.event.sortListeners(listeners)},fireToListeners:function(listeners,args,wrapper){return fireToListeners(listeners,args,wrapper)},fire:function(){return fireToListeners(sortedListeners,arguments)}}};fluid.event.addListenerToFirer=function(firer,value,namespace){if(fluid.isArrayable(value)){for(var i=0;i<value.length;++i){fluid.event.addListenerToFirer(firer,value[i],namespace)}}else{if(typeof (value)==="function"||typeof (value)==="string"){firer.addListener(value,namespace)}else{if(value&&typeof (value)==="object"){firer.addListener(value.listener,namespace||value.namespace,value.predicate,value.priority)}}}};fluid.mergeListeners=function(that,events,listeners){fluid.each(listeners,function(value,key){var firer,namespace;if(key.charAt(0)==="{"){if(!fluid.expandOptions){fluid.fail("fluid.expandOptions could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor "+key)}firer=fluid.expandOptions(key,that)}else{var keydot=key.indexOf(".");if(keydot!==-1){namespace=key.substring(keydot+1);key=key.substring(0,keydot)}if(!events[key]){fluid.fail("Listener registered for event "+key+" which is not defined for this component");events[key]=fluid.event.getEventFirer()}firer=events[key]}fluid.event.addListenerToFirer(firer,value,namespace)})};function initEvents(that,events,pass){fluid.each(events,function(eventSpec,eventKey){var isIoCEvent=eventSpec&&(typeof (eventSpec)!=="string"||eventSpec.charAt(0)==="{");var event;if(isIoCEvent&&pass==="IoC"){if(!fluid.event.resolveEvent){fluid.fail("fluid.event.resolveEvent could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor ",eventSpec)}else{event=fluid.event.resolveEvent(that,eventKey,eventSpec)}}else{if(pass==="flat"){event=fluid.event.getEventFirer(eventSpec==="unicast",eventSpec==="preventable")}}if(event){that.events[eventKey]=event}})}fluid.instantiateFirers=function(that,options){that.events={};initEvents(that,options.events,"flat");initEvents(that,options.events,"IoC");var listeners=fluid.expandOptions?fluid.expandOptions(options.listeners,that):options.listeners;fluid.mergeListeners(that,that.events,listeners)};fluid.mergeListenersPolicy=function(target,source){var togo=target||{};fluid.each(source,function(listeners,key){togo[key]=fluid.makeArray(source[key]).concat(fluid.makeArray(listeners))});return togo};var defaultsStore={};var resolveGradesImpl=function(gs,gradeNames){gradeNames=fluid.makeArray(gradeNames);fluid.each(gradeNames,function(gradeName){var options=fluid.rawDefaults(gradeName)||{};gs.gradeHash[gradeName]=true;gs.gradeChain.push(gradeName);gs.optionsChain.push(options);fluid.each(options.gradeNames,function(parent){if(!gs.gradeHash[parent]){resolveGradesImpl(gs,parent)}})});return gs};fluid.resolveGradeStructure=function(gradeNames){var gradeStruct={gradeChain:[],gradeHash:{},optionsChain:[]};return resolveGradesImpl(gradeStruct,gradeNames)};fluid.lifecycleFunctions={preInitFunction:true,postInitFunction:true,finalInitFunction:true};fluid.mergeLifecycleFunction=function(target,source){fluid.event.addListenerToFirer(target,source);return target};fluid.rootMergePolicy=fluid.transform(fluid.lifecycleFunctions,function(){return fluid.mergeLifecycleFunction});fluid.makeLifecycleFirers=function(){return fluid.transform(fluid.lifecycleFunctions,function(){return fluid.event.getEventFirer()})};fluid.resolveGrade=function(defaults,gradeNames){var mergeArgs=[defaults];if(gradeNames){var gradeStruct=fluid.resolveGradeStructure(gradeNames);mergeArgs=gradeStruct.optionsChain.reverse().concat(mergeArgs).concat({gradeNames:gradeStruct.gradeChain})}mergeArgs=[fluid.rootMergePolicy,fluid.makeLifecycleFirers()].concat(mergeArgs);var mergedDefaults=fluid.merge.apply(null,mergeArgs);return mergedDefaults};fluid.resolveGradedOptions=function(componentName){var defaults=fluid.rawDefaults(componentName);if(!defaults){return defaults}else{return fluid.resolveGrade(defaults,defaults.gradeNames)}};fluid.rawDefaults=function(componentName,options){if(options===undefined){return defaultsStore[componentName]}else{defaultsStore[componentName]=options}};fluid.hasGrade=function(options,gradeName){return !options||!options.gradeNames?false:fluid.contains(options.gradeNames,gradeName)};fluid.defaults=function(){var offset=0;if(typeof arguments[0]==="boolean"){offset=1}var componentName=(offset===0?"":"*.global-")+arguments[offset];var options=arguments[offset+1];if(options===undefined){return fluid.resolveGradedOptions(componentName)}else{if(options&&options.options){fluid.fail('Probable error in options structure with option named "options" - perhaps you meant to write these options at top level in fluid.defaults?')}fluid.rawDefaults(componentName,options);if(fluid.hasGrade(options,"autoInit")){fluid.makeComponent(componentName,fluid.resolveGradedOptions(componentName))}}};fluid.makeComponent=function(componentName,options){if(!options.initFunction||!options.gradeNames){fluid.fail("Cannot autoInit component "+componentName+" which does not have an initFunction and gradeName defined")}var creator=function(){return fluid.initComponent(componentName,arguments)};var existing=fluid.getGlobalValue(componentName);if(existing){$.extend(creator,existing)}fluid.setGlobalValue(componentName,creator)};fluid.makeComponents=function(components,env){fluid.each(components,function(value,key){var options={gradeNames:fluid.makeArray(value).concat(["autoInit"])};fluid.defaults(key,options)})};fluid.defaults("fluid.littleComponent",{initFunction:"fluid.initLittleComponent",argumentMap:{options:0}});fluid.defaults("fluid.eventedComponent",{gradeNames:["fluid.littleComponent"],mergePolicy:{listeners:"fluid.mergeListenersPolicy"}});fluid.preInitModelComponent=function(that){that.model=that.options.model||{};that.applier=that.options.applier||fluid.makeChangeApplier(that.model,that.options.changeApplierOptions)};fluid.defaults("fluid.modelComponent",{gradeNames:["fluid.littleComponent"],preInitFunction:{namespace:"preInitModelComponent",listener:"fluid.preInitModelComponent"},mergePolicy:{model:"preserve",applier:"nomerge"}});fluid.defaults("fluid.viewComponent",{gradeNames:["fluid.littleComponent","fluid.modelComponent","fluid.eventedComponent"],initFunction:"fluid.initView",argumentMap:{container:0,options:1}});fluid.guardCircularity=function(seenIds,source,message1,message2){if(source&&source.id){if(!seenIds[source.id]){seenIds[source.id]=source}else{if(seenIds[source.id]===source){fluid.fail("Circularity in options "+message1+" - component with typename "+source.typeName+" and id "+source.id+" has already been seen"+message2)}}}};fluid.mergePolicyIs=function(policy,test){return typeof (policy)==="string"&&$.inArray(test,policy.split(/\s*,\s*/))!==-1};function mergeImpl(policy,basePath,target,source,thisPolicy,rec){if(typeof (thisPolicy)==="function"){thisPolicy.call(null,target,source);return target}if(fluid.mergePolicyIs(thisPolicy,"replace")){fluid.clear(target)}fluid.guardCircularity(rec.seenIds,source,"merging"," when evaluating path "+basePath+' - please protect components from merging using the "nomerge" merge policy');for(var name in source){var path=(basePath?basePath+".":"")+name;var newPolicy=policy&&typeof (policy)!=="string"?policy[path]:policy;var thisTarget=target[name];var thisSource=source[name];var primitiveTarget=fluid.isPrimitive(thisTarget);if(thisSource!==undefined){if(thisSource!==null&&typeof (thisSource)==="object"&&!fluid.isDOMNode(thisSource)&&!thisSource.jquery&&thisSource!==fluid.VALUE&&!fluid.mergePolicyIs(newPolicy,"preserve")&&!fluid.mergePolicyIs(newPolicy,"nomerge")&&!fluid.mergePolicyIs(newPolicy,"noexpand")){if(primitiveTarget){target[name]=thisTarget=fluid.freshContainer(thisSource)}mergeImpl(policy,path,thisTarget,thisSource,newPolicy,rec)}else{if(typeof (newPolicy)==="function"){target[name]=newPolicy.call(null,thisTarget,thisSource,name)}else{if(!fluid.isValue(thisTarget)||!fluid.mergePolicyIs(newPolicy,"reverse")){target[name]=fluid.isValue(thisTarget)&&fluid.mergePolicyIs(newPolicy,"preserve")?fluid.model.mergeModel(thisTarget,thisSource):thisSource}}}}}return target}fluid.merge=function(policy,target){var path="";for(var i=2;i<arguments.length;++i){var source=arguments[i];if(source!==null&&source!==undefined){mergeImpl(policy,path,target,source,policy?policy[""]:null,{seenIds:{}})}}if(policy&&typeof (policy)!=="string"){for(var key in policy){var elrh=policy[key];if(typeof (elrh)==="string"&&elrh!=="replace"&&elrh!=="preserve"){var oldValue=fluid.get(target,key);if(oldValue===null||oldValue===undefined){var value=fluid.get(target,elrh);fluid.set(target,key,value)}}}}return target};fluid.transformOptions=function(mergeArgs,transRec){fluid.expect("Options transformation record",["transformer","config"],transRec);var transFunc=fluid.getGlobalValue(transRec.transformer);var togo=fluid.transform(mergeArgs,function(value,key){return key===0?value:transFunc.call(null,value,transRec.config)});return togo};fluid.lastTransformationRecord=function(extraArgs){for(var i=extraArgs.length-1;i>=0;--i){if(extraArgs[i]&&extraArgs[i].transformOptions){return extraArgs[i].transformOptions}}};fluid.mergeComponentOptions=function(that,componentName,userOptions,localOptions){var defaults=fluid.defaults(componentName);var mergePolicy=$.extend({},fluid.rootMergePolicy,defaults?defaults.mergePolicy:{});var defaultGrades=defaults&&defaults.gradeNames;var mergeArgs;if(!defaultGrades){defaults=fluid.censorKeys(defaults,fluid.keys(fluid.lifecycleFunctions));mergeArgs=[mergePolicy,localOptions]}else{mergeArgs=[mergePolicy]}var extraArgs;if(fluid.expandComponentOptions){extraArgs=fluid.expandComponentOptions(defaults,userOptions,that)}else{extraArgs=[defaults,userOptions]}var transRec=fluid.lastTransformationRecord(extraArgs);if(transRec){extraArgs=fluid.transformOptions(extraArgs,transRec)}mergeArgs=mergeArgs.concat(extraArgs);that.options=fluid.merge.apply(null,mergeArgs)};fluid.COMPONENT_OPTIONS={type:"fluid.marker",value:"COMPONENT_OPTIONS"};fluid.emptySubcomponent=function(options){var that={};options=$.makeArray(options);var empty=function(){};for(var i=0;i<options.length;++i){that[options[i]]=empty}return that};fluid.computeNickName=function(typeName){var segs=fluid.model.parseEL(typeName);return segs[segs.length-1]};fluid.typeTag=function(name){return name?{typeName:name,id:fluid.allocateGuid()}:null};fluid.typeFount=function(options){var that=fluid.initLittleComponent("fluid.typeFount",options);return fluid.typeTag(that.options.targetTypeName)};fluid.initLittleComponent=function(name,options,localOptions){var that=fluid.typeTag(name);that.nickName=options&&options.nickName?options.nickName:fluid.computeNickName(that.typeName);localOptions=localOptions||{gradeNames:"fluid.littleComponent"};localOptions=fluid.resolveGrade({},localOptions.gradeNames);fluid.mergeComponentOptions(that,name,options,localOptions);that.options.preInitFunction.fire(that);if(fluid.hasGrade(that.options,"fluid.eventedComponent")){fluid.instantiateFirers(that,that.options)}if(!fluid.hasGrade(that.options,"autoInit")){fluid.clearLifecycleFunctions(that.options)}return that};fluid.clearLifecycleFunctions=function(options){fluid.each(fluid.lifecycleFunctions,function(value,key){delete options[key]});delete options.initFunction};fluid.diagnoseFailedView=function(componentName,that,options,args){if(!that&&fluid.hasGrade(options,"fluid.viewComponent")){var container=fluid.wrap(args[1]);var message1="Instantiation of autoInit component with type "+componentName+" failed, since ";if(container.length===0){fluid.fail(message1+'selector "',args[1],'" did not match any markup in the document')}else{fluid.fail(message1+" component creator function did not return a value")}}};fluid.initComponent=function(componentName,initArgs){var options=fluid.defaults(componentName);if(!options.gradeNames){fluid.fail("Cannot initialise component "+componentName+" which has no gradeName registered")}var args=[componentName].concat(fluid.makeArray(initArgs));var that=fluid.invokeGlobalFunction(options.initFunction,args);fluid.diagnoseFailedView(componentName,that,options,args);that.options.postInitFunction.fire(that);if(fluid.initDependents){fluid.initDependents(that)}that.options.finalInitFunction.fire(that);fluid.clearLifecycleFunctions(that.options);return that.options.returnedPath?fluid.get(that,that.options.returnedPath):that};fluid.initSubcomponentImpl=function(that,entry,args){var togo;if(typeof (entry)!=="function"){var entryType=typeof (entry)==="string"?entry:entry.type;var globDef=fluid.defaults(true,entryType);fluid.merge("reverse",that.options,globDef);togo=entryType==="fluid.emptySubcomponent"?fluid.emptySubcomponent(entry.options):fluid.invokeGlobalFunction(entryType,args)}else{togo=entry.apply(null,args)}var returnedOptions=togo?togo.returnedOptions:null;if(returnedOptions){fluid.merge(that.options.mergePolicy,that.options,returnedOptions);if(returnedOptions.listeners){fluid.mergeListeners(that,that.events,returnedOptions.listeners)}}return togo};fluid.initSubcomponents=function(that,className,args){var entry=that.options[className];if(!entry){return }var entries=$.makeArray(entry);var optindex=-1;var togo=[];args=$.makeArray(args);for(var i=0;i<args.length;++i){if(args[i]===fluid.COMPONENT_OPTIONS){optindex=i}}for(i=0;i<entries.length;++i){entry=entries[i];if(optindex!==-1){args[optindex]=entry.options}togo[i]=fluid.initSubcomponentImpl(that,entry,args)}return togo};fluid.initSubcomponent=function(that,className,args){return fluid.initSubcomponents(that,className,args)[0]};fluid.checkTryCatchParameter=function(){var location=window.location||{search:"",protocol:"file:"};var GETParams=location.search.slice(1).split("&");return fluid.contains(GETParams,"notrycatch")};fluid.notrycatch=fluid.checkTryCatchParameter();fluid.container=function(containerSpec,fallible){var container=fluid.wrap(containerSpec);if(fallible&&(!container||container.length===0)){return null}if(!container||!container.jquery||container.length!==1){if(typeof (containerSpec)!=="string"){containerSpec=container.selector}var count=container.length!==undefined?container.length:0;fluid.fail((count>1?"More than one ("+count+") container elements were":"No container element was")+" found for selector "+containerSpec)}if(!fluid.isDOMNode(container[0])){fluid.fail("fluid.container was supplied a non-jQueryable element")}return container};fluid.createDomBinder=function(container,selectors){var cache={},that={};function cacheKey(name,thisContainer){return fluid.allocateSimpleId(thisContainer)+"-"+name}function record(name,thisContainer,result){cache[cacheKey(name,thisContainer)]=result}that.locate=function(name,localContainer){var selector,thisContainer,togo;selector=selectors[name];thisContainer=localContainer?localContainer:container;if(!thisContainer){fluid.fail("DOM binder invoked for selector "+name+" without container")}if(!selector){return thisContainer}if(typeof (selector)==="function"){togo=$(selector.call(null,fluid.unwrap(thisContainer)))}else{togo=$(selector,thisContainer)}if(togo.get(0)===document){togo=[]}if(!togo.selector){togo.selector=selector;togo.context=thisContainer}togo.selectorName=name;record(name,thisContainer,togo);return togo};that.fastLocate=function(name,localContainer){var thisContainer=localContainer?localContainer:container;var key=cacheKey(name,thisContainer);var togo=cache[key];return togo?togo:that.locate(name,localContainer)};that.clear=function(){cache={}};that.refresh=function(names,localContainer){var thisContainer=localContainer?localContainer:container;if(typeof names==="string"){names=[names]}if(thisContainer.length===undefined){thisContainer=[thisContainer]}for(var i=0;i<names.length;++i){for(var j=0;j<thisContainer.length;++j){that.locate(names[i],thisContainer[j])}}};that.resolvePathSegment=that.locate;return that};fluid.expectFilledSelector=function(result,message){if(result&&result.length===0&&result.jquery){fluid.fail(message+': selector "'+result.selector+'" with name '+result.selectorName+" returned no results in context "+fluid.dumpEl(result.context))}};fluid.initView=function(componentName,container,userOptions,localOptions){fluid.expectFilledSelector(container,'Error instantiating component with name "'+componentName);container=fluid.container(container,true);if(!container){return null}var that=fluid.initLittleComponent(componentName,userOptions,localOptions||{gradeNames:["fluid.viewComponent"]});that.container=container;fluid.initDomBinder(that);return that};fluid.initDomBinder=function(that){that.dom=fluid.createDomBinder(that.container,that.options.selectors);that.locate=that.dom.locate};fluid.findAncestor=function(element,test){element=fluid.unwrap(element);while(element){if(test(element)){return element}element=element.parentNode}};fluid.jById=function(id,dokkument){dokkument=dokkument&&dokkument.nodeType===9?dokkument:document;var element=fluid.byId(id,dokkument);var togo=element?$(element):[];togo.selector="#"+id;togo.context=dokkument;return togo};fluid.byId=function(id,dokkument){dokkument=dokkument&&dokkument.nodeType===9?dokkument:document;var el=dokkument.getElementById(id);if(el){if(el.id!==id){fluid.fail("Problem in document structure - picked up element "+fluid.dumpEl(el)+" for id "+id+" without this id - most likely the element has a name which conflicts with this id")}return el}else{return null}};fluid.getId=function(element){return fluid.unwrap(element).id};fluid.allocateSimpleId=function(element){var simpleId="fluid-id-"+fluid.allocateGuid();if(!element){return simpleId}element=fluid.unwrap(element);if(!element.id){element.id=simpleId}return element.id};fluid.stringToRegExp=function(str,flags){return new RegExp(str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),flags)};fluid.stringTemplate=function(template,values){var newString=template;for(var key in values){var re=fluid.stringToRegExp("%"+key,"g");newString=newString.replace(re,values[key])}return newString};fluid.messageResolver=function(options){var that=fluid.initLittleComponent("fluid.messageResolver",options);that.messageBase=that.options.parseFunc(that.options.messageBase);that.lookup=function(messagecodes){var resolved=fluid.messageResolver.resolveOne(that.messageBase,messagecodes);if(resolved===undefined){return fluid.find(that.options.parents,function(parent){return parent.lookup(messagecodes)})}else{return{template:resolved,resolveFunc:that.options.resolveFunc}}};that.resolve=function(messagecodes,args){if(!messagecodes){return"[No messagecodes provided]"}messagecodes=fluid.makeArray(messagecodes);var looked=that.lookup(messagecodes);return looked?looked.resolveFunc(looked.template,args):"[Message string for key "+messagecodes[0]+" not found]"};return that};fluid.defaults("fluid.messageResolver",{mergePolicy:{messageBase:"preserve"},resolveFunc:fluid.stringTemplate,parseFunc:fluid.identity,messageBase:{},parents:[]});fluid.messageResolver.resolveOne=function(messageBase,messagecodes){for(var i=0;i<messagecodes.length;++i){var code=messagecodes[i];var message=messageBase[code];if(message!==undefined){return message}}};fluid.messageLocator=function(messageBase,resolveFunc){var resolver=fluid.messageResolver({messageBase:messageBase,resolveFunc:resolveFunc});return function(messagecodes,args){return resolver.resolve(messagecodes,args)}}})(jQuery,fluid_1_4);
