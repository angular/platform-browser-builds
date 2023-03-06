/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
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
SharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: SharedStylesHost, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: SharedStylesHost });
export { SharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }] });
class DomSharedStylesHost extends SharedStylesHost {
    constructor(doc) {
        super();
        this.doc = doc;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this.styleRef = new Map();
        this.hostNodes = new Set();
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
        styleElements?.forEach(e => e.remove());
        styleRef.delete(style);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.styleRef.clear();
        this.resetHostNodes();
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
    addStyleToHost(host, style) {
        const styleEl = this.doc.createElement('style');
        styleEl.textContent = style;
        host.appendChild(styleEl);
        const styleElRef = this.styleRef.get(style);
        if (styleElRef) {
            styleElRef.push(styleEl);
        }
        else {
            this.styleRef.set(style, [styleEl]);
        }
    }
    resetHostNodes() {
        const hostNodes = this.hostNodes;
        hostNodes.clear();
        // Re-add the head element back since this is the default host.
        hostNodes.add(this.doc.head);
    }
}
DomSharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: DomSharedStylesHost, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
DomSharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: DomSharedStylesHost });
export { DomSharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-10ffd03", ngImport: i0, type: DomSharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7O0FBRTVELE1BQ2EsZ0JBQWdCO0lBRDdCO1FBRW1CLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBeUQsQ0FBQztLQW1EaEc7SUFqREMsU0FBUyxDQUFDLE1BQWdCO1FBQ3hCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbkQsSUFBSSxVQUFVLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWdCO1FBQzNCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRCxJQUFJLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7U0FDRjtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsS0FBYSxJQUFTLENBQUM7SUFFdEMsWUFBWSxDQUFDLEtBQWEsSUFBUyxDQUFDO0lBRXBDLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFB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LEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFTyxjQUFjO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLCtEQUErRDtRQUMvRCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7MkhBM0RVLG1CQUFtQixrQkFLVixRQUFROytIQUxqQixtQkFBbUI7U0FBbkIsbUJBQW1CO3NHQUFuQixtQkFBbUI7a0JBRC9CLFVBQVU7OzBCQU1JLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSB1c2FnZUNvdW50ID0gbmV3IE1hcDxzdHJpbmcgLyoqIFN0eWxlIHN0cmluZyAqLywgbnVtYmVyIC8qKiBVc2FnZSBjb3VudCAqLz4oKTtcblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCB1c2FnZUNvdW50ID0gdGhpcy5jaGFuZ2VVc2FnZUNvdW50KHN0eWxlLCAxKTtcblxuICAgICAgaWYgKHVzYWdlQ291bnQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5vblN0eWxlQWRkZWQoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIC0xKTtcblxuICAgICAgaWYgKHVzYWdlQ291bnQgPT09IDApIHtcbiAgICAgICAgdGhpcy5vblN0eWxlUmVtb3ZlZChzdHlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25TdHlsZVJlbW92ZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge31cblxuICBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge31cblxuICBnZXRBbGxTdHlsZXMoKTogSXRlcmFibGVJdGVyYXRvcjxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy51c2FnZUNvdW50LmtleXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlVXNhZ2VDb3VudChzdHlsZTogc3RyaW5nLCBkZWx0YTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLnVzYWdlQ291bnQ7XG4gICAgbGV0IHVzYWdlID0gbWFwLmdldChzdHlsZSkgPz8gMDtcbiAgICB1c2FnZSArPSBkZWx0YTtcblxuICAgIGlmICh1c2FnZSA+IDApIHtcbiAgICAgIG1hcC5zZXQoc3R5bGUsIHVzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFwLmRlbGV0ZShzdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVzYWdlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiB0aGlzLmdldEFsbFN0eWxlcygpKSB7XG4gICAgICB0aGlzLm9uU3R5bGVSZW1vdmVkKHN0eWxlKTtcbiAgICB9XG5cbiAgICB0aGlzLnVzYWdlQ291bnQuY2xlYXIoKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBNYXBzIGFsbCByZWdpc3RlcmVkIGhvc3Qgbm9kZXMgdG8gYSBsaXN0IG9mIHN0eWxlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBob3N0IG5vZGUuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3R5bGVSZWYgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudFtdPigpO1xuICBwcml2YXRlIGhvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIHJlYWRvbmx5IGRvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlc2V0SG9zdE5vZGVzKCk7XG4gIH1cblxuICBvdmVycmlkZSBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaG9zdCBvZiB0aGlzLmhvc3ROb2Rlcykge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0LCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgb25TdHlsZVJlbW92ZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlUmVmID0gdGhpcy5zdHlsZVJlZjtcbiAgICBjb25zdCBzdHlsZUVsZW1lbnRzID0gc3R5bGVSZWYuZ2V0KHN0eWxlKTtcbiAgICBzdHlsZUVsZW1lbnRzPy5mb3JFYWNoKGUgPT4gZS5yZW1vdmUoKSk7XG4gICAgc3R5bGVSZWYuZGVsZXRlKHN0eWxlKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5zdHlsZVJlZi5jbGVhcigpO1xuICAgIHRoaXMucmVzZXRIb3N0Tm9kZXMoKTtcbiAgfVxuXG4gIGFkZEhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLmhvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiB0aGlzLmdldEFsbFN0eWxlcygpKSB7XG4gICAgICB0aGlzLmFkZFN0eWxlVG9Ib3N0KGhvc3ROb2RlLCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmRlbGV0ZShob3N0Tm9kZSk7XG4gIH1cblxuICBwcml2YXRlIGFkZFN0eWxlVG9Ib3N0KGhvc3Q6IE5vZGUsIHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcblxuICAgIGNvbnN0IHN0eWxlRWxSZWYgPSB0aGlzLnN0eWxlUmVmLmdldChzdHlsZSk7XG4gICAgaWYgKHN0eWxlRWxSZWYpIHtcbiAgICAgIHN0eWxlRWxSZWYucHVzaChzdHlsZUVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdHlsZVJlZi5zZXQoc3R5bGUsIFtzdHlsZUVsXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhvc3ROb2RlcygpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0Tm9kZXMgPSB0aGlzLmhvc3ROb2RlcztcbiAgICBob3N0Tm9kZXMuY2xlYXIoKTtcbiAgICAvLyBSZS1hZGQgdGhlIGhlYWQgZWxlbWVudCBiYWNrIHNpbmNlIHRoaXMgaXMgdGhlIGRlZmF1bHQgaG9zdC5cbiAgICBob3N0Tm9kZXMuYWRkKHRoaXMuZG9jLmhlYWQpO1xuICB9XG59XG4iXX0=