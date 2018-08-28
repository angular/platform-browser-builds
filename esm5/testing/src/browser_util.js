/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { NgZone, ɵglobal as global } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
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
    return BrowserDetection;
}());
export { BrowserDetection };
BrowserDetection.setup();
export function dispatchEvent(element, eventType) {
    getDOM().dispatchEvent(element, getDOM().createEvent(eventType));
}
export function el(html) {
    return getDOM().firstChild(getDOM().content(getDOM().createTemplate(html)));
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
var _singleTagWhitelist = ['br', 'hr', 'input'];
export function stringifyElement(el /** TODO #9100 */) {
    var e_1, _a;
    var result = '';
    if (getDOM().isElementNode(el)) {
        var tagName = getDOM().tagName(el).toLowerCase();
        // Opening tag
        result += "<" + tagName;
        // Attributes in an ordered way
        var attributeMap = getDOM().attributeMap(el);
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
        var childrenRoot = getDOM().templateAwareRoot(el);
        var children = childrenRoot ? getDOM().childNodes(childrenRoot) : [];
        for (var j = 0; j < children.length; j++) {
            result += stringifyElement(children[j]);
        }
        // Closing tag
        if (_singleTagWhitelist.indexOf(tagName) == -1) {
            result += "</" + tagName + ">";
        }
    }
    else if (getDOM().isCommentNode(el)) {
        result += "<!--" + getDOM().nodeValue(el) + "-->";
    }
    else {
        result += getDOM().getText(el);
    }
    return result;
}
export function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL3NyYy9icm93c2VyX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRTVELE1BQU0sQ0FBQyxJQUFJLGdCQUFrQyxDQUFDO0FBRTlDO0lBWUUsMEJBQVksRUFBZTtRQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQVZ2RCxzQkFBWSxpQ0FBRzthQUFmO1lBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO2dCQUN4QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDekI7WUFFRCxPQUFPLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pELENBQUM7OztPQUFBO0lBRU0sc0JBQUssR0FBWixjQUFpQixnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUlqRSxzQkFBSSx1Q0FBUzthQUFiLGNBQTJCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyRSxzQkFBSSx1Q0FBUzthQUFiO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJ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b2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nWm9uZSwgybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZXhwb3J0IGxldCBicm93c2VyRGV0ZWN0aW9uOiBCcm93c2VyRGV0ZWN0aW9uO1xuXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGVjdGlvbiB7XG4gIHByaXZhdGUgX292ZXJyaWRlVWE6IHN0cmluZ3xudWxsO1xuICBwcml2YXRlIGdldCBfdWEoKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX292ZXJyaWRlVWEgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3ZlcnJpZGVVYTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0RE9NKCkgPyBnZXRET00oKS5nZXRVc2VyQWdlbnQoKSA6ICcnO1xuICB9XG5cbiAgc3RhdGljIHNldHVwKCkgeyBicm93c2VyRGV0ZWN0aW9uID0gbmV3IEJyb3dzZXJEZXRlY3Rpb24obnVsbCk7IH1cblxuICBjb25zdHJ1Y3Rvcih1YTogc3RyaW5nfG51bGwpIHsgdGhpcy5fb3ZlcnJpZGVVYSA9IHVhOyB9XG5cbiAgZ2V0IGlzRmlyZWZveCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgICAgIHRoaXMuX3VhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzRWRnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA+IC0xOyB9XG5cbiAgZ2V0IGlzSUUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl91YS5pbmRleE9mKCdUcmlkZW50JykgPiAtMTsgfVxuXG4gIGdldCBpc1dlYmtpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xICYmIHRoaXMuX3VhLmluZGV4T2YoJ0VkZ2UnKSA9PSAtMSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzSU9TNygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX3VhLmluZGV4T2YoJ2lQaG9uZSBPUyA3JykgPiAtMSB8fCB0aGlzLl91YS5pbmRleE9mKCdpUGFkIE9TIDcnKSA+IC0xKSAmJlxuICAgICAgICB0aGlzLl91YS5pbmRleE9mKCdJRU1vYmlsZScpID09IC0xO1xuICB9XG5cbiAgZ2V0IGlzU2xvdygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNBbmRyb2lkIHx8IHRoaXMuaXNJRSB8fCB0aGlzLmlzSU9TNzsgfVxuXG4gIC8vIFRoZSBJbnRsIEFQSSBpcyBvbmx5IG5hdGl2ZWx5IHN1cHBvcnRlZCBpbiBDaHJvbWUsIEZpcmVmb3gsIElFMTEgYW5kIEVkZ2UuXG4gIC8vIFRoaXMgZGV0ZWN0b3IgaXMgbmVlZGVkIGluIHRlc3RzIHRvIG1ha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbjpcbiAgLy8gMSkgSUUxMS9FZGdlOiB0aGV5IGhhdmUgYSBuYXRpdmUgSW50bCBBUEksIGJ1dCB3aXRoIHNvbWUgZGlzY3JlcGFuY2llc1xuICAvLyAyKSBJRTkvSUUxMDogdGhleSB1c2UgdGhlIHBvbHlmaWxsLCBhbmQgc28gbm8gZGlzY3JlcGFuY2llc1xuICBnZXQgc3VwcG9ydHNOYXRpdmVJbnRsQXBpKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhISg8YW55Pmdsb2JhbCkuSW50bCAmJiAoPGFueT5nbG9iYWwpLkludGwgIT09ICg8YW55Pmdsb2JhbCkuSW50bFBvbHlmaWxsO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lRGVza3RvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgPT0gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG5cbiAgLy8gXCJPbGQgQ2hyb21lXCIgbWVhbnMgQ2hyb21lIDNYLCB3aGVyZSB0aGVyZSBhcmUgc29tZSBkaXNjcmVwYW5jaWVzIGluIHRoZSBJbnRsIEFQSS5cbiAgLy8gQW5kcm9pZCA0LjQgYW5kIDUuWCBoYXZlIHN1Y2ggYnJvd3NlcnMgYnkgZGVmYXVsdCAocmVzcGVjdGl2ZWx5IDMwIGFuZCAzOSkuXG4gIGdldCBpc09sZENocm9tZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdWEuaW5kZXhPZignQ2hyb21lJykgPiAtMSAmJiB0aGlzLl91YS5pbmRleE9mKCdDaHJvbWUvMycpID4gLTEgJiZcbiAgICAgICAgdGhpcy5fdWEuaW5kZXhPZignRWRnZScpID09IC0xO1xuICB9XG59XG5cbkJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZWxlbWVudDogYW55LCBldmVudFR5cGU6IGFueSk6IHZvaWQge1xuICBnZXRET00oKS5kaXNwYXRjaEV2ZW50KGVsZW1lbnQsIGdldERPTSgpLmNyZWF0ZUV2ZW50KGV2ZW50VHlwZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZWwoaHRtbDogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICByZXR1cm4gPEhUTUxFbGVtZW50PmdldERPTSgpLmZpcnN0Q2hpbGQoZ2V0RE9NKCkuY29udGVudChnZXRET00oKS5jcmVhdGVUZW1wbGF0ZShodG1sKSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ1NTKGNzczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNzcy5yZXBsYWNlKC9cXHMrL2csICcgJylcbiAgICAgIC5yZXBsYWNlKC86XFxzL2csICc6JylcbiAgICAgIC5yZXBsYWNlKC8nL2csICdcIicpXG4gICAgICAucmVwbGFjZSgvIH0vZywgJ30nKVxuICAgICAgLnJlcGxhY2UoL3VybFxcKChcXFwifFxccykoLispKFxcXCJ8XFxzKVxcKShcXHMqKS9nLCAoLi4ubWF0Y2g6IHN0cmluZ1tdKSA9PiBgdXJsKFwiJHttYXRjaFsyXX1cIilgKVxuICAgICAgLnJlcGxhY2UoL1xcWyguKyk9KFteXCJcXF1dKylcXF0vZywgKC4uLm1hdGNoOiBzdHJpbmdbXSkgPT4gYFske21hdGNoWzFdfT1cIiR7bWF0Y2hbMl19XCJdYCk7XG59XG5cbmNvbnN0IF9zaW5nbGVUYWdXaGl0ZWxpc3QgPSBbJ2JyJywgJ2hyJywgJ2lucHV0J107XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5RWxlbWVudChlbDogYW55IC8qKiBUT0RPICM5MTAwICovKTogc3RyaW5nIHtcbiAgbGV0IHJlc3VsdCA9ICcnO1xuICBpZiAoZ2V0RE9NKCkuaXNFbGVtZW50Tm9kZShlbCkpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gZ2V0RE9NKCkudGFnTmFtZShlbCkudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIE9wZW5pbmcgdGFnXG4gICAgcmVzdWx0ICs9IGA8JHt0YWdOYW1lfWA7XG5cbiAgICAvLyBBdHRyaWJ1dGVzIGluIGFuIG9yZGVyZWQgd2F5XG4gICAgY29uc3QgYXR0cmlidXRlTWFwID0gZ2V0RE9NKCkuYXR0cmlidXRlTWFwKGVsKTtcbiAgICBjb25zdCBzb3J0ZWRLZXlzID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVNYXAua2V5cygpKS5zb3J0KCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2Ygc29ydGVkS2V5cykge1xuICAgICAgY29uc3QgbG93ZXJDYXNlS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgYXR0VmFsdWUgPSBhdHRyaWJ1dGVNYXAuZ2V0KGtleSk7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0VmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCArPSBgICR7bG93ZXJDYXNlS2V5fWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VycyBvcmRlciBzdHlsZSBydWxlcyBkaWZmZXJlbnRseS4gT3JkZXIgdGhlbSBhbHBoYWJldGljYWxseSBmb3IgY29uc2lzdGVuY3kuXG4gICAgICAgIGlmIChsb3dlckNhc2VLZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICBhdHRWYWx1ZSA9IGF0dFZhbHVlLnNwbGl0KC87ID8vKS5maWx0ZXIocyA9PiAhIXMpLnNvcnQoKS5tYXAocyA9PiBgJHtzfTtgKS5qb2luKCcgJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgKz0gYCAke2xvd2VyQ2FzZUtleX09XCIke2F0dFZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc+JztcblxuICAgIC8vIENoaWxkcmVuXG4gICAgY29uc3QgY2hpbGRyZW5Sb290ID0gZ2V0RE9NKCkudGVtcGxhdGVBd2FyZVJvb3QoZWwpO1xuICAgIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5Sb290ID8gZ2V0RE9NKCkuY2hpbGROb2RlcyhjaGlsZHJlblJvb3QpIDogW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ2lmeUVsZW1lbnQoY2hpbGRyZW5bal0pO1xuICAgIH1cblxuICAgIC8vIENsb3NpbmcgdGFnXG4gICAgaWYgKF9zaW5nbGVUYWdXaGl0ZWxpc3QuaW5kZXhPZih0YWdOYW1lKSA9PSAtMSkge1xuICAgICAgcmVzdWx0ICs9IGA8LyR7dGFnTmFtZX0+YDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZ2V0RE9NKCkuaXNDb21tZW50Tm9kZShlbCkpIHtcbiAgICByZXN1bHQgKz0gYDwhLS0ke2dldERPTSgpLm5vZGVWYWx1ZShlbCl9LS0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gZ2V0RE9NKCkuZ2V0VGV4dChlbCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmdab25lKCk6IE5nWm9uZSB7XG4gIHJldHVybiBuZXcgTmdab25lKHtlbmFibGVMb25nU3RhY2tUcmFjZTogdHJ1ZX0pO1xufVxuIl19