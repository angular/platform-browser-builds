"use strict";
var worker_render_1 = require("../static/worker_render");
var core_1 = require("@angular/core");
var worker_render_2 = require("../common/worker_render");
var lang_1 = require("../../facade/lang");
var async_1 = require("../../facade/async");
exports.WORKER_RENDER_APPLICATION_PROVIDERS = [
    worker_render_1.WORKER_RENDER_STATIC_APPLICATION_PROVIDERS
];
function bootstrapRender(workerScriptUri, customProviders) {
    var app = core_1.ReflectiveInjector.resolveAndCreate([
        exports.WORKER_RENDER_APPLICATION_PROVIDERS,
        /* @ts2dart_Provider */ { provide: worker_render_2.WORKER_SCRIPT, useValue: workerScriptUri },
        lang_1.isPresent(customProviders) ? customProviders : []
    ], worker_render_2.workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
}
exports.bootstrapRender = bootstrapRender;
//# sourceMappingURL=worker_render.js.map