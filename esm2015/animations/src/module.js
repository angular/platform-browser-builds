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
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * \@publicApi
 */
export class BrowserAnimationsModule {
}
BrowserAnimationsModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            },] },
];
BrowserAnimationsModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserAnimationsModule, bootstrap: [], declarations: [], imports: [], exports: [BrowserModule] });
BrowserAnimationsModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserAnimationsModule_Factory(t) { return new (t || BrowserAnimationsModule)(); }, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [[BrowserModule]] });
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            }]
    }], null, null);
/**
 * A null player that must be imported to allow disabling of animations.
 * \@publicApi
 */
export class NoopAnimationsModule {
}
NoopAnimationsModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
NoopAnimationsModule.ngModuleDef = i0.ɵdefineNgModule({ type: NoopAnimationsModule, bootstrap: [], declarations: [], imports: [], exports: [BrowserModule] });
NoopAnimationsModule.ngInjectorDef = i0.defineInjector({ factory: function NoopAnimationsModule_Factory(t) { return new (t || NoopAnimationsModule)(); }, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [[BrowserModule]] });
/*@__PURE__*/ i0.ɵsetClassMetadata(NoopAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            }]
    }], null, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXhELE9BQU8sRUFBQyw0QkFBNEIsRUFBRSxpQ0FBaUMsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7Ozs7QUFXNUYsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSm5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7YUFDeEM7O2lFQUNZLHVCQUF1QiwwREFIeEIsYUFBYTtvSUFHWix1QkFBdUIsbUJBRnZCLDRCQUE0QixZQUQ5QixDQUFDLGFBQWEsQ0FBQzttQ0FHYix1QkFBdUI7Y0FKbkMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsU0FBUyxFQUFFLDRCQUE0QjthQUN4Qzs7Ozs7O0FBWUQsTUFBTSxPQUFPLG9CQUFvQjs7O1lBSmhDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7YUFDN0M7OzhEQUNZLG9CQUFvQiwwREFIckIsYUFBYTs4SEFHWixvQkFBb0IsbUJBRnBCLGlDQUFpQyxZQURuQyxDQUFDLGFBQWEsQ0FBQzttQ0FHYixvQkFBb0I7Y0FKaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsU0FBUyxFQUFFLGlDQUFpQzthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLCBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlN9IGZyb20gJy4vcHJvdmlkZXJzJztcblxuLyoqXG4gKiBFeHBvcnRzIGBCcm93c2VyTW9kdWxlYCB3aXRoIGFkZGl0aW9uYWwgW2RlcGVuZGVuY3ktaW5qZWN0aW9uIHByb3ZpZGVyc10oZ3VpZGUvZ2xvc3NhcnkjcHJvdmlkZXIpXG4gKiBmb3IgdXNlIHdpdGggYW5pbWF0aW9ucy4gU2VlIFtBbmltYXRpb25zXShndWlkZS9hbmltYXRpb25zKS5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIHtcbn1cblxuLyoqXG4gKiBBIG51bGwgcGxheWVyIHRoYXQgbXVzdCBiZSBpbXBvcnRlZCB0byBhbGxvdyBkaXNhYmxpbmcgb2YgYW5pbWF0aW9ucy5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IEJST1dTRVJfTk9PUF9BTklNQVRJT05TX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgTm9vcEFuaW1hdGlvbnNNb2R1bGUge1xufVxuIl19