/**
 * @license Angular v19.2.2+sha-9291d52
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import * as i0 from '@angular/core';
import { createPlatformFactory, platformCore, PLATFORM_INITIALIZER, APP_ID, ɵinternalProvideZoneChangeDetection as _internalProvideZoneChangeDetection, ɵChangeDetectionSchedulerImpl as _ChangeDetectionSchedulerImpl, ɵChangeDetectionScheduler as _ChangeDetectionScheduler, NgModule } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as _BrowserDomAdapter } from '@angular/platform-browser';

function initBrowserTests() {
    _BrowserDomAdapter.makeCurrent();
}
const _TEST_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true },
];
/**
 * Platform for testing
 *
 * @publicApi
 */
const platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class BrowserTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2+sha-9291d52", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.2.2+sha-9291d52", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.2.2+sha-9291d52", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            _internalProvideZoneChangeDetection({}),
            { provide: _ChangeDetectionScheduler, useExisting: _ChangeDetectionSchedulerImpl },
            { provide: PlatformLocation, useClass: MockPlatformLocation },
        ], imports: [BrowserModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2+sha-9291d52", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        _internalProvideZoneChangeDetection({}),
                        { provide: _ChangeDetectionScheduler, useExisting: _ChangeDetectionSchedulerImpl },
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                    ],
                }]
        }] });

export { BrowserTestingModule, platformBrowserTesting };
//# sourceMappingURL=testing.mjs.map
