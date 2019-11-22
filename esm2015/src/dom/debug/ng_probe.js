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
import { APP_INITIALIZER, ApplicationRef, NgProbeToken, NgZone, Optional, getDebugNode } from '@angular/core';
import { exportNgVar } from '../util';
const ɵ0 = /**
 * @return {?}
 */
() => ({
    'ApplicationRef': ApplicationRef,
    'NgZone': NgZone,
});
/** @type {?} */
const CORE_TOKENS = ((ɵ0))();
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
export const ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS__PRE_R3__;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQWEsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQVksWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpJLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7QUFFZixHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ0wsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxRQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDOztNQUhqQixXQUFXLEdBQUcsTUFHSSxFQUFFOztNQUVwQixtQkFBbUIsR0FBRyxPQUFPOztNQUM3Qix1QkFBdUIsR0FBRyxZQUFZOzs7Ozs7OztBQU81QyxNQUFNLFVBQVUsb0JBQW9CLENBQUMsT0FBWTtJQUMvQyxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsVUFBMEI7SUFDdkQsV0FBVyxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDdkQsV0FBVyxDQUFDLHVCQUF1QixrQ0FBTSxXQUFXLEdBQUssbUJBQW1CLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakc7OztJQUFPLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixFQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUFzQjtJQUNqRCxPQUFPLE1BQU0sQ0FBQyxNQUFNOzs7OztJQUFDLENBQUMsSUFBUyxFQUFFLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEYsQ0FBQzs7Ozs7Ozs7O0FBU0QsTUFBTSxPQUFPLGtDQUFrQyxHQUFHLEVBQUU7Ozs7O0FBS3BELE1BQU0sT0FBTyxpQ0FBaUMsR0FBZTtJQUMzRDtRQUNFLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxjQUFjO1FBQzFCLElBQUksRUFBRTtZQUNKLENBQUMsWUFBWSxFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7U0FDL0I7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaO0NBQ0Y7O0FBRUQsTUFBTSxPQUFPLHVCQUF1QixHQUFHLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uUmVmLCBEZWJ1Z05vZGUsIE5nUHJvYmVUb2tlbiwgTmdab25lLCBPcHRpb25hbCwgUHJvdmlkZXIsIGdldERlYnVnTm9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7ZXhwb3J0TmdWYXJ9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCBDT1JFX1RPS0VOUyA9ICgoKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAnQXBwbGljYXRpb25SZWYnOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgJ05nWm9uZSc6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICAgICAgIH0pKSgpO1xuXG5jb25zdCBJTlNQRUNUX0dMT0JBTF9OQU1FID0gJ3Byb2JlJztcbmNvbnN0IENPUkVfVE9LRU5TX0dMT0JBTF9OQU1FID0gJ2NvcmVUb2tlbnMnO1xuXG4vKipcbiAqIFJldHVybnMgYSB7QGxpbmsgRGVidWdFbGVtZW50fSBmb3IgdGhlIGdpdmVuIG5hdGl2ZSBET00gZWxlbWVudCwgb3JcbiAqIG51bGwgaWYgdGhlIGdpdmVuIG5hdGl2ZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYW4gQW5ndWxhciB2aWV3IGFzc29jaWF0ZWRcbiAqIHdpdGggaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNwZWN0TmF0aXZlRWxlbWVudChlbGVtZW50OiBhbnkpOiBEZWJ1Z05vZGV8bnVsbCB7XG4gIHJldHVybiBnZXREZWJ1Z05vZGUoZWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlTmdQcm9iZShjb3JlVG9rZW5zOiBOZ1Byb2JlVG9rZW5bXSk6IGFueSB7XG4gIGV4cG9ydE5nVmFyKElOU1BFQ1RfR0xPQkFMX05BTUUsIGluc3BlY3ROYXRpdmVFbGVtZW50KTtcbiAgZXhwb3J0TmdWYXIoQ09SRV9UT0tFTlNfR0xPQkFMX05BTUUsIHsuLi5DT1JFX1RPS0VOUywgLi4uX25nUHJvYmVUb2tlbnNUb01hcChjb3JlVG9rZW5zIHx8IFtdKX0pO1xuICByZXR1cm4gKCkgPT4gaW5zcGVjdE5hdGl2ZUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIF9uZ1Byb2JlVG9rZW5zVG9NYXAodG9rZW5zOiBOZ1Byb2JlVG9rZW5bXSk6IHtbbmFtZTogc3RyaW5nXTogYW55fSB7XG4gIHJldHVybiB0b2tlbnMucmVkdWNlKChwcmV2OiBhbnksIHQ6IGFueSkgPT4gKHByZXZbdC5uYW1lXSA9IHQudG9rZW4sIHByZXYpLCB7fSk7XG59XG5cbi8qKlxuICogSW4gSXZ5LCB3ZSBkb24ndCBzdXBwb3J0IE5nUHJvYmUgYmVjYXVzZSB3ZSBoYXZlIG91ciBvd24gc2V0IG9mIHRlc3RpbmcgdXRpbGl0aWVzXG4gKiB3aXRoIG1vcmUgcm9idXN0IGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogV2Ugc2hvdWxkbid0IGJyaW5nIGluIE5nUHJvYmUgYmVjYXVzZSBpdCBwcmV2ZW50cyBEZWJ1Z05vZGUgYW5kIGZyaWVuZHMgZnJvbVxuICogdHJlZS1zaGFraW5nIHByb3Blcmx5LlxuICovXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfX1BPU1RfUjNfXyA9IFtdO1xuXG4vKipcbiAqIFByb3ZpZGVycyB3aGljaCBzdXBwb3J0IGRlYnVnZ2luZyBBbmd1bGFyIGFwcGxpY2F0aW9ucyAoZS5nLiB2aWEgYG5nLnByb2JlYCkuXG4gKi9cbmV4cG9ydCBjb25zdCBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUFJFX1IzX186IFByb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogX2NyZWF0ZU5nUHJvYmUsXG4gICAgZGVwczogW1xuICAgICAgW05nUHJvYmVUb2tlbiwgbmV3IE9wdGlvbmFsKCldLFxuICAgIF0sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMgPSBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19fUFJFX1IzX187XG4iXX0=