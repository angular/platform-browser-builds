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
import { ɵgetDOM as getDOM } from '@angular/common';
import { NgZone, ɵglobal as global } from '@angular/core';
/** @type {?} */
export let browserDetection;
export class BrowserDetection {
    /**
     * @private
     * @return {?}
     */
    get _ua() {
        if (typeof this._overrideUa === 'string') {
            return this._overrideUa;
        }
        return getDOM() ? getDOM().getUserAgent() : '';
    }
    /**
     * @return {?}
     */
    static setup() { browserDetection = new BrowserDetection(null); }
    /**
     * @param {?} ua
     */
    constructor(ua) { this._overrideUa = ua; }
    /**
     * @return {?}
     */
    get isFirefox() { return this._ua.indexOf('Firefox') > -1; }
    /**
     * @return {?}
     */
    get isAndroid() {
        return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
            this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isEdge() { return this._ua.indexOf('Edge') > -1; }
    /**
     * @return {?}
     */
    get isIE() { return this._ua.indexOf('Trident') > -1; }
    /**
     * @return {?}
     */
    get isWebkit() {
        return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isIOS7() {
        return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
            this._ua.indexOf('IEMobile') == -1;
    }
    /**
     * @return {?}
     */
    get isSlow() { return this.isAndroid || this.isIE || this.isIOS7; }
    // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
    // This detector is needed in tests to make the difference between:
    // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
    // 2) IE9/IE10: they use the polyfill, and so no discrepancies
    /**
     * @return {?}
     */
    get supportsNativeIntlApi() {
        return !!((/** @type {?} */ (global))).Intl && ((/** @type {?} */ (global))).Intl !== ((/** @type {?} */ (global))).IntlPolyfill;
    }
    /**
     * @return {?}
     */
    get isChromeDesktop() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
    // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
    /**
     * @return {?}
     */
    get isOldChrome() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    /**
     * @return {?}
     */
    get supportsCustomElements() { return (typeof ((/** @type {?} */ (global))).customElements !== 'undefined'); }
    /**
     * @return {?}
     */
    get supportsDeprecatedCustomCustomElementsV0() {
        return (typeof ((/** @type {?} */ (document))).registerElement !== 'undefined');
    }
    /**
     * @return {?}
     */
    get supportsRegExUnicodeFlag() { return RegExp.prototype.hasOwnProperty('unicode'); }
    /**
     * @return {?}
     */
    get supportsShadowDom() {
        /** @type {?} */
        const testEl = document.createElement('div');
        return (typeof testEl.attachShadow !== 'undefined');
    }
    /**
     * @return {?}
     */
    get supportsDeprecatedShadowDomV0() {
        /** @type {?} */
        const testEl = (/** @type {?} */ (document.createElement('div')));
        return (typeof testEl.createShadowRoot !== 'undefined');
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrowserDetection.prototype._overrideUa;
}
BrowserDetection.setup();
/**
 * @param {?} element
 * @param {?} eventType
 * @return {?}
 */
export function dispatchEvent(element, eventType) {
    /** @type {?} */
    const evt = getDOM().getDefaultDocument().createEvent('Event');
    evt.initEvent(eventType, true, true);
    getDOM().dispatchEvent(element, evt);
}
/**
 * @param {?} eventType
 * @return {?}
 */
export function createMouseEvent(eventType) {
    /** @type {?} */
    const evt = getDOM().getDefaultDocument().createEvent('MouseEvent');
    evt.initEvent(eventType, true, true);
    return evt;
}
/**
 * @param {?} html
 * @return {?}
 */
export function el(html) {
    return (/** @type {?} */ (getContent(createTemplate(html)).firstChild));
}
/**
 * @param {?} css
 * @return {?}
 */
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (/**
     * @param {...?} match
     * @return {?}
     */
    (...match) => `url("${match[2]}")`))
        .replace(/\[(.+)=([^"\]]+)\]/g, (/**
     * @param {...?} match
     * @return {?}
     */
    (...match) => `[${match[1]}="${match[2]}"]`));
}
/**
 * @param {?} element
 * @return {?}
 */
function getAttributeMap(element) {
    /** @type {?} */
    const res = new Map();
    /** @type {?} */
    const elAttrs = element.attributes;
    for (let i = 0; i < elAttrs.length; i++) {
        /** @type {?} */
        const attrib = elAttrs.item(i);
        res.set(attrib.name, attrib.value);
    }
    return res;
}
/** @type {?} */
const _selfClosingTags = ['br', 'hr', 'input'];
/**
 * @param {?} el
 * @return {?}
 */
export function stringifyElement(el /** TODO #9100 */) {
    /** @type {?} */
    let result = '';
    if (getDOM().isElementNode(el)) {
        /** @type {?} */
        const tagName = el.tagName.toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        /** @type {?} */
        const attributeMap = getAttributeMap(el);
        /** @type {?} */
        const sortedKeys = Array.from(attributeMap.keys()).sort();
        for (const key of sortedKeys) {
            /** @type {?} */
            const lowerCaseKey = key.toLowerCase();
            /** @type {?} */
            let attValue = attributeMap.get(key);
            if (typeof attValue !== 'string') {
                result += ` ${lowerCaseKey}`;
            }
            else {
                // Browsers order style rules differently. Order them alphabetically for consistency.
                if (lowerCaseKey === 'style') {
                    attValue = attValue.split(/; ?/).filter((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => !!s)).sort().map((/**
                     * @param {?} s
                     * @return {?}
                     */
                    s => `${s};`)).join(' ');
                }
                result += ` ${lowerCaseKey}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        /** @type {?} */
        const childrenRoot = templateAwareRoot(el);
        /** @type {?} */
        const children = childrenRoot ? childrenRoot.childNodes : [];
        for (let j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_selfClosingTags.indexOf(tagName) == -1) {
            result += `</${tagName}>`;
        }
    }
    else if (isCommentNode(el)) {
        result += `<!--${el.nodeValue}-->`;
    }
    else {
        result += el.textContent;
    }
    return result;
}
/**
 * @return {?}
 */
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
/**
 * @param {?} node
 * @return {?}
 */
export function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
/**
 * @param {?} node
 * @return {?}
 */
export function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
/**
 * @param {?} node
 * @return {?}
 */
export function getContent(node) {
    if ('content' in node) {
        return ((/** @type {?} */ (node))).content;
    }
    else {
        return node;
    }
}
/**
 * @param {?} el
 * @return {?}
 */
export function templateAwareRoot(el) {
    return getDOM().isElementNode(el) && el.nodeName === 'TEMPLATE' ? getContent(el) : el;
}
/**
 * @param {?} name
 * @param {?} value
 * @return {?}
 */
export function setCookie(name, value) {
    // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
    // not clear other cookies.
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
/**
 * @return {?}
 */
export function supportsWebAnimation() {
    return typeof ((/** @type {?} */ (Element))).prototype['animate'] === 'function';
}
/**
 * @param {?} element
 * @param {?} styleName
 * @param {?=} styleValue
 * @return {?}
 */
export function hasStyle(element, styleName, styleValue) {
    /** @type {?} */
    const value = element.style[styleName] || '';
    return styleValue ? value == styleValue : value.length > 0;
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
export function hasClass(element, className) {
    return element.classList.contains(className);
}
/**
 * @param {?} element
 * @return {?}
 */
export function sortedClassList(element) {
    return Array.prototype.slice.call(element.classList, 0).sort();
}
/**
 * @param {?} html
 * @return {?}
 */
export function createTemplate(html) {
    /** @type {?} */
    const t = getDOM().getDefaultDocument().createElement('template');
    t.innerHTML = html;
    return t;
}
/**
 * @param {?} el
 * @return {?}
 */
export function childNodesAsList(el) {
    /** @type {?} */
    const childNodes = el.childNodes;
    /** @type {?} */
    const res = [];
    for (let i = 0; i < childNodes.length; i++) {
        res[i] = childNodes[i];
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFeEQsTUFBTSxLQUFLLGdCQUFrQztBQUU3QyxNQUFNLE9BQU8sZ0JBQWdCOzs7OztJQUUzQixJQUFZLEdBQUc7UUFDYixJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDeEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsTUFBTSxDQUFDLEtBQUssS0FBSyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUVqRSxZQUFZLEVBQWUsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFdkQsSUFBSSxTQUFTLEtBQWMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFckUsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU0sS0FBYyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUUvRCxJQUFJLElBQUksS0FBYyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUVoRSxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU0sS0FBYyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFNNUUsSUFBSSxxQkFBcUI7UUFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQUssTUFBTSxFQUFBLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDbkYsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFJRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7O0lBRUQsSUFBSSxzQkFBc0IsS0FBSyxPQUFPLENBQUMsT0FBTSxDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsY0FBYyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUU3RixJQUFJLHdDQUF3QztRQUMxQyxPQUFPLENBQUMsT0FBTSxDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLENBQUMsZUFBZSxLQUFLLFdBQVcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7SUFFRCxJQUFJLHdCQUF3QixLQUFjLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTlGLElBQUksaUJBQWlCOztjQUNiLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1QyxPQUFPLENBQUMsT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7SUFFRCxJQUFJLDZCQUE2Qjs7Y0FDekIsTUFBTSxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQU87UUFDbkQsT0FBTyxDQUFDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjs7Ozs7O0lBMUVDLHVDQUFpQzs7QUE0RW5DLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDOzs7Ozs7QUFFekIsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUFZLEVBQUUsU0FBYzs7VUFDbEQsR0FBRyxHQUFVLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUNyRSxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxTQUFpQjs7VUFDMUMsR0FBRyxHQUFlLE1BQU0sRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUMvRSxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxFQUFFLENBQUMsSUFBWTtJQUM3QixPQUFPLG1CQUFhLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUEsQ0FBQztBQUNsRSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUMxQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztTQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztTQUNuQixPQUFPLENBQUMsaUNBQWlDOzs7O0lBQUUsQ0FBQyxHQUFHLEtBQWUsRUFBRSxFQUFFLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBQztTQUN4RixPQUFPLENBQUMscUJBQXFCOzs7O0lBQUUsQ0FBQyxHQUFHLEtBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQztBQUM3RixDQUFDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLE9BQVk7O1VBQzdCLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBa0I7O1VBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVTtJQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Y0FDakMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7O01BRUssZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzs7Ozs7QUFDOUMsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEVBQU8sQ0FBQyxpQkFBaUI7O1FBQ3BELE1BQU0sR0FBRyxFQUFFO0lBQ2YsSUFBSSxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQUU7O2NBQ3hCLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtRQUV4QyxjQUFjO1FBQ2QsTUFBTSxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7OztjQUdsQixZQUFZLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQzs7Y0FDbEMsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO1FBQ3pELEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFOztrQkFDdEIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUU7O2dCQUNsQyxRQUFRLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFcEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSxJQUFJLFlBQVksRUFBRSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLHFGQUFxRjtnQkFDckYsSUFBSSxZQUFZLEtBQUssT0FBTyxFQUFFO29CQUM1QixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUc7Ozs7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0RjtnQkFFRCxNQUFNLElBQUksSUFBSSxZQUFZLEtBQUssUUFBUSxHQUFHLENBQUM7YUFDNUM7U0FDRjtRQUNELE1BQU0sSUFBSSxHQUFHLENBQUM7OztjQUdSLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7O2NBQ3BDLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsY0FBYztRQUNkLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sSUFBSSxLQUFLLE9BQU8sR0FBRyxDQUFDO1NBQzNCO0tBQ0Y7U0FBTSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUM1QixNQUFNLElBQUksT0FBTyxFQUFFLENBQUMsU0FBUyxLQUFLLENBQUM7S0FDcEM7U0FBTTtRQUNMLE1BQU0sSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO0tBQzFCO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sSUFBSSxNQUFNLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFVO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQzdDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVO0lBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQzFDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFVO0lBQ25DLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtRQUNyQixPQUFPLENBQUMsbUJBQUssSUFBSSxFQUFBLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDNUI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDO0tBQ2I7QUFDSCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxFQUFRO0lBQ3hDLE9BQU8sTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN4RixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhO0lBQ25ELDZGQUE2RjtJQUM3RiwyQkFBMkI7SUFDM0IsUUFBUSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0UsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxPQUFNLENBQUMsbUJBQUssT0FBTyxFQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssVUFBVSxDQUFDO0FBQ2xFLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE9BQVksRUFBRSxTQUFpQixFQUFFLFVBQTBCOztVQUM1RSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO0lBQzVDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM3RCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE9BQVksRUFBRSxTQUFpQjtJQUN0RCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9DLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxPQUFZO0lBQzFDLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLElBQVM7O1VBQ2hDLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDakUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDbkIsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxFQUFROztVQUNqQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQVU7O1VBQzFCLEdBQUcsR0FBRyxFQUFFO0lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nWm9uZSwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGxldCBicm93c2VyRGV0ZWN0aW9uOiBCcm93c2VyRGV0ZWN0aW9uO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGVjdGlvbiB7XG4gIHByaXZhdGUgX292ZXJyaWRlVWE6IHN0cmluZ3xudWxsO1xuICBwcml2YXRlIGdldCBfdWEoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX292ZXJyaWRlVWEgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3ZlcnJpZGVVYTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RE9NKCkgPyBnZXRET00oKS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICB9XG5cbiAgc3RhdGljIHNldHVwKCkgeyBicm93c2VyRGV0ZWN0aW9uID0gbmV3IEJyb3dzZXJEZXRlY3Rpb24obnVsbCk7IH1cblxuICBjb25zdHJ1Y3Rvcih1YTogc3RyaW5nfG51bGwpIHsgdGhpcy5fb3ZlcnJpZGVVYSA9IHVhOyB9XG5cbiAgZ2V0IGlzRmlyZWZveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzRWRnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzSUUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdUcmlkZW50JykgPiAtMTsgfVxuXG4gIGdldCBpc1dlYmtpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX3VhLmluZGV4T2YoJ2lQaG9uZSBPUyA3JykgPiAtMSB8fCB0aGlzLl91YS5pbmRleE9mKCdpUGFkIE9TIDcnKSA+IC0xKSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzU2xvdygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMuaXNJRSB8fCB0aGlzLmlzSU9TNzsgfVxuXG4gIC8vIFRoZSBJbnRsIEFQSSBpcyBvbmx5IG5hdGl2ZWx5IHN1cHBvcnRlZCBpbiBDaHJvbWUsIEZpcmVmb3gsIElFMTEgYW5kIEVkZ2UuXG4gIC8vIFRoaXMgZGV0ZWN0b3IgaXMgbmVlZGVkIGluIHRlc3RzIHRvIG1ha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbjpcbiAgLy8gMSkgSUUxMS9FZGdlOiB0aGV5IGhhdmUgYSBuYXRpdmUgSW50bCBBUEksIGJ1dCB3aXRoIHNvbWUgZGlzY3JlcGFuY2llc1xuICAvLyAyKSBJRTkvSUUxMDogdGhleSB1c2UgdGhlIHBvbHlmaWxsLCBhbmQgc28gbm8gZGlzY3JlcGFuY2llc1xuICBnZXQgc3VwcG9ydHNOYXRpdmVJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISg8YW55Pmdsb2JhbCkuSW50bCAmJiAoPGFueT5nbG9iYWwpLkludGwgIT09ICg8YW55Pmdsb2JhbCkuSW50bFBvbHlmaWxsO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lRGVza3RvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgLy8gXCJPbGQgQ2hyb21lXCIgbWVhbnMgQ2hyb21lIDNYLCB3aGVyZSB0aGVyZSBhcmUgc29tZSBkaXNjcmVwYW5jaWVzIGluIHRoZSBJbnRsIEFQSS5cbiAgLy8gQW5kcm9pZCA0LjQgYW5kIDUuWCBoYXZlIHN1Y2ggYnJvd3NlcnMgYnkgZGVmYXVsdCAocmVzcGVjdGl2ZWx5IDMwIGFuZCAzOSkuXG4gIGdldCBpc09sZENocm9tZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvMycpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IHN1cHBvcnRzQ3VzdG9tRWxlbWVudHMoKSB7IHJldHVybiAodHlwZW9mKDxhbnk+Z2xvYmFsKS5jdXN0b21FbGVtZW50cyAhPT0gJ3VuZGVmaW5lZCcpOyB9XG5cbiAgZ2V0IHN1cHBvcnRzRGVwcmVjYXRlZEN1c3RvbUN1c3RvbUVsZW1lbnRzVjAoKSB7XG4gICAgcmV0dXJuICh0eXBlb2YoZG9jdW1lbnQgYXMgYW55KS5yZWdpc3RlckVsZW1lbnQgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c1JlZ0V4VW5pY29kZUZsYWcoKTogYm9vbGVhbiB7IHJldHVybiBSZWdFeHAucHJvdG90eXBlLmhhc093blByb3BlcnR5KCd1bmljb2RlJyk7IH1cblxuICBnZXQgc3VwcG9ydHNTaGFkb3dEb20oKSB7XG4gICAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmV0dXJuICh0eXBlb2YgdGVzdEVsLmF0dGFjaFNoYWRvdyAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cbiAgZ2V0IHN1cHBvcnRzRGVwcmVjYXRlZFNoYWRvd0RvbVYwKCkge1xuICAgIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIGFueTtcbiAgICByZXR1cm4gKHR5cGVvZiB0ZXN0RWwuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG59XG5cbkJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudDogYW55LCBldmVudFR5cGU6IGFueSk6IHZvaWQge1xuICBjb25zdCBldnQ6IEV2ZW50ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgZ2V0RE9NKCkuZGlzcGF0Y2hFdmVudChlbGVtZW50LCBldnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IHN0cmluZyk6IE1vdXNlRXZlbnQge1xuICBjb25zdCBldnQ6IE1vdXNlRXZlbnQgPSBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHJldHVybiBldnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIHJldHVybiA8SFRNTEVsZW1lbnQ+Z2V0Q29udGVudChjcmVhdGVUZW1wbGF0ZShodG1sKSkuZmlyc3RDaGlsZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNTUyhjc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjc3MucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvOlxccy9nLCAnOicpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnXCInKVxuICAgICAgLnJlcGxhY2UoLyB9L2csICd9JylcbiAgICAgIC5yZXBsYWNlKC91cmxcXCgoXFxcInxcXHMpKC4rKShcXFwifFxccylcXCkoXFxzKikvZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYHVybChcIiR7bWF0Y2hbMl19XCIpYClcbiAgICAgIC5yZXBsYWNlKC9cXFsoLispPShbXlwiXFxdXSspXFxdL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGBbJHttYXRjaFsxXX09XCIke21hdGNoWzJdfVwiXWApO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVNYXAoZWxlbWVudDogYW55KTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGNvbnN0IHJlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IGVsQXR0cnMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGF0dHJpYiA9IGVsQXR0cnMuaXRlbShpKTtcbiAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmNvbnN0IF9zZWxmQ2xvc2luZ1RhZ3MgPSBbJ2JyJywgJ2hyJywgJ2lucHV0J107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5RWxlbWVudChlbDogYW55IC8qKiBUT0RPICM5MTAwICovKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShlbCkpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gT3BlbmluZyB0YWdcbiAgICByZXN1bHQgKz0gYDwke3RhZ05hbWV9YDtcblxuICAgIC8vIEF0dHJpYnV0ZXMgaW4gYW4gb3JkZXJlZCB3YXlcbiAgICBjb25zdCBhdHRyaWJ1dGVNYXAgPSBnZXRBdHRyaWJ1dGVNYXAoZWwpO1xuICAgIGNvbnN0IHNvcnRlZEtleXMgPSBBcnJheS5mcm9tKGF0dHJpYnV0ZU1hcC5rZXlzKCkpLnNvcnQoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBzb3J0ZWRLZXlzKSB7XG4gICAgICBjb25zdCBsb3dlckNhc2VLZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCBhdHRWYWx1ZSA9IGF0dHJpYnV0ZU1hcC5nZXQoa2V5KTtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRWYWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtsb3dlckNhc2VLZXl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIG9yZGVyIHN0eWxlIHJ1bGVzIGRpZmZlcmVudGx5LiBPcmRlciB0aGVtIGFscGhhYmV0aWNhbGx5IGZvciBjb25zaXN0ZW5jeS5cbiAgICAgICAgaWYgKGxvd2VyQ2FzZUtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgIGF0dFZhbHVlID0gYXR0VmFsdWUuc3BsaXQoLzsgPy8pLmZpbHRlcihzID0+ICEhcykuc29ydCgpLm1hcChzID0+IGAke3N9O2ApLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fT1cIiR7YXR0VmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJz4nO1xuXG4gICAgLy8gQ2hpbGRyZW5cbiAgICBjb25zdCBjaGlsZHJlblJvb3QgPSB0ZW1wbGF0ZUF3YXJlUm9vdChlbCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBjaGlsZHJlblJvb3QgPyBjaGlsZHJlblJvb3QuY2hpbGROb2RlcyA6IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlFbGVtZW50KGNoaWxkcmVuW2pdKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHRhZ1xuICAgIGlmIChfc2VsZkNsb3NpbmdUYWdzLmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgICAgIHJlc3VsdCArPSBgPC8ke3RhZ05hbWV9PmA7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgcmVzdWx0ICs9IGA8IS0tJHtlbC5ub2RlVmFsdWV9LS0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gZWwudGV4dENvbnRlbnQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogdHJ1ZX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21tZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgaWYgKCdjb250ZW50JyBpbiBub2RlKSB7XG4gICAgcmV0dXJuICg8YW55Pm5vZGUpLmNvbnRlbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlQXdhcmVSb290KGVsOiBOb2RlKTogYW55IHtcbiAgcmV0dXJuIGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpICYmIGVsLm5vZGVOYW1lID09PSAnVEVNUExBVEUnID8gZ2V0Q29udGVudChlbCkgOiBlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gZG9jdW1lbnQuY29va2llIGlzIG1hZ2ljYWwsIGFzc2lnbmluZyBpbnRvIGl0IGFzc2lnbnMvb3ZlcnJpZGVzIG9uZSBjb29raWUgdmFsdWUsIGJ1dCBkb2VzXG4gIC8vIG5vdCBjbGVhciBvdGhlciBjb29raWVzLlxuICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YoPGFueT5FbGVtZW50KS5wcm90b3R5cGVbJ2FuaW1hdGUnXSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XG4gIGNvbnN0IHZhbHVlID0gZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdIHx8ICcnO1xuICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZENsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCwgMCkuc29ydCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoaHRtbDogYW55KTogSFRNTEVsZW1lbnQge1xuICBjb25zdCB0ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgdC5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTm9kZXNBc0xpc3QoZWw6IE5vZGUpOiBhbnlbXSB7XG4gIGNvbnN0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuICBjb25zdCByZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2ldID0gY2hpbGROb2Rlc1tpXTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl19