import { MessageBasedPlatformLocation } from './platform_location';
import { BrowserPlatformLocation } from '../../browser/location/browser_platform_location';
import { Injector } from '@angular/core';
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 */
export declare const WORKER_RENDER_LOCATION_PROVIDERS: (typeof MessageBasedPlatformLocation | typeof BrowserPlatformLocation | {
    provide: any;
    useFactory: (injector: Injector) => () => void;
    multi: boolean;
    deps: typeof Injector[];
})[];
