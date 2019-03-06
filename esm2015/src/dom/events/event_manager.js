/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { getDOM } from '../dom_adapter';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The injection token for the event-manager plug-in service.
 *
 * \@publicApi
 * @type {?}
 */
export const EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * \@publicApi
 */
export class EventManager {
    /**
     * Initializes an instance of the event-manager service.
     * @param {?} plugins
     * @param {?} _zone
     */
    constructor(plugins, _zone) {
        this._zone = _zone;
        this._eventNameToPlugin = new Map();
        plugins.forEach(p => p.manager = this);
        this._plugins = plugins.slice().reverse();
    }
    /**
     * Registers a handler for a specific element and event.
     *
     * @param {?} element The HTML element to receive event notifications.
     * @param {?} eventName The name of the event to listen for.
     * @param {?} handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @return {?} A callback function that can be used to remove the handler.
     */
    addEventListener(element, eventName, handler) {
        /** @type {?} */
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param {?} target A target for global event notifications. One of "window", "document", or "body".
     * @param {?} eventName The name of the event to listen for.
     * @param {?} handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @return {?} A callback function that can be used to remove the handler.
     */
    addGlobalEventListener(target, eventName, handler) {
        /** @type {?} */
        const plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     * @return {?}
     */
    getZone() { return this._zone; }
    /**
     * \@internal
     * @param {?} eventName
     * @return {?}
     */
    _findPluginFor(eventName) {
        /** @type {?} */
        const plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        /** @type {?} */
        const plugins = this._plugins;
        for (let i = 0; i < plugins.length; i++) {
            /** @type {?} */
            const plugin = plugins[i];
            if (plugin.supports(eventName)) {
                this._eventNameToPlugin.set(eventName, plugin);
                return plugin;
            }
        }
        throw new Error(`No event manager plugin found for event ${eventName}`);
    }
}
EventManager.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EventManager.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [EVENT_MANAGER_PLUGINS,] }] },
    { type: NgZone }
];
/** @nocollapse */ EventManager.ngInjectableDef = i0.defineInjectable({ token: EventManager, factory: function EventManager_Factory(t) { return new (t || EventManager)(i0.inject(EVENT_MANAGER_PLUGINS), i0.inject(i0.NgZone)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(EventManager, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [EVENT_MANAGER_PLUGINS]
            }] }, { type: i0.NgZone }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    EventManager.prototype._plugins;
    /**
     * @type {?}
     * @private
     */
    EventManager.prototype._eventNameToPlugin;
    /**
     * @type {?}
     * @private
     */
    EventManager.prototype._zone;
}
/**
 * @abstract
 */
export class EventManagerPlugin {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addGlobalEventListener(element, eventName, handler) {
        /** @type {?} */
        const target = getDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}
if (false) {
    /** @type {?} */
    EventManagerPlugin.prototype.manager;
    /**
     * @type {?}
     * @private
     */
    EventManagerPlugin.prototype._doc;
    /**
     * @abstract
     * @param {?} eventName
     * @return {?}
     */
    EventManagerPlugin.prototype.supports = function (eventName) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQU90QyxNQUFNLE9BQU8scUJBQXFCLEdBQzlCLElBQUksY0FBYyxDQUF1QixxQkFBcUIsQ0FBQzs7Ozs7OztBQVNuRSxNQUFNLE9BQU8sWUFBWTs7Ozs7O0lBT3ZCLFlBQTJDLE9BQTZCLEVBQVUsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFMdkYsdUJBQWtCLEdBQUcsSUFBSSxHQUFHLEVBQThCLENBQUM7UUFNakUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUMsQ0FBQzs7Ozs7Ozs7OztJQVdELGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjs7Y0FDbkUsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQzdDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7Ozs7OztJQVdELHNCQUFzQixDQUFDLE1BQWMsRUFBRSxTQUFpQixFQUFFLE9BQWlCOztjQUNuRSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7UUFDN0MsT0FBTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUtELE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFHeEMsY0FBYyxDQUFDLFNBQWlCOztjQUN4QixNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmOztjQUVLLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTtRQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ2pDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7O1lBOURGLFVBQVU7Ozs7d0NBUUksTUFBTSxTQUFDLHFCQUFxQjtZQTFCQyxNQUFNOzs0REFtQnJDLFlBQVksK0RBQVosWUFBWSxZQU9ILHFCQUFxQjttQ0FQOUIsWUFBWTtjQUR4QixVQUFVOztzQkFRSSxNQUFNO3VCQUFDLHFCQUFxQjs7Ozs7OztJQU56QyxnQ0FBdUM7Ozs7O0lBQ3ZDLDBDQUFtRTs7Ozs7SUFLTyw2QkFBcUI7Ozs7O0FBeURqRyxNQUFNLE9BQWdCLGtCQUFrQjs7OztJQUN0QyxZQUFvQixJQUFTO1FBQVQsU0FBSSxHQUFKLElBQUksQ0FBSztJQUFHLENBQUM7Ozs7Ozs7SUFTakMsc0JBQXNCLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7O2NBQ3BFLE1BQU0sR0FBZ0IsTUFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLE1BQU0sY0FBYyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0Y7OztJQWJDLHFDQUF3Qjs7Ozs7SUFIWixrQ0FBaUI7Ozs7OztJQUs3QixpRUFBOEM7Ozs7Ozs7O0lBRTlDLDJGQUFnRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2dldERPTX0gZnJvbSAnLi4vZG9tX2FkYXB0ZXInO1xuXG4vKipcbiAqIFRoZSBpbmplY3Rpb24gdG9rZW4gZm9yIHRoZSBldmVudC1tYW5hZ2VyIHBsdWctaW4gc2VydmljZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxFdmVudE1hbmFnZXJQbHVnaW5bXT4oJ0V2ZW50TWFuYWdlclBsdWdpbnMnKTtcblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBldmVudCBtYW5hZ2VtZW50IGZvciBBbmd1bGFyXG4gKiB0aHJvdWdoIGEgYnJvd3NlciBwbHVnLWluLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gIHByaXZhdGUgX3BsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdO1xuICBwcml2YXRlIF9ldmVudE5hbWVUb1BsdWdpbiA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudE1hbmFnZXJQbHVnaW4+KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBldmVudC1tYW5hZ2VyIHNlcnZpY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVWRU5UX01BTkFHRVJfUExVR0lOUykgcGx1Z2luczogRXZlbnRNYW5hZ2VyUGx1Z2luW10sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgIHBsdWdpbnMuZm9yRWFjaChwID0+IHAubWFuYWdlciA9IHRoaXMpO1xuICAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zLnNsaWNlKCkucmV2ZXJzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVjZWl2ZSBldmVudCBub3RpZmljYXRpb25zLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXG4gICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybnMgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byByZW1vdmUgdGhlIGhhbmRsZXIuXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5fZmluZFBsdWdpbkZvcihldmVudE5hbWUpO1xuICAgIHJldHVybiBwbHVnaW4uYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGdsb2JhbCBoYW5kbGVyIGZvciBhbiBldmVudCBpbiBhIHRhcmdldCB2aWV3LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGZvciBnbG9iYWwgZXZlbnQgbm90aWZpY2F0aW9ucy4gT25lIG9mIFwid2luZG93XCIsIFwiZG9jdW1lbnRcIiwgb3IgXCJib2R5XCIuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcbiAgICogZXZlbnQgb2JqZWN0IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJucyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxuICAgKi9cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY29tcGlsYXRpb24gem9uZSBpbiB3aGljaCBldmVudCBsaXN0ZW5lcnMgYXJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICBnZXRab25lKCk6IE5nWm9uZSB7IHJldHVybiB0aGlzLl96b25lOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZFBsdWdpbkZvcihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5fZXZlbnROYW1lVG9QbHVnaW4uZ2V0KGV2ZW50TmFtZSk7XG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICB9XG5cbiAgICBjb25zdCBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbaV07XG4gICAgICBpZiAocGx1Z2luLnN1cHBvcnRzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgdGhpcy5fZXZlbnROYW1lVG9QbHVnaW4uc2V0KGV2ZW50TmFtZSwgcGx1Z2luKTtcbiAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBldmVudCBtYW5hZ2VyIHBsdWdpbiBmb3VuZCBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvYzogYW55KSB7fVxuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBtYW5hZ2VyICE6IEV2ZW50TWFuYWdlcjtcblxuICBhYnN0cmFjdCBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb247XG5cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5fZG9jLCBlbGVtZW50KTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==