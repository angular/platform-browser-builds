/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { CommonModule, DOCUMENT, XhrFactory, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID, } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, InjectionToken, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, SkipSelf, Testability, TestabilityRegistry, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵinternalCreateApplication as internalCreateApplication, ɵRuntimeError as RuntimeError, ɵsetDocument, ɵTESTABILITY as TESTABILITY, ɵTESTABILITY_GETTER as TESTABILITY_GETTER, } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserGetTestability } from './browser/testability';
import { BrowserXhr } from './browser/xhr';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { KeyEventsPlugin } from './dom/events/key_events';
import { SharedStylesHost } from './dom/shared_styles_host';
import * as i0 from "@angular/core";
/**
 * Bootstraps an instance of an Angular application and renders a standalone component as the
 * application's root component. More information about standalone components can be found in [this
 * guide](guide/components/importing).
 *
 * @usageNotes
 * The root component passed into this function *must* be a standalone one (should have the
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
 * You can add the list of providers that should be available in the application injector by
 * specifying the `providers` field in an object passed as the second argument:
 *
 * ```typescript
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     {provide: BACKEND_URL, useValue: 'https://yourdomain.com/api'}
 *   ]
 * });
 * ```
 *
 * The `importProvidersFrom` helper method can be used to collect all providers from any
 * existing NgModule (and transitively from all NgModules that it imports):
 *
 * ```typescript
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(SomeNgModule)
 *   ]
 * });
 * ```
 *
 * Note: the `bootstrapApplication` method doesn't include [Testability](api/core/Testability) by
 * default. You can add [Testability](api/core/Testability) by getting the list of necessary
 * providers using `provideProtractorTestingSupport()` function and adding them into the `providers`
 * array, for example:
 *
 * ```typescript
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, {providers: [provideProtractorTestingSupport()]});
 * ```
 *
 * @param rootComponent A reference to a standalone component that should be rendered.
 * @param options Extra configuration for the bootstrap operation, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
export function bootstrapApplication(rootComponent, options) {
    return internalCreateApplication({ rootComponent, ...createProvidersConfig(options) });
}
/**
 * Create an instance of an Angular application without bootstrapping any components. This is useful
 * for the situation where one wants to decouple application environment creation (a platform and
 * associated injectors) from rendering components on a screen. Components can be subsequently
 * bootstrapped on the returned `ApplicationRef`.
 *
 * @param options Extra configuration for the application environment, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
export function createApplication(options) {
    return internalCreateApplication(createProvidersConfig(options));
}
function createProvidersConfig(options) {
    return {
        appProviders: [...BROWSER_MODULE_PROVIDERS, ...(options?.providers ?? [])],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    };
}
/**
 * Returns a set of providers required to setup [Testability](api/core/Testability) for an
 * application bootstrapped using the `bootstrapApplication` function. The set of providers is
 * needed to support testing an application with Protractor (which relies on the Testability APIs
 * to be present).
 *
 * @returns An array of providers required to setup Testability for an application and make it
 *     available for testing using Protractor.
 *
 * @publicApi
 */
export function provideProtractorTestingSupport() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideProtractorTestingSupport` call results in app
    // code.
    return [...TESTABILITY_PROVIDERS];
}
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
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
/**
 * Internal marker to signal whether providers from the `BrowserModule` are already present in DI.
 * This is needed to avoid loading `BrowserModule` providers twice. We can't rely on the
 * `BrowserModule` presence itself, since the standalone-based bootstrap just imports
 * `BrowserModule` providers without referencing the module itself.
 */
const BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'BrowserModule Providers Marker' : '');
const TESTABILITY_PROVIDERS = [
    {
        provide: TESTABILITY_GETTER,
        useClass: BrowserGetTestability,
        deps: [],
    },
    {
        provide: TESTABILITY,
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER],
    },
    {
        provide: Testability, // Also provide as `Testability` for backwards-compatibility.
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER],
    },
];
const BROWSER_MODULE_PROVIDERS = [
    { provide: INJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID],
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    DomRendererFactory2,
    SharedStylesHost,
    EventManager,
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: XhrFactory, useClass: BrowserXhr, deps: [] },
    typeof ngDevMode === 'undefined' || ngDevMode
        ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true }
        : [],
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
    constructor(providersAlreadyPresent) {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && providersAlreadyPresent) {
            throw new RuntimeError(5100 /* RuntimeErrorCode.BROWSER_MODULE_ALREADY_LOADED */, `Providers from the \`BrowserModule\` have already been loaded. If you need access ` +
                `to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
        }
    }
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     *
     * @deprecated Use {@link APP_ID} instead to set the application ID.
     */
    static withServerTransition(params) {
        return {
            ngModule: BrowserModule,
            providers: [{ provide: APP_ID, useValue: params.appId }],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.10+sha-5f2d98a", ngImport: i0, type: BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.10+sha-5f2d98a", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.10+sha-5f2d98a", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.10+sha-5f2d98a", ngImport: i0, type: BrowserModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
                    exports: [CommonModule, ApplicationModule],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }, {
                    type: Inject,
                    args: [BROWSER_MODULE_PROVIDERS_MARKER]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFlBQVksRUFDWixRQUFRLEVBQ1IsVUFBVSxFQUNWLG9CQUFvQixJQUFJLG1CQUFtQixHQUM1QyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxNQUFNLEVBRU4saUJBQWlCLEVBRWpCLHFCQUFxQixFQUNyQixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLFlBQVksRUFHWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUVSLFdBQVcsRUFDWCxtQkFBbUIsRUFFbkIsZUFBZSxJQUFJLGNBQWMsRUFDakMsMEJBQTBCLElBQUkseUJBQXlCLEVBQ3ZELGFBQWEsSUFBSSxZQUFZLEVBQzdCLFlBQVksRUFDWixZQUFZLElBQUksV0FBVyxFQUMzQixtQkFBbUIsSUFBSSxrQkFBa0IsR0FDMUMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9FLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxP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Q0FBQyxLQUFLLEVBQUMsQ0FBQztTQUN2RCxDQUFDO0lBQ0osQ0FBQzt5SEEvQlUsYUFBYSxrQkFJZCwrQkFBK0I7MEhBSjlCLGFBQWEsWUFGZCxZQUFZLEVBQUUsaUJBQWlCOzBIQUU5QixhQUFhLGFBSGIsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLEdBQUcscUJBQXFCLENBQUMsWUFDeEQsWUFBWSxFQUFFLGlCQUFpQjs7c0dBRTlCLGFBQWE7a0JBSnpCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUMsR0FBRyx3QkFBd0IsRUFBRSxHQUFHLHFCQUFxQixDQUFDO29CQUNsRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7aUJBQzNDOzswQkFHSSxRQUFROzswQkFDUixRQUFROzswQkFDUixNQUFNOzJCQUFDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tbW9uTW9kdWxlLFxuICBET0NVTUVOVCxcbiAgWGhyRmFjdG9yeSxcbiAgybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBUFBfSUQsXG4gIEFwcGxpY2F0aW9uQ29uZmlnIGFzIEFwcGxpY2F0aW9uQ29uZmlnRnJvbUNvcmUsXG4gIEFwcGxpY2F0aW9uTW9kdWxlLFxuICBBcHBsaWNhdGlvblJlZixcbiAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LFxuICBFcnJvckhhbmRsZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRCxcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIHBsYXRmb3JtQ29yZSxcbiAgUGxhdGZvcm1SZWYsXG4gIFByb3ZpZGVyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBTa2lwU2VsZixcbiAgU3RhdGljUHJvdmlkZXIsXG4gIFRlc3RhYmlsaXR5LFxuICBUZXN0YWJpbGl0eVJlZ2lzdHJ5LFxuICBUeXBlLFxuICDJtUlOSkVDVE9SX1NDT1BFIGFzIElOSkVDVE9SX1NDT1BFLFxuICDJtWludGVybmFsQ3JlYXRlQXBwbGljYXRpb24gYXMgaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbixcbiAgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yLFxuICDJtXNldERvY3VtZW50LFxuICDJtVRFU1RBQklMSVRZIGFzIFRFU1RBQklMSVRZLFxuICDJtVRFU1RBQklMSVRZX0dFVFRFUiBhcyBURVNUQUJJTElUWV9HRVRURVIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICcuL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtCcm93c2VyWGhyfSBmcm9tICcuL2Jyb3dzZXIveGhyJztcbmltcG9ydCB7RG9tUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0VWRU5UX01BTkFHRVJfUExVR0lOUywgRXZlbnRNYW5hZ2VyfSBmcm9tICcuL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0tleUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2tleV9ldmVudHMnO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogU2V0IG9mIGNvbmZpZyBvcHRpb25zIGF2YWlsYWJsZSBkdXJpbmcgdGhlIGFwcGxpY2F0aW9uIGJvb3RzdHJhcCBvcGVyYXRpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICpcbiAqIEBkZXByZWNhdGVkXG4gKiBgQXBwbGljYXRpb25Db25maWdgIGhhcyBtb3ZlZCwgcGxlYXNlIGltcG9ydCBgQXBwbGljYXRpb25Db25maWdgIGZyb20gYEBhbmd1bGFyL2NvcmVgIGluc3RlYWQuXG4gKi9cbi8vIFRoZSBiZWxvdyBpcyBhIHdvcmthcm91bmQgdG8gYWRkIGEgZGVwcmVjYXRlZCBtZXNzYWdlLlxudHlwZSBBcHBsaWNhdGlvbkNvbmZpZyA9IEFwcGxpY2F0aW9uQ29uZmlnRnJvbUNvcmU7XG5leHBvcnQge0FwcGxpY2F0aW9uQ29uZmlnfTtcblxuLyoqXG4gKiBCb290c3RyYXBzIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcnMgYSBzdGFuZGFsb25lIGNvbXBvbmVudCBhcyB0aGVcbiAqIGFwcGxpY2F0aW9uJ3Mgcm9vdCBjb21wb25lbnQuIE1vcmUgaW5mb3JtYXRpb24gYWJvdXQgc3RhbmRhbG9uZSBjb21wb25lbnRzIGNhbiBiZSBmb3VuZCBpbiBbdGhpc1xuICogZ3VpZGVdKGd1aWRlL2NvbXBvbmVudHMvaW1wb3J0aW5nKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIHJvb3QgY29tcG9uZW50IHBhc3NlZCBpbnRvIHRoaXMgZnVuY3Rpb24gKm11c3QqIGJlIGEgc3RhbmRhbG9uZSBvbmUgKHNob3VsZCBoYXZlIHRoZVxuICogYHN0YW5kYWxvbmU6IHRydWVgIGZsYWcgaW4gdGhlIGBAQ29tcG9uZW50YCBkZWNvcmF0b3IgY29uZmlnKS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAqICAgdGVtcGxhdGU6ICdIZWxsbyB3b3JsZCEnXG4gKiB9KVxuICogY2xhc3MgUm9vdENvbXBvbmVudCB7fVxuICpcbiAqIGNvbnN0IGFwcFJlZjogQXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gYWRkIHRoZSBsaXN0IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uIGluamVjdG9yIGJ5XG4gKiBzcGVjaWZ5aW5nIHRoZSBgcHJvdmlkZXJzYCBmaWVsZCBpbiBhbiBvYmplY3QgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQ6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICB7cHJvdmlkZTogQkFDS0VORF9VUkwsIHVzZVZhbHVlOiAnaHR0cHM6Ly95b3VyZG9tYWluLmNvbS9hcGknfVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBgaW1wb3J0UHJvdmlkZXJzRnJvbWAgaGVscGVyIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBjb2xsZWN0IGFsbCBwcm92aWRlcnMgZnJvbSBhbnlcbiAqIGV4aXN0aW5nIE5nTW9kdWxlIChhbmQgdHJhbnNpdGl2ZWx5IGZyb20gYWxsIE5nTW9kdWxlcyB0aGF0IGl0IGltcG9ydHMpOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgaW1wb3J0UHJvdmlkZXJzRnJvbShTb21lTmdNb2R1bGUpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogTm90ZTogdGhlIGBib290c3RyYXBBcHBsaWNhdGlvbmAgbWV0aG9kIGRvZXNuJ3QgaW5jbHVkZSBbVGVzdGFiaWxpdHldKGFwaS9jb3JlL1Rlc3RhYmlsaXR5KSBieVxuICogZGVmYXVsdC4gWW91IGNhbiBhZGQgW1Rlc3RhYmlsaXR5XShhcGkvY29yZS9UZXN0YWJpbGl0eSkgYnkgZ2V0dGluZyB0aGUgbGlzdCBvZiBuZWNlc3NhcnlcbiAqIHByb3ZpZGVycyB1c2luZyBgcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydCgpYCBmdW5jdGlvbiBhbmQgYWRkaW5nIHRoZW0gaW50byB0aGUgYHByb3ZpZGVyc2BcbiAqIGFycmF5LCBmb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge3Byb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuICpcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtwcm92aWRlcnM6IFtwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0KCldfSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcm9vdENvbXBvbmVudCBBIHJlZmVyZW5jZSB0byBhIHN0YW5kYWxvbmUgY29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICogQHBhcmFtIG9wdGlvbnMgRXh0cmEgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJvb3RzdHJhcCBvcGVyYXRpb24sIHNlZSBgQXBwbGljYXRpb25Db25maWdgIGZvclxuICogICAgIGFkZGl0aW9uYWwgaW5mby5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZSBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFxuICByb290Q29tcG9uZW50OiBUeXBlPHVua25vd24+LFxuICBvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcsXG4pOiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiB7XG4gIHJldHVybiBpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uKHtyb290Q29tcG9uZW50LCAuLi5jcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucyl9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiB3aXRob3V0IGJvb3RzdHJhcHBpbmcgYW55IGNvbXBvbmVudHMuIFRoaXMgaXMgdXNlZnVsXG4gKiBmb3IgdGhlIHNpdHVhdGlvbiB3aGVyZSBvbmUgd2FudHMgdG8gZGVjb3VwbGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgY3JlYXRpb24gKGEgcGxhdGZvcm0gYW5kXG4gKiBhc3NvY2lhdGVkIGluamVjdG9ycykgZnJvbSByZW5kZXJpbmcgY29tcG9uZW50cyBvbiBhIHNjcmVlbi4gQ29tcG9uZW50cyBjYW4gYmUgc3Vic2VxdWVudGx5XG4gKiBib290c3RyYXBwZWQgb24gdGhlIHJldHVybmVkIGBBcHBsaWNhdGlvblJlZmAuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgRXh0cmEgY29uZmlndXJhdGlvbiBmb3IgdGhlIGFwcGxpY2F0aW9uIGVudmlyb25tZW50LCBzZWUgYEFwcGxpY2F0aW9uQ29uZmlnYCBmb3JcbiAqICAgICBhZGRpdGlvbmFsIGluZm8uXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXR1cm5zIGFuIGBBcHBsaWNhdGlvblJlZmAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBsaWNhdGlvbihvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcpIHtcbiAgcmV0dXJuIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24oY3JlYXRlUHJvdmlkZXJzQ29uZmlnKG9wdGlvbnMpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJzQ29uZmlnKG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIGFwcFByb3ZpZGVyczogWy4uLkJST1dTRVJfTU9EVUxFX1BST1ZJREVSUywgLi4uKG9wdGlvbnM/LnByb3ZpZGVycyA/PyBbXSldLFxuICAgIHBsYXRmb3JtUHJvdmlkZXJzOiBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyxcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgc2V0IG9mIHByb3ZpZGVycyByZXF1aXJlZCB0byBzZXR1cCBbVGVzdGFiaWxpdHldKGFwaS9jb3JlL1Rlc3RhYmlsaXR5KSBmb3IgYW5cbiAqIGFwcGxpY2F0aW9uIGJvb3RzdHJhcHBlZCB1c2luZyB0aGUgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbi4gVGhlIHNldCBvZiBwcm92aWRlcnMgaXNcbiAqIG5lZWRlZCB0byBzdXBwb3J0IHRlc3RpbmcgYW4gYXBwbGljYXRpb24gd2l0aCBQcm90cmFjdG9yICh3aGljaCByZWxpZXMgb24gdGhlIFRlc3RhYmlsaXR5IEFQSXNcbiAqIHRvIGJlIHByZXNlbnQpLlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHByb3ZpZGVycyByZXF1aXJlZCB0byBzZXR1cCBUZXN0YWJpbGl0eSBmb3IgYW4gYXBwbGljYXRpb24gYW5kIG1ha2UgaXRcbiAqICAgICBhdmFpbGFibGUgZm9yIHRlc3RpbmcgdXNpbmcgUHJvdHJhY3Rvci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0KCk6IFByb3ZpZGVyW10ge1xuICAvLyBSZXR1cm4gYSBjb3B5IHRvIHByZXZlbnQgY2hhbmdlcyB0byB0aGUgb3JpZ2luYWwgYXJyYXkgaW4gY2FzZSBhbnkgaW4tcGxhY2VcbiAgLy8gYWx0ZXJhdGlvbnMgYXJlIHBlcmZvcm1lZCB0byB0aGUgYHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnRgIGNhbGwgcmVzdWx0cyBpbiBhcHBcbiAgLy8gY29kZS5cbiAgcmV0dXJuIFsuLi5URVNUQUJJTElUWV9QUk9WSURFUlNdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERvbUFkYXB0ZXIoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fQlJPV1NFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXREb21BZGFwdGVyLCBtdWx0aTogdHJ1ZX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG5dO1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBgUGxhdGZvcm1SZWZgIGluc3RhbmNlIGFzc29jaWF0ZWQgd2l0aCBicm93c2VyIHNlcnZpY2VcbiAqIHByb3ZpZGVycy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXI6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmID1cbiAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ2Jyb3dzZXInLCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogSW50ZXJuYWwgbWFya2VyIHRvIHNpZ25hbCB3aGV0aGVyIHByb3ZpZGVycyBmcm9tIHRoZSBgQnJvd3Nlck1vZHVsZWAgYXJlIGFscmVhZHkgcHJlc2VudCBpbiBESS5cbiAqIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIGxvYWRpbmcgYEJyb3dzZXJNb2R1bGVgIHByb3ZpZGVycyB0d2ljZS4gV2UgY2FuJ3QgcmVseSBvbiB0aGVcbiAqIGBCcm93c2VyTW9kdWxlYCBwcmVzZW5jZSBpdHNlbGYsIHNpbmNlIHRoZSBzdGFuZGFsb25lLWJhc2VkIGJvb3RzdHJhcCBqdXN0IGltcG9ydHNcbiAqIGBCcm93c2VyTW9kdWxlYCBwcm92aWRlcnMgd2l0aG91dCByZWZlcmVuY2luZyB0aGUgbW9kdWxlIGl0c2VsZi5cbiAqL1xuY29uc3QgQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbihcbiAgdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlID8gJ0Jyb3dzZXJNb2R1bGUgUHJvdmlkZXJzIE1hcmtlcicgOiAnJyxcbik7XG5cbmNvbnN0IFRFU1RBQklMSVRZX1BST1ZJREVSUyA9IFtcbiAge1xuICAgIHByb3ZpZGU6IFRFU1RBQklMSVRZX0dFVFRFUixcbiAgICB1c2VDbGFzczogQnJvd3NlckdldFRlc3RhYmlsaXR5LFxuICAgIGRlcHM6IFtdLFxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogVEVTVEFCSUxJVFksXG4gICAgdXNlQ2xhc3M6IFRlc3RhYmlsaXR5LFxuICAgIGRlcHM6IFtOZ1pvbmUsIFRlc3RhYmlsaXR5UmVnaXN0cnksIFRFU1RBQklMSVRZX0dFVFRFUl0sXG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBUZXN0YWJpbGl0eSwgLy8gQWxzbyBwcm92aWRlIGFzIGBUZXN0YWJpbGl0eWAgZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LlxuICAgIHVzZUNsYXNzOiBUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbTmdab25lLCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBURVNUQUJJTElUWV9HRVRURVJdLFxuICB9LFxuXTtcblxuY29uc3QgQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogSU5KRUNUT1JfU0NPUEUsIHVzZVZhbHVlOiAncm9vdCd9LFxuICB7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VGYWN0b3J5OiBlcnJvckhhbmRsZXIsIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogRG9tRXZlbnRzUGx1Z2luLFxuICAgIG11bHRpOiB0cnVlLFxuICAgIGRlcHM6IFtET0NVTUVOVCwgTmdab25lLCBQTEFURk9STV9JRF0sXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAgRG9tUmVuZGVyZXJGYWN0b3J5MixcbiAgU2hhcmVkU3R5bGVzSG9zdCxcbiAgRXZlbnRNYW5hZ2VyLFxuICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IERvbVJlbmRlcmVyRmFjdG9yeTJ9LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IEJyb3dzZXJYaHIsIGRlcHM6IFtdfSxcbiAgdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlXG4gICAgPyB7cHJvdmlkZTogQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUiwgdXNlVmFsdWU6IHRydWV9XG4gICAgOiBbXSxcbl07XG5cbi8qKlxuICogRXhwb3J0cyByZXF1aXJlZCBpbmZyYXN0cnVjdHVyZSBmb3IgYWxsIEFuZ3VsYXIgYXBwcy5cbiAqIEluY2x1ZGVkIGJ5IGRlZmF1bHQgaW4gYWxsIEFuZ3VsYXIgYXBwcyBjcmVhdGVkIHdpdGggdGhlIENMSVxuICogYG5ld2AgY29tbWFuZC5cbiAqIFJlLWV4cG9ydHMgYENvbW1vbk1vZHVsZWAgYW5kIGBBcHBsaWNhdGlvbk1vZHVsZWAsIG1ha2luZyB0aGVpclxuICogZXhwb3J0cyBhbmQgcHJvdmlkZXJzIGF2YWlsYWJsZSB0byBhbGwgYXBwcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWy4uLkJST1dTRVJfTU9EVUxFX1BST1ZJREVSUywgLi4uVEVTVEFCSUxJVFlfUFJPVklERVJTXSxcbiAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQXBwbGljYXRpb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2tpcFNlbGYoKVxuICAgIEBJbmplY3QoQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUilcbiAgICBwcm92aWRlcnNBbHJlYWR5UHJlc2VudDogYm9vbGVhbiB8IG51bGwsXG4gICkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiBwcm92aWRlcnNBbHJlYWR5UHJlc2VudCkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5CUk9XU0VSX01PRFVMRV9BTFJFQURZX0xPQURFRCxcbiAgICAgICAgYFByb3ZpZGVycyBmcm9tIHRoZSBcXGBCcm93c2VyTW9kdWxlXFxgIGhhdmUgYWxyZWFkeSBiZWVuIGxvYWRlZC4gSWYgeW91IG5lZWQgYWNjZXNzIGAgK1xuICAgICAgICAgIGB0byBjb21tb24gZGlyZWN0aXZlcyBzdWNoIGFzIE5nSWYgYW5kIE5nRm9yLCBpbXBvcnQgdGhlIFxcYENvbW1vbk1vZHVsZVxcYCBpbnN0ZWFkLmAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHAgdG8gdHJhbnNpdGlvbiBmcm9tIGEgc2VydmVyLXJlbmRlcmVkIGFwcCwgaWZcbiAgICogb25lIGlzIHByZXNlbnQgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYW4gaWRlbnRpZmllciBmb3IgdGhlIGFwcCB0byB0cmFuc2l0aW9uLlxuICAgKiBUaGUgSUQgbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciB2ZXJzaW9ucyBvZiB0aGUgYXBwLlxuICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBBUFBfSUR9IGluc3RlYWQgdG8gc2V0IHRoZSBhcHBsaWNhdGlvbiBJRC5cbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3Nlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBBUFBfSUQsIHVzZVZhbHVlOiBwYXJhbXMuYXBwSWR9XSxcbiAgICB9O1xuICB9XG59XG4iXX0=