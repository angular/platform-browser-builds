"use strict";
var platform_location_1 = require('./platform_location');
var browser_platform_location_1 = require('../../browser/location/browser_platform_location');
var core_1 = require('@angular/core');
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 */
exports.WORKER_RENDER_LOCATION_PROVIDERS = [
    platform_location_1.MessageBasedPlatformLocation,
    browser_platform_location_1.BrowserPlatformLocation,
    { provide: core_1.APP_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [core_1.Injector] }
];
function initUiLocation(injector) {
    return function () {
        var zone = injector.get(core_1.NgZone);
        zone.runGuarded(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=location_providers.js.map