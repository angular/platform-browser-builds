import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
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
    SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) { return new (t || SharedStylesHost)(); };
    SharedStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: SharedStylesHost, factory: function (t) { return SharedStylesHost.ɵfac(t); }, providedIn: null });
    return SharedStylesHost;
}());
export { SharedStylesHost };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null); })();
var DomSharedStylesHost = /** @class */ (function (_super) {
    __extends(DomSharedStylesHost, _super);
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
    DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) { return new (t || DomSharedStylesHost)(i0.ɵɵinject(DOCUMENT)); };
    DomSharedStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: DomSharedStylesHost, factory: function (t) { return DomSharedStylesHost.ɵfac(t); }, providedIn: null });
    return DomSharedStylesHost;
}(SharedStylesHost));
export { DomSharedStylesHost };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7O0FBRTVEO0lBQUE7UUFFRSxnQkFBZ0I7UUFDTixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztLQWdCMUM7SUFkQyxvQ0FBUyxHQUFULFVBQVUsTUFBZ0I7UUFBMUIsaUJBU0M7UUFSQyxJQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ2xCLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDL0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHdDQUFhLEdBQWIsVUFBYyxTQUFzQixJQUFTLENBQUM7SUFFOUMsdUNBQVksR0FBWixjQUEyQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvRkFqQnJELGdCQUFnQjs0REFBaEIsZ0JBQWdCLGlDQUFoQixnQkFBZ0I7MkJBWjdCO0NBOEJDLEFBbkJELElBbUJDO1NBbEJZLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O0FBcUJYO0lBQ3lDLHVDQUFnQjtJQUd2RCw2QkFBc0MsSUFBUztRQUEvQyxZQUNFLGlCQUFPLFNBRVI7UUFIcUMsVUFBSSxHQUFKLElBQUksQ0FBSztRQUZ2QyxnQkFBVSxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7UUFDN0IsaUJBQVcsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBR3BDLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDakMsQ0FBQztJQUVPLDhDQUFnQixHQUF4QixVQUF5QixNQUFtQixFQUFFLElBQVU7UUFBeEQsaUJBTUM7UUFMQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBYTtZQUMzQixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUM1QixLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQU8sR0FBUCxVQUFRLFFBQWM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxRQUFjLElBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRFLDJDQUFhLEdBQWIsVUFBYyxTQUFzQjtRQUFwQyxpQkFFQztRQURDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCx5Q0FBVyxHQUFYLGNBQXNCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDOzBGQTNCL0UsbUJBQW1CLGNBR1YsUUFBUTsrREFIakIsbUJBQW1CLGlDQUFuQixtQkFBbUI7OEJBakNoQztDQTZEQyxBQTdCRCxDQUN5QyxnQkFBZ0IsR0E0QnhEO1NBNUJZLG1CQUFtQjtrREFBbkIsbUJBQW1CO2NBRC9CLFVBQVU7O3NCQUlJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgX3N0eWxlc1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgYWRkaXRpb25zID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9zdHlsZXNTZXQuaGFzKHN0eWxlKSkge1xuICAgICAgICB0aGlzLl9zdHlsZXNTZXQuYWRkKHN0eWxlKTtcbiAgICAgICAgYWRkaXRpb25zLmFkZChzdHlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vblN0eWxlc0FkZGVkKGFkZGl0aW9ucyk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkIHt9XG5cbiAgZ2V0QWxsU3R5bGVzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fc3R5bGVzU2V0KTsgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9ob3N0Tm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIHByaXZhdGUgX3N0eWxlTm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKF9kb2MuaGVhZCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZXNUb0hvc3Qoc3R5bGVzOiBTZXQ8c3RyaW5nPiwgaG9zdDogTm9kZSk6IHZvaWQge1xuICAgIHN0eWxlcy5mb3JFYWNoKChzdHlsZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLl9zdHlsZU5vZGVzLmFkZChob3N0LmFwcGVuZENoaWxkKHN0eWxlRWwpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRTdHlsZXNUb0hvc3QodGhpcy5fc3R5bGVzU2V0LCBob3N0Tm9kZSk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7IHRoaXMuX2hvc3ROb2Rlcy5kZWxldGUoaG9zdE5vZGUpOyB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmZvckVhY2goaG9zdE5vZGUgPT4gdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KGFkZGl0aW9ucywgaG9zdE5vZGUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLl9zdHlsZU5vZGVzLmZvckVhY2goc3R5bGVOb2RlID0+IGdldERPTSgpLnJlbW92ZShzdHlsZU5vZGUpKTsgfVxufVxuIl19