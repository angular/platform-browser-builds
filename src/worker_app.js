"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var lang_1 = require('./facade/lang');
var worker_app_common_1 = require('./webworker/worker_app_common');
var worker_app_1 = require('./webworker/worker_app');
var core_1 = require('@angular/core');
var worker_app_common_2 = require('./webworker/worker_app_common');
exports.WORKER_APP_PLATFORM_PROVIDERS = worker_app_common_2.WORKER_APP_PLATFORM_PROVIDERS;
exports.WORKER_APP_APPLICATION_COMMON_PROVIDERS = worker_app_common_2.WORKER_APP_APPLICATION_COMMON_PROVIDERS;
var worker_app_2 = require('./webworker/worker_app');
exports.WORKER_APP_APPLICATION_PROVIDERS = worker_app_2.WORKER_APP_APPLICATION_PROVIDERS;
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
var location_providers_1 = require('./web_workers/worker/location_providers');
exports.WORKER_APP_LOCATION_PROVIDERS = location_providers_1.WORKER_APP_LOCATION_PROVIDERS;
function workerAppPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(worker_app_common_1.WORKER_APP_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(worker_app_common_1.WORKER_APP_PLATFORM_MARKER);
}
exports.workerAppPlatform = workerAppPlatform;
function bootstrapStaticApp(appComponentType, customProviders) {
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([worker_app_1.WORKER_APP_APPLICATION_PROVIDERS, lang_1.isPresent(customProviders) ? customProviders : []], workerAppPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapStaticApp = bootstrapStaticApp;
//# sourceMappingURL=worker_app.js.map