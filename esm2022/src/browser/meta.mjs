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
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            const elem = this.getTags(selector).filter(elem => this._containsAttributes(meta, elem))[0];
            if (elem !== undefined)
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1+sha-6e1bf29", ngImport: i0, type: Meta, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.1+sha-6e1bf29", ngImport: i0, type: Meta, providedIn: 'root', useFactory: createMeta, deps: [] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1+sha-6e1bf29", ngImport: i0, type: Meta, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: createMeta, deps: [] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
/**
 * Mapping for MetaDefinition properties with their correct meta attribute names
 */
const META_KEYS_MAP = {
    httpEquiv: 'http-equiv'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUE2QixPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQTBCM0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsVUFBVTtJQUN4QixPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxPQUFPLElBQUk7SUFFZixZQUFzQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsR0FBbUIsRUFBRSxnQkFBeUIsS0FBSztRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxJQUFzQixFQUFFLGdCQUF5QixLQUFLO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBeUIsRUFBRSxHQUFtQixFQUFFLEVBQUU7WUFDcEUsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNLENBQUMs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LFFBQVE7O0FBdUk5Qjs7R0FFRztBQUNILE1BQU0sYUFBYSxHQUE4QjtJQUMvQyxTQUFTLEVBQUUsWUFBWTtDQUN4QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1RG9tQWRhcHRlciBhcyBEb21BZGFwdGVyLCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgybXJtWluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYXR0cmlidXRlcyBvZiBhbiBIVE1MIGA8bWV0YT5gIGVsZW1lbnQuIFRoZSBlbGVtZW50IGl0c2VsZiBpc1xuICogcmVwcmVzZW50ZWQgYnkgdGhlIGludGVybmFsIGBIVE1MTWV0YUVsZW1lbnRgLlxuICpcbiAqIEBzZWUgW0hUTUwgbWV0YSB0YWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9tZXRhKVxuICogQHNlZSB7QGxpbmsgTWV0YX1cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIE1ldGFEZWZpbml0aW9uID0ge1xuICBjaGFyc2V0Pzogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nO1xuICBodHRwRXF1aXY/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICBpdGVtcHJvcD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcHJvcGVydHk/OiBzdHJpbmc7XG4gIHNjaGVtZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xufSZ7XG4gIC8vIFRPRE8oSWdvck1pbmFyKTogdGhpcyB0eXBlIGxvb2tzIHdyb25nXG4gIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIGEgYE1ldGFgIHNlcnZpY2UgaW5zdGFuY2UgZm9yIHRoZSBjdXJyZW50IERPTSBkb2N1bWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1ldGEoKSB7XG4gIHJldHVybiBuZXcgTWV0YSjJtcm1aW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIGZvciBtYW5hZ2luZyBIVE1MIGA8bWV0YT5gIHRhZ3MuXG4gKlxuICogUHJvcGVydGllcyBvZiB0aGUgYE1ldGFEZWZpbml0aW9uYCBvYmplY3QgbWF0Y2ggdGhlIGF0dHJpYnV0ZXMgb2YgdGhlXG4gKiBIVE1MIGA8bWV0YT5gIHRhZy4gVGhlc2UgdGFncyBkZWZpbmUgZG9jdW1lbnQgbWV0YWRhdGEgdGhhdCBpcyBpbXBvcnRhbnQgZm9yXG4gKiB0aGluZ3MgbGlrZSBjb25maWd1cmluZyBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LCBkZWZpbmluZyBicm93c2VyIGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzZWN1cml0eSBzZXR0aW5ncywgc2V0dGluZyBIVFRQIEhlYWRlcnMsIGRlZmluaW5nIHJpY2ggY29udGVudCBmb3Igc29jaWFsIHNoYXJpbmcsXG4gKiBhbmQgU2VhcmNoIEVuZ2luZSBPcHRpbWl6YXRpb24gKFNFTykuXG4gKlxuICogVG8gaWRlbnRpZnkgc3BlY2lmaWMgYDxtZXRhPmAgdGFncyBpbiBhIGRvY3VtZW50LCB1c2UgYW4gYXR0cmlidXRlIHNlbGVjdGlvblxuICogc3RyaW5nIGluIHRoZSBmb3JtYXQgYFwidGFnX2F0dHJpYnV0ZT0ndmFsdWUgc3RyaW5nJ1wiYC5cbiAqIEZvciBleGFtcGxlLCBhbiBgYXR0clNlbGVjdG9yYCB2YWx1ZSBvZiBgXCJuYW1lPSdkZXNjcmlwdGlvbidcImAgbWF0Y2hlcyBhIHRhZ1xuICogd2hvc2UgYG5hbWVgIGF0dHJpYnV0ZSBoYXMgdGhlIHZhbHVlIGBcImRlc2NyaXB0aW9uXCJgLlxuICogU2VsZWN0b3JzIGFyZSB1c2VkIHdpdGggdGhlIGBxdWVyeVNlbGVjdG9yKClgIERvY3VtZW50IG1ldGhvZCxcbiAqIGluIHRoZSBmb3JtYXQgYG1ldGFbe2F0dHJTZWxlY3Rvcn1dYC5cbiAqXG4gKiBAc2VlIFtIVE1MIG1ldGEgdGFnXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvbWV0YSlcbiAqIEBzZWUgW0RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3IpXG4gKlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogY3JlYXRlTWV0YSwgZGVwczogW119KVxuZXhwb3J0IGNsYXNzIE1ldGEge1xuICBwcml2YXRlIF9kb206IERvbUFkYXB0ZXI7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7XG4gICAgdGhpcy5fZG9tID0gZ2V0RE9NKCk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBvciBjcmVhdGVzIGEgc3BlY2lmaWMgYDxtZXRhPmAgdGFnIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogSW4gc2VhcmNoaW5nIGZvciBhbiBleGlzdGluZyB0YWcsIEFuZ3VsYXIgYXR0ZW1wdHMgdG8gbWF0Y2ggdGhlIGBuYW1lYCBvciBgcHJvcGVydHlgIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZXMgaW4gdGhlIHByb3ZpZGVkIHRhZyBkZWZpbml0aW9uLCBhbmQgdmVyaWZpZXMgdGhhdCBhbGwgb3RoZXIgYXR0cmlidXRlIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAqIElmIGFuIGV4aXN0aW5nIGVsZW1lbnQgaXMgZm91bmQsIGl0IGlzIHJldHVybmVkIGFuZCBpcyBub3QgbW9kaWZpZWQgaW4gYW55IHdheS5cbiAgICogQHBhcmFtIHRhZyBUaGUgZGVmaW5pdGlvbiBvZiBhIGA8bWV0YT5gIGVsZW1lbnQgdG8gbWF0Y2ggb3IgY3JlYXRlLlxuICAgKiBAcGFyYW0gZm9yY2VDcmVhdGlvbiBUcnVlIHRvIGNyZWF0ZSBhIG5ldyBlbGVtZW50IHdpdGhvdXQgY2hlY2tpbmcgd2hldGhlciBvbmUgYWxyZWFkeSBleGlzdHMuXG4gICAqIEByZXR1cm5zIFRoZSBleGlzdGluZyBlbGVtZW50IHdpdGggdGhlIHNhbWUgYXR0cmlidXRlcyBhbmQgdmFsdWVzIGlmIGZvdW5kLFxuICAgKiB0aGUgbmV3IGVsZW1lbnQgaWYgbm8gbWF0Y2ggaXMgZm91bmQsIG9yIGBudWxsYCBpZiB0aGUgdGFnIHBhcmFtZXRlciBpcyBub3QgZGVmaW5lZC5cbiAgICovXG4gIGFkZFRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCBmb3JjZUNyZWF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgb3IgY3JlYXRlcyBhIHNldCBvZiBgPG1ldGE+YCB0YWcgZWxlbWVudHMgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogSW4gc2VhcmNoaW5nIGZvciBhbiBleGlzdGluZyB0YWcsIEFuZ3VsYXIgYXR0ZW1wdHMgdG8gbWF0Y2ggdGhlIGBuYW1lYCBvciBgcHJvcGVydHlgIGF0dHJpYnV0ZVxuICAgKiB2YWx1ZXMgaW4gdGhlIHByb3ZpZGVkIHRhZyBkZWZpbml0aW9uLCBhbmQgdmVyaWZpZXMgdGhhdCBhbGwgb3RoZXIgYXR0cmlidXRlIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAqIEBwYXJhbSB0YWdzIEFuIGFycmF5IG9mIHRhZyBkZWZpbml0aW9ucyB0byBtYXRjaCBvciBjcmVhdGUuXG4gICAqIEBwYXJhbSBmb3JjZUNyZWF0aW9uIFRydWUgdG8gY3JlYXRlIG5ldyBlbGVtZW50cyB3aXRob3V0IGNoZWNraW5nIHdoZXRoZXIgdGhleSBhbHJlYWR5IGV4aXN0LlxuICAgKiBAcmV0dXJucyBUaGUgbWF0Y2hpbmcgZWxlbWVudHMgaWYgZm91bmQsIG9yIHRoZSBuZXcgZWxlbWVudHMuXG4gICAqL1xuICBhZGRUYWdzKHRhZ3M6IE1ldGFEZWZpbml0aW9uW10sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIXRhZ3MpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdGFncy5yZWR1Y2UoKHJlc3VsdDogSFRNTE1ldGFFbGVtZW50W10sIHRhZzogTWV0YURlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgYDxtZXRhPmAgdGFnIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIGF0dHJTZWxlY3RvciBUaGUgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgaW4gdGhlIGZvcm1hdFxuICAgKiBgXCJ0YWdfYXR0cmlidXRlPSd2YWx1ZSBzdHJpbmcnXCJgLlxuICAgKiBAcmV0dXJucyBUaGUgbWF0Y2hpbmcgZWxlbWVudCwgaWYgYW55LlxuICAgKi9cbiAgZ2V0VGFnKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghYXR0clNlbGVjdG9yKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZG9jLnF1ZXJ5U2VsZWN0b3IoYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGEgc2V0IG9mIGA8bWV0YT5gIHRhZyBlbGVtZW50cyBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gYXR0clNlbGVjdG9yIFRoZSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCBpbiB0aGUgZm9ybWF0XG4gICAqIGBcInRhZ19hdHRyaWJ1dGU9J3ZhbHVlIHN0cmluZydcImAuXG4gICAqIEByZXR1cm5zIFRoZSBtYXRjaGluZyBlbGVtZW50cywgaWYgYW55LlxuICAgKi9cbiAgZ2V0VGFncyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGxpc3QgLypOb2RlTGlzdCovID0gdGhpcy5fZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApO1xuICAgIHJldHVybiBsaXN0ID8gW10uc2xpY2UuY2FsbChsaXN0KSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmaWVzIGFuIGV4aXN0aW5nIGA8bWV0YT5gIHRhZyBlbGVtZW50IGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSB0YWcgVGhlIHRhZyBkZXNjcmlwdGlvbiB3aXRoIHdoaWNoIHRvIHJlcGxhY2UgdGhlIGV4aXN0aW5nIHRhZyBjb250ZW50LlxuICAgKiBAcGFyYW0gc2VsZWN0b3IgQSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCB0byBpZGVudGlmeVxuICAgKiBhbiBleGlzdGluZyB0YWcuIEEgc3RyaW5nIGluIHRoZSBmb3JtYXQgYFwidGFnX2F0dHJpYnV0ZT1gdmFsdWUgc3RyaW5nYFwiYC5cbiAgICogSWYgbm90IHN1cHBsaWVkLCBtYXRjaGVzIGEgdGFnIHdpdGggdGhlIHNhbWUgYG5hbWVgIG9yIGBwcm9wZXJ0eWAgYXR0cmlidXRlIHZhbHVlIGFzIHRoZVxuICAgKiByZXBsYWNlbWVudCB0YWcuXG4gICAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIGVsZW1lbnQuXG4gICAqL1xuICB1cGRhdGVUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgc2VsZWN0b3I/OiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5fcGFyc2VTZWxlY3Rvcih0YWcpO1xuICAgIGNvbnN0IG1ldGE6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXModGFnLCBtZXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXhpc3RpbmcgYDxtZXRhPmAgdGFnIGVsZW1lbnQgZnJvbSB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gYXR0clNlbGVjdG9yIEEgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgdG8gaWRlbnRpZnlcbiAgICogYW4gZXhpc3RpbmcgdGFnLiBBIHN0cmluZyBpbiB0aGUgZm9ybWF0IGBcInRhZ19hdHRyaWJ1dGU9YHZhbHVlIHN0cmluZ2BcImAuXG4gICAqL1xuICByZW1vdmVUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVRhZ0VsZW1lbnQodGhpcy5nZXRUYWcoYXR0clNlbGVjdG9yKSEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZXhpc3RpbmcgYDxtZXRhPmAgdGFnIGVsZW1lbnQgZnJvbSB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gbWV0YSBUaGUgdGFnIGRlZmluaXRpb24gdG8gbWF0Y2ggYWdhaW5zdCB0byBpZGVudGlmeSBhbiBleGlzdGluZyB0YWcuXG4gICAqL1xuICByZW1vdmVUYWdFbGVtZW50KG1ldGE6IEhUTUxNZXRhRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChtZXRhKSB7XG4gICAgICB0aGlzLl9kb20ucmVtb3ZlKG1ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE9yQ3JlYXRlRWxlbWVudChtZXRhOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTpcbiAgICAgIEhUTUxNZXRhRWxlbWVudCB7XG4gICAgaWYgKCFmb3JjZUNyZWF0aW9uKSB7XG4gICAgICBjb25zdCBzZWxlY3Rvcjogc3RyaW5nID0gdGhpcy5fcGFyc2VTZWxlY3RvcihtZXRhKTtcbiAgICAgIC8vIEl0J3MgYWxsb3dlZCB0byBoYXZlIG11bHRpcGxlIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgbmFtZSBzbyBpdCdzIG5vdCBlbm91Z2ggdG9cbiAgICAgIC8vIGp1c3QgY2hlY2sgdGhhdCBlbGVtZW50IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IHByZXNlbnQgb24gdGhlIHBhZ2UuIFdlIGFsc28gbmVlZCB0b1xuICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBoYXMgdGFnIGF0dHJpYnV0ZXNcbiAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmdldFRhZ3Moc2VsZWN0b3IpLmZpbHRlcihlbGVtID0+IHRoaXMuX2NvbnRhaW5zQXR0cmlidXRlcyhtZXRhLCBlbGVtKSlbMF07XG4gICAgICBpZiAoZWxlbSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudDogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fZG9tLmNyZWF0ZUVsZW1lbnQoJ21ldGEnKSBhcyBIVE1MTWV0YUVsZW1lbnQ7XG4gICAgdGhpcy5fc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKG1ldGEsIGVsZW1lbnQpO1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLl9kb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZzogTWV0YURlZmluaXRpb24sIGVsOiBIVE1MTWV0YUVsZW1lbnQpOiBIVE1MTWV0YUVsZW1lbnQge1xuICAgIE9iamVjdC5rZXlzKHRhZykuZm9yRWFjaChcbiAgICAgICAgKHByb3A6IHN0cmluZykgPT4gZWwuc2V0QXR0cmlidXRlKHRoaXMuX2dldE1ldGFLZXlNYXAocHJvcCksIHRhZ1twcm9wXSkpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlU2VsZWN0b3IodGFnOiBNZXRhRGVmaW5pdGlvbik6IHN0cmluZyB7XG4gICAgY29uc3QgYXR0cjogc3RyaW5nID0gdGFnLm5hbWUgPyAnbmFtZScgOiAncHJvcGVydHknO1xuICAgIHJldHVybiBgJHthdHRyfT1cIiR7dGFnW2F0dHJdfVwiYDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5zQXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbGVtOiBIVE1MTWV0YUVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGFnKS5ldmVyeShcbiAgICAgICAgKGtleTogc3RyaW5nKSA9PiBlbGVtLmdldEF0dHJpYnV0ZSh0aGlzLl9nZXRNZXRhS2V5TWFwKGtleSkpID09PSB0YWdba2V5XSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNZXRhS2V5TWFwKHByb3A6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1FVEFfS0VZU19NQVBbcHJvcF0gfHwgcHJvcDtcbiAgfVxufVxuXG4vKipcbiAqIE1hcHBpbmcgZm9yIE1ldGFEZWZpbml0aW9uIHByb3BlcnRpZXMgd2l0aCB0aGVpciBjb3JyZWN0IG1ldGEgYXR0cmlidXRlIG5hbWVzXG4gKi9cbmNvbnN0IE1FVEFfS0VZU19NQVA6IHtbcHJvcDogc3RyaW5nXTogc3RyaW5nO30gPSB7XG4gIGh0dHBFcXVpdjogJ2h0dHAtZXF1aXYnXG59O1xuIl19