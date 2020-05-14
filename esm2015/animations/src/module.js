/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/animations/src/module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BROWSER_ANIMATIONS_PROVIDERS, BROWSER_NOOP_ANIMATIONS_PROVIDERS } from './providers';
/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * \@publicApi
 */
let BrowserAnimationsModule = /** @class */ (() => {
    /**
     * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
     * for use with animations. See [Animations](guide/animations).
     * \@publicApi
     */
    class BrowserAnimationsModule {
    }
    BrowserAnimationsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                },] }
    ];
    return BrowserAnimationsModule;
})();
export { BrowserAnimationsModule };
/**
 * A null player that must be imported to allow disabling of animations.
 * \@publicApi
 */
let NoopAnimationsModule = /** @class */ (() => {
    /**
     * A null player that must be imported to allow disabling of animations.
     * \@publicApi
     */
    class NoopAnimationsModule {
    }
    NoopAnimationsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                },] }
    ];
    return NoopAnimationsModule;
})();
export { NoopAnimationsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFeEQsT0FBTyxFQUFDLDRCQUE0QixFQUFFLGlDQUFpQyxFQUFDLE1BQU0sYUFBYSxDQUFDOzs7Ozs7QUFPNUY7Ozs7OztJQUFBLE1BSWEsdUJBQXVCOzs7Z0JBSm5DLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7aUJBQ3hDOztJQUVELDhCQUFDO0tBQUE7U0FEWSx1QkFBdUI7Ozs7O0FBT3BDOzs7OztJQUFBLE1BSWEsb0JBQW9COzs7Z0JBSmhDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7aUJBQzdDOztJQUVELDJCQUFDO0tBQUE7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSUywgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbi8qKlxuICogRXhwb3J0cyBgQnJvd3Nlck1vZHVsZWAgd2l0aCBhZGRpdGlvbmFsIFtkZXBlbmRlbmN5LWluamVjdGlvbiBwcm92aWRlcnNdKGd1aWRlL2dsb3NzYXJ5I3Byb3ZpZGVyKVxuICogZm9yIHVzZSB3aXRoIGFuaW1hdGlvbnMuIFNlZSBbQW5pbWF0aW9uc10oZ3VpZGUvYW5pbWF0aW9ucykuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB7XG59XG5cbi8qKlxuICogQSBudWxsIHBsYXllciB0aGF0IG11c3QgYmUgaW1wb3J0ZWQgdG8gYWxsb3cgZGlzYWJsaW5nIG9mIGFuaW1hdGlvbnMuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIE5vb3BBbmltYXRpb25zTW9kdWxlIHtcbn1cbiJdfQ==