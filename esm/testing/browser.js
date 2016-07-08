/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, AppModule, NgZone, PLATFORM_COMMON_PROVIDERS, PLATFORM_INITIALIZER, createPlatformFactory } from '@angular/core';
import { BrowserModule } from '../src/browser';
import { BrowserDomAdapter } from '../src/browser/browser_adapter';
import { AnimationDriver } from '../src/dom/animation_driver';
import { ELEMENT_PROBE_PROVIDERS } from '../src/dom/debug/ng_probe';
import { BrowserDetection } from './browser_util';
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}
/**
 * Providers for the browser test platform
 *
 * @experimental
 */
export const TEST_BROWSER_PLATFORM_PROVIDERS = [
    PLATFORM_COMMON_PROVIDERS,
    { provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const browserTestPlatform = createPlatformFactory('browserTest', TEST_BROWSER_PLATFORM_PROVIDERS);
export class BrowserTestModule {
}
/** @nocollapse */
BrowserTestModule.decorators = [
    { type: AppModule, args: [{
                modules: [BrowserModule],
                providers: [
                    { provide: APP_ID, useValue: 'a' }, ELEMENT_PROBE_PROVIDERS,
                    { provide: NgZone, useFactory: createNgZone },
                    { provide: AnimationDriver, useValue: AnimationDriver.NOOP }
                ]
            },] },
];
//# sourceMappingURL=browser.js.map