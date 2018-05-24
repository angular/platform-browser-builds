/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
var ɵ0 = function (v) {
    return '__zone_symbol__' + v;
};
/**
 * Detect if Zone is present. If it is then use simple zone aware 'addEventListener'
 * since Angular can do much more
 * efficient bookkeeping than Zone can, because we have additional information. This speeds up
 * addEventListener by 3x.
 */
var __symbol__ = (typeof Zone !== 'undefined') && Zone['__symbol__'] || ɵ0;
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
var blackListedEvents = (typeof Zone !== 'undefined') && Zone[__symbol__('BLACK_LISTED_EVENTS')];
var blackListedMap;
if (blackListedEvents) {
    blackListedMap = {};
    blackListedEvents.forEach(function (eventName) { blackListedMap[eventName] = eventName; });
}
var isBlackListedEvent = function (eventName) {
    if (!blackListedMap) {
        return false;
    }
    return blackListedMap.hasOwnProperty(eventName);
};
var ɵ1 = isBlackListedEvent;
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
var ɵ2 = globalListener;
var DomEventsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(DomEventsPlugin, _super);
    function DomEventsPlugin(doc, ngZone) {
        var _this = _super.call(this, doc) || this;
        _this.ngZone = ngZone;
        _this.patchEvent();
        return _this;
    }
    DomEventsPlugin.prototype.patchEvent = function () {
        if (!Event || !Event.prototype) {
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
            // should call native delegate in case
            // in some environment part of the application
            // will not use the patched Event
            delegate && delegate.apply(this, arguments);
        };
    };
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = 
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    function (eventName) { return true; };
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
    DomEventsPlugin.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DomEventsPlugin.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: NgZone, },
    ]; };
    return DomEventsPlugin;
}(EventManagerPlugin));
export { DomEventsPlugin };
export { ɵ0, ɵ1, ɵ2 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUt6RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO1NBU2lCLFVBQVMsQ0FBUztJQUNoRixPQUFPLGlCQUFpQixHQUFHLENBQUMsQ0FBQztDQUM5Qjs7Ozs7OztBQUhMLElBQU0sVUFBVSxHQUNaLENBQUMsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUssSUFBWSxDQUFDLFlBQVksQ0FBQyxNQUUzRCxDQUFDO0FBQ04sSUFBTSxrQkFBa0IsR0FBdUIsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUUsSUFBTSxxQkFBcUIsR0FBMEIsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFdkYsSUFBTSxXQUFXLEdBQTRCLEVBQUUsQ0FBQztBQUVoRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDdEIsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQzFCLElBQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7QUFDL0MsSUFBTSxzQkFBc0IsR0FBRyxxQkFBcUIsQ0FBQzs7QUFHckQsSUFBTSxVQUFVLEdBQUcsbUNBQW1DLENBQUM7QUFDdkQsSUFBTSxnQkFBZ0IsR0FBRyx5Q0FBeUMsQ0FBQztBQUVuRSxJQUFNLGlCQUFpQixHQUNuQixDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFLLElBQVksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENB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QUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVFO0tBQ0Y7O2dCQTNIRixVQUFVOzs7O2dEQUVJLE1BQU0sU0FBQyxRQUFRO2dCQWpHRixNQUFNOzswQkFSbEM7RUF3R3FDLGtCQUFrQjtTQUExQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIEltcG9ydCB6ZXJvIHN5bWJvbHMgZnJvbSB6b25lLmpzLiBUaGlzIGNhdXNlcyB0aGUgem9uZSBhbWJpZW50IHR5cGUgdG8gYmVcbi8vIGFkZGVkIHRvIHRoZSB0eXBlLWNoZWNrZXIsIHdpdGhvdXQgZW1pdHRpbmcgYW55IHJ1bnRpbWUgbW9kdWxlIGxvYWQgc3RhdGVtZW50XG5pbXBvcnQge30gZnJvbSAnem9uZS5qcyc7XG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbV90b2tlbnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZXRlY3QgaWYgWm9uZSBpcyBwcmVzZW50LiBJZiBpdCBpcyB0aGVuIHVzZSBzaW1wbGUgem9uZSBhd2FyZSAnYWRkRXZlbnRMaXN0ZW5lcidcbiAqIHNpbmNlIEFuZ3VsYXIgY2FuIGRvIG11Y2ggbW9yZVxuICogZWZmaWNpZW50IGJvb2trZWVwaW5nIHRoYW4gWm9uZSBjYW4sIGJlY2F1c2Ugd2UgaGF2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLiBUaGlzIHNwZWVkcyB1cFxuICogYWRkRXZlbnRMaXN0ZW5lciBieSAzeC5cbiAqL1xuY29uc3QgX19zeW1ib2xfXyA9XG4gICAgKHR5cGVvZiBab25lICE9PSAndW5kZWZpbmVkJykgJiYgKFpvbmUgYXMgYW55KVsnX19zeW1ib2xfXyddIHx8IGZ1bmN0aW9uKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gJ19fem9uZV9zeW1ib2xfXycgKyB2O1xuICAgIH07XG5jb25zdCBBRERfRVZFTlRfTElTVEVORVI6ICdhZGRFdmVudExpc3RlbmVyJyA9IF9fc3ltYm9sX18oJ2FkZEV2ZW50TGlzdGVuZXInKTtcbmNvbnN0IFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ3JlbW92ZUV2ZW50TGlzdGVuZXInID0gX19zeW1ib2xfXygncmVtb3ZlRXZlbnRMaXN0ZW5lcicpO1xuXG5jb25zdCBzeW1ib2xOYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuY29uc3QgRkFMU0UgPSAnRkFMU0UnO1xuY29uc3QgQU5HVUxBUiA9ICdBTkdVTEFSJztcbmNvbnN0IE5BVElWRV9BRERfTElTVEVORVIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5jb25zdCBOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSID0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4vLyB1c2UgdGhlIHNhbWUgc3ltYm9sIHN0cmluZyB3aGljaCBpcyB1c2VkIGluIHpvbmUuanNcbmNvbnN0IHN0b3BTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fcHJvcGFnYXRpb25TdG9wcGVkJztcbmNvbnN0IHN0b3BNZXRob2RTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uJztcblxuY29uc3QgYmxhY2tMaXN0ZWRFdmVudHM6IHN0cmluZ1tdID1cbiAgICAodHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnKSAmJiAoWm9uZSBhcyBhbnkpW19fc3ltYm9sX18oJ0JMQUNLX0xJU1RFRF9FVkVOVFMnKV07XG5sZXQgYmxhY2tMaXN0ZWRNYXA6IHtbZXZlbnROYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuaWYgKGJsYWNrTGlzdGVkRXZlbnRzKSB7XG4gIGJsYWNrTGlzdGVkTWFwID0ge307XG4gIGJsYWNrTGlzdGVkRXZlbnRzLmZvckVhY2goZXZlbnROYW1lID0+IHsgYmxhY2tMaXN0ZWRNYXBbZXZlbnROYW1lXSA9IGV2ZW50TmFtZTsgfSk7XG59XG5cbmNvbnN0IGlzQmxhY2tMaXN0ZWRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gIGlmICghYmxhY2tMaXN0ZWRNYXApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJsYWNrTGlzdGVkTWFwLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSk7XG59O1xuXG5pbnRlcmZhY2UgVGFza0RhdGEge1xuICB6b25lOiBhbnk7XG4gIGhhbmRsZXI6IEZ1bmN0aW9uO1xufVxuXG4vLyBhIGdsb2JhbCBsaXN0ZW5lciB0byBoYW5kbGUgYWxsIGRvbSBldmVudCxcbi8vIHNvIHdlIGRvIG5vdCBuZWVkIHRvIGNyZWF0ZSBhIGNsb3N1cmUgZXZlcnkgdGltZVxuY29uc3QgZ2xvYmFsTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcbiAgY29uc3Qgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50LnR5cGVdO1xuICBpZiAoIXN5bWJvbE5hbWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdGFza0RhdGFzOiBUYXNrRGF0YVtdID0gdGhpc1tzeW1ib2xOYW1lXTtcbiAgaWYgKCF0YXNrRGF0YXMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgYXJnczogYW55ID0gW2V2ZW50XTtcbiAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBpZiB0YXNrRGF0YXMgb25seSBoYXZlIG9uZSBlbGVtZW50LCBqdXN0IGludm9rZSBpdFxuICAgIGNvbnN0IHRhc2tEYXRhID0gdGFza0RhdGFzWzBdO1xuICAgIGlmICh0YXNrRGF0YS56b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgIC8vIG9ubHkgdXNlIFpvbmUucnVuIHdoZW4gWm9uZS5jdXJyZW50IG5vdCBlcXVhbHMgdG8gc3RvcmVkIHpvbmVcbiAgICAgIHJldHVybiB0YXNrRGF0YS56b25lLnJ1bih0YXNrRGF0YS5oYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRhc2tEYXRhLmhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGNvcHkgdGFza3MgYXMgYSBzbmFwc2hvdCB0byBhdm9pZCBldmVudCBoYW5kbGVycyByZW1vdmVcbiAgICAvLyBpdHNlbGYgb3Igb3RoZXJzXG4gICAgY29uc3QgY29waWVkVGFza3MgPSB0YXNrRGF0YXMuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcGllZFRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBpZiBvdGhlciBsaXN0ZW5lciBjYWxsIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8ganVzdCBicmVha1xuICAgICAgaWYgKChldmVudCBhcyBhbnkpW3N0b3BTeW1ib2xdID09PSB0cnVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFza0RhdGEgPSBjb3BpZWRUYXNrc1tpXTtcbiAgICAgIGlmICh0YXNrRGF0YS56b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgLy8gb25seSB1c2UgWm9uZS5ydW4gd2hlbiBab25lLmN1cnJlbnQgbm90IGVxdWFscyB0byBzdG9yZWQgem9uZVxuICAgICAgICB0YXNrRGF0YS56b25lLnJ1bih0YXNrRGF0YS5oYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tEYXRhLmhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tRXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihkb2MpO1xuXG4gICAgdGhpcy5wYXRjaEV2ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHBhdGNoRXZlbnQoKSB7XG4gICAgaWYgKCFFdmVudCB8fCAhRXZlbnQucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgoRXZlbnQucHJvdG90eXBlIGFzIGFueSlbc3RvcE1ldGhvZFN5bWJvbF0pIHtcbiAgICAgIC8vIGFscmVhZHkgcGF0Y2hlZCBieSB6b25lLmpzXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlbGVnYXRlID0gKEV2ZW50LnByb3RvdHlwZSBhcyBhbnkpW3N0b3BNZXRob2RTeW1ib2xdID1cbiAgICAgICAgRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjtcbiAgICBFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcykge1xuICAgICAgICB0aGlzW3N0b3BTeW1ib2xdID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gc2hvdWxkIGNhbGwgbmF0aXZlIGRlbGVnYXRlIGluIGNhc2VcbiAgICAgIC8vIGluIHNvbWUgZW52aXJvbm1lbnQgcGFydCBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAgIC8vIHdpbGwgbm90IHVzZSB0aGUgcGF0Y2hlZCBFdmVudFxuICAgICAgZGVsZWdhdGUgJiYgZGVsZWdhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gVGhpcyBwbHVnaW4gc2hvdWxkIGNvbWUgbGFzdCBpbiB0aGUgbGlzdCBvZiBwbHVnaW5zLCBiZWNhdXNlIGl0IGFjY2VwdHMgYWxsXG4gIC8vIGV2ZW50cy5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgLyoqXG4gICAgICogVGhpcyBjb2RlIGlzIGFib3V0IHRvIGFkZCBhIGxpc3RlbmVyIHRvIHRoZSBET00uIElmIFpvbmUuanMgaXMgcHJlc2VudCwgdGhhblxuICAgICAqIGBhZGRFdmVudExpc3RlbmVyYCBoYXMgYmVlbiBwYXRjaGVkLiBUaGUgcGF0Y2hlZCBjb2RlIGFkZHMgb3ZlcmhlYWQgaW4gYm90aFxuICAgICAqIG1lbW9yeSBhbmQgc3BlZWQgKDN4IHNsb3dlcikgdGhhbiBuYXRpdmUuIEZvciB0aGlzIHJlYXNvbiBpZiB3ZSBkZXRlY3QgdGhhdFxuICAgICAqIFpvbmUuanMgaXMgcHJlc2VudCB3ZSB1c2UgYSBzaW1wbGUgdmVyc2lvbiBvZiB6b25lIGF3YXJlIGFkZEV2ZW50TGlzdGVuZXIgaW5zdGVhZC5cbiAgICAgKiBUaGUgcmVzdWx0IGlzIGZhc3RlciByZWdpc3RyYXRpb24gYW5kIHRoZSB6b25lIHdpbGwgYmUgcmVzdG9yZWQuXG4gICAgICogQnV0IFpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrLCBab25lU3BlYy5vbkludm9rZVRhc2ssIFpvbmVTcGVjLm9uQ2FuY2VsVGFza1xuICAgICAqIHdpbGwgbm90IGJlIGludm9rZWRcbiAgICAgKiBXZSBhbHNvIGRvIG1hbnVhbCB6b25lIHJlc3RvcmF0aW9uIGluIGVsZW1lbnQudHMgcmVuZGVyRXZlbnRIYW5kbGVyQ2xvc3VyZSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBOT1RFOiBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSBlbGVtZW50IGlzIGZyb20gZGlmZmVyZW50IGlmcmFtZSwgYW5kIHNvIHdlXG4gICAgICogaGF2ZSB0byBjaGVjayBiZWZvcmUgd2UgZXhlY3V0ZSB0aGUgbWV0aG9kLlxuICAgICAqL1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHpvbmVKc0xvYWRlZCA9IGVsZW1lbnRbQUREX0VWRU5UX0xJU1RFTkVSXTtcbiAgICBsZXQgY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXIgPSBoYW5kbGVyIGFzIEV2ZW50TGlzdGVuZXI7XG4gICAgLy8gaWYgem9uZWpzIGlzIGxvYWRlZCBhbmQgY3VycmVudCB6b25lIGlzIG5vdCBuZ1pvbmVcbiAgICAvLyB3ZSBrZWVwIFpvbmUuY3VycmVudCBvbiB0YXJnZXQgZm9yIGxhdGVyIHJlc3RvcmF0aW9uLlxuICAgIGlmICh6b25lSnNMb2FkZWQgJiYgKCFOZ1pvbmUuaXNJbkFuZ3VsYXJab25lKCkgfHwgaXNCbGFja0xpc3RlZEV2ZW50KGV2ZW50TmFtZSkpKSB7XG4gICAgICBsZXQgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV07XG4gICAgICBpZiAoIXN5bWJvbE5hbWUpIHtcbiAgICAgICAgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV0gPSBfX3N5bWJvbF9fKEFOR1VMQVIgKyBldmVudE5hbWUgKyBGQUxTRSk7XG4gICAgICB9XG4gICAgICBsZXQgdGFza0RhdGFzOiBUYXNrRGF0YVtdID0gKGVsZW1lbnQgYXMgYW55KVtzeW1ib2xOYW1lXTtcbiAgICAgIGNvbnN0IGdsb2JhbExpc3RlbmVyUmVnaXN0ZXJlZCA9IHRhc2tEYXRhcyAmJiB0YXNrRGF0YXMubGVuZ3RoID4gMDtcbiAgICAgIGlmICghdGFza0RhdGFzKSB7XG4gICAgICAgIHRhc2tEYXRhcyA9IChlbGVtZW50IGFzIGFueSlbc3ltYm9sTmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgem9uZSA9IGlzQmxhY2tMaXN0ZWRFdmVudChldmVudE5hbWUpID8gWm9uZS5yb290IDogWm9uZS5jdXJyZW50O1xuICAgICAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGFza0RhdGFzLnB1c2goe3pvbmU6IHpvbmUsIGhhbmRsZXI6IGNhbGxiYWNrfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY2FsbGJhY2tSZWdpc3RlcmVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0RhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRhc2tEYXRhc1tpXS5oYW5kbGVyID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2tSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrUmVnaXN0ZXJlZCkge1xuICAgICAgICAgIHRhc2tEYXRhcy5wdXNoKHt6b25lOiB6b25lLCBoYW5kbGVyOiBjYWxsYmFja30pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2xvYmFsTGlzdGVuZXJSZWdpc3RlcmVkKSB7XG4gICAgICAgIGVsZW1lbnRbQUREX0VWRU5UX0xJU1RFTkVSXShldmVudE5hbWUsIGdsb2JhbExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRbTkFUSVZFX0FERF9MSVNURU5FUl0oZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIGxldCB1bmRlcmx5aW5nUmVtb3ZlID0gdGFyZ2V0W1JFTU9WRV9FVkVOVF9MSVNURU5FUl07XG4gICAgLy8gem9uZS5qcyBub3QgbG9hZGVkLCB1c2UgbmF0aXZlIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICBpZiAoIXVuZGVybHlpbmdSZW1vdmUpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gICAgbGV0IHN5bWJvbE5hbWUgPSBzeW1ib2xOYW1lc1tldmVudE5hbWVdO1xuICAgIGxldCB0YXNrRGF0YXM6IFRhc2tEYXRhW10gPSBzeW1ib2xOYW1lICYmIHRhcmdldFtzeW1ib2xOYW1lXTtcbiAgICBpZiAoIXRhc2tEYXRhcykge1xuICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBub3QgdXNpbmcgcGF0Y2hlZCB2ZXJzaW9uXG4gICAgICAvLyBqdXN0IGNhbGwgbmF0aXZlIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgIHJldHVybiB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gICAgLy8gZml4IGlzc3VlIDIwNTMyLCBzaG91bGQgYmUgYWJsZSB0byByZW1vdmVcbiAgICAvLyBsaXN0ZW5lciB3aGljaCB3YXMgYWRkZWQgaW5zaWRlIG9mIG5nWm9uZVxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza0RhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXIgZnJvbSB0YXNrRGF0YXMgaWYgdGhlIGNhbGxiYWNrIGVxdWFsc1xuICAgICAgaWYgKHRhc2tEYXRhc1tpXS5oYW5kbGVyID09PSBjYWxsYmFjaykge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIHRhc2tEYXRhcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGlmICh0YXNrRGF0YXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIGFsbCBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQsIHdlIGNhbiByZW1vdmUgdGhlIGdsb2JhbExpc3RlbmVyIGZyb20gdGFyZ2V0XG4gICAgICAgIHVuZGVybHlpbmdSZW1vdmUuYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBnbG9iYWxMaXN0ZW5lciwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm90IGZvdW5kIGluIHRhc2tEYXRhcywgdGhlIGNhbGxiYWNrIG1heSBiZSBhZGRlZCBpbnNpZGUgb2Ygbmdab25lXG4gICAgICAvLyB1c2UgbmF0aXZlIHJlbW92ZSBsaXN0ZW5lciB0byByZW1vdmUgdGhlIGNhbGxiYWNrXG4gICAgICB0YXJnZXRbTkFUSVZFX1JFTU9WRV9MSVNURU5FUl0uYXBwbHkodGFyZ2V0LCBbZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2VdKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==