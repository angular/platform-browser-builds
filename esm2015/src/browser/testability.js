/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { setTestabilityGetter, ɵglobal as global } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
export class BrowserGetTestability {
    /**
     * @return {?}
     */
    static init() { setTestabilityGetter(new BrowserGetTestability()); }
    /**
     * @param {?} registry
     * @return {?}
     */
    addToWindow(registry) {
        global['getAngularTestability'] = (elem, findInAncestors = true) => {
            const /** @type {?} */ testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        global['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        global['getAllAngularRootElements'] = () => registry.getAllRootElements();
        const /** @type {?} */ whenAllStable = (callback /** TODO #9100 */) => {
            const /** @type {?} */ testabilities = global['getAllAngularTestabilities']();
            let /** @type {?} */ count = testabilities.length;
            let /** @type {?} */ didWork = false;
            const /** @type {?} */ decrement = function (didWork_ /** TODO #9100 */) {
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
        if (!global['frameworkStabilizers']) {
            global['frameworkStabilizers'] = [];
        }
        global['frameworkStabilizers'].push(whenAllStable);
    }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const /** @type {?} */ t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
    }
}
//# sourceMappingURL=testability.js.map