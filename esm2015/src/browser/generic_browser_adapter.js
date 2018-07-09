/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DomAdapter } from '../dom/dom_adapter';
/**
 * Provides DOM operations in any browser environment.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */
export class GenericBrowserDomAdapter extends DomAdapter {
    constructor() {
        super();
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            const /** @type {?} */ element = this.createElement('div', document);
            if (this.getStyle(element, 'animationName') != null) {
                this._animationPrefix = '';
            }
            else {
                const /** @type {?} */ domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (let /** @type {?} */ i = 0; i < domPrefixes.length; i++) {
                    if (this.getStyle(element, domPrefixes[i] + 'AnimationName') != null) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            const /** @type {?} */ transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            Object.keys(transEndEventNames).forEach((key) => {
                if (this.getStyle(element, key) != null) {
                    this._transitionEnd = transEndEventNames[key];
                }
            });
        }
        catch (/** @type {?} */ e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { return (/** @type {?} */ (el)).getDistributedNodes(); }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    /**
     * @return {?}
     */
    supportsDOMEvents() { return true; }
    /**
     * @return {?}
     */
    supportsNativeShadowDOM() {
        return typeof (/** @type {?} */ (document.body)).createShadowRoot === 'function';
    }
    /**
     * @return {?}
     */
    getAnimationPrefix() { return this._animationPrefix ? this._animationPrefix : ''; }
    /**
     * @return {?}
     */
    getTransitionEnd() { return this._transitionEnd ? this._transitionEnd : ''; }
    /**
     * @return {?}
     */
    supportsAnimation() {
        return this._animationPrefix != null && this._transitionEnd != null;
    }
}
function GenericBrowserDomAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    GenericBrowserDomAdapter.prototype._animationPrefix;
    /** @type {?} */
    GenericBrowserDomAdapter.prototype._transitionEnd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7OztBQVU5QyxNQUFNLCtCQUF5QyxTQUFRLFVBQVU7SUFHL0Q7UUFDRSxLQUFLLEVBQUUsQ0FBQztnQ0FIOEIsSUFBSTs4QkFDTixJQUFJO1FBR3hDLElBQUk7WUFDRix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsdUJBQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRWpELEtBQUsscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFO3dCQUNwRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7d0JBQ2pFLE1BQU07cUJBQ1A7aUJBQ0Y7YUFDRjtZQUVELHVCQUFNLGtCQUFrQixHQUE0QjtnQkFDbEQsZ0JBQWdCLEVBQUUscUJBQXFCO2dCQUN2QyxhQUFhLEVBQUUsZUFBZTtnQkFDOUIsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsVUFBVSxFQUFFLGVBQWU7YUFDNUIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQy9DO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFBQyx3QkFBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0tBQ0Y7Ozs7O0lBRUQsbUJBQW1CLENBQUMsRUFBZSxJQUFZLE9BQU8sbUJBQU0sRUFBRSxFQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxFQUFFOzs7Ozs7O0lBQ3hGLGlCQUFpQixDQUFDLEVBQXFCLEVBQUUsT0FBZSxFQUFFLElBQVk7UUFDcEUsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQzVEOzs7O0lBQ0QsaUJBQWlCLEtBQWMsT0FBTyxJQUFJLENBQUMsRUFBRTs7OztJQUM3Qyx1QkFBdUI7UUFDckIsT0FBTyxPQUFNLG1CQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLENBQUM7S0FDbkU7Ozs7SUFDRCxrQkFBa0IsS0FBYSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTs7OztJQUMzRixnQkFBZ0IsS0FBYSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzs7O0lBQ3JGLGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQztLQUNyRTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RvbUFkYXB0ZXJ9IGZyb20gJy4uL2RvbS9kb21fYWRhcHRlcic7XG5cblxuXG4vKipcbiAqIFByb3ZpZGVzIERPTSBvcGVyYXRpb25zIGluIGFueSBicm93c2VyIGVudmlyb25tZW50LlxuICpcbiAqIEBzZWN1cml0eSBUcmVhZCBjYXJlZnVsbHkhIEludGVyYWN0aW5nIHdpdGggdGhlIERPTSBkaXJlY3RseSBpcyBkYW5nZXJvdXMgYW5kXG4gKiBjYW4gaW50cm9kdWNlIFhTUyByaXNrcy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIERvbUFkYXB0ZXIge1xuICBwcml2YXRlIF9hbmltYXRpb25QcmVmaXg6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdkaXYnLCBkb2N1bWVudCk7XG4gICAgICBpZiAodGhpcy5nZXRTdHlsZShlbGVtZW50LCAnYW5pbWF0aW9uTmFtZScpICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb21QcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdPJywgJ21zJ107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21QcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsIGRvbVByZWZpeGVzW2ldICsgJ0FuaW1hdGlvbk5hbWUnKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25QcmVmaXggPSAnLScgKyBkb21QcmVmaXhlc1tpXS50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRyYW5zRW5kRXZlbnROYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnXG4gICAgICB9O1xuXG4gICAgICBPYmplY3Qua2V5cyh0cmFuc0VuZEV2ZW50TmFtZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmdldFN0eWxlKGVsZW1lbnQsIGtleSkgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSB0cmFuc0VuZEV2ZW50TmFtZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gbnVsbDtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldERpc3RyaWJ1dGVkTm9kZXMoZWw6IEhUTUxFbGVtZW50KTogTm9kZVtdIHsgcmV0dXJuICg8YW55PmVsKS5nZXREaXN0cmlidXRlZE5vZGVzKCk7IH1cbiAgcmVzb2x2ZUFuZFNldEhyZWYoZWw6IEhUTUxBbmNob3JFbGVtZW50LCBiYXNlVXJsOiBzdHJpbmcsIGhyZWY6IHN0cmluZykge1xuICAgIGVsLmhyZWYgPSBocmVmID09IG51bGwgPyBiYXNlVXJsIDogYmFzZVVybCArICcvLi4vJyArIGhyZWY7XG4gIH1cbiAgc3VwcG9ydHNET01FdmVudHMoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XG4gIHN1cHBvcnRzTmF0aXZlU2hhZG93RE9NKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YoPGFueT5kb2N1bWVudC5ib2R5KS5jcmVhdGVTaGFkb3dSb290ID09PSAnZnVuY3Rpb24nO1xuICB9XG4gIGdldEFuaW1hdGlvblByZWZpeCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYW5pbWF0aW9uUHJlZml4ID8gdGhpcy5fYW5pbWF0aW9uUHJlZml4IDogJyc7IH1cbiAgZ2V0VHJhbnNpdGlvbkVuZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbkVuZCA/IHRoaXMuX3RyYW5zaXRpb25FbmQgOiAnJzsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uUHJlZml4ICE9IG51bGwgJiYgdGhpcy5fdHJhbnNpdGlvbkVuZCAhPSBudWxsO1xuICB9XG59XG4iXX0=