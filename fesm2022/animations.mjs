/**
 * @license Angular v17.0.0-next.6+sha-07602eb
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { ViewEncapsulation, Injectable, Inject, RendererFactory2, NgZone, ANIMATION_MODULE_TYPE, NgModule } from '@angular/core';
export { ANIMATION_MODULE_TYPE } from '@angular/core';
import { ɵDomRendererFactory2, BrowserModule } from '@angular/platform-browser';
import { AnimationBuilder, sequence, AnimationFactory } from '@angular/animations';
import * as i1 from '@angular/animations/browser';
import { ɵAnimationEngine, ɵWebAnimationsStyleNormalizer, ɵAnimationRendererFactory, ɵAnimationStyleNormalizer, AnimationDriver, ɵWebAnimationsDriver, NoopAnimationDriver } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';

class BrowserAnimationBuilder extends AnimationBuilder {
    constructor(rootRenderer, doc) {
        super();
        this._nextAnimationId = 0;
        const typeData = { id: '0', encapsulation: ViewEncapsulation.None, styles: [], data: { animation: [] } };
        this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    }
    build(animation) {
        const id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        const entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationBuilder, deps: [{ token: i0.RendererFactory2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationBuilder }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationBuilder, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.RendererFactory2 }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
class BrowserAnimationFactory extends AnimationFactory {
    constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
    }
    create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    }
}
class RendererAnimationPlayer {
    constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
    }
    _command(command, ...args) {
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    }
    onDone(fn) {
        this._listen('done', fn);
    }
    onStart(fn) {
        this._listen('start', fn);
    }
    onDestroy(fn) {
        this._listen('destroy', fn);
    }
    init() {
        this._command('init');
    }
    hasStarted() {
        return this._started;
    }
    play() {
        this._command('play');
        this._started = true;
    }
    pause() {
        this._command('pause');
    }
    restart() {
        this._command('restart');
    }
    finish() {
        this._command('finish');
    }
    destroy() {
        this._command('destroy');
    }
    reset() {
        this._command('reset');
        this._started = false;
    }
    setPosition(p) {
        this._command('setPosition', p);
    }
    getPosition() {
        return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
    }
}
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, `@@${id}:${command}`, args);
}

class InjectableAnimationEngine extends ɵAnimationEngine {
    // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
    // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
    // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
    constructor(doc, driver, normalizer, appRef) {
        super(doc, driver, normalizer);
    }
    ngOnDestroy() {
        this.flush();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: InjectableAnimationEngine, deps: [{ token: DOCUMENT }, { token: i1.AnimationDriver }, { token: i1.ɵAnimationStyleNormalizer }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: InjectableAnimationEngine }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: InjectableAnimationEngine, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.AnimationDriver }, { type: i1.ɵAnimationStyleNormalizer }, { type: i0.ApplicationRef }] });
function instantiateDefaultStyleNormalizer() {
    return new ɵWebAnimationsStyleNormalizer();
}
function instantiateRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
const SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [ɵDomRendererFactory2, ɵAnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: () => new ɵWebAnimationsDriver() },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useClass: NoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];

/**
 * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
class BrowserAnimationsModule {
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
    static withConfig(config) {
        return {
            ngModule: BrowserAnimationsModule,
            providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS :
                BROWSER_ANIMATIONS_PROVIDERS
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationsModule, providers: BROWSER_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: BrowserAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_ANIMATIONS_PROVIDERS,
                }]
        }] });
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
function provideAnimations() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideAnimations` call results in app code.
    return [...BROWSER_ANIMATIONS_PROVIDERS];
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
class NoopAnimationsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: NoopAnimationsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: NoopAnimationsModule, exports: [BrowserModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: NoopAnimationsModule, providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS, imports: [BrowserModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.6+sha-07602eb", ngImport: i0, type: NoopAnimationsModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                }]
        }] });
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
function provideNoopAnimations() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideNoopAnimations` call results in app code.
    return [...BROWSER_NOOP_ANIMATIONS_PROVIDERS];
}

/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */

/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */

export { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations, provideNoopAnimations, BrowserAnimationBuilder as ɵBrowserAnimationBuilder, InjectableAnimationEngine as ɵInjectableAnimationEngine };
//# sourceMappingURL=animations.mjs.map
