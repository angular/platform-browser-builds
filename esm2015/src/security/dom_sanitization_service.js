/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { forwardRef, Inject, Injectable, Injector, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeUrl as _sanitizeUrl, ɵallowSanitizationBypassAndThrow as allowSanitizationBypassOrThrow, ɵbypassSanitizationTrustHtml as bypassSanitizationTrustHtml, ɵbypassSanitizationTrustResourceUrl as bypassSanitizationTrustResourceUrl, ɵbypassSanitizationTrustScript as bypassSanitizationTrustScript, ɵbypassSanitizationTrustStyle as bypassSanitizationTrustStyle, ɵbypassSanitizationTrustUrl as bypassSanitizationTrustUrl, ɵgetSanitizationBypassType as getSanitizationBypassType, ɵunwrapSafeValue as unwrapSafeValue } from '@angular/core';
import * as i0 from "@angular/core";
export { SecurityContext };
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
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
let DomSanitizer = /** @class */ (() => {
    class DomSanitizer {
    }
    DomSanitizer.ɵfac = function DomSanitizer_Factory(t) { return new (t || DomSanitizer)(); };
    DomSanitizer.ɵprov = i0.ɵɵdefineInjectable({ token: DomSanitizer, factory: function DomSanitizer_Factory(t) { var r = null; if (t) {
            r = new (t || DomSanitizer)();
        }
        else {
            r = i0.ɵɵinject(DomSanitizerImpl);
        } return r; }, providedIn: 'root' });
    return DomSanitizer;
})();
export { DomSanitizer };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSanitizer, [{
        type: Injectable,
        args: [{ providedIn: 'root', useExisting: forwardRef(() => DomSanitizerImpl) }]
    }], null, null); })();
export function domSanitizerImplFactory(injector) {
    return new DomSanitizerImpl(injector.get(DOCUMENT));
}
let DomSanitizerImpl = /** @class */ (() => {
    class DomSanitizerImpl extends DomSanitizer {
        constructor(_doc) {
            super();
            this._doc = _doc;
        }
        sanitize(ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case SecurityContext.NONE:
                    return value;
                case SecurityContext.HTML:
                    if (allowSanitizationBypassOrThrow(value, "HTML" /* Html */)) {
                        return unwrapSafeValue(value);
                    }
                    return _sanitizeHtml(this._doc, String(value));
                case SecurityContext.STYLE:
                    if (allowSanitizationBypassOrThrow(value, "Style" /* Style */)) {
                        return unwrapSafeValue(value);
                    }
                    return value;
                case SecurityContext.SCRIPT:
                    if (allowSanitizationBypassOrThrow(value, "Script" /* Script */)) {
                        return unwrapSafeValue(value);
                    }
                    throw new Error('unsafe value used in a script context');
                case SecurityContext.URL:
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
        bypassSecurityTrustHtml(value) {
            return bypassSanitizationTrustHtml(value);
        }
        bypassSecurityTrustStyle(value) {
            return bypassSanitizationTrustStyle(value);
        }
        bypassSecurityTrustScript(value) {
            return bypassSanitizationTrustScript(value);
        }
        bypassSecurityTrustUrl(value) {
            return bypassSanitizationTrustUrl(value);
        }
        bypassSecurityTrustResourceUrl(value) {
            return bypassSanitizationTrustResourceUrl(value);
        }
    }
    DomSanitizerImpl.ɵfac = function DomSanitizerImpl_Factory(t) { return new (t || DomSanitizerImpl)(i0.ɵɵinject(DOCUMENT)); };
    DomSanitizerImpl.ɵprov = i0.ɵɵdefineInjectable({ token: DomSanitizerImpl, factory: function DomSanitizerImpl_Factory(t) { var r = null; if (t) {
            r = new t();
        }
        else {
            r = domSanitizerImplFactory(i0.ɵɵinject(Injector));
        } return r; }, providedIn: 'root' });
    return DomSanitizerImpl;
})();
export { DomSanitizerImpl };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomSanitizerImpl, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: domSanitizerImplFactory, deps: [Injector] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFhLGVBQWUsRUFBRSxjQUFjLElBQUksYUFBYSxFQUFFLGFBQWEsSUFBSSxZQUFZLEVBQUUsZ0NBQWdDLElBQUksOEJBQThCLEVBQUUsNEJBQTRCLElBQUksMkJBQTJCLEVBQUUsbUNBQW1DLElBQUksa0NBQWtDLEVBQUUsOEJBQThCLElBQUksNkJBQTZCLEVBQUUsNkJBQTZCLElBQUksNEJBQTRCLEVBQUUsMkJBQTJCLElBQUksMEJBQTBCLEVBQTZCLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLGdCQUFnQixJQUFJLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFbnFCLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQThDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNIO0lBQUEsTUFDc0IsWUFBWTs7NEVBQVosWUFBWTt3REFBWixZQUFZOzBCQUFaLFlBQVk7Ozs0QkFENkIsZ0JBQWdCO21DQUF0RCxNQUFNO3VCQXhGL0I7S0ErSUM7U0F0RHFCLFlBQVk7a0RBQVosWUFBWTtjQURqQyxVQUFVO2VBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBQzs7QUF5RGpGLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxRQUFrQjtJQUN4RCxPQUFPLElBQUks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OztzQkFFeEUsTUFBTTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtmb3J3YXJkUmVmLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBTYW5pdGl6ZXIsIFNlY3VyaXR5Q29udGV4dCwgybVfc2FuaXRpemVIdG1sIGFzIF9zYW5pdGl6ZUh0bWwsIMm1X3Nhbml0aXplVXJsIGFzIF9zYW5pdGl6ZVVybCwgybVhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc0FuZFRocm93IGFzIGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdywgybVieXBhc3NTYW5pdGl6YXRpb25UcnVzdEh0bWwgYXMgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sLCDJtWJ5cGFzc1Nhbml0aXphdGlvblRydXN0UmVzb3VyY2VVcmwgYXMgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybCwgybVieXBhc3NTYW5pdGl6YXRpb25UcnVzdFNjcmlwdCBhcyBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFNjcmlwdCwgybVieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0eWxlIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3R5bGUsIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RVcmwgYXMgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RVcmwsIMm1QnlwYXNzVHlwZSBhcyBCeXBhc3NUeXBlLCDJtWdldFNhbml0aXphdGlvbkJ5cGFzc1R5cGUgYXMgZ2V0U2FuaXRpemF0aW9uQnlwYXNzVHlwZSwgybV1bndyYXBTYWZlVmFsdWUgYXMgdW53cmFwU2FmZVZhbHVlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IHtTZWN1cml0eUNvbnRleHR9O1xuXG5cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBpbiBhIHBhcnRpY3VsYXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSFRNTC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZUh0bWwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBzdHlsZSAoQ1NTKS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVN0eWxlIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSmF2YVNjcmlwdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVNjcmlwdCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIGxpbmtpbmcgdG8gYSBkb2N1bWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVSZXNvdXJjZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIERvbVNhbml0aXplciBoZWxwcyBwcmV2ZW50aW5nIENyb3NzIFNpdGUgU2NyaXB0aW5nIFNlY3VyaXR5IGJ1Z3MgKFhTUykgYnkgc2FuaXRpemluZ1xuICogdmFsdWVzIHRvIGJlIHNhZmUgdG8gdXNlIGluIHRoZSBkaWZmZXJlbnQgRE9NIGNvbnRleHRzLlxuICpcbiAqIEZvciBleGFtcGxlLCB3aGVuIGJpbmRpbmcgYSBVUkwgaW4gYW4gYDxhIFtocmVmXT1cInNvbWVWYWx1ZVwiPmAgaHlwZXJsaW5rLCBgc29tZVZhbHVlYCB3aWxsIGJlXG4gKiBzYW5pdGl6ZWQgc28gdGhhdCBhbiBhdHRhY2tlciBjYW5ub3QgaW5qZWN0IGUuZy4gYSBgamF2YXNjcmlwdDpgIFVSTCB0aGF0IHdvdWxkIGV4ZWN1dGUgY29kZSBvblxuICogdGhlIHdlYnNpdGUuXG4gKlxuICogSW4gc3BlY2lmaWMgc2l0dWF0aW9ucywgaXQgbWlnaHQgYmUgbmVjZXNzYXJ5IHRvIGRpc2FibGUgc2FuaXRpemF0aW9uLCBmb3IgZXhhbXBsZSBpZiB0aGVcbiAqIGFwcGxpY2F0aW9uIGdlbnVpbmVseSBuZWVkcyB0byBwcm9kdWNlIGEgYGphdmFzY3JpcHQ6YCBzdHlsZSBsaW5rIHdpdGggYSBkeW5hbWljIHZhbHVlIGluIGl0LlxuICogVXNlcnMgY2FuIGJ5cGFzcyBzZWN1cml0eSBieSBjb25zdHJ1Y3RpbmcgYSB2YWx1ZSB3aXRoIG9uZSBvZiB0aGUgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gXG4gKiBtZXRob2RzLCBhbmQgdGhlbiBiaW5kaW5nIHRvIHRoYXQgdmFsdWUgZnJvbSB0aGUgdGVtcGxhdGUuXG4gKlxuICogVGhlc2Ugc2l0dWF0aW9ucyBzaG91bGQgYmUgdmVyeSByYXJlLCBhbmQgZXh0cmFvcmRpbmFyeSBjYXJlIG11c3QgYmUgdGFrZW4gdG8gYXZvaWQgY3JlYXRpbmcgYVxuICogQ3Jvc3MgU2l0ZSBTY3JpcHRpbmcgKFhTUykgc2VjdXJpdHkgYnVnIVxuICpcbiAqIFdoZW4gdXNpbmcgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gLCBtYWtlIHN1cmUgdG8gY2FsbCB0aGUgbWV0aG9kIGFzIGVhcmx5IGFzIHBvc3NpYmxlIGFuZCBhc1xuICogY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIHNvdXJjZSBvZiB0aGUgdmFsdWUsIHRvIG1ha2UgaXQgZWFzeSB0byB2ZXJpZnkgbm8gc2VjdXJpdHkgYnVnIGlzXG4gKiBjcmVhdGVkIGJ5IGl0cyB1c2UuXG4gKlxuICogSXQgaXMgbm90IHJlcXVpcmVkIChhbmQgbm90IHJlY29tbWVuZGVkKSB0byBieXBhc3Mgc2VjdXJpdHkgaWYgdGhlIHZhbHVlIGlzIHNhZmUsIGUuZy4gYSBVUkwgdGhhdFxuICogZG9lcyBub3Qgc3RhcnQgd2l0aCBhIHN1c3BpY2lvdXMgcHJvdG9jb2wsIG9yIGFuIEhUTUwgc25pcHBldCB0aGF0IGRvZXMgbm90IGNvbnRhaW4gZGFuZ2Vyb3VzXG4gKiBjb2RlLiBUaGUgc2FuaXRpemVyIGxlYXZlcyBzYWZlIHZhbHVlcyBpbnRhY3QuXG4gKlxuICogQHNlY3VyaXR5IENhbGxpbmcgYW55IG9mIHRoZSBgYnlwYXNzU2VjdXJpdHlUcnVzdC4uLmAgQVBJcyBkaXNhYmxlcyBBbmd1bGFyJ3MgYnVpbHQtaW5cbiAqIHNhbml0aXphdGlvbiBmb3IgdGhlIHZhbHVlIHBhc3NlZCBpbi4gQ2FyZWZ1bGx5IGNoZWNrIGFuZCBhdWRpdCBhbGwgdmFsdWVzIGFuZCBjb2RlIHBhdGhzIGdvaW5nXG4gKiBpbnRvIHRoaXMgY2FsbC4gTWFrZSBzdXJlIGFueSB1c2VyIGRhdGEgaXMgYXBwcm9wcmlhdGVseSBlc2NhcGVkIGZvciB0aGlzIHNlY3VyaXR5IGNvbnRleHQuXG4gKiBGb3IgbW9yZSBkZXRhaWwsIHNlZSB0aGUgW1NlY3VyaXR5IEd1aWRlXShodHRwOi8vZy5jby9uZy9zZWN1cml0eSkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEb21TYW5pdGl6ZXJJbXBsKX0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9tU2FuaXRpemVyIGltcGxlbWVudHMgU2FuaXRpemVyIHtcbiAgLyoqXG4gICAqIFNhbml0aXplcyBhIHZhbHVlIGZvciB1c2UgaW4gdGhlIGdpdmVuIFNlY3VyaXR5Q29udGV4dC5cbiAgICpcbiAgICogSWYgdmFsdWUgaXMgdHJ1c3RlZCBmb3IgdGhlIGNvbnRleHQsIHRoaXMgbWV0aG9kIHdpbGwgdW53cmFwIHRoZSBjb250YWluZWQgc2FmZSB2YWx1ZSBhbmQgdXNlXG4gICAqIGl0IGRpcmVjdGx5LiBPdGhlcndpc2UsIHZhbHVlIHdpbGwgYmUgc2FuaXRpemVkIHRvIGJlIHNhZmUgaW4gdGhlIGdpdmVuIGNvbnRleHQsIGZvciBleGFtcGxlXG4gICAqIGJ5IHJlcGxhY2luZyBVUkxzIHRoYXQgaGF2ZSBhbiB1bnNhZmUgcHJvdG9jb2wgcGFydCAoc3VjaCBhcyBgamF2YXNjcmlwdDpgKS4gVGhlIGltcGxlbWVudGF0aW9uXG4gICAqIGlzIHJlc3BvbnNpYmxlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBjYW4gZGVmaW5pdGVseSBiZSBzYWZlbHkgdXNlZCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICovXG4gIGFic3RyYWN0IHNhbml0aXplKGNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCwgdmFsdWU6IFNhZmVWYWx1ZXxzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEhUTUwuIE9ubHkgdXNlIHRoaXMgd2hlbiB0aGUgYm91bmQgSFRNTFxuICAgKiBpcyB1bnNhZmUgKGUuZy4gY29udGFpbnMgYDxzY3JpcHQ+YCB0YWdzKSBhbmQgdGhlIGNvZGUgc2hvdWxkIGJlIGV4ZWN1dGVkLiBUaGUgc2FuaXRpemVyIHdpbGxcbiAgICogbGVhdmUgc2FmZSBIVE1MIGludGFjdCwgc28gaW4gbW9zdCBzaXR1YXRpb25zIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgc3R5bGUgdmFsdWUgKENTUykuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGU7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgSmF2YVNjcmlwdC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBTYWZlU2NyaXB0O1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBhIHNhZmUgc3R5bGUgVVJMLCBpLmUuIGEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZFxuICAgKiBpbiBoeXBlcmxpbmtzIG9yIGA8aW1nIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIGEgc2FmZSByZXNvdXJjZSBVUkwsIGkuZS4gYSBsb2NhdGlvbiB0aGF0IG1heVxuICAgKiBiZSB1c2VkIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20sIGxpa2UgYDxzY3JpcHQgc3JjPmAsIG9yIGA8aWZyYW1lIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9tU2FuaXRpemVySW1wbEZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gIHJldHVybiBuZXcgRG9tU2FuaXRpemVySW1wbChpbmplY3Rvci5nZXQoRE9DVU1FTlQpKTtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290JywgdXNlRmFjdG9yeTogZG9tU2FuaXRpemVySW1wbEZhY3RvcnksIGRlcHM6IFtJbmplY3Rvcl19KVxuZXhwb3J0IGNsYXNzIERvbVNhbml0aXplckltcGwgZXh0ZW5kcyBEb21TYW5pdGl6ZXIge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzYW5pdGl6ZShjdHg6IFNlY3VyaXR5Q29udGV4dCwgdmFsdWU6IFNhZmVWYWx1ZXxzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgc3dpdGNoIChjdHgpIHtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0Lk5PTkU6XG4gICAgICAgIHJldHVybiB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5IVE1MOlxuICAgICAgICBpZiAoYWxsb3dTYW5pdGl6YXRpb25CeXBhc3NPclRocm93KHZhbHVlLCBCeXBhc3NUeXBlLkh0bWwpKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zYW5pdGl6ZUh0bWwodGhpcy5fZG9jLCBTdHJpbmcodmFsdWUpKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlNUWUxFOlxuICAgICAgICBpZiAoYWxsb3dTYW5pdGl6YXRpb25CeXBhc3NPclRocm93KHZhbHVlLCBCeXBhc3NUeXBlLlN0eWxlKSkge1xuICAgICAgICAgIHJldHVybiB1bndyYXBTYWZlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZSBhcyBzdHJpbmc7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TQ1JJUFQ6XG4gICAgICAgIGlmIChhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3codmFsdWUsIEJ5cGFzc1R5cGUuU2NyaXB0KSkge1xuICAgICAgICAgIHJldHVybiB1bndyYXBTYWZlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSBzY3JpcHQgY29udGV4dCcpO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuVVJMOlxuICAgICAgICBjb25zdCB0eXBlID0gZ2V0U2FuaXRpemF0aW9uQnlwYXNzVHlwZSh2YWx1ZSk7XG4gICAgICAgIGlmIChhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3codmFsdWUsIEJ5cGFzc1R5cGUuVXJsKSkge1xuICAgICAgICAgIHJldHVybiB1bndyYXBTYWZlVmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc2FuaXRpemVVcmwoU3RyaW5nKHZhbHVlKSk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkw6XG4gICAgICAgIGlmIChhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3codmFsdWUsIEJ5cGFzc1R5cGUuUmVzb3VyY2VVcmwpKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ3Vuc2FmZSB2YWx1ZSB1c2VkIGluIGEgcmVzb3VyY2UgVVJMIGNvbnRleHQgKHNlZSBodHRwOi8vZy5jby9uZy9zZWN1cml0eSN4c3MpJyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgU2VjdXJpdHlDb250ZXh0ICR7Y3R4fSAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcylgKTtcbiAgICB9XG4gIH1cblxuICBieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWwge1xuICAgIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdEh0bWwodmFsdWUpO1xuICB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZSh2YWx1ZSk7XG4gIH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdCB7XG4gICAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U2NyaXB0KHZhbHVlKTtcbiAgfVxuICBieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RVcmwodmFsdWUpO1xuICB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==