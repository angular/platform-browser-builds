/**
 * @fileoverview added by tsickle
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
export class SharedStylesHost {
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
    getAllStyles() { return Array.from(this._stylesSet); }
}
SharedStylesHost.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * \@internal
     * @type {?}
     * @protected
     */
    SharedStylesHost.prototype._stylesSet;
}
export class DomSharedStylesHost extends SharedStylesHost {
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
    removeHost(hostNode) { this._hostNodes.delete(hostNode); }
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
    ngOnDestroy() { this._styleNodes.forEach((/**
     * @param {?} styleNode
     * @return {?}
     */
    styleNode => getDOM().remove(styleNode))); }
}
DomSharedStylesHost.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomSharedStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRzVELE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7Ozs7UUFHWSxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQWdCM0MsQ0FBQzs7Ozs7SUFkQyxTQUFTLENBQUMsTUFBZ0I7O2NBQ2xCLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBVTtRQUNuQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsU0FBc0IsSUFBUyxDQUFDOzs7O0lBRTlDLFlBQVksS0FBZSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBbEJqRSxVQUFVOzs7Ozs7OztJQUdULHNDQUF5Qzs7QUFtQjNDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7Ozs7SUFHdkQsWUFBc0MsSUFBUztRQUM3QyxLQUFLLEVBQUUsQ0FBQztRQUQ0QixTQUFJLEdBQUosSUFBSSxDQUFLO1FBRnZDLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUdwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7OztJQUVPLGdCQUFnQixDQUFDLE1BQW1CLEVBQUUsSUFBVTtRQUN0RCxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7O2tCQUN6QixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLFFBQWM7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsUUFBYyxJQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFdEUsYUFBYSxDQUFDLFNBQXNCO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBQyxDQUFDO0lBQ2xGLENBQUM7Ozs7SUFFRCxXQUFXLEtBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPOzs7O0lBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7OztZQTVCM0YsVUFBVTs7Ozs0Q0FJSSxNQUFNLFNBQUMsUUFBUTs7Ozs7OztJQUY1Qix5Q0FBcUM7Ozs7O0lBQ3JDLDBDQUFzQzs7Ozs7SUFDMUIsbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFN0eWxlc0hvc3Qge1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBfc3R5bGVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgYWRkU3R5bGVzKHN0eWxlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBhZGRpdGlvbnMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3N0eWxlc1NldC5oYXMoc3R5bGUpKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlc1NldC5hZGQoc3R5bGUpO1xuICAgICAgICBhZGRpdGlvbnMuYWRkKHN0eWxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uU3R5bGVzQWRkZWQoYWRkaXRpb25zKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge31cblxuICBnZXRBbGxTdHlsZXMoKTogc3RyaW5nW10geyByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9zdHlsZXNTZXQpOyB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21TaGFyZWRTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2hvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgcHJpdmF0ZSBfc3R5bGVOb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoX2RvYy5oZWFkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlc1RvSG9zdChzdHlsZXM6IFNldDxzdHJpbmc+LCBob3N0OiBOb2RlKTogdm9pZCB7XG4gICAgc3R5bGVzLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICAgIHRoaXMuX3N0eWxlTm9kZXMuYWRkKGhvc3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCkpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFN0eWxlc1RvSG9zdCh0aGlzLl9zdHlsZXNTZXQsIGhvc3ROb2RlKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHJlbW92ZUhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHsgdGhpcy5faG9zdE5vZGVzLmRlbGV0ZShob3N0Tm9kZSk7IH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuZm9yRWFjaChob3N0Tm9kZSA9PiB0aGlzLl9hZGRTdHlsZXNUb0hvc3QoYWRkaXRpb25zLCBob3N0Tm9kZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuX3N0eWxlTm9kZXMuZm9yRWFjaChzdHlsZU5vZGUgPT4gZ2V0RE9NKCkucmVtb3ZlKHN0eWxlTm9kZSkpOyB9XG59XG4iXX0=