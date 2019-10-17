/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
            for (var sortedKeys_1 = tslib_1.__values(sortedKeys), sortedKeys_1_1 = sortedKeys_1.next(); !sortedKeys_1_1.done; sortedKeys_1_1 = sortedKeys_1.next()) {
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
    return new NgZone({ enableLongStackTrace: true, shouldCoalesceEventChangeDetection: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE1BQU0sQ0FBQyxJQUFJLGdCQUFrQyxDQUFDO0FBRTlDO0lBWUUsMEJBQVksRUFBZTtRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQVZ2RCxzQkFBWSxpQ0FBRzthQUFmO1lBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDekI7WUFFRCxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBRU0sc0JBQUssR0FBWixjQUFpQixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUlqRSxzQkFBSSx1Q0FBUzthQUFiLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyRSxzQkFBSSx1Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJ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QyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Tmdab25lLCDJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgbGV0IGJyb3dzZXJEZXRlY3Rpb246IEJyb3dzZXJEZXRlY3Rpb247XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyRGV0ZWN0aW9uIHtcbiAgcHJpdmF0ZSBfb3ZlcnJpZGVVYTogc3RyaW5nfG51bGw7XG4gIHByaXZhdGUgZ2V0IF91YSgpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fb3ZlcnJpZGVVYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vdmVycmlkZVVhO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRET00oKSA/IGdldERPTSgpLmdldFVzZXJBZ2VudCgpIDogJyc7XG4gIH1cblxuICBzdGF0aWMgc2V0dXAoKSB7IGJyb3dzZXJEZXRlY3Rpb24gPSBuZXcgQnJvd3NlckRldGVjdGlvbihudWxsKTsgfVxuXG4gIGNvbnN0cnVjdG9yKHVhOiBzdHJpbmd8bnVsbCkgeyB0aGlzLl9vdmVycmlkZVVhID0gdWE7IH1cblxuICBnZXQgaXNGaXJlZm94KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRmlyZWZveCcpID4gLTE7IH1cblxuICBnZXQgaXNBbmRyb2lkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNFZGdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID4gLTE7IH1cblxuICBnZXQgaXNJRSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ1RyaWRlbnQnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzV2Via2l0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTEgJiYgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNJT1M3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5fdWEuaW5kZXhPZignaVBob25lIE9TIDcnKSA+IC0xIHx8IHRoaXMuX3VhLmluZGV4T2YoJ2lQYWQgT1MgNycpID4gLTEpICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0lFTW9iaWxlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgaXNTbG93KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0FuZHJvaWQgfHwgdGhpcy5pc0lFIHx8IHRoaXMuaXNJT1M3OyB9XG5cbiAgLy8gVGhlIEludGwgQVBJIGlzIG9ubHkgbmF0aXZlbHkgc3VwcG9ydGVkIGluIENocm9tZSwgRmlyZWZveCwgSUUxMSBhbmQgRWRnZS5cbiAgLy8gVGhpcyBkZXRlY3RvciBpcyBuZWVkZWQgaW4gdGVzdHMgdG8gbWFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuOlxuICAvLyAxKSBJRTExL0VkZ2U6IHRoZXkgaGF2ZSBhIG5hdGl2ZSBJbnRsIEFQSSwgYnV0IHdpdGggc29tZSBkaXNjcmVwYW5jaWVzXG4gIC8vIDIpIElFOS9JRTEwOiB0aGV5IHVzZSB0aGUgcG9seWZpbGwsIGFuZCBzbyBubyBkaXNjcmVwYW5jaWVzXG4gIGdldCBzdXBwb3J0c05hdGl2ZUludGxBcGkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKDxhbnk+Z2xvYmFsKS5JbnRsICYmICg8YW55Pmdsb2JhbCkuSW50bCAhPT0gKDxhbnk+Z2xvYmFsKS5JbnRsUG9seWZpbGw7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVEZXNrdG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cblxuICAvLyBcIk9sZCBDaHJvbWVcIiBtZWFucyBDaHJvbWUgM1gsIHdoZXJlIHRoZXJlIGFyZSBzb21lIGRpc2NyZXBhbmNpZXMgaW4gdGhlIEludGwgQVBJLlxuICAvLyBBbmRyb2lkIDQuNCBhbmQgNS5YIGhhdmUgc3VjaCBicm93c2VycyBieSBkZWZhdWx0IChyZXNwZWN0aXZlbHkgMzAgYW5kIDM5KS5cbiAgZ2V0IGlzT2xkQ2hyb21lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0Nocm9tZS8zJykgPiAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdFZGdlJykgPT0gLTE7XG4gIH1cblxuICBnZXQgc3VwcG9ydHNDdXN0b21FbGVtZW50cygpIHsgcmV0dXJuICh0eXBlb2YoPGFueT5nbG9iYWwpLmN1c3RvbUVsZW1lbnRzICE9PSAndW5kZWZpbmVkJyk7IH1cblxuICBnZXQgc3VwcG9ydHNEZXByZWNhdGVkQ3VzdG9tQ3VzdG9tRWxlbWVudHNWMCgpIHtcbiAgICByZXR1cm4gKHR5cGVvZihkb2N1bWVudCBhcyBhbnkpLnJlZ2lzdGVyRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpO1xuICB9XG5cbiAgZ2V0IHN1cHBvcnRzUmVnRXhVbmljb2RlRmxhZygpOiBib29sZWFuIHsgcmV0dXJuIFJlZ0V4cC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ3VuaWNvZGUnKTsgfVxuXG4gIGdldCBzdXBwb3J0c1NoYWRvd0RvbSgpIHtcbiAgICBjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByZXR1cm4gKHR5cGVvZiB0ZXN0RWwuYXR0YWNoU2hhZG93ICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cblxuICBnZXQgc3VwcG9ydHNEZXByZWNhdGVkU2hhZG93RG9tVjAoKSB7XG4gICAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgYW55O1xuICAgIHJldHVybiAodHlwZW9mIHRlc3RFbC5jcmVhdGVTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJyk7XG4gIH1cbn1cblxuQnJvd3NlckRldGVjdGlvbi5zZXR1cCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChlbGVtZW50OiBhbnksIGV2ZW50VHlwZTogYW55KTogdm9pZCB7XG4gIGNvbnN0IGV2dDogRXZlbnQgPSBnZXRET00oKS5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgZXZ0LmluaXRFdmVudChldmVudFR5cGUsIHRydWUsIHRydWUpO1xuICBnZXRET00oKS5kaXNwYXRjaEV2ZW50KGVsZW1lbnQsIGV2dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNb3VzZUV2ZW50KGV2ZW50VHlwZTogc3RyaW5nKTogTW91c2VFdmVudCB7XG4gIGNvbnN0IGV2dDogTW91c2VFdmVudCA9IGdldERPTSgpLmdldERlZmF1bHREb2N1bWVudCgpLmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCB0cnVlLCB0cnVlKTtcbiAgcmV0dXJuIGV2dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsKGh0bWw6IHN0cmluZyk6IEhUTUxFbGVtZW50IHtcbiAgcmV0dXJuIDxIVE1MRWxlbWVudD5nZXRDb250ZW50KGNyZWF0ZVRlbXBsYXRlKGh0bWwpKS5maXJzdENoaWxkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ1NTKGNzczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNzcy5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC86XFxzL2csICc6JylcbiAgICAgIC5yZXBsYWNlKC8nL2csICdcIicpXG4gICAgICAucmVwbGFjZSgvIH0vZywgJ30nKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKChcXFwifFxccykoLispKFxcXCJ8XFxzKVxcKShcXHMqKS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgdXJsKFwiJHttYXRjaFsyXX1cIilgKVxuICAgICAgLnJlcGxhY2UoL1xcWyguKyk9KFteXCJcXF1dKylcXF0vZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYFske21hdGNoWzFdfT1cIiR7bWF0Y2hbMl19XCJdYCk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZU1hcChlbGVtZW50OiBhbnkpOiBNYXA8c3RyaW5nLCBzdHJpbmc+IHtcbiAgY29uc3QgcmVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgZWxBdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbEF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXR0cmliID0gZWxBdHRycy5pdGVtKGkpO1xuICAgIHJlcy5zZXQoYXR0cmliLm5hbWUsIGF0dHJpYi52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgX3NlbGZDbG9zaW5nVGFncyA9IFsnYnInLCAnaHInLCAnaW5wdXQnXTtcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlFbGVtZW50KGVsOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pOiBzdHJpbmcge1xuICBsZXQgcmVzdWx0ID0gJyc7XG4gIGlmIChnZXRET00oKS5pc0VsZW1lbnROb2RlKGVsKSkge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBPcGVuaW5nIHRhZ1xuICAgIHJlc3VsdCArPSBgPCR7dGFnTmFtZX1gO1xuXG4gICAgLy8gQXR0cmlidXRlcyBpbiBhbiBvcmRlcmVkIHdheVxuICAgIGNvbnN0IGF0dHJpYnV0ZU1hcCA9IGdldEF0dHJpYnV0ZU1hcChlbCk7XG4gICAgY29uc3Qgc29ydGVkS2V5cyA9IEFycmF5LmZyb20oYXR0cmlidXRlTWFwLmtleXMoKSkuc29ydCgpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIHNvcnRlZEtleXMpIHtcbiAgICAgIGNvbnN0IGxvd2VyQ2FzZUtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgbGV0IGF0dFZhbHVlID0gYXR0cmlidXRlTWFwLmdldChrZXkpO1xuXG4gICAgICBpZiAodHlwZW9mIGF0dFZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlcnMgb3JkZXIgc3R5bGUgcnVsZXMgZGlmZmVyZW50bHkuIE9yZGVyIHRoZW0gYWxwaGFiZXRpY2FsbHkgZm9yIGNvbnNpc3RlbmN5LlxuICAgICAgICBpZiAobG93ZXJDYXNlS2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgYXR0VmFsdWUgPSBhdHRWYWx1ZS5zcGxpdCgvOyA/LykuZmlsdGVyKHMgPT4gISFzKS5zb3J0KCkubWFwKHMgPT4gYCR7c307YCkuam9pbignICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ICs9IGAgJHtsb3dlckNhc2VLZXl9PVwiJHthdHRWYWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPic7XG5cbiAgICAvLyBDaGlsZHJlblxuICAgIGNvbnN0IGNoaWxkcmVuUm9vdCA9IHRlbXBsYXRlQXdhcmVSb290KGVsKTtcbiAgICBjb25zdCBjaGlsZHJlbiA9IGNoaWxkcmVuUm9vdCA/IGNoaWxkcmVuUm9vdC5jaGlsZE5vZGVzIDogW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ2lmeUVsZW1lbnQoY2hpbGRyZW5bal0pO1xuICAgIH1cblxuICAgIC8vIENsb3NpbmcgdGFnXG4gICAgaWYgKF9zZWxmQ2xvc2luZ1RhZ3MuaW5kZXhPZih0YWdOYW1lKSA9PSAtMSkge1xuICAgICAgcmVzdWx0ICs9IGA8LyR7dGFnTmFtZX0+YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICByZXN1bHQgKz0gYDwhLS0ke2VsLm5vZGVWYWx1ZX0tLT5gO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCArPSBlbC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZ1pvbmUoKTogTmdab25lIHtcbiAgcmV0dXJuIG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiB0cnVlLCBzaG91bGRDb2FsZXNjZUV2ZW50Q2hhbmdlRGV0ZWN0aW9uOiBmYWxzZX0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21tZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGV4dE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZW50KG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgaWYgKCdjb250ZW50JyBpbiBub2RlKSB7XG4gICAgcmV0dXJuICg8YW55Pm5vZGUpLmNvbnRlbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlQXdhcmVSb290KGVsOiBOb2RlKTogYW55IHtcbiAgcmV0dXJuIGdldERPTSgpLmlzRWxlbWVudE5vZGUoZWwpICYmIGVsLm5vZGVOYW1lID09PSAnVEVNUExBVEUnID8gZ2V0Q29udGVudChlbCkgOiBlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgLy8gZG9jdW1lbnQuY29va2llIGlzIG1hZ2ljYWwsIGFzc2lnbmluZyBpbnRvIGl0IGFzc2lnbnMvb3ZlcnJpZGVzIG9uZSBjb29raWUgdmFsdWUsIGJ1dCBkb2VzXG4gIC8vIG5vdCBjbGVhciBvdGhlciBjb29raWVzLlxuICBkb2N1bWVudC5jb29raWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VwcG9ydHNXZWJBbmltYXRpb24oKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YoPGFueT5FbGVtZW50KS5wcm90b3R5cGVbJ2FuaW1hdGUnXSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XG4gIGNvbnN0IHZhbHVlID0gZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdIHx8ICcnO1xuICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZENsYXNzTGlzdChlbGVtZW50OiBhbnkpOiBhbnlbXSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50LmNsYXNzTGlzdCwgMCkuc29ydCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGUoaHRtbDogYW55KTogSFRNTEVsZW1lbnQge1xuICBjb25zdCB0ID0gZ2V0RE9NKCkuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgdC5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkTm9kZXNBc0xpc3QoZWw6IE5vZGUpOiBhbnlbXSB7XG4gIGNvbnN0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuICBjb25zdCByZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2ldID0gY2hpbGROb2Rlc1tpXTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuIl19