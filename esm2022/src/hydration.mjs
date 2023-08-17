/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵwithHttpTransferCache as withHttpTransferCache } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders, NgZone, ɵConsole as Console, ɵformatRuntimeError as formatRuntimeError, ɵwithDomHydration as withDomHydration } from '@angular/core';
/**
 * Helper function to create an object that represents a Hydration feature.
 */
function hydrationFeature(kind, providers = []) {
    return { ɵkind: kind, ɵproviders: providers };
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
 * By default, the function enables the recommended set of features for the optimal
 * performance for most of the applications. You can enable/disable features by
 * passing special functions (from the `HydrationFeatures` set) as arguments to the
 * `provideClientHydration` function.
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
    for (const { ɵproviders, ɵkind } of features) {
        featuresKind.add(ɵkind);
        if (ɵproviders.length) {
            providers.push(ɵproviders);
        }
    }
    return makeEnvironmentProviders([
        (typeof ngDevMode !== 'undefined' && ngDevMode) ? provideZoneJsCompatibilityDetector() : [],
        (featuresKind.has(0 /* HydrationFeatureKind.NoDomReuseFeature */) ? [] : withDomHydration()),
        (featuresKind.has(1 /* HydrationFeatureKind.NoHttpTransferCache */) ? [] : withHttpTransferCache()),
        providers,
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlkcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvaHlkcmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3JGLE9BQU8sRUFBQyx1QkFBdUIsRUFBd0IsTUFBTSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBWSxRQUFRLElBQUksT0FBTyxFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBMkJ2Tzs7R0FFRztBQUNILFNBQVMsZ0JBQWdCLENBQ3JCLElBQWlCLEVBQUUsWUFBd0IsRUFBRTtJQUMvQyxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLFVBQVUsY0FBYztJQUM1QixrRUFBa0U7SUFDbEUsdUVBQXVFO0lBQ3ZFLE9BQU8sZ0JBQWdCLGdEQUF3QyxDQUFDO0FBQ2xFLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCO0lBRXJDLGtFQUFrRTtJQUNsRSxpRUFBaUU7SUFDakUsT0FBTyxnQkFBZ0Isa0RBQTBDLENBQUM7QUFDcEUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtDQUFrQztJQUN6QyxPQUFPLENBQUM7WUFDTixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5QixrRUFBa0U7Z0JBQ2xFLG1FQUFtRTtnQkFDbkUsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtvQkFDakMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsMkRBRTlCLGlFQUFpRTt3QkFDN0QsdURBQXVEO3dCQUN2RCxrREFBa0QsQ0FBQyxDQUFDO29CQUM1RCxzQ0FBc0M7b0JBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZCO1lBQ0gsQ0FBQztZQUNELEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsR0FBRyxRQUFrRDtJQUUxRixNQUFNLFNBQVMsR0FBZSxFQUFFLENBQUM7SUFDakMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFFckQsS0FBSyxNQUFNLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxJQUFJLFFBQVEsRUFBRTtRQUMxQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNyQixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7SUFDRCxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzNGLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0RBQXdDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNwRixDQUFDLFlBQVksQ0FBQyxHQUFHLGtEQUEwQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDM0YsU0FBUztLQUNWLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtXdpdGhIdHRwVHJhbnNmZXJDYWNoZSBhcyB3aXRoSHR0cFRyYW5zZmVyQ2FjaGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RU5WSVJPTk1FTlRfSU5JVElBTElaRVIsIEVudmlyb25tZW50UHJvdmlkZXJzLCBpbmplY3QsIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycywgTmdab25lLCBQcm92aWRlciwgybVDb25zb2xlIGFzIENvbnNvbGUsIMm1Zm9ybWF0UnVudGltZUVycm9yIGFzIGZvcm1hdFJ1bnRpbWVFcnJvciwgybV3aXRoRG9tSHlkcmF0aW9uIGFzIHdpdGhEb21IeWRyYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBUaGUgbGlzdCBvZiBmZWF0dXJlcyBhcyBhbiBlbnVtIHRvIHVuaXF1ZWx5IHR5cGUgZWFjaCBgSHlkcmF0aW9uRmVhdHVyZWAuXG4gKiBAc2VlIHtAbGluayBIeWRyYXRpb25GZWF0dXJlfVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEh5ZHJhdGlvbkZlYXR1cmVLaW5kIHtcbiAgTm9Eb21SZXVzZUZlYXR1cmUsXG4gIE5vSHR0cFRyYW5zZmVyQ2FjaGVcbn1cblxuLyoqXG4gKiBIZWxwZXIgdHlwZSB0byByZXByZXNlbnQgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEh5ZHJhdGlvbkZlYXR1cmU8RmVhdHVyZUtpbmQgZXh0ZW5kcyBIeWRyYXRpb25GZWF0dXJlS2luZD4ge1xuICDJtWtpbmQ6IEZlYXR1cmVLaW5kO1xuICDJtXByb3ZpZGVyczogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBIeWRyYXRpb24gZmVhdHVyZS5cbiAqL1xuZnVuY3Rpb24gaHlkcmF0aW9uRmVhdHVyZTxGZWF0dXJlS2luZCBleHRlbmRzIEh5ZHJhdGlvbkZlYXR1cmVLaW5kPihcbiAgICBraW5kOiBGZWF0dXJlS2luZCwgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW10pOiBIeWRyYXRpb25GZWF0dXJlPEZlYXR1cmVLaW5kPiB7XG4gIHJldHVybiB7ybVraW5kOiBraW5kLCDJtXByb3ZpZGVyczogcHJvdmlkZXJzfTtcbn1cblxuLyoqXG4gKiBEaXNhYmxlcyBET00gbm9kZXMgcmV1c2UgZHVyaW5nIGh5ZHJhdGlvbi4gRWZmZWN0aXZlbHkgbWFrZXNcbiAqIEFuZ3VsYXIgcmUtcmVuZGVyIGFuIGFwcGxpY2F0aW9uIGZyb20gc2NyYXRjaCBvbiB0aGUgY2xpZW50LlxuICpcbiAqIFdoZW4gdGhpcyBvcHRpb24gaXMgZW5hYmxlZCwgbWFrZSBzdXJlIHRoYXQgdGhlIGluaXRpYWwgbmF2aWdhdGlvblxuICogb3B0aW9uIGlzIGNvbmZpZ3VyZWQgZm9yIHRoZSBSb3V0ZXIgYXMgYGVuYWJsZWRCbG9ja2luZ2AgYnkgdXNpbmcgdGhlXG4gKiBgd2l0aEVuYWJsZWRCbG9ja2luZ0luaXRpYWxOYXZpZ2F0aW9uYCBpbiB0aGUgYHByb3ZpZGVSb3V0ZXJgIGNhbGw6XG4gKlxuICogYGBgXG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIHByb3ZpZGVSb3V0ZXIoXG4gKiAgICAgICAvLyAuLi4gb3RoZXIgZmVhdHVyZXMgLi4uXG4gKiAgICAgICB3aXRoRW5hYmxlZEJsb2NraW5nSW5pdGlhbE5hdmlnYXRpb24oKVxuICogICAgICksXG4gKiAgICAgcHJvdmlkZUNsaWVudEh5ZHJhdGlvbih3aXRoTm9Eb21SZXVzZSgpKVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFRoaXMgd291bGQgZW5zdXJlIHRoYXQgdGhlIGFwcGxpY2F0aW9uIGlzIHJlcmVuZGVyZWQgYWZ0ZXIgYWxsIGFzeW5jXG4gKiBvcGVyYXRpb25zIGluIHRoZSBSb3V0ZXIgKHN1Y2ggYXMgbGF6eS1sb2FkaW5nIG9mIGNvbXBvbmVudHMsXG4gKiB3YWl0aW5nIGZvciBhc3luYyBndWFyZHMgYW5kIHJlc29sdmVycykgYXJlIGNvbXBsZXRlZCB0byBhdm9pZFxuICogY2xlYXJpbmcgdGhlIERPTSBvbiB0aGUgY2xpZW50IHRvbyBzb29uLCB0aHVzIGNhdXNpbmcgY29udGVudCBmbGlja2VyLlxuICpcbiAqIEBzZWUge0BsaW5rIHByb3ZpZGVSb3V0ZXJ9XG4gKiBAc2VlIHtAbGluayB3aXRoRW5hYmxlZEJsb2NraW5nSW5pdGlhbE5hdmlnYXRpb259XG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhOb0RvbVJldXNlKCk6IEh5ZHJhdGlvbkZlYXR1cmU8SHlkcmF0aW9uRmVhdHVyZUtpbmQuTm9Eb21SZXVzZUZlYXR1cmU+IHtcbiAgLy8gVGhpcyBmZWF0dXJlIGhhcyBubyBwcm92aWRlcnMgYW5kIGFjdHMgYXMgYSBmbGFnIHRoYXQgdHVybnMgb2ZmXG4gIC8vIG5vbi1kZXN0cnVjdGl2ZSBoeWRyYXRpb24gKHdoaWNoIG90aGVyd2lzZSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdCkuXG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vRG9tUmV1c2VGZWF0dXJlKTtcbn1cblxuLyoqXG4gKiBEaXNhYmxlcyBIVFRQIHRyYW5zZmVyIGNhY2hlLiBFZmZlY3RpdmVseSBjYXVzZXMgSFRUUCByZXF1ZXN0cyB0byBiZSBwZXJmb3JtZWQgdHdpY2U6IG9uY2Ugb24gdGhlXG4gKiBzZXJ2ZXIgYW5kIG90aGVyIG9uZSBvbiB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aE5vSHR0cFRyYW5zZmVyQ2FjaGUoKTpcbiAgICBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGU+IHtcbiAgLy8gVGhpcyBmZWF0dXJlIGhhcyBubyBwcm92aWRlcnMgYW5kIGFjdHMgYXMgYSBmbGFnIHRoYXQgdHVybnMgb2ZmXG4gIC8vIEhUVFAgdHJhbnNmZXIgY2FjaGUgKHdoaWNoIG90aGVyd2lzZSBpcyB0dXJuZWQgb24gYnkgZGVmYXVsdCkuXG4gIHJldHVybiBoeWRyYXRpb25GZWF0dXJlKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vSHR0cFRyYW5zZmVyQ2FjaGUpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYEVOVklST05NRU5UX0lOSVRJQUxJWkVSYCB0b2tlbiBzZXR1cCB3aXRoIGEgZnVuY3Rpb25cbiAqIHRoYXQgdmVyaWZpZXMgd2hldGhlciBjb21wYXRpYmxlIFpvbmVKUyB3YXMgdXNlZCBpbiBhbiBhcHBsaWNhdGlvblxuICogYW5kIGxvZ3MgYSB3YXJuaW5nIGluIGEgY29uc29sZSBpZiBpdCdzIG5vdCB0aGUgY2FzZS5cbiAqL1xuZnVuY3Rpb24gcHJvdmlkZVpvbmVKc0NvbXBhdGliaWxpdHlEZXRlY3RvcigpOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFt7XG4gICAgcHJvdmlkZTogRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gICAgdXNlVmFsdWU6ICgpID0+IHtcbiAgICAgIGNvbnN0IG5nWm9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgICAgLy8gQ2hlY2tpbmcgYG5nWm9uZSBpbnN0YW5jZW9mIE5nWm9uZWAgd291bGQgYmUgaW5zdWZmaWNpZW50IGhlcmUsXG4gICAgICAvLyBiZWNhdXNlIGN1c3RvbSBpbXBsZW1lbnRhdGlvbnMgbWlnaHQgdXNlIE5nWm9uZSBhcyBhIGJhc2UgY2xhc3MuXG4gICAgICBpZiAobmdab25lLmNvbnN0cnVjdG9yICE9PSBOZ1pvbmUpIHtcbiAgICAgICAgY29uc3QgY29uc29sZSA9IGluamVjdChDb25zb2xlKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGZvcm1hdFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5TVVBQT1JURURfWk9ORUpTX0lOU1RBTkNFLFxuICAgICAgICAgICAgJ0FuZ3VsYXIgZGV0ZWN0ZWQgdGhhdCBoeWRyYXRpb24gd2FzIGVuYWJsZWQgZm9yIGFuIGFwcGxpY2F0aW9uICcgK1xuICAgICAgICAgICAgICAgICd0aGF0IHVzZXMgYSBjdXN0b20gb3IgYSBub29wIFpvbmUuanMgaW1wbGVtZW50YXRpb24uICcgK1xuICAgICAgICAgICAgICAgICdUaGlzIGlzIG5vdCB5ZXQgYSBmdWxseSBzdXBwb3J0ZWQgY29uZmlndXJhdGlvbi4nKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dO1xufVxuXG4vKipcbiAqIFNldHMgdXAgcHJvdmlkZXJzIG5lY2Vzc2FyeSB0byBlbmFibGUgaHlkcmF0aW9uIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEJ5IGRlZmF1bHQsIHRoZSBmdW5jdGlvbiBlbmFibGVzIHRoZSByZWNvbW1lbmRlZCBzZXQgb2YgZmVhdHVyZXMgZm9yIHRoZSBvcHRpbWFsXG4gKiBwZXJmb3JtYW5jZSBmb3IgbW9zdCBvZiB0aGUgYXBwbGljYXRpb25zLiBZb3UgY2FuIGVuYWJsZS9kaXNhYmxlIGZlYXR1cmVzIGJ5XG4gKiBwYXNzaW5nIHNwZWNpYWwgZnVuY3Rpb25zIChmcm9tIHRoZSBgSHlkcmF0aW9uRmVhdHVyZXNgIHNldCkgYXMgYXJndW1lbnRzIHRvIHRoZVxuICogYHByb3ZpZGVDbGllbnRIeWRyYXRpb25gIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogQmFzaWMgZXhhbXBsZSBvZiBob3cgeW91IGNhbiBlbmFibGUgaHlkcmF0aW9uIGluIHlvdXIgYXBwbGljYXRpb24gd2hlblxuICogYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbiBpcyB1c2VkOlxuICogYGBgXG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihBcHBDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNsaWVudEh5ZHJhdGlvbigpXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBBbHRlcm5hdGl2ZWx5IGlmIHlvdSBhcmUgdXNpbmcgTmdNb2R1bGVzLCB5b3Ugd291bGQgYWRkIGBwcm92aWRlQ2xpZW50SHlkcmF0aW9uYFxuICogdG8geW91ciByb290IGFwcCBtb2R1bGUncyBwcm92aWRlciBsaXN0LlxuICogYGBgXG4gKiBATmdNb2R1bGUoe1xuICogICBkZWNsYXJhdGlvbnM6IFtSb290Q21wXSxcbiAqICAgYm9vdHN0cmFwOiBbUm9vdENtcF0sXG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVDbGllbnRIeWRyYXRpb24oKV0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7fVxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgd2l0aE5vRG9tUmV1c2V9XG4gKiBAc2VlIHtAbGluayB3aXRoTm9IdHRwVHJhbnNmZXJDYWNoZX1cbiAqXG4gKiBAcGFyYW0gZmVhdHVyZXMgT3B0aW9uYWwgZmVhdHVyZXMgdG8gY29uZmlndXJlIGFkZGl0aW9uYWwgcm91dGVyIGJlaGF2aW9ycy5cbiAqIEByZXR1cm5zIEEgc2V0IG9mIHByb3ZpZGVycyB0byBlbmFibGUgaHlkcmF0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ2xpZW50SHlkcmF0aW9uKC4uLmZlYXR1cmVzOiBIeWRyYXRpb25GZWF0dXJlPEh5ZHJhdGlvbkZlYXR1cmVLaW5kPltdKTpcbiAgICBFbnZpcm9ubWVudFByb3ZpZGVycyB7XG4gIGNvbnN0IHByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtdO1xuICBjb25zdCBmZWF0dXJlc0tpbmQgPSBuZXcgU2V0PEh5ZHJhdGlvbkZlYXR1cmVLaW5kPigpO1xuXG4gIGZvciAoY29uc3Qge8m1cHJvdmlkZXJzLCDJtWtpbmR9IG9mIGZlYXR1cmVzKSB7XG4gICAgZmVhdHVyZXNLaW5kLmFkZCjJtWtpbmQpO1xuXG4gICAgaWYgKMm1cHJvdmlkZXJzLmxlbmd0aCkge1xuICAgICAgcHJvdmlkZXJzLnB1c2goybVwcm92aWRlcnMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWFrZUVudmlyb25tZW50UHJvdmlkZXJzKFtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlKSA/IHByb3ZpZGVab25lSnNDb21wYXRpYmlsaXR5RGV0ZWN0b3IoKSA6IFtdLFxuICAgIChmZWF0dXJlc0tpbmQuaGFzKEh5ZHJhdGlvbkZlYXR1cmVLaW5kLk5vRG9tUmV1c2VGZWF0dXJlKSA/IFtdIDogd2l0aERvbUh5ZHJhdGlvbigpKSxcbiAgICAoZmVhdHVyZXNLaW5kLmhhcyhIeWRyYXRpb25GZWF0dXJlS2luZC5Ob0h0dHBUcmFuc2ZlckNhY2hlKSA/IFtdIDogd2l0aEh0dHBUcmFuc2ZlckNhY2hlKCkpLFxuICAgIHByb3ZpZGVycyxcbiAgXSk7XG59XG4iXX0=