/**
 * @license Angular v9.1.0-next.1+45.sha-71b5970
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

import { NgZone } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { StaticProvider } from '@angular/core';

/**
 * NgModule for testing.
 *
 * @publicApi
 */
export declare class BrowserTestingModule {
}

/**
 * Platform for testing
 *
 * @publicApi
 */
export declare const platformBrowserTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

export declare function ɵangular_packages_platform_browser_testing_testing_a(): NgZone;

export { }
