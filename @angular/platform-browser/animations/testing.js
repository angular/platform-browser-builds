/**
 * @license Angular v4.1.0-beta.1-70384db
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { FLUSH_ANIMATIONS_FN } from '@angular/core/testing';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} engine
 * @return {?}
 */
function linkAnimationFlushFn(engine) {
    return () => engine.flush();
}
const PLATFORM_BROWSER_ANIMATIONS_TOKENS = [
    { provide: FLUSH_ANIMATIONS_FN, useFactory: linkAnimationFlushFn, deps: [ɵAnimationEngine] },
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * NgModule for testing.
 *
 * \@experimental
 */
class BrowserAnimationsTestingModule {
}
BrowserAnimationsTestingModule.decorators = [
    { type: NgModule, args: [{ exports: [BrowserTestingModule], providers: [PLATFORM_BROWSER_ANIMATIONS_TOKENS] },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsTestingModule.ctorParameters = () => [];
/**
 * NgModule for testing.
 *
 * \@experimental
 */
class NoopAnimationsTestingModule {
}
NoopAnimationsTestingModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserTestingModule, NoopAnimationsModule],
                providers: [PLATFORM_BROWSER_ANIMATIONS_TOKENS]
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsTestingModule.ctorParameters = () => [];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BrowserAnimationsTestingModule, NoopAnimationsTestingModule, PLATFORM_BROWSER_ANIMATIONS_TOKENS as ɵb, linkAnimationFlushFn as ɵa };
//# sourceMappingURL=testing.js.map
