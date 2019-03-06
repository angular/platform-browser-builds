import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, InjectionToken, Optional, ɵConsole as Console } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * Supported HammerJS recognizer event names.
 */
var EVENT_NAMES = {
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
 * @publicApi
 */
export var HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */
export var HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */
var HammerGestureConfig = /** @class */ (function () {
    function HammerGestureConfig() {
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
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    HammerGestureConfig.prototype.buildHammer = function (element) {
        var mc = new Hammer(element, this.options);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (var eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    };
    HammerGestureConfig.ngInjectableDef = i0.defineInjectable({ token: HammerGestureConfig, factory: function HammerGestureConfig_Factory(t) { return new (t || HammerGestureConfig)(); }, providedIn: null });
    return HammerGestureConfig;
}());
export { HammerGestureConfig };
/*@__PURE__*/ i0.ɵsetClassMetadata(HammerGestureConfig, [{
        type: Injectable
    }], null, null);
var HammerGesturesPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(HammerGesturesPlugin, _super);
    function HammerGesturesPlugin(doc, _config, console, loader) {
        var _this = _super.call(this, doc) || this;
        _this._config = _config;
        _this.console = console;
        _this.loader = loader;
        return _this;
    }
    HammerGesturesPlugin.prototype.supports = function (eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!window.Hammer && !this.loader) {
            this.console.warn("The \"" + eventName + "\" event cannot be bound because Hammer.JS is not " +
                "loaded and no custom loader has been specified.");
            return false;
        }
        return true;
    };
    HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        var zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        // If Hammer is not present but a loader is specified, we defer adding the event listener
        // until Hammer is loaded.
        if (!window.Hammer && this.loader) {
            // This `addEventListener` method returns a function to remove the added listener.
            // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
            // than remove anything.
            var cancelRegistration_1 = false;
            var deregister_1 = function () { cancelRegistration_1 = true; };
            this.loader()
                .then(function () {
                // If Hammer isn't actually loaded when the custom loader resolves, give up.
                if (!window.Hammer) {
                    _this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present.");
                    deregister_1 = function () { };
                    return;
                }
                if (!cancelRegistration_1) {
                    // Now that Hammer is loaded and the listener is being loaded for real,
                    // the deregistration function changes from canceling registration to removal.
                    deregister_1 = _this.addEventListener(element, eventName, handler);
                }
            })
                .catch(function () {
                _this.console.warn("The \"" + eventName + "\" event cannot be bound because the custom " +
                    "Hammer.JS loader failed.");
                deregister_1 = function () { };
            });
            // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
            // can change the behavior of `deregister` once the listener is added. Using a closure in
            // this way allows us to avoid any additional data structures to track listener removal.
            return function () { deregister_1(); };
        }
        return zone.runOutsideAngular(function () {
            // Creating the manager bind events, must be done outside of angular
            var mc = _this._config.buildHammer(element);
            var callback = function (eventObj) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return function () {
                mc.off(eventName, callback);
                // destroy mc to prevent memory leak
                if (typeof mc.destroy === 'function') {
                    mc.destroy();
                }
            };
        });
    };
    HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
    HammerGesturesPlugin.ngInjectableDef = i0.defineInjectable({ token: HammerGesturesPlugin, factory: function HammerGesturesPlugin_Factory(t) { return new (t || HammerGesturesPlugin)(i0.inject(DOCUMENT), i0.inject(HAMMER_GESTURE_CONFIG), i0.inject(i0.ɵConsole), i0.inject(HAMMER_LOADER, 8)); }, providedIn: null });
    return HammerGesturesPlugin;
}(EventManagerPlugin));
export { HammerGesturesPlugin };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyX2dlc3R1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUVuRDs7R0FFRztBQUNILElBQU0sV0FBVyxHQUFHO0lBQ2xCLE1BQU07SUFDTixLQUFLLEVBQUUsSUFBSTtJQUNYLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsUUFBUSxFQUFFLElBQUk7SUFDZCxXQUFXLEVBQUUsSUFBSTtJQUNqQixTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLE9BQU8sRUFBRSxJQUFJO0lBQ2IsU0FBUyxFQUFFLElBQUk7SUFDZixRQUFRO0lBQ1IsT0FBTyxFQUFFLElBQUk7SUFDYixZQUFZLEVBQUUsSUFBSTtJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUUsSUFBSTtJQUNoQixhQUFhLEVBQUUsSUFBSTtJQUNuQixTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVE7SUFDUixPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJO0lBQ2YsU0FBUztJQUNULFFBQVEsRUFBRSxJQUFJO0lBQ2QsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFLElBQUk7SUFDbEIsV0FBVyxFQUFFLElB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztZQUNGLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNCLE9BQU87Z0JBQ0wsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLG9DQUFvQztnQkFDcEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO29CQUNwQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2Q7WUFDSCxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBYSxHQUFiLFVBQWMsU0FBaUIsSUFBYSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0VBbEZ0RixvQkFBb0IsdUVBQXBCLG9CQUFvQixZQUVuQixRQUFRLGFBQ1IscUJBQXFCLHFDQUNULGFBQWE7K0JBN0p2QztDQTRPQyxBQXBGRCxDQUMwQyxrQkFBa0IsR0FtRjNEO1NBbkZZLG9CQUFvQjttQ0FBcEIsb0JBQW9CO2NBRGhDLFVBQVU7O3NCQUdKLE1BQU07dUJBQUMsUUFBUTswQkFDZ0MsbUJBQW1CO3NCQUFsRSxNQUFNO3VCQUFDLHFCQUFxQjs7c0JBQzVCLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgybVDb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuLi9kb21fdG9rZW5zJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogU3VwcG9ydGVkIEhhbW1lckpTIHJlY29nbml6ZXIgZXZlbnQgbmFtZXMuXG4gKi9cbmNvbnN0IEVWRU5UX05BTUVTID0ge1xuICAvLyBwYW5cbiAgJ3Bhbic6IHRydWUsXG4gICdwYW5zdGFydCc6IHRydWUsXG4gICdwYW5tb3ZlJzogdHJ1ZSxcbiAgJ3BhbmVuZCc6IHRydWUsXG4gICdwYW5jYW5jZWwnOiB0cnVlLFxuICAncGFubGVmdCc6IHRydWUsXG4gICdwYW5yaWdodCc6IHRydWUsXG4gICdwYW51cCc6IHRydWUsXG4gICdwYW5kb3duJzogdHJ1ZSxcbiAgLy8gcGluY2hcbiAgJ3BpbmNoJzogdHJ1ZSxcbiAgJ3BpbmNoc3RhcnQnOiB0cnVlLFxuICAncGluY2htb3ZlJzogdHJ1ZSxcbiAgJ3BpbmNoZW5kJzogdHJ1ZSxcbiAgJ3BpbmNoY2FuY2VsJzogdHJ1ZSxcbiAgJ3BpbmNoaW4nOiB0cnVlLFxuICAncGluY2hvdXQnOiB0cnVlLFxuICAvLyBwcmVzc1xuICAncHJlc3MnOiB0cnVlLFxuICAncHJlc3N1cCc6IHRydWUsXG4gIC8vIHJvdGF0ZVxuICAncm90YXRlJzogdHJ1ZSxcbiAgJ3JvdGF0ZXN0YXJ0JzogdHJ1ZSxcbiAgJ3JvdGF0ZW1vdmUnOiB0cnVlLFxuICAncm90YXRlZW5kJzogdHJ1ZSxcbiAgJ3JvdGF0ZWNhbmNlbCc6IHRydWUsXG4gIC8vIHN3aXBlXG4gICdzd2lwZSc6IHRydWUsXG4gICdzd2lwZWxlZnQnOiB0cnVlLFxuICAnc3dpcGVyaWdodCc6IHRydWUsXG4gICdzd2lwZXVwJzogdHJ1ZSxcbiAgJ3N3aXBlZG93bic6IHRydWUsXG4gIC8vIHRhcFxuICAndGFwJzogdHJ1ZSxcbn07XG5cbi8qKlxuICogREkgdG9rZW4gZm9yIHByb3ZpZGluZyBbSGFtbWVySlNdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKSBzdXBwb3J0IHRvIEFuZ3VsYXIuXG4gKiBAc2VlIGBIYW1tZXJHZXN0dXJlQ29uZmlnYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEhBTU1FUl9HRVNUVVJFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIYW1tZXJHZXN0dXJlQ29uZmlnPignSGFtbWVyR2VzdHVyZUNvbmZpZycpO1xuXG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBsb2FkcyBIYW1tZXJKUywgcmV0dXJuaW5nIGEgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIG9uY2UgSGFtbWVySnMgaXMgbG9hZGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgSGFtbWVyTG9hZGVyID0gKCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIGEge0BsaW5rIEhhbW1lckxvYWRlcn0gdG8gQW5ndWxhci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfTE9BREVSID0gbmV3IEluamVjdGlvblRva2VuPEhhbW1lckxvYWRlcj4oJ0hhbW1lckxvYWRlcicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbW1lckluc3RhbmNlIHtcbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBkZXN0cm95PygpOiB2b2lkO1xufVxuXG4vKipcbiAqIEFuIGluamVjdGFibGUgW0hhbW1lckpTIE1hbmFnZXJdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLyNoYW1tZXIubWFuYWdlcilcbiAqIGZvciBnZXN0dXJlIHJlY29nbml0aW9uLiBDb25maWd1cmVzIHNwZWNpZmljIGV2ZW50IHJlY29nbml0aW9uLlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBBIHNldCBvZiBzdXBwb3J0ZWQgZXZlbnQgbmFtZXMgZm9yIGdlc3R1cmVzIHRvIGJlIHVzZWQgaW4gQW5ndWxhci5cbiAgICogQW5ndWxhciBzdXBwb3J0cyBhbGwgYnVpbHQtaW4gcmVjb2duaXplcnMsIGFzIGxpc3RlZCBpblxuICAgKiBbSGFtbWVySlMgZG9jdW1lbnRhdGlvbl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pLlxuICAgKi9cbiAgZXZlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAqIE1hcHMgZ2VzdHVyZSBldmVudCBuYW1lcyB0byBhIHNldCBvZiBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgKiB0aGF0IHNwZWNpZnkgb3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgKlxuICAqIFRoZSBrZXkgaXMgYSBzdXBwb3J0ZWQgZXZlbnQgbmFtZSB0byBiZSBjb25maWd1cmVkLFxuICAqIGFuZCB0aGUgb3B0aW9ucyBvYmplY3QgY29udGFpbnMgYSBzZXQgb2YgcHJvcGVydGllcywgd2l0aCBvdmVycmlkZSB2YWx1ZXNcbiAgKiB0byBiZSBhcHBsaWVkIHRvIHRoZSBuYW1lZCByZWNvZ25pemVyIGV2ZW50LlxuICAqIEZvciBleGFtcGxlLCB0byBkaXNhYmxlIHJlY29nbml0aW9uIG9mIHRoZSByb3RhdGUgZXZlbnQsIHNwZWNpZnlcbiAgKiAgYHtcInJvdGF0ZVwiOiB7XCJlbmFibGVcIjogZmFsc2V9fWAuXG4gICpcbiAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBwcmVzZW50IHRha2UgdGhlIEhhbW1lckpTIGRlZmF1bHQgdmFsdWVzLlxuICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgKiBhbmQgdGhlaXIgYWxsb3dlZCBhbmQgZGVmYXVsdCB2YWx1ZXMsIHNlZVxuICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXG4gICpcbiAgKi9cbiAgb3ZlcnJpZGVzOiB7W2tleTogc3RyaW5nXTogT2JqZWN0fSA9IHt9O1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzIHdob3NlIGRlZmF1bHQgdmFsdWVzIGNhbiBiZSBvdmVycmlkZGVuIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBEaWZmZXJlbnQgc2V0cyBvZiBwcm9wZXJ0aWVzIGFwcGx5IHRvIGRpZmZlcmVudCBldmVudHMuXG4gICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICovXG4gIG9wdGlvbnM/OiB7XG4gICAgY3NzUHJvcHM/OiBhbnk7IGRvbUV2ZW50cz86IGJvb2xlYW47IGVuYWJsZT86IGJvb2xlYW4gfCAoKG1hbmFnZXI6IGFueSkgPT4gYm9vbGVhbik7XG4gICAgcHJlc2V0PzogYW55W107XG4gICAgdG91Y2hBY3Rpb24/OiBzdHJpbmc7XG4gICAgcmVjb2duaXplcnM/OiBhbnlbXTtcbiAgICBpbnB1dENsYXNzPzogYW55O1xuICAgIGlucHV0VGFyZ2V0PzogRXZlbnRUYXJnZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBbSGFtbWVySlMgTWFuYWdlcl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9hcGkvI2hhbW1lci5tYW5hZ2VyKVxuICAgKiBhbmQgYXR0YWNoZXMgaXQgdG8gYSBnaXZlbiBIVE1MIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCByZWNvZ25pemUgZ2VzdHVyZXMuXG4gICAqIEByZXR1cm5zIEEgSGFtbWVySlMgZXZlbnQtbWFuYWdlciBvYmplY3QuXG4gICAqL1xuICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlIHtcbiAgICBjb25zdCBtYyA9IG5ldyBIYW1tZXIgIShlbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgbWMuZ2V0KCdwaW5jaCcpLnNldCh7ZW5hYmxlOiB0cnVlfSk7XG4gICAgbWMuZ2V0KCdyb3RhdGUnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuXG4gICAgZm9yIChjb25zdCBldmVudE5hbWUgaW4gdGhpcy5vdmVycmlkZXMpIHtcbiAgICAgIG1jLmdldChldmVudE5hbWUpLnNldCh0aGlzLm92ZXJyaWRlc1tldmVudE5hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSxcbiAgICAgIEBJbmplY3QoSEFNTUVSX0dFU1RVUkVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IEhhbW1lckdlc3R1cmVDb25maWcsIHByaXZhdGUgY29uc29sZTogQ29uc29sZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSEFNTUVSX0xPQURFUikgcHJpdmF0ZSBsb2FkZXI/OiBIYW1tZXJMb2FkZXJ8bnVsbCkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghRVZFTlRfTkFNRVMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lLnRvTG93ZXJDYXNlKCkpICYmICF0aGlzLmlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiAhdGhpcy5sb2FkZXIpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgIGBUaGUgXCIke2V2ZW50TmFtZX1cIiBldmVudCBjYW5ub3QgYmUgYm91bmQgYmVjYXVzZSBIYW1tZXIuSlMgaXMgbm90IGAgK1xuICAgICAgICAgIGBsb2FkZWQgYW5kIG5vIGN1c3RvbSBsb2FkZXIgaGFzIGJlZW4gc3BlY2lmaWVkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gSWYgSGFtbWVyIGlzIG5vdCBwcmVzZW50IGJ1dCBhIGxvYWRlciBpcyBzcGVjaWZpZWQsIHdlIGRlZmVyIGFkZGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvLyB1bnRpbCBIYW1tZXIgaXMgbG9hZGVkLlxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiB0aGlzLmxvYWRlcikge1xuICAgICAgLy8gVGhpcyBgYWRkRXZlbnRMaXN0ZW5lcmAgbWV0aG9kIHJldHVybnMgYSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGFkZGVkIGxpc3RlbmVyLlxuICAgICAgLy8gVW50aWwgSGFtbWVyIGlzIGxvYWRlZCwgdGhlIHJldHVybmVkIGZ1bmN0aW9uIG5lZWRzIHRvICpjYW5jZWwqIHRoZSByZWdpc3RyYXRpb24gcmF0aGVyXG4gICAgICAvLyB0aGFuIHJlbW92ZSBhbnl0aGluZy5cbiAgICAgIGxldCBjYW5jZWxSZWdpc3RyYXRpb24gPSBmYWxzZTtcbiAgICAgIGxldCBkZXJlZ2lzdGVyOiBGdW5jdGlvbiA9ICgpID0+IHsgY2FuY2VsUmVnaXN0cmF0aW9uID0gdHJ1ZTsgfTtcblxuICAgICAgdGhpcy5sb2FkZXIoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIElmIEhhbW1lciBpc24ndCBhY3R1YWxseSBsb2FkZWQgd2hlbiB0aGUgY3VzdG9tIGxvYWRlciByZXNvbHZlcywgZ2l2ZSB1cC5cbiAgICAgICAgICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lcikge1xuICAgICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgIGBUaGUgY3VzdG9tIEhBTU1FUl9MT0FERVIgY29tcGxldGVkLCBidXQgSGFtbWVyLkpTIGlzIG5vdCBwcmVzZW50LmApO1xuICAgICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjYW5jZWxSZWdpc3RyYXRpb24pIHtcbiAgICAgICAgICAgICAgLy8gTm93IHRoYXQgSGFtbWVyIGlzIGxvYWRlZCBhbmQgdGhlIGxpc3RlbmVyIGlzIGJlaW5nIGxvYWRlZCBmb3IgcmVhbCxcbiAgICAgICAgICAgICAgLy8gdGhlIGRlcmVnaXN0cmF0aW9uIGZ1bmN0aW9uIGNoYW5nZXMgZnJvbSBjYW5jZWxpbmcgcmVnaXN0cmF0aW9uIHRvIHJlbW92YWwuXG4gICAgICAgICAgICAgIGRlcmVnaXN0ZXIgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVGhlIFwiJHtldmVudE5hbWV9XCIgZXZlbnQgY2Fubm90IGJlIGJvdW5kIGJlY2F1c2UgdGhlIGN1c3RvbSBgICtcbiAgICAgICAgICAgICAgICBgSGFtbWVyLkpTIGxvYWRlciBmYWlsZWQuYCk7XG4gICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgKmV4ZWN1dGVzKiBgZGVyZWdpc3RlcmAgKGFuZCBub3QgYGRlcmVnaXN0ZXJgIGl0c2VsZikgc28gdGhhdCB3ZVxuICAgICAgLy8gY2FuIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgYGRlcmVnaXN0ZXJgIG9uY2UgdGhlIGxpc3RlbmVyIGlzIGFkZGVkLiBVc2luZyBhIGNsb3N1cmUgaW5cbiAgICAgIC8vIHRoaXMgd2F5IGFsbG93cyB1cyB0byBhdm9pZCBhbnkgYWRkaXRpb25hbCBkYXRhIHN0cnVjdHVyZXMgdG8gdHJhY2sgbGlzdGVuZXIgcmVtb3ZhbC5cbiAgICAgIHJldHVybiAoKSA9PiB7IGRlcmVnaXN0ZXIoKTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBDcmVhdGluZyB0aGUgbWFuYWdlciBiaW5kIGV2ZW50cywgbXVzdCBiZSBkb25lIG91dHNpZGUgb2YgYW5ndWxhclxuICAgICAgY29uc3QgbWMgPSB0aGlzLl9jb25maWcuYnVpbGRIYW1tZXIoZWxlbWVudCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50T2JqOiBIYW1tZXJJbnB1dCkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoZnVuY3Rpb24oKSB7IGhhbmRsZXIoZXZlbnRPYmopOyB9KTtcbiAgICAgIH07XG4gICAgICBtYy5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG1jLm9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gZGVzdHJveSBtYyB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgICAgIGlmICh0eXBlb2YgbWMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1jLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudHMuaW5kZXhPZihldmVudE5hbWUpID4gLTE7IH1cbn1cbiJdfQ==