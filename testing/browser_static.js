"use strict";
var core_1 = require('@angular/core');
var browser_1 = require('../src/browser');
var browser_adapter_1 = require('../src/browser/browser_adapter');
var testing_1 = require('@angular/common/testing');
var common_1 = require('@angular/common');
var browser_util_1 = require('./browser_util');
var testing_2 = require('@angular/core/testing');
var ng_probe_1 = require('../src/dom/debug/ng_probe');
var core_private_1 = require('../core_private');
/**
 * Default platform providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_COMMON_PROVIDERS,
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }
];
exports.ADDITIONAL_TEST_BROWSER_STATIC_PROVIDERS = [
    { provide: core_1.APP_ID, useValue: 'a' },
    ng_probe_1.ELEMENT_PROBE_PROVIDERS,
    testing_2.Log,
    { provide: core_1.NgZone, useFactory: createNgZone },
    { provide: common_1.LocationStrategy, useClass: testing_1.MockLocationStrategy },
    { provide: core_private_1.AnimationDriver, useClass: core_private_1.NoOpAnimationDriver }
];
/**
 * Default application providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = [browser_1.BROWSER_APP_PROVIDERS, exports.ADDITIONAL_TEST_BROWSER_STATIC_PROVIDERS];
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    browser_util_1.BrowserDetection.setup();
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: true });
}
//# sourceMappingURL=browser_static.js.map