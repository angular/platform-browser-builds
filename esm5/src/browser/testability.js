/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { setTestabilityGetter, ɵglobal as global } from '@angular/core';
var BrowserGetTestability = /** @class */ (function () {
    function BrowserGetTestability() {
    }
    BrowserGetTestability.init = function () { setTestabilityGetter(new BrowserGetTestability()); };
    BrowserGetTestability.prototype.addToWindow = function (registry) {
        global['getAngularTestability'] = function (elem, findInAncestors) {
            if (findInAncestors === void 0) { findInAncestors = true; }
            var testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        global['getAllAngularTestabilities'] = function () { return registry.getAllTestabilities(); };
        global['getAllAngularRootElements'] = function () { return registry.getAllRootElements(); };
        var whenAllStable = function (callback /** TODO #9100 */) {
            var testabilities = global['getAllAngularTestabilities']();
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
        if (!global['frameworkStabilizers']) {
            global['frameworkStabilizers'] = [];
        }
        global['frameworkStabilizers'].push(whenAllStable);
    };
    BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        var t = registry.getTestability(elem);
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
    };
    return BrowserGetTestability;
}());
export { BrowserGetTestability };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFtRCxvQkFBb0IsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhIO0lBQUE7SUFzREEsQ0FBQztJQXJEUSwwQkFBSSxHQUFYLGNBQWdCLG9CQUFvQixDQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRSwyQ0FBVyxHQUFYLFVBQVksUUFBNkI7UUFDdkMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsVUFBQyxJQUFTLEVBQUUsZUFBK0I7WUFBL0IsZ0NBQUEsRUFBQSxzQkFBK0I7WUFDM0UsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMxRSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzthQUM1RDtZQUNELE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLGNBQU0sT0FBQSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQztRQUU1RSxNQUFNLENBQUMsMkJBQTJCLENBQUMsR0FBRyxjQUFNLE9BQUEsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQTdCLENBQTZCLENBQUM7UUFFMUUsSUFBTSxhQUFhLEdBQUcsVUFBQyxRQUFhLENBQUMsaUJBQWlCO1lBQ3BELElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLENBQUM7WUFDN0QsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBTSxTQUFTLEdBQUcsVUFBUyxRQUFhLENBQUMsaUJBQWlCO2dCQUN4RCxPQUFPLEdBQUcsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUNkLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkI7WUFDSCxDQUFDLENBQUM7WUFDRixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVMsV0FBZ0IsQ0FBQyxpQkFBaUI7Z0JBQy9ELFdBQVcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDbkMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxxREFBcUIsR0FBckIsVUFBc0IsUUFBNkIsRUFBRSxJQUFTLEVBQUUsZUFBd0I7UUFFdEYsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNiLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7YUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7R2V0VGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBzZXRUZXN0YWJpbGl0eUdldHRlciwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJHZXRUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIEdldFRlc3RhYmlsaXR5IHtcbiAgc3RhdGljIGluaXQoKSB7IHNldFRlc3RhYmlsaXR5R2V0dGVyKG5ldyBCcm93c2VyR2V0VGVzdGFiaWxpdHkoKSk7IH1cblxuICBhZGRUb1dpbmRvdyhyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSk6IHZvaWQge1xuICAgIGdsb2JhbFsnZ2V0QW5ndWxhclRlc3RhYmlsaXR5J10gPSAoZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0YWJpbGl0eSA9IHJlZ2lzdHJ5LmZpbmRUZXN0YWJpbGl0eUluVHJlZShlbGVtLCBmaW5kSW5BbmNlc3RvcnMpO1xuICAgICAgaWYgKHRlc3RhYmlsaXR5ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0ZXN0YWJpbGl0eSBmb3IgZWxlbWVudC4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXN0YWJpbGl0eTtcbiAgICB9O1xuXG4gICAgZ2xvYmFsWydnZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllcyddID0gKCkgPT4gcmVnaXN0cnkuZ2V0QWxsVGVzdGFiaWxpdGllcygpO1xuXG4gICAgZ2xvYmFsWydnZXRBbGxBbmd1bGFyUm9vdEVsZW1lbnRzJ10gPSAoKSA9PiByZWdpc3RyeS5nZXRBbGxSb290RWxlbWVudHMoKTtcblxuICAgIGNvbnN0IHdoZW5BbGxTdGFibGUgPSAoY2FsbGJhY2s6IGFueSAvKiogVE9ETyAjOTEwMCAqLykgPT4ge1xuICAgICAgY29uc3QgdGVzdGFiaWxpdGllcyA9IGdsb2JhbFsnZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXMnXSgpO1xuICAgICAgbGV0IGNvdW50ID0gdGVzdGFiaWxpdGllcy5sZW5ndGg7XG4gICAgICBsZXQgZGlkV29yayA9IGZhbHNlO1xuICAgICAgY29uc3QgZGVjcmVtZW50ID0gZnVuY3Rpb24oZGlkV29ya186IGFueSAvKiogVE9ETyAjOTEwMCAqLykge1xuICAgICAgICBkaWRXb3JrID0gZGlkV29yayB8fCBkaWRXb3JrXztcbiAgICAgICAgY291bnQtLTtcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICBjYWxsYmFjayhkaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRlc3RhYmlsaXRpZXMuZm9yRWFjaChmdW5jdGlvbih0ZXN0YWJpbGl0eTogYW55IC8qKiBUT0RPICM5MTAwICovKSB7XG4gICAgICAgIHRlc3RhYmlsaXR5LndoZW5TdGFibGUoZGVjcmVtZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoIWdsb2JhbFsnZnJhbWV3b3JrU3RhYmlsaXplcnMnXSkge1xuICAgICAgZ2xvYmFsWydmcmFtZXdvcmtTdGFiaWxpemVycyddID0gW107XG4gICAgfVxuICAgIGdsb2JhbFsnZnJhbWV3b3JrU3RhYmlsaXplcnMnXS5wdXNoKHdoZW5BbGxTdGFibGUpO1xuICB9XG5cbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBlbGVtOiBhbnksIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbik6XG4gICAgICBUZXN0YWJpbGl0eXxudWxsIHtcbiAgICBpZiAoZWxlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdCA9IHJlZ2lzdHJ5LmdldFRlc3RhYmlsaXR5KGVsZW0pO1xuICAgIGlmICh0ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAoIWZpbmRJbkFuY2VzdG9ycykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChnZXRET00oKS5pc1NoYWRvd1Jvb3QoZWxlbSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeSwgZ2V0RE9NKCkuZ2V0SG9zdChlbGVtKSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeSwgZ2V0RE9NKCkucGFyZW50RWxlbWVudChlbGVtKSwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==