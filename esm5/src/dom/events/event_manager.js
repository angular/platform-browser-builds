/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */
export var EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
var EventManager = /** @class */ (function () {
    /**
     * Initializes an instance of the event-manager service.
     */
    function EventManager(plugins, _zone) {
        var _this = this;
        this._zone = _zone;
        this._eventNameToPlugin = new Map();
        plugins.forEach(function (p) { return p.manager = _this; });
        this._plugins = plugins.slice().reverse();
    }
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */
    EventManager.prototype.addEventListener = function (element, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    };
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     */
    EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    };
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */
    EventManager.prototype.getZone = function () { return this._zone; };
    /** @internal */
    EventManager.prototype._findPluginFor = function (eventName) {
        var plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
            var plugin_1 = plugins[i];
            if (plugin_1.supports(eventName)) {
                this._eventNameToPlugin.set(eventName, plugin_1);
                return plugin_1;
            }
        }
        throw new Error("No event manager plugin found for event " + eventName);
    };
    EventManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(EVENT_MANAGER_PLUGINS)),
        tslib_1.__metadata("design:paramtypes", [Array, NgZone])
    ], EventManager);
    return EventManager;
}());
export { EventManager };
var EventManagerPlugin = /** @class */ (function () {
    function EventManagerPlugin(_doc) {
        this._doc = _doc;
    }
    EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        var target = getDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
            throw new Error("Unsupported event target " + target + " for event " + eventName);
        }
        return this.addEventListener(target, eventName, handler);
    };
    return EventManagerPlugin;
}());
export { EventManagerPlugin };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpFOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxxQkFBcUIsR0FDOUIsSUFBSSxjQUFjLENBQXVCLHFCQUFxQixDQUFDLENBQUM7QUFFcEU7Ozs7O0dBS0c7QUFFSDtJQUlFOztPQUVHO0lBQ0gsc0JBQTJDLE9BQTZCLEVBQVUsS0FBYTtRQUEvRixpQkFHQztRQUhpRixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTHZGLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBTWpFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILHVDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDekUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDZDQUFzQixHQUF0QixVQUF1QixNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sTUFBTSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOEJBQU8sR0FBUCxjQUFvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXhDLGdCQUFnQjtJQUNoQixxQ0FBYyxHQUFkLFVBQWUsU0FBaUI7UUFDOUIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQU0sUUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLFFBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQU0sQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLFFBQU0sQ0FBQzthQUNmO1NBQ0Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUEyQyxTQUFXLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBN0RVLFlBQVk7UUFEeEIsVUFBVSxFQUFFO1FBUUUsbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7d0RBQStDLE1BQU07T0FQcEYsWUFBWSxDQThEeEI7SUFBRCxtQkFBQztDQUFBLEFBOURELElBOERDO1NBOURZLFlBQVk7QUFnRXpCO0lBQ0UsNEJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUcsQ0FBQztJQVNqQyxtREFBc0IsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDMUUsSUFBTSxNQUFNLEdBQWdCLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLE1BQU0sbUJBQWMsU0FBVyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBpbmplY3Rpb24gdG9rZW4gZm9yIHRoZSBldmVudC1tYW5hZ2VyIHBsdWctaW4gc2VydmljZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxFdmVudE1hbmFnZXJQbHVnaW5bXT4oJ0V2ZW50TWFuYWdlclBsdWdpbnMnKTtcblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBldmVudCBtYW5hZ2VtZW50IGZvciBBbmd1bGFyXG4gKiB0aHJvdWdoIGEgYnJvd3NlciBwbHVnLWluLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gIHByaXZhdGUgX3BsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdO1xuICBwcml2YXRlIF9ldmVudE5hbWVUb1BsdWdpbiA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudE1hbmFnZXJQbHVnaW4+KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBldmVudC1tYW5hZ2VyIHNlcnZpY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVWRU5UX01BTkFHRVJfUExVR0lOUykgcGx1Z2luczogRXZlbnRNYW5hZ2VyUGx1Z2luW10sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgIHBsdWdpbnMuZm9yRWFjaChwID0+IHAubWFuYWdlciA9IHRoaXMpO1xuICAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zLnNsaWNlKCkucmV2ZXJzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVjZWl2ZSBldmVudCBub3RpZmljYXRpb25zLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXG4gICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybnMgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byByZW1vdmUgdGhlIGhhbmRsZXIuXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5fZmluZFBsdWdpbkZvcihldmVudE5hbWUpO1xuICAgIHJldHVybiBwbHVnaW4uYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGdsb2JhbCBoYW5kbGVyIGZvciBhbiBldmVudCBpbiBhIHRhcmdldCB2aWV3LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGZvciBnbG9iYWwgZXZlbnQgbm90aWZpY2F0aW9ucy4gT25lIG9mIFwid2luZG93XCIsIFwiZG9jdW1lbnRcIiwgb3IgXCJib2R5XCIuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcbiAgICogZXZlbnQgb2JqZWN0IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJucyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxuICAgKi9cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY29tcGlsYXRpb24gem9uZSBpbiB3aGljaCBldmVudCBsaXN0ZW5lcnMgYXJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICBnZXRab25lKCk6IE5nWm9uZSB7IHJldHVybiB0aGlzLl96b25lOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZFBsdWdpbkZvcihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5fZXZlbnROYW1lVG9QbHVnaW4uZ2V0KGV2ZW50TmFtZSk7XG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICB9XG5cbiAgICBjb25zdCBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbaV07XG4gICAgICBpZiAocGx1Z2luLnN1cHBvcnRzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgdGhpcy5fZXZlbnROYW1lVG9QbHVnaW4uc2V0KGV2ZW50TmFtZSwgcGx1Z2luKTtcbiAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBldmVudCBtYW5hZ2VyIHBsdWdpbiBmb3VuZCBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvYzogYW55KSB7fVxuXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBtYW5hZ2VyICE6IEV2ZW50TWFuYWdlcjtcblxuICBhYnN0cmFjdCBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb247XG5cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5fZG9jLCBlbGVtZW50KTtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cbn1cbiJdfQ==