/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { setTestabilityGetter, ɵglobal as global } from '@angular/core';
export class BrowserGetTestability {
    static init() {
        setTestabilityGetter(new BrowserGetTestability());
    }
    addToWindow(registry) {
        global['getAngularTestability'] = (elem, findInAncestors = true) => {
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        global['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        global['getAllAngularRootElements'] = () => registry.getAllRootElements();
        const whenAllStable = (callback /** TODO #9100 */) => {
            const testabilities = global['getAllAngularTestabilities']();
            let count = testabilities.length;
            let didWork = false;
            const decrement = function (didWork_ /** TODO #9100 */) {
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
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFpQixvQkFBb0IsRUFBb0MsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4SCxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLE1BQU0sQ0FBQyxJQUFJO1FBQ1Qsb0JBQW9CLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUE2QjtRQUN2QyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLElBQVMsRUFBRSxrQkFBMkIsSUFBSSxFQUFFLEVBQUU7WUFDL0UsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMxRSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzthQUM1RDtZQUNELE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTVFLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFFLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBYSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDeEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsQ0FBQztZQUM3RCxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ2pDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNwQixNQUFNLFNBQVMsR0FBRyxVQUFTLFFBQWEsQ0FBQyxpQkFBaUI7Z0JBQ3hELE9BQU8sR0FBRyxPQUFPLElBQUksUUFBUSxDQUFDO2dCQUM5QixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7b0JBQ2QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNuQjtZQUNILENBQUMsQ0FBQztZQUNGLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBUyxXQUFnQixDQUFDLGlCQUFpQjtnQkFDL0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUNuQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckM7UUFDRCxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELHFCQUFxQixDQUFDLFFBQTZCLEVBQUUsSUFBUyxFQUFFLGVBQXdCO1FBRXRGLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFRLElBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtHZXRUZXN0YWJpbGl0eSwgc2V0VGVzdGFiaWxpdHlHZXR0ZXIsIFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckdldFRlc3RhYmlsaXR5IGltcGxlbWVudHMgR2V0VGVzdGFiaWxpdHkge1xuICBzdGF0aWMgaW5pdCgpIHtcbiAgICBzZXRUZXN0YWJpbGl0eUdldHRlcihuZXcgQnJvd3NlckdldFRlc3RhYmlsaXR5KCkpO1xuICB9XG5cbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHtcbiAgICBnbG9iYWxbJ2dldEFuZ3VsYXJUZXN0YWJpbGl0eSddID0gKGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgY29uc3QgdGVzdGFiaWxpdHkgPSByZWdpc3RyeS5maW5kVGVzdGFiaWxpdHlJblRyZWUoZWxlbSwgZmluZEluQW5jZXN0b3JzKTtcbiAgICAgIGlmICh0ZXN0YWJpbGl0eSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGVzdGFiaWxpdHkgZm9yIGVsZW1lbnQuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGVzdGFiaWxpdHk7XG4gICAgfTtcblxuICAgIGdsb2JhbFsnZ2V0QWxsQW5ndWxhclRlc3RhYmlsaXRpZXMnXSA9ICgpID0+IHJlZ2lzdHJ5LmdldEFsbFRlc3RhYmlsaXRpZXMoKTtcblxuICAgIGdsb2JhbFsnZ2V0QWxsQW5ndWxhclJvb3RFbGVtZW50cyddID0gKCkgPT4gcmVnaXN0cnkuZ2V0QWxsUm9vdEVsZW1lbnRzKCk7XG5cbiAgICBjb25zdCB3aGVuQWxsU3RhYmxlID0gKGNhbGxiYWNrOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pID0+IHtcbiAgICAgIGNvbnN0IHRlc3RhYmlsaXRpZXMgPSBnbG9iYWxbJ2dldEFsbEFuZ3VsYXJUZXN0YWJpbGl0aWVzJ10oKTtcbiAgICAgIGxldCBjb3VudCA9IHRlc3RhYmlsaXRpZXMubGVuZ3RoO1xuICAgICAgbGV0IGRpZFdvcmsgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGRlY3JlbWVudCA9IGZ1bmN0aW9uKGRpZFdvcmtfOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pIHtcbiAgICAgICAgZGlkV29yayA9IGRpZFdvcmsgfHwgZGlkV29ya187XG4gICAgICAgIGNvdW50LS07XG4gICAgICAgIGlmIChjb3VudCA9PSAwKSB7XG4gICAgICAgICAgY2FsbGJhY2soZGlkV29yayk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0ZXN0YWJpbGl0aWVzLmZvckVhY2goZnVuY3Rpb24odGVzdGFiaWxpdHk6IGFueSAvKiogVE9ETyAjOTEwMCAqLykge1xuICAgICAgICB0ZXN0YWJpbGl0eS53aGVuU3RhYmxlKGRlY3JlbWVudCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYgKCFnbG9iYWxbJ2ZyYW1ld29ya1N0YWJpbGl6ZXJzJ10pIHtcbiAgICAgIGdsb2JhbFsnZnJhbWV3b3JrU3RhYmlsaXplcnMnXSA9IFtdO1xuICAgIH1cbiAgICBnbG9iYWxbJ2ZyYW1ld29ya1N0YWJpbGl6ZXJzJ10ucHVzaCh3aGVuQWxsU3RhYmxlKTtcbiAgfVxuXG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4pOlxuICAgICAgVGVzdGFiaWxpdHl8bnVsbCB7XG4gICAgaWYgKGVsZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHQgPSByZWdpc3RyeS5nZXRUZXN0YWJpbGl0eShlbGVtKTtcbiAgICBpZiAodCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdDtcbiAgICB9IGVsc2UgaWYgKCFmaW5kSW5BbmNlc3RvcnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoZ2V0RE9NKCkuaXNTaGFkb3dSb290KGVsZW0pKSB7XG4gICAgICByZXR1cm4gdGhpcy5maW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnksICg8YW55PmVsZW0pLmhvc3QsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5maW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnksIGVsZW0ucGFyZW50RWxlbWVudCwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==