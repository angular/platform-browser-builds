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
import { ɵgetDOM as getDOM } from '@angular/common';
import { setTestabilityGetter, ɵglobal as global } from '@angular/core';
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
        global['getAngularTestability'] = (/**
         * @param {?} elem
         * @param {?=} findInAncestors
         * @return {?}
         */
        (elem, findInAncestors = true) => {
            /** @type {?} */
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        });
        global['getAllAngularTestabilities'] = (/**
         * @return {?}
         */
        () => registry.getAllTestabilities());
        global['getAllAngularRootElements'] = (/**
         * @return {?}
         */
        () => registry.getAllRootElements());
        /** @type {?} */
        const whenAllStable = (/**
         * @param {?} callback
         * @return {?}
         */
        (callback /** TODO #9100 */) => {
            /** @type {?} */
            const testabilities = global['getAllAngularTestabilities']();
            /** @type {?} */
            let count = testabilities.length;
            /** @type {?} */
            let didWork = false;
            /** @type {?} */
            const decrement = (/**
             * @param {?} didWork_
             * @return {?}
             */
            function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            });
            testabilities.forEach((/**
             * @param {?} testability
             * @return {?}
             */
            function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            }));
        });
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
        /** @type {?} */
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, ((/** @type {?} */ (elem))).host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQW1ELG9CQUFvQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEgsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUNoQyxNQUFNLENBQUMsSUFBSSxLQUFLLG9CQUFvQixDQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFcEUsV0FBVyxDQUFDLFFBQTZCO1FBQ3ZDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs7Ozs7UUFBRyxDQUFDLElBQVMsRUFBRSxrQkFBMkIsSUFBSSxFQUFFLEVBQUU7O2tCQUN6RSxXQUFXLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxlQUFlLENBQUM7WUFDekUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQztRQUVGLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQzs7O1FBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUEsQ0FBQztRQUU1RSxNQUFNLENBQUMsMkJBQTJCLENBQUM7OztRQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBLENBQUM7O2NBRXBFLGFBQWE7Ozs7UUFBRyxDQUFDLFFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFOztrQkFDbEQsYUFBYSxHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFOztnQkFDeEQsS0FBSyxHQUFHLGFBQWEsQ0FBQyxNQUFNOztnQkFDNUIsT0FBTyxHQUFHLEtBQUs7O2tCQUNiLFNBQVM7Ozs7WUFBRyxVQUFTLFFBQWEsQ0FBQyxpQkFBaUI7Z0JBQ3hELE9BQU8sR0FBRyxPQUFPLElBQUksUUFBUSxDQUFDO2dCQUM5QixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7b0JBQ2QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNuQjtZQUNILENBQUMsQ0FBQTtZQUNELGFBQWEsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBUyxXQUFnQixDQUFDLGlCQUFpQjtnQkFDL0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUNuQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckM7UUFDRCxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7OztJQUVELHFCQUFxQixDQUFDLFFBQTZCLEVBQUUsSUFBUyxFQUFFLGVBQXdCO1FBRXRGLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiOztjQUNLLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtHZXRUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIHNldFRlc3RhYmlsaXR5R2V0dGVyLCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckdldFRlc3RhYmlsaXR5IGltcGxlbWVudHMgR2V0VGVzdGFiaWxpdHkge1xuICBzdGF0aWMgaW5pdCgpIHsgc2V0VGVzdGFiaWxpdHlHZXR0ZXIobmV3IEJyb3dzZXJHZXRUZXN0YWJpbGl0eSgpKTsgfVxuXG4gIGFkZFRvV2luZG93KHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5KTogdm9pZCB7XG4gICAgZ2xvYmFsWydnZXRBbmd1bGFyVGVzdGFiaWxpdHknXSA9IChlbGVtOiBhbnksIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgIGNvbnN0IHRlc3RhYmlsaXR5ID0gcmVnaXN0cnkuZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW0sIGZpbmRJbkFuY2VzdG9ycyk7XG4gICAgICBpZiAodGVzdGFiaWxpdHkgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRlc3RhYmlsaXR5IGZvciBlbGVtZW50LicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRlc3RhYmlsaXR5O1xuICAgIH07XG5cbiAgICBnbG9iYWxbJ2dldEFsbEFuZ3VsYXJUZXN0YWJpbGl0aWVzJ10gPSAoKSA9PiByZWdpc3RyeS5nZXRBbGxUZXN0YWJpbGl0aWVzKCk7XG5cbiAgICBnbG9iYWxbJ2dldEFsbEFuZ3VsYXJSb290RWxlbWVudHMnXSA9ICgpID0+IHJlZ2lzdHJ5LmdldEFsbFJvb3RFbGVtZW50cygpO1xuXG4gICAgY29uc3Qgd2hlbkFsbFN0YWJsZSA9IChjYWxsYmFjazogYW55IC8qKiBUT0RPICM5MTAwICovKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0YWJpbGl0aWVzID0gZ2xvYmFsWydnZXRBbGxBbmd1bGFyVGVzdGFiaWxpdGllcyddKCk7XG4gICAgICBsZXQgY291bnQgPSB0ZXN0YWJpbGl0aWVzLmxlbmd0aDtcbiAgICAgIGxldCBkaWRXb3JrID0gZmFsc2U7XG4gICAgICBjb25zdCBkZWNyZW1lbnQgPSBmdW5jdGlvbihkaWRXb3JrXzogYW55IC8qKiBUT0RPICM5MTAwICovKSB7XG4gICAgICAgIGRpZFdvcmsgPSBkaWRXb3JrIHx8IGRpZFdvcmtfO1xuICAgICAgICBjb3VudC0tO1xuICAgICAgICBpZiAoY291bnQgPT0gMCkge1xuICAgICAgICAgIGNhbGxiYWNrKGRpZFdvcmspO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGVzdGFiaWxpdGllcy5mb3JFYWNoKGZ1bmN0aW9uKHRlc3RhYmlsaXR5OiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pIHtcbiAgICAgICAgdGVzdGFiaWxpdHkud2hlblN0YWJsZShkZWNyZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGlmICghZ2xvYmFsWydmcmFtZXdvcmtTdGFiaWxpemVycyddKSB7XG4gICAgICBnbG9iYWxbJ2ZyYW1ld29ya1N0YWJpbGl6ZXJzJ10gPSBbXTtcbiAgICB9XG4gICAgZ2xvYmFsWydmcmFtZXdvcmtTdGFiaWxpemVycyddLnB1c2god2hlbkFsbFN0YWJsZSk7XG4gIH1cblxuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTpcbiAgICAgIFRlc3RhYmlsaXR5fG51bGwge1xuICAgIGlmIChlbGVtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCB0ID0gcmVnaXN0cnkuZ2V0VGVzdGFiaWxpdHkoZWxlbSk7XG4gICAgaWYgKHQgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfSBlbHNlIGlmICghZmluZEluQW5jZXN0b3JzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGdldERPTSgpLmlzU2hhZG93Um9vdChlbGVtKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5LCAoPGFueT5lbGVtKS5ob3N0LCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHJlZ2lzdHJ5LCBlbGVtLnBhcmVudEVsZW1lbnQsIHRydWUpO1xuICB9XG59XG4iXX0=