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
import { ɵparseCookieValue as parseCookieValue, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
const ɵ0 = /**
 * @return {?}
 */
() => {
    if (global['Node']) {
        return global['Node'].prototype.contains || (/**
         * @this {?}
         * @param {?} node
         * @return {?}
         */
        function (node) {
            return !!(this.compareDocumentPosition(node) & 16);
        });
    }
    return (/** @type {?} */ (undefined));
};
/** @type {?} */
const nodeContains = ((ɵ0))();
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType no-console */
export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new BrowserDomAdapter()); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return ((/** @type {?} */ (el)))[name]; }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return (/**
         * @return {?}
         */
        () => { el.removeEventListener(evt, listener, false); });
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @return {?}
     */
    getDefaultDocument() { return document; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
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
    }
    /**
     * @return {?}
     */
    getHistory() { return window.history; }
    /**
     * @return {?}
     */
    getLocation() { return window.location; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        /** @type {?} */
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    /**
     * @return {?}
     */
    resetBaseElement() { baseElement = null; }
    /**
     * @return {?}
     */
    getUserAgent() { return window.navigator.userAgent; }
    /**
     * @return {?}
     */
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    }
    /**
     * @return {?}
     */
    supportsCookies() { return true; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { return parseCookieValue(document.cookie, name); }
}
/** @type {?} */
let baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = (/** @type {?} */ (document.querySelector('base')));
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
/** @type {?} */
let urlParsingNode;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRyxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUVQLEdBQUcsRUFBRTtJQUMvRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUTs7Ozs7UUFBSSxVQUFxQixJQUFTO1lBQ3hFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQSxDQUFDO0tBQ0g7SUFFRCxPQUFPLG1CQUFBLFNBQVMsRUFBTyxDQUFDO0FBQzFCLENBQUM7O01BUkssWUFBWSxHQUF5QyxNQVF6RCxFQUFFOzs7Ozs7OztBQVNKLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSx3QkFBd0I7Ozs7SUFDN0QsTUFBTSxDQUFDLFdBQVcsS0FBSyxpQkFBaUIsQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUNwRSxXQUFXLENBQUMsRUFBUSxFQUFFLElBQVksSUFBUyxPQUFPLENBQUMsbUJBQUssRUFBRSxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXBFLEdBQUcsQ0FBQyxL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Q0FBQztLQUM5QztJQUNELGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ3JGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVwYXJzZUNvb2tpZVZhbHVlIGFzIHBhcnNlQ29va2llVmFsdWUsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge8m1Z2xvYmFsIGFzIGdsb2JhbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyJztcblxuY29uc3Qgbm9kZUNvbnRhaW5zOiAodGhpczogTm9kZSwgb3RoZXI6IE5vZGUpID0+IGJvb2xlYW4gPSAoKCkgPT4ge1xuICBpZiAoZ2xvYmFsWydOb2RlJ10pIHtcbiAgICByZXR1cm4gZ2xvYmFsWydOb2RlJ10ucHJvdG90eXBlLmNvbnRhaW5zIHx8IGZ1bmN0aW9uKHRoaXM6IE5vZGUsIG5vZGU6IGFueSkge1xuICAgICAgcmV0dXJuICEhKHRoaXMuY29tcGFyZURvY3VtZW50UG9zaXRpb24obm9kZSkgJiAxNik7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xufSkoKTtcblxuLyoqXG4gKiBBIGBEb21BZGFwdGVyYCBwb3dlcmVkIGJ5IGZ1bGwgYnJvd3NlciBET00gQVBJcy5cbiAqXG4gKiBAc2VjdXJpdHkgVHJlYWQgY2FyZWZ1bGx5ISBJbnRlcmFjdGluZyB3aXRoIHRoZSBET00gZGlyZWN0bHkgaXMgZGFuZ2Vyb3VzIGFuZFxuICogY2FuIGludHJvZHVjZSBYU1Mgcmlza3MuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOnJlcXVpcmVQYXJhbWV0ZXJUeXBlIG5vLWNvbnNvbGUgKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHsgc2V0Um9vdERvbUFkYXB0ZXIobmV3IEJyb3dzZXJEb21BZGFwdGVyKCkpOyB9XG4gIGdldFByb3BlcnR5KGVsOiBOb2RlLCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gKDxhbnk+ZWwpW25hbWVdOyB9XG5cbiAgbG9nKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyAmJiB3aW5kb3cuY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cEVuZCgpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kICYmIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgb25BbmRDYW5jZWwoZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIC8vIE5lZWRlZCB0byBmb2xsb3cgRGFydCdzIHN1YnNjcmlwdGlvbiBzZW1hbnRpYywgdW50aWwgZml4IG9mXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXJ0L2lzc3Vlcy9kZXRhaWw/aWQ9MTc0MDZcbiAgICByZXR1cm4gKCkgPT4geyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTsgfTtcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkgeyBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7IH1cbiAgcmVtb3ZlKG5vZGU6IE5vZGUpOiBOb2RlIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGdldFZhbHVlKGVsOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gZWwudmFsdWU7IH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgfVxuICBjcmVhdGVIdG1sRG9jdW1lbnQoKTogSFRNTERvY3VtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCdmYWtlVGl0bGUnKTtcbiAgfVxuICBnZXREZWZhdWx0RG9jdW1lbnQoKTogRG9jdW1lbnQgeyByZXR1cm4gZG9jdW1lbnQ7IH1cblxuICBpc0VsZW1lbnROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFOyB9XG5cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQ7IH1cblxuICBnZXRHbG9iYWxFdmVudFRhcmdldChkb2M6IERvY3VtZW50LCB0YXJnZXQ6IHN0cmluZyk6IEV2ZW50VGFyZ2V0fG51bGwge1xuICAgIGlmICh0YXJnZXQgPT09ICd3aW5kb3cnKSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnZG9jdW1lbnQnKSB7XG4gICAgICByZXR1cm4gZG9jO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcbiAgICAgIHJldHVybiBkb2MuYm9keTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHsgcmV0dXJuIHdpbmRvdy5oaXN0b3J5OyB9XG4gIGdldExvY2F0aW9uKCk6IExvY2F0aW9uIHsgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbjsgfVxuICBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IGhyZWYgPSBnZXRCYXNlRWxlbWVudEhyZWYoKTtcbiAgICByZXR1cm4gaHJlZiA9PSBudWxsID8gbnVsbCA6IHJlbGF0aXZlUGF0aChocmVmKTtcbiAgfVxuICByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQgeyBiYXNlRWxlbWVudCA9IG51bGw7IH1cbiAgZ2V0VXNlckFnZW50KCk6IHN0cmluZyB7IHJldHVybiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDsgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIC8vIHBlcmZvcm1hbmNlLm5vdygpIGlzIG5vdCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzLCBzZWVcbiAgICAvLyBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1wZXJmb3JtYW5jZS5ub3dcbiAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7IHJldHVybiBwYXJzZUNvb2tpZVZhbHVlKGRvY3VtZW50LmNvb2tpZSwgbmFtZSk7IH1cbn1cblxubGV0IGJhc2VFbGVtZW50OiBIVE1MRWxlbWVudHxudWxsID0gbnVsbDtcbmZ1bmN0aW9uIGdldEJhc2VFbGVtZW50SHJlZigpOiBzdHJpbmd8bnVsbCB7XG4gIGlmICghYmFzZUVsZW1lbnQpIHtcbiAgICBiYXNlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKSAhO1xuICAgIGlmICghYmFzZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG59XG5cbi8vIGJhc2VkIG9uIHVybFV0aWxzLmpzIGluIEFuZ3VsYXJKUyAxXG5sZXQgdXJsUGFyc2luZ05vZGU6IGFueTtcbmZ1bmN0aW9uIHJlbGF0aXZlUGF0aCh1cmw6IGFueSk6IHN0cmluZyB7XG4gIGlmICghdXJsUGFyc2luZ05vZGUpIHtcbiAgICB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgfVxuICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xuICByZXR1cm4gKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZTtcbn1cbiJdfQ==