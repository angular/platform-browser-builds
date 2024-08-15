/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵwithHttpTransferCache } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, NgZone, ɵConsole as Console, ɵformatRuntimeError as formatRuntimeError, ɵwithDomHydration as withDomHydration, ɵwithEventReplay, ɵwithI18nSupport, } from '@angular/core';
/**
 * The list of features as an enum to uniquely type each `HydrationFeature`.
 * @see {@link HydrationFeature}
 *
 * @publicApi
 */
export var HydrationFeatureKind;
(function (HydrationFeatureKind) {
    HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
    HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
    HydrationFeatureKind[HydrationFeatureKind["I18nSupport"] = 2] = "I18nSupport";
    HydrationFeatureKind[HydrationFeatureKind["EventReplay"] = 3] = "EventReplay";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
/**
 * Helper function to create an object that represents a Hydration feature.
 */
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
    return { ɵkind, ɵproviders };
}
/**
 * Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
 * server and other one on the browser.
 *
 * @publicApi
 */
export function withNoHttpTransferCache() {
    // This feature has no providers and acts as a flag that turns off
    // HTTP transfer cache (which otherwise is turned on by default).
    return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
/**
 * The function accepts a an object, which allows to configure cache parameters,
 * such as which headers should be included (no headers are included by default),
 * wether POST requests should be cached or a callback function to determine if a
 * particular request should be cached.
 *
 * @publicApi
 */
export function withHttpTransferCacheOptions(options) {
    // This feature has no providers and acts as a flag to pass options to the HTTP transfer cache.
    return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, ɵwithHttpTransferCache(options));
}
/**
 * Enables support for hydrating i18n blocks.
 *
 * @developerPreview
 * @publicApi
 */
export function withI18nSupport() {
    return hydrationFeature(HydrationFeatureKind.I18nSupport, ɵwithI18nSupport());
}
/**
 * Enables support for replaying user events (e.g. `click`s) that happened on a page
 * before hydration logic has completed. Once an application is hydrated, all captured
 * events are replayed and relevant event listeners are executed.
 *
 * @usageNotes
 *
 * Basic example of how you can enable event replay in your application when
 * `bootstrapApplication` function is used:
 * ```
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration(withEventReplay())]
 * });
 * ```
 * @developerPreview
 * @publicApi
 * @see {@link provideClientHydration}
 */
export function withEventReplay() {
    return hydrationFeature(HydrationFeatureKind.EventReplay, ɵwithEventReplay());
}
/**
 * Returns an `ENVIRONMENT_INITIALIZER` token setup with a function
 * that verifies whether compatible ZoneJS was used in an application
 * and logs a warning in a console if it's not the case.
 */
function provideZoneJsCompatibilityDetector() {
    return [
        {
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
        },
    ];
}
/**
 * Sets up providers necessary to enable hydration functionality for the application.
 *
 * By default, the function enables the recommended set of features for the optimal
 * performance for most of the applications. It includes the following features:
 *
 * * Reconciling DOM hydration. Learn more about it [here](guide/hydration).
 * * [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
 * transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
 * [here](guide/ssr#caching-data-when-using-httpclient).
 *
 * These functions allow you to disable some of the default features or enable new ones:
 *
 * * {@link withNoHttpTransferCache} to disable HTTP transfer cache
 * * {@link withHttpTransferCacheOptions} to configure some HTTP transfer cache options
 * * {@link withI18nSupport} to enable hydration support for i18n blocks
 * * {@link withEventReplay} to enable support for replaying user events
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
 * @see {@link withNoHttpTransferCache}
 * @see {@link withHttpTransferCacheOptions}
 * @see {@link withI18nSupport}
 * @see {@link withEventReplay}
 *
 * @param features Optional features to configure additional router behaviors.
 * @returns A set of providers to enable hydration.
 *
 * @publicApi
 */
export function provideClientHydration(...features) {
    const providers = [];
    const featuresKind = new Set();
    const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
    for (const { ɵproviders, ɵkind } of features) {
        featuresKind.add(ɵkind);
        if (ɵproviders.length) {
            providers.push(ɵproviders);
        }
    }
    if (typeof ngDevMode !== 'undefined' &&
        ngDevMode &&
        featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) &&
        hasHttpTransferCacheOptions) {
        // TODO: Make this a runtime error
        throw new Error('Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    return makeEnvironmentProviders([
        typeof ngDevMode !== 'undefined' && ngDevMode ? provideZoneJsCompatibilityDetector() : [],
        withDomHydration(),
        featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions
            ? []
            : ɵwithHttpTransferCache({}),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBMkIsc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLE1BQU0sRUFDTix3QkFBd0IsRUFDeEIsTUFBTSxFQUVOLFFBQVEsSUFBSSxPQUFPLEVBQ25CLG1CQUFtQixJQUFJLGtCQUFrQixFQUN6QyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFDckMsZ0JBQWdCLEVBQ2hCLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUl2Qjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBTixJQUFZLG9CQUtYO0FBTEQsV0FBWSxvQkFBb0I7SUFDOUIsNkZBQW1CLENBQUE7SUFDbkIsdUdBQXdCLENBQUE7SUFDeEIsNkVBQVcsQ0FBQTtJQUNYLDZFQUFXLENBQUE7QUFDYixDQUFDLEVBTFcsb0JBQW9CLEtBQXBCLG9CQUFvQixRQUsvQjtBQVlEOztHQUVHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FDdkIsS0FBa0IsRUFDbEIsYUFBeUIsRUFBRSxFQUMzQixXQUFvQixFQUFFO0lBRXRCLE9BQU8sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QjtJQUNyQyxrRUFBa0U7SUFDbEUsaUVBQWlFO0lBQ2pFLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FDMUMsT0FBaUM7SUFFakMsK0ZBQStGO0lBQy9GLE9BQU8sZ0JBQWdCLENBQ3JCLG9CQUFvQixDQUFDLHdCQUF3QixFQUM3QyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FDaEMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxlQUFlO0lBQzdCLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxVQUFVLGVBQWU7SUFDN0IsT0FBTyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxrQ0FBa0M7SUFDekMsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUIsa0VBQWtFO2dCQUNsRSxtRUFBbUU7Z0JBQ25FLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsMkRBRWhDLGlFQUFpRTt3QkFDL0QsdURBQXVEO3dCQUN2RCxrREFBa0QsQ0FDckQsQ0FBQztvQkFDRixzQ0FBc0M7b0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7WUFDSCxDQUFDO1lBQ0QsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsR0FBRyxRQUFrRDtJQUVyRCxNQUFNLFNBQVMsR0FBZSxFQUFFLENBQUM7SUFDakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFDckQsTUFBTSwyQkFBMkIsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUNsRCxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FDOUMsQ0FBQztJQUVGLEtBQUssTUFBTSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMzQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFRCxJQUNFLE9BQU8sU0FBUyxLQUFLLFdBQVc7UUFDaEMsU0FBUztRQUNULFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUM7UUFDMUQsMkJBQTJCLEVBQzNCLENBQUM7UUFDRCxrQ0FBa0M7UUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDYixzS0FBc0ssQ0FDdkssQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDekYsZ0JBQWdCLEVBQUU7UUFDbEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDJCQUEyQjtZQUN2RixDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUM7UUFDOUIsU0FBUztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsIMm1d2l0aEh0dHBUcmFuc2ZlckNhY2hlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUixcbiAgRW52aXJvbm1lbnRQcm92aWRlcnMsXG4gIGluamVjdCxcbiAgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLFxuICBOZ1pvbmUsXG4gIFByb3ZpZGVyLFxuICDJtUNvbnNvbGUgYXMgQ29uc29sZSxcbiAgybVmb3JtYXRSdW50aW1lRXJyb3IgYXMgZm9ybWF0UnVudGltZUVycm9yLFxuICDJtXdpdGhEb21IeWRyYXRpb24gYXMgd2l0aERvbUh5ZHJhdGlvbixcbiAgybV3aXRoRXZlbnRSZXBsYXksXG4gIMm1d2l0aEkxOG5TdXBwb3J0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogVGhlIGxpc3Qgb2YgZmVhdHVyZXMgYXMgYW4gZW51bSB0byB1bmlxdWVseSB0eXBlIGVhY2ggYEh5ZHJhdGlvbkZlYXR1cmVgLlxuICogQHNlZSB7QGxpbmsgSHlkcmF0aW9uRmVhdHVyZX1cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIEh5ZHJhdGlvbkZlYXR1cmVLaW5kIHtcbiAgTm9IdHRwVHJhbnNmZXJDYWNoZSxcbiAgSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLFxuICBJMThuU3VwcG9ydCxcbiAgRXZlbnRSZXBsYXksXG59XG5cbi8qKlxuICogSGVscGVyIHR5cGUgdG8gcmVwcmVzZW50IGEgSHlkcmF0aW9uIGZlYXR1cmUuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEh5ZHJhdGlvbkZlYXR1cmU8RmVhdHVyZUtpbmQgZXh0ZW5kcyBIeWRyYXRpb25GZWF0dXJlS2luZD4ge1xuICDJtWtpbmQ6IEZlYXR1cmVLaW5kO1xuICDJtXByb3ZpZGVyczogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqL1xuZnVuY3Rpb24gaHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPihcbiAgybVraW5kOiBGZWF0dXJlS2luZCxcbiAgybVwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXSxcbiAgybVvcHRpb25zOiB1bmtub3duID0ge30sXG4pOiBIeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kPiB7XG4gIHJldHVybiB7ybVraW5kLCDJtXByb3ZpZGVyc307XG59XG5cbi8qKlxuICogRGlzYWJsZXMgSFRUUCB0cmFuc2ZlciBjYWNoZS4gRWZmZWN0aXZlbHkgY2F1c2VzIEhUVFAgcmVxdWVzdHMgdG8gYmUgcGVyZm9ybWVkIHR3aWNlOiBvbmNlIG9uIHRoZVxuICogc2VydmVyIGFuZCBvdGhlciBvbmUgb24gdGhlIGJyb3dzZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKTogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0aGF0IHR1cm5zIG9mZlxuICAvLyBIVFRQIHRyYW5zZmVyIGNhY2hlICh3aGljaCBvdGhlcndpc2UgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQpLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKTtcbn1cblxuLyoqXG4gKiBUaGUgZnVuY3Rpb24gYWNjZXB0cyBhIGFuIG9iamVjdCwgd2hpY2ggYWxsb3dzIHRvIGNvbmZpZ3VyZSBjYWNoZSBwYXJhbWV0ZXJzLFxuICogc3VjaCBhcyB3aGljaCBoZWFkZXJzIHNob3VsZCBiZSBpbmNsdWRlZCAobm8gaGVhZGVycyBhcmUgaW5jbHVkZWQgYnkgZGVmYXVsdCksXG4gKiB3ZXRoZXIgUE9TVCByZXF1ZXN0cyBzaG91bGQgYmUgY2FjaGVkIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGFcbiAqIHBhcnRpY3VsYXIgcmVxdWVzdCBzaG91bGQgYmUgY2FjaGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMoXG4gIG9wdGlvbnM6IEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbik6IEh5ZHJhdGlvbkZlYXR1cmU8SHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0byBwYXNzIG9wdGlvbnMgdG8gdGhlIEhUVFAgdHJhbnNmZXIgY2FjaGUuXG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKFxuICAgIEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbiAgICDJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZShvcHRpb25zKSxcbiAgKTtcbn1cblxuLyoqXG4gKiBFbmFibGVzIHN1cHBvcnQgZm9yIGh5ZHJhdGluZyBpMThuIGJsb2Nrcy5cbiAqXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEkxOG5TdXBwb3J0KCk6IEh5ZHJhdGlvbkZlYXR1cmU8SHlkcmF0aW9uRmVhdHVyZUtpbmQuSTE4blN1cHBvcnQ+IHtcbiAgcmV0dXJuIGh5ZHJhdGlvbkZlYXR1cmUoSHlkcmF0aW9uRmVhdHVyZUtpbmQuSTE4blN1cHBvcnQsIMm1d2l0aEkxOG5TdXBwb3J0KCkpO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgc3VwcG9ydCBmb3IgcmVwbGF5aW5nIHVzZXIgZXZlbnRzIChlLmcuIGBjbGlja2BzKSB0aGF0IGhhcHBlbmVkIG9uIGEgcGFnZVxuICogYmVmb3JlIGh5ZHJhdGlvbiBsb2dpYyBoYXMgY29tcGxldGVkLiBPbmNlIGFuIGFwcGxpY2F0aW9uIGlzIGh5ZHJhdGVkLCBhbGwgY2FwdHVyZWRcbiAqIGV2ZW50cyBhcmUgcmVwbGF5ZWQgYW5kIHJlbGV2YW50IGV2ZW50IGxpc3RlbmVycyBhcmUgZXhlY3V0ZWQuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBCYXNpYyBleGFtcGxlIG9mIGhvdyB5b3UgY2FuIGVuYWJsZSBldmVudCByZXBsYXkgaW4geW91ciBhcHBsaWNhdGlvbiB3aGVuXG4gKiBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQ6XG4gKiBgYGBcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtwcm92aWRlQ2xpZW50SHlkcmF0aW9uKHdpdGhFdmVudFJlcGxheSgpKV1cbiAqIH0pO1xuICogYGBgXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICogQHB1YmxpY0FwaVxuICogQHNlZSB7QGxpbmsgcHJvdmlkZUNsaWVudEh5ZHJhdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhFdmVudFJlcGxheSgpOiBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkV2ZW50UmVwbGF5PiB7XG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkV2ZW50UmVwbGF5LCDJtXdpdGhFdmVudFJlcGxheSgpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUmAgdG9rZW4gc2V0dXAgd2l0aCBhIGZ1bmN0aW9uXG4gKiB0aGF0IHZlcmlmaWVzIHdoZXRoZXIgY29tcGF0aWJsZSBab25lSlMgd2FzIHVzZWQgaW4gYW4gYXBwbGljYXRpb25cbiAqIGFuZCBsb2dzIGEgd2FybmluZyBpbiBhIGNvbnNvbGUgaWYgaXQncyBub3QgdGhlIGNhc2UuXG4gKi9cbmZ1bmN0aW9uIHByb3ZpZGVab25lSnNDb21wYXRpYmlsaXR5RGV0ZWN0b3IoKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgICB1c2VWYWx1ZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgICAgICAgLy8gQ2hlY2tpbmcgYG5nWm9uZSBpbnN0YW5jZW9mIE5nWm9uZWAgd291bGQgYmUgaW5zdWZmaWNpZW50IGhlcmUsXG4gICAgICAgIC8vIGJlY2F1c2UgY3VzdG9tIGltcGxlbWVudGF0aW9ucyBtaWdodCB1c2UgTmdab25lIGFzIGEgYmFzZSBjbGFzcy5cbiAgICAgICAgaWYgKG5nWm9uZS5jb25zdHJ1Y3RvciAhPT0gTmdab25lKSB7XG4gICAgICAgICAgY29uc3QgY29uc29sZSA9IGluamVjdChDb25zb2xlKTtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZm9ybWF0UnVudGltZUVycm9yKFxuICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5VTlNVUFBPUlRFRF9aT05FSlNfSU5TVEFOQ0UsXG4gICAgICAgICAgICAnQW5ndWxhciBkZXRlY3RlZCB0aGF0IGh5ZHJhdGlvbiB3YXMgZW5hYmxlZCBmb3IgYW4gYXBwbGljYXRpb24gJyArXG4gICAgICAgICAgICAgICd0aGF0IHVzZXMgYSBjdXN0b20gb3IgYSBub29wIFpvbmUuanMgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgICAnVGhpcyBpcyBub3QgeWV0IGEgZnVsbHkgc3VwcG9ydGVkIGNvbmZpZ3VyYXRpb24uJyxcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXTtcbn1cblxuLyoqXG4gKiBTZXRzIHVwIHByb3ZpZGVycyBuZWNlc3NhcnkgdG8gZW5hYmxlIGh5ZHJhdGlvbiBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIGZ1bmN0aW9uIGVuYWJsZXMgdGhlIHJlY29tbWVuZGVkIHNldCBvZiBmZWF0dXJlcyBmb3IgdGhlIG9wdGltYWxcbiAqIHBlcmZvcm1hbmNlIGZvciBtb3N0IG9mIHRoZSBhcHBsaWNhdGlvbnMuIEl0IGluY2x1ZGVzIHRoZSBmb2xsb3dpbmcgZmVhdHVyZXM6XG4gKlxuICogKiBSZWNvbmNpbGluZyBET00gaHlkcmF0aW9uLiBMZWFybiBtb3JlIGFib3V0IGl0IFtoZXJlXShndWlkZS9oeWRyYXRpb24pLlxuICogKiBbYEh0dHBDbGllbnRgXShhcGkvY29tbW9uL2h0dHAvSHR0cENsaWVudCkgcmVzcG9uc2UgY2FjaGluZyB3aGlsZSBydW5uaW5nIG9uIHRoZSBzZXJ2ZXIgYW5kXG4gKiB0cmFuc2ZlcnJpbmcgdGhpcyBjYWNoZSB0byB0aGUgY2xpZW50IHRvIGF2b2lkIGV4dHJhIEhUVFAgcmVxdWVzdHMuIExlYXJuIG1vcmUgYWJvdXQgZGF0YSBjYWNoaW5nXG4gKiBbaGVyZV0oZ3VpZGUvc3NyI2NhY2hpbmctZGF0YS13aGVuLXVzaW5nLWh0dHBjbGllbnQpLlxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhbGxvdyB5b3UgdG8gZGlzYWJsZSBzb21lIG9mIHRoZSBkZWZhdWx0IGZlYXR1cmVzIG9yIGVuYWJsZSBuZXcgb25lczpcbiAqXG4gKiAqIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX0gdG8gZGlzYWJsZSBIVFRQIHRyYW5zZmVyIGNhY2hlXG4gKiAqIHtAbGluayB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zfSB0byBjb25maWd1cmUgc29tZSBIVFRQIHRyYW5zZmVyIGNhY2hlIG9wdGlvbnNcbiAqICoge0BsaW5rIHdpdGhJMThuU3VwcG9ydH0gdG8gZW5hYmxlIGh5ZHJhdGlvbiBzdXBwb3J0IGZvciBpMThuIGJsb2Nrc1xuICogKiB7QGxpbmsgd2l0aEV2ZW50UmVwbGF5fSB0byBlbmFibGUgc3VwcG9ydCBmb3IgcmVwbGF5aW5nIHVzZXIgZXZlbnRzXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBCYXNpYyBleGFtcGxlIG9mIGhvdyB5b3UgY2FuIGVuYWJsZSBoeWRyYXRpb24gaW4geW91ciBhcHBsaWNhdGlvbiB3aGVuXG4gKiBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQ6XG4gKiBgYGBcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtwcm92aWRlQ2xpZW50SHlkcmF0aW9uKCldXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEFsdGVybmF0aXZlbHkgaWYgeW91IGFyZSB1c2luZyBOZ01vZHVsZXMsIHlvdSB3b3VsZCBhZGQgYHByb3ZpZGVDbGllbnRIeWRyYXRpb25gXG4gKiB0byB5b3VyIHJvb3QgYXBwIG1vZHVsZSdzIHByb3ZpZGVyIGxpc3QuXG4gKiBgYGBcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGRlY2xhcmF0aW9uczogW1Jvb3RDbXBdLFxuICogICBib290c3RyYXA6IFtSb290Q21wXSxcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnN9XG4gKiBAc2VlIHtAbGluayB3aXRoSTE4blN1cHBvcnR9XG4gKiBAc2VlIHtAbGluayB3aXRoRXZlbnRSZXBsYXl9XG4gKlxuICogQHBhcmFtIGZlYXR1cmVzIE9wdGlvbmFsIGZlYXR1cmVzIHRvIGNvbmZpZ3VyZSBhZGRpdGlvbmFsIHJvdXRlciBiZWhhdmlvcnMuXG4gKiBAcmV0dXJucyBBIHNldCBvZiBwcm92aWRlcnMgdG8gZW5hYmxlIGh5ZHJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ2xpZW50SHlkcmF0aW9uKFxuICAuLi5mZWF0dXJlczogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZD5bXVxuKTogRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXTtcbiAgY29uc3QgZmVhdHVyZXNLaW5kID0gbmV3IFNldDxIeWRyYXRpb25GZWF0dXJlS2luZD4oKTtcbiAgY29uc3QgaGFzSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zID0gZmVhdHVyZXNLaW5kLmhhcyhcbiAgICBIeWRyYXRpb25GZWF0dXJlS2luZC5IdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsXG4gICk7XG5cbiAgZm9yIChjb25zdCB7ybVwcm92aWRlcnMsIMm1a2luZH0gb2YgZmVhdHVyZXMpIHtcbiAgICBmZWF0dXJlc0tpbmQuYWRkKMm1a2luZCk7XG5cbiAgICBpZiAoybVwcm92aWRlcnMubGVuZ3RoKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCjJtXByb3ZpZGVycyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiBuZ0Rldk1vZGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgbmdEZXZNb2RlICYmXG4gICAgZmVhdHVyZXNLaW5kLmhhcyhIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKSAmJlxuICAgIGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9uc1xuICApIHtcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBydW50aW1lIGVycm9yXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0NvbmZpZ3VyYXRpb24gZXJyb3I6IGZvdW5kIGJvdGggd2l0aEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucygpIGFuZCB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZSgpIGluIHRoZSBzYW1lIGNhbGwgdG8gcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpLCB3aGljaCBpcyBhIGNvbnRyYWRpY3Rpb24uJyxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAgdHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlID8gcHJvdmlkZVpvbmVKc0NvbXBhdGliaWxpdHlEZXRlY3RvcigpIDogW10sXG4gICAgd2l0aERvbUh5ZHJhdGlvbigpLFxuICAgIGZlYXR1cmVzS2luZC5oYXMoSHlkcmF0aW9uRmVhdHVyZUtpbmQuTm9IdHRwVHJhbnNmZXJDYWNoZSkgfHwgaGFzSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zXG4gICAgICA/IFtdXG4gICAgICA6IMm1d2l0aEh0dHBUcmFuc2ZlckNhY2hlKHt9KSxcbiAgICBwcm92aWRlcnMsXG4gIF0pO1xufVxuIl19