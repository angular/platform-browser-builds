/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { getDOM } from '../../dom/dom_adapter';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci90b29scy9jb21tb25fdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVqQyxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW1CLFNBQWlCLEVBQVMsUUFBZ0I7UUFBMUMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0NBQ2xFO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFBWSxHQUFzQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZGLDRCQUE0QjtJQUM1Qjs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxtQkFBbUIsQ0FBQyxNQUFXO1FBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFDdkMsc0ZBQXNGO1FBQ3RGLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDO1FBQzNELElBQUksTUFBTSxJQUFJLG1CQUFtQixFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRTtZQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxDQUFDO1NBQ1o7UUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QyxJQUFJLE1BQU0sSUFBSSxtQkFBbUIsRUFBRTtZQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QztRQUNELE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQVEsMEJBQTBCLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNELE9BQU8sSUFBSSx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRET019IGZyb20gJy4uLy4uL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge3dpbmRvd30gZnJvbSAnLi9icm93c2VyJztcblxuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdGlvblBlcmZSZWNvcmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbXNQZXJUaWNrOiBudW1iZXIsIHB1YmxpYyBudW1UaWNrczogbnVtYmVyKSB7fVxufVxuXG4vKipcbiAqIEVudHJ5IHBvaW50IGZvciBhbGwgQW5ndWxhciBwcm9maWxpbmctcmVsYXRlZCBkZWJ1ZyB0b29scy4gVGhpcyBvYmplY3RcbiAqIGNvcnJlc3BvbmRzIHRvIHRoZSBgbmcucHJvZmlsZXJgIGluIHRoZSBkZXYgY29uc29sZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFuZ3VsYXJQcm9maWxlciB7XG4gIGFwcFJlZjogQXBwbGljYXRpb25SZWY7XG5cbiAgY29uc3RydWN0b3IocmVmOiBDb21wb25lbnRSZWY8YW55PikgeyB0aGlzLmFwcFJlZiA9IHJlZi5pbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpOyB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGU6bm8tY29uc29sZVxuICAvKipcbiAgICogRXhlcmNpc2VzIGNoYW5nZSBkZXRlY3Rpb24gaW4gYSBsb29wIGFuZCB0aGVuIHByaW50cyB0aGUgYXZlcmFnZSBhbW91bnQgb2ZcbiAgICogdGltZSBpbiBtaWxsaXNlY29uZHMgaG93IGxvbmcgYSBzaW5nbGUgcm91bmQgb2YgY2hhbmdlIGRldGVjdGlvbiB0YWtlcyBmb3JcbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIFVJLiBJdCBydW5zIGEgbWluaW11bSBvZiA1IHJvdW5kcyBmb3IgYSBtaW5pbXVtXG4gICAqIG9mIDUwMCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIE9wdGlvbmFsbHksIGEgdXNlciBtYXkgcGFzcyBhIGBjb25maWdgIHBhcmFtZXRlciBjb250YWluaW5nIGEgbWFwIG9mXG4gICAqIG9wdGlvbnMuIFN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbiAgICpcbiAgICogYHJlY29yZGAgKGJvb2xlYW4pIC0gY2F1c2VzIHRoZSBwcm9maWxlciB0byByZWNvcmQgYSBDUFUgcHJvZmlsZSB3aGlsZVxuICAgKiBpdCBleGVyY2lzZXMgdGhlIGNoYW5nZSBkZXRlY3Rvci4gRXhhbXBsZTpcbiAgICpcbiAgICogYGBgXG4gICAqIG5nLnByb2ZpbGVyLnRpbWVDaGFuZ2VEZXRlY3Rpb24oe3JlY29yZDogdHJ1ZX0pXG4gICAqIGBgYFxuICAgKi9cbiAgdGltZUNoYW5nZURldGVjdGlvbihjb25maWc6IGFueSk6IENoYW5nZURldGVjdGlvblBlcmZSZWNvcmQge1xuICAgIGNvbnN0IHJlY29yZCA9IGNvbmZpZyAmJiBjb25maWdbJ3JlY29yZCddO1xuICAgIGNvbnN0IHByb2ZpbGVOYW1lID0gJ0NoYW5nZSBEZXRlY3Rpb24nO1xuICAgIC8vIFByb2ZpbGVyIGlzIG5vdCBhdmFpbGFibGUgaW4gQW5kcm9pZCBicm93c2Vycywgbm9yIGluIElFIDkgd2l0aG91dCBkZXYgdG9vbHMgb3BlbmVkXG4gICAgY29uc3QgaXNQcm9maWxlckF2YWlsYWJsZSA9IHdpbmRvdy5jb25zb2xlLnByb2ZpbGUgIT0gbnVsbDtcbiAgICBpZiAocmVjb3JkICYmIGlzUHJvZmlsZXJBdmFpbGFibGUpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLnByb2ZpbGUocHJvZmlsZU5hbWUpO1xuICAgIH1cbiAgICBjb25zdCBzdGFydCA9IGdldERPTSgpLnBlcmZvcm1hbmNlTm93KCk7XG4gICAgbGV0IG51bVRpY2tzID0gMDtcbiAgICB3aGlsZSAobnVtVGlja3MgPCA1IHx8IChnZXRET00oKS5wZXJmb3JtYW5jZU5vdygpIC0gc3RhcnQpIDwgNTAwKSB7XG4gICAgICB0aGlzLmFwcFJlZi50aWNrKCk7XG4gICAgICBudW1UaWNrcysrO1xuICAgIH1cbiAgICBjb25zdCBlbmQgPSBnZXRET00oKS5wZXJmb3JtYW5jZU5vdygpO1xuICAgIGlmIChyZWNvcmQgJiYgaXNQcm9maWxlckF2YWlsYWJsZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUucHJvZmlsZUVuZChwcm9maWxlTmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IG1zUGVyVGljayA9IChlbmQgLSBzdGFydCkgLyBudW1UaWNrcztcbiAgICB3aW5kb3cuY29uc29sZS5sb2coYHJhbiAke251bVRpY2tzfSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlc2ApO1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgJHttc1BlclRpY2sudG9GaXhlZCgyKX0gbXMgcGVyIGNoZWNrYCk7XG5cbiAgICByZXR1cm4gbmV3IENoYW5nZURldGVjdGlvblBlcmZSZWNvcmQobXNQZXJUaWNrLCBudW1UaWNrcyk7XG4gIH1cbn1cbiJdfQ==