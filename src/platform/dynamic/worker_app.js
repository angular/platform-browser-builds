"use strict";
var worker_app_1 = require('../static/worker_app');
var worker_app_2 = require('../common/worker_app');
var compiler_1 = require('@angular/compiler');
var xhr_impl_1 = require('../../xhr/xhr_impl');
var lang_1 = require('../../facade/lang');
var core_1 = require('@angular/core');
exports.WORKER_APP_APPLICATION_PROVIDERS = [
    worker_app_1.WORKER_APP_STATIC_APPLICATION_PROVIDERS,
    compiler_1.COMPILER_PROVIDERS,
    /* @ts2dart_Provider */ { provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl },
];
function bootstrapApp(appComponentType, customProviders) {
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([exports.WORKER_APP_APPLICATION_PROVIDERS, lang_1.isPresent(customProviders) ? customProviders : []], worker_app_2.workerAppPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapApp = bootstrapApp;
//# sourceMappingURL=worker_app.js.map