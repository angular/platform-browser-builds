import { ErrorHandler, ModuleWithProviders, PlatformRef, StaticProvider } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare function initDomAdapter(): void;
export declare function errorHandler(): ErrorHandler;
export declare function _document(): any;
export declare const INTERNAL_BROWSER_PLATFORM_PROVIDERS: StaticProvider[];
export declare const BROWSER_SANITIZATION_PROVIDERS__POST_R3__: never[];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](https://g.co/ng/security).
 * @publicApi
 */
export declare const BROWSER_SANITIZATION_PROVIDERS: StaticProvider[];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
export declare const platformBrowser: (extraProviders?: StaticProvider[]) => PlatformRef;
export declare const BROWSER_MODULE_PROVIDERS: StaticProvider[];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
export declare class BrowserModule {
    constructor(parentModule: BrowserModule | null);
    /**
     * Configures a browser-based app to transition from a server-rendered app, if
     * one is present on the page.
     *
     * @param params An object containing an identifier for the app to transition.
     * The ID must match between the client and server versions of the app.
     * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
     */
    static withServerTransition(params: {
        appId: string;
    }): ModuleWithProviders<BrowserModule>;
    static ɵfac: i0.ɵɵFactoryDef<BrowserModule, [{ optional: true; skipSelf: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<BrowserModule, never, never, [typeof i1.CommonModule, typeof i0.ApplicationModule]>;
    static ɵinj: i0.ɵɵInjectorDef<BrowserModule>;
}
