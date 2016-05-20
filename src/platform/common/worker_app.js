"use strict";
var renderer_1 = require('../../web_workers/worker/renderer');
var lang_1 = require('../../../src/facade/lang');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var client_message_broker_1 = require('../../web_workers/shared/client_message_broker');
var service_message_broker_1 = require('../../web_workers/shared/service_message_broker');
var serializer_1 = require('../../web_workers/shared/serializer');
var api_1 = require('../../web_workers/shared/api');
var render_store_1 = require('../../web_workers/shared/render_store');
var browser_1 = require('./browser');
var PrintLogger = (function () {
    function PrintLogger() {
        this.log = lang_1.print;
        this.logError = lang_1.print;
        this.logGroup = lang_1.print;
    }
    PrintLogger.prototype.logGroupEnd = function () { };
    return PrintLogger;
}());
var WORKER_APP_PLATFORM_MARKER = 
/*@ts2dart_const*/ new core_1.OpaqueToken('WorkerAppPlatformMarker');
exports.WORKER_APP_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_const*/ (
    /* @ts2dart_Provider */ { provide: WORKER_APP_PLATFORM_MARKER, useValue: true })
];
exports.WORKER_APP_APPLICATION_COMMON_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.APPLICATION_COMMON_PROVIDERS,
    common_1.FORM_PROVIDERS,
    browser_1.BROWSER_SANITIZATION_PROVIDERS,
    serializer_1.Serializer,
    /* @ts2dart_Provider */ { provide: core_1.PLATFORM_PIPES, useValue: common_1.COMMON_PIPES, multi: true },
    /* @ts2dart_Provider */ { provide: core_1.PLATFORM_DIRECTIVES, useValue: common_1.COMMON_DIRECTIVES, multi: true },
    /* @ts2dart_Provider */ { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
    /* @ts2dart_Provider */ { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
    renderer_1.WebWorkerRootRenderer,
    /* @ts2dart_Provider */ { provide: core_1.RootRenderer, useExisting: renderer_1.WebWorkerRootRenderer },
    /* @ts2dart_Provider */ { provide: api_1.ON_WEB_WORKER, useValue: true },
    render_store_1.RenderStore,
    /* @ts2dart_Provider */ { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] }
];
function workerAppPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(exports.WORKER_APP_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(WORKER_APP_PLATFORM_MARKER);
}
exports.workerAppPlatform = workerAppPlatform;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(new PrintLogger());
}
//# sourceMappingURL=worker_app.js.map