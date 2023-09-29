/**
 * @license Angular v17.0.0-next.6+sha-a54713c
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */


import { ANIMATION_MODULE_TYPE } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { AnimationDriver } from '@angular/animations/browser';
import { AnimationFactory } from '@angular/animations';
import { AnimationMetadata } from '@angular/animations';
import { ApplicationRef } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { ModuleWithProviders } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Provider } from '@angular/core';
import { RendererFactory2 } from '@angular/core';
import { ɵAnimationEngine } from '@angular/animations/browser';
import { ɵAnimationStyleNormalizer } from '@angular/animations/browser';

export { ANIMATION_MODULE_TYPE }

/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
export declare class BrowserAnimationsModule {
    /**
     * Configures the module based on the specified object.
     *
     * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
     * @see {@link BrowserAnimationsModuleConfig}
     *
     * @usageNotes
     * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
     * function as follows:
     * ```
     * @NgModule({
     *   imports: [BrowserAnimationsModule.withConfig(config)]
     * })
     * class MyNgModule {}
     * ```
     */
    static withConfig(config: BrowserAnimationsModuleConfig): ModuleWithProviders<BrowserAnimationsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserAnimationsModule>;
}

/**
 * Object used to configure the behavior of {@link BrowserAnimationsModule}
 * @publicApi
 */
export declare interface BrowserAnimationsModuleConfig {
    /**
     *  Whether animations should be disabled. Passing this is identical to providing the
     * `NoopAnimationsModule`, but it can be controlled based on a runtime value.
     */
    disableAnimations?: boolean;
}

/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export declare class NoopAnimationsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NoopAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NoopAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NoopAnimationsModule>;
}

/**
 * Returns the set of [dependency-injection providers](guide/glossary#provider)
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```typescript
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
export declare function provideAnimations(): Provider[];

/**
 * Returns the set of [dependency-injection providers](guide/glossary#provider)
 * to disable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to bootstrap an application using
 * the `bootstrapApplication` function, but you need to disable animations
 * (for example, when running tests).
 *
 * ```typescript
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideNoopAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
export declare function provideNoopAnimations(): Provider[];

export declare class ɵBrowserAnimationBuilder extends AnimationBuilder {
    private _nextAnimationId;
    private _renderer;
    constructor(rootRenderer: RendererFactory2, doc: Document);
    build(animation: AnimationMetadata | AnimationMetadata[]): AnimationFactory;
    static ɵfac: i0.ɵɵFactoryDeclaration<ɵBrowserAnimationBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ɵBrowserAnimationBuilder>;
}

export declare class ɵInjectableAnimationEngine extends ɵAnimationEngine implements OnDestroy {
    constructor(doc: Document, driver: AnimationDriver, normalizer: ɵAnimationStyleNormalizer, appRef: ApplicationRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ɵInjectableAnimationEngine, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ɵInjectableAnimationEngine>;
}

export { }
