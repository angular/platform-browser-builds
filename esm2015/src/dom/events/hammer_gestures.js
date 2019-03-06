/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, Optional, ɵConsole as Console } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Supported HammerJS recognizer event names.
 * @type {?}
 */
const EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
/**
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * \@publicApi
 * @type {?}
 */
export const HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {\@link HammerLoader} to Angular.
 *
 * \@publicApi
 * @type {?}
 */
export const HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * @record
 */
export function HammerInstance() { }
if (false) {
    /**
     * @param {?} eventName
     * @param {?=} callback
     * @return {?}
     */
    HammerInstance.prototype.on = function (eventName, callback) { };
    /**
     * @param {?} eventName
     * @param {?=} callback
     * @return {?}
     */
    HammerInstance.prototype.off = function (eventName, callback) { };
    /**
     * @return {?}
     */
    HammerInstance.prototype.destroy = function () { };
}
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * \@publicApi
 */
export class HammerGestureConfig {
    constructor() {
        /**
         * A set of supported event names for gestures to be used in Angular.
         * Angular supports all built-in recognizers, as listed in
         * [HammerJS documentation](http://hammerjs.github.io/).
         */
        this.events = [];
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
         * [HammerJS documentation](http://hammerjs.github.io/).
         *
         */
        this.overrides = {};
    }
    /**
     * Creates a [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
     * and attaches it to a given HTML element.
     * @param {?} element The element that will recognize gestures.
     * @return {?} A HammerJS event-manager object.
     */
    buildHammer(element) {
        /** @type {?} */
        const mc = new (/** @type {?} */ (Hammer))(element, this.options);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (const eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}
HammerGestureConfig.decorators = [
    { type: Injectable },
];
/** @nocollapse */ HammerGestureConfig.ngInjectableDef = i0.defineInjectable({ token: HammerGestureConfig, factory: function HammerGestureConfig_Factory(t) { return new (t || HammerGestureConfig)(); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(HammerGestureConfig, [{
        type: Injectable
    }], null, null);
if (false) {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](http://hammerjs.github.io/).
     * @type {?}
     */
    HammerGestureConfig.prototype.events;
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
     * [HammerJS documentation](http://hammerjs.github.io/).
     *
     * @type {?}
     */
    HammerGestureConfig.prototype.overrides;
    /**
     * Properties whose default values can be overridden for a given event.
     * Different sets of properties apply to different events.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](http://hammerjs.github.io/).
     * @type {?}
     */
    HammerGestureConfig.prototype.options;
}
export class HammerGesturesPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     * @param {?} _config
     * @param {?} console
     * @param {?=} loader
     */
    constructor(doc, _config, console, loader) {
        super(doc);
        this._config = _config;
        this.console = console;
        this.loader = loader;
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!((/** @type {?} */ (window))).Hammer && !this.loader) {
            this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` +
                `loaded and no custom loader has been specified.`);
            return false;
        }
        return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        /** @type {?} */
        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        // If Hammer is not present but a loader is specified, we defer adding the event listener
        // until Hammer is loaded.
        if (!((/** @type {?} */ (window))).Hammer && this.loader) {
            // This `addEventListener` method returns a function to remove the added listener.
            // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
            // than remove anything.
            /** @type {?} */
            let cancelRegistration = false;
            /** @type {?} */
            let deregister = () => { cancelRegistration = true; };
            this.loader()
                .then(() => {
                // If Hammer isn't actually loaded when the custom loader resolves, give up.
                if (!((/** @type {?} */ (window))).Hammer) {
                    this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                    deregister = () => { };
                    return;
                }
                if (!cancelRegistration) {
                    // Now that Hammer is loaded and the listener is being loaded for real,
                    // the deregistration function changes from canceling registration to removal.
                    deregister = this.addEventListener(element, eventName, handler);
                }
            })
                .catch(() => {
                this.console.warn(`The "${eventName}" event cannot be bound because the custom ` +
                    `Hammer.JS loader failed.`);
                deregister = () => { };
            });
            // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
            // can change the behavior of `deregister` once the listener is added. Using a closure in
            // this way allows us to avoid any additional data structures to track listener removal.
            return () => { deregister(); };
        }
        return zone.runOutsideAngular(() => {
            // Creating the manager bind events, must be done outside of angular
            /** @type {?} */
            const mc = this._config.buildHammer(element);
            /** @type {?} */
            const callback = function (eventObj) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return () => {
                mc.off(eventName, callback);
                // destroy mc to prevent memory leak
                if (typeof mc.destroy === 'function') {
                    mc.destroy();
                }
            };
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    isCustomEvent(eventName) { return this._config.events.indexOf(eventName) > -1; }
}
HammerGesturesPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HammerGesturesPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG,] }] },
    { type: Console },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HAMMER_LOADER,] }] }
];
/** @nocollapse */ HammerGesturesPlugin.ngInjectableDef = i0.defineInjectable({ token: HammerGesturesPlugin, factory: function HammerGesturesPlugin_Factory(t) { return new (t || HammerGesturesPlugin)(i0.inject(DOCUMENT), i0.inject(HAMMER_GESTURE_CONFIG), i0.inject(i0.ɵConsole), i0.inject(HAMMER_LOADER, 8)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(HammerGesturesPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: HammerGestureConfig, decorators: [{
                type: Inject,
                args: [HAMMER_GESTURE_CONFIG]
            }] }, { type: i0.ɵConsole }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [HAMMER_LOADER]
            }] }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    HammerGesturesPlugin.prototype._config;
    /**
     * @type {?}
     * @private
     */
    HammerGesturesPlugin.prototype.console;
    /**
     * @type {?}
     * @private
     */
    HammerGesturesPlugin.prototype.loader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyX2dlc3R1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7O01BSzdDLFdBQVcsR0FBRzs7SUFFbEIsS0FBSyxFQUFFLElBQUk7SUFDWCxVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLFFBQVEsRUFBRSxJQUFJO0lBQ2QsV0FBVyxFQUFFLElBQUk7SUFDakIsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTtJQUNoQixPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJOztJQUVmLE9BQU8sRUFBRSxJQUFJO0lBQ2IsWUFBWSxFQUFFLElBQUk7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsVUFBVSxFQUFFLElBQUk7SUFDaEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTs7SUFFaEIsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsSUFBSTs7SUFFZixRQUFRLEVBQUUsSUFBSTtJQUNkLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGNBQWMsRUFBRSxJQUFJOztJQUVwQixPQUFPLEVBQUUsSUFBSTtJQUNiLFdBQVcsRUFBRSxJ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QUFVLENBQUMsY0FBYSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDO1lBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDM0IsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLG9DQUFvQztnQkFDcEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO29CQUNwQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFNBQWlCLElBQWEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFuRmxHLFVBQVU7Ozs7NENBR0osTUFBTSxTQUFDLFFBQVE7WUFDZ0MsbUJBQW1CLHVCQUFsRSxNQUFNLFNBQUMscUJBQXFCO1lBcEorQixPQUFPOzRDQXFKbEUsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhOztvRUFKMUIsb0JBQW9CLHVFQUFwQixvQkFBb0IsWUFFbkIsUUFBUSxhQUNSLHFCQUFxQixxQ0FDVCxhQUFhO21DQUoxQixvQkFBb0I7Y0FEaEMsVUFBVTs7c0JBR0osTUFBTTt1QkFBQyxRQUFROzBCQUNnQyxtQkFBbUI7c0JBQWxFLE1BQU07dUJBQUMscUJBQXFCOztzQkFDNUIsUUFBUTs7c0JBQUksTUFBTTt1QkFBQyxhQUFhOzs7Ozs7O0lBRGpDLHVDQUFtRTs7Ozs7SUFBRSx1Q0FBd0I7Ozs7O0lBQzdGLHNDQUFxRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgybVDb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuLi9kb21fdG9rZW5zJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogU3VwcG9ydGVkIEhhbW1lckpTIHJlY29nbml6ZXIgZXZlbnQgbmFtZXMuXG4gKi9cbmNvbnN0IEVWRU5UX05BTUVTID0ge1xuICAvLyBwYW5cbiAgJ3Bhbic6IHRydWUsXG4gICdwYW5zdGFydCc6IHRydWUsXG4gICdwYW5tb3ZlJzogdHJ1ZSxcbiAgJ3BhbmVuZCc6IHRydWUsXG4gICdwYW5jYW5jZWwnOiB0cnVlLFxuICAncGFubGVmdCc6IHRydWUsXG4gICdwYW5yaWdodCc6IHRydWUsXG4gICdwYW51cCc6IHRydWUsXG4gICdwYW5kb3duJzogdHJ1ZSxcbiAgLy8gcGluY2hcbiAgJ3BpbmNoJzogdHJ1ZSxcbiAgJ3BpbmNoc3RhcnQnOiB0cnVlLFxuICAncGluY2htb3ZlJzogdHJ1ZSxcbiAgJ3BpbmNoZW5kJzogdHJ1ZSxcbiAgJ3BpbmNoY2FuY2VsJzogdHJ1ZSxcbiAgJ3BpbmNoaW4nOiB0cnVlLFxuICAncGluY2hvdXQnOiB0cnVlLFxuICAvLyBwcmVzc1xuICAncHJlc3MnOiB0cnVlLFxuICAncHJlc3N1cCc6IHRydWUsXG4gIC8vIHJvdGF0ZVxuICAncm90YXRlJzogdHJ1ZSxcbiAgJ3JvdGF0ZXN0YXJ0JzogdHJ1ZSxcbiAgJ3JvdGF0ZW1vdmUnOiB0cnVlLFxuICAncm90YXRlZW5kJzogdHJ1ZSxcbiAgJ3JvdGF0ZWNhbmNlbCc6IHRydWUsXG4gIC8vIHN3aXBlXG4gICdzd2lwZSc6IHRydWUsXG4gICdzd2lwZWxlZnQnOiB0cnVlLFxuICAnc3dpcGVyaWdodCc6IHRydWUsXG4gICdzd2lwZXVwJzogdHJ1ZSxcbiAgJ3N3aXBlZG93bic6IHRydWUsXG4gIC8vIHRhcFxuICAndGFwJzogdHJ1ZSxcbn07XG5cbi8qKlxuICogREkgdG9rZW4gZm9yIHByb3ZpZGluZyBbSGFtbWVySlNdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKSBzdXBwb3J0IHRvIEFuZ3VsYXIuXG4gKiBAc2VlIGBIYW1tZXJHZXN0dXJlQ29uZmlnYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEhBTU1FUl9HRVNUVVJFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIYW1tZXJHZXN0dXJlQ29uZmlnPignSGFtbWVyR2VzdHVyZUNvbmZpZycpO1xuXG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBsb2FkcyBIYW1tZXJKUywgcmV0dXJuaW5nIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIG9uY2UgSGFtbWVySnMgaXMgbG9hZGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgSGFtbWVyTG9hZGVyID0gKCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIGEge0BsaW5rIEhhbW1lckxvYWRlcn0gdG8gQW5ndWxhci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfTE9BREVSID0gbmV3IEluamVjdGlvblRva2VuPEhhbW1lckxvYWRlcj4oJ0hhbW1lckxvYWRlcicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbW1lckluc3RhbmNlIHtcbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBkZXN0cm95PygpOiB2b2lkO1xufVxuXG4vKipcbiAqIEFuIGluamVjdGFibGUgW0hhbW1lckpTIE1hbmFnZXJdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLyNoYW1tZXIubWFuYWdlcilcbiAqIGZvciBnZXN0dXJlIHJlY29nbml0aW9uLiBDb25maWd1cmVzIHNwZWNpZmljIGV2ZW50IHJlY29nbml0aW9uLlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBBIHNldCBvZiBzdXBwb3J0ZWQgZXZlbnQgbmFtZXMgZm9yIGdlc3R1cmVzIHRvIGJlIHVzZWQgaW4gQW5ndWxhci5cbiAgICogQW5ndWxhciBzdXBwb3J0cyBhbGwgYnVpbHQtaW4gcmVjb2duaXplcnMsIGFzIGxpc3RlZCBpblxuICAgKiBbSGFtbWVySlMgZG9jdW1lbnRhdGlvbl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pLlxuICAgKi9cbiAgZXZlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAqIE1hcHMgZ2VzdHVyZSBldmVudCBuYW1lcyB0byBhIHNldCBvZiBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgKiB0aGF0IHNwZWNpZnkgb3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgKlxuICAqIFRoZSBrZXkgaXMgYSBzdXBwb3J0ZWQgZXZlbnQgbmFtZSB0byBiZSBjb25maWd1cmVkLFxuICAqIGFuZCB0aGUgb3B0aW9ucyBvYmplY3QgY29udGFpbnMgYSBzZXQgb2YgcHJvcGVydGllcywgd2l0aCBvdmVycmlkZSB2YWx1ZXNcbiAgKiB0byBiZSBhcHBsaWVkIHRvIHRoZSBuYW1lZCByZWNvZ25pemVyIGV2ZW50LlxuICAqIEZvciBleGFtcGxlLCB0byBkaXNhYmxlIHJlY29nbml0aW9uIG9mIHRoZSByb3RhdGUgZXZlbnQsIHNwZWNpZnlcbiAgKiAgYHtcInJvdGF0ZVwiOiB7XCJlbmFibGVcIjogZmFsc2V9fWAuXG4gICpcbiAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBwcmVzZW50IHRha2UgdGhlIEhhbW1lckpTIGRlZmF1bHQgdmFsdWVzLlxuICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgKiBhbmQgdGhlaXIgYWxsb3dlZCBhbmQgZGVmYXVsdCB2YWx1ZXMsIHNlZVxuICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXG4gICpcbiAgKi9cbiAgb3ZlcnJpZGVzOiB7W2tleTogc3RyaW5nXTogT2JqZWN0fSA9IHt9O1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzIHdob3NlIGRlZmF1bHQgdmFsdWVzIGNhbiBiZSBvdmVycmlkZGVuIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBEaWZmZXJlbnQgc2V0cyBvZiBwcm9wZXJ0aWVzIGFwcGx5IHRvIGRpZmZlcmVudCBldmVudHMuXG4gICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICovXG4gIG9wdGlvbnM/OiB7XG4gICAgY3NzUHJvcHM/OiBhbnk7IGRvbUV2ZW50cz86IGJvb2xlYW47IGVuYWJsZT86IGJvb2xlYW4gfCAoKG1hbmFnZXI6IGFueSkgPT4gYm9vbGVhbik7XG4gICAgcHJlc2V0PzogYW55W107XG4gICAgdG91Y2hBY3Rpb24/OiBzdHJpbmc7XG4gICAgcmVjb2duaXplcnM/OiBhbnlbXTtcbiAgICBpbnB1dENsYXNzPzogYW55O1xuICAgIGlucHV0VGFyZ2V0PzogRXZlbnRUYXJnZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBbSGFtbWVySlMgTWFuYWdlcl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9hcGkvI2hhbW1lci5tYW5hZ2VyKVxuICAgKiBhbmQgYXR0YWNoZXMgaXQgdG8gYSBnaXZlbiBIVE1MIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCByZWNvZ25pemUgZ2VzdHVyZXMuXG4gICAqIEByZXR1cm5zIEEgSGFtbWVySlMgZXZlbnQtbWFuYWdlciBvYmplY3QuXG4gICAqL1xuICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlIHtcbiAgICBjb25zdCBtYyA9IG5ldyBIYW1tZXIgIShlbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgbWMuZ2V0KCdwaW5jaCcpLnNldCh7ZW5hYmxlOiB0cnVlfSk7XG4gICAgbWMuZ2V0KCdyb3RhdGUnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuXG4gICAgZm9yIChjb25zdCBldmVudE5hbWUgaW4gdGhpcy5vdmVycmlkZXMpIHtcbiAgICAgIG1jLmdldChldmVudE5hbWUpLnNldCh0aGlzLm92ZXJyaWRlc1tldmVudE5hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSxcbiAgICAgIEBJbmplY3QoSEFNTUVSX0dFU1RVUkVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IEhhbW1lckdlc3R1cmVDb25maWcsIHByaXZhdGUgY29uc29sZTogQ29uc29sZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSEFNTUVSX0xPQURFUikgcHJpdmF0ZSBsb2FkZXI/OiBIYW1tZXJMb2FkZXJ8bnVsbCkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghRVZFTlRfTkFNRVMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lLnRvTG93ZXJDYXNlKCkpICYmICF0aGlzLmlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiAhdGhpcy5sb2FkZXIpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgIGBUaGUgXCIke2V2ZW50TmFtZX1cIiBldmVudCBjYW5ub3QgYmUgYm91bmQgYmVjYXVzZSBIYW1tZXIuSlMgaXMgbm90IGAgK1xuICAgICAgICAgIGBsb2FkZWQgYW5kIG5vIGN1c3RvbSBsb2FkZXIgaGFzIGJlZW4gc3BlY2lmaWVkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gSWYgSGFtbWVyIGlzIG5vdCBwcmVzZW50IGJ1dCBhIGxvYWRlciBpcyBzcGVjaWZpZWQsIHdlIGRlZmVyIGFkZGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvLyB1bnRpbCBIYW1tZXIgaXMgbG9hZGVkLlxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiB0aGlzLmxvYWRlcikge1xuICAgICAgLy8gVGhpcyBgYWRkRXZlbnRMaXN0ZW5lcmAgbWV0aG9kIHJldHVybnMgYSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGFkZGVkIGxpc3RlbmVyLlxuICAgICAgLy8gVW50aWwgSGFtbWVyIGlzIGxvYWRlZCwgdGhlIHJldHVybmVkIGZ1bmN0aW9uIG5lZWRzIHRvICpjYW5jZWwqIHRoZSByZWdpc3RyYXRpb24gcmF0aGVyXG4gICAgICAvLyB0aGFuIHJlbW92ZSBhbnl0aGluZy5cbiAgICAgIGxldCBjYW5jZWxSZWdpc3RyYXRpb24gPSBmYWxzZTtcbiAgICAgIGxldCBkZXJlZ2lzdGVyOiBGdW5jdGlvbiA9ICgpID0+IHsgY2FuY2VsUmVnaXN0cmF0aW9uID0gdHJ1ZTsgfTtcblxuICAgICAgdGhpcy5sb2FkZXIoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIElmIEhhbW1lciBpc24ndCBhY3R1YWxseSBsb2FkZWQgd2hlbiB0aGUgY3VzdG9tIGxvYWRlciByZXNvbHZlcywgZ2l2ZSB1cC5cbiAgICAgICAgICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lcikge1xuICAgICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgIGBUaGUgY3VzdG9tIEhBTU1FUl9MT0FERVIgY29tcGxldGVkLCBidXQgSGFtbWVyLkpTIGlzIG5vdCBwcmVzZW50LmApO1xuICAgICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjYW5jZWxSZWdpc3RyYXRpb24pIHtcbiAgICAgICAgICAgICAgLy8gTm93IHRoYXQgSGFtbWVyIGlzIGxvYWRlZCBhbmQgdGhlIGxpc3RlbmVyIGlzIGJlaW5nIGxvYWRlZCBmb3IgcmVhbCxcbiAgICAgICAgICAgICAgLy8gdGhlIGRlcmVnaXN0cmF0aW9uIGZ1bmN0aW9uIGNoYW5nZXMgZnJvbSBjYW5jZWxpbmcgcmVnaXN0cmF0aW9uIHRvIHJlbW92YWwuXG4gICAgICAgICAgICAgIGRlcmVnaXN0ZXIgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVGhlIFwiJHtldmVudE5hbWV9XCIgZXZlbnQgY2Fubm90IGJlIGJvdW5kIGJlY2F1c2UgdGhlIGN1c3RvbSBgICtcbiAgICAgICAgICAgICAgICBgSGFtbWVyLkpTIGxvYWRlciBmYWlsZWQuYCk7XG4gICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgKmV4ZWN1dGVzKiBgZGVyZWdpc3RlcmAgKGFuZCBub3QgYGRlcmVnaXN0ZXJgIGl0c2VsZikgc28gdGhhdCB3ZVxuICAgICAgLy8gY2FuIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgYGRlcmVnaXN0ZXJgIG9uY2UgdGhlIGxpc3RlbmVyIGlzIGFkZGVkLiBVc2luZyBhIGNsb3N1cmUgaW5cbiAgICAgIC8vIHRoaXMgd2F5IGFsbG93cyB1cyB0byBhdm9pZCBhbnkgYWRkaXRpb25hbCBkYXRhIHN0cnVjdHVyZXMgdG8gdHJhY2sgbGlzdGVuZXIgcmVtb3ZhbC5cbiAgICAgIHJldHVybiAoKSA9PiB7IGRlcmVnaXN0ZXIoKTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBDcmVhdGluZyB0aGUgbWFuYWdlciBiaW5kIGV2ZW50cywgbXVzdCBiZSBkb25lIG91dHNpZGUgb2YgYW5ndWxhclxuICAgICAgY29uc3QgbWMgPSB0aGlzLl9jb25maWcuYnVpbGRIYW1tZXIoZWxlbWVudCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50T2JqOiBIYW1tZXJJbnB1dCkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoZnVuY3Rpb24oKSB7IGhhbmRsZXIoZXZlbnRPYmopOyB9KTtcbiAgICAgIH07XG4gICAgICBtYy5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG1jLm9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gZGVzdHJveSBtYyB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgICAgIGlmICh0eXBlb2YgbWMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1jLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudHMuaW5kZXhPZihldmVudE5hbWUpID4gLTE7IH1cbn1cbiJdfQ==