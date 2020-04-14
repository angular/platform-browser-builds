import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
var DomEventsPlugin = /** @class */ (function (_super) {
    __extends(DomEventsPlugin, _super);
    function DomEventsPlugin(doc) {
        return _super.call(this, doc) || this;
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = function (eventName) {
        return true;
    };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        element.addEventListener(eventName, handler, false);
        return function () { return _this.removeEventListener(element, eventName, handler); };
    };
    DomEventsPlugin.prototype.removeEventListener = function (target, eventName, callback) {
        return target.removeEventListener(eventName, callback);
    };
    DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) { return new (t || DomEventsPlugin)(i0.ɵɵinject(DOCUMENT)); };
    DomEventsPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: DomEventsPlugin, factory: DomEventsPlugin.ɵfac });
    return DomEventsPlugin;
}(EventManagerPlugin));
export { DomEventsPlugin };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUVuRDtJQUNxQyxtQ0FBa0I7SUFDckQseUJBQThCLEdBQVE7ZUFDcEMsa0JBQU0sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELDhFQUE4RTtJQUM5RSxVQUFVO0lBQ1Ysa0NBQVEsR0FBUixVQUFTLFNBQWlCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDBDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFBM0UsaUJBR0M7UUFGQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckUsT0FBTyxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBd0IsQ0FBQyxFQUF0RSxDQUFzRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkIsVUFBb0IsTUFBVyxFQUFFLFNBQWlCLEVBQUUsUUFBa0I7UUFDcEUsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFFBQXlCLENBQUMsQ0FBQztJQUMxRSxDQUFDO2tGQWxCVSxlQUFlLGNBQ04sUUFBUTsyREFEakIsZUFBZSxXQUFmLGVBQWU7MEJBZDVCO0NBaUNDLEFBcEJELENBQ3FDLGtCQUFrQixHQW1CdEQ7U0FuQlksZUFBZTtrREFBZixlQUFlO2NBRDNCLFVBQVU7O3NCQUVJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21FdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICAvLyBUaGlzIHBsdWdpbiBzaG91bGQgY29tZSBsYXN0IGluIHRoZSBsaXN0IG9mIHBsdWdpbnMsIGJlY2F1c2UgaXQgYWNjZXB0cyBhbGxcbiAgLy8gZXZlbnRzLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG59XG4iXX0=