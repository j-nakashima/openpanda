var fluid_1_4=fluid_1_4||{};(function($,fluid){var inCreationMarker="__CURRENTLY_IN_CREATION__";fluid.isFireBreak=function(component){return component.options&&component.options["fluid.visitComponents.fireBreak"]};fluid.visitComponentChildren=function(that,visitor,options,up,down){options=options||{};for(var name in that){var component=that[name];if(!component||!component.typeName||(component.id&&options.visited&&options.visited[component.id])){continue}if(options.visited){options.visited[component.id]=true}if(visitor(component,name,options,up,down)){return true}if(!fluid.isFireBreak(component)&&!options.flat){fluid.visitComponentChildren(component,visitor,options,up,down+1)}}};var visitComponents=function(thatStack,visitor,options){options=options||{visited:{},flat:true};var up=0;for(var i=thatStack.length-1;i>=0;--i){var that=thatStack[i];if(fluid.isFireBreak(that)){return }if(that.typeName){options.visited[that.id]=true;if(visitor(that,"",options,0,0)){return }}if(fluid.visitComponentChildren(that,visitor,options,up,1)){return }++up}};function makeGingerStrategy(instantiator,that,thatStack){return function(component,thisSeg){var atval=component[thisSeg];if(atval===undefined){var parentPath=instantiator.idToPath[component.id];atval=instantiator.pathToComponent[fluid.composePath(parentPath,thisSeg)];if(atval){atval[inCreationMarker]=true}}if(atval!==undefined){if(atval[inCreationMarker]){fluid.fail("Component "+fluid.dumpThat(atval)+' at path "'+thisSeg+'" of parent '+fluid.dumpThat(component)+" cannot be used for lookup since it is still in creation. Please reorganise your dependencies so that they no longer contain circular references")}}else{if(fluid.get(component,fluid.path("options","components",thisSeg,"type"))){fluid.initDependent(component,thisSeg);atval=component[thisSeg]}}return atval}}fluid.dumpThat=function(that,instantiator){return'{ typeName: "'+that.typeName+'" id: '+that.id+"}"};fluid.dumpThatStack=function(thatStack,instantiator){var togo=fluid.transform(thatStack,function(that){var path=instantiator.idToPath[that.id];return fluid.dumpThat(that)+(path?(" - path: "+path):"")});return togo.join("\n")};fluid.describeActivity=function(){return fluid.threadLocal().activityStack||[]};fluid.pushActivity=function(func,message){if(!message){return func()}var root=fluid.threadLocal();if(!root.activityStack){root.activityStack=[]}var frames=fluid.makeArray(message);frames.push("\n");frames.unshift("\n");root.activityStack=frames.concat(root.activityStack);return fluid.tryCatch(func,null,function(){root.activityStack=root.activityStack.slice(frames.length)})};fluid.wrapActivity=function(func,messageSpec){return function(){var args=fluid.makeArray(arguments);var message=fluid.transform(fluid.makeArray(messageSpec),function(specEl){if(specEl.indexOf("arguments.")===0){var el=specEl.substring("arguments.".length);return fluid.get(args,el)}else{return specEl}});return fluid.pushActivity(function(){return func.apply(null,args)},message)}};var localRecordExpected=/arguments|options|container/;function makeStackFetcher(instantiator,parentThat,localRecord,expandOptions){expandOptions=expandOptions||{};var thatStack=instantiator.getFullStack(parentThat);var fetchStrategies=[fluid.model.funcResolverStrategy,makeGingerStrategy(instantiator,parentThat,thatStack)];var fetcher=function(parsed){var context=parsed.context;if(localRecord&&localRecordExpected.test(context)){var fetched=fluid.get(localRecord[context],parsed.path);return(context==="arguments"||expandOptions.direct)?fetched:{marker:context==="options"?fluid.EXPAND:fluid.EXPAND_NOW,value:fetched}}var foundComponent;visitComponents(thatStack,function(component,name,options,up,down){if(context===name||context===component.typeName||context===component.nickName){foundComponent=component;if(down>1){fluid.log("***WARNING: value resolution for context "+context+" found at depth "+down+": this may not be supported in future")}return true}if(fluid.get(component,fluid.path("options","components",context,"type"))&&!component[context]){foundComponent=fluid.get(component,context,{strategies:fetchStrategies});return true}});if(!foundComponent&&parsed.path!==""){var ref=fluid.renderContextReference(parsed);fluid.log("Failed to resolve reference "+ref+": thatStack contains\n"+fluid.dumpThatStack(thatStack,instantiator));fluid.fail("Failed to resolve reference "+ref+" - could not match context with name "+context+" from component root of type "+thatStack[0].typeName,"\ninstantiator contents: ",instantiator)}return fluid.get(foundComponent,parsed.path,fetchStrategies)};return fetcher}function makeStackResolverOptions(instantiator,parentThat,localRecord,expandOptions){return $.extend({},fluid.defaults("fluid.resolveEnvironment"),{fetcher:makeStackFetcher(instantiator,parentThat,localRecord,expandOptions)})}fluid.instantiator=function(freeInstantiator){var preThat={options:{"fluid.visitComponents.fireBreak":true},idToPath:{},pathToComponent:{},stackCount:0,nickName:"instantiator"};var that=fluid.typeTag("fluid.instantiator");that=$.extend(that,preThat);that.stack=function(count){return that.stackCount+=count};that.getThatStack=function(component){var path=that.idToPath[component.id]||"";var parsed=fluid.model.parseEL(path);var togo=fluid.transform(parsed,function(value,i){var parentPath=fluid.model.composeSegments.apply(null,parsed.slice(0,i+1));return that.pathToComponent[parentPath]});var root=that.pathToComponent[""];if(root){togo.unshift(root)}return togo};that.getEnvironmentalStack=function(){var togo=[fluid.staticEnvironment];if(!freeInstantiator){togo.push(fluid.threadLocal())}return togo};that.getFullStack=function(component){var thatStack=component?that.getThatStack(component):[];return that.getEnvironmentalStack().concat(thatStack)};function recordComponent(component,path){that.idToPath[component.id]=path;if(that.pathToComponent[path]){fluid.fail("Error during instantiation - path "+path+" which has just created component "+fluid.dumpThat(component)+" has already been used for component "+fluid.dumpThat(that.pathToComponent[path])+" - this is a circular instantiation or other oversight. Please clear the component using instantiator.clearComponent() before reusing the path.")}that.pathToComponent[path]=component}that.recordRoot=function(component){if(component&&component.id&&!that.pathToComponent[""]){recordComponent(component,"")}};that.pushUpcomingInstantiation=function(parent,name){that.expectedParent=parent;that.expectedName=name};that.recordComponent=function(component){if(that.expectedName){that.recordKnownComponent(that.expectedParent,component,that.expectedName);delete that.expectedName;delete that.expectedParent}else{that.recordRoot(component)}};that.clearComponent=function(component,name,child,options,noModTree){options=options||{visited:{},flat:true};child=child||component[name];fluid.visitComponentChildren(child,function(gchild,gchildname){that.clearComponent(child,gchildname,null,options,noModTree)},options);var path=that.idToPath[child.id];delete that.idToPath[child.id];delete that.pathToComponent[path];if(!noModTree){delete component[name]}};that.recordKnownComponent=function(parent,component,name){var parentPath=that.idToPath[parent.id]||"";var path=fluid.model.composePath(parentPath,name);recordComponent(component,path)};return that};fluid.freeInstantiator=fluid.instantiator(true);fluid.argMapToDemands=function(argMap){var togo=[];fluid.each(argMap,function(value,key){togo[value]="{"+key+"}"});return togo};fluid.makePassArgsSpec=function(initArgs){return fluid.transform(initArgs,function(arg,index){return"{arguments}."+index})};function mergeToMergeAll(options){if(options&&options.mergeOptions){options.mergeAllOptions=["{options}"].concat(fluid.makeArray(options.mergeOptions))}}function upgradeMergeOptions(demandspec){mergeToMergeAll(demandspec);if(demandspec.mergeAllOptions){if(demandspec.options){fluid.fail("demandspec ",demandspec," is invalid - cannot specify literal options together with mergeOptions or mergeAllOptions")}demandspec.options={mergeAllOptions:demandspec.mergeAllOptions}}if(demandspec.options){delete demandspec.options.mergeOptions}}fluid.embodyDemands=function(instantiator,parentThat,demandspec,initArgs,options){options=options||{};upgradeMergeOptions(demandspec);var oldOptions=fluid.get(options,"componentRecord.options");options.componentRecord=$.extend(true,{},options.componentRecord,fluid.censorKeys(demandspec,["args","funcName","registeredFrom"]));var mergeAllZero=fluid.get(options,"componentRecord.options.mergeAllOptions.0");if(mergeAllZero==="{options}"){fluid.set(options,"componentRecord.options.mergeAllOptions.0",oldOptions)}var demands=$.makeArray(demandspec.args);var upDefaults=fluid.defaults(demandspec.funcName);var argMap=upDefaults?upDefaults.argumentMap:null;var inferMap=false;if(!argMap&&(upDefaults||(options&&options.componentRecord))&&!options.passArgs){inferMap=true;if(demands.length<2){argMap=fluid.rawDefaults("fluid.littleComponent").argumentMap}else{argMap={options:demands.length-1}}}options=options||{};if(demands.length===0){if(options.componentRecord&&argMap){demands=fluid.argMapToDemands(argMap)}else{if(options.passArgs){demands=fluid.makePassArgsSpec(initArgs)}}}var localRecord=$.extend({arguments:initArgs},fluid.censorKeys(options.componentRecord,["type"]));fluid.each(argMap,function(index,name){if(initArgs.length>0){localRecord[name]=localRecord.arguments[index]}if(demandspec[name]!==undefined&&localRecord[name]===undefined){localRecord[name]=demandspec[name]}});mergeToMergeAll(localRecord.options);mergeToMergeAll(argMap&&demands[argMap.options]);var upstreamLocalRecord=$.extend({},localRecord);if(options.componentRecord.options!==undefined){upstreamLocalRecord.options=options.componentRecord.options}var expandOptions=makeStackResolverOptions(instantiator,parentThat,localRecord);var args=[];if(demands){for(var i=0;i<demands.length;++i){var arg=demands[i];if(fluid.isMarker(arg)&&arg.value===fluid.COMPONENT_OPTIONS.value){arg="{options}";if(inferMap){argMap={options:i}}}if(typeof (arg)==="string"){if(arg.charAt(0)==="@"){var argpos=arg.substring(1);arg="{arguments}."+argpos}}if(!argMap||argMap.options!==i){args[i]=fluid.expander.expandLight(arg,expandOptions)}else{if(arg&&typeof (arg)==="object"&&!arg.targetTypeName){arg.targetTypeName=demandspec.funcName}args[i]={marker:fluid.EXPAND,value:fluid.copy(arg),localRecord:upstreamLocalRecord}}if(args[i]&&fluid.isMarker(args[i].marker,fluid.EXPAND_NOW)){args[i]=fluid.expander.expandLight(args[i].value,expandOptions)}}}else{args=initArgs?initArgs:[]}var togo={args:args,funcName:demandspec.funcName};return togo};var aliasTable={};fluid.alias=function(demandingName,aliasName){if(aliasName){aliasTable[demandingName]=aliasName}else{return aliasTable[demandingName]}};var dependentStore={};function searchDemands(demandingName,contextNames){var exist=dependentStore[demandingName]||[];outer:for(var i=0;i<exist.length;++i){var rec=exist[i];for(var j=0;j<contextNames.length;++j){if(rec.contexts[j]!==contextNames[j]){continue outer}}return rec.spec}}fluid.demands=function(demandingName,contextName,spec){var contextNames=$.makeArray(contextName).sort();if(!spec){return searchDemands(demandingName,contextNames)}else{if(spec.length){spec={args:spec}}}if(fluid.getCallerInfo){var callerInfo=fluid.getCallerInfo(5);if(callerInfo){spec.registeredFrom=callerInfo}}var exist=dependentStore[demandingName];if(!exist){exist=[];dependentStore[demandingName]=exist}exist.push({contexts:contextNames,spec:spec})};fluid.compareDemands=function(speca,specb){var p1=speca.uncess-specb.uncess;return p1===0?specb.intersect-speca.intersect:p1};fluid.isDemandLogging=function(demandingNames){return fluid.isLogging()&&demandingNames[0]!=="fluid.threadLocal"};fluid.locateAllDemands=function(instantiator,parentThat,demandingNames){var demandLogging=fluid.isDemandLogging(demandingNames);if(demandLogging){fluid.log("Resolving demands for function names ",demandingNames," in context of "+(parentThat?"component "+parentThat.typeName:"no component"))}var contextNames={};var visited=[];var thatStack=instantiator.getFullStack(parentThat);visitComponents(thatStack,function(component,xname,options,up,down){contextNames[component.typeName]=true;visited.push(component)});if(demandLogging){fluid.log("Components in scope for resolution:\n"+fluid.dumpThatStack(visited,instantiator))}var matches=[];for(var i=0;i<demandingNames.length;++i){var rec=dependentStore[demandingNames[i]]||[];for(var j=0;j<rec.length;++j){var spec=rec[j];var record={spec:spec,intersect:0,uncess:0};for(var k=0;k<spec.contexts.length;++k){record[contextNames[spec.contexts[k]]?"intersect":"uncess"]+=2}if(spec.contexts.length===0){record.intersect++}matches.push(record)}}matches.sort(fluid.compareDemands);return matches};fluid.locateDemands=function(instantiator,parentThat,demandingNames){var matches=fluid.locateAllDemands(instantiator,parentThat,demandingNames);var demandspec=matches.length===0||matches[0].intersect===0?null:matches[0].spec.spec;if(fluid.isDemandLogging(demandingNames)){if(demandspec){fluid.log("Located "+matches.length+" potential match"+(matches.length===1?"":"es")+", selected best match with "+matches[0].intersect+" matched context names: ",demandspec)}else{fluid.log("No matches found for demands, using direct implementation")}}return demandspec};fluid.determineDemands=function(instantiator,parentThat,funcNames){funcNames=$.makeArray(funcNames);var newFuncName=funcNames[0];var demandspec=fluid.locateDemands(instantiator,parentThat,funcNames)||{};if(demandspec.funcName){newFuncName=demandspec.funcName}var aliasTo=fluid.alias(newFuncName);if(aliasTo){newFuncName=aliasTo;fluid.log("Following redirect from function name "+newFuncName+" to "+aliasTo);var demandspec2=fluid.locateDemands(instantiator,parentThat,[aliasTo]);if(demandspec2){fluid.each(demandspec2,function(value,key){if(localRecordExpected.test(key)){fluid.fail("Error in demands block ",demandspec2,' - content with key "'+key+'" is not supported since this demands block was resolved via an alias from "'+newFuncName+'"')}});if(demandspec2.funcName){newFuncName=demandspec2.funcName;fluid.log('Followed final inner demands to function name "'+newFuncName+'"')}}}return fluid.merge(null,{funcName:newFuncName,args:fluid.makeArray(demandspec.args)},fluid.censorKeys(demandspec,["funcName","args"]))};fluid.resolveDemands=function(instantiator,parentThat,funcNames,initArgs,options){var demandspec=fluid.determineDemands(instantiator,parentThat,funcNames);return fluid.embodyDemands(instantiator,parentThat,demandspec,initArgs,options)};fluid.invoke=function(functionName,args,that,environment){args=fluid.makeArray(args);return fluid.withInstantiator(that,function(instantiator){var invokeSpec=fluid.resolveDemands(instantiator,that,functionName,args,{passArgs:true});return fluid.invokeGlobalFunction(invokeSpec.funcName,invokeSpec.args,environment)})};fluid.invoke=fluid.wrapActivity(fluid.invoke,['    while invoking function with name "',"arguments.0",'" from component',"arguments.2"]);fluid.makeFreeInvoker=function(functionName,environment){var demandSpec=fluid.determineDemands(fluid.freeInstantiator,null,functionName);return function(){var invokeSpec=fluid.embodyDemands(fluid.freeInstantiator,null,demandSpec,arguments,{passArgs:true});return fluid.invokeGlobalFunction(invokeSpec.funcName,invokeSpec.args,environment)}};fluid.makeInvoker=function(instantiator,that,demandspec,functionName,environment){demandspec=demandspec||fluid.determineDemands(instantiator,that,functionName);return function(){var args=arguments;return fluid.pushActivity(function(){var invokeSpec=fluid.embodyDemands(instantiator,that,demandspec,args,{passArgs:true});return fluid.invokeGlobalFunction(invokeSpec.funcName,invokeSpec.args,environment)},["    while invoking invoker with name "+functionName+" on component",that])}};fluid.event.dispatchListener=function(instantiator,that,listener,eventName,eventSpec){return function(){var demandspec=fluid.determineDemands(instantiator,that,eventName);if(demandspec.args.length===0&&eventSpec.args){demandspec.args=eventSpec.args}var resolved=fluid.embodyDemands(instantiator,that,demandspec,arguments,{passArgs:true,componentOptions:eventSpec});listener.apply(null,resolved.args)}};fluid.event.resolveEvent=function(that,eventName,eventSpec){return fluid.withInstantiator(that,function(instantiator){if(typeof (eventSpec)==="string"){var firer=fluid.expandOptions(eventSpec,that);if(!firer){fluid.fail("Error in fluid.event.resolveEvent - context path "+eventSpec+" could not be looked up to a valid event firer")}return firer}else{var event=eventSpec.event;var origin;if(!event){fluid.fail("Event specification for event with name "+eventName+" does not include a base event specification")}if(event.charAt(0)==="{"){origin=fluid.expandOptions(event,that)}else{origin=that.events[event]}if(!origin){fluid.fail("Error in event specification - could not resolve base event reference "+event+" to an event firer")}var firer={};fluid.each(["fire","removeListener"],function(method){firer[method]=function(){origin[method].apply(null,arguments)}});firer.addListener=function(listener,namespace,predicate,priority){origin.addListener(fluid.event.dispatchListener(instantiator,that,listener,eventName,eventSpec),namespace,predicate,priority)};return firer}})};fluid.registerNamespace("fluid.expander");fluid.expander.preserveFromExpansion=function(options){var preserve={};var preserveList=fluid.arrayToHash(["mergePolicy","mergeAllOptions","components","invokers","events","listeners","transformOptions"]);fluid.each(options.mergePolicy,function(value,key){if(fluid.mergePolicyIs(value,"noexpand")){preserveList[key]=true}});fluid.each(preserveList,function(xvalue,path){var pen=fluid.model.getPenultimate(options,path);var value=pen.root[pen.last];delete pen.root[pen.last];fluid.set(preserve,path,value)});return{restore:function(target){fluid.each(preserveList,function(xvalue,path){var preserved=fluid.get(preserve,path);if(preserved!==undefined){fluid.set(target,path,preserved)}})}}};fluid.expandOptions=function(args,that,localRecord,outerExpandOptions){if(!args){return args}return fluid.withInstantiator(that,function(instantiator){var expandOptions=makeStackResolverOptions(instantiator,that,localRecord,outerExpandOptions);expandOptions.noCopy=true;var pres;if(!fluid.isArrayable(args)&&!fluid.isPrimitive(args)){pres=fluid.expander.preserveFromExpansion(args)}var expanded=fluid.expander.expandLight(args,expandOptions);if(pres){pres.restore(expanded)}return expanded})};fluid.locateTransformationRecord=function(that){return fluid.withInstantiator(that,function(instantiator){var matches=fluid.locateAllDemands(instantiator,that,["fluid.transformOptions"]);return fluid.find(matches,function(match){return match.uncess===0&&fluid.contains(match.spec.contexts,that.typeName)?match.spec.spec:undefined})})};fluid.hashToArray=function(hash){var togo=[];fluid.each(hash,function(value,key){togo.push(key)});return togo};fluid.localRecordExpected=["type","options","arguments","mergeOptions","mergeAllOptions","createOnEvent","priority"];fluid.checkComponentRecord=function(defaults,localRecord){var expected=fluid.arrayToHash(fluid.localRecordExpected);fluid.each(defaults.argumentMap,function(value,key){expected[key]=true});fluid.each(localRecord,function(value,key){if(!expected[key]){fluid.fail('Probable error in subcomponent record - key "'+key+'" found, where the only legal options are '+fluid.hashToArray(expected).join(", "))}})};fluid.expandComponentOptions=function(defaults,userOptions,that){if(userOptions&&userOptions.localRecord){fluid.checkComponentRecord(defaults,userOptions.localRecord)}defaults=fluid.expandOptions(fluid.copy(defaults),that);var localRecord={};if(userOptions&&userOptions.marker===fluid.EXPAND){var localOptions=fluid.get(userOptions,"localRecord.options");if(localOptions){if(defaults&&defaults.mergePolicy){localOptions.mergePolicy=defaults.mergePolicy}localRecord.options=fluid.expandOptions(localOptions,that)}localRecord.arguments=fluid.get(userOptions,"localRecord.arguments");var toExpand=userOptions.value;userOptions=fluid.expandOptions(toExpand,that,localRecord,{direct:true})}localRecord.directOptions=userOptions;if(!localRecord.options){localRecord.options=userOptions}var mergeOptions=(userOptions&&userOptions.mergeAllOptions)||["{directOptions}"];var togo=fluid.transform(mergeOptions,function(path){return path==="{directOptions}"?localRecord.directOptions:fluid.expandOptions(path,that,localRecord,{direct:true})});var transRec=fluid.locateTransformationRecord(that);if(transRec){togo[0].transformOptions=transRec.options}return[defaults].concat(togo)};fluid.expandComponentOptions=fluid.wrapActivity(fluid.expandComponentOptions,["    while expanding component options ","arguments.1.value"," with record ","arguments.1"," for component ","arguments.2"]);fluid.initDependent=function(that,name,userInstantiator,directArgs){if(!that||that[name]){return }fluid.log('Beginning instantiation of component with name "'+name+'" as child of '+fluid.dumpThat(that));directArgs=directArgs||[];var root=fluid.threadLocal();if(userInstantiator){var existing=root["fluid.instantiator"];if(existing&&existing!==userInstantiator){fluid.fail("Error in initDependent: user instantiator supplied with id "+userInstantiator.id+" which differs from that for currently active instantiation with id "+existing.id)}else{root["fluid.instantiator"]=userInstantiator}}var component=that.options.components[name];fluid.withInstantiator(that,function(instantiator){if(typeof (component)==="string"){that[name]=fluid.expandOptions([component],that)[0]}else{if(component.type){var invokeSpec=fluid.resolveDemands(instantiator,that,[component.type,name],directArgs,{componentRecord:component});instantiator.pushUpcomingInstantiation(that,name);fluid.tryCatch(function(){that[inCreationMarker]=true;var instance=fluid.initSubcomponentImpl(that,{type:invokeSpec.funcName},invokeSpec.args);var path=fluid.composePath(instantiator.idToPath[that.id]||"",name);var existing=instantiator.pathToComponent[path];if(existing&&existing!==instance){instantiator.clearComponent(that,name,existing,null,true)}if(instance&&instance.typeName&&instance.id&&instance!==existing){instantiator.recordKnownComponent(that,instance,name)}that[name]=instance},null,function(){delete that[inCreationMarker];instantiator.pushUpcomingInstantiation()})}else{that[name]=component}}},['    while instantiating dependent component with name "'+name+'" with record ',component," as child of ",that]);fluid.log('Finished instantiation of component with name "'+name+'" as child of '+fluid.dumpThat(that))};fluid.withInstantiator=function(that,func,message){var root=fluid.threadLocal();var instantiator=root["fluid.instantiator"];if(!instantiator){instantiator=root["fluid.instantiator"]=fluid.instantiator()}return fluid.pushActivity(function(){return fluid.tryCatch(function(){if(that){instantiator.recordComponent(that)}instantiator.stack(1);return func(instantiator)},null,function(){var count=instantiator.stack(-1);if(count===0){delete root["fluid.instantiator"]}})},message)};fluid.bindDeferredComponent=function(that,componentName,component,instantiator){var events=fluid.makeArray(component.createOnEvent);fluid.each(events,function(eventName){that.events[eventName].addListener(function(){if(that[componentName]){instantiator.clearComponent(that,componentName)}fluid.initDependent(that,componentName,instantiator)},null,null,component.priority)})};fluid.priorityForComponent=function(component){return component.priority?component.priority:(component.type==="fluid.typeFount"||fluid.hasGrade(fluid.defaults(component.type),"fluid.typeFount"))?"first":undefined};fluid.initDependents=function(that){var options=that.options;var components=options.components||{};var componentSort={};fluid.withInstantiator(that,function(instantiator){fluid.each(components,function(component,name){if(!component.createOnEvent){var priority=fluid.priorityForComponent(component);componentSort[name]={key:name,priority:fluid.event.mapPriority(priority,0)}}else{fluid.bindDeferredComponent(that,name,component,instantiator)}});var componentList=fluid.event.sortListeners(componentSort);fluid.each(componentList,function(entry){fluid.initDependent(that,entry.key)});var invokers=options.invokers||{};for(var name in invokers){var invokerec=invokers[name];var funcName=typeof (invokerec)==="string"?invokerec:null;that[name]=fluid.withInstantiator(that,function(instantiator){fluid.log('Beginning instantiation of invoker with name "'+name+'" as child of '+fluid.dumpThat(that));return fluid.makeInvoker(instantiator,that,funcName?null:invokerec,funcName)},['    while instantiating invoker with name "'+name+'" with record ',invokerec," as child of ",that]);fluid.log('Finished instantiation of invoker with name "'+name+'" as child of '+fluid.dumpThat(that))}})};fluid.staticEnvironment=fluid.typeTag("fluid.staticEnvironment");fluid.staticEnvironment.environmentClass=fluid.typeTag("fluid.browser");fluid.demands("fluid.threadLocal","fluid.browser",{funcName:"fluid.singleThreadLocal"});var singleThreadLocal=fluid.typeTag("fluid.dynamicEnvironment");fluid.singleThreadLocal=function(){return singleThreadLocal};fluid.threadLocal=function(){var demands=fluid.locateDemands(fluid.freeInstantiator,null,["fluid.threadLocal"]);return fluid.invokeGlobalFunction(demands.funcName,arguments)};function applyLocalChange(applier,type,path,value){var change={type:type,path:path,value:value};applier.fireChangeRequest(change)}fluid.withEnvironment=function(envAdd,func,prefix){prefix=prefix||"";var root=fluid.threadLocal();var applier=fluid.makeChangeApplier(root,{thin:true});return fluid.tryCatch(function(){for(var key in envAdd){applyLocalChange(applier,"ADD",fluid.model.composePath(prefix,key),envAdd[key])}$.extend(root,envAdd);return func()},null,function(){for(var key in envAdd){applyLocalChange(applier,"DELETE",fluid.model.composePath(prefix,key))}})};fluid.makeEnvironmentFetcher=function(prefix,directModel){return function(parsed){var env=fluid.get(fluid.threadLocal(),prefix);return fluid.fetchContextReference(parsed,directModel,env)}};fluid.extractEL=function(string,options){if(options.ELstyle==="ALL"){return string}else{if(options.ELstyle.length===1){if(string.charAt(0)===options.ELstyle){return string.substring(1)}}else{if(options.ELstyle==="${}"){var i1=string.indexOf("${");var i2=string.lastIndexOf("}");if(i1===0&&i2!==-1){return string.substring(2,i2)}}}}};fluid.extractELWithContext=function(string,options){var EL=fluid.extractEL(string,options);if(EL&&EL.charAt(0)==="{"){return fluid.parseContextReference(EL,0)}return EL?{path:EL}:EL};fluid.parseContextReference=function(reference,index,delimiter){var endcpos=reference.indexOf("}",index+1);if(endcpos===-1){fluid.fail('Cannot parse context reference "'+reference+'": Malformed context reference without }')}var context=reference.substring(index+1,endcpos);var endpos=delimiter?reference.indexOf(delimiter,endcpos+1):reference.length;var path=reference.substring(endcpos+1,endpos);if(path.charAt(0)==="."){path=path.substring(1)}return{context:context,path:path,endpos:endpos}};fluid.renderContextReference=function(parsed){return"{"+parsed.context+"}"+parsed.path};fluid.fetchContextReference=function(parsed,directModel,env){var base=parsed.context?env[parsed.context]:directModel;if(!base){return base}return fluid.get(base,parsed.path)};fluid.resolveContextValue=function(string,options){if(options.bareContextRefs&&string.charAt(0)==="{"){var parsed=fluid.parseContextReference(string,0);return options.fetcher(parsed)}else{if(options.ELstyle&&options.ELstyle!=="${}"){var parsed=fluid.extractELWithContext(string,options);if(parsed){return options.fetcher(parsed)}}}while(typeof (string)==="string"){var i1=string.indexOf("${");var i2=string.indexOf("}",i1+2);if(i1!==-1&&i2!==-1){var parsed;if(string.charAt(i1+2)==="{"){parsed=fluid.parseContextReference(string,i1+2,"}");i2=parsed.endpos}else{parsed={path:string.substring(i1+2,i2)}}var subs=options.fetcher(parsed);var all=(i1===0&&i2===string.length-1);if(subs===undefined||subs===null){return subs}string=all?subs:string.substring(0,i1)+subs+string.substring(i2+1)}else{break}}return string};fluid.resolveContextValue=fluid.wrapActivity(fluid.resolveContextValue,["    while resolving context value ","arguments.0"]);function resolveEnvironmentImpl(obj,options){fluid.guardCircularity(options.seenIds,obj,"expansion",' - please ensure options are not circularly connected, or protect from expansion using the "noexpand" policy or expander');function recurse(arg){return resolveEnvironmentImpl(arg,options)}if(typeof (obj)==="string"&&!options.noValue){return fluid.resolveContextValue(obj,options)}else{if(fluid.isPrimitive(obj)||obj.nodeType!==undefined||obj.jquery){return obj}else{if(options.filter){return options.filter(obj,recurse,options)}else{return(options.noCopy?fluid.each:fluid.transform)(obj,function(value,key){return resolveEnvironmentImpl(value,options)})}}}}fluid.defaults("fluid.resolveEnvironment",{ELstyle:"${}",seenIds:{},bareContextRefs:true});fluid.resolveEnvironment=function(obj,options){options=$.extend(true,{},fluid.rawDefaults("fluid.resolveEnvironment"),options);return resolveEnvironmentImpl(obj,options)};fluid.expander.deferredCall=function(target,source,recurse){var expander=source.expander;var args=(!expander.args||fluid.isArrayable(expander.args))?expander.args:$.makeArray(expander.args);args=recurse(args);return fluid.invokeGlobalFunction(expander.func,args)};fluid.deferredCall=fluid.expander.deferredCall;fluid.deferredInvokeCall=function(target,source,recurse){var expander=source.expander;var args=(!expander.args||fluid.isArrayable(expander.args))?expander.args:$.makeArray(expander.args);args=recurse(args);return fluid.invoke(expander.func,args)};fluid.expander.noexpand=function(target,source){return $.extend(target,source.expander.tree)};fluid.noexpand=fluid.expander.noexpand;fluid.expander.lightFilter=function(obj,recurse,options){var togo;if(fluid.isArrayable(obj)){togo=options.noCopy?obj:[];fluid.each(obj,function(value,key){togo[key]=recurse(value)})}else{togo=options.noCopy?obj:{};for(var key in obj){var value=obj[key];var expander;if(key==="expander"&&!(options.expandOnly&&options.expandOnly[value.type])){expander=fluid.getGlobalValue(value.type);if(expander){return expander.call(null,togo,obj,recurse,options)}}if(key!=="expander"||!expander){togo[key]=recurse(value)}}}return options.noCopy?obj:togo};fluid.expander.expandLight=function(source,expandOptions){var options=$.extend({},expandOptions);options.filter=fluid.expander.lightFilter;return fluid.resolveEnvironment(source,options)}})(jQuery,fluid_1_4);
