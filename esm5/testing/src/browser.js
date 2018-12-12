/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, NgModule, NgZone, PLATFORM_INITIALIZER, createPlatformFactory, platformCore } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as BrowserDomAdapter, ɵELEMENT_PROBE_PROVIDERS as ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { BrowserDetection, createNgZone } from './browser_util';
import * as i0 from "@angular/core";
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/**
 * Platform for testing
 *
 * @publicApi
 */
export var platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
var BrowserTestingModule = /** @class */ (function () {
    function BrowserTestingModule() {
    }
    BrowserTestingModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserTestingModule, bootstrap: [], declarations: [], imports: [], exports: [BrowserModule] });
    BrowserTestingModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserTestingModule_Factory(t) { return new (t || BrowserTestingModule)(); }, providers: [
            { provide: APP_ID, useValue: 'a' },
            ELEMENT_PROBE_PROVIDERS,
            { provide: NgZone, useFactory: createNgZone },
        ], imports: [[BrowserModule]] });
    return BrowserTestingModule;
}());
export { BrowserTestingModule };
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserTestingModule, [{
        type: NgModule,
        args: [{
                exports: [BrowserModule],
                providers: [
                    { provide: APP_ID, useValue: 'a' },
                    ELEMENT_PROBE_PROVIDERS,
                    { provide: NgZone, useFactory: createNgZone },
                ]
            }]
    }], null, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQStCLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQUMsYUFBYSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEosT0FBTyxFQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUU5RCxTQUFTLGdCQUFnQjtJQUN2QixpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBRUQsSUFBTSxnQ0FBZ0MsR0FDbEMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFFL0U7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUMvQixxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztBQUU1Rjs7OztHQUlHO0FBQ0g7SUFBQTtLQVNDO2tFQURZLG9CQUFvQiwwREFQckIsYUFBYTtrSUFPWixvQkFBb0IsbUJBTnBCO1lBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7WUFDaEMsdUJBQXVCO1lBQ3ZCLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDO1NBQzVDLFlBTFEsQ0FBQyxhQUFhLENBQUM7K0JBakMxQjtDQXlDQyxBQVRELElBU0M7U0FEWSxvQkFBb0I7bUNBQXBCLG9CQUFvQjtjQVJoQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUN4QixTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7b0JBQ2hDLHVCQUF1QjtvQkFDdkIsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUM7aUJBQzVDO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FQUF9JRCwgTmdNb2R1bGUsIE5nWm9uZSwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBsYXRmb3JtUmVmLCBTdGF0aWNQcm92aWRlciwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBwbGF0Zm9ybUNvcmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCDJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyLCDJtUVMRU1FTlRfUFJPQkVfUFJPVklERVJTIGFzIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QnJvd3NlckRldGVjdGlvbiwgY3JlYXRlTmdab25lfSBmcm9tICcuL2Jyb3dzZXJfdXRpbCc7XG5cbmZ1bmN0aW9uIGluaXRCcm93c2VyVGVzdHMoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIEJyb3dzZXJEZXRlY3Rpb24uc2V0dXAoKTtcbn1cblxuY29uc3QgX1RFU1RfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPVxuICAgIFt7cHJvdmlkZTogUExBVEZPUk1fSU5JVElBTElaRVIsIHVzZVZhbHVlOiBpbml0QnJvd3NlclRlc3RzLCBtdWx0aTogdHJ1ZX1dO1xuXG4vKipcbiAqIFBsYXRmb3JtIGZvciB0ZXN0aW5nXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Ccm93c2VyVGVzdGluZyA9XG4gICAgY3JlYXRlUGxhdGZvcm1GYWN0b3J5KHBsYXRmb3JtQ29yZSwgJ2Jyb3dzZXJUZXN0aW5nJywgX1RFU1RfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMpO1xuXG4vKipcbiAqIE5nTW9kdWxlIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogJ2EnfSxcbiAgICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgICB7cHJvdmlkZTogTmdab25lLCB1c2VGYWN0b3J5OiBjcmVhdGVOZ1pvbmV9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUZXN0aW5nTW9kdWxlIHtcbn1cbiJdfQ==