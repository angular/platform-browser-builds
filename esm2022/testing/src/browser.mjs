/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import { APP_ID, createPlatformFactory, NgModule, PLATFORM_INITIALIZER, platformCore, provideZoneChangeDetection } from '@angular/core';
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
class BrowserTestingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-7e468df", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.0-next.2+sha-7e468df", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-7e468df", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            provideZoneChangeDetection(),
            { provide: PlatformLocation, useClass: MockPlatformLocation },
        ], imports: [BrowserModule] }); }
}
export { BrowserTestingModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.2+sha-7e468df", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        provideZoneChangeDetection(),
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsMEJBQTBCLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3RKLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLElBQUksaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFakcsU0FBUyxnQkFBZ0I7SUFDdkIsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVELE1BQU0sZ0NBQWdDLEdBQ2xDLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBRS9FOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FDL0IscUJBQXFCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdDQUFnQyxDQUFDLENBQUM7QUFFNUY7Ozs7R0FJRztBQUNILE1BUWEsb0JBQW9CO3lIQUFwQixvQkFBb0I7MEhBQXBCLG9CQUFvQixZQVByQixhQUFhOzBIQU9aLG9CQUFvQixhQU5wQjtZQUNULEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDO1lBQ2hDLDBCQUEwQixFQUFFO1lBQzVCLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztTQUM1RCxZQUxTLGFBQWE7O1NBT1osb0JBQW9CO3NHQUFwQixvQkFBb0I7a0JBUmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUM7d0JBQ2hDLDBCQUEwQixFQUFFO3dCQUM1QixFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7cUJBQzVEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vY2tQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24vdGVzdGluZyc7XG5pbXBvcnQge0FQUF9JRCwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBOZ01vZHVsZSwgUExBVEZPUk1fSU5JVElBTElaRVIsIHBsYXRmb3JtQ29yZSwgcHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24sIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnJvd3Nlck1vZHVsZSwgybVCcm93c2VyRG9tQWRhcHRlciBhcyBCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmZ1bmN0aW9uIGluaXRCcm93c2VyVGVzdHMoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG59XG5cbmNvbnN0IF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID1cbiAgICBbe3Byb3ZpZGU6IFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB1c2VWYWx1ZTogaW5pdEJyb3dzZXJUZXN0cywgbXVsdGk6IHRydWV9XTtcblxuLyoqXG4gKiBQbGF0Zm9ybSBmb3IgdGVzdGluZ1xuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlclRlc3RpbmcgPVxuICAgIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShwbGF0Zm9ybUNvcmUsICdicm93c2VyVGVzdGluZycsIF9URVNUX0JST1dTRVJfUExBVEZPUk1fUFJPVklERVJTKTtcblxuLyoqXG4gKiBOZ01vZHVsZSBmb3IgdGVzdGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtCcm93c2VyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IEFQUF9JRCwgdXNlVmFsdWU6ICdhJ30sXG4gICAgcHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24oKSxcbiAgICB7cHJvdmlkZTogUGxhdGZvcm1Mb2NhdGlvbiwgdXNlQ2xhc3M6IE1vY2tQbGF0Zm9ybUxvY2F0aW9ufSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyVGVzdGluZ01vZHVsZSB7XG59XG4iXX0=