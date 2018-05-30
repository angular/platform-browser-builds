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
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
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
// so we do not need to create a closure every time
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
     * @param {?} platformId
     */
    constructor(doc, ngZone, platformId) {
        super(doc);
        this.ngZone = ngZone;
        if (!platformId || !isPlatformServer(platformId)) {
            this.patchEvent();
        }
    }
    /**
     * @return {?}
     */
    patchEvent() {
        if (typeof Event === 'undefined' || !Event || !Event.prototype) {
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
            // in some environment part of the application
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
            // use native remove listener to remove the callback
            target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
    }
}
DomEventsPlugin.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomEventsPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PLATFORM_ID,] },] },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBT2hGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7V0FTaUIsVUFBUyxDQUFTO0lBQ2hGLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7Q0FDOUI7Ozs7Ozs7QUFITCx1QkFBTSxVQUFVLEdBQ1osQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxtQkFBQyxJQUFXLEVBQUMsQ0FBQyxZQUFZLENBQUMsTUFFM0QsQ0FBQztBQUNOLHVCQUFNLGtCQUFrQixHQUF1QixVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM5RSx1QkFBTSxxQkFBcUIsR0FBMEIsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFdkYsdUJBQU0sV0FBVyxHQUE0QixFQUFFLENBQUM7QUFFaEQsdUJBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUN0Qix1QkFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQzFCLHVCQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDO0FBQy9DLHVCQUFNLHNCQUFzQixHQUFHLHFCQUFxQixDQUFDOztBQUdyRCx1QkFBTSxVQUFVLEdBQUcsbUNBQW1DLENBQUM7QUFDdkQsdUJBQU0sZ0JBQWdCLEdBQUcseUNBQXlDLENBQUM7QUFF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QUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RTtLQUNGOzs7WUEvSEYsVUFBVTs7Ozs0Q0FHSixNQUFNLFNBQUMsUUFBUTtZQXBHTSxNQUFNOzRDQXFHM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2lzUGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lLCBPcHRpb25hbCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8vIEltcG9ydCB6ZXJvIHN5bWJvbHMgZnJvbSB6b25lLmpzLiBUaGlzIGNhdXNlcyB0aGUgem9uZSBhbWJpZW50IHR5cGUgdG8gYmVcbi8vIGFkZGVkIHRvIHRoZSB0eXBlLWNoZWNrZXIsIHdpdGhvdXQgZW1pdHRpbmcgYW55IHJ1bnRpbWUgbW9kdWxlIGxvYWQgc3RhdGVtZW50XG5pbXBvcnQge30gZnJvbSAnem9uZS5qcyc7XG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbV90b2tlbnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZXRlY3QgaWYgWm9uZSBpcyBwcmVzZW50LiBJZiBpdCBpcyB0aGVuIHVzZSBzaW1wbGUgem9uZSBhd2FyZSAnYWRkRXZlbnRMaXN0ZW5lcidcbiAqIHNpbmNlIEFuZ3VsYXIgY2FuIGRvIG11Y2ggbW9yZVxuICogZWZmaWNpZW50IGJvb2trZWVwaW5nIHRoYW4gWm9uZSBjYW4sIGJlY2F1c2Ugd2UgaGF2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLiBUaGlzIHNwZWVkcyB1cFxuICogYWRkRXZlbnRMaXN0ZW5lciBieSAzeC5cbiAqL1xuY29uc3QgX19zeW1ib2xfXyA9XG4gICAgKHR5cGVvZiBab25lICE9PSAndW5kZWZpbmVkJykgJiYgKFpvbmUgYXMgYW55KVsnX19zeW1ib2xfXyddIHx8IGZ1bmN0aW9uKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gJ19fem9uZV9zeW1ib2xfXycgKyB2O1xuICAgIH07XG5jb25zdCBBRERfRVZFTlRfTElTVEVORVI6ICdhZGRFdmVudExpc3RlbmVyJyA9IF9fc3ltYm9sX18oJ2FkZEV2ZW50TGlzdGVuZXInKTtcbmNvbnN0IFJFTU9WRV9FVkVOVF9MSVNURU5FUjogJ3JlbW92ZUV2ZW50TGlzdGVuZXInID0gX19zeW1ib2xfXygncmVtb3ZlRXZlbnRMaXN0ZW5lcicpO1xuXG5jb25zdCBzeW1ib2xOYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcblxuY29uc3QgRkFMU0UgPSAnRkFMU0UnO1xuY29uc3QgQU5HVUxBUiA9ICdBTkdVTEFSJztcbmNvbnN0IE5BVElWRV9BRERfTElTVEVORVIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5jb25zdCBOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSID0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4vLyB1c2UgdGhlIHNhbWUgc3ltYm9sIHN0cmluZyB3aGljaCBpcyB1c2VkIGluIHpvbmUuanNcbmNvbnN0IHN0b3BTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fcHJvcGFnYXRpb25TdG9wcGVkJztcbmNvbnN0IHN0b3BNZXRob2RTeW1ib2wgPSAnX196b25lX3N5bWJvbF9fc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uJztcblxuY29uc3QgYmxhY2tMaXN0ZWRFdmVudHM6IHN0cmluZ1tdID1cbiAgICAodHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnKSAmJiAoWm9uZSBhcyBhbnkpW19fc3ltYm9sX18oJ0JMQUNLX0xJU1RFRF9FVkVOVFMnKV07XG5sZXQgYmxhY2tMaXN0ZWRNYXA6IHtbZXZlbnROYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuaWYgKGJsYWNrTGlzdGVkRXZlbnRzKSB7XG4gIGJsYWNrTGlzdGVkTWFwID0ge307XG4gIGJsYWNrTGlzdGVkRXZlbnRzLmZvckVhY2goZXZlbnROYW1lID0+IHsgYmxhY2tMaXN0ZWRNYXBbZXZlbnROYW1lXSA9IGV2ZW50TmFtZTsgfSk7XG59XG5cbmNvbnN0IGlzQmxhY2tMaXN0ZWRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50TmFtZTogc3RyaW5nKSB7XG4gIGlmICghYmxhY2tMaXN0ZWRNYXApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJsYWNrTGlzdGVkTWFwLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSk7XG59O1xuXG5pbnRlcmZhY2UgVGFza0RhdGEge1xuICB6b25lOiBhbnk7XG4gIGhhbmRsZXI6IEZ1bmN0aW9uO1xufVxuXG4vLyBhIGdsb2JhbCBsaXN0ZW5lciB0byBoYW5kbGUgYWxsIGRvbSBldmVudCxcbi8vIHNvIHdlIGRvIG5vdCBuZWVkIHRvIGNyZWF0ZSBhIGNsb3N1cmUgZXZlcnkgdGltZVxuY29uc3QgZ2xvYmFsTGlzdGVuZXIgPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcbiAgY29uc3Qgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50LnR5cGVdO1xuICBpZiAoIXN5bWJvbE5hbWUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdGFza0RhdGFzOiBUYXNrRGF0YVtdID0gdGhpc1tzeW1ib2xOYW1lXTtcbiAgaWYgKCF0YXNrRGF0YXMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgYXJnczogYW55ID0gW2V2ZW50XTtcbiAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBpZiB0YXNrRGF0YXMgb25seSBoYXZlIG9uZSBlbGVtZW50LCBqdXN0IGludm9rZSBpdFxuICAgIGNvbnN0IHRhc2tEYXRhID0gdGFza0RhdGFzWzBdO1xuICAgIGlmICh0YXNrRGF0YS56b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgIC8vIG9ubHkgdXNlIFpvbmUucnVuIHdoZW4gWm9uZS5jdXJyZW50IG5vdCBlcXVhbHMgdG8gc3RvcmVkIHpvbmVcbiAgICAgIHJldHVybiB0YXNrRGF0YS56b25lLnJ1bih0YXNrRGF0YS5oYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRhc2tEYXRhLmhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGNvcHkgdGFza3MgYXMgYSBzbmFwc2hvdCB0byBhdm9pZCBldmVudCBoYW5kbGVycyByZW1vdmVcbiAgICAvLyBpdHNlbGYgb3Igb3RoZXJzXG4gICAgY29uc3QgY29waWVkVGFza3MgPSB0YXNrRGF0YXMuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcGllZFRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBpZiBvdGhlciBsaXN0ZW5lciBjYWxsIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8ganVzdCBicmVha1xuICAgICAgaWYgKChldmVudCBhcyBhbnkpW3N0b3BTeW1ib2xdID09PSB0cnVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFza0RhdGEgPSBjb3BpZWRUYXNrc1tpXTtcbiAgICAgIGlmICh0YXNrRGF0YS56b25lICE9PSBab25lLmN1cnJlbnQpIHtcbiAgICAgICAgLy8gb25seSB1c2UgWm9uZS5ydW4gd2hlbiBab25lLmN1cnJlbnQgbm90IGVxdWFscyB0byBzdG9yZWQgem9uZVxuICAgICAgICB0YXNrRGF0YS56b25lLnJ1bih0YXNrRGF0YS5oYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tEYXRhLmhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tRXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IHt9fG51bGwpIHtcbiAgICBzdXBlcihkb2MpO1xuXG4gICAgaWYgKCFwbGF0Zm9ybUlkIHx8ICFpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLnBhdGNoRXZlbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHBhdGNoRXZlbnQoKSB7XG4gICAgaWYgKHR5cGVvZiBFdmVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIUV2ZW50IHx8ICFFdmVudC5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKChFdmVudC5wcm90b3R5cGUgYXMgYW55KVtzdG9wTWV0aG9kU3ltYm9sXSkge1xuICAgICAgLy8gYWxyZWFkeSBwYXRjaGVkIGJ5IHpvbmUuanNcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGVsZWdhdGUgPSAoRXZlbnQucHJvdG90eXBlIGFzIGFueSlbc3RvcE1ldGhvZFN5bWJvbF0gPVxuICAgICAgICBFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uO1xuICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzKSB7XG4gICAgICAgIHRoaXNbc3RvcFN5bWJvbF0gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBzaG91bGQgY2FsbCBuYXRpdmUgZGVsZWdhdGUgaW4gY2FzZVxuICAgICAgLy8gaW4gc29tZSBlbnZpcm9ubWVudCBwYXJ0IG9mIHRoZSBhcHBsaWNhdGlvblxuICAgICAgLy8gd2lsbCBub3QgdXNlIHRoZSBwYXRjaGVkIEV2ZW50XG4gICAgICBkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvLyBUaGlzIHBsdWdpbiBzaG91bGQgY29tZSBsYXN0IGluIHRoZSBsaXN0IG9mIHBsdWdpbnMsIGJlY2F1c2UgaXQgYWNjZXB0cyBhbGxcbiAgLy8gZXZlbnRzLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGNvZGUgaXMgYWJvdXQgdG8gYWRkIGEgbGlzdGVuZXIgdG8gdGhlIERPTS4gSWYgWm9uZS5qcyBpcyBwcmVzZW50LCB0aGFuXG4gICAgICogYGFkZEV2ZW50TGlzdGVuZXJgIGhhcyBiZWVuIHBhdGNoZWQuIFRoZSBwYXRjaGVkIGNvZGUgYWRkcyBvdmVyaGVhZCBpbiBib3RoXG4gICAgICogbWVtb3J5IGFuZCBzcGVlZCAoM3ggc2xvd2VyKSB0aGFuIG5hdGl2ZS4gRm9yIHRoaXMgcmVhc29uIGlmIHdlIGRldGVjdCB0aGF0XG4gICAgICogWm9uZS5qcyBpcyBwcmVzZW50IHdlIHVzZSBhIHNpbXBsZSB2ZXJzaW9uIG9mIHpvbmUgYXdhcmUgYWRkRXZlbnRMaXN0ZW5lciBpbnN0ZWFkLlxuICAgICAqIFRoZSByZXN1bHQgaXMgZmFzdGVyIHJlZ2lzdHJhdGlvbiBhbmQgdGhlIHpvbmUgd2lsbCBiZSByZXN0b3JlZC5cbiAgICAgKiBCdXQgWm9uZVNwZWMub25TY2hlZHVsZVRhc2ssIFpvbmVTcGVjLm9uSW52b2tlVGFzaywgWm9uZVNwZWMub25DYW5jZWxUYXNrXG4gICAgICogd2lsbCBub3QgYmUgaW52b2tlZFxuICAgICAqIFdlIGFsc28gZG8gbWFudWFsIHpvbmUgcmVzdG9yYXRpb24gaW4gZWxlbWVudC50cyByZW5kZXJFdmVudEhhbmRsZXJDbG9zdXJlIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIE5PVEU6IGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhlIGVsZW1lbnQgaXMgZnJvbSBkaWZmZXJlbnQgaWZyYW1lLCBhbmQgc28gd2VcbiAgICAgKiBoYXZlIHRvIGNoZWNrIGJlZm9yZSB3ZSBleGVjdXRlIHRoZSBtZXRob2QuXG4gICAgICovXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3Qgem9uZUpzTG9hZGVkID0gZWxlbWVudFtBRERfRVZFTlRfTElTVEVORVJdO1xuICAgIGxldCBjYWxsYmFjazogRXZlbnRMaXN0ZW5lciA9IGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lcjtcbiAgICAvLyBpZiB6b25lanMgaXMgbG9hZGVkIGFuZCBjdXJyZW50IHpvbmUgaXMgbm90IG5nWm9uZVxuICAgIC8vIHdlIGtlZXAgWm9uZS5jdXJyZW50IG9uIHRhcmdldCBmb3IgbGF0ZXIgcmVzdG9yYXRpb24uXG4gICAgaWYgKHpvbmVKc0xvYWRlZCAmJiAoIU5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSB8fCBpc0JsYWNrTGlzdGVkRXZlbnQoZXZlbnROYW1lKSkpIHtcbiAgICAgIGxldCBzeW1ib2xOYW1lID0gc3ltYm9sTmFtZXNbZXZlbnROYW1lXTtcbiAgICAgIGlmICghc3ltYm9sTmFtZSkge1xuICAgICAgICBzeW1ib2xOYW1lID0gc3ltYm9sTmFtZXNbZXZlbnROYW1lXSA9IF9fc3ltYm9sX18oQU5HVUxBUiArIGV2ZW50TmFtZSArIEZBTFNFKTtcbiAgICAgIH1cbiAgICAgIGxldCB0YXNrRGF0YXM6IFRhc2tEYXRhW10gPSAoZWxlbWVudCBhcyBhbnkpW3N5bWJvbE5hbWVdO1xuICAgICAgY29uc3QgZ2xvYmFsTGlzdGVuZXJSZWdpc3RlcmVkID0gdGFza0RhdGFzICYmIHRhc2tEYXRhcy5sZW5ndGggPiAwO1xuICAgICAgaWYgKCF0YXNrRGF0YXMpIHtcbiAgICAgICAgdGFza0RhdGFzID0gKGVsZW1lbnQgYXMgYW55KVtzeW1ib2xOYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB6b25lID0gaXNCbGFja0xpc3RlZEV2ZW50KGV2ZW50TmFtZSkgPyBab25lLnJvb3QgOiBab25lLmN1cnJlbnQ7XG4gICAgICBpZiAodGFza0RhdGFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0YXNrRGF0YXMucHVzaCh7em9uZTogem9uZSwgaGFuZGxlcjogY2FsbGJhY2t9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjYWxsYmFja1JlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGFza0RhdGFzW2ldLmhhbmRsZXIgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFja1JlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2tSZWdpc3RlcmVkKSB7XG4gICAgICAgICAgdGFza0RhdGFzLnB1c2goe3pvbmU6IHpvbmUsIGhhbmRsZXI6IGNhbGxiYWNrfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFnbG9iYWxMaXN0ZW5lclJlZ2lzdGVyZWQpIHtcbiAgICAgICAgZWxlbWVudFtBRERfRVZFTlRfTElTVEVORVJdKGV2ZW50TmFtZSwgZ2xvYmFsTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFtOQVRJVkVfQUREX0xJU1RFTkVSXShldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgbGV0IHVuZGVybHlpbmdSZW1vdmUgPSB0YXJnZXRbUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXTtcbiAgICAvLyB6b25lLmpzIG5vdCBsb2FkZWQsIHVzZSBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgIGlmICghdW5kZXJseWluZ1JlbW92ZSkge1xuICAgICAgcmV0dXJuIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgICBsZXQgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV07XG4gICAgbGV0IHRhc2tEYXRhczogVGFza0RhdGFbXSA9IHN5bWJvbE5hbWUgJiYgdGFyZ2V0W3N5bWJvbE5hbWVdO1xuICAgIGlmICghdGFza0RhdGFzKSB7XG4gICAgICAvLyBhZGRFdmVudExpc3RlbmVyIG5vdCB1c2luZyBwYXRjaGVkIHZlcnNpb25cbiAgICAgIC8vIGp1c3QgY2FsbCBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAgcmV0dXJuIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgICAvLyBmaXggaXNzdWUgMjA1MzIsIHNob3VsZCBiZSBhYmxlIHRvIHJlbW92ZVxuICAgIC8vIGxpc3RlbmVyIHdoaWNoIHdhcyBhZGRlZCBpbnNpZGUgb2Ygbmdab25lXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBmcm9tIHRhc2tEYXRhcyBpZiB0aGUgY2FsbGJhY2sgZXF1YWxzXG4gICAgICBpZiAodGFza0RhdGFzW2ldLmhhbmRsZXIgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGFza0RhdGFzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmb3VuZCkge1xuICAgICAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gYWxsIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCwgd2UgY2FuIHJlbW92ZSB0aGUgZ2xvYmFsTGlzdGVuZXIgZnJvbSB0YXJnZXRcbiAgICAgICAgdW5kZXJseWluZ1JlbW92ZS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGdsb2JhbExpc3RlbmVyLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBub3QgZm91bmQgaW4gdGFza0RhdGFzLCB0aGUgY2FsbGJhY2sgbWF5IGJlIGFkZGVkIGluc2lkZSBvZiBuZ1pvbmVcbiAgICAgIC8vIHVzZSBuYXRpdmUgcmVtb3ZlIGxpc3RlbmVyIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tcbiAgICAgIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgfVxufVxuIl19