/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken, ɵConsole as Console } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
/**
 * A DI token that you can use to provide{@link HammerGestureConfig} to Angular. Use it to configure
 * Hammer gestures.
 *
 * @experimental
 */
export declare const HAMMER_GESTURE_CONFIG: InjectionToken<HammerGestureConfig>;
/** Function that loads HammerJS, returning a promise that is resolved once HammerJs is loaded. */
export declare type HammerLoader = (() => Promise<void>) | null;
/** Injection token used to provide a {@link HammerLoader} to Angular. */
export declare const HAMMER_LOADER: InjectionToken<HammerLoader>;
export interface HammerInstance {
    on(eventName: string, callback?: Function): void;
    off(eventName: string, callback?: Function): void;
}
/**
 * @experimental
 */
export declare class HammerGestureConfig {
    events: string[];
    overrides: {
        [key: string]: Object;
    };
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
    buildHammer(element: HTMLElement): HammerInstance;
}
export declare class HammerGesturesPlugin extends EventManagerPlugin {
    private _config;
    private console;
    private loader;
    constructor(doc: any, _config: HammerGestureConfig, console: Console, loader?: (() => Promise<void>) | null | undefined);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    isCustomEvent(eventName: string): boolean;
}
