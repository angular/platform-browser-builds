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
import { ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
/**
 * Jasmine matchers that check Angular specific conditions.
 * @record
 */
export function NgMatchers() { }
function NgMatchers_tsickle_Closure_declarations() {
    /**
     * Expect the value to be a `Promise`.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toBePromise'}
     * @type {?}
     */
    NgMatchers.prototype.toBePromise;
    /**
     * Expect the value to be an instance of a class.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toBeAnInstanceOf'}
     * @type {?}
     */
    NgMatchers.prototype.toBeAnInstanceOf;
    /**
     * Expect the element to have exactly the given text.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveText'}
     * @type {?}
     */
    NgMatchers.prototype.toHaveText;
    /**
     * Expect the element to have the given CSS class.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssClass'}
     * @type {?}
     */
    NgMatchers.prototype.toHaveCssClass;
    /**
     * Expect the element to have the given CSS styles.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toHaveCssStyle'}
     * @type {?}
     */
    NgMatchers.prototype.toHaveCssStyle;
    /**
     * Expect a class to implement the interface of the given class.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toImplement'}
     * @type {?}
     */
    NgMatchers.prototype.toImplement;
    /**
     * Expect an exception to contain the given error text.
     *
     * ## Example
     *
     * {\@example testing/ts/matchers.ts region='toContainError'}
     * @type {?}
     */
    NgMatchers.prototype.toContainError;
    /**
     * Invert the matchers.
     * @type {?}
     */
    NgMatchers.prototype.not;
}
const /** @type {?} */ _global = /** @type {?} */ ((typeof window === 'undefined' ? global : window));
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {\@example testing/ts/matchers.ts region='toHaveText'}
 */
export const /** @type {?} */ expect = /** @type {?} */ (_global.expect);
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
(/** @type {?} */ (Map)).prototype['jasmineToString'] = function () {
    const /** @type {?} */ m = this;
    if (!m) {
        return '' + m;
    }
    const /** @type {?} */ res = [];
    m.forEach((v, k) => { res.push(`${String(k)}:${String(v)}`); });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    jasmine.addMatchers({
        // Custom handler for Map as Jasmine does not support it yet
        toEqual: function (util) {
            return {
                compare: function (actual, expected) {
                    return { pass: util.equals(actual, expected, [compareMap]) };
                }
            };
            /**
             * @param {?} actual
             * @param {?} expected
             * @return {?}
             */
            function compareMap(actual, expected) {
                if (actual instanceof Map) {
                    let /** @type {?} */ pass = actual.size === expected.size;
                    if (pass) {
                        actual.forEach((v, k) => { pass = pass && util.equals(v, expected.get(k)); });
                    }
                    return pass;
                }
                else {
                    // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
                    return /** @type {?} */ ((undefined));
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual) {
                    const /** @type {?} */ pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    const /** @type {?} */ pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    const /** @type {?} */ actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: getDOM().hasClass(actual, className) == !isNot,
                        /**
                         * @return {?}
                         */
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    let /** @type {?} */ allPassed;
                    if (typeof styles === 'string') {
                        allPassed = getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && getDOM().hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        /**
                         * @return {?}
                         */
                        get message() {
                            const /** @type {?} */ expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    const /** @type {?} */ errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        /**
                         * @return {?}
                         */
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    const /** @type {?} */ intProps = Object.keys(expectedInterface.prototype);
                    const /** @type {?} */ missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
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
                }
            };
        }
    });
});
/**
 * @param {?} n
 * @return {?}
 */
function elementText(n) {
    const /** @type {?} */ hasNodes = (n) => {
        const /** @type {?} */ children = getDOM().childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (getDOM().isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n) && getDOM().tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(getDOM().getDistributedNodes(n)));
    }
    if (getDOM().hasShadowRoot(n)) {
        return elementText(getDOM().childNodesAsList(getDOM().getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(getDOM().childNodesAsList(n));
    }
    return /** @type {?} */ ((getDOM().getText(n)));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZFNUQsdUJBQU0sT0FBTyxxQkFBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDOzs7Ozs7OztBQVN2RSxNQUFNLENBQUMsdUJBQU0sTUFBTSxxQkFBcUMsT0FBTyxDQUFDLE1BQU0sQ0FBQSxDQUFDOzs7OztBQU92RSxtQkFBQyxHQUFVLEVBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRztJQUMxQyx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2YsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNmO0lBQ0QsdUJBQU0sR0FBRyxHQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcs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ZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmltcG9ydCB7ybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuXG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGVycyB0aGF0IGNoZWNrIEFuZ3VsYXIgc3BlY2lmaWMgY29uZGl0aW9ucy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01hdGNoZXJzIGV4dGVuZHMgamFzbWluZS5NYXRjaGVycyB7XG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGEgYFByb21pc2VgLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZVByb21pc2UnfVxuICAgKi9cbiAgdG9CZVByb21pc2UoKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9CZUFuSW5zdGFuY2VPZid9XG4gICAqL1xuICB0b0JlQW5JbnN0YW5jZU9mKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSBleGFjdGx5IHRoZSBnaXZlbiB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzQ2xhc3MnfVxuICAgKi9cbiAgdG9IYXZlQ3NzQ2xhc3MoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1Mgc3R5bGVzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlQ3NzU3R5bGUnfVxuICAgKi9cbiAgdG9IYXZlQ3NzU3R5bGUoZXhwZWN0ZWQ6IHtbazogc3RyaW5nXTogc3RyaW5nfXxzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYSBjbGFzcyB0byBpbXBsZW1lbnQgdGhlIGludGVyZmFjZSBvZiB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0ltcGxlbWVudCd9XG4gICAqL1xuICB0b0ltcGxlbWVudChleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGFuIGV4Y2VwdGlvbiB0byBjb250YWluIHRoZSBnaXZlbiBlcnJvciB0ZXh0LlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9Db250YWluRXJyb3InfVxuICAgKi9cbiAgdG9Db250YWluRXJyb3IoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSA8YW55Pih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyk7XG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGluZyBmdW5jdGlvbiB3aXRoIEFuZ3VsYXIgbWF0Y2hlcnMgbWl4ZWQgaW4uXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gKi9cbmV4cG9ydCBjb25zdCBleHBlY3Q6IChhY3R1YWw6IGFueSkgPT4gTmdNYXRjaGVycyA9IDxhbnk+X2dsb2JhbC5leHBlY3Q7XG5cblxuLy8gU29tZSBNYXAgcG9seWZpbGxzIGRvbid0IHBvbHlmaWxsIE1hcC50b1N0cmluZyBjb3JyZWN0bHksIHdoaWNoXG4vLyBnaXZlcyB1cyBiYWQgZXJyb3IgbWVzc2FnZXMgaW4gdGVzdHMuXG4vLyBUaGUgb25seSB3YXkgdG8gZG8gdGhpcyBpbiBKYXNtaW5lIGlzIHRvIG1vbmtleSBwYXRjaCBhIG1ldGhvZFxuLy8gdG8gdGhlIG9iamVjdCA6LShcbihNYXAgYXMgYW55KS5wcm90b3R5cGVbJ2phc21pbmVUb1N0cmluZyddID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG0gPSB0aGlzO1xuICBpZiAoIW0pIHtcbiAgICByZXR1cm4gJycgKyBtO1xuICB9XG4gIGNvbnN0IHJlczogYW55W10gPSBbXTtcbiAgbS5mb3JFYWNoKCh2OiBhbnksIGs6IGFueSkgPT4geyByZXMucHVzaChgJHtTdHJpbmcoayl9OiR7U3RyaW5nKHYpfWApOyB9KTtcbiAgcmV0dXJuIGB7ICR7cmVzLmpvaW4oJywnKX0gfWA7XG59O1xuXG5fZ2xvYmFsLmJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIC8vIEN1c3RvbSBoYW5kbGVyIGZvciBNYXAgYXMgSmFzbWluZSBkb2VzIG5vdCBzdXBwb3J0IGl0IHlldFxuICAgIHRvRXF1YWw6IGZ1bmN0aW9uKHV0aWwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KSB7XG4gICAgICAgICAgcmV0dXJuIHtwYXNzOiB1dGlsLmVxdWFscyhhY3R1YWwsIGV4cGVjdGVkLCBbY29tcGFyZU1hcF0pfTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZnVuY3Rpb24gY29tcGFyZU1hcChhY3R1YWw6IGFueSwgZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgICAgbGV0IHBhc3MgPSBhY3R1YWwuc2l6ZSA9PT0gZXhwZWN0ZWQuc2l6ZTtcbiAgICAgICAgICBpZiAocGFzcykge1xuICAgICAgICAgICAgYWN0dWFsLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7IHBhc3MgPSBwYXNzICYmIHV0aWwuZXF1YWxzKHYsIGV4cGVjdGVkLmdldChrKSk7IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcGFzcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPKG1pc2tvKTogd2Ugc2hvdWxkIGNoYW5nZSB0aGUgcmV0dXJuLCBidXQgamFzbWluZS5kLnRzIGlzIG5vdCBudWxsIHNhZmVcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkICE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9CZVByb21pc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBwYXNzID0gdHlwZW9mIGFjdHVhbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGFjdHVhbC50aGVuID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgIHJldHVybiB7cGFzczogcGFzcywgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYSBwcm9taXNlJzsgfX07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQmVBbkluc3RhbmNlT2Y6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkQ2xhc3M6IGFueSkge1xuICAgICAgICAgIGNvbnN0IHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBwYXNzLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbCArICcgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgJyArIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgICBjb25zdCBhY3R1YWxUZXh0ID0gZWxlbWVudFRleHQoYWN0dWFsKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWN0dWFsVGV4dCA9PSBleHBlY3RlZFRleHQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsVGV4dCArICcgdG8gYmUgZXF1YWwgdG8gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc0NsYXNzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7Y29tcGFyZTogYnVpbGRFcnJvcihmYWxzZSksIG5lZ2F0aXZlQ29tcGFyZTogYnVpbGRFcnJvcih0cnVlKX07XG5cbiAgICAgIGZ1bmN0aW9uIGJ1aWxkRXJyb3IoaXNOb3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFjdHVhbDogYW55LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBnZXRET00oKS5oYXNDbGFzcyhhY3R1YWwsIGNsYXNzTmFtZSkgPT0gIWlzTm90LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAke2lzTm90ID8gJ25vdCAnIDogJyd9dG8gY29udGFpbiB0aGUgQ1NTIGNsYXNzIFwiJHtjbGFzc05hbWV9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRvSGF2ZUNzc1N0eWxlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBzdHlsZXM6IHtbazogc3RyaW5nXTogc3RyaW5nfXxzdHJpbmcpIHtcbiAgICAgICAgICBsZXQgYWxsUGFzc2VkOiBib29sZWFuO1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gZ2V0RE9NKCkuaGFzU3R5bGUoYWN0dWFsLCBzdHlsZXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBPYmplY3Qua2V5cyhzdHlsZXMpLmxlbmd0aCAhPT0gMDtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgICAgYWxsUGFzc2VkID0gYWxsUGFzc2VkICYmIGdldERPTSgpLmhhc1N0eWxlKGFjdHVhbCwgcHJvcCwgc3R5bGVzW3Byb3BdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhbGxQYXNzZWQsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRWYWx1ZVN0ciA9IHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnID8gc3R5bGVzIDogSlNPTi5zdHJpbmdpZnkoc3R5bGVzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7IWFsbFBhc3NlZCA/ICcgJyA6ICdub3QgJ310byBjb250YWluIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIENTUyAke3R5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnID8gJ3Byb3BlcnR5JyA6ICdzdHlsZXMnfSBcIiR7ZXhwZWN0ZWRWYWx1ZVN0cn1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9Db250YWluRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogYW55KSB7XG4gICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYWN0dWFsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGVycm9yTWVzc2FnZS5pbmRleE9mKGV4cGVjdGVkVGV4dCkgPiAtMSxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBlcnJvck1lc3NhZ2UgKyAnIHRvIGNvbnRhaW4gJyArIGV4cGVjdGVkVGV4dDsgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSW1wbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbE9iamVjdDogYW55LCBleHBlY3RlZEludGVyZmFjZTogYW55KSB7XG4gICAgICAgICAgY29uc3QgaW50UHJvcHMgPSBPYmplY3Qua2V5cyhleHBlY3RlZEludGVyZmFjZS5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgY29uc3QgbWlzc2VkTWV0aG9kczogYW55W10gPSBbXTtcbiAgICAgICAgICBpbnRQcm9wcy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWFjdHVhbE9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGVba10pIG1pc3NlZE1ldGhvZHMucHVzaChrKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBtaXNzZWRNZXRob2RzLmxlbmd0aCA9PSAwLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbE9iamVjdCArICcgdG8gaGF2ZSB0aGUgZm9sbG93aW5nIG1ldGhvZHM6ICcgK1xuICAgICAgICAgICAgICAgICAgbWlzc2VkTWV0aG9kcy5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBlbGVtZW50VGV4dChuOiBhbnkpOiBzdHJpbmcge1xuICBjb25zdCBoYXNOb2RlcyA9IChuOiBhbnkpID0+IHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGdldERPTSgpLmNoaWxkTm9kZXMobik7XG4gICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gIH07XG5cbiAgaWYgKG4gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIHJldHVybiBuLm1hcChlbGVtZW50VGV4dCkuam9pbignJyk7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNDb21tZW50Tm9kZShuKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmIChnZXRET00oKS5pc0VsZW1lbnROb2RlKG4pICYmIGdldERPTSgpLnRhZ05hbWUobikgPT0gJ0NPTlRFTlQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShnZXRET00oKS5nZXREaXN0cmlidXRlZE5vZGVzKG4pKSk7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaGFzU2hhZG93Um9vdChuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChnZXRET00oKS5jaGlsZE5vZGVzQXNMaXN0KGdldERPTSgpLmdldFNoYWRvd1Jvb3QobikpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChnZXRET00oKS5jaGlsZE5vZGVzQXNMaXN0KG4pKTtcbiAgfVxuXG4gIHJldHVybiBnZXRET00oKS5nZXRUZXh0KG4pICE7XG59XG4iXX0=