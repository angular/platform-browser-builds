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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.6+sha-1391928", ngImport: i0, type: BrowserModule, deps: [{ token: BROWSER_MODULE_PROVIDERS_MARKER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.6+sha-1391928", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.6+sha-1391928", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.6+sha-1391928", ngImport: i0, type: BrowserModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFlBQVksRUFDWixRQUFRLEVBQ1IsVUFBVSxFQUNWLG9CQUFvQixJQUFJLG1CQUFtQixHQUM1QyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxNQUFNLEVBRU4saUJBQWlCLEVBRWpCLHFCQUFxQixFQUNyQixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFFZCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLFlBQVksRUFHWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUVSLFdBQVcsRUFDWCxtQkFBbUIsRUFFbkIsZUFBZSxJQUFJLGNBQWMsRUFDakMsMEJBQTBCLElBQUkseUJBQXlCLEVBQ3ZELGFBQWEsSUFBSSxZQUFZLEVBQzdCLFlBQVksRUFDWixZQUFZLElBQUksV0FBVyxFQUMzQixtQkFBbUIsSUFBSSxrQkFBa0IsR0FDMUMsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9F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LE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUF1QjtRQUNqRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7eUhBL0JVLGFBQWEsa0JBSWQsK0JBQStCOzBIQUo5QixhQUFhLFlBRmQsWUFBWSxFQUFFLGlCQUFpQjswSEFFOUIsYUFBYSxhQUhiLENBQUMsR0FBRyx3QkFBd0IsRUFBRSxHQUFHLHFCQUFxQixDQUFDLFlBQ3hELFlBQVksRUFBRSxpQkFBaUI7O3NHQUU5QixhQUFhO2tCQUp6QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLEdBQUcsd0JBQXdCLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztvQkFDbEUsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2lCQUMzQzs7MEJBR0ksUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsTUFBTTsyQkFBQywrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbW1vbk1vZHVsZSxcbiAgRE9DVU1FTlQsXG4gIFhockZhY3RvcnksXG4gIMm1UExBVEZPUk1fQlJPV1NFUl9JRCBhcyBQTEFURk9STV9CUk9XU0VSX0lELFxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQVBQX0lELFxuICBBcHBsaWNhdGlvbkNvbmZpZyBhcyBBcHBsaWNhdGlvbkNvbmZpZ0Zyb21Db3JlLFxuICBBcHBsaWNhdGlvbk1vZHVsZSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSxcbiAgRXJyb3JIYW5kbGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgTmdab25lLFxuICBPcHRpb25hbCxcbiAgUExBVEZPUk1fSUQsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICBwbGF0Zm9ybUNvcmUsXG4gIFBsYXRmb3JtUmVmLFxuICBQcm92aWRlcixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgU2tpcFNlbGYsXG4gIFN0YXRpY1Byb3ZpZGVyLFxuICBUZXN0YWJpbGl0eSxcbiAgVGVzdGFiaWxpdHlSZWdpc3RyeSxcbiAgVHlwZSxcbiAgybVJTkpFQ1RPUl9TQ09QRSBhcyBJTkpFQ1RPUl9TQ09QRSxcbiAgybVpbnRlcm5hbENyZWF0ZUFwcGxpY2F0aW9uIGFzIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24sXG4gIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcixcbiAgybVzZXREb2N1bWVudCxcbiAgybVURVNUQUJJTElUWSBhcyBURVNUQUJJTElUWSxcbiAgybVURVNUQUJJTElUWV9HRVRURVIgYXMgVEVTVEFCSUxJVFlfR0VUVEVSLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnLi9icm93c2VyL3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9icm93c2VyL3hocic7XG5pbXBvcnQge0RvbVJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJy4vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnLi9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtFdmVudERlbGVnYXRpb25QbHVnaW59IGZyb20gJy4vZG9tL2V2ZW50cy9ldmVudF9kZWxlZ2F0aW9uJztcbmltcG9ydCB7RVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXJ9IGZyb20gJy4vZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7S2V5RXZlbnRzUGx1Z2lufSBmcm9tICcuL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge1NoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vZG9tL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBTZXQgb2YgY29uZmlnIG9wdGlvbnMgYXZhaWxhYmxlIGR1cmluZyB0aGUgYXBwbGljYXRpb24gYm9vdHN0cmFwIG9wZXJhdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKlxuICogQGRlcHJlY2F0ZWRcbiAqIGBBcHBsaWNhdGlvbkNvbmZpZ2AgaGFzIG1vdmVkLCBwbGVhc2UgaW1wb3J0IGBBcHBsaWNhdGlvbkNvbmZpZ2AgZnJvbSBgQGFuZ3VsYXIvY29yZWAgaW5zdGVhZC5cbiAqL1xuLy8gVGhlIGJlbG93IGlzIGEgd29ya2Fyb3VuZCB0byBhZGQgYSBkZXByZWNhdGVkIG1lc3NhZ2UuXG50eXBlIEFwcGxpY2F0aW9uQ29uZmlnID0gQXBwbGljYXRpb25Db25maWdGcm9tQ29yZTtcbmV4cG9ydCB7QXBwbGljYXRpb25Db25maWd9O1xuXG4vKipcbiAqIEJvb3RzdHJhcHMgYW4gaW5zdGFuY2Ugb2YgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBhbmQgcmVuZGVycyBhIHN0YW5kYWxvbmUgY29tcG9uZW50IGFzIHRoZVxuICogYXBwbGljYXRpb24ncyByb290IGNvbXBvbmVudC4gTW9yZSBpbmZvcm1hdGlvbiBhYm91dCBzdGFuZGFsb25lIGNvbXBvbmVudHMgY2FuIGJlIGZvdW5kIGluIFt0aGlzXG4gKiBndWlkZV0oZ3VpZGUvY29tcG9uZW50cy9pbXBvcnRpbmcpLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBUaGUgcm9vdCBjb21wb25lbnQgcGFzc2VkIGludG8gdGhpcyBmdW5jdGlvbiAqbXVzdCogYmUgYSBzdGFuZGFsb25lIG9uZSAoc2hvdWxkIGhhdmUgdGhlXG4gKiBgc3RhbmRhbG9uZTogdHJ1ZWAgZmxhZyBpbiB0aGUgYEBDb21wb25lbnRgIGRlY29yYXRvciBjb25maWcpLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzdGFuZGFsb25lOiB0cnVlLFxuICogICB0ZW1wbGF0ZTogJ0hlbGxvIHdvcmxkISdcbiAqIH0pXG4gKiBjbGFzcyBSb290Q29tcG9uZW50IHt9XG4gKlxuICogY29uc3QgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiA9IGF3YWl0IGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQpO1xuICogYGBgXG4gKlxuICogWW91IGNhbiBhZGQgdGhlIGxpc3Qgb2YgcHJvdmlkZXJzIHRoYXQgc2hvdWxkIGJlIGF2YWlsYWJsZSBpbiB0aGUgYXBwbGljYXRpb24gaW5qZWN0b3IgYnlcbiAqIHNwZWNpZnlpbmcgdGhlIGBwcm92aWRlcnNgIGZpZWxkIGluIGFuIG9iamVjdCBwYXNzZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudDpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhd2FpdCBib290c3RyYXBBcHBsaWNhdGlvbihSb290Q29tcG9uZW50LCB7XG4gKiAgIHByb3ZpZGVyczogW1xuICogICAgIHtwcm92aWRlOiBCQUNLRU5EX1VSTCwgdXNlVmFsdWU6ICdodHRwczovL3lvdXJkb21haW4uY29tL2FwaSd9XG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhlIGBpbXBvcnRQcm92aWRlcnNGcm9tYCBoZWxwZXIgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGNvbGxlY3QgYWxsIHByb3ZpZGVycyBmcm9tIGFueVxuICogZXhpc3RpbmcgTmdNb2R1bGUgKGFuZCB0cmFuc2l0aXZlbHkgZnJvbSBhbGwgTmdNb2R1bGVzIHRoYXQgaXQgaW1wb3J0cyk6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBpbXBvcnRQcm92aWRlcnNGcm9tKFNvbWVOZ01vZHVsZSlcbiAqICAgXVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBOb3RlOiB0aGUgYGJvb3RzdHJhcEFwcGxpY2F0aW9uYCBtZXRob2QgZG9lc24ndCBpbmNsdWRlIFtUZXN0YWJpbGl0eV0oYXBpL2NvcmUvVGVzdGFiaWxpdHkpIGJ5XG4gKiBkZWZhdWx0LiBZb3UgY2FuIGFkZCBbVGVzdGFiaWxpdHldKGFwaS9jb3JlL1Rlc3RhYmlsaXR5KSBieSBnZXR0aW5nIHRoZSBsaXN0IG9mIG5lY2Vzc2FyeVxuICogcHJvdmlkZXJzIHVzaW5nIGBwcm92aWRlUHJvdHJhY3RvclRlc3RpbmdTdXBwb3J0KClgIGZ1bmN0aW9uIGFuZCBhZGRpbmcgdGhlbSBpbnRvIHRoZSBgcHJvdmlkZXJzYFxuICogYXJyYXksIGZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7cHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4gKlxuICogYXdhaXQgYm9vdHN0cmFwQXBwbGljYXRpb24oUm9vdENvbXBvbmVudCwge3Byb3ZpZGVyczogW3Byb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnQoKV19KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSByb290Q29tcG9uZW50IEEgcmVmZXJlbmNlIHRvIGEgc3RhbmRhbG9uZSBjb21wb25lbnQgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgYm9vdHN0cmFwIG9wZXJhdGlvbiwgc2VlIGBBcHBsaWNhdGlvbkNvbmZpZ2AgZm9yXG4gKiAgICAgYWRkaXRpb25hbCBpbmZvLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmV0dXJucyBhbiBgQXBwbGljYXRpb25SZWZgIGluc3RhbmNlIG9uY2UgcmVzb2x2ZWQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwQXBwbGljYXRpb24oXG4gIHJvb3RDb21wb25lbnQ6IFR5cGU8dW5rbm93bj4sXG4gIG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZyxcbik6IFByb21pc2U8QXBwbGljYXRpb25SZWY+IHtcbiAgcmV0dXJuIGludGVybmFsQ3JlYXRlQXBwbGljYXRpb24oe3Jvb3RDb21wb25lbnQsIC4uLmNyZWF0ZVByb3ZpZGVyc0NvbmZpZyhvcHRpb25zKX0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIHdpdGhvdXQgYm9vdHN0cmFwcGluZyBhbnkgY29tcG9uZW50cy4gVGhpcyBpcyB1c2VmdWxcbiAqIGZvciB0aGUgc2l0dWF0aW9uIHdoZXJlIG9uZSB3YW50cyB0byBkZWNvdXBsZSBhcHBsaWNhdGlvbiBlbnZpcm9ubWVudCBjcmVhdGlvbiAoYSBwbGF0Zm9ybSBhbmRcbiAqIGFzc29jaWF0ZWQgaW5qZWN0b3JzKSBmcm9tIHJlbmRlcmluZyBjb21wb25lbnRzIG9uIGEgc2NyZWVuLiBDb21wb25lbnRzIGNhbiBiZSBzdWJzZXF1ZW50bHlcbiAqIGJvb3RzdHJhcHBlZCBvbiB0aGUgcmV0dXJuZWQgYEFwcGxpY2F0aW9uUmVmYC5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBFeHRyYSBjb25maWd1cmF0aW9uIGZvciB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQsIHNlZSBgQXBwbGljYXRpb25Db25maWdgIGZvclxuICogICAgIGFkZGl0aW9uYWwgaW5mby5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJldHVybnMgYW4gYEFwcGxpY2F0aW9uUmVmYCBpbnN0YW5jZSBvbmNlIHJlc29sdmVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFwcGxpY2F0aW9uKG9wdGlvbnM/OiBBcHBsaWNhdGlvbkNvbmZpZykge1xuICByZXR1cm4gaW50ZXJuYWxDcmVhdGVBcHBsaWNhdGlvbihjcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlcnNDb25maWcob3B0aW9ucz86IEFwcGxpY2F0aW9uQ29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgYXBwUHJvdmlkZXJzOiBbLi4uQlJPV1NFUl9NT0RVTEVfUFJPVklERVJTLCAuLi4ob3B0aW9ucz8ucHJvdmlkZXJzID8/IFtdKV0sXG4gICAgcGxhdGZvcm1Qcm92aWRlcnM6IElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTLFxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBzZXQgb2YgcHJvdmlkZXJzIHJlcXVpcmVkIHRvIHNldHVwIFtUZXN0YWJpbGl0eV0oYXBpL2NvcmUvVGVzdGFiaWxpdHkpIGZvciBhblxuICogYXBwbGljYXRpb24gYm9vdHN0cmFwcGVkIHVzaW5nIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uLiBUaGUgc2V0IG9mIHByb3ZpZGVycyBpc1xuICogbmVlZGVkIHRvIHN1cHBvcnQgdGVzdGluZyBhbiBhcHBsaWNhdGlvbiB3aXRoIFByb3RyYWN0b3IgKHdoaWNoIHJlbGllcyBvbiB0aGUgVGVzdGFiaWxpdHkgQVBJc1xuICogdG8gYmUgcHJlc2VudCkuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2YgcHJvdmlkZXJzIHJlcXVpcmVkIHRvIHNldHVwIFRlc3RhYmlsaXR5IGZvciBhbiBhcHBsaWNhdGlvbiBhbmQgbWFrZSBpdFxuICogICAgIGF2YWlsYWJsZSBmb3IgdGVzdGluZyB1c2luZyBQcm90cmFjdG9yLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVQcm90cmFjdG9yVGVzdGluZ1N1cHBvcnQoKTogUHJvdmlkZXJbXSB7XG4gIC8vIFJldHVybiBhIGNvcHkgdG8gcHJldmVudCBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbCBhcnJheSBpbiBjYXNlIGFueSBpbi1wbGFjZVxuICAvLyBhbHRlcmF0aW9ucyBhcmUgcGVyZm9ybWVkIHRvIHRoZSBgcHJvdmlkZVByb3RyYWN0b3JUZXN0aW5nU3VwcG9ydGAgY2FsbCByZXN1bHRzIGluIGFwcFxuICAvLyBjb2RlLlxuICByZXR1cm4gWy4uLlRFU1RBQklMSVRZX1BST1ZJREVSU107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RG9tQWRhcHRlcigpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpOiBFcnJvckhhbmRsZXIge1xuICByZXR1cm4gbmV3IEVycm9ySGFuZGxlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2RvY3VtZW50KCk6IGFueSB7XG4gIC8vIFRlbGwgaXZ5IGFib3V0IHRoZSBnbG9iYWwgZG9jdW1lbnRcbiAgybVzZXREb2N1bWVudChkb2N1bWVudCk7XG4gIHJldHVybiBkb2N1bWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogUExBVEZPUk1fSUQsIHVzZVZhbHVlOiBQTEFURk9STV9CUk9XU0VSX0lEfSxcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdERvbUFkYXB0ZXIsIG11bHRpOiB0cnVlfSxcbiAge3Byb3ZpZGU6IERPQ1VNRU5ULCB1c2VGYWN0b3J5OiBfZG9jdW1lbnQsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogQSBmYWN0b3J5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGBQbGF0Zm9ybVJlZmAgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIGJyb3dzZXIgc2VydmljZVxuICogcHJvdmlkZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlcjogKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYgPVxuICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnYnJvd3NlcicsIElOVEVSTkFMX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBtYXJrZXIgdG8gc2lnbmFsIHdoZXRoZXIgcHJvdmlkZXJzIGZyb20gdGhlIGBCcm93c2VyTW9kdWxlYCBhcmUgYWxyZWFkeSBwcmVzZW50IGluIERJLlxuICogVGhpcyBpcyBuZWVkZWQgdG8gYXZvaWQgbG9hZGluZyBgQnJvd3Nlck1vZHVsZWAgcHJvdmlkZXJzIHR3aWNlLiBXZSBjYW4ndCByZWx5IG9uIHRoZVxuICogYEJyb3dzZXJNb2R1bGVgIHByZXNlbmNlIGl0c2VsZiwgc2luY2UgdGhlIHN0YW5kYWxvbmUtYmFzZWQgYm9vdHN0cmFwIGp1c3QgaW1wb3J0c1xuICogYEJyb3dzZXJNb2R1bGVgIHByb3ZpZGVycyB3aXRob3V0IHJlZmVyZW5jaW5nIHRoZSBtb2R1bGUgaXRzZWxmLlxuICovXG5jb25zdCBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlNfTUFSS0VSID0gbmV3IEluamVjdGlvblRva2VuKFxuICB0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUgPyAnQnJvd3Nlck1vZHVsZSBQcm92aWRlcnMgTWFya2VyJyA6ICcnLFxuKTtcblxuY29uc3QgVEVTVEFCSUxJVFlfUFJPVklERVJTID0gW1xuICB7XG4gICAgcHJvdmlkZTogVEVTVEFCSUxJVFlfR0VUVEVSLFxuICAgIHVzZUNsYXNzOiBCcm93c2VyR2V0VGVzdGFiaWxpdHksXG4gICAgZGVwczogW10sXG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBURVNUQUJJTElUWSxcbiAgICB1c2VDbGFzczogVGVzdGFiaWxpdHksXG4gICAgZGVwczogW05nWm9uZSwgVGVzdGFiaWxpdHlSZWdpc3RyeSwgVEVTVEFCSUxJVFlfR0VUVEVSXSxcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFRlc3RhYmlsaXR5LCAvLyBBbHNvIHByb3ZpZGUgYXMgYFRlc3RhYmlsaXR5YCBmb3IgYmFja3dhcmRzLWNvbXBhdGliaWxpdHkuXG4gICAgdXNlQ2xhc3M6IFRlc3RhYmlsaXR5LFxuICAgIGRlcHM6IFtOZ1pvbmUsIFRlc3RhYmlsaXR5UmVnaXN0cnksIFRFU1RBQklMSVRZX0dFVFRFUl0sXG4gIH0sXG5dO1xuXG5jb25zdCBCUk9XU0VSX01PRFVMRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBJTkpFQ1RPUl9TQ09QRSwgdXNlVmFsdWU6ICdyb290J30sXG4gIHtwcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUZhY3Rvcnk6IGVycm9ySGFuZGxlciwgZGVwczogW119LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0RPQ1VNRU5ULCBOZ1pvbmUsIFBMQVRGT1JNX0lEXSxcbiAgfSxcbiAge3Byb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUywgdXNlQ2xhc3M6IEtleUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWUsIGRlcHM6IFtET0NVTUVOVF19LFxuICB7XG4gICAgcHJvdmlkZTogRVZFTlRfTUFOQUdFUl9QTFVHSU5TLFxuICAgIHVzZUNsYXNzOiBFdmVudERlbGVnYXRpb25QbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gIH0sXG4gIERvbVJlbmRlcmVyRmFjdG9yeTIsXG4gIFNoYXJlZFN0eWxlc0hvc3QsXG4gIEV2ZW50TWFuYWdlcixcbiAge3Byb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsIHVzZUV4aXN0aW5nOiBEb21SZW5kZXJlckZhY3RvcnkyfSxcbiAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUNsYXNzOiBCcm93c2VyWGhyLCBkZXBzOiBbXX0sXG4gIHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZVxuICAgID8ge3Byb3ZpZGU6IEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIsIHVzZVZhbHVlOiB0cnVlfVxuICAgIDogW10sXG5dO1xuXG4vKipcbiAqIEV4cG9ydHMgcmVxdWlyZWQgaW5mcmFzdHJ1Y3R1cmUgZm9yIGFsbCBBbmd1bGFyIGFwcHMuXG4gKiBJbmNsdWRlZCBieSBkZWZhdWx0IGluIGFsbCBBbmd1bGFyIGFwcHMgY3JlYXRlZCB3aXRoIHRoZSBDTElcbiAqIGBuZXdgIGNvbW1hbmQuXG4gKiBSZS1leHBvcnRzIGBDb21tb25Nb2R1bGVgIGFuZCBgQXBwbGljYXRpb25Nb2R1bGVgLCBtYWtpbmcgdGhlaXJcbiAqIGV4cG9ydHMgYW5kIHByb3ZpZGVycyBhdmFpbGFibGUgdG8gYWxsIGFwcHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFsuLi5CUk9XU0VSX01PRFVMRV9QUk9WSURFUlMsIC4uLlRFU1RBQklMSVRZX1BST1ZJREVSU10sXG4gIGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIEFwcGxpY2F0aW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQnJvd3Nlck1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQFNraXBTZWxmKClcbiAgICBASW5qZWN0KEJST1dTRVJfTU9EVUxFX1BST1ZJREVSU19NQVJLRVIpXG4gICAgcHJvdmlkZXJzQWxyZWFkeVByZXNlbnQ6IGJvb2xlYW4gfCBudWxsLFxuICApIHtcbiAgICBpZiAoKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgcHJvdmlkZXJzQWxyZWFkeVByZXNlbnQpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuQlJPV1NFUl9NT0RVTEVfQUxSRUFEWV9MT0FERUQsXG4gICAgICAgIGBQcm92aWRlcnMgZnJvbSB0aGUgXFxgQnJvd3Nlck1vZHVsZVxcYCBoYXZlIGFscmVhZHkgYmVlbiBsb2FkZWQuIElmIHlvdSBuZWVkIGFjY2VzcyBgICtcbiAgICAgICAgICBgdG8gY29tbW9uIGRpcmVjdGl2ZXMgc3VjaCBhcyBOZ0lmIGFuZCBOZ0ZvciwgaW1wb3J0IHRoZSBcXGBDb21tb25Nb2R1bGVcXGAgaW5zdGVhZC5gLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBhIGJyb3dzZXItYmFzZWQgYXBwIHRvIHRyYW5zaXRpb24gZnJvbSBhIHNlcnZlci1yZW5kZXJlZCBhcHAsIGlmXG4gICAqIG9uZSBpcyBwcmVzZW50IG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCBjb250YWluaW5nIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBhcHAgdG8gdHJhbnNpdGlvbi5cbiAgICogVGhlIElEIG11c3QgbWF0Y2ggYmV0d2VlbiB0aGUgY2xpZW50IGFuZCBzZXJ2ZXIgdmVyc2lvbnMgb2YgdGhlIGFwcC5cbiAgICogQHJldHVybnMgVGhlIHJlY29uZmlndXJlZCBgQnJvd3Nlck1vZHVsZWAgdG8gaW1wb3J0IGludG8gdGhlIGFwcCdzIHJvb3QgYEFwcE1vZHVsZWAuXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgQVBQX0lEfSBpbnN0ZWFkIHRvIHNldCB0aGUgYXBwbGljYXRpb24gSUQuXG4gICAqL1xuICBzdGF0aWMgd2l0aFNlcnZlclRyYW5zaXRpb24ocGFyYW1zOiB7YXBwSWQ6IHN0cmluZ30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEJyb3dzZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEJyb3dzZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogcGFyYW1zLmFwcElkfV0sXG4gICAgfTtcbiAgfVxufVxuIl19