/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SharedStylesHost {
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
SharedStylesHost.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SharedStylesHost, factory: SharedStylesHost.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null); })();
export class DomSharedStylesHost extends SharedStylesHost {
    constructor(_doc) {
        super();
        this._doc = _doc;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this._hostNodes = new Map();
        this._hostNodes.set(_doc.head, []);
    }
    _addStylesToHost(styles, host, styleNodes) {
        styles.forEach((style) => {
            const styleEl = this._doc.createElement('style');
            styleEl.textContent = style;
            styleNodes.push(host.appendChild(styleEl));
        });
    }
    addHost(hostNode) {
        const styleNodes = [];
        this._addStylesToHost(this._stylesSet, hostNode, styleNodes);
        this._hostNodes.set(hostNode, styleNodes);
    }
    removeHost(hostNode) {
        const styleNodes = this._hostNodes.get(hostNode);
        if (styleNodes) {
            styleNodes.forEach(removeStyle);
        }
        this._hostNodes.delete(hostNode);
    }
    onStylesAdded(additions) {
        this._hostNodes.forEach((styleNodes, hostNode) => {
            this._addStylesToHost(additions, hostNode, styleNodes);
        });
    }
    ngOnDestroy() {
        this._hostNodes.forEach(styleNodes => styleNodes.forEach(removeStyle));
    }
}
DomSharedStylesHost.ɵfac = function DomSharedStylesHost_Factory(t) { return new (t || DomSharedStylesHost)(i0.ɵɵinject(DOCUMENT)); };
DomSharedStylesHost.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DomSharedStylesHost, factory: DomSharedStylesHost.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
function removeStyle(styleNode) {
    getDOM().remove(styleNode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7QUFHNUQsTUFBTSxPQUFPLGdCQUFnQjtJQUQ3QjtRQUVFLGdCQUFnQjtRQUNOLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0tBa0IxQztJQWhCQyxTQUFTLENBQUMsTUFBZ0I7UUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFzQixJQUFTLENBQUM7SUFFOUMsWUFBWTtRQUNWLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0ZBbkJVLGdCQUFnQjtzRUFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O0FBd0JYLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFJdkQsWUFBc0MsSUFBUztRQUM3QyxLQUFLLEVBQUUsQ0FBQztRQUQ0QixTQUFJLEdBQUosSUFBSSxDQUFLO1FBSC9DLGlHQUFpRztRQUN6RixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7UUFJM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsTUFBbUIsRUFBRSxJQUFVLEVBQUUsVUFBa0I7UUFDMUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUFjO1FBQ3BCLE1BQU0sVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBYztRQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQXNCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDOztzRkF2Q1UsbUJBQW1CLGNBSVYsUUFBUTt5RUFKakIsbUJBQW1CLFdBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVU7O3NCQUtJLE1BQU07dUJBQUMsUUFBUTs7QUFzQzlCLFNBQVMsV0FBVyxDQUFDLFNBQWU7SUFDbEMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgX3N0eWxlc1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgYWRkaXRpb25zID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9zdHlsZXNTZXQuaGFzKHN0eWxlKSkge1xuICAgICAgICB0aGlzLl9zdHlsZXNTZXQuYWRkKHN0eWxlKTtcbiAgICAgICAgYWRkaXRpb25zLmFkZChzdHlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vblN0eWxlc0FkZGVkKGFkZGl0aW9ucyk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkIHt9XG5cbiAgZ2V0QWxsU3R5bGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9zdHlsZXNTZXQpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21TaGFyZWRTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIE1hcHMgYWxsIHJlZ2lzdGVyZWQgaG9zdCBub2RlcyB0byBhIGxpc3Qgb2Ygc3R5bGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGhvc3Qgbm9kZS5cbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IE1hcDxOb2RlLCBOb2RlW10+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5zZXQoX2RvYy5oZWFkLCBbXSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTdHlsZXNUb0hvc3Qoc3R5bGVzOiBTZXQ8c3RyaW5nPiwgaG9zdDogTm9kZSwgc3R5bGVOb2RlczogTm9kZVtdKTogdm9pZCB7XG4gICAgc3R5bGVzLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICAgIHN0eWxlTm9kZXMucHVzaChob3N0LmFwcGVuZENoaWxkKHN0eWxlRWwpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZU5vZGVzOiBOb2RlW10gPSBbXTtcbiAgICB0aGlzLl9hZGRTdHlsZXNUb0hvc3QodGhpcy5fc3R5bGVzU2V0LCBob3N0Tm9kZSwgc3R5bGVOb2Rlcyk7XG4gICAgdGhpcy5faG9zdE5vZGVzLnNldChob3N0Tm9kZSwgc3R5bGVOb2Rlcyk7XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVOb2RlcyA9IHRoaXMuX2hvc3ROb2Rlcy5nZXQoaG9zdE5vZGUpO1xuICAgIGlmIChzdHlsZU5vZGVzKSB7XG4gICAgICBzdHlsZU5vZGVzLmZvckVhY2gocmVtb3ZlU3R5bGUpO1xuICAgIH1cbiAgICB0aGlzLl9ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5mb3JFYWNoKChzdHlsZU5vZGVzLCBob3N0Tm9kZSkgPT4ge1xuICAgICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KGFkZGl0aW9ucywgaG9zdE5vZGUsIHN0eWxlTm9kZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmZvckVhY2goc3R5bGVOb2RlcyA9PiBzdHlsZU5vZGVzLmZvckVhY2gocmVtb3ZlU3R5bGUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZShzdHlsZU5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgZ2V0RE9NKCkucmVtb3ZlKHN0eWxlTm9kZSk7XG59XG4iXX0=