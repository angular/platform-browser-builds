/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/security/dom_sanitization_service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { forwardRef, Inject, Injectable, Injector, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeStyle as _sanitizeStyle, ɵ_sanitizeUrl as _sanitizeUrl, ɵallowSanitizationBypassAndThrow as allowSanitizationBypassOrThrow, ɵbypassSanitizationTrustHtml as bypassSanitizationTrustHtml, ɵbypassSanitizationTrustResourceUrl as bypassSanitizationTrustResourceUrl, ɵbypassSanitizationTrustScript as bypassSanitizationTrustScript, ɵbypassSanitizationTrustStyle as bypassSanitizationTrustStyle, ɵbypassSanitizationTrustUrl as bypassSanitizationTrustUrl, ɵgetSanitizationBypassType as getSanitizationBypassType, ɵunwrapSafeValue as unwrapSafeValue } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { SecurityContext };
/**
 * Marker interface for a value that's safe to use in a particular context.
 *
 * \@publicApi
 * @record
 */
export function SafeValue() { }
/**
 * Marker interface for a value that's safe to use as HTML.
 *
 * \@publicApi
 * @record
 */
export function SafeHtml() { }
/**
 * Marker interface for a value that's safe to use as style (CSS).
 *
 * \@publicApi
 * @record
 */
export function SafeStyle() { }
/**
 * Marker interface for a value that's safe to use as JavaScript.
 *
 * \@publicApi
 * @record
 */
export function SafeScript() { }
/**
 * Marker interface for a value that's safe to use as a URL linking to a document.
 *
 * \@publicApi
 * @record
 */
export function SafeUrl() { }
/**
 * Marker interface for a value that's safe to use as a URL to load executable code from.
 *
 * \@publicApi
 * @record
 */
export function SafeResourceUrl() { }
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * \@security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * \@publicApi
 * @abstract
 */
export class DomSanitizer {
}
DomSanitizer.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useExisting: forwardRef((/**
                 * @return {?}
                 */
                () => DomSanitizerImpl)) },] },
];
/** @nocollapse */ DomSanitizer.ɵfac = function DomSanitizer_Factory(t) { return new (t || DomSanitizer)(); };
/** @nocollapse */ DomSanitizer.ɵprov = i0.ɵɵdefineInjectable({ token: DomSanitizer, factory: function DomSanitizer_Factory(t) { var r = null; if (t) {
        r = new (t || DomSanitizer)();
    }
    else {
        r = i0.ɵɵinject(DomSanitizerImpl);
    } return r; }, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSanitizer, [{
        type: Injectable,
        args: [{ providedIn: 'root', useExisting: forwardRef(/**
                 * @return {?}
                 */
                () => DomSanitizerImpl) }]
    }], null, null); })();
if (false) {
    /**
     * Sanitizes a value for use in the given SecurityContext.
     *
     * If value is trusted for the context, this method will unwrap the contained safe value and use
     * it directly. Otherwise, value will be sanitized to be safe in the given context, for example
     * by replacing URLs that have an unsafe protocol part (such as `javascript:`). The implementation
     * is responsible to make sure that the value can definitely be safely used in the given context.
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.sanitize = function (context, value) { };
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustHtml = function (value) { };
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustStyle = function (value) { };
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustScript = function (value) { };
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustUrl = function (value) { };
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustResourceUrl = function (value) { };
}
/**
 * @param {?} injector
 * @return {?}
 */
export function domSanitizerImplFactory(injector) {
    return new DomSanitizerImpl(injector.get(DOCUMENT));
}
export class DomSanitizerImpl extends DomSanitizer {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        super();
        this._doc = _doc;
    }
    /**
     * @param {?} ctx
     * @param {?} value
     * @return {?}
     */
    sanitize(ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return (/** @type {?} */ (value));
            case SecurityContext.HTML:
                if (allowSanitizationBypassOrThrow(value, "HTML" /* Html */)) {
                    return unwrapSafeValue(value);
                }
                return _sanitizeHtml(this._doc, String(value));
            case SecurityContext.STYLE:
                if (allowSanitizationBypassOrThrow(value, "Style" /* Style */)) {
                    return unwrapSafeValue(value);
                }
                return _sanitizeStyle((/** @type {?} */ (value)));
            case SecurityContext.SCRIPT:
                if (allowSanitizationBypassOrThrow(value, "Script" /* Script */)) {
                    return unwrapSafeValue(value);
                }
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                /** @type {?} */
                const type = getSanitizationBypassType(value);
                if (allowSanitizationBypassOrThrow(value, "URL" /* Url */)) {
                    return unwrapSafeValue(value);
                }
                return _sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (allowSanitizationBypassOrThrow(value, "ResourceURL" /* ResourceUrl */)) {
                    return unwrapSafeValue(value);
                }
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error(`Unexpected SecurityContext ${ctx} (see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustHtml(value) {
        return bypassSanitizationTrustHtml(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustStyle(value) {
        return bypassSanitizationTrustStyle(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustScript(value) {
        return bypassSanitizationTrustScript(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustUrl(value) {
        return bypassSanitizationTrustUrl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustResourceUrl(value) {
        return bypassSanitizationTrustResourceUrl(value);
    }
}
DomSanitizerImpl.decorators = [
    { type: Injectable, args: [{ providedIn: 'root', useFactory: domSanitizerImplFactory, deps: [Injector] },] },
];
/** @nocollapse */
DomSanitizerImpl.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) { return new (t || DomSanitizerImpl)(i0.ɵɵinject(DOCUMENT)); };
/** @nocollapse */ DomSanitizerImpl.ɵprov = i0.ɵɵdefineInjectable({ token: DomSanitizerImpl, factory: function DomSanitizerImpl_Factory(t) { var r = null; if (t) {
        r = new t();
    }
    else {
        r = domSanitizerImplFactory(i0.ɵɵinject(Injector));
    } return r; }, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSanitizerImpl, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: domSanitizerImplFactory, deps: [Injector] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomSanitizerImpl.prototype._doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQWEsZUFBZSxFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxhQUFhLElBQUksWUFBWSxFQUFFLGdDQUFnQyxJQUFJLDhCQUE4QixFQUFFLDRCQUE0QixJQUFJLDJCQUEyQixFQUFFLG1DQUFtQyxJQUFJLGtDQUFrQyxFQUFFLDhCQUE4QixJQUFJLDZCQUE2QixFQUFFLDZCQUE2QixJQUFJLDRCQUE0QixFQUFFLDJCQUEyQixJQUFJLDBCQUEwQixFQUE2QiwwQkFBMEIsSUFBSSx5QkFBeUIsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQUV0c0IsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDOzs7Ozs7O0FBU3pCLCtCQUE2Qjs7Ozs7OztBQU83Qiw4QkFBOEM7Ozs7Ozs7QUFPOUMsK0JBQStDOzs7Ozs7O0FBTy9DLGdDQUFnRDs7Ozs7OztBQU9oRCw2QkFBNkM7Ozs7Ozs7QUFPN0MscUNBQXFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ3JELE1BQU0sT0FBZ0IsWUFBWTs7O1lBRGpDLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVU7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBQyxFQUFDOzsyRkFDM0QsWUFBWTt1RUFBWixZQUFZ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QUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBQ0Qsc0JBQXNCLENBQUMsS0FBYTtRQUNsQyxPQUFPLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBQ0QsOEJBQThCLENBQUMsS0FBYTtRQUMxQyxPQUFPLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7OztZQXpERixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQzs7Ozs0Q0FFeEUsTUFBTSxTQUFDLFFBQVE7O21HQURqQixnQkFBZ0IsY0FDUCxRQUFROzJFQURqQixnQkFBZ0I7Ozs7WUFEZ0IsdUJBQXVCLGFBQVMsUUFBUTsrQkFBNUQsTUFBTTtrREFDbEIsZ0JBQWdCO2NBRDVCLFVBQVU7ZUFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFDOztzQkFFeEUsTUFBTTt1QkFBQyxRQUFROzs7Ozs7O0lBQWhCLGdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Zm9yd2FyZFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3RvciwgU2FuaXRpemVyLCBTZWN1cml0eUNvbnRleHQsIMm1X3Nhbml0aXplSHRtbCBhcyBfc2FuaXRpemVIdG1sLCDJtV9zYW5pdGl6ZVN0eWxlIGFzIF9zYW5pdGl6ZVN0eWxlLCDJtV9zYW5pdGl6ZVVybCBhcyBfc2FuaXRpemVVcmwsIMm1YWxsb3dTYW5pdGl6YXRpb25CeXBhc3NBbmRUaHJvdyBhcyBhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3csIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0SHRtbCwgybVieXBhc3NTYW5pdGl6YXRpb25UcnVzdFJlc291cmNlVXJsIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0UmVzb3VyY2VVcmwsIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQgYXMgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQsIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZSBhcyBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0eWxlLCDJtWJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsLCDJtUJ5cGFzc1R5cGUgYXMgQnlwYXNzVHlwZSwgybVnZXRTYW5pdGl6YXRpb25CeXBhc3NUeXBlIGFzIGdldFNhbml0aXphdGlvbkJ5cGFzc1R5cGUsIMm1dW53cmFwU2FmZVZhbHVlIGFzIHVud3JhcFNhZmVWYWx1ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB7U2VjdXJpdHlDb250ZXh0fTtcblxuXG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgaW4gYSBwYXJ0aWN1bGFyIGNvbnRleHQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIEhUTUwuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVIdG1sIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgc3R5bGUgKENTUykuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVTdHlsZSBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIEphdmFTY3JpcHQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVTY3JpcHQgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBhIFVSTCBsaW5raW5nIHRvIGEgZG9jdW1lbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVVcmwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBhIFVSTCB0byBsb2FkIGV4ZWN1dGFibGUgY29kZSBmcm9tLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlUmVzb3VyY2VVcmwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBEb21TYW5pdGl6ZXIgaGVscHMgcHJldmVudGluZyBDcm9zcyBTaXRlIFNjcmlwdGluZyBTZWN1cml0eSBidWdzIChYU1MpIGJ5IHNhbml0aXppbmdcbiAqIHZhbHVlcyB0byBiZSBzYWZlIHRvIHVzZSBpbiB0aGUgZGlmZmVyZW50IERPTSBjb250ZXh0cy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgd2hlbiBiaW5kaW5nIGEgVVJMIGluIGFuIGA8YSBbaHJlZl09XCJzb21lVmFsdWVcIj5gIGh5cGVybGluaywgYHNvbWVWYWx1ZWAgd2lsbCBiZVxuICogc2FuaXRpemVkIHNvIHRoYXQgYW4gYXR0YWNrZXIgY2Fubm90IGluamVjdCBlLmcuIGEgYGphdmFzY3JpcHQ6YCBVUkwgdGhhdCB3b3VsZCBleGVjdXRlIGNvZGUgb25cbiAqIHRoZSB3ZWJzaXRlLlxuICpcbiAqIEluIHNwZWNpZmljIHNpdHVhdGlvbnMsIGl0IG1pZ2h0IGJlIG5lY2Vzc2FyeSB0byBkaXNhYmxlIHNhbml0aXphdGlvbiwgZm9yIGV4YW1wbGUgaWYgdGhlXG4gKiBhcHBsaWNhdGlvbiBnZW51aW5lbHkgbmVlZHMgdG8gcHJvZHVjZSBhIGBqYXZhc2NyaXB0OmAgc3R5bGUgbGluayB3aXRoIGEgZHluYW1pYyB2YWx1ZSBpbiBpdC5cbiAqIFVzZXJzIGNhbiBieXBhc3Mgc2VjdXJpdHkgYnkgY29uc3RydWN0aW5nIGEgdmFsdWUgd2l0aCBvbmUgb2YgdGhlIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYFxuICogbWV0aG9kcywgYW5kIHRoZW4gYmluZGluZyB0byB0aGF0IHZhbHVlIGZyb20gdGhlIHRlbXBsYXRlLlxuICpcbiAqIFRoZXNlIHNpdHVhdGlvbnMgc2hvdWxkIGJlIHZlcnkgcmFyZSwgYW5kIGV4dHJhb3JkaW5hcnkgY2FyZSBtdXN0IGJlIHRha2VuIHRvIGF2b2lkIGNyZWF0aW5nIGFcbiAqIENyb3NzIFNpdGUgU2NyaXB0aW5nIChYU1MpIHNlY3VyaXR5IGJ1ZyFcbiAqXG4gKiBXaGVuIHVzaW5nIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYCwgbWFrZSBzdXJlIHRvIGNhbGwgdGhlIG1ldGhvZCBhcyBlYXJseSBhcyBwb3NzaWJsZSBhbmQgYXNcbiAqIGNsb3NlIGFzIHBvc3NpYmxlIHRvIHRoZSBzb3VyY2Ugb2YgdGhlIHZhbHVlLCB0byBtYWtlIGl0IGVhc3kgdG8gdmVyaWZ5IG5vIHNlY3VyaXR5IGJ1ZyBpc1xuICogY3JlYXRlZCBieSBpdHMgdXNlLlxuICpcbiAqIEl0IGlzIG5vdCByZXF1aXJlZCAoYW5kIG5vdCByZWNvbW1lbmRlZCkgdG8gYnlwYXNzIHNlY3VyaXR5IGlmIHRoZSB2YWx1ZSBpcyBzYWZlLCBlLmcuIGEgVVJMIHRoYXRcbiAqIGRvZXMgbm90IHN0YXJ0IHdpdGggYSBzdXNwaWNpb3VzIHByb3RvY29sLCBvciBhbiBIVE1MIHNuaXBwZXQgdGhhdCBkb2VzIG5vdCBjb250YWluIGRhbmdlcm91c1xuICogY29kZS4gVGhlIHNhbml0aXplciBsZWF2ZXMgc2FmZSB2YWx1ZXMgaW50YWN0LlxuICpcbiAqIEBzZWN1cml0eSBDYWxsaW5nIGFueSBvZiB0aGUgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gIEFQSXMgZGlzYWJsZXMgQW5ndWxhcidzIGJ1aWx0LWluXG4gKiBzYW5pdGl6YXRpb24gZm9yIHRoZSB2YWx1ZSBwYXNzZWQgaW4uIENhcmVmdWxseSBjaGVjayBhbmQgYXVkaXQgYWxsIHZhbHVlcyBhbmQgY29kZSBwYXRocyBnb2luZ1xuICogaW50byB0aGlzIGNhbGwuIE1ha2Ugc3VyZSBhbnkgdXNlciBkYXRhIGlzIGFwcHJvcHJpYXRlbHkgZXNjYXBlZCBmb3IgdGhpcyBzZWN1cml0eSBjb250ZXh0LlxuICogRm9yIG1vcmUgZGV0YWlsLCBzZWUgdGhlIFtTZWN1cml0eSBHdWlkZV0oaHR0cDovL2cuY28vbmcvc2VjdXJpdHkpLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRG9tU2FuaXRpemVySW1wbCl9KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERvbVNhbml0aXplciBpbXBsZW1lbnRzIFNhbml0aXplciB7XG4gIC8qKlxuICAgKiBTYW5pdGl6ZXMgYSB2YWx1ZSBmb3IgdXNlIGluIHRoZSBnaXZlbiBTZWN1cml0eUNvbnRleHQuXG4gICAqXG4gICAqIElmIHZhbHVlIGlzIHRydXN0ZWQgZm9yIHRoZSBjb250ZXh0LCB0aGlzIG1ldGhvZCB3aWxsIHVud3JhcCB0aGUgY29udGFpbmVkIHNhZmUgdmFsdWUgYW5kIHVzZVxuICAgKiBpdCBkaXJlY3RseS4gT3RoZXJ3aXNlLCB2YWx1ZSB3aWxsIGJlIHNhbml0aXplZCB0byBiZSBzYWZlIGluIHRoZSBnaXZlbiBjb250ZXh0LCBmb3IgZXhhbXBsZVxuICAgKiBieSByZXBsYWNpbmcgVVJMcyB0aGF0IGhhdmUgYW4gdW5zYWZlIHByb3RvY29sIHBhcnQgKHN1Y2ggYXMgYGphdmFzY3JpcHQ6YCkuIFRoZSBpbXBsZW1lbnRhdGlvblxuICAgKiBpcyByZXNwb25zaWJsZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgY2FuIGRlZmluaXRlbHkgYmUgc2FmZWx5IHVzZWQgaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gICAqL1xuICBhYnN0cmFjdCBzYW5pdGl6ZShjb250ZXh0OiBTZWN1cml0eUNvbnRleHQsIHZhbHVlOiBTYWZlVmFsdWV8c3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgc2FmZSBIVE1MLiBPbmx5IHVzZSB0aGlzIHdoZW4gdGhlIGJvdW5kIEhUTUxcbiAgICogaXMgdW5zYWZlIChlLmcuIGNvbnRhaW5zIGA8c2NyaXB0PmAgdGFncykgYW5kIHRoZSBjb2RlIHNob3VsZCBiZSBleGVjdXRlZC4gVGhlIHNhbml0aXplciB3aWxsXG4gICAqIGxlYXZlIHNhZmUgSFRNTCBpbnRhY3QsIHNvIGluIG1vc3Qgc2l0dWF0aW9ucyB0aGlzIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWU6IHN0cmluZyk6IFNhZmVIdG1sO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIHN0eWxlIHZhbHVlIChDU1MpLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEphdmFTY3JpcHQuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgYSBzYWZlIHN0eWxlIFVSTCwgaS5lLiBhIHZhbHVlIHRoYXQgY2FuIGJlIHVzZWRcbiAgICogaW4gaHlwZXJsaW5rcyBvciBgPGltZyBzcmM+YC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlVXJsO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBhIHNhZmUgcmVzb3VyY2UgVVJMLCBpLmUuIGEgbG9jYXRpb24gdGhhdCBtYXlcbiAgICogYmUgdXNlZCB0byBsb2FkIGV4ZWN1dGFibGUgY29kZSBmcm9tLCBsaWtlIGA8c2NyaXB0IHNyYz5gLCBvciBgPGlmcmFtZSBzcmM+YC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbVNhbml0aXplckltcGxGYWN0b3J5KGluamVjdG9yOiBJbmplY3Rvcikge1xuICByZXR1cm4gbmV3IERvbVNhbml0aXplckltcGwoaW5qZWN0b3IuZ2V0KERPQ1VNRU5UKSk7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUZhY3Rvcnk6IGRvbVNhbml0aXplckltcGxGYWN0b3J5LCBkZXBzOiBbSW5qZWN0b3JdfSlcbmV4cG9ydCBjbGFzcyBEb21TYW5pdGl6ZXJJbXBsIGV4dGVuZHMgRG9tU2FuaXRpemVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2FuaXRpemUoY3R4OiBTZWN1cml0eUNvbnRleHQsIHZhbHVlOiBTYWZlVmFsdWV8c3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHN3aXRjaCAoY3R4KSB7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5OT05FOlxuICAgICAgICByZXR1cm4gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuSFRNTDpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5IdG1sKSkge1xuICAgICAgICAgIHJldHVybiB1bndyYXBTYWZlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc2FuaXRpemVIdG1sKHRoaXMuX2RvYywgU3RyaW5nKHZhbHVlKSk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TVFlMRTpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5TdHlsZSkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Nhbml0aXplU3R5bGUodmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlNDUklQVDpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5TY3JpcHQpKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnNhZmUgdmFsdWUgdXNlZCBpbiBhIHNjcmlwdCBjb250ZXh0Jyk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5VUkw6XG4gICAgICAgIGNvbnN0IHR5cGUgPSBnZXRTYW5pdGl6YXRpb25CeXBhc3NUeXBlKHZhbHVlKTtcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5VcmwpKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zYW5pdGl6ZVVybChTdHJpbmcodmFsdWUpKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTDpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5SZXNvdXJjZVVybCkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSByZXNvdXJjZSBVUkwgY29udGV4dCAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcyknKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBTZWN1cml0eUNvbnRleHQgJHtjdHh9IChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKWApO1xuICAgIH1cbiAgfVxuXG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbCB7XG4gICAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0SHRtbCh2YWx1ZSk7XG4gIH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0eWxlKHZhbHVlKTtcbiAgfVxuICBieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBTYWZlU2NyaXB0IHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQodmFsdWUpO1xuICB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmwge1xuICAgIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFVybCh2YWx1ZSk7XG4gIH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFJlc291cmNlVXJsKHZhbHVlKTtcbiAgfVxufVxuIl19