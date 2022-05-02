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
BrowserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-3ebf9e7", ngImport: i0, type: BrowserModule, deps: [{ token: BrowserModule, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule });
BrowserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.0-next.15+sha-3ebf9e7", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] });
BrowserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-3ebf9e7", ngImport: i0, type: BrowserModule, providers: BROWSER_MODULE_PROVIDERS, imports: [CommonModule, ApplicationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.15+sha-3ebf9e7", ngImport: i0, type: BrowserModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBa0IscUJBQXFCLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBdUIsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFLFlBQVksRUFBeUIsZ0JBQWdCLEVBQUUsUUFBUSxFQUFrQixXQUFXLEVBQVEscUJBQXFCLElBQUkscUJBQXFCLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOVksT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLDJCQUEyQixFQUFFLGFBQWEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGdCQUFnQixFQUFDLE1BQU0s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Ozs7OztHQVFHO0FBRUgsTUFBTSxPQUFPLGFBQWE7SUFDeEIsWUFBMkQsWUFBZ0M7UUFDekYsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrSkFBK0osQ0FBQyxDQUFDO1NBQ3RLO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBdUI7UUFDakQsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUM7Z0JBQ3pDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDO2dCQUM3QywyQkFBMkI7YUFDNUI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7cUhBekJVLGFBQWEsa0JBQ29CLGFBQWE7c0hBRDlDLGFBQWEsWUFEZ0MsWUFBWSxFQUFFLGlCQUFpQjtzSEFDNUUsYUFBYSxhQURKLHdCQUF3QixZQUFZLFlBQVksRUFBRSxpQkFBaUI7c0dBQzVFLGFBQWE7a0JBRHpCLFFBQVE7bUJBQUMsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLEVBQUM7MERBRWhCLGFBQWE7MEJBQXpFLFFBQVE7OzBCQUFJLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIFhockZhY3RvcnksIMm1UExBVEZPUk1fQlJPV1NFUl9JRCBhcyBQTEFURk9STV9CUk9XU0VSX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIEFwcGxpY2F0aW9uTW9kdWxlLCBBcHBsaWNhdGlvblJlZiwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBFcnJvckhhbmRsZXIsIEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFJlbmRlcmVyRmFjdG9yeTIsIFNraXBTZWxmLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIFR5cGUsIMm1Ym9vdHN0cmFwQXBwbGljYXRpb24gYXMgX2Jvb3RzdHJhcEFwcGxpY2F0aW9uLCDJtUlOSkVDVE9SX1NDT1BFIGFzIElOSkVDVE9SX1NDT1BFLCDJtXNldERvY3VtZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge1NFUlZFUl9UUkFOU0lUSU9OX1BST1ZJREVSUywgVFJBTlNJVElPTl9JRH0gZnJvbSAnLi9icm93c2VyL3NlcnZlci10cmFuc2l0aW9uJztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICcuL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtCcm93c2VyWGhyfSBmcm9tICcuL2Jyb3dzZXIveGhyJztcbmltcG9ydCB7RG9tUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0tleUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2tleV9ldmVudHMnO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0LCBTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG4vKipcbiAqIFNldCBvZiBjb25maWcgb3B0aW9ucyBhdmFpbGFibGUgZHVyaW5nIHRoZSBib290c3RyYXAgb3BlcmF0aW9uIHZpYSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGNhbGwuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwcGxpY2F0aW9uQ29uZmlnIHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIGF2YWlsYWJsZSB0byB0aGUgcm9vdCBjb21wb25lbnQgYW5kIGFsbCBpdHMgY2hpbGRyZW4uXG4gICAqL1xuICBwcm92aWRlcnM6IFByb3ZpZGVyW107XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGEgcm9vdCBjb21wb25lbnQuXG4gKlxuICogTm90ZTogdGhlIHJvb3QgY29tcG9uZW50IHBhc3NlZCBpbnRvIHRoaXMgZnVuY3Rpb24gKm11c3QqIGJlIGEgc3RhbmRhbG9uZSBvbmUgKHNob3VsZCBoYXZlIHRoZVxuICogYHN0YW5kYWxvbmU6IHRydWVgIGZsYWcgaW4gdGhlIGBAQ29tcG9uZW50YCBkZWNvcmF0b3IgY29uZmlnKS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAqICAgdGVtcGxhdGU6ICdIZWxsbyB3b3JsZCEnXG4gKiB9KVxuICogY2xhc3MgUm9vdENvbXBvbmVudCB7fVxuICpcbiAqIGNvbnN0IGFwcFJlZjogQXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSByb290Q29tcG9uZW50IEEgcmVmZXJlbmNlIHRvIGEgU3RhbmRhbG9uZSBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBib290c3RyYXAgb3BlcmF0aW9uLCBzZWUgYEFwcGxpY2F0aW9uQ29uZmlnYCBmb3JcbiAqICAgICBhZGRpdGlvbmFsIGluZm8uXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXR1cm5zIGFuIGBBcHBsaWNhdGlvblJlZmAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBBcHBsaWNhdGlvbihcbiAgICByb290Q29tcG9uZW50OiBUeXBlPHVua25vd24+LCBvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcpOiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiB7XG4gIHJldHVybiBfYm9vdHN0cmFwQXBwbGljYXRpb24oe1xuICAgIHJvb3RDb21wb25lbnQsXG4gICAgYXBwUHJvdmlkZXJzOiBbXG4gICAgICAuLi5CUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsXG4gICAgICAuLi4ob3B0aW9ucz8ucHJvdmlkZXJzID8/IFtdKSxcbiAgICBdLFxuICAgIHBsYXRmb3JtUHJvdmlkZXJzOiBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RG9tQWRhcHRlcigpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9CUk9XU0VSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdERvbUFkYXB0ZXIsIG11bHRpOiB0cnVlfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogQSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQbGF0Zm9ybVJlZmAgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIGJyb3dzZXIgc2VydmljZVxuICogcHJvdmlkZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyJywgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG5leHBvcnQgY29uc3QgQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogSU5KRUNUT1JfU0NPUEUsIHVzZVZhbHVlOiAncm9vdCd9LFxuICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBlcnJvckhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgTmdab25lLCBQTEFURk9STV9JRF1cbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWUsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7XG4gICAgcHJvdmlkZTogRG9tUmVuZGVyZXJGYWN0b3J5MixcbiAgICB1c2VDbGFzczogRG9tUmVuZGVyZXJGYWN0b3J5MixcbiAgICBkZXBzOiBbRXZlbnRNYW5hZ2VyLCBEb21TaGFyZWRTdHlsZXNIb3N0LCBBUFBfSURdXG4gIH0sXG4gIHtwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLCB1c2VFeGlzdGluZzogRG9tUmVuZGVyZXJGYWN0b3J5Mn0sXG4gIHtwcm92aWRlOiBTaGFyZWRTdHlsZXNIb3N0LCB1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0sXG4gIHtwcm92aWRlOiBEb21TaGFyZWRTdHlsZXNIb3N0LCB1c2VDbGFzczogRG9tU2hhcmVkU3R5bGVzSG9zdCwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIHtwcm92aWRlOiBUZXN0YWJpbGl0eSwgdXNlQ2xhc3M6IFRlc3RhYmlsaXR5LCBkZXBzOiBbTmdab25lXX0sXG4gIHtwcm92aWRlOiBFdmVudE1hbmFnZXIsIHVzZUNsYXNzOiBFdmVudE1hbmFnZXIsIGRlcHM6IFtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIE5nWm9uZV19LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IEJyb3dzZXJYaHIsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogRXhwb3J0cyByZXF1aXJlZCBpbmZyYXN0cnVjdHVyZSBmb3IgYWxsIEFuZ3VsYXIgYXBwcy5cbiAqIEluY2x1ZGVkIGJ5IGRlZmF1bHQgaW4gYWxsIEFuZ3VsYXIgYXBwcyBjcmVhdGVkIHdpdGggdGhlIENMSVxuICogYG5ld2AgY29tbWFuZC5cbiAqIFJlLWV4cG9ydHMgYENvbW1vbk1vZHVsZWAgYW5kIGBBcHBsaWNhdGlvbk1vZHVsZWAsIG1ha2luZyB0aGVpclxuICogZXhwb3J0cyBhbmQgcHJvdmlkZXJzIGF2YWlsYWJsZSB0byBhbGwgYXBwcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7cHJvdmlkZXJzOiBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEFwcGxpY2F0aW9uTW9kdWxlXX0pXG5leHBvcnQgY2xhc3MgQnJvd3Nlck1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIEBJbmplY3QoQnJvd3Nlck1vZHVsZSkgcGFyZW50TW9kdWxlOiBCcm93c2VyTW9kdWxlfG51bGwpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEJyb3dzZXJNb2R1bGUgaGFzIGFscmVhZHkgYmVlbiBsb2FkZWQuIElmIHlvdSBuZWVkIGFjY2VzcyB0byBjb21tb24gZGlyZWN0aXZlcyBzdWNoIGFzIE5nSWYgYW5kIE5nRm9yIGZyb20gYSBsYXp5IGxvYWRlZCBtb2R1bGUsIGltcG9ydCBDb21tb25Nb2R1bGUgaW5zdGVhZC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBhIGJyb3dzZXItYmFzZWQgYXBwIHRvIHRyYW5zaXRpb24gZnJvbSBhIHNlcnZlci1yZW5kZXJlZCBhcHAsIGlmXG4gICAqIG9uZSBpcyBwcmVzZW50IG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCBjb250YWluaW5nIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBhcHAgdG8gdHJhbnNpdGlvbi5cbiAgICogVGhlIElEIG11c3QgbWF0Y2ggYmV0d2VlbiB0aGUgY2xpZW50IGFuZCBzZXJ2ZXIgdmVyc2lvbnMgb2YgdGhlIGFwcC5cbiAgICogQHJldHVybnMgVGhlIHJlY29uZmlndXJlZCBgQnJvd3Nlck1vZHVsZWAgdG8gaW1wb3J0IGludG8gdGhlIGFwcCdzIHJvb3QgYEFwcE1vZHVsZWAuXG4gICAqL1xuICBzdGF0aWMgd2l0aFNlcnZlclRyYW5zaXRpb24ocGFyYW1zOiB7YXBwSWQ6IHN0cmluZ30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJyb3dzZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyb3dzZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEFQUF9JRCwgdXNlVmFsdWU6IHBhcmFtcy5hcHBJZH0sXG4gICAgICAgIHtwcm92aWRlOiBUUkFOU0lUSU9OX0lELCB1c2VFeGlzdGluZzogQVBQX0lEfSxcbiAgICAgICAgU0VSVkVSX1RSQU5TSVRJT05fUFJPVklERVJTLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=