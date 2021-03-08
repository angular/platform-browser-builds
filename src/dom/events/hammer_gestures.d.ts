import { InjectionToken, Provider, ɵConsole as Console } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */
export declare const HAMMER_GESTURE_CONFIG: InjectionToken<HammerGestureConfig>;
/**
 * Function that loads HammerJS, returning a promise that is resolved once HammerJs is loaded.
 *
 * @publicApi
 */
export declare type HammerLoader = () => Promise<void>;
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */
export declare const HAMMER_LOADER: InjectionToken<HammerLoader>;
export interface HammerInstance {
    on(eventName: string, callback?: Function): void;
    off(eventName: string, callback?: Function): void;
    destroy?(): void;
}
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */
export declare class HammerGestureConfig {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](https://hammerjs.github.io/).
     */
    events: string[];
    /**
     * Maps gesture event names to a set of configuration options
     * that specify overrides to the default values for specific properties.
     *
     * The key is a supported event name to be configured,
     * and the options object contains a set of properties, with override values
     * to be applied to the named recognizer event.
     * For example, to disable recognition of the rotate event, specify
     *  `{"rotate": {"enable": false}}`.
     *
     * Properties that are not present take the HammerJS default values.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](https://hammerjs.github.io/).
     *
     */
    overrides: {
        [key: string]: Object;
    };
    /**
     * Properties whose default values can be overridden for a given event.
     * Different sets of properties apply to different events.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](https://hammerjs.github.io/).
     */
    options?: {
        cssProps?: any;
        domEvents?: boolean;
        enable?: boolean | ((manager: any) => boolean);
        preset?: any[];
        touchAction?: string;
        recognizers?: any[];
        inputClass?: any;
        inputTarget?: EventTarget;
    };
    /**
     * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    buildHammer(element: HTMLElement): HammerInstance;
    static ɵfac: i0.ɵɵFactoryDef<HammerGestureConfig, never>;
    static ɵprov: i0.ɵɵInjectableDef<HammerGestureConfig>;
}
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
export declare class HammerGesturesPlugin extends EventManagerPlugin {
    private _config;
    private console;
    private loader?;
    private _loaderPromise;
    constructor(doc: any, _config: HammerGestureConfig, console: Console, loader?: HammerLoader | null | undefined);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    isCustomEvent(eventName: string): boolean;
    static ɵfac: i0.ɵɵFactoryDef<HammerGesturesPlugin, [null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<HammerGesturesPlugin>;
}
/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */
export declare const HAMMER_PROVIDERS__POST_R3__: never[];
/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */
export declare const HAMMER_PROVIDERS__PRE_R3__: Provider[];
export declare const HAMMER_PROVIDERS: Provider[];
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */
export declare class HammerModule {
    static ɵfac: i0.ɵɵFactoryDef<HammerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<HammerModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDef<HammerModule>;
}
