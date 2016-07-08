import { AppModuleFactory, AppModuleRef, ExceptionHandler, PlatformRef } from '@angular/core';
import { AnimationDriver } from '../src/dom/animation_driver';
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to `platform`.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const BROWSER_PLATFORM_PROVIDERS: Array<any>;
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
export declare const BROWSER_SANITIZATION_PROVIDERS: Array<any>;
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef
 * PlatformRef.application}.
 *
 * @experimental API related to bootstrapping are still under review.
 */
export declare const BROWSER_APP_PROVIDERS: Array<any>;
/**
 * @experimental API related to bootstrapping are still under review.
 */
export declare function browserPlatform(): PlatformRef;
export declare function initDomAdapter(): void;
export declare function _exceptionHandler(): ExceptionHandler;
export declare function _document(): any;
export declare function _resolveDefaultAnimationDriver(): AnimationDriver;
/**
 * The app module for the browser.
 * @stable
 */
export declare class BrowserModule {
}
/**
 * Creates an instance of an `@AppModule` for the browser platform
 * for offline compilation.
 *
 * ## Simple Example
 *
 * ```typescript
 * my_module.ts:
 *
 * @AppModule({
 *   modules: [BrowserModule]
 * })
 * class MyModule {}
 *
 * main.ts:
 * import {MyModuleNgFactory} from './my_module.ngfactory';
 * import {bootstrapModuleFactory} from '@angular/platform-browser';
 *
 * let moduleRef = bootstrapModuleFactory(MyModuleNgFactory);
 * ```
 * @stable
 */
export declare function bootstrapModuleFactory<M>(moduleFactory: AppModuleFactory<M>): AppModuleRef<M>;
