/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, XhrFactory, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID, } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, InjectionToken, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, SkipSelf, Testability, TestabilityRegistry, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵinternalCreateApplication as internalCreateApplication, ɵRuntimeError as RuntimeError, ɵsetDocument, ɵTESTABILITY as TESTABILITY, ɵTESTABILITY_GETTER as TESTABILITY_GETTER, } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserGetTestability } from './browser/testability';
import { BrowserXhr } from './browser/xhr';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EventDelegationPlugin } from './dom/events/event_delegation';
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
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: EventDelegationPlugin,
        multi: true,
    },
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.6+sha-46f2680", ngImport: i0, type: BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.6+sha-46f2680", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.6+sha-46f2680", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.6+sha-46f2680", ngImport: i0, type: BrowserModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFlBQVksRUFDWixRQUFRLEVBQ1IsVUFBVSxFQUNWLG9CQUFvQixJQUFJLG1CQUFtQixHQUM1QyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxNQUFNLEVBRU4saUJBQWlCLEVBRWpCLHFCQUFxQixFQUNyQixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLFlBQVksRUFHWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUVSLFdBQVcsRUFDWCxtQkFBbUIsRUFFbkIsZUFBZSxJQUFJLGNBQWMsRUFDakMsMEJBQTBCLElBQUkseUJBQXlCLEVBQ3ZELGFBQWEsSUFBSSxZQUFZLEVBQzdCLFlBQVksRUFDWixZQUFZLElBQUksV0FBVyxFQUMzQixtQkFBbUIsSUFBSSxrQkFBa0IsR0FDMUMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9F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LE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUF1QjtRQUNqRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7eUhBL0JVLGFBQWEsa0JBSWQsK0JBQStCOzBIQUo5QixhQUFhLFlBRmQsWUFBWSxFQUFFLGlCQUFpQjswSEFFOUIsYUFBYSxhQUhiLENBQUMsR0FBRyx3QkFBd0IsRUFBRSxHQUFHLHFCQUFxQixDQUFDLFlBQ3hELFlBQVksRUFBRSxpQkFBaUI7O3NHQUU5QixhQUFhO2tCQUp6QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLEdBQUcsd0JBQXdCLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztvQkFDbEUsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2lCQUMzQzs7MEJBR0ksUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tbW9uTW9kdWxlLFxuICBET0NVTUVOVCxcbiAgWGhyRmFjdG9yeSxcbiAgybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBUFBfSUQsXG4gIEFwcGxpY2F0aW9uQ29uZmlnIGFzIEFwcGxpY2F0aW9uQ29uZmlnRnJvbUNvcmUsXG4gIEFwcGxpY2F0aW9uTW9kdWxlLFxuICBBcHBsaWNhdGlvblJlZixcbiAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LFxuICBFcnJvckhhbmRsZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxuICBOZ1pvbmUsXG4gIE9wdGlvbmFsLFxuICBQTEFURk9STV9JRCxcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIHBsYXRmb3JtQ29yZSxcbiAgUGxhdGZvcm1SZWYsXG4gIFByb3ZpZGVyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBTa2lwU2VsZixcbiAgU3RhdGljUHJvdmlkZXIsXG4gIFRlc3RhYmlsaXR5LFxuICBUZXN0YWJpbGl0eVJlZ2lzdHJ5LFxuICBUeXBlLFxuICDJtUlOSkVDVE9SX1NDT1BFIGFzIElOSkVDVE9SX1NDT1BFLFxuICDJtWludGVybmFsQ3JlYXRlQXBwbGljYXRpb24gYXMgaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbixcbiAgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yLFxuICDJtXNldERvY3VtZW50LFxuICDJtVRFU1RBQklMSVRZIGFzIFRFU1RBQklMSVRZLFxuICDJtVRFU1RBQklMSVRZX0dFVFRFUiBhcyBURVNUQUJJTElUWV9HRVRURVIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICcuL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtCcm93c2VyWGhyfSBmcm9tICcuL2Jyb3dzZXIveGhyJztcbmltcG9ydCB7RG9tUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnLi9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tRXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0V2ZW50RGVsZWdhdGlvblBsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X2RlbGVnYXRpb24nO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIFNldCBvZiBjb25maWcgb3B0aW9ucyBhdmFpbGFibGUgZHVyaW5nIHRoZSBhcHBsaWNhdGlvbiBib290c3RyYXAgb3BlcmF0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogYEFwcGxpY2F0aW9uQ29uZmlnYCBoYXMgbW92ZWQsIHBsZWFzZSBpbXBvcnQgYEFwcGxpY2F0aW9uQ29uZmlnYCBmcm9tIGBAYW5ndWxhci9jb3JlYCBpbnN0ZWFkLlxuICovXG4vLyBUaGUgYmVsb3cgaXMgYSB3b3JrYXJvdW5kIHRvIGFkZCBhIGRlcHJlY2F0ZWQgbWVzc2FnZS5cbnR5cGUgQXBwbGljYXRpb25Db25maWcgPSBBcHBsaWNhdGlvbkNvbmZpZ0Zyb21Db3JlO1xuZXhwb3J0IHtBcHBsaWNhdGlvbkNvbmZpZ307XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGEgc3RhbmRhbG9uZSBjb21wb25lbnQgYXMgdGhlXG4gKiBhcHBsaWNhdGlvbidzIHJvb3QgY29tcG9uZW50LiBNb3JlIGluZm9ybWF0aW9uIGFib3V0IHN0YW5kYWxvbmUgY29tcG9uZW50cyBjYW4gYmUgZm91bmQgaW4gW3RoaXNcbiAqIGd1aWRlXShndWlkZS9jb21wb25lbnRzL2ltcG9ydGluZykuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSByb290IGNvbXBvbmVudCBwYXNzZWQgaW50byB0aGlzIGZ1bmN0aW9uICptdXN0KiBiZSBhIHN0YW5kYWxvbmUgb25lIChzaG91bGQgaGF2ZSB0aGVcbiAqIGBzdGFuZGFsb25lOiB0cnVlYCBmbGFnIGluIHRoZSBgQENvbXBvbmVudGAgZGVjb3JhdG9yIGNvbmZpZykuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIHRlbXBsYXRlOiAnSGVsbG8gd29ybGQhJ1xuICogfSlcbiAqIGNsYXNzIFJvb3RDb21wb25lbnQge31cbiAqXG4gKiBjb25zdCBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmID0gYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFkZCB0aGUgbGlzdCBvZiBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgYXZhaWxhYmxlIGluIHRoZSBhcHBsaWNhdGlvbiBpbmplY3RvciBieVxuICogc3BlY2lmeWluZyB0aGUgYHByb3ZpZGVyc2AgZmllbGQgaW4gYW4gb2JqZWN0IHBhc3NlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50OlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAge3Byb3ZpZGU6IEJBQ0tFTkRfVVJMLCB1c2VWYWx1ZTogJ2h0dHBzOi8veW91cmRvbWFpbi5jb20vYXBpJ31cbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYGltcG9ydFByb3ZpZGVyc0Zyb21gIGhlbHBlciBtZXRob2QgY2FuIGJlIHVzZWQgdG8gY29sbGVjdCBhbGwgcHJvdmlkZXJzIGZyb20gYW55XG4gKiBleGlzdGluZyBOZ01vZHVsZSAoYW5kIHRyYW5zaXRpdmVseSBmcm9tIGFsbCBOZ01vZHVsZXMgdGhhdCBpdCBpbXBvcnRzKTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIGltcG9ydFByb3ZpZGVyc0Zyb20oU29tZU5nTW9kdWxlKVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIE5vdGU6IHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIG1ldGhvZCBkb2Vzbid0IGluY2x1ZGUgW1Rlc3RhYmlsaXR5XShhcGkvY29yZS9UZXN0YWJpbGl0eSkgYnlcbiAqIGRlZmF1bHQuIFlvdSBjYW4gYWRkIFtUZXN0YWJpbGl0eV0oYXBpL2NvcmUvVGVzdGFiaWxpdHkpIGJ5IGdldHRpbmcgdGhlIGxpc3Qgb2YgbmVjZXNzYXJ5XG4gKiBwcm92aWRlcnMgdXNpbmcgYHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnQoKWAgZnVuY3Rpb24gYW5kIGFkZGluZyB0aGVtIGludG8gdGhlIGBwcm92aWRlcnNgXG4gKiBhcnJheSwgZm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbiAqXG4gKiBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7cHJvdmlkZXJzOiBbcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydCgpXX0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHJvb3RDb21wb25lbnQgQSByZWZlcmVuY2UgdG8gYSBzdGFuZGFsb25lIGNvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEV4dHJhIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBib290c3RyYXAgb3BlcmF0aW9uLCBzZWUgYEFwcGxpY2F0aW9uQ29uZmlnYCBmb3JcbiAqICAgICBhZGRpdGlvbmFsIGluZm8uXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXR1cm5zIGFuIGBBcHBsaWNhdGlvblJlZmAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBBcHBsaWNhdGlvbihcbiAgcm9vdENvbXBvbmVudDogVHlwZTx1bmtub3duPixcbiAgb3B0aW9ucz86IEFwcGxpY2F0aW9uQ29uZmlnLFxuKTogUHJvbWlzZTxBcHBsaWNhdGlvblJlZj4ge1xuICByZXR1cm4gaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbih7cm9vdENvbXBvbmVudCwgLi4uY3JlYXRlUHJvdmlkZXJzQ29uZmlnKG9wdGlvbnMpfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gd2l0aG91dCBib290c3RyYXBwaW5nIGFueSBjb21wb25lbnRzLiBUaGlzIGlzIHVzZWZ1bFxuICogZm9yIHRoZSBzaXR1YXRpb24gd2hlcmUgb25lIHdhbnRzIHRvIGRlY291cGxlIGFwcGxpY2F0aW9uIGVudmlyb25tZW50IGNyZWF0aW9uIChhIHBsYXRmb3JtIGFuZFxuICogYXNzb2NpYXRlZCBpbmplY3RvcnMpIGZyb20gcmVuZGVyaW5nIGNvbXBvbmVudHMgb24gYSBzY3JlZW4uIENvbXBvbmVudHMgY2FuIGJlIHN1YnNlcXVlbnRseVxuICogYm9vdHN0cmFwcGVkIG9uIHRoZSByZXR1cm5lZCBgQXBwbGljYXRpb25SZWZgLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIEV4dHJhIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhcHBsaWNhdGlvbiBlbnZpcm9ubWVudCwgc2VlIGBBcHBsaWNhdGlvbkNvbmZpZ2AgZm9yXG4gKiAgICAgYWRkaXRpb25hbCBpbmZvLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmV0dXJucyBhbiBgQXBwbGljYXRpb25SZWZgIGluc3RhbmNlIG9uY2UgcmVzb2x2ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQXBwbGljYXRpb24ob3B0aW9ucz86IEFwcGxpY2F0aW9uQ29uZmlnKSB7XG4gIHJldHVybiBpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uKGNyZWF0ZVByb3ZpZGVyc0NvbmZpZyhvcHRpb25zKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3ZpZGVyc0NvbmZpZyhvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICBhcHBQcm92aWRlcnM6IFsuLi5CUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsIC4uLihvcHRpb25zPy5wcm92aWRlcnMgPz8gW10pXSxcbiAgICBwbGF0Zm9ybVByb3ZpZGVyczogSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMsXG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHNldCBvZiBwcm92aWRlcnMgcmVxdWlyZWQgdG8gc2V0dXAgW1Rlc3RhYmlsaXR5XShhcGkvY29yZS9UZXN0YWJpbGl0eSkgZm9yIGFuXG4gKiBhcHBsaWNhdGlvbiBib290c3RyYXBwZWQgdXNpbmcgdGhlIGBib290c3RyYXBBcHBsaWNhdGlvbmAgZnVuY3Rpb24uIFRoZSBzZXQgb2YgcHJvdmlkZXJzIGlzXG4gKiBuZWVkZWQgdG8gc3VwcG9ydCB0ZXN0aW5nIGFuIGFwcGxpY2F0aW9uIHdpdGggUHJvdHJhY3RvciAod2hpY2ggcmVsaWVzIG9uIHRoZSBUZXN0YWJpbGl0eSBBUElzXG4gKiB0byBiZSBwcmVzZW50KS5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBwcm92aWRlcnMgcmVxdWlyZWQgdG8gc2V0dXAgVGVzdGFiaWxpdHkgZm9yIGFuIGFwcGxpY2F0aW9uIGFuZCBtYWtlIGl0XG4gKiAgICAgYXZhaWxhYmxlIGZvciB0ZXN0aW5nIHVzaW5nIFByb3RyYWN0b3IuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydCgpOiBQcm92aWRlcltdIHtcbiAgLy8gUmV0dXJuIGEgY29weSB0byBwcmV2ZW50IGNoYW5nZXMgdG8gdGhlIG9yaWdpbmFsIGFycmF5IGluIGNhc2UgYW55IGluLXBsYWNlXG4gIC8vIGFsdGVyYXRpb25zIGFyZSBwZXJmb3JtZWQgdG8gdGhlIGBwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0YCBjYWxsIHJlc3VsdHMgaW4gYXBwXG4gIC8vIGNvZGUuXG4gIHJldHVybiBbLi4uVEVTVEFCSUxJVFlfUFJPVklERVJTXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXREb21BZGFwdGVyKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKCk6IEVycm9ySGFuZGxlciB7XG4gIHJldHVybiBuZXcgRXJyb3JIYW5kbGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfZG9jdW1lbnQoKTogYW55IHtcbiAgLy8gVGVsbCBpdnkgYWJvdXQgdGhlIGdsb2JhbCBkb2N1bWVudFxuICDJtXNldERvY3VtZW50KGRvY3VtZW50KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6IFBMQVRGT1JNX0JST1dTRVJfSUR9LFxuICB7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZVZhbHVlOiBpbml0RG9tQWRhcHRlciwgbXVsdGk6IHRydWV9LFxuICB7cHJvdmlkZTogRE9DVU1FTlQsIHVzZUZhY3Rvcnk6IF9kb2N1bWVudCwgZGVwczogW119LFxuXTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYFBsYXRmb3JtUmVmYCBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggYnJvd3NlciBzZXJ2aWNlXG4gKiBwcm92aWRlcnMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Ccm93c2VyOiAoZXh0cmFQcm92aWRlcnM/OiBTdGF0aWNQcm92aWRlcltdKSA9PiBQbGF0Zm9ybVJlZiA9XG4gIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyJywgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIEludGVybmFsIG1hcmtlciB0byBzaWduYWwgd2hldGhlciBwcm92aWRlcnMgZnJvbSB0aGUgYEJyb3dzZXJNb2R1bGVgIGFyZSBhbHJlYWR5IHByZXNlbnQgaW4gREkuXG4gKiBUaGlzIGlzIG5lZWRlZCB0byBhdm9pZCBsb2FkaW5nIGBCcm93c2VyTW9kdWxlYCBwcm92aWRlcnMgdHdpY2UuIFdlIGNhbid0IHJlbHkgb24gdGhlXG4gKiBgQnJvd3Nlck1vZHVsZWAgcHJlc2VuY2UgaXRzZWxmLCBzaW5jZSB0aGUgc3RhbmRhbG9uZS1iYXNlZCBib290c3RyYXAganVzdCBpbXBvcnRzXG4gKiBgQnJvd3Nlck1vZHVsZWAgcHJvdmlkZXJzIHdpdGhvdXQgcmVmZXJlbmNpbmcgdGhlIG1vZHVsZSBpdHNlbGYuXG4gKi9cbmNvbnN0IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gIHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSA/ICdCcm93c2VyTW9kdWxlIFByb3ZpZGVycyBNYXJrZXInIDogJycsXG4pO1xuXG5jb25zdCBURVNUQUJJTElUWV9QUk9WSURFUlMgPSBbXG4gIHtcbiAgICBwcm92aWRlOiBURVNUQUJJTElUWV9HRVRURVIsXG4gICAgdXNlQ2xhc3M6IEJyb3dzZXJHZXRUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbXSxcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFRFU1RBQklMSVRZLFxuICAgIHVzZUNsYXNzOiBUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbTmdab25lLCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBURVNUQUJJTElUWV9HRVRURVJdLFxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogVGVzdGFiaWxpdHksIC8vIEFsc28gcHJvdmlkZSBhcyBgVGVzdGFiaWxpdHlgIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cbiAgICB1c2VDbGFzczogVGVzdGFiaWxpdHksXG4gICAgZGVwczogW05nWm9uZSwgVGVzdGFiaWxpdHlSZWdpc3RyeSwgVEVTVEFCSUxJVFlfR0VUVEVSXSxcbiAgfSxcbl07XG5cbmNvbnN0IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IElOSkVDVE9SX1NDT1BFLCB1c2VWYWx1ZTogJ3Jvb3QnfSxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sXG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZSwgUExBVEZPUk1fSURdLFxuICB9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IEV2ZW50RGVsZWdhdGlvblBsdWdpbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfSxcbiAgRG9tUmVuZGVyZXJGYWN0b3J5MixcbiAgU2hhcmVkU3R5bGVzSG9zdCxcbiAgRXZlbnRNYW5hZ2VyLFxuICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IERvbVJlbmRlcmVyRmFjdG9yeTJ9LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IEJyb3dzZXJYaHIsIGRlcHM6IFtdfSxcbiAgdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlXG4gICAgPyB7cHJvdmlkZTogQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUiwgdXNlVmFsdWU6IHRydWV9XG4gICAgOiBbXSxcbl07XG5cbi8qKlxuICogRXhwb3J0cyByZXF1aXJlZCBpbmZyYXN0cnVjdHVyZSBmb3IgYWxsIEFuZ3VsYXIgYXBwcy5cbiAqIEluY2x1ZGVkIGJ5IGRlZmF1bHQgaW4gYWxsIEFuZ3VsYXIgYXBwcyBjcmVhdGVkIHdpdGggdGhlIENMSVxuICogYG5ld2AgY29tbWFuZC5cbiAqIFJlLWV4cG9ydHMgYENvbW1vbk1vZHVsZWAgYW5kIGBBcHBsaWNhdGlvbk1vZHVsZWAsIG1ha2luZyB0aGVpclxuICogZXhwb3J0cyBhbmQgcHJvdmlkZXJzIGF2YWlsYWJsZSB0byBhbGwgYXBwcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWy4uLkJST1dTRVJfTU9EVUxFX1BST1ZJREVSUywgLi4uVEVTVEFCSUxJVFlfUFJPVklERVJTXSxcbiAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQXBwbGljYXRpb25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBAU2tpcFNlbGYoKVxuICAgIEBJbmplY3QoQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUilcbiAgICBwcm92aWRlcnNBbHJlYWR5UHJlc2VudDogYm9vbGVhbiB8IG51bGwsXG4gICkge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiBwcm92aWRlcnNBbHJlYWR5UHJlc2VudCkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5CUk9XU0VSX01PRFVMRV9BTFJFQURZX0xPQURFRCxcbiAgICAgICAgYFByb3ZpZGVycyBmcm9tIHRoZSBcXGBCcm93c2VyTW9kdWxlXFxgIGhhdmUgYWxyZWFkeSBiZWVuIGxvYWRlZC4gSWYgeW91IG5lZWQgYWNjZXNzIGAgK1xuICAgICAgICAgIGB0byBjb21tb24gZGlyZWN0aXZlcyBzdWNoIGFzIE5nSWYgYW5kIE5nRm9yLCBpbXBvcnQgdGhlIFxcYENvbW1vbk1vZHVsZVxcYCBpbnN0ZWFkLmAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHAgdG8gdHJhbnNpdGlvbiBmcm9tIGEgc2VydmVyLXJlbmRlcmVkIGFwcCwgaWZcbiAgICogb25lIGlzIHByZXNlbnQgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYW4gaWRlbnRpZmllciBmb3IgdGhlIGFwcCB0byB0cmFuc2l0aW9uLlxuICAgKiBUaGUgSUQgbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciB2ZXJzaW9ucyBvZiB0aGUgYXBwLlxuICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBBUFBfSUR9IGluc3RlYWQgdG8gc2V0IHRoZSBhcHBsaWNhdGlvbiBJRC5cbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3Nlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBBUFBfSUQsIHVzZVZhbHVlOiBwYXJhbXMuYXBwSWR9XSxcbiAgICB9O1xuICB9XG59XG4iXX0=