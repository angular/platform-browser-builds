/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule, DOCUMENT, XhrFactory, ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from '@angular/common';
import { APP_ID, ApplicationModule, createPlatformFactory, ErrorHandler, Inject, InjectionToken, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, platformCore, RendererFactory2, SkipSelf, Testability, TestabilityRegistry, ɵINJECTOR_SCOPE as INJECTOR_SCOPE, ɵinternalCreateApplication as internalCreateApplication, ɵsetDocument, ɵTESTABILITY as TESTABILITY, ɵTESTABILITY_GETTER as TESTABILITY_GETTER } from '@angular/core';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserGetTestability } from './browser/testability';
import { BrowserXhr } from './browser/xhr';
import { DomRendererFactory2 } from './dom/dom_renderer';
import { DomEventsPlugin } from './dom/events/dom_events';
import { EVENT_MANAGER_PLUGINS, EventManager } from './dom/events/event_manager';
import { KeyEventsPlugin } from './dom/events/key_events';
import { SharedStylesHost } from './dom/shared_styles_host';
import * as i0 from "@angular/core";
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
/**
 * Bootstraps an instance of an Angular application and renders a standalone component as the
 * application's root component. More information about standalone components can be found in [this
 * guide](guide/standalone-components).
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
const BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(NG_DEV_MODE ? 'BrowserModule Providers Marker' : '');
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
        provide: Testability,
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
    NG_DEV_MODE ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true } : []
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
class BrowserModule {
    constructor(providersAlreadyPresent) {
        if (NG_DEV_MODE && providersAlreadyPresent) {
            throw new Error(`Providers from the \`BrowserModule\` have already been loaded. If you need access ` +
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
}
BrowserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-6287153", ngImport: i0, type: BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule });
BrowserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.3+sha-6287153", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] });
BrowserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-6287153", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] });
export { BrowserModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.3+sha-6287153", ngImport: i0, type: BrowserModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
                    exports: [CommonModule, ApplicationModule],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }, {
                    type: Inject,
                    args: [BROWSER_MODULE_PROVIDERS_MARKER]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDaEgsT0FBTyxFQUFDLE1BQU0sRUFBa0QsaUJBQWlCLEVBQWtCLHFCQUFxQixFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUF5QixnQkFBZ0IsRUFBRSxRQUFRLEVBQWtCLFdBQVcsRUFBRSxtQkFBbUIsRUFBUSxlQUFlLElBQUksY0FBYyxFQUFFLDBCQUEwQixJQUFJLHlCQUF5QixFQUFFLFlBQVksRUFBRSxZQUFZLElBQUksV0FBVyxFQUFFLG1CQUFtQixJQUFJLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXBqQixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0UsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFN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LGFBQWEsWUFGZCxZQUFZLEVBQUUsaUJBQWlCO3NIQUU5QixhQUFhLGFBSGIsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLEdBQUcscUJBQXFCLENBQUMsWUFDeEQsWUFBWSxFQUFFLGlCQUFpQjtTQUU5QixhQUFhO3NHQUFiLGFBQWE7a0JBSnpCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUMsR0FBRyx3QkFBd0IsRUFBRSxHQUFHLHFCQUFxQixDQUFDO29CQUNsRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7aUJBQzNDOzswQkFFYyxRQUFROzswQkFBSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIFhockZhY3RvcnksIMm1UExBVEZPUk1fQlJPV1NFUl9JRCBhcyBQTEFURk9STV9CUk9XU0VSX0lEfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIEFwcGxpY2F0aW9uQ29uZmlnIGFzIEFwcGxpY2F0aW9uQ29uZmlnRnJvbUNvcmUsIEFwcGxpY2F0aW9uTW9kdWxlLCBBcHBsaWNhdGlvblJlZiwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBFcnJvckhhbmRsZXIsIEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCwgUExBVEZPUk1fSU5JVElBTElaRVIsIHBsYXRmb3JtQ29yZSwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBSZW5kZXJlckZhY3RvcnkyLCBTa2lwU2VsZiwgU3RhdGljUHJvdmlkZXIsIFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBUeXBlLCDJtUlOSkVDVE9SX1NDT1BFIGFzIElOSkVDVE9SX1NDT1BFLCDJtWludGVybmFsQ3JlYXRlQXBwbGljYXRpb24gYXMgaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbiwgybVzZXREb2N1bWVudCwgybVURVNUQUJJTElUWSBhcyBURVNUQUJJTElUWSwgybVURVNUQUJJTElUWV9HRVRURVIgYXMgVEVTVEFCSUxJVFlfR0VUVEVSfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnLi9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9icm93c2VyL3hocic7XG5pbXBvcnQge0RvbVJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnLi9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9rZXlfZXZlbnRzJztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuY29uc3QgTkdfREVWX01PREUgPSB0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCAhIW5nRGV2TW9kZTtcblxuLyoqXG4gKiBTZXQgb2YgY29uZmlnIG9wdGlvbnMgYXZhaWxhYmxlIGR1cmluZyB0aGUgYXBwbGljYXRpb24gYm9vdHN0cmFwIG9wZXJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIGBBcHBsaWNhdGlvbkNvbmZpZ2AgaGFzIG1vdmVkLCBwbGVhc2UgaW1wb3J0IGBBcHBsaWNhdGlvbkNvbmZpZ2AgZnJvbSBgQGFuZ3VsYXIvY29yZWAgaW5zdGVhZC5cbiAqL1xuLy8gVGhlIGJlbG93IGlzIGEgd29ya2Fyb3VuZCB0byBhZGQgYSBkZXByZWNhdGVkIG1lc3NhZ2UuXG50eXBlIEFwcGxpY2F0aW9uQ29uZmlnID0gQXBwbGljYXRpb25Db25maWdGcm9tQ29yZTtcbmV4cG9ydCB7QXBwbGljYXRpb25Db25maWd9O1xuXG4vKipcbiAqIEJvb3RzdHJhcHMgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBhbmQgcmVuZGVycyBhIHN0YW5kYWxvbmUgY29tcG9uZW50IGFzIHRoZVxuICogYXBwbGljYXRpb24ncyByb290IGNvbXBvbmVudC4gTW9yZSBpbmZvcm1hdGlvbiBhYm91dCBzdGFuZGFsb25lIGNvbXBvbmVudHMgY2FuIGJlIGZvdW5kIGluIFt0aGlzXG4gKiBndWlkZV0oZ3VpZGUvc3RhbmRhbG9uZS1jb21wb25lbnRzKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIHJvb3QgY29tcG9uZW50IHBhc3NlZCBpbnRvIHRoaXMgZnVuY3Rpb24gKm11c3QqIGJlIGEgc3RhbmRhbG9uZSBvbmUgKHNob3VsZCBoYXZlIHRoZVxuICogYHN0YW5kYWxvbmU6IHRydWVgIGZsYWcgaW4gdGhlIGBAQ29tcG9uZW50YCBkZWNvcmF0b3IgY29uZmlnKS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAqICAgdGVtcGxhdGU6ICdIZWxsbyB3b3JsZCEnXG4gKiB9KVxuICogY2xhc3MgUm9vdENvbXBvbmVudCB7fVxuICpcbiAqIGNvbnN0IGFwcFJlZjogQXBwbGljYXRpb25SZWYgPSBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gYWRkIHRoZSBsaXN0IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBhdmFpbGFibGUgaW4gdGhlIGFwcGxpY2F0aW9uIGluamVjdG9yIGJ5XG4gKiBzcGVjaWZ5aW5nIHRoZSBgcHJvdmlkZXJzYCBmaWVsZCBpbiBhbiBvYmplY3QgcGFzc2VkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQ6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICB7cHJvdmlkZTogQkFDS0VORF9VUkwsIHVzZVZhbHVlOiAnaHR0cHM6Ly95b3VyZG9tYWluLmNvbS9hcGknfVxuICogICBdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBgaW1wb3J0UHJvdmlkZXJzRnJvbWAgaGVscGVyIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBjb2xsZWN0IGFsbCBwcm92aWRlcnMgZnJvbSBhbnlcbiAqIGV4aXN0aW5nIE5nTW9kdWxlIChhbmQgdHJhbnNpdGl2ZWx5IGZyb20gYWxsIE5nTW9kdWxlcyB0aGF0IGl0IGltcG9ydHMpOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgaW1wb3J0UHJvdmlkZXJzRnJvbShTb21lTmdNb2R1bGUpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogTm90ZTogdGhlIGBib290c3RyYXBBcHBsaWNhdGlvbmAgbWV0aG9kIGRvZXNuJ3QgaW5jbHVkZSBbVGVzdGFiaWxpdHldKGFwaS9jb3JlL1Rlc3RhYmlsaXR5KSBieVxuICogZGVmYXVsdC4gWW91IGNhbiBhZGQgW1Rlc3RhYmlsaXR5XShhcGkvY29yZS9UZXN0YWJpbGl0eSkgYnkgZ2V0dGluZyB0aGUgbGlzdCBvZiBuZWNlc3NhcnlcbiAqIHByb3ZpZGVycyB1c2luZyBgcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydCgpYCBmdW5jdGlvbiBhbmQgYWRkaW5nIHRoZW0gaW50byB0aGUgYHByb3ZpZGVyc2BcbiAqIGFycmF5LCBmb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge3Byb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnR9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuICpcbiAqIGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtwcm92aWRlcnM6IFtwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0KCldfSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gcm9vdENvbXBvbmVudCBBIHJlZmVyZW5jZSB0byBhIHN0YW5kYWxvbmUgY29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICogQHBhcmFtIG9wdGlvbnMgRXh0cmEgY29uZmlndXJhdGlvbiBmb3IgdGhlIGJvb3RzdHJhcCBvcGVyYXRpb24sIHNlZSBgQXBwbGljYXRpb25Db25maWdgIGZvclxuICogICAgIGFkZGl0aW9uYWwgaW5mby5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZSBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFxuICAgIHJvb3RDb21wb25lbnQ6IFR5cGU8dW5rbm93bj4sIG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZyk6IFByb21pc2U8QXBwbGljYXRpb25SZWY+IHtcbiAgcmV0dXJuIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24oe3Jvb3RDb21wb25lbnQsIC4uLmNyZWF0ZVByb3ZpZGVyc0NvbmZpZyhvcHRpb25zKX0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIHdpdGhvdXQgYm9vdHN0cmFwcGluZyBhbnkgY29tcG9uZW50cy4gVGhpcyBpcyB1c2VmdWxcbiAqIGZvciB0aGUgc2l0dWF0aW9uIHdoZXJlIG9uZSB3YW50cyB0byBkZWNvdXBsZSBhcHBsaWNhdGlvbiBlbnZpcm9ubWVudCBjcmVhdGlvbiAoYSBwbGF0Zm9ybSBhbmRcbiAqIGFzc29jaWF0ZWQgaW5qZWN0b3JzKSBmcm9tIHJlbmRlcmluZyBjb21wb25lbnRzIG9uIGEgc2NyZWVuLiBDb21wb25lbnRzIGNhbiBiZSBzdWJzZXF1ZW50bHlcbiAqIGJvb3RzdHJhcHBlZCBvbiB0aGUgcmV0dXJuZWQgYEFwcGxpY2F0aW9uUmVmYC5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQsIHNlZSBgQXBwbGljYXRpb25Db25maWdgIGZvclxuICogICAgIGFkZGl0aW9uYWwgaW5mby5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZSBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcGxpY2F0aW9uKG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZykge1xuICByZXR1cm4gaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbihjcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucz86IEFwcGxpY2F0aW9uQ29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgYXBwUHJvdmlkZXJzOiBbXG4gICAgICAuLi5CUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsXG4gICAgICAuLi4ob3B0aW9ucz8ucHJvdmlkZXJzID8/IFtdKSxcbiAgICBdLFxuICAgIHBsYXRmb3JtUHJvdmlkZXJzOiBJTlRFUk5BTF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSU1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBzZXQgb2YgcHJvdmlkZXJzIHJlcXVpcmVkIHRvIHNldHVwIFtUZXN0YWJpbGl0eV0oYXBpL2NvcmUvVGVzdGFiaWxpdHkpIGZvciBhblxuICogYXBwbGljYXRpb24gYm9vdHN0cmFwcGVkIHVzaW5nIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uLiBUaGUgc2V0IG9mIHByb3ZpZGVycyBpc1xuICogbmVlZGVkIHRvIHN1cHBvcnQgdGVzdGluZyBhbiBhcHBsaWNhdGlvbiB3aXRoIFByb3RyYWN0b3IgKHdoaWNoIHJlbGllcyBvbiB0aGUgVGVzdGFiaWxpdHkgQVBJc1xuICogdG8gYmUgcHJlc2VudCkuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2YgcHJvdmlkZXJzIHJlcXVpcmVkIHRvIHNldHVwIFRlc3RhYmlsaXR5IGZvciBhbiBhcHBsaWNhdGlvbiBhbmQgbWFrZSBpdFxuICogICAgIGF2YWlsYWJsZSBmb3IgdGVzdGluZyB1c2luZyBQcm90cmFjdG9yLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnQoKTogUHJvdmlkZXJbXSB7XG4gIC8vIFJldHVybiBhIGNvcHkgdG8gcHJldmVudCBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBhcnJheSBpbiBjYXNlIGFueSBpbi1wbGFjZVxuICAvLyBhbHRlcmF0aW9ucyBhcmUgcGVyZm9ybWVkIHRvIHRoZSBgcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydGAgY2FsbCByZXN1bHRzIGluIGFwcFxuICAvLyBjb2RlLlxuICByZXR1cm4gWy4uLlRFU1RBQklMSVRZX1BST1ZJREVSU107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RG9tQWRhcHRlcigpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9CUk9XU0VSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdERvbUFkYXB0ZXIsIG11bHRpOiB0cnVlfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogQSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQbGF0Zm9ybVJlZmAgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIGJyb3dzZXIgc2VydmljZVxuICogcHJvdmlkZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyJywgSU5URVJOQUxfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIEludGVybmFsIG1hcmtlciB0byBzaWduYWwgd2hldGhlciBwcm92aWRlcnMgZnJvbSB0aGUgYEJyb3dzZXJNb2R1bGVgIGFyZSBhbHJlYWR5IHByZXNlbnQgaW4gREkuXG4gKiBUaGlzIGlzIG5lZWRlZCB0byBhdm9pZCBsb2FkaW5nIGBCcm93c2VyTW9kdWxlYCBwcm92aWRlcnMgdHdpY2UuIFdlIGNhbid0IHJlbHkgb24gdGhlXG4gKiBgQnJvd3Nlck1vZHVsZWAgcHJlc2VuY2UgaXRzZWxmLCBzaW5jZSB0aGUgc3RhbmRhbG9uZS1iYXNlZCBib290c3RyYXAganVzdCBpbXBvcnRzXG4gKiBgQnJvd3Nlck1vZHVsZWAgcHJvdmlkZXJzIHdpdGhvdXQgcmVmZXJlbmNpbmcgdGhlIG1vZHVsZSBpdHNlbGYuXG4gKi9cbmNvbnN0IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbihOR19ERVZfTU9ERSA/ICdCcm93c2VyTW9kdWxlIFByb3ZpZGVycyBNYXJrZXInIDogJycpO1xuXG5jb25zdCBURVNUQUJJTElUWV9QUk9WSURFUlMgPSBbXG4gIHtcbiAgICBwcm92aWRlOiBURVNUQUJJTElUWV9HRVRURVIsXG4gICAgdXNlQ2xhc3M6IEJyb3dzZXJHZXRUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbXSxcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFRFU1RBQklMSVRZLFxuICAgIHVzZUNsYXNzOiBUZXN0YWJpbGl0eSxcbiAgICBkZXBzOiBbTmdab25lLCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBURVNUQUJJTElUWV9HRVRURVJdXG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBUZXN0YWJpbGl0eSwgIC8vIEFsc28gcHJvdmlkZSBhcyBgVGVzdGFiaWxpdHlgIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eS5cbiAgICB1c2VDbGFzczogVGVzdGFiaWxpdHksXG4gICAgZGVwczogW05nWm9uZSwgVGVzdGFiaWxpdHlSZWdpc3RyeSwgVEVTVEFCSUxJVFlfR0VUVEVSXVxuICB9XG5dO1xuXG5jb25zdCBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBJTkpFQ1RPUl9TQ09QRSwgdXNlVmFsdWU6ICdyb290J30sXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LCB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmUsIFBMQVRGT1JNX0lEXVxuICB9LFxuICB7cHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZSwgZGVwczogW0RPQ1VNRU5UXX0sXG4gIERvbVJlbmRlcmVyRmFjdG9yeTIsIFNoYXJlZFN0eWxlc0hvc3QsIEV2ZW50TWFuYWdlcixcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBCcm93c2VyWGhyLCBkZXBzOiBbXX0sXG4gIE5HX0RFVl9NT0RFID8ge3Byb3ZpZGU6IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIsIHVzZVZhbHVlOiB0cnVlfSA6IFtdXG5dO1xuXG4vKipcbiAqIEV4cG9ydHMgcmVxdWlyZWQgaW5mcmFzdHJ1Y3R1cmUgZm9yIGFsbCBBbmd1bGFyIGFwcHMuXG4gKiBJbmNsdWRlZCBieSBkZWZhdWx0IGluIGFsbCBBbmd1bGFyIGFwcHMgY3JlYXRlZCB3aXRoIHRoZSBDTElcbiAqIGBuZXdgIGNvbW1hbmQuXG4gKiBSZS1leHBvcnRzIGBDb21tb25Nb2R1bGVgIGFuZCBgQXBwbGljYXRpb25Nb2R1bGVgLCBtYWtpbmcgdGhlaXJcbiAqIGV4cG9ydHMgYW5kIHByb3ZpZGVycyBhdmFpbGFibGUgdG8gYWxsIGFwcHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsuLi5CUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsIC4uLlRFU1RBQklMSVRZX1BST1ZJREVSU10sXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEFwcGxpY2F0aW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQnJvd3Nlck1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIEBJbmplY3QoQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTX01BUktFUilcbiAgICAgICAgICAgICAgcHJvdmlkZXJzQWxyZWFkeVByZXNlbnQ6IGJvb2xlYW58bnVsbCkge1xuICAgIGlmIChOR19ERVZfTU9ERSAmJiBwcm92aWRlcnNBbHJlYWR5UHJlc2VudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBQcm92aWRlcnMgZnJvbSB0aGUgXFxgQnJvd3Nlck1vZHVsZVxcYCBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQuIElmIHlvdSBuZWVkIGFjY2VzcyBgICtcbiAgICAgICAgICBgdG8gY29tbW9uIGRpcmVjdGl2ZXMgc3VjaCBhcyBOZ0lmIGFuZCBOZ0ZvciwgaW1wb3J0IHRoZSBcXGBDb21tb25Nb2R1bGVcXGAgaW5zdGVhZC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBhIGJyb3dzZXItYmFzZWQgYXBwIHRvIHRyYW5zaXRpb24gZnJvbSBhIHNlcnZlci1yZW5kZXJlZCBhcHAsIGlmXG4gICAqIG9uZSBpcyBwcmVzZW50IG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCBjb250YWluaW5nIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBhcHAgdG8gdHJhbnNpdGlvbi5cbiAgICogVGhlIElEIG11c3QgbWF0Y2ggYmV0d2VlbiB0aGUgY2xpZW50IGFuZCBzZXJ2ZXIgdmVyc2lvbnMgb2YgdGhlIGFwcC5cbiAgICogQHJldHVybnMgVGhlIHJlY29uZmlndXJlZCBgQnJvd3Nlck1vZHVsZWAgdG8gaW1wb3J0IGludG8gdGhlIGFwcCdzIHJvb3QgYEFwcE1vZHVsZWAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgQVBQX0lEfSBpbnN0ZWFkIHRvIHNldCB0aGUgYXBwbGljYXRpb24gSUQuXG4gICAqL1xuICBzdGF0aWMgd2l0aFNlcnZlclRyYW5zaXRpb24ocGFyYW1zOiB7YXBwSWQ6IHN0cmluZ30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJyb3dzZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyb3dzZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEFQUF9JRCwgdXNlVmFsdWU6IHBhcmFtcy5hcHBJZH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==