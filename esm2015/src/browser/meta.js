import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, inject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
/** @typedef {?} */
var MetaDefinition;
export { MetaDefinition };
/**
 * Factory to create Meta service.
 * @return {?}
 */
export function createMeta() {
    return new Meta(inject(DOCUMENT));
}
/**
 * A service that can be used to get and add meta tags.
 *
 * \@experimental
 */
export class Meta {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
    }
    /**
     * @param {?} tag
     * @param {?=} forceCreation
     * @return {?}
     */
    addTag(tag, forceCreation = false) {
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * @param {?} tags
     * @param {?=} forceCreation
     * @return {?}
     */
    addTags(tags, forceCreation = false) {
        if (!tags)
            return [];
        return tags.reduce((result, tag) => {
            if (tag) {
                result.push(this._getOrCreateElement(tag, forceCreation));
            }
            return result;
        }, []);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    getTag(attrSelector) {
        if (!attrSelector)
            return null;
        return this._dom.querySelector(this._doc, `meta[${attrSelector}]`) || null;
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    getTags(attrSelector) {
        if (!attrSelector)
            return [];
        /** @type {?} */
        const list = this._dom.querySelectorAll(this._doc, `meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
    }
    /**
     * @param {?} tag
     * @param {?=} selector
     * @return {?}
     */
    updateTag(tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        /** @type {?} */
        const meta = /** @type {?} */ ((this.getTag(selector)));
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */
    removeTag(attrSelector) { this.removeTagElement(/** @type {?} */ ((this.getTag(attrSelector)))); }
    /**
     * @param {?} meta
     * @return {?}
     */
    removeTagElement(meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    }
    /**
     * @param {?} meta
     * @param {?=} forceCreation
     * @return {?}
     */
    _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
            /** @type {?} */
            const selector = this._parseSelector(meta);
            /** @type {?} */
            const elem = /** @type {?} */ ((this.getTag(selector)));
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this._containsAttributes(meta, elem))
                return elem;
        }
        /** @type {?} */
        const element = /** @type {?} */ (this._dom.createElement('meta'));
        this._setMetaElementAttributes(meta, element);
        /** @type {?} */
        const head = this._dom.getElementsByTagName(this._doc, 'head')[0];
        this._dom.appendChild(head, element);
        return element;
    }
    /**
     * @param {?} tag
     * @param {?} el
     * @return {?}
     */
    _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => this._dom.setAttribute(el, prop, tag[prop]));
        return el;
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    _parseSelector(tag) {
        /** @type {?} */
        const attr = tag.name ? 'name' : 'property';
        return `${attr}="${tag[attr]}"`;
    }
    /**
     * @param {?} tag
     * @param {?} elem
     * @return {?}
     */
    _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => this._dom.getAttribute(elem, key) === tag[key]);
    }
}
Meta.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: createMeta, deps: [] },] },
];
/** @nocollapse */
Meta.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
Meta.ngInjectableDef = i0.defineInjectable({ token: Meta, factory: function Meta_Factory() { return createMeta(); }, providedIn: 'root' });
if (false) {
    /** @type {?} */
    Meta.prototype._dom;
    /** @type {?} */
    Meta.prototype._doc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFhLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7QUF3QjNDLE1BQU07SUFDSixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0NBQ25DOzs7Ozs7QUFRRCxNQUFNOzs7O0lBRUosWUFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQUU7Ozs7OztJQUUxRSxNQUFNLENBQUMsR0FBbUIsRUFBRSxnQkFBeUIsS0FBSztRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUNyRDs7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQXNCLEVBQUUsZ0JBQXlCLEtBQUs7UUFDNUQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUF5QixFQUFFLEdBQW1CLEVBQUUsRUFBRTtZQUNwRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUNELE9B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LENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsT0FBTyxFQUFFLENBQUM7Ozs7OztJQUdKLGNBQWMsQ0FBQyxHQUFtQjs7UUFDeEMsTUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDcEQsT0FBTyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQUcxQixtQkFBbUIsQ0FBQyxHQUFtQixFQUFFLElBQXFCO1FBQ3BFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztZQTdFbEcsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7Ozs7NENBR25ELE1BQU0sU0FBQyxRQUFROztvREFGakIsSUFBSSw0Q0FENEIsVUFBVSxtQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RG9tQWRhcHRlciwgZ2V0RE9NfSBmcm9tICcuLi9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnLi4vZG9tL2RvbV90b2tlbnMnO1xuXG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWV0YSBlbGVtZW50LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgTWV0YURlZmluaXRpb24gPSB7XG4gIGNoYXJzZXQ/OiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGh0dHBFcXVpdj86IHN0cmluZzsgaWQ/OiBzdHJpbmc7IGl0ZW1wcm9wPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBwcm9wZXJ0eT86IHN0cmluZztcbiAgc2NoZW1lPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG59ICZcbntcbiAgLy8gVE9ETyhJZ29yTWluYXIpOiB0aGlzIHR5cGUgbG9va3Mgd3JvbmdcbiAgW3Byb3A6IHN0cmluZ106IHN0cmluZztcbn07XG5cbi8qKlxuICogRmFjdG9yeSB0byBjcmVhdGUgTWV0YSBzZXJ2aWNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWV0YSgpIHtcbiAgcmV0dXJuIG5ldyBNZXRhKGluamVjdChET0NVTUVOVCkpO1xufVxuXG4vKipcbiAqIEEgc2VydmljZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGdldCBhbmQgYWRkIG1ldGEgdGFncy5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IGNyZWF0ZU1ldGEsIGRlcHM6IFtdfSlcbmV4cG9ydCBjbGFzcyBNZXRhIHtcbiAgcHJpdmF0ZSBfZG9tOiBEb21BZGFwdGVyO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkgeyB0aGlzLl9kb20gPSBnZXRET00oKTsgfVxuXG4gIGFkZFRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCBmb3JjZUNyZWF0aW9uKTtcbiAgfVxuXG4gIGFkZFRhZ3ModGFnczogTWV0YURlZmluaXRpb25bXSwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogSFRNTE1ldGFFbGVtZW50W10ge1xuICAgIGlmICghdGFncykgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0YWdzLnJlZHVjZSgocmVzdWx0OiBIVE1MTWV0YUVsZW1lbnRbXSwgdGFnOiBNZXRhRGVmaW5pdGlvbikgPT4ge1xuICAgICAgaWYgKHRhZykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCBmb3JjZUNyZWF0aW9uKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIGdldFRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX2RvbS5xdWVyeVNlbGVjdG9yKHRoaXMuX2RvYywgYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApIHx8IG51bGw7XG4gIH1cblxuICBnZXRUYWdzKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50W10ge1xuICAgIGlmICghYXR0clNlbGVjdG9yKSByZXR1cm4gW107XG4gICAgY29uc3QgbGlzdCAvKk5vZGVMaXN0Ki8gPSB0aGlzLl9kb20ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9kb2MsIGBtZXRhWyR7YXR0clNlbGVjdG9yfV1gKTtcbiAgICByZXR1cm4gbGlzdCA/IFtdLnNsaWNlLmNhbGwobGlzdCkgOiBbXTtcbiAgfVxuXG4gIHVwZGF0ZVRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBzZWxlY3Rvcj86IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIXRhZykgcmV0dXJuIG51bGw7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCB0aGlzLl9wYXJzZVNlbGVjdG9yKHRhZyk7XG4gICAgY29uc3QgbWV0YTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5nZXRUYWcoc2VsZWN0b3IpICE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXModGFnLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIHRydWUpO1xuICB9XG5cbiAgcmVtb3ZlVGFnKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogdm9pZCB7IHRoaXMucmVtb3ZlVGFnRWxlbWVudCh0aGlzLmdldFRhZyhhdHRyU2VsZWN0b3IpICEpOyB9XG5cbiAgcmVtb3ZlVGFnRWxlbWVudChtZXRhOiBIVE1MTWV0YUVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAobWV0YSkge1xuICAgICAgdGhpcy5fZG9tLnJlbW92ZShtZXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRPckNyZWF0ZUVsZW1lbnQobWV0YTogTWV0YURlZmluaXRpb24sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6XG4gICAgICBIVE1MTWV0YUVsZW1lbnQge1xuICAgIGlmICghZm9yY2VDcmVhdGlvbikge1xuICAgICAgY29uc3Qgc2VsZWN0b3I6IHN0cmluZyA9IHRoaXMuX3BhcnNlU2VsZWN0b3IobWV0YSk7XG4gICAgICBjb25zdCBlbGVtOiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLmdldFRhZyhzZWxlY3RvcikgITtcbiAgICAgIC8vIEl0J3MgYWxsb3dlZCB0byBoYXZlIG11bHRpcGxlIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgbmFtZSBzbyBpdCdzIG5vdCBlbm91Z2ggdG9cbiAgICAgIC8vIGp1c3QgY2hlY2sgdGhhdCBlbGVtZW50IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IHByZXNlbnQgb24gdGhlIHBhZ2UuIFdlIGFsc28gbmVlZCB0b1xuICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBoYXMgdGFnIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChlbGVtICYmIHRoaXMuX2NvbnRhaW5zQXR0cmlidXRlcyhtZXRhLCBlbGVtKSkgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuX2RvbS5jcmVhdGVFbGVtZW50KCdtZXRhJykgYXMgSFRNTE1ldGFFbGVtZW50O1xuICAgIHRoaXMuX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyhtZXRhLCBlbGVtZW50KTtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5fZG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuX2RvYywgJ2hlYWQnKVswXTtcbiAgICB0aGlzLl9kb20uYXBwZW5kQ2hpbGQoaGVhZCwgZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXModGFnOiBNZXRhRGVmaW5pdGlvbiwgZWw6IEhUTUxNZXRhRWxlbWVudCk6IEhUTUxNZXRhRWxlbWVudCB7XG4gICAgT2JqZWN0LmtleXModGFnKS5mb3JFYWNoKChwcm9wOiBzdHJpbmcpID0+IHRoaXMuX2RvbS5zZXRBdHRyaWJ1dGUoZWwsIHByb3AsIHRhZ1twcm9wXSkpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlU2VsZWN0b3IodGFnOiBNZXRhRGVmaW5pdGlvbik6IHN0cmluZyB7XG4gICAgY29uc3QgYXR0cjogc3RyaW5nID0gdGFnLm5hbWUgPyAnbmFtZScgOiAncHJvcGVydHknO1xuICAgIHJldHVybiBgJHthdHRyfT1cIiR7dGFnW2F0dHJdfVwiYDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5zQXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbGVtOiBIVE1MTWV0YUVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGFnKS5ldmVyeSgoa2V5OiBzdHJpbmcpID0+IHRoaXMuX2RvbS5nZXRBdHRyaWJ1dGUoZWxlbSwga2V5KSA9PT0gdGFnW2tleV0pO1xuICB9XG59XG4iXX0=