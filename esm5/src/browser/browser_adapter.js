/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵparseCookieValue as parseCookieValue, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
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
var ɵ0 = function () {
    if (global['Node']) {
        return global['Node'].prototype.contains || function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        };
    }
    return undefined;
};
var nodeContains = (ɵ0)();
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9HLE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR25FLElBQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLDBGQUEwRjtBQUMxRixJQUFNLE9BQU8sR0FBMEI7SUFDckMsOEZBQThGO0lBQzlGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0QsMENBQTBDO0FBQzFDLElBQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVB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Q0QsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsR0FBRyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDckYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtXBhcnNlQ29va2llVmFsdWUgYXMgcGFyc2VDb29raWVWYWx1ZSwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7ybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHZW5lcmljQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vZ2VuZXJpY19icm93c2VyX2FkYXB0ZXInO1xuXG5cbmNvbnN0IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEID0gMztcblxuLy8gTWFwIHRvIGNvbnZlcnQgc29tZSBrZXkgb3Iga2V5SWRlbnRpZmllciB2YWx1ZXMgdG8gd2hhdCB3aWxsIGJlIHJldHVybmVkIGJ5IGdldEV2ZW50S2V5XG5jb25zdCBfa2V5TWFwOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gIC8vIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGFyZSBoZXJlIGZvciBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHkgYW5kIHRvIG1hdGNoIHRoZSBXM0Mgc3RhbmRhcmRcbiAgLy8gY2YgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLWtleS9cbiAgJ1xcYic6ICdCYWNrc3BhY2UnLFxuICAnXFx0JzogJ1RhYicsXG4gICdcXHg3Ric6ICdEZWxldGUnLFxuICAnXFx4MUInOiAnRXNjYXBlJyxcbiAgJ0RlbCc6ICdEZWxldGUnLFxuICAnRXNjJzogJ0VzY2FwZScsXG4gICdMZWZ0JzogJ0Fycm93TGVmdCcsXG4gICdSaWdodCc6ICdBcnJvd1JpZ2h0JyxcbiAgJ1VwJzogJ0Fycm93VXAnLFxuICAnRG93bic6ICdBcnJvd0Rvd24nLFxuICAnTWVudSc6ICdDb250ZXh0TWVudScsXG4gICdTY3JvbGwnOiAnU2Nyb2xsTG9jaycsXG4gICdXaW4nOiAnT1MnXG59O1xuXG4vLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4vLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4vLyAxLCAyLCAzIC4uLiBhcmUgcmVwb3J0ZWQgYXMgQSwgQiwgQyAuLi5cbmNvbnN0IF9jaHJvbWVOdW1LZXlQYWRNYXAgPSB7XG4gICdBJzogJzEnLFxuICAnQic6ICcyJyxcbiAgJ0MnOiAnMycsXG4gICdEJzogJzQnLFxuICAnRSc6ICc1JyxcbiAgJ0YnOiAnNicsXG4gICdHJzogJzcnLFxuICAnSCc6ICc4JyxcbiAgJ0knOiAnOScsXG4gICdKJzogJyonLFxuICAnSyc6ICcrJyxcbiAgJ00nOiAnLScsXG4gICdOJzogJy4nLFxuICAnTyc6ICcvJyxcbiAgJ1xceDYwJzogJzAnLFxuICAnXFx4OTAnOiAnTnVtTG9jaydcbn07XG5cbmNvbnN0IG5vZGVDb250YWluczogKHRoaXM6IE5vZGUsIG90aGVyOiBOb2RlKSA9PiBib29sZWFuID0gKCgpID0+IHtcbiAgaWYgKGdsb2JhbFsnTm9kZSddKSB7XG4gICAgcmV0dXJuIGdsb2JhbFsnTm9kZSddLnByb3RvdHlwZS5jb250YWlucyB8fCBmdW5jdGlvbih0aGlzOiBOb2RlLCBub2RlOiBhbnkpIHtcbiAgICAgIHJldHVybiAhISh0aGlzLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5vZGUpICYgMTYpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbn0pKCk7XG5cbi8qKlxuICogQSBgRG9tQWRhcHRlcmAgcG93ZXJlZCBieSBmdWxsIGJyb3dzZXIgRE9NIEFQSXMuXG4gKlxuICogQHNlY3VyaXR5IFRyZWFkIGNhcmVmdWxseSEgSW50ZXJhY3Rpbmcgd2l0aCB0aGUgRE9NIGRpcmVjdGx5IGlzIGRhbmdlcm91cyBhbmRcbiAqIGNhbiBpbnRyb2R1Y2UgWFNTIHJpc2tzLlxuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZTpyZXF1aXJlUGFyYW1ldGVyVHlwZSBuby1jb25zb2xlICovXG5leHBvcnQgY2xhc3MgQnJvd3NlckRvbUFkYXB0ZXIgZXh0ZW5kcyBHZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIge1xuICBzdGF0aWMgbWFrZUN1cnJlbnQoKSB7IHNldFJvb3REb21BZGFwdGVyKG5ldyBCcm93c2VyRG9tQWRhcHRlcigpKTsgfVxuICBzZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7ICg8YW55PmVsKVtuYW1lXSA9IHZhbHVlOyB9XG4gIGdldFByb3BlcnR5KGVsOiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gKDxhbnk+ZWwpW25hbWVdOyB9XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyAmJiB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnlTZWxlY3RvcihlbDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH1cbiAgcXVlcnlTZWxlY3RvckFsbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W10geyByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbiAgb25BbmRDYW5jZWwoZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIC8vIE5lZWRlZCB0byBmb2xsb3cgRGFydCdzIHN1YnNjcmlwdGlvbiBzZW1hbnRpYywgdW50aWwgZml4IG9mXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXJ0L2lzc3Vlcy9kZXRhaWw/aWQ9MTc0MDZcbiAgICByZXR1cm4gKCkgPT4geyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTsgfTtcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkgeyBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7IH1cbiAgbmV4dFNpYmxpbmcoZWw6IE5vZGUpOiBOb2RlfG51bGwgeyByZXR1cm4gZWwubmV4dFNpYmxpbmc7IH1cbiAgcGFyZW50RWxlbWVudChlbDogTm9kZSk6IE5vZGV8bnVsbCB7IHJldHVybiBlbC5wYXJlbnROb2RlOyB9XG4gIGNsZWFyTm9kZXMoZWw6IE5vZGUpIHtcbiAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG4gIGFwcGVuZENoaWxkKGVsOiBOb2RlLCBub2RlOiBOb2RlKSB7IGVsLmFwcGVuZENoaWxkKG5vZGUpOyB9XG4gIHJlbW92ZUNoaWxkKGVsOiBOb2RlLCBub2RlOiBOb2RlKSB7IGVsLnJlbW92ZUNoaWxkKG5vZGUpOyB9XG4gIHJlbW92ZShub2RlOiBOb2RlKTogTm9kZSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBOb2RlLCByZWY6IE5vZGUsIG5vZGU6IE5vZGUpIHsgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpOyB9XG4gIHNldFRleHQoZWw6IE5vZGUsIHZhbHVlOiBzdHJpbmcpIHsgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTsgfVxuICBnZXRWYWx1ZShlbDogYW55KTogc3RyaW5nIHsgcmV0dXJuIGVsLnZhbHVlOyB9XG4gIGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogQ29tbWVudCB7IHJldHVybiB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUNvbW1lbnQodGV4dCk7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgfVxuICBjcmVhdGVFbGVtZW50TlMobnM6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCBkb2M/OiBEb2N1bWVudCk6IEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWdOYW1lKTtcbiAgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogVGV4dCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuICBnZXRIb3N0KGVsOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuICg8YW55PmVsKS5ob3N0OyB9XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lKGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUobmFtZSk7XG4gIH1cbiAgYWRkQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuICByZW1vdmVDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKSB7IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG4gIHNldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIGVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWU7XG4gIH1cbiAgcmVtb3ZlU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZW5hbWU6IHN0cmluZykge1xuICAgIC8vIElFIHJlcXVpcmVzICcnIGluc3RlYWQgb2YgbnVsbFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgZWxlbWVudC5zdHlsZVtzdHlsZW5hbWVdID0gJyc7XG4gIH1cblxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXTsgfVxuXG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBFbGVtZW50LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZU5TKG5zLCBuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKSB7IGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7IH1cbiAgcmVtb3ZlQXR0cmlidXRlTlMoZWxlbWVudDogRWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGVOUyhucywgbmFtZSk7XG4gIH1cblxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCdmYWtlVGl0bGUnKTtcbiAgfVxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQgeyByZXR1cm4gZG9jdW1lbnQ7IH1cbiAgZ2V0VGl0bGUoZG9jOiBEb2N1bWVudCk6IHN0cmluZyB7IHJldHVybiBkb2MudGl0bGU7IH1cbiAgc2V0VGl0bGUoZG9jOiBEb2N1bWVudCwgbmV3VGl0bGU6IHN0cmluZykgeyBkb2MudGl0bGUgPSBuZXdUaXRsZSB8fCAnJzsgfVxuICBlbGVtZW50TWF0Y2hlcyhuOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc0VsZW1lbnROb2RlKG4pKSB7XG4gICAgICByZXR1cm4gbi5tYXRjaGVzICYmIG4ubWF0Y2hlcyhzZWxlY3RvcikgfHxcbiAgICAgICAgICBuLm1zTWF0Y2hlc1NlbGVjdG9yICYmIG4ubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpIHx8XG4gICAgICAgICAgbi53ZWJraXRNYXRjaGVzU2VsZWN0b3IgJiYgbi53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRWxlbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREU7IH1cblxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudDsgfVxuXG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBrZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSBldmVudC5rZXlJZGVudGlmaWVyO1xuICAgICAgLy8ga2V5SWRlbnRpZmllciBpcyBkZWZpbmVkIGluIHRoZSBvbGQgZHJhZnQgb2YgRE9NIExldmVsIDMgRXZlbnRzIGltcGxlbWVudGVkIGJ5IENocm9tZSBhbmRcbiAgICAgIC8vIFNhZmFyaSBjZlxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1VuaWRlbnRpZmllZCc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ1UrJykpIHtcbiAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChrZXkuc3Vic3RyaW5nKDIpLCAxNikpO1xuICAgICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIC8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbiAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4gICAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgICAga2V5ID0gKF9jaHJvbWVOdW1LZXlQYWRNYXAgYXMgYW55KVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9rZXlNYXBba2V5XSB8fCBrZXk7XG4gIH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHJldHVybiB3aW5kb3cuaGlzdG9yeTsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHJldHVybiB3aW5kb3cubG9jYXRpb247IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBocmVmID0gZ2V0QmFzZUVsZW1lbnRIcmVmKCk7XG4gICAgcmV0dXJuIGhyZWYgPT0gbnVsbCA/IG51bGwgOiByZWxhdGl2ZVBhdGgoaHJlZik7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgYmFzZUVsZW1lbnQgPSBudWxsOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7IH1cbiAgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyIHtcbiAgICAvLyBwZXJmb3JtYW5jZS5ub3coKSBpcyBub3QgYXZhaWxhYmxlIGluIGFsbCBicm93c2Vycywgc2VlXG4gICAgLy8gaHR0cDovL2Nhbml1c2UuY29tLyNzZWFyY2g9cGVyZm9ybWFuY2Uubm93XG4gICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID8gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG4gIHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGwgeyByZXR1cm4gcGFyc2VDb29raWVWYWx1ZShkb2N1bWVudC5jb29raWUsIG5hbWUpOyB9XG59XG5cbmxldCBiYXNlRWxlbWVudDogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG5mdW5jdGlvbiBnZXRCYXNlRWxlbWVudEhyZWYoKTogc3RyaW5nfG51bGwge1xuICBpZiAoIWJhc2VFbGVtZW50KSB7XG4gICAgYmFzZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdiYXNlJykgITtcbiAgICBpZiAoIWJhc2VFbGVtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJhc2VFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xufVxuXG4vLyBiYXNlZCBvbiB1cmxVdGlscy5qcyBpbiBBbmd1bGFySlMgMVxubGV0IHVybFBhcnNpbmdOb2RlOiBhbnk7XG5mdW5jdGlvbiByZWxhdGl2ZVBhdGgodXJsOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoIXVybFBhcnNpbmdOb2RlKSB7XG4gICAgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIH1cbiAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcbiAgcmV0dXJuICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgPyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWU7XG59XG4iXX0=