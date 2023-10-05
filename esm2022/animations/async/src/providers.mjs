/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { ANIMATION_MODULE_TYPE, NgZone, RendererFactory2 } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { AsyncAnimationRendererFactory } from './async_animation_renderer';
/**
 * Returns the set of [dependency-injection providers](guide/glossary#provider)
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * When you use this function instead of the eager `provideAnimations()`, animations won't be
 * renderered until the renderer is loaded.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```typescript
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimationsAsync()
 *   ]
 * });
 * ```
 *
 * @param type pass `'noop'` as argument to disable animations.
 *
 * @publicApi
 * @developerPreview
 */
export function provideAnimationsAsync(type = 'animations') {
    return [
        {
            provide: RendererFactory2,
            useFactory: (doc, renderer, zone) => {
                return new AsyncAnimationRendererFactory(doc, renderer, zone, type);
            },
            deps: [DOCUMENT, DomRendererFactory2, NgZone],
        },
        {
            provide: ANIMATION_MODULE_TYPE,
            useValue: type === 'noop' ? 'NoopAnimations' : 'BrowserAnimations',
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxNQUFNLEVBQVksZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUE0QixZQUFZO0lBQzdFLE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsVUFBVSxFQUFFLENBQUMsR0FBYSxFQUFFLFFBQTZCLEVBQUUsSUFBWSxFQUFFLEVBQUU7Z0JBQ3pFLE9BQU8sSUFBSSw2QkFBNkIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQztTQUM5QztRQUNEO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixRQUFRLEVBQUUsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtTQUNuRTtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRSwgTmdab25lLCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnLi9hc3luY19hbmltYXRpb25fcmVuZGVyZXInO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHNldCBvZiBbZGVwZW5kZW5jeS1pbmplY3Rpb24gcHJvdmlkZXJzXShndWlkZS9nbG9zc2FyeSNwcm92aWRlcilcbiAqIHRvIGVuYWJsZSBhbmltYXRpb25zIGluIGFuIGFwcGxpY2F0aW9uLiBTZWUgW2FuaW1hdGlvbnMgZ3VpZGVdKGd1aWRlL2FuaW1hdGlvbnMpXG4gKiB0byBsZWFybiBtb3JlIGFib3V0IGFuaW1hdGlvbnMgaW4gQW5ndWxhci5cbiAqXG4gKiBXaGVuIHlvdSB1c2UgdGhpcyBmdW5jdGlvbiBpbnN0ZWFkIG9mIHRoZSBlYWdlciBgcHJvdmlkZUFuaW1hdGlvbnMoKWAsIGFuaW1hdGlvbnMgd29uJ3QgYmVcbiAqIHJlbmRlcmVyZWQgdW50aWwgdGhlIHJlbmRlcmVyIGlzIGxvYWRlZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBlbmFibGUgYW5pbWF0aW9ucyBpbiBhbiBhcHBsaWNhdGlvblxuICogYm9vdHN0cmFwcGVkIHVzaW5nIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uLiBJbiB0aGlzIHNjZW5hcmlvIHRoZXJlXG4gKiBpcyBubyBuZWVkIHRvIGltcG9ydCB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYCBOZ01vZHVsZSBhdCBhbGwsIGp1c3QgYWRkXG4gKiBwcm92aWRlcnMgcmV0dXJuZWQgYnkgdGhpcyBmdW5jdGlvbiB0byB0aGUgYHByb3ZpZGVyc2AgbGlzdCBhcyBzaG93IGJlbG93LlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZUFuaW1hdGlvbnNBc3luYygpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHR5cGUgcGFzcyBgJ25vb3AnYCBhcyBhcmd1bWVudCB0byBkaXNhYmxlIGFuaW1hdGlvbnMuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVBbmltYXRpb25zQXN5bmModHlwZTogJ2FuaW1hdGlvbnMnfCdub29wJyA9ICdhbmltYXRpb25zJyk6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgICB1c2VGYWN0b3J5OiAoZG9jOiBEb2N1bWVudCwgcmVuZGVyZXI6IERvbVJlbmRlcmVyRmFjdG9yeTIsIHpvbmU6IE5nWm9uZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KGRvYywgcmVuZGVyZXIsIHpvbmUsIHR5cGUpO1xuICAgICAgfSxcbiAgICAgIGRlcHM6IFtET0NVTUVOVCwgRG9tUmVuZGVyZXJGYWN0b3J5MiwgTmdab25lXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFOSU1BVElPTl9NT0RVTEVfVFlQRSxcbiAgICAgIHVzZVZhbHVlOiB0eXBlID09PSAnbm9vcCcgPyAnTm9vcEFuaW1hdGlvbnMnIDogJ0Jyb3dzZXJBbmltYXRpb25zJyxcbiAgICB9LFxuICBdO1xufVxuIl19