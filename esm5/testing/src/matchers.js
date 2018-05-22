/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
var _global = (typeof window === 'undefined' ? global : window);
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
export var expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] = function () {
    var m = this;
    if (!m) {
        return '' + m;
    }
    var res = [];
    m.forEach(function (v, k) { res.push(String(k) + ":" + String(v)); });
    return "{ " + res.join(',') + " }";
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
            function compareMap(actual, expected) {
                if (actual instanceof Map) {
                    var pass_1 = actual.size === expected.size;
                    if (pass_1) {
                        actual.forEach(function (v, k) { pass_1 = pass_1 && util.equals(v, expected.get(k)); });
                    }
                    return pass_1;
                }
                else {
                    // TODO(misko): we should change the return, but jasmine.d.ts is not null safe
                    return undefined;
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual) {
                    var pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    var pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
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
                    var actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: getDOM().hasClass(actual, className) == !isNot,
                        get message() {
                            return "Expected " + actual.outerHTML + " " + (isNot ? 'not ' : '') + "to contain the CSS class \"" + className + "\"";
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    var allPassed;
                    if (typeof styles === 'string') {
                        allPassed = getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(function (prop) {
                            allPassed = allPassed && getDOM().hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            var expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return "Expected " + actual.outerHTML + " " + (!allPassed ? ' ' : 'not ') + "to contain the\n                      CSS " + (typeof styles === 'string' ? 'property' : 'styles') + " \"" + expectedValueStr + "\"";
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    var errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    var intProps = Object.keys(expectedInterface.prototype);
                    var missedMethods = [];
                    intProps.forEach(function (k) {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
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
function elementText(n) {
    var hasNodes = function (n) {
        var children = getDOM().childNodes(n);
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
    return getDOM().getText(n);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBNkU1RCxJQUFNLE9BQU8sR0FBUSxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7QUFTdkUsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFxQyxPQUFPLENBQUMsTUFBTSxDQUFDOzs7OztBQU92RSxBQUpBLGtFQUFrRTtBQUNsRSx3Q0FBd0M7QUFDeEMsaUVBQWlFO0FBQ2pFLG9CQUFvQjtBQUNuQixHQUFXLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7SUFDMUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2YsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNOLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNmO0lBQ0QsSUFBTSxHQUFHLEdBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBTSxJQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLE9BQU8sT0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFJLENBQUM7Q0FDL0IsQ0FBQztBQUVGLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDakIs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Q3hDLENBQUM7SUFFRixJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUU7UUFDdEIsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQztJQUVELElBQUksTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFO1FBQ2pFLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEY7SUFFRCxJQUFJLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsT0FBTyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFHLENBQUM7Q0FDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHvJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5cblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoZXJzIHRoYXQgY2hlY2sgQW5ndWxhciBzcGVjaWZpYyBjb25kaXRpb25zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTWF0Y2hlcnMgZXh0ZW5kcyBqYXNtaW5lLk1hdGNoZXJzIHtcbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgdmFsdWUgdG8gYmUgYSBgUHJvbWlzZWAuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0JlUHJvbWlzZSd9XG4gICAqL1xuICB0b0JlUHJvbWlzZSgpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIHZhbHVlIHRvIGJlIGFuIGluc3RhbmNlIG9mIGEgY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0JlQW5JbnN0YW5jZU9mJ31cbiAgICovXG4gIHRvQmVBbkluc3RhbmNlT2YoZXhwZWN0ZWQ6IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIGV4YWN0bHkgdGhlIGdpdmVuIHRleHQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAgICovXG4gIHRvSGF2ZVRleHQoZXhwZWN0ZWQ6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIHRoZSBnaXZlbiBDU1MgY2xhc3MuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NDbGFzcyd9XG4gICAqL1xuICB0b0hhdmVDc3NDbGFzcyhleHBlY3RlZDogc3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IHRoZSBlbGVtZW50IHRvIGhhdmUgdGhlIGdpdmVuIENTUyBzdHlsZXMuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NTdHlsZSd9XG4gICAqL1xuICB0b0hhdmVDc3NTdHlsZShleHBlY3RlZDoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNsYXNzIHRvIGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIG9mIHRoZSBnaXZlbiBjbGFzcy5cbiAgICpcbiAgICogIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSW1wbGVtZW50J31cbiAgICovXG4gIHRvSW1wbGVtZW50KGV4cGVjdGVkOiBhbnkpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgYW4gZXhjZXB0aW9uIHRvIGNvbnRhaW4gdGhlIGdpdmVuIGVycm9yIHRleHQuXG4gICAqXG4gICAqICMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0NvbnRhaW5FcnJvcid9XG4gICAqL1xuICB0b0NvbnRhaW5FcnJvcihleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW52ZXJ0IHRoZSBtYXRjaGVycy5cbiAgICovXG4gIG5vdDogTmdNYXRjaGVycztcbn1cblxuY29uc3QgX2dsb2JhbCA9IDxhbnk+KHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93KTtcblxuLyoqXG4gKiBKYXNtaW5lIG1hdGNoaW5nIGZ1bmN0aW9uIHdpdGggQW5ndWxhciBtYXRjaGVycyBtaXhlZCBpbi5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVUZXh0J31cbiAqL1xuZXhwb3J0IGNvbnN0IGV4cGVjdDogKGFjdHVhbDogYW55KSA9PiBOZ01hdGNoZXJzID0gPGFueT5fZ2xvYmFsLmV4cGVjdDtcblxuXG4vLyBTb21lIE1hcCBwb2x5ZmlsbHMgZG9uJ3QgcG9seWZpbGwgTWFwLnRvU3RyaW5nIGNvcnJlY3RseSwgd2hpY2hcbi8vIGdpdmVzIHVzIGJhZCBlcnJvciBtZXNzYWdlcyBpbiB0ZXN0cy5cbi8vIFRoZSBvbmx5IHdheSB0byBkbyB0aGlzIGluIEphc21pbmUgaXMgdG8gbW9ua2V5IHBhdGNoIGEgbWV0aG9kXG4vLyB0byB0aGUgb2JqZWN0IDotKFxuKE1hcCBhcyBhbnkpLnByb3RvdHlwZVsnamFzbWluZVRvU3RyaW5nJ10gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgbSA9IHRoaXM7XG4gIGlmICghbSkge1xuICAgIHJldHVybiAnJyArIG07XG4gIH1cbiAgY29uc3QgcmVzOiBhbnlbXSA9IFtdO1xuICBtLmZvckVhY2goKHY6IGFueSwgazogYW55KSA9PiB7IHJlcy5wdXNoKGAke1N0cmluZyhrKX06JHtTdHJpbmcodil9YCk7IH0pO1xuICByZXR1cm4gYHsgJHtyZXMuam9pbignLCcpfSB9YDtcbn07XG5cbl9nbG9iYWwuYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgamFzbWluZS5hZGRNYXRjaGVycyh7XG4gICAgLy8gQ3VzdG9tIGhhbmRsZXIgZm9yIE1hcCBhcyBKYXNtaW5lIGRvZXMgbm90IHN1cHBvcnQgaXQgeWV0XG4gICAgdG9FcXVhbDogZnVuY3Rpb24odXRpbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnkpIHtcbiAgICAgICAgICByZXR1cm4ge3Bhc3M6IHV0aWwuZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQsIFtjb21wYXJlTWFwXSl9O1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiBjb21wYXJlTWFwKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICBsZXQgcGFzcyA9IGFjdHVhbC5zaXplID09PSBleHBlY3RlZC5zaXplO1xuICAgICAgICAgIGlmIChwYXNzKSB7XG4gICAgICAgICAgICBhY3R1YWwuZm9yRWFjaCgodjogYW55LCBrOiBhbnkpID0+IHsgcGFzcyA9IHBhc3MgJiYgdXRpbC5lcXVhbHModiwgZXhwZWN0ZWQuZ2V0KGspKTsgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwYXNzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE8obWlza28pOiB3ZSBzaG91bGQgY2hhbmdlIHRoZSByZXR1cm4sIGJ1dCBqYXNtaW5lLmQudHMgaXMgbm90IG51bGwgc2FmZVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgITtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0JlUHJvbWlzZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSkge1xuICAgICAgICAgIGNvbnN0IHBhc3MgPSB0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYWN0dWFsLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgcmV0dXJuIHtwYXNzOiBwYXNzLCBnZXQgbWVzc2FnZSgpIHsgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhIHByb21pc2UnOyB9fTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9CZUFuSW5zdGFuY2VPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRDbGFzczogYW55KSB7XG4gICAgICAgICAgY29uc3QgcGFzcyA9IHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3M7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IHBhc3MsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsICsgJyB0byBiZSBhbiBpbnN0YW5jZSBvZiAnICsgZXhwZWN0ZWRDbGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0hhdmVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbDogYW55LCBleHBlY3RlZFRleHQ6IHN0cmluZykge1xuICAgICAgICAgIGNvbnN0IGFjdHVhbFRleHQgPSBlbGVtZW50VGV4dChhY3R1YWwpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYXNzOiBhY3R1YWxUZXh0ID09IGV4cGVjdGVkVGV4dCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkgeyByZXR1cm4gJ0V4cGVjdGVkICcgKyBhY3R1YWxUZXh0ICsgJyB0byBiZSBlcXVhbCB0byAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgICAgZnVuY3Rpb24gYnVpbGRFcnJvcihpc05vdDogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWN0dWFsOiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGdldERPTSgpLmhhc0NsYXNzKGFjdHVhbCwgY2xhc3NOYW1lKSA9PSAhaXNOb3QsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7aXNOb3QgPyAnbm90ICcgOiAnJ310byBjb250YWluIHRoZSBDU1MgY2xhc3MgXCIke2NsYXNzTmFtZX1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzU3R5bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIHN0eWxlczoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZykge1xuICAgICAgICAgIGxldCBhbGxQYXNzZWQ6IGJvb2xlYW47XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBhbGxQYXNzZWQgPSBnZXRET00oKS5oYXNTdHlsZShhY3R1YWwsIHN0eWxlcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IE9iamVjdC5rZXlzKHN0eWxlcykubGVuZ3RoICE9PSAwO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgICBhbGxQYXNzZWQgPSBhbGxQYXNzZWQgJiYgZ2V0RE9NKCkuaGFzU3R5bGUoYWN0dWFsLCBwcm9wLCBzdHlsZXNbcHJvcF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFsbFBhc3NlZCxcbiAgICAgICAgICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICAgICAgICBjb25zdCBleHBlY3RlZFZhbHVlU3RyID0gdHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyBzdHlsZXMgOiBKU09OLnN0cmluZ2lmeShzdHlsZXMpO1xuICAgICAgICAgICAgICByZXR1cm4gYEV4cGVjdGVkICR7YWN0dWFsLm91dGVySFRNTH0gJHshYWxsUGFzc2VkID8gJyAnIDogJ25vdCAnfXRvIGNvbnRhaW4gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgQ1NTICR7dHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycgPyAncHJvcGVydHknIDogJ3N0eWxlcyd9IFwiJHtleHBlY3RlZFZhbHVlU3RyfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICB0b0NvbnRhaW5FcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgZXhwZWN0ZWRUZXh0OiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhY3R1YWwudG9TdHJpbmcoKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogZXJyb3JNZXNzYWdlLmluZGV4T2YoZXhwZWN0ZWRUZXh0KSA+IC0xLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7IHJldHVybiAnRXhwZWN0ZWQgJyArIGVycm9yTWVzc2FnZSArICcgdG8gY29udGFpbiAnICsgZXhwZWN0ZWRUZXh0OyB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9JbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsT2JqZWN0OiBhbnksIGV4cGVjdGVkSW50ZXJmYWNlOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBpbnRQcm9wcyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkSW50ZXJmYWNlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICBjb25zdCBtaXNzZWRNZXRob2RzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIGludFByb3BzLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtrXSkgbWlzc2VkTWV0aG9kcy5wdXNoKGspO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IG1pc3NlZE1ldGhvZHMubGVuZ3RoID09IDAsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsT2JqZWN0ICsgJyB0byBoYXZlIHRoZSBmb2xsb3dpbmcgbWV0aG9kczogJyArXG4gICAgICAgICAgICAgICAgICBtaXNzZWRNZXRob2RzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0KG46IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhhc05vZGVzID0gKG46IGFueSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gZ2V0RE9NKCkuY2hpbGROb2RlcyhuKTtcbiAgICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgfTtcblxuICBpZiAobiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgcmV0dXJuIG4ubWFwKGVsZW1lbnRUZXh0KS5qb2luKCcnKTtcbiAgfVxuXG4gIGlmIChnZXRET00oKS5pc0NvbW1lbnROb2RlKG4pKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUobikgJiYgZ2V0RE9NKCkudGFnTmFtZShuKSA9PSAnQ09OVEVOVCcpIHtcbiAgICByZXR1cm4gZWxlbWVudFRleHQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGdldERPTSgpLmdldERpc3RyaWJ1dGVkTm9kZXMobikpKTtcbiAgfVxuXG4gIGlmIChnZXRET00oKS5oYXNTaGFkb3dSb290KG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KGdldERPTSgpLmNoaWxkTm9kZXNBc0xpc3QoZ2V0RE9NKCkuZ2V0U2hhZG93Um9vdChuKSkpO1xuICB9XG5cbiAgaWYgKGhhc05vZGVzKG4pKSB7XG4gICAgcmV0dXJuIGVsZW1lbnRUZXh0KGdldERPTSgpLmNoaWxkTm9kZXNBc0xpc3QobikpO1xuICB9XG5cbiAgcmV0dXJuIGdldERPTSgpLmdldFRleHQobikgITtcbn1cbiJdfQ==