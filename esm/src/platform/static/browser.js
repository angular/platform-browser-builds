import { coreLoadAndBootstrap, ReflectiveInjector } from '@angular/core';
import { isPresent } from '../../facade/lang';
import { BROWSER_APP_COMMON_PROVIDERS, browserPlatform } from '../common/browser';
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates have been pre-compiled.
 */
export const BROWSER_APP_STATIC_PROVIDERS = 
/*@ts2dart_const*/ BROWSER_APP_COMMON_PROVIDERS;
/**
 * See {@link bootstrap} for more information.
 */
export function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (isPresent(initReflector)) {
        initReflector();
    }
    let appProviders = isPresent(customProviders) ? [BROWSER_APP_STATIC_PROVIDERS, customProviders] :
        BROWSER_APP_STATIC_PROVIDERS;
    var appInjector = ReflectiveInjector.resolveAndCreate(appProviders, browserPlatform().injector);
    return coreLoadAndBootstrap(appInjector, appComponentType);
}
//# sourceMappingURL=browser.js.map