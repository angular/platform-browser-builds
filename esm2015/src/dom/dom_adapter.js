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
/** @type {?} */
let _DOM = (/** @type {?} */ (null));
/**
 * @return {?}
 */
export function getDOM() {
    return _DOM;
}
/**
 * @param {?} adapter
 * @return {?}
 */
export function setDOM(adapter) {
    _DOM = adapter;
}
/**
 * @param {?} adapter
 * @return {?}
 */
export function setRootDomAdapter(adapter) {
    if (!_DOM) {
        _DOM = adapter;
    }
}
/* tslint:disable:requireParameterType */
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */
export class DomAdapter {
}
if (false) {
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DomAdapter.prototype.getProperty = function (el, name) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    DomAdapter.prototype.dispatchEvent = function (el, evt) { };
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    DomAdapter.prototype.log = function (error) { };
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    DomAdapter.prototype.logGroup = function (error) { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.logGroupEnd = function () { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    DomAdapter.prototype.querySelectorAll = function (el, selector) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.remove = function (el) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    DomAdapter.prototype.getAttribute = function (element, attribute) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setProperty = function (el, name, value) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    DomAdapter.prototype.querySelector = function (el, selector) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.nextSibling = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.parentElement = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.clearNodes = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.appendChild = function (el, node) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.removeChild = function (el, node) { };
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.insertBefore = function (parent, ref, node) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setText = function (el, value) { };
    /**
     * @abstract
     * @param {?} text
     * @return {?}
     */
    DomAdapter.prototype.createComment = function (text) { };
    /**
     * @abstract
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    DomAdapter.prototype.createElement = function (tagName, doc) { };
    /**
     * @abstract
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    DomAdapter.prototype.createElementNS = function (ns, tagName, doc) { };
    /**
     * @abstract
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    DomAdapter.prototype.createTextNode = function (text, doc) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    DomAdapter.prototype.getElementsByTagName = function (element, name) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    DomAdapter.prototype.addClass = function (element, className) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    DomAdapter.prototype.removeClass = function (element, className) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DomAdapter.prototype.getStyle = function (element, styleName) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    DomAdapter.prototype.setStyle = function (element, styleName, styleValue) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    DomAdapter.prototype.removeStyle = function (element, styleName) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setAttribute = function (element, name, value) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setAttributeNS = function (element, ns, name, value) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    DomAdapter.prototype.removeAttribute = function (element, attribute) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    DomAdapter.prototype.removeAttributeNS = function (element, ns, attribute) { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.createHtmlDocument = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.getDefaultDocument = function () { };
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    DomAdapter.prototype.getTitle = function (doc) { };
    /**
     * @abstract
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    DomAdapter.prototype.setTitle = function (doc, newTitle) { };
    /**
     * @abstract
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    DomAdapter.prototype.elementMatches = function (n, selector) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.isElementNode = function (node) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.isShadowRoot = function (node) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.getHost = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    DomAdapter.prototype.onAndCancel = function (el, evt, listener) { };
    /**
     * @abstract
     * @param {?} event
     * @return {?}
     */
    DomAdapter.prototype.getEventKey = function (event) { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.supportsDOMEvents = function () { };
    /**
     * @abstract
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    DomAdapter.prototype.getGlobalEventTarget = function (doc, target) { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.getHistory = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.getLocation = function () { };
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    DomAdapter.prototype.getBaseHref = function (doc) { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.resetBaseElement = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.getUserAgent = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.performanceNow = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DomAdapter.prototype.supportsCookies = function () { };
    /**
     * @abstract
     * @param {?} name
     * @return {?}
     */
    DomAdapter.prototype.getCookie = function (name) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZG9tX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBU0ksSUFBSSxHQUFlLG1CQUFBLElBQUksRUFBRTs7OztBQUU3QixNQUFNLFVBQVUsTUFBTTtJQUNwQixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxPQUFtQjtJQUN4QyxJQUFJLEdBQUcsT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQW1CO0lBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7Ozs7Ozs7O0FBU0QsTUFBTSxPQUFnQixVQUFVO0NBNkUvQjs7Ozs7Ozs7SUEzRUMsMkRBQXFEOzs7Ozs7O0lBQ3JELDREQUErQzs7Ozs7O0lBRy9DLGdEQUE4Qjs7Ozs7O0lBQzlCLHFEQUFtQzs7Ozs7SUFDbkMsbURBQTRCOzs7Ozs7O0lBRzVCLG9FQUE0RDs7Ozs7O0lBQzVELGdEQUErQjs7Ozs7OztJQUMvQixzRUFBb0U7Ozs7Ozs7O0lBR3BFLGtFQUFpRTs7Ozs7OztJQUNqRSxpRUFBdUQ7Ozs7OztJQUN2RCxxREFBeUM7Ozs7OztJQUN6Qyx1REFBMkM7Ozs7OztJQUMzQyxvREFBa0M7Ozs7Ozs7SUFDbEMsMkRBQThDOzs7Ozs7O0lBQzlDLDJEQUE4Qzs7Ozs7Ozs7SUFDOUMscUVBQTZEOzs7Ozs7O0lBQzdELHdEQUE4Qzs7Ozs7O0lBQzlDLHlEQUEwQzs7Ozs7OztJQUMxQyxpRUFBNkQ7Ozs7Ozs7O0lBQzdELHVFQUEwRTs7Ozs7OztJQUMxRSwrREFBdUQ7Ozs7Ozs7SUFDdkQseUVBQXlFOzs7Ozs7O0lBQ3pFLGtFQUF3RDs7Ozs7OztJQUN4RCxxRUFBMkQ7Ozs7Ozs7SUFDM0Qsa0VBQXdEOzs7Ozs7OztJQUN4RCw4RUFBNEU7Ozs7Ozs7SUFDNUUscUVBQTJEOzs7Ozs7OztJQUMzRCx3RUFBc0U7Ozs7Ozs7OztJQUN0RSw4RUFBb0Y7Ozs7Ozs7SUFDcEYseUVBQStEOzs7Ozs7OztJQUMvRCwrRUFBNkU7Ozs7O0lBQzdFLDBEQUE0Qzs7Ozs7SUFDNUMsMERBQXdDOzs7Ozs7SUFHeEMsbURBQXlDOzs7Ozs7O0lBQ3pDLDZEQUF3RDs7Ozs7OztJQUd4RCxpRUFBMkQ7Ozs7OztJQUMzRCx5REFBMkM7Ozs7OztJQUczQyx3REFBMEM7Ozs7OztJQUMxQyxpREFBK0I7Ozs7Ozs7O0lBRy9CLG9FQUFpRTs7Ozs7O0lBQ2pFLHdEQUF5Qzs7Ozs7SUFDekMseURBQXNDOzs7Ozs7O0lBR3RDLHVFQUFrRTs7Ozs7SUFHbEUsa0RBQStCOzs7OztJQUMvQixtREFBaUM7Ozs7OztJQUNqQyxzREFBaUQ7Ozs7O0lBQ2pELHdEQUFrQzs7Ozs7SUFHbEMsb0RBQWdDOzs7OztJQUdoQyxzREFBa0M7Ozs7O0lBR2xDLHVEQUFvQzs7Ozs7O0lBQ3BDLHFEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5sZXQgX0RPTTogRG9tQWRhcHRlciA9IG51bGwgITtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERPTSgpIHtcbiAgcmV0dXJuIF9ET007XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRET00oYWRhcHRlcjogRG9tQWRhcHRlcikge1xuICBfRE9NID0gYWRhcHRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFJvb3REb21BZGFwdGVyKGFkYXB0ZXI6IERvbUFkYXB0ZXIpIHtcbiAgaWYgKCFfRE9NKSB7XG4gICAgX0RPTSA9IGFkYXB0ZXI7XG4gIH1cbn1cblxuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbi8qKlxuICogUHJvdmlkZXMgRE9NIG9wZXJhdGlvbnMgaW4gYW4gZW52aXJvbm1lbnQtYWdub3N0aWMgd2F5LlxuICpcbiAqIEBzZWN1cml0eSBUcmVhZCBjYXJlZnVsbHkhIEludGVyYWN0aW5nIHdpdGggdGhlIERPTSBkaXJlY3RseSBpcyBkYW5nZXJvdXMgYW5kXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERvbUFkYXB0ZXIge1xuICAvLyBOZWVkcyBEb21pbm8tZnJpZW5kbHkgdGVzdCB1dGlsaXR5XG4gIGFic3RyYWN0IGdldFByb3BlcnR5KGVsOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IGRpc3BhdGNoRXZlbnQoZWw6IGFueSwgZXZ0OiBhbnkpOiBhbnk7XG5cbiAgLy8gVXNlZCBieSByb3V0ZXJcbiAgYWJzdHJhY3QgbG9nKGVycm9yOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGxvZ0dyb3VwKGVycm9yOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGxvZ0dyb3VwRW5kKCk6IGFueTtcblxuICAvLyBVc2VkIGJ5IE1ldGFcbiAgYWJzdHJhY3QgcXVlcnlTZWxlY3RvckFsbChlbDogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYW55W107XG4gIGFic3RyYWN0IHJlbW92ZShlbDogYW55KTogTm9kZTtcbiAgYWJzdHJhY3QgZ2V0QXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlOiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcblxuICAvLyBVc2VkIGJ5IHBsYXRmb3JtLXNlcnZlclxuICBhYnN0cmFjdCBzZXRQcm9wZXJ0eShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55O1xuICBhYnN0cmFjdCBxdWVyeVNlbGVjdG9yKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IG5leHRTaWJsaW5nKGVsOiBhbnkpOiBOb2RlfG51bGw7XG4gIGFic3RyYWN0IHBhcmVudEVsZW1lbnQoZWw6IGFueSk6IE5vZGV8bnVsbDtcbiAgYWJzdHJhY3QgY2xlYXJOb2RlcyhlbDogYW55KTogYW55O1xuICBhYnN0cmFjdCBhcHBlbmRDaGlsZChlbDogYW55LCBub2RlOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZUNoaWxkKGVsOiBhbnksIG5vZGU6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCByZWY6IGFueSwgbm9kZTogYW55KTogYW55O1xuICBhYnN0cmFjdCBzZXRUZXh0KGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IGNyZWF0ZUNvbW1lbnQodGV4dDogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IGFueSwgZG9jPzogYW55KTogSFRNTEVsZW1lbnQ7XG4gIGFic3RyYWN0IGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IGFueSk6IEVsZW1lbnQ7XG4gIGFic3RyYWN0IGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogYW55KTogVGV4dDtcbiAgYWJzdHJhY3QgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdO1xuICBhYnN0cmFjdCBhZGRDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCByZW1vdmVDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHNldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IGFueTtcbiAgYWJzdHJhY3Qgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50O1xuICBhYnN0cmFjdCBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQ7XG5cbiAgLy8gVXNlZCBieSBUaXRsZVxuICBhYnN0cmFjdCBnZXRUaXRsZShkb2M6IERvY3VtZW50KTogc3RyaW5nO1xuICBhYnN0cmFjdCBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKTogYW55O1xuXG4gIC8vIFVzZWQgYnkgQnkuY3NzXG4gIGFic3RyYWN0IGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW47XG4gIGFic3RyYWN0IGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbjtcblxuICAvLyBVc2VkIGJ5IFRlc3RhYmlsaXR5XG4gIGFic3RyYWN0IGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuO1xuICBhYnN0cmFjdCBnZXRIb3N0KGVsOiBhbnkpOiBhbnk7XG5cbiAgLy8gVXNlZCBieSBLZXlFdmVudHNQbHVnaW5cbiAgYWJzdHJhY3Qgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbjtcbiAgYWJzdHJhY3QgZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZztcbiAgYWJzdHJhY3Qgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbjtcblxuICAvLyBVc2VkIGJ5IFBsYXRmb3JtTG9jYXRpb24gYW5kIFNlcnZlckV2ZW50TWFuYWdlclBsdWdpblxuICBhYnN0cmFjdCBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IGFueTtcblxuICAvLyBVc2VkIGJ5IFBsYXRmb3JtTG9jYXRpb25cbiAgYWJzdHJhY3QgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5O1xuICBhYnN0cmFjdCBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbjtcbiAgYWJzdHJhY3QgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZ3xudWxsO1xuICBhYnN0cmFjdCByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQ7XG5cbiAgLy8gVE9ETzogcmVtb3ZlIGRlcGVuZGVuY3kgaW4gRGVmYXVsdFZhbHVlQWNjZXNzb3JcbiAgYWJzdHJhY3QgZ2V0VXNlckFnZW50KCk6IHN0cmluZztcblxuICAvLyBVc2VkIGJ5IEFuZ3VsYXJQcm9maWxlclxuICBhYnN0cmFjdCBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXI7XG5cbiAgLy8gVXNlZCBieSBDb29raWVYU1JGU3RyYXRlZ3lcbiAgYWJzdHJhY3Qgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW47XG4gIGFic3RyYWN0IGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcbn1cbiJdfQ==