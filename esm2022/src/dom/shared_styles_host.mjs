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
export class SharedStylesHost {
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
    disableStyles(styles) {
        for (const style of styles) {
            const usageCount = this.changeUsageCount(style, -1);
            if (usageCount === 0) {
                this.visitStyleElement(style, disableStylesheet);
            }
        }
    }
    visitStyleElement(style, callback) {
        this.styleRef.get(style)?.elements?.forEach(callback);
    }
    ngOnDestroy() {
        const styleNodesInDOM = this.styleNodesInDOM;
        if (styleNodesInDOM) {
            styleNodesInDOM.forEach((node) => node.remove());
            styleNodesInDOM.clear();
        }
        for (const style of this.getAllStyles()) {
            this.visitStyleElement(style, (node) => node.remove());
            this.styleRef.delete(style);
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
            styleRefValue.usage = nonNegativeNumber(styleRefValue.usage + delta);
            return styleRefValue.usage;
        }
        const usage = nonNegativeNumber(delta);
        map.set(style, { usage, elements: [] });
        return usage;
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
                styleEl.setAttribute('nonce', this.nonce);
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
        const styleResult = styleRef.get(style);
        if (styleResult) {
            if (styleResult.usage === 0) {
                disableStylesheet(styleEl);
            }
            else {
                enableStylesheet(styleEl);
            }
            styleResult.elements.push(styleEl);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-a3b0891", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-a3b0891", ngImport: i0, type: SharedStylesHost }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-a3b0891", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: Document, decorators: [{
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
                }] }] });
/**
 * When a component that has styles is destroyed, we disable stylesheets
 * instead of removing them to avoid performance issues related to style
 * recalculation in a browser.
 */
function disableStylesheet(node) {
    node.disabled = true;
}
/**
 * Enables a stylesheet in a browser, see the `disableStylesheet` function
 * docs for additional info.
 */
function enableStylesheet(node) {
    node.disabled = false;
}
/**
 * When the value is a negative a value of `0` is returned.
 */
function nonNegativeNumber(value) {
    return value < 0 ? 0 : value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV0Ryw2RUFBNkU7QUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFHMUMsTUFBTSxPQUFPLGdCQUFnQjtJQVczQixZQUN1QyxHQUFhLEVBQ2YsS0FBYSxFQUNQLEtBQW1CLEVBQzVCLGFBQXFCLEVBQUU7UUFIbEIsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDUCxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQWE7UUFkekQsaUdBQWlHO1FBQ2hGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFJL0IsQ0FBQztRQUNZLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBVTNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWdCO1FBQ3hCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFL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QUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQiwrREFBK0Q7UUFDL0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7eUhBN0tVLGdCQUFnQixrQkFZZixRQUFRLGFBQ1IsTUFBTSxhQUNOLFNBQVMsNkJBQ1QsV0FBVzs2SEFmWixnQkFBZ0I7O3NHQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVU7OzBCQWFKLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxNQUFNOzswQkFDYixNQUFNOzJCQUFDLFNBQVM7OzBCQUFHLFFBQVE7OzBCQUMzQixNQUFNOzJCQUFDLFdBQVc7O0FBaUt6Qjs7OztHQUlHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxJQUFzQjtJQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUN2QixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFzQjtJQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN4QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEtBQWE7SUFDdEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQ1NQX05PTkNFLCBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqIFRoZSBzdHlsZSBlbGVtZW50cyBhdHRyaWJ1dGUgbmFtZSB1c2VkIHRvIHNldCB2YWx1ZSBvZiBgQVBQX0lEYCB0b2tlbi4gKi9cbmNvbnN0IEFQUF9JRF9BVFRSSUJVVEVfTkFNRSA9ICduZy1hcHAtaWQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIE1hcHMgYWxsIHJlZ2lzdGVyZWQgaG9zdCBub2RlcyB0byBhIGxpc3Qgb2Ygc3R5bGUgbm9kZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGhvc3Qgbm9kZS5cbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZVJlZiA9IG5ldyBNYXAgPCBzdHJpbmcgLyoqIFN0eWxlIHN0cmluZyAqLywge1xuICAgIGVsZW1lbnRzOiBIVE1MU3R5bGVFbGVtZW50W107XG4gICAgdXNhZ2U6IG51bWJlcjtcbiAgfVxuICA+ICgpO1xuICBwcml2YXRlIHJlYWRvbmx5IGhvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZU5vZGVzSW5ET006IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+fG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIEBJbmplY3QoQVBQX0lEKSBwcml2YXRlIHJlYWRvbmx5IGFwcElkOiBzdHJpbmcsXG4gICAgICBASW5qZWN0KENTUF9OT05DRSkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBub25jZT86IHN0cmluZ3xudWxsLFxuICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcmVhZG9ubHkgcGxhdGZvcm1JZDogb2JqZWN0ID0ge30sXG4gICkge1xuICAgIHRoaXMuc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5jb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTtcbiAgICB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgPSBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMucmVzZXRIb3N0Tm9kZXMoKTtcbiAgfVxuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIDEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA9PT0gMSkge1xuICAgICAgICB0aGlzLm9uU3R5bGVBZGRlZChzdHlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIC0xKTtcblxuICAgICAgaWYgKHVzYWdlQ291bnQgPT09IDApIHtcbiAgICAgICAgdGhpcy52aXNpdFN0eWxlRWxlbWVudChzdHlsZSwgZGlzYWJsZVN0eWxlc2hlZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZpc2l0U3R5bGVFbGVtZW50KHN0eWxlOiBzdHJpbmcsIGNhbGxiYWNrOiAobm9kZTogSFRNTFN0eWxlRWxlbWVudCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuc3R5bGVSZWYuZ2V0KHN0eWxlKT8uZWxlbWVudHM/LmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5zdHlsZU5vZGVzSW5ET007XG4gICAgaWYgKHN0eWxlTm9kZXNJbkRPTSkge1xuICAgICAgc3R5bGVOb2Rlc0luRE9NLmZvckVhY2goKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgc3R5bGVOb2Rlc0luRE9NLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiB0aGlzLmdldEFsbFN0eWxlcygpKSB7XG4gICAgICB0aGlzLnZpc2l0U3R5bGVFbGVtZW50KHN0eWxlLCAobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICB0aGlzLnN0eWxlUmVmLmRlbGV0ZShzdHlsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldEhvc3ROb2RlcygpO1xuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdE5vZGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVSZWYua2V5cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaG9zdCBvZiB0aGlzLmhvc3ROb2Rlcykge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0LCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbCB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kb2MuaGVhZD8ucXVlcnlTZWxlY3RvckFsbDxIVE1MU3R5bGVFbGVtZW50PihcbiAgICAgICAgYHN0eWxlWyR7QVBQX0lEX0FUVFJJQlVURV9OQU1FfT1cIiR7dGhpcy5hcHBJZH1cIl1gKTtcblxuICAgIGlmIChzdHlsZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4oKTtcblxuICAgICAgc3R5bGVzLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICAgIGlmIChzdHlsZS50ZXh0Q29udGVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3R5bGVNYXAuc2V0KHN0eWxlLnRleHRDb250ZW50LCBzdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVVzYWdlQ291bnQoc3R5bGU6IHN0cmluZywgZGVsdGE6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5zdHlsZVJlZjtcbiAgICBpZiAobWFwLmhhcyhzdHlsZSkpIHtcbiAgICAgIGNvbnN0IHN0eWxlUmVmVmFsdWUgPSBtYXAuZ2V0KHN0eWxlKSE7XG4gICAgICBzdHlsZVJlZlZhbHVlLnVzYWdlID0gbm9uTmVnYXRpdmVOdW1iZXIoc3R5bGVSZWZWYWx1ZS51c2FnZSArIGRlbHRhKTtcblxuICAgICAgcmV0dXJuIHN0eWxlUmVmVmFsdWUudXNhZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgdXNhZ2UgPSBub25OZWdhdGl2ZU51bWJlcihkZWx0YSk7XG4gICAgbWFwLnNldChzdHlsZSwge3VzYWdlLCBlbGVtZW50czogW119KTtcbiAgICByZXR1cm4gdXNhZ2U7XG4gIH1cblxuICBwcml2YXRlIGdldFN0eWxlRWxlbWVudChob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gICAgY29uc3Qgc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5zdHlsZU5vZGVzSW5ET007XG4gICAgY29uc3Qgc3R5bGVFbCA9IHN0eWxlTm9kZXNJbkRPTT8uZ2V0KHN0eWxlKTtcbiAgICBpZiAoc3R5bGVFbD8ucGFyZW50Tm9kZSA9PT0gaG9zdCkge1xuICAgICAgLy8gYHN0eWxlTm9kZXNJbkRPTWAgY2Fubm90IGJlIHVuZGVmaW5lZCBkdWUgdG8gdGhlIGFib3ZlIGBzdHlsZU5vZGVzSW5ET00/LmdldGAuXG4gICAgICBzdHlsZU5vZGVzSW5ET00hLmRlbGV0ZShzdHlsZSk7XG5cbiAgICAgIHN0eWxlRWwucmVtb3ZlQXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgc29sZWx5IHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25nLXN0eWxlLXJldXNlZCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAodGhpcy5ub25jZSkge1xuICAgICAgICBzdHlsZUVsLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCB0aGlzLm5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuXG4gICAgICBpZiAodGhpcy5wbGF0Zm9ybUlzU2VydmVyKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSwgdGhpcy5hcHBJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZUVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU3R5bGVUb0hvc3QoaG9zdDogTm9kZSwgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmdldFN0eWxlRWxlbWVudChob3N0LCBzdHlsZSk7XG5cbiAgICBob3N0LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuXG4gICAgY29uc3Qgc3R5bGVSZWYgPSB0aGlzLnN0eWxlUmVmO1xuICAgIGNvbnN0IHN0eWxlUmVzdWx0ID0gc3R5bGVSZWYuZ2V0KHN0eWxlKTtcbiAgICBpZiAoc3R5bGVSZXN1bHQpIHtcbiAgICAgIGlmIChzdHlsZVJlc3VsdC51c2FnZSA9PT0gMCkge1xuICAgICAgICBkaXNhYmxlU3R5bGVzaGVldChzdHlsZUVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuYWJsZVN0eWxlc2hlZXQoc3R5bGVFbCk7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlUmVzdWx0LmVsZW1lbnRzLnB1c2goc3R5bGVFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlUmVmLnNldChzdHlsZSwge2VsZW1lbnRzOiBbc3R5bGVFbF0sIHVzYWdlOiAxfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhvc3ROb2RlcygpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0Tm9kZXMgPSB0aGlzLmhvc3ROb2RlcztcbiAgICBob3N0Tm9kZXMuY2xlYXIoKTtcbiAgICAvLyBSZS1hZGQgdGhlIGhlYWQgZWxlbWVudCBiYWNrIHNpbmNlIHRoaXMgaXMgdGhlIGRlZmF1bHQgaG9zdC5cbiAgICBob3N0Tm9kZXMuYWRkKHRoaXMuZG9jLmhlYWQpO1xuICB9XG59XG5cbi8qKlxuICogV2hlbiBhIGNvbXBvbmVudCB0aGF0IGhhcyBzdHlsZXMgaXMgZGVzdHJveWVkLCB3ZSBkaXNhYmxlIHN0eWxlc2hlZXRzXG4gKiBpbnN0ZWFkIG9mIHJlbW92aW5nIHRoZW0gdG8gYXZvaWQgcGVyZm9ybWFuY2UgaXNzdWVzIHJlbGF0ZWQgdG8gc3R5bGVcbiAqIHJlY2FsY3VsYXRpb24gaW4gYSBicm93c2VyLlxuICovXG5mdW5jdGlvbiBkaXNhYmxlU3R5bGVzaGVldChub2RlOiBIVE1MU3R5bGVFbGVtZW50KTogdm9pZCB7XG4gIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBzdHlsZXNoZWV0IGluIGEgYnJvd3Nlciwgc2VlIHRoZSBgZGlzYWJsZVN0eWxlc2hlZXRgIGZ1bmN0aW9uXG4gKiBkb2NzIGZvciBhZGRpdGlvbmFsIGluZm8uXG4gKi9cbmZ1bmN0aW9uIGVuYWJsZVN0eWxlc2hlZXQobm9kZTogSFRNTFN0eWxlRWxlbWVudCk6IHZvaWQge1xuICBub2RlLmRpc2FibGVkID0gZmFsc2U7XG59XG5cbi8qKlxuICogV2hlbiB0aGUgdmFsdWUgaXMgYSBuZWdhdGl2ZSBhIHZhbHVlIG9mIGAwYCBpcyByZXR1cm5lZC5cbiAqL1xuZnVuY3Rpb24gbm9uTmVnYXRpdmVOdW1iZXIodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiB2YWx1ZSA8IDAgPyAwIDogdmFsdWU7XG59XG4iXX0=