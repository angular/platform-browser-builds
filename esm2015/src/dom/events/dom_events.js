/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
let DomEventsPlugin = /** @class */ (() => {
    let DomEventsPlugin = class DomEventsPlugin extends EventManagerPlugin {
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
    };
    DomEventsPlugin = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], DomEventsPlugin);
    return DomEventsPlugin;
})();
export { DomEventsPlugin };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBR25EO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxrQkFBa0I7UUFDckQsWUFBOEIsR0FBUTtZQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRUQsOEVBQThFO1FBQzlFLFVBQVU7UUFDVixRQUFRLENBQUMsU0FBaUI7WUFDeEIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO1lBQ3pFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQXdCLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQsbUJBQW1CLENBQUMsTUFBVyxFQUFFLFNBQWlCLEVBQUUsUUFBa0I7WUFDcEUsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFFBQXlCLENBQUMsQ0FBQztRQUMxRSxDQUFDO0tBQ0YsQ0FBQTtJQW5CWSxlQUFlO1FBRDNCLFVBQVUsRUFBRTtRQUVFLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBOztPQURsQixlQUFlLENBbUIzQjtJQUFELHNCQUFDO0tBQUE7U0FuQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21FdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICAvLyBUaGlzIHBsdWdpbiBzaG91bGQgY29tZSBsYXN0IGluIHRoZSBsaXN0IG9mIHBsdWdpbnMsIGJlY2F1c2UgaXQgYWNjZXB0cyBhbGxcbiAgLy8gZXZlbnRzLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHJldHVybiB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrIGFzIEV2ZW50TGlzdGVuZXIpO1xuICB9XG59XG4iXX0=