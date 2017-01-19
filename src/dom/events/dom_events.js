/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core/index';
import { EventManagerPlugin } from './event_manager';
export class DomEventsPlugin extends EventManagerPlugin {
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
        element.addEventListener(eventName, /** @type {?} */ (handler), false);
        return () => element.removeEventListener(eventName, /** @type {?} */ (handler), false);
    }
}
DomEventsPlugin.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomEventsPlugin.ctorParameters = () => [];
function DomEventsPlugin_tsickle_Closure_declarations() {
    /** @type {?} */
    DomEventsPlugin.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomEventsPlugin.ctorParameters;
}
//# sourceMappingURL=dom_events.js.map