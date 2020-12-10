/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, ɵɵinject } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */
export function createMeta() {
    return new Meta(ɵɵinject(DOCUMENT));
}
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */
export class Meta {
    constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
    }
    /**
     * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * If an existing element is found, it is returned and is not modified in any way.
     * @param tag The definition of a `<meta>` element to match or create.
     * @param forceCreation True to create a new element without checking whether one already exists.
     * @returns The existing element with the same attributes and values if found,
     * the new element if no match is found, or `null` if the tag parameter is not defined.
     */
    addTag(tag, forceCreation = false) {
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * @param tags An array of tag definitions to match or create.
     * @param forceCreation True to create new elements without checking whether they already exist.
     * @returns The matching elements if found, or the new elements.
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
     * Retrieves a `<meta>` tag element in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching element, if any.
     */
    getTag(attrSelector) {
        if (!attrSelector)
            return null;
        return this._doc.querySelector(`meta[${attrSelector}]`) || null;
    }
    /**
     * Retrieves a set of `<meta>` tag elements in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching elements, if any.
     */
    getTags(attrSelector) {
        if (!attrSelector)
            return [];
        const list /*NodeList*/ = this._doc.querySelectorAll(`meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
    }
    /**
     * Modifies an existing `<meta>` tag element in the current HTML document.
     * @param tag The tag description with which to replace the existing tag content.
     * @param selector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     * If not supplied, matches a tag with the same `name` or `property` attribute value as the
     * replacement tag.
     * @return The modified element.
     */
    updateTag(tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param attrSelector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     */
    removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param meta The tag definition to match against to identify an existing tag.
     */
    removeTagElement(meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    }
    _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
            const selector = this._parseSelector(meta);
            const elem = this.getTag(selector);
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this._containsAttributes(meta, elem))
                return elem;
        }
        const element = this._dom.createElement('meta');
        this._setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName('head')[0];
        head.appendChild(element);
        return element;
    }
    _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
        return el;
    }
    _parseSelector(tag) {
        const attr = tag.name ? 'name' : 'property';
        return `${attr}="${tag[attr]}"`;
    }
    _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
    }
    _getMetaKeyMap(prop) {
        return META_KEYS_MAP[prop] || prop;
    }
}
Meta.ɵfac = function Meta_Factory(t) { return new (t || Meta)(i0.ɵɵinject(DOCUMENT)); };
Meta.ɵprov = i0.ɵɵdefineInjectable({ token: Meta, factory: function Meta_Factory(t) { let r = null; if (t) {
        r = new t();
    }
    else {
        r = createMeta();
    } return r; }, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Meta, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createMeta, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */
const META_KEYS_MAP = {
    httpEquiv: 'http-equiv'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUE2QixPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQTBCM0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsVUFBVTtJQUN4QixPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxPQUFPLElBQUk7SUFFZixZQUFzQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsR0FBbUIsRUFBRSxnQkFBeUIsS0FBSztRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxJQUFzQixFQUFFLGdCQUF5QixLQUFLO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBeUIsRUFBRSxHQUFtQixFQUFFLEVBQUU7WUFDcEUsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxDQUFDLElBQUks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XG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgybXJtWluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYXR0cmlidXRlcyBvZiBhbiBIVE1MIGA8bWV0YT5gIGVsZW1lbnQuIFRoZSBlbGVtZW50IGl0c2VsZiBpc1xuICogcmVwcmVzZW50ZWQgYnkgdGhlIGludGVybmFsIGBIVE1MTWV0YUVsZW1lbnRgLlxuICpcbiAqIEBzZWUgW0hUTUwgbWV0YSB0YWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9tZXRhKVxuICogQHNlZSBgTWV0YWBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIE1ldGFEZWZpbml0aW9uID0ge1xuICBjaGFyc2V0Pzogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nO1xuICBodHRwRXF1aXY/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBpdGVtcHJvcD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcHJvcGVydHk/OiBzdHJpbmc7XG4gIHNjaGVtZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xufSZ7XG4gIC8vIFRPRE8oSWdvck1pbmFyKTogdGhpcyB0eXBlIGxvb2tzIHdyb25nXG4gIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIGEgYE1ldGFgIHNlcnZpY2UgaW5zdGFuY2UgZm9yIHRoZSBjdXJyZW50IERPTSBkb2N1bWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1ldGEoKSB7XG4gIHJldHVybiBuZXcgTWV0YSjJtcm1aW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIGZvciBtYW5hZ2luZyBIVE1MIGA8bWV0YT5gIHRhZ3MuXG4gKlxuICogUHJvcGVydGllcyBvZiB0aGUgYE1ldGFEZWZpbml0aW9uYCBvYmplY3QgbWF0Y2ggdGhlIGF0dHJpYnV0ZXMgb2YgdGhlXG4gKiBIVE1MIGA8bWV0YT5gIHRhZy4gVGhlc2UgdGFncyBkZWZpbmUgZG9jdW1lbnQgbWV0YWRhdGEgdGhhdCBpcyBpbXBvcnRhbnQgZm9yXG4gKiB0aGluZ3MgbGlrZSBjb25maWd1cmluZyBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LCBkZWZpbmluZyBicm93c2VyIGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzZWN1cml0eSBzZXR0aW5ncywgc2V0dGluZyBIVFRQIEhlYWRlcnMsIGRlZmluaW5nIHJpY2ggY29udGVudCBmb3Igc29jaWFsIHNoYXJpbmcsXG4gKiBhbmQgU2VhcmNoIEVuZ2luZSBPcHRpbWl6YXRpb24gKFNFTykuXG4gKlxuICogVG8gaWRlbnRpZnkgc3BlY2lmaWMgYDxtZXRhPmAgdGFncyBpbiBhIGRvY3VtZW50LCB1c2UgYW4gYXR0cmlidXRlIHNlbGVjdGlvblxuICogc3RyaW5nIGluIHRoZSBmb3JtYXQgYFwidGFnX2F0dHJpYnV0ZT0ndmFsdWUgc3RyaW5nJ1wiYC5cbiAqIEZvciBleGFtcGxlLCBhbiBgYXR0clNlbGVjdG9yYCB2YWx1ZSBvZiBgXCJuYW1lPSdkZXNjcmlwdGlvbidcImAgbWF0Y2hlcyBhIHRhZ1xuICogd2hvc2UgYG5hbWVgIGF0dHJpYnV0ZSBoYXMgdGhlIHZhbHVlIGBcImRlc2NyaXB0aW9uXCJgLlxuICogU2VsZWN0b3JzIGFyZSB1c2VkIHdpdGggdGhlIGBxdWVyeVNlbGVjdG9yKClgIERvY3VtZW50IG1ldGhvZCxcbiAqIGluIHRoZSBmb3JtYXQgYG1ldGFbe2F0dHJTZWxlY3Rvcn1dYC5cbiAqXG4gKiBAc2VlIFtIVE1MIG1ldGEgdGFnXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvbWV0YSlcbiAqIEBzZWUgW0RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3IpXG4gKlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogY3JlYXRlTWV0YSwgZGVwczogW119KVxuZXhwb3J0IGNsYXNzIE1ldGEge1xuICBwcml2YXRlIF9kb206IERvbUFkYXB0ZXI7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7XG4gICAgdGhpcy5fZG9tID0gZ2V0RE9NKCk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBvciBjcmVhdGVzIGEgc3BlY2lmaWMgYDxtZXRhPmAgdGFnIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogSW4gc2VhcmNoaW5nIGZvciBhbiBleGlzdGluZyB0YWcsIEFuZ3VsYXIgYXR0ZW1wdHMgdG8gbWF0Y2ggdGhlIGBuYW1lYCBvciBgcHJvcGVydHlgIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZXMgaW4gdGhlIHByb3ZpZGVkIHRhZyBkZWZpbml0aW9uLCBhbmQgdmVyaWZpZXMgdGhhdCBhbGwgb3RoZXIgYXR0cmlidXRlIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAqIElmIGFuIGV4aXN0aW5nIGVsZW1lbnQgaXMgZm91bmQsIGl0IGlzIHJldHVybmVkIGFuZCBpcyBub3QgbW9kaWZpZWQgaW4gYW55IHdheS5cbiAgICogQHBhcmFtIHRhZyBUaGUgZGVmaW5pdGlvbiBvZiBhIGA8bWV0YT5gIGVsZW1lbnQgdG8gbWF0Y2ggb3IgY3JlYXRlLlxuICAgKiBAcGFyYW0gZm9yY2VDcmVhdGlvbiBUcnVlIHRvIGNyZWF0ZSBhIG5ldyBlbGVtZW50IHdpdGhvdXQgY2hlY2tpbmcgd2hldGhlciBvbmUgYWxyZWFkeSBleGlzdHMuXG4gICAqIEByZXR1cm5zIFRoZSBleGlzdGluZyBlbGVtZW50IHdpdGggdGhlIHNhbWUgYXR0cmlidXRlcyBhbmQgdmFsdWVzIGlmIGZvdW5kLFxuICAgKiB0aGUgbmV3IGVsZW1lbnQgaWYgbm8gbWF0Y2ggaXMgZm91bmQsIG9yIGBudWxsYCBpZiB0aGUgdGFnIHBhcmFtZXRlciBpcyBub3QgZGVmaW5lZC5cbiAgICovXG4gIGFkZFRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCBmb3JjZUNyZWF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgb3IgY3JlYXRlcyBhIHNldCBvZiBgPG1ldGE+YCB0YWcgZWxlbWVudHMgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogSW4gc2VhcmNoaW5nIGZvciBhbiBleGlzdGluZyB0YWcsIEFuZ3VsYXIgYXR0ZW1wdHMgdG8gbWF0Y2ggdGhlIGBuYW1lYCBvciBgcHJvcGVydHlgIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZXMgaW4gdGhlIHByb3ZpZGVkIHRhZyBkZWZpbml0aW9uLCBhbmQgdmVyaWZpZXMgdGhhdCBhbGwgb3RoZXIgYXR0cmlidXRlIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAqIEBwYXJhbSB0YWdzIEFuIGFycmF5IG9mIHRhZyBkZWZpbml0aW9ucyB0byBtYXRjaCBvciBjcmVhdGUuXG4gICAqIEBwYXJhbSBmb3JjZUNyZWF0aW9uIFRydWUgdG8gY3JlYXRlIG5ldyBlbGVtZW50cyB3aXRob3V0IGNoZWNraW5nIHdoZXRoZXIgdGhleSBhbHJlYWR5IGV4aXN0LlxuICAgKiBAcmV0dXJucyBUaGUgbWF0Y2hpbmcgZWxlbWVudHMgaWYgZm91bmQsIG9yIHRoZSBuZXcgZWxlbWVudHMuXG4gICAqL1xuICBhZGRUYWdzKHRhZ3M6IE1ldGFEZWZpbml0aW9uW10sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIXRhZ3MpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdGFncy5yZWR1Y2UoKHJlc3VsdDogSFRNTE1ldGFFbGVtZW50W10sIHRhZzogTWV0YURlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgYDxtZXRhPmAgdGFnIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIGF0dHJTZWxlY3RvciBUaGUgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgaW4gdGhlIGZvcm1hdFxuICAgKiBgXCJ0YWdfYXR0cmlidXRlPSd2YWx1ZSBzdHJpbmcnXCJgLlxuICAgKiBAcmV0dXJucyBUaGUgbWF0Y2hpbmcgZWxlbWVudCwgaWYgYW55LlxuICAgKi9cbiAgZ2V0VGFnKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghYXR0clNlbGVjdG9yKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZG9jLnF1ZXJ5U2VsZWN0b3IoYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgc2V0IG9mIGA8bWV0YT5gIHRhZyBlbGVtZW50cyBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gYXR0clNlbGVjdG9yIFRoZSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCBpbiB0aGUgZm9ybWF0XG4gICAqIGBcInRhZ19hdHRyaWJ1dGU9J3ZhbHVlIHN0cmluZydcImAuXG4gICAqIEByZXR1cm5zIFRoZSBtYXRjaGluZyBlbGVtZW50cywgaWYgYW55LlxuICAgKi9cbiAgZ2V0VGFncyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGxpc3QgLypOb2RlTGlzdCovID0gdGhpcy5fZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApO1xuICAgIHJldHVybiBsaXN0ID8gW10uc2xpY2UuY2FsbChsaXN0KSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmaWVzIGFuIGV4aXN0aW5nIGA8bWV0YT5gIHRhZyBlbGVtZW50IGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSB0YWcgVGhlIHRhZyBkZXNjcmlwdGlvbiB3aXRoIHdoaWNoIHRvIHJlcGxhY2UgdGhlIGV4aXN0aW5nIHRhZyBjb250ZW50LlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgQSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCB0byBpZGVudGlmeVxuICAgKiBhbiBleGlzdGluZyB0YWcuIEEgc3RyaW5nIGluIHRoZSBmb3JtYXQgYFwidGFnX2F0dHJpYnV0ZT1gdmFsdWUgc3RyaW5nYFwiYC5cbiAgICogSWYgbm90IHN1cHBsaWVkLCBtYXRjaGVzIGEgdGFnIHdpdGggdGhlIHNhbWUgYG5hbWVgIG9yIGBwcm9wZXJ0eWAgYXR0cmlidXRlIHZhbHVlIGFzIHRoZVxuICAgKiByZXBsYWNlbWVudCB0YWcuXG4gICAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIGVsZW1lbnQuXG4gICAqL1xuICB1cGRhdGVUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgc2VsZWN0b3I/OiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5fcGFyc2VTZWxlY3Rvcih0YWcpO1xuICAgIGNvbnN0IG1ldGE6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXModGFnLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXhpc3RpbmcgYDxtZXRhPmAgdGFnIGVsZW1lbnQgZnJvbSB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gYXR0clNlbGVjdG9yIEEgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgdG8gaWRlbnRpZnlcbiAgICogYW4gZXhpc3RpbmcgdGFnLiBBIHN0cmluZyBpbiB0aGUgZm9ybWF0IGBcInRhZ19hdHRyaWJ1dGU9YHZhbHVlIHN0cmluZ2BcImAuXG4gICAqL1xuICByZW1vdmVUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVRhZ0VsZW1lbnQodGhpcy5nZXRUYWcoYXR0clNlbGVjdG9yKSEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXhpc3RpbmcgYDxtZXRhPmAgdGFnIGVsZW1lbnQgZnJvbSB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gbWV0YSBUaGUgdGFnIGRlZmluaXRpb24gdG8gbWF0Y2ggYWdhaW5zdCB0byBpZGVudGlmeSBhbiBleGlzdGluZyB0YWcuXG4gICAqL1xuICByZW1vdmVUYWdFbGVtZW50KG1ldGE6IEhUTUxNZXRhRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChtZXRhKSB7XG4gICAgICB0aGlzLl9kb20ucmVtb3ZlKG1ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE9yQ3JlYXRlRWxlbWVudChtZXRhOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTpcbiAgICAgIEhUTUxNZXRhRWxlbWVudCB7XG4gICAgaWYgKCFmb3JjZUNyZWF0aW9uKSB7XG4gICAgICBjb25zdCBzZWxlY3Rvcjogc3RyaW5nID0gdGhpcy5fcGFyc2VTZWxlY3RvcihtZXRhKTtcbiAgICAgIGNvbnN0IGVsZW06IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSE7XG4gICAgICAvLyBJdCdzIGFsbG93ZWQgdG8gaGF2ZSBtdWx0aXBsZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUgc28gaXQncyBub3QgZW5vdWdoIHRvXG4gICAgICAvLyBqdXN0IGNoZWNrIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBwYWdlLiBXZSBhbHNvIG5lZWQgdG9cbiAgICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIHRhZyBhdHRyaWJ1dGVzXG4gICAgICBpZiAoZWxlbSAmJiB0aGlzLl9jb250YWluc0F0dHJpYnV0ZXMobWV0YSwgZWxlbSkpIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50OiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLl9kb20uY3JlYXRlRWxlbWVudCgnbWV0YScpIGFzIEhUTUxNZXRhRWxlbWVudDtcbiAgICB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXMobWV0YSwgZWxlbWVudCk7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuX2RvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBwcml2YXRlIF9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXModGFnOiBNZXRhRGVmaW5pdGlvbiwgZWw6IEhUTUxNZXRhRWxlbWVudCk6IEhUTUxNZXRhRWxlbWVudCB7XG4gICAgT2JqZWN0LmtleXModGFnKS5mb3JFYWNoKFxuICAgICAgICAocHJvcDogc3RyaW5nKSA9PiBlbC5zZXRBdHRyaWJ1dGUodGhpcy5fZ2V0TWV0YUtleU1hcChwcm9wKSwgdGFnW3Byb3BdKSk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VTZWxlY3Rvcih0YWc6IE1ldGFEZWZpbml0aW9uKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdHRyOiBzdHJpbmcgPSB0YWcubmFtZSA/ICduYW1lJyA6ICdwcm9wZXJ0eSc7XG4gICAgcmV0dXJuIGAke2F0dHJ9PVwiJHt0YWdbYXR0cl19XCJgO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbnNBdHRyaWJ1dGVzKHRhZzogTWV0YURlZmluaXRpb24sIGVsZW06IEhUTUxNZXRhRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0YWcpLmV2ZXJ5KFxuICAgICAgICAoa2V5OiBzdHJpbmcpID0+IGVsZW0uZ2V0QXR0cmlidXRlKHRoaXMuX2dldE1ldGFLZXlNYXAoa2V5KSkgPT09IHRhZ1trZXldKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1ldGFLZXlNYXAocHJvcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTUVUQV9LRVlTX01BUFtwcm9wXSB8fCBwcm9wO1xuICB9XG59XG5cbi8qKlxuICogTWFwcGluZyBmb3IgTWV0YURlZmluaXRpb24gcHJvcGVydGllcyB3aXRoIHRoZWlyIGNvcnJlY3QgbWV0YSBhdHRyaWJ1dGUgbmFtZXNcbiAqL1xuY29uc3QgTUVUQV9LRVlTX01BUDoge1twcm9wOiBzdHJpbmddOiBzdHJpbmc7fSA9IHtcbiAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdidcbn07XG4iXX0=