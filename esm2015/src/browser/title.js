/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @experimental
 */
let Title = class Title {
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     */
    getTitle() { return getDOM().getTitle(this._doc); }
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTitle(newTitle) { getDOM().setTitle(this._doc, newTitle); }
};
Title = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__param(0, Inject(DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Object])
], Title);
export { Title };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRzNDOzs7Ozs7Ozs7R0FTRztBQUVILElBQWEsS0FBSyxHQUFsQjtJQUNFLFlBQXNDLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUcsQ0FBQztJQUNuRDs7T0FFRztJQUNILFFBQVEsS0FBYSxPQUFPLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxRQUFnQixJQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2RSxDQUFBO0FBWlksS0FBSztJQURqQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFFbEIsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBOztHQURsQixLQUFLLENBWWpCO1NBWlksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbS9kb21fdG9rZW5zJztcblxuXG4vKipcbiAqIEEgc2VydmljZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGdldCBhbmQgc2V0IHRoZSB0aXRsZSBvZiBhIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAqXG4gKiBTaW5jZSBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGNhbid0IGJlIGJvb3RzdHJhcHBlZCBvbiB0aGUgZW50aXJlIEhUTUwgZG9jdW1lbnQgKGA8aHRtbD5gIHRhZylcbiAqIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBiaW5kIHRvIHRoZSBgdGV4dGAgcHJvcGVydHkgb2YgdGhlIGBIVE1MVGl0bGVFbGVtZW50YCBlbGVtZW50c1xuICogKHJlcHJlc2VudGluZyB0aGUgYDx0aXRsZT5gIHRhZykuIEluc3RlYWQsIHRoaXMgc2VydmljZSBjYW4gYmUgdXNlZCB0byBzZXQgYW5kIGdldCB0aGUgY3VycmVudFxuICogdGl0bGUgdmFsdWUuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7fVxuICAvKipcbiAgICogR2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKi9cbiAgZ2V0VGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIGdldERPTSgpLmdldFRpdGxlKHRoaXMuX2RvYyk7IH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gbmV3VGl0bGVcbiAgICovXG4gIHNldFRpdGxlKG5ld1RpdGxlOiBzdHJpbmcpIHsgZ2V0RE9NKCkuc2V0VGl0bGUodGhpcy5fZG9jLCBuZXdUaXRsZSk7IH1cbn1cbiJdfQ==