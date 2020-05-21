/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { ApplicationRef } from '@angular/core';
import { window } from './browser';
export class ChangeDetectionPerfRecord {
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
export class AngularProfiler {
    constructor(ref) {
        this.appRef = ref.injector.get(ApplicationRef);
    }
    // tslint:disable:no-console
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    timeChangeDetection(config) {
        const record = config && config['record'];
        const profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        const isProfilerAvailable = window.console.profile != null;
        if (record && isProfilerAvailable) {
            window.console.profile(profileName);
        }
        const start = getDOM().performanceNow();
        let numTicks = 0;
        while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        const end = getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            window.console.profileEnd(profileName);
        }
        const msPerTick = (end - start) / numTicks;
        window.console.log(`ran ${numTicks} change detection cycles`);
        window.console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci90b29scy9jb21tb25fdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFakMsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUFtQixTQUFpQixFQUFTLFFBQWdCO1FBQTFDLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUcsQ0FBQztDQUNsRTtBQUVEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBRzFCLFlBQVksR0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsNEJBQTRCO0lBQzVCOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILG1CQUFtQixDQUFDLE1BQVc7UUFDN0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztRQUN2QyxzRkFBc0Y7UUFDdEYsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7UUFDM0QsSUFBSSxNQUFNLElBQUksbUJBQW1CLEVBQUU7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckM7UUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjtRQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLElBQUksTUFBTSxJQUFJLG1CQUFtQixFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSwwQkFBMEIsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0QsT0FBTyxJQUFJLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7d2luZG93fSBmcm9tICcuL2Jyb3dzZXInO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGV0ZWN0aW9uUGVyZlJlY29yZCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtc1BlclRpY2s6IG51bWJlciwgcHVibGljIG51bVRpY2tzOiBudW1iZXIpIHt9XG59XG5cbi8qKlxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBBbmd1bGFyIHByb2ZpbGluZy1yZWxhdGVkIGRlYnVnIHRvb2xzLiBUaGlzIG9iamVjdFxuICogY29ycmVzcG9uZHMgdG8gdGhlIGBuZy5wcm9maWxlcmAgaW4gdGhlIGRldiBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgQW5ndWxhclByb2ZpbGVyIHtcbiAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZjtcblxuICBjb25zdHJ1Y3RvcihyZWY6IENvbXBvbmVudFJlZjxhbnk+KSB7XG4gICAgdGhpcy5hcHBSZWYgPSByZWYuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uUmVmKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWNvbnNvbGVcbiAgLyoqXG4gICAqIEV4ZXJjaXNlcyBjaGFuZ2UgZGV0ZWN0aW9uIGluIGEgbG9vcCBhbmQgdGhlbiBwcmludHMgdGhlIGF2ZXJhZ2UgYW1vdW50IG9mXG4gICAqIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGhvdyBsb25nIGEgc2luZ2xlIHJvdW5kIG9mIGNoYW5nZSBkZXRlY3Rpb24gdGFrZXMgZm9yXG4gICAqIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBVSS4gSXQgcnVucyBhIG1pbmltdW0gb2YgNSByb3VuZHMgZm9yIGEgbWluaW11bVxuICAgKiBvZiA1MDAgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBPcHRpb25hbGx5LCBhIHVzZXIgbWF5IHBhc3MgYSBgY29uZmlnYCBwYXJhbWV0ZXIgY29udGFpbmluZyBhIG1hcCBvZlxuICAgKiBvcHRpb25zLiBTdXBwb3J0ZWQgb3B0aW9ucyBhcmU6XG4gICAqXG4gICAqIGByZWNvcmRgIChib29sZWFuKSAtIGNhdXNlcyB0aGUgcHJvZmlsZXIgdG8gcmVjb3JkIGEgQ1BVIHByb2ZpbGUgd2hpbGVcbiAgICogaXQgZXhlcmNpc2VzIHRoZSBjaGFuZ2UgZGV0ZWN0b3IuIEV4YW1wbGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBuZy5wcm9maWxlci50aW1lQ2hhbmdlRGV0ZWN0aW9uKHtyZWNvcmQ6IHRydWV9KVxuICAgKiBgYGBcbiAgICovXG4gIHRpbWVDaGFuZ2VEZXRlY3Rpb24oY29uZmlnOiBhbnkpOiBDaGFuZ2VEZXRlY3Rpb25QZXJmUmVjb3JkIHtcbiAgICBjb25zdCByZWNvcmQgPSBjb25maWcgJiYgY29uZmlnWydyZWNvcmQnXTtcbiAgICBjb25zdCBwcm9maWxlTmFtZSA9ICdDaGFuZ2UgRGV0ZWN0aW9uJztcbiAgICAvLyBQcm9maWxlciBpcyBub3QgYXZhaWxhYmxlIGluIEFuZHJvaWQgYnJvd3NlcnMsIG5vciBpbiBJRSA5IHdpdGhvdXQgZGV2IHRvb2xzIG9wZW5lZFxuICAgIGNvbnN0IGlzUHJvZmlsZXJBdmFpbGFibGUgPSB3aW5kb3cuY29uc29sZS5wcm9maWxlICE9IG51bGw7XG4gICAgaWYgKHJlY29yZCAmJiBpc1Byb2ZpbGVyQXZhaWxhYmxlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5wcm9maWxlKHByb2ZpbGVOYW1lKTtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnQgPSBnZXRET00oKS5wZXJmb3JtYW5jZU5vdygpO1xuICAgIGxldCBudW1UaWNrcyA9IDA7XG4gICAgd2hpbGUgKG51bVRpY2tzIDwgNSB8fCAoZ2V0RE9NKCkucGVyZm9ybWFuY2VOb3coKSAtIHN0YXJ0KSA8IDUwMCkge1xuICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xuICAgICAgbnVtVGlja3MrKztcbiAgICB9XG4gICAgY29uc3QgZW5kID0gZ2V0RE9NKCkucGVyZm9ybWFuY2VOb3coKTtcbiAgICBpZiAocmVjb3JkICYmIGlzUHJvZmlsZXJBdmFpbGFibGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLnByb2ZpbGVFbmQocHJvZmlsZU5hbWUpO1xuICAgIH1cbiAgICBjb25zdCBtc1BlclRpY2sgPSAoZW5kIC0gc3RhcnQpIC8gbnVtVGlja3M7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGByYW4gJHtudW1UaWNrc30gY2hhbmdlIGRldGVjdGlvbiBjeWNsZXNgKTtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coYCR7bXNQZXJUaWNrLnRvRml4ZWQoMil9IG1zIHBlciBjaGVja2ApO1xuXG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3Rpb25QZXJmUmVjb3JkKG1zUGVyVGljaywgbnVtVGlja3MpO1xuICB9XG59XG4iXX0=