/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/**
 * Object used to configure the behavior of {@link BrowserAnimationsModule}
 * @publicApi
 */
export interface BrowserAnimationsModuleConfig {
    /**
     *  Whether animations should be disabled. Passing this is identical to providing the
     * `NoopAnimationsModule`, but it can be controlled based on a runtime value.
     */
    disableAnimations?: boolean;
}
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
     * @see `BrowserAnimationsModuleConfig`
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
    static ɵfac: i0.ɵɵFactoryDef<BrowserAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<BrowserAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDef<BrowserAnimationsModule>;
}
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
export declare class NoopAnimationsModule {
    static ɵfac: i0.ɵɵFactoryDef<NoopAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<NoopAnimationsModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDef<NoopAnimationsModule>;
}
