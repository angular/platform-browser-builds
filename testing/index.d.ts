/**
 * @license Angular v19.2.15+sha-b2c7979
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider, PlatformRef } from '@angular/core';
import { BrowserModule } from '../browser.d-CXj5swf3.js';
import '@angular/common';

/**
 * Platform for testing
 *
 * @publicApi
 */
declare const platformBrowserTesting: (extraProviders?: StaticProvider[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @publicApi
 */
declare class BrowserTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserTestingModule, never, never, [typeof BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserTestingModule>;
}

export { BrowserTestingModule, platformBrowserTesting };
