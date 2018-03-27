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
import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
const ɵ0 = function (v) {
    return '__zone_symbol__' + v;
};
/**
 * Detect if Zone is present. If it is then use simple zone aware 'addEventListener'
 * since Angular can do much more
 * efficient bookkeeping than Zone can, because we have additional information. This speeds up
 * addEventListener by 3x.
 */
const /** @type {?} */ __symbol__ = (typeof Zone !== 'undefined') && (/** @type {?} */ (Zone))['__symbol__'] || ɵ0;
const /** @type {?} */ ADD_EVENT_LISTENER = __symbol__('addEventListener');
const /** @type {?} */ REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
const /** @type {?} */ symbolNames = {};
const /** @type {?} */ FALSE = 'FALSE';
const /** @type {?} */ ANGULAR = 'ANGULAR';
const /** @type {?} */ NATIVE_ADD_LISTENER = 'addEventListener';
const /** @type {?} */ NATIVE_REMOVE_LISTENER = 'removeEventListener';
// use the same symbol string which is used in zone.js
const /** @type {?} */ stopSymbol = '__zone_symbol__propagationStopped';
const /** @type {?} */ stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
const /** @type {?} */ blackListedEvents = (typeof Zone !== 'undefined') && (/** @type {?} */ (Zone))[__symbol__('BLACK_LISTED_EVENTS')];
let /** @type {?} */ blackListedMap;
if (blackListedEvents) {
    blackListedMap = {};
    blackListedEvents.forEach(eventName => { blackListedMap[eventName] = eventName; });
}
const /** @type {?} */ isBlackListedEvent = function (eventName) {
    if (!blackListedMap) {
        return false;
    }
    return blackListedMap.hasOwnProperty(eventName);
};
const ɵ1 = isBlackListedEvent;
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
// so we do not need to create a closure everytime
const /** @type {?} */ globalListener = function (event) {
    const /** @type {?} */ symbolName = symbolNames[event.type];
    if (!symbolName) {
        return;
    }
    const /** @type {?} */ taskDatas = this[symbolName];
    if (!taskDatas) {
        return;
    }
    const /** @type {?} */ args = [event];
    if (taskDatas.length === 1) {
        // if taskDatas only have one element, just invoke it
        const /** @type {?} */ taskData = taskDatas[0];
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
        const /** @type {?} */ copiedTasks = taskDatas.slice();
        for (let /** @type {?} */ i = 0; i < copiedTasks.length; i++) {
            // if other listener call event.stopImmediatePropagation
            // just break
            if ((/** @type {?} */ (event))[stopSymbol] === true) {
                break;
            }
            const /** @type {?} */ taskData = copiedTasks[i];
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
const ɵ2 = globalListener;
export class DomEventsPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     * @param {?} ngZone
     */
    constructor(doc, ngZone) {
        super(doc);
        this.ngZone = ngZone;
        this.patchEvent();
    }
    /**
     * @return {?}
     */
    patchEvent() {
        if (!Event || !Event.prototype) {
            return;
        }
        if ((/** @type {?} */ (Event.prototype))[stopMethodSymbol]) {
            // already patched by zone.js
            return;
        }
        const /** @type {?} */ delegate = (/** @type {?} */ (Event.prototype))[stopMethodSymbol] =
            Event.prototype.stopImmediatePropagation;
        Event.prototype.stopImmediatePropagation = function () {
            if (this) {
                this[stopSymbol] = true;
            }
            // should call native delegate in case
            // in some enviroment part of the application
            // will not use the patched Event
            delegate && delegate.apply(this, arguments);
        };
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) { return true; }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
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
        const /** @type {?} */ self = this;
        const /** @type {?} */ zoneJsLoaded = element[ADD_EVENT_LISTENER];
        let /** @type {?} */ callback = /** @type {?} */ (handler);
        // if zonejs is loaded and current zone is not ngZone
        // we keep Zone.current on target for later restoration.
        if (zoneJsLoaded && (!NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
            let /** @type {?} */ symbolName = symbolNames[eventName];
            if (!symbolName) {
                symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
            }
            let /** @type {?} */ taskDatas = (/** @type {?} */ (element))[symbolName];
            const /** @type {?} */ globalListenerRegistered = taskDatas && taskDatas.length > 0;
            if (!taskDatas) {
                taskDatas = (/** @type {?} */ (element))[symbolName] = [];
            }
            const /** @type {?} */ zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
            if (taskDatas.length === 0) {
                taskDatas.push({ zone: zone, handler: callback });
            }
            else {
                let /** @type {?} */ callbackRegistered = false;
                for (let /** @type {?} */ i = 0; i < taskDatas.length; i++) {
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
        return () => this.removeEventListener(element, eventName, callback);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    removeEventListener(target, eventName, callback) {
        let /** @type {?} */ underlyingRemove = target[REMOVE_EVENT_LISTENER];
        // zone.js not loaded, use native removeEventListener
        if (!underlyingRemove) {
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        let /** @type {?} */ symbolName = symbolNames[eventName];
        let /** @type {?} */ taskDatas = symbolName && target[symbolName];
        if (!taskDatas) {
            // addEventListener not using patched version
            // just call native removeEventListener
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        // fix issue 20532, should be able to remove
        // listener which was added inside of ngZone
        let /** @type {?} */ found = false;
        for (let /** @type {?} */ i = 0; i < taskDatas.length; i++) {
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
            // use native remove listener to remove the calback
            target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
    }
}
DomEventsPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomEventsPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: NgZone, },
];
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