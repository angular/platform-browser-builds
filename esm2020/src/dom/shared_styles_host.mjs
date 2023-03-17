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
/** The style elements attribute name used to set value of `APP_ID` token. */
const APP_ID_ATTRIBUTE_NAME = 'ng-app-id';
class SharedStylesHost {
    constructor(doc, appId) {
        this.doc = doc;
        this.appId = appId;
        // Maps all registered host nodes to a list of style nodes that have been added to the host node.
        this.styleRef = new Map();
        this.hostNodes = new Set();
        this.styleNodesInDOM = this.collectServerRenderedStyles();
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
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // This attribute is solely used for debugging purposes.
                styleEl.setAttribute('ng-style-reused', '');
            }
            return styleEl;
        }
        else {
            const styleEl = this.doc.createElement('style');
            styleEl.textContent = style;
            styleEl.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
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
SharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }], target: i0.ɵɵFactoryTarget.Injectable });
SharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: SharedStylesHost });
export { SharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }]; } });
/**
 * Interm G3 workaround for usages of private `DomSharedStylesHost`.
 * TODO(alanagius): delete once all usages in G3 are removed.
 */
class DomSharedStylesHost extends SharedStylesHost {
}
DomSharedStylesHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: DomSharedStylesHost, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
DomSharedStylesHost.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: DomSharedStylesHost });
export { DomSharedStylesHost };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-13dd614", ngImport: i0, type: DomSharedStylesHost, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDOztBQUVwRSw2RUFBNkU7QUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxXQUFXLENBQUM7QUFFMUMsTUFDYSxnQkFBZ0I7SUFVM0IsWUFDdUMsR0FBYSxFQUNmLEtBQWE7UUFEWCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQ2YsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVhsRCxpR0FBaUc7UUFDaEYsYUFBUSxHQUFHLElBQUksR0FBRyxFQUkvQixDQUFDO1FBQ1ksY0FBUyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7UUFNM0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFnQjtRQUN4QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRW5ELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNGO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFnQjtRQUMzQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixNQUFN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TUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQztRQUNqRCxJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRU8sY0FBYztRQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQiwrREFBK0Q7UUFDL0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7O3dIQXhKVSxnQkFBZ0Isa0JBV2YsUUFBUSxhQUNSLE1BQU07NEhBWlAsZ0JBQWdCO1NBQWhCLGdCQUFnQjtzR0FBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVOzswQkFZSixNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsTUFBTTs7QUErSXBCOzs7R0FHRztBQUNILE1BQ2EsbUJBQW9CLFNBQVEsZ0JBQWdCOzsySEFBNUMsbUJBQW1COytIQUFuQixtQkFBbUI7U0FBbkIsbUJBQW1CO3NHQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBUaGUgc3R5bGUgZWxlbWVudHMgYXR0cmlidXRlIG5hbWUgdXNlZCB0byBzZXQgdmFsdWUgb2YgYEFQUF9JRGAgdG9rZW4uICovXG5jb25zdCBBUFBfSURfQVRUUklCVVRFX05BTUUgPSAnbmctYXBwLWlkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFN0eWxlc0hvc3QgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBNYXBzIGFsbCByZWdpc3RlcmVkIGhvc3Qgbm9kZXMgdG8gYSBsaXN0IG9mIHN0eWxlIG5vZGVzIHRoYXQgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBob3N0IG5vZGUuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3R5bGVSZWYgPSBuZXcgTWFwIDwgc3RyaW5nIC8qKiBTdHlsZSBzdHJpbmcgKi8sIHtcbiAgICBlbGVtZW50czogSFRNTFN0eWxlRWxlbWVudFtdO1xuICAgIHVzYWdlOiBudW1iZXJcbiAgfVxuICA+ICgpO1xuICBwcml2YXRlIHJlYWRvbmx5IGhvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZU5vZGVzSW5ET006IE1hcDxzdHJpbmcsIEhUTUxTdHlsZUVsZW1lbnQ+fG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIHJlYWRvbmx5IGRvYzogRG9jdW1lbnQsXG4gICAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSByZWFkb25seSBhcHBJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5zdHlsZU5vZGVzSW5ET00gPSB0aGlzLmNvbGxlY3RTZXJ2ZXJSZW5kZXJlZFN0eWxlcygpO1xuICAgIHRoaXMucmVzZXRIb3N0Tm9kZXMoKTtcbiAgfVxuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHVzYWdlQ291bnQgPSB0aGlzLmNoYW5nZVVzYWdlQ291bnQoc3R5bGUsIDEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA9PT0gMSkge1xuICAgICAgICB0aGlzLm9uU3R5bGVBZGRlZChzdHlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3QgdXNhZ2VDb3VudCA9IHRoaXMuY2hhbmdlVXNhZ2VDb3VudChzdHlsZSwgLTEpO1xuXG4gICAgICBpZiAodXNhZ2VDb3VudCA8PSAwKSB7XG4gICAgICAgIHRoaXMub25TdHlsZVJlbW92ZWQoc3R5bGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlTm9kZXNJbkRPTSA9IHRoaXMuc3R5bGVOb2Rlc0luRE9NO1xuICAgIGlmIChzdHlsZU5vZGVzSW5ET00pIHtcbiAgICAgIHN0eWxlTm9kZXNJbkRPTS5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIHN0eWxlTm9kZXNJbkRPTS5jbGVhcigpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgdGhpcy5nZXRBbGxTdHlsZXMoKSkge1xuICAgICAgdGhpcy5vblN0eWxlUmVtb3ZlZChzdHlsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldEhvc3ROb2RlcygpO1xuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuaG9zdE5vZGVzLmFkZChob3N0Tm9kZSk7XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHRoaXMuZ2V0QWxsU3R5bGVzKCkpIHtcbiAgICAgIHRoaXMuYWRkU3R5bGVUb0hvc3QoaG9zdE5vZGUsIHN0eWxlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWxsU3R5bGVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3R5bGVSZWYua2V5cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlQWRkZWQoc3R5bGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaG9zdCBvZiB0aGlzLmhvc3ROb2Rlcykge1xuICAgICAgdGhpcy5hZGRTdHlsZVRvSG9zdChob3N0LCBzdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblN0eWxlUmVtb3ZlZChzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVSZWYgPSB0aGlzLnN0eWxlUmVmO1xuICAgIHN0eWxlUmVmLmdldChzdHlsZSk/LmVsZW1lbnRzPy5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICBzdHlsZVJlZi5kZWxldGUoc3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb2xsZWN0U2VydmVyUmVuZGVyZWRTdHlsZXMoKTogTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD58bnVsbCB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5kb2MuaGVhZD8ucXVlcnlTZWxlY3RvckFsbDxIVE1MU3R5bGVFbGVtZW50PihcbiAgICAgICAgYHN0eWxlWyR7QVBQX0lEX0FUVFJJQlVURV9OQU1FfT1cIiR7dGhpcy5hcHBJZH1cIl1gKTtcblxuICAgIGlmIChzdHlsZXM/Lmxlbmd0aCkge1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBuZXcgTWFwPHN0cmluZywgSFRNTFN0eWxlRWxlbWVudD4oKTtcblxuICAgICAgc3R5bGVzLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICAgIGlmIChzdHlsZS50ZXh0Q29udGVudCAhPSBudWxsKSB7XG4gICAgICAgICAgc3R5bGVNYXAuc2V0KHN0eWxlLnRleHRDb250ZW50LCBzdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVVzYWdlQ291bnQoc3R5bGU6IHN0cmluZywgZGVsdGE6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5zdHlsZVJlZjtcbiAgICBpZiAobWFwLmhhcyhzdHlsZSkpIHtcbiAgICAgIGNvbnN0IHN0eWxlUmVmVmFsdWUgPSBtYXAuZ2V0KHN0eWxlKSE7XG4gICAgICBzdHlsZVJlZlZhbHVlLnVzYWdlICs9IGRlbHRhO1xuXG4gICAgICByZXR1cm4gc3R5bGVSZWZWYWx1ZS51c2FnZTtcbiAgICB9XG5cbiAgICBtYXAuc2V0KHN0eWxlLCB7dXNhZ2U6IGRlbHRhLCBlbGVtZW50czogW119KTtcbiAgICByZXR1cm4gZGVsdGE7XG4gIH1cblxuICBwcml2YXRlIGdldFN0eWxlRWxlbWVudChob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gICAgY29uc3Qgc3R5bGVOb2Rlc0luRE9NID0gdGhpcy5zdHlsZU5vZGVzSW5ET007XG4gICAgY29uc3Qgc3R5bGVFbCA9IHN0eWxlTm9kZXNJbkRPTT8uZ2V0KHN0eWxlKTtcbiAgICBpZiAoc3R5bGVFbD8ucGFyZW50Tm9kZSA9PT0gaG9zdCkge1xuICAgICAgLy8gYHN0eWxlTm9kZXNJbkRPTWAgY2Fubm90IGJlIHVuZGVmaW5lZCBkdWUgdG8gdGhlIGFib3ZlIGBzdHlsZU5vZGVzSW5ET00/LmdldGAuXG4gICAgICBzdHlsZU5vZGVzSW5ET00hLmRlbGV0ZShzdHlsZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRyaWJ1dGUgaXMgc29sZWx5IHVzZWQgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25nLXN0eWxlLXJldXNlZCcsICcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoQVBQX0lEX0FUVFJJQlVURV9OQU1FLCB0aGlzLmFwcElkKTtcblxuICAgICAgcmV0dXJuIHN0eWxlRWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRTdHlsZVRvSG9zdChob3N0OiBOb2RlLCBzdHlsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuZ2V0U3R5bGVFbGVtZW50KGhvc3QsIHN0eWxlKTtcblxuICAgIGhvc3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG5cbiAgICBjb25zdCBzdHlsZVJlZiA9IHRoaXMuc3R5bGVSZWY7XG4gICAgY29uc3Qgc3R5bGVFbFJlZiA9IHN0eWxlUmVmLmdldChzdHlsZSk/LmVsZW1lbnRzO1xuICAgIGlmIChzdHlsZUVsUmVmKSB7XG4gICAgICBzdHlsZUVsUmVmLnB1c2goc3R5bGVFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlUmVmLnNldChzdHlsZSwge2VsZW1lbnRzOiBbc3R5bGVFbF0sIHVzYWdlOiAxfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhvc3ROb2RlcygpOiB2b2lkIHtcbiAgICBjb25zdCBob3N0Tm9kZXMgPSB0aGlzLmhvc3ROb2RlcztcbiAgICBob3N0Tm9kZXMuY2xlYXIoKTtcbiAgICAvLyBSZS1hZGQgdGhlIGhlYWQgZWxlbWVudCBiYWNrIHNpbmNlIHRoaXMgaXMgdGhlIGRlZmF1bHQgaG9zdC5cbiAgICBob3N0Tm9kZXMuYWRkKHRoaXMuZG9jLmhlYWQpO1xuICB9XG59XG5cbi8qKlxuICogSW50ZXJtIEczIHdvcmthcm91bmQgZm9yIHVzYWdlcyBvZiBwcml2YXRlIGBEb21TaGFyZWRTdHlsZXNIb3N0YC5cbiAqIFRPRE8oYWxhbmFnaXVzKTogZGVsZXRlIG9uY2UgYWxsIHVzYWdlcyBpbiBHMyBhcmUgcmVtb3ZlZC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IHtcbn1cbiJdfQ==