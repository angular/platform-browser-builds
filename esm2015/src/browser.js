/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule, DOCUMENT, PlatformLocation, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, ErrorHandler, Inject, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Sanitizer, SkipSelf, Testability, createPlatformFactory, platformCore, ɵAPP_ROOT as APP_ROOT } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserPlatformLocation } from './browser/location/browser_platform_location';
import { SERVER_TRANSITION_PROVIDERS, TRANSITION_ID } from './browser/server-transition';
import { BrowserGetTestability } from './browser/testability';
import { ELEMENT_PROBE_PROVIDERS } from './dom/debug/ng_probe';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { HAMMER_PROVIDERS } from './dom/events/hammer_gestures';
import { KeyEventsPlugin } from './dom/events/key_events';
import { DomSharedStylesHost, SharedStylesHost } from './dom/shared_styles_host';
import { DomSanitizer, DomSanitizerImpl } from './security/dom_sanitization_service';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
export const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation, deps: [DOCUMENT] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
/** @type {?} */
const BROWSER_SANITIZATION_PROVIDERS__PRE_R3__ = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl, deps: [DOCUMENT] },
];
/**
 * \@codeGenApi
 * @type {?}
 */
export const BROWSER_SANITIZATION_PROVIDERS__POST_R3__ = [];
/**
 * \@security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * \@publicApi
 * @type {?}
 */
export const BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS__POST_R3__;
/**
 * \@publicApi
 * @type {?}
 */
export const platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
/**
 * @return {?}
 */
export function errorHandler() {
    return new ErrorHandler();
}
/**
 * @return {?}
 */
export function _document() {
    return document;
}
/** @type {?} */
export const BROWSER_MODULE_PROVIDERS = [
    BROWSER_SANITIZATION_PROVIDERS,
    { provide: APP_ROOT, useValue: true },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID]
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    HAMMER_PROVIDERS,
    {
        provide: DomRendererFactory2,
        useClass: DomRendererFactory2,
        deps: [EventManager, DomSharedStylesHost, APP_ID]
    },
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
    { provide: DomSharedStylesHost, useClass: DomSharedStylesHost, deps: [DOCUMENT] },
    { provide: Testability, useClass: Testability, deps: [NgZone] },
    { provide: EventManager, useClass: EventManager, deps: [EVENT_MANAGER_PLUGINS, NgZone] },
    ELEMENT_PROBE_PROVIDERS,
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * \@publicApi
 */
export class BrowserModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
        }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param {?} params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @return {?} The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */
    static withServerTransition(params) {
        return {
            ngModule: BrowserModule,
            providers: [
                { provide: APP_ID, useValue: params.appId },
                { provide: TRANSITION_ID, useExisting: APP_ID },
                SERVER_TRANSITION_PROVIDERS,
            ],
        };
    }
}
BrowserModule.decorators = [
    { type: NgModule, args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [CommonModule, ApplicationModule] },] },
];
/** @nocollapse */
BrowserModule.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: SkipSelf }, { type: Inject, args: [BrowserModule,] }] }
];
/** @nocollapse */ BrowserModule.ngModuleDef = i0.ɵɵdefineNgModule({ type: BrowserModule });
/** @nocollapse */ BrowserModule.ngInjectorDef = i0.ɵɵdefineInjector({ factory: function BrowserModule_Factory(t) { return new (t || BrowserModule)(i0.ɵɵinject(BrowserModule, 12)); }, providers: BROWSER_MODULE_PROVIDERS, imports: [CommonModule, ApplicationModule] });
/*@__PURE__*/ i0.ɵɵsetNgModuleScope(BrowserModule, { exports: [CommonModule, ApplicationModule] });
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserModule, [{
        type: NgModule,
        args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [CommonModule, ApplicationModule] }]
    }], function () { return [{ type: BrowserModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }, {
                type: Inject,
                args: [BrowserModule]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdEgsT0FBTyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQWUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBa0IsV0FBVyxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxTQUFTLElBQUksUUFBUSxFQUFzQixNQUFNLGVBQWUsQ0FBQztBQUVwVSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsMkJBQTJCLEVBQUUsYUFBYSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdkYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1B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aWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBQbGF0Zm9ybUxvY2F0aW9uLCDJtVBMQVRGT1JNX0JST1dTRVJfSUQgYXMgUExBVEZPUk1fQlJPV1NFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBBcHBsaWNhdGlvbk1vZHVsZSwgRXJyb3JIYW5kbGVyLCBJbmplY3QsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBTYW5pdGl6ZXIsIFNraXBTZWxmLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlLCDJtUFQUF9ST09UIGFzIEFQUF9ST09ULCDJtUNvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHtCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnLi9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsIFRSQU5TSVRJT05fSUR9IGZyb20gJy4vYnJvd3Nlci9zZXJ2ZXItdHJhbnNpdGlvbic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnLi9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7RUxFTUVOVF9QUk9CRV9QUk9WSURFUlN9IGZyb20gJy4vZG9tL2RlYnVnL25nX3Byb2JlJztcbmltcG9ydCB7RG9tUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0hBTU1FUl9QUk9WSURFUlN9IGZyb20gJy4vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdCwgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBEb21TYW5pdGl6ZXJJbXBsfSBmcm9tICcuL3NlY3VyaXR5L2RvbV9zYW5pdGl6YXRpb25fc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fQlJPV1NFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXREb21BZGFwdGVyLCBtdWx0aTogdHJ1ZX0sXG4gIHtwcm92aWRlOiBQbGF0Zm9ybUxvY2F0aW9uLCB1c2VDbGFzczogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119LFxuXTtcblxuY29uc3QgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTX19QUkVfUjNfXzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFNhbml0aXplciwgdXNlRXhpc3Rpbmc6IERvbVNhbml0aXplcn0sXG4gIHtwcm92aWRlOiBEb21TYW5pdGl6ZXIsIHVzZUNsYXNzOiBEb21TYW5pdGl6ZXJJbXBsLCBkZXBzOiBbRE9DVU1FTlRdfSxcbl07XG5cbi8qKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU19fUE9TVF9SM19fID0gW107XG5cbi8qKlxuICogQHNlY3VyaXR5IFJlcGxhY2luZyBidWlsdC1pbiBzYW5pdGl6YXRpb24gcHJvdmlkZXJzIGV4cG9zZXMgdGhlIGFwcGxpY2F0aW9uIHRvIFhTUyByaXNrcy5cbiAqIEF0dGFja2VyLWNvbnRyb2xsZWQgZGF0YSBpbnRyb2R1Y2VkIGJ5IGFuIHVuc2FuaXRpemVkIHByb3ZpZGVyIGNvdWxkIGV4cG9zZSB5b3VyXG4gKiBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyA9IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSU19fUFJFX1IzX187XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Ccm93c2VyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ2Jyb3dzZXInLCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RG9tQWRhcHRlcigpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAgQlJPV1NFUl9TQU5JVElaQVRJT05fUFJPVklERVJTLFxuICB7cHJvdmlkZTogQVBQX1JPT1QsIHVzZVZhbHVlOiB0cnVlfSxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZSwgUExBVEZPUk1fSURdXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAgSEFNTUVSX1BST1ZJREVSUyxcbiAge1xuICAgIHByb3ZpZGU6IERvbVJlbmRlcmVyRmFjdG9yeTIsXG4gICAgdXNlQ2xhc3M6IERvbVJlbmRlcmVyRmFjdG9yeTIsXG4gICAgZGVwczogW0V2ZW50TWFuYWdlciwgRG9tU2hhcmVkU3R5bGVzSG9zdCwgQVBQX0lEXVxuICB9LFxuICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IERvbVJlbmRlcmVyRmFjdG9yeTJ9LFxuICB7cHJvdmlkZTogU2hhcmVkU3R5bGVzSG9zdCwgdXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9LFxuICB7cHJvdmlkZTogRG9tU2hhcmVkU3R5bGVzSG9zdCwgdXNlQ2xhc3M6IERvbVNoYXJlZFN0eWxlc0hvc3QsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7cHJvdmlkZTogVGVzdGFiaWxpdHksIHVzZUNsYXNzOiBUZXN0YWJpbGl0eSwgZGVwczogW05nWm9uZV19LFxuICB7cHJvdmlkZTogRXZlbnRNYW5hZ2VyLCB1c2VDbGFzczogRXZlbnRNYW5hZ2VyLCBkZXBzOiBbRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBOZ1pvbmVdfSxcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMsXG5dO1xuXG4vKipcbiAqIEV4cG9ydHMgcmVxdWlyZWQgaW5mcmFzdHJ1Y3R1cmUgZm9yIGFsbCBBbmd1bGFyIGFwcHMuXG4gKiBJbmNsdWRlZCBieSBkZWZhdWx0IGluIGFsbCBBbmd1bGFyIGFwcHMgY3JlYXRlZCB3aXRoIHRoZSBDTElcbiAqIGBuZXdgIGNvbW1hbmQuXG4gKiBSZS1leHBvcnRzIGBDb21tb25Nb2R1bGVgIGFuZCBgQXBwbGljYXRpb25Nb2R1bGVgLCBtYWtpbmcgdGhlaXJcbiAqIGV4cG9ydHMgYW5kIHByb3ZpZGVycyBhdmFpbGFibGUgdG8gYWxsIGFwcHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe3Byb3ZpZGVyczogQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTLCBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBcHBsaWNhdGlvbk1vZHVsZV19KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBASW5qZWN0KEJyb3dzZXJNb2R1bGUpIHBhcmVudE1vZHVsZTogQnJvd3Nlck1vZHVsZXxudWxsKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBCcm93c2VyTW9kdWxlIGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkLiBJZiB5b3UgbmVlZCBhY2Nlc3MgdG8gY29tbW9uIGRpcmVjdGl2ZXMgc3VjaCBhcyBOZ0lmIGFuZCBOZ0ZvciBmcm9tIGEgbGF6eSBsb2FkZWQgbW9kdWxlLCBpbXBvcnQgQ29tbW9uTW9kdWxlIGluc3RlYWQuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBicm93c2VyLWJhc2VkIGFwcCB0byB0cmFuc2l0aW9uIGZyb20gYSBzZXJ2ZXItcmVuZGVyZWQgYXBwLCBpZlxuICAgKiBvbmUgaXMgcHJlc2VudCBvbiB0aGUgcGFnZS5cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBBbiBvYmplY3QgY29udGFpbmluZyBhbiBpZGVudGlmaWVyIGZvciB0aGUgYXBwIHRvIHRyYW5zaXRpb24uXG4gICAqIFRoZSBJRCBtdXN0IG1hdGNoIGJldHdlZW4gdGhlIGNsaWVudCBhbmQgc2VydmVyIHZlcnNpb25zIG9mIHRoZSBhcHAuXG4gICAqIEByZXR1cm5zIFRoZSByZWNvbmZpZ3VyZWQgYEJyb3dzZXJNb2R1bGVgIHRvIGltcG9ydCBpbnRvIHRoZSBhcHAncyByb290IGBBcHBNb2R1bGVgLlxuICAgKi9cbiAgc3RhdGljIHdpdGhTZXJ2ZXJUcmFuc2l0aW9uKHBhcmFtczoge2FwcElkOiBzdHJpbmd9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxCcm93c2VyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBCcm93c2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBBUFBfSUQsIHVzZVZhbHVlOiBwYXJhbXMuYXBwSWR9LFxuICAgICAgICB7cHJvdmlkZTogVFJBTlNJVElPTl9JRCwgdXNlRXhpc3Rpbmc6IEFQUF9JRH0sXG4gICAgICAgIFNFUlZFUl9UUkFOU0lUSU9OX1BST1ZJREVSUyxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19