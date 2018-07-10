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
import { Inject, Injectable } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/src/dom_tokens";
/** @typedef {?} */
var MetaDefinition;
export { MetaDefinition };
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
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Meta.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Meta.ngInjectableDef = i0.defineInjectable({ factory: function Meta_Factory() { return new Meta(i0.inject(i1.DOCUMENT)); }, token: Meta, providedIn: "root" });
if (false) {
    /** @type {?} */
    Meta.prototype._dom;
    /** @type {?} */
    Meta.prototype._doc;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBYSxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7O0FBMEIzQyxNQUFNOzs7O0lBRUosWUFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQUU7Ozs7OztJQUUxRSxNQUFNLENBQUMsR0FBbUIsRUFBRSxnQkFBeUIsS0FBSztRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUNyRDs7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQXNCLEVBQUUsZ0JBQXlCLEtBQUs7UUFDNUQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUF5QixFQUFFLEdBQW1CLEVBQUUsRUFBRTtZQUNwRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2YsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNSOzs7OztJQUVELE1BQU0sQ0FBQyxZQUFvQjtRQUN6QixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLFlBQVksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0tBQzVFOzs7OztJQUVELE9BQU8sQ0FBQyxZQUFvQjtRQUMxQixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sRUFBRSxDQUFDOztRQUM3QixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN6RixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUN4Qzs7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQW1CLEVBQUUsUUFBaUI7UUFDOUMsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN0QixRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBQ2hELE1BQU0sSUFBSSxzQkFBb0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRztRQUN0RCxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7Ozs7SUFFRCxTQUFTLENBQUMsWUFBb0IsSUFBVSxJQUFJLENBQUMsZ0JBQWdCLG9CQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7OztJQUU3RixnQkFBZ0IsQ0FBQyxJQUFxQjtRQUNwQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7OztJQUVPLG1CQUFtQixDQUFDLElBQW9CLEVBQUUsZ0JBQXlCLEtBQUs7UUFFOUUsSUFBSSxDQUFDLGFBQWEsRUFBRTs7WUFDbEIsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDbkQsTUFBTSxJQUFJLHNCQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O1lBSXRELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQy9EOztRQUNELE1BQU0sT0FBTyxxQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFvQixFQUFDO1FBQ3BGLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7O1FBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUM7Ozs7Ozs7SUFHVCx5QkFBeUIsQ0FBQyxHQUFtQixFQUFFLEVBQW1CO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsT0FBTyxFQUFFLENBQUM7Ozs7OztJQUdKLGNBQWMsQ0FBQyxHQUFtQjs7UUFDeEMsTUFBTSxJQUFJLEdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDcEQsT0FBTyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQUcxQixtQkFBbUIsQ0FBQyxHQUFtQixFQUFFLElBQXFCO1FBQ3BFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7OztZQTdFbEcsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs0Q0FHakIsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtEb21BZGFwdGVyLCBnZXRET019IGZyb20gJy4uL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuLi9kb20vZG9tX3Rva2Vucyc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWV0YSBlbGVtZW50LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgTWV0YURlZmluaXRpb24gPSB7XG4gIGNoYXJzZXQ/OiBzdHJpbmc7IGNvbnRlbnQ/OiBzdHJpbmc7IGh0dHBFcXVpdj86IHN0cmluZzsgaWQ/OiBzdHJpbmc7IGl0ZW1wcm9wPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBwcm9wZXJ0eT86IHN0cmluZztcbiAgc2NoZW1lPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG59ICZcbntcbiAgLy8gVE9ETyhJZ29yTWluYXIpOiB0aGlzIHR5cGUgbG9va3Mgd3JvbmdcbiAgW3Byb3A6IHN0cmluZ106IHN0cmluZztcbn07XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBhZGQgbWV0YSB0YWdzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTWV0YSB7XG4gIHByaXZhdGUgX2RvbTogRG9tQWRhcHRlcjtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHsgdGhpcy5fZG9tID0gZ2V0RE9NKCk7IH1cblxuICBhZGRUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghdGFnKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbik7XG4gIH1cblxuICBhZGRUYWdzKHRhZ3M6IE1ldGFEZWZpbml0aW9uW10sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIXRhZ3MpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdGFncy5yZWR1Y2UoKHJlc3VsdDogSFRNTE1ldGFFbGVtZW50W10sIHRhZzogTWV0YURlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXRUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCFhdHRyU2VsZWN0b3IpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9kb20ucXVlcnlTZWxlY3Rvcih0aGlzLl9kb2MsIGBtZXRhWyR7YXR0clNlbGVjdG9yfV1gKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0VGFncyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGxpc3QgLypOb2RlTGlzdCovID0gdGhpcy5fZG9tLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZG9jLCBgbWV0YVske2F0dHJTZWxlY3Rvcn1dYCk7XG4gICAgcmV0dXJuIGxpc3QgPyBbXS5zbGljZS5jYWxsKGxpc3QpIDogW107XG4gIH1cblxuICB1cGRhdGVUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgc2VsZWN0b3I/OiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5fcGFyc2VTZWxlY3Rvcih0YWcpO1xuICAgIGNvbnN0IG1ldGE6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSAhO1xuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZywgbWV0YSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCB0cnVlKTtcbiAgfVxuXG4gIHJlbW92ZVRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnJlbW92ZVRhZ0VsZW1lbnQodGhpcy5nZXRUYWcoYXR0clNlbGVjdG9yKSAhKTsgfVxuXG4gIHJlbW92ZVRhZ0VsZW1lbnQobWV0YTogSFRNTE1ldGFFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHRoaXMuX2RvbS5yZW1vdmUobWV0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JDcmVhdGVFbGVtZW50KG1ldGE6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOlxuICAgICAgSFRNTE1ldGFFbGVtZW50IHtcbiAgICBpZiAoIWZvcmNlQ3JlYXRpb24pIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yOiBzdHJpbmcgPSB0aGlzLl9wYXJzZVNlbGVjdG9yKG1ldGEpO1xuICAgICAgY29uc3QgZWxlbTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5nZXRUYWcoc2VsZWN0b3IpICE7XG4gICAgICAvLyBJdCdzIGFsbG93ZWQgdG8gaGF2ZSBtdWx0aXBsZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUgc28gaXQncyBub3QgZW5vdWdoIHRvXG4gICAgICAvLyBqdXN0IGNoZWNrIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBwYWdlLiBXZSBhbHNvIG5lZWQgdG9cbiAgICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIHRhZyBhdHRyaWJ1dGVzXG4gICAgICBpZiAoZWxlbSAmJiB0aGlzLl9jb250YWluc0F0dHJpYnV0ZXMobWV0YSwgZWxlbSkpIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50OiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLl9kb20uY3JlYXRlRWxlbWVudCgnbWV0YScpIGFzIEhUTUxNZXRhRWxlbWVudDtcbiAgICB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXMobWV0YSwgZWxlbWVudCk7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuX2RvbS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLl9kb2MsICdoZWFkJylbMF07XG4gICAgdGhpcy5fZG9tLmFwcGVuZENoaWxkKGhlYWQsIGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZzogTWV0YURlZmluaXRpb24sIGVsOiBIVE1MTWV0YUVsZW1lbnQpOiBIVE1MTWV0YUVsZW1lbnQge1xuICAgIE9iamVjdC5rZXlzKHRhZykuZm9yRWFjaCgocHJvcDogc3RyaW5nKSA9PiB0aGlzLl9kb20uc2V0QXR0cmlidXRlKGVsLCBwcm9wLCB0YWdbcHJvcF0pKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVNlbGVjdG9yKHRhZzogTWV0YURlZmluaXRpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IGF0dHI6IHN0cmluZyA9IHRhZy5uYW1lID8gJ25hbWUnIDogJ3Byb3BlcnR5JztcbiAgICByZXR1cm4gYCR7YXR0cn09XCIke3RhZ1thdHRyXX1cImA7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluc0F0dHJpYnV0ZXModGFnOiBNZXRhRGVmaW5pdGlvbiwgZWxlbTogSFRNTE1ldGFFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRhZykuZXZlcnkoKGtleTogc3RyaW5nKSA9PiB0aGlzLl9kb20uZ2V0QXR0cmlidXRlKGVsZW0sIGtleSkgPT09IHRhZ1trZXldKTtcbiAgfVxufVxuIl19