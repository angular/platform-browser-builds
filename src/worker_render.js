"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('./facade/lang');
var async_1 = require('./facade/async');
var core_1 = require('@angular/core');
var worker_render_1 = require('./webworker/worker_render');
var worker_render_common_1 = require('./webworker/worker_render_common');
var worker_render_common_2 = require('./webworker/worker_render_common');
exports.WORKER_SCRIPT = worker_render_common_2.WORKER_SCRIPT;
exports.WORKER_RENDER_PLATFORM_PROVIDERS = worker_render_common_2.WORKER_RENDER_PLATFORM_PROVIDERS;
exports.initializeGenericWorkerRenderer = worker_render_common_2.initializeGenericWorkerRenderer;
exports.WORKER_RENDER_APPLICATION_COMMON_PROVIDERS = worker_render_common_2.WORKER_RENDER_APPLICATION_COMMON_PROVIDERS;
var worker_render_2 = require('./webworker/worker_render');
exports.WORKER_RENDER_APPLICATION_PROVIDERS = worker_render_2.WORKER_RENDER_APPLICATION_PROVIDERS;
exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE = worker_render_2.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE;
exports.WebWorkerInstance = worker_render_2.WebWorkerInstance;
var client_message_broker_1 = require('./web_workers/shared/client_message_broker');
exports.ClientMessageBroker = client_message_broker_1.ClientMessageBroker;
exports.ClientMessageBrokerFactory = client_message_broker_1.ClientMessageBrokerFactory;
exports.FnArg = client_message_broker_1.FnArg;
exports.UiArguments = client_message_broker_1.UiArguments;
var service_message_broker_1 = require('./web_workers/shared/service_message_broker');
exports.ReceivedMessage = service_message_broker_1.ReceivedMessage;
exports.ServiceMessageBroker = service_message_broker_1.ServiceMessageBroker;
exports.ServiceMessageBrokerFactory = service_message_broker_1.ServiceMessageBrokerFactory;
var serializer_1 = require('./web_workers/shared/serializer');
exports.PRIMITIVE = serializer_1.PRIMITIVE;
__export(require('./web_workers/shared/message_bus'));
var location_providers_1 = require('../src/web_workers/ui/location_providers');
exports.WORKER_RENDER_LOCATION_PROVIDERS = location_providers_1.WORKER_RENDER_LOCATION_PROVIDERS;
function workerRenderPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_render_common_1.WORKER_RENDER_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(worker_render_common_1.WORKER_RENDER_PLATFORM_MARKER);
}
exports.workerRenderPlatform = workerRenderPlatform;
function bootstrapStaticRender(workerScriptUri, customProviders) {
    var app = core_1.ReflectiveInjector.resolveAndCreate([
        worker_render_1.WORKER_RENDER_APPLICATION_PROVIDERS,
        /* @ts2dart_Provider */ { provide: worker_render_common_1.WORKER_SCRIPT, useValue: workerScriptUri },
        lang_1.isPresent(customProviders) ? customProviders : []
    ], workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
}
exports.bootstrapStaticRender = bootstrapStaticRender;
//# sourceMappingURL=worker_render.js.map