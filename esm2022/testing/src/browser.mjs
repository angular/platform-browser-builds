/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { APP_ID, createPlatformFactory, NgModule, PLATFORM_INITIALIZER, platformCore, provideZoneChangeDetection, ɵEffectScheduler as EffectScheduler, ɵZoneAwareQueueingScheduler as ZoneAwareQueueingScheduler } from '@angular/core';
import { BrowserModule, ɵBrowserDomAdapter as BrowserDomAdapter } from '@angular/platform-browser';
import * as i0 from "@angular/core";
function initBrowserTests() {
    BrowserDomAdapter.makeCurrent();
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
export class BrowserTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-63777d2", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0-next.0+sha-63777d2", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-63777d2", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            provideZoneChangeDetection(),
            { provide: PlatformLocation, useClass: MockPlatformLocation },
            { provide: ZoneAwareQueueingScheduler },
            { provide: EffectScheduler, useExisting: ZoneAwareQueueingScheduler },
        ], imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.0+sha-63777d2", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        provideZoneChangeDetection(),
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                        { provide: ZoneAwareQueueingScheduler },
                        { provide: EffectScheduler, useExisting: ZoneAwareQueueingScheduler },
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsMEJBQTBCLEVBQWtCLGdCQUFnQixJQUFJLGVBQWUsRUFBRSwyQkFBMkIsSUFBSSwwQkFBMEIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0UCxPQUFPLEVBQUMsYUFBYSxFQUFFLGtCQUFrQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBRWpHLFNBQVMsZ0JBQWdCO0lBQ3ZCLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFFRCxNQUFNLGdDQUFnQyxHQUNsQyxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUUvRTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQy9CLHFCQUFxQixDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTVGOzs7O0dBSUc7QUFXSCxNQUFNLE9BQU8sb0JBQW9CO3lIQUFwQixvQkFBb0I7MEhBQXBCLG9CQUFvQixZQVRyQixhQUFhOzBIQVNaLG9CQUFvQixhQVJwQjtZQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO1lBQ2hDLDBCQUEwQixFQUFFO1lBQzVCLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztZQUMzRCxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBQztZQUNyQyxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLDBCQUEwQixFQUFDO1NBQ3BFLFlBUFMsYUFBYTs7c0dBU1osb0JBQW9CO2tCQVZoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO3dCQUNoQywwQkFBMEIsRUFBRTt3QkFDNUIsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFDO3dCQUMzRCxFQUFDLE9BQU8sRUFBRSwwQkFBMEIsRUFBQzt3QkFDckMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSwwQkFBMEIsRUFBQztxQkFDcEU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7UGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9ja1BsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi90ZXN0aW5nJztcbmltcG9ydCB7QVBQX0lELCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIE5nTW9kdWxlLCBQTEFURk9STV9JTklUSUFMSVpFUiwgcGxhdGZvcm1Db3JlLCBwcm92aWRlWm9uZUNoYW5nZURldGVjdGlvbiwgU3RhdGljUHJvdmlkZXIsIMm1RWZmZWN0U2NoZWR1bGVyIGFzIEVmZmVjdFNjaGVkdWxlciwgybVab25lQXdhcmVRdWV1ZWluZ1NjaGVkdWxlciBhcyBab25lQXdhcmVRdWV1ZWluZ1NjaGVkdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Jyb3dzZXJNb2R1bGUsIMm1QnJvd3NlckRvbUFkYXB0ZXIgYXMgQnJvd3NlckRvbUFkYXB0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5mdW5jdGlvbiBpbml0QnJvd3NlclRlc3RzKCkge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xufVxuXG5jb25zdCBfVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9XG4gICAgW3twcm92aWRlOiBQTEFURk9STV9JTklUSUFMSVpFUiwgdXNlVmFsdWU6IGluaXRCcm93c2VyVGVzdHMsIG11bHRpOiB0cnVlfV07XG5cbi8qKlxuICogUGxhdGZvcm0gZm9yIHRlc3RpbmdcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBwbGF0Zm9ybUJyb3dzZXJUZXN0aW5nID1cbiAgICBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkocGxhdGZvcm1Db3JlLCAnYnJvd3NlclRlc3RpbmcnLCBfVEVTVF9CUk9XU0VSX1BMQVRGT1JNX1BST1ZJREVSUyk7XG5cbi8qKlxuICogTmdNb2R1bGUgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbQnJvd3Nlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBBUFBfSUQsIHVzZVZhbHVlOiAnYSd9LFxuICAgIHByb3ZpZGVab25lQ2hhbmdlRGV0ZWN0aW9uKCksXG4gICAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBNb2NrUGxhdGZvcm1Mb2NhdGlvbn0sXG4gICAge3Byb3ZpZGU6IFpvbmVBd2FyZVF1ZXVlaW5nU2NoZWR1bGVyfSxcbiAgICB7cHJvdmlkZTogRWZmZWN0U2NoZWR1bGVyLCB1c2VFeGlzdGluZzogWm9uZUF3YXJlUXVldWVpbmdTY2hlZHVsZXJ9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUZXN0aW5nTW9kdWxlIHtcbn1cbiJdfQ==