"use strict";
var lang_1 = require("./facade/lang");
var message_bus_1 = require("./web_workers/shared/message_bus");
var core_1 = require("@angular/core");
var core_private_1 = require('../core_private');
var dom_adapter_1 = require("./dom/dom_adapter");
var dom_events_1 = require("./dom/events/dom_events");
var key_events_1 = require("./dom/events/key_events");
var hammer_gestures_1 = require("./dom/events/hammer_gestures");
var dom_tokens_1 = require("./dom/dom_tokens");
var dom_renderer_1 = require("./dom/dom_renderer");
var shared_styles_host_1 = require("./dom/shared_styles_host");
var testability_1 = require("./browser/testability");
var browser_adapter_1 = require("./browser/browser_adapter");
var renderer_1 = require("./web_workers/ui/renderer");
var service_message_broker_1 = require("./web_workers/shared/service_message_broker");
var client_message_broker_1 = require("./web_workers/shared/client_message_broker");
var serializer_1 = require("./web_workers/shared/serializer");
var api_1 = require("./web_workers/shared/api");
var render_store_1 = require("./web_workers/shared/render_store");
var event_manager_1 = require("./dom/events/event_manager");
var browser_1 = require("./browser");
var post_message_bus_1 = require("./web_workers/shared/post_message_bus");
var exceptions_1 = require("./facade/exceptions");
var async_1 = require("./facade/async");
var WORKER_RENDER_PLATFORM_MARKER = new core_1.OpaqueToken('WorkerRenderPlatformMarker');
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
exports.WORKER_SCRIPT = new core_1.OpaqueToken("WebWorkerScript");
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 */
exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE = new core_1.OpaqueToken('WorkerRenderStartableMsgService');
exports.WORKER_RENDER_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_COMMON_PROVIDERS,
    { provide: WORKER_RENDER_PLATFORM_MARKER, useValue: true },
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initWebWorkerRenderPlatform, multi: true }
];
exports.WORKER_RENDER_APPLICATION_PROVIDERS = [
    core_1.APPLICATION_COMMON_PROVIDERS,
    renderer_1.MessageBasedRenderer,
    { provide: exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE, useExisting: renderer_1.MessageBasedRenderer, multi: true },
    browser_1.BROWSER_SANITIZATION_PROVIDERS,
    { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
    { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
    { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
    { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
    { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
    { provide: core_private_1.AnimationDriver, useFactory: _resolveDefaultAnimationDriver },
    serializer_1.Serializer,
    { provide: api_1.ON_WEB_WORKER, useValue: false },
    render_store_1.RenderStore,
    shared_styles_host_1.DomSharedStylesHost,
    core_1.Testability,
    event_manager_1.EventManager,
    WebWorkerInstance,
    {
        provide: core_1.APP_INITIALIZER,
        useFactory: (function (injector) { return function () { return initWebWorkerApplication(injector); }; }),
        multi: true,
        deps: [core_1.Injector]
    },
    {
        provide: message_bus_1.MessageBus,
        useFactory: function (instance) { return instance.bus; },
        deps: [WebWorkerInstance]
    }
];
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(message_bus_1.MessageBus);
    var zone = injector.get(core_1.NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var services = injector.get(exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
}
exports.initializeGenericWorkerRenderer = initializeGenericWorkerRenderer;
function bootstrapRender(workerScriptUri, customProviders) {
    var app = core_1.ReflectiveInjector.resolveAndCreate([
        exports.WORKER_RENDER_APPLICATION_PROVIDERS,
        browser_1.BROWSER_APP_COMPILER_PROVIDERS,
        { provide: exports.WORKER_SCRIPT, useValue: workerScriptUri },
        lang_1.isPresent(customProviders) ? customProviders : []
    ], workerRenderPlatform().injector);
    // Return a promise so that we keep the same semantics as Dart,
    // and we might want to wait for the app side to come up
    // in the future...
    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
}
exports.bootstrapRender = bootstrapRender;
function initWebWorkerRenderPlatform() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    core_private_1.wtfInit();
    testability_1.BrowserGetTestability.init();
}
function workerRenderPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(exports.WORKER_RENDER_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(WORKER_RENDER_PLATFORM_MARKER);
}
exports.workerRenderPlatform = workerRenderPlatform;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM());
}
function _document() {
    return dom_adapter_1.getDOM().defaultDoc();
}
function initWebWorkerApplication(injector) {
    var scriptUri;
    try {
        scriptUri = injector.get(exports.WORKER_SCRIPT);
    }
    catch (e) {
        throw new exceptions_1.BaseException("You must provide your WebWorker's initialization script with the WORKER_SCRIPT token");
    }
    var instance = injector.get(WebWorkerInstance);
    spawnWebWorker(scriptUri, instance);
    initializeGenericWorkerRenderer(injector);
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
function _resolveDefaultAnimationDriver() {
    // web workers have not been tested or configured to
    // work with animations just yet...
    return new core_private_1.NoOpAnimationDriver();
}
//# sourceMappingURL=worker_render.js.map