import { PlatformRef } from '@angular/core';
/**
 * Providers for the browser test platform
 *
 * @deprecated Use `browserTestingPlatform()` or create a custom platform factory via
 * `createPlatformFactory(browserTestingPlatform, ...)`
 */
export declare const TEST_BROWSER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @deprecated Use initTestEnvironment with BrowserTestModule instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
export declare const TEST_BROWSER_APPLICATION_PROVIDERS: Array<any>;
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const browserTestingPlatform: (extraProviders?: any[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @experimental
 */
export declare class BrowserTestingModule {
}
