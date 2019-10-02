/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Detect if Zone is present. If it is then use simple zone aware 'addEventListener'
 * since Angular can do much more
 * efficient bookkeeping than Zone can, because we have additional information. This speeds up
 * addEventListener by 3x.
 * @type {?}
 */
const __symbol__ = ((/**
 * @return {?}
 */
() => (typeof Zone !== 'undefined') && ((/** @type {?} */ (Zone)))['__symbol__'] ||
    (/**
     * @param {?} v
     * @return {?}
     */
    function (v) { return '__zone_symbol__' + v; })))();
/** @type {?} */
const ADD_EVENT_LISTENER = __symbol__('addEventListener');
/** @type {?} */
const REMOVE_EVENT_LISTENER = __symbol__('removeEventListener');
/** @type {?} */
const symbolNames = {};
/** @type {?} */
const FALSE = 'FALSE';
/** @type {?} */
const ANGULAR = 'ANGULAR';
/** @type {?} */
const NATIVE_ADD_LISTENER = 'addEventListener';
/** @type {?} */
const NATIVE_REMOVE_LISTENER = 'removeEventListener';
// use the same symbol string which is used in zone.js
/** @type {?} */
const stopSymbol = '__zone_symbol__propagationStopped';
/** @type {?} */
const stopMethodSymbol = '__zone_symbol__stopImmediatePropagation';
/** @type {?} */
const blackListedMap = ((/**
 * @return {?}
 */
() => {
    /** @type {?} */
    const blackListedEvents = (typeof Zone !== 'undefined') && ((/** @type {?} */ (Zone)))[__symbol__('BLACK_LISTED_EVENTS')];
    if (blackListedEvents) {
        /** @type {?} */
        const res = {};
        blackListedEvents.forEach((/**
         * @param {?} eventName
         * @return {?}
         */
        eventName => { res[eventName] = eventName; }));
        return res;
    }
    return undefined;
}))();
/** @type {?} */
const isBlackListedEvent = (/**
 * @param {?} eventName
 * @return {?}
 */
function (eventName) {
    if (!blackListedMap) {
        return false;
    }
    return blackListedMap.hasOwnProperty(eventName);
});
/**
 * @record
 */
function TaskData() { }
if (false) {
    /** @type {?} */
    TaskData.prototype.zone;
    /** @type {?} */
    TaskData.prototype.handler;
}
// a global listener to handle all dom event,
// so we do not need to create a closure every time
/** @type {?} */
const globalListener = (/**
 * @this {?}
 * @param {?} event
 * @return {?}
 */
function (event) {
    /** @type {?} */
    const symbolName = symbolNames[event.type];
    if (!symbolName) {
        return;
    }
    /** @type {?} */
    const taskDatas = this[symbolName];
    if (!taskDatas) {
        return;
    }
    /** @type {?} */
    const args = [event];
    if (taskDatas.length === 1) {
        // if taskDatas only have one element, just invoke it
        /** @type {?} */
        const taskData = taskDatas[0];
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
        /** @type {?} */
        const copiedTasks = taskDatas.slice();
        for (let i = 0; i < copiedTasks.length; i++) {
            // if other listener call event.stopImmediatePropagation
            // just break
            if (((/** @type {?} */ (event)))[stopSymbol] === true) {
                break;
            }
            /** @type {?} */
            const taskData = copiedTasks[i];
            if (taskData.zone !== Zone.current) {
                // only use Zone.run when Zone.current not equals to stored zone
                taskData.zone.run(taskData.handler, this, args);
            }
            else {
                taskData.handler.apply(this, args);
            }
        }
    }
});
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
     * @private
     * @return {?}
     */
    patchEvent() {
        if (typeof Event === 'undefined' || !Event || !Event.prototype) {
            return;
        }
        if (((/** @type {?} */ (Event.prototype)))[stopMethodSymbol]) {
            // already patched by zone.js
            return;
        }
        /** @type {?} */
        const delegate = ((/** @type {?} */ (Event.prototype)))[stopMethodSymbol] =
            Event.prototype.stopImmediatePropagation;
        Event.prototype.stopImmediatePropagation = (/**
         * @this {?}
         * @return {?}
         */
        function () {
            if (this) {
                this[stopSymbol] = true;
            }
            // We should call native delegate in case in some environment part of
            // the application will not use the patched Event. Also we cast the
            // "arguments" to any since "stopImmediatePropagation" technically does not
            // accept any arguments, but we don't know what developers pass through the
            // function and we want to not break these calls.
            delegate && delegate.apply(this, (/** @type {?} */ (arguments)));
        });
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
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
         * @type {?}
         */
        const self = this;
        /** @type {?} */
        const zoneJsLoaded = element[ADD_EVENT_LISTENER];
        /** @type {?} */
        let callback = (/** @type {?} */ (handler));
        // if zonejs is loaded and current zone is not ngZone
        // we keep Zone.current on target for later restoration.
        if (zoneJsLoaded && (!NgZone.isInAngularZone() || isBlackListedEvent(eventName))) {
            /** @type {?} */
            let symbolName = symbolNames[eventName];
            if (!symbolName) {
                symbolName = symbolNames[eventName] = __symbol__(ANGULAR + eventName + FALSE);
            }
            /** @type {?} */
            let taskDatas = ((/** @type {?} */ (element)))[symbolName];
            /** @type {?} */
            const globalListenerRegistered = taskDatas && taskDatas.length > 0;
            if (!taskDatas) {
                taskDatas = ((/** @type {?} */ (element)))[symbolName] = [];
            }
            /** @type {?} */
            const zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
            if (taskDatas.length === 0) {
                taskDatas.push({ zone: zone, handler: callback });
            }
            else {
                /** @type {?} */
                let callbackRegistered = false;
                for (let i = 0; i < taskDatas.length; i++) {
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
        return (/**
         * @return {?}
         */
        () => this.removeEventListener(element, eventName, callback));
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    removeEventListener(target, eventName, callback) {
        /** @type {?} */
        let underlyingRemove = target[REMOVE_EVENT_LISTENER];
        // zone.js not loaded, use native removeEventListener
        if (!underlyingRemove) {
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        /** @type {?} */
        let symbolName = symbolNames[eventName];
        /** @type {?} */
        let taskDatas = symbolName && target[symbolName];
        if (!taskDatas) {
            // addEventListener not using patched version
            // just call native removeEventListener
            return target[NATIVE_REMOVE_LISTENER].apply(target, [eventName, callback, false]);
        }
        // fix issue 20532, should be able to remove
        // listener which was added inside of ngZone
        /** @type {?} */
        let found = false;
        for (let i = 0; i < taskDatas.length; i++) {
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
    { type: Injectable },
];
/** @nocollapse */
DomEventsPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ DomEventsPlugin.ngFactoryDef = function DomEventsPlugin_Factory(t) { return new (t || DomEventsPlugin)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(PLATFORM_ID, 8)); };
/** @nocollapse */ DomEventsPlugin.ngInjectableDef = i0.ɵɵdefineInjectable({ token: DomEventsPlugin, factory: function (t) { return DomEventsPlugin.ngFactoryDef(t); }, providedIn: null });
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomEventsPlugin.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMvZG9tX2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O01BUTdDLFVBQVUsR0FDWjs7O0FBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsWUFBWSxDQUFDOzs7OztJQUM5RCxVQUFTLENBQVMsSUFBWSxPQUFPLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDLEVBQUU7O01BQ25FLGtCQUFrQixHQUF1QixVQUFVLENBQUMsa0JBQWtCLENBQUM7O01BQ3ZFLHFCQUFxQixHQUEwQixVQUFVLENBQUMscUJBQXFCLENBQUM7O01BRWhGLFdBQVcsR0FBNEIsRUFBRTs7TUFFekMsS0FBSyxHQUFHLE9BQU87O01BQ2YsT0FBTyxHQUFHLFNBQVM7O01BQ25CLG1CQUFtQixHQUFHLGtCQUFrQjs7TUFDeEMsc0JBQXNCLEdBQUcscUJBQXFCOzs7TUFHOUMsVUFBVSxHQUFHLG1DQUFtQzs7TUFDaEQsZ0JBQWdCLEdBQUcseUNBQXlDOztNQUc1RCxjQUFjLEdBQUc7OztBQUFDLEdBQUcsRUFBRTs7VUFDckIsaUJBQWlCLEdBQ25CLENBQUMsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUks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d0Q7WUFDeEQsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDckMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTTthQUNQO1NBQ0Y7UUFDRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLDBFQUEwRTtnQkFDMUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNwRTtTQUNGO2FBQU07WUFDTCxxRUFBcUU7WUFDckUsb0RBQW9EO1lBQ3BELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDNUU7SUFDSCxDQUFDOzs7WUFqSUYsVUFBVTs7Ozs0Q0FHSixNQUFNLFNBQUMsUUFBUTtZQWpHTSxNQUFNOzRDQWtHM0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxXQUFXOztzRkFIeEIsZUFBZSxjQUVkLFFBQVEsdUNBQ0ksV0FBVztpRUFIeEIsZUFBZSxpQ0FBZixlQUFlO21DQUFmLGVBQWU7Y0FEM0IsVUFBVTs7c0JBR0osTUFBTTt1QkFBQyxRQUFROztzQkFDZixRQUFROztzQkFBSSxNQUFNO3VCQUFDLFdBQVc7Ozs7Ozs7SUFESCxpQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lLCBPcHRpb25hbCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZXRlY3QgaWYgWm9uZSBpcyBwcmVzZW50LiBJZiBpdCBpcyB0aGVuIHVzZSBzaW1wbGUgem9uZSBhd2FyZSAnYWRkRXZlbnRMaXN0ZW5lcidcbiAqIHNpbmNlIEFuZ3VsYXIgY2FuIGRvIG11Y2ggbW9yZVxuICogZWZmaWNpZW50IGJvb2trZWVwaW5nIHRoYW4gWm9uZSBjYW4sIGJlY2F1c2Ugd2UgaGF2ZSBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLiBUaGlzIHNwZWVkcyB1cFxuICogYWRkRXZlbnRMaXN0ZW5lciBieSAzeC5cbiAqL1xuY29uc3QgX19zeW1ib2xfXyA9XG4gICAgKCgpID0+ICh0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcpICYmIChab25lIGFzIGFueSlbJ19fc3ltYm9sX18nXSB8fFxuICAgICAgICAgZnVuY3Rpb24odjogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuICdfX3pvbmVfc3ltYm9sX18nICsgdjsgfSkoKTtcbmNvbnN0IEFERF9FVkVOVF9MSVNURU5FUjogJ2FkZEV2ZW50TGlzdGVuZXInID0gX19zeW1ib2xfXygnYWRkRXZlbnRMaXN0ZW5lcicpO1xuY29uc3QgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgPSBfX3N5bWJvbF9fKCdyZW1vdmVFdmVudExpc3RlbmVyJyk7XG5cbmNvbnN0IHN5bWJvbE5hbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG5jb25zdCBGQUxTRSA9ICdGQUxTRSc7XG5jb25zdCBBTkdVTEFSID0gJ0FOR1VMQVInO1xuY29uc3QgTkFUSVZFX0FERF9MSVNURU5FUiA9ICdhZGRFdmVudExpc3RlbmVyJztcbmNvbnN0IE5BVElWRV9SRU1PVkVfTElTVEVORVIgPSAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbi8vIHVzZSB0aGUgc2FtZSBzeW1ib2wgc3RyaW5nIHdoaWNoIGlzIHVzZWQgaW4gem9uZS5qc1xuY29uc3Qgc3RvcFN5bWJvbCA9ICdfX3pvbmVfc3ltYm9sX19wcm9wYWdhdGlvblN0b3BwZWQnO1xuY29uc3Qgc3RvcE1ldGhvZFN5bWJvbCA9ICdfX3pvbmVfc3ltYm9sX19zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24nO1xuXG5cbmNvbnN0IGJsYWNrTGlzdGVkTWFwID0gKCgpID0+IHtcbiAgY29uc3QgYmxhY2tMaXN0ZWRFdmVudHM6IHN0cmluZ1tdID1cbiAgICAgICh0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcpICYmIChab25lIGFzIGFueSlbX19zeW1ib2xfXygnQkxBQ0tfTElTVEVEX0VWRU5UUycpXTtcbiAgaWYgKGJsYWNrTGlzdGVkRXZlbnRzKSB7XG4gICAgY29uc3QgcmVzOiB7W2V2ZW50TmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGJsYWNrTGlzdGVkRXZlbnRzLmZvckVhY2goZXZlbnROYW1lID0+IHsgcmVzW2V2ZW50TmFtZV0gPSBldmVudE5hbWU7IH0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0pKCk7XG5cblxuY29uc3QgaXNCbGFja0xpc3RlZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnROYW1lOiBzdHJpbmcpIHtcbiAgaWYgKCFibGFja0xpc3RlZE1hcCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYmxhY2tMaXN0ZWRNYXAuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKTtcbn07XG5cbmludGVyZmFjZSBUYXNrRGF0YSB7XG4gIHpvbmU6IGFueTtcbiAgaGFuZGxlcjogRnVuY3Rpb247XG59XG5cbi8vIGEgZ2xvYmFsIGxpc3RlbmVyIHRvIGhhbmRsZSBhbGwgZG9tIGV2ZW50LFxuLy8gc28gd2UgZG8gbm90IG5lZWQgdG8gY3JlYXRlIGEgY2xvc3VyZSBldmVyeSB0aW1lXG5jb25zdCBnbG9iYWxMaXN0ZW5lciA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgZXZlbnQ6IEV2ZW50KSB7XG4gIGNvbnN0IHN5bWJvbE5hbWUgPSBzeW1ib2xOYW1lc1tldmVudC50eXBlXTtcbiAgaWYgKCFzeW1ib2xOYW1lKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHRhc2tEYXRhczogVGFza0RhdGFbXSA9IHRoaXNbc3ltYm9sTmFtZV07XG4gIGlmICghdGFza0RhdGFzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGFyZ3M6IGFueSA9IFtldmVudF07XG4gIGlmICh0YXNrRGF0YXMubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gaWYgdGFza0RhdGFzIG9ubHkgaGF2ZSBvbmUgZWxlbWVudCwganVzdCBpbnZva2UgaXRcbiAgICBjb25zdCB0YXNrRGF0YSA9IHRhc2tEYXRhc1swXTtcbiAgICBpZiAodGFza0RhdGEuem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAvLyBvbmx5IHVzZSBab25lLnJ1biB3aGVuIFpvbmUuY3VycmVudCBub3QgZXF1YWxzIHRvIHN0b3JlZCB6b25lXG4gICAgICByZXR1cm4gdGFza0RhdGEuem9uZS5ydW4odGFza0RhdGEuaGFuZGxlciwgdGhpcywgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0YXNrRGF0YS5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBjb3B5IHRhc2tzIGFzIGEgc25hcHNob3QgdG8gYXZvaWQgZXZlbnQgaGFuZGxlcnMgcmVtb3ZlXG4gICAgLy8gaXRzZWxmIG9yIG90aGVyc1xuICAgIGNvbnN0IGNvcGllZFRhc2tzID0gdGFza0RhdGFzLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3BpZWRUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gaWYgb3RoZXIgbGlzdGVuZXIgY2FsbCBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cbiAgICAgIC8vIGp1c3QgYnJlYWtcbiAgICAgIGlmICgoZXZlbnQgYXMgYW55KVtzdG9wU3ltYm9sXSA9PT0gdHJ1ZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhc2tEYXRhID0gY29waWVkVGFza3NbaV07XG4gICAgICBpZiAodGFza0RhdGEuem9uZSAhPT0gWm9uZS5jdXJyZW50KSB7XG4gICAgICAgIC8vIG9ubHkgdXNlIFpvbmUucnVuIHdoZW4gWm9uZS5jdXJyZW50IG5vdCBlcXVhbHMgdG8gc3RvcmVkIHpvbmVcbiAgICAgICAgdGFza0RhdGEuem9uZS5ydW4odGFza0RhdGEuaGFuZGxlciwgdGhpcywgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrRGF0YS5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbUV2ZW50c1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiB7fXxudWxsKSB7XG4gICAgc3VwZXIoZG9jKTtcblxuICAgIGlmICghcGxhdGZvcm1JZCB8fCAhaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5wYXRjaEV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwYXRjaEV2ZW50KCkge1xuICAgIGlmICh0eXBlb2YgRXZlbnQgPT09ICd1bmRlZmluZWQnIHx8ICFFdmVudCB8fCAhRXZlbnQucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgoRXZlbnQucHJvdG90eXBlIGFzIGFueSlbc3RvcE1ldGhvZFN5bWJvbF0pIHtcbiAgICAgIC8vIGFscmVhZHkgcGF0Y2hlZCBieSB6b25lLmpzXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlbGVnYXRlID0gKEV2ZW50LnByb3RvdHlwZSBhcyBhbnkpW3N0b3BNZXRob2RTeW1ib2xdID1cbiAgICAgICAgRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjtcbiAgICBFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24odGhpczogYW55KSB7XG4gICAgICBpZiAodGhpcykge1xuICAgICAgICB0aGlzW3N0b3BTeW1ib2xdID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gV2Ugc2hvdWxkIGNhbGwgbmF0aXZlIGRlbGVnYXRlIGluIGNhc2UgaW4gc29tZSBlbnZpcm9ubWVudCBwYXJ0IG9mXG4gICAgICAvLyB0aGUgYXBwbGljYXRpb24gd2lsbCBub3QgdXNlIHRoZSBwYXRjaGVkIEV2ZW50LiBBbHNvIHdlIGNhc3QgdGhlXG4gICAgICAvLyBcImFyZ3VtZW50c1wiIHRvIGFueSBzaW5jZSBcInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblwiIHRlY2huaWNhbGx5IGRvZXMgbm90XG4gICAgICAvLyBhY2NlcHQgYW55IGFyZ3VtZW50cywgYnV0IHdlIGRvbid0IGtub3cgd2hhdCBkZXZlbG9wZXJzIHBhc3MgdGhyb3VnaCB0aGVcbiAgICAgIC8vIGZ1bmN0aW9uIGFuZCB3ZSB3YW50IHRvIG5vdCBicmVhayB0aGVzZSBjYWxscy5cbiAgICAgIGRlbGVnYXRlICYmIGRlbGVnYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyBhcyBhbnkpO1xuICAgIH07XG4gIH1cblxuICAvLyBUaGlzIHBsdWdpbiBzaG91bGQgY29tZSBsYXN0IGluIHRoZSBsaXN0IG9mIHBsdWdpbnMsIGJlY2F1c2UgaXQgYWNjZXB0cyBhbGxcbiAgLy8gZXZlbnRzLlxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGNvZGUgaXMgYWJvdXQgdG8gYWRkIGEgbGlzdGVuZXIgdG8gdGhlIERPTS4gSWYgWm9uZS5qcyBpcyBwcmVzZW50LCB0aGFuXG4gICAgICogYGFkZEV2ZW50TGlzdGVuZXJgIGhhcyBiZWVuIHBhdGNoZWQuIFRoZSBwYXRjaGVkIGNvZGUgYWRkcyBvdmVyaGVhZCBpbiBib3RoXG4gICAgICogbWVtb3J5IGFuZCBzcGVlZCAoM3ggc2xvd2VyKSB0aGFuIG5hdGl2ZS4gRm9yIHRoaXMgcmVhc29uIGlmIHdlIGRldGVjdCB0aGF0XG4gICAgICogWm9uZS5qcyBpcyBwcmVzZW50IHdlIHVzZSBhIHNpbXBsZSB2ZXJzaW9uIG9mIHpvbmUgYXdhcmUgYWRkRXZlbnRMaXN0ZW5lciBpbnN0ZWFkLlxuICAgICAqIFRoZSByZXN1bHQgaXMgZmFzdGVyIHJlZ2lzdHJhdGlvbiBhbmQgdGhlIHpvbmUgd2lsbCBiZSByZXN0b3JlZC5cbiAgICAgKiBCdXQgWm9uZVNwZWMub25TY2hlZHVsZVRhc2ssIFpvbmVTcGVjLm9uSW52b2tlVGFzaywgWm9uZVNwZWMub25DYW5jZWxUYXNrXG4gICAgICogd2lsbCBub3QgYmUgaW52b2tlZFxuICAgICAqIFdlIGFsc28gZG8gbWFudWFsIHpvbmUgcmVzdG9yYXRpb24gaW4gZWxlbWVudC50cyByZW5kZXJFdmVudEhhbmRsZXJDbG9zdXJlIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIE5PVEU6IGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhlIGVsZW1lbnQgaXMgZnJvbSBkaWZmZXJlbnQgaWZyYW1lLCBhbmQgc28gd2VcbiAgICAgKiBoYXZlIHRvIGNoZWNrIGJlZm9yZSB3ZSBleGVjdXRlIHRoZSBtZXRob2QuXG4gICAgICovXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3Qgem9uZUpzTG9hZGVkID0gZWxlbWVudFtBRERfRVZFTlRfTElTVEVORVJdO1xuICAgIGxldCBjYWxsYmFjazogRXZlbnRMaXN0ZW5lciA9IGhhbmRsZXIgYXMgRXZlbnRMaXN0ZW5lcjtcbiAgICAvLyBpZiB6b25lanMgaXMgbG9hZGVkIGFuZCBjdXJyZW50IHpvbmUgaXMgbm90IG5nWm9uZVxuICAgIC8vIHdlIGtlZXAgWm9uZS5jdXJyZW50IG9uIHRhcmdldCBmb3IgbGF0ZXIgcmVzdG9yYXRpb24uXG4gICAgaWYgKHpvbmVKc0xvYWRlZCAmJiAoIU5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSB8fCBpc0JsYWNrTGlzdGVkRXZlbnQoZXZlbnROYW1lKSkpIHtcbiAgICAgIGxldCBzeW1ib2xOYW1lID0gc3ltYm9sTmFtZXNbZXZlbnROYW1lXTtcbiAgICAgIGlmICghc3ltYm9sTmFtZSkge1xuICAgICAgICBzeW1ib2xOYW1lID0gc3ltYm9sTmFtZXNbZXZlbnROYW1lXSA9IF9fc3ltYm9sX18oQU5HVUxBUiArIGV2ZW50TmFtZSArIEZBTFNFKTtcbiAgICAgIH1cbiAgICAgIGxldCB0YXNrRGF0YXM6IFRhc2tEYXRhW10gPSAoZWxlbWVudCBhcyBhbnkpW3N5bWJvbE5hbWVdO1xuICAgICAgY29uc3QgZ2xvYmFsTGlzdGVuZXJSZWdpc3RlcmVkID0gdGFza0RhdGFzICYmIHRhc2tEYXRhcy5sZW5ndGggPiAwO1xuICAgICAgaWYgKCF0YXNrRGF0YXMpIHtcbiAgICAgICAgdGFza0RhdGFzID0gKGVsZW1lbnQgYXMgYW55KVtzeW1ib2xOYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB6b25lID0gaXNCbGFja0xpc3RlZEV2ZW50KGV2ZW50TmFtZSkgPyBab25lLnJvb3QgOiBab25lLmN1cnJlbnQ7XG4gICAgICBpZiAodGFza0RhdGFzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0YXNrRGF0YXMucHVzaCh7em9uZTogem9uZSwgaGFuZGxlcjogY2FsbGJhY2t9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjYWxsYmFja1JlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGFza0RhdGFzW2ldLmhhbmRsZXIgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFja1JlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2tSZWdpc3RlcmVkKSB7XG4gICAgICAgICAgdGFza0RhdGFzLnB1c2goe3pvbmU6IHpvbmUsIGhhbmRsZXI6IGNhbGxiYWNrfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFnbG9iYWxMaXN0ZW5lclJlZ2lzdGVyZWQpIHtcbiAgICAgICAgZWxlbWVudFtBRERfRVZFTlRfTElTVEVORVJdKGV2ZW50TmFtZSwgZ2xvYmFsTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFtOQVRJVkVfQUREX0xJU1RFTkVSXShldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgbGV0IHVuZGVybHlpbmdSZW1vdmUgPSB0YXJnZXRbUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXTtcbiAgICAvLyB6b25lLmpzIG5vdCBsb2FkZWQsIHVzZSBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgIGlmICghdW5kZXJseWluZ1JlbW92ZSkge1xuICAgICAgcmV0dXJuIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgICBsZXQgc3ltYm9sTmFtZSA9IHN5bWJvbE5hbWVzW2V2ZW50TmFtZV07XG4gICAgbGV0IHRhc2tEYXRhczogVGFza0RhdGFbXSA9IHN5bWJvbE5hbWUgJiYgdGFyZ2V0W3N5bWJvbE5hbWVdO1xuICAgIGlmICghdGFza0RhdGFzKSB7XG4gICAgICAvLyBhZGRFdmVudExpc3RlbmVyIG5vdCB1c2luZyBwYXRjaGVkIHZlcnNpb25cbiAgICAgIC8vIGp1c3QgY2FsbCBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAgcmV0dXJuIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgICAvLyBmaXggaXNzdWUgMjA1MzIsIHNob3VsZCBiZSBhYmxlIHRvIHJlbW92ZVxuICAgIC8vIGxpc3RlbmVyIHdoaWNoIHdhcyBhZGRlZCBpbnNpZGUgb2Ygbmdab25lXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrRGF0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lciBmcm9tIHRhc2tEYXRhcyBpZiB0aGUgY2FsbGJhY2sgZXF1YWxzXG4gICAgICBpZiAodGFza0RhdGFzW2ldLmhhbmRsZXIgPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGFza0RhdGFzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmb3VuZCkge1xuICAgICAgaWYgKHRhc2tEYXRhcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gYWxsIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCwgd2UgY2FuIHJlbW92ZSB0aGUgZ2xvYmFsTGlzdGVuZXIgZnJvbSB0YXJnZXRcbiAgICAgICAgdW5kZXJseWluZ1JlbW92ZS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGdsb2JhbExpc3RlbmVyLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBub3QgZm91bmQgaW4gdGFza0RhdGFzLCB0aGUgY2FsbGJhY2sgbWF5IGJlIGFkZGVkIGluc2lkZSBvZiBuZ1pvbmVcbiAgICAgIC8vIHVzZSBuYXRpdmUgcmVtb3ZlIGxpc3RlbmVyIHRvIHJlbW92ZSB0aGUgY2FsbGJhY2tcbiAgICAgIHRhcmdldFtOQVRJVkVfUkVNT1ZFX0xJU1RFTkVSXS5hcHBseSh0YXJnZXQsIFtldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZV0pO1xuICAgIH1cbiAgfVxufVxuIl19