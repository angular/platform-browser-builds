/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Inject, Injectable, inject, ɵGLOBAL_EVENT_DELEGATION } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class EventDelegationPlugin extends EventManagerPlugin {
    constructor(doc) {
        super(doc);
        this.delegate = inject(ɵGLOBAL_EVENT_DELEGATION, { optional: true });
    }
    supports(eventName) {
        // If `GlobalDelegationEventPlugin` implementation is not provided,
        // this plugin is kept disabled.
        return this.delegate ? this.delegate.supports(eventName) : false;
    }
    addEventListener(element, eventName, handler) {
        return this.delegate.addEventListener(element, eventName, handler);
    }
    removeEventListener(element, eventName, callback) {
        return this.delegate.removeEventListener(element, eventName, callback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.5+sha-dbf15c8", ngImport: i0, type: EventDelegationPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.5+sha-dbf15c8", ngImport: i0, type: EventDelegationPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.5+sha-dbf15c8", ngImport: i0, type: EventDelegationPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGVsZWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfZGVsZWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUd6QyxNQUFNLE9BQU8scUJBQXNCLFNBQVEsa0JBQWtCO0lBRTNELFlBQThCLEdBQVE7UUFDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkwsYUFBUSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBR3RFLENBQUM7SUFFUSxRQUFRLENBQUMsU0FBaUI7UUFDakMsbUVBQW1FO1FBQ25FLGdDQUFnQztRQUNoQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkUsQ0FBQztJQUVRLGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUNsRixPQUFPLElBQUksQ0FBQyxRQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBb0IsRUFBRSxTQUFpQixFQUFFLFFBQWtCO1FBQzdFLE9BQU8sSUFBSSxDQUFDLFFBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7eUhBbEJVLHFCQUFxQixrQkFFWixRQUFROzZIQUZqQixxQkFBcUI7O3NHQUFyQixxQkFBcUI7a0JBRGpDLFVBQVU7OzBCQUdJLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIGluamVjdCwgybVHTE9CQUxfRVZFTlRfREVMRUdBVElPTn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudERlbGVnYXRpb25QbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICBwcml2YXRlIGRlbGVnYXRlID0gaW5qZWN0KMm1R0xPQkFMX0VWRU5UX0RFTEVHQVRJT04sIHtvcHRpb25hbDogdHJ1ZX0pO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICBvdmVycmlkZSBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIElmIGBHbG9iYWxEZWxlZ2F0aW9uRXZlbnRQbHVnaW5gIGltcGxlbWVudGF0aW9uIGlzIG5vdCBwcm92aWRlZCxcbiAgICAvLyB0aGlzIHBsdWdpbiBpcyBrZXB0IGRpc2FibGVkLlxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlID8gdGhpcy5kZWxlZ2F0ZS5zdXBwb3J0cyhldmVudE5hbWUpIDogZmFsc2U7XG4gIH1cblxuICBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUhLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSEucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxufVxuIl19