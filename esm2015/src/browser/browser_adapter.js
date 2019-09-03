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
/** @type {?} */
const nodeContains = ((/**
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
}))();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvRyxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7TUFFN0QsWUFBWSxHQUF5Qzs7O0FBQUMsR0FBRyxFQUFFO0lBQy9ELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFROzs7OztRQUFJLFVBQXFCLElBQVM7WUFDeEUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFBLENBQUM7S0FDSDtJQUVELE9BQU8sbUJBQUEsU0FBUyxFQUFPLENBQUM7QUFDMUIsQ0FBQyxFQUFDLEVBQUU7Ozs7Ozs7O0FBU0osTUFBTSxPQUFPLGlCQUFrQixTQUFRLHdCQUF3Qjs7OztJQUM3RCxNQUFNLENBQUMsV0FBVyxLQUFLLGlCQUFpQixDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBQ3BFLFdBQVcsQ0FBQyxFQUFRLEVBQUUsSUFBWSxJQUFTLE9BQU8sQ0FBQyxtQkFBSyxFQUFFLEVBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFcEUsR0FBRyxDQUFDLEtB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QUFDO0tBQzlDO0lBQ0QsY0FBYyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsR0FBRyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDckYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtXBhcnNlQ29va2llVmFsdWUgYXMgcGFyc2VDb29raWVWYWx1ZSwgybVzZXRSb290RG9tQWRhcHRlciBhcyBzZXRSb290RG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7ybVnbG9iYWwgYXMgZ2xvYmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHZW5lcmljQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vZ2VuZXJpY19icm93c2VyX2FkYXB0ZXInO1xuXG5jb25zdCBub2RlQ29udGFpbnM6ICh0aGlzOiBOb2RlLCBvdGhlcjogTm9kZSkgPT4gYm9vbGVhbiA9ICgoKSA9PiB7XG4gIGlmIChnbG9iYWxbJ05vZGUnXSkge1xuICAgIHJldHVybiBnbG9iYWxbJ05vZGUnXS5wcm90b3R5cGUuY29udGFpbnMgfHwgZnVuY3Rpb24odGhpczogTm9kZSwgbm9kZTogYW55KSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihub2RlKSAmIDE2KTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG59KSgpO1xuXG4vKipcbiAqIEEgYERvbUFkYXB0ZXJgIHBvd2VyZWQgYnkgZnVsbCBicm93c2VyIERPTSBBUElzLlxuICpcbiAqIEBzZWN1cml0eSBUcmVhZCBjYXJlZnVsbHkhIEludGVyYWN0aW5nIHdpdGggdGhlIERPTSBkaXJlY3RseSBpcyBkYW5nZXJvdXMgYW5kXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgbm8tY29uc29sZSAqL1xuZXhwb3J0IGNsYXNzIEJyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIHtcbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKSk7IH1cbiAgZ2V0UHJvcGVydHkoZWw6IE5vZGUsIG5hbWU6IHN0cmluZyk6IGFueSB7IHJldHVybiAoPGFueT5lbClbbmFtZV07IH1cblxuICBsb2coZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nICYmIHdpbmRvdy5jb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXAoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUuZ3JvdXAgJiYgd2luZG93LmNvbnNvbGUuZ3JvdXAoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ0dyb3VwRW5kKCk6IHZvaWQge1xuICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUuZ3JvdXBFbmQgJiYgd2luZG93LmNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuICBvbkFuZENhbmNlbChlbDogTm9kZSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgLy8gTmVlZGVkIHRvIGZvbGxvdyBEYXJ0J3Mgc3Vic2NyaXB0aW9uIHNlbWFudGljLCB1bnRpbCBmaXggb2ZcbiAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhcnQvaXNzdWVzL2RldGFpbD9pZD0xNzQwNlxuICAgIHJldHVybiAoKSA9PiB7IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpOyB9O1xuICB9XG4gIGRpc3BhdGNoRXZlbnQoZWw6IE5vZGUsIGV2dDogYW55KSB7IGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTsgfVxuICByZW1vdmUobm9kZTogTm9kZSk6IE5vZGUge1xuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgZ2V0VmFsdWUoZWw6IGFueSk6IHN0cmluZyB7IHJldHVybiBlbC52YWx1ZTsgfVxuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICB9XG4gIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBIVE1MRG9jdW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoJ2Zha2VUaXRsZScpO1xuICB9XG4gIGdldERlZmF1bHREb2N1bWVudCgpOiBEb2N1bWVudCB7IHJldHVybiBkb2N1bWVudDsgfVxuXG4gIGlzRWxlbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREU7IH1cblxuICBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudDsgfVxuXG4gIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBnZXRIaXN0b3J5KCk6IEhpc3RvcnkgeyByZXR1cm4gd2luZG93Lmhpc3Rvcnk7IH1cbiAgZ2V0TG9jYXRpb24oKTogTG9jYXRpb24geyByZXR1cm4gd2luZG93LmxvY2F0aW9uOyB9XG4gIGdldEJhc2VIcmVmKGRvYzogRG9jdW1lbnQpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgaHJlZiA9IGdldEJhc2VFbGVtZW50SHJlZigpO1xuICAgIHJldHVybiBocmVmID09IG51bGwgPyBudWxsIDogcmVsYXRpdmVQYXRoKGhyZWYpO1xuICB9XG4gIHJlc2V0QmFzZUVsZW1lbnQoKTogdm9pZCB7IGJhc2VFbGVtZW50ID0gbnVsbDsgfVxuICBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHsgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50OyB9XG4gIHBlcmZvcm1hbmNlTm93KCk6IG51bWJlciB7XG4gICAgLy8gcGVyZm9ybWFuY2Uubm93KCkgaXMgbm90IGF2YWlsYWJsZSBpbiBhbGwgYnJvd3NlcnMsIHNlZVxuICAgIC8vIGh0dHA6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPXBlcmZvcm1hbmNlLm5vd1xuICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cblxuICBzdXBwb3J0c0Nvb2tpZXMoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG5cbiAgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHsgcmV0dXJuIHBhcnNlQ29va2llVmFsdWUoZG9jdW1lbnQuY29va2llLCBuYW1lKTsgfVxufVxuXG5sZXQgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuZnVuY3Rpb24gZ2V0QmFzZUVsZW1lbnRIcmVmKCk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgIGJhc2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpICE7XG4gICAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLy8gYmFzZWQgb24gdXJsVXRpbHMuanMgaW4gQW5ndWxhckpTIDFcbmxldCB1cmxQYXJzaW5nTm9kZTogYW55O1xuZnVuY3Rpb24gcmVsYXRpdmVQYXRoKHVybDogYW55KTogc3RyaW5nIHtcbiAgaWYgKCF1cmxQYXJzaW5nTm9kZSkge1xuICAgIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB9XG4gIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIHJldHVybiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lO1xufVxuIl19