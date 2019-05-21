/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, ɵɵinject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Factory to create Title service.
 * @return {?}
 */
export function createTitle() {
    return new Title(ɵɵinject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * \@publicApi
 */
export class Title {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     * @return {?}
     */
    getTitle() { return getDOM().getTitle(this._doc); }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { getDOM().setTitle(this._doc, newTitle); }
}
Title.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: createTitle, deps: [] },] },
];
/** @nocollapse */
Title.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Title.ngInjectableDef = i0.ɵɵdefineInjectable({ token: Title, factory: function Title_Factory(t) { var r = null; if (t) {
        (r = new t(i0.ɵɵinject(DOCUMENT)));
    }
    else {
        (r = createTitle());
    } return r; }, providedIn: 'root' });
/*@__PURE__*/ i0.ɵsetClassMetadata(Title, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createTitle, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    Title.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUsxQyxNQUFNLFVBQVUsV0FBVztJQUN6QixPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7Ozs7Ozs7Ozs7O0FBYUQsTUFBTSxPQUFPLEtBQUs7Ozs7SUFDaEIsWUFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFBRyxDQUFDOzs7OztJQUluRCxRQUFRLEtBQWEsT0FBTyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBTTNELFFBQVEsQ0FBQyxRQUFnQixJQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBWnZFLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDOzs7OzRDQUVwRCxNQUFNLFNBQUMsUUFBUTs7dURBRGpCLEtBQUs7K0JBQ0ksUUFBUTs7O2FBRmUsV0FBVzsrQkFBL0IsTUFBTTttQ0FDbEIsS0FBSztjQURqQixVQUFVO2VBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQzs7c0JBRXBELE1BQU07dUJBQUMsUUFBUTs7Ozs7OztJQUFoQixxQkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgybXJtWluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Z2V0RE9NfSBmcm9tICcuLi9kb20vZG9tX2FkYXB0ZXInO1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIFRpdGxlIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUaXRsZSgpIHtcbiAgcmV0dXJuIG5ldyBUaXRsZSjJtcm1aW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBzZXQgdGhlIHRpdGxlIG9mIGEgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICpcbiAqIFNpbmNlIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gY2FuJ3QgYmUgYm9vdHN0cmFwcGVkIG9uIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCAoYDxodG1sPmAgdGFnKVxuICogaXQgaXMgbm90IHBvc3NpYmxlIHRvIGJpbmQgdG8gdGhlIGB0ZXh0YCBwcm9wZXJ0eSBvZiB0aGUgYEhUTUxUaXRsZUVsZW1lbnRgIGVsZW1lbnRzXG4gKiAocmVwcmVzZW50aW5nIHRoZSBgPHRpdGxlPmAgdGFnKS4gSW5zdGVhZCwgdGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VkIHRvIHNldCBhbmQgZ2V0IHRoZSBjdXJyZW50XG4gKiB0aXRsZSB2YWx1ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IGNyZWF0ZVRpdGxlLCBkZXBzOiBbXX0pXG5leHBvcnQgY2xhc3MgVGl0bGUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge31cbiAgLyoqXG4gICAqIEdldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICovXG4gIGdldFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRET00oKS5nZXRUaXRsZSh0aGlzLl9kb2MpOyB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIG5ld1RpdGxlXG4gICAqL1xuICBzZXRUaXRsZShuZXdUaXRsZTogc3RyaW5nKSB7IGdldERPTSgpLnNldFRpdGxlKHRoaXMuX2RvYywgbmV3VGl0bGUpOyB9XG59XG4iXX0=