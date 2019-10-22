/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __values } from "tslib";
import { ɵgetDOM as getDOM } from '@angular/common';
import { NgZone, ɵglobal as global } from '@angular/core';
export var browserDetection;
var BrowserDetection = /** @class */ (function () {
    function BrowserDetection(ua) {
        this._overrideUa = ua;
    }
    Object.defineProperty(BrowserDetection.prototype, "_ua", {
        get: function () {
            if (typeof this._overrideUa === 'string') {
                return this._overrideUa;
            }
            return getDOM() ? getDOM().getUserAgent() : '';
        },
        enumerable: true,
        configurable: true
    });
    BrowserDetection.setup = function () { browserDetection = new BrowserDetection(null); };
    Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
        get: function () { return this._ua.indexOf('Firefox') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
        get: function () {
            return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isEdge", {
        get: function () { return this._ua.indexOf('Edge') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIE", {
        get: function () { return this._ua.indexOf('Trident') > -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
        get: function () {
            return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
        get: function () {
            return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                this._ua.indexOf('IEMobile') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isSlow", {
        get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
        // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
        // This detector is needed in tests to make the difference between:
        // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
        // 2) IE9/IE10: they use the polyfill, and so no discrepancies
        get: function () {
            return !!global.Intl && global.Intl !== global.IntlPolyfill;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
        // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
        // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
        get: function () {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                this._ua.indexOf('Edge') == -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsCustomElements", {
        get: function () { return (typeof global.customElements !== 'undefined'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsDeprecatedCustomCustomElementsV0", {
        get: function () {
            return (typeof document.registerElement !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsRegExUnicodeFlag", {
        get: function () { return RegExp.prototype.hasOwnProperty('unicode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsShadowDom", {
        get: function () {
            var testEl = document.createElement('div');
            return (typeof testEl.attachShadow !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserDetection.prototype, "supportsDeprecatedShadowDomV0", {
        get: function () {
            var testEl = document.createElement('div');
            return (typeof testEl.createShadowRoot !== 'undefined');
        },
        enumerable: true,
        configurable: true
    });
    return BrowserDetection;
}());
export { BrowserDetection };
BrowserDetection.setup();
export function dispatchEvent(element, eventType) {
    var evt = getDOM().getDefaultDocument().createEvent('Event');
    evt.initEvent(eventType, true, true);
    getDOM().dispatchEvent(element, evt);
}
export function createMouseEvent(eventType) {
    var evt = getDOM().getDefaultDocument().createEvent('MouseEvent');
    evt.initEvent(eventType, true, true);
    return evt;
}
export function el(html) {
    return getContent(createTemplate(html)).firstChild;
}
export function normalizeCSS(css) {
    return css.replace(/\s+/g, ' ')
        .replace(/:\s/g, ':')
        .replace(/'/g, '"')
        .replace(/ }/g, '}')
        .replace(/url\((\"|\s)(.+)(\"|\s)\)(\s*)/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "url(\"" + match[2] + "\")";
    })
        .replace(/\[(.+)=([^"\]]+)\]/g, function () {
        var match = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            match[_i] = arguments[_i];
        }
        return "[" + match[1] + "=\"" + match[2] + "\"]";
    });
}
function getAttributeMap(element) {
    var res = new Map();
    var elAttrs = element.attributes;
    for (var i = 0; i < elAttrs.length; i++) {
        var attrib = elAttrs.item(i);
        res.set(attrib.name, attrib.value);
    }
    return res;
}
var _selfClosingTags = ['br', 'hr', 'input'];
export function stringifyElement(el /** TODO #9100 */) {
    var e_1, _a;
    var result = '';
    if (getDOM().isElementNode(el)) {
        var tagName = el.tagName.toLowerCase();
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = getAttributeMap(el);
        var sortedKeys = Array.from(attributeMap.keys()).sort();
        try {
            for (var sortedKeys_1 = __values(sortedKeys), sortedKeys_1_1 = sortedKeys_1.next(); !sortedKeys_1_1.done; sortedKeys_1_1 = sortedKeys_1.next()) {
                var key = sortedKeys_1_1.value;
                var lowerCaseKey = key.toLowerCase();
                var attValue = attributeMap.get(key);
                if (typeof attValue !== 'string') {
                    result += " " + lowerCaseKey;
                }
                else {
                    // Browsers order style rules differently. Order them alphabetically for consistency.
                    if (lowerCaseKey === 'style') {
                        attValue = attValue.split(/; ?/).filter(function (s) { return !!s; }).sort().map(function (s) { return s + ";"; }).join(' ');
                    }
                    result += " " + lowerCaseKey + "=\"" + attValue + "\"";
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sortedKeys_1_1 && !sortedKeys_1_1.done && (_a = sortedKeys_1.return)) _a.call(sortedKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result += '>';
        // Children
        var childrenRoot = templateAwareRoot(el);
        var children = childrenRoot ? childrenRoot.childNodes : [];
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_selfClosingTags.indexOf(tagName) == -1) {
            result += "</" + tagName + ">";
        }
    }
    else if (isCommentNode(el)) {
        result += "<!--" + el.nodeValue + "-->";
    }
    else {
        result += el.textContent;
    }
    return result;
}
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
export function isCommentNode(node) {
    return node.nodeType === Node.COMMENT_NODE;
}
export function isTextNode(node) {
    return node.nodeType === Node.TEXT_NODE;
}
export function getContent(node) {
    if ('content' in node) {
        return node.content;
    }
    else {
        return node;
    }
}
export function templateAwareRoot(el) {
    return getDOM().isElementNode(el) && el.nodeName === 'TEMPLATE' ? getContent(el) : el;
}
export function setCookie(name, value) {
    // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
    // not clear other cookies.
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
export function supportsWebAnimation() {
    return typeof Element.prototype['animate'] === 'function';
}
export function hasStyle(element, styleName, styleValue) {
    var value = element.style[styleName] || '';
    return styleValue ? value == styleValue : value.length > 0;
}
export function hasClass(element, className) {
    return element.classList.contains(className);
}
export function sortedClassList(element) {
    return Array.prototype.slice.call(element.classList, 0).sort();
}
export function createTemplate(html) {
    var t = getDOM().getDefaultDocument().createElement('template');
    t.innerHTML = html;
    return t;
}
export function childNodesAsList(el) {
    var childNodes = el.childNodes;
    var res = [];
    for (var i = 0; i < childNodes.length; i++) {
        res[i] = childNodes[i];
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE1BQU0sQ0FBQyxJQUFJLGdCQUFrQyxDQUFDO0FBRTlDO0lBWUUsMEJBQVksRUFBZTtRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQVZ2RCxzQkFBWSxpQ0FBRzthQUFmO1lBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDekI7WUFFRCxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBRU0sc0JBQUssR0FBWixjQUFpQixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUlqRSxzQkFBSSx1Q0FBUzthQUFiLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyRSxzQkFBSSx1Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJ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R0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nWm9uZSwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGxldCBicm93c2VyRGV0ZWN0aW9uOiBCcm93c2VyRGV0ZWN0aW9uO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGVjdGlvbiB7XG4gIHByaXZhdGUgX292ZXJyaWRlVWE6IHN0cmluZ3xudWxsO1xuICBwcml2YXRlIGdldCBfdWEoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX292ZXJyaWRlVWEgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3ZlcnJpZGVVYTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RE9NKCkgPyBnZXRET00oKS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICB9XG5cbiAgc3RhdGljIHNldHVwKCkgeyBicm93c2VyRGV0ZWN0aW9uID0gbmV3IEJyb3dzZXJEZXRlY3Rpb24obnVsbCk7IH1cblxuICBjb25zdHJ1Y3Rvcih1YTogc3RyaW5nfG51bGwpIHsgdGhpcy5fb3ZlcnJpZGVVYSA9IHVhOyB9XG5cbiAgZ2V0IGlzRmlyZWZveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzRWRnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzSUUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdUcmlkZW50JykgPiAtMTsgfVxuXG4gIGdldCBpc1dlYmtpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX3VhLmluZGV4T2YoJ2lQaG9uZSBPUyA3JykgPiAtMSB8fCB0aGlzLl91YS5pbmRleE9mKCdpUGFkIE9TIDcnKSA+IC0xKSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzU2xvdygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMuaXNJRSB8fCB0aGlzLmlzSU9TNzsgfVxuXG4gIC8vIFRoZSBJbnRsIEFQSSBpcyBvbmx5IG5hdGl2ZWx5IHN1cHBvcnRlZCBpbiBDaHJvbWUsIEZpcmVmb3gsIElFMTEgYW5kIEVkZ2UuXG4gIC8vIFRoaXMgZGV0ZWN0b3IgaXMgbmVlZGVkIGluIHRlc3RzIHRvIG1ha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbjpcbiAgLy8gMSkgSUUxMS9FZGdlOiB0aGV5IGhhdmUgYSBuYXRpdmUgSW50bCBBUEksIGJ1dCB3aXRoIHNvbWUgZGlzY3JlcGFuY2llc1xuICAvLyAyKSBJRTkvSUUxMDogdGhleSB1c2UgdGhlIHBvbHlmaWxsLCBhbmQgc28gbm8gZGlzY3JlcGFuY2llc1xuICBnZXQgc3VwcG9ydHNOYXRpdmVJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISg8YW55Pmdsb2JhbCkuSW50bCAmJiAoPGFueT5nbG9iYWwpLkludGwgIT09ICg8YW55Pmdsb2JhbCkuSW50bFBvbHlmaWxsO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lRGVza3RvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgLy8gXCJPbGQgQ2hyb21lXCIgbWVhbnMgQ2hyb21lIDNYLCB3aGVyZSB0aGVyZSBhcmUgc29tZSBkaXNjcmVwYW5jaWVzIGluIHRoZSBJbnRsIEFQSS5cbiAgLy8gQW5kcm9pZCA0LjQgYW5kIDUuWCBoYXZlIHN1Y2ggYnJvd3NlcnMgYnkgZGVmYXVsdCAocmVzcGVjdGl2ZWx5IDMwIGFuZCAzOSkuXG4gIGdldCBpc09sZENocm9tZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvMycpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IHN1cHBvcnRzQ3VzdG9tRWxlbWVudHMoKSB7IHJldHVybiAodHlwZW9mKDxhbnk+Z2xvYmFsKS5jdXN0b21FbGVtZW50cyAhPT0gJ3VuZGVmaW5lZCcpOyB9XG5cbiAgZ2V0IHN1cHBvcnRzRGVwcmVjYXRlZEN1c3RvbUN1c3RvbUVsZW1lbnRzVjAoKSB7XG4gICAgcmV0dXJuICh0eXBlb2YoZG9jdW1lbnQgYXMgYW55KS5yZWdpc3RlckVsZW1lbnQgIT09ICd1bmRlZmluZWQnKTtcbiAgfVxuXG4gIGdldCBzdXBwb3J0c1JlZ0V4VW5pY29kZUZsYWcoKTogYm9vbGVhbiB7IHJldHVybiBSZWdFeHAucHJvdG90eXBlLmhhc093blByb3BlcnR5KCd1bmljb2RlJyk7IH1cblxuICBnZXQgc3VwcG9ydHNTaGFkb3dEb20oKSB7XG4gICAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcmV0dXJuICh0eXBlb2YgdGVzdEVsLmF0dGFjaFNoYWRvdyAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cbiAgZ2V0IHN1cHBvcnRzRGVwcmVjYXRlZFNoYWRvd0RvbVYwKCkge1xuICAgIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIGFueTtcbiAgICByZXR1cm4gKHR5cGVvZiB0ZXN0RWwuY3JlYXRlU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG59XG5cbkJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudDogYW55LCBldmVudFR5cGU6IGFueSk6IHZvaWQge1xuICBjb25zdCBldnQ6IEV2ZW50ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgZ2V0RE9NKCkuZGlzcGF0Y2hFdmVudChlbGVtZW50LCBldnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IHN0cmluZyk6IE1vdXNlRXZlbnQge1xuICBjb25zdCBldnQ6IE1vdXNlRXZlbnQgPSBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHJldHVybiBldnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbChodG1sOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIHJldHVybiA8SFRNTEVsZW1lbnQ+Z2V0Q29udGVudChjcmVhdGVUZW1wbGF0ZShodG1sKSkuZmlyc3RDaGlsZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNTUyhjc3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjc3MucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvOlxccy9nLCAnOicpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnXCInKVxuICAgICAgLnJlcGxhY2UoLyB9L2csICd9JylcbiAgICAgIC5yZXBsYWNlKC91cmxcXCgoXFxcInxcXHMpKC4rKShcXFwifFxccylcXCkoXFxzKikvZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYHVybChcIiR7bWF0Y2hbMl19XCIpYClcbiAgICAgIC5yZXBsYWNlKC9cXFsoLispPShbXlwiXFxdXSspXFxdL2csICguLi5tYXRjaDogc3RyaW5nW10pID0+IGBbJHttYXRjaFsxXX09XCIke21hdGNoWzJdfVwiXWApO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVNYXAoZWxlbWVudDogYW55KTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gIGNvbnN0IHJlcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gIGNvbnN0IGVsQXR0cnMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGF0dHJpYiA9IGVsQXR0cnMuaXRlbShpKTtcbiAgICByZXMuc2V0KGF0dHJpYi5uYW1lLCBhdHRyaWIudmFsdWUpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmNvbnN0IF9zZWxmQ2xvc2luZ1RhZ3MgPSBbJ2JyJywgJ2hyJywgJ2lucHV0J107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5RWxlbWVudChlbDogYW55IC8qKiBUT0RPICM5MTAwICovKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShlbCkpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gT3BlbmluZyB0YWdcbiAgICByZXN1bHQgKz0gYDwke3RhZ05hbWV9YDtcblxuICAgIC8vIEF0dHJpYnV0ZXMgaW4gYW4gb3JkZXJlZCB3YXlcbiAgICBjb25zdCBhdHRyaWJ1dGVNYXAgPSBnZXRBdHRyaWJ1dGVNYXAoZWwpO1xuICAgIGNvbnN0IHNvcnRlZEtleXMgPSBBcnJheS5mcm9tKGF0dHJpYnV0ZU1hcC5rZXlzKCkpLnNvcnQoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBzb3J0ZWRLZXlzKSB7XG4gICAgICBjb25zdCBsb3dlckNhc2VLZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCBhdHRWYWx1ZSA9IGF0dHJpYnV0ZU1hcC5nZXQoa2V5KTtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRWYWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0ICs9IGAgJHtsb3dlckNhc2VLZXl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXJzIG9yZGVyIHN0eWxlIHJ1bGVzIGRpZmZlcmVudGx5LiBPcmRlciB0aGVtIGFscGhhYmV0aWNhbGx5IGZvciBjb25zaXN0ZW5jeS5cbiAgICAgICAgaWYgKGxvd2VyQ2FzZUtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgIGF0dFZhbHVlID0gYXR0VmFsdWUuc3BsaXQoLzsgPy8pLmZpbHRlcihzID0+ICEhcykuc29ydCgpLm1hcChzID0+IGAke3N9O2ApLmpvaW4oJyAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fT1cIiR7YXR0VmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJz4nO1xuXG4gICAgLy8gQ2hpbGRyZW5cbiAgICBjb25zdCBjaGlsZHJlblJvb3QgPSB0ZW1wbGF0ZUF3YXJlUm9vdChlbCk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBjaGlsZHJlblJvb3QgPyBjaGlsZHJlblJvb3QuY2hpbGROb2RlcyA6IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlFbGVtZW50KGNoaWxkcmVuW2pdKTtcbiAgICB9XG5cbiAgICAvLyBDbG9zaW5nIHRhZ1xuICAgIGlmIChfc2VsZkNsb3NpbmdUYWdzLmluZGV4T2YodGFnTmFtZSkgPT0gLTEpIHtcbiAgICAgIHJlc3VsdCArPSBgPC8ke3RhZ05hbWV9PmA7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQ29tbWVudE5vZGUoZWwpKSB7XG4gICAgcmVzdWx0ICs9IGA8IS0tJHtlbC5ub2RlVmFsdWV9LS0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gZWwudGV4dENvbnRlbnQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogdHJ1ZX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21tZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgaWYgKCdjb250ZW50JyBpbiBub2RlKSB7XG4gICAgcmV0dXJuICg8YW55Pm5vZGUpLmNvbnRlbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlQXdhcmVSb290KGVsOiBOb2RlKTogYW55IHtcbiAgcmV0dXJuIGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpICYmIGVsLm5vZGVOYW1lID09PSAnVEVNUExBVEUnID8gZ2V0Q29udGVudChlbCkgOiBlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gZG9jdW1lbnQuY29va2llIGlzIG1hZ2ljYWwsIGFzc2lnbmluZyBpbnRvIGl0IGFzc2lnbnMvb3ZlcnJpZGVzIG9uZSBjb29raWUgdmFsdWUsIGJ1dCBkb2VzXG4gIC8vIG5vdCBjbGVhciBvdGhlciBjb29raWVzLlxuICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YoPGFueT5FbGVtZW50KS5wcm90b3R5cGVbJ2FuaW1hdGUnXSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XG4gIGNvbnN0IHZhbHVlID0gZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdIHx8ICcnO1xuICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZENsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCwgMCkuc29ydCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoaHRtbDogYW55KTogSFRNTEVsZW1lbnQge1xuICBjb25zdCB0ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgdC5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTm9kZXNBc0xpc3QoZWw6IE5vZGUpOiBhbnlbXSB7XG4gIGNvbnN0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuICBjb25zdCByZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2ldID0gY2hpbGROb2Rlc1tpXTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl19