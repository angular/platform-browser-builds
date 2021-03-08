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
export class BrowserAnimationsModule {
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
}
BrowserAnimationsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BrowserAnimationsModule });
BrowserAnimationsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ factory: function BrowserAnimationsModule_Factory(t) { return new (t || BrowserAnimationsModule)(); }, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [BrowserModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BrowserAnimationsModule, { exports: [BrowserModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            }]
    }], null, null); })();
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export class NoopAnimationsModule {
}
NoopAnimationsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NoopAnimationsModule });
NoopAnimationsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ factory: function NoopAnimationsModule_Factory(t) { return new (t || NoopAnimationsModule)(); }, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [BrowserModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NoopAnimationsModule, { exports: [BrowserModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoopAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxpQ0FBaUMsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFjNUY7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFxQztRQUVyRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUNuQyw0QkFBNEI7U0FDbkUsQ0FBQztJQUNKLENBQUM7O3lFQXhCVSx1QkFBdUI7MklBQXZCLHVCQUF1QixtQkFGdkIsNEJBQTRCLFlBRDdCLGFBQWE7d0ZBR1osdUJBQXVCLGNBSHhCLGFBQWE7dUZBR1osdUJBQXVCO2NBSm5DLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7YUFDeEM7O0FBNEJEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxvQkFBb0I7O3NFQUFwQixvQkFBb0I7cUlBQXBCLG9CQUFvQixtQkFGcEIsaUNBQWlDLFlBRGxDLGFBQWE7d0ZBR1osb0JBQW9CLGNBSHJCLGFBQWE7dUZBR1osb0JBQW9CO2NBSmhDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7YUFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLCBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlN9IGZyb20gJy4vcHJvdmlkZXJzJztcblxuLyoqXG4gKiBPYmplY3QgdXNlZCB0byBjb25maWd1cmUgdGhlIGJlaGF2aW9yIG9mIHtAbGluayBCcm93c2VyQW5pbWF0aW9uc01vZHVsZX1cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCcm93c2VyQW5pbWF0aW9uc01vZHVsZUNvbmZpZyB7XG4gIC8qKlxuICAgKiAgV2hldGhlciBhbmltYXRpb25zIHNob3VsZCBiZSBkaXNhYmxlZC4gUGFzc2luZyB0aGlzIGlzIGlkZW50aWNhbCB0byBwcm92aWRpbmcgdGhlXG4gICAqIGBOb29wQW5pbWF0aW9uc01vZHVsZWAsIGJ1dCBpdCBjYW4gYmUgY29udHJvbGxlZCBiYXNlZCBvbiBhIHJ1bnRpbWUgdmFsdWUuXG4gICAqL1xuICBkaXNhYmxlQW5pbWF0aW9ucz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRXhwb3J0cyBgQnJvd3Nlck1vZHVsZWAgd2l0aCBhZGRpdGlvbmFsIFtkZXBlbmRlbmN5LWluamVjdGlvbiBwcm92aWRlcnNdKGd1aWRlL2dsb3NzYXJ5I3Byb3ZpZGVyKVxuICogZm9yIHVzZSB3aXRoIGFuaW1hdGlvbnMuIFNlZSBbQW5pbWF0aW9uc10oZ3VpZGUvYW5pbWF0aW9ucykuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB7XG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBtb2R1bGUgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWcgT2JqZWN0IHVzZWQgdG8gY29uZmlndXJlIHRoZSBiZWhhdmlvciBvZiB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYC5cbiAgICogQHNlZSBgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVDb25maWdgXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqIFdoZW4gcmVnaXN0ZXJpbmcgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAsIHlvdSBjYW4gdXNlIHRoZSBgd2l0aENvbmZpZ2BcbiAgICogZnVuY3Rpb24gYXMgZm9sbG93czpcbiAgICogYGBgXG4gICAqIEBOZ01vZHVsZSh7XG4gICAqICAgaW1wb3J0czogW0Jyb3dzZXJBbmltYXRpb25zTW9kdWxlLndpdGhDb25maWcoY29uZmlnKV1cbiAgICogfSlcbiAgICogY2xhc3MgTXlOZ01vZHVsZSB7fVxuICAgKiBgYGBcbiAgICovXG4gIHN0YXRpYyB3aXRoQ29uZmlnKGNvbmZpZzogQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVDb25maWcpOlxuICAgICAgTW9kdWxlV2l0aFByb3ZpZGVyczxCcm93c2VyQW5pbWF0aW9uc01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IGNvbmZpZy5kaXNhYmxlQW5pbWF0aW9ucyA/IEJST1dTRVJfTk9PUF9BTklNQVRJT05TX1BST1ZJREVSUyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlNcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogQSBudWxsIHBsYXllciB0aGF0IG11c3QgYmUgaW1wb3J0ZWQgdG8gYWxsb3cgZGlzYWJsaW5nIG9mIGFuaW1hdGlvbnMuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIE5vb3BBbmltYXRpb25zTW9kdWxlIHtcbn1cbiJdfQ==