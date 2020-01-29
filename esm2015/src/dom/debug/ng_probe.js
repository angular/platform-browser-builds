/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/dom/debug/ng_probe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_INITIALIZER, ApplicationRef, NgProbeToken, NgZone, Optional, ɵgetDebugNodeR2 } from '@angular/core';
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
export function inspectNativeElementR2(element) {
    return ɵgetDebugNodeR2(element);
}
/**
 * @param {?} coreTokens
 * @return {?}
 */
export function _createNgProbeR2(coreTokens) {
    exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElementR2);
    exportNgVar(CORE_TOKENS_GLOBAL_NAME, Object.assign(Object.assign({}, CORE_TOKENS), _ngProbeTokensToMap(coreTokens || [])));
    return (/**
     * @return {?}
     */
    () => inspectNativeElementR2);
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
        useFactory: _createNgProbeR2,
        deps: [
            [NgProbeToken, new Optional()],
        ],
        multi: true,
    },
];
/** @type {?} */
export const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__POST_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQWEsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQVksZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXBJLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7O01BRTlCLFdBQVcsR0FBRzs7O0FBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNMLGdCQUFnQixFQUFFLGNBQWM7SUFDaEMsUUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQyxFQUFDLEVBQUU7O01BRXBCLG1CQUFtQixHQUFHLE9BQU87O01BQzdCLHVCQUF1QixHQUFHLFlBQVk7Ozs7Ozs7O0FBTzVDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUFZO0lBQ2pELE9BQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFVBQTBCO0lBQ3pELFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3pELFdBQVcsQ0FBQyx1QkFBdUIsa0NBQU0sV0FBVyxHQUFLLG1CQUFtQixDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ2pHOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsRUFBQztBQUN0QyxDQUFDOzs7OztBQUVELFNBQVMsbUJBQW1CLENBQUMsTUFBc0I7SUFDakQsT0FBTyxNQUFNLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLElBQVMsRUFBRSxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7Ozs7Ozs7OztBQVNELE1BQU0sT0FBTyxrQ0FBa0MsR0FBRyxFQUFFOzs7OztBQUtwRCxNQUFNLE9BQU8saUNBQWlDLEdBQWU7SUFDM0Q7UUFDRSxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLElBQUksRUFBRTtZQUNKLENBQUMsWUFBWSxFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7U0FDL0I7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaO0NBQ0Y7O0FBRUQsTUFBTSxPQUFPLHVCQUF1QixHQWhCdkIsa0NBZ0IyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uUmVmLCBEZWJ1Z05vZGUsIE5nUHJvYmVUb2tlbiwgTmdab25lLCBPcHRpb25hbCwgUHJvdmlkZXIsIMm1Z2V0RGVidWdOb2RlUjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2V4cG9ydE5nVmFyfSBmcm9tICcuLi91dGlsJztcblxuY29uc3QgQ09SRV9UT0tFTlMgPSAoKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgJ0FwcGxpY2F0aW9uUmVmJzogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICdOZ1pvbmUnOiBOZ1pvbmUsXG4gICAgICAgICAgICAgICAgICAgICB9KSkoKTtcblxuY29uc3QgSU5TUEVDVF9HTE9CQUxfTkFNRSA9ICdwcm9iZSc7XG5jb25zdCBDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSA9ICdjb3JlVG9rZW5zJztcblxuLyoqXG4gKiBSZXR1cm5zIGEge0BsaW5rIERlYnVnRWxlbWVudH0gZm9yIHRoZSBnaXZlbiBuYXRpdmUgRE9NIGVsZW1lbnQsIG9yXG4gKiBudWxsIGlmIHRoZSBnaXZlbiBuYXRpdmUgZWxlbWVudCBkb2VzIG5vdCBoYXZlIGFuIEFuZ3VsYXIgdmlldyBhc3NvY2lhdGVkXG4gKiB3aXRoIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zcGVjdE5hdGl2ZUVsZW1lbnRSMihlbGVtZW50OiBhbnkpOiBEZWJ1Z05vZGV8bnVsbCB7XG4gIHJldHVybiDJtWdldERlYnVnTm9kZVIyKGVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZU5nUHJvYmVSMihjb3JlVG9rZW5zOiBOZ1Byb2JlVG9rZW5bXSk6IGFueSB7XG4gIGV4cG9ydE5nVmFyKElOU1BFQ1RfR0xPQkFMX05BTUUsIGluc3BlY3ROYXRpdmVFbGVtZW50UjIpO1xuICBleHBvcnROZ1ZhcihDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSwgey4uLkNPUkVfVE9LRU5TLCAuLi5fbmdQcm9iZVRva2Vuc1RvTWFwKGNvcmVUb2tlbnMgfHwgW10pfSk7XG4gIHJldHVybiAoKSA9PiBpbnNwZWN0TmF0aXZlRWxlbWVudFIyO1xufVxuXG5mdW5jdGlvbiBfbmdQcm9iZVRva2Vuc1RvTWFwKHRva2VuczogTmdQcm9iZVRva2VuW10pOiB7W25hbWU6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gdG9rZW5zLnJlZHVjZSgocHJldjogYW55LCB0OiBhbnkpID0+IChwcmV2W3QubmFtZV0gPSB0LnRva2VuLCBwcmV2KSwge30pO1xufVxuXG4vKipcbiAqIEluIEl2eSwgd2UgZG9uJ3Qgc3VwcG9ydCBOZ1Byb2JlIGJlY2F1c2Ugd2UgaGF2ZSBvdXIgb3duIHNldCBvZiB0ZXN0aW5nIHV0aWxpdGllc1xuICogd2l0aCBtb3JlIHJvYnVzdCBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIFdlIHNob3VsZG4ndCBicmluZyBpbiBOZ1Byb2JlIGJlY2F1c2UgaXQgcHJldmVudHMgRGVidWdOb2RlIGFuZCBmcmllbmRzIGZyb21cbiAqIHRyZWUtc2hha2luZyBwcm9wZXJseS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX19QT1NUX1IzX18gPSBbXTtcblxuLyoqXG4gKiBQcm92aWRlcnMgd2hpY2ggc3VwcG9ydCBkZWJ1Z2dpbmcgQW5ndWxhciBhcHBsaWNhdGlvbnMgKGUuZy4gdmlhIGBuZy5wcm9iZWApLlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BSRV9SM19fOiBQcm92aWRlcltdID0gW1xuICB7XG4gICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVOZ1Byb2JlUjIsXG4gICAgZGVwczogW1xuICAgICAgW05nUHJvYmVUb2tlbiwgbmV3IE9wdGlvbmFsKCldLFxuICAgIF0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMgPSBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUFJFX1IzX187XG4iXX0=