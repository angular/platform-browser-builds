/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var dom_adapter_1 = require('../dom/dom_adapter');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var BrowserGetTestability = (function () {
    function BrowserGetTestability() {
    }
    BrowserGetTestability.init = function () { core_1.setTestabilityGetter(new BrowserGetTestability()); };
    BrowserGetTestability.prototype.addToWindow = function (registry) {
        lang_1.global.getAngularTestability = function (elem, findInAncestors) {
            if (findInAncestors === void 0) { findInAncestors = true; }
            var testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        lang_1.global.getAllAngularTestabilities = function () { return registry.getAllTestabilities(); };
        lang_1.global.getAllAngularRootElements = function () { return registry.getAllRootElements(); };
        var whenAllStable = function (callback /** TODO #9100 */) {
            var testabilities = lang_1.global.getAllAngularTestabilities();
            var count = testabilities.length;
            var didWork = false;
            var decrement = function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            });
        };
        if (!lang_1.global['frameworkStabilizers']) {
            lang_1.global['frameworkStabilizers'] = collection_1.ListWrapper.createGrowableSize(0);
        }
        lang_1.global['frameworkStabilizers'].push(whenAllStable);
    };
    BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        var t = registry.getTestability(elem);
        if (lang_1.isPresent(t)) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (dom_adapter_1.getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, dom_adapter_1.getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, dom_adapter_1.getDOM().parentElement(elem), true);
    };
    return BrowserGetTestability;
}());
exports.BrowserGetTestability = BrowserGetTestability;
//# sourceMappingURL=testability.js.map