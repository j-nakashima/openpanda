var fluid_1_5=fluid_1_5||{};!function($,fluid){"use strict";fluid.dom.computeAbsolutePosition=function(element){var curleft=0,curtop=0;if(element.offsetParent){do curleft+=element.offsetLeft,curtop+=element.offsetTop,element=element.offsetParent;while(element);return[curleft,curtop]}},fluid.dom.cleanseScripts=function(element){var cleansed=$.data(element,fluid.dom.cleanseScripts.MARKER);cleansed||(fluid.dom.iterateDom(element,function(node){return"script"===node.tagName.toLowerCase()?"delete":null}),$.data(element,fluid.dom.cleanseScripts.MARKER,!0))},fluid.dom.cleanseScripts.MARKER="fluid-scripts-cleansed",fluid.dom.insertAfter=function(newChild,refChild){var nextSib=refChild.nextSibling;nextSib?refChild.parentNode.insertBefore(newChild,nextSib):refChild.parentNode.appendChild(newChild)},fluid.dom.isWhitespaceNode=function(node){return!/[^\t\n\r ]/.test(node.data)},fluid.dom.isIgnorableNode=function(node){return 8===node.nodeType||3===node.nodeType&&fluid.dom.isWhitespaceNode(node)}}(jQuery,fluid_1_5);
