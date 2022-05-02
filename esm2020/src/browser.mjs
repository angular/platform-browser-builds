/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, XhrFactory, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, SkipSelf, Testability, ɵbootstrapApplication as _bootstrapApplication, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵsetDocument } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { SERVER_TRANSITION_PROVIDERS, TRANSITION_ID } from './browser/server-transition';
import { BrowserGetTestability } from './browser/testability';
import { BrowserXhr } from './browser/xhr';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { KeyEventsPlugin } from './dom/events/key_events';
import { DomSharedStylesHost, SharedStylesHost } from './dom/shared_styles_host';
import * as i0 from "@angular/core";
/**
 * Bootstraps an instance of an Angular application and renders a root component.
 *
 * Note: the root component passed into this function *must* be a standalone one (should have the
 * `standalone: true` flag in the `@Component` decorator config).
 *
 * ```typescript
 * @Component({
 *   standalone: true,
 *   template: 'Hello world!'
 * })
 * class RootComponent {}
 *
 * const appRef: ApplicationRef = await bootstrapApplication(RootComponent);
 * ```
 *
 * @param rootComponent A reference to a Standalone Component that should be rendered.
 * @param options Additional configuration for the bootstrap operation, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
export function bootstrapApplication(rootComponent, options) {
    return _bootstrapApplication({
        rootComponent,
        appProviders: [
            ...BROWSER_MODULE_PROVIDERS,
            ...(options?.providers ?? []),
        ],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    });
}
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
export function errorHandler() {
    return new ErrorHandler();
}
export function _document() {
    // Tell ivy about the global document
    ɵsetDocument(document);
    return document;
}
export const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: DOCUMENT, useFactory: _document, deps: [] },
];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
export const platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
export const BROWSER_MODULE_PROVIDERS = [
    { provide: INJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID]
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
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
    { provide: XhrFactory, useClass: BrowserXhr, deps: [] },
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
export class BrowserModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.`);
        }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
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
BrowserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-9e6538c", ngImport: i0, type: BrowserModule, deps: [{ token: BrowserModule, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule });
BrowserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-next.15+sha-9e6538c", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] });
BrowserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-9e6538c", ngImport: i0, type: BrowserModule, providers: BROWSER_MODULE_PROVIDERS, imports: [CommonModule, ApplicationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-9e6538c", ngImport: i0, type: BrowserModule, decorators: [{
            type: NgModule,
            args: [{ providers: BROWSER_MODULE_PROVIDERS, exports: [CommonModule, ApplicationModule] }]
        }], ctorParameters: function () { return [{ type: BrowserModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }, {
                    type: Inject,
                    args: [BrowserModule]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBa0IscUJBQXFCLEVBQUUsWUFBWSxFQUE2QixNQUFNLEVBQXVCLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQXlCLGdCQUFnQixFQUFFLFFBQVEsRUFBa0IsV0FBVyxFQUFRLHFCQUFxQixJQUFJLHFCQUFxQixFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXphLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQywyQkFBMkIsRUFBRSxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBQyxNQUFN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Ozs7Ozs7R0FRRztBQUVILE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQTJELFlBQWdDO1FBQ3pGLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsK0pBQStKLENBQUMsQ0FBQztTQUN0SztJQUNILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQXVCO1FBQ2pELE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO2dCQUN6QyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQztnQkFDN0MsMkJBQTJCO2FBQzVCO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3FIQXpCVSxhQUFhLGtCQUNvQixhQUFhO3NIQUQ5QyxhQUFhLFlBRGdDLFlBQVksRUFBRSxpQkFBaUI7c0hBQzVFLGFBQWEsYUFESix3QkFBd0IsWUFBWSxZQUFZLEVBQUUsaUJBQWlCO3NHQUM1RSxhQUFhO2tCQUR6QixRQUFRO21CQUFDLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxFQUFDOzBEQUVoQixhQUFhOzBCQUF6RSxRQUFROzswQkFBSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBYaHJGYWN0b3J5LCDJtVBMQVRGT1JNX0JST1dTRVJfSUQgYXMgUExBVEZPUk1fQlJPV1NFUl9JRH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBBcHBsaWNhdGlvbk1vZHVsZSwgQXBwbGljYXRpb25SZWYsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgRXJyb3JIYW5kbGVyLCBJbXBvcnRlZE5nTW9kdWxlUHJvdmlkZXJzLCBJbmplY3QsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIHBsYXRmb3JtQ29yZSwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlckZhY3RvcnkyLCBTa2lwU2VsZiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCBUeXBlLCDJtWJvb3RzdHJhcEFwcGxpY2F0aW9uIGFzIF9ib290c3RyYXBBcHBsaWNhdGlvbiwgybVJTkpFQ1RPUl9TQ09QRSBhcyBJTkpFQ1RPUl9TQ09QRSwgybVzZXREb2N1bWVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHtTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsIFRSQU5TSVRJT05fSUR9IGZyb20gJy4vYnJvd3Nlci9zZXJ2ZXItdHJhbnNpdGlvbic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnLi9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9icm93c2VyL3hocic7XG5pbXBvcnQge0RvbVJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdCwgU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuLyoqXG4gKiBTZXQgb2YgY29uZmlnIG9wdGlvbnMgYXZhaWxhYmxlIGR1cmluZyB0aGUgYm9vdHN0cmFwIG9wZXJhdGlvbiB2aWEgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBjYWxsLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcHBsaWNhdGlvbkNvbmZpZyB7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBhdmFpbGFibGUgdG8gdGhlIHJvb3QgY29tcG9uZW50IGFuZCBhbGwgaXRzIGNoaWxkcmVuLlxuICAgKi9cbiAgcHJvdmlkZXJzOiBBcnJheTxQcm92aWRlcnxJbXBvcnRlZE5nTW9kdWxlUHJvdmlkZXJzPjtcbn1cblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcnMgYSByb290IGNvbXBvbmVudC5cbiAqXG4gKiBOb3RlOiB0aGUgcm9vdCBjb21wb25lbnQgcGFzc2VkIGludG8gdGhpcyBmdW5jdGlvbiAqbXVzdCogYmUgYSBzdGFuZGFsb25lIG9uZSAoc2hvdWxkIGhhdmUgdGhlXG4gKiBgc3RhbmRhbG9uZTogdHJ1ZWAgZmxhZyBpbiB0aGUgYEBDb21wb25lbnRgIGRlY29yYXRvciBjb25maWcpLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogICB0ZW1wbGF0ZTogJ0hlbGxvIHdvcmxkISdcbiAqIH0pXG4gKiBjbGFzcyBSb290Q29tcG9uZW50IHt9XG4gKlxuICogY29uc3QgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiA9IGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQpO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHJvb3RDb21wb25lbnQgQSByZWZlcmVuY2UgdG8gYSBTdGFuZGFsb25lIENvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJvb3RzdHJhcCBvcGVyYXRpb24sIHNlZSBgQXBwbGljYXRpb25Db25maWdgIGZvclxuICogICAgIGFkZGl0aW9uYWwgaW5mby5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZSBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFxuICAgIHJvb3RDb21wb25lbnQ6IFR5cGU8dW5rbm93bj4sIG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZyk6IFByb21pc2U8QXBwbGljYXRpb25SZWY+IHtcbiAgcmV0dXJuIF9ib290c3RyYXBBcHBsaWNhdGlvbih7XG4gICAgcm9vdENvbXBvbmVudCxcbiAgICBhcHBQcm92aWRlcnM6IFtcbiAgICAgIC4uLkJST1dTRVJfTU9EVUxFX1BST1ZJREVSUyxcbiAgICAgIC4uLihvcHRpb25zPy5wcm92aWRlcnMgPz8gW10pLFxuICAgIF0sXG4gICAgcGxhdGZvcm1Qcm92aWRlcnM6IElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREb21BZGFwdGVyKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyR2V0VGVzdGFiaWxpdHkuaW5pdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCk6IEVycm9ySGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXJyb3JIYW5kbGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX0JST1dTRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZVZhbHVlOiBpbml0RG9tQWRhcHRlciwgbXVsdGk6IHRydWV9LFxuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119LFxuXTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYFBsYXRmb3JtUmVmYCBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggYnJvd3NlciBzZXJ2aWNlXG4gKiBwcm92aWRlcnMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Ccm93c2VyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdKSA9PiBQbGF0Zm9ybVJlZiA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ2Jyb3dzZXInLCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbmV4cG9ydCBjb25zdCBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBJTkpFQ1RPUl9TQ09QRSwgdXNlVmFsdWU6ICdyb290J30sXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmUsIFBMQVRGT1JNX0lEXVxuICB9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIHtcbiAgICBwcm92aWRlOiBEb21SZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUNsYXNzOiBEb21SZW5kZXJlckZhY3RvcnkyLFxuICAgIGRlcHM6IFtFdmVudE1hbmFnZXIsIERvbVNoYXJlZFN0eWxlc0hvc3QsIEFQUF9JRF1cbiAgfSxcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFNoYXJlZFN0eWxlc0hvc3QsIHVzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSxcbiAge3Byb3ZpZGU6IERvbVNoYXJlZFN0eWxlc0hvc3QsIHVzZUNsYXNzOiBEb21TaGFyZWRTdHlsZXNIb3N0LCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5LCB1c2VDbGFzczogVGVzdGFiaWxpdHksIGRlcHM6IFtOZ1pvbmVdfSxcbiAge3Byb3ZpZGU6IEV2ZW50TWFuYWdlciwgdXNlQ2xhc3M6IEV2ZW50TWFuYWdlciwgZGVwczogW0VWRU5UX01BTkFHRVJfUExVR0lOUywgTmdab25lXX0sXG4gIHtwcm92aWRlOiBYaHJGYWN0b3J5LCB1c2VDbGFzczogQnJvd3NlclhociwgZGVwczogW119LFxuXTtcblxuLyoqXG4gKiBFeHBvcnRzIHJlcXVpcmVkIGluZnJhc3RydWN0dXJlIGZvciBhbGwgQW5ndWxhciBhcHBzLlxuICogSW5jbHVkZWQgYnkgZGVmYXVsdCBpbiBhbGwgQW5ndWxhciBhcHBzIGNyZWF0ZWQgd2l0aCB0aGUgQ0xJXG4gKiBgbmV3YCBjb21tYW5kLlxuICogUmUtZXhwb3J0cyBgQ29tbW9uTW9kdWxlYCBhbmQgYEFwcGxpY2F0aW9uTW9kdWxlYCwgbWFraW5nIHRoZWlyXG4gKiBleHBvcnRzIGFuZCBwcm92aWRlcnMgYXZhaWxhYmxlIHRvIGFsbCBhcHBzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtwcm92aWRlcnM6IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSUywgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQXBwbGljYXRpb25Nb2R1bGVdfSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgQEluamVjdChCcm93c2VyTW9kdWxlKSBwYXJlbnRNb2R1bGU6IEJyb3dzZXJNb2R1bGV8bnVsbCkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQnJvd3Nlck1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGxvYWRlZC4gSWYgeW91IG5lZWQgYWNjZXNzIHRvIGNvbW1vbiBkaXJlY3RpdmVzIHN1Y2ggYXMgTmdJZiBhbmQgTmdGb3IgZnJvbSBhIGxhenkgbG9hZGVkIG1vZHVsZSwgaW1wb3J0IENvbW1vbk1vZHVsZSBpbnN0ZWFkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHAgdG8gdHJhbnNpdGlvbiBmcm9tIGEgc2VydmVyLXJlbmRlcmVkIGFwcCwgaWZcbiAgICogb25lIGlzIHByZXNlbnQgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYW4gaWRlbnRpZmllciBmb3IgdGhlIGFwcCB0byB0cmFuc2l0aW9uLlxuICAgKiBUaGUgSUQgbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciB2ZXJzaW9ucyBvZiB0aGUgYXBwLlxuICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3Nlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogcGFyYW1zLmFwcElkfSxcbiAgICAgICAge3Byb3ZpZGU6IFRSQU5TSVRJT05fSUQsIHVzZUV4aXN0aW5nOiBBUFBfSUR9LFxuICAgICAgICBTRVJWRVJfVFJBTlNJVElPTl9QUk9WSURFUlMsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==