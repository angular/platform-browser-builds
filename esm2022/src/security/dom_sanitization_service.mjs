/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { forwardRef, Inject, Injectable, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeUrl as _sanitizeUrl, ɵallowSanitizationBypassAndThrow as allowSanitizationBypassOrThrow, ɵbypassSanitizationTrustHtml as bypassSanitizationTrustHtml, ɵbypassSanitizationTrustResourceUrl as bypassSanitizationTrustResourceUrl, ɵbypassSanitizationTrustScript as bypassSanitizationTrustScript, ɵbypassSanitizationTrustStyle as bypassSanitizationTrustStyle, ɵbypassSanitizationTrustUrl as bypassSanitizationTrustUrl, ɵRuntimeError as RuntimeError, ɵunwrapSafeValue as unwrapSafeValue, ɵXSS_SECURITY_URL as XSS_SECURITY_URL, } from '@angular/core';
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
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
export class DomSanitizer {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizer, providedIn: 'root', useExisting: i0.forwardRef(() => DomSanitizerImpl) }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useExisting: forwardRef(() => DomSanitizerImpl) }]
        }] });
export class DomSanitizerImpl extends DomSanitizer {
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
                if (allowSanitizationBypassOrThrow(value, "HTML" /* BypassType.Html */)) {
                    return unwrapSafeValue(value);
                }
                return _sanitizeHtml(this._doc, String(value)).toString();
            case SecurityContext.STYLE:
                if (allowSanitizationBypassOrThrow(value, "Style" /* BypassType.Style */)) {
                    return unwrapSafeValue(value);
                }
                return value;
            case SecurityContext.SCRIPT:
                if (allowSanitizationBypassOrThrow(value, "Script" /* BypassType.Script */)) {
                    return unwrapSafeValue(value);
                }
                throw new RuntimeError(5200 /* RuntimeErrorCode.SANITIZATION_UNSAFE_SCRIPT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'unsafe value used in a script context');
            case SecurityContext.URL:
                if (allowSanitizationBypassOrThrow(value, "URL" /* BypassType.Url */)) {
                    return unwrapSafeValue(value);
                }
                return _sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (allowSanitizationBypassOrThrow(value, "ResourceURL" /* BypassType.ResourceUrl */)) {
                    return unwrapSafeValue(value);
                }
                throw new RuntimeError(5201 /* RuntimeErrorCode.SANITIZATION_UNSAFE_RESOURCE_URL */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `unsafe value used in a resource URL context (see ${XSS_SECURITY_URL})`);
            default:
                throw new RuntimeError(5202 /* RuntimeErrorCode.SANITIZATION_UNEXPECTED_CTX */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `Unexpected SecurityContext ${ctx} (see ${XSS_SECURITY_URL})`);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizerImpl, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizerImpl, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: DomSanitizerImpl, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixVQUFVLEVBRVYsZUFBZSxFQUNmLGNBQWMsSUFBSSxhQUFhLEVBQy9CLGFBQWEsSUFBSSxZQUFZLEVBQzdCLGdDQUFnQyxJQUFJLDhCQUE4QixFQUNsRSw0QkFBNEIsSUFBSSwyQkFBMkIsRUFDM0QsbUNBQW1DLElBQUksa0NBQWtDLEVBQ3pFLDhCQUE4QixJQUFJLDZCQUE2QixFQUMvRCw2QkFBNkIsSUFBSSw0QkFBNEIsRUFDN0QsMkJBQTJCLElBQUksMEJBQTBCLEVBRXpELGFBQWEsSUFBSSxZQUFZLEVBQzdCLGdCQUFnQixJQUFJLGVBQWUsRUFDbkMsaUJBQWlCLElBQUksZ0JBQWdCLEdBQ3RDLE1BQU0sZUFBZSxDQUFDOztBQUl2QixPQUFPLEVBQUMsZUFBZSxFQUFDLENBQUM7QUE0Q3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFFSCxNQUFNLE9BQWdCLFlBQVk7eUhBQVosWUFBWTs2SEFBWixZQUFZLGNBRFQsTUFBTSxtQ0FBZ0MsZ0JBQWdCOztzR0FDekQsWUFBWTtrQkFEakMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDOztBQTJEakYsTUFBTSxPQUFPLGdCQUFpQixTQUFRLFlBQVk7SUFDaEQsWUFBc0MsSUFBUztRQUM3QyxLQUFLLEVBQUUsQ0FB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biAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0YWJsZSxcbiAgU2FuaXRpemVyLFxuICBTZWN1cml0eUNvbnRleHQsXG4gIMm1X3Nhbml0aXplSHRtbCBhcyBfc2FuaXRpemVIdG1sLFxuICDJtV9zYW5pdGl6ZVVybCBhcyBfc2FuaXRpemVVcmwsXG4gIMm1YWxsb3dTYW5pdGl6YXRpb25CeXBhc3NBbmRUaHJvdyBhcyBhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3csXG4gIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0SHRtbCxcbiAgybVieXBhc3NTYW5pdGl6YXRpb25UcnVzdFJlc291cmNlVXJsIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0UmVzb3VyY2VVcmwsXG4gIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQgYXMgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQsXG4gIMm1YnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZSBhcyBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0eWxlLFxuICDJtWJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsIGFzIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsLFxuICDJtUJ5cGFzc1R5cGUgYXMgQnlwYXNzVHlwZSxcbiAgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yLFxuICDJtXVud3JhcFNhZmVWYWx1ZSBhcyB1bndyYXBTYWZlVmFsdWUsXG4gIMm1WFNTX1NFQ1VSSVRZX1VSTCBhcyBYU1NfU0VDVVJJVFlfVVJMLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuXG5leHBvcnQge1NlY3VyaXR5Q29udGV4dH07XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgaW4gYSBwYXJ0aWN1bGFyIGNvbnRleHQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIEhUTUwuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVIdG1sIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgc3R5bGUgKENTUykuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVTdHlsZSBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIEphdmFTY3JpcHQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVTY3JpcHQgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBhIFVSTCBsaW5raW5nIHRvIGEgZG9jdW1lbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVVcmwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBhIFVSTCB0byBsb2FkIGV4ZWN1dGFibGUgY29kZSBmcm9tLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlUmVzb3VyY2VVcmwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBEb21TYW5pdGl6ZXIgaGVscHMgcHJldmVudGluZyBDcm9zcyBTaXRlIFNjcmlwdGluZyBTZWN1cml0eSBidWdzIChYU1MpIGJ5IHNhbml0aXppbmdcbiAqIHZhbHVlcyB0byBiZSBzYWZlIHRvIHVzZSBpbiB0aGUgZGlmZmVyZW50IERPTSBjb250ZXh0cy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgd2hlbiBiaW5kaW5nIGEgVVJMIGluIGFuIGA8YSBbaHJlZl09XCJzb21lVmFsdWVcIj5gIGh5cGVybGluaywgYHNvbWVWYWx1ZWAgd2lsbCBiZVxuICogc2FuaXRpemVkIHNvIHRoYXQgYW4gYXR0YWNrZXIgY2Fubm90IGluamVjdCBlLmcuIGEgYGphdmFzY3JpcHQ6YCBVUkwgdGhhdCB3b3VsZCBleGVjdXRlIGNvZGUgb25cbiAqIHRoZSB3ZWJzaXRlLlxuICpcbiAqIEluIHNwZWNpZmljIHNpdHVhdGlvbnMsIGl0IG1pZ2h0IGJlIG5lY2Vzc2FyeSB0byBkaXNhYmxlIHNhbml0aXphdGlvbiwgZm9yIGV4YW1wbGUgaWYgdGhlXG4gKiBhcHBsaWNhdGlvbiBnZW51aW5lbHkgbmVlZHMgdG8gcHJvZHVjZSBhIGBqYXZhc2NyaXB0OmAgc3R5bGUgbGluayB3aXRoIGEgZHluYW1pYyB2YWx1ZSBpbiBpdC5cbiAqIFVzZXJzIGNhbiBieXBhc3Mgc2VjdXJpdHkgYnkgY29uc3RydWN0aW5nIGEgdmFsdWUgd2l0aCBvbmUgb2YgdGhlIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYFxuICogbWV0aG9kcywgYW5kIHRoZW4gYmluZGluZyB0byB0aGF0IHZhbHVlIGZyb20gdGhlIHRlbXBsYXRlLlxuICpcbiAqIFRoZXNlIHNpdHVhdGlvbnMgc2hvdWxkIGJlIHZlcnkgcmFyZSwgYW5kIGV4dHJhb3JkaW5hcnkgY2FyZSBtdXN0IGJlIHRha2VuIHRvIGF2b2lkIGNyZWF0aW5nIGFcbiAqIENyb3NzIFNpdGUgU2NyaXB0aW5nIChYU1MpIHNlY3VyaXR5IGJ1ZyFcbiAqXG4gKiBXaGVuIHVzaW5nIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYCwgbWFrZSBzdXJlIHRvIGNhbGwgdGhlIG1ldGhvZCBhcyBlYXJseSBhcyBwb3NzaWJsZSBhbmQgYXNcbiAqIGNsb3NlIGFzIHBvc3NpYmxlIHRvIHRoZSBzb3VyY2Ugb2YgdGhlIHZhbHVlLCB0byBtYWtlIGl0IGVhc3kgdG8gdmVyaWZ5IG5vIHNlY3VyaXR5IGJ1ZyBpc1xuICogY3JlYXRlZCBieSBpdHMgdXNlLlxuICpcbiAqIEl0IGlzIG5vdCByZXF1aXJlZCAoYW5kIG5vdCByZWNvbW1lbmRlZCkgdG8gYnlwYXNzIHNlY3VyaXR5IGlmIHRoZSB2YWx1ZSBpcyBzYWZlLCBlLmcuIGEgVVJMIHRoYXRcbiAqIGRvZXMgbm90IHN0YXJ0IHdpdGggYSBzdXNwaWNpb3VzIHByb3RvY29sLCBvciBhbiBIVE1MIHNuaXBwZXQgdGhhdCBkb2VzIG5vdCBjb250YWluIGRhbmdlcm91c1xuICogY29kZS4gVGhlIHNhbml0aXplciBsZWF2ZXMgc2FmZSB2YWx1ZXMgaW50YWN0LlxuICpcbiAqIEBzZWN1cml0eSBDYWxsaW5nIGFueSBvZiB0aGUgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gIEFQSXMgZGlzYWJsZXMgQW5ndWxhcidzIGJ1aWx0LWluXG4gKiBzYW5pdGl6YXRpb24gZm9yIHRoZSB2YWx1ZSBwYXNzZWQgaW4uIENhcmVmdWxseSBjaGVjayBhbmQgYXVkaXQgYWxsIHZhbHVlcyBhbmQgY29kZSBwYXRocyBnb2luZ1xuICogaW50byB0aGlzIGNhbGwuIE1ha2Ugc3VyZSBhbnkgdXNlciBkYXRhIGlzIGFwcHJvcHJpYXRlbHkgZXNjYXBlZCBmb3IgdGhpcyBzZWN1cml0eSBjb250ZXh0LlxuICogRm9yIG1vcmUgZGV0YWlsLCBzZWUgdGhlIFtTZWN1cml0eSBHdWlkZV0oaHR0cHM6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCcsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERvbVNhbml0aXplckltcGwpfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb21TYW5pdGl6ZXIgaW1wbGVtZW50cyBTYW5pdGl6ZXIge1xuICAvKipcbiAgICogR2V0cyBhIHNhZmUgdmFsdWUgZnJvbSBlaXRoZXIgYSBrbm93biBzYWZlIHZhbHVlIG9yIGEgdmFsdWUgd2l0aCB1bmtub3duIHNhZmV0eS5cbiAgICpcbiAgICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSBgU2FmZVZhbHVlYCwgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgdW53cmFwcGVkIHZhbHVlLlxuICAgKiBJZiB0aGUgc2VjdXJpdHkgY29udGV4dCBpcyBIVE1MIGFuZCB0aGUgZ2l2ZW4gdmFsdWUgaXMgYSBwbGFpbiBzdHJpbmcsIHRoaXMgbWV0aG9kXG4gICAqIHNhbml0aXplcyB0aGUgc3RyaW5nLCByZW1vdmluZyBhbnkgcG90ZW50aWFsbHkgdW5zYWZlIGNvbnRlbnQuXG4gICAqIEZvciBhbnkgb3RoZXIgc2VjdXJpdHkgY29udGV4dCwgdGhpcyBtZXRob2QgdGhyb3dzIGFuIGVycm9yIGlmIHByb3ZpZGVkXG4gICAqIHdpdGggYSBwbGFpbiBzdHJpbmcuXG4gICAqL1xuICBhYnN0cmFjdCBzYW5pdGl6ZShjb250ZXh0OiBTZWN1cml0eUNvbnRleHQsIHZhbHVlOiBTYWZlVmFsdWUgfCBzdHJpbmcgfCBudWxsKTogc3RyaW5nIHwgbnVsbDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgc2FmZSBIVE1MLiBPbmx5IHVzZSB0aGlzIHdoZW4gdGhlIGJvdW5kIEhUTUxcbiAgICogaXMgdW5zYWZlIChlLmcuIGNvbnRhaW5zIGA8c2NyaXB0PmAgdGFncykgYW5kIHRoZSBjb2RlIHNob3VsZCBiZSBleGVjdXRlZC4gVGhlIHNhbml0aXplciB3aWxsXG4gICAqIGxlYXZlIHNhZmUgSFRNTCBpbnRhY3QsIHNvIGluIG1vc3Qgc2l0dWF0aW9ucyB0aGlzIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWU6IHN0cmluZyk6IFNhZmVIdG1sO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIHN0eWxlIHZhbHVlIChDU1MpLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEphdmFTY3JpcHQuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgYSBzYWZlIHN0eWxlIFVSTCwgaS5lLiBhIHZhbHVlIHRoYXQgY2FuIGJlIHVzZWRcbiAgICogaW4gaHlwZXJsaW5rcyBvciBgPGltZyBzcmM+YC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlVXJsO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBhIHNhZmUgcmVzb3VyY2UgVVJMLCBpLmUuIGEgbG9jYXRpb24gdGhhdCBtYXlcbiAgICogYmUgdXNlZCB0byBsb2FkIGV4ZWN1dGFibGUgY29kZSBmcm9tLCBsaWtlIGA8c2NyaXB0IHNyYz5gLCBvciBgPGlmcmFtZSBzcmM+YC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybDtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRG9tU2FuaXRpemVySW1wbCBleHRlbmRzIERvbVNhbml0aXplciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHNhbml0aXplKGN0eDogU2VjdXJpdHlDb250ZXh0LCB2YWx1ZTogU2FmZVZhbHVlIHwgc3RyaW5nIHwgbnVsbCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBzd2l0Y2ggKGN0eCkge1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuTk9ORTpcbiAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHN0cmluZztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LkhUTUw6XG4gICAgICAgIGlmIChhbGxvd1Nhbml0aXphdGlvbkJ5cGFzc09yVGhyb3codmFsdWUsIEJ5cGFzc1R5cGUuSHRtbCkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Nhbml0aXplSHRtbCh0aGlzLl9kb2MsIFN0cmluZyh2YWx1ZSkpLnRvU3RyaW5nKCk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TVFlMRTpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5TdHlsZSkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuU0NSSVBUOlxuICAgICAgICBpZiAoYWxsb3dTYW5pdGl6YXRpb25CeXBhc3NPclRocm93KHZhbHVlLCBCeXBhc3NUeXBlLlNjcmlwdCkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuU0FOSVRJWkFUSU9OX1VOU0FGRV9TQ1JJUFQsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICd1bnNhZmUgdmFsdWUgdXNlZCBpbiBhIHNjcmlwdCBjb250ZXh0JyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlVSTDpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5VcmwpKSB7XG4gICAgICAgICAgcmV0dXJuIHVud3JhcFNhZmVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zYW5pdGl6ZVVybChTdHJpbmcodmFsdWUpKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTDpcbiAgICAgICAgaWYgKGFsbG93U2FuaXRpemF0aW9uQnlwYXNzT3JUaHJvdyh2YWx1ZSwgQnlwYXNzVHlwZS5SZXNvdXJjZVVybCkpIHtcbiAgICAgICAgICByZXR1cm4gdW53cmFwU2FmZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuU0FOSVRJWkFUSU9OX1VOU0FGRV9SRVNPVVJDRV9VUkwsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgIGB1bnNhZmUgdmFsdWUgdXNlZCBpbiBhIHJlc291cmNlIFVSTCBjb250ZXh0IChzZWUgJHtYU1NfU0VDVVJJVFlfVVJMfSlgLFxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlNBTklUSVpBVElPTl9VTkVYUEVDVEVEX0NUWCxcbiAgICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgICAgICAgYFVuZXhwZWN0ZWQgU2VjdXJpdHlDb250ZXh0ICR7Y3R4fSAoc2VlICR7WFNTX1NFQ1VSSVRZX1VSTH0pYCxcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWwge1xuICAgIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdEh0bWwodmFsdWUpO1xuICB9XG4gIG92ZXJyaWRlIGJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZSh2YWx1ZSk7XG4gIH1cbiAgb3ZlcnJpZGUgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdCB7XG4gICAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U2NyaXB0KHZhbHVlKTtcbiAgfVxuICBvdmVycmlkZSBieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RVcmwodmFsdWUpO1xuICB9XG4gIG92ZXJyaWRlIGJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsIHtcbiAgICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybCh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==