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
 * Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
 * server and other one on the browser.
 *
 * @publicApi
 * @developerPreview
 */
export function withNoHttpTransferCache() {
    // This feature has no providers and acts as a flag that turns off
    // HTTP transfer cache (which otherwise is turned on by default).
    return hydrationFeature(0 /* HydrationFeatureKind.NoHttpTransferCache */);
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
    return hydrationFeature(1 /* HydrationFeatureKind.HttpTransferCacheOptions */, ɵwithHttpTransferCache(options));
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
 * [here](/guide/universal#caching-data-when-using-httpclient).
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
 * @developerPreview
 */
export function provideClientHydration(...features) {
    const providers = [];
    const featuresKind = new Set();
    const hasHttpTransferCacheOptions = featuresKind.has(1 /* HydrationFeatureKind.HttpTransferCacheOptions */);
    for (const { ɵproviders, ɵkind } of features) {
        featuresKind.add(ɵkind);
        if (ɵproviders.length) {
            providers.push(ɵproviders);
        }
    }
    if (typeof ngDevMode !== 'undefined' && ngDevMode &&
        featuresKind.has(0 /* HydrationFeatureKind.NoHttpTransferCache */) && hasHttpTransferCacheOptions) {
        // TODO: Make this a runtime error
        throw new Error('Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    return makeEnvironmentProviders([
        (typeof ngDevMode !== 'undefined' && ngDevMode) ? provideZoneJsCompatibilityDetector() : [],
        withDomHydration(),
        ((featuresKind.has(0 /* HydrationFeatureKind.NoHttpTransferCache */) || hasHttpTransferCacheOptions) ?
            [] :
            ɵwithHttpTransferCache({})),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBMkIsc0JBQXNCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsdUJBQXVCLEVBQXdCLE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLEVBQVksUUFBUSxJQUFJLE9BQU8sRUFBRSxtQkFBbUIsSUFBSSxrQkFBa0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsR0FBRSxNQUFNLGVBQWUsQ0FBQztBQTJCeE87O0dBRUc7QUFDSCxTQUFTLGdCQUFnQixDQUNyQixLQUFrQixFQUFFLGFBQXlCLEVBQUUsRUFDL0MsV0FBb0IsRUFBRTtJQUN4QixPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzdCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCO0lBRXJDLGtFQUFrRTtJQUNsRSxpRUFBaUU7SUFDakUsT0FBTyxnQkFBZ0Isa0RBQTBDLENBQUM7QUFDcEUsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLDRCQUE0QixDQUN4QyxPQUFpQztJQUVuQywrRkFBK0Y7SUFDL0YsT0FBTyxnQkFBZ0Isd0RBQzRCLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEYsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtDQUFrQztJQUN6QyxPQUFPLENBQUM7WUFDTixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixrRUFBa0U7Z0JBQ2xFLG1FQUFtRTtnQkFDbkUsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtvQkFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsMkRBRTlCLGlFQUFpRTt3QkFDN0QsdURBQXVEO3dCQUN2RCxrREFBa0QsQ0FBQyxDQUFDO29CQUM1RCxzQ0FBc0M7b0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxHQUFHLFFBQWtEO0lBRTFGLE1BQU0sU0FBUyxHQUFlLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUNyRCxNQUFNLDJCQUEyQixHQUM3QixZQUFZLENBQUMsR0FBRyx1REFBK0MsQ0FBQztJQUVwRSxLQUFLLE1BQU0sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLElBQUksUUFBUSxFQUFFO1FBQzFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDNUI7S0FDRjtJQUVELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVM7UUFDN0MsWUFBWSxDQUFDLEdBQUcsa0RBQTBDLElBQUksMkJBQTJCLEVBQUU7UUFDN0Ysa0NBQWtDO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsc0tBQXNLLENBQUMsQ0FBQztLQUM3SztJQUVELE9BQU8sd0JBQXdCLENBQUM7UUFDOUIsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDM0YsZ0JBQWdCLEVBQUU7UUFDbEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLGtEQUEwQyxJQUFJLDJCQUEyQixDQUFDLENBQUMsQ0FBQztZQUN6RixFQUFFLENBQUMsQ0FBQztZQUNKLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLFNBQVM7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLCDJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtFTlZJUk9OTUVOVF9JTklUSUFMSVpFUiwgRW52aXJvbm1lbnRQcm92aWRlcnMsIGluamVjdCwgbWFrZUVudmlyb25tZW50UHJvdmlkZXJzLCBOZ1pvbmUsIFByb3ZpZGVyLCDJtUNvbnNvbGUgYXMgQ29uc29sZSwgybVmb3JtYXRSdW50aW1lRXJyb3IgYXMgZm9ybWF0UnVudGltZUVycm9yLCDJtXdpdGhEb21IeWRyYXRpb24gYXMgd2l0aERvbUh5ZHJhdGlvbix9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiBmZWF0dXJlcyBhcyBhbiBlbnVtIHRvIHVuaXF1ZWx5IHR5cGUgZWFjaCBgSHlkcmF0aW9uRmVhdHVyZWAuXG4gKiBAc2VlIHtAbGluayBIeWRyYXRpb25GZWF0dXJlfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEh5ZHJhdGlvbkZlYXR1cmVLaW5kIHtcbiAgTm9IdHRwVHJhbnNmZXJDYWNoZSxcbiAgSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zLFxufVxuXG4vKipcbiAqIEhlbHBlciB0eXBlIHRvIHJlcHJlc2VudCBhIEh5ZHJhdGlvbiBmZWF0dXJlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPiB7XG4gIMm1a2luZDogRmVhdHVyZUtpbmQ7XG4gIMm1cHJvdmlkZXJzOiBQcm92aWRlcltdO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBjcmVhdGUgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIEh5ZHJhdGlvbiBmZWF0dXJlLlxuICovXG5mdW5jdGlvbiBoeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kIGV4dGVuZHMgSHlkcmF0aW9uRmVhdHVyZUtpbmQ+KFxuICAgIMm1a2luZDogRmVhdHVyZUtpbmQsIMm1cHJvdmlkZXJzOiBQcm92aWRlcltdID0gW10sXG4gICAgybVvcHRpb25zOiB1bmtub3duID0ge30pOiBIeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kPiB7XG4gIHJldHVybiB7ybVraW5kLCDJtXByb3ZpZGVyc307XG59XG5cbi8qKlxuICogRGlzYWJsZXMgSFRUUCB0cmFuc2ZlciBjYWNoZS4gRWZmZWN0aXZlbHkgY2F1c2VzIEhUVFAgcmVxdWVzdHMgdG8gYmUgcGVyZm9ybWVkIHR3aWNlOiBvbmNlIG9uIHRoZVxuICogc2VydmVyIGFuZCBvdGhlciBvbmUgb24gdGhlIGJyb3dzZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhOb0h0dHBUcmFuc2ZlckNhY2hlKCk6XG4gICAgSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlPiB7XG4gIC8vIFRoaXMgZmVhdHVyZSBoYXMgbm8gcHJvdmlkZXJzIGFuZCBhY3RzIGFzIGEgZmxhZyB0aGF0IHR1cm5zIG9mZlxuICAvLyBIVFRQIHRyYW5zZmVyIGNhY2hlICh3aGljaCBvdGhlcndpc2UgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHQpLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKTtcbn1cblxuLyoqXG4gKiBUaGUgZnVuY3Rpb24gYWNjZXB0cyBhIGFuIG9iamVjdCwgd2hpY2ggYWxsb3dzIHRvIGNvbmZpZ3VyZSBjYWNoZSBwYXJhbWV0ZXJzLFxuICogc3VjaCBhcyB3aGljaCBoZWFkZXJzIHNob3VsZCBiZSBpbmNsdWRlZCAobm8gaGVhZGVycyBhcmUgaW5jbHVkZWQgYnkgZGVmYXVsdCksXG4gKiB3ZXRoZXIgUE9TVCByZXF1ZXN0cyBzaG91bGQgYmUgY2FjaGVkIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGFcbiAqIHBhcnRpY3VsYXIgcmVxdWVzdCBzaG91bGQgYmUgY2FjaGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKFxuICAgIG9wdGlvbnM6IEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucyxcbiAgICApOiBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucz4ge1xuICAvLyBUaGlzIGZlYXR1cmUgaGFzIG5vIHByb3ZpZGVycyBhbmQgYWN0cyBhcyBhIGZsYWcgdG8gcGFzcyBvcHRpb25zIHRvIHRoZSBIVFRQIHRyYW5zZmVyIGNhY2hlLlxuICByZXR1cm4gaHlkcmF0aW9uRmVhdHVyZShcbiAgICAgIEh5ZHJhdGlvbkZlYXR1cmVLaW5kLkh0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucywgybV3aXRoSHR0cFRyYW5zZmVyQ2FjaGUob3B0aW9ucykpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYEVOVklST05NRU5UX0lOSVRJQUxJWkVSYCB0b2tlbiBzZXR1cCB3aXRoIGEgZnVuY3Rpb25cbiAqIHRoYXQgdmVyaWZpZXMgd2hldGhlciBjb21wYXRpYmxlIFpvbmVKUyB3YXMgdXNlZCBpbiBhbiBhcHBsaWNhdGlvblxuICogYW5kIGxvZ3MgYSB3YXJuaW5nIGluIGEgY29uc29sZSBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqL1xuZnVuY3Rpb24gcHJvdmlkZVpvbmVKc0NvbXBhdGliaWxpdHlEZXRlY3RvcigpOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFt7XG4gICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgdXNlVmFsdWU6ICgpID0+IHtcbiAgICAgIGNvbnN0IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgICAgLy8gQ2hlY2tpbmcgYG5nWm9uZSBpbnN0YW5jZW9mIE5nWm9uZWAgd291bGQgYmUgaW5zdWZmaWNpZW50IGhlcmUsXG4gICAgICAvLyBiZWNhdXNlIGN1c3RvbSBpbXBsZW1lbnRhdGlvbnMgbWlnaHQgdXNlIE5nWm9uZSBhcyBhIGJhc2UgY2xhc3MuXG4gICAgICBpZiAobmdab25lLmNvbnN0cnVjdG9yICE9PSBOZ1pvbmUpIHtcbiAgICAgICAgY29uc3QgY29uc29sZSA9IGluamVjdChDb25zb2xlKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5TVVBQT1JURURfWk9ORUpTX0lOU1RBTkNFLFxuICAgICAgICAgICAgJ0FuZ3VsYXIgZGV0ZWN0ZWQgdGhhdCBoeWRyYXRpb24gd2FzIGVuYWJsZWQgZm9yIGFuIGFwcGxpY2F0aW9uICcgK1xuICAgICAgICAgICAgICAgICd0aGF0IHVzZXMgYSBjdXN0b20gb3IgYSBub29wIFpvbmUuanMgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgICAgICdUaGlzIGlzIG5vdCB5ZXQgYSBmdWxseSBzdXBwb3J0ZWQgY29uZmlndXJhdGlvbi4nKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dO1xufVxuXG4vKipcbiAqIFNldHMgdXAgcHJvdmlkZXJzIG5lY2Vzc2FyeSB0byBlbmFibGUgaHlkcmF0aW9uIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0aGUgZnVuY3Rpb24gZW5hYmxlcyB0aGUgcmVjb21tZW5kZWQgc2V0IG9mIGZlYXR1cmVzIGZvciB0aGUgb3B0aW1hbFxuICogcGVyZm9ybWFuY2UgZm9yIG1vc3Qgb2YgdGhlIGFwcGxpY2F0aW9ucy4gSXQgaW5jbHVkZXMgdGhlIGZvbGxvd2luZyBmZWF0dXJlczpcbiAqXG4gKiAqIFJlY29uY2lsaW5nIERPTSBoeWRyYXRpb24uIExlYXJuIG1vcmUgYWJvdXQgaXQgW2hlcmVdKGd1aWRlL2h5ZHJhdGlvbikuXG4gKiAqIFtgSHR0cENsaWVudGBdKGFwaS9jb21tb24vaHR0cC9IdHRwQ2xpZW50KSByZXNwb25zZSBjYWNoaW5nIHdoaWxlIHJ1bm5pbmcgb24gdGhlIHNlcnZlciBhbmRcbiAqIHRyYW5zZmVycmluZyB0aGlzIGNhY2hlIHRvIHRoZSBjbGllbnQgdG8gYXZvaWQgZXh0cmEgSFRUUCByZXF1ZXN0cy4gTGVhcm4gbW9yZSBhYm91dCBkYXRhIGNhY2hpbmdcbiAqIFtoZXJlXSgvZ3VpZGUvdW5pdmVyc2FsI2NhY2hpbmctZGF0YS13aGVuLXVzaW5nLWh0dHBjbGllbnQpLlxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhbGxvdyB5b3UgdG8gZGlzYWJsZSBzb21lIG9mIHRoZSBkZWZhdWx0IGZlYXR1cmVzIG9yIGNvbmZpZ3VyZSBmZWF0dXJlc1xuICogKiB7QGxpbmsgd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGV9IHRvIGRpc2FibGUgSFRUUCB0cmFuc2ZlciBjYWNoZVxuICogKiB7QGxpbmsgd2l0aEh0dHBUcmFuc2ZlckNhY2hlT3B0aW9uc30gdG8gY29uZmlndXJlIHNvbWUgSFRUUCB0cmFuc2ZlciBjYWNoZSBvcHRpb25zXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBCYXNpYyBleGFtcGxlIG9mIGhvdyB5b3UgY2FuIGVuYWJsZSBoeWRyYXRpb24gaW4geW91ciBhcHBsaWNhdGlvbiB3aGVuXG4gKiBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uIGlzIHVzZWQ6XG4gKiBgYGBcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtwcm92aWRlQ2xpZW50SHlkcmF0aW9uKCldXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEFsdGVybmF0aXZlbHkgaWYgeW91IGFyZSB1c2luZyBOZ01vZHVsZXMsIHlvdSB3b3VsZCBhZGQgYHByb3ZpZGVDbGllbnRIeWRyYXRpb25gXG4gKiB0byB5b3VyIHJvb3QgYXBwIG1vZHVsZSdzIHByb3ZpZGVyIGxpc3QuXG4gKiBgYGBcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGRlY2xhcmF0aW9uczogW1Jvb3RDbXBdLFxuICogICBib290c3RyYXA6IFtSb290Q21wXSxcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnN9XG4gKlxuICogQHBhcmFtIGZlYXR1cmVzIE9wdGlvbmFsIGZlYXR1cmVzIHRvIGNvbmZpZ3VyZSBhZGRpdGlvbmFsIHJvdXRlciBiZWhhdmlvcnMuXG4gKiBAcmV0dXJucyBBIHNldCBvZiBwcm92aWRlcnMgdG8gZW5hYmxlIGh5ZHJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNsaWVudEh5ZHJhdGlvbiguLi5mZWF0dXJlczogSHlkcmF0aW9uRmVhdHVyZTxIeWRyYXRpb25GZWF0dXJlS2luZD5bXSk6XG4gICAgRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICBjb25zdCBwcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXTtcbiAgY29uc3QgZmVhdHVyZXNLaW5kID0gbmV3IFNldDxIeWRyYXRpb25GZWF0dXJlS2luZD4oKTtcbiAgY29uc3QgaGFzSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zID1cbiAgICAgIGZlYXR1cmVzS2luZC5oYXMoSHlkcmF0aW9uRmVhdHVyZUtpbmQuSHR0cFRyYW5zZmVyQ2FjaGVPcHRpb25zKTtcblxuICBmb3IgKGNvbnN0IHvJtXByb3ZpZGVycywgybVraW5kfSBvZiBmZWF0dXJlcykge1xuICAgIGZlYXR1cmVzS2luZC5hZGQoybVraW5kKTtcblxuICAgIGlmICjJtXByb3ZpZGVycy5sZW5ndGgpIHtcbiAgICAgIHByb3ZpZGVycy5wdXNoKMm1cHJvdmlkZXJzKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlICYmXG4gICAgICBmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpICYmIGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykge1xuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBhIHJ1bnRpbWUgZXJyb3JcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDb25maWd1cmF0aW9uIGVycm9yOiBmb3VuZCBib3RoIHdpdGhIdHRwVHJhbnNmZXJDYWNoZU9wdGlvbnMoKSBhbmQgd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKSBpbiB0aGUgc2FtZSBjYWxsIHRvIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKSwgd2hpY2ggaXMgYSBjb250cmFkaWN0aW9uLicpO1xuICB9XG5cbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgIT09ICd1bmRlZmluZWQnICYmIG5nRGV2TW9kZSkgPyBwcm92aWRlWm9uZUpzQ29tcGF0aWJpbGl0eURldGVjdG9yKCkgOiBbXSxcbiAgICB3aXRoRG9tSHlkcmF0aW9uKCksXG4gICAgKChmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpIHx8IGhhc0h0dHBUcmFuc2ZlckNhY2hlT3B0aW9ucykgP1xuICAgICAgICAgW10gOlxuICAgICAgICAgybV3aXRoSHR0cFRyYW5zZmVyQ2FjaGUoe30pKSxcbiAgICBwcm92aWRlcnMsXG4gIF0pO1xufVxuIl19