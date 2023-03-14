/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
class SharedStylesHost {
    constructor() {
        this.usageCount = new Map();
    }
    addStyles(styles) {
        for (const style of styles) {
            const usageCount = this.changeUsageCount(style, 1);
            if (usageCount === 1) {
                this.onStyleAdded(style);
            }
        }
    }
    removeStyles(styles) {
        for (const style of styles) {
            const usageCount = this.changeUsageCount(style, -1);
            if (usageCount === 0) {
                this.onStyleRemoved(style);
            }
        }
    }
    onStyleRemoved(style) { }
    onStyleAdded(style) { }
    getAllStyles() {
        return this.usageCount.keys();
    }
    changeUsageCount(style, delta) {
        const map = this.usageCount;
        let usage = map.get(style) ?? 0;
        usage += delta;
        if (usage > 0) {
            map.set(style, usage);
        }
        else {
            map.delete(style);
        }
        return usage;
    }
    ngOnDestroy() {
        for (const style of this.getAllStyles()) {
            this.onStyleRemoved(style);
        }
        this.usageCount.clear();
    }
}
SharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: SharedStylesHost, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: SharedStylesHost });
export { SharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }] });
class DomSharedStylesHost extends SharedStylesHost {
    constructor(doc, appId) {
        super();
        this.doc = doc;
        this.appId = appId;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this.styleRef = new Map();
        this.hostNodes = new Set();
        this.styleNodesInDOM = this.collectServerRenderedStyles();
        this.resetHostNodes();
    }
    onStyleAdded(style) {
        for (const host of this.hostNodes) {
            this.addStyleToHost(host, style);
        }
    }
    onStyleRemoved(style) {
        const styleRef = this.styleRef;
        const styleElements = styleRef.get(style);
        styleElements?.forEach(node => node.remove());
        styleRef.delete(style);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.styleRef.clear();
        this.resetHostNodes();
        const styleNodesInDOM = this.styleNodesInDOM;
        if (styleNodesInDOM) {
            styleNodesInDOM.forEach(node => node.remove());
            styleNodesInDOM.clear();
        }
    }
    addHost(hostNode) {
        this.hostNodes.add(hostNode);
        for (const style of this.getAllStyles()) {
            this.addStyleToHost(hostNode, style);
        }
    }
    removeHost(hostNode) {
        this.hostNodes.delete(hostNode);
    }
    collectServerRenderedStyles() {
        const styles = this.doc.head?.querySelectorAll(`style[ng-app="${this.appId}"]`);
        if (styles?.length) {
            const styleMap = new Map();
            styles.forEach(style => {
                if (style.textContent != null) {
                    styleMap.set(style.textContent, style);
                }
            });
            return styleMap;
        }
        return null;
    }
    getStyleElement(host, style) {
        const styleNodesInDOM = this.styleNodesInDOM;
        const styleEl = styleNodesInDOM?.get(style);
        if (styleEl?.parentNode === host) {
            // `styleNodesInDOM` cannot be undefined due to the above `styleNodesInDOM?.get`.
            styleNodesInDOM.delete(style);
            styleEl.removeAttribute('ng-app');
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // This attribute is solely used for debugging purposes.
                styleEl.setAttribute('ng-style-reused', '');
            }
            return styleEl;
        }
        else {
            const styleEl = this.doc.createElement('style');
            styleEl.textContent = style;
            return styleEl;
        }
    }
    addStyleToHost(host, style) {
        const styleEl = this.getStyleElement(host, style);
        host.appendChild(styleEl);
        const styleRef = this.styleRef;
        const styleElRef = styleRef.get(style);
        if (styleElRef) {
            styleElRef.push(styleEl);
        }
        else {
            styleRef.set(style, [styleEl]);
        }
    }
    resetHostNodes() {
        const hostNodes = this.hostNodes;
        hostNodes.clear();
        // Re-add the head element back since this is the default host.
        hostNodes.add(this.doc.head);
    }
}
DomSharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: DomSharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }], target: i0.ɵɵFactoryTarget.Injectable });
DomSharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: DomSharedStylesHost });
export { DomSharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.2+sha-0814f20", ngImport: i0, type: DomSharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDOztBQUVwRSxNQUNhLGdCQUFnQjtJQUQ3QjtRQUVtQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXlELENBQUM7S0FtRGhHO0lBakRDLFNBQVMsQ0FBQyxNQUFnQjtRQUN4QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRW5ELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFnQjtRQUMzQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEQsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQWEsSUFBUyxDQUFDO0lBRXRDLFlBQVksQ0FBQyxLQUFhLElBQVMsQ0FBQztJQUVwQyxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFB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SUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFFNUIsT0FBTyxPQUFPLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBRU8sY0FBYyxDQUFDLElBQVUsRUFBRSxLQUFhO1FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQjthQUFNO1lBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsK0RBQStEO1FBQy9ELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzsySEE5R1UsbUJBQW1CLGtCQU9sQixRQUFRLGFBQTBDLE1BQU07K0hBUHpELG1CQUFtQjtTQUFuQixtQkFBbUI7c0dBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVTs7MEJBUUosTUFBTTsyQkFBQyxRQUFROzswQkFBbUMsTUFBTTsyQkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgdXNhZ2VDb3VudCA9IG5ldyBNYXA8c3RyaW5nIC8qKiBTdHlsZSBzdHJpbmcgKi8sIG51bWJlciAvKiogVXNhZ2UgY291bnQgKi8+KCk7XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3QgdXNhZ2VDb3VudCA9IHRoaXMuY2hhbmdlVXNhZ2VDb3VudChzdHlsZSwgMSk7XG5cbiAgICAgIGlmICh1c2FnZUNvdW50ID09PSAxKSB7XG4gICAgICAgIHRoaXMub25TdHlsZUFkZGVkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCB1c2FnZUNvdW50ID0gdGhpcy5jaGFuZ2VVc2FnZUNvdW50KHN0eWxlLCAtMSk7XG5cbiAgICAgIGlmICh1c2FnZUNvdW50ID09PSAwKSB7XG4gICAgICAgIHRoaXMub25TdHlsZVJlbW92ZWQoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU3R5bGVSZW1vdmVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHt9XG5cbiAgb25TdHlsZUFkZGVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHt9XG5cbiAgZ2V0QWxsU3R5bGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudXNhZ2VDb3VudC5rZXlzKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVVzYWdlQ291bnQoc3R5bGU6IHN0cmluZywgZGVsdGE6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbWFwID0gdGhpcy51c2FnZUNvdW50O1xuICAgIGxldCB1c2FnZSA9IG1hcC5nZXQoc3R5bGUpID8/IDA7XG4gICAgdXNhZ2UgKz0gZGVsdGE7XG5cbiAgICBpZiAodXNhZ2UgPiAwKSB7XG4gICAgICBtYXAuc2V0KHN0eWxlLCB1c2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcC5kZWxldGUoc3R5bGUpO1xuICAgIH1cblxuICAgIHJldHVybiB1c2FnZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGhpcy5nZXRBbGxTdHlsZXMoKSkge1xuICAgICAgdGhpcy5vblN0eWxlUmVtb3ZlZChzdHlsZSk7XG4gICAgfVxuXG4gICAgdGhpcy51c2FnZUNvdW50LmNsZWFyKCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLy8gTWFwcyBhbGwgcmVnaXN0ZXJlZCBob3N0IG5vZGVzIHRvIGEgbGlzdCBvZiBzdHlsZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgaG9zdCBub2RlLlxuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlUmVmID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnRbXT4oKTtcbiAgcHJpdmF0ZSBob3N0Tm9kZXMgPSBuZXcgU2V0PE5vZGU+KCk7XG4gIHByaXZhdGUgc3R5bGVOb2Rlc0luRE9NOiBNYXA8c3RyaW5nLCBIVE1MU3R5bGVFbGVtZW50PnxudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LCBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSBhcHBJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuY29sbGVjdFNlcnZlclJlbmRlcmVkU3R5bGVzKCk7XG4gICAgdGhpcy5yZXNldEhvc3ROb2RlcygpO1xuICB9XG5cbiAgb3ZlcnJpZGUgb25TdHlsZUFkZGVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGhvc3Qgb2YgdGhpcy5ob3N0Tm9kZXMpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdCwgc3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIG9uU3R5bGVSZW1vdmVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZVJlZiA9IHRoaXMuc3R5bGVSZWY7XG4gICAgY29uc3Qgc3R5bGVFbGVtZW50cyA9IHN0eWxlUmVmLmdldChzdHlsZSk7XG4gICAgc3R5bGVFbGVtZW50cz8uZm9yRWFjaChub2RlID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgIHN0eWxlUmVmLmRlbGV0ZShzdHlsZSk7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuc3R5bGVSZWYuY2xlYXIoKTtcbiAgICB0aGlzLnJlc2V0SG9zdE5vZGVzKCk7XG5cbiAgICBjb25zdCBzdHlsZU5vZGVzSW5ET00gPSB0aGlzLnN0eWxlTm9kZXNJbkRPTTtcbiAgICBpZiAoc3R5bGVOb2Rlc0luRE9NKSB7XG4gICAgICBzdHlsZU5vZGVzSW5ET00uZm9yRWFjaChub2RlID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgc3R5bGVOb2Rlc0luRE9NLmNsZWFyKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdE5vZGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgY29sbGVjdFNlcnZlclJlbmRlcmVkU3R5bGVzKCk6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+fG51bGwge1xuICAgIGNvbnN0IHN0eWxlcyA9XG4gICAgICAgIHRoaXMuZG9jLmhlYWQ/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFN0eWxlRWxlbWVudD4oYHN0eWxlW25nLWFwcD1cIiR7dGhpcy5hcHBJZH1cIl1gKTtcblxuICAgIGlmIChzdHlsZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4oKTtcblxuICAgICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgICBpZiAoc3R5bGUudGV4dENvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0eWxlTWFwLnNldChzdHlsZS50ZXh0Q29udGVudCwgc3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHN0eWxlTWFwO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdHlsZUVsZW1lbnQoaG9zdDogTm9kZSwgc3R5bGU6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIGNvbnN0IHN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuc3R5bGVOb2Rlc0luRE9NO1xuICAgIGNvbnN0IHN0eWxlRWwgPSBzdHlsZU5vZGVzSW5ET00/LmdldChzdHlsZSk7XG4gICAgaWYgKHN0eWxlRWw/LnBhcmVudE5vZGUgPT09IGhvc3QpIHtcbiAgICAgIC8vIGBzdHlsZU5vZGVzSW5ET01gIGNhbm5vdCBiZSB1bmRlZmluZWQgZHVlIHRvIHRoZSBhYm92ZSBgc3R5bGVOb2Rlc0luRE9NPy5nZXRgLlxuICAgICAgc3R5bGVOb2Rlc0luRE9NIS5kZWxldGUoc3R5bGUpO1xuICAgICAgc3R5bGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ25nLWFwcCcpO1xuXG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNvbGVseSB1c2VkIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuXG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCduZy1zdHlsZS1yZXVzZWQnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZUVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZTtcblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRTdHlsZVRvSG9zdChob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuZ2V0U3R5bGVFbGVtZW50KGhvc3QsIHN0eWxlKTtcblxuICAgIGhvc3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG5cbiAgICBjb25zdCBzdHlsZVJlZiA9IHRoaXMuc3R5bGVSZWY7XG4gICAgY29uc3Qgc3R5bGVFbFJlZiA9IHN0eWxlUmVmLmdldChzdHlsZSk7XG4gICAgaWYgKHN0eWxlRWxSZWYpIHtcbiAgICAgIHN0eWxlRWxSZWYucHVzaChzdHlsZUVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVSZWYuc2V0KHN0eWxlLCBbc3R5bGVFbF0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIb3N0Tm9kZXMoKTogdm9pZCB7XG4gICAgY29uc3QgaG9zdE5vZGVzID0gdGhpcy5ob3N0Tm9kZXM7XG4gICAgaG9zdE5vZGVzLmNsZWFyKCk7XG4gICAgLy8gUmUtYWRkIHRoZSBoZWFkIGVsZW1lbnQgYmFjayBzaW5jZSB0aGlzIGlzIHRoZSBkZWZhdWx0IGhvc3QuXG4gICAgaG9zdE5vZGVzLmFkZCh0aGlzLmRvYy5oZWFkKTtcbiAgfVxufVxuIl19