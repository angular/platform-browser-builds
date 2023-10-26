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
 * The list of features as an enum to uniquely type each `HydrationFeature`.
 * @see {@link HydrationFeature}
 *
 * @publicApi
 */
export var HydrationFeatureKind;
(function (HydrationFeatureKind) {
    HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
    HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
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
 * performance for most of the applications. It includes the following features:
 *
 * * Reconciling DOM hydration. Learn more about it [here](guide/hydration).
 * * [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
 * transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
 * [here](/guide/ssr#caching-data-when-using-httpclient).
 *
 * These functions allow you to disable some of the default features or configure features
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
 * @see {@link withNoHttpTransferCache}
 * @see {@link withHttpTransferCacheOptions}
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
    if (typeof ngDevMode !== 'undefined' && ngDevMode &&
        featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) {
        // TODO: Make this a runtime error
        throw new Error('Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    return makeEnvironmentProviders([
        (typeof ngDevMode !== 'undefined' && ngDevMode) ? provideZoneJsCompatibilityDetector() : [],
        withDomHydration(),
        ((featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions) ?
            [] :
            ɵwithHttpTransferCache({})),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBMkIsc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsdUJBQXVCLEVBQXdCLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQVksUUFBUSxJQUFJLE9BQU8sRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsR0FBRSxNQUFNLGVBQWUsQ0FBQztBQUl4Tzs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBTixJQUFZLG9CQUdYO0FBSEQsV0FBWSxvQkFBb0I7SUFDOUIsNkZBQW1CLENBQUE7SUFDbkIsdUdBQXdCLENBQUE7QUFDMUIsQ0FBQyxFQUhXLG9CQUFvQixLQUFwQixvQkFBb0IsUUFHL0I7QUFZRDs7R0FFRztBQUNILFNBQVMsZ0JBQWdCLENBQ3JCLEtBQWtCLEVBQUUsYUFBeUIsRUFBRSxFQUMvQyxXQUFvQixFQUFFO0lBQ3hCLE9BQU8sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QjtJQUVyQyxrRUFBa0U7SUFDbEUsaUVBQWlFO0lBQ2pFLE9BQU8sZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSw0QkFBNEIsQ0FDeEMsT0FBaUM7SUFFbkMsK0ZBQStGO0lBQy9GLE9BQU8sZ0JBQWdCLENBQ25CLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEYsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtDQUFrQztJQUN6QyxPQUFPLENBQUM7WUFDTixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixrRUFBa0U7Z0JBQ2xFLG1FQUFtRTtnQkFDbkUsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtvQkFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsMkRBRTlCLGlFQUFpRTt3QkFDN0QsdURBQXVEO3dCQUN2RCxrREFBa0QsQ0FBQyxDQUFDO29CQUM1RCxzQ0FBc0M7b0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBQ0gsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEdBQUcsUUFBa0Q7SUFFMUYsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO0lBQ3JELE1BQU0sMkJBQTJCLEdBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUVwRSxLQUFLLE1BQU0sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLElBQUksUUFBUSxFQUFFO1FBQzFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDNUI7S0FDRjtJQUVELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVM7UUFDN0MsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDJCQUEyQixFQUFFO1FBQzdGLGtDQUFrQztRQUNsQyxNQUFNLElBQUksS0FBSyxDQUNYLHNLQUFzSyxDQUFDLENBQUM7S0FDN0s7SUFFRCxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNGLGdCQUFnQixFQUFFO1FBQ2xCLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLElBQUksMkJBQTJCLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLEVBQUUsQ0FBQyxDQUFDO1lBQ0osc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsU0FBUztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsIMm1d2l0aEh0dHBUcmFuc2ZlckNhY2hlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0VOVklST05NRU5UX0lOSVRJQUxJWkVSLCBFbnZpcm9ubWVudFByb3ZpZGVycywgaW5qZWN0LCBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMsIE5nWm9uZSwgUHJvdmlkZXIsIMm1Q29uc29sZSBhcyBDb25zb2xlLCDJtWZvcm1hdFJ1bnRpbWVFcnJvciBhcyBmb3JtYXRSdW50aW1lRXJyb3IsIMm1d2l0aERvbUh5ZHJhdGlvbiBhcyB3aXRoRG9tSHlkcmF0aW9uLH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIGZlYXR1cmVzIGFzIGFuIGVudW0gdG8gdW5pcXVlbHkgdHlwZSBlYWNoIGBIeWRyYXRpb25GZWF0dXJlYC5cbiAqIEBzZWUge0BsaW5rIEh5ZHJhdGlvbkZlYXR1cmV9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZW51bSBIeWRyYXRpb25GZWF0dXJlS2luZCB7XG4gIE5vSHR0cFRyYW5zZmVyQ2FjaGUsXG4gIEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbn1cblxuLyoqXG4gKiBIZWxwZXIgdHlwZSB0byByZXByZXNlbnQgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPiB7XG4gIMm1a2luZDogRmVhdHVyZUtpbmQ7XG4gIMm1cHJvdmlkZXJzOiBQcm92aWRlcltdO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIEh5ZHJhdGlvbiBmZWF0dXJlLlxuICovXG5mdW5jdGlvbiBoeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kIGV4dGVuZHMgSHlkcmF0aW9uRmVhdHVyZUtpbmQ+KFxuICAgIMm1a2luZDogRmVhdHVyZUtpbmQsIMm1cHJvdmlkZXJzOiBQcm92aWRlcltdID0gW10sXG4gICAgybVvcHRpb25zOiB1bmtub3duID0ge30pOiBIeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kPiB7XG4gIHJldHVybiB7ybVraW5kLCDJtXByb3ZpZGVyc307XG59XG5cbi8qKlxuICogRGlzYWJsZXMgSFRUUCB0cmFuc2ZlciBjYWNoZS4gRWZmZWN0aXZlbHkgY2F1c2VzIEhUVFAgcmVxdWVzdHMgdG8gYmUgcGVyZm9ybWVkIHR3aWNlOiBvbmNlIG9uIHRoZVxuICogc2VydmVyIGFuZCBvdGhlciBvbmUgb24gdGhlIGJyb3dzZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKTpcbiAgICBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGU+IHtcbiAgLy8gVGhpcyBmZWF0dXJlIGhhcyBubyBwcm92aWRlcnMgYW5kIGFjdHMgYXMgYSBmbGFnIHRoYXQgdHVybnMgb2ZmXG4gIC8vIEhUVFAgdHJhbnNmZXIgY2FjaGUgKHdoaWNoIG90aGVyd2lzZSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdCkuXG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpO1xufVxuXG4vKipcbiAqIFRoZSBmdW5jdGlvbiBhY2NlcHRzIGEgYW4gb2JqZWN0LCB3aGljaCBhbGxvd3MgdG8gY29uZmlndXJlIGNhY2hlIHBhcmFtZXRlcnMsXG4gKiBzdWNoIGFzIHdoaWNoIGhlYWRlcnMgc2hvdWxkIGJlIGluY2x1ZGVkIChubyBoZWFkZXJzIGFyZSBpbmNsdWRlZCBieSBkZWZhdWx0KSxcbiAqIHdldGhlciBQT1NUIHJlcXVlc3RzIHNob3VsZCBiZSBjYWNoZWQgb3IgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgYVxuICogcGFydGljdWxhciByZXF1ZXN0IHNob3VsZCBiZSBjYWNoZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyhcbiAgICBvcHRpb25zOiBIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsXG4gICAgKTogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZC5IdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnM+IHtcbiAgLy8gVGhpcyBmZWF0dXJlIGhhcyBubyBwcm92aWRlcnMgYW5kIGFjdHMgYXMgYSBmbGFnIHRvIHBhc3Mgb3B0aW9ucyB0byB0aGUgSFRUUCB0cmFuc2ZlciBjYWNoZS5cbiAgcmV0dXJuIGh5ZHJhdGlvbkZlYXR1cmUoXG4gICAgICBIeWRyYXRpb25GZWF0dXJlS2luZC5IdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMsIMm1d2l0aEh0dHBUcmFuc2ZlckNhY2hlKG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUmAgdG9rZW4gc2V0dXAgd2l0aCBhIGZ1bmN0aW9uXG4gKiB0aGF0IHZlcmlmaWVzIHdoZXRoZXIgY29tcGF0aWJsZSBab25lSlMgd2FzIHVzZWQgaW4gYW4gYXBwbGljYXRpb25cbiAqIGFuZCBsb2dzIGEgd2FybmluZyBpbiBhIGNvbnNvbGUgaWYgaXQncyBub3QgdGhlIGNhc2UuXG4gKi9cbmZ1bmN0aW9uIHByb3ZpZGVab25lSnNDb21wYXRpYmlsaXR5RGV0ZWN0b3IoKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbe1xuICAgIHByb3ZpZGU6IEVOVklST05NRU5UX0lOSVRJQUxJWkVSLFxuICAgIHVzZVZhbHVlOiAoKSA9PiB7XG4gICAgICBjb25zdCBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgICAgIC8vIENoZWNraW5nIGBuZ1pvbmUgaW5zdGFuY2VvZiBOZ1pvbmVgIHdvdWxkIGJlIGluc3VmZmljaWVudCBoZXJlLFxuICAgICAgLy8gYmVjYXVzZSBjdXN0b20gaW1wbGVtZW50YXRpb25zIG1pZ2h0IHVzZSBOZ1pvbmUgYXMgYSBiYXNlIGNsYXNzLlxuICAgICAgaWYgKG5nWm9uZS5jb25zdHJ1Y3RvciAhPT0gTmdab25lKSB7XG4gICAgICAgIGNvbnN0IGNvbnNvbGUgPSBpbmplY3QoQ29uc29sZSk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBmb3JtYXRSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlVOU1VQUE9SVEVEX1pPTkVKU19JTlNUQU5DRSxcbiAgICAgICAgICAgICdBbmd1bGFyIGRldGVjdGVkIHRoYXQgaHlkcmF0aW9uIHdhcyBlbmFibGVkIGZvciBhbiBhcHBsaWNhdGlvbiAnICtcbiAgICAgICAgICAgICAgICAndGhhdCB1c2VzIGEgY3VzdG9tIG9yIGEgbm9vcCBab25lLmpzIGltcGxlbWVudGF0aW9uLiAnICtcbiAgICAgICAgICAgICAgICAnVGhpcyBpcyBub3QgeWV0IGEgZnVsbHkgc3VwcG9ydGVkIGNvbmZpZ3VyYXRpb24uJyk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG11bHRpOiB0cnVlLFxuICB9XTtcbn1cblxuLyoqXG4gKiBTZXRzIHVwIHByb3ZpZGVycyBuZWNlc3NhcnkgdG8gZW5hYmxlIGh5ZHJhdGlvbiBmdW5jdGlvbmFsaXR5IGZvciB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIGZ1bmN0aW9uIGVuYWJsZXMgdGhlIHJlY29tbWVuZGVkIHNldCBvZiBmZWF0dXJlcyBmb3IgdGhlIG9wdGltYWxcbiAqIHBlcmZvcm1hbmNlIGZvciBtb3N0IG9mIHRoZSBhcHBsaWNhdGlvbnMuIEl0IGluY2x1ZGVzIHRoZSBmb2xsb3dpbmcgZmVhdHVyZXM6XG4gKlxuICogKiBSZWNvbmNpbGluZyBET00gaHlkcmF0aW9uLiBMZWFybiBtb3JlIGFib3V0IGl0IFtoZXJlXShndWlkZS9oeWRyYXRpb24pLlxuICogKiBbYEh0dHBDbGllbnRgXShhcGkvY29tbW9uL2h0dHAvSHR0cENsaWVudCkgcmVzcG9uc2UgY2FjaGluZyB3aGlsZSBydW5uaW5nIG9uIHRoZSBzZXJ2ZXIgYW5kXG4gKiB0cmFuc2ZlcnJpbmcgdGhpcyBjYWNoZSB0byB0aGUgY2xpZW50IHRvIGF2b2lkIGV4dHJhIEhUVFAgcmVxdWVzdHMuIExlYXJuIG1vcmUgYWJvdXQgZGF0YSBjYWNoaW5nXG4gKiBbaGVyZV0oL2d1aWRlL3NzciNjYWNoaW5nLWRhdGEtd2hlbi11c2luZy1odHRwY2xpZW50KS5cbiAqXG4gKiBUaGVzZSBmdW5jdGlvbnMgYWxsb3cgeW91IHRvIGRpc2FibGUgc29tZSBvZiB0aGUgZGVmYXVsdCBmZWF0dXJlcyBvciBjb25maWd1cmUgZmVhdHVyZXNcbiAqICoge0BsaW5rIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlfSB0byBkaXNhYmxlIEhUVFAgdHJhbnNmZXIgY2FjaGVcbiAqICoge0BsaW5rIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnN9IHRvIGNvbmZpZ3VyZSBzb21lIEhUVFAgdHJhbnNmZXIgY2FjaGUgb3B0aW9uc1xuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogQmFzaWMgZXhhbXBsZSBvZiBob3cgeW91IGNhbiBlbmFibGUgaHlkcmF0aW9uIGluIHlvdXIgYXBwbGljYXRpb24gd2hlblxuICogYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbiBpcyB1c2VkOlxuICogYGBgXG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihBcHBDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IGlmIHlvdSBhcmUgdXNpbmcgTmdNb2R1bGVzLCB5b3Ugd291bGQgYWRkIGBwcm92aWRlQ2xpZW50SHlkcmF0aW9uYFxuICogdG8geW91ciByb290IGFwcCBtb2R1bGUncyBwcm92aWRlciBsaXN0LlxuICogYGBgXG4gKiBATmdNb2R1bGUoe1xuICogICBkZWNsYXJhdGlvbnM6IFtSb290Q21wXSxcbiAqICAgYm9vdHN0cmFwOiBbUm9vdENtcF0sXG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVDbGllbnRIeWRyYXRpb24oKV0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGV9XG4gKiBAc2VlIHtAbGluayB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zfVxuICpcbiAqIEBwYXJhbSBmZWF0dXJlcyBPcHRpb25hbCBmZWF0dXJlcyB0byBjb25maWd1cmUgYWRkaXRpb25hbCByb3V0ZXIgYmVoYXZpb3JzLlxuICogQHJldHVybnMgQSBzZXQgb2YgcHJvdmlkZXJzIHRvIGVuYWJsZSBoeWRyYXRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsaWVudEh5ZHJhdGlvbiguLi5mZWF0dXJlczogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZD5bXSk6XG4gICAgRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXTtcbiAgY29uc3QgZmVhdHVyZXNLaW5kID0gbmV3IFNldDxIeWRyYXRpb25GZWF0dXJlS2luZD4oKTtcbiAgY29uc3QgaGFzSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zID1cbiAgICAgIGZlYXR1cmVzS2luZC5oYXMoSHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKTtcblxuICBmb3IgKGNvbnN0IHvJtXByb3ZpZGVycywgybVraW5kfSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmVzS2luZC5hZGQoybVraW5kKTtcblxuICAgIGlmICjJtXByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKMm1cHJvdmlkZXJzKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlICYmXG4gICAgICBmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpICYmIGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykge1xuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBhIHJ1bnRpbWUgZXJyb3JcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb25maWd1cmF0aW9uIGVycm9yOiBmb3VuZCBib3RoIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMoKSBhbmQgd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKSBpbiB0aGUgc2FtZSBjYWxsIHRvIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKSwgd2hpY2ggaXMgYSBjb250cmFkaWN0aW9uLicpO1xuICB9XG5cbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgIT09ICd1bmRlZmluZWQnICYmIG5nRGV2TW9kZSkgPyBwcm92aWRlWm9uZUpzQ29tcGF0aWJpbGl0eURldGVjdG9yKCkgOiBbXSxcbiAgICB3aXRoRG9tSHlkcmF0aW9uKCksXG4gICAgKChmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpIHx8IGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykgP1xuICAgICAgICAgW10gOlxuICAgICAgICAgybV3aXRoSHR0cFRyYW5zZmVyQ2FjaGUoe30pKSxcbiAgICBwcm92aWRlcnMsXG4gIF0pO1xufVxuIl19