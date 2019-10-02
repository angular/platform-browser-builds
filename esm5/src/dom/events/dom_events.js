import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * Detect if Zone is present. If it is then use simple zone aware 'addEventListener'
 * since Angular can do much more
 * efficient bookkeeping than Zone can, because we have additional information. This speeds up
 * addEventListener by 3x.
 */
var __symbol__ = (function () { return (typeof Zone !== 'undefined') && Zone['__symbol__'] ||
    function (v) { return '__zone_symbol__' + v; }; })();
var ADD_EVENT_LISTENER = __symbol__('addEventListener');
var REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
var symbolNames = {};
var FALSE = 'FALSE';
var ANGULAR = 'ANGULAR';
var NATIVE_ADD_LISTENER = 'addEventListener';
var NATIVE_REMOVE_LISTENER = 'removeEventListener';
// use the same symbol string which is used in zone.js
var stopSymbol = '__zone_symbol__propagationStopped';
var stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
var blackListedMap = (function () {
    var blackListedEvents = (typeof Zone !== 'undefined') && Zone[__symbol__('BLACK_LISTED_EVENTS')];
    if (blackListedEvents) {
        var res_1 = {};
        blackListedEvents.forEach(function (eventName) { res_1[eventName] = eventName; });
        return res_1;
    }
    return undefined;
})();
var isBlackListedEvent = function (eventName) {
    if (!blackListedMap) {
        return false;
    }
    return blackListedMap.hasOwnProperty(eventName);
};
// a global listener to handle all dom event,
// so we do not need to create a closure every time
var globalListener = function (event) {
    var symbolName = symbolNames[event.type];
    if (!symbolName) {
        return;
    }
    var taskDatas = this[symbolName];
    if (!taskDatas) {
        return;
    }
    var args = [event];
    if (taskDatas.length === 1) {
        // if taskDatas only have one element, just invoke it
        var taskData = taskDatas[0];
        if (taskData.zone !== Zone.current) {
            // only use Zone.run when Zone.current not equals to stored zone
            return taskData.zone.run(taskData.handler, this, args);
        }
        else {
            return taskData.handler.apply(this, args);
        }
    }
    else {
        // copy tasks as a snapshot to avoid event handlers remove
        // itself or others
        var copiedTasks = taskDatas.slice();
        for (var i = 0; i < copiedTasks.length; i++) {
            // if other listener call event.stopImmediatePropagation
            // just break
            if (event[stopSymbol] === true) {
                break;
            }
            var taskData = copiedTasks[i];
            if (taskData.zone !== Zone.current) {
                // only use Zone.run when Zone.current not equals to stored zone
                taskData.zone.run(taskData.handler, this, args);
            }
            else {
                taskData.handler.apply(this, args);
            }
        }
    }
};
var DomEventsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DomEventsPlugin, _super);
    function DomEventsPlugin(doc, ngZone, platformId) {
        var _this = _super.call(this, doc) || this;
        _this.ngZone = ngZone;
        if (!platformId || !isPlatformServer(platformId)) {
            _this.patchEvent();
        }
        return _this;
    }
    DomEventsPlugin.prototype.patchEvent = function () {
        if (typeof Event === 'undefined' || !Event || !Event.prototype) {
            return;
        }
        if (Event.prototype[stopMethodSymbol]) {
            // already patched by zone.js
            return;
        }
        var delegate = Event.prototype[stopMethodSymbol] =
            Event.prototype.stopImmediatePropagation;
        Event.prototype.stopImmediatePropagation = function () {
            if (this) {
                this[stopSymbol] = true;
            }
            // We should call native delegate in case in some environment part of
            // the application will not use the patched Event. Also we cast the
            // "arguments" to any since "stopImmediatePropagation" technically does not
            // accept any arguments, but we don't know what developers pass through the
            // function and we want to not break these calls.
            delegate && delegate.apply(this, arguments);
        };
    };
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = function (eventName) { return true; };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        /**
         * This code is about to add a listener to the DOM. If Zone.js is present, than
         * `addEventListener` has been patched. The patched code adds overhead in both
         * memory and speed (3x slower) than native. For this reason if we detect that
         * Zone.js is present we use a simple version of zone aware addEventListener instead.
         * The result is faster registration and the zone will be restored.
         * But ZoneSpec.onScheduleTask, ZoneSpec.onInvokeTask, ZoneSpec.onCancelTask
         * will not be invoked
         * We also do manual zone restoration in element.ts renderEventHandlerClosure method.
         *
         * NOTE: it is possible that the element is from different iframe, and so we
         * have to check before we execute the method.
         */
        var self = this;
        var zoneJsLoaded = element[ADD_EVENT_LISTENER];
        var callback = handler;
        // if zonejs is loaded and current zone is not ngZone
        // we keep Zone.current on target for later restoration.
        if (zoneJsLoaded && (!NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
            var symbolName = symbolNames[eventName];
            if (!symbolName) {
                symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
            }
            var taskDatas = element[symbolName];
            var globalListenerRegistered = taskDatas && taskDatas.length > 0;
            if (!taskDatas) {
                taskDatas = element[symbolName] = [];
            }
            var zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
            if (taskDatas.length === 0) {
                taskDatas.push({ zone: zone, handler: callback });
            }
            else {
                var callbackRegistered = false;
                for (var i = 0; i < taskDatas.length; i++) {
                    if (taskDatas[i].handler === callback) {
                        callbackRegistered = true;
                        break;
                    }
                }
                if (!callbackRegistered) {
                    taskDatas.push({ zone: zone, handler: callback });
                }
            }
            if (!globalListenerRegistered) {
                element[ADD_EVENT_LISTENER](eventName, globalListener, false);
            }
        }
        else {
            element[NATIVE_ADD_LISTENER](eventName, callback, false);
        }
        return function () { return _this.removeEventListener(element, eventName, callback); };
    };
    DomEventsPlugin.prototype.removeEventListener = function (target, eventName, callback) {
        var underlyingRemove = target[REMOVE_EVENT_LISTENER];
        // zone.js not loaded, use native removeEventListener
        if (!underlyingRemove) {
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        var symbolName = symbolNames[eventName];
        var taskDatas = symbolName && target[symbolName];
        if (!taskDatas) {
            // addEventListener not using patched version
            // just call native removeEventListener
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        // fix issue 20532, should be able to remove
        // listener which was added inside of ngZone
        var found = false;
        for (var i = 0; i < taskDatas.length; i++) {
            // remove listener from taskDatas if the callback equals
            if (taskDatas[i].handler === callback) {
                found = true;
                taskDatas.splice(i, 1);
                break;
            }
        }
        if (found) {
            if (taskDatas.length === 0) {
                // all listeners are removed, we can remove the globalListener from target
                underlyingRemove.apply(target, [eventName, globalListener, false]);
            }
        }
        else {
            // not found in taskDatas, the callback may be added inside of ngZone
            // use native remove listener to remove the callback
            target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
    };
    DomEventsPlugin.ngFactoryDef = function DomEventsPlugin_Factory(t) { return new (t || DomEventsPlugin)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(PLATFORM_ID, 8)); };
    DomEventsPlugin.ngInjectableDef = i0.ɵɵdefineInjectable({ token: DomEventsPlugin, factory: function (t) { return DomEventsPlugin.ngFactoryDef(t); }, providedIn: null });
    return DomEventsPlugin;
}(EventManagerPlugin));
export { DomEventsPlugin };
/*@__PURE__*/ i0.ɵsetClassMetadata(DomEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [PLATFORM_ID]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUVuRDs7Ozs7R0FLRztBQUNILElBQU0sVUFBVSxHQUNaLENBQUMsY0FBTSxPQUFBLENBQUMsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUssSUFBWSxDQUFDLFlBQVksQ0FBQztJQUM5RCxVQUFTLENBQVMsSUFBWSxPQUFPLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFEM0QsQ0FDMkQsQ0FBQyxFQUFFLENBQUM7QUFDMUUsSUFBTSxrQkFBa0IsR0FBdUIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUUsSUFBTSxxQkFBcUIsR0FBMEIsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFdkYsSUFBTSxXQUFXLEdBQTRCLEVBQUUsQ0FBQztBQUVoRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQzFCLElBQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7QUFDL0MsSUFBTSxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQztBQUVyRCxzREFBc0Q7QUFDdEQsSUFBTSxVQUFVLEdBQUcsbUNBQW1DLENBQUM7QUFDdkQsSUFBTSxnQkFBZ0IsR0FBRyx5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ICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtU2VydmVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogRGV0ZWN0IGlmIFpvbmUgaXMgcHJlc2VudC4gSWYgaXQgaXMgdGhlbiB1c2Ugc2ltcGxlIHpvbmUgYXdhcmUgJ2FkZEV2ZW50TGlzdGVuZXInXG4gKiBzaW5jZSBBbmd1bGFyIGNhbiBkbyBtdWNoIG1vcmVcbiAqIGVmZmljaWVudCBib29ra2VlcGluZyB0aGFuIFpvbmUgY2FuLCBiZWNhdXNlIHdlIGhhdmUgYWRkaXRpb25hbCBpbmZvcm1hdGlvbi4gVGhpcyBzcGVlZHMgdXBcbiAqIGFkZEV2ZW50TGlzdGVuZXIgYnkgM3guXG4gKi9cbmNvbnN0IF9fc3ltYm9sX18gPVxuICAgICgoKSA9PiAodHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnKSAmJiAoWm9uZSBhcyBhbnkpWydfX3N5bWJvbF9fJ10gfHxcbiAgICAgICAgIGZ1bmN0aW9uKHY6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiAnX196b25lX3N5bWJvbF9fJyArIHY7IH0pKCk7XG5jb25zdCBBRERfRVZFTlRfTElTVEVORVI6ICdhZGRFdmVudExpc3RlbmVyJyA9IF9fc3ltYm9sX18oJ2FkZEV2ZW50TGlzdGVuZXInKTtcbmNvbnN0IFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ3JlbW92ZUV2ZW50TGlzdGVuZXInID0gX19zeW1ib2xfXygncmVtb3ZlRXZlbnRMaXN0ZW5lcicpO1xuXG5jb25zdCBzeW1ib2xOYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuY29uc3QgRkFMU0UgPSAnRkFMU0UnO1xuY29uc3QgQU5HVUxBUiA9ICdBTkdVTEFSJztcbmNvbnN0IE5BVElWRV9BRERfTElTVEVORVIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5jb25zdCBOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSID0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4vLyB1c2UgdGhlIHNhbWUgc3ltYm9sIHN0cmluZyB3aGljaCBpcyB1c2VkIGluIHpvbmUuanNcbmNvbnN0IHN0b3BTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fcHJvcGFnYXRpb25TdG9wcGVkJztcbmNvbnN0IHN0b3BNZXRob2RTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uJztcblxuXG5jb25zdCBibGFja0xpc3RlZE1hcCA9ICgoKSA9PiB7XG4gIGNvbnN0IGJsYWNrTGlzdGVkRXZlbnRzOiBzdHJpbmdbXSA9XG4gICAgICAodHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnKSAmJiAoWm9uZSBhcyBhbnkpW19fc3ltYm9sX18oJ0JMQUNLX0xJU1RFRF9FVkVOVFMnKV07XG4gIGlmIChibGFja0xpc3RlZEV2ZW50cykge1xuICAgIGNvbnN0IHJlczoge1tldmVudE5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBibGFja0xpc3RlZEV2ZW50cy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7IHJlc1tldmVudE5hbWVdID0gZXZlbnROYW1lOyB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59KSgpO1xuXG5cbmNvbnN0IGlzQmxhY2tMaXN0ZWRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gIGlmICghYmxhY2tMaXN0ZWRNYXApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJsYWNrTGlzdGVkTWFwLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSk7XG59O1xuXG5pbnRlcmZhY2UgVGFza0RhdGEge1xuICB6b25lOiBhbnk7XG4gIGhhbmRsZXI6IEZ1bmN0aW9uO1xufVxuXG4vLyBhIGdsb2JhbCBsaXN0ZW5lciB0byBoYW5kbGUgYWxsIGRvbSBldmVudCxcbi8vIHNvIHdlIGRvIG5vdCBuZWVkIHRvIGNyZWF0ZSBhIGNsb3N1cmUgZXZlcnkgdGltZVxuY29uc3QgZ2xvYmFsTGlzdGVuZXIgPSBmdW5jdGlvbih0aGlzOiBhbnksIGV2ZW50OiBFdmVudCkge1xuICBjb25zdCBzeW1ib2xOYW1lID0gc3ltYm9sTmFtZXNbZXZlbnQudHlwZV07XG4gIGlmICghc3ltYm9sTmFtZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0YXNrRGF0YXM6IFRhc2tEYXRhW10gPSB0aGlzW3N5bWJvbE5hbWVdO1xuICBpZiAoIXRhc2tEYXRhcykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBhcmdzOiBhbnkgPSBbZXZlbnRdO1xuICBpZiAodGFza0RhdGFzLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIGlmIHRhc2tEYXRhcyBvbmx5IGhhdmUgb25lIGVsZW1lbnQsIGp1c3QgaW52b2tlIGl0XG4gICAgY29uc3QgdGFza0RhdGEgPSB0YXNrRGF0YXNbMF07XG4gICAgaWYgKHRhc2tEYXRhLnpvbmUgIT09IFpvbmUuY3VycmVudCkge1xuICAgICAgLy8gb25seSB1c2UgWm9uZS5ydW4gd2hlbiBab25lLmN1cnJlbnQgbm90IGVxdWFscyB0byBzdG9yZWQgem9uZVxuICAgICAgcmV0dXJuIHRhc2tEYXRhLnpvbmUucnVuKHRhc2tEYXRhLmhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGFza0RhdGEuaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gY29weSB0YXNrcyBhcyBhIHNuYXBzaG90IHRvIGF2b2lkIGV2ZW50IGhhbmRsZXJzIHJlbW92ZVxuICAgIC8vIGl0c2VsZiBvciBvdGhlcnNcbiAgICBjb25zdCBjb3BpZWRUYXNrcyA9IHRhc2tEYXRhcy5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29waWVkVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGlmIG90aGVyIGxpc3RlbmVyIGNhbGwgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAvLyBqdXN0IGJyZWFrXG4gICAgICBpZiAoKGV2ZW50IGFzIGFueSlbc3RvcFN5bWJvbF0gPT09IHRydWUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCB0YXNrRGF0YSA9IGNvcGllZFRhc2tzW2ldO1xuICAgICAgaWYgKHRhc2tEYXRhLnpvbmUgIT09IFpvbmUuY3VycmVudCkge1xuICAgICAgICAvLyBvbmx5IHVzZSBab25lLnJ1biB3aGVuIFpvbmUuY3VycmVudCBub3QgZXF1YWxzIHRvIHN0b3JlZCB6b25lXG4gICAgICAgIHRhc2tEYXRhLnpvbmUucnVuKHRhc2tEYXRhLmhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFza0RhdGEuaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21FdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55LCBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDoge318bnVsbCkge1xuICAgIHN1cGVyKGRvYyk7XG5cbiAgICBpZiAoIXBsYXRmb3JtSWQgfHwgIWlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMucGF0Y2hFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGF0Y2hFdmVudCgpIHtcbiAgICBpZiAodHlwZW9mIEV2ZW50ID09PSAndW5kZWZpbmVkJyB8fCAhRXZlbnQgfHwgIUV2ZW50LnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoKEV2ZW50LnByb3RvdHlwZSBhcyBhbnkpW3N0b3BNZXRob2RTeW1ib2xdKSB7XG4gICAgICAvLyBhbHJlYWR5IHBhdGNoZWQgYnkgem9uZS5qc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZWxlZ2F0ZSA9IChFdmVudC5wcm90b3R5cGUgYXMgYW55KVtzdG9wTWV0aG9kU3ltYm9sXSA9XG4gICAgICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb247XG4gICAgRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKHRoaXM6IGFueSkge1xuICAgICAgaWYgKHRoaXMpIHtcbiAgICAgICAgdGhpc1tzdG9wU3ltYm9sXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIHNob3VsZCBjYWxsIG5hdGl2ZSBkZWxlZ2F0ZSBpbiBjYXNlIGluIHNvbWUgZW52aXJvbm1lbnQgcGFydCBvZlxuICAgICAgLy8gdGhlIGFwcGxpY2F0aW9uIHdpbGwgbm90IHVzZSB0aGUgcGF0Y2hlZCBFdmVudC4gQWxzbyB3ZSBjYXN0IHRoZVxuICAgICAgLy8gXCJhcmd1bWVudHNcIiB0byBhbnkgc2luY2UgXCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIiB0ZWNobmljYWxseSBkb2VzIG5vdFxuICAgICAgLy8gYWNjZXB0IGFueSBhcmd1bWVudHMsIGJ1dCB3ZSBkb24ndCBrbm93IHdoYXQgZGV2ZWxvcGVycyBwYXNzIHRocm91Z2ggdGhlXG4gICAgICAvLyBmdW5jdGlvbiBhbmQgd2Ugd2FudCB0byBub3QgYnJlYWsgdGhlc2UgY2FsbHMuXG4gICAgICBkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICB9O1xuICB9XG5cbiAgLy8gVGhpcyBwbHVnaW4gc2hvdWxkIGNvbWUgbGFzdCBpbiB0aGUgbGlzdCBvZiBwbHVnaW5zLCBiZWNhdXNlIGl0IGFjY2VwdHMgYWxsXG4gIC8vIGV2ZW50cy5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgLyoqXG4gICAgICogVGhpcyBjb2RlIGlzIGFib3V0IHRvIGFkZCBhIGxpc3RlbmVyIHRvIHRoZSBET00uIElmIFpvbmUuanMgaXMgcHJlc2VudCwgdGhhblxuICAgICAqIGBhZGRFdmVudExpc3RlbmVyYCBoYXMgYmVlbiBwYXRjaGVkLiBUaGUgcGF0Y2hlZCBjb2RlIGFkZHMgb3ZlcmhlYWQgaW4gYm90aFxuICAgICAqIG1lbW9yeSBhbmQgc3BlZWQgKDN4IHNsb3dlcikgdGhhbiBuYXRpdmUuIEZvciB0aGlzIHJlYXNvbiBpZiB3ZSBkZXRlY3QgdGhhdFxuICAgICAqIFpvbmUuanMgaXMgcHJlc2VudCB3ZSB1c2UgYSBzaW1wbGUgdmVyc2lvbiBvZiB6b25lIGF3YXJlIGFkZEV2ZW50TGlzdGVuZXIgaW5zdGVhZC5cbiAgICAgKiBUaGUgcmVzdWx0IGlzIGZhc3RlciByZWdpc3RyYXRpb24gYW5kIHRoZSB6b25lIHdpbGwgYmUgcmVzdG9yZWQuXG4gICAgICogQnV0IFpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrLCBab25lU3BlYy5vbkludm9rZVRhc2ssIFpvbmVTcGVjLm9uQ2FuY2VsVGFza1xuICAgICAqIHdpbGwgbm90IGJlIGludm9rZWRcbiAgICAgKiBXZSBhbHNvIGRvIG1hbnVhbCB6b25lIHJlc3RvcmF0aW9uIGluIGVsZW1lbnQudHMgcmVuZGVyRXZlbnRIYW5kbGVyQ2xvc3VyZSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBOT1RFOiBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSBlbGVtZW50IGlzIGZyb20gZGlmZmVyZW50IGlmcmFtZSwgYW5kIHNvIHdlXG4gICAgICogaGF2ZSB0byBjaGVjayBiZWZvcmUgd2UgZXhlY3V0ZSB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHpvbmVKc0xvYWRlZCA9IGVsZW1lbnRbQUREX0VWRU5UX0xJU1RFTkVSXTtcbiAgICBsZXQgY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXIgPSBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXI7XG4gICAgLy8gaWYgem9uZWpzIGlzIGxvYWRlZCBhbmQgY3VycmVudCB6b25lIGlzIG5vdCBuZ1pvbmVcbiAgICAvLyB3ZSBrZWVwIFpvbmUuY3VycmVudCBvbiB0YXJnZXQgZm9yIGxhdGVyIHJlc3RvcmF0aW9uLlxuICAgIGlmICh6b25lSnNMb2FkZWQgJiYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkgfHwgaXNCbGFja0xpc3RlZEV2ZW50KGV2ZW50TmFtZSkpKSB7XG4gICAgICBsZXQgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV07XG4gICAgICBpZiAoIXN5bWJvbE5hbWUpIHtcbiAgICAgICAgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV0gPSBfX3N5bWJvbF9fKEFOR1VMQVIgKyBldmVudE5hbWUgKyBGQUxTRSk7XG4gICAgICB9XG4gICAgICBsZXQgdGFza0RhdGFzOiBUYXNrRGF0YVtdID0gKGVsZW1lbnQgYXMgYW55KVtzeW1ib2xOYW1lXTtcbiAgICAgIGNvbnN0IGdsb2JhbExpc3RlbmVyUmVnaXN0ZXJlZCA9IHRhc2tEYXRhcyAmJiB0YXNrRGF0YXMubGVuZ3RoID4gMDtcbiAgICAgIGlmICghdGFza0RhdGFzKSB7XG4gICAgICAgIHRhc2tEYXRhcyA9IChlbGVtZW50IGFzIGFueSlbc3ltYm9sTmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgem9uZSA9IGlzQmxhY2tMaXN0ZWRFdmVudChldmVudE5hbWUpID8gWm9uZS5yb290IDogWm9uZS5jdXJyZW50O1xuICAgICAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGFza0RhdGFzLnB1c2goe3pvbmU6IHpvbmUsIGhhbmRsZXI6IGNhbGxiYWNrfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY2FsbGJhY2tSZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0RhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRhc2tEYXRhc1tpXS5oYW5kbGVyID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2tSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRhc2tEYXRhcy5wdXNoKHt6b25lOiB6b25lLCBoYW5kbGVyOiBjYWxsYmFja30pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2xvYmFsTGlzdGVuZXJSZWdpc3RlcmVkKSB7XG4gICAgICAgIGVsZW1lbnRbQUREX0VWRU5UX0xJU1RFTkVSXShldmVudE5hbWUsIGdsb2JhbExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRbTkFUSVZFX0FERF9MSVNURU5FUl0oZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGxldCB1bmRlcmx5aW5nUmVtb3ZlID0gdGFyZ2V0W1JFTU9WRV9FVkVOVF9MSVNURU5FUl07XG4gICAgLy8gem9uZS5qcyBub3QgbG9hZGVkLCB1c2UgbmF0aXZlIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICBpZiAoIXVuZGVybHlpbmdSZW1vdmUpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gICAgbGV0IHN5bWJvbE5hbWUgPSBzeW1ib2xOYW1lc1tldmVudE5hbWVdO1xuICAgIGxldCB0YXNrRGF0YXM6IFRhc2tEYXRhW10gPSBzeW1ib2xOYW1lICYmIHRhcmdldFtzeW1ib2xOYW1lXTtcbiAgICBpZiAoIXRhc2tEYXRhcykge1xuICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBub3QgdXNpbmcgcGF0Y2hlZCB2ZXJzaW9uXG4gICAgICAvLyBqdXN0IGNhbGwgbmF0aXZlIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgIHJldHVybiB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gICAgLy8gZml4IGlzc3VlIDIwNTMyLCBzaG91bGQgYmUgYWJsZSB0byByZW1vdmVcbiAgICAvLyBsaXN0ZW5lciB3aGljaCB3YXMgYWRkZWQgaW5zaWRlIG9mIG5nWm9uZVxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0RhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXIgZnJvbSB0YXNrRGF0YXMgaWYgdGhlIGNhbGxiYWNrIGVxdWFsc1xuICAgICAgaWYgKHRhc2tEYXRhc1tpXS5oYW5kbGVyID09PSBjYWxsYmFjaykge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHRhc2tEYXRhcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGlmICh0YXNrRGF0YXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIGFsbCBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQsIHdlIGNhbiByZW1vdmUgdGhlIGdsb2JhbExpc3RlbmVyIGZyb20gdGFyZ2V0XG4gICAgICAgIHVuZGVybHlpbmdSZW1vdmUuYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBnbG9iYWxMaXN0ZW5lciwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm90IGZvdW5kIGluIHRhc2tEYXRhcywgdGhlIGNhbGxiYWNrIG1heSBiZSBhZGRlZCBpbnNpZGUgb2Ygbmdab25lXG4gICAgICAvLyB1c2UgbmF0aXZlIHJlbW92ZSBsaXN0ZW5lciB0byByZW1vdmUgdGhlIGNhbGxiYWNrXG4gICAgICB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==