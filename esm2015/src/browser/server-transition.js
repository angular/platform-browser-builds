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
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { APP_INITIALIZER, ApplicationInitStatus, InjectionToken, Injector } from '@angular/core';
/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 * @type {?}
 */
export const TRANSITION_ID = new InjectionToken('TRANSITION_ID');
/**
 * @param {?} transitionId
 * @param {?} document
 * @param {?} injector
 * @return {?}
 */
export function appInitializerFactory(transitionId, document, injector) {
    return (/**
     * @return {?}
     */
    () => {
        // Wait for all application initializers to be completed before removing the styles set by
        // the server.
        injector.get(ApplicationInitStatus).donePromise.then((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const dom = getDOM();
            /** @type {?} */
            const styles = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
            styles.filter((/**
             * @param {?} el
             * @return {?}
             */
            el => dom.getAttribute(el, 'ng-transition') === transitionId))
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => dom.remove(el)));
        }));
    });
}
/** @type {?} */
export const SERVER_TRANSITION_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFactory,
        deps: [TRANSITION_ID, DOCUMENT, Injector],
        multi: true
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3NlcnZlci10cmFuc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBRSxxQkFBcUIsRUFBVSxjQUFjLEVBQUUsUUFBUSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBTXZILE1BQU0sT0FBTyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0FBRWhFLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxZQUFvQixFQUFFLFFBQWEsRUFBRSxRQUFrQjtJQUMzRjs7O0lBQU8sR0FBRyxFQUFFO1FBQ1YsMEZBQTBGO1FBQzFGLGNBQWM7UUFDZCxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ2xELEdBQUcsR0FBRyxNQUFNLEVBQUU7O2tCQUNkLE1BQU0sR0FDUixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sQ0FBQyxNQUFNOzs7O1lBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsS0FBSyxZQUFZLEVBQUM7aUJBQ3RFLE9BQU87Ozs7WUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUMsRUFBQztBQUNKLENBQUM7O0FBRUQsTUFBTSxPQUFPLDJCQUEyQixHQUFxQjtJQUMzRDtRQUNFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7UUFDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDekMsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEFuIGlkIHRoYXQgaWRlbnRpZmllcyBhIHBhcnRpY3VsYXIgYXBwbGljYXRpb24gYmVpbmcgYm9vdHN0cmFwcGVkLCB0aGF0IHNob3VsZFxuICogbWF0Y2ggYWNyb3NzIHRoZSBjbGllbnQvc2VydmVyIGJvdW5kYXJ5LlxuICovXG5leHBvcnQgY29uc3QgVFJBTlNJVElPTl9JRCA9IG5ldyBJbmplY3Rpb25Ub2tlbignVFJBTlNJVElPTl9JRCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwSW5pdGlhbGl6ZXJGYWN0b3J5KHRyYW5zaXRpb25JZDogc3RyaW5nLCBkb2N1bWVudDogYW55LCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICAvLyBXYWl0IGZvciBhbGwgYXBwbGljYXRpb24gaW5pdGlhbGl6ZXJzIHRvIGJlIGNvbXBsZXRlZCBiZWZvcmUgcmVtb3ZpbmcgdGhlIHN0eWxlcyBzZXQgYnlcbiAgICAvLyB0aGUgc2VydmVyLlxuICAgIGluamVjdG9yLmdldChBcHBsaWNhdGlvbkluaXRTdGF0dXMpLmRvbmVQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgZG9tID0gZ2V0RE9NKCk7XG4gICAgICBjb25zdCBzdHlsZXM6IGFueVtdID1cbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZG9tLnF1ZXJ5U2VsZWN0b3JBbGwoZG9jdW1lbnQsIGBzdHlsZVtuZy10cmFuc2l0aW9uXWApKTtcbiAgICAgIHN0eWxlcy5maWx0ZXIoZWwgPT4gZG9tLmdldEF0dHJpYnV0ZShlbCwgJ25nLXRyYW5zaXRpb24nKSA9PT0gdHJhbnNpdGlvbklkKVxuICAgICAgICAgIC5mb3JFYWNoKGVsID0+IGRvbS5yZW1vdmUoZWwpKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNFUlZFUl9UUkFOU0lUSU9OX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge1xuICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBhcHBJbml0aWFsaXplckZhY3RvcnksXG4gICAgZGVwczogW1RSQU5TSVRJT05fSUQsIERPQ1VNRU5ULCBJbmplY3Rvcl0sXG4gICAgbXVsdGk6IHRydWVcbiAgfSxcbl07XG4iXX0=