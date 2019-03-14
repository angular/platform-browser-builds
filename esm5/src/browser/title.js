/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import * as i0 from "@angular/core";
/**
 * Factory to create Title service.
 */
export function createTitle() {
    return new Title(inject(DOCUMENT));
}
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */
var Title = /** @class */ (function () {
    function Title(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     */
    Title.prototype.getTitle = function () { return getDOM().getTitle(this._doc); };
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    Title.prototype.setTitle = function (newTitle) { getDOM().setTitle(this._doc, newTitle); };
    Title.ngInjectableDef = i0.defineInjectable({ token: Title, factory: function Title_Factory(t) { var r = null; if (t) {
            (r = new t(i0.inject(DOCUMENT)));
        }
        else {
            (r = createTitle());
        } return r; }, providedIn: 'root' });
    return Title;
}());
export { Title };
/*@__PURE__*/ i0.ɵsetClassMetadata(Title, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createTitle, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUUxQzs7R0FFRztBQUNILE1BQU0sVUFBVSxXQUFXO0lBQ3pCLE9BQU8sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNIO0lBRUUsZUFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFBRyxDQUFDO0lBQ25EOztPQUVHO0lBQ0gsd0JBQVEsR0FBUixjQUFxQixPQUFPLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNEOzs7T0FHRztJQUNILHdCQUFRLEdBQVIsVUFBUyxRQUFnQixJQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5REFYM0QsS0FBSztpQ0FDSSxRQUFROzs7aUJBRmUsV0FBVzttQ0FBL0IsTUFBTTtnQkE5Qi9CO0NBMkNDLEFBYkQsSUFhQztTQVpZLEtBQUs7bUNBQUwsS0FBSztjQURqQixVQUFVO2VBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQzs7c0JBRXBELE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcblxuLyoqXG4gKiBGYWN0b3J5IHRvIGNyZWF0ZSBUaXRsZSBzZXJ2aWNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGl0bGUoKSB7XG4gIHJldHVybiBuZXcgVGl0bGUoaW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBzZXQgdGhlIHRpdGxlIG9mIGEgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICpcbiAqIFNpbmNlIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gY2FuJ3QgYmUgYm9vdHN0cmFwcGVkIG9uIHRoZSBlbnRpcmUgSFRNTCBkb2N1bWVudCAoYDxodG1sPmAgdGFnKVxuICogaXQgaXMgbm90IHBvc3NpYmxlIHRvIGJpbmQgdG8gdGhlIGB0ZXh0YCBwcm9wZXJ0eSBvZiB0aGUgYEhUTUxUaXRsZUVsZW1lbnRgIGVsZW1lbnRzXG4gKiAocmVwcmVzZW50aW5nIHRoZSBgPHRpdGxlPmAgdGFnKS4gSW5zdGVhZCwgdGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VkIHRvIHNldCBhbmQgZ2V0IHRoZSBjdXJyZW50XG4gKiB0aXRsZSB2YWx1ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IGNyZWF0ZVRpdGxlLCBkZXBzOiBbXX0pXG5leHBvcnQgY2xhc3MgVGl0bGUge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge31cbiAgLyoqXG4gICAqIEdldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICovXG4gIGdldFRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRET00oKS5nZXRUaXRsZSh0aGlzLl9kb2MpOyB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIG5ld1RpdGxlXG4gICAqL1xuICBzZXRUaXRsZShuZXdUaXRsZTogc3RyaW5nKSB7IGdldERPTSgpLnNldFRpdGxlKHRoaXMuX2RvYywgbmV3VGl0bGUpOyB9XG59XG4iXX0=