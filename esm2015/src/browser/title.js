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
 * @publicApi
 */
let Title = /** @class */ (() => {
    class Title {
        constructor(_doc) {
            this._doc = _doc;
        }
        /**
         * Get the title of the current HTML document.
         */
        getTitle() {
            return this._doc.title;
        }
        /**
         * Set the title of the current HTML document.
         * @param newTitle
         */
        setTitle(newTitle) {
            this._doc.title = newTitle || '';
        }
    }
    Title.ɵfac = function Title_Factory(t) { return new (t || Title)(i0.ɵɵinject(DOCUMENT)); };
    Title.ɵprov = i0.ɵɵdefineInjectable({ token: Title, factory: function Title_Factory(t) { var r = null; if (t) {
            r = new t();
        }
        else {
            r = createTitle();
        } return r; }, providedIn: 'root' });
    return Title;
})();
export { Title };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Title, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createTitle, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQW9CLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUczRDs7R0FFRztBQUNILE1BQU0sVUFBVSxXQUFXO0lBQ3pCLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNIO0lBQUEsTUFDYSxLQUFLO1FBQ2hCLFlBQXNDLElBQVM7WUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQUcsQ0FBQztRQUNuRDs7V0FFRztRQUNILFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7O1dBR0c7UUFDSCxRQUFRLENBQUMsUUFBZ0I7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNuQyxDQUFDOzs4REFmVSxLQUFLLGNBQ0ksUUFBUTtpREFEakIsS0FBSzs7OztnQkFEMkIsV0FBVzttQ0FBL0IsTUFBTTtnQkE3Qi9CO0tBOENDO1NBaEJZLEtBQUs7a0RBQUwsS0FBSztjQURqQixVQUFVO2VBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQzs7c0JBRXBELE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIMm1ybVpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8qKlxuICogRmFjdG9yeSB0byBjcmVhdGUgVGl0bGUgc2VydmljZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRpdGxlKCkge1xuICByZXR1cm4gbmV3IFRpdGxlKMm1ybVpbmplY3QoRE9DVU1FTlQpKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgYW5kIHNldCB0aGUgdGl0bGUgb2YgYSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gKlxuICogU2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4ndCBiZSBib290c3RyYXBwZWQgb24gdGhlIGVudGlyZSBIVE1MIGRvY3VtZW50IChgPGh0bWw+YCB0YWcpXG4gKiBpdCBpcyBub3QgcG9zc2libGUgdG8gYmluZCB0byB0aGUgYHRleHRgIHByb3BlcnR5IG9mIHRoZSBgSFRNTFRpdGxlRWxlbWVudGAgZWxlbWVudHNcbiAqIChyZXByZXNlbnRpbmcgdGhlIGA8dGl0bGU+YCB0YWcpLiBJbnN0ZWFkLCB0aGlzIHNlcnZpY2UgY2FuIGJlIHVzZWQgdG8gc2V0IGFuZCBnZXQgdGhlIGN1cnJlbnRcbiAqIHRpdGxlIHZhbHVlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogY3JlYXRlVGl0bGUsIGRlcHM6IFtdfSlcbmV4cG9ydCBjbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7fVxuICAvKipcbiAgICogR2V0IHRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKi9cbiAgZ2V0VGl0bGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZG9jLnRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGl0bGUgb2YgdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIG5ld1RpdGxlXG4gICAqL1xuICBzZXRUaXRsZShuZXdUaXRsZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fZG9jLnRpdGxlID0gbmV3VGl0bGUgfHwgJyc7XG4gIH1cbn1cbiJdfQ==