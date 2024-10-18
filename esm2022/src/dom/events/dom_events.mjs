/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
export class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
        super(doc);
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    supports(eventName) {
        return true;
    }
    addEventListener(element, eventName, handler) {
        element.addEventListener(eventName, handler, false);
        return () => this.removeEventListener(element, eventName, handler);
    }
    removeEventListener(target, eventName, callback) {
        return target.removeEventListener(eventName, callback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8+sha-d1cfbb1", ngImport: i0, type: DomEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8+sha-d1cfbb1", ngImport: i0, type: DomEventsPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8+sha-d1cfbb1", ngImport: i0, type: DomEventsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBR25ELE1BQU0sT0FBTyxlQUFnQixTQUFRLGtCQUFrQjtJQUNyRCxZQUE4QixHQUFRO1FBQ3BDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsVUFBVTtJQUNELFFBQVEsQ0FBQyxTQUFpQjtRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFUSxnQkFBZ0IsQ0FBQyxPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDbEYsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBd0IsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxRQUFrQjtRQUNwRSxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsUUFBeUIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7eUhBbEJVLGVBQWUsa0JBQ04sUUFBUTs2SEFEakIsZUFBZTs7c0dBQWYsZUFBZTtrQkFEM0IsVUFBVTs7MEJBRUksTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbUV2ZW50c1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoZG9jKTtcbiAgfVxuXG4gIC8vIFRoaXMgcGx1Z2luIHNob3VsZCBjb21lIGxhc3QgaW4gdGhlIGxpc3Qgb2YgcGx1Z2lucywgYmVjYXVzZSBpdCBhY2NlcHRzIGFsbFxuICAvLyBldmVudHMuXG4gIG92ZXJyaWRlIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciBhcyBFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgcmV0dXJuICgpID0+IHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lcik7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgcmV0dXJuIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2sgYXMgRXZlbnRMaXN0ZW5lcik7XG4gIH1cbn1cbiJdfQ==