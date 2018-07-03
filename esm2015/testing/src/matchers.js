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
    // Custom handler for Map as we use Jasmine 2.4, and support for maps is not
    // added until Jasmine 2.6.
    jasmine.addCustomEqualityTester(function compareMap(actual, expected) {
        if (actual instanceof Map) {
            let /** @type {?} */ pass = actual.size === expected.size;
            if (pass) {
                actual.forEach((v, k) => {
                    pass = pass && jasmine.matchersUtil.equals(v, expected.get(k));
                });
            }
            return pass;
        }
        else {
            // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
            return /** @type {?} */ ((undefined));
        }
    });
    jasmine.addMatchers({
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZFNUQsdUJBQU0sT0FBTyxxQkFBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDOzs7Ozs7OztBQVN2RSxNQUFNLENBQUMsdUJBQU0sTUFBTSxxQkFBcUMsT0FBTyxDQUFDLE1BQU0sQ0FBQSxDQUFDOzs7OztBQU92RSxtQkFBQyxHQUFVLEVBQUMsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsR0FBRztJQUMxQyx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDZjtJQUNELHVCQUFNLEdBQUcsR0FBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRSxNQUFNLENBQUMs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QzFFO0lBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEQ7SUFFRCxNQUFNLG9CQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRztDQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge8m1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cblxuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hlcnMgdGhhdCBjaGVjayBBbmd1bGFyIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdNYXRjaGVycyBleHRlbmRzIGphc21pbmUuTWF0Y2hlcnMge1xuICAvKipcbiAgICogRXhwZWN0IHRoZSB2YWx1ZSB0byBiZSBhIGBQcm9taXNlYC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQmVQcm9taXNlJ31cbiAgICovXG4gIHRvQmVQcm9taXNlKCk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQmVBbkluc3RhbmNlT2YnfVxuICAgKi9cbiAgdG9CZUFuSW5zdGFuY2VPZihleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgZXhhY3RseSB0aGUgZ2l2ZW4gdGV4dC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVRleHQnfVxuICAgKi9cbiAgdG9IYXZlVGV4dChleHBlY3RlZDogc3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGdpdmVuIENTUyBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc0NsYXNzJ31cbiAgICovXG4gIHRvSGF2ZUNzc0NsYXNzKGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIHN0eWxlcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc1N0eWxlJ31cbiAgICovXG4gIHRvSGF2ZUNzc1N0eWxlKGV4cGVjdGVkOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgY2xhc3MgdG8gaW1wbGVtZW50IHRoZSBpbnRlcmZhY2Ugb2YgdGhlIGdpdmVuIGNsYXNzLlxuICAgKlxuICAgKiAjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9JbXBsZW1lbnQnfVxuICAgKi9cbiAgdG9JbXBsZW1lbnQoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhbiBleGNlcHRpb24gdG8gY29udGFpbiB0aGUgZ2l2ZW4gZXJyb3IgdGV4dC5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvQ29udGFpbkVycm9yJ31cbiAgICovXG4gIHRvQ29udGFpbkVycm9yKGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbnZlcnQgdGhlIG1hdGNoZXJzLlxuICAgKi9cbiAgbm90OiBOZ01hdGNoZXJzO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gPGFueT4odHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3cpO1xuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hpbmcgZnVuY3Rpb24gd2l0aCBBbmd1bGFyIG1hdGNoZXJzIG1peGVkIGluLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZVRleHQnfVxuICovXG5leHBvcnQgY29uc3QgZXhwZWN0OiAoYWN0dWFsOiBhbnkpID0+IE5nTWF0Y2hlcnMgPSA8YW55Pl9nbG9iYWwuZXhwZWN0O1xuXG5cbi8vIFNvbWUgTWFwIHBvbHlmaWxscyBkb24ndCBwb2x5ZmlsbCBNYXAudG9TdHJpbmcgY29ycmVjdGx5LCB3aGljaFxuLy8gZ2l2ZXMgdXMgYmFkIGVycm9yIG1lc3NhZ2VzIGluIHRlc3RzLlxuLy8gVGhlIG9ubHkgd2F5IHRvIGRvIHRoaXMgaW4gSmFzbWluZSBpcyB0byBtb25rZXkgcGF0Y2ggYSBtZXRob2Rcbi8vIHRvIHRoZSBvYmplY3QgOi0oXG4oTWFwIGFzIGFueSkucHJvdG90eXBlWydqYXNtaW5lVG9TdHJpbmcnXSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBtID0gdGhpcztcbiAgaWYgKCFtKSB7XG4gICAgcmV0dXJuICcnICsgbTtcbiAgfVxuICBjb25zdCByZXM6IGFueVtdID0gW107XG4gIG0uZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHsgcmVzLnB1c2goYCR7U3RyaW5nKGspfToke1N0cmluZyh2KX1gKTsgfSk7XG4gIHJldHVybiBgeyAke3Jlcy5qb2luKCcsJyl9IH1gO1xufTtcblxuX2dsb2JhbC5iZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAvLyBDdXN0b20gaGFuZGxlciBmb3IgTWFwIGFzIHdlIHVzZSBKYXNtaW5lIDIuNCwgYW5kIHN1cHBvcnQgZm9yIG1hcHMgaXMgbm90XG4gIC8vIGFkZGVkIHVudGlsIEphc21pbmUgMi42LlxuICBqYXNtaW5lLmFkZEN1c3RvbUVxdWFsaXR5VGVzdGVyKGZ1bmN0aW9uIGNvbXBhcmVNYXAoYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICBsZXQgcGFzcyA9IGFjdHVhbC5zaXplID09PSBleHBlY3RlZC5zaXplO1xuICAgICAgaWYgKHBhc3MpIHtcbiAgICAgICAgYWN0dWFsLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7XG4gICAgICAgICAgcGFzcyA9IHBhc3MgJiYgamFzbWluZS5tYXRjaGVyc1V0aWwuZXF1YWxzKHYsIGV4cGVjdGVkLmdldChrKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE8obWlza28pOiB3ZSBzaG91bGQgY2hhbmdlIHRoZSByZXR1cm4sIGJ1dCBqYXNtaW5lLmQudHMgaXMgbm90IG51bGwgc2FmZVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZCAhO1xuICAgIH1cbiAgfSk7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIHRvQmVQcm9taXNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhY3R1YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICByZXR1cm4ge3Bhc3M6IHBhc3MsIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWwgKyAnIHRvIGJlIGEgcHJvbWlzZSc7IH19O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0JlQW5JbnN0YW5jZU9mOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZENsYXNzOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBwYXNzID0gdHlwZW9mIGFjdHVhbCA9PT0gJ29iamVjdCcgJiYgYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogcGFzcyxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWwgKyAnIHRvIGJlIGFuIGluc3RhbmNlIG9mICcgKyBleHBlY3RlZENsYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvSGF2ZVRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogc3RyaW5nKSB7XG4gICAgICAgICAgY29uc3QgYWN0dWFsVGV4dCA9IGVsZW1lbnRUZXh0KGFjdHVhbCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFjdHVhbFRleHQgPT0gZXhwZWN0ZWRUZXh0LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbFRleHQgKyAnIHRvIGJlIGVxdWFsIHRvICcgKyBleHBlY3RlZFRleHQ7IH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVDc3NDbGFzczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge2NvbXBhcmU6IGJ1aWxkRXJyb3IoZmFsc2UpLCBuZWdhdGl2ZUNvbXBhcmU6IGJ1aWxkRXJyb3IodHJ1ZSl9O1xuXG4gICAgICBmdW5jdGlvbiBidWlsZEVycm9yKGlzTm90OiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhY3R1YWw6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogZ2V0RE9NKCkuaGFzQ2xhc3MoYWN0dWFsLCBjbGFzc05hbWUpID09ICFpc05vdCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHtpc05vdCA/ICdub3QgJyA6ICcnfXRvIGNvbnRhaW4gdGhlIENTUyBjbGFzcyBcIiR7Y2xhc3NOYW1lfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0hhdmVDc3NTdHlsZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgc3R5bGVzOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKSB7XG4gICAgICAgICAgbGV0IGFsbFBhc3NlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IGdldERPTSgpLmhhc1N0eWxlKGFjdHVhbCwgc3R5bGVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gT2JqZWN0LmtleXMoc3R5bGVzKS5sZW5ndGggIT09IDA7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICAgIGFsbFBhc3NlZCA9IGFsbFBhc3NlZCAmJiBnZXRET00oKS5oYXNTdHlsZShhY3R1YWwsIHByb3AsIHN0eWxlc1twcm9wXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWxsUGFzc2VkLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVTdHIgPSB0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/IHN0eWxlcyA6IEpTT04uc3RyaW5naWZ5KHN0eWxlcyk7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAkeyFhbGxQYXNzZWQgPyAnICcgOiAnbm90ICd9dG8gY29udGFpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICBDU1MgJHt0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/ICdwcm9wZXJ0eScgOiAnc3R5bGVzJ30gXCIke2V4cGVjdGVkVmFsdWVTdHJ9XCJgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSxcblxuICAgIHRvQ29udGFpbkVycm9yOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGFjdHVhbC50b1N0cmluZygpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBlcnJvck1lc3NhZ2UuaW5kZXhPZihleHBlY3RlZFRleHQpID4gLTEsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgZXJyb3JNZXNzYWdlICsgJyB0byBjb250YWluICcgKyBleHBlY3RlZFRleHQ7IH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0ltcGxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWxPYmplY3Q6IGFueSwgZXhwZWN0ZWRJbnRlcmZhY2U6IGFueSkge1xuICAgICAgICAgIGNvbnN0IGludFByb3BzID0gT2JqZWN0LmtleXMoZXhwZWN0ZWRJbnRlcmZhY2UucHJvdG90eXBlKTtcblxuICAgICAgICAgIGNvbnN0IG1pc3NlZE1ldGhvZHM6IGFueVtdID0gW107XG4gICAgICAgICAgaW50UHJvcHMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgaWYgKCFhY3R1YWxPYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlW2tdKSBtaXNzZWRNZXRob2RzLnB1c2goayk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogbWlzc2VkTWV0aG9kcy5sZW5ndGggPT0gMCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxPYmplY3QgKyAnIHRvIGhhdmUgdGhlIGZvbGxvd2luZyBtZXRob2RzOiAnICtcbiAgICAgICAgICAgICAgICAgIG1pc3NlZE1ldGhvZHMuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59KTtcblxuZnVuY3Rpb24gZWxlbWVudFRleHQobjogYW55KTogc3RyaW5nIHtcbiAgY29uc3QgaGFzTm9kZXMgPSAobjogYW55KSA9PiB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBnZXRET00oKS5jaGlsZE5vZGVzKG4pO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oJycpO1xuICB9XG5cbiAgaWYgKGdldERPTSgpLmlzQ29tbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShuKSAmJiBnZXRET00oKS50YWdOYW1lKG4pID09ICdDT05URU5UJykge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZ2V0RE9NKCkuZ2V0RGlzdHJpYnV0ZWROb2RlcyhuKSkpO1xuICB9XG5cbiAgaWYgKGdldERPTSgpLmhhc1NoYWRvd1Jvb3QobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoZ2V0RE9NKCkuY2hpbGROb2Rlc0FzTGlzdChnZXRET00oKS5nZXRTaGFkb3dSb290KG4pKSk7XG4gIH1cblxuICBpZiAoaGFzTm9kZXMobikpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoZ2V0RE9NKCkuY2hpbGROb2Rlc0FzTGlzdChuKSk7XG4gIH1cblxuICByZXR1cm4gZ2V0RE9NKCkuZ2V0VGV4dChuKSAhO1xufVxuIl19