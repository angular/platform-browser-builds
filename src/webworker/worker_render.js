"use strict";
var post_message_bus_1 = require('../web_workers/shared/post_message_bus');
var message_bus_1 = require('../web_workers/shared/message_bus');
var core_1 = require('@angular/core');
var worker_render_common_1 = require('./worker_render_common');
var exceptions_1 = require('../../src/facade/exceptions');
var worker_render_common_2 = require('./worker_render_common');
exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE = worker_render_common_2.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE;
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
exports.WORKER_RENDER_APPLICATION_PROVIDERS = [
    worker_render_common_1.WORKER_RENDER_APPLICATION_COMMON_PROVIDERS, WebWorkerInstance,
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
function initWebWorkerApplication(injector) {
    var scriptUri;
    try {
        scriptUri = injector.get(worker_render_common_1.WORKER_SCRIPT);
    }
    catch (e) {
        throw new exceptions_1.BaseException("You must provide your WebWorker's initialization script with the WORKER_SCRIPT token");
    }
    var instance = injector.get(WebWorkerInstance);
    spawnWebWorker(scriptUri, instance);
    worker_render_common_1.initializeGenericWorkerRenderer(injector);
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