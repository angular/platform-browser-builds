/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Inject, Injectable, InjectionToken, NgZone, ɵRuntimeError as RuntimeError, } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The injection token for plugins of the `EventManager` service.
 *
 * @publicApi
 */
export const EVENT_MANAGER_PLUGINS = new InjectionToken(ngDevMode ? 'EventManagerPlugins' : '');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
export class EventManager {
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins, _zone) {
        this._zone = _zone;
        this._eventNameToPlugin = new Map();
        plugins.forEach((plugin) => {
            plugin.manager = this;
        });
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
     * Retrieves the compilation zone in which event listeners are registered.
     */
    getZone() {
        return this._zone;
    }
    /** @internal */
    _findPluginFor(eventName) {
        let plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        const plugins = this._plugins;
        plugin = plugins.find((plugin) => plugin.supports(eventName));
        if (!plugin) {
            throw new RuntimeError(5101 /* RuntimeErrorCode.NO_PLUGIN_FOR_EVENT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `No event manager plugin found for event ${eventName}`);
        }
        this._eventNameToPlugin.set(eventName, plugin);
        return plugin;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.11+sha-2fbc7f0", ngImport: i0, type: EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.11+sha-2fbc7f0", ngImport: i0, type: EventManager }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.11+sha-2fbc7f0", ngImport: i0, type: EventManager, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EVENT_MANAGER_PLUGINS]
                }] }, { type: i0.NgZone }] });
/**
 * The plugin definition for the `EventManager` class
 *
 * It can be used as a base class to create custom manager plugins, i.e. you can create your own
 * class that extends the `EventManagerPlugin` one.
 *
 * @publicApi
 */
export class EventManagerPlugin {
    // TODO: remove (has some usage in G3)
    constructor(_doc) {
        this._doc = _doc;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixjQUFjLEVBQ2QsTUFBTSxFQUNOLGFBQWEsSUFBSSxZQUFZLEdBQzlCLE1BQU0sZUFBZSxDQUFDOztBQUl2Qjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQ3JELFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDdkMsQ0FBQztBQUVGOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFJdkI7O09BRUc7SUFDSCxZQUNpQyxPQUE2QixFQUNwRCxLQUFhO1FBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVBmLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBU2pFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6QixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILGdCQUFnQixDQUFDLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGNBQWMsQ0FBQyxTQUFpQjtRQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLE1BQU0sSUFBSSxZQUFZLGtEQUVwQixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUM7Z0JBQzdDLDJDQUEyQyxTQUFTLEVBQUUsQ0FDekQsQ0FBQztRQUNKLENBQUM7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO3lIQXpEVSxZQUFZLGtCQVFiLHFCQUFxQjs2SEFScEIsWUFBWTs7c0dBQVosWUFBWTtrQkFEeEIsVUFBVTs7MEJBU04sTUFBTTsyQkFBQyxxQkFBcUI7O0FBb0RqQzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFnQixrQkFBa0I7SUFDdEMsc0NBQXNDO0lBQ3RDLFlBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBQUcsQ0FBQztDQWNsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgTmdab25lLFxuICDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uLy4uL2Vycm9ycyc7XG5cbi8qKlxuICogVGhlIGluamVjdGlvbiB0b2tlbiBmb3IgcGx1Z2lucyBvZiB0aGUgYEV2ZW50TWFuYWdlcmAgc2VydmljZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9NQU5BR0VSX1BMVUdJTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48RXZlbnRNYW5hZ2VyUGx1Z2luW10+KFxuICBuZ0Rldk1vZGUgPyAnRXZlbnRNYW5hZ2VyUGx1Z2lucycgOiAnJyxcbik7XG5cbi8qKlxuICogQW4gaW5qZWN0YWJsZSBzZXJ2aWNlIHRoYXQgcHJvdmlkZXMgZXZlbnQgbWFuYWdlbWVudCBmb3IgQW5ndWxhclxuICogdGhyb3VnaCBhIGJyb3dzZXIgcGx1Zy1pbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFdmVudE1hbmFnZXIge1xuICBwcml2YXRlIF9wbHVnaW5zOiBFdmVudE1hbmFnZXJQbHVnaW5bXTtcbiAgcHJpdmF0ZSBfZXZlbnROYW1lVG9QbHVnaW4gPSBuZXcgTWFwPHN0cmluZywgRXZlbnRNYW5hZ2VyUGx1Z2luPigpO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhbiBpbnN0YW5jZSBvZiB0aGUgZXZlbnQtbWFuYWdlciBzZXJ2aWNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChFVkVOVF9NQU5BR0VSX1BMVUdJTlMpIHBsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdLFxuICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSxcbiAgKSB7XG4gICAgcGx1Z2lucy5mb3JFYWNoKChwbHVnaW4pID0+IHtcbiAgICAgIHBsdWdpbi5tYW5hZ2VyID0gdGhpcztcbiAgICB9KTtcbiAgICB0aGlzLl9wbHVnaW5zID0gcGx1Z2lucy5zbGljZSgpLnJldmVyc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIGZvciBhIHNwZWNpZmljIGVsZW1lbnQgYW5kIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgSFRNTCBlbGVtZW50IHRvIHJlY2VpdmUgZXZlbnQgbm90aWZpY2F0aW9ucy5cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIGhhbmRsZXIgQSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIG5vdGlmaWNhdGlvbiBvY2N1cnMuIFJlY2VpdmVzIHRoZVxuICAgKiBldmVudCBvYmplY3QgYXMgYW4gYXJndW1lbnQuXG4gICAqIEByZXR1cm5zICBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVtb3ZlIHRoZSBoYW5kbGVyLlxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGNvbXBpbGF0aW9uIHpvbmUgaW4gd2hpY2ggZXZlbnQgbGlzdGVuZXJzIGFyZSByZWdpc3RlcmVkLlxuICAgKi9cbiAgZ2V0Wm9uZSgpOiBOZ1pvbmUge1xuICAgIHJldHVybiB0aGlzLl96b25lO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZFBsdWdpbkZvcihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gICAgbGV0IHBsdWdpbiA9IHRoaXMuX2V2ZW50TmFtZVRvUGx1Z2luLmdldChldmVudE5hbWUpO1xuICAgIGlmIChwbHVnaW4pIHtcbiAgICAgIHJldHVybiBwbHVnaW47XG4gICAgfVxuXG4gICAgY29uc3QgcGx1Z2lucyA9IHRoaXMuX3BsdWdpbnM7XG4gICAgcGx1Z2luID0gcGx1Z2lucy5maW5kKChwbHVnaW4pID0+IHBsdWdpbi5zdXBwb3J0cyhldmVudE5hbWUpKTtcbiAgICBpZiAoIXBsdWdpbikge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5OT19QTFVHSU5fRk9SX0VWRU5ULFxuICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgICAgIGBObyBldmVudCBtYW5hZ2VyIHBsdWdpbiBmb3VuZCBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnROYW1lVG9QbHVnaW4uc2V0KGV2ZW50TmFtZSwgcGx1Z2luKTtcbiAgICByZXR1cm4gcGx1Z2luO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHBsdWdpbiBkZWZpbml0aW9uIGZvciB0aGUgYEV2ZW50TWFuYWdlcmAgY2xhc3NcbiAqXG4gKiBJdCBjYW4gYmUgdXNlZCBhcyBhIGJhc2UgY2xhc3MgdG8gY3JlYXRlIGN1c3RvbSBtYW5hZ2VyIHBsdWdpbnMsIGkuZS4geW91IGNhbiBjcmVhdGUgeW91ciBvd25cbiAqIGNsYXNzIHRoYXQgZXh0ZW5kcyB0aGUgYEV2ZW50TWFuYWdlclBsdWdpbmAgb25lLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIC8vIFRPRE86IHJlbW92ZSAoaGFzIHNvbWUgdXNhZ2UgaW4gRzMpXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RvYzogYW55KSB7fVxuXG4gIC8vIFVzaW5nIG5vbi1udWxsIGFzc2VydGlvbiBiZWNhdXNlIGl0J3Mgc2V0IGJ5IEV2ZW50TWFuYWdlcidzIGNvbnN0cnVjdG9yXG4gIG1hbmFnZXIhOiBFdmVudE1hbmFnZXI7XG5cbiAgLyoqXG4gICAqIFNob3VsZCByZXR1cm4gYHRydWVgIGZvciBldmVyeSBldmVudCBuYW1lIHRoYXQgc2hvdWxkIGJlIHN1cHBvcnRlZCBieSB0aGlzIHBsdWdpblxuICAgKi9cbiAgYWJzdHJhY3Qgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhlIGJlaGF2aW91ciBmb3IgdGhlIHN1cHBvcnRlZCBldmVudHNcbiAgICovXG4gIGFic3RyYWN0IGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xufVxuIl19