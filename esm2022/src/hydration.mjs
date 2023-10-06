/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵwithHttpTransferCache } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, NgZone, ɵConsole as Console, ɵformatRuntimeError as formatRuntimeError, ɵwithDomHydration as withDomHydration, } from '@angular/core';
/**
 * Helper function to create an object that represents a Hydration feature.
 */
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
    return { ɵkind, ɵproviders };
}
/**
 * Disables DOM nodes reuse during hydration. Effectively makes
 * Angular re-render an application from scratch on the client.
 *
 * When this option is enabled, make sure that the initial navigation
 * option is configured for the Router as `enabledBlocking` by using the
 * `withEnabledBlockingInitialNavigation` in the `provideRouter` call:
 *
 * ```
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideRouter(
 *       // ... other features ...
 *       withEnabledBlockingInitialNavigation()
 *     ),
 *     provideClientHydration(withNoDomReuse())
 *   ]
 * });
 * ```
 *
 * This would ensure that the application is rerendered after all async
 * operations in the Router (such as lazy-loading of components,
 * waiting for async guards and resolvers) are completed to avoid
 * clearing the DOM on the client too soon, thus causing content flicker.
 *
 * The use of this function is discouraged, because it disables DOM nodes reuse during
 * hydration.
 *
 * @see {@link provideRouter}
 * @see {@link withEnabledBlockingInitialNavigation}
 *
 * @publicApi
 * @developerPreview
 */
export function withNoDomReuse() {
    // This feature has no providers and acts as a flag that turns off
    // non-destructive hydration (which otherwise is turned on by default).
    return hydrationFeature(0 /* HydrationFeatureKind.NoDomReuseFeature */);
}
/**
 * Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
 * server and other one on the browser.
 *
 * @publicApi
 * @developerPreview
 */
export function withNoHttpTransferCache() {
    // This feature has no providers and acts as a flag that turns off
    // HTTP transfer cache (which otherwise is turned on by default).
    return hydrationFeature(1 /* HydrationFeatureKind.NoHttpTransferCache */);
}
/**
 * The function accepts a an object, which allows to configure cache parameters,
 * such as which headers should be included (no headers are included by default),
 * wether POST requests should be cached or a callback function to determine if a
 * particular request should be cached.
 *
 * @publicApi
 * @developerPreview
 */
export function withHttpTransferCacheOptions(options) {
    // This feature has no providers and acts as a flag to pass options to the HTTP transfer cache.
    return hydrationFeature(2 /* HydrationFeatureKind.HttpTransferCacheOptions */, ɵwithHttpTransferCache(options));
}
/**
 * Returns an `ENVIRONMENT_INITIALIZER` token setup with a function
 * that verifies whether compatible ZoneJS was used in an application
 * and logs a warning in a console if it's not the case.
 */
function provideZoneJsCompatibilityDetector() {
    return [{
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => {
                const ngZone = inject(NgZone);
                // Checking `ngZone instanceof NgZone` would be insufficient here,
                // because custom implementations might use NgZone as a base class.
                if (ngZone.constructor !== NgZone) {
                    const console = inject(Console);
                    const message = formatRuntimeError(-5000 /* RuntimeErrorCode.UNSUPPORTED_ZONEJS_INSTANCE */, 'Angular detected that hydration was enabled for an application ' +
                        'that uses a custom or a noop Zone.js implementation. ' +
                        'This is not yet a fully supported configuration.');
                    // tslint:disable-next-line:no-console
                    console.warn(message);
                }
            },
            multi: true,
        }];
}
/**
 * Sets up providers necessary to enable hydration functionality for the application.
 *
 * By default, the function enables the recommended set of features for the optimal
 * performance for most of the applications. You can enable/disable features by
 * passing special functions (from the `HydrationFeatures` set) as arguments to the
 * `provideClientHydration` function. It includes the following features:
 *
 * * Reconciling DOM hydration. Learn more about it [here](guide/hydration).
 * * [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
 * transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
 * [here](/guide/universal#caching-data-when-using-httpclient).
 *
 * These functions allow you to disable some of the default features or configure features
 * * {@link withNoDomReuse} to disable DOM nodes reuse during hydration
 * * {@link withNoHttpTransferCache} to disable HTTP transfer cache
 * * {@link withHttpTransferCacheOptions} to configure some HTTP transfer cache options
 *
 * @usageNotes
 *
 * Basic example of how you can enable hydration in your application when
 * `bootstrapApplication` function is used:
 * ```
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration()]
 * });
 * ```
 *
 * Alternatively if you are using NgModules, you would add `provideClientHydration`
 * to your root app module's provider list.
 * ```
 * @NgModule({
 *   declarations: [RootCmp],
 *   bootstrap: [RootCmp],
 *   providers: [provideClientHydration()],
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link withNoDomReuse}
 * @see {@link withNoHttpTransferCache}
 * @see {@link withHttpTransferCacheOptions}
 *
 * @param features Optional features to configure additional router behaviors.
 * @returns A set of providers to enable hydration.
 *
 * @publicApi
 * @developerPreview
 */
export function provideClientHydration(...features) {
    const providers = [];
    const featuresKind = new Set();
    const hasHttpTransferCacheOptions = featuresKind.has(2 /* HydrationFeatureKind.HttpTransferCacheOptions */);
    for (const { ɵproviders, ɵkind } of features) {
        featuresKind.add(ɵkind);
        if (ɵproviders.length) {
            providers.push(ɵproviders);
        }
    }
    if (typeof ngDevMode !== 'undefined' && ngDevMode &&
        featuresKind.has(1 /* HydrationFeatureKind.NoHttpTransferCache */) && hasHttpTransferCacheOptions) {
        // TODO: Make this a runtime error
        throw new Error('Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    return makeEnvironmentProviders([
        (typeof ngDevMode !== 'undefined' && ngDevMode) ? provideZoneJsCompatibilityDetector() : [],
        (featuresKind.has(0 /* HydrationFeatureKind.NoDomReuseFeature */) ? [] : withDomHydration()),
        ((featuresKind.has(1 /* HydrationFeatureKind.NoHttpTransferCache */) || hasHttpTransferCacheOptions) ?
            [] :
            ɵwithHttpTransferCache({})),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBMkIsc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsdUJBQXVCLEVBQXdCLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQVksUUFBUSxJQUFJLE9BQU8sRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsR0FBRSxNQUFNLGVBQWUsQ0FBQztBQTRCeE87O0dBRUc7QUFDSCxTQUFTLGdCQUFnQixDQUNyQixLQUFrQixFQUFFLGFBQXlCLEVBQUUsRUFDL0MsV0FBb0IsRUFBRTtJQUN4QixPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzdCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBTSxVQUFVLGNBQWM7SUFDNUIsa0VBQWtFO0lBQ2xFLHVFQUF1RTtJQUN2RSxPQUFPLGdCQUFnQixnREFBd0MsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QjtJQUVyQyxrRUFBa0U7SUFDbEUsaUVBQWlFO0lBQ2pFLE9BQU8sZ0JBQWdCLGtEQUEwQyxDQUFDO0FBQ3BFLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FDeEMsT0FBaUM7SUFFbkMsK0ZBQStGO0lBQy9GLE9BQU8sZ0JBQWdCLHdEQUM0QixzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxrQ0FBa0M7SUFDekMsT0FBTyxDQUFDO1lBQ04sT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUIsa0VBQWtFO2dCQUNsRSxtRUFBbUU7Z0JBQ25FLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7b0JBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLDJEQUU5QixpRUFBaUU7d0JBQzdELHVEQUF1RDt3QkFDdkQsa0RBQWtELENBQUMsQ0FBQztvQkFDNUQsc0NBQXNDO29CQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN2QjtZQUNILENBQUM7WUFDRCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEdBQUcsUUFBa0Q7SUFFMUYsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO0lBQ3JELE1BQU0sMkJBQTJCLEdBQzdCLFlBQVksQ0FBQyxHQUFHLHVEQUErQyxDQUFDO0lBRXBFLEtBQUssTUFBTSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsSUFBSSxRQUFRLEVBQUU7UUFDMUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QjtLQUNGO0lBRUQsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUztRQUM3QyxZQUFZLENBQUMsR0FBRyxrREFBMEMsSUFBSSwyQkFBMkIsRUFBRTtRQUM3RixrQ0FBa0M7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxzS0FBc0ssQ0FBQyxDQUFDO0tBQzdLO0lBRUQsT0FBTyx3QkFBd0IsQ0FBQztRQUM5QixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMzRixDQUFDLFlBQVksQ0FBQyxHQUFHLGdEQUF3QyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEYsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLGtEQUEwQyxJQUFJLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUN6RixFQUFFLENBQUMsQ0FBQztZQUNKLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLFNBQVM7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLCDJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFTlZJUk9OTUVOVF9JTklUSUFMSVpFUiwgRW52aXJvbm1lbnRQcm92aWRlcnMsIGluamVjdCwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLCBOZ1pvbmUsIFByb3ZpZGVyLCDJtUNvbnNvbGUgYXMgQ29uc29sZSwgybVmb3JtYXRSdW50aW1lRXJyb3IgYXMgZm9ybWF0UnVudGltZUVycm9yLCDJtXdpdGhEb21IeWRyYXRpb24gYXMgd2l0aERvbUh5ZHJhdGlvbix9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiBmZWF0dXJlcyBhcyBhbiBlbnVtIHRvIHVuaXF1ZWx5IHR5cGUgZWFjaCBgSHlkcmF0aW9uRmVhdHVyZWAuXG4gKiBAc2VlIHtAbGluayBIeWRyYXRpb25GZWF0dXJlfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEh5ZHJhdGlvbkZlYXR1cmVLaW5kIHtcbiAgTm9Eb21SZXVzZUZlYXR1cmUsXG4gIE5vSHR0cFRyYW5zZmVyQ2FjaGUsXG4gIEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbn1cblxuLyoqXG4gKiBIZWxwZXIgdHlwZSB0byByZXByZXNlbnQgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEh5ZHJhdGlvbkZlYXR1cmU8RmVhdHVyZUtpbmQgZXh0ZW5kcyBIeWRyYXRpb25GZWF0dXJlS2luZD4ge1xuICDJtWtpbmQ6IEZlYXR1cmVLaW5kO1xuICDJtXByb3ZpZGVyczogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqL1xuZnVuY3Rpb24gaHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPihcbiAgICDJtWtpbmQ6IEZlYXR1cmVLaW5kLCDJtXByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtdLFxuICAgIMm1b3B0aW9uczogdW5rbm93biA9IHt9KTogSHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZD4ge1xuICByZXR1cm4ge8m1a2luZCwgybVwcm92aWRlcnN9O1xufVxuXG4vKipcbiAqIERpc2FibGVzIERPTSBub2RlcyByZXVzZSBkdXJpbmcgaHlkcmF0aW9uLiBFZmZlY3RpdmVseSBtYWtlc1xuICogQW5ndWxhciByZS1yZW5kZXIgYW4gYXBwbGljYXRpb24gZnJvbSBzY3JhdGNoIG9uIHRoZSBjbGllbnQuXG4gKlxuICogV2hlbiB0aGlzIG9wdGlvbiBpcyBlbmFibGVkLCBtYWtlIHN1cmUgdGhhdCB0aGUgaW5pdGlhbCBuYXZpZ2F0aW9uXG4gKiBvcHRpb24gaXMgY29uZmlndXJlZCBmb3IgdGhlIFJvdXRlciBhcyBgZW5hYmxlZEJsb2NraW5nYCBieSB1c2luZyB0aGVcbiAqIGB3aXRoRW5hYmxlZEJsb2NraW5nSW5pdGlhbE5hdmlnYXRpb25gIGluIHRoZSBgcHJvdmlkZVJvdXRlcmAgY2FsbDpcbiAqXG4gKiBgYGBcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZVJvdXRlcihcbiAqICAgICAgIC8vIC4uLiBvdGhlciBmZWF0dXJlcyAuLi5cbiAqICAgICAgIHdpdGhFbmFibGVkQmxvY2tpbmdJbml0aWFsTmF2aWdhdGlvbigpXG4gKiAgICAgKSxcbiAqICAgICBwcm92aWRlQ2xpZW50SHlkcmF0aW9uKHdpdGhOb0RvbVJldXNlKCkpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhpcyB3b3VsZCBlbnN1cmUgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgcmVyZW5kZXJlZCBhZnRlciBhbGwgYXN5bmNcbiAqIG9wZXJhdGlvbnMgaW4gdGhlIFJvdXRlciAoc3VjaCBhcyBsYXp5LWxvYWRpbmcgb2YgY29tcG9uZW50cyxcbiAqIHdhaXRpbmcgZm9yIGFzeW5jIGd1YXJkcyBhbmQgcmVzb2x2ZXJzKSBhcmUgY29tcGxldGVkIHRvIGF2b2lkXG4gKiBjbGVhcmluZyB0aGUgRE9NIG9uIHRoZSBjbGllbnQgdG9vIHNvb24sIHRodXMgY2F1c2luZyBjb250ZW50IGZsaWNrZXIuXG4gKlxuICogVGhlIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIGRpc2NvdXJhZ2VkLCBiZWNhdXNlIGl0IGRpc2FibGVzIERPTSBub2RlcyByZXVzZSBkdXJpbmdcbiAqIGh5ZHJhdGlvbi5cbiAqXG4gKiBAc2VlIHtAbGluayBwcm92aWRlUm91dGVyfVxuICogQHNlZSB7QGxpbmsgd2l0aEVuYWJsZWRCbG9ja2luZ0luaXRpYWxOYXZpZ2F0aW9ufVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoTm9Eb21SZXVzZSgpOiBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vRG9tUmV1c2VGZWF0dXJlPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0aGF0IHR1cm5zIG9mZlxuICAvLyBub24tZGVzdHJ1Y3RpdmUgaHlkcmF0aW9uICh3aGljaCBvdGhlcndpc2UgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQpLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0RvbVJldXNlRmVhdHVyZSk7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgSFRUUCB0cmFuc2ZlciBjYWNoZS4gRWZmZWN0aXZlbHkgY2F1c2VzIEhUVFAgcmVxdWVzdHMgdG8gYmUgcGVyZm9ybWVkIHR3aWNlOiBvbmNlIG9uIHRoZVxuICogc2VydmVyIGFuZCBvdGhlciBvbmUgb24gdGhlIGJyb3dzZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlKCk6XG4gICAgSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0aGF0IHR1cm5zIG9mZlxuICAvLyBIVFRQIHRyYW5zZmVyIGNhY2hlICh3aGljaCBvdGhlcndpc2UgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQpLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKTtcbn1cblxuLyoqXG4gKiBUaGUgZnVuY3Rpb24gYWNjZXB0cyBhIGFuIG9iamVjdCwgd2hpY2ggYWxsb3dzIHRvIGNvbmZpZ3VyZSBjYWNoZSBwYXJhbWV0ZXJzLFxuICogc3VjaCBhcyB3aGljaCBoZWFkZXJzIHNob3VsZCBiZSBpbmNsdWRlZCAobm8gaGVhZGVycyBhcmUgaW5jbHVkZWQgYnkgZGVmYXVsdCksXG4gKiB3ZXRoZXIgUE9TVCByZXF1ZXN0cyBzaG91bGQgYmUgY2FjaGVkIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGFcbiAqIHBhcnRpY3VsYXIgcmVxdWVzdCBzaG91bGQgYmUgY2FjaGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKFxuICAgIG9wdGlvbnM6IEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbiAgICApOiBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucz4ge1xuICAvLyBUaGlzIGZlYXR1cmUgaGFzIG5vIHByb3ZpZGVycyBhbmQgYWN0cyBhcyBhIGZsYWcgdG8gcGFzcyBvcHRpb25zIHRvIHRoZSBIVFRQIHRyYW5zZmVyIGNhY2hlLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShcbiAgICAgIEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucywgybV3aXRoSHR0cFRyYW5zZmVyQ2FjaGUob3B0aW9ucykpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYEVOVklST05NRU5UX0lOSVRJQUxJWkVSYCB0b2tlbiBzZXR1cCB3aXRoIGEgZnVuY3Rpb25cbiAqIHRoYXQgdmVyaWZpZXMgd2hldGhlciBjb21wYXRpYmxlIFpvbmVKUyB3YXMgdXNlZCBpbiBhbiBhcHBsaWNhdGlvblxuICogYW5kIGxvZ3MgYSB3YXJuaW5nIGluIGEgY29uc29sZSBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqL1xuZnVuY3Rpb24gcHJvdmlkZVpvbmVKc0NvbXBhdGliaWxpdHlEZXRlY3RvcigpOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFt7XG4gICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgdXNlVmFsdWU6ICgpID0+IHtcbiAgICAgIGNvbnN0IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgICAgLy8gQ2hlY2tpbmcgYG5nWm9uZSBpbnN0YW5jZW9mIE5nWm9uZWAgd291bGQgYmUgaW5zdWZmaWNpZW50IGhlcmUsXG4gICAgICAvLyBiZWNhdXNlIGN1c3RvbSBpbXBsZW1lbnRhdGlvbnMgbWlnaHQgdXNlIE5nWm9uZSBhcyBhIGJhc2UgY2xhc3MuXG4gICAgICBpZiAobmdab25lLmNvbnN0cnVjdG9yICE9PSBOZ1pvbmUpIHtcbiAgICAgICAgY29uc3QgY29uc29sZSA9IGluamVjdChDb25zb2xlKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5TVVBQT1JURURfWk9ORUpTX0lOU1RBTkNFLFxuICAgICAgICAgICAgJ0FuZ3VsYXIgZGV0ZWN0ZWQgdGhhdCBoeWRyYXRpb24gd2FzIGVuYWJsZWQgZm9yIGFuIGFwcGxpY2F0aW9uICcgK1xuICAgICAgICAgICAgICAgICd0aGF0IHVzZXMgYSBjdXN0b20gb3IgYSBub29wIFpvbmUuanMgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgICAgICdUaGlzIGlzIG5vdCB5ZXQgYSBmdWxseSBzdXBwb3J0ZWQgY29uZmlndXJhdGlvbi4nKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dO1xufVxuXG4vKipcbiAqIFNldHMgdXAgcHJvdmlkZXJzIG5lY2Vzc2FyeSB0byBlbmFibGUgaHlkcmF0aW9uIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0aGUgZnVuY3Rpb24gZW5hYmxlcyB0aGUgcmVjb21tZW5kZWQgc2V0IG9mIGZlYXR1cmVzIGZvciB0aGUgb3B0aW1hbFxuICogcGVyZm9ybWFuY2UgZm9yIG1vc3Qgb2YgdGhlIGFwcGxpY2F0aW9ucy4gWW91IGNhbiBlbmFibGUvZGlzYWJsZSBmZWF0dXJlcyBieVxuICogcGFzc2luZyBzcGVjaWFsIGZ1bmN0aW9ucyAoZnJvbSB0aGUgYEh5ZHJhdGlvbkZlYXR1cmVzYCBzZXQpIGFzIGFyZ3VtZW50cyB0byB0aGVcbiAqIGBwcm92aWRlQ2xpZW50SHlkcmF0aW9uYCBmdW5jdGlvbi4gSXQgaW5jbHVkZXMgdGhlIGZvbGxvd2luZyBmZWF0dXJlczpcbiAqXG4gKiAqIFJlY29uY2lsaW5nIERPTSBoeWRyYXRpb24uIExlYXJuIG1vcmUgYWJvdXQgaXQgW2hlcmVdKGd1aWRlL2h5ZHJhdGlvbikuXG4gKiAqIFtgSHR0cENsaWVudGBdKGFwaS9jb21tb24vaHR0cC9IdHRwQ2xpZW50KSByZXNwb25zZSBjYWNoaW5nIHdoaWxlIHJ1bm5pbmcgb24gdGhlIHNlcnZlciBhbmRcbiAqIHRyYW5zZmVycmluZyB0aGlzIGNhY2hlIHRvIHRoZSBjbGllbnQgdG8gYXZvaWQgZXh0cmEgSFRUUCByZXF1ZXN0cy4gTGVhcm4gbW9yZSBhYm91dCBkYXRhIGNhY2hpbmdcbiAqIFtoZXJlXSgvZ3VpZGUvdW5pdmVyc2FsI2NhY2hpbmctZGF0YS13aGVuLXVzaW5nLWh0dHBjbGllbnQpLlxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhbGxvdyB5b3UgdG8gZGlzYWJsZSBzb21lIG9mIHRoZSBkZWZhdWx0IGZlYXR1cmVzIG9yIGNvbmZpZ3VyZSBmZWF0dXJlc1xuICogKiB7QGxpbmsgd2l0aE5vRG9tUmV1c2V9IHRvIGRpc2FibGUgRE9NIG5vZGVzIHJldXNlIGR1cmluZyBoeWRyYXRpb25cbiAqICoge0BsaW5rIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlfSB0byBkaXNhYmxlIEhUVFAgdHJhbnNmZXIgY2FjaGVcbiAqICoge0BsaW5rIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnN9IHRvIGNvbmZpZ3VyZSBzb21lIEhUVFAgdHJhbnNmZXIgY2FjaGUgb3B0aW9uc1xuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogQmFzaWMgZXhhbXBsZSBvZiBob3cgeW91IGNhbiBlbmFibGUgaHlkcmF0aW9uIGluIHlvdXIgYXBwbGljYXRpb24gd2hlblxuICogYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbiBpcyB1c2VkOlxuICogYGBgXG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihBcHBDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IGlmIHlvdSBhcmUgdXNpbmcgTmdNb2R1bGVzLCB5b3Ugd291bGQgYWRkIGBwcm92aWRlQ2xpZW50SHlkcmF0aW9uYFxuICogdG8geW91ciByb290IGFwcCBtb2R1bGUncyBwcm92aWRlciBsaXN0LlxuICogYGBgXG4gKiBATmdNb2R1bGUoe1xuICogICBkZWNsYXJhdGlvbnM6IFtSb290Q21wXSxcbiAqICAgYm9vdHN0cmFwOiBbUm9vdENtcF0sXG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVDbGllbnRIeWRyYXRpb24oKV0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgd2l0aE5vRG9tUmV1c2V9XG4gKiBAc2VlIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnN9XG4gKlxuICogQHBhcmFtIGZlYXR1cmVzIE9wdGlvbmFsIGZlYXR1cmVzIHRvIGNvbmZpZ3VyZSBhZGRpdGlvbmFsIHJvdXRlciBiZWhhdmlvcnMuXG4gKiBAcmV0dXJucyBBIHNldCBvZiBwcm92aWRlcnMgdG8gZW5hYmxlIGh5ZHJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsaWVudEh5ZHJhdGlvbiguLi5mZWF0dXJlczogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZD5bXSk6XG4gICAgRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXTtcbiAgY29uc3QgZmVhdHVyZXNLaW5kID0gbmV3IFNldDxIeWRyYXRpb25GZWF0dXJlS2luZD4oKTtcbiAgY29uc3QgaGFzSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zID1cbiAgICAgIGZlYXR1cmVzS2luZC5oYXMoSHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKTtcblxuICBmb3IgKGNvbnN0IHvJtXByb3ZpZGVycywgybVraW5kfSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmVzS2luZC5hZGQoybVraW5kKTtcblxuICAgIGlmICjJtXByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKMm1cHJvdmlkZXJzKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlICYmXG4gICAgICBmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpICYmIGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykge1xuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBhIHJ1bnRpbWUgZXJyb3JcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb25maWd1cmF0aW9uIGVycm9yOiBmb3VuZCBib3RoIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMoKSBhbmQgd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKSBpbiB0aGUgc2FtZSBjYWxsIHRvIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKSwgd2hpY2ggaXMgYSBjb250cmFkaWN0aW9uLicpO1xuICB9XG5cbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgIT09ICd1bmRlZmluZWQnICYmIG5nRGV2TW9kZSkgPyBwcm92aWRlWm9uZUpzQ29tcGF0aWJpbGl0eURldGVjdG9yKCkgOiBbXSxcbiAgICAoZmVhdHVyZXNLaW5kLmhhcyhIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0RvbVJldXNlRmVhdHVyZSkgPyBbXSA6IHdpdGhEb21IeWRyYXRpb24oKSksXG4gICAgKChmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpIHx8IGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykgP1xuICAgICAgICAgW10gOlxuICAgICAgICAgybV3aXRoSHR0cFRyYW5zZmVyQ2FjaGUoe30pKSxcbiAgICBwcm92aWRlcnMsXG4gIF0pO1xufVxuIl19