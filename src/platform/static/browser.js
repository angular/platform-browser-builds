"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var browser_1 = require('../common/browser');
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates have been pre-compiled.
 */
exports.BROWSER_APP_STATIC_PROVIDERS = 
/*@ts2dart_const*/ browser_1.BROWSER_APP_COMMON_PROVIDERS;
/**
 * See {@link bootstrap} for more information.
 */
function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (lang_1.isPresent(initReflector)) {
        initReflector();
    }
    var appProviders = lang_1.isPresent(customProviders) ? [exports.BROWSER_APP_STATIC_PROVIDERS, customProviders] :
        exports.BROWSER_APP_STATIC_PROVIDERS;
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(appProviders, browser_1.browserPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrapStatic = bootstrapStatic;
//# sourceMappingURL=browser.js.map