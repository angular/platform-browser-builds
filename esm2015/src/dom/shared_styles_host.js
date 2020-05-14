/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/dom/shared_styles_host.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
let SharedStylesHost = /** @class */ (() => {
    class SharedStylesHost {
        constructor() {
            /**
             * \@internal
             */
            this._stylesSet = new Set();
        }
        /**
         * @param {?} styles
         * @return {?}
         */
        addStyles(styles) {
            /** @type {?} */
            const additions = new Set();
            styles.forEach((/**
             * @param {?} style
             * @return {?}
             */
            style => {
                if (!this._stylesSet.has(style)) {
                    this._stylesSet.add(style);
                    additions.add(style);
                }
            }));
            this.onStylesAdded(additions);
        }
        /**
         * @param {?} additions
         * @return {?}
         */
        onStylesAdded(additions) { }
        /**
         * @return {?}
         */
        getAllStyles() {
            return Array.from(this._stylesSet);
        }
    }
    SharedStylesHost.decorators = [
        { type: Injectable }
    ];
    return SharedStylesHost;
})();
export { SharedStylesHost };
if (false) {
    /**
     * \@internal
     * @type {?}
     * @protected
     */
    SharedStylesHost.prototype._stylesSet;
}
let DomSharedStylesHost = /** @class */ (() => {
    class DomSharedStylesHost extends SharedStylesHost {
        /**
         * @param {?} _doc
         */
        constructor(_doc) {
            super();
            this._doc = _doc;
            this._hostNodes = new Set();
            this._styleNodes = new Set();
            this._hostNodes.add(_doc.head);
        }
        /**
         * @private
         * @param {?} styles
         * @param {?} host
         * @return {?}
         */
        _addStylesToHost(styles, host) {
            styles.forEach((/**
             * @param {?} style
             * @return {?}
             */
            (style) => {
                /** @type {?} */
                const styleEl = this._doc.createElement('style');
                styleEl.textContent = style;
                this._styleNodes.add(host.appendChild(styleEl));
            }));
        }
        /**
         * @param {?} hostNode
         * @return {?}
         */
        addHost(hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        }
        /**
         * @param {?} hostNode
         * @return {?}
         */
        removeHost(hostNode) {
            this._hostNodes.delete(hostNode);
        }
        /**
         * @param {?} additions
         * @return {?}
         */
        onStylesAdded(additions) {
            this._hostNodes.forEach((/**
             * @param {?} hostNode
             * @return {?}
             */
            hostNode => this._addStylesToHost(additions, hostNode)));
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this._styleNodes.forEach((/**
             * @param {?} styleNode
             * @return {?}
             */
            styleNode => getDOM().remove(styleNode)));
        }
    }
    DomSharedStylesHost.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DomSharedStylesHost.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ];
    return DomSharedStylesHost;
})();
export { DomSharedStylesHost };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomSharedStylesHost.prototype._hostNodes;
    /**
     * @type {?}
     * @private
     */
    DomSharedStylesHost.prototype._styleNodes;
    /**
     * @type {?}
     * @private
     */
    DomSharedStylesHost.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUU1RDtJQUFBLE1BQ2EsZ0JBQWdCO1FBRDdCOzs7O1lBR1ksZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFrQjNDLENBQUM7Ozs7O1FBaEJDLFNBQVMsQ0FBQyxNQUFnQjs7a0JBQ2xCLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBVTtZQUNuQyxNQUFNLENBQUMsT0FBTzs7OztZQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjtZQUNILENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxDQUFDOzs7OztRQUVELGFBQWEsQ0FBQyxTQUFzQixJQUFTLENBQUM7Ozs7UUFFOUMsWUFBWTtZQUNWLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O2dCQXBCRixVQUFVOztJQXFCWCx1QkFBQztLQUFBO1NBcEJZLGdCQUFnQjs7Ozs7OztJQUUzQixzQ0FBeUM7O0FBb0IzQztJQUFBLE1BQ2EsbUJBQW9CLFNBQVEsZ0JBQWdCOzs7O1FBR3ZELFlBQXNDLElBQVM7WUFDN0MsS0FBSyxFQUFFLENBQUM7WUFENEIsU0FBSSxHQUFKLElBQUksQ0FBSztZQUZ2QyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztZQUM3QixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7WUFHcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7Ozs7Ozs7UUFFTyxnQkFBZ0IsQ0FBQyxNQUFtQixFQUFFLElBQVU7WUFDdEQsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLEtBQWEsRUFBRSxFQUFFOztzQkFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDaEQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUM7Ozs7O1FBRUQsT0FBTyxDQUFDLFFBQWM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7Ozs7UUFFRCxVQUFVLENBQUMsUUFBYztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDOzs7OztRQUVELGFBQWEsQ0FBQyxTQUFzQjtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7WUFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUMsQ0FBQztRQUNsRixDQUFDOzs7O1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTzs7OztZQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUM7UUFDcEUsQ0FBQzs7O2dCQWhDRixVQUFVOzs7O2dEQUlJLE1BQU0sU0FBQyxRQUFROztJQTZCOUIsMEJBQUM7S0FBQTtTQWhDWSxtQkFBbUI7Ozs7OztJQUM5Qix5Q0FBcUM7Ozs7O0lBQ3JDLDBDQUFzQzs7Ozs7SUFDMUIsbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBfc3R5bGVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBhZGRpdGlvbnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3N0eWxlc1NldC5oYXMoc3R5bGUpKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlc1NldC5hZGQoc3R5bGUpO1xuICAgICAgICBhZGRpdGlvbnMuYWRkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uU3R5bGVzQWRkZWQoYWRkaXRpb25zKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge31cblxuICBnZXRBbGxTdHlsZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX3N0eWxlc1NldCk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNoYXJlZFN0eWxlc0hvc3QgZXh0ZW5kcyBTaGFyZWRTdHlsZXNIb3N0IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfaG9zdE5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBwcml2YXRlIF9zdHlsZU5vZGVzID0gbmV3IFNldDxOb2RlPigpO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5faG9zdE5vZGVzLmFkZChfZG9jLmhlYWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU3R5bGVzVG9Ib3N0KHN0eWxlczogU2V0PHN0cmluZz4sIGhvc3Q6IE5vZGUpOiB2b2lkIHtcbiAgICBzdHlsZXMuZm9yRWFjaCgoc3R5bGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5fc3R5bGVOb2Rlcy5hZGQoaG9zdC5hcHBlbmRDaGlsZChzdHlsZUVsKSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRIb3N0KGhvc3ROb2RlOiBOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KHRoaXMuX3N0eWxlc1NldCwgaG9zdE5vZGUpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoaG9zdE5vZGUpO1xuICB9XG5cbiAgcmVtb3ZlSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5kZWxldGUoaG9zdE5vZGUpO1xuICB9XG5cbiAgb25TdHlsZXNBZGRlZChhZGRpdGlvbnM6IFNldDxzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy5faG9zdE5vZGVzLmZvckVhY2goaG9zdE5vZGUgPT4gdGhpcy5fYWRkU3R5bGVzVG9Ib3N0KGFkZGl0aW9ucywgaG9zdE5vZGUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0eWxlTm9kZXMuZm9yRWFjaChzdHlsZU5vZGUgPT4gZ2V0RE9NKCkucmVtb3ZlKHN0eWxlTm9kZSkpO1xuICB9XG59XG4iXX0=