var fluid_1_5=fluid_1_5||{};!function(fluid){"use strict";fluid.registerNamespace("fluid.compat.fluid_1_3.uploader"),fluid.enhance.check({"fluid.uploader.fluid_1_3":!0}),fluid.compat.fluid_1_3.uploader.fileTypeTransformer=function(val){var mimeTypeMap=fluid.uploader.mimeTypeRegistry;if(fluid.isArrayable(val)||"string"!=typeof val)return val;var exts=val.split(";");if(0===exts.length)return void 0;var mimeTypes=[];return fluid.each(exts,function(ext){ext=ext.substring(2);var mimeType=mimeTypeMap[ext];mimeType&&mimeTypes.push(mimeType)}),mimeTypes},fluid.compat.fluid_1_3.uploader.optionsRules={gradeNames:"gradeNames",components:"components",invokers:"invokers",queueSettings:"queueSettings",demo:"demo",selectors:"selectors",focusWithEvent:"focusWithEvent",styles:"styles",events:"events",listeners:"listeners",strings:"strings",mergePolicy:"mergePolicy","queueSettings.fileTypes":{transform:{type:"fluid.compat.fluid_1_3.uploader.fileTypeTransformer",inputPath:"queueSettings.fileTypes"}}},fluid.demands("fluid.uploader","fluid.uploader.fluid_1_3",{options:fluid.transformOne(fluid.compat.fluid_1_3.uploader.optionsRules)}),fluid.demands("fluid.uploader",["fluid.uploader.fluid_1_2","fluid.uploader.fluid_1_3"],{options:fluid.transformMany([fluid.compat.fluid_1_2.uploader.optionsRules,fluid.compat.fluid_1_3.uploader.optionsRules])})}(fluid_1_5);
