/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0+sha-4b82b98", ngImport: i0, type: EventDelegationPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.0+sha-4b82b98", ngImport: i0, type: EventDelegationPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0+sha-4b82b98", ngImport: i0, type: EventDelegationPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfZGVsZWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfZGVsZWdhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUd6QyxNQUFNLE9BQU8scUJBQXNCLFNBQVEsa0JBQWtCO0lBRTNELFlBQThCLEdBQVE7UUFDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRkwsYUFBUSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBR3RFLENBQUM7SUFFUSxRQUFRLENBQUMsU0FBaUI7UUFDakMsbUVBQW1FO1FBQ25FLGdDQUFnQztRQUNoQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkUsQ0FBQztJQUVRLGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUNsRixPQUFPLElBQUksQ0FBQyxRQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBb0IsRUFBRSxTQUFpQixFQUFFLFFBQWtCO1FBQzdFLE9BQU8sSUFBSSxDQUFDLFFBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7eUhBbEJVLHFCQUFxQixrQkFFWixRQUFROzZIQUZqQixxQkFBcUI7O3NHQUFyQixxQkFBcUI7a0JBRGpDLFVBQVU7OzBCQUdJLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgaW5qZWN0LCDJtUdMT0JBTF9FVkVOVF9ERUxFR0FUSU9OfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50RGVsZWdhdGlvblBsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIHByaXZhdGUgZGVsZWdhdGUgPSBpbmplY3QoybVHTE9CQUxfRVZFTlRfREVMRUdBVElPTiwge29wdGlvbmFsOiB0cnVlfSk7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoZG9jKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgYEdsb2JhbERlbGVnYXRpb25FdmVudFBsdWdpbmAgaW1wbGVtZW50YXRpb24gaXMgbm90IHByb3ZpZGVkLFxuICAgIC8vIHRoaXMgcGx1Z2luIGlzIGtlcHQgZGlzYWJsZWQuXG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUgPyB0aGlzLmRlbGVnYXRlLnN1cHBvcnRzKGV2ZW50TmFtZSkgOiBmYWxzZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSEuYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlIS5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG59XG4iXX0=