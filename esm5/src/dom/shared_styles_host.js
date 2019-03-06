import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core';
import { getDOM } from './dom_adapter';
import { DOCUMENT } from './dom_tokens';
import * as i0 from "@angular/core";
var SharedStylesHost = /** @class */ (function () {
    function SharedStylesHost() {
        /** @internal */
        this._stylesSet = new Set();
    }
    SharedStylesHost.prototype.addStyles = function (styles) {
        var _this = this;
        var additions = new Set();
        styles.forEach(function (style) {
            if (!_this._stylesSet.has(style)) {
                _this._stylesSet.add(style);
                additions.add(style);
            }
        });
        this.onStylesAdded(additions);
    };
    SharedStylesHost.prototype.onStylesAdded = function (additions) { };
    SharedStylesHost.prototype.getAllStyles = function () { return Array.from(this._stylesSet); };
    SharedStylesHost.ngInjectableDef = i0.defineInjectable({ token: SharedStylesHost, factory: function SharedStylesHost_Factory(t) { return new (t || SharedStylesHost)(); }, providedIn: null });
    return SharedStylesHost;
}());
export { SharedStylesHost };
/*@__PURE__*/ i0.ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null);
var DomSharedStylesHost = /** @class */ (function (_super) {
    tslib_1.__extends(DomSharedStylesHost, _super);
    function DomSharedStylesHost(_doc) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        _this._hostNodes = new Set();
        _this._styleNodes = new Set();
        _this._hostNodes.add(_doc.head);
        return _this;
    }
    DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
        var _this = this;
        styles.forEach(function (style) {
            var styleEl = _this._doc.createElement('style');
            styleEl.textContent = style;
            _this._styleNodes.add(host.appendChild(styleEl));
        });
    };
    DomSharedStylesHost.prototype.addHost = function (hostNode) {
        this._addStylesToHost(this._stylesSet, hostNode);
        this._hostNodes.add(hostNode);
    };
    DomSharedStylesHost.prototype.removeHost = function (hostNode) { this._hostNodes.delete(hostNode); };
    DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        this._hostNodes.forEach(function (hostNode) { return _this._addStylesToHost(additions, hostNode); });
    };
    DomSharedStylesHost.prototype.ngOnDestroy = function () { this._styleNodes.forEach(function (styleNode) { return getDOM().remove(styleNode); }); };
    DomSharedStylesHost.ngInjectableDef = i0.defineInjectable({ token: DomSharedStylesHost, factory: function DomSharedStylesHost_Factory(t) { return new (t || DomSharedStylesHost)(i0.inject(DOCUMENT)); }, providedIn: null });
    return DomSharedStylesHost;
}(SharedStylesHost));
export { DomSharedStylesHost };
/*@__PURE__*/ i0.ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQUV0QztJQUFBO1FBRUUsZ0JBQWdCO1FBQ04sZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7S0FnQjFDO0lBZEMsb0NBQVMsR0FBVCxVQUFVLE1BQWdCO1FBQTFCLGlCQVNDO1FBUkMsSUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUNsQixJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBc0IsSUFBUyxDQUFDO0lBRTlDLHVDQUFZLEdBQVosY0FBMkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0VBakJyRCxnQkFBZ0IsbUVBQWhCLGdCQUFnQjsyQkFiN0I7Q0ErQkMsQUFuQkQsSUFtQkM7U0FsQlksZ0JBQWdCO21DQUFoQixnQkFBZ0I7Y0FENUIsVUFBVTs7QUFxQlg7SUFDeUMsK0NBQWdCO0lBR3ZELDZCQUFzQyxJQUFTO1FBQS9DLFlBQ0UsaUJBQU8sU0FFUjtRQUhxQyxVQUFJLEdBQUosSUFBSSxDQUFLO1FBRnZDLGdCQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUM3QixpQkFBVyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7UUFHcEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUNqQyxDQUFDO0lBRU8sOENBQWdCLEdBQXhCLFVBQXlCLE1BQW1CLEVBQUUsSUFBVTtRQUF4RCxpQkFNQztRQUxDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFhO1lBQzNCLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsUUFBYztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLFFBQWMsSUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsMkNBQWEsR0FBYixVQUFjLFNBQXNCO1FBQXBDLGlCQUVDO1FBREMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUExQyxDQUEwQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELHlDQUFXLEdBQVgsY0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7dUVBM0IvRSxtQkFBbUIsc0VBQW5CLG1CQUFtQixZQUdWLFFBQVE7OEJBckM5QjtDQThEQyxBQTdCRCxDQUN5QyxnQkFBZ0IsR0E0QnhEO1NBNUJZLG1CQUFtQjttQ0FBbkIsbUJBQW1CO2NBRC9CLFVBQVU7O3NCQUlJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuL2RvbV90b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIF9zdHlsZXNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IGFkZGl0aW9ucyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgIGlmICghdGhpcy5fc3R5bGVzU2V0LmhhcyhzdHlsZSkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzU2V0LmFkZChzdHlsZSk7XG4gICAgICAgIGFkZGl0aW9ucy5hZGQoc3R5bGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25TdHlsZXNBZGRlZChhZGRpdGlvbnMpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7fVxuXG4gIGdldEFsbFN0eWxlcygpOiBzdHJpbmdbXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3N0eWxlc1NldCk7IH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIF9zdHlsZU5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChfZG9jLmhlYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGVzVG9Ib3N0KHN0eWxlczogU2V0PHN0cmluZz4sIGhvc3Q6IE5vZGUpOiB2b2lkIHtcbiAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5fc3R5bGVOb2Rlcy5hZGQoaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KHRoaXMuX3N0eWxlc1NldCwgaG9zdE5vZGUpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQgeyB0aGlzLl9ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTsgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5mb3JFYWNoKGhvc3ROb2RlID0+IHRoaXMuX2FkZFN0eWxlc1RvSG9zdChhZGRpdGlvbnMsIGhvc3ROb2RlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5fc3R5bGVOb2Rlcy5mb3JFYWNoKHN0eWxlTm9kZSA9PiBnZXRET00oKS5yZW1vdmUoc3R5bGVOb2RlKSk7IH1cbn1cbiJdfQ==