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
        for (const { elements } of this.styleRef.values()) {
            elements.delete(hostNode);
        }
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
        map.set(style, { usage, elements: new Map() });
        return usage;
    }
    getStyleElement(host, style, existingStyleElements) {
        const existingStyleElement = existingStyleElements?.get(host);
        if (existingStyleElement) {
            return existingStyleElement;
        }
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
        const styleRef = this.styleRef;
        const styleResult = styleRef.get(style); // This will always be defined in `changeUsageCount`
        const styleEl = this.getStyleElement(host, style, styleResult.elements);
        host.appendChild(styleEl);
        if (styleResult.usage === 0) {
            disableStylesheet(styleEl);
        }
        else {
            enableStylesheet(styleEl);
        }
        styleResult.elements.set(host, styleEl);
    }
    resetHostNodes() {
        const hostNodes = this.hostNodes;
        hostNodes.clear();
        // Re-add the head element back since this is the default host.
        hostNodes.add(this.doc.head);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-5464bea", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-5464bea", ngImport: i0, type: SharedStylesHost }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-5464bea", ngImport: i0, type: SharedStylesHost, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV0Ryw2RUFBNkU7QUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFHMUMsTUFBTSxPQUFPLGdCQUFnQjtJQVczQixZQUN1QyxHQUFhLEVBQ2YsS0FBYSxFQUNQLEtBQW1CLEVBQzVCLGFBQXFCLEVBQUU7UUFIbEIsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDUCxVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQWE7UUFkekQsaUdBQWlHO1FBQ2hGLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFJL0IsQ0FBQztRQUNZLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBVTNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWdCO1FBQ3hCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFL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QUM7U0FDNUI7YUFBTTtZQUNMLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCO1FBRUQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxjQUFjO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLCtEQUErRDtRQUMvRCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzt5SEFsTFUsZ0JBQWdCLGtCQVlmLFFBQVEsYUFDUixNQUFNLGFBQ04sU0FBUyw2QkFDVCxXQUFXOzZIQWZaLGdCQUFnQjs7c0dBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBYUosTUFBTTsyQkFBQyxRQUFROzswQkFDZixNQUFNOzJCQUFDLE1BQU07OzBCQUNiLE1BQU07MkJBQUMsU0FBUzs7MEJBQUcsUUFBUTs7MEJBQzNCLE1BQU07MkJBQUMsV0FBVzs7QUFzS3pCOzs7O0dBSUc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLElBQXNCO0lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGdCQUFnQixDQUFDLElBQXNCO0lBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsaUJBQWlCLENBQUMsS0FBYTtJQUN0QyxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgaXNQbGF0Zm9ybVNlcnZlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBDU1BfTk9OQ0UsIEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKiogVGhlIHN0eWxlIGVsZW1lbnRzIGF0dHJpYnV0ZSBuYW1lIHVzZWQgdG8gc2V0IHZhbHVlIG9mIGBBUFBfSURgIHRva2VuLiAqL1xuY29uc3QgQVBQX0lEX0FUVFJJQlVURV9OQU1FID0gJ25nLWFwcC1pZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLy8gTWFwcyBhbGwgcmVnaXN0ZXJlZCBob3N0IG5vZGVzIHRvIGEgbGlzdCBvZiBzdHlsZSBub2RlcyB0aGF0IGhhdmUgYmVlbiBhZGRlZCB0byB0aGUgaG9zdCBub2RlLlxuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlUmVmID0gbmV3IE1hcCA8IHN0cmluZyAvKiogU3R5bGUgc3RyaW5nICovLCB7XG4gICAgZWxlbWVudHM6IE1hcDwvKiogSG9zdCAqLyBOb2RlLCAvKiogU3R5bGUgTm9kZSAqLyBIVE1MU3R5bGVFbGVtZW50PjtcbiAgICB1c2FnZTogbnVtYmVyO1xuICB9XG4gID4gKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlTm9kZXNJbkRPTTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LFxuICAgICAgQEluamVjdChBUFBfSUQpIHByaXZhdGUgcmVhZG9ubHkgYXBwSWQ6IHN0cmluZyxcbiAgICAgIEBJbmplY3QoQ1NQX05PTkNFKSBAT3B0aW9uYWwoKSBwcml2YXRlIG5vbmNlPzogc3RyaW5nfG51bGwsXG4gICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSByZWFkb25seSBwbGF0Zm9ybUlkOiBvYmplY3QgPSB7fSxcbiAgKSB7XG4gICAgdGhpcy5zdHlsZU5vZGVzSW5ET00gPSB0aGlzLmNvbGxlY3RTZXJ2ZXJSZW5kZXJlZFN0eWxlcygpO1xuICAgIHRoaXMucGxhdGZvcm1Jc1NlcnZlciA9IGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCk7XG4gICAgdGhpcy5yZXNldEhvc3ROb2RlcygpO1xuICB9XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3QgdXNhZ2VDb3VudCA9IHRoaXMuY2hhbmdlVXNhZ2VDb3VudChzdHlsZSwgMSk7XG5cbiAgICAgIGlmICh1c2FnZUNvdW50ID09PSAxKSB7XG4gICAgICAgIHRoaXMub25TdHlsZUFkZGVkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3QgdXNhZ2VDb3VudCA9IHRoaXMuY2hhbmdlVXNhZ2VDb3VudChzdHlsZSwgLTEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA9PT0gMCkge1xuICAgICAgICB0aGlzLnZpc2l0U3R5bGVFbGVtZW50KHN0eWxlLCBkaXNhYmxlU3R5bGVzaGVldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmlzaXRTdHlsZUVsZW1lbnQoc3R5bGU6IHN0cmluZywgY2FsbGJhY2s6IChub2RlOiBIVE1MU3R5bGVFbGVtZW50KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5zdHlsZVJlZi5nZXQoc3R5bGUpPy5lbGVtZW50cz8uZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZU5vZGVzSW5ET00gPSB0aGlzLnN0eWxlTm9kZXNJbkRPTTtcbiAgICBpZiAoc3R5bGVOb2Rlc0luRE9NKSB7XG4gICAgICBzdHlsZU5vZGVzSW5ET00uZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICBzdHlsZU5vZGVzSW5ET00uY2xlYXIoKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMudmlzaXRTdHlsZUVsZW1lbnQoc3R5bGUsIChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIHRoaXMuc3R5bGVSZWYuZGVsZXRlKHN0eWxlKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0SG9zdE5vZGVzKCk7XG4gIH1cblxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Tm9kZXMuYWRkKGhvc3ROb2RlKTtcblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGhpcy5nZXRBbGxTdHlsZXMoKSkge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0Tm9kZSwgc3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLmhvc3ROb2Rlcy5kZWxldGUoaG9zdE5vZGUpO1xuICAgIGZvciAoY29uc3Qge2VsZW1lbnRzfSBvZiB0aGlzLnN0eWxlUmVmLnZhbHVlcygpKSB7XG4gICAgICBlbGVtZW50cy5kZWxldGUoaG9zdE5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVSZWYua2V5cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaG9zdCBvZiB0aGlzLmhvc3ROb2Rlcykge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0LCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbCB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kb2MuaGVhZD8ucXVlcnlTZWxlY3RvckFsbDxIVE1MU3R5bGVFbGVtZW50PihcbiAgICAgICAgYHN0eWxlWyR7QVBQX0lEX0FUVFJJQlVURV9OQU1FfT1cIiR7dGhpcy5hcHBJZH1cIl1gKTtcblxuICAgIGlmIChzdHlsZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4oKTtcblxuICAgICAgc3R5bGVzLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICAgIGlmIChzdHlsZS50ZXh0Q29udGVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3R5bGVNYXAuc2V0KHN0eWxlLnRleHRDb250ZW50LCBzdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVVzYWdlQ291bnQoc3R5bGU6IHN0cmluZywgZGVsdGE6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5zdHlsZVJlZjtcbiAgICBpZiAobWFwLmhhcyhzdHlsZSkpIHtcbiAgICAgIGNvbnN0IHN0eWxlUmVmVmFsdWUgPSBtYXAuZ2V0KHN0eWxlKSE7XG4gICAgICBzdHlsZVJlZlZhbHVlLnVzYWdlID0gbm9uTmVnYXRpdmVOdW1iZXIoc3R5bGVSZWZWYWx1ZS51c2FnZSArIGRlbHRhKTtcblxuICAgICAgcmV0dXJuIHN0eWxlUmVmVmFsdWUudXNhZ2U7XG4gICAgfVxuXG4gICAgY29uc3QgdXNhZ2UgPSBub25OZWdhdGl2ZU51bWJlcihkZWx0YSk7XG4gICAgbWFwLnNldChzdHlsZSwge3VzYWdlLCBlbGVtZW50czogbmV3IE1hcCgpfSk7XG4gICAgcmV0dXJuIHVzYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdHlsZUVsZW1lbnQoXG4gICAgICBob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nLFxuICAgICAgZXhpc3RpbmdTdHlsZUVsZW1lbnRzOiBNYXA8Tm9kZSwgSFRNTFN0eWxlRWxlbWVudD58dW5kZWZpbmVkKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gICAgY29uc3QgZXhpc3RpbmdTdHlsZUVsZW1lbnQgPSBleGlzdGluZ1N0eWxlRWxlbWVudHM/LmdldChob3N0KTtcbiAgICBpZiAoZXhpc3RpbmdTdHlsZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBleGlzdGluZ1N0eWxlRWxlbWVudDtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5zdHlsZU5vZGVzSW5ET007XG4gICAgY29uc3Qgc3R5bGVFbCA9IHN0eWxlTm9kZXNJbkRPTT8uZ2V0KHN0eWxlKTtcbiAgICBpZiAoc3R5bGVFbD8ucGFyZW50Tm9kZSA9PT0gaG9zdCkge1xuICAgICAgLy8gYHN0eWxlTm9kZXNJbkRPTWAgY2Fubm90IGJlIHVuZGVmaW5lZCBkdWUgdG8gdGhlIGFib3ZlIGBzdHlsZU5vZGVzSW5ET00/LmdldGAuXG4gICAgICBzdHlsZU5vZGVzSW5ET00hLmRlbGV0ZShzdHlsZSk7XG5cbiAgICAgIHN0eWxlRWwucmVtb3ZlQXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgc29sZWx5IHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25nLXN0eWxlLXJldXNlZCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAodGhpcy5ub25jZSkge1xuICAgICAgICBzdHlsZUVsLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCB0aGlzLm5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuXG4gICAgICBpZiAodGhpcy5wbGF0Zm9ybUlzU2VydmVyKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKEFQUF9JRF9BVFRSSUJVVEVfTkFNRSwgdGhpcy5hcHBJZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHlsZUVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkU3R5bGVUb0hvc3QoaG9zdDogTm9kZSwgc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlUmVmID0gdGhpcy5zdHlsZVJlZjtcbiAgICBjb25zdCBzdHlsZVJlc3VsdCA9IHN0eWxlUmVmLmdldChzdHlsZSkhOyAgLy8gVGhpcyB3aWxsIGFsd2F5cyBiZSBkZWZpbmVkIGluIGBjaGFuZ2VVc2FnZUNvdW50YFxuICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmdldFN0eWxlRWxlbWVudChob3N0LCBzdHlsZSwgc3R5bGVSZXN1bHQuZWxlbWVudHMpO1xuXG4gICAgaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcblxuICAgIGlmIChzdHlsZVJlc3VsdC51c2FnZSA9PT0gMCkge1xuICAgICAgZGlzYWJsZVN0eWxlc2hlZXQoc3R5bGVFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuYWJsZVN0eWxlc2hlZXQoc3R5bGVFbCk7XG4gICAgfVxuXG4gICAgc3R5bGVSZXN1bHQuZWxlbWVudHMuc2V0KGhvc3QsIHN0eWxlRWwpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhvc3ROb2RlcygpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0Tm9kZXMgPSB0aGlzLmhvc3ROb2RlcztcbiAgICBob3N0Tm9kZXMuY2xlYXIoKTtcbiAgICAvLyBSZS1hZGQgdGhlIGhlYWQgZWxlbWVudCBiYWNrIHNpbmNlIHRoaXMgaXMgdGhlIGRlZmF1bHQgaG9zdC5cbiAgICBob3N0Tm9kZXMuYWRkKHRoaXMuZG9jLmhlYWQpO1xuICB9XG59XG5cbi8qKlxuICogV2hlbiBhIGNvbXBvbmVudCB0aGF0IGhhcyBzdHlsZXMgaXMgZGVzdHJveWVkLCB3ZSBkaXNhYmxlIHN0eWxlc2hlZXRzXG4gKiBpbnN0ZWFkIG9mIHJlbW92aW5nIHRoZW0gdG8gYXZvaWQgcGVyZm9ybWFuY2UgaXNzdWVzIHJlbGF0ZWQgdG8gc3R5bGVcbiAqIHJlY2FsY3VsYXRpb24gaW4gYSBicm93c2VyLlxuICovXG5mdW5jdGlvbiBkaXNhYmxlU3R5bGVzaGVldChub2RlOiBIVE1MU3R5bGVFbGVtZW50KTogdm9pZCB7XG4gIG5vZGUuZGlzYWJsZWQgPSB0cnVlO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBzdHlsZXNoZWV0IGluIGEgYnJvd3Nlciwgc2VlIHRoZSBgZGlzYWJsZVN0eWxlc2hlZXRgIGZ1bmN0aW9uXG4gKiBkb2NzIGZvciBhZGRpdGlvbmFsIGluZm8uXG4gKi9cbmZ1bmN0aW9uIGVuYWJsZVN0eWxlc2hlZXQobm9kZTogSFRNTFN0eWxlRWxlbWVudCk6IHZvaWQge1xuICBub2RlLmRpc2FibGVkID0gZmFsc2U7XG59XG5cbi8qKlxuICogV2hlbiB0aGUgdmFsdWUgaXMgYSBuZWdhdGl2ZSBhIHZhbHVlIG9mIGAwYCBpcyByZXR1cm5lZC5cbiAqL1xuZnVuY3Rpb24gbm9uTmVnYXRpdmVOdW1iZXIodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiB2YWx1ZSA8IDAgPyAwIDogdmFsdWU7XG59XG4iXX0=