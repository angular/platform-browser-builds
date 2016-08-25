/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ClassProvider, ExistingProvider, FactoryProvider, PlatformRef, TypeProvider, ValueProvider } from '@angular/core';
/**
 * Platform for testing
 *
 * @stable
 */
export declare const platformBrowserTesting: (extraProviders?: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @stable
 */
export declare class BrowserTestingModule {
}
