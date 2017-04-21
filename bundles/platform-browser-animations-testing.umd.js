/**
 * @license Angular v4.1.0-beta.1-70384db
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser/animations'), require('@angular/platform-browser/testing'), require('@angular/animations/browser'), require('@angular/core/testing')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser/animations', '@angular/platform-browser/testing', '@angular/animations/browser', '@angular/core/testing'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.animations = global.ng.platformBrowser.animations || {}, global.ng.platformBrowser.animations.testing = global.ng.platformBrowser.animations.testing || {}),global.ng.core,global._angular_platformBrowser_animations,global.ng.platformBrowser.testing,global.ng.animations.browser,global._angular_core_testing));
}(this, (function (exports,_angular_core,_angular_platformBrowser_animations,_angular_platformBrowser_testing,_angular_animations_browser,_angular_core_testing) { 'use strict';

/**
 * @license Angular v4.1.0-beta.1-70384db
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
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
    return function () { return engine.flush(); };
}
var PLATFORM_BROWSER_ANIMATIONS_TOKENS = [
    { provide: _angular_core_testing.FLUSH_ANIMATIONS_FN, useFactory: linkAnimationFlushFn, deps: [_angular_animations_browser.ɵAnimationEngine] },
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
var BrowserAnimationsTestingModule = (function () {
    function BrowserAnimationsTestingModule() {
    }
    return BrowserAnimationsTestingModule;
}());
BrowserAnimationsTestingModule.decorators = [
    { type: _angular_core.NgModule, args: [{ exports: [_angular_platformBrowser_testing.BrowserTestingModule], providers: [PLATFORM_BROWSER_ANIMATIONS_TOKENS] },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsTestingModule.ctorParameters = function () { return []; };
/**
 * NgModule for testing.
 *
 * \@experimental
 */
var NoopAnimationsTestingModule = (function () {
    function NoopAnimationsTestingModule() {
    }
    return NoopAnimationsTestingModule;
}());
NoopAnimationsTestingModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_platformBrowser_testing.BrowserTestingModule, _angular_platformBrowser_animations.NoopAnimationsModule],
                providers: [PLATFORM_BROWSER_ANIMATIONS_TOKENS]
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsTestingModule.ctorParameters = function () { return []; };

exports.BrowserAnimationsTestingModule = BrowserAnimationsTestingModule;
exports.NoopAnimationsTestingModule = NoopAnimationsTestingModule;
exports.ɵb = PLATFORM_BROWSER_ANIMATIONS_TOKENS;
exports.ɵa = linkAnimationFlushFn;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-animations-testing.umd.js.map
