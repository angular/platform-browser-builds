import { NgZone, APP_INITIALIZER } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { WebWorkerPlatformLocation } from './platform_location';
/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 */
export const WORKER_APP_LOCATION_PROVIDERS = [
    /* @ts2dart_Provider */ { provide: PlatformLocation, useClass: WebWorkerPlatformLocation },
    {
        provide: APP_INITIALIZER,
        useFactory: (platformLocation, zone) => () => initWorkerLocation(platformLocation, zone),
        multi: true,
        deps: [PlatformLocation, NgZone]
    }
];
function initWorkerLocation(platformLocation, zone) {
    return zone.runGuarded(() => platformLocation.init());
}
//# sourceMappingURL=location_providers.js.map