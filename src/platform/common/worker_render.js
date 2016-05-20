"use strict";
var lang_1 = require("../../../src/facade/lang");
var message_bus_1 = require("../../web_workers/shared/message_bus");
var core_1 = require("@angular/core");
var core_private_1 = require("../../../core_private");
var dom_adapter_1 = require("../../dom/dom_adapter");
var dom_events_1 = require("../../dom/events/dom_events");
var key_events_1 = require("../../dom/events/key_events");
var hammer_gestures_1 = require("../../dom/events/hammer_gestures");
var dom_tokens_1 = require("../../dom/dom_tokens");
var dom_renderer_1 = require("../../dom/dom_renderer");
var shared_styles_host_1 = require("../../dom/shared_styles_host");
var browser_details_1 = require("../../animate/browser_details");
var animation_builder_1 = require("../../animate/animation_builder");
var testability_1 = require("../../browser/testability");
var browser_adapter_1 = require("../../browser/browser_adapter");
var renderer_1 = require("../../web_workers/ui/renderer");
var service_message_broker_1 = require("../../web_workers/shared/service_message_broker");
var client_message_broker_1 = require("../../web_workers/shared/client_message_broker");
var serializer_1 = require("../../web_workers/shared/serializer");
var api_1 = require("../../web_workers/shared/api");
var render_store_1 = require("../../web_workers/shared/render_store");
var event_manager_1 = require("../../dom/events/event_manager");
var browser_1 = require("../common/browser");
var WORKER_RENDER_PLATFORM_MARKER = 
/*@ts2dart_const*/ new core_1.OpaqueToken('WorkerRenderPlatformMarker');
exports.WORKER_SCRIPT = new core_1.OpaqueToken("WebWorkerScript");
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 */
exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE = 
/*@ts2dart_const*/ new core_1.OpaqueToken('WorkerRenderStartableMsgService');
exports.WORKER_RENDER_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_const*/ ({ provide: WORKER_RENDER_PLATFORM_MARKER, useValue: true }),
    /* @ts2dart_Provider */ { provide: core_1.PLATFORM_INITIALIZER, useValue: initWebWorkerRenderPlatform, multi: true }
];
exports.WORKER_RENDER_APPLICATION_COMMON_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.APPLICATION_COMMON_PROVIDERS,
    renderer_1.MessageBasedRenderer,
    /* @ts2dart_Provider */ { provide: exports.WORKER_RENDER_STARTABLE_MESSAGING_SERVICE, useExisting: renderer_1.MessageBasedRenderer, multi: true },
    browser_1.BROWSER_SANITIZATION_PROVIDERS,
    /* @ts2dart_Provider */ { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    /* @ts2dart_Provider */ { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    /* @ts2dart_Provider */ { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    /* @ts2dart_Provider */ { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    /* @ts2dart_Provider */ { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    /* @ts2dart_Provider */ { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
    /* @ts2dart_Provider */ { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
    /* @ts2dart_Provider */ { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    /* @ts2dart_Provider */ { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
    /* @ts2dart_Provider */ { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
    /* @ts2dart_Provider */ { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
    serializer_1.Serializer,
    /* @ts2dart_Provider */ { provide: api_1.ON_WEB_WORKER, useValue: false },
    render_store_1.RenderStore,
    shared_styles_host_1.DomSharedStylesHost,
    core_1.Testability,
    browser_details_1.BrowserDetails,
    animation_builder_1.AnimationBuilder,
    event_manager_1.EventManager
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
//# sourceMappingURL=worker_render.js.map