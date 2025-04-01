/**
 * @license Angular v19.2.4+sha-bd1a755
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider } from '@angular/core';
import { B as BrowserModule } from '../browser.d-DbBsQuw9.js';
import '@angular/common';

/**
 * Platform for testing
 *
 * @publicApi
 */
declare const platformBrowserTesting: (extraProviders?: StaticProvider[]) => i0.PlatformRef;
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
