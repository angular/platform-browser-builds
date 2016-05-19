"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_location_1 = require('./platform_location');
/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 */
exports.WORKER_APP_LOCATION_PROVIDERS = [
    /* @ts2dart_Provider */ { provide: common_1.PlatformLocation, useClass: platform_location_1.WebWorkerPlatformLocation },
    {
        provide: core_1.APP_INITIALIZER,
        useFactory: function (platformLocation, zone) { return function () {
            return initWorkerLocation(platformLocation, zone);
        }; },
        multi: true,
        deps: [common_1.PlatformLocation, core_1.NgZone]
    }
];
function initWorkerLocation(platformLocation, zone) {
    return zone.runGuarded(function () { return platformLocation.init(); });
}
//# sourceMappingURL=location_providers.js.map