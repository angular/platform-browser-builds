/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
import * as i0 from "@angular/core";
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
/** @nocollapse */ BrowserAnimationsModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserAnimationsModule, exports: [BrowserModule] });
/** @nocollapse */ BrowserAnimationsModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserAnimationsModule_Factory(t) { return new (t || BrowserAnimationsModule)(); }, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [[BrowserModule]] });
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
/** @nocollapse */ NoopAnimationsModule.ngModuleDef = i0.ɵdefineNgModule({ type: NoopAnimationsModule, exports: [BrowserModule] });
/** @nocollapse */ NoopAnimationsModule.ngInjectorDef = i0.defineInjector({ factory: function NoopAnimationsModule_Factory(t) { return new (t || NoopAnimationsModule)(); }, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [[BrowserModule]] });
/*@__PURE__*/ i0.ɵsetClassMetadata(NoopAnimationsModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            }]
    }], null, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUUsaUNBQWlDLEVBQUMsTUFBTSxhQUFhLENBQUM7Ozs7Ozs7QUFXNUYsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSm5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSw0QkFBNEI7YUFDeEM7O2lFQUNZLHVCQUF1QixZQUh4QixhQUFhO29JQUdaLHVCQUF1QixtQkFGdkIsNEJBQTRCLFlBRDlCLENBQUMsYUFBYSxDQUFDO21DQUdiLHVCQUF1QjtjQUpuQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixTQUFTLEVBQUUsNEJBQTRCO2FBQ3hDOzs7Ozs7QUFZRCxNQUFNLE9BQU8sb0JBQW9COzs7WUFKaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDeEIsU0FBUyxFQUFFLGlDQUFpQzthQUM3Qzs7OERBQ1ksb0JBQW9CLFlBSHJCLGFBQWE7OEhBR1osb0JBQW9CLG1CQUZwQixpQ0FBaUMsWUFEbkMsQ0FBQyxhQUFhLENBQUM7bUNBR2Isb0JBQW9CO2NBSmhDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7YUFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7QlJPV1NFUl9BTklNQVRJT05TX1BST1ZJREVSUywgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5cbi8qKlxuICogRXhwb3J0cyBgQnJvd3Nlck1vZHVsZWAgd2l0aCBhZGRpdGlvbmFsIFtkZXBlbmRlbmN5LWluamVjdGlvbiBwcm92aWRlcnNdKGd1aWRlL2dsb3NzYXJ5I3Byb3ZpZGVyKVxuICogZm9yIHVzZSB3aXRoIGFuaW1hdGlvbnMuIFNlZSBbQW5pbWF0aW9uc10oZ3VpZGUvYW5pbWF0aW9ucykuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB7XG59XG5cbi8qKlxuICogQSBudWxsIHBsYXllciB0aGF0IG11c3QgYmUgaW1wb3J0ZWQgdG8gYWxsb3cgZGlzYWJsaW5nIG9mIGFuaW1hdGlvbnMuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBCUk9XU0VSX05PT1BfQU5JTUFUSU9OU19QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIE5vb3BBbmltYXRpb25zTW9kdWxlIHtcbn1cbiJdfQ==