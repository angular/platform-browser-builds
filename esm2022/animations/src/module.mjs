/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule, ɵperformanceMarkFeature as performanceMarkFeature, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BROWSER_ANIMATIONS_PROVIDERS, BROWSER_NOOP_ANIMATIONS_PROVIDERS } from './providers';
import * as i0 from "@angular/core";
/**
 * Exports `BrowserModule` with additional dependency-injection providers
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
export class BrowserAnimationsModule {
    /**
     * Configures the module based on the specified object.
     *
     * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
     * @see {@link BrowserAnimationsModuleConfig}
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
            providers: config.disableAnimations
                ? BROWSER_NOOP_ANIMATIONS_PROVIDERS
                : BROWSER_ANIMATIONS_PROVIDERS,
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserAnimationsModule, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                }]
        }] });
/**
 * Returns the set of dependency-injection providers
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
    performanceMarkFeature('NgEagerAnimations');
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideAnimations` call results in app code.
    return [...BROWSER_ANIMATIONS_PROVIDERS];
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export class NoopAnimationsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: NoopAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: NoopAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: NoopAnimationsModule, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: NoopAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                }]
        }] });
/**
 * Returns the set of dependency-injection providers
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUVMLFFBQVEsRUFFUix1QkFBdUIsSUFBSSxzQkFBc0IsR0FDbEQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxpQ0FBaUMsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFjNUY7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDZixNQUFxQztRQUVyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtnQkFDakMsQ0FBQyxDQUFDLGlDQUFpQztnQkFDbkMsQ0FBQyxDQUFDLDRCQUE0QjtTQUNqQyxDQUFDO0lBQ0osQ0FBQzt5SEExQlUsdUJBQXVCOzBIQUF2Qix1QkFBdUIsWUFIeEIsYUFBYTswSEFHWix1QkFBdUIsYUFGdkIsNEJBQTRCLFlBRDdCLGFBQWE7O3NHQUdaLHVCQUF1QjtrQkFKbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7aUJBQ3hDOztBQThCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQjtJQUMvQixzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVDLDhFQUE4RTtJQUM5RSxpRkFBaUY7SUFDakYsT0FBTyxDQUFDLEdBQUcsNEJBQTRCLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQ7OztHQUdHO0FBS0gsTUFBTSxPQUFPLG9CQUFvQjt5SEFBcEIsb0JBQW9COzBIQUFwQixvQkFBb0IsWUFIckIsYUFBYTswSEFHWixvQkFBb0IsYUFGcEIsaUNBQWlDLFlBRGxDLGFBQWE7O3NHQUdaLG9CQUFvQjtrQkFKaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7aUJBQzdDOztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsOEVBQThFO0lBQzlFLHFGQUFxRjtJQUNyRixPQUFPLENBQUMsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxuICBQcm92aWRlcixcbiAgybVwZXJmb3JtYW5jZU1hcmtGZWF0dXJlIGFzIHBlcmZvcm1hbmNlTWFya0ZlYXR1cmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLCBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlN9IGZyb20gJy4vcHJvdmlkZXJzJztcblxuLyoqXG4gKiBPYmplY3QgdXNlZCB0byBjb25maWd1cmUgdGhlIGJlaGF2aW9yIG9mIHtAbGluayBCcm93c2VyQW5pbWF0aW9uc01vZHVsZX1cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCcm93c2VyQW5pbWF0aW9uc01vZHVsZUNvbmZpZyB7XG4gIC8qKlxuICAgKiAgV2hldGhlciBhbmltYXRpb25zIHNob3VsZCBiZSBkaXNhYmxlZC4gUGFzc2luZyB0aGlzIGlzIGlkZW50aWNhbCB0byBwcm92aWRpbmcgdGhlXG4gICAqIGBOb29wQW5pbWF0aW9uc01vZHVsZWAsIGJ1dCBpdCBjYW4gYmUgY29udHJvbGxlZCBiYXNlZCBvbiBhIHJ1bnRpbWUgdmFsdWUuXG4gICAqL1xuICBkaXNhYmxlQW5pbWF0aW9ucz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRXhwb3J0cyBgQnJvd3Nlck1vZHVsZWAgd2l0aCBhZGRpdGlvbmFsIGRlcGVuZGVuY3ktaW5qZWN0aW9uIHByb3ZpZGVyc1xuICogZm9yIHVzZSB3aXRoIGFuaW1hdGlvbnMuIFNlZSBbQW5pbWF0aW9uc10oZ3VpZGUvYW5pbWF0aW9ucykuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB7XG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBtb2R1bGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWcgT2JqZWN0IHVzZWQgdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciBvZiB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYC5cbiAgICogQHNlZSB7QGxpbmsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVDb25maWd9XG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqIFdoZW4gcmVnaXN0ZXJpbmcgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAsIHlvdSBjYW4gdXNlIHRoZSBgd2l0aENvbmZpZ2BcbiAgICogZnVuY3Rpb24gYXMgZm9sbG93czpcbiAgICogYGBgXG4gICAqIEBOZ01vZHVsZSh7XG4gICAqICAgaW1wb3J0czogW0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlLndpdGhDb25maWcoY29uZmlnKV1cbiAgICogfSlcbiAgICogY2xhc3MgTXlOZ01vZHVsZSB7fVxuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyB3aXRoQ29uZmlnKFxuICAgIGNvbmZpZzogQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVDb25maWcsXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3NlckFuaW1hdGlvbnNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBjb25maWcuZGlzYWJsZUFuaW1hdGlvbnNcbiAgICAgICAgPyBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlNcbiAgICAgICAgOiBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzZXQgb2YgZGVwZW5kZW5jeS1pbmplY3Rpb24gcHJvdmlkZXJzXG4gKiB0byBlbmFibGUgYW5pbWF0aW9ucyBpbiBhbiBhcHBsaWNhdGlvbi4gU2VlIFthbmltYXRpb25zIGd1aWRlXShndWlkZS9hbmltYXRpb25zKVxuICogdG8gbGVhcm4gbW9yZSBhYm91dCBhbmltYXRpb25zIGluIEFuZ3VsYXIuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gZW5hYmxlIGFuaW1hdGlvbnMgaW4gYW4gYXBwbGljYXRpb25cbiAqIGJvb3RzdHJhcHBlZCB1c2luZyB0aGUgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbi4gSW4gdGhpcyBzY2VuYXJpbyB0aGVyZVxuICogaXMgbm8gbmVlZCB0byBpbXBvcnQgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAgTmdNb2R1bGUgYXQgYWxsLCBqdXN0IGFkZFxuICogcHJvdmlkZXJzIHJldHVybmVkIGJ5IHRoaXMgZnVuY3Rpb24gdG8gdGhlIGBwcm92aWRlcnNgIGxpc3QgYXMgc2hvdyBiZWxvdy5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIHByb3ZpZGVBbmltYXRpb25zKClcbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQW5pbWF0aW9ucygpOiBQcm92aWRlcltdIHtcbiAgcGVyZm9ybWFuY2VNYXJrRmVhdHVyZSgnTmdFYWdlckFuaW1hdGlvbnMnKTtcbiAgLy8gUmV0dXJuIGEgY29weSB0byBwcmV2ZW50IGNoYW5nZXMgdG8gdGhlIG9yaWdpbmFsIGFycmF5IGluIGNhc2UgYW55IGluLXBsYWNlXG4gIC8vIGFsdGVyYXRpb25zIGFyZSBwZXJmb3JtZWQgdG8gdGhlIGBwcm92aWRlQW5pbWF0aW9uc2AgY2FsbCByZXN1bHRzIGluIGFwcCBjb2RlLlxuICByZXR1cm4gWy4uLkJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlNdO1xufVxuXG4vKipcbiAqIEEgbnVsbCBwbGF5ZXIgdGhhdCBtdXN0IGJlIGltcG9ydGVkIHRvIGFsbG93IGRpc2FibGluZyBvZiBhbmltYXRpb25zLlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBOb29wQW5pbWF0aW9uc01vZHVsZSB7fVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNldCBvZiBkZXBlbmRlbmN5LWluamVjdGlvbiBwcm92aWRlcnNcbiAqIHRvIGRpc2FibGUgYW5pbWF0aW9ucyBpbiBhbiBhcHBsaWNhdGlvbi4gU2VlIFthbmltYXRpb25zIGd1aWRlXShndWlkZS9hbmltYXRpb25zKVxuICogdG8gbGVhcm4gbW9yZSBhYm91dCBhbmltYXRpb25zIGluIEFuZ3VsYXIuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gYm9vdHN0cmFwIGFuIGFwcGxpY2F0aW9uIHVzaW5nXG4gKiB0aGUgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbiwgYnV0IHlvdSBuZWVkIHRvIGRpc2FibGUgYW5pbWF0aW9uc1xuICogKGZvciBleGFtcGxlLCB3aGVuIHJ1bm5pbmcgdGVzdHMpLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZU5vb3BBbmltYXRpb25zKClcbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTm9vcEFuaW1hdGlvbnMoKTogUHJvdmlkZXJbXSB7XG4gIC8vIFJldHVybiBhIGNvcHkgdG8gcHJldmVudCBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBhcnJheSBpbiBjYXNlIGFueSBpbi1wbGFjZVxuICAvLyBhbHRlcmF0aW9ucyBhcmUgcGVyZm9ybWVkIHRvIHRoZSBgcHJvdmlkZU5vb3BBbmltYXRpb25zYCBjYWxsIHJlc3VsdHMgaW4gYXBwIGNvZGUuXG4gIHJldHVybiBbLi4uQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTXTtcbn1cbiJdfQ==