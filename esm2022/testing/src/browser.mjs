/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { APP_ID, createPlatformFactory, NgModule, PLATFORM_INITIALIZER, platformCore, ɵinternalProvideZoneChangeDetection as internalProvideZoneChangeDetection, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵChangeDetectionSchedulerImpl as ChangeDetectionSchedulerImpl, } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import * as i0 from "@angular/core";
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
}
const _TEST_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true },
];
/**
 * Platform for testing
 *
 * @publicApi
 */
export const platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
export class BrowserTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            internalProvideZoneChangeDetection({}),
            { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
            { provide: PlatformLocation, useClass: MockPlatformLocation },
        ], imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        internalProvideZoneChangeDetection({}),
                        { provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl },
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0wsTUFBTSxFQUNOLHFCQUFxQixFQUNyQixRQUFRLEVBQ1Isb0JBQW9CLEVBQ3BCLFlBQVksRUFFWixtQ0FBbUMsSUFBSSxrQ0FBa0MsRUFDekUseUJBQXlCLElBQUksd0JBQXdCLEVBQ3JELDZCQUE2QixJQUFJLDRCQUE0QixHQUM5RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsYUFBYSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRWpHLFNBQVMsZ0JBQWdCO0lBQ3ZCLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFFRCxNQUFNLGdDQUFnQyxHQUFxQjtJQUN6RCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztDQUN6RSxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLHFCQUFxQixDQUN6RCxZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGdDQUFnQyxDQUNqQyxDQUFDO0FBRUY7Ozs7R0FJRztBQVVILE1BQU0sT0FBTyxvQkFBb0I7eUhBQXBCLG9CQUFvQjswSEFBcEIsb0JBQW9CLFlBUnJCLGFBQWE7MEhBUVosb0JBQW9CLGFBUHBCO1lBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7WUFDaEMsa0NBQWtDLENBQUMsRUFBRSxDQUFDO1lBQ3RDLEVBQUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSw0QkFBNEIsRUFBQztZQUM5RSxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7U0FDNUQsWUFOUyxhQUFhOztzR0FRWixvQkFBb0I7a0JBVGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7d0JBQ2hDLGtDQUFrQyxDQUFDLEVBQUUsQ0FBQzt3QkFDdEMsRUFBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLDRCQUE0QixFQUFDO3dCQUM5RSxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7cUJBQzVEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vY2tQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24vdGVzdGluZyc7XG5pbXBvcnQge1xuICBBUFBfSUQsXG4gIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSxcbiAgTmdNb2R1bGUsXG4gIFBMQVRGT1JNX0lOSVRJQUxJWkVSLFxuICBwbGF0Zm9ybUNvcmUsXG4gIFN0YXRpY1Byb3ZpZGVyLFxuICDJtWludGVybmFsUHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24gYXMgaW50ZXJuYWxQcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbixcbiAgybVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLFxuICDJtUNoYW5nZURldGVjdGlvblNjaGVkdWxlckltcGwgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVySW1wbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xufVxuXG5jb25zdCBfVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdEJyb3dzZXJUZXN0cywgbXVsdGk6IHRydWV9LFxuXTtcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlclRlc3RpbmcgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gIHBsYXRmb3JtQ29yZSxcbiAgJ2Jyb3dzZXJUZXN0aW5nJyxcbiAgX1RFU1RfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlMsXG4pO1xuXG4vKipcbiAqIE5nTW9kdWxlIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQVBQX0lELCB1c2VWYWx1ZTogJ2EnfSxcbiAgICBpbnRlcm5hbFByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uKHt9KSxcbiAgICB7cHJvdmlkZTogQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLCB1c2VFeGlzdGluZzogQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVySW1wbH0sXG4gICAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBNb2NrUGxhdGZvcm1Mb2NhdGlvbn0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUZXN0aW5nTW9kdWxlIHt9XG4iXX0=