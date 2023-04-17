/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BROWSER_ANIMATIONS_PROVIDERS, BROWSER_NOOP_ANIMATIONS_PROVIDERS } from './providers';
import * as i0 from "@angular/core";
/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
class BrowserAnimationsModule {
    /**
     * Configures the module based on the specified object.
     *
     * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
     * @see `BrowserAnimationsModuleConfig`
     *
     * @usageNotes
     * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
     * function as follows:
     * ```
     * @NgModule({
     *   imports: [BrowserAnimationsModule.withConfig(config)]
     * })
     * class MyNgModule {}
     * ```
     */
    static withConfig(config) {
        return {
            ngModule: BrowserAnimationsModule,
            providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS :
                BROWSER_ANIMATIONS_PROVIDERS
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: BrowserAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: BrowserAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: BrowserAnimationsModule, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
export { BrowserAnimationsModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: BrowserAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                }]
        }] });
/**
 * Returns the set of [dependency-injection providers](guide/glossary#provider)
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```typescript
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
export function provideAnimations() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideAnimations` call results in app code.
    return [...BROWSER_ANIMATIONS_PROVIDERS];
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
class NoopAnimationsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: NoopAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: NoopAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: NoopAnimationsModule, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
export { NoopAnimationsModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-rc.1+sha-14d2747", ngImport: i0, type: NoopAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                }]
        }] });
/**
 * Returns the set of [dependency-injection providers](guide/glossary#provider)
 * to disable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to bootstrap an application using
 * the `bootstrapApplication` function, but you need to disable animations
 * (for example, when running tests).
 *
 * ```typescript
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideNoopAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
export function provideNoopAnimations() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideNoopAnimations` call results in app code.
    return [...BROWSER_NOOP_ANIMATIONS_PROVIDERS];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFzQixRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxpQ0FBaUMsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFjNUY7Ozs7R0FJRztBQUNILE1BSWEsdUJBQXVCO0lBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBcUM7UUFFckQsT0FBTztZQUNMLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDbkMsNEJBQTRCO1NBQ25FLENBQUM7SUFDSixDQUFDO3lIQXhCVSx1QkFBdUI7MEhBQXZCLHVCQUF1QixZQUh4QixhQUFhOzBIQUdaLHVCQUF1QixhQUZ2Qiw0QkFBNEIsWUFEN0IsYUFBYTs7U0FHWix1QkFBdUI7c0dBQXZCLHVCQUF1QjtrQkFKbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7aUJBQ3hDOztBQTRCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQjtJQUMvQiw4RUFBOEU7SUFDOUUsaUZBQWlGO0lBQ2pGLE9BQU8sQ0FBQyxHQUFHLDRCQUE0QixDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BSWEsb0JBQW9CO3lIQUFwQixvQkFBb0I7MEhBQXBCLG9CQUFvQixZQUhyQixhQUFhOzBIQUdaLG9CQUFvQixhQUZwQixpQ0FBaUMsWUFEbEMsYUFBYTs7U0FHWixvQkFBb0I7c0dBQXBCLG9CQUFvQjtrQkFKaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7aUJBQzdDOztBQUlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsOEVBQThFO0lBQzlFLHFGQUFxRjtJQUNyRixPQUFPLENBQUMsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSUywgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbi8qKlxuICogT2JqZWN0IHVzZWQgdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciBvZiB7QGxpbmsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9XG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVDb25maWcge1xuICAvKipcbiAgICogIFdoZXRoZXIgYW5pbWF0aW9ucyBzaG91bGQgYmUgZGlzYWJsZWQuIFBhc3NpbmcgdGhpcyBpcyBpZGVudGljYWwgdG8gcHJvdmlkaW5nIHRoZVxuICAgKiBgTm9vcEFuaW1hdGlvbnNNb2R1bGVgLCBidXQgaXQgY2FuIGJlIGNvbnRyb2xsZWQgYmFzZWQgb24gYSBydW50aW1lIHZhbHVlLlxuICAgKi9cbiAgZGlzYWJsZUFuaW1hdGlvbnM/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEV4cG9ydHMgYEJyb3dzZXJNb2R1bGVgIHdpdGggYWRkaXRpb25hbCBbZGVwZW5kZW5jeS1pbmplY3Rpb24gcHJvdmlkZXJzXShndWlkZS9nbG9zc2FyeSNwcm92aWRlcilcbiAqIGZvciB1c2Ugd2l0aCBhbmltYXRpb25zLiBTZWUgW0FuaW1hdGlvbnNdKGd1aWRlL2FuaW1hdGlvbnMpLlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogQlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUge1xuICAvKipcbiAgICogQ29uZmlndXJlcyB0aGUgbW9kdWxlIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gY29uZmlnIE9iamVjdCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgYmVoYXZpb3Igb2YgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAuXG4gICAqIEBzZWUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlQ29uZmlnYFxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiBXaGVuIHJlZ2lzdGVyaW5nIHRoZSBgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVgLCB5b3UgY2FuIHVzZSB0aGUgYHdpdGhDb25maWdgXG4gICAqIGZ1bmN0aW9uIGFzIGZvbGxvd3M6XG4gICAqIGBgYFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGltcG9ydHM6IFtCcm93c2VyQW5pbWF0aW9uc01vZHVsZS53aXRoQ29uZmlnKGNvbmZpZyldXG4gICAqIH0pXG4gICAqIGNsYXNzIE15TmdNb2R1bGUge31cbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgd2l0aENvbmZpZyhjb25maWc6IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlQ29uZmlnKTpcbiAgICAgIE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3NlckFuaW1hdGlvbnNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBjb25maWcuZGlzYWJsZUFuaW1hdGlvbnMgPyBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNldCBvZiBbZGVwZW5kZW5jeS1pbmplY3Rpb24gcHJvdmlkZXJzXShndWlkZS9nbG9zc2FyeSNwcm92aWRlcilcbiAqIHRvIGVuYWJsZSBhbmltYXRpb25zIGluIGFuIGFwcGxpY2F0aW9uLiBTZWUgW2FuaW1hdGlvbnMgZ3VpZGVdKGd1aWRlL2FuaW1hdGlvbnMpXG4gKiB0byBsZWFybiBtb3JlIGFib3V0IGFuaW1hdGlvbnMgaW4gQW5ndWxhci5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBlbmFibGUgYW5pbWF0aW9ucyBpbiBhbiBhcHBsaWNhdGlvblxuICogYm9vdHN0cmFwcGVkIHVzaW5nIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uLiBJbiB0aGlzIHNjZW5hcmlvIHRoZXJlXG4gKiBpcyBubyBuZWVkIHRvIGltcG9ydCB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYCBOZ01vZHVsZSBhdCBhbGwsIGp1c3QgYWRkXG4gKiBwcm92aWRlcnMgcmV0dXJuZWQgYnkgdGhpcyBmdW5jdGlvbiB0byB0aGUgYHByb3ZpZGVyc2AgbGlzdCBhcyBzaG93IGJlbG93LlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZUFuaW1hdGlvbnMoKVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVBbmltYXRpb25zKCk6IFByb3ZpZGVyW10ge1xuICAvLyBSZXR1cm4gYSBjb3B5IHRvIHByZXZlbnQgY2hhbmdlcyB0byB0aGUgb3JpZ2luYWwgYXJyYXkgaW4gY2FzZSBhbnkgaW4tcGxhY2VcbiAgLy8gYWx0ZXJhdGlvbnMgYXJlIHBlcmZvcm1lZCB0byB0aGUgYHByb3ZpZGVBbmltYXRpb25zYCBjYWxsIHJlc3VsdHMgaW4gYXBwIGNvZGUuXG4gIHJldHVybiBbLi4uQlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSU107XG59XG5cbi8qKlxuICogQSBudWxsIHBsYXllciB0aGF0IG11c3QgYmUgaW1wb3J0ZWQgdG8gYWxsb3cgZGlzYWJsaW5nIG9mIGFuaW1hdGlvbnMuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIE5vb3BBbmltYXRpb25zTW9kdWxlIHtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzZXQgb2YgW2RlcGVuZGVuY3ktaW5qZWN0aW9uIHByb3ZpZGVyc10oZ3VpZGUvZ2xvc3NhcnkjcHJvdmlkZXIpXG4gKiB0byBkaXNhYmxlIGFuaW1hdGlvbnMgaW4gYW4gYXBwbGljYXRpb24uIFNlZSBbYW5pbWF0aW9ucyBndWlkZV0oZ3VpZGUvYW5pbWF0aW9ucylcbiAqIHRvIGxlYXJuIG1vcmUgYWJvdXQgYW5pbWF0aW9ucyBpbiBBbmd1bGFyLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGJvb3RzdHJhcCBhbiBhcHBsaWNhdGlvbiB1c2luZ1xuICogdGhlIGBib290c3RyYXBBcHBsaWNhdGlvbmAgZnVuY3Rpb24sIGJ1dCB5b3UgbmVlZCB0byBkaXNhYmxlIGFuaW1hdGlvbnNcbiAqIChmb3IgZXhhbXBsZSwgd2hlbiBydW5uaW5nIHRlc3RzKS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIHByb3ZpZGVOb29wQW5pbWF0aW9ucygpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU5vb3BBbmltYXRpb25zKCk6IFByb3ZpZGVyW10ge1xuICAvLyBSZXR1cm4gYSBjb3B5IHRvIHByZXZlbnQgY2hhbmdlcyB0byB0aGUgb3JpZ2luYWwgYXJyYXkgaW4gY2FzZSBhbnkgaW4tcGxhY2VcbiAgLy8gYWx0ZXJhdGlvbnMgYXJlIHBlcmZvcm1lZCB0byB0aGUgYHByb3ZpZGVOb29wQW5pbWF0aW9uc2AgY2FsbCByZXN1bHRzIGluIGFwcCBjb2RlLlxuICByZXR1cm4gWy4uLkJST1dTRVJfTk9PUF9BTklNQVRJT05TX1BST1ZJREVSU107XG59XG4iXX0=