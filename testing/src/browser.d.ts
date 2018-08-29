import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef, StaticProvider } from '@angular/core';
/**
 * Platform for testing
 *
 *
 */
export declare const platformBrowserTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;
/**
 * NgModule for testing.
 *
 *
 */
export declare class BrowserTestingModule {
    static ngModuleDef: i0.ɵNgModuleDef<BrowserTestingModule, never, never, [typeof i1.BrowserModule]>;
    static ngInjectorDef: i0.ɵInjectorDef<BrowserTestingModule>;
}
