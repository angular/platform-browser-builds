/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/browser/title.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, ɵɵinject } from '@angular/core';
import * as i0 from "@angular/core";
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
let Title = /** @class */ (() => {
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
    class Title {
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
        getTitle() {
            return this._doc.title;
        }
        /**
         * Set the title of the current HTML document.
         * @param {?} newTitle
         * @return {?}
         */
        setTitle(newTitle) {
            this._doc.title = newTitle || '';
        }
    }
    Title.decorators = [
        { type: Injectable, args: [{ providedIn: 'root', useFactory: createTitle, deps: [] },] }
    ];
    /** @nocollapse */
    Title.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    /** @nocollapse */ Title.ɵprov = i0.ɵɵdefineInjectable({ factory: createTitle, token: Title, providedIn: "root" });
    return Title;
})();
export { Title };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Title.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQW9CLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFNM0QsTUFBTSxVQUFVLFdBQVc7SUFDekIsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7Ozs7Ozs7OztBQVlEOzs7Ozs7Ozs7OztJQUFBLE1BQ2EsS0FBSzs7OztRQUNoQixZQUFzQyxJQUFTO1lBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUFHLENBQUM7Ozs7O1FBSW5ELFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7Ozs7OztRQU1ELFFBQVEsQ0FBQyxRQUFnQjtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ25DLENBQUM7OztnQkFoQkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7Ozs7Z0RBRXBELE1BQU0sU0FBQyxRQUFROzs7Z0JBL0I5QjtLQThDQztTQWhCWSxLQUFLOzs7Ozs7SUFDSixxQkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCDJtcm1aW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIFRpdGxlIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUaXRsZSgpIHtcbiAgcmV0dXJuIG5ldyBUaXRsZSjJtcm1aW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBzZXQgdGhlIHRpdGxlIG9mIGEgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICpcbiAqIFNpbmNlIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gY2FuJ3QgYmUgYm9vdHN0cmFwcGVkIG9uIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCAoYDxodG1sPmAgdGFnKVxuICogaXQgaXMgbm90IHBvc3NpYmxlIHRvIGJpbmQgdG8gdGhlIGB0ZXh0YCBwcm9wZXJ0eSBvZiB0aGUgYEhUTUxUaXRsZUVsZW1lbnRgIGVsZW1lbnRzXG4gKiAocmVwcmVzZW50aW5nIHRoZSBgPHRpdGxlPmAgdGFnKS4gSW5zdGVhZCwgdGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VkIHRvIHNldCBhbmQgZ2V0IHRoZSBjdXJyZW50XG4gKiB0aXRsZSB2YWx1ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IGNyZWF0ZVRpdGxlLCBkZXBzOiBbXX0pXG5leHBvcnQgY2xhc3MgVGl0bGUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge31cbiAgLyoqXG4gICAqIEdldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICovXG4gIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RvYy50aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHRpdGxlIG9mIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBuZXdUaXRsZVxuICAgKi9cbiAgc2V0VGl0bGUobmV3VGl0bGU6IHN0cmluZykge1xuICAgIHRoaXMuX2RvYy50aXRsZSA9IG5ld1RpdGxlIHx8ICcnO1xuICB9XG59XG4iXX0=