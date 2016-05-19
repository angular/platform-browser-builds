"use strict";
var core_1 = require('@angular/core');
var worker_adapter_1 = require('../web_workers/worker/worker_adapter');
var post_message_bus_1 = require('../web_workers/shared/post_message_bus');
var worker_app_common_1 = require('./worker_app_common');
var message_bus_1 = require('../web_workers/shared/message_bus');
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        postMessage(message, transferrables);
    }
};
exports.WORKER_APP_APPLICATION_PROVIDERS = [
    worker_app_common_1.WORKER_APP_APPLICATION_COMMON_PROVIDERS,
    /* @ts2dart_Provider */ { provide: message_bus_1.MessageBus, useFactory: createMessageBus, deps: [core_1.NgZone] },
    /* @ts2dart_Provider */ { provide: core_1.APP_INITIALIZER, useValue: setupWebWorker, multi: true }
];
function createMessageBus(zone) {
    var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
    var source = new post_message_bus_1.PostMessageBusSource();
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
function setupWebWorker() {
    worker_adapter_1.WorkerDomAdapter.makeCurrent();
}
//# sourceMappingURL=worker_app.js.map