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
    BrowserDomAdapter.makeCurrent = function () { setRootDomAdapter(new BrowserDomAdapter()); };
    BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
    BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
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
    BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
    BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
    BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return function () { el.removeEventListener(evt, listener, false); };
    };
    BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
    BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
    BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
    BrowserDomAdapter.prototype.clearNodes = function (el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };
    BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
    BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
    BrowserDomAdapter.prototype.remove = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    };
    BrowserDomAdapter.prototype.insertBefore = function (parent, ref, node) { parent.insertBefore(node, ref); };
    BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
    BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
    BrowserDomAdapter.prototype.createComment = function (text) { return this.getDefaultDocument().createComment(text); };
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
    BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
    BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
        return element.getElementsByTagName(name);
    };
    BrowserDomAdapter.prototype.addClass = function (element, className) { element.classList.add(className); };
    BrowserDomAdapter.prototype.removeClass = function (element, className) { element.classList.remove(className); };
    BrowserDomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    };
    BrowserDomAdapter.prototype.removeStyle = function (element, stylename) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[stylename] = '';
    };
    BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
    BrowserDomAdapter.prototype.getAttribute = function (element, attribute) {
        return element.getAttribute(attribute);
    };
    BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
    BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    };
    BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
    BrowserDomAdapter.prototype.removeAttributeNS = function (element, ns, name) {
        element.removeAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.createHtmlDocument = function () {
        return document.implementation.createHTMLDocument('fakeTitle');
    };
    BrowserDomAdapter.prototype.getDefaultDocument = function () { return document; };
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
    BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
    BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
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
    BrowserDomAdapter.prototype.performanceNow = function () {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    };
    BrowserDomAdapter.prototype.supportsCookies = function () { return true; };
    BrowserDomAdapter.prototype.getCookie = function (name) { return parseCookieValue(document.cookie, name); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR25FLElBQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLDBGQUEwRjtBQUMxRixJQUFNLE9BQU8sR0FBMEI7SUFDckMsOEZBQThGO0lBQzlGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0QsMENBQTBDO0FBQzFDLElBQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxF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LENBQUMsQ0FBQztLQUM5QztJQUNELGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ3JGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVwYXJzZUNvb2tpZVZhbHVlIGFzIHBhcnNlQ29va2llVmFsdWV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge8m1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7c2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJy4uL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7R2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyJztcblxuXG5jb25zdCBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCA9IDM7XG5cbi8vIE1hcCB0byBjb252ZXJ0IHNvbWUga2V5IG9yIGtleUlkZW50aWZpZXIgdmFsdWVzIHRvIHdoYXQgd2lsbCBiZSByZXR1cm5lZCBieSBnZXRFdmVudEtleVxuY29uc3QgX2tleU1hcDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAvLyBUaGUgZm9sbG93aW5nIHZhbHVlcyBhcmUgaGVyZSBmb3IgY3Jvc3MtYnJvd3NlciBjb21wYXRpYmlsaXR5IGFuZCB0byBtYXRjaCB0aGUgVzNDIHN0YW5kYXJkXG4gIC8vIGNmIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy1rZXkvXG4gICdcXGInOiAnQmFja3NwYWNlJyxcbiAgJ1xcdCc6ICdUYWInLFxuICAnXFx4N0YnOiAnRGVsZXRlJyxcbiAgJ1xceDFCJzogJ0VzY2FwZScsXG4gICdEZWwnOiAnRGVsZXRlJyxcbiAgJ0VzYyc6ICdFc2NhcGUnLFxuICAnTGVmdCc6ICdBcnJvd0xlZnQnLFxuICAnUmlnaHQnOiAnQXJyb3dSaWdodCcsXG4gICdVcCc6ICdBcnJvd1VwJyxcbiAgJ0Rvd24nOiAnQXJyb3dEb3duJyxcbiAgJ01lbnUnOiAnQ29udGV4dE1lbnUnLFxuICAnU2Nyb2xsJzogJ1Njcm9sbExvY2snLFxuICAnV2luJzogJ09TJ1xufTtcblxuLy8gVGhlcmUgaXMgYSBidWcgaW4gQ2hyb21lIGZvciBudW1lcmljIGtleXBhZCBrZXlzOlxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG5jb25zdCBfY2hyb21lTnVtS2V5UGFkTWFwID0ge1xuICAnQSc6ICcxJyxcbiAgJ0InOiAnMicsXG4gICdDJzogJzMnLFxuICAnRCc6ICc0JyxcbiAgJ0UnOiAnNScsXG4gICdGJzogJzYnLFxuICAnRyc6ICc3JyxcbiAgJ0gnOiAnOCcsXG4gICdJJzogJzknLFxuICAnSic6ICcqJyxcbiAgJ0snOiAnKycsXG4gICdNJzogJy0nLFxuICAnTic6ICcuJyxcbiAgJ08nOiAnLycsXG4gICdcXHg2MCc6ICcwJyxcbiAgJ1xceDkwJzogJ051bUxvY2snXG59O1xuXG5jb25zdCBub2RlQ29udGFpbnM6ICh0aGlzOiBOb2RlLCBvdGhlcjogTm9kZSkgPT4gYm9vbGVhbiA9ICgoKSA9PiB7XG4gIGlmIChnbG9iYWxbJ05vZGUnXSkge1xuICAgIHJldHVybiBnbG9iYWxbJ05vZGUnXS5wcm90b3R5cGUuY29udGFpbnMgfHwgZnVuY3Rpb24odGhpczogTm9kZSwgbm9kZTogYW55KSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihub2RlKSAmIDE2KTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG59KSgpO1xuXG4vKipcbiAqIEEgYERvbUFkYXB0ZXJgIHBvd2VyZWQgYnkgZnVsbCBicm93c2VyIERPTSBBUElzLlxuICpcbiAqIEBzZWN1cml0eSBUcmVhZCBjYXJlZnVsbHkhIEludGVyYWN0aW5nIHdpdGggdGhlIERPTSBkaXJlY3RseSBpcyBkYW5nZXJvdXMgYW5kXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgbm8tY29uc29sZSAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKSk7IH1cbiAgc2V0UHJvcGVydHkoZWw6IE5vZGUsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTsgfVxuICBnZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nKTogYW55IHsgcmV0dXJuICg8YW55PmVsKVtuYW1lXTsgfVxuXG4gIGxvZyhlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5sb2cgJiYgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cCAmJiB3aW5kb3cuY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cEVuZCAmJiB3aW5kb3cuY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXJ5U2VsZWN0b3IoZWw6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55IHsgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyB9XG4gIHF1ZXJ5U2VsZWN0b3JBbGwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdIHsgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpOyB9XG4gIG9uQW5kQ2FuY2VsKGVsOiBOb2RlLCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IEZ1bmN0aW9uIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAvLyBOZWVkZWQgdG8gZm9sbG93IERhcnQncyBzdWJzY3JpcHRpb24gc2VtYW50aWMsIHVudGlsIGZpeCBvZlxuICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZGFydC9pc3N1ZXMvZGV0YWlsP2lkPTE3NDA2XG4gICAgcmV0dXJuICgpID0+IHsgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7IH07XG4gIH1cbiAgZGlzcGF0Y2hFdmVudChlbDogTm9kZSwgZXZ0OiBhbnkpIHsgZWwuZGlzcGF0Y2hFdmVudChldnQpOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBOb2RlKTogTm9kZXxudWxsIHsgcmV0dXJuIGVsLm5leHRTaWJsaW5nOyB9XG4gIHBhcmVudEVsZW1lbnQoZWw6IE5vZGUpOiBOb2RlfG51bGwgeyByZXR1cm4gZWwucGFyZW50Tm9kZTsgfVxuICBjbGVhck5vZGVzKGVsOiBOb2RlKSB7XG4gICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuICBhcHBlbmRDaGlsZChlbDogTm9kZSwgbm9kZTogTm9kZSkgeyBlbC5hcHBlbmRDaGlsZChub2RlKTsgfVxuICByZW1vdmVDaGlsZChlbDogTm9kZSwgbm9kZTogTm9kZSkgeyBlbC5yZW1vdmVDaGlsZChub2RlKTsgfVxuICByZW1vdmUobm9kZTogTm9kZSk6IE5vZGUge1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogTm9kZSwgcmVmOiBOb2RlLCBub2RlOiBOb2RlKSB7IHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmKTsgfVxuICBzZXRUZXh0KGVsOiBOb2RlLCB2YWx1ZTogc3RyaW5nKSB7IGVsLnRleHRDb250ZW50ID0gdmFsdWU7IH1cbiAgZ2V0VmFsdWUoZWw6IGFueSk6IHN0cmluZyB7IHJldHVybiBlbC52YWx1ZTsgfVxuICBjcmVhdGVDb21tZW50KHRleHQ6IHN0cmluZyk6IENvbW1lbnQgeyByZXR1cm4gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVDb21tZW50KHRleHQpOyB9XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogc3RyaW5nLCBkb2M/OiBEb2N1bWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBkb2MgPSBkb2MgfHwgdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIH1cbiAgY3JlYXRlRWxlbWVudE5TKG5zOiBzdHJpbmcsIHRhZ05hbWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBFbGVtZW50IHtcbiAgICBkb2MgPSBkb2MgfHwgdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnTmFtZSk7XG4gIH1cbiAgY3JlYXRlVGV4dE5vZGUodGV4dDogc3RyaW5nLCBkb2M/OiBEb2N1bWVudCk6IFRleHQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gIH1cbiAgZ2V0SG9zdChlbDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7IHJldHVybiAoPGFueT5lbCkuaG9zdDsgfVxuICBnZXRFbGVtZW50c0J5VGFnTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKG5hbWUpO1xuICB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuICBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnN0eWxlW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICB9XG4gIHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXSA9ICcnO1xuICB9XG5cbiAgZ2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBlbGVtZW50LnN0eWxlW3N0eWxlbmFtZV07IH1cblxuICBnZXRBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cbiAgc2V0QXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgeyBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cbiAgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogRWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhucywgbmFtZSwgdmFsdWUpO1xuICB9XG4gIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZykgeyBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUpOyB9XG4gIHJlbW92ZUF0dHJpYnV0ZU5TKGVsZW1lbnQ6IEVsZW1lbnQsIG5zOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlTlMobnMsIG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnZmFrZVRpdGxlJyk7XG4gIH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHsgcmV0dXJuIGRvY3VtZW50OyB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZG9jLnRpdGxlOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgZG9jLnRpdGxlID0gbmV3VGl0bGUgfHwgJyc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNFbGVtZW50Tm9kZShuKSkge1xuICAgICAgcmV0dXJuIG4ubWF0Y2hlcyAmJiBuLm1hdGNoZXMoc2VsZWN0b3IpIHx8XG4gICAgICAgICAgbi5tc01hdGNoZXNTZWxlY3RvciAmJiBuLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSB8fFxuICAgICAgICAgIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yICYmIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0VsZW1lbnROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFOyB9XG5cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQ7IH1cblxuICBnZXRFdmVudEtleShldmVudDogYW55KTogc3RyaW5nIHtcbiAgICBsZXQga2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAga2V5ID0gZXZlbnQua2V5SWRlbnRpZmllcjtcbiAgICAgIC8vIGtleUlkZW50aWZpZXIgaXMgZGVmaW5lZCBpbiB0aGUgb2xkIGRyYWZ0IG9mIERPTSBMZXZlbCAzIEV2ZW50cyBpbXBsZW1lbnRlZCBieSBDaHJvbWUgYW5kXG4gICAgICAvLyBTYWZhcmkgY2ZcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDcvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDcxMjIxL2V2ZW50cy5odG1sI0V2ZW50cy1LZXlib2FyZEV2ZW50cy1JbnRlcmZhY2VzXG4gICAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdVbmlkZW50aWZpZWQnO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5zdGFydHNXaXRoKCdVKycpKSB7XG4gICAgICAgIGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoa2V5LnN1YnN0cmluZygyKSwgMTYpKTtcbiAgICAgICAgaWYgKGV2ZW50LmxvY2F0aW9uID09PSBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCAmJiBfY2hyb21lTnVtS2V5UGFkTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAvLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4gICAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuICAgICAgICAgIC8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuICAgICAgICAgIGtleSA9IChfY2hyb21lTnVtS2V5UGFkTWFwIGFzIGFueSlba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfa2V5TWFwW2tleV0gfHwga2V5O1xuICB9XG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyByZXR1cm4gd2luZG93Lmhpc3Rvcnk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyByZXR1cm4gd2luZG93LmxvY2F0aW9uOyB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgaHJlZiA9IGdldEJhc2VFbGVtZW50SHJlZigpO1xuICAgIHJldHVybiBocmVmID09IG51bGwgPyBudWxsIDogcmVsYXRpdmVQYXRoKGhyZWYpO1xuICB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IGJhc2VFbGVtZW50ID0gbnVsbDsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50OyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7XG4gICAgLy8gcGVyZm9ybWFuY2Uubm93KCkgaXMgbm90IGF2YWlsYWJsZSBpbiBhbGwgYnJvd3NlcnMsIHNlZVxuICAgIC8vIGh0dHA6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPXBlcmZvcm1hbmNlLm5vd1xuICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHsgcmV0dXJuIHBhcnNlQ29va2llVmFsdWUoZG9jdW1lbnQuY29va2llLCBuYW1lKTsgfVxufVxuXG5sZXQgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuZnVuY3Rpb24gZ2V0QmFzZUVsZW1lbnRIcmVmKCk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgIGJhc2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpICE7XG4gICAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLy8gYmFzZWQgb24gdXJsVXRpbHMuanMgaW4gQW5ndWxhckpTIDFcbmxldCB1cmxQYXJzaW5nTm9kZTogYW55O1xuZnVuY3Rpb24gcmVsYXRpdmVQYXRoKHVybDogYW55KTogc3RyaW5nIHtcbiAgaWYgKCF1cmxQYXJzaW5nTm9kZSkge1xuICAgIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB9XG4gIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIHJldHVybiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lO1xufVxuIl19