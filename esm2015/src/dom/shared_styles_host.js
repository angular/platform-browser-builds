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
let SharedStylesHost = /** @class */ (() => {
    class SharedStylesHost {
        constructor() {
            /** @internal */
            this._stylesSet = new Set();
        }
        addStyles(styles) {
            const additions = new Set();
            styles.forEach(style => {
                if (!this._stylesSet.has(style)) {
                    this._stylesSet.add(style);
                    additions.add(style);
                }
            });
            this.onStylesAdded(additions);
        }
        onStylesAdded(additions) { }
        getAllStyles() {
            return Array.from(this._stylesSet);
        }
    }
    SharedStylesHost.ɵfac = function SharedStylesHost_Factory(t) { return new (t || SharedStylesHost)(); };
    SharedStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: SharedStylesHost, factory: SharedStylesHost.ɵfac });
    return SharedStylesHost;
})();
export { SharedStylesHost };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null); })();
let DomSharedStylesHost = /** @class */ (() => {
    class DomSharedStylesHost extends SharedStylesHost {
        constructor(_doc) {
            super();
            this._doc = _doc;
            this._hostNodes = new Set();
            this._styleNodes = new Set();
            this._hostNodes.add(_doc.head);
        }
        _addStylesToHost(styles, host) {
            styles.forEach((style) => {
                const styleEl = this._doc.createElement('style');
                styleEl.textContent = style;
                this._styleNodes.add(host.appendChild(styleEl));
            });
        }
        addHost(hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        }
        removeHost(hostNode) {
            this._hostNodes.delete(hostNode);
        }
        onStylesAdded(additions) {
            this._hostNodes.forEach(hostNode => this._addStylesToHost(additions, hostNode));
        }
        ngOnDestroy() {
            this._styleNodes.forEach(styleNode => getDOM().remove(styleNode));
        }
    }
    DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) { return new (t || DomSharedStylesHost)(i0.ɵɵinject(DOCUMENT)); };
    DomSharedStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: DomSharedStylesHost, factory: DomSharedStylesHost.ɵfac });
    return DomSharedStylesHost;
})();
export { DomSharedStylesHost };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7QUFFNUQ7SUFBQSxNQUNhLGdCQUFnQjtRQUQ3QjtZQUVFLGdCQUFnQjtZQUNOLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1NBa0IxQztRQWhCQyxTQUFTLENBQUMsTUFBZ0I7WUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztZQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsYUFBYSxDQUFDLFNBQXNCLElBQVMsQ0FBQztRQUU5QyxZQUFZO1lBQ1YsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxDQUFDOztvRkFuQlUsZ0JBQWdCOzREQUFoQixnQkFBZ0IsV0FBaEIsZ0JBQWdCOzJCQVo3QjtLQWdDQztTQXBCWSxnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUQ1QixVQUFVOztBQXVCWDtJQUFBLE1BQ2EsbUJBQW9CLFNBQVEsZ0JBQWdCO1FBR3ZELFlBQXNDLElBQVM7WUFDN0MsS0FBSyxFQUFFLENBQUM7WUFENEIsU0FBSSxHQUFKLElBQUksQ0FBSztZQUZ2QyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztZQUM3QixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7WUFHcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFTyxnQkFBZ0IsQ0FBQyxNQUFtQixFQUFFLElBQVU7WUFDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO2dCQUMvQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLENBQUMsUUFBYztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsVUFBVSxDQUFDLFFBQWM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELGFBQWEsQ0FBQyxTQUFzQjtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQzs7MEZBL0JVLG1CQUFtQixjQUdWLFFBQVE7K0RBSGpCLG1CQUFtQixXQUFuQixtQkFBbUI7OEJBbkNoQztLQW1FQztTQWhDWSxtQkFBbUI7a0RBQW5CLG1CQUFtQjtjQUQvQixVQUFVOztzQkFJSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIF9zdHlsZXNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IGFkZGl0aW9ucyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgIGlmICghdGhpcy5fc3R5bGVzU2V0LmhhcyhzdHlsZSkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVzU2V0LmFkZChzdHlsZSk7XG4gICAgICAgIGFkZGl0aW9ucy5hZGQoc3R5bGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25TdHlsZXNBZGRlZChhZGRpdGlvbnMpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7fVxuXG4gIGdldEFsbFN0eWxlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fc3R5bGVzU2V0KTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9ob3N0Tm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIHByaXZhdGUgX3N0eWxlTm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKF9kb2MuaGVhZCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZXNUb0hvc3Qoc3R5bGVzOiBTZXQ8c3RyaW5nPiwgaG9zdDogTm9kZSk6IHZvaWQge1xuICAgIHN0eWxlcy5mb3JFYWNoKChzdHlsZTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLl9zdHlsZU5vZGVzLmFkZChob3N0LmFwcGVuZENoaWxkKHN0eWxlRWwpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRTdHlsZXNUb0hvc3QodGhpcy5fc3R5bGVzU2V0LCBob3N0Tm9kZSk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmRlbGV0ZShob3N0Tm9kZSk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuZm9yRWFjaChob3N0Tm9kZSA9PiB0aGlzLl9hZGRTdHlsZXNUb0hvc3QoYWRkaXRpb25zLCBob3N0Tm9kZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3R5bGVOb2Rlcy5mb3JFYWNoKHN0eWxlTm9kZSA9PiBnZXRET00oKS5yZW1vdmUoc3R5bGVOb2RlKSk7XG4gIH1cbn1cbiJdfQ==