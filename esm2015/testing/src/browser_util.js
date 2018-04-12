/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone, ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
export let /** @type {?} */ browserDetection;
export class BrowserDetection {
    /**
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
    /**
     * @return {?}
     */
    get supportsNativeIntlApi() {
        return !!(/** @type {?} */ (global)).Intl && (/** @type {?} */ (global)).Intl !== (/** @type {?} */ (global)).IntlPolyfill;
    }
    /**
     * @return {?}
     */
    get isChromeDesktop() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
            this._ua.indexOf('Edge') == -1;
    }
    /**
     * @return {?}
     */
    get isOldChrome() {
        return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
            this._ua.indexOf('Edge') == -1;
    }
}
function BrowserDetection_tsickle_Closure_declarations() {
    /** @type {?} */
    BrowserDetection.prototype._overrideUa;
}
BrowserDetection.setup();
/**
 * @param {?} element
 * @param {?} eventType
 * @return {?}
 */
export function dispatchEvent(element, eventType) {
    getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}
/**
 * @param {?} html
 * @return {?}
 */
export function el(html) {
    return /** @type {?} */ (getDOM().firstChild(getDOM().content(getDOM().createTemplate(html))));
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
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, (...match) => `url("${match[2]}")`)
        .replace(/\[(.+)=([^"\]]+)\]/g, (...match) => `[${match[1]}="${match[2]}"]`);
}
const /** @type {?} */ _singleTagWhitelist = ['br', 'hr', 'input'];
/**
 * @param {?} el
 * @return {?}
 */
export function stringifyElement(el /** TODO #9100 */) {
    let /** @type {?} */ result = '';
    if (getDOM().isElementNode(el)) {
        const /** @type {?} */ tagName = getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += `<${tagName}`;
        // Attributes in an ordered way
        const /** @type {?} */ attributeMap = getDOM().attributeMap(el);
        const /** @type {?} */ keys = Array.from(attributeMap.keys()).sort();
        for (let /** @type {?} */ i = 0; i < keys.length; i++) {
            const /** @type {?} */ key = keys[i];
            const /** @type {?} */ attValue = attributeMap.get(key);
            const /** @type {?} */ lowerCaseKey = key.toLowerCase();
            if (typeof attValue !== 'string') {
                result += ` ${lowerCaseKey}`;
            }
            else {
                result += ` ${lowerCaseKey}="${attValue}"`;
            }
        }
        result += '>';
        // Children
        const /** @type {?} */ childrenRoot = getDOM().templateAwareRoot(el);
        const /** @type {?} */ children = childrenRoot ? getDOM().childNodes(childrenRoot) : [];
        for (let /** @type {?} */ j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_singleTagWhitelist.indexOf(tagName) == -1) {
            result += `</${tagName}>`;
        }
    }
    else if (getDOM().isCommentNode(el)) {
        result += `<!--${getDOM().nodeValue(el)}-->`;
    }
    else {
        result += getDOM().getText(el);
    }
    return result;
}
/**
 * @return {?}
 */
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
//# sourceMappingURL=browser_util.js.map