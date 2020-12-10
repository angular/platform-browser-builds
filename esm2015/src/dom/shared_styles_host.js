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
SharedStylesHost.ɵprov = i0.ɵɵdefineInjectable({ token: SharedStylesHost, factory: SharedStylesHost.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedStylesHost, [{
        type: Injectable
    }], null, null); })();
export class DomSharedStylesHost extends SharedStylesHost {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DomSharedStylesHost, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQzs7QUFHNUQsTUFBTSxPQUFPLGdCQUFnQjtJQUQ3QjtRQUVFLGdCQUFnQjtRQUNOLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0tBa0IxQztJQWhCQyxTQUFTLENBQUMsTUFBZ0I7UUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFzQixJQUFTLENBQUM7SUFFOUMsWUFBWTtRQUNWLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0ZBbkJVLGdCQUFnQjt3REFBaEIsZ0JBQWdCLFdBQWhCLGdCQUFnQjt1RkFBaEIsZ0JBQWdCO2NBRDVCLFVBQVU7O0FBd0JYLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFHdkQsWUFBc0MsSUFBUztRQUM3QyxLQUFLLEVBQUUsQ0FBQztRQUQ0QixTQUFJLEdBQUosSUFBSSxDQUFLO1FBRnZDLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUdwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLGdCQUFnQixDQUFDLE1BQW1CLEVBQUUsSUFBVTtRQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUFjO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsUUFBYztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQXNCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDOztzRkEvQlUsbUJBQW1CLGNBR1YsUUFBUTsyREFIakIsbUJBQW1CLFdBQW5CLG1CQUFtQjt1RkFBbkIsbUJBQW1CO2NBRC9CLFVBQVU7O3NCQUlJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBfc3R5bGVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBhZGRpdGlvbnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3N0eWxlc1NldC5oYXMoc3R5bGUpKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlc1NldC5hZGQoc3R5bGUpO1xuICAgICAgICBhZGRpdGlvbnMuYWRkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uU3R5bGVzQWRkZWQoYWRkaXRpb25zKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge31cblxuICBnZXRBbGxTdHlsZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3N0eWxlc1NldCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIF9zdHlsZU5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChfZG9jLmhlYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGVzVG9Ib3N0KHN0eWxlczogU2V0PHN0cmluZz4sIGhvc3Q6IE5vZGUpOiB2b2lkIHtcbiAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5fc3R5bGVOb2Rlcy5hZGQoaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KHRoaXMuX3N0eWxlc1NldCwgaG9zdE5vZGUpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5kZWxldGUoaG9zdE5vZGUpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmZvckVhY2goaG9zdE5vZGUgPT4gdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KGFkZGl0aW9ucywgaG9zdE5vZGUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0eWxlTm9kZXMuZm9yRWFjaChzdHlsZU5vZGUgPT4gZ2V0RE9NKCkucmVtb3ZlKHN0eWxlTm9kZSkpO1xuICB9XG59XG4iXX0=