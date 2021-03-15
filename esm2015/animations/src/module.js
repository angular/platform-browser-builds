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
BrowserAnimationsModule.ɵfac = function BrowserAnimationsModule_Factory(t) { return new (t || BrowserAnimationsModule)(); };
BrowserAnimationsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: BrowserAnimationsModule });
BrowserAnimationsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [BrowserModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BrowserAnimationsModule, { exports: [BrowserModule] }); })();
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export class NoopAnimationsModule {
}
NoopAnimationsModule.ɵfac = function NoopAnimationsModule_Factory(t) { return new (t || NoopAnimationsModule)(); };
NoopAnimationsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NoopAnimationsModule });
NoopAnimationsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [BrowserModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoopAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NoopAnimationsModule, { exports: [BrowserModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxpQ0FBaUMsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFjNUY7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFxQztRQUVyRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUNuQyw0QkFBNEI7U0FDbkUsQ0FBQztJQUNKLENBQUM7OzhGQXhCVSx1QkFBdUI7eUVBQXZCLHVCQUF1Qjs4RUFGdkIsNEJBQTRCLFlBRDdCLGFBQWE7dUZBR1osdUJBQXVCO2NBSm5DLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7YUFDeEM7O3dGQUNZLHVCQUF1QixjQUh4QixhQUFhO0FBOEJ6Qjs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sb0JBQW9COzt3RkFBcEIsb0JBQW9CO3NFQUFwQixvQkFBb0I7MkVBRnBCLGlDQUFpQyxZQURsQyxhQUFhO3VGQUdaLG9CQUFvQjtjQUpoQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixTQUFTLEVBQUUsaUNBQWlDO2FBQzdDOzt3RkFDWSxvQkFBb0IsY0FIckIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0JST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlMsIEJST1dTRVJfTk9PUF9BTklNQVRJT05TX1BST1ZJREVSU30gZnJvbSAnLi9wcm92aWRlcnMnO1xuXG4vKipcbiAqIE9iamVjdCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgYmVoYXZpb3Igb2Yge0BsaW5rIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlfVxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlQ29uZmlnIHtcbiAgLyoqXG4gICAqICBXaGV0aGVyIGFuaW1hdGlvbnMgc2hvdWxkIGJlIGRpc2FibGVkLiBQYXNzaW5nIHRoaXMgaXMgaWRlbnRpY2FsIHRvIHByb3ZpZGluZyB0aGVcbiAgICogYE5vb3BBbmltYXRpb25zTW9kdWxlYCwgYnV0IGl0IGNhbiBiZSBjb250cm9sbGVkIGJhc2VkIG9uIGEgcnVudGltZSB2YWx1ZS5cbiAgICovXG4gIGRpc2FibGVBbmltYXRpb25zPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBFeHBvcnRzIGBCcm93c2VyTW9kdWxlYCB3aXRoIGFkZGl0aW9uYWwgW2RlcGVuZGVuY3ktaW5qZWN0aW9uIHByb3ZpZGVyc10oZ3VpZGUvZ2xvc3NhcnkjcHJvdmlkZXIpXG4gKiBmb3IgdXNlIHdpdGggYW5pbWF0aW9ucy4gU2VlIFtBbmltYXRpb25zXShndWlkZS9hbmltYXRpb25zKS5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIHtcbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIG1vZHVsZSBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZyBPYmplY3QgdXNlZCB0byBjb25maWd1cmUgdGhlIGJlaGF2aW9yIG9mIHRoZSBgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVgLlxuICAgKiBAc2VlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZUNvbmZpZ2BcbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogV2hlbiByZWdpc3RlcmluZyB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYCwgeW91IGNhbiB1c2UgdGhlIGB3aXRoQ29uZmlnYFxuICAgKiBmdW5jdGlvbiBhcyBmb2xsb3dzOlxuICAgKiBgYGBcbiAgICogQE5nTW9kdWxlKHtcbiAgICogICBpbXBvcnRzOiBbQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUud2l0aENvbmZpZyhjb25maWcpXVxuICAgKiB9KVxuICAgKiBjbGFzcyBNeU5nTW9kdWxlIHt9XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiBCcm93c2VyQW5pbWF0aW9uc01vZHVsZUNvbmZpZyk6XG4gICAgICBNb2R1bGVXaXRoUHJvdmlkZXJzPEJyb3dzZXJBbmltYXRpb25zTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogY29uZmlnLmRpc2FibGVBbmltYXRpb25zID8gQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSU1xuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBBIG51bGwgcGxheWVyIHRoYXQgbXVzdCBiZSBpbXBvcnRlZCB0byBhbGxvdyBkaXNhYmxpbmcgb2YgYW5pbWF0aW9ucy5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IEJST1dTRVJfTk9PUF9BTklNQVRJT05TX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgTm9vcEFuaW1hdGlvbnNNb2R1bGUge1xufVxuIl19