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
import { ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
import { setRootDomAdapter } from '../dom/dom_adapter';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
/** @type {?} */
const DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
/** @type {?} */
const _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
/** @type {?} */
const _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
const ɵ0 = /**
 * @return {?}
 */
() => {
    if (global['Node']) {
        return global['Node'].prototype.contains || (/**
         * @this {?}
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        });
    }
    return (/** @type {?} */ (undefined));
};
/** @type {?} */
const nodeContains = ((ɵ0))();
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType no-console */
export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('parse not implemented'); }
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new BrowserDomAdapter()); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { return name in element; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { ((/** @type {?} */ (el)))[name] = value; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return ((/** @type {?} */ (el)))[name]; }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { ((/** @type {?} */ (el)))[methodName](...args); }
    // TODO(tbosch): move this into a separate environment class once we have it
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) {
        if (window.console) {
            if (console.error) {
                console.error(error);
            }
            else {
                console.log(error);
            }
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    }
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    contains(nodeA, nodeB) { return nodeContains.call(nodeA, nodeB); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return el.querySelector(selector); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { return el.querySelectorAll(selector); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { el.addEventListener(evt, listener, false); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return (/**
         * @return {?}
         */
        () => { el.removeEventListener(evt, listener, false); });
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) {
        /** @type {?} */
        const evt = this.getDefaultDocument().createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        /** @type {?} */
        const evt = this.getDefaultDocument().createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) {
        evt.preventDefault();
        evt.returnValue = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) {
        return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.nodeName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { return node.type; }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parentNode; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        /** @type {?} */
        const childNodes = el.childNodes;
        /** @type {?} */
        const res = [];
        for (let i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { el.appendChild(node); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { el.removeChild(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, ref, node) { parent.insertBefore(node, ref); }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { return el.textContent; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { el.textContent = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return this.getDefaultDocument().createComment(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        /** @type {?} */
        const t = this.getDefaultDocument().createElement('template');
        t.innerHTML = html;
        return t;
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElementNS(ns, tagName);
    }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createTextNode(text);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return ((/** @type {?} */ (el))).host; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { return node.cloneNode(true); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { return Array.prototype.slice.call(element.classList, 0); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { element.classList.add(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { element.classList.remove(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    removeStyle(element, stylename) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[stylename] = '';
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    getStyle(element, stylename) { return element.style[stylename]; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        /** @type {?} */
        const value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return element.getAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { element.setAttribute(name, value); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { element.removeAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) {
        element.removeAttributeNS(ns, name);
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @return {?}
     */
    getDefaultDocument() { return document; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { return doc.title; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { doc.title = newTitle || ''; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) {
        if (this.isElementNode(n)) {
            return n.matches && n.matches(selector) ||
                n.msMatchesSelector && n.msMatchesSelector(selector) ||
                n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) {
        /** @type {?} */
        let key = event.key;
        if (key == null) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (key == null) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = ((/** @type {?} */ (_chromeNumKeyPadMap)))[key];
                }
            }
        }
        return _keyMap[key] || key;
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return window;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    /**
     * @return {?}
     */
    getHistory() { return window.history; }
    /**
     * @return {?}
     */
    getLocation() { return window.location; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        /** @type {?} */
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    /**
     * @return {?}
     */
    resetBaseElement() { baseElement = null; }
    /**
     * @return {?}
     */
    getUserAgent() { return window.navigator.userAgent; }
    /**
     * @return {?}
     */
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    }
    /**
     * @return {?}
     */
    supportsCookies() { return true; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { return parseCookieValue(document.cookie, name); }
}
/** @type {?} */
let baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = (/** @type {?} */ (document.querySelector('base')));
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
/** @type {?} */
let urlParsingNode;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7TUFHN0QsdUJBQXVCLEdBQUcsQ0FBQzs7O01BRzNCLE9BQU8sR0FBMEI7OztJQUdyQyxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7O01BS0ssbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFH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Q0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ3JGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVwYXJzZUNvb2tpZVZhbHVlIGFzIHBhcnNlQ29va2llVmFsdWV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge8m1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7c2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJy4uL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7R2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyJztcblxuXG5jb25zdCBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCA9IDM7XG5cbi8vIE1hcCB0byBjb252ZXJ0IHNvbWUga2V5IG9yIGtleUlkZW50aWZpZXIgdmFsdWVzIHRvIHdoYXQgd2lsbCBiZSByZXR1cm5lZCBieSBnZXRFdmVudEtleVxuY29uc3QgX2tleU1hcDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAvLyBUaGUgZm9sbG93aW5nIHZhbHVlcyBhcmUgaGVyZSBmb3IgY3Jvc3MtYnJvd3NlciBjb21wYXRpYmlsaXR5IGFuZCB0byBtYXRjaCB0aGUgVzNDIHN0YW5kYXJkXG4gIC8vIGNmIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy1rZXkvXG4gICdcXGInOiAnQmFja3NwYWNlJyxcbiAgJ1xcdCc6ICdUYWInLFxuICAnXFx4N0YnOiAnRGVsZXRlJyxcbiAgJ1xceDFCJzogJ0VzY2FwZScsXG4gICdEZWwnOiAnRGVsZXRlJyxcbiAgJ0VzYyc6ICdFc2NhcGUnLFxuICAnTGVmdCc6ICdBcnJvd0xlZnQnLFxuICAnUmlnaHQnOiAnQXJyb3dSaWdodCcsXG4gICdVcCc6ICdBcnJvd1VwJyxcbiAgJ0Rvd24nOiAnQXJyb3dEb3duJyxcbiAgJ01lbnUnOiAnQ29udGV4dE1lbnUnLFxuICAnU2Nyb2xsJzogJ1Njcm9sbExvY2snLFxuICAnV2luJzogJ09TJ1xufTtcblxuLy8gVGhlcmUgaXMgYSBidWcgaW4gQ2hyb21lIGZvciBudW1lcmljIGtleXBhZCBrZXlzOlxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG5jb25zdCBfY2hyb21lTnVtS2V5UGFkTWFwID0ge1xuICAnQSc6ICcxJyxcbiAgJ0InOiAnMicsXG4gICdDJzogJzMnLFxuICAnRCc6ICc0JyxcbiAgJ0UnOiAnNScsXG4gICdGJzogJzYnLFxuICAnRyc6ICc3JyxcbiAgJ0gnOiAnOCcsXG4gICdJJzogJzknLFxuICAnSic6ICcqJyxcbiAgJ0snOiAnKycsXG4gICdNJzogJy0nLFxuICAnTic6ICcuJyxcbiAgJ08nOiAnLycsXG4gICdcXHg2MCc6ICcwJyxcbiAgJ1xceDkwJzogJ051bUxvY2snXG59O1xuXG5jb25zdCBub2RlQ29udGFpbnM6ICh0aGlzOiBOb2RlLCBvdGhlcjogTm9kZSkgPT4gYm9vbGVhbiA9ICgoKSA9PiB7XG4gIGlmIChnbG9iYWxbJ05vZGUnXSkge1xuICAgIHJldHVybiBnbG9iYWxbJ05vZGUnXS5wcm90b3R5cGUuY29udGFpbnMgfHwgZnVuY3Rpb24odGhpczogTm9kZSwgbm9kZTogYW55KSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihub2RlKSAmIDE2KTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG59KSgpO1xuXG4vKipcbiAqIEEgYERvbUFkYXB0ZXJgIHBvd2VyZWQgYnkgZnVsbCBicm93c2VyIERPTSBBUElzLlxuICpcbiAqIEBzZWN1cml0eSBUcmVhZCBjYXJlZnVsbHkhIEludGVyYWN0aW5nIHdpdGggdGhlIERPTSBkaXJlY3RseSBpcyBkYW5nZXJvdXMgYW5kXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgbm8tY29uc29sZSAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIHtcbiAgcGFyc2UodGVtcGxhdGVIdG1sOiBzdHJpbmcpIHsgdGhyb3cgbmV3IEVycm9yKCdwYXJzZSBub3QgaW1wbGVtZW50ZWQnKTsgfVxuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBCcm93c2VyRG9tQWRhcHRlcigpKTsgfVxuICBoYXNQcm9wZXJ0eShlbGVtZW50OiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIG5hbWUgaW4gZWxlbWVudDsgfVxuICBzZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7ICg8YW55PmVsKVtuYW1lXSA9IHZhbHVlOyB9XG4gIGdldFByb3BlcnR5KGVsOiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gKDxhbnk+ZWwpW25hbWVdOyB9XG4gIGludm9rZShlbDogTm9kZSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSk6IGFueSB7ICg8YW55PmVsKVttZXRob2ROYW1lXSguLi5hcmdzKTsgfVxuXG4gIC8vIFRPRE8odGJvc2NoKTogbW92ZSB0aGlzIGludG8gYSBzZXBhcmF0ZSBlbnZpcm9ubWVudCBjbGFzcyBvbmNlIHdlIGhhdmUgaXRcbiAgbG9nRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyAmJiB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgY29udGFpbnMobm9kZUE6IGFueSwgbm9kZUI6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZUNvbnRhaW5zLmNhbGwobm9kZUEsIG5vZGVCKTsgfVxuICBxdWVyeVNlbGVjdG9yKGVsOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7IHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7IHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTsgfVxuICBvbihlbDogTm9kZSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpIHsgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7IH1cbiAgb25BbmRDYW5jZWwoZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIC8vIE5lZWRlZCB0byBmb2xsb3cgRGFydCdzIHN1YnNjcmlwdGlvbiBzZW1hbnRpYywgdW50aWwgZml4IG9mXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXJ0L2lzc3Vlcy9kZXRhaWw/aWQ9MTc0MDZcbiAgICByZXR1cm4gKCkgPT4geyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTsgfTtcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkgeyBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7IH1cbiAgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IHN0cmluZyk6IE1vdXNlRXZlbnQge1xuICAgIGNvbnN0IGV2dDogTW91c2VFdmVudCA9IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBjcmVhdGVFdmVudChldmVudFR5cGU6IGFueSk6IEV2ZW50IHtcbiAgICBjb25zdCBldnQ6IEV2ZW50ID0gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBwcmV2ZW50RGVmYXVsdChldnQ6IEV2ZW50KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIH1cbiAgaXNQcmV2ZW50ZWQoZXZ0OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldnQuZGVmYXVsdFByZXZlbnRlZCB8fCBldnQucmV0dXJuVmFsdWUgIT0gbnVsbCAmJiAhZXZ0LnJldHVyblZhbHVlO1xuICB9XG4gIG5vZGVOYW1lKG5vZGU6IE5vZGUpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS5ub2RlTmFtZTsgfVxuICBub2RlVmFsdWUobm9kZTogTm9kZSk6IHN0cmluZ3xudWxsIHsgcmV0dXJuIG5vZGUubm9kZVZhbHVlOyB9XG4gIHR5cGUobm9kZTogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB7IHJldHVybiBub2RlLnR5cGU7IH1cbiAgZmlyc3RDaGlsZChlbDogTm9kZSk6IE5vZGV8bnVsbCB7IHJldHVybiBlbC5maXJzdENoaWxkOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBOb2RlKTogTm9kZXxudWxsIHsgcmV0dXJuIGVsLm5leHRTaWJsaW5nOyB9XG4gIHBhcmVudEVsZW1lbnQoZWw6IE5vZGUpOiBOb2RlfG51bGwgeyByZXR1cm4gZWwucGFyZW50Tm9kZTsgfVxuICBjaGlsZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyByZXR1cm4gZWwuY2hpbGROb2RlczsgfVxuICBjaGlsZE5vZGVzQXNMaXN0KGVsOiBOb2RlKTogYW55W10ge1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzW2ldID0gY2hpbGROb2Rlc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBjbGVhck5vZGVzKGVsOiBOb2RlKSB7XG4gICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuICBhcHBlbmRDaGlsZChlbDogTm9kZSwgbm9kZTogTm9kZSkgeyBlbC5hcHBlbmRDaGlsZChub2RlKTsgfVxuICByZW1vdmVDaGlsZChlbDogTm9kZSwgbm9kZTogTm9kZSkgeyBlbC5yZW1vdmVDaGlsZChub2RlKTsgfVxuICByZW1vdmUobm9kZTogTm9kZSk6IE5vZGUge1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogTm9kZSwgcmVmOiBOb2RlLCBub2RlOiBOb2RlKSB7IHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmKTsgfVxuICBnZXRUZXh0KGVsOiBOb2RlKTogc3RyaW5nfG51bGwgeyByZXR1cm4gZWwudGV4dENvbnRlbnQ7IH1cbiAgc2V0VGV4dChlbDogTm9kZSwgdmFsdWU6IHN0cmluZykgeyBlbC50ZXh0Q29udGVudCA9IHZhbHVlOyB9XG4gIGdldFZhbHVlKGVsOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gZWwudmFsdWU7IH1cbiAgc2V0VmFsdWUoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyBlbC52YWx1ZSA9IHZhbHVlOyB9XG4gIGdldENoZWNrZWQoZWw6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gZWwuY2hlY2tlZDsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IENvbW1lbnQgeyByZXR1cm4gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVDb21tZW50KHRleHQpOyB9XG4gIGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCB0ID0gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdDtcbiAgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZ05hbWUpO1xuICB9XG4gIGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBUZXh0IHtcbiAgICBkb2MgPSBkb2MgfHwgdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICB9XG4gIGdldEhvc3QoZWw6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLmhvc3Q7IH1cbiAgY2xvbmUobm9kZTogTm9kZSk6IE5vZGUgeyByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7IH1cbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKTtcbiAgfVxuICBjbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W10geyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5jbGFzc0xpc3QsIDApOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuICBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gc3R5bGVWYWx1ZTtcbiAgfVxuICByZW1vdmVTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlbmFtZTogc3RyaW5nKSB7XG4gICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzc5MTZcbiAgICBlbGVtZW50LnN0eWxlW3N0eWxlbmFtZV0gPSAnJztcbiAgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXTsgfVxuICBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nfG51bGwpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKSB8fCAnJztcbiAgICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9XG4gIHNldEF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHsgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG4gIHNldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IEVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlTlMobnMsIG5hbWUsIHZhbHVlKTtcbiAgfVxuICByZW1vdmVBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpIHsgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTsgfVxuICByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50OiBFbGVtZW50LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZU5TKG5zLCBuYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJ2Zha2VUaXRsZScpO1xuICB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHJldHVybiBkb2N1bWVudDsgfVxuICBnZXRUaXRsZShkb2M6IERvY3VtZW50KTogc3RyaW5nIHsgcmV0dXJuIGRvYy50aXRsZTsgfVxuICBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKSB7IGRvYy50aXRsZSA9IG5ld1RpdGxlIHx8ICcnOyB9XG4gIGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzRWxlbWVudE5vZGUobikpIHtcbiAgICAgIHJldHVybiBuLm1hdGNoZXMgJiYgbi5tYXRjaGVzKHNlbGVjdG9yKSB8fFxuICAgICAgICAgIG4ubXNNYXRjaGVzU2VsZWN0b3IgJiYgbi5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3RvcikgfHxcbiAgICAgICAgICBuLndlYmtpdE1hdGNoZXNTZWxlY3RvciAmJiBuLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERTsgfVxuXG4gIGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50OyB9XG5cbiAgZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGtleSA9IGV2ZW50LmtleTtcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIGtleSA9IGV2ZW50LmtleUlkZW50aWZpZXI7XG4gICAgICAvLyBrZXlJZGVudGlmaWVyIGlzIGRlZmluZWQgaW4gdGhlIG9sZCBkcmFmdCBvZiBET00gTGV2ZWwgMyBFdmVudHMgaW1wbGVtZW50ZWQgYnkgQ2hyb21lIGFuZFxuICAgICAgLy8gU2FmYXJpIGNmXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA3L1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDA3MTIyMS9ldmVudHMuaHRtbCNFdmVudHMtS2V5Ym9hcmRFdmVudHMtSW50ZXJmYWNlc1xuICAgICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnVW5pZGVudGlmaWVkJztcbiAgICAgIH1cbiAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnVSsnKSkge1xuICAgICAgICBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGtleS5zdWJzdHJpbmcoMiksIDE2KSk7XG4gICAgICAgIGlmIChldmVudC5sb2NhdGlvbiA9PT0gRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgJiYgX2Nocm9tZU51bUtleVBhZE1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgLy8gVGhlcmUgaXMgYSBidWcgaW4gQ2hyb21lIGZvciBudW1lcmljIGtleXBhZCBrZXlzOlxuICAgICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbiAgICAgICAgICAvLyAxLCAyLCAzIC4uLiBhcmUgcmVwb3J0ZWQgYXMgQSwgQiwgQyAuLi5cbiAgICAgICAgICBrZXkgPSAoX2Nocm9tZU51bUtleVBhZE1hcCBhcyBhbnkpW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2tleU1hcFtrZXldIHx8IGtleTtcbiAgfVxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0fG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09ICd3aW5kb3cnKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBkb2MuYm9keTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgcmV0dXJuIHdpbmRvdy5oaXN0b3J5OyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjsgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IGhyZWYgPSBnZXRCYXNlRWxlbWVudEhyZWYoKTtcbiAgICByZXR1cm4gaHJlZiA9PSBudWxsID8gbnVsbCA6IHJlbGF0aXZlUGF0aChocmVmKTtcbiAgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQgeyBiYXNlRWxlbWVudCA9IG51bGw7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIC8vIHBlcmZvcm1hbmNlLm5vdygpIGlzIG5vdCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzLCBzZWVcbiAgICAvLyBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1wZXJmb3JtYW5jZS5ub3dcbiAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7IHJldHVybiBwYXJzZUNvb2tpZVZhbHVlKGRvY3VtZW50LmNvb2tpZSwgbmFtZSk7IH1cbn1cblxubGV0IGJhc2VFbGVtZW50OiBIVE1MRWxlbWVudHxudWxsID0gbnVsbDtcbmZ1bmN0aW9uIGdldEJhc2VFbGVtZW50SHJlZigpOiBzdHJpbmd8bnVsbCB7XG4gIGlmICghYmFzZUVsZW1lbnQpIHtcbiAgICBiYXNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKSAhO1xuICAgIGlmICghYmFzZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG59XG5cbi8vIGJhc2VkIG9uIHVybFV0aWxzLmpzIGluIEFuZ3VsYXJKUyAxXG5sZXQgdXJsUGFyc2luZ05vZGU6IGFueTtcbmZ1bmN0aW9uIHJlbGF0aXZlUGF0aCh1cmw6IGFueSk6IHN0cmluZyB7XG4gIGlmICghdXJsUGFyc2luZ05vZGUpIHtcbiAgICB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgfVxuICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICByZXR1cm4gKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZTtcbn1cbiJdfQ==