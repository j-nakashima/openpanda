var fluid_1_5=fluid_1_5||{};!function($,fluid){"use strict";fluid.dom=fluid.dom||{};var getNextNode=function(iterator){if(iterator.node.firstChild)return iterator.node=iterator.node.firstChild,iterator.depth+=1,iterator;for(;iterator.node;){if(iterator.node.nextSibling)return iterator.node=iterator.node.nextSibling,iterator;iterator.node=iterator.node.parentNode,iterator.depth-=1}return iterator};fluid.dom.iterateDom=function(node,acceptor,allNodes){for(var condition,currentNode={node:node,depth:0},prevNode=node;null!==currentNode.node&&currentNode.depth>=0&&currentNode.depth<fluid.dom.iterateDom.DOM_BAIL_DEPTH;){if(condition=null,(1===currentNode.node.nodeType||allNodes)&&(condition=acceptor(currentNode.node,currentNode.depth)),condition)if("delete"===condition)currentNode.node.parentNode.removeChild(currentNode.node),currentNode.node=prevNode;else if("stop"===condition)return currentNode.node;prevNode=currentNode.node,currentNode=getNextNode(currentNode)}},fluid.dom.iterateDom.DOM_BAIL_DEPTH=256,fluid.dom.isContainer=function(container,containee){for(;containee;containee=containee.parentNode)if(container===containee)return!0;return!1},fluid.dom.getElementText=function(element){for(var nodes=element.childNodes,text="",i=0;i<nodes.length;++i){var child=nodes[i];3===child.nodeType&&(text+=child.nodeValue)}return text}}(jQuery,fluid_1_5);
