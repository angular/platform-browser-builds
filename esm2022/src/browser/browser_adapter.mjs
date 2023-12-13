/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵparseCookieValue as parseCookieValue, ɵsetRootDomAdapter as setRootDomAdapter } from '@angular/common';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType no-console */
export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    static makeCurrent() {
        setRootDomAdapter(new BrowserDomAdapter());
    }
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener);
        return () => {
            el.removeEventListener(evt, listener);
        };
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
    }
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
        return document;
    }
    isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(node) {
        return node instanceof DocumentFragment;
    }
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
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
    getBaseHref(doc) {
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    resetBaseElement() {
        baseElement = null;
    }
    getUserAgent() {
        return window.navigator.userAgent;
    }
    getCookie(name) {
        return parseCookieValue(document.cookie, name);
    }
}
let baseElement = null;
function getBaseElementHref() {
    baseElement = baseElement || document.querySelector('base');
    return baseElement ? baseElement.getAttribute('href') : null;
}
function relativePath(url) {
    // The base URL doesn't really matter, we just need it so relative paths have something
    // to resolve against. In the browser `HTMLBaseElement.href` is always absolute.
    return new URL(url, document.baseURI).pathname;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFL0csT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFbkU7Ozs7O0dBS0c7QUFDSCxvREFBb0Q7QUFDcEQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLHdCQUF3QjtJQUM3RCxNQUFNLENBQUMsV0FBVztRQUNoQixpQkFBaUIsQ0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRVEsV0FBVyxDQUFDLEVBQVEsRUFBRSxHQUFRLEVBQUUsUUFBYTtRQUNwRCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxFQUFFO1lBQ1YsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ1EsYUFBYSxDQUFDLEVBQVEsRUFBRSxHQUFRO1FBQ3ZDLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNRLE1BQU0sQ0FBQyxJQUFVO1FBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7SUFDUSxhQUFhLENBQUMsT0FBZSxFQUFFLEdBQWM7UUFDcEQsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUN2QyxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNRLGtCQUFrQjtRQUN6QixPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNRLGtCQUFrQjtRQUN6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRVEsYUFBYSxDQUFDLElBQVU7UUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0MsQ0FBQztJQUVRLFlBQVksQ0FBQyxJQUFTO1FBQzdCLE9BQU8sSUFBSSxZQUFZLGdCQUFnQixDQUFDO0lBQzFDLENBQUM7SUFFRCxpRkFBaUY7SUFDeEUsb0JBQW9CLENBQUMsR0FBYSxFQUFFLE1BQWM7UUFDekQsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDekIsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUNyQixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDUSxXQUFXLENBQUMsR0FBYTtRQUNoQyxNQUFNLElBQUksR0FBRyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNRLGdCQUFnQjtRQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDUSxZQUFZO1FBQ25CLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQUNRLFNBQVMsQ0FBQyxJQUFZO1FBQzdCLE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFFRCxJQUFJLFdBQVcsR0FBcUIsSUFBSSxDQUFDO0FBQ3pDLFNBQVMsa0JBQWtCO0lBQ3pCLFdBQVcsR0FBRyxXQUFXLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQy9ELENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQy9CLHVGQUF1RjtJQUN2RixnRkFBZ0Y7SUFDaEYsT0FBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVwYXJzZUNvb2tpZVZhbHVlIGFzIHBhcnNlQ29va2llVmFsdWUsIMm1c2V0Um9vdERvbUFkYXB0ZXIgYXMgc2V0Um9vdERvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7R2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyJztcblxuLyoqXG4gKiBBIGBEb21BZGFwdGVyYCBwb3dlcmVkIGJ5IGZ1bGwgYnJvd3NlciBET00gQVBJcy5cbiAqXG4gKiBAc2VjdXJpdHkgVHJlYWQgY2FyZWZ1bGx5ISBJbnRlcmFjdGluZyB3aXRoIHRoZSBET00gZGlyZWN0bHkgaXMgZGFuZ2Vyb3VzIGFuZFxuICogY2FuIGludHJvZHVjZSBYU1Mgcmlza3MuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOnJlcXVpcmVQYXJhbWV0ZXJUeXBlIG5vLWNvbnNvbGUgKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciB7XG4gIHN0YXRpYyBtYWtlQ3VycmVudCgpIHtcbiAgICBzZXRSb290RG9tQWRhcHRlcihuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKSk7XG4gIH1cblxuICBvdmVycmlkZSBvbkFuZENhbmNlbChlbDogTm9kZSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpOiBGdW5jdGlvbiB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG4gIG92ZXJyaWRlIGRpc3BhdGNoRXZlbnQoZWw6IE5vZGUsIGV2dDogYW55KSB7XG4gICAgZWwuZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG4gIG92ZXJyaWRlIHJlbW92ZShub2RlOiBOb2RlKTogdm9pZCB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgfVxuICBvdmVycmlkZSBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICB9XG4gIG92ZXJyaWRlIGNyZWF0ZUh0bWxEb2N1bWVudCgpOiBEb2N1bWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnZmFrZVRpdGxlJyk7XG4gIH1cbiAgb3ZlcnJpZGUgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQ7XG4gIH1cblxuICBvdmVycmlkZSBpc0VsZW1lbnROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREU7XG4gIH1cblxuICBvdmVycmlkZSBpc1NoYWRvd1Jvb3Qobm9kZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50O1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIE5vIGxvbmdlciBiZWluZyB1c2VkIGluIEl2eSBjb2RlLiBUbyBiZSByZW1vdmVkIGluIHZlcnNpb24gMTQuICovXG4gIG92ZXJyaWRlIGdldEdsb2JhbEV2ZW50VGFyZ2V0KGRvYzogRG9jdW1lbnQsIHRhcmdldDogc3RyaW5nKTogRXZlbnRUYXJnZXR8bnVsbCB7XG4gICAgaWYgKHRhcmdldCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdkb2N1bWVudCcpIHtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xuICAgICAgcmV0dXJuIGRvYy5ib2R5O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBvdmVycmlkZSBnZXRCYXNlSHJlZihkb2M6IERvY3VtZW50KTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IGhyZWYgPSBnZXRCYXNlRWxlbWVudEhyZWYoKTtcbiAgICByZXR1cm4gaHJlZiA9PSBudWxsID8gbnVsbCA6IHJlbGF0aXZlUGF0aChocmVmKTtcbiAgfVxuICBvdmVycmlkZSByZXNldEJhc2VFbGVtZW50KCk6IHZvaWQge1xuICAgIGJhc2VFbGVtZW50ID0gbnVsbDtcbiAgfVxuICBvdmVycmlkZSBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH1cbiAgb3ZlcnJpZGUgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gcGFyc2VDb29raWVWYWx1ZShkb2N1bWVudC5jb29raWUsIG5hbWUpO1xuICB9XG59XG5cbmxldCBiYXNlRWxlbWVudDogSFRNTEVsZW1lbnR8bnVsbCA9IG51bGw7XG5mdW5jdGlvbiBnZXRCYXNlRWxlbWVudEhyZWYoKTogc3RyaW5nfG51bGwge1xuICBiYXNlRWxlbWVudCA9IGJhc2VFbGVtZW50IHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKTtcbiAgcmV0dXJuIGJhc2VFbGVtZW50ID8gYmFzZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgOiBudWxsO1xufVxuXG5mdW5jdGlvbiByZWxhdGl2ZVBhdGgodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBUaGUgYmFzZSBVUkwgZG9lc24ndCByZWFsbHkgbWF0dGVyLCB3ZSBqdXN0IG5lZWQgaXQgc28gcmVsYXRpdmUgcGF0aHMgaGF2ZSBzb21ldGhpbmdcbiAgLy8gdG8gcmVzb2x2ZSBhZ2FpbnN0LiBJbiB0aGUgYnJvd3NlciBgSFRNTEJhc2VFbGVtZW50LmhyZWZgIGlzIGFsd2F5cyBhYnNvbHV0ZS5cbiAgcmV0dXJuIG5ldyBVUkwodXJsLCBkb2N1bWVudC5iYXNlVVJJKS5wYXRobmFtZTtcbn1cbiJdfQ==