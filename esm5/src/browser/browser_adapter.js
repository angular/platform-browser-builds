/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
import { setRootDomAdapter } from '../dom/dom_adapter';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
var _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
var DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var _keyMap = {
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
var _chromeNumKeyPadMap = {
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
var nodeContains = (function () {
    if (global['Node']) {
        return global['Node'].prototype.contains || function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        };
    }
    return undefined;
})();
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType no-console */
var BrowserDomAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserDomAdapter, _super);
    function BrowserDomAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error('parse not implemented'); };
    BrowserDomAdapter.makeCurrent = function () { setRootDomAdapter(new BrowserDomAdapter()); };
    BrowserDomAdapter.prototype.hasProperty = function (element, name) { return name in element; };
    BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
    BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
    BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
        var _a;
        (_a = el)[methodName].apply(_a, tslib_1.__spread(args));
    };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.logError = function (error) {
        if (window.console) {
            if (console.error) {
                console.error(error);
            }
            else {
                console.log(error);
            }
        }
    };
    BrowserDomAdapter.prototype.log = function (error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    };
    BrowserDomAdapter.prototype.logGroup = function (error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    };
    BrowserDomAdapter.prototype.logGroupEnd = function () {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    };
    Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
        get: function () { return _attrToPropMap; },
        enumerable: true,
        configurable: true
    });
    BrowserDomAdapter.prototype.contains = function (nodeA, nodeB) { return nodeContains.call(nodeA, nodeB); };
    BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
    BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
    BrowserDomAdapter.prototype.on = function (el, evt, listener) { el.addEventListener(evt, listener, false); };
    BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return function () { el.removeEventListener(evt, listener, false); };
    };
    BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
    BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
        var evt = this.getDefaultDocument().createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.createEvent = function (eventType) {
        var evt = this.getDefaultDocument().createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.preventDefault = function (evt) {
        evt.preventDefault();
        evt.returnValue = false;
    };
    BrowserDomAdapter.prototype.isPrevented = function (evt) {
        return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
    };
    BrowserDomAdapter.prototype.getInnerHTML = function (el) { return el.innerHTML; };
    BrowserDomAdapter.prototype.getTemplateContent = function (el) {
        return 'content' in el && this.isTemplateElement(el) ? el.content : null;
    };
    BrowserDomAdapter.prototype.getOuterHTML = function (el) { return el.outerHTML; };
    BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
    BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
    BrowserDomAdapter.prototype.type = function (node) { return node.type; };
    BrowserDomAdapter.prototype.content = function (node) {
        if (this.hasProperty(node, 'content')) {
            return node.content;
        }
        else {
            return node;
        }
    };
    BrowserDomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
    BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
    BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
    BrowserDomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
    BrowserDomAdapter.prototype.childNodesAsList = function (el) {
        var childNodes = el.childNodes;
        var res = [];
        for (var i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    };
    BrowserDomAdapter.prototype.clearNodes = function (el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };
    BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
    BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
    BrowserDomAdapter.prototype.replaceChild = function (el, newChild, oldChild) { el.replaceChild(newChild, oldChild); };
    BrowserDomAdapter.prototype.remove = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    };
    BrowserDomAdapter.prototype.insertBefore = function (parent, ref, node) { parent.insertBefore(node, ref); };
    BrowserDomAdapter.prototype.insertAllBefore = function (parent, ref, nodes) {
        nodes.forEach(function (n) { return parent.insertBefore(n, ref); });
    };
    BrowserDomAdapter.prototype.insertAfter = function (parent, ref, node) { parent.insertBefore(node, ref.nextSibling); };
    BrowserDomAdapter.prototype.setInnerHTML = function (el, value) { el.innerHTML = value; };
    BrowserDomAdapter.prototype.getText = function (el) { return el.textContent; };
    BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
    BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
    BrowserDomAdapter.prototype.setValue = function (el, value) { el.value = value; };
    BrowserDomAdapter.prototype.getChecked = function (el) { return el.checked; };
    BrowserDomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
    BrowserDomAdapter.prototype.createComment = function (text) { return this.getDefaultDocument().createComment(text); };
    BrowserDomAdapter.prototype.createTemplate = function (html) {
        var t = this.getDefaultDocument().createElement('template');
        t.innerHTML = html;
        return t;
    };
    BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    };
    BrowserDomAdapter.prototype.createElementNS = function (ns, tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElementNS(ns, tagName);
    };
    BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createTextNode(text);
    };
    BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        doc = doc || this.getDefaultDocument();
        var el = doc.createElement('SCRIPT');
        el.setAttribute(attrName, attrValue);
        return el;
    };
    BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
        doc = doc || this.getDefaultDocument();
        var style = doc.createElement('style');
        this.appendChild(style, this.createTextNode(css, doc));
        return style;
    };
    BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
    BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
    BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
    BrowserDomAdapter.prototype.getElementsByClassName = function (element, name) {
        return element.getElementsByClassName(name);
    };
    BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
        return element.getElementsByTagName(name);
    };
    BrowserDomAdapter.prototype.classList = function (element) { return Array.prototype.slice.call(element.classList, 0); };
    BrowserDomAdapter.prototype.addClass = function (element, className) { element.classList.add(className); };
    BrowserDomAdapter.prototype.removeClass = function (element, className) { element.classList.remove(className); };
    BrowserDomAdapter.prototype.hasClass = function (element, className) {
        return element.classList.contains(className);
    };
    BrowserDomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    };
    BrowserDomAdapter.prototype.removeStyle = function (element, stylename) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[stylename] = '';
    };
    BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
    BrowserDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
        var value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    };
    BrowserDomAdapter.prototype.tagName = function (element) { return element.tagName; };
    BrowserDomAdapter.prototype.attributeMap = function (element) {
        var res = new Map();
        var elAttrs = element.attributes;
        for (var i = 0; i < elAttrs.length; i++) {
            var attrib = elAttrs.item(i);
            res.set(attrib.name, attrib.value);
        }
        return res;
    };
    BrowserDomAdapter.prototype.hasAttribute = function (element, attribute) {
        return element.hasAttribute(attribute);
    };
    BrowserDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    };
    BrowserDomAdapter.prototype.getAttribute = function (element, attribute) {
        return element.getAttribute(attribute);
    };
    BrowserDomAdapter.prototype.getAttributeNS = function (element, ns, name) {
        return element.getAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
    BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    };
    BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
    BrowserDomAdapter.prototype.removeAttributeNS = function (element, ns, name) {
        element.removeAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
    BrowserDomAdapter.prototype.createHtmlDocument = function () {
        return document.implementation.createHTMLDocument('fakeTitle');
    };
    BrowserDomAdapter.prototype.getDefaultDocument = function () { return document; };
    BrowserDomAdapter.prototype.getBoundingClientRect = function (el) {
        try {
            return el.getBoundingClientRect();
        }
        catch (_a) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    };
    BrowserDomAdapter.prototype.getTitle = function (doc) { return doc.title; };
    BrowserDomAdapter.prototype.setTitle = function (doc, newTitle) { doc.title = newTitle || ''; };
    BrowserDomAdapter.prototype.elementMatches = function (n, selector) {
        if (this.isElementNode(n)) {
            return n.matches && n.matches(selector) ||
                n.msMatchesSelector && n.msMatchesSelector(selector) ||
                n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
    };
    BrowserDomAdapter.prototype.isTemplateElement = function (el) {
        return this.isElementNode(el) && el.nodeName === 'TEMPLATE';
    };
    BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
    BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
    BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
    BrowserDomAdapter.prototype.hasShadowRoot = function (node) {
        return node.shadowRoot != null && node instanceof HTMLElement;
    };
    BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
    BrowserDomAdapter.prototype.importIntoDoc = function (node) { return document.importNode(this.templateAwareRoot(node), true); };
    BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
    BrowserDomAdapter.prototype.getHref = function (el) { return el.getAttribute('href'); };
    BrowserDomAdapter.prototype.getEventKey = function (event) {
        var key = event.key;
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
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        return _keyMap[key] || key;
    };
    BrowserDomAdapter.prototype.getGlobalEventTarget = function (doc, target) {
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
    };
    BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
    BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
    BrowserDomAdapter.prototype.getBaseHref = function (doc) {
        var href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    };
    BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
    BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
    BrowserDomAdapter.prototype.setData = function (element, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    };
    BrowserDomAdapter.prototype.getData = function (element, name) {
        return this.getAttribute(element, 'data-' + name);
    };
    BrowserDomAdapter.prototype.getComputedStyle = function (element) { return getComputedStyle(element); };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.supportsWebAnimation = function () {
        return typeof Element.prototype['animate'] === 'function';
    };
    BrowserDomAdapter.prototype.performanceNow = function () {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    };
    BrowserDomAdapter.prototype.supportsCookies = function () { return true; };
    BrowserDomAdapter.prototype.getCookie = function (name) { return parseCookieValue(document.cookie, name); };
    BrowserDomAdapter.prototype.setCookie = function (name, value) {
        // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
        // not clear other cookies.
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    };
    return BrowserDomAdapter;
}(GenericBrowserDomAdapter));
export { BrowserDomAdapter };
var baseElement = null;
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = document.querySelector('base');
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
var urlParsingNode;
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRW5FLElBQU0sY0FBYyxHQUFHO0lBQ3JCLE9BQU8sRUFBRSxXQUFXO0lBQ3BCLFdBQVcsRUFBRSxXQUFXO0lBQ3hCLFVBQVUsRUFBRSxVQUFVO0lBQ3RCLFVBQVUsRUFBRSxVQUFVO0NBQ3ZCLENBQUM7QUFFRixJQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUVsQywwRkFBMEY7QUFDMUYsSUFBTSxPQUFPLEdBQTBCO0lBQ3JDLDhGQUE4RjtJQUM5RixrREFBa0Q7SUFDbEQsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLEtBQUs7SUFDWCxNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFdBQVc7SUFDbkIsT0FBTyxFQUFFLFlBQVk7SUFDckIsSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixNQUFNLEVBQUUsYUFBYTtJQUNyQixRQUFRLEVBQUUsWUFBWTtJQUN0QixLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixvREFBb0Q7QUFDcEQs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OUM7SUFDRCxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUNyRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1cGFyc2VDb29raWVWYWx1ZSBhcyBwYXJzZUNvb2tpZVZhbHVlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHvJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge3NldFJvb3REb21BZGFwdGVyfSBmcm9tICcuLi9kb20vZG9tX2FkYXB0ZXInO1xuXG5pbXBvcnQge0dlbmVyaWNCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9nZW5lcmljX2Jyb3dzZXJfYWRhcHRlcic7XG5cbmNvbnN0IF9hdHRyVG9Qcm9wTWFwID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2lubmVySHRtbCc6ICdpbm5lckhUTUwnLFxuICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAndGFiaW5kZXgnOiAndGFiSW5kZXgnLFxufTtcblxuY29uc3QgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAzO1xuXG4vLyBNYXAgdG8gY29udmVydCBzb21lIGtleSBvciBrZXlJZGVudGlmaWVyIHZhbHVlcyB0byB3aGF0IHdpbGwgYmUgcmV0dXJuZWQgYnkgZ2V0RXZlbnRLZXlcbmNvbnN0IF9rZXlNYXA6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgLy8gVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIGhlcmUgZm9yIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJpbGl0eSBhbmQgdG8gbWF0Y2ggdGhlIFczQyBzdGFuZGFyZFxuICAvLyBjZiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMta2V5L1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICAnRGVsJzogJ0RlbGV0ZScsXG4gICdFc2MnOiAnRXNjYXBlJyxcbiAgJ0xlZnQnOiAnQXJyb3dMZWZ0JyxcbiAgJ1JpZ2h0JzogJ0Fycm93UmlnaHQnLFxuICAnVXAnOiAnQXJyb3dVcCcsXG4gICdEb3duJzogJ0Fycm93RG93bicsXG4gICdNZW51JzogJ0NvbnRleHRNZW51JyxcbiAgJ1Njcm9sbCc6ICdTY3JvbGxMb2NrJyxcbiAgJ1dpbic6ICdPUydcbn07XG5cbi8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbi8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuY29uc3QgX2Nocm9tZU51bUtleVBhZE1hcCA9IHtcbiAgJ0EnOiAnMScsXG4gICdCJzogJzInLFxuICAnQyc6ICczJyxcbiAgJ0QnOiAnNCcsXG4gICdFJzogJzUnLFxuICAnRic6ICc2JyxcbiAgJ0cnOiAnNycsXG4gICdIJzogJzgnLFxuICAnSSc6ICc5JyxcbiAgJ0onOiAnKicsXG4gICdLJzogJysnLFxuICAnTSc6ICctJyxcbiAgJ04nOiAnLicsXG4gICdPJzogJy8nLFxuICAnXFx4NjAnOiAnMCcsXG4gICdcXHg5MCc6ICdOdW1Mb2NrJ1xufTtcblxuY29uc3Qgbm9kZUNvbnRhaW5zOiAodGhpczogTm9kZSwgb3RoZXI6IE5vZGUpID0+IGJvb2xlYW4gPSAoKCkgPT4ge1xuICBpZiAoZ2xvYmFsWydOb2RlJ10pIHtcbiAgICByZXR1cm4gZ2xvYmFsWydOb2RlJ10ucHJvdG90eXBlLmNvbnRhaW5zIHx8IGZ1bmN0aW9uKHRoaXM6IE5vZGUsIG5vZGU6IGFueSkge1xuICAgICAgcmV0dXJuICEhKHRoaXMuY29tcGFyZURvY3VtZW50UG9zaXRpb24obm9kZSkgJiAxNik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xufSkoKTtcblxuLyoqXG4gKiBBIGBEb21BZGFwdGVyYCBwb3dlcmVkIGJ5IGZ1bGwgYnJvd3NlciBET00gQVBJcy5cbiAqXG4gKiBAc2VjdXJpdHkgVHJlYWQgY2FyZWZ1bGx5ISBJbnRlcmFjdGluZyB3aXRoIHRoZSBET00gZGlyZWN0bHkgaXMgZGFuZ2Vyb3VzIGFuZFxuICogY2FuIGludHJvZHVjZSBYU1Mgcmlza3MuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOnJlcXVpcmVQYXJhbWV0ZXJUeXBlIG5vLWNvbnNvbGUgKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciB7XG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93IG5ldyBFcnJvcigncGFyc2Ugbm90IGltcGxlbWVudGVkJyk7IH1cbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKSk7IH1cbiAgaGFzUHJvcGVydHkoZWxlbWVudDogTm9kZSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBuYW1lIGluIGVsZW1lbnQ7IH1cbiAgc2V0UHJvcGVydHkoZWw6IE5vZGUsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTsgfVxuICBnZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nKTogYW55IHsgcmV0dXJuICg8YW55PmVsKVtuYW1lXTsgfVxuICBpbnZva2UoZWw6IE5vZGUsIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkgeyAoPGFueT5lbClbbWV0aG9kTmFtZV0oLi4uYXJncyk7IH1cblxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIGxvZ0Vycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvZyhlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5sb2cgJiYgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cCAmJiB3aW5kb3cuY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cEVuZCAmJiB3aW5kb3cuY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdHRyVG9Qcm9wTWFwKCk6IGFueSB7IHJldHVybiBfYXR0clRvUHJvcE1hcDsgfVxuXG4gIGNvbnRhaW5zKG5vZGVBOiBhbnksIG5vZGVCOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGVDb250YWlucy5jYWxsKG5vZGVBLCBub2RlQik7IH1cbiAgcXVlcnlTZWxlY3RvcihlbDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10geyByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbiAgb24oZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KSB7IGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpOyB9XG4gIG9uQW5kQ2FuY2VsKGVsOiBOb2RlLCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAvLyBOZWVkZWQgdG8gZm9sbG93IERhcnQncyBzdWJzY3JpcHRpb24gc2VtYW50aWMsIHVudGlsIGZpeCBvZlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZGFydC9pc3N1ZXMvZGV0YWlsP2lkPTE3NDA2XG4gICAgcmV0dXJuICgpID0+IHsgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7IH07XG4gIH1cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHsgZWwuZGlzcGF0Y2hFdmVudChldnQpOyB9XG4gIGNyZWF0ZU1vdXNlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBNb3VzZUV2ZW50IHtcbiAgICBjb25zdCBldnQ6IE1vdXNlRXZlbnQgPSB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICAgIHJldHVybiBldnQ7XG4gIH1cbiAgY3JlYXRlRXZlbnQoZXZlbnRUeXBlOiBhbnkpOiBFdmVudCB7XG4gICAgY29uc3QgZXZ0OiBFdmVudCA9IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICAgIHJldHVybiBldnQ7XG4gIH1cbiAgcHJldmVudERlZmF1bHQoZXZ0OiBFdmVudCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICB9XG4gIGlzUHJldmVudGVkKGV2dDogRXZlbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZXZ0LmRlZmF1bHRQcmV2ZW50ZWQgfHwgZXZ0LnJldHVyblZhbHVlICE9IG51bGwgJiYgIWV2dC5yZXR1cm5WYWx1ZTtcbiAgfVxuICBnZXRJbm5lckhUTUwoZWw6IEhUTUxFbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIGVsLmlubmVySFRNTDsgfVxuICBnZXRUZW1wbGF0ZUNvbnRlbnQoZWw6IE5vZGUpOiBOb2RlfG51bGwge1xuICAgIHJldHVybiAnY29udGVudCcgaW4gZWwgJiYgdGhpcy5pc1RlbXBsYXRlRWxlbWVudChlbCkgPyAoPGFueT5lbCkuY29udGVudCA6IG51bGw7XG4gIH1cbiAgZ2V0T3V0ZXJIVE1MKGVsOiBIVE1MRWxlbWVudCk6IHN0cmluZyB7IHJldHVybiBlbC5vdXRlckhUTUw7IH1cbiAgbm9kZU5hbWUobm9kZTogTm9kZSk6IHN0cmluZyB7IHJldHVybiBub2RlLm5vZGVOYW1lOyB9XG4gIG5vZGVWYWx1ZShub2RlOiBOb2RlKTogc3RyaW5nfG51bGwgeyByZXR1cm4gbm9kZS5ub2RlVmFsdWU7IH1cbiAgdHlwZShub2RlOiBIVE1MSW5wdXRFbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIG5vZGUudHlwZTsgfVxuICBjb250ZW50KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICBpZiAodGhpcy5oYXNQcm9wZXJ0eShub2RlLCAnY29udGVudCcpKSB7XG4gICAgICByZXR1cm4gKDxhbnk+bm9kZSkuY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG4gIGZpcnN0Q2hpbGQoZWw6IE5vZGUpOiBOb2RlfG51bGwgeyByZXR1cm4gZWwuZmlyc3RDaGlsZDsgfVxuICBuZXh0U2libGluZyhlbDogTm9kZSk6IE5vZGV8bnVsbCB7IHJldHVybiBlbC5uZXh0U2libGluZzsgfVxuICBwYXJlbnRFbGVtZW50KGVsOiBOb2RlKTogTm9kZXxudWxsIHsgcmV0dXJuIGVsLnBhcmVudE5vZGU7IH1cbiAgY2hpbGROb2RlcyhlbDogYW55KTogTm9kZVtdIHsgcmV0dXJuIGVsLmNoaWxkTm9kZXM7IH1cbiAgY2hpbGROb2Rlc0FzTGlzdChlbDogTm9kZSk6IGFueVtdIHtcbiAgICBjb25zdCBjaGlsZE5vZGVzID0gZWwuY2hpbGROb2RlcztcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc1tpXSA9IGNoaWxkTm9kZXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cbiAgY2xlYXJOb2RlcyhlbDogTm9kZSkge1xuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cbiAgYXBwZW5kQ2hpbGQoZWw6IE5vZGUsIG5vZGU6IE5vZGUpIHsgZWwuYXBwZW5kQ2hpbGQobm9kZSk7IH1cbiAgcmVtb3ZlQ2hpbGQoZWw6IE5vZGUsIG5vZGU6IE5vZGUpIHsgZWwucmVtb3ZlQ2hpbGQobm9kZSk7IH1cbiAgcmVwbGFjZUNoaWxkKGVsOiBOb2RlLCBuZXdDaGlsZDogTm9kZSwgb2xkQ2hpbGQ6IE5vZGUpIHsgZWwucmVwbGFjZUNoaWxkKG5ld0NoaWxkLCBvbGRDaGlsZCk7IH1cbiAgcmVtb3ZlKG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IE5vZGUsIHJlZjogTm9kZSwgbm9kZTogTm9kZSkgeyBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZik7IH1cbiAgaW5zZXJ0QWxsQmVmb3JlKHBhcmVudDogTm9kZSwgcmVmOiBOb2RlLCBub2RlczogTm9kZVtdKSB7XG4gICAgbm9kZXMuZm9yRWFjaCgobjogYW55KSA9PiBwYXJlbnQuaW5zZXJ0QmVmb3JlKG4sIHJlZikpO1xuICB9XG4gIGluc2VydEFmdGVyKHBhcmVudDogTm9kZSwgcmVmOiBOb2RlLCBub2RlOiBhbnkpIHsgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYubmV4dFNpYmxpbmcpOyB9XG4gIHNldElubmVySFRNTChlbDogRWxlbWVudCwgdmFsdWU6IHN0cmluZykgeyBlbC5pbm5lckhUTUwgPSB2YWx1ZTsgfVxuICBnZXRUZXh0KGVsOiBOb2RlKTogc3RyaW5nfG51bGwgeyByZXR1cm4gZWwudGV4dENvbnRlbnQ7IH1cbiAgc2V0VGV4dChlbDogTm9kZSwgdmFsdWU6IHN0cmluZykgeyBlbC50ZXh0Q29udGVudCA9IHZhbHVlOyB9XG4gIGdldFZhbHVlKGVsOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gZWwudmFsdWU7IH1cbiAgc2V0VmFsdWUoZWw6IGFueSwgdmFsdWU6IHN0cmluZykgeyBlbC52YWx1ZSA9IHZhbHVlOyB9XG4gIGdldENoZWNrZWQoZWw6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gZWwuY2hlY2tlZDsgfVxuICBzZXRDaGVja2VkKGVsOiBhbnksIHZhbHVlOiBib29sZWFuKSB7IGVsLmNoZWNrZWQgPSB2YWx1ZTsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IENvbW1lbnQgeyByZXR1cm4gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVDb21tZW50KHRleHQpOyB9XG4gIGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCB0ID0gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdDtcbiAgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICB9XG4gIGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZ05hbWUpO1xuICB9XG4gIGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBUZXh0IHtcbiAgICBkb2MgPSBkb2MgfHwgdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICB9XG4gIGNyZWF0ZVNjcmlwdFRhZyhhdHRyTmFtZTogc3RyaW5nLCBhdHRyVmFsdWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MU2NyaXB0RWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgY29uc3QgZWwgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jLmNyZWF0ZUVsZW1lbnQoJ1NDUklQVCcpO1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbiAgY3JlYXRlU3R5bGVFbGVtZW50KGNzczogc3RyaW5nLCBkb2M/OiBEb2N1bWVudCk6IEhUTUxTdHlsZUVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIGNvbnN0IHN0eWxlID0gPEhUTUxTdHlsZUVsZW1lbnQ+ZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChzdHlsZSwgdGhpcy5jcmVhdGVUZXh0Tm9kZShjc3MsIGRvYykpO1xuICAgIHJldHVybiBzdHlsZTtcbiAgfVxuICBjcmVhdGVTaGFkb3dSb290KGVsOiBIVE1MRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLmNyZWF0ZVNoYWRvd1Jvb3QoKTsgfVxuICBnZXRTaGFkb3dSb290KGVsOiBIVE1MRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLnNoYWRvd1Jvb3Q7IH1cbiAgZ2V0SG9zdChlbDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7IHJldHVybiAoPGFueT5lbCkuaG9zdDsgfVxuICBjbG9uZShub2RlOiBOb2RlKTogTm9kZSB7IHJldHVybiBub2RlLmNsb25lTm9kZSh0cnVlKTsgfVxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKTtcbiAgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKG5hbWUpO1xuICB9XG4gIGNsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7IHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCwgMCk7IH1cbiAgYWRkQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuICByZW1vdmVDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG4gIGhhc0NsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnN0eWxlW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXSA9ICcnO1xuICB9XG4gIGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVuYW1lOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gZWxlbWVudC5zdHlsZVtzdHlsZW5hbWVdOyB9XG4gIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmd8bnVsbCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUpIHx8ICcnO1xuICAgIHJldHVybiBzdHlsZVZhbHVlID8gdmFsdWUgPT0gc3R5bGVWYWx1ZSA6IHZhbHVlLmxlbmd0aCA+IDA7XG4gIH1cbiAgdGFnTmFtZShlbGVtZW50OiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gZWxlbWVudC50YWdOYW1lOyB9XG4gIGF0dHJpYnV0ZU1hcChlbGVtZW50OiBhbnkpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCByZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgIGNvbnN0IGVsQXR0cnMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbEF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhdHRyaWIgPSBlbEF0dHJzLml0ZW0oaSk7XG4gICAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGhhc0F0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9XG4gIGhhc0F0dHJpYnV0ZU5TKGVsZW1lbnQ6IEVsZW1lbnQsIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQuaGFzQXR0cmlidXRlTlMobnMsIGF0dHJpYnV0ZSk7XG4gIH1cbiAgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9XG4gIGdldEF0dHJpYnV0ZU5TKGVsZW1lbnQ6IEVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGVOUyhucywgbmFtZSk7XG4gIH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cbiAgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogRWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhucywgbmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZykgeyBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IEVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlTlMobnMsIG5hbWUpO1xuICB9XG4gIHRlbXBsYXRlQXdhcmVSb290KGVsOiBOb2RlKTogYW55IHsgcmV0dXJuIHRoaXMuaXNUZW1wbGF0ZUVsZW1lbnQoZWwpID8gdGhpcy5jb250ZW50KGVsKSA6IGVsOyB9XG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJ2Zha2VUaXRsZScpO1xuICB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHJldHVybiBkb2N1bWVudDsgfVxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWw6IEVsZW1lbnQpOiBhbnkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4ge3RvcDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgd2lkdGg6IDAsIGhlaWdodDogMH07XG4gICAgfVxuICB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZG9jLnRpdGxlOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgZG9jLnRpdGxlID0gbmV3VGl0bGUgfHwgJyc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNFbGVtZW50Tm9kZShuKSkge1xuICAgICAgcmV0dXJuIG4ubWF0Y2hlcyAmJiBuLm1hdGNoZXMoc2VsZWN0b3IpIHx8XG4gICAgICAgICAgbi5tc01hdGNoZXNTZWxlY3RvciAmJiBuLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSB8fFxuICAgICAgICAgIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yICYmIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNUZW1wbGF0ZUVsZW1lbnQoZWw6IE5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0VsZW1lbnROb2RlKGVsKSAmJiBlbC5ub2RlTmFtZSA9PT0gJ1RFTVBMQVRFJztcbiAgfVxuICBpc1RleHROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERTsgfVxuICBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlLnNoYWRvd1Jvb3QgIT0gbnVsbCAmJiBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gIH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQ7IH1cbiAgaW1wb3J0SW50b0RvYyhub2RlOiBOb2RlKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUF3YXJlUm9vdChub2RlKSwgdHJ1ZSk7IH1cbiAgYWRvcHROb2RlKG5vZGU6IE5vZGUpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuYWRvcHROb2RlKG5vZGUpOyB9XG4gIGdldEhyZWYoZWw6IEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgITsgfVxuXG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBrZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSBldmVudC5rZXlJZGVudGlmaWVyO1xuICAgICAgLy8ga2V5SWRlbnRpZmllciBpcyBkZWZpbmVkIGluIHRoZSBvbGQgZHJhZnQgb2YgRE9NIExldmVsIDMgRXZlbnRzIGltcGxlbWVudGVkIGJ5IENocm9tZSBhbmRcbiAgICAgIC8vIFNhZmFyaSBjZlxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1VuaWRlbnRpZmllZCc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ1UrJykpIHtcbiAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChrZXkuc3Vic3RyaW5nKDIpLCAxNikpO1xuICAgICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIC8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbiAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4gICAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgICAga2V5ID0gKF9jaHJvbWVOdW1LZXlQYWRNYXAgYXMgYW55KVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9rZXlNYXBba2V5XSB8fCBrZXk7XG4gIH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHJldHVybiB3aW5kb3cuaGlzdG9yeTsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHJldHVybiB3aW5kb3cubG9jYXRpb247IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBocmVmID0gZ2V0QmFzZUVsZW1lbnRIcmVmKCk7XG4gICAgcmV0dXJuIGhyZWYgPT0gbnVsbCA/IG51bGwgOiByZWxhdGl2ZVBhdGgoaHJlZik7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgYmFzZUVsZW1lbnQgPSBudWxsOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7IH1cbiAgc2V0RGF0YShlbGVtZW50OiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSwgdmFsdWUpO1xuICB9XG4gIGdldERhdGEoZWxlbWVudDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSk7XG4gIH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIHN1cHBvcnRzV2ViQW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YoPGFueT5FbGVtZW50KS5wcm90b3R5cGVbJ2FuaW1hdGUnXSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIC8vIHBlcmZvcm1hbmNlLm5vdygpIGlzIG5vdCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzLCBzZWVcbiAgICAvLyBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1wZXJmb3JtYW5jZS5ub3dcbiAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7IHJldHVybiBwYXJzZUNvb2tpZVZhbHVlKGRvY3VtZW50LmNvb2tpZSwgbmFtZSk7IH1cblxuICBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZG9jdW1lbnQuY29va2llIGlzIG1hZ2ljYWwsIGFzc2lnbmluZyBpbnRvIGl0IGFzc2lnbnMvb3ZlcnJpZGVzIG9uZSBjb29raWUgdmFsdWUsIGJ1dCBkb2VzXG4gICAgLy8gbm90IGNsZWFyIG90aGVyIGNvb2tpZXMuXG4gICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgfVxufVxuXG5sZXQgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuZnVuY3Rpb24gZ2V0QmFzZUVsZW1lbnRIcmVmKCk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgIGJhc2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpICE7XG4gICAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLy8gYmFzZWQgb24gdXJsVXRpbHMuanMgaW4gQW5ndWxhckpTIDFcbmxldCB1cmxQYXJzaW5nTm9kZTogYW55O1xuZnVuY3Rpb24gcmVsYXRpdmVQYXRoKHVybDogYW55KTogc3RyaW5nIHtcbiAgaWYgKCF1cmxQYXJzaW5nTm9kZSkge1xuICAgIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB9XG4gIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIHJldHVybiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lO1xufVxuIl19