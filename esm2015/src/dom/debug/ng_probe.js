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
import { APP_INITIALIZER, ApplicationRef, NgProbeToken, NgZone, Optional, getDebugNode } from '@angular/core';
import { exportNgVar } from '../util';
/** @type {?} */
const CORE_TOKENS = ((/**
 * @return {?}
 */
() => ({
    'ApplicationRef': ApplicationRef,
    'NgZone': NgZone,
})))();
/** @type {?} */
const INSPECT_GLOBAL_NAME = 'probe';
/** @type {?} */
const CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
/**
 * Returns a {\@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 * @param {?} element
 * @return {?}
 */
export function inspectNativeElement(element) {
    return getDebugNode(element);
}
/**
 * @param {?} coreTokens
 * @return {?}
 */
export function _createNgProbe(coreTokens) {
    exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
    return (/**
     * @return {?}
     */
    () => inspectNativeElement);
}
/**
 * @param {?} tokens
 * @return {?}
 */
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce((/**
     * @param {?} prev
     * @param {?} t
     * @return {?}
     */
    (prev, t) => (prev[t.name] = t.token, prev)), {});
}
/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 * @type {?}
 */
export const ELEMENT_PROBE_PROVIDERS__POST_R3__ = [];
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 * @type {?}
 */
export const ELEMENT_PROBE_PROVIDERS__PRE_R3__ = [
    {
        provide: APP_INITIALIZER,
        useFactory: _createNgProbe,
        deps: [
            [NgProbeToken, new Optional()],
        ],
        multi: true,
    },
];
/** @type {?} */
export const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBYSxZQUFZLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBWSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakksT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7TUFFOUIsV0FBVyxHQUFHOzs7QUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ0wsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDLEVBQUMsRUFBRTs7TUFFcEIsbUJBQW1CLEdBQUcsT0FBTzs7TUFDN0IsdUJBQXVCLEdBQUcsWUFBWTs7Ozs7Ozs7QUFPNUMsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQVk7SUFDL0MsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLFVBQTBCO0lBQ3ZELFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3ZELFdBQVcsQ0FBQyx1QkFBdUIsa0NBQU0sV0FBVyxHQUFLLG1CQUFtQixDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2pHOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBQztBQUNwQyxDQUFDOzs7OztBQUVELFNBQVMsbUJBQW1CLENBQUMsTUFBc0I7SUFDakQsT0FBTyxNQUFNLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLElBQVMsRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7Ozs7Ozs7OztBQVNELE1BQU0sT0FBTyxrQ0FBa0MsR0FBRyxFQUFFOzs7OztBQUtwRCxNQUFNLE9BQU8saUNBQWlDLEdBQWU7SUFDM0Q7UUFDRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsY0FBYztRQUMxQixJQUFJLEVBQUU7WUFDSixDQUFDLFlBQVksRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGOztBQUVELE1BQU0sT0FBTyx1QkFBdUIsR0FoQnZCLGtDQWdCMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QVBQX0lOSVRJQUxJWkVSLCBBcHBsaWNhdGlvblJlZiwgRGVidWdOb2RlLCBOZ1Byb2JlVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwsIFByb3ZpZGVyLCBnZXREZWJ1Z05vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2V4cG9ydE5nVmFyfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgQ09SRV9UT0tFTlMgPSAoKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ0FwcGxpY2F0aW9uUmVmJzogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICdOZ1pvbmUnOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgICAgICB9KSkoKTtcblxuY29uc3QgSU5TUEVDVF9HTE9CQUxfTkFNRSA9ICdwcm9iZSc7XG5jb25zdCBDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSA9ICdjb3JlVG9rZW5zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEge0BsaW5rIERlYnVnRWxlbWVudH0gZm9yIHRoZSBnaXZlbiBuYXRpdmUgRE9NIGVsZW1lbnQsIG9yXG4gKiBudWxsIGlmIHRoZSBnaXZlbiBuYXRpdmUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGFuIEFuZ3VsYXIgdmlldyBhc3NvY2lhdGVkXG4gKiB3aXRoIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE5hdGl2ZUVsZW1lbnQoZWxlbWVudDogYW55KTogRGVidWdOb2RlfG51bGwge1xuICByZXR1cm4gZ2V0RGVidWdOb2RlKGVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZU5nUHJvYmUoY29yZVRva2VuczogTmdQcm9iZVRva2VuW10pOiBhbnkge1xuICBleHBvcnROZ1ZhcihJTlNQRUNUX0dMT0JBTF9OQU1FLCBpbnNwZWN0TmF0aXZlRWxlbWVudCk7XG4gIGV4cG9ydE5nVmFyKENPUkVfVE9LRU5TX0dMT0JBTF9OQU1FLCB7Li4uQ09SRV9UT0tFTlMsIC4uLl9uZ1Byb2JlVG9rZW5zVG9NYXAoY29yZVRva2VucyB8fCBbXSl9KTtcbiAgcmV0dXJuICgpID0+IGluc3BlY3ROYXRpdmVFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBfbmdQcm9iZVRva2Vuc1RvTWFwKHRva2VuczogTmdQcm9iZVRva2VuW10pOiB7W25hbWU6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gdG9rZW5zLnJlZHVjZSgocHJldjogYW55LCB0OiBhbnkpID0+IChwcmV2W3QubmFtZV0gPSB0LnRva2VuLCBwcmV2KSwge30pO1xufVxuXG4vKipcbiAqIEluIEl2eSwgd2UgZG9uJ3Qgc3VwcG9ydCBOZ1Byb2JlIGJlY2F1c2Ugd2UgaGF2ZSBvdXIgb3duIHNldCBvZiB0ZXN0aW5nIHV0aWxpdGllc1xuICogd2l0aCBtb3JlIHJvYnVzdCBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIFdlIHNob3VsZG4ndCBicmluZyBpbiBOZ1Byb2JlIGJlY2F1c2UgaXQgcHJldmVudHMgRGVidWdOb2RlIGFuZCBmcmllbmRzIGZyb21cbiAqIHRyZWUtc2hha2luZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX19QT1NUX1IzX18gPSBbXTtcblxuLyoqXG4gKiBQcm92aWRlcnMgd2hpY2ggc3VwcG9ydCBkZWJ1Z2dpbmcgQW5ndWxhciBhcHBsaWNhdGlvbnMgKGUuZy4gdmlhIGBuZy5wcm9iZWApLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BSRV9SM19fOiBQcm92aWRlcltdID0gW1xuICB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVOZ1Byb2JlLFxuICAgIGRlcHM6IFtcbiAgICAgIFtOZ1Byb2JlVG9rZW4sIG5ldyBPcHRpb25hbCgpXSxcbiAgICBdLFxuICAgIG11bHRpOiB0cnVlLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTID0gRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BSRV9SM19fO1xuIl19