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
     * @param {?} ua
     */
    constructor(ua) { this._overrideUa = ua; }
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
    return new NgZone({ enableLongStackTrace: true, shouldCoalesceEventChangeDetection: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFeEQsTUFBTSxLQUFLLGdCQUFrQztBQUU3QyxNQUFNLE9BQU8sZ0JBQWdCOzs7O0lBWTNCLFlBQVksRUFBZSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFWdkQsSUFBWSxHQUFHO1FBQ2IsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN6QjtRQUVELE9BQU8sTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFJakUsSUFBSSxTQUFTLEtBQWMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFckUsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxT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LE1BQU0sVUFBVSxlQUFlLENBQUMsT0FBWTtJQUMxQyxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFTOztVQUNoQyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2pFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsRUFBUTs7VUFDakMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVOztVQUMxQixHQUFHLEdBQUcsRUFBRTtJQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ1pvbmUsIMm1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBsZXQgYnJvd3NlckRldGVjdGlvbjogQnJvd3NlckRldGVjdGlvbjtcblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJEZXRlY3Rpb24ge1xuICBwcml2YXRlIF9vdmVycmlkZVVhOiBzdHJpbmd8bnVsbDtcbiAgcHJpdmF0ZSBnZXQgX3VhKCk6IHN0cmluZyB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vdmVycmlkZVVhID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuX292ZXJyaWRlVWE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldERPTSgpID8gZ2V0RE9NKCkuZ2V0VXNlckFnZW50KCkgOiAnJztcbiAgfVxuXG4gIHN0YXRpYyBzZXR1cCgpIHsgYnJvd3NlckRldGVjdGlvbiA9IG5ldyBCcm93c2VyRGV0ZWN0aW9uKG51bGwpOyB9XG5cbiAgY29uc3RydWN0b3IodWE6IHN0cmluZ3xudWxsKSB7IHRoaXMuX292ZXJyaWRlVWEgPSB1YTsgfVxuXG4gIGdldCBpc0ZpcmVmb3goKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdGaXJlZm94JykgPiAtMTsgfVxuXG4gIGdldCBpc0FuZHJvaWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ01vemlsbGEvNS4wJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdBbmRyb2lkJykgPiAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0VkZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPiAtMTsgfVxuXG4gIGdldCBpc0lFKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignVHJpZGVudCcpID4gLTE7IH1cblxuICBnZXQgaXNXZWJraXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc0lPUzcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl91YS5pbmRleE9mKCdpUGhvbmUgT1MgNycpID4gLTEgfHwgdGhpcy5fdWEuaW5kZXhPZignaVBhZCBPUyA3JykgPiAtMSkgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignSUVNb2JpbGUnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBpc1Nsb3coKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzQW5kcm9pZCB8fCB0aGlzLmlzSUUgfHwgdGhpcy5pc0lPUzc7IH1cblxuICAvLyBUaGUgSW50bCBBUEkgaXMgb25seSBuYXRpdmVseSBzdXBwb3J0ZWQgaW4gQ2hyb21lLCBGaXJlZm94LCBJRTExIGFuZCBFZGdlLlxuICAvLyBUaGlzIGRldGVjdG9yIGlzIG5lZWRlZCBpbiB0ZXN0cyB0byBtYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW46XG4gIC8vIDEpIElFMTEvRWRnZTogdGhleSBoYXZlIGEgbmF0aXZlIEludGwgQVBJLCBidXQgd2l0aCBzb21lIGRpc2NyZXBhbmNpZXNcbiAgLy8gMikgSUU5L0lFMTA6IHRoZXkgdXNlIHRoZSBwb2x5ZmlsbCwgYW5kIHNvIG5vIGRpc2NyZXBhbmNpZXNcbiAgZ2V0IHN1cHBvcnRzTmF0aXZlSW50bEFwaSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoPGFueT5nbG9iYWwpLkludGwgJiYgKDxhbnk+Z2xvYmFsKS5JbnRsICE9PSAoPGFueT5nbG9iYWwpLkludGxQb2x5ZmlsbDtcbiAgfVxuXG4gIGdldCBpc0Nocm9tZURlc2t0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIC8vIFwiT2xkIENocm9tZVwiIG1lYW5zIENocm9tZSAzWCwgd2hlcmUgdGhlcmUgYXJlIHNvbWUgZGlzY3JlcGFuY2llcyBpbiB0aGUgSW50bCBBUEkuXG4gIC8vIEFuZHJvaWQgNC40IGFuZCA1LlggaGF2ZSBzdWNoIGJyb3dzZXJzIGJ5IGRlZmF1bHQgKHJlc3BlY3RpdmVseSAzMCBhbmQgMzkpLlxuICBnZXQgaXNPbGRDaHJvbWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lLzMnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0N1c3RvbUVsZW1lbnRzKCkgeyByZXR1cm4gKHR5cGVvZig8YW55Pmdsb2JhbCkuY3VzdG9tRWxlbWVudHMgIT09ICd1bmRlZmluZWQnKTsgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRDdXN0b21DdXN0b21FbGVtZW50c1YwKCkge1xuICAgIHJldHVybiAodHlwZW9mKGRvY3VtZW50IGFzIGFueSkucmVnaXN0ZXJFbGVtZW50ICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBnZXQgc3VwcG9ydHNSZWdFeFVuaWNvZGVGbGFnKCk6IGJvb2xlYW4geyByZXR1cm4gUmVnRXhwLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgndW5pY29kZScpOyB9XG5cbiAgZ2V0IHN1cHBvcnRzU2hhZG93RG9tKCkge1xuICAgIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJldHVybiAodHlwZW9mIHRlc3RFbC5hdHRhY2hTaGFkb3cgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c0RlcHJlY2F0ZWRTaGFkb3dEb21WMCgpIHtcbiAgICBjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBhbnk7XG4gICAgcmV0dXJuICh0eXBlb2YgdGVzdEVsLmNyZWF0ZVNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxufVxuXG5Ccm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGVsZW1lbnQ6IGFueSwgZXZlbnRUeXBlOiBhbnkpOiB2b2lkIHtcbiAgY29uc3QgZXZ0OiBFdmVudCA9IGdldERPTSgpLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIGdldERPTSgpLmRpc3BhdGNoRXZlbnQoZWxlbWVudCwgZXZ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBNb3VzZUV2ZW50IHtcbiAgY29uc3QgZXZ0OiBNb3VzZUV2ZW50ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICByZXR1cm4gZXZ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWwoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICByZXR1cm4gPEhUTUxFbGVtZW50PmdldENvbnRlbnQoY3JlYXRlVGVtcGxhdGUoaHRtbCkpLmZpcnN0Q2hpbGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDU1MoY3NzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY3NzLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAgICAgLnJlcGxhY2UoLzpcXHMvZywgJzonKVxuICAgICAgLnJlcGxhY2UoLycvZywgJ1wiJylcbiAgICAgIC5yZXBsYWNlKC8gfS9nLCAnfScpXG4gICAgICAucmVwbGFjZSgvdXJsXFwoKFxcXCJ8XFxzKSguKykoXFxcInxcXHMpXFwpKFxccyopL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGB1cmwoXCIke21hdGNoWzJdfVwiKWApXG4gICAgICAucmVwbGFjZSgvXFxbKC4rKT0oW15cIlxcXV0rKVxcXS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgWyR7bWF0Y2hbMV19PVwiJHttYXRjaFsyXX1cIl1gKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlTWFwKGVsZW1lbnQ6IGFueSk6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICBjb25zdCByZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBjb25zdCBlbEF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhdHRyaWIgPSBlbEF0dHJzLml0ZW0oaSk7XG4gICAgcmVzLnNldChhdHRyaWIubmFtZSwgYXR0cmliLnZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5jb25zdCBfc2VsZkNsb3NpbmdUYWdzID0gWydicicsICdocicsICdpbnB1dCddO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUVsZW1lbnQoZWw6IGFueSAvKiogVE9ETyAjOTEwMCAqLyk6IHN0cmluZyB7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgaWYgKGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgY29uc3QgYXR0cmlidXRlTWFwID0gZ2V0QXR0cmlidXRlTWFwKGVsKTtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVNYXAua2V5cygpKS5zb3J0KCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2Ygc29ydGVkS2V5cykge1xuICAgICAgY29uc3QgbG93ZXJDYXNlS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgYXR0VmFsdWUgPSBhdHRyaWJ1dGVNYXAuZ2V0KGtleSk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0VmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VycyBvcmRlciBzdHlsZSBydWxlcyBkaWZmZXJlbnRseS4gT3JkZXIgdGhlbSBhbHBoYWJldGljYWxseSBmb3IgY29uc2lzdGVuY3kuXG4gICAgICAgIGlmIChsb3dlckNhc2VLZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICBhdHRWYWx1ZSA9IGF0dFZhbHVlLnNwbGl0KC87ID8vKS5maWx0ZXIocyA9PiAhIXMpLnNvcnQoKS5tYXAocyA9PiBgJHtzfTtgKS5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX09XCIke2F0dFZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc+JztcblxuICAgIC8vIENoaWxkcmVuXG4gICAgY29uc3QgY2hpbGRyZW5Sb290ID0gdGVtcGxhdGVBd2FyZVJvb3QoZWwpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5Sb290ID8gY2hpbGRyZW5Sb290LmNoaWxkTm9kZXMgOiBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5naWZ5RWxlbWVudChjaGlsZHJlbltqXSk7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2luZyB0YWdcbiAgICBpZiAoX3NlbGZDbG9zaW5nVGFncy5pbmRleE9mKHRhZ05hbWUpID09IC0xKSB7XG4gICAgICByZXN1bHQgKz0gYDwvJHt0YWdOYW1lfT5gO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0NvbW1lbnROb2RlKGVsKSkge1xuICAgIHJlc3VsdCArPSBgPCEtLSR7ZWwubm9kZVZhbHVlfS0tPmA7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGVsLnRleHRDb250ZW50O1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5nWm9uZSgpOiBOZ1pvbmUge1xuICByZXR1cm4gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWUsIHNob3VsZENvYWxlc2NlRXZlbnRDaGFuZ2VEZXRlY3Rpb246IGZhbHNlfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbW1lbnROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUZXh0Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRlbnQobm9kZTogTm9kZSk6IE5vZGUge1xuICBpZiAoJ2NvbnRlbnQnIGluIG5vZGUpIHtcbiAgICByZXR1cm4gKDxhbnk+bm9kZSkuY29udGVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVBd2FyZVJvb3QoZWw6IE5vZGUpOiBhbnkge1xuICByZXR1cm4gZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShlbCkgJiYgZWwubm9kZU5hbWUgPT09ICdURU1QTEFURScgPyBnZXRDb250ZW50KGVsKSA6IGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29va2llKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAvLyBkb2N1bWVudC5jb29raWUgaXMgbWFnaWNhbCwgYXNzaWduaW5nIGludG8gaXQgYXNzaWducy9vdmVycmlkZXMgb25lIGNvb2tpZSB2YWx1ZSwgYnV0IGRvZXNcbiAgLy8gbm90IGNsZWFyIG90aGVyIGNvb2tpZXMuXG4gIGRvY3VtZW50LmNvb2tpZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdXBwb3J0c1dlYkFuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZig8YW55PkVsZW1lbnQpLnByb3RvdHlwZVsnYW5pbWF0ZSddID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZyB8IG51bGwpOiBib29sZWFuIHtcbiAgY29uc3QgdmFsdWUgPSBlbGVtZW50LnN0eWxlW3N0eWxlTmFtZV0gfHwgJyc7XG4gIHJldHVybiBzdHlsZVZhbHVlID8gdmFsdWUgPT0gc3R5bGVWYWx1ZSA6IHZhbHVlLmxlbmd0aCA+IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkQ2xhc3NMaXN0KGVsZW1lbnQ6IGFueSk6IGFueVtdIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGVsZW1lbnQuY2xhc3NMaXN0LCAwKS5zb3J0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZShodG1sOiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IHQgPSBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICB0LmlubmVySFRNTCA9IGh0bWw7XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hpbGROb2Rlc0FzTGlzdChlbDogTm9kZSk6IGFueVtdIHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IGVsLmNoaWxkTm9kZXM7XG4gIGNvbnN0IHJlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICByZXNbaV0gPSBjaGlsZE5vZGVzW2ldO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4iXX0=