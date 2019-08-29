/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵglobal as global } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { isCommentNode } from './browser_util';
/**
 * Jasmine matchers that check Angular specific conditions.
 *
 * Note: These matchers will only work in a browser environment.
 * @record
 * @template T
 */
export function NgMatchers() { }
if (false) {
    /**
     * Invert the matchers.
     * @type {?}
     */
    NgMatchers.prototype.not;
    /**
     * Expect the value to be a `Promise`.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toBePromise'}
     * @return {?}
     */
    NgMatchers.prototype.toBePromise = function () { };
    /**
     * Expect the value to be an instance of a class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toBeAnInstanceOf'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toBeAnInstanceOf = function (expected) { };
    /**
     * Expect the element to have exactly the given text.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveText'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveText = function (expected) { };
    /**
     * Expect the element to have the given CSS class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssClass'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveCssClass = function (expected) { };
    /**
     * Expect the element to have the given CSS styles.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssStyle'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toHaveCssStyle = function (expected) { };
    /**
     * Expect a class to implement the interface of the given class.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toImplement'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toImplement = function (expected) { };
    /**
     * Expect an exception to contain the given error text.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example testing/ts/matchers.ts region='toContainError'}
     * @param {?} expected
     * @return {?}
     */
    NgMatchers.prototype.toContainError = function (expected) { };
    /**
     * Expect a component of the given type to show.
     * @param {?} expectedComponentType
     * @param {?=} expectationFailOutput
     * @return {?}
     */
    NgMatchers.prototype.toContainComponent = function (expectedComponentType, expectationFailOutput) { };
}
/** @type {?} */
const _global = (/** @type {?} */ ((typeof window === 'undefined' ? global : window)));
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveText'}
 * @type {?}
 */
export const expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
((/** @type {?} */ (Map))).prototype['jasmineToString'] = (/**
 * @return {?}
 */
function () {
    /** @type {?} */
    const m = this;
    if (!m) {
        return '' + m;
    }
    /** @type {?} */
    const res = [];
    m.forEach((/**
     * @param {?} v
     * @param {?} k
     * @return {?}
     */
    (v, k) => { res.push(`${String(k)}:${String(v)}`); }));
    return `{ ${res.join(',')} }`;
});
_global.beforeEach((/**
 * @return {?}
 */
function () {
    // Custom handler for Map as we use Jasmine 2.4, and support for maps is not
    // added until Jasmine 2.6.
    jasmine.addCustomEqualityTester((/**
     * @param {?} actual
     * @param {?} expected
     * @return {?}
     */
    function compareMap(actual, expected) {
        if (actual instanceof Map) {
            /** @type {?} */
            let pass = actual.size === expected.size;
            if (pass) {
                actual.forEach((/**
                 * @param {?} v
                 * @param {?} k
                 * @return {?}
                 */
                (v, k) => {
                    pass = pass && jasmine.matchersUtil.equals(v, expected.get(k));
                }));
            }
            return pass;
        }
        else {
            // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
            return (/** @type {?} */ (undefined));
        }
    }));
    jasmine.addMatchers({
        toBePromise: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actual
                 * @return {?}
                 */
                function (actual) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actual + ' to be a promise'; } };
                })
            };
        }),
        toBeAnInstanceOf: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actual
                 * @param {?} expectedClass
                 * @return {?}
                 */
                function (actual, expectedClass) {
                    /** @type {?} */
                    const pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                })
            };
        }),
        toHaveText: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actual
                 * @param {?} expectedText
                 * @return {?}
                 */
                function (actual, expectedText) {
                    /** @type {?} */
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                })
            };
        }),
        toHaveCssClass: (/**
         * @return {?}
         */
        function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return (/**
                 * @param {?} actual
                 * @param {?} className
                 * @return {?}
                 */
                function (actual, className) {
                    return {
                        pass: getDOM().hasClass(actual, className) == !isNot,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                });
            }
        }),
        toHaveCssStyle: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actual
                 * @param {?} styles
                 * @return {?}
                 */
                function (actual, styles) {
                    /** @type {?} */
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach((/**
                         * @param {?} prop
                         * @return {?}
                         */
                        prop => {
                            allPassed = allPassed && getDOM().hasStyle(actual, prop, styles[prop]);
                        }));
                    }
                    return {
                        pass: allPassed,
                        /**
                         * @return {?}
                         */
                        get message() {
                            /** @type {?} */
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                })
            };
        }),
        toContainError: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actual
                 * @param {?} expectedText
                 * @return {?}
                 */
                function (actual, expectedText) {
                    /** @type {?} */
                    const errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                })
            };
        }),
        toImplement: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actualObject
                 * @param {?} expectedInterface
                 * @return {?}
                 */
                function (actualObject, expectedInterface) {
                    /** @type {?} */
                    const intProps = Object.keys(expectedInterface.prototype);
                    /** @type {?} */
                    const missedMethods = [];
                    intProps.forEach((/**
                     * @param {?} k
                     * @return {?}
                     */
                    (k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    }));
                    return {
                        pass: missedMethods.length == 0,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(', ');
                        }
                    };
                })
            };
        }),
        toContainComponent: (/**
         * @return {?}
         */
        function () {
            return {
                compare: (/**
                 * @param {?} actualFixture
                 * @param {?} expectedComponentType
                 * @return {?}
                 */
                function (actualFixture, expectedComponentType) {
                    /** @type {?} */
                    const failOutput = arguments[2];
                    /** @type {?} */
                    const msgFn = (/**
                     * @param {?} msg
                     * @return {?}
                     */
                    (msg) => [msg, failOutput].filter(Boolean).join(', '));
                    // verify correct actual type
                    if (!(actualFixture instanceof ComponentFixture)) {
                        return {
                            pass: false,
                            message: msgFn(`Expected actual to be of type \'ComponentFixture\' [actual=${actualFixture.constructor.name}]`)
                        };
                    }
                    /** @type {?} */
                    const found = !!actualFixture.debugElement.query(By.directive(expectedComponentType));
                    return found ?
                        { pass: true } :
                        { pass: false, message: msgFn(`Expected ${expectedComponentType.name} to show`) };
                })
            };
        })
    });
}));
/**
 * @param {?} n
 * @return {?}
 */
function elementText(n) {
    /** @type {?} */
    const hasNodes = (/**
     * @param {?} n
     * @return {?}
     */
    (n) => {
        /** @type {?} */
        const children = getDOM().childNodes(n);
        return children && children.length > 0;
    });
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n) && ((/** @type {?} */ (n))).tagName == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(getDOM().getDistributedNodes(n)));
    }
    if (hasShadowRoot(n)) {
        return elementText(getDOM().childNodesAsList(((/** @type {?} */ (n))).shadowRoot));
    }
    if (hasNodes(n)) {
        return elementText(getDOM().childNodesAsList(n));
    }
    return (/** @type {?} */ (getDOM().getText(n)));
}
/**
 * @param {?} node
 * @return {?}
 */
function hasShadowRoot(node) {
    return node.shadowRoot != null && node instanceof HTMLElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFPLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQVM3QyxnQ0FnRkM7Ozs7OztJQURDLHlCQUFtQjs7Ozs7Ozs7OztJQXRFbkIsbURBQXVCOzs7Ozs7Ozs7OztJQVV2QixnRUFBeUM7Ozs7Ozs7Ozs7O0lBVXpDLDBEQUFzQzs7Ozs7Ozs7Ozs7SUFVdEMsOERBQTBDOzs7Ozs7Ozs7OztJQVUxQyw4REFBZ0U7Ozs7Ozs7Ozs7O0lBVWhFLDJEQUFvQzs7Ozs7Ozs7Ozs7SUFVcEMsOERBQXVDOzs7Ozs7O0lBS3ZDLHNHQUEyRjs7O01BUXZGLE9BQU8sR0FBRyxtQkFBSyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Ozs7Ozs7O0FBU3RFLE1BQU0sT0FBTyxNQUFNLEdBQTBDLE9BQU8sQ0FBQyxNQUFNOzs7OztBQU8zRSxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDOzs7QUFBRzs7VUFDcEMsQ0FBQyxHQUFHLElBQUk7SUFDZCxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQ04sT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2Y7O1VBQ0ssR0FBRyxH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QyxDQUFDO0tBQ2xEO0lBRUQsT0FBTyxtQkFBQSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMvQixDQUFDOzs7OztBQUVELFNBQVMsYUFBYSxDQUFDLElBQVM7SUFDOUIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLFlBQVksV0FBVyxDQUFDO0FBQ2hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHtUeXBlLCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21wb25lbnRGaXh0dXJlfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHtCeSwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7aXNDb21tZW50Tm9kZX0gZnJvbSAnLi9icm93c2VyX3V0aWwnO1xuXG5cblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoZXJzIHRoYXQgY2hlY2sgQW5ndWxhciBzcGVjaWZpYyBjb25kaXRpb25zLlxuICpcbiAqIE5vdGU6IFRoZXNlIG1hdGNoZXJzIHdpbGwgb25seSB3b3JrIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01hdGNoZXJzPFQgPSBhbnk+IGV4dGVuZHMgamFzbWluZS5NYXRjaGVyczxUPiB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGEgYFByb21pc2VgLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQmVQcm9taXNlJ31cbiAgICovXG4gIHRvQmVQcm9taXNlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0JlQW5JbnN0YW5jZU9mJ31cbiAgICovXG4gIHRvQmVBbkluc3RhbmNlT2YoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIGV4YWN0bHkgdGhlIGdpdmVuIHRleHQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc0NsYXNzJ31cbiAgICovXG4gIHRvSGF2ZUNzc0NsYXNzKGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIHN0eWxlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NTdHlsZSd9XG4gICAqL1xuICB0b0hhdmVDc3NTdHlsZShleHBlY3RlZDoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNsYXNzIHRvIGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIG9mIHRoZSBnaXZlbiBjbGFzcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0ltcGxlbWVudCd9XG4gICAqL1xuICB0b0ltcGxlbWVudChleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGFuIGV4Y2VwdGlvbiB0byBjb250YWluIHRoZSBnaXZlbiBlcnJvciB0ZXh0LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQ29udGFpbkVycm9yJ31cbiAgICovXG4gIHRvQ29udGFpbkVycm9yKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYSBjb21wb25lbnQgb2YgdGhlIGdpdmVuIHR5cGUgdG8gc2hvdy5cbiAgICovXG4gIHRvQ29udGFpbkNvbXBvbmVudChleHBlY3RlZENvbXBvbmVudFR5cGU6IFR5cGU8YW55PiwgZXhwZWN0YXRpb25GYWlsT3V0cHV0PzogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW52ZXJ0IHRoZSBtYXRjaGVycy5cbiAgICovXG4gIG5vdDogTmdNYXRjaGVyczxUPjtcbn1cblxuY29uc3QgX2dsb2JhbCA9IDxhbnk+KHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93KTtcblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoaW5nIGZ1bmN0aW9uIHdpdGggQW5ndWxhciBtYXRjaGVycyBtaXhlZCBpbi5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAqL1xuZXhwb3J0IGNvbnN0IGV4cGVjdDogPFQgPSBhbnk+KGFjdHVhbDogVCkgPT4gTmdNYXRjaGVyczxUPiA9IF9nbG9iYWwuZXhwZWN0O1xuXG5cbi8vIFNvbWUgTWFwIHBvbHlmaWxscyBkb24ndCBwb2x5ZmlsbCBNYXAudG9TdHJpbmcgY29ycmVjdGx5LCB3aGljaFxuLy8gZ2l2ZXMgdXMgYmFkIGVycm9yIG1lc3NhZ2VzIGluIHRlc3RzLlxuLy8gVGhlIG9ubHkgd2F5IHRvIGRvIHRoaXMgaW4gSmFzbWluZSBpcyB0byBtb25rZXkgcGF0Y2ggYSBtZXRob2Rcbi8vIHRvIHRoZSBvYmplY3QgOi0oXG4oTWFwIGFzIGFueSkucHJvdG90eXBlWydqYXNtaW5lVG9TdHJpbmcnXSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBtID0gdGhpcztcbiAgaWYgKCFtKSB7XG4gICAgcmV0dXJuICcnICsgbTtcbiAgfVxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIG0uZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHsgcmVzLnB1c2goYCR7U3RyaW5nKGspfToke1N0cmluZyh2KX1gKTsgfSk7XG4gIHJldHVybiBgeyAke3Jlcy5qb2luKCcsJyl9IH1gO1xufTtcblxuX2dsb2JhbC5iZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAvLyBDdXN0b20gaGFuZGxlciBmb3IgTWFwIGFzIHdlIHVzZSBKYXNtaW5lIDIuNCwgYW5kIHN1cHBvcnQgZm9yIG1hcHMgaXMgbm90XG4gIC8vIGFkZGVkIHVudGlsIEphc21pbmUgMi42LlxuICBqYXNtaW5lLmFkZEN1c3RvbUVxdWFsaXR5VGVzdGVyKGZ1bmN0aW9uIGNvbXBhcmVNYXAoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICBsZXQgcGFzcyA9IGFjdHVhbC5zaXplID09PSBleHBlY3RlZC5zaXplO1xuICAgICAgaWYgKHBhc3MpIHtcbiAgICAgICAgYWN0dWFsLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7XG4gICAgICAgICAgcGFzcyA9IHBhc3MgJiYgamFzbWluZS5tYXRjaGVyc1V0aWwuZXF1YWxzKHYsIGV4cGVjdGVkLmdldChrKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8obWlza28pOiB3ZSBzaG91bGQgY2hhbmdlIHRoZSByZXR1cm4sIGJ1dCBqYXNtaW5lLmQudHMgaXMgbm90IG51bGwgc2FmZVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZCAhO1xuICAgIH1cbiAgfSk7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIHRvQmVQcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhY3R1YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICByZXR1cm4ge3Bhc3M6IHBhc3MsIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWwgKyAnIHRvIGJlIGEgcHJvbWlzZSc7IH19O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0JlQW5JbnN0YW5jZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZENsYXNzOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBwYXNzID0gdHlwZW9mIGFjdHVhbCA9PT0gJ29iamVjdCcgJiYgYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogcGFzcyxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWwgKyAnIHRvIGJlIGFuIGluc3RhbmNlIG9mICcgKyBleHBlY3RlZENsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZVRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogc3RyaW5nKSB7XG4gICAgICAgICAgY29uc3QgYWN0dWFsVGV4dCA9IGVsZW1lbnRUZXh0KGFjdHVhbCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFjdHVhbFRleHQgPT0gZXhwZWN0ZWRUZXh0LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbFRleHQgKyAnIHRvIGJlIGVxdWFsIHRvICcgKyBleHBlY3RlZFRleHQ7IH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVDc3NDbGFzczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge2NvbXBhcmU6IGJ1aWxkRXJyb3IoZmFsc2UpLCBuZWdhdGl2ZUNvbXBhcmU6IGJ1aWxkRXJyb3IodHJ1ZSl9O1xuXG4gICAgICBmdW5jdGlvbiBidWlsZEVycm9yKGlzTm90OiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhY3R1YWw6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogZ2V0RE9NKCkuaGFzQ2xhc3MoYWN0dWFsLCBjbGFzc05hbWUpID09ICFpc05vdCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHtpc05vdCA/ICdub3QgJyA6ICcnfXRvIGNvbnRhaW4gdGhlIENTUyBjbGFzcyBcIiR7Y2xhc3NOYW1lfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0hhdmVDc3NTdHlsZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgc3R5bGVzOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKSB7XG4gICAgICAgICAgbGV0IGFsbFBhc3NlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IGdldERPTSgpLmhhc1N0eWxlKGFjdHVhbCwgc3R5bGVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gT2JqZWN0LmtleXMoc3R5bGVzKS5sZW5ndGggIT09IDA7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICAgIGFsbFBhc3NlZCA9IGFsbFBhc3NlZCAmJiBnZXRET00oKS5oYXNTdHlsZShhY3R1YWwsIHByb3AsIHN0eWxlc1twcm9wXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWxsUGFzc2VkLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVTdHIgPSB0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/IHN0eWxlcyA6IEpTT04uc3RyaW5naWZ5KHN0eWxlcyk7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAkeyFhbGxQYXNzZWQgPyAnICcgOiAnbm90ICd9dG8gY29udGFpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICBDU1MgJHt0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/ICdwcm9wZXJ0eScgOiAnc3R5bGVzJ30gXCIke2V4cGVjdGVkVmFsdWVTdHJ9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQ29udGFpbkVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGFjdHVhbC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBlcnJvck1lc3NhZ2UuaW5kZXhPZihleHBlY3RlZFRleHQpID4gLTEsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgZXJyb3JNZXNzYWdlICsgJyB0byBjb250YWluICcgKyBleHBlY3RlZFRleHQ7IH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0ltcGxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWxPYmplY3Q6IGFueSwgZXhwZWN0ZWRJbnRlcmZhY2U6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGludFByb3BzID0gT2JqZWN0LmtleXMoZXhwZWN0ZWRJbnRlcmZhY2UucHJvdG90eXBlKTtcblxuICAgICAgICAgIGNvbnN0IG1pc3NlZE1ldGhvZHM6IGFueVtdID0gW107XG4gICAgICAgICAgaW50UHJvcHMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgaWYgKCFhY3R1YWxPYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlW2tdKSBtaXNzZWRNZXRob2RzLnB1c2goayk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogbWlzc2VkTWV0aG9kcy5sZW5ndGggPT0gMCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxPYmplY3QgKyAnIHRvIGhhdmUgdGhlIGZvbGxvd2luZyBtZXRob2RzOiAnICtcbiAgICAgICAgICAgICAgICAgIG1pc3NlZE1ldGhvZHMuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0NvbnRhaW5Db21wb25lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsRml4dHVyZTogYW55LCBleHBlY3RlZENvbXBvbmVudFR5cGU6IFR5cGU8YW55Pikge1xuICAgICAgICAgIGNvbnN0IGZhaWxPdXRwdXQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgY29uc3QgbXNnRm4gPSAobXNnOiBzdHJpbmcpOiBzdHJpbmcgPT4gW21zZywgZmFpbE91dHB1dF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywgJyk7XG5cbiAgICAgICAgICAvLyB2ZXJpZnkgY29ycmVjdCBhY3R1YWwgdHlwZVxuICAgICAgICAgIGlmICghKGFjdHVhbEZpeHR1cmUgaW5zdGFuY2VvZiBDb21wb25lbnRGaXh0dXJlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcGFzczogZmFsc2UsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IG1zZ0ZuKFxuICAgICAgICAgICAgICAgICAgYEV4cGVjdGVkIGFjdHVhbCB0byBiZSBvZiB0eXBlIFxcJ0NvbXBvbmVudEZpeHR1cmVcXCcgW2FjdHVhbD0ke2FjdHVhbEZpeHR1cmUuY29uc3RydWN0b3IubmFtZX1dYClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZm91bmQgPSAhIWFjdHVhbEZpeHR1cmUuZGVidWdFbGVtZW50LnF1ZXJ5KEJ5LmRpcmVjdGl2ZShleHBlY3RlZENvbXBvbmVudFR5cGUpKTtcbiAgICAgICAgICByZXR1cm4gZm91bmQgP1xuICAgICAgICAgICAgICB7cGFzczogdHJ1ZX0gOlxuICAgICAgICAgICAgICB7cGFzczogZmFsc2UsIG1lc3NhZ2U6IG1zZ0ZuKGBFeHBlY3RlZCAke2V4cGVjdGVkQ29tcG9uZW50VHlwZS5uYW1lfSB0byBzaG93YCl9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gZWxlbWVudFRleHQobjogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgaGFzTm9kZXMgPSAobjogYW55KSA9PiB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBnZXRET00oKS5jaGlsZE5vZGVzKG4pO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oJycpO1xuICB9XG5cbiAgaWYgKGlzQ29tbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShuKSAmJiAobiBhcyBFbGVtZW50KS50YWdOYW1lID09ICdDT05URU5UJykge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZ2V0RE9NKCkuZ2V0RGlzdHJpYnV0ZWROb2RlcyhuKSkpO1xuICB9XG5cbiAgaWYgKGhhc1NoYWRvd1Jvb3QobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoZ2V0RE9NKCkuY2hpbGROb2Rlc0FzTGlzdCgoPGFueT5uKS5zaGFkb3dSb290KSk7XG4gIH1cblxuICBpZiAoaGFzTm9kZXMobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoZ2V0RE9NKCkuY2hpbGROb2Rlc0FzTGlzdChuKSk7XG4gIH1cblxuICByZXR1cm4gZ2V0RE9NKCkuZ2V0VGV4dChuKSAhO1xufVxuXG5mdW5jdGlvbiBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5zaGFkb3dSb290ICE9IG51bGwgJiYgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuIl19