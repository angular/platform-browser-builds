/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { APP_ID, CSP_NONCE, Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
/** The style elements attribute name used to set value of `APP_ID` token. */
const APP_ID_ATTRIBUTE_NAME = 'ng-app-id';
class SharedStylesHost {
    constructor(doc, appId, nonce, platformId = {}) {
        this.doc = doc;
        this.appId = appId;
        this.nonce = nonce;
        this.platformId = platformId;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this.styleRef = new Map();
        this.hostNodes = new Set();
        this.styleNodesInDOM = this.collectServerRenderedStyles();
        this.platformIsServer = isPlatformServer(platformId);
        this.resetHostNodes();
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
            if (usageCount <= 0) {
                this.onStyleRemoved(style);
            }
        }
    }
    ngOnDestroy() {
        const styleNodesInDOM = this.styleNodesInDOM;
        if (styleNodesInDOM) {
            styleNodesInDOM.forEach((node) => node.remove());
            styleNodesInDOM.clear();
        }
        for (const style of this.getAllStyles()) {
            this.onStyleRemoved(style);
        }
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
    getAllStyles() {
        return this.styleRef.keys();
    }
    onStyleAdded(style) {
        for (const host of this.hostNodes) {
            this.addStyleToHost(host, style);
        }
    }
    onStyleRemoved(style) {
        const styleRef = this.styleRef;
        styleRef.get(style)?.elements?.forEach((node) => node.remove());
        styleRef.delete(style);
    }
    collectServerRenderedStyles() {
        const styles = this.doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${this.appId}"]`);
        if (styles?.length) {
            const styleMap = new Map();
            styles.forEach((style) => {
                if (style.textContent != null) {
                    styleMap.set(style.textContent, style);
                }
            });
            return styleMap;
        }
        return null;
    }
    changeUsageCount(style, delta) {
        const map = this.styleRef;
        if (map.has(style)) {
            const styleRefValue = map.get(style);
            styleRefValue.usage += delta;
            return styleRefValue.usage;
        }
        map.set(style, { usage: delta, elements: [] });
        return delta;
    }
    getStyleElement(host, style) {
        const styleNodesInDOM = this.styleNodesInDOM;
        const styleEl = styleNodesInDOM?.get(style);
        if (styleEl?.parentNode === host) {
            // `styleNodesInDOM` cannot be undefined due to the above `styleNodesInDOM?.get`.
            styleNodesInDOM.delete(style);
            styleEl.removeAttribute(APP_ID_ATTRIBUTE_NAME);
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // This attribute is solely used for debugging purposes.
                styleEl.setAttribute('ng-style-reused', '');
            }
            return styleEl;
        }
        else {
            const styleEl = this.doc.createElement('style');
            if (this.nonce) {
                // Uses a keyed write to avoid issues with property minification.
                styleEl['nonce'] = this.nonce;
            }
            styleEl.textContent = style;
            if (this.platformIsServer) {
                styleEl.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
            }
            return styleEl;
        }
    }
    addStyleToHost(host, style) {
        const styleEl = this.getStyleElement(host, style);
        host.appendChild(styleEl);
        const styleRef = this.styleRef;
        const styleElRef = styleRef.get(style)?.elements;
        if (styleElRef) {
            styleElRef.push(styleEl);
        }
        else {
            styleRef.set(style, { elements: [styleEl], usage: 1 });
        }
    }
    resetHostNodes() {
        const hostNodes = this.hostNodes;
        hostNodes.clear();
        // Re-add the head element back since this is the default host.
        hostNodes.add(this.doc.head);
    }
}
SharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
SharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: SharedStylesHost });
export { SharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
/**
 * Interm G3 workaround for usages of private `DomSharedStylesHost`.
 * TODO(alanagius): delete once all usages in G3 are removed.
 */
class DomSharedStylesHost extends SharedStylesHost {
}
DomSharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: DomSharedStylesHost, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DomSharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: DomSharedStylesHost });
export { DomSharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-84a2ad7", ngImport: i0, type: DomSharedStylesHost, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV0Ryw2RUFBNkU7QUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFFMUMsTUFDYSxnQkFBZ0I7SUFXM0IsWUFDdUMsR0FBYSxFQUNmLEtBQWEsRUFDUCxLQUFtQixFQUM1QixhQUFxQixFQUFFO1FBSGxCLFFBQUcsR0FBSCxHQUFHLENBQVU7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ1AsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBZHpELGlHQUFpRztRQUNoRixhQUFRLEdBQUcsSUFBSSxHQUFHLEVBSS9CLENBQUM7UUFDWSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQVMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFnQjtRQUN4QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFF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R0FBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFhSixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxTQUFTOzswQkFBRyxRQUFROzswQkFDM0IsTUFBTTsyQkFBQyxXQUFXOztBQTJKekI7OztHQUdHO0FBQ0gsTUFDYSxtQkFBb0IsU0FBUSxnQkFBZ0I7OzJIQUE1QyxtQkFBbUI7K0hBQW5CLG1CQUFtQjtTQUFuQixtQkFBbUI7c0dBQW5CLG1CQUFtQjtrQkFEL0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtU2VydmVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIENTUF9OT05DRSwgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBUaGUgc3R5bGUgZWxlbWVudHMgYXR0cmlidXRlIG5hbWUgdXNlZCB0byBzZXQgdmFsdWUgb2YgYEFQUF9JRGAgdG9rZW4uICovXG5jb25zdCBBUFBfSURfQVRUUklCVVRFX05BTUUgPSAnbmctYXBwLWlkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFN0eWxlc0hvc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBNYXBzIGFsbCByZWdpc3RlcmVkIGhvc3Qgbm9kZXMgdG8gYSBsaXN0IG9mIHN0eWxlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBob3N0IG5vZGUuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3R5bGVSZWYgPSBuZXcgTWFwIDwgc3RyaW5nIC8qKiBTdHlsZSBzdHJpbmcgKi8sIHtcbiAgICBlbGVtZW50czogSFRNTFN0eWxlRWxlbWVudFtdO1xuICAgIHVzYWdlOiBudW1iZXJcbiAgfVxuICA+ICgpO1xuICBwcml2YXRlIHJlYWRvbmx5IGhvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZU5vZGVzSW5ET006IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+fG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIEBJbmplY3QoQVBQX0lEKSBwcml2YXRlIHJlYWRvbmx5IGFwcElkOiBzdHJpbmcsXG4gICAgICBASW5qZWN0KENTUF9OT05DRSkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBub25jZT86IHN0cmluZ3xudWxsLFxuICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcmVhZG9ubHkgcGxhdGZvcm1JZDogb2JqZWN0ID0ge30pIHtcbiAgICB0aGlzLnN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuY29sbGVjdFNlcnZlclJlbmRlcmVkU3R5bGVzKCk7XG4gICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLnJlc2V0SG9zdE5vZGVzKCk7XG4gIH1cblxuICBhZGRTdHlsZXMoc3R5bGVzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCB1c2FnZUNvdW50ID0gdGhpcy5jaGFuZ2VVc2FnZUNvdW50KHN0eWxlLCAxKTtcblxuICAgICAgaWYgKHVzYWdlQ291bnQgPT09IDEpIHtcbiAgICAgICAgdGhpcy5vblN0eWxlQWRkZWQoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIC0xKTtcblxuICAgICAgaWYgKHVzYWdlQ291bnQgPD0gMCkge1xuICAgICAgICB0aGlzLm9uU3R5bGVSZW1vdmVkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZU5vZGVzSW5ET00gPSB0aGlzLnN0eWxlTm9kZXNJbkRPTTtcbiAgICBpZiAoc3R5bGVOb2Rlc0luRE9NKSB7XG4gICAgICBzdHlsZU5vZGVzSW5ET00uZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICBzdHlsZU5vZGVzSW5ET00uY2xlYXIoKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMub25TdHlsZVJlbW92ZWQoc3R5bGUpO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRIb3N0Tm9kZXMoKTtcbiAgfVxuXG4gIGFkZEhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLmhvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiB0aGlzLmdldEFsbFN0eWxlcygpKSB7XG4gICAgICB0aGlzLmFkZFN0eWxlVG9Ib3N0KGhvc3ROb2RlLCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmRlbGV0ZShob3N0Tm9kZSk7XG4gIH1cblxuICBwcml2YXRlIGdldEFsbFN0eWxlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnN0eWxlUmVmLmtleXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TdHlsZUFkZGVkKHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGhvc3Qgb2YgdGhpcy5ob3N0Tm9kZXMpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdCwgc3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25TdHlsZVJlbW92ZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlUmVmID0gdGhpcy5zdHlsZVJlZjtcbiAgICBzdHlsZVJlZi5nZXQoc3R5bGUpPy5lbGVtZW50cz8uZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgc3R5bGVSZWYuZGVsZXRlKHN0eWxlKTtcbiAgfVxuXG4gIHByaXZhdGUgY29sbGVjdFNlcnZlclJlbmRlcmVkU3R5bGVzKCk6IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+fG51bGwge1xuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuZG9jLmhlYWQ/LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFN0eWxlRWxlbWVudD4oXG4gICAgICAgIGBzdHlsZVske0FQUF9JRF9BVFRSSUJVVEVfTkFNRX09XCIke3RoaXMuYXBwSWR9XCJdYCk7XG5cbiAgICBpZiAoc3R5bGVzPy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHN0eWxlTWFwID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+KCk7XG5cbiAgICAgIHN0eWxlcy5mb3JFYWNoKChzdHlsZSkgPT4ge1xuICAgICAgICBpZiAoc3R5bGUudGV4dENvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgICAgIHN0eWxlTWFwLnNldChzdHlsZS50ZXh0Q29udGVudCwgc3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHN0eWxlTWFwO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VVc2FnZUNvdW50KHN0eWxlOiBzdHJpbmcsIGRlbHRhOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMuc3R5bGVSZWY7XG4gICAgaWYgKG1hcC5oYXMoc3R5bGUpKSB7XG4gICAgICBjb25zdCBzdHlsZVJlZlZhbHVlID0gbWFwLmdldChzdHlsZSkhO1xuICAgICAgc3R5bGVSZWZWYWx1ZS51c2FnZSArPSBkZWx0YTtcblxuICAgICAgcmV0dXJuIHN0eWxlUmVmVmFsdWUudXNhZ2U7XG4gICAgfVxuXG4gICAgbWFwLnNldChzdHlsZSwge3VzYWdlOiBkZWx0YSwgZWxlbWVudHM6IFtdfSk7XG4gICAgcmV0dXJuIGRlbHRhO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdHlsZUVsZW1lbnQoaG9zdDogTm9kZSwgc3R5bGU6IHN0cmluZyk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIGNvbnN0IHN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuc3R5bGVOb2Rlc0luRE9NO1xuICAgIGNvbnN0IHN0eWxlRWwgPSBzdHlsZU5vZGVzSW5ET00/LmdldChzdHlsZSk7XG4gICAgaWYgKHN0eWxlRWw/LnBhcmVudE5vZGUgPT09IGhvc3QpIHtcbiAgICAgIC8vIGBzdHlsZU5vZGVzSW5ET01gIGNhbm5vdCBiZSB1bmRlZmluZWQgZHVlIHRvIHRoZSBhYm92ZSBgc3R5bGVOb2Rlc0luRE9NPy5nZXRgLlxuICAgICAgc3R5bGVOb2Rlc0luRE9NIS5kZWxldGUoc3R5bGUpO1xuXG4gICAgICBzdHlsZUVsLnJlbW92ZUF0dHJpYnV0ZShBUFBfSURfQVRUUklCVVRFX05BTUUpO1xuXG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIC8vIFRoaXMgYXR0cmlidXRlIGlzIHNvbGVseSB1c2VkIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuXG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCduZy1zdHlsZS1yZXVzZWQnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZUVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgaWYgKHRoaXMubm9uY2UpIHtcbiAgICAgICAgLy8gVXNlcyBhIGtleWVkIHdyaXRlIHRvIGF2b2lkIGlzc3VlcyB3aXRoIHByb3BlcnR5IG1pbmlmaWNhdGlvbi5cbiAgICAgICAgc3R5bGVFbFsnbm9uY2UnXSA9IHRoaXMubm9uY2U7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZTtcblxuICAgICAgaWYgKHRoaXMucGxhdGZvcm1Jc1NlcnZlcikge1xuICAgICAgICBzdHlsZUVsLnNldEF0dHJpYnV0ZShBUFBfSURfQVRUUklCVVRFX05BTUUsIHRoaXMuYXBwSWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3R5bGVFbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFN0eWxlVG9Ib3N0KGhvc3Q6IE5vZGUsIHN0eWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUVsID0gdGhpcy5nZXRTdHlsZUVsZW1lbnQoaG9zdCwgc3R5bGUpO1xuXG4gICAgaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcblxuICAgIGNvbnN0IHN0eWxlUmVmID0gdGhpcy5zdHlsZVJlZjtcbiAgICBjb25zdCBzdHlsZUVsUmVmID0gc3R5bGVSZWYuZ2V0KHN0eWxlKT8uZWxlbWVudHM7XG4gICAgaWYgKHN0eWxlRWxSZWYpIHtcbiAgICAgIHN0eWxlRWxSZWYucHVzaChzdHlsZUVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVSZWYuc2V0KHN0eWxlLCB7ZWxlbWVudHM6IFtzdHlsZUVsXSwgdXNhZ2U6IDF9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SG9zdE5vZGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IGhvc3ROb2RlcyA9IHRoaXMuaG9zdE5vZGVzO1xuICAgIGhvc3ROb2Rlcy5jbGVhcigpO1xuICAgIC8vIFJlLWFkZCB0aGUgaGVhZCBlbGVtZW50IGJhY2sgc2luY2UgdGhpcyBpcyB0aGUgZGVmYXVsdCBob3N0LlxuICAgIGhvc3ROb2Rlcy5hZGQodGhpcy5kb2MuaGVhZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbnRlcm0gRzMgd29ya2Fyb3VuZCBmb3IgdXNhZ2VzIG9mIHByaXZhdGUgYERvbVNoYXJlZFN0eWxlc0hvc3RgLlxuICogVE9ETyhhbGFuYWdpdXMpOiBkZWxldGUgb25jZSBhbGwgdXNhZ2VzIGluIEczIGFyZSByZW1vdmVkLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tU2hhcmVkU3R5bGVzSG9zdCBleHRlbmRzIFNoYXJlZFN0eWxlc0hvc3Qge1xufVxuIl19