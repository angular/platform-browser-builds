/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { APP_ID, createPlatformFactory, NgModule, PLATFORM_INITIALIZER, platformCore, ɵinternalProvideZoneChangeDetection as internalProvideZoneChangeDetection, } from '@angular/core';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-rc.2+sha-69a8399", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-rc.2+sha-69a8399", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-rc.2+sha-69a8399", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            internalProvideZoneChangeDetection({}),
            { provide: PlatformLocation, useClass: MockPlatformLocation },
        ], imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-rc.2+sha-69a8399", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        internalProvideZoneChangeDetection({}),
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0wsTUFBTSxFQUNOLHFCQUFxQixFQUNyQixRQUFRLEVBQ1Isb0JBQW9CLEVBQ3BCLFlBQVksRUFFWixtQ0FBbUMsSUFBSSxrQ0FBa0MsR0FDMUUsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGFBQWEsRUFBRSxrQkFBa0IsSUFBSSxpQkFBaUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUVqRyxTQUFTLGdCQUFnQjtJQUN2QixpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNsQyxDQUFDO0FBRUQsTUFBTSxnQ0FBZ0MsR0FBcUI7SUFDekQsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7Q0FDekUsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FDekQsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixnQ0FBZ0MsQ0FDakMsQ0FBQztBQUVGOzs7O0dBSUc7QUFTSCxNQUFNLE9BQU8sb0JBQW9CO3lIQUFwQixvQkFBb0I7MEhBQXBCLG9CQUFvQixZQVByQixhQUFhOzBIQU9aLG9CQUFvQixhQU5wQjtZQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO1lBQ2hDLGtDQUFrQyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7U0FDNUQsWUFMUyxhQUFhOztzR0FPWixvQkFBb0I7a0JBUmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7d0JBQ2hDLGtDQUFrQyxDQUFDLEVBQUUsQ0FBQzt3QkFDdEMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO3FCQUM1RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNb2NrUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgQVBQX0lELFxuICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksXG4gIE5nTW9kdWxlLFxuICBQTEFURk9STV9JTklUSUFMSVpFUixcbiAgcGxhdGZvcm1Db3JlLFxuICBTdGF0aWNQcm92aWRlcixcbiAgybVpbnRlcm5hbFByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uIGFzIGludGVybmFsUHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VyTW9kdWxlLCDJtUJyb3dzZXJEb21BZGFwdGVyIGFzIEJyb3dzZXJEb21BZGFwdGVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuZnVuY3Rpb24gaW5pdEJyb3dzZXJUZXN0cygpIHtcbiAgQnJvd3NlckRvbUFkYXB0ZXIubWFrZUN1cnJlbnQoKTtcbn1cblxuY29uc3QgX1RFU1RfQlJPV1NFUl9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXRCcm93c2VyVGVzdHMsIG11bHRpOiB0cnVlfSxcbl07XG5cbi8qKlxuICogUGxhdGZvcm0gZm9yIHRlc3RpbmdcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXJUZXN0aW5nID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KFxuICBwbGF0Zm9ybUNvcmUsXG4gICdicm93c2VyVGVzdGluZycsXG4gIF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTLFxuKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEFQUF9JRCwgdXNlVmFsdWU6ICdhJ30sXG4gICAgaW50ZXJuYWxQcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbih7fSksXG4gICAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBNb2NrUGxhdGZvcm1Mb2NhdGlvbn0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUZXN0aW5nTW9kdWxlIHt9XG4iXX0=