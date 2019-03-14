import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import * as i0 from "@angular/core";
/**
 * Factory to create Meta service.
 */
export function createMeta() {
    return new Meta(inject(DOCUMENT));
}
/**
 * A service that can be used to get and add meta tags.
 *
 * @publicApi
 */
var Meta = /** @class */ (function () {
    function Meta(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
    }
    Meta.prototype.addTag = function (tag, forceCreation) {
        if (forceCreation === void 0) { forceCreation = false; }
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    };
    Meta.prototype.addTags = function (tags, forceCreation) {
        var _this = this;
        if (forceCreation === void 0) { forceCreation = false; }
        if (!tags)
            return [];
        return tags.reduce(function (result, tag) {
            if (tag) {
                result.push(_this._getOrCreateElement(tag, forceCreation));
            }
            return result;
        }, []);
    };
    Meta.prototype.getTag = function (attrSelector) {
        if (!attrSelector)
            return null;
        return this._dom.querySelector(this._doc, "meta[" + attrSelector + "]") || null;
    };
    Meta.prototype.getTags = function (attrSelector) {
        if (!attrSelector)
            return [];
        var list /*NodeList*/ = this._dom.querySelectorAll(this._doc, "meta[" + attrSelector + "]");
        return list ? [].slice.call(list) : [];
    };
    Meta.prototype.updateTag = function (tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        var meta = this.getTag(selector);
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    };
    Meta.prototype.removeTag = function (attrSelector) { this.removeTagElement(this.getTag(attrSelector)); };
    Meta.prototype.removeTagElement = function (meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    };
    Meta.prototype._getOrCreateElement = function (meta, forceCreation) {
        if (forceCreation === void 0) { forceCreation = false; }
        if (!forceCreation) {
            var selector = this._parseSelector(meta);
            var elem = this.getTag(selector);
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this._containsAttributes(meta, elem))
                return elem;
        }
        var element = this._dom.createElement('meta');
        this._setMetaElementAttributes(meta, element);
        var head = this._dom.getElementsByTagName(this._doc, 'head')[0];
        this._dom.appendChild(head, element);
        return element;
    };
    Meta.prototype._setMetaElementAttributes = function (tag, el) {
        var _this = this;
        Object.keys(tag).forEach(function (prop) { return _this._dom.setAttribute(el, prop, tag[prop]); });
        return el;
    };
    Meta.prototype._parseSelector = function (tag) {
        var attr = tag.name ? 'name' : 'property';
        return attr + "=\"" + tag[attr] + "\"";
    };
    Meta.prototype._containsAttributes = function (tag, elem) {
        var _this = this;
        return Object.keys(tag).every(function (key) { return _this._dom.getAttribute(elem, key) === tag[key]; });
    };
    Meta.ngInjectableDef = i0.defineInjectable({ factory: createMeta, token: Meta, providedIn: "root" });
    Meta = tslib_1.__decorate([
        Injectable({ providedIn: 'root', useFactory: createMeta, deps: [] }),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], Meta);
    return Meta;
}());
export { Meta };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQWEsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7O0FBcUJ0RDs7R0FFRztBQUNILE1BQU0sVUFBVSxVQUFVO0lBQ3hCLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVEOzs7O0dBSUc7QUFFSDtJQUVFLGNBQXNDLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQUksSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFFMUUscUJBQU0sR0FBTixVQUFPLEdBQW1CLEVBQUUsYUFBOEI7UUFBOUIsOEJBQUEsRUFBQSxxQkFBOEI7UUFDeEQsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHNCQUFPLEdBQVAsVUFBUSxJQUFzQixFQUFFLGFBQThCO1FBQTlELGlCQVFDO1FBUitCLDhCQUFBLEVBQUEscUJBQThCO1FBQzVELElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBeUIsRUFBRSxHQUFtQjtZQUNoRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxN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XG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtEb21BZGFwdGVyLCBnZXRET019IGZyb20gJy4uL2RvbS9kb21fYWRhcHRlcic7XG5cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBtZXRhIGVsZW1lbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBNZXRhRGVmaW5pdGlvbiA9IHtcbiAgY2hhcnNldD86IHN0cmluZzsgY29udGVudD86IHN0cmluZzsgaHR0cEVxdWl2Pzogc3RyaW5nOyBpZD86IHN0cmluZzsgaXRlbXByb3A/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHByb3BlcnR5Pzogc3RyaW5nO1xuICBzY2hlbWU/OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbn0gJlxue1xuICAvLyBUT0RPKElnb3JNaW5hcik6IHRoaXMgdHlwZSBsb29rcyB3cm9uZ1xuICBbcHJvcDogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBGYWN0b3J5IHRvIGNyZWF0ZSBNZXRhIHNlcnZpY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXRhKCkge1xuICByZXR1cm4gbmV3IE1ldGEoaW5qZWN0KERPQ1VNRU5UKSk7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGFuZCBhZGQgbWV0YSB0YWdzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogY3JlYXRlTWV0YSwgZGVwczogW119KVxuZXhwb3J0IGNsYXNzIE1ldGEge1xuICBwcml2YXRlIF9kb206IERvbUFkYXB0ZXI7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7IHRoaXMuX2RvbSA9IGdldERPTSgpOyB9XG5cbiAgYWRkVGFnKHRhZzogTWV0YURlZmluaXRpb24sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIXRhZykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIGZvcmNlQ3JlYXRpb24pO1xuICB9XG5cbiAgYWRkVGFncyh0YWdzOiBNZXRhRGVmaW5pdGlvbltdLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOiBIVE1MTWV0YUVsZW1lbnRbXSB7XG4gICAgaWYgKCF0YWdzKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHRhZ3MucmVkdWNlKChyZXN1bHQ6IEhUTUxNZXRhRWxlbWVudFtdLCB0YWc6IE1ldGFEZWZpbml0aW9uKSA9PiB7XG4gICAgICBpZiAodGFnKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIGZvcmNlQ3JlYXRpb24pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgZ2V0VGFnKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghYXR0clNlbGVjdG9yKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZG9tLnF1ZXJ5U2VsZWN0b3IodGhpcy5fZG9jLCBgbWV0YVske2F0dHJTZWxlY3Rvcn1dYCkgfHwgbnVsbDtcbiAgfVxuXG4gIGdldFRhZ3MoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnRbXSB7XG4gICAgaWYgKCFhdHRyU2VsZWN0b3IpIHJldHVybiBbXTtcbiAgICBjb25zdCBsaXN0IC8qTm9kZUxpc3QqLyA9IHRoaXMuX2RvbS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX2RvYywgYG1ldGFbJHthdHRyU2VsZWN0b3J9XWApO1xuICAgIHJldHVybiBsaXN0ID8gW10uc2xpY2UuY2FsbChsaXN0KSA6IFtdO1xuICB9XG5cbiAgdXBkYXRlVGFnKHRhZzogTWV0YURlZmluaXRpb24sIHNlbGVjdG9yPzogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghdGFnKSByZXR1cm4gbnVsbDtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8IHRoaXMuX3BhcnNlU2VsZWN0b3IodGFnKTtcbiAgICBjb25zdCBtZXRhOiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLmdldFRhZyhzZWxlY3RvcikgITtcbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyh0YWcsIG1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgdHJ1ZSk7XG4gIH1cblxuICByZW1vdmVUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5yZW1vdmVUYWdFbGVtZW50KHRoaXMuZ2V0VGFnKGF0dHJTZWxlY3RvcikgISk7IH1cblxuICByZW1vdmVUYWdFbGVtZW50KG1ldGE6IEhUTUxNZXRhRWxlbWVudCk6IHZvaWQge1xuICAgIGlmIChtZXRhKSB7XG4gICAgICB0aGlzLl9kb20ucmVtb3ZlKG1ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE9yQ3JlYXRlRWxlbWVudChtZXRhOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTpcbiAgICAgIEhUTUxNZXRhRWxlbWVudCB7XG4gICAgaWYgKCFmb3JjZUNyZWF0aW9uKSB7XG4gICAgICBjb25zdCBzZWxlY3Rvcjogc3RyaW5nID0gdGhpcy5fcGFyc2VTZWxlY3RvcihtZXRhKTtcbiAgICAgIGNvbnN0IGVsZW06IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSAhO1xuICAgICAgLy8gSXQncyBhbGxvd2VkIHRvIGhhdmUgbXVsdGlwbGUgZWxlbWVudHMgd2l0aCB0aGUgc2FtZSBuYW1lIHNvIGl0J3Mgbm90IGVub3VnaCB0b1xuICAgICAgLy8ganVzdCBjaGVjayB0aGF0IGVsZW1lbnQgd2l0aCB0aGUgc2FtZSBuYW1lIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgcGFnZS4gV2UgYWxzbyBuZWVkIHRvXG4gICAgICAvLyBjaGVjayBpZiBlbGVtZW50IGhhcyB0YWcgYXR0cmlidXRlc1xuICAgICAgaWYgKGVsZW0gJiYgdGhpcy5fY29udGFpbnNBdHRyaWJ1dGVzKG1ldGEsIGVsZW0pKSByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudDogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5fZG9tLmNyZWF0ZUVsZW1lbnQoJ21ldGEnKSBhcyBIVE1MTWV0YUVsZW1lbnQ7XG4gICAgdGhpcy5fc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKG1ldGEsIGVsZW1lbnQpO1xuICAgIGNvbnN0IGhlYWQgPSB0aGlzLl9kb20uZ2V0RWxlbWVudHNCeVRhZ05hbWUodGhpcy5fZG9jLCAnaGVhZCcpWzBdO1xuICAgIHRoaXMuX2RvbS5hcHBlbmRDaGlsZChoZWFkLCBlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbDogSFRNTE1ldGFFbGVtZW50KTogSFRNTE1ldGFFbGVtZW50IHtcbiAgICBPYmplY3Qua2V5cyh0YWcpLmZvckVhY2goKHByb3A6IHN0cmluZykgPT4gdGhpcy5fZG9tLnNldEF0dHJpYnV0ZShlbCwgcHJvcCwgdGFnW3Byb3BdKSk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VTZWxlY3Rvcih0YWc6IE1ldGFEZWZpbml0aW9uKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdHRyOiBzdHJpbmcgPSB0YWcubmFtZSA/ICduYW1lJyA6ICdwcm9wZXJ0eSc7XG4gICAgcmV0dXJuIGAke2F0dHJ9PVwiJHt0YWdbYXR0cl19XCJgO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGFpbnNBdHRyaWJ1dGVzKHRhZzogTWV0YURlZmluaXRpb24sIGVsZW06IEhUTUxNZXRhRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0YWcpLmV2ZXJ5KChrZXk6IHN0cmluZykgPT4gdGhpcy5fZG9tLmdldEF0dHJpYnV0ZShlbGVtLCBrZXkpID09PSB0YWdba2V5XSk7XG4gIH1cbn1cbiJdfQ==