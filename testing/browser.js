"use strict";
var browser_static_1 = require('./browser_static');
var index_1 = require('../index');
var compiler_1 = require('@angular/compiler');
var testing_1 = require('@angular/compiler/testing');
var dom_test_component_renderer_1 = require('./dom_test_component_renderer');
/**
 * Default platform providers for testing.
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [browser_static_1.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS];
exports.ADDITIONAL_TEST_BROWSER_PROVIDERS = [
    /*@ts2dart_Provider*/ { provide: compiler_1.DirectiveResolver, useClass: testing_1.MockDirectiveResolver },
    /*@ts2dart_Provider*/ { provide: compiler_1.ViewResolver, useClass: testing_1.MockViewResolver },
    testing_1.TestComponentBuilder,
    /*@ts2dart_Provider*/ { provide: testing_1.TestComponentRenderer, useClass: dom_test_component_renderer_1.DOMTestComponentRenderer },
];
/**
 * Default application providers for testing.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = 
/*@ts2dart_const*/ [
    index_1.BROWSER_APP_PROVIDERS,
    browser_static_1.ADDITIONAL_TEST_BROWSER_STATIC_PROVIDERS,
    exports.ADDITIONAL_TEST_BROWSER_PROVIDERS
];
//# sourceMappingURL=browser.js.map