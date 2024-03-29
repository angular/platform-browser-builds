/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationDriver, NoopAnimationDriver, ɵAnimationEngine as AnimationEngine, ɵAnimationRendererFactory as AnimationRendererFactory, ɵAnimationStyleNormalizer as AnimationStyleNormalizer, ɵWebAnimationsDriver as WebAnimationsDriver, ɵWebAnimationsStyleNormalizer as WebAnimationsStyleNormalizer } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';
import { ANIMATION_MODULE_TYPE, inject, Inject, Injectable, NgZone, RendererFactory2, ɵChangeDetectionScheduler as ChangeDetectionScheduler } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
export class InjectableAnimationEngine extends AnimationEngine {
    // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
    // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
    // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
    constructor(doc, driver, normalizer) {
        super(doc, driver, normalizer, inject(ChangeDetectionScheduler, { optional: true }));
    }
    ngOnDestroy() {
        this.flush();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: InjectableAnimationEngine, deps: [{ token: DOCUMENT }, { token: i1.AnimationDriver }, { token: i1.ɵAnimationStyleNormalizer }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: InjectableAnimationEngine }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.1+sha-e02bcf8", ngImport: i0, type: InjectableAnimationEngine, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.AnimationDriver }, { type: i1.ɵAnimationStyleNormalizer }] });
export function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
export function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
const SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: AnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [DomRendererFactory2, AnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
export const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: () => new WebAnimationsDriver() },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
export const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useClass: NoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsNkJBQTZCLElBQUksNEJBQTRCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoVixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBdUIsZ0JBQWdCLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEwsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7OztBQUd0RixNQUFNLE9BQU8seUJBQTBCLFNBQVEsZUFBZTtJQUM1RCxxRkFBcUY7SUFDckYsMEZBQTBGO0lBQzFGLDRGQUE0RjtJQUM1RixZQUNzQixHQUFhLEVBQUUsTUFBdUIsRUFDeEQsVUFBb0M7UUFDdEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO3lIQVpVLHlCQUF5QixrQkFLeEIsUUFBUTs2SEFMVCx5QkFBeUI7O3NHQUF6Qix5QkFBeUI7a0JBRHJDLFVBQVU7OzBCQU1KLE1BQU07MkJBQUMsUUFBUTs7QUFVdEIsTUFBTSxVQUFVLGlDQUFpQztJQUMvQyxPQUFPLElBQUksNEJBQTRCLEVBQUUsQ0FBQztBQUM1QyxDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN0QyxRQUE2QixFQUFFLE1BQXVCLEVBQUUsSUFBWTtJQUN0RSxPQUFPLElBQUksd0JBQXdCLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsTUFBTSwwQkFBMEIsR0FBZTtJQUM3QyxFQUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsaUNBQWlDLEVBQUM7SUFDbEYsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQyxFQUFFO1FBQy9ELE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDO0tBQ3JEO0NBQ0YsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFlO0lBQ3RELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxFQUFDO0lBQ3ZFLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQyxFQUFFLEdBQUcsMEJBQTBCO0NBQy9GLENBQUM7QUFFRjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBZTtJQUMzRCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDO0lBQ3pELEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxFQUFFLEdBQUcsMEJBQTBCO0NBQzVGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBbmltYXRpb25Ecml2ZXIsIE5vb3BBbmltYXRpb25Ecml2ZXIsIMm1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgYXMgQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LCDJtUFuaW1hdGlvblN0eWxlTm9ybWFsaXplciBhcyBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIsIMm1V2ViQW5pbWF0aW9uc0RyaXZlciBhcyBXZWJBbmltYXRpb25zRHJpdmVyLCDJtVdlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIgYXMgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRSwgaW5qZWN0LCBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5MiwgybVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVEb21SZW5kZXJlckZhY3RvcnkyIGFzIERvbVJlbmRlcmVyRmFjdG9yeTJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5qZWN0YWJsZUFuaW1hdGlvbkVuZ2luZSBleHRlbmRzIEFuaW1hdGlvbkVuZ2luZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIFRoZSBgQXBwbGljYXRpb25SZWZgIGlzIGluamVjdGVkIGhlcmUgZXhwbGljaXRseSB0byBmb3JjZSB0aGUgZGVwZW5kZW5jeSBvcmRlcmluZy5cbiAgLy8gU2luY2UgdGhlIGBBcHBsaWNhdGlvblJlZmAgc2hvdWxkIGJlIGNyZWF0ZWQgZWFybGllciBiZWZvcmUgdGhlIGBBbmltYXRpb25FbmdpbmVgLCB0aGV5XG4gIC8vIGJvdGggaGF2ZSBgbmdPbkRlc3Ryb3lgIGhvb2tzIGFuZCBgZmx1c2goKWAgbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgYWxsIHZpZXdzIGFyZSBkZXN0cm95ZWQuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBEb2N1bWVudCwgZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsXG4gICAgICBub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpIHtcbiAgICBzdXBlcihkb2MsIGRyaXZlciwgbm9ybWFsaXplciwgaW5qZWN0KENoYW5nZURldGVjdGlvblNjaGVkdWxlciwge29wdGlvbmFsOiB0cnVlfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZURlZmF1bHRTdHlsZU5vcm1hbGl6ZXIoKSB7XG4gIHJldHVybiBuZXcgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkocmVuZGVyZXIsIGVuZ2luZSwgem9uZSk7XG59XG5cbmNvbnN0IFNIQVJFRF9BTklNQVRJT05fUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyLCB1c2VGYWN0b3J5OiBpbnN0YW50aWF0ZURlZmF1bHRTdHlsZU5vcm1hbGl6ZXJ9LFxuICB7cHJvdmlkZTogQW5pbWF0aW9uRW5naW5lLCB1c2VDbGFzczogSW5qZWN0YWJsZUFuaW1hdGlvbkVuZ2luZX0sIHtcbiAgICBwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlUmVuZGVyZXJGYWN0b3J5LFxuICAgIGRlcHM6IFtEb21SZW5kZXJlckZhY3RvcnkyLCBBbmltYXRpb25FbmdpbmUsIE5nWm9uZV1cbiAgfVxuXTtcblxuLyoqXG4gKiBTZXBhcmF0ZSBwcm92aWRlcnMgZnJvbSB0aGUgYWN0dWFsIG1vZHVsZSBzbyB0aGF0IHdlIGNhbiBkbyBhIGxvY2FsIG1vZGlmaWNhdGlvbiBpbiBHb29nbGUzIHRvXG4gKiBpbmNsdWRlIHRoZW0gaW4gdGhlIEJyb3dzZXJNb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBCUk9XU0VSX0FOSU1BVElPTlNfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uRHJpdmVyLCB1c2VGYWN0b3J5OiAoKSA9PiBuZXcgV2ViQW5pbWF0aW9uc0RyaXZlcigpfSxcbiAge3Byb3ZpZGU6IEFOSU1BVElPTl9NT0RVTEVfVFlQRSwgdXNlVmFsdWU6ICdCcm93c2VyQW5pbWF0aW9ucyd9LCAuLi5TSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSU1xuXTtcblxuLyoqXG4gKiBTZXBhcmF0ZSBwcm92aWRlcnMgZnJvbSB0aGUgYWN0dWFsIG1vZHVsZSBzbyB0aGF0IHdlIGNhbiBkbyBhIGxvY2FsIG1vZGlmaWNhdGlvbiBpbiBHb29nbGUzIHRvXG4gKiBpbmNsdWRlIHRoZW0gaW4gdGhlIEJyb3dzZXJUZXN0aW5nTW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uRHJpdmVyLCB1c2VDbGFzczogTm9vcEFuaW1hdGlvbkRyaXZlcn0sXG4gIHtwcm92aWRlOiBBTklNQVRJT05fTU9EVUxFX1RZUEUsIHVzZVZhbHVlOiAnTm9vcEFuaW1hdGlvbnMnfSwgLi4uU0hBUkVEX0FOSU1BVElPTl9QUk9WSURFUlNcbl07XG4iXX0=