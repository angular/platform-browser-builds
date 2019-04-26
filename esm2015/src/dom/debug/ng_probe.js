/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as core from '@angular/core';
import { exportNgVar } from '../util';
/** @type {?} */
const CORE_TOKENS = {
    'ApplicationRef': core.ApplicationRef,
    'NgZone': core.NgZone,
};
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
    return core.getDebugNode(element);
}
/**
 * @param {?} coreTokens
 * @return {?}
 */
export function _createNgProbe(coreTokens) {
    exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign({}, CORE_TOKENS, _ngProbeTokensToMap(coreTokens || [])));
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
        provide: core.APP_INITIALIZER,
        useFactory: _createNgProbe,
        deps: [
            [core.NgProbeToken, new core.Optional()],
        ],
        multi: true,
    },
];
/** @type {?} */
export const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEtBQUssSUFBSSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sU0FBUyxDQUFDOztNQUU5QixXQUFXLEdBQUc7SUFDbEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWM7SUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO0NBQ3RCOztNQUVLLG1CQUFtQixHQUFHLE9BQU87O01BQzdCLHVCQUF1QixHQUFHLFlBQVk7Ozs7Ozs7O0FBTzVDLE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUFZO0lBQy9DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsVUFBK0I7SUFDNUQsV0FBVyxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDdkQsV0FBVyxDQUFDLHVCQUF1QixvQkFBTSxXQUFXLEVBQUssbUJBQW1CLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakc7OztJQUFPLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixFQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUEyQjtJQUN0RCxPQUFPLE1BQU0sQ0FBQyxNQUFNOzs7OztJQUFDLENBQUMsSUFBUyxFQUFFLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEYsQ0FBQzs7Ozs7Ozs7O0FBU0QsTUFBTSxPQUFPLGtDQUFrQyxHQUFHLEVBQUU7Ozs7O0FBS3BELE1BQU0sT0FBTyxpQ0FBaUMsR0FBb0I7SUFDaEU7UUFDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7UUFDN0IsVUFBVSxFQUFFLGNBQWM7UUFDMUIsSUFBSSxFQUFFO1lBQ0osQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGOztBQUVELE1BQU0sT0FBTyx1QkFBdUIsR0FoQnZCLGtDQWdCMkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGNvcmUgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2V4cG9ydE5nVmFyfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgQ09SRV9UT0tFTlMgPSB7XG4gICdBcHBsaWNhdGlvblJlZic6IGNvcmUuQXBwbGljYXRpb25SZWYsXG4gICdOZ1pvbmUnOiBjb3JlLk5nWm9uZSxcbn07XG5cbmNvbnN0IElOU1BFQ1RfR0xPQkFMX05BTUUgPSAncHJvYmUnO1xuY29uc3QgQ09SRV9UT0tFTlNfR0xPQkFMX05BTUUgPSAnY29yZVRva2Vucyc7XG5cbi8qKlxuICogUmV0dXJucyBhIHtAbGluayBEZWJ1Z0VsZW1lbnR9IGZvciB0aGUgZ2l2ZW4gbmF0aXZlIERPTSBlbGVtZW50LCBvclxuICogbnVsbCBpZiB0aGUgZ2l2ZW4gbmF0aXZlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhbiBBbmd1bGFyIHZpZXcgYXNzb2NpYXRlZFxuICogd2l0aCBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3ROYXRpdmVFbGVtZW50KGVsZW1lbnQ6IGFueSk6IGNvcmUuRGVidWdOb2RlfG51bGwge1xuICByZXR1cm4gY29yZS5nZXREZWJ1Z05vZGUoZWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlTmdQcm9iZShjb3JlVG9rZW5zOiBjb3JlLk5nUHJvYmVUb2tlbltdKTogYW55IHtcbiAgZXhwb3J0TmdWYXIoSU5TUEVDVF9HTE9CQUxfTkFNRSwgaW5zcGVjdE5hdGl2ZUVsZW1lbnQpO1xuICBleHBvcnROZ1ZhcihDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSwgey4uLkNPUkVfVE9LRU5TLCAuLi5fbmdQcm9iZVRva2Vuc1RvTWFwKGNvcmVUb2tlbnMgfHwgW10pfSk7XG4gIHJldHVybiAoKSA9PiBpbnNwZWN0TmF0aXZlRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gX25nUHJvYmVUb2tlbnNUb01hcCh0b2tlbnM6IGNvcmUuTmdQcm9iZVRva2VuW10pOiB7W25hbWU6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gdG9rZW5zLnJlZHVjZSgocHJldjogYW55LCB0OiBhbnkpID0+IChwcmV2W3QubmFtZV0gPSB0LnRva2VuLCBwcmV2KSwge30pO1xufVxuXG4vKipcbiAqIEluIEl2eSwgd2UgZG9uJ3Qgc3VwcG9ydCBOZ1Byb2JlIGJlY2F1c2Ugd2UgaGF2ZSBvdXIgb3duIHNldCBvZiB0ZXN0aW5nIHV0aWxpdGllc1xuICogd2l0aCBtb3JlIHJvYnVzdCBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIFdlIHNob3VsZG4ndCBicmluZyBpbiBOZ1Byb2JlIGJlY2F1c2UgaXQgcHJldmVudHMgRGVidWdOb2RlIGFuZCBmcmllbmRzIGZyb21cbiAqIHRyZWUtc2hha2luZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX19QT1NUX1IzX18gPSBbXTtcblxuLyoqXG4gKiBQcm92aWRlcnMgd2hpY2ggc3VwcG9ydCBkZWJ1Z2dpbmcgQW5ndWxhciBhcHBsaWNhdGlvbnMgKGUuZy4gdmlhIGBuZy5wcm9iZWApLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BSRV9SM19fOiBjb3JlLlByb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBjb3JlLkFQUF9JTklUSUFMSVpFUixcbiAgICB1c2VGYWN0b3J5OiBfY3JlYXRlTmdQcm9iZSxcbiAgICBkZXBzOiBbXG4gICAgICBbY29yZS5OZ1Byb2JlVG9rZW4sIG5ldyBjb3JlLk9wdGlvbmFsKCldLFxuICAgIF0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMgPSBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUFJFX1IzX187XG4iXX0=