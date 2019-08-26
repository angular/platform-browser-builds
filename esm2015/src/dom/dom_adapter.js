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
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    DomAdapter.prototype.hasProperty = function (element, name) { };
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
     * @param {?} name
     * @return {?}
     */
    DomAdapter.prototype.getProperty = function (el, name) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    DomAdapter.prototype.invoke = function (el, methodName, args) { };
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    DomAdapter.prototype.logError = function (error) { };
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
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    DomAdapter.prototype.contains = function (nodeA, nodeB) { };
    /**
     * @abstract
     * @param {?} templateHtml
     * @return {?}
     */
    DomAdapter.prototype.parse = function (templateHtml) { };
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
     * @param {?} selector
     * @return {?}
     */
    DomAdapter.prototype.querySelectorAll = function (el, selector) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    DomAdapter.prototype.on = function (el, evt, listener) { };
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
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    DomAdapter.prototype.dispatchEvent = function (el, evt) { };
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    DomAdapter.prototype.createMouseEvent = function (eventType) { };
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    DomAdapter.prototype.createEvent = function (eventType) { };
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    DomAdapter.prototype.preventDefault = function (evt) { };
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    DomAdapter.prototype.isPrevented = function (evt) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.nodeName = function (node) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.nodeValue = function (node) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.type = function (node) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.firstChild = function (el) { };
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
    DomAdapter.prototype.childNodes = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.childNodesAsList = function (el) { };
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
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.remove = function (el) { };
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
     * @return {?}
     */
    DomAdapter.prototype.getText = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setText = function (el, value) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.getValue = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    DomAdapter.prototype.setValue = function (el, value) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.getChecked = function (el) { };
    /**
     * @abstract
     * @param {?} text
     * @return {?}
     */
    DomAdapter.prototype.createComment = function (text) { };
    /**
     * @abstract
     * @param {?} html
     * @return {?}
     */
    DomAdapter.prototype.createTemplate = function (html) { };
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
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.getHost = function (el) { };
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    DomAdapter.prototype.getDistributedNodes = function (el) { };
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    DomAdapter.prototype.clone = function (node) { };
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
     * @return {?}
     */
    DomAdapter.prototype.classList = function (element) { };
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
     * @param {?} className
     * @return {?}
     */
    DomAdapter.prototype.hasClass = function (element, className) { };
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
     * @param {?} styleName
     * @return {?}
     */
    DomAdapter.prototype.getStyle = function (element, styleName) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    DomAdapter.prototype.hasStyle = function (element, styleName, styleValue) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    DomAdapter.prototype.getAttribute = function (element, attribute) { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZG9tX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBVUksSUFBSSxHQUFlLG1CQUFBLElBQUksRUFBRTs7OztBQUU3QixNQUFNLFVBQVUsTUFBTTtJQUNwQixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxPQUFtQjtJQUN4QyxJQUFJLEdBQUcsT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQW1CO0lBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQzs7Ozs7Ozs7O0FBU0QsTUFBTSxPQUFnQixVQUFVO0NBc0cvQjs7Ozs7Ozs7SUFyR0MsZ0VBQTBEOzs7Ozs7OztJQUMxRCxrRUFBaUU7Ozs7Ozs7SUFDakUsMkRBQXFEOzs7Ozs7OztJQUNyRCxrRUFBbUU7Ozs7OztJQUVuRSxxREFBbUM7Ozs7OztJQUNuQyxnREFBOEI7Ozs7OztJQUM5QixxREFBbUM7Ozs7O0lBQ25DLG1EQUE0Qjs7Ozs7OztJQUU1Qiw0REFBbUQ7Ozs7OztJQUNuRCx5REFBMEM7Ozs7Ozs7SUFDMUMsaUVBQXVEOzs7Ozs7O0lBQ3ZELG9FQUE0RDs7Ozs7Ozs7SUFDNUQsMkRBQW1EOzs7Ozs7OztJQUNuRCxvRUFBaUU7Ozs7Ozs7SUFDakUsNERBQStDOzs7Ozs7SUFDL0MsaUVBQStDOzs7Ozs7SUFDL0MsNERBQTZDOzs7Ozs7SUFDN0MseURBQXVDOzs7Ozs7SUFDdkMsc0RBQXdDOzs7Ozs7SUFDeEMsb0RBQXFDOzs7Ozs7SUFDckMscURBQTJDOzs7Ozs7SUFDM0MsZ0RBQWlDOzs7Ozs7SUFDakMsb0RBQXdDOzs7Ozs7SUFDeEMscURBQXlDOzs7Ozs7SUFDekMsdURBQTJDOzs7Ozs7SUFDM0Msb0RBQXFDOzs7Ozs7SUFDckMsMERBQTJDOzs7Ozs7SUFDM0Msb0RBQWtDOzs7Ozs7O0lBQ2xDLDJEQUE4Qzs7Ozs7OztJQUM5QywyREFBOEM7Ozs7OztJQUM5QyxnREFBK0I7Ozs7Ozs7O0lBQy9CLHFFQUE2RDs7Ozs7O0lBQzdELGlEQUF1Qzs7Ozs7OztJQUN2Qyx3REFBOEM7Ozs7OztJQUM5QyxrREFBbUM7Ozs7Ozs7SUFDbkMseURBQStDOzs7Ozs7SUFDL0Msb0RBQXNDOzs7Ozs7SUFDdEMseURBQTBDOzs7Ozs7SUFDMUMsMERBQWdEOzs7Ozs7O0lBQ2hELGlFQUE2RDs7Ozs7Ozs7SUFDN0QsdUVBQTBFOzs7Ozs7O0lBQzFFLCtEQUF1RDs7Ozs7O0lBQ3ZELGlEQUErQjs7Ozs7O0lBQy9CLDZEQUE4Qzs7Ozs7O0lBQzlDLGlEQUFtRTs7Ozs7OztJQUNuRSx5RUFBeUU7Ozs7OztJQUN6RSx3REFBd0M7Ozs7Ozs7SUFDeEMsa0VBQXdEOzs7Ozs7O0lBQ3hELHFFQUEyRDs7Ozs7OztJQUMzRCxrRUFBNEQ7Ozs7Ozs7O0lBQzVELDhFQUE0RTs7Ozs7OztJQUM1RSxxRUFBMkQ7Ozs7Ozs7SUFDM0Qsa0VBQTJEOzs7Ozs7OztJQUMzRCw4RUFBaUY7Ozs7Ozs7SUFHakYsc0VBQW9FOzs7Ozs7OztJQUdwRSx3RUFBc0U7Ozs7Ozs7OztJQUN0RSw4RUFBb0Y7Ozs7Ozs7SUFDcEYseUVBQStEOzs7Ozs7OztJQUMvRCwrRUFBNkU7Ozs7O0lBQzdFLDBEQUE0Qzs7Ozs7SUFDNUMsMERBQXdDOzs7Ozs7SUFHeEMsbURBQXlDOzs7Ozs7O0lBQ3pDLDZEQUF3RDs7Ozs7OztJQUd4RCxpRUFBMkQ7Ozs7OztJQUMzRCx5REFBMkM7Ozs7OztJQUczQyx3REFBMEM7Ozs7OztJQUcxQyx3REFBeUM7Ozs7O0lBQ3pDLHlEQUFzQzs7Ozs7OztJQUd0Qyx1RUFBa0U7Ozs7O0lBR2xFLGtEQUErQjs7Ozs7SUFDL0IsbURBQWlDOzs7Ozs7SUFDakMsc0RBQWlEOzs7OztJQUNqRCx3REFBa0M7Ozs7O0lBR2xDLG9EQUFnQzs7Ozs7SUFHaEMsc0RBQWtDOzs7OztJQUdsQyx1REFBb0M7Ozs7OztJQUNwQyxxREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBfRE9NOiBEb21BZGFwdGVyID0gbnVsbCAhO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RE9NKCkge1xuICByZXR1cm4gX0RPTTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERPTShhZGFwdGVyOiBEb21BZGFwdGVyKSB7XG4gIF9ET00gPSBhZGFwdGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Um9vdERvbUFkYXB0ZXIoYWRhcHRlcjogRG9tQWRhcHRlcikge1xuICBpZiAoIV9ET00pIHtcbiAgICBfRE9NID0gYWRhcHRlcjtcbiAgfVxufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpyZXF1aXJlUGFyYW1ldGVyVHlwZSAqL1xuLyoqXG4gKiBQcm92aWRlcyBET00gb3BlcmF0aW9ucyBpbiBhbiBlbnZpcm9ubWVudC1hZ25vc3RpYyB3YXkuXG4gKlxuICogQHNlY3VyaXR5IFRyZWFkIGNhcmVmdWxseSEgSW50ZXJhY3Rpbmcgd2l0aCB0aGUgRE9NIGRpcmVjdGx5IGlzIGRhbmdlcm91cyBhbmRcbiAqIGNhbiBpbnRyb2R1Y2UgWFNTIHJpc2tzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9tQWRhcHRlciB7XG4gIGFic3RyYWN0IGhhc1Byb3BlcnR5KGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgYWJzdHJhY3Qgc2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0UHJvcGVydHkoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZyk6IGFueTtcbiAgYWJzdHJhY3QgaW52b2tlKGVsOiBFbGVtZW50LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55O1xuXG4gIGFic3RyYWN0IGxvZ0Vycm9yKGVycm9yOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGxvZyhlcnJvcjogYW55KTogYW55O1xuICBhYnN0cmFjdCBsb2dHcm91cChlcnJvcjogYW55KTogYW55O1xuICBhYnN0cmFjdCBsb2dHcm91cEVuZCgpOiBhbnk7XG5cbiAgYWJzdHJhY3QgY29udGFpbnMobm9kZUE6IGFueSwgbm9kZUI6IGFueSk6IGJvb2xlYW47XG4gIGFic3RyYWN0IHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBxdWVyeVNlbGVjdG9yKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHF1ZXJ5U2VsZWN0b3JBbGwoZWw6IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGFueVtdO1xuICBhYnN0cmFjdCBvbihlbDogYW55LCBldnQ6IGFueSwgbGlzdGVuZXI6IGFueSk6IGFueTtcbiAgYWJzdHJhY3Qgb25BbmRDYW5jZWwoZWw6IGFueSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbjtcbiAgYWJzdHJhY3QgZGlzcGF0Y2hFdmVudChlbDogYW55LCBldnQ6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgY3JlYXRlRXZlbnQoZXZlbnRUeXBlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHByZXZlbnREZWZhdWx0KGV2dDogYW55KTogYW55O1xuICBhYnN0cmFjdCBpc1ByZXZlbnRlZChldnQ6IGFueSk6IGJvb2xlYW47XG4gIGFic3RyYWN0IG5vZGVOYW1lKG5vZGU6IGFueSk6IHN0cmluZztcbiAgYWJzdHJhY3Qgbm9kZVZhbHVlKG5vZGU6IGFueSk6IHN0cmluZ3xudWxsO1xuICBhYnN0cmFjdCB0eXBlKG5vZGU6IGFueSk6IHN0cmluZztcbiAgYWJzdHJhY3QgZmlyc3RDaGlsZChlbDogYW55KTogTm9kZXxudWxsO1xuICBhYnN0cmFjdCBuZXh0U2libGluZyhlbDogYW55KTogTm9kZXxudWxsO1xuICBhYnN0cmFjdCBwYXJlbnRFbGVtZW50KGVsOiBhbnkpOiBOb2RlfG51bGw7XG4gIGFic3RyYWN0IGNoaWxkTm9kZXMoZWw6IGFueSk6IE5vZGVbXTtcbiAgYWJzdHJhY3QgY2hpbGROb2Rlc0FzTGlzdChlbDogYW55KTogTm9kZVtdO1xuICBhYnN0cmFjdCBjbGVhck5vZGVzKGVsOiBhbnkpOiBhbnk7XG4gIGFic3RyYWN0IGFwcGVuZENoaWxkKGVsOiBhbnksIG5vZGU6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgcmVtb3ZlQ2hpbGQoZWw6IGFueSwgbm9kZTogYW55KTogYW55O1xuICBhYnN0cmFjdCByZW1vdmUoZWw6IGFueSk6IE5vZGU7XG4gIGFic3RyYWN0IGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgcmVmOiBhbnksIG5vZGU6IGFueSk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0VGV4dChlbDogYW55KTogc3RyaW5nfG51bGw7XG4gIGFic3RyYWN0IHNldFRleHQoZWw6IGFueSwgdmFsdWU6IHN0cmluZyk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0VmFsdWUoZWw6IGFueSk6IHN0cmluZztcbiAgYWJzdHJhY3Qgc2V0VmFsdWUoZWw6IGFueSwgdmFsdWU6IHN0cmluZyk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0Q2hlY2tlZChlbDogYW55KTogYm9vbGVhbjtcbiAgYWJzdHJhY3QgY3JlYXRlQ29tbWVudCh0ZXh0OiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IGNyZWF0ZVRlbXBsYXRlKGh0bWw6IGFueSk6IEhUTUxFbGVtZW50O1xuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IGFueSwgZG9jPzogYW55KTogSFRNTEVsZW1lbnQ7XG4gIGFic3RyYWN0IGNyZWF0ZUVsZW1lbnROUyhuczogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIGRvYz86IGFueSk6IEVsZW1lbnQ7XG4gIGFic3RyYWN0IGNyZWF0ZVRleHROb2RlKHRleHQ6IHN0cmluZywgZG9jPzogYW55KTogVGV4dDtcbiAgYWJzdHJhY3QgZ2V0SG9zdChlbDogYW55KTogYW55O1xuICBhYnN0cmFjdCBnZXREaXN0cmlidXRlZE5vZGVzKGVsOiBhbnkpOiBOb2RlW107XG4gIGFic3RyYWN0IGNsb25lIC8qPFQgZXh0ZW5kcyBOb2RlPiovIChub2RlOiBOb2RlIC8qVCovKTogTm9kZSAvKlQqLztcbiAgYWJzdHJhY3QgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdO1xuICBhYnN0cmFjdCBjbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W107XG4gIGFic3RyYWN0IGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZUNsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IGhhc0NsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICBhYnN0cmFjdCBzZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZVN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IGdldFN0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGhhc1N0eWxlKGVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU/OiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8vIFVzZWQgYnkgTWV0YVxuICBhYnN0cmFjdCBnZXRBdHRyaWJ1dGUoZWxlbWVudDogYW55LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuXG4gIC8vIFVzZWQgYnkgcGxhdGZvcm0tc2VydmVyXG4gIGFic3RyYWN0IHNldEF0dHJpYnV0ZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IGFueTtcbiAgYWJzdHJhY3Qgc2V0QXR0cmlidXRlTlMoZWxlbWVudDogYW55LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIGFic3RyYWN0IHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50OiBhbnksIGF0dHJpYnV0ZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCByZW1vdmVBdHRyaWJ1dGVOUyhlbGVtZW50OiBhbnksIG5zOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50O1xuICBhYnN0cmFjdCBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQ7XG5cbiAgLy8gVXNlZCBieSBUaXRsZVxuICBhYnN0cmFjdCBnZXRUaXRsZShkb2M6IERvY3VtZW50KTogc3RyaW5nO1xuICBhYnN0cmFjdCBzZXRUaXRsZShkb2M6IERvY3VtZW50LCBuZXdUaXRsZTogc3RyaW5nKTogYW55O1xuXG4gIC8vIFVzZWQgYnkgQnkuY3NzXG4gIGFic3RyYWN0IGVsZW1lbnRNYXRjaGVzKG46IGFueSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW47XG4gIGFic3RyYWN0IGlzRWxlbWVudE5vZGUobm9kZTogYW55KTogYm9vbGVhbjtcblxuICAvLyBVc2VkIGJ5IFRlc3RhYmlsaXR5XG4gIGFic3RyYWN0IGlzU2hhZG93Um9vdChub2RlOiBhbnkpOiBib29sZWFuO1xuXG4gIC8vIFVzZWQgYnkgS2V5RXZlbnRzUGx1Z2luXG4gIGFic3RyYWN0IGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmc7XG4gIGFic3RyYWN0IHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW47XG5cbiAgLy8gVXNlZCBieSBQbGF0Zm9ybUxvY2F0aW9uIGFuZCBTZXJ2ZXJFdmVudE1hbmFnZXJQbHVnaW5cbiAgYWJzdHJhY3QgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBhbnk7XG5cbiAgLy8gVXNlZCBieSBQbGF0Zm9ybUxvY2F0aW9uXG4gIGFic3RyYWN0IGdldEhpc3RvcnkoKTogSGlzdG9yeTtcbiAgYWJzdHJhY3QgZ2V0TG9jYXRpb24oKTogTG9jYXRpb247XG4gIGFic3RyYWN0IGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmd8bnVsbDtcbiAgYWJzdHJhY3QgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkO1xuXG4gIC8vIFRPRE86IHJlbW92ZSBkZXBlbmRlbmN5IGluIERlZmF1bHRWYWx1ZUFjY2Vzc29yXG4gIGFic3RyYWN0IGdldFVzZXJBZ2VudCgpOiBzdHJpbmc7XG5cbiAgLy8gVXNlZCBieSBBbmd1bGFyUHJvZmlsZXJcbiAgYWJzdHJhY3QgcGVyZm9ybWFuY2VOb3coKTogbnVtYmVyO1xuXG4gIC8vIFVzZWQgYnkgQ29va2llWFNSRlN0cmF0ZWd5XG4gIGFic3RyYWN0IHN1cHBvcnRzQ29va2llcygpOiBib29sZWFuO1xuICBhYnN0cmFjdCBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGw7XG59XG4iXX0=