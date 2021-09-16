/**
 * @license Angular v13.0.0-next.6+20.sha-2292a9c.with-local-changes
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { PlatformRef } from '@angular/core';
import { StaticProvider } from '@angular/core';

/**
 * NgModule for testing.
 *
 * @publicApi
 */
export declare class BrowserTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserTestingModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserTestingModule>;
}

/**
 * Platform for testing
 *
 * @publicApi
 */
export declare const platformBrowserTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

export { }
