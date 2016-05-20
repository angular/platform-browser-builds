"use strict";
var post_message_bus_1 = require('../../web_workers/shared/post_message_bus');
var message_bus_1 = require('../../web_workers/shared/message_bus');
var core_1 = require('@angular/core');
var worker_render_1 = require('../common/worker_render');
var exceptions_1 = require('../../../src/facade/exceptions');
var lang_1 = require('../../facade/lang');
var async_1 = require('../../facade/async');
var core_2 = require('@angular/core');
var worker_render_2 = require('../common/worker_render');
var WebWorkerInstance = (function () {
    function WebWorkerInstance() {
    }
    /** @internal */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    WebWorkerInstance.decorators = [
        { type: core_1.Injectable },
    ];
    return WebWorkerInstance;
}());
exports.WebWorkerInstance = WebWorkerInstance;
/**
 * An array of providers that should be passed into `application()` when initializing a new Worker.
 */
exports.WORKER_RENDER_STATIC_APPLICATION_PROVIDERS = [
    worker_render_1.WORKER_RENDER_APPLICATION_COMMON_PROVIDERS, WebWorkerInstance,
    /*@ts2dart_Provider*/ {
        provide: core_1.APP_INITIALIZER,
        useFactory: (function (injector) { return function () { return initWebWorkerApplication(injector); }; }),
        multi: true,
        deps: [core_1.Injector]
    },
    /*@ts2dart_Provider*/ {
        provide: message_bus_1.MessageBus,
        useFactory: function (instance) { return instance.bus; },
        deps: [WebWorkerInstance]
    }
];
function bootstrapStaticRender(workerScriptUri, customProviders) {
    var app = core_2.ReflectiveInjector.resolveAndCreate([
        exports.WORKER_RENDER_STATIC_APPLICATION_PROVIDERS,
        /* @ts2dart_Provider */ { provide: worker_render_1.WORKER_SCRIPT, useValue: workerScriptUri },
        lang_1.isPresent(customProviders) ? customProviders : []
    ], worker_render_2.workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_2.ApplicationRef));
}
exports.bootstrapStaticRender = bootstrapStaticRender;
function initWebWorkerApplication(injector) {
    var scriptUri;
    try {
        scriptUri = injector.get(worker_render_1.WORKER_SCRIPT);
    }
    catch (e) {
        throw new exceptions_1.BaseException("You must provide your WebWorker's initialization script with the WORKER_SCRIPT token");
    }
    var instance = injector.get(WebWorkerInstance);
    spawnWebWorker(scriptUri, instance);
    worker_render_1.initializeGenericWorkerRenderer(injector);
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 */
function spawnWebWorker(uri, instance) {
    var webWorker = new Worker(uri);
    var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
    var source = new post_message_bus_1.PostMessageBusSource(webWorker);
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
//# sourceMappingURL=worker_render.js.map