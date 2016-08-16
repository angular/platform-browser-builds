/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef } from '@angular/core';
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformBrowserTesting: (extraProviders?: any[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @experimental
 */
export declare class BrowserTestingModule {
}
