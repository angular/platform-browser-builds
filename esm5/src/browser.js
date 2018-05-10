/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, PlatformLocation, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, ErrorHandler, NgModule, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Sanitizer, SkipSelf, Testability, createPlatformFactory, platformCore, ɵAPP_ROOT as APP_ROOT } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserPlatformLocation } from './browser/location/browser_platform_location';
import { Meta } from './browser/meta';
import { SERVER_TRANSITION_PROVIDERS, TRANSITION_ID } from './browser/server-transition';
import { BrowserGetTestability } from './browser/testability';
import { Title } from './browser/title';
import { ELEMENT_PROBE_PROVIDERS } from './dom/debug/ng_probe';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DOCUMENT } from './dom/dom_tokens';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerGesturesPlugin } from './dom/events/hammer_gestures';
import { KeyEventsPlugin } from './dom/events/key_events';
import { DomSharedStylesHost, SharedStylesHost } from './dom/shared_styles_host';
import { DomSanitizer, DomSanitizerImpl } from './security/dom_sanitization_service';
export var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation, deps: [DOCUMENT] },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
export var BROWSER_SANITIZATION_PROVIDERS = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl, deps: [DOCUMENT] },
];
export var platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
export function errorHandler() {
    return new ErrorHandler();
}
export function _document() {
    return document;
}
/**
 * The ng module for the browser.
 *
 *
 */
var BrowserModule = /** @class */ (function () {
    function BrowserModule(parentModule) {
        if (parentModule) {
            throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
        }
    }
    /**
     * Configures a browser-based application to transition from a server-rendered app, if
     * one is present on the page. The specified parameters must include an application id,
     * which must match between the client and server applications.
     *
     * @experimental
     */
    /**
       * Configures a browser-based application to transition from a server-rendered app, if
       * one is present on the page. The specified parameters must include an application id,
       * which must match between the client and server applications.
       *
       * @experimental
       */
    BrowserModule.withServerTransition = /**
       * Configures a browser-based application to transition from a server-rendered app, if
       * one is present on the page. The specified parameters must include an application id,
       * which must match between the client and server applications.
       *
       * @experimental
       */
    function (params) {
        return {
            ngModule: BrowserModule,
            providers: [
                { provide: APP_ID, useValue: params.appId },
                { provide: TRANSITION_ID, useExisting: APP_ID },
                SERVER_TRANSITION_PROVIDERS,
            ],
        };
    };
    BrowserModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        BROWSER_SANITIZATION_PROVIDERS,
                        { provide: APP_ROOT, useValue: true },
                        { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
                        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
                        DomRendererFactory2,
                        { provide: RendererFactory2, useExisting: DomRendererFactory2 },
                        { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
                        DomSharedStylesHost,
                        Testability,
                        EventManager,
                        ELEMENT_PROBE_PROVIDERS,
                        Meta,
                        Title,
                    ],
                    exports: [CommonModule, ApplicationModule]
                },] }
    ];
    /** @nocollapse */
    BrowserModule.ctorParameters = function () { return [
        { type: BrowserModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ]; };
    return BrowserModule;
}());
export { BrowserModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RyxPQUFPLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQWUsZ0JBQWdCLEVBQWdCLFNBQVMsRUFBRSxRQUFRLEVBQWtCLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsU0FBUyxJQUFJLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3UyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNyRixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEMsT0FBTyxFQUFDLDJCQUEyQixFQUFFLGFBQWEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxx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LEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQzt3QkFDL0QsbUJBQW1CO3dCQUNuQixFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUM7d0JBQzdELEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBQzt3QkFDN0QsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osdUJBQXVCO3dCQUN2QixJQUFJO3dCQUNKLEtBQUs7cUJBQ047b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2lCQUMzQzs7OztnQkFDWSxhQUFhLHVCQUNYLFFBQVEsWUFBSSxRQUFROzt3QkF6Rm5DOztTQXdGYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgUGxhdGZvcm1Mb2NhdGlvbiwgybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQXBwbGljYXRpb25Nb2R1bGUsIEVycm9ySGFuZGxlciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBSZW5kZXJlckZhY3RvcnkyLCBSb290UmVuZGVyZXIsIFNhbml0aXplciwgU2tpcFNlbGYsIFN0YXRpY1Byb3ZpZGVyLCBUZXN0YWJpbGl0eSwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBwbGF0Zm9ybUNvcmUsIMm1QVBQX1JPT1QgYXMgQVBQX1JPT1R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7QnJvd3NlclBsYXRmb3JtTG9jYXRpb259IGZyb20gJy4vYnJvd3Nlci9sb2NhdGlvbi9icm93c2VyX3BsYXRmb3JtX2xvY2F0aW9uJztcbmltcG9ydCB7TWV0YX0gZnJvbSAnLi9icm93c2VyL21ldGEnO1xuaW1wb3J0IHtTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsIFRSQU5TSVRJT05fSUR9IGZyb20gJy4vYnJvd3Nlci9zZXJ2ZXItdHJhbnNpdGlvbic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnLi9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7VGl0bGV9IGZyb20gJy4vYnJvd3Nlci90aXRsZSc7XG5pbXBvcnQge0VMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICcuL2RvbS9kZWJ1Zy9uZ19wcm9iZSc7XG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuL2RvbS9kb21fcmVuZGVyZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnLi9kb20vZG9tX3Rva2Vucyc7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtIQU1NRVJfR0VTVFVSRV9DT05GSUcsIEhhbW1lckdlc3R1cmVDb25maWcsIEhhbW1lckdlc3R1cmVzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3QsIFNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgRG9tU2FuaXRpemVySW1wbH0gZnJvbSAnLi9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX0JST1dTRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZVZhbHVlOiBpbml0RG9tQWRhcHRlciwgbXVsdGk6IHRydWV9LFxuICB7cHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbiwgdXNlQ2xhc3M6IEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogQHNlY3VyaXR5IFJlcGxhY2luZyBidWlsdC1pbiBzYW5pdGl6YXRpb24gcHJvdmlkZXJzIGV4cG9zZXMgdGhlIGFwcGxpY2F0aW9uIHRvIFhTUyByaXNrcy5cbiAqIEF0dGFja2VyLWNvbnRyb2xsZWQgZGF0YSBpbnRyb2R1Y2VkIGJ5IGFuIHVuc2FuaXRpemVkIHByb3ZpZGVyIGNvdWxkIGV4cG9zZSB5b3VyXG4gKiBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFNhbml0aXplciwgdXNlRXhpc3Rpbmc6IERvbVNhbml0aXplcn0sXG4gIHtwcm92aWRlOiBEb21TYW5pdGl6ZXIsIHVzZUNsYXNzOiBEb21TYW5pdGl6ZXJJbXBsLCBkZXBzOiBbRE9DVU1FTlRdfSxcbl07XG5cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXI6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnYnJvd3NlcicsIElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREb21BZGFwdGVyKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyR2V0VGVzdGFiaWxpdHkuaW5pdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCk6IEVycm9ySGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXJyb3JIYW5kbGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEJST1dTRVJfU0FOSVRJWkFUSU9OX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogQVBQX1JPT1QsIHVzZVZhbHVlOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBlcnJvckhhbmRsZXIsIGRlcHM6IFtdfSxcbiAgICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0sXG4gICAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlc1BsdWdpbiwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnfSxcbiAgICBEb21SZW5kZXJlckZhY3RvcnkyLFxuICAgIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogRG9tUmVuZGVyZXJGYWN0b3J5Mn0sXG4gICAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAgICBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgIFRlc3RhYmlsaXR5LFxuICAgIEV2ZW50TWFuYWdlcixcbiAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICBNZXRhLFxuICAgIFRpdGxlLFxuICBdLFxuICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBcHBsaWNhdGlvbk1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQnJvd3Nlck1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQnJvd3Nlck1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQnJvd3Nlck1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZC4gSWYgeW91IG5lZWQgYWNjZXNzIHRvIGNvbW1vbiBkaXJlY3RpdmVzIHN1Y2ggYXMgTmdJZiBhbmQgTmdGb3IgZnJvbSBhIGxhenkgbG9hZGVkIG1vZHVsZSwgaW1wb3J0IENvbW1vbk1vZHVsZSBpbnN0ZWFkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHBsaWNhdGlvbiB0byB0cmFuc2l0aW9uIGZyb20gYSBzZXJ2ZXItcmVuZGVyZWQgYXBwLCBpZlxuICAgKiBvbmUgaXMgcHJlc2VudCBvbiB0aGUgcGFnZS4gVGhlIHNwZWNpZmllZCBwYXJhbWV0ZXJzIG11c3QgaW5jbHVkZSBhbiBhcHBsaWNhdGlvbiBpZCxcbiAgICogd2hpY2ggbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciBhcHBsaWNhdGlvbnMuXG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogcGFyYW1zLmFwcElkfSxcbiAgICAgICAge3Byb3ZpZGU6IFRSQU5TSVRJT05fSUQsIHVzZUV4aXN0aW5nOiBBUFBfSUR9LFxuICAgICAgICBTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==