/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { ANIMATION_MODULE_TYPE, makeEnvironmentProviders, NgZone, RendererFactory2 } from '@angular/core';
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
    return makeEnvironmentProviders([
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
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxxQkFBcUIsRUFBd0Isd0JBQXdCLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBQyxvQkFBb0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXRGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsT0FBNEIsWUFBWTtJQUU3RSxPQUFPLHdCQUF3QixDQUFDO1FBQzlCO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixVQUFVLEVBQUUsQ0FBQyxHQUFhLEVBQUUsUUFBNkIsRUFBRSxJQUFZLEVBQUUsRUFBRTtnQkFDekUsT0FBTyxJQUFJLDZCQUE2QixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RFLENBQUM7WUFDRCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxDQUFDO1NBQzlDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFFBQVEsRUFBRSxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO1NBQ25FO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEUsIEVudmlyb25tZW50UHJvdmlkZXJzLCBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMsIE5nWm9uZSwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnLi9hc3luY19hbmltYXRpb25fcmVuZGVyZXInO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHNldCBvZiBbZGVwZW5kZW5jeS1pbmplY3Rpb24gcHJvdmlkZXJzXShndWlkZS9nbG9zc2FyeSNwcm92aWRlcilcbiAqIHRvIGVuYWJsZSBhbmltYXRpb25zIGluIGFuIGFwcGxpY2F0aW9uLiBTZWUgW2FuaW1hdGlvbnMgZ3VpZGVdKGd1aWRlL2FuaW1hdGlvbnMpXG4gKiB0byBsZWFybiBtb3JlIGFib3V0IGFuaW1hdGlvbnMgaW4gQW5ndWxhci5cbiAqXG4gKiBXaGVuIHlvdSB1c2UgdGhpcyBmdW5jdGlvbiBpbnN0ZWFkIG9mIHRoZSBlYWdlciBgcHJvdmlkZUFuaW1hdGlvbnMoKWAsIGFuaW1hdGlvbnMgd29uJ3QgYmVcbiAqIHJlbmRlcmVyZWQgdW50aWwgdGhlIHJlbmRlcmVyIGlzIGxvYWRlZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyB1c2VmdWwgd2hlbiB5b3Ugd2FudCB0byBlbmFibGUgYW5pbWF0aW9ucyBpbiBhbiBhcHBsaWNhdGlvblxuICogYm9vdHN0cmFwcGVkIHVzaW5nIHRoZSBgYm9vdHN0cmFwQXBwbGljYXRpb25gIGZ1bmN0aW9uLiBJbiB0aGlzIHNjZW5hcmlvIHRoZXJlXG4gKiBpcyBubyBuZWVkIHRvIGltcG9ydCB0aGUgYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlYCBOZ01vZHVsZSBhdCBhbGwsIGp1c3QgYWRkXG4gKiBwcm92aWRlcnMgcmV0dXJuZWQgYnkgdGhpcyBmdW5jdGlvbiB0byB0aGUgYHByb3ZpZGVyc2AgbGlzdCBhcyBzaG93IGJlbG93LlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGJvb3RzdHJhcEFwcGxpY2F0aW9uKFJvb3RDb21wb25lbnQsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgcHJvdmlkZUFuaW1hdGlvbnNBc3luYygpXG4gKiAgIF1cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHR5cGUgcGFzcyBgJ25vb3AnYCBhcyBhcmd1bWVudCB0byBkaXNhYmxlIGFuaW1hdGlvbnMuXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRldmVsb3BlclByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVBbmltYXRpb25zQXN5bmModHlwZTogJ2FuaW1hdGlvbnMnfCdub29wJyA9ICdhbmltYXRpb25zJyk6XG4gICAgRW52aXJvbm1lbnRQcm92aWRlcnMge1xuICByZXR1cm4gbWFrZUVudmlyb25tZW50UHJvdmlkZXJzKFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgICAgdXNlRmFjdG9yeTogKGRvYzogRG9jdW1lbnQsIHJlbmRlcmVyOiBEb21SZW5kZXJlckZhY3RvcnkyLCB6b25lOiBOZ1pvbmUpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeShkb2MsIHJlbmRlcmVyLCB6b25lLCB0eXBlKTtcbiAgICAgIH0sXG4gICAgICBkZXBzOiBbRE9DVU1FTlQsIERvbVJlbmRlcmVyRmFjdG9yeTIsIE5nWm9uZV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBTklNQVRJT05fTU9EVUxFX1RZUEUsXG4gICAgICB1c2VWYWx1ZTogdHlwZSA9PT0gJ25vb3AnID8gJ05vb3BBbmltYXRpb25zJyA6ICdCcm93c2VyQW5pbWF0aW9ucycsXG4gICAgfSxcbiAgXSk7XG59XG4iXX0=