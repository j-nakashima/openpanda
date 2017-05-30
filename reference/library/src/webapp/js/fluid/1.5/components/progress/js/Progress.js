var fluid_1_5=fluid_1_5||{};!function($,fluid){"use strict";fluid.registerNamespace("fluid.progress"),fluid.progress.animateDisplay=function(elm,animation,defaultAnimation,callback){animation=animation?animation:defaultAnimation,elm.animate(animation.params,animation.duration,callback)},fluid.progress.animateProgress=function(elm,width,speed){elm.queue("fx",[]),elm.animate({width:width,queue:!1},speed)},fluid.progress.showProgress=function(that,animation){var firer=that.events.onProgressBegin.fire;animation===!1?(that.displayElement.show(),firer()):fluid.progress.animateDisplay(that.displayElement,animation,that.options.showAnimation,firer)},fluid.progress.hideProgress=function(that,delay,animation){if(delay)setTimeout(function(){fluid.progress.hideProgress(that,0,animation)},delay);else{var firer=that.events.afterProgressHidden.fire;animation===!1?(that.displayElement.hide(),firer()):fluid.progress.animateDisplay(that.displayElement,animation,that.options.hideAnimation,firer)}},fluid.progress.updateWidth=function(that,newWidth,dontAnimate){var currWidth=that.indicator.width(),direction=that.options.animate;newWidth>currWidth&&("both"===direction||"forward"===direction)&&!dontAnimate?fluid.progress.animateProgress(that.indicator,newWidth,that.options.speed):currWidth>newWidth&&("both"===direction||"backward"===direction)&&!dontAnimate?fluid.progress.animateProgress(that.indicator,newWidth,that.options.speed):that.indicator.width(newWidth)},fluid.progress.percentToPixels=function(that,percent){return Math.round(Math.min(percent,100)*that.progressBar.innerWidth()/100)},fluid.progress.refreshRelativeWidth=function(that){var pixels=Math.max(fluid.progress.percentToPixels(that,parseFloat(that.storedPercent)),that.options.minWidth);fluid.progress.updateWidth(that,pixels,!0)},fluid.progress.initARIA=function(ariaElement,ariaBusyText){ariaElement.attr("role","progressbar"),ariaElement.attr("aria-valuemin","0"),ariaElement.attr("aria-valuemax","100"),ariaElement.attr("aria-valuenow","0"),ariaBusyText&&ariaElement.attr("aria-valuetext",""),ariaElement.attr("aria-busy","false")},fluid.progress.updateARIA=function(that,percent){var str=that.options.strings,busy=100>percent&&percent>0;if(that.ariaElement.attr("aria-busy",busy),that.ariaElement.attr("aria-valuenow",percent),str.ariaBusyText)if(busy){var busyString=fluid.stringTemplate(str.ariaBusyText,{percentComplete:percent});that.ariaElement.attr("aria-valuetext",busyString)}else 100===percent&&that.ariaElement.attr("aria-valuetext",str.ariaDoneText)},fluid.progress.updateText=function(label,value){label.html(value)},fluid.progress.repositionIndicator=function(that){that.indicator.css("top",that.progressBar.position().top).css("left",0).height(that.progressBar.height()),fluid.progress.refreshRelativeWidth(that)},fluid.progress.updateProgress=function(that,percent,labelText,animationForShow){if(fluid.progress.showProgress(that,animationForShow),null!==percent){that.storedPercent=percent;var pixels=Math.max(fluid.progress.percentToPixels(that,parseFloat(percent)),that.options.minWidth);fluid.progress.updateWidth(that,pixels)}null!==labelText&&fluid.progress.updateText(that.label,labelText),that.ariaElement&&fluid.progress.updateARIA(that,percent)},fluid.progress.hideElement=function(element,shouldHide){element.toggle(!shouldHide)},fluid.defaults("fluid.progress",{gradeNames:["fluid.viewComponent","autoInit"],members:{displayElement:"{that}.dom.displayElement",progressBar:"{that}.dom.progressBar",label:"{that}.dom.label",indicator:"{that}.dom.indicator",ariaElement:"{that}.dom.ariaElement",storedPercent:0},events:{onProgressBegin:null,afterProgressHidden:null},listeners:{onCreate:[{"this":"{that}.dom.indicator",method:"width",args:"{that}.options.minWidth"},{funcName:"fluid.progress.hideElement",args:["{that}.dom.displayElement","{that}.options.initiallyHidden"]},{funcName:"fluid.progress.initARIA",args:["{that}.ariaElement","{that}.options.strings.ariaBusyText"]}],onProgressBegin:{func:"{that}.options.showAnimation.callback"},afterProgressHidden:{func:"{that}.options.hideAnimation.callback"}},invokers:{show:{funcName:"fluid.progress.showProgress",args:["{that}","{arguments}.0"]},hide:{funcName:"fluid.progress.hideProgress",args:["{that}","{arguments}.0","{arguments}.1"]},update:{funcName:"fluid.progress.updateProgress",args:["{that}","{arguments}.0","{arguments}.1","{arguments}.2"]},refreshView:{funcName:"fluid.progress.repositionIndicator",args:"{that}"}},selectors:{displayElement:".flc-progress",progressBar:".flc-progress-bar",indicator:".flc-progress-indicator",label:".flc-progress-label",ariaElement:".flc-progress-bar"},strings:{ariaBusyText:"Progress is %percentComplete percent complete",ariaDoneText:"Progress is complete."},showAnimation:{params:{opacity:"show"},duration:"slow",callback:fluid.identity},hideAnimation:{params:{opacity:"hide"},duration:"slow",callback:fluid.identity},minWidth:5,delay:0,speed:200,animate:"forward",initiallyHidden:!0,updatePosition:!1})}(jQuery,fluid_1_5);
