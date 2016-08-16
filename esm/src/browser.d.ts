import { ExceptionHandler, PlatformRef, Provider } from '@angular/core';
import { AnimationDriver } from '../src/dom/animation_driver';
export declare const INTERNAL_BROWSER_PLATFORM_PROVIDERS: Provider[];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
export declare const BROWSER_SANITIZATION_PROVIDERS: Array<any>;
/**
 * @experimental API related to bootstrapping are still under review.
 */
export declare const platformBrowser: (extraProviders?: any[]) => PlatformRef;
export declare function initDomAdapter(): void;
export declare function _exceptionHandler(): ExceptionHandler;
export declare function _document(): any;
export declare function _resolveDefaultAnimationDriver(): AnimationDriver;
/**
 * The ng module for the browser.
 *
 * @experimental
 */
export declare class BrowserModule {
}
