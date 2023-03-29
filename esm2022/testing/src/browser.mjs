/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { APP_ID, createPlatformFactory, NgModule, PLATFORM_INITIALIZER, platformCore, ɵprovideNgZoneChangeDetection as provideNgZoneChangeDetection } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import { BrowserDetection, createNgZone } from './browser_util';
import * as i0 from "@angular/core";
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
const _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
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
class BrowserTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.4+sha-9c5fd50", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.0-next.4+sha-9c5fd50", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.0-next.4+sha-9c5fd50", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            provideNgZoneChangeDetection(createNgZone()),
            { provide: PlatformLocation, useClass: MockPlatformLocation },
        ], imports: [BrowserModule] }); }
}
export { BrowserTestingModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.4+sha-9c5fd50", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        provideNgZoneChangeDetection(createNgZone()),
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQWtCLDZCQUE2QixJQUFJLDRCQUE0QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVqRyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTlELFNBQVMsZ0JBQWdCO0lBQ3ZCLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFFRCxNQUFNLGdDQUFnQyxHQUNsQyxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUUvRTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQy9CLHFCQUFxQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTVGOzs7O0dBSUc7QUFDSCxNQVFhLG9CQUFvQjt5SEFBcEIsb0JBQW9COzBIQUFwQixvQkFBb0IsWUFQckIsYUFBYTswSEFPWixvQkFBb0IsYUFOcEI7WUFDVCxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQztZQUNoQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7U0FDNUQsWUFMUyxhQUFhOztTQU9aLG9CQUFvQjtzR0FBcEIsb0JBQW9CO2tCQVJoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO3dCQUNoQyw0QkFBNEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDNUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO3FCQUM1RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNb2NrUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3Rlc3RpbmcnO1xuaW1wb3J0IHtBUFBfSUQsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgTmdNb2R1bGUsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBwbGF0Zm9ybUNvcmUsIFN0YXRpY1Byb3ZpZGVyLCDJtXByb3ZpZGVOZ1pvbmVDaGFuZ2VEZXRlY3Rpb24gYXMgcHJvdmlkZU5nWm9uZUNoYW5nZURldGVjdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQge0Jyb3dzZXJEZXRlY3Rpb24sIGNyZWF0ZU5nWm9uZX0gZnJvbSAnLi9icm93c2VyX3V0aWwnO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICBCcm93c2VyRGV0ZWN0aW9uLnNldHVwKCk7XG59XG5cbmNvbnN0IF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID1cbiAgICBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdEJyb3dzZXJUZXN0cywgbXVsdGk6IHRydWV9XTtcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlclRlc3RpbmcgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyVGVzdGluZycsIF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEFQUF9JRCwgdXNlVmFsdWU6ICdhJ30sXG4gICAgcHJvdmlkZU5nWm9uZUNoYW5nZURldGVjdGlvbihjcmVhdGVOZ1pvbmUoKSksXG4gICAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBNb2NrUGxhdGZvcm1Mb2NhdGlvbn0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQnJvd3NlclRlc3RpbmdNb2R1bGUge1xufVxuIl19