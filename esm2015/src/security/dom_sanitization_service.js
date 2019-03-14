/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeStyle as _sanitizeStyle, ɵ_sanitizeUrl as _sanitizeUrl } from '@angular/core';
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
                if (value instanceof SafeHtmlImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'HTML');
                return _sanitizeHtml(this._doc, String(value));
            case SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Style');
                return _sanitizeStyle((/** @type {?} */ (value)));
            case SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'URL');
                return _sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error(`Unexpected SecurityContext ${ctx} (see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @param {?} expectedType
     * @return {?}
     */
    checkNotSafeValue(value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error(`Required a safe ${expectedType}, got a ${value.getTypeName()} ` +
                `(see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustHtml(value) { return new SafeHtmlImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustStyle(value) { return new SafeStyleImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustScript(value) { return new SafeScriptImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustUrl(value) { return new SafeUrlImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustResourceUrl(value) {
        return new SafeResourceUrlImpl(value);
    }
}
DomSanitizerImpl.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomSanitizerImpl.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ DomSanitizerImpl.ngInjectableDef = i0.defineInjectable({ token: DomSanitizerImpl, factory: function DomSanitizerImpl_Factory(t) { return new (t || DomSanitizerImpl)(i0.inject(DOCUMENT)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(DomSanitizerImpl, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomSanitizerImpl.prototype._doc;
}
/**
 * @abstract
 */
class SafeValueImpl {
    /**
     * @param {?} changingThisBreaksApplicationSecurity
     */
    constructor(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    /**
     * @return {?}
     */
    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            ` (see http://g.co/ng/security#xss)`;
    }
}
if (false) {
    /** @type {?} */
    SafeValueImpl.prototype.changingThisBreaksApplicationSecurity;
    /**
     * @abstract
     * @return {?}
     */
    SafeValueImpl.prototype.getTypeName = function () { };
}
class SafeHtmlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'HTML'; }
}
class SafeStyleImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Style'; }
}
class SafeScriptImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Script'; }
}
class SafeUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'URL'; }
}
class SafeResourceUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'ResourceURL'; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQWEsZUFBZSxFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxhQUFhLElBQUksWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7QUFHaEwsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDOzs7Ozs7O0FBU3pCLCtCQUE2Qjs7Ozs7OztBQU83Qiw4QkFBOEM7Ozs7Ozs7QUFPOUMsK0JBQStDOzs7Ozs7O0FBTy9DLGdDQUFnRDs7Ozs7OztBQU9oRCw2QkFBNkM7Ozs7Ozs7QUFPN0MscUNBQXFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ3JELE1BQU0sT0FBZ0IsWUFBWTtDQXNEakM7Ozs7Ozs7Ozs7Ozs7O0lBN0NDLGdFQUF1Rjs7Ozs7Ozs7Ozs7O0lBVXZGLHNFQUEwRDs7Ozs7Ozs7OztJQVExRCx1RUFBNEQ7Ozs7Ozs7Ozs7SUFRNUQsd0VBQThEOzs7Ozs7Ozs7OztJQVM5RCxxRUFBd0Q7Ozs7Ozs7Ozs7O0lBU3hELDZFQUF3RTs7QUFLMUUsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7Ozs7SUFDaEQsWUFBc0MsSUFBUztRQUFJLEtBQUssRUFBRSxDQUFDO1FBQXJCLFNBQUksR0FBSixJQUFJLENBQUs7SUFBYSxDQUFDOzs7Ozs7SUFFN0QsUUFBUSxDQUFDLEdBQW9CLEVBQUUsS0FBNEI7UUFDekQsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sSUFB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QWdCLG1FQUFoQixnQkFBZ0IsWUFDUCxRQUFRO21DQURqQixnQkFBZ0I7Y0FENUIsVUFBVTs7c0JBRUksTUFBTTt1QkFBQyxRQUFROzs7Ozs7O0lBQWhCLGdDQUFtQzs7Ozs7QUF1RGpELE1BQWUsYUFBYTs7OztJQUMxQixZQUFtQixxQ0FBNkM7UUFBN0MsMENBQXFDLEdBQXJDLHFDQUFxQyxDQUFRO1FBQzlELFFBQVE7SUFDVixDQUFDOzs7O0lBSUQsUUFBUTtRQUNOLE9BQU8sMENBQTBDLElBQUksQ0FBQyxxQ0FBcUMsRUFBRTtZQUN6RixvQ0FBb0MsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7OztJQVZhLDhEQUFvRDs7Ozs7SUFJaEUsc0RBQStCOztBQVFqQyxNQUFNLFlBQWEsU0FBUSxhQUFhOzs7O0lBQ3RDLFdBQVcsS0FBSyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUM7Q0FDakM7QUFDRCxNQUFNLGFBQWMsU0FBUSxhQUFhOzs7O0lBQ3ZDLFdBQVcsS0FBSyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDbEM7QUFDRCxNQUFNLGNBQWUsU0FBUSxhQUFhOzs7O0lBQ3hDLFdBQVcsS0FBSyxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUM7Q0FDbkM7QUFDRCxNQUFNLFdBQVksU0FBUSxhQUFhOzs7O0lBQ3JDLFdBQVcsS0FBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDaEM7QUFDRCxNQUFNLG1CQUFvQixTQUFRLGFBQWE7Ozs7SUFDN0MsV0FBVyxLQUFLLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQztDQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBTYW5pdGl6ZXIsIFNlY3VyaXR5Q29udGV4dCwgybVfc2FuaXRpemVIdG1sIGFzIF9zYW5pdGl6ZUh0bWwsIMm1X3Nhbml0aXplU3R5bGUgYXMgX3Nhbml0aXplU3R5bGUsIMm1X3Nhbml0aXplVXJsIGFzIF9zYW5pdGl6ZVVybH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IHtTZWN1cml0eUNvbnRleHR9O1xuXG5cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBpbiBhIHBhcnRpY3VsYXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSFRNTC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZUh0bWwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBzdHlsZSAoQ1NTKS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVN0eWxlIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSmF2YVNjcmlwdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVNjcmlwdCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIGxpbmtpbmcgdG8gYSBkb2N1bWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVSZXNvdXJjZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIERvbVNhbml0aXplciBoZWxwcyBwcmV2ZW50aW5nIENyb3NzIFNpdGUgU2NyaXB0aW5nIFNlY3VyaXR5IGJ1Z3MgKFhTUykgYnkgc2FuaXRpemluZ1xuICogdmFsdWVzIHRvIGJlIHNhZmUgdG8gdXNlIGluIHRoZSBkaWZmZXJlbnQgRE9NIGNvbnRleHRzLlxuICpcbiAqIEZvciBleGFtcGxlLCB3aGVuIGJpbmRpbmcgYSBVUkwgaW4gYW4gYDxhIFtocmVmXT1cInNvbWVWYWx1ZVwiPmAgaHlwZXJsaW5rLCBgc29tZVZhbHVlYCB3aWxsIGJlXG4gKiBzYW5pdGl6ZWQgc28gdGhhdCBhbiBhdHRhY2tlciBjYW5ub3QgaW5qZWN0IGUuZy4gYSBgamF2YXNjcmlwdDpgIFVSTCB0aGF0IHdvdWxkIGV4ZWN1dGUgY29kZSBvblxuICogdGhlIHdlYnNpdGUuXG4gKlxuICogSW4gc3BlY2lmaWMgc2l0dWF0aW9ucywgaXQgbWlnaHQgYmUgbmVjZXNzYXJ5IHRvIGRpc2FibGUgc2FuaXRpemF0aW9uLCBmb3IgZXhhbXBsZSBpZiB0aGVcbiAqIGFwcGxpY2F0aW9uIGdlbnVpbmVseSBuZWVkcyB0byBwcm9kdWNlIGEgYGphdmFzY3JpcHQ6YCBzdHlsZSBsaW5rIHdpdGggYSBkeW5hbWljIHZhbHVlIGluIGl0LlxuICogVXNlcnMgY2FuIGJ5cGFzcyBzZWN1cml0eSBieSBjb25zdHJ1Y3RpbmcgYSB2YWx1ZSB3aXRoIG9uZSBvZiB0aGUgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gXG4gKiBtZXRob2RzLCBhbmQgdGhlbiBiaW5kaW5nIHRvIHRoYXQgdmFsdWUgZnJvbSB0aGUgdGVtcGxhdGUuXG4gKlxuICogVGhlc2Ugc2l0dWF0aW9ucyBzaG91bGQgYmUgdmVyeSByYXJlLCBhbmQgZXh0cmFvcmRpbmFyeSBjYXJlIG11c3QgYmUgdGFrZW4gdG8gYXZvaWQgY3JlYXRpbmcgYVxuICogQ3Jvc3MgU2l0ZSBTY3JpcHRpbmcgKFhTUykgc2VjdXJpdHkgYnVnIVxuICpcbiAqIFdoZW4gdXNpbmcgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gLCBtYWtlIHN1cmUgdG8gY2FsbCB0aGUgbWV0aG9kIGFzIGVhcmx5IGFzIHBvc3NpYmxlIGFuZCBhc1xuICogY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIHNvdXJjZSBvZiB0aGUgdmFsdWUsIHRvIG1ha2UgaXQgZWFzeSB0byB2ZXJpZnkgbm8gc2VjdXJpdHkgYnVnIGlzXG4gKiBjcmVhdGVkIGJ5IGl0cyB1c2UuXG4gKlxuICogSXQgaXMgbm90IHJlcXVpcmVkIChhbmQgbm90IHJlY29tbWVuZGVkKSB0byBieXBhc3Mgc2VjdXJpdHkgaWYgdGhlIHZhbHVlIGlzIHNhZmUsIGUuZy4gYSBVUkwgdGhhdFxuICogZG9lcyBub3Qgc3RhcnQgd2l0aCBhIHN1c3BpY2lvdXMgcHJvdG9jb2wsIG9yIGFuIEhUTUwgc25pcHBldCB0aGF0IGRvZXMgbm90IGNvbnRhaW4gZGFuZ2Vyb3VzXG4gKiBjb2RlLiBUaGUgc2FuaXRpemVyIGxlYXZlcyBzYWZlIHZhbHVlcyBpbnRhY3QuXG4gKlxuICogQHNlY3VyaXR5IENhbGxpbmcgYW55IG9mIHRoZSBgYnlwYXNzU2VjdXJpdHlUcnVzdC4uLmAgQVBJcyBkaXNhYmxlcyBBbmd1bGFyJ3MgYnVpbHQtaW5cbiAqIHNhbml0aXphdGlvbiBmb3IgdGhlIHZhbHVlIHBhc3NlZCBpbi4gQ2FyZWZ1bGx5IGNoZWNrIGFuZCBhdWRpdCBhbGwgdmFsdWVzIGFuZCBjb2RlIHBhdGhzIGdvaW5nXG4gKiBpbnRvIHRoaXMgY2FsbC4gTWFrZSBzdXJlIGFueSB1c2VyIGRhdGEgaXMgYXBwcm9wcmlhdGVseSBlc2NhcGVkIGZvciB0aGlzIHNlY3VyaXR5IGNvbnRleHQuXG4gKiBGb3IgbW9yZSBkZXRhaWwsIHNlZSB0aGUgW1NlY3VyaXR5IEd1aWRlXShodHRwOi8vZy5jby9uZy9zZWN1cml0eSkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9tU2FuaXRpemVyIGltcGxlbWVudHMgU2FuaXRpemVyIHtcbiAgLyoqXG4gICAqIFNhbml0aXplcyBhIHZhbHVlIGZvciB1c2UgaW4gdGhlIGdpdmVuIFNlY3VyaXR5Q29udGV4dC5cbiAgICpcbiAgICogSWYgdmFsdWUgaXMgdHJ1c3RlZCBmb3IgdGhlIGNvbnRleHQsIHRoaXMgbWV0aG9kIHdpbGwgdW53cmFwIHRoZSBjb250YWluZWQgc2FmZSB2YWx1ZSBhbmQgdXNlXG4gICAqIGl0IGRpcmVjdGx5LiBPdGhlcndpc2UsIHZhbHVlIHdpbGwgYmUgc2FuaXRpemVkIHRvIGJlIHNhZmUgaW4gdGhlIGdpdmVuIGNvbnRleHQsIGZvciBleGFtcGxlXG4gICAqIGJ5IHJlcGxhY2luZyBVUkxzIHRoYXQgaGF2ZSBhbiB1bnNhZmUgcHJvdG9jb2wgcGFydCAoc3VjaCBhcyBgamF2YXNjcmlwdDpgKS4gVGhlIGltcGxlbWVudGF0aW9uXG4gICAqIGlzIHJlc3BvbnNpYmxlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBjYW4gZGVmaW5pdGVseSBiZSBzYWZlbHkgdXNlZCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICovXG4gIGFic3RyYWN0IHNhbml0aXplKGNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCwgdmFsdWU6IFNhZmVWYWx1ZXxzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEhUTUwuIE9ubHkgdXNlIHRoaXMgd2hlbiB0aGUgYm91bmQgSFRNTFxuICAgKiBpcyB1bnNhZmUgKGUuZy4gY29udGFpbnMgYDxzY3JpcHQ+YCB0YWdzKSBhbmQgdGhlIGNvZGUgc2hvdWxkIGJlIGV4ZWN1dGVkLiBUaGUgc2FuaXRpemVyIHdpbGxcbiAgICogbGVhdmUgc2FmZSBIVE1MIGludGFjdCwgc28gaW4gbW9zdCBzaXR1YXRpb25zIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgc3R5bGUgdmFsdWUgKENTUykuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGU7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgSmF2YVNjcmlwdC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBTYWZlU2NyaXB0O1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBhIHNhZmUgc3R5bGUgVVJMLCBpLmUuIGEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZFxuICAgKiBpbiBoeXBlcmxpbmtzIG9yIGA8aW1nIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIGEgc2FmZSByZXNvdXJjZSBVUkwsIGkuZS4gYSBsb2NhdGlvbiB0aGF0IG1heVxuICAgKiBiZSB1c2VkIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20sIGxpa2UgYDxzY3JpcHQgc3JjPmAsIG9yIGA8aWZyYW1lIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsO1xufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21TYW5pdGl6ZXJJbXBsIGV4dGVuZHMgRG9tU2FuaXRpemVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHsgc3VwZXIoKTsgfVxuXG4gIHNhbml0aXplKGN0eDogU2VjdXJpdHlDb250ZXh0LCB2YWx1ZTogU2FmZVZhbHVlfHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBzd2l0Y2ggKGN0eCkge1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuTk9ORTpcbiAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHN0cmluZztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LkhUTUw6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVIdG1sSW1wbCkgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdIVE1MJyk7XG4gICAgICAgIHJldHVybiBfc2FuaXRpemVIdG1sKHRoaXMuX2RvYywgU3RyaW5nKHZhbHVlKSk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TVFlMRTpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVN0eWxlSW1wbCkgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdTdHlsZScpO1xuICAgICAgICByZXR1cm4gX3Nhbml0aXplU3R5bGUodmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlNDUklQVDpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVNjcmlwdEltcGwpIHJldHVybiB2YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICB0aGlzLmNoZWNrTm90U2FmZVZhbHVlKHZhbHVlLCAnU2NyaXB0Jyk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSBzY3JpcHQgY29udGV4dCcpO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuVVJMOlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTYWZlUmVzb3VyY2VVcmxJbXBsIHx8IHZhbHVlIGluc3RhbmNlb2YgU2FmZVVybEltcGwpIHtcbiAgICAgICAgICAvLyBBbGxvdyByZXNvdXJjZSBVUkxzIGluIFVSTCBjb250ZXh0cywgdGhleSBhcmUgc3RyaWN0bHkgbW9yZSB0cnVzdGVkLlxuICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdVUkwnKTtcbiAgICAgICAgcmV0dXJuIF9zYW5pdGl6ZVVybChTdHJpbmcodmFsdWUpKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTDpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVJlc291cmNlVXJsSW1wbCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdSZXNvdXJjZVVSTCcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSByZXNvdXJjZSBVUkwgY29udGV4dCAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcyknKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBTZWN1cml0eUNvbnRleHQgJHtjdHh9IChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tOb3RTYWZlVmFsdWUodmFsdWU6IGFueSwgZXhwZWN0ZWRUeXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTYWZlVmFsdWVJbXBsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFJlcXVpcmVkIGEgc2FmZSAke2V4cGVjdGVkVHlwZX0sIGdvdCBhICR7dmFsdWUuZ2V0VHlwZU5hbWUoKX0gYCArXG4gICAgICAgICAgYChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKWApO1xuICAgIH1cbiAgfVxuXG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbCB7IHJldHVybiBuZXcgU2FmZUh0bWxJbXBsKHZhbHVlKTsgfVxuICBieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWU6IHN0cmluZyk6IFNhZmVTdHlsZSB7IHJldHVybiBuZXcgU2FmZVN0eWxlSW1wbCh2YWx1ZSk7IH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdCB7IHJldHVybiBuZXcgU2FmZVNjcmlwdEltcGwodmFsdWUpOyB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmwgeyByZXR1cm4gbmV3IFNhZmVVcmxJbXBsKHZhbHVlKTsgfVxuICBieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgcmV0dXJuIG5ldyBTYWZlUmVzb3VyY2VVcmxJbXBsKHZhbHVlKTtcbiAgfVxufVxuXG5hYnN0cmFjdCBjbGFzcyBTYWZlVmFsdWVJbXBsIGltcGxlbWVudHMgU2FmZVZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk6IHN0cmluZykge1xuICAgIC8vIGVtcHR5XG4gIH1cblxuICBhYnN0cmFjdCBnZXRUeXBlTmFtZSgpOiBzdHJpbmc7XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBTYWZlVmFsdWUgbXVzdCB1c2UgW3Byb3BlcnR5XT1iaW5kaW5nOiAke3RoaXMuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eX1gICtcbiAgICAgICAgYCAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcylgO1xuICB9XG59XG5cbmNsYXNzIFNhZmVIdG1sSW1wbCBleHRlbmRzIFNhZmVWYWx1ZUltcGwgaW1wbGVtZW50cyBTYWZlSHRtbCB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ0hUTUwnOyB9XG59XG5jbGFzcyBTYWZlU3R5bGVJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbCBpbXBsZW1lbnRzIFNhZmVTdHlsZSB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1N0eWxlJzsgfVxufVxuY2xhc3MgU2FmZVNjcmlwdEltcGwgZXh0ZW5kcyBTYWZlVmFsdWVJbXBsIGltcGxlbWVudHMgU2FmZVNjcmlwdCB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1NjcmlwdCc7IH1cbn1cbmNsYXNzIFNhZmVVcmxJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbCBpbXBsZW1lbnRzIFNhZmVVcmwge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdVUkwnOyB9XG59XG5jbGFzcyBTYWZlUmVzb3VyY2VVcmxJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbCBpbXBsZW1lbnRzIFNhZmVSZXNvdXJjZVVybCB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1Jlc291cmNlVVJMJzsgfVxufVxuIl19