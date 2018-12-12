/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, inject } from '@angular/core';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
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
    Meta.ngInjectableDef = i0.defineInjectable({ token: Meta, factory: function Meta_Factory(t) { var r = null; if (t) {
            (r = new t(i0.inject(DOCUMENT)));
        }
        else {
            (r = createMeta());
        } return r; }, providedIn: 'root' });
    return Meta;
}());
export { Meta };
/*@__PURE__*/ i0.ɵsetClassMetadata(Meta, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createMeta, deps: [] }]
    }], [{
        type: undefined,
        decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }]
    }], null);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvbWV0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFhLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFxQjNDOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFVBQVU7SUFDeEIsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBR0UsY0FBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUUxRSxxQkFBTSxHQUFOLFVBQU8sR0FBbUIsRUFBRSxhQUE4QjtRQUE5Qiw4QkFBQSxFQUFBLHFCQUE4QjtRQUN4RCxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsc0JBQU8sR0FBUCxVQUFRLElBQXNCLEVBQUUsYUFBOEI7UUFBOUQsaUJBUUM7UUFSK0IsOEJBQUEsRUFBQSxxQkFBOEI7UUFDNUQsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUF5QixFQUFFLEdBQW1CO1lBQ2hFLElBQUksR0FBRyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxD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aHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RvbUFkYXB0ZXIsIGdldERPTX0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbS9kb21fdG9rZW5zJztcblxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1ldGEgZWxlbWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIE1ldGFEZWZpbml0aW9uID0ge1xuICBjaGFyc2V0Pzogc3RyaW5nOyBjb250ZW50Pzogc3RyaW5nOyBodHRwRXF1aXY/OiBzdHJpbmc7IGlkPzogc3RyaW5nOyBpdGVtcHJvcD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgcHJvcGVydHk/OiBzdHJpbmc7XG4gIHNjaGVtZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xufSAmXG57XG4gIC8vIFRPRE8oSWdvck1pbmFyKTogdGhpcyB0eXBlIGxvb2tzIHdyb25nXG4gIFtwcm9wOiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIEZhY3RvcnkgdG8gY3JlYXRlIE1ldGEgc2VydmljZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1ldGEoKSB7XG4gIHJldHVybiBuZXcgTWV0YShpbmplY3QoRE9DVU1FTlQpKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgdGhhdCBjYW4gYmUgdXNlZCB0byBnZXQgYW5kIGFkZCBtZXRhIHRhZ3MuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBjcmVhdGVNZXRhLCBkZXBzOiBbXX0pXG5leHBvcnQgY2xhc3MgTWV0YSB7XG4gIHByaXZhdGUgX2RvbTogRG9tQWRhcHRlcjtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHsgdGhpcy5fZG9tID0gZ2V0RE9NKCk7IH1cblxuICBhZGRUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogSFRNTE1ldGFFbGVtZW50fG51bGwge1xuICAgIGlmICghdGFnKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbik7XG4gIH1cblxuICBhZGRUYWdzKHRhZ3M6IE1ldGFEZWZpbml0aW9uW10sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIXRhZ3MpIHJldHVybiBbXTtcbiAgICByZXR1cm4gdGFncy5yZWR1Y2UoKHJlc3VsdDogSFRNTE1ldGFFbGVtZW50W10sIHRhZzogTWV0YURlZmluaXRpb24pID0+IHtcbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgZm9yY2VDcmVhdGlvbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCBbXSk7XG4gIH1cblxuICBnZXRUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCFhdHRyU2VsZWN0b3IpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9kb20ucXVlcnlTZWxlY3Rvcih0aGlzLl9kb2MsIGBtZXRhWyR7YXR0clNlbGVjdG9yfV1gKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0VGFncyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudFtdIHtcbiAgICBpZiAoIWF0dHJTZWxlY3RvcikgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGxpc3QgLypOb2RlTGlzdCovID0gdGhpcy5fZG9tLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fZG9jLCBgbWV0YVske2F0dHJTZWxlY3Rvcn1dYCk7XG4gICAgcmV0dXJuIGxpc3QgPyBbXS5zbGljZS5jYWxsKGxpc3QpIDogW107XG4gIH1cblxuICB1cGRhdGVUYWcodGFnOiBNZXRhRGVmaW5pdGlvbiwgc2VsZWN0b3I/OiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCF0YWcpIHJldHVybiBudWxsO1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgdGhpcy5fcGFyc2VTZWxlY3Rvcih0YWcpO1xuICAgIGNvbnN0IG1ldGE6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuZ2V0VGFnKHNlbGVjdG9yKSAhO1xuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZywgbWV0YSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCB0cnVlKTtcbiAgfVxuXG4gIHJlbW92ZVRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnJlbW92ZVRhZ0VsZW1lbnQodGhpcy5nZXRUYWcoYXR0clNlbGVjdG9yKSAhKTsgfVxuXG4gIHJlbW92ZVRhZ0VsZW1lbnQobWV0YTogSFRNTE1ldGFFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHRoaXMuX2RvbS5yZW1vdmUobWV0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JDcmVhdGVFbGVtZW50KG1ldGE6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOlxuICAgICAgSFRNTE1ldGFFbGVtZW50IHtcbiAgICBpZiAoIWZvcmNlQ3JlYXRpb24pIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yOiBzdHJpbmcgPSB0aGlzLl9wYXJzZVNlbGVjdG9yKG1ldGEpO1xuICAgICAgY29uc3QgZWxlbTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5nZXRUYWcoc2VsZWN0b3IpICE7XG4gICAgICAvLyBJdCdzIGFsbG93ZWQgdG8gaGF2ZSBtdWx0aXBsZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUgc28gaXQncyBub3QgZW5vdWdoIHRvXG4gICAgICAvLyBqdXN0IGNoZWNrIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBwcmVzZW50IG9uIHRoZSBwYWdlLiBXZSBhbHNvIG5lZWQgdG9cbiAgICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaGFzIHRhZyBhdHRyaWJ1dGVzXG4gICAgICBpZiAoZWxlbSAmJiB0aGlzLl9jb250YWluc0F0dHJpYnV0ZXMobWV0YSwgZWxlbSkpIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50OiBIVE1MTWV0YUVsZW1lbnQgPSB0aGlzLl9kb20uY3JlYXRlRWxlbWVudCgnbWV0YScpIGFzIEhUTUxNZXRhRWxlbWVudDtcbiAgICB0aGlzLl9zZXRNZXRhRWxlbWVudEF0dHJpYnV0ZXMobWV0YSwgZWxlbWVudCk7XG4gICAgY29uc3QgaGVhZCA9IHRoaXMuX2RvbS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLl9kb2MsICdoZWFkJylbMF07XG4gICAgdGhpcy5fZG9tLmFwcGVuZENoaWxkKGhlYWQsIGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TWV0YUVsZW1lbnRBdHRyaWJ1dGVzKHRhZzogTWV0YURlZmluaXRpb24sIGVsOiBIVE1MTWV0YUVsZW1lbnQpOiBIVE1MTWV0YUVsZW1lbnQge1xuICAgIE9iamVjdC5rZXlzKHRhZykuZm9yRWFjaCgocHJvcDogc3RyaW5nKSA9PiB0aGlzLl9kb20uc2V0QXR0cmlidXRlKGVsLCBwcm9wLCB0YWdbcHJvcF0pKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVNlbGVjdG9yKHRhZzogTWV0YURlZmluaXRpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IGF0dHI6IHN0cmluZyA9IHRhZy5uYW1lID8gJ25hbWUnIDogJ3Byb3BlcnR5JztcbiAgICByZXR1cm4gYCR7YXR0cn09XCIke3RhZ1thdHRyXX1cImA7XG4gIH1cblxuICBwcml2YXRlIF9jb250YWluc0F0dHJpYnV0ZXModGFnOiBNZXRhRGVmaW5pdGlvbiwgZWxlbTogSFRNTE1ldGFFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRhZykuZXZlcnkoKGtleTogc3RyaW5nKSA9PiB0aGlzLl9kb20uZ2V0QXR0cmlidXRlKGVsZW0sIGtleSkgPT09IHRhZ1trZXldKTtcbiAgfVxufVxuIl19