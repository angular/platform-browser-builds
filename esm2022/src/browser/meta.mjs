/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: Meta, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: Meta, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: Meta, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUE2QixPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBMEJqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSxPQUFPLElBQUk7SUFFZixZQUFzQyxJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLENBQUMsR0FBbUIsRUFBRSxnQkFBeUIsS0FBSztRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxJQUFzQixFQUFFLGdCQUF5QixLQUFLO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBeUIsRUFBRSxHQUFtQixFQUFFLEVBQUU7WUFDcEUsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFF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QUMsT0FBTyxDQUNwQixDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU8sY0FBYyxDQUFDLEdBQW1CO1FBQ3hDLE1BQU0sSUFBSSxHQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3BELE9BQU8sR0FBRyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEMsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEdBQW1CLEVBQUUsSUFBcUI7UUFDcEUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDekIsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTyxjQUFjLENBQUMsSUFBWTtRQUNqQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckMsQ0FBQzt5SEF0SVUsSUFBSSxrQkFFSyxRQUFROzZIQUZqQixJQUFJLGNBRFEsTUFBTTs7c0dBQ2xCLElBQUk7a0JBRGhCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFHakIsTUFBTTsyQkFBQyxRQUFROztBQXVJOUI7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBOEI7SUFDL0MsU0FBUyxFQUFFLFlBQVk7Q0FDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtURvbUFkYXB0ZXIgYXMgRG9tQWRhcHRlciwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGF0dHJpYnV0ZXMgb2YgYW4gSFRNTCBgPG1ldGE+YCBlbGVtZW50LiBUaGUgZWxlbWVudCBpdHNlbGYgaXNcbiAqIHJlcHJlc2VudGVkIGJ5IHRoZSBpbnRlcm5hbCBgSFRNTE1ldGFFbGVtZW50YC5cbiAqXG4gKiBAc2VlIFtIVE1MIG1ldGEgdGFnXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvbWV0YSlcbiAqIEBzZWUge0BsaW5rIE1ldGF9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBNZXRhRGVmaW5pdGlvbiA9IHtcbiAgY2hhcnNldD86IHN0cmluZztcbiAgY29udGVudD86IHN0cmluZztcbiAgaHR0cEVxdWl2Pzogc3RyaW5nO1xuICBpZD86IHN0cmluZztcbiAgaXRlbXByb3A/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHByb3BlcnR5Pzogc3RyaW5nO1xuICBzY2hlbWU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbn0me1xuICAvLyBUT0RPKElnb3JNaW5hcik6IHRoaXMgdHlwZSBsb29rcyB3cm9uZ1xuICBbcHJvcDogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG1hbmFnaW5nIEhUTUwgYDxtZXRhPmAgdGFncy5cbiAqXG4gKiBQcm9wZXJ0aWVzIG9mIHRoZSBgTWV0YURlZmluaXRpb25gIG9iamVjdCBtYXRjaCB0aGUgYXR0cmlidXRlcyBvZiB0aGVcbiAqIEhUTUwgYDxtZXRhPmAgdGFnLiBUaGVzZSB0YWdzIGRlZmluZSBkb2N1bWVudCBtZXRhZGF0YSB0aGF0IGlzIGltcG9ydGFudCBmb3JcbiAqIHRoaW5ncyBsaWtlIGNvbmZpZ3VyaW5nIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3ksIGRlZmluaW5nIGJyb3dzZXIgY29tcGF0aWJpbGl0eVxuICogYW5kIHNlY3VyaXR5IHNldHRpbmdzLCBzZXR0aW5nIEhUVFAgSGVhZGVycywgZGVmaW5pbmcgcmljaCBjb250ZW50IGZvciBzb2NpYWwgc2hhcmluZyxcbiAqIGFuZCBTZWFyY2ggRW5naW5lIE9wdGltaXphdGlvbiAoU0VPKS5cbiAqXG4gKiBUbyBpZGVudGlmeSBzcGVjaWZpYyBgPG1ldGE+YCB0YWdzIGluIGEgZG9jdW1lbnQsIHVzZSBhbiBhdHRyaWJ1dGUgc2VsZWN0aW9uXG4gKiBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgXCJ0YWdfYXR0cmlidXRlPSd2YWx1ZSBzdHJpbmcnXCJgLlxuICogRm9yIGV4YW1wbGUsIGFuIGBhdHRyU2VsZWN0b3JgIHZhbHVlIG9mIGBcIm5hbWU9J2Rlc2NyaXB0aW9uJ1wiYCBtYXRjaGVzIGEgdGFnXG4gKiB3aG9zZSBgbmFtZWAgYXR0cmlidXRlIGhhcyB0aGUgdmFsdWUgYFwiZGVzY3JpcHRpb25cImAuXG4gKiBTZWxlY3RvcnMgYXJlIHVzZWQgd2l0aCB0aGUgYHF1ZXJ5U2VsZWN0b3IoKWAgRG9jdW1lbnQgbWV0aG9kLFxuICogaW4gdGhlIGZvcm1hdCBgbWV0YVt7YXR0clNlbGVjdG9yfV1gLlxuICpcbiAqIEBzZWUgW0hUTUwgbWV0YSB0YWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9tZXRhKVxuICogQHNlZSBbRG9jdW1lbnQucXVlcnlTZWxlY3RvcigpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvcXVlcnlTZWxlY3RvcilcbiAqXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBNZXRhIHtcbiAgcHJpdmF0ZSBfZG9tOiBEb21BZGFwdGVyO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHRoaXMuX2RvbSA9IGdldERPTSgpO1xuICB9XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgb3IgY3JlYXRlcyBhIHNwZWNpZmljIGA8bWV0YT5gIHRhZyBlbGVtZW50IGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEluIHNlYXJjaGluZyBmb3IgYW4gZXhpc3RpbmcgdGFnLCBBbmd1bGFyIGF0dGVtcHRzIHRvIG1hdGNoIHRoZSBgbmFtZWAgb3IgYHByb3BlcnR5YCBhdHRyaWJ1dGVcbiAgICogdmFsdWVzIGluIHRoZSBwcm92aWRlZCB0YWcgZGVmaW5pdGlvbiwgYW5kIHZlcmlmaWVzIHRoYXQgYWxsIG90aGVyIGF0dHJpYnV0ZSB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgKiBJZiBhbiBleGlzdGluZyBlbGVtZW50IGlzIGZvdW5kLCBpdCBpcyByZXR1cm5lZCBhbmQgaXMgbm90IG1vZGlmaWVkIGluIGFueSB3YXkuXG4gICAqIEBwYXJhbSB0YWcgVGhlIGRlZmluaXRpb24gb2YgYSBgPG1ldGE+YCBlbGVtZW50IHRvIG1hdGNoIG9yIGNyZWF0ZS5cbiAgICogQHBhcmFtIGZvcmNlQ3JlYXRpb24gVHJ1ZSB0byBjcmVhdGUgYSBuZXcgZWxlbWVudCB3aXRob3V0IGNoZWNraW5nIHdoZXRoZXIgb25lIGFscmVhZHkgZXhpc3RzLlxuICAgKiBAcmV0dXJucyBUaGUgZXhpc3RpbmcgZWxlbWVudCB3aXRoIHRoZSBzYW1lIGF0dHJpYnV0ZXMgYW5kIHZhbHVlcyBpZiBmb3VuZCxcbiAgICogdGhlIG5ldyBlbGVtZW50IGlmIG5vIG1hdGNoIGlzIGZvdW5kLCBvciBgbnVsbGAgaWYgdGhlIHRhZyBwYXJhbWV0ZXIgaXMgbm90IGRlZmluZWQuXG4gICAqL1xuICBhZGRUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghdGFnKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIG9yIGNyZWF0ZXMgYSBzZXQgb2YgYDxtZXRhPmAgdGFnIGVsZW1lbnRzIGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEluIHNlYXJjaGluZyBmb3IgYW4gZXhpc3RpbmcgdGFnLCBBbmd1bGFyIGF0dGVtcHRzIHRvIG1hdGNoIHRoZSBgbmFtZWAgb3IgYHByb3BlcnR5YCBhdHRyaWJ1dGVcbiAgICogdmFsdWVzIGluIHRoZSBwcm92aWRlZCB0YWcgZGVmaW5pdGlvbiwgYW5kIHZlcmlmaWVzIHRoYXQgYWxsIG90aGVyIGF0dHJpYnV0ZSB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgKiBAcGFyYW0gdGFncyBBbiBhcnJheSBvZiB0YWcgZGVmaW5pdGlvbnMgdG8gbWF0Y2ggb3IgY3JlYXRlLlxuICAgKiBAcGFyYW0gZm9yY2VDcmVhdGlvbiBUcnVlIHRvIGNyZWF0ZSBuZXcgZWxlbWVudHMgd2l0aG91dCBjaGVja2luZyB3aGV0aGVyIHRoZXkgYWxyZWFkeSBleGlzdC5cbiAgICogQHJldHVybnMgVGhlIG1hdGNoaW5nIGVsZW1lbnRzIGlmIGZvdW5kLCBvciB0aGUgbmV3IGVsZW1lbnRzLlxuICAgKi9cbiAgYWRkVGFncyh0YWdzOiBNZXRhRGVmaW5pdGlvbltdLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOiBIVE1MTWV0YUVsZW1lbnRbXSB7XG4gICAgaWYgKCF0YWdzKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHRhZ3MucmVkdWNlKChyZXN1bHQ6IEhUTUxNZXRhRWxlbWVudFtdLCB0YWc6IE1ldGFEZWZpbml0aW9uKSA9PiB7XG4gICAgICBpZiAodGFnKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIGZvcmNlQ3JlYXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIGA8bWV0YT5gIHRhZyBlbGVtZW50IGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBhdHRyU2VsZWN0b3IgVGhlIHRhZyBhdHRyaWJ1dGUgYW5kIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QsIGluIHRoZSBmb3JtYXRcbiAgICogYFwidGFnX2F0dHJpYnV0ZT0ndmFsdWUgc3RyaW5nJ1wiYC5cbiAgICogQHJldHVybnMgVGhlIG1hdGNoaW5nIGVsZW1lbnQsIGlmIGFueS5cbiAgICovXG4gIGdldFRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX2RvYy5xdWVyeVNlbGVjdG9yKGBtZXRhWyR7YXR0clNlbGVjdG9yfV1gKSB8fCBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIHNldCBvZiBgPG1ldGE+YCB0YWcgZWxlbWVudHMgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIGF0dHJTZWxlY3RvciBUaGUgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgaW4gdGhlIGZvcm1hdFxuICAgKiBgXCJ0YWdfYXR0cmlidXRlPSd2YWx1ZSBzdHJpbmcnXCJgLlxuICAgKiBAcmV0dXJucyBUaGUgbWF0Y2hpbmcgZWxlbWVudHMsIGlmIGFueS5cbiAgICovXG4gIGdldFRhZ3MoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnRbXSB7XG4gICAgaWYgKCFhdHRyU2VsZWN0b3IpIHJldHVybiBbXTtcbiAgICBjb25zdCBsaXN0IC8qTm9kZUxpc3QqLyA9IHRoaXMuX2RvYy5xdWVyeVNlbGVjdG9yQWxsKGBtZXRhWyR7YXR0clNlbGVjdG9yfV1gKTtcbiAgICByZXR1cm4gbGlzdCA/IFtdLnNsaWNlLmNhbGwobGlzdCkgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZmllcyBhbiBleGlzdGluZyBgPG1ldGE+YCB0YWcgZWxlbWVudCBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gdGFnIFRoZSB0YWcgZGVzY3JpcHRpb24gd2l0aCB3aGljaCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0YWcgY29udGVudC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIEEgdGFnIGF0dHJpYnV0ZSBhbmQgdmFsdWUgdG8gbWF0Y2ggYWdhaW5zdCwgdG8gaWRlbnRpZnlcbiAgICogYW4gZXhpc3RpbmcgdGFnLiBBIHN0cmluZyBpbiB0aGUgZm9ybWF0IGBcInRhZ19hdHRyaWJ1dGU9YHZhbHVlIHN0cmluZ2BcImAuXG4gICAqIElmIG5vdCBzdXBwbGllZCwgbWF0Y2hlcyBhIHRhZyB3aXRoIHRoZSBzYW1lIGBuYW1lYCBvciBgcHJvcGVydHlgIGF0dHJpYnV0ZSB2YWx1ZSBhcyB0aGVcbiAgICogcmVwbGFjZW1lbnQgdGFnLlxuICAgKiBAcmV0dXJuIFRoZSBtb2RpZmllZCBlbGVtZW50LlxuICAgKi9cbiAgdXBkYXRlVGFnKHRhZzogTWV0YURlZmluaXRpb24sIHNlbGVjdG9yPzogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghdGFnKSByZXR1cm4gbnVsbDtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8IHRoaXMuX3BhcnNlU2VsZWN0b3IodGFnKTtcbiAgICBjb25zdCBtZXRhOiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLmdldFRhZyhzZWxlY3RvcikhO1xuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZywgbWV0YSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGV4aXN0aW5nIGA8bWV0YT5gIHRhZyBlbGVtZW50IGZyb20gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIGF0dHJTZWxlY3RvciBBIHRhZyBhdHRyaWJ1dGUgYW5kIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QsIHRvIGlkZW50aWZ5XG4gICAqIGFuIGV4aXN0aW5nIHRhZy4gQSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgXCJ0YWdfYXR0cmlidXRlPWB2YWx1ZSBzdHJpbmdgXCJgLlxuICAgKi9cbiAgcmVtb3ZlVGFnKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVUYWdFbGVtZW50KHRoaXMuZ2V0VGFnKGF0dHJTZWxlY3RvcikhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGV4aXN0aW5nIGA8bWV0YT5gIHRhZyBlbGVtZW50IGZyb20gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIG1ldGEgVGhlIHRhZyBkZWZpbml0aW9uIHRvIG1hdGNoIGFnYWluc3QgdG8gaWRlbnRpZnkgYW4gZXhpc3RpbmcgdGFnLlxuICAgKi9cbiAgcmVtb3ZlVGFnRWxlbWVudChtZXRhOiBIVE1MTWV0YUVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAobWV0YSkge1xuICAgICAgdGhpcy5fZG9tLnJlbW92ZShtZXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRPckNyZWF0ZUVsZW1lbnQobWV0YTogTWV0YURlZmluaXRpb24sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6XG4gICAgICBIVE1MTWV0YUVsZW1lbnQge1xuICAgIGlmICghZm9yY2VDcmVhdGlvbikge1xuICAgICAgY29uc3Qgc2VsZWN0b3I6IHN0cmluZyA9IHRoaXMuX3BhcnNlU2VsZWN0b3IobWV0YSk7XG4gICAgICAvLyBJdCdzIGFsbG93ZWQgdG8gaGF2ZSBtdWx0aXBsZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUgc28gaXQncyBub3QgZW5vdWdoIHRvXG4gICAgICAvLyBqdXN0IGNoZWNrIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBwYWdlLiBXZSBhbHNvIG5lZWQgdG9cbiAgICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIHRhZyBhdHRyaWJ1dGVzXG4gICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRUYWdzKHNlbGVjdG9yKS5maWx0ZXIoZWxlbSA9PiB0aGlzLl9jb250YWluc0F0dHJpYnV0ZXMobWV0YSwgZWxlbSkpWzBdO1xuICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuX2RvbS5jcmVhdGVFbGVtZW50KCdtZXRhJykgYXMgSFRNTE1ldGFFbGVtZW50O1xuICAgIHRoaXMuX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyhtZXRhLCBlbGVtZW50KTtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5fZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbDogSFRNTE1ldGFFbGVtZW50KTogSFRNTE1ldGFFbGVtZW50IHtcbiAgICBPYmplY3Qua2V5cyh0YWcpLmZvckVhY2goXG4gICAgICAgIChwcm9wOiBzdHJpbmcpID0+IGVsLnNldEF0dHJpYnV0ZSh0aGlzLl9nZXRNZXRhS2V5TWFwKHByb3ApLCB0YWdbcHJvcF0pKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVNlbGVjdG9yKHRhZzogTWV0YURlZmluaXRpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IGF0dHI6IHN0cmluZyA9IHRhZy5uYW1lID8gJ25hbWUnIDogJ3Byb3BlcnR5JztcbiAgICByZXR1cm4gYCR7YXR0cn09XCIke3RhZ1thdHRyXX1cImA7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluc0F0dHJpYnV0ZXModGFnOiBNZXRhRGVmaW5pdGlvbiwgZWxlbTogSFRNTE1ldGFFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRhZykuZXZlcnkoXG4gICAgICAgIChrZXk6IHN0cmluZykgPT4gZWxlbS5nZXRBdHRyaWJ1dGUodGhpcy5fZ2V0TWV0YUtleU1hcChrZXkpKSA9PT0gdGFnW2tleV0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TWV0YUtleU1hcChwcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBNRVRBX0tFWVNfTUFQW3Byb3BdIHx8IHByb3A7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXBwaW5nIGZvciBNZXRhRGVmaW5pdGlvbiBwcm9wZXJ0aWVzIHdpdGggdGhlaXIgY29ycmVjdCBtZXRhIGF0dHJpYnV0ZSBuYW1lc1xuICovXG5jb25zdCBNRVRBX0tFWVNfTUFQOiB7W3Byb3A6IHN0cmluZ106IHN0cmluZzt9ID0ge1xuICBodHRwRXF1aXY6ICdodHRwLWVxdWl2J1xufTtcbiJdfQ==