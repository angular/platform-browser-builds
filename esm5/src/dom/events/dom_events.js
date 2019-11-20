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
    DomEventsPlugin.prototype.supports = function (eventName) { return true; };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        element.addEventListener(eventName, handler, false);
        return function () { return _this.removeEventListener(element, eventName, handler); };
    };
    DomEventsPlugin.prototype.removeEventListener = function (target, eventName, callback) {
        return target.removeEventListener(eventName, callback);
    };
    DomEventsPlugin.ɵfac = function DomEventsPlugin_Factory(t) { return new (t || DomEventsPlugin)(i0.ɵɵinject(DOCUMENT)); };
    DomEventsPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: DomEventsPlugin, factory: function (t) { return DomEventsPlugin.ɵfac(t); }, providedIn: null });
    return DomEventsPlugin;
}(EventManagerPlugin));
export { DomEventsPlugin };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUVuRDtJQUNxQyxtQ0FBa0I7SUFDckQseUJBQThCLEdBQVE7ZUFBSSxrQkFBTSxHQUFHLENBQUM7SUFBRSxDQUFDO0lBRXZELDhFQUE4RTtJQUM5RSxVQUFVO0lBQ1Ysa0NBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXJELDBDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFBM0UsaUJBR0M7UUFGQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckUsT0FBTyxjQUFNLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBd0IsQ0FBQyxFQUF0RSxDQUFzRSxDQUFDO0lBQ3RGLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkIsVUFBb0IsTUFBVyxFQUFFLFNBQWlCLEVBQUUsUUFBa0I7UUFDcEUsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFFBQXlCLENBQUMsQ0FBQztJQUMxRSxDQUFDO2tGQWRVLGVBQWUsY0FDTixRQUFROzJEQURqQixlQUFlLGlDQUFmLGVBQWU7MEJBZDVCO0NBNkJDLEFBaEJELENBQ3FDLGtCQUFrQixHQWV0RDtTQWZZLGVBQWU7a0RBQWYsZUFBZTtjQUQzQixVQUFVOztzQkFFSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL2V2ZW50X21hbmFnZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tRXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnkpIHsgc3VwZXIoZG9jKTsgfVxuXG4gIC8vIFRoaXMgcGx1Z2luIHNob3VsZCBjb21lIGxhc3QgaW4gdGhlIGxpc3Qgb2YgcGx1Z2lucywgYmVjYXVzZSBpdCBhY2NlcHRzIGFsbFxuICAvLyBldmVudHMuXG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG59XG4iXX0=