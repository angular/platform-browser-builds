/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { childNodesAsList, hasClass, hasStyle, isCommentNode } from './browser_util';
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
const _expect = expect;
export { _expect as expect };
beforeEach(function () {
    jasmine.addMatchers({
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    const actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() {
                            return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                        }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: hasClass(actual, className) == !isNot,
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
                    let allPassed;
                    if (typeof styles === 'string') {
                        allPassed = hasStyle(actual, styles);
                    }
                    else {
                        allPassed = Object.keys(styles).length !== 0;
                        Object.keys(styles).forEach(prop => {
                            allPassed = allPassed && hasStyle(actual, prop, styles[prop]);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            const expectedValueStr = typeof styles === 'string' ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${typeof styles === 'string' ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    const intProps = Object.keys(expectedInterface.prototype);
                    const missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject +
                                ' to have the following methods: ' + missedMethods.join(', ');
                        }
                    };
                }
            };
        },
        toContainComponent: function () {
            return {
                compare: function (actualFixture, expectedComponentType) {
                    const failOutput = arguments[2];
                    const msgFn = (msg) => [msg, failOutput].filter(Boolean).join(', ');
                    // verify correct actual type
                    if (!(actualFixture instanceof ComponentFixture)) {
                        return {
                            pass: false,
                            message: msgFn(`Expected actual to be of type \'ComponentFixture\' [actual=${actualFixture.constructor.name}]`)
                        };
                    }
                    const found = !!actualFixture.debugElement.query(By.directive(expectedComponentType));
                    return found ?
                        { pass: true } :
                        { pass: false, message: msgFn(`Expected ${expectedComponentType.name} to show`) };
                }
            };
        }
    });
});
function elementText(n) {
    const hasNodes = (n) => {
        const children = n.childNodes;
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (isCommentNode(n)) {
        return '';
    }
    if (getDOM().isElementNode(n)) {
        const tagName = n.tagName;
        if (tagName === 'CONTENT') {
            return elementText(Array.prototype.slice.apply(n.getDistributedNodes()));
        }
        else if (tagName === 'SLOT') {
            return elementText(Array.prototype.slice.apply(n.assignedNodes()));
        }
    }
    if (hasShadowRoot(n)) {
        return elementText(childNodesAsList(n.shadowRoot));
    }
    if (hasNodes(n)) {
        return elementText(childNodesAsList(n));
    }
    return n.textContent;
}
function hasShadowRoot(node) {
    return node.shadowRoot != null && node instanceof HTMLElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3Rlc3Rpbmcvc3JjL21hdGNoZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEVBQUUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBNERuRjs7Ozs7O0dBTUc7QUFDSCxNQUFNLE9BQU8sR0FBMEMsTUFBYSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLENBQUM7QUFFM0IsVUFBVSxDQUFDO0lBQ1QsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUNsQixVQUFVLEVBQUU7WUFDVixPQUFPO2dCQUNMLE9BQU8sRUFBRSxVQUFTLE1BQVcsRUFBRSxZQUFvQjtvQkFDakQsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxPQUFPO3dCQUNMLElBQUksRUFBRSxVQUFVLElBQUksWUFBWTt3QkFDaEMsSUFBSSxPQUFPOzRCQUNULE9BQU8sV0FBVyxHQUFHLFVBQVUsR0FBRyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7d0JBQ3RFLENBQUM7cUJBQ0YsQ0FBQztnQkFDSixDQUFDO2FBQ0YsQ0FBQztRQUNKLENBQUM7UUFFRCxjQUFjLEVBQUU7WUFDZCxPQUFPLEVBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudEZpeHR1cmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQge0J5fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtjaGlsZE5vZGVzQXNMaXN0LCBoYXNDbGFzcywgaGFzU3R5bGUsIGlzQ29tbWVudE5vZGV9IGZyb20gJy4vYnJvd3Nlcl91dGlsJztcblxuXG4vKipcbiAqIEphc21pbmUgbWF0Y2hlcnMgdGhhdCBjaGVjayBBbmd1bGFyIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gKlxuICogTm90ZTogVGhlc2UgbWF0Y2hlcnMgd2lsbCBvbmx5IHdvcmsgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTWF0Y2hlcnM8VCA9IGFueT4gZXh0ZW5kcyBqYXNtaW5lLk1hdGNoZXJzPFQ+IHtcbiAgLyoqXG4gICAqIEV4cGVjdCB0aGUgZWxlbWVudCB0byBoYXZlIGV4YWN0bHkgdGhlIGdpdmVuIHRleHQuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gICAqL1xuICB0b0hhdmVUZXh0KGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIGNsYXNzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgdGVzdGluZy90cy9tYXRjaGVycy50cyByZWdpb249J3RvSGF2ZUNzc0NsYXNzJ31cbiAgICovXG4gIHRvSGF2ZUNzc0NsYXNzKGV4cGVjdGVkOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFeHBlY3QgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZ2l2ZW4gQ1NTIHN0eWxlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0hhdmVDc3NTdHlsZSd9XG4gICAqL1xuICB0b0hhdmVDc3NTdHlsZShleHBlY3RlZDoge1trOiBzdHJpbmddOiBzdHJpbmd9fHN0cmluZyk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEV4cGVjdCBhIGNsYXNzIHRvIGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIG9mIHRoZSBnaXZlbiBjbGFzcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIHRlc3RpbmcvdHMvbWF0Y2hlcnMudHMgcmVnaW9uPSd0b0ltcGxlbWVudCd9XG4gICAqL1xuICB0b0ltcGxlbWVudChleHBlY3RlZDogYW55KTogYm9vbGVhbjtcblxuICAvKipcbiAgICogRXhwZWN0IGEgY29tcG9uZW50IG9mIHRoZSBnaXZlbiB0eXBlIHRvIHNob3cuXG4gICAqL1xuICB0b0NvbnRhaW5Db21wb25lbnQoZXhwZWN0ZWRDb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIGV4cGVjdGF0aW9uRmFpbE91dHB1dD86IGFueSk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEludmVydCB0aGUgbWF0Y2hlcnMuXG4gICAqL1xuICBub3Q6IE5nTWF0Y2hlcnM8VD47XG59XG5cbi8qKlxuICogSmFzbWluZSBtYXRjaGluZyBmdW5jdGlvbiB3aXRoIEFuZ3VsYXIgbWF0Y2hlcnMgbWl4ZWQgaW4uXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSB0ZXN0aW5nL3RzL21hdGNoZXJzLnRzIHJlZ2lvbj0ndG9IYXZlVGV4dCd9XG4gKi9cbmNvbnN0IF9leHBlY3Q6IDxUID0gYW55PihhY3R1YWw6IFQpID0+IE5nTWF0Y2hlcnM8VD4gPSBleHBlY3QgYXMgYW55O1xuZXhwb3J0IHtfZXhwZWN0IGFzIGV4cGVjdH07XG5cbmJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgIHRvSGF2ZVRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsOiBhbnksIGV4cGVjdGVkVGV4dDogc3RyaW5nKSB7XG4gICAgICAgICAgY29uc3QgYWN0dWFsVGV4dCA9IGVsZW1lbnRUZXh0KGFjdHVhbCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGFjdHVhbFRleHQgPT0gZXhwZWN0ZWRUZXh0LFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnRXhwZWN0ZWQgJyArIGFjdHVhbFRleHQgKyAnIHRvIGJlIGVxdWFsIHRvICcgKyBleHBlY3RlZFRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9IYXZlQ3NzQ2xhc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtjb21wYXJlOiBidWlsZEVycm9yKGZhbHNlKSwgbmVnYXRpdmVDb21wYXJlOiBidWlsZEVycm9yKHRydWUpfTtcblxuICAgICAgZnVuY3Rpb24gYnVpbGRFcnJvcihpc05vdDogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWN0dWFsOiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IGhhc0NsYXNzKGFjdHVhbCwgY2xhc3NOYW1lKSA9PSAhaXNOb3QsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBFeHBlY3RlZCAke2FjdHVhbC5vdXRlckhUTUx9ICR7XG4gICAgICAgICAgICAgICAgICBpc05vdCA/ICdub3QgJyA6ICcnfXRvIGNvbnRhaW4gdGhlIENTUyBjbGFzcyBcIiR7Y2xhc3NOYW1lfVwiYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB0b0hhdmVDc3NTdHlsZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wYXJlOiBmdW5jdGlvbihhY3R1YWw6IGFueSwgc3R5bGVzOiB7W2s6IHN0cmluZ106IHN0cmluZ318c3RyaW5nKSB7XG4gICAgICAgICAgbGV0IGFsbFBhc3NlZDogYm9vbGVhbjtcbiAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFsbFBhc3NlZCA9IGhhc1N0eWxlKGFjdHVhbCwgc3R5bGVzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxsUGFzc2VkID0gT2JqZWN0LmtleXMoc3R5bGVzKS5sZW5ndGggIT09IDA7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICAgIGFsbFBhc3NlZCA9IGFsbFBhc3NlZCAmJiBoYXNTdHlsZShhY3R1YWwsIHByb3AsIHN0eWxlc1twcm9wXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFzczogYWxsUGFzc2VkLFxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmFsdWVTdHIgPSB0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/IHN0eWxlcyA6IEpTT04uc3RyaW5naWZ5KHN0eWxlcyk7XG4gICAgICAgICAgICAgIHJldHVybiBgRXhwZWN0ZWQgJHthY3R1YWwub3V0ZXJIVE1MfSAkeyFhbGxQYXNzZWQgPyAnICcgOiAnbm90ICd9dG8gY29udGFpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICBDU1MgJHt0eXBlb2Ygc3R5bGVzID09PSAnc3RyaW5nJyA/ICdwcm9wZXJ0eScgOiAnc3R5bGVzJ30gXCIke1xuICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRWYWx1ZVN0cn1cImA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9JbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tcGFyZTogZnVuY3Rpb24oYWN0dWFsT2JqZWN0OiBhbnksIGV4cGVjdGVkSW50ZXJmYWNlOiBhbnkpIHtcbiAgICAgICAgICBjb25zdCBpbnRQcm9wcyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkSW50ZXJmYWNlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICBjb25zdCBtaXNzZWRNZXRob2RzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgIGludFByb3BzLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIGlmICghYWN0dWFsT2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZVtrXSkgbWlzc2VkTWV0aG9kcy5wdXNoKGspO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhc3M6IG1pc3NlZE1ldGhvZHMubGVuZ3RoID09IDAsXG4gICAgICAgICAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdFeHBlY3RlZCAnICsgYWN0dWFsT2JqZWN0ICtcbiAgICAgICAgICAgICAgICAgICcgdG8gaGF2ZSB0aGUgZm9sbG93aW5nIG1ldGhvZHM6ICcgKyBtaXNzZWRNZXRob2RzLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9Db250YWluQ29tcG9uZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBhcmU6IGZ1bmN0aW9uKGFjdHVhbEZpeHR1cmU6IGFueSwgZXhwZWN0ZWRDb21wb25lbnRUeXBlOiBUeXBlPGFueT4pIHtcbiAgICAgICAgICBjb25zdCBmYWlsT3V0cHV0ID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgIGNvbnN0IG1zZ0ZuID0gKG1zZzogc3RyaW5nKTogc3RyaW5nID0+IFttc2csIGZhaWxPdXRwdXRdLmZpbHRlcihCb29sZWFuKS5qb2luKCcsICcpO1xuXG4gICAgICAgICAgLy8gdmVyaWZ5IGNvcnJlY3QgYWN0dWFsIHR5cGVcbiAgICAgICAgICBpZiAoIShhY3R1YWxGaXh0dXJlIGluc3RhbmNlb2YgQ29tcG9uZW50Rml4dHVyZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBhc3M6IGZhbHNlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBtc2dGbihgRXhwZWN0ZWQgYWN0dWFsIHRvIGJlIG9mIHR5cGUgXFwnQ29tcG9uZW50Rml4dHVyZVxcJyBbYWN0dWFsPSR7XG4gICAgICAgICAgICAgICAgICBhY3R1YWxGaXh0dXJlLmNvbnN0cnVjdG9yLm5hbWV9XWApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gISFhY3R1YWxGaXh0dXJlLmRlYnVnRWxlbWVudC5xdWVyeShCeS5kaXJlY3RpdmUoZXhwZWN0ZWRDb21wb25lbnRUeXBlKSk7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kID9cbiAgICAgICAgICAgICAge3Bhc3M6IHRydWV9IDpcbiAgICAgICAgICAgICAge3Bhc3M6IGZhbHNlLCBtZXNzYWdlOiBtc2dGbihgRXhwZWN0ZWQgJHtleHBlY3RlZENvbXBvbmVudFR5cGUubmFtZX0gdG8gc2hvd2ApfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0KG46IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhhc05vZGVzID0gKG46IGFueSkgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbi5jaGlsZE5vZGVzO1xuICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwO1xuICB9O1xuXG4gIGlmIChuIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbi5tYXAoZWxlbWVudFRleHQpLmpvaW4oJycpO1xuICB9XG5cbiAgaWYgKGlzQ29tbWVudE5vZGUobikpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShuKSkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSAobiBhcyBFbGVtZW50KS50YWdOYW1lO1xuXG4gICAgaWYgKHRhZ05hbWUgPT09ICdDT05URU5UJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseSgoPGFueT5uKS5nZXREaXN0cmlidXRlZE5vZGVzKCkpKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdTTE9UJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnRUZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseSgoPGFueT5uKS5hc3NpZ25lZE5vZGVzKCkpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaGFzU2hhZG93Um9vdChuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChjaGlsZE5vZGVzQXNMaXN0KCg8YW55Pm4pLnNoYWRvd1Jvb3QpKTtcbiAgfVxuXG4gIGlmIChoYXNOb2RlcyhuKSkge1xuICAgIHJldHVybiBlbGVtZW50VGV4dChjaGlsZE5vZGVzQXNMaXN0KG4pKTtcbiAgfVxuXG4gIHJldHVybiAobiBhcyBhbnkpLnRleHRDb250ZW50O1xufVxuXG5mdW5jdGlvbiBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5zaGFkb3dSb290ICE9IG51bGwgJiYgbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xufVxuIl19