/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
var /** @type {?} */ __symbol__ = (typeof Zone !== 'undefined') && (/** @type {?} */ (Zone))['__symbol__'] || ɵ0;
var /** @type {?} */ ADD_EVENT_LISTENER = __symbol__('addEventListener');
var /** @type {?} */ REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
var /** @type {?} */ symbolNames = {};
var /** @type {?} */ FALSE = 'FALSE';
var /** @type {?} */ ANGULAR = 'ANGULAR';
var /** @type {?} */ NATIVE_ADD_LISTENER = 'addEventListener';
var /** @type {?} */ NATIVE_REMOVE_LISTENER = 'removeEventListener';
// use the same symbol string which is used in zone.js
var /** @type {?} */ stopSymbol = '__zone_symbol__propagationStopped';
var /** @type {?} */ stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
var /** @type {?} */ blackListedEvents = (typeof Zone !== 'undefined') && (/** @type {?} */ (Zone))[__symbol__('BLACK_LISTED_EVENTS')];
var /** @type {?} */ blackListedMap;
if (blackListedEvents) {
    blackListedMap = {};
    blackListedEvents.forEach(function (eventName) { blackListedMap[eventName] = eventName; });
}
var /** @type {?} */ isBlackListedEvent = function (eventName) {
    if (!blackListedMap) {
        return false;
    }
    return blackListedMap.hasOwnProperty(eventName);
};
var ɵ1 = isBlackListedEvent;
/**
 * @record
 */
function TaskData() { }
function TaskData_tsickle_Closure_declarations() {
    /** @type {?} */
    TaskData.prototype.zone;
    /** @type {?} */
    TaskData.prototype.handler;
}
// a global listener to handle all dom event,
// so we do not need to create a closure every time
var /** @type {?} */ globalListener = function (event) {
    var /** @type {?} */ symbolName = symbolNames[event.type];
    if (!symbolName) {
        return;
    }
    var /** @type {?} */ taskDatas = this[symbolName];
    if (!taskDatas) {
        return;
    }
    var /** @type {?} */ args = [event];
    if (taskDatas.length === 1) {
        // if taskDatas only have one element, just invoke it
        var /** @type {?} */ taskData = taskDatas[0];
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
        var /** @type {?} */ copiedTasks = taskDatas.slice();
        for (var /** @type {?} */ i = 0; i < copiedTasks.length; i++) {
            // if other listener call event.stopImmediatePropagation
            // just break
            if ((/** @type {?} */ (event))[stopSymbol] === true) {
                break;
            }
            var /** @type {?} */ taskData = copiedTasks[i];
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
    /**
     * @return {?}
     */
    DomEventsPlugin.prototype.patchEvent = /**
     * @return {?}
     */
    function () {
        if (!Event || !Event.prototype) {
            return;
        }
        if ((/** @type {?} */ (Event.prototype))[stopMethodSymbol]) {
            // already patched by zone.js
            return;
        }
        var /** @type {?} */ delegate = (/** @type {?} */ (Event.prototype))[stopMethodSymbol] =
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
    /**
     * @param {?} eventName
     * @return {?}
     */
    DomEventsPlugin.prototype.supports = /**
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) { return true; };
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    DomEventsPlugin.prototype.addEventListener = /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    function (element, eventName, handler) {
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
        var /** @type {?} */ self = this;
        var /** @type {?} */ zoneJsLoaded = element[ADD_EVENT_LISTENER];
        var /** @type {?} */ callback = /** @type {?} */ (handler);
        // if zonejs is loaded and current zone is not ngZone
        // we keep Zone.current on target for later restoration.
        if (zoneJsLoaded && (!NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
            var /** @type {?} */ symbolName = symbolNames[eventName];
            if (!symbolName) {
                symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
            }
            var /** @type {?} */ taskDatas = (/** @type {?} */ (element))[symbolName];
            var /** @type {?} */ globalListenerRegistered = taskDatas && taskDatas.length > 0;
            if (!taskDatas) {
                taskDatas = (/** @type {?} */ (element))[symbolName] = [];
            }
            var /** @type {?} */ zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
            if (taskDatas.length === 0) {
                taskDatas.push({ zone: zone, handler: callback });
            }
            else {
                var /** @type {?} */ callbackRegistered = false;
                for (var /** @type {?} */ i = 0; i < taskDatas.length; i++) {
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
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    DomEventsPlugin.prototype.removeEventListener = /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    function (target, eventName, callback) {
        var /** @type {?} */ underlyingRemove = target[REMOVE_EVENT_LISTENER];
        // zone.js not loaded, use native removeEventListener
        if (!underlyingRemove) {
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        var /** @type {?} */ symbolName = symbolNames[eventName];
        var /** @type {?} */ taskDatas = symbolName && target[symbolName];
        if (!taskDatas) {
            // addEventListener not using patched version
            // just call native removeEventListener
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        // fix issue 20532, should be able to remove
        // listener which was added inside of ngZone
        var /** @type {?} */ found = false;
        for (var /** @type {?} */ i = 0; i < taskDatas.length; i++) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    DomEventsPlugin.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: NgZone, },
    ]; };
    return DomEventsPlugin;
}(EventManagerPlugin));
export { DomEventsPlugin };
function DomEventsPlugin_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DomEventsPlugin.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DomEventsPlugin.ctorParameters;
    /** @type {?} */
    DomEventsPlugin.prototype.ngZone;
}
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=dom_events.js.map