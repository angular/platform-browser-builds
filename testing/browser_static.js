"use strict";
var core_1 = require('@angular/core');
var browser_1 = require('../src/platform/common/browser');
var browser_adapter_1 = require('../src/browser/browser_adapter');
var animation_builder_1 = require('../src/animate/animation_builder');
var animation_builder_mock_1 = require('./animation_builder_mock');
var testing_1 = require('@angular/common/testing');
var common_1 = require('@angular/common');
var testing_2 = require('@angular/core/testing');
var browser_util_1 = require('./browser_util');
var testing_3 = require('@angular/core/testing');
var ng_probe_1 = require('../src/dom/debug/ng_probe');
var lang_1 = require('../src/facade/lang');
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    browser_util_1.BrowserDetection.setup();
}
function createNgZone() {
    return lang_1.IS_DART ? new testing_2.MockNgZone() : new core_1.NgZone({ enableLongStackTrace: true });
}
/**
 * Default platform providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_COMMON_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }
];
exports.ADDITIONAL_TEST_BROWSER_STATIC_PROVIDERS = 
/*@ts2dart_const*/ [
    /*@ts2dart_Provider*/ { provide: core_1.APP_ID, useValue: 'a' },
    ng_probe_1.ELEMENT_PROBE_PROVIDERS,
    testing_3.Log,
    /*@ts2dart_Provider*/ { provide: core_1.NgZone, useFactory: createNgZone },
    /*@ts2dart_Provider*/ { provide: common_1.LocationStrategy, useClass: testing_1.MockLocationStrategy },
    /*@ts2dart_Provider*/ { provide: animation_builder_1.AnimationBuilder, useClass: animation_builder_mock_1.MockAnimationBuilder }
];
/**
 * Default application providers for testing without a compiler.
 */
exports.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS = 
/*@ts2dart_const*/ [browser_1.BROWSER_APP_COMMON_PROVIDERS, exports.ADDITIONAL_TEST_BROWSER_STATIC_PROVIDERS];
//# sourceMappingURL=browser_static.js.map