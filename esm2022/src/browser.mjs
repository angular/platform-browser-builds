/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, XhrFactory, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, InjectionToken, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, SkipSelf, Testability, TestabilityRegistry, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵinternalCreateApplication as internalCreateApplication, ɵRuntimeError as RuntimeError, ɵsetDocument, ɵTESTABILITY as TESTABILITY, ɵTESTABILITY_GETTER as TESTABILITY_GETTER } from '@angular/core';
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
        appProviders: [
            ...BROWSER_MODULE_PROVIDERS,
            ...(options?.providers ?? []),
        ],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS
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
const BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken((typeof ngDevMode === 'undefined' || ngDevMode) ? 'BrowserModule Providers Marker' : '');
const TESTABILITY_PROVIDERS = [
    {
        provide: TESTABILITY_GETTER,
        useClass: BrowserGetTestability,
        deps: [],
    },
    {
        provide: TESTABILITY,
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
    },
    {
        provide: Testability, // Also provide as `Testability` for backwards-compatibility.
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
    }
];
const BROWSER_MODULE_PROVIDERS = [
    { provide: INJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler, deps: [] }, {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT, NgZone, PLATFORM_ID]
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    DomRendererFactory2, SharedStylesHost, EventManager,
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: XhrFactory, useClass: BrowserXhr, deps: [] },
    (typeof ngDevMode === 'undefined' || ngDevMode) ?
        { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true } :
        []
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
            providers: [
                { provide: APP_ID, useValue: params.appId },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.4+sha-cfed97d", ngImport: i0, type: BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-next.4+sha-cfed97d", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-next.4+sha-cfed97d", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.4+sha-cfed97d", ngImport: i0, type: BrowserModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFDLE1BQU0sRUFBa0QsaUJBQWlCLEVBQWtCLHFCQUFxQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUF5QixnQkFBZ0IsRUFBRSxRQUFRLEVBQWtCLFdBQVcsRUFBRSxtQkFBbUIsRUFBUSxlQUFlLElBQUksY0FBYyxFQUFFLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLGFBQWEsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksSUFBSSxXQUFXLEVBQUUsbUJBQW1CLElBQUksa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbmxCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxF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LFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO2FBQzFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7eUhBNUJVLGFBQWEsa0JBQ29CLCtCQUErQjswSEFEaEUsYUFBYSxZQUZkLFlBQVksRUFBRSxpQkFBaUI7MEhBRTlCLGFBQWEsYUFIYixDQUFDLEdBQUcsd0JBQXdCLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxZQUN4RCxZQUFZLEVBQUUsaUJBQWlCOztzR0FFOUIsYUFBYTtrQkFKekIsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLEdBQUcscUJBQXFCLENBQUM7b0JBQ2xFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQztpQkFDM0M7OzBCQUVjLFFBQVE7OzBCQUFJLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgWGhyRmFjdG9yeSwgybVQTEFURk9STV9CUk9XU0VSX0lEIGFzIFBMQVRGT1JNX0JST1dTRVJfSUR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQXBwbGljYXRpb25Db25maWcgYXMgQXBwbGljYXRpb25Db25maWdGcm9tQ29yZSwgQXBwbGljYXRpb25Nb2R1bGUsIEFwcGxpY2F0aW9uUmVmLCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIEVycm9ySGFuZGxlciwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBQTEFURk9STV9JTklUSUFMSVpFUiwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFJlbmRlcmVyRmFjdG9yeTIsIFNraXBTZWxmLCBTdGF0aWNQcm92aWRlciwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIFR5cGUsIMm1SU5KRUNUT1JfU0NPUEUgYXMgSU5KRUNUT1JfU0NPUEUsIMm1aW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbiBhcyBpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3IsIMm1c2V0RG9jdW1lbnQsIMm1VEVTVEFCSUxJVFkgYXMgVEVTVEFCSUxJVFksIMm1VEVTVEFCSUxJVFlfR0VUVEVSIGFzIFRFU1RBQklMSVRZX0dFVFRFUn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJy4vYnJvd3Nlci9icm93c2VyX2FkYXB0ZXInO1xuaW1wb3J0IHtCcm93c2VyR2V0VGVzdGFiaWxpdHl9IGZyb20gJy4vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0Jyb3dzZXJYaHJ9IGZyb20gJy4vYnJvd3Nlci94aHInO1xuaW1wb3J0IHtEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICcuL2RvbS9kb21fcmVuZGVyZXInO1xuaW1wb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9kb21fZXZlbnRzJztcbmltcG9ydCB7RVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXJ9IGZyb20gJy4vZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge1NoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuXG4vKipcbiAqIFNldCBvZiBjb25maWcgb3B0aW9ucyBhdmFpbGFibGUgZHVyaW5nIHRoZSBhcHBsaWNhdGlvbiBib290c3RyYXAgb3BlcmF0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqXG4gKiBAZGVwcmVjYXRlZFxuICogYEFwcGxpY2F0aW9uQ29uZmlnYCBoYXMgbW92ZWQsIHBsZWFzZSBpbXBvcnQgYEFwcGxpY2F0aW9uQ29uZmlnYCBmcm9tIGBAYW5ndWxhci9jb3JlYCBpbnN0ZWFkLlxuICovXG4vLyBUaGUgYmVsb3cgaXMgYSB3b3JrYXJvdW5kIHRvIGFkZCBhIGRlcHJlY2F0ZWQgbWVzc2FnZS5cbnR5cGUgQXBwbGljYXRpb25Db25maWcgPSBBcHBsaWNhdGlvbkNvbmZpZ0Zyb21Db3JlO1xuZXhwb3J0IHtBcHBsaWNhdGlvbkNvbmZpZ307XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGFuZCByZW5kZXJzIGEgc3RhbmRhbG9uZSBjb21wb25lbnQgYXMgdGhlXG4gKiBhcHBsaWNhdGlvbidzIHJvb3QgY29tcG9uZW50LiBNb3JlIGluZm9ybWF0aW9uIGFib3V0IHN0YW5kYWxvbmUgY29tcG9uZW50cyBjYW4gYmUgZm91bmQgaW4gW3RoaXNcbiAqIGd1aWRlXShndWlkZS9jb21wb25lbnRzL2ltcG9ydGluZykuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSByb290IGNvbXBvbmVudCBwYXNzZWQgaW50byB0aGlzIGZ1bmN0aW9uICptdXN0KiBiZSBhIHN0YW5kYWxvbmUgb25lIChzaG91bGQgaGF2ZSB0aGVcbiAqIGBzdGFuZGFsb25lOiB0cnVlYCBmbGFnIGluIHRoZSBgQENvbXBvbmVudGAgZGVjb3JhdG9yIGNvbmZpZykuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHN0YW5kYWxvbmU6IHRydWUsXG4gKiAgIHRlbXBsYXRlOiAnSGVsbG8gd29ybGQhJ1xuICogfSlcbiAqIGNsYXNzIFJvb3RDb21wb25lbnQge31cbiAqXG4gKiBjb25zdCBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmID0gYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFkZCB0aGUgbGlzdCBvZiBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgYXZhaWxhYmxlIGluIHRoZSBhcHBsaWNhdGlvbiBpbmplY3RvciBieVxuICogc3BlY2lmeWluZyB0aGUgYHByb3ZpZGVyc2AgZmllbGQgaW4gYW4gb2JqZWN0IHBhc3NlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50OlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAge3Byb3ZpZGU6IEJBQ0tFTkRfVVJMLCB1c2VWYWx1ZTogJ2h0dHBzOi8veW91cmRvbWFpbi5jb20vYXBpJ31cbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYGltcG9ydFByb3ZpZGVyc0Zyb21gIGhlbHBlciBtZXRob2QgY2FuIGJlIHVzZWQgdG8gY29sbGVjdCBhbGwgcHJvdmlkZXJzIGZyb20gYW55XG4gKiBleGlzdGluZyBOZ01vZHVsZSAoYW5kIHRyYW5zaXRpdmVseSBmcm9tIGFsbCBOZ01vZHVsZXMgdGhhdCBpdCBpbXBvcnRzKTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIGltcG9ydFByb3ZpZGVyc0Zyb20oU29tZU5nTW9kdWxlKVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIE5vdGU6IHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIG1ldGhvZCBkb2Vzbid0IGluY2x1ZGUgW1Rlc3RhYmlsaXR5XShhcGkvY29yZS9UZXN0YWJpbGl0eSkgYnlcbiAqIGRlZmF1bHQuIFlvdSBjYW4gYWRkIFtUZXN0YWJpbGl0eV0oYXBpL2NvcmUvVGVzdGFiaWxpdHkpIGJ5IGdldHRpbmcgdGhlIGxpc3Qgb2YgbmVjZXNzYXJ5XG4gKiBwcm92aWRlcnMgdXNpbmcgYHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnQoKWAgZnVuY3Rpb24gYW5kIGFkZGluZyB0aGVtIGludG8gdGhlIGBwcm92aWRlcnNgXG4gKiBhcnJheSwgZm9yIGV4YW1wbGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0fSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbiAqXG4gKiBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7cHJvdmlkZXJzOiBbcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydCgpXX0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHJvb3RDb21wb25lbnQgQSByZWZlcmVuY2UgdG8gYSBzdGFuZGFsb25lIGNvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAqIEBwYXJhbSBvcHRpb25zIEV4dHJhIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBib290c3RyYXAgb3BlcmF0aW9uLCBzZWUgYEFwcGxpY2F0aW9uQ29uZmlnYCBmb3JcbiAqICAgICBhZGRpdGlvbmFsIGluZm8uXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXR1cm5zIGFuIGBBcHBsaWNhdGlvblJlZmAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBBcHBsaWNhdGlvbihcbiAgICByb290Q29tcG9uZW50OiBUeXBlPHVua25vd24+LCBvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcpOiBQcm9taXNlPEFwcGxpY2F0aW9uUmVmPiB7XG4gIHJldHVybiBpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uKHtyb290Q29tcG9uZW50LCAuLi5jcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucyl9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiB3aXRob3V0IGJvb3RzdHJhcHBpbmcgYW55IGNvbXBvbmVudHMuIFRoaXMgaXMgdXNlZnVsXG4gKiBmb3IgdGhlIHNpdHVhdGlvbiB3aGVyZSBvbmUgd2FudHMgdG8gZGVjb3VwbGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgY3JlYXRpb24gKGEgcGxhdGZvcm0gYW5kXG4gKiBhc3NvY2lhdGVkIGluamVjdG9ycykgZnJvbSByZW5kZXJpbmcgY29tcG9uZW50cyBvbiBhIHNjcmVlbi4gQ29tcG9uZW50cyBjYW4gYmUgc3Vic2VxdWVudGx5XG4gKiBib290c3RyYXBwZWQgb24gdGhlIHJldHVybmVkIGBBcHBsaWNhdGlvblJlZmAuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgRXh0cmEgY29uZmlndXJhdGlvbiBmb3IgdGhlIGFwcGxpY2F0aW9uIGVudmlyb25tZW50LCBzZWUgYEFwcGxpY2F0aW9uQ29uZmlnYCBmb3JcbiAqICAgICBhZGRpdGlvbmFsIGluZm8uXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXR1cm5zIGFuIGBBcHBsaWNhdGlvblJlZmAgaW5zdGFuY2Ugb25jZSByZXNvbHZlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBcHBsaWNhdGlvbihvcHRpb25zPzogQXBwbGljYXRpb25Db25maWcpIHtcbiAgcmV0dXJuIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24oY3JlYXRlUHJvdmlkZXJzQ29uZmlnKG9wdGlvbnMpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXJzQ29uZmlnKG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIGFwcFByb3ZpZGVyczogW1xuICAgICAgLi4uQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTLFxuICAgICAgLi4uKG9wdGlvbnM/LnByb3ZpZGVycyA/PyBbXSksXG4gICAgXSxcbiAgICBwbGF0Zm9ybVByb3ZpZGVyczogSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlNcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgc2V0IG9mIHByb3ZpZGVycyByZXF1aXJlZCB0byBzZXR1cCBbVGVzdGFiaWxpdHldKGFwaS9jb3JlL1Rlc3RhYmlsaXR5KSBmb3IgYW5cbiAqIGFwcGxpY2F0aW9uIGJvb3RzdHJhcHBlZCB1c2luZyB0aGUgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBmdW5jdGlvbi4gVGhlIHNldCBvZiBwcm92aWRlcnMgaXNcbiAqIG5lZWRlZCB0byBzdXBwb3J0IHRlc3RpbmcgYW4gYXBwbGljYXRpb24gd2l0aCBQcm90cmFjdG9yICh3aGljaCByZWxpZXMgb24gdGhlIFRlc3RhYmlsaXR5IEFQSXNcbiAqIHRvIGJlIHByZXNlbnQpLlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHByb3ZpZGVycyByZXF1aXJlZCB0byBzZXR1cCBUZXN0YWJpbGl0eSBmb3IgYW4gYXBwbGljYXRpb24gYW5kIG1ha2UgaXRcbiAqICAgICBhdmFpbGFibGUgZm9yIHRlc3RpbmcgdXNpbmcgUHJvdHJhY3Rvci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0KCk6IFByb3ZpZGVyW10ge1xuICAvLyBSZXR1cm4gYSBjb3B5IHRvIHByZXZlbnQgY2hhbmdlcyB0byB0aGUgb3JpZ2luYWwgYXJyYXkgaW4gY2FzZSBhbnkgaW4tcGxhY2VcbiAgLy8gYWx0ZXJhdGlvbnMgYXJlIHBlcmZvcm1lZCB0byB0aGUgYHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnRgIGNhbGwgcmVzdWx0cyBpbiBhcHBcbiAgLy8gY29kZS5cbiAgcmV0dXJuIFsuLi5URVNUQUJJTElUWV9QUk9WSURFUlNdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERvbUFkYXB0ZXIoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcnJvckhhbmRsZXIoKTogRXJyb3JIYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFcnJvckhhbmRsZXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICAvLyBUZWxsIGl2eSBhYm91dCB0aGUgZ2xvYmFsIGRvY3VtZW50XG4gIMm1c2V0RG9jdW1lbnQoZG9jdW1lbnQpO1xuICByZXR1cm4gZG9jdW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogUExBVEZPUk1fQlJPV1NFUl9JRH0sXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXREb21BZGFwdGVyLCBtdWx0aTogdHJ1ZX0sXG4gIHtwcm92aWRlOiBET0NVTUVOVCwgdXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0sXG5dO1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBgUGxhdGZvcm1SZWZgIGluc3RhbmNlIGFzc29jaWF0ZWQgd2l0aCBicm93c2VyIHNlcnZpY2VcbiAqIHByb3ZpZGVycy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXI6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnYnJvd3NlcicsIElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBtYXJrZXIgdG8gc2lnbmFsIHdoZXRoZXIgcHJvdmlkZXJzIGZyb20gdGhlIGBCcm93c2VyTW9kdWxlYCBhcmUgYWxyZWFkeSBwcmVzZW50IGluIERJLlxuICogVGhpcyBpcyBuZWVkZWQgdG8gYXZvaWQgbG9hZGluZyBgQnJvd3Nlck1vZHVsZWAgcHJvdmlkZXJzIHR3aWNlLiBXZSBjYW4ndCByZWx5IG9uIHRoZVxuICogYEJyb3dzZXJNb2R1bGVgIHByZXNlbmNlIGl0c2VsZiwgc2luY2UgdGhlIHN0YW5kYWxvbmUtYmFzZWQgYm9vdHN0cmFwIGp1c3QgaW1wb3J0c1xuICogYEJyb3dzZXJNb2R1bGVgIHByb3ZpZGVycyB3aXRob3V0IHJlZmVyZW5jaW5nIHRoZSBtb2R1bGUgaXRzZWxmLlxuICovXG5jb25zdCBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlNfTUFSS0VSID0gbmV3IEluamVjdGlvblRva2VuKFxuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpID8gJ0Jyb3dzZXJNb2R1bGUgUHJvdmlkZXJzIE1hcmtlcicgOiAnJyk7XG5cbmNvbnN0IFRFU1RBQklMSVRZX1BST1ZJREVSUyA9IFtcbiAge1xuICAgIHByb3ZpZGU6IFRFU1RBQklMSVRZX0dFVFRFUixcbiAgICB1c2VDbGFzczogQnJvd3NlckdldFRlc3RhYmlsaXR5LFxuICAgIGRlcHM6IFtdLFxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogVEVTVEFCSUxJVFksXG4gICAgdXNlQ2xhc3M6IFRlc3RhYmlsaXR5LFxuICAgIGRlcHM6IFtOZ1pvbmUsIFRlc3RhYmlsaXR5UmVnaXN0cnksIFRFU1RBQklMSVRZX0dFVFRFUl1cbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFRlc3RhYmlsaXR5LCAgLy8gQWxzbyBwcm92aWRlIGFzIGBUZXN0YWJpbGl0eWAgZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LlxuICAgIHVzZUNsYXNzOiBUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbTmdab25lLCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBURVNUQUJJTElUWV9HRVRURVJdXG4gIH1cbl07XG5cbmNvbnN0IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IElOSkVDVE9SX1NDT1BFLCB1c2VWYWx1ZTogJ3Jvb3QnfSxcbiAge3Byb3ZpZGU6IEVycm9ySGFuZGxlciwgdXNlRmFjdG9yeTogZXJyb3JIYW5kbGVyLCBkZXBzOiBbXX0sIHtcbiAgICBwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gICAgdXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbRE9DVU1FTlQsIE5nWm9uZSwgUExBVEZPUk1fSURdXG4gIH0sXG4gIHtwcm92aWRlOiBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHVzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlLCBkZXBzOiBbRE9DVU1FTlRdfSxcbiAgRG9tUmVuZGVyZXJGYWN0b3J5MiwgU2hhcmVkU3R5bGVzSG9zdCwgRXZlbnRNYW5hZ2VyLFxuICB7cHJvdmlkZTogUmVuZGVyZXJGYWN0b3J5MiwgdXNlRXhpc3Rpbmc6IERvbVJlbmRlcmVyRmFjdG9yeTJ9LFxuICB7cHJvdmlkZTogWGhyRmFjdG9yeSwgdXNlQ2xhc3M6IEJyb3dzZXJYaHIsIGRlcHM6IFtdfSxcbiAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgP1xuICAgICAge3Byb3ZpZGU6IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIsIHVzZVZhbHVlOiB0cnVlfSA6XG4gICAgICBbXVxuXTtcblxuLyoqXG4gKiBFeHBvcnRzIHJlcXVpcmVkIGluZnJhc3RydWN0dXJlIGZvciBhbGwgQW5ndWxhciBhcHBzLlxuICogSW5jbHVkZWQgYnkgZGVmYXVsdCBpbiBhbGwgQW5ndWxhciBhcHBzIGNyZWF0ZWQgd2l0aCB0aGUgQ0xJXG4gKiBgbmV3YCBjb21tYW5kLlxuICogUmUtZXhwb3J0cyBgQ29tbW9uTW9kdWxlYCBhbmQgYEFwcGxpY2F0aW9uTW9kdWxlYCwgbWFraW5nIHRoZWlyXG4gKiBleHBvcnRzIGFuZCBwcm92aWRlcnMgYXZhaWxhYmxlIHRvIGFsbCBhcHBzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbLi4uQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTLCAuLi5URVNUQUJJTElUWV9QUk9WSURFUlNdLFxuICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBcHBsaWNhdGlvbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBASW5qZWN0KEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIpXG4gICAgICAgICAgICAgIHByb3ZpZGVyc0FscmVhZHlQcmVzZW50OiBib29sZWFufG51bGwpIHtcbiAgICBpZiAoKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgcHJvdmlkZXJzQWxyZWFkeVByZXNlbnQpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5CUk9XU0VSX01PRFVMRV9BTFJFQURZX0xPQURFRCxcbiAgICAgICAgICBgUHJvdmlkZXJzIGZyb20gdGhlIFxcYEJyb3dzZXJNb2R1bGVcXGAgaGF2ZSBhbHJlYWR5IGJlZW4gbG9hZGVkLiBJZiB5b3UgbmVlZCBhY2Nlc3MgYCArXG4gICAgICAgICAgICAgIGB0byBjb21tb24gZGlyZWN0aXZlcyBzdWNoIGFzIE5nSWYgYW5kIE5nRm9yLCBpbXBvcnQgdGhlIFxcYENvbW1vbk1vZHVsZVxcYCBpbnN0ZWFkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgYnJvd3Nlci1iYXNlZCBhcHAgdG8gdHJhbnNpdGlvbiBmcm9tIGEgc2VydmVyLXJlbmRlcmVkIGFwcCwgaWZcbiAgICogb25lIGlzIHByZXNlbnQgb24gdGhlIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYW4gaWRlbnRpZmllciBmb3IgdGhlIGFwcCB0byB0cmFuc2l0aW9uLlxuICAgKiBUaGUgSUQgbXVzdCBtYXRjaCBiZXR3ZWVuIHRoZSBjbGllbnQgYW5kIHNlcnZlciB2ZXJzaW9ucyBvZiB0aGUgYXBwLlxuICAgKiBAcmV0dXJucyBUaGUgcmVjb25maWd1cmVkIGBCcm93c2VyTW9kdWxlYCB0byBpbXBvcnQgaW50byB0aGUgYXBwJ3Mgcm9vdCBgQXBwTW9kdWxlYC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBBUFBfSUR9IGluc3RlYWQgdG8gc2V0IHRoZSBhcHBsaWNhdGlvbiBJRC5cbiAgICovXG4gIHN0YXRpYyB3aXRoU2VydmVyVHJhbnNpdGlvbihwYXJhbXM6IHthcHBJZDogc3RyaW5nfSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnJvd3Nlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQnJvd3Nlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogcGFyYW1zLmFwcElkfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19