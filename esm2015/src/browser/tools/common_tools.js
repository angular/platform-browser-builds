/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} msPerTick
     * @param {?} numTicks
     */
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
}
if (false) {
    /** @type {?} */
    ChangeDetectionPerfRecord.prototype.msPerTick;
    /** @type {?} */
    ChangeDetectionPerfRecord.prototype.numTicks;
}
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
export class AngularProfiler {
    /**
     * @param {?} ref
     */
    constructor(ref) { this.appRef = ref.injector.get(ApplicationRef); }
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
     * @param {?} config
     * @return {?}
     */
    timeChangeDetection(config) {
        /** @type {?} */
        const record = config && config['record'];
        /** @type {?} */
        const profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        /** @type {?} */
        const isProfilerAvailable = window.console.profile != null;
        if (record && isProfilerAvailable) {
            window.console.profile(profileName);
        }
        /** @type {?} */
        const start = getDOM().performanceNow();
        /** @type {?} */
        let numTicks = 0;
        while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        /** @type {?} */
        const end = getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            window.console.profileEnd(profileName);
        }
        /** @type {?} */
        const msPerTick = (end - start) / numTicks;
        window.console.log(`ran ${numTicks} change detection cycles`);
        window.console.log(`${msPerTick.toFixed(2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
}
if (false) {
    /** @type {?} */
    AngularProfiler.prototype.appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci90b29scy9jb21tb25fdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVqQyxNQUFNLE9BQU8seUJBQXlCOzs7OztJQUNwQyxZQUFtQixTQUFpQixFQUFTLFFBQWdCO1FBQTFDLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUcsQ0FBQztDQUNsRTs7O0lBRGEsOENBQXdCOztJQUFFLDZDQUF1Qjs7Ozs7O0FBTy9ELE1BQU0sT0FBTyxlQUFlOzs7O0lBRzFCLFlBQVksR0FBc0IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQnZGLG1CQUFtQixDQUFDLE1BQVc7O2NBQ3ZCLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQzs7Y0FDbkMsV0FBVyxHQUFHLGtCQUFrQjs7O2NBRWhDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUk7UUFDMUQsSUFBSSxNQUFNLElBQUksbUJBQW1CLEVBQUU7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckM7O2NBQ0ssS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRTs7WUFDbkMsUUFBUSxHQUFHLENBQUM7UUFDaEIsT0FBTyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjs7Y0FDSyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFO1FBQ3JDLElBQUksTUFBTSxJQUFJLG1CQUFtQixFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3hDOztjQUNLLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxRQUFRO1FBQzFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sUUFBUSwwQkFBMEIsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0QsT0FBTyxJQUFJLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7OztJQTdDQyxpQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7d2luZG93fSBmcm9tICcuL2Jyb3dzZXInO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGV0ZWN0aW9uUGVyZlJlY29yZCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtc1BlclRpY2s6IG51bWJlciwgcHVibGljIG51bVRpY2tzOiBudW1iZXIpIHt9XG59XG5cbi8qKlxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBBbmd1bGFyIHByb2ZpbGluZy1yZWxhdGVkIGRlYnVnIHRvb2xzLiBUaGlzIG9iamVjdFxuICogY29ycmVzcG9uZHMgdG8gdGhlIGBuZy5wcm9maWxlcmAgaW4gdGhlIGRldiBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgQW5ndWxhclByb2ZpbGVyIHtcbiAgYXBwUmVmOiBBcHBsaWNhdGlvblJlZjtcblxuICBjb25zdHJ1Y3RvcihyZWY6IENvbXBvbmVudFJlZjxhbnk+KSB7IHRoaXMuYXBwUmVmID0gcmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7IH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1jb25zb2xlXG4gIC8qKlxuICAgKiBFeGVyY2lzZXMgY2hhbmdlIGRldGVjdGlvbiBpbiBhIGxvb3AgYW5kIHRoZW4gcHJpbnRzIHRoZSBhdmVyYWdlIGFtb3VudCBvZlxuICAgKiB0aW1lIGluIG1pbGxpc2Vjb25kcyBob3cgbG9uZyBhIHNpbmdsZSByb3VuZCBvZiBjaGFuZ2UgZGV0ZWN0aW9uIHRha2VzIGZvclxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgVUkuIEl0IHJ1bnMgYSBtaW5pbXVtIG9mIDUgcm91bmRzIGZvciBhIG1pbmltdW1cbiAgICogb2YgNTAwIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogT3B0aW9uYWxseSwgYSB1c2VyIG1heSBwYXNzIGEgYGNvbmZpZ2AgcGFyYW1ldGVyIGNvbnRhaW5pbmcgYSBtYXAgb2ZcbiAgICogb3B0aW9ucy4gU3VwcG9ydGVkIG9wdGlvbnMgYXJlOlxuICAgKlxuICAgKiBgcmVjb3JkYCAoYm9vbGVhbikgLSBjYXVzZXMgdGhlIHByb2ZpbGVyIHRvIHJlY29yZCBhIENQVSBwcm9maWxlIHdoaWxlXG4gICAqIGl0IGV4ZXJjaXNlcyB0aGUgY2hhbmdlIGRldGVjdG9yLiBFeGFtcGxlOlxuICAgKlxuICAgKiBgYGBcbiAgICogbmcucHJvZmlsZXIudGltZUNoYW5nZURldGVjdGlvbih7cmVjb3JkOiB0cnVlfSlcbiAgICogYGBgXG4gICAqL1xuICB0aW1lQ2hhbmdlRGV0ZWN0aW9uKGNvbmZpZzogYW55KTogQ2hhbmdlRGV0ZWN0aW9uUGVyZlJlY29yZCB7XG4gICAgY29uc3QgcmVjb3JkID0gY29uZmlnICYmIGNvbmZpZ1sncmVjb3JkJ107XG4gICAgY29uc3QgcHJvZmlsZU5hbWUgPSAnQ2hhbmdlIERldGVjdGlvbic7XG4gICAgLy8gUHJvZmlsZXIgaXMgbm90IGF2YWlsYWJsZSBpbiBBbmRyb2lkIGJyb3dzZXJzLCBub3IgaW4gSUUgOSB3aXRob3V0IGRldiB0b29scyBvcGVuZWRcbiAgICBjb25zdCBpc1Byb2ZpbGVyQXZhaWxhYmxlID0gd2luZG93LmNvbnNvbGUucHJvZmlsZSAhPSBudWxsO1xuICAgIGlmIChyZWNvcmQgJiYgaXNQcm9maWxlckF2YWlsYWJsZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUucHJvZmlsZShwcm9maWxlTmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IHN0YXJ0ID0gZ2V0RE9NKCkucGVyZm9ybWFuY2VOb3coKTtcbiAgICBsZXQgbnVtVGlja3MgPSAwO1xuICAgIHdoaWxlIChudW1UaWNrcyA8IDUgfHwgKGdldERPTSgpLnBlcmZvcm1hbmNlTm93KCkgLSBzdGFydCkgPCA1MDApIHtcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICAgIG51bVRpY2tzKys7XG4gICAgfVxuICAgIGNvbnN0IGVuZCA9IGdldERPTSgpLnBlcmZvcm1hbmNlTm93KCk7XG4gICAgaWYgKHJlY29yZCAmJiBpc1Byb2ZpbGVyQXZhaWxhYmxlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5wcm9maWxlRW5kKHByb2ZpbGVOYW1lKTtcbiAgICB9XG4gICAgY29uc3QgbXNQZXJUaWNrID0gKGVuZCAtIHN0YXJ0KSAvIG51bVRpY2tzO1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgcmFuICR7bnVtVGlja3N9IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzYCk7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGAke21zUGVyVGljay50b0ZpeGVkKDIpfSBtcyBwZXIgY2hlY2tgKTtcblxuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0ZWN0aW9uUGVyZlJlY29yZChtc1BlclRpY2ssIG51bVRpY2tzKTtcbiAgfVxufVxuIl19