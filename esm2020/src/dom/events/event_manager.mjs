/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The injection token for the event-manager plug-in service.
 *
 * @publicApi
 */
export const EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
class EventManager {
    /**
     * Initializes an instance of the event-manager service.
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
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns  A callback function that can be used to remove the handler.
     */
    addEventListener(element, eventName, handler) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * Registers a global handler for an event in a target view.
     *
     * @param target A target for global event notifications. One of "window", "document", or "body".
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns A callback function that can be used to remove the handler.
     * @deprecated No longer being used in Ivy code. To be removed in version 14.
     */
    addGlobalEventListener(target, eventName, handler) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */
    getZone() {
        return this._zone;
    }
    /** @internal */
    _findPluginFor(eventName) {
        const plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        const plugins = this._plugins;
        for (let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            if (plugin.supports(eventName)) {
                this._eventNameToPlugin.set(eventName, plugin);
                return plugin;
            }
        }
        throw new Error(`No event manager plugin found for event ${eventName}`);
    }
}
EventManager.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-9737df3", ngImport: i0, type: EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
EventManager.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-9737df3", ngImport: i0, type: EventManager });
export { EventManager };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.1+sha-9737df3", ngImport: i0, type: EventManager, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EVENT_MANAGER_PLUGINS]
                }] }, { type: i0.NgZone }]; } });
export class EventManagerPlugin {
    constructor(_doc) {
        this._doc = _doc;
    }
    addGlobalEventListener(element, eventName, handler) {
        const target = getDOM().getGlobalEventTarget(this._doc, element);
        if (!target) {
            throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpFOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FDOUIsSUFBSSxjQUFjLENBQXVCLHFCQUFxQixDQUFDLENBQUM7QUFFcEU7Ozs7O0dBS0c7QUFDSCxNQUNhLFlBQVk7SUFJdkI7O09BRUc7SUFDSCxZQUEyQyxPQUE2QixFQUFVLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTHZGLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBTWpFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILHNCQUFzQixDQUFDLE1BQWMsRUFBRSxTQUFpQixFQUFFLE9BQWlCO1FBQ3pFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsT0FBTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsY0FBYyxDQUFDLFNBQWlCO1FBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxNQUFNLENBQUM7YUFDZjtTQUNGO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMxRSxDQUFDOztvSEFoRVUsWUFBWSxrQkFPSCxxQkFBcUI7d0hBUDlCLFlBQVk7U0FBWixZQUFZO3NHQUFaLFlBQVk7a0JBRHhCLFVBQVU7OzBCQVFJLE1BQU07MkJBQUMscUJBQXFCOztBQTREM0MsTUFBTSxPQUFnQixrQkFBa0I7SUFDdEMsWUFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFBRyxDQUFDO0lBU2pDLHNCQUFzQixDQUFDLE9BQWUsRUFBRSxTQUFpQixFQUFFLE9BQWlCO1FBQzFFLE1BQU0sTUFBTSxHQUFnQixNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixNQUFNLGNBQWMsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUM5RTtRQUNELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBpbmplY3Rpb24gdG9rZW4gZm9yIHRoZSBldmVudC1tYW5hZ2VyIHBsdWctaW4gc2VydmljZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxFdmVudE1hbmFnZXJQbHVnaW5bXT4oJ0V2ZW50TWFuYWdlclBsdWdpbnMnKTtcblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBldmVudCBtYW5hZ2VtZW50IGZvciBBbmd1bGFyXG4gKiB0aHJvdWdoIGEgYnJvd3NlciBwbHVnLWluLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gIHByaXZhdGUgX3BsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdO1xuICBwcml2YXRlIF9ldmVudE5hbWVUb1BsdWdpbiA9IG5ldyBNYXA8c3RyaW5nLCBFdmVudE1hbmFnZXJQbHVnaW4+KCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBldmVudC1tYW5hZ2VyIHNlcnZpY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVWRU5UX01BTkFHRVJfUExVR0lOUykgcGx1Z2luczogRXZlbnRNYW5hZ2VyUGx1Z2luW10sIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuICAgIHBsdWdpbnMuZm9yRWFjaChwID0+IHAubWFuYWdlciA9IHRoaXMpO1xuICAgIHRoaXMuX3BsdWdpbnMgPSBwbHVnaW5zLnNsaWNlKCkucmV2ZXJzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVjZWl2ZSBldmVudCBub3RpZmljYXRpb25zLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXG4gICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybnMgIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byByZW1vdmUgdGhlIGhhbmRsZXIuXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcGx1Z2luID0gdGhpcy5fZmluZFBsdWdpbkZvcihldmVudE5hbWUpO1xuICAgIHJldHVybiBwbHVnaW4uYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGdsb2JhbCBoYW5kbGVyIGZvciBhbiBldmVudCBpbiBhIHRhcmdldCB2aWV3LlxuICAgKlxuICAgKiBAcGFyYW0gdGFyZ2V0IEEgdGFyZ2V0IGZvciBnbG9iYWwgZXZlbnQgbm90aWZpY2F0aW9ucy4gT25lIG9mIFwid2luZG93XCIsIFwiZG9jdW1lbnRcIiwgb3IgXCJib2R5XCIuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcbiAgICogZXZlbnQgb2JqZWN0IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJucyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxuICAgKiBAZGVwcmVjYXRlZCBObyBsb25nZXIgYmVpbmcgdXNlZCBpbiBJdnkgY29kZS4gVG8gYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDE0LlxuICAgKi9cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgY29tcGlsYXRpb24gem9uZSBpbiB3aGljaCBldmVudCBsaXN0ZW5lcnMgYXJlIHJlZ2lzdGVyZWQuXG4gICAqL1xuICBnZXRab25lKCk6IE5nWm9uZSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvbmU7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9maW5kUGx1Z2luRm9yKGV2ZW50TmFtZTogc3RyaW5nKTogRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgICBjb25zdCBwbHVnaW4gPSB0aGlzLl9ldmVudE5hbWVUb1BsdWdpbi5nZXQoZXZlbnROYW1lKTtcbiAgICBpZiAocGx1Z2luKSB7XG4gICAgICByZXR1cm4gcGx1Z2luO1xuICAgIH1cblxuICAgIGNvbnN0IHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcGx1Z2luID0gcGx1Z2luc1tpXTtcbiAgICAgIGlmIChwbHVnaW4uc3VwcG9ydHMoZXZlbnROYW1lKSkge1xuICAgICAgICB0aGlzLl9ldmVudE5hbWVUb1BsdWdpbi5zZXQoZXZlbnROYW1lLCBwbHVnaW4pO1xuICAgICAgICByZXR1cm4gcGx1Z2luO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGV2ZW50IG1hbmFnZXIgcGx1Z2luIGZvdW5kIGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZG9jOiBhbnkpIHt9XG5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIG1hbmFnZXIhOiBFdmVudE1hbmFnZXI7XG5cbiAgYWJzdHJhY3Qgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIGFic3RyYWN0IGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IGdldERPTSgpLmdldEdsb2JhbEV2ZW50VGFyZ2V0KHRoaXMuX2RvYywgZWxlbWVudCk7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZXZlbnQgdGFyZ2V0ICR7dGFyZ2V0fSBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG59XG4iXX0=