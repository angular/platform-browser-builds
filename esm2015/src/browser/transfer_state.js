/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/browser/transfer_state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, Injectable, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} text
 * @return {?}
 */
export function escapeHtml(text) {
    /** @type {?} */
    const escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;',
    };
    return text.replace(/[&"'<>]/g, (/**
     * @param {?} s
     * @return {?}
     */
    s => escapedText[s]));
}
/**
 * @param {?} text
 * @return {?}
 */
export function unescapeHtml(text) {
    /** @type {?} */
    const unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>',
    };
    return text.replace(/&[^;]+;/g, (/**
     * @param {?} s
     * @return {?}
     */
    s => unescapedText[s]));
}
/**
 * Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.
 *
 * Example:
 *
 * ```
 * const COUNTER_KEY = makeStateKey<number>('counter');
 * let value = 10;
 *
 * transferState.set(COUNTER_KEY, value);
 * ```
 *
 * \@publicApi
 * @template T
 * @param {?} key
 * @return {?}
 */
export function makeStateKey(key) {
    return (/** @type {?} */ (key));
}
/**
 * A key value store that is transferred from the application on the server side to the application
 * on the client side.
 *
 * `TransferState` will be available as an injectable token. To use it import
 * `ServerTransferStateModule` on the server and `BrowserTransferStateModule` on the client.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialzied in a
 * non-lossy manner.
 *
 * \@publicApi
 */
export class TransferState {
    constructor() {
        this.store = {};
        this.onSerializeCallbacks = {};
    }
    /**
     * \@internal
     * @param {?} initState
     * @return {?}
     */
    static init(initState) {
        /** @type {?} */
        const transferState = new TransferState();
        transferState.store = initState;
        return transferState;
    }
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     * @template T
     * @param {?} key
     * @param {?} defaultValue
     * @return {?}
     */
    get(key, defaultValue) {
        return this.store[key] !== undefined ? (/** @type {?} */ (this.store[key])) : defaultValue;
    }
    /**
     * Set the value corresponding to a key.
     * @template T
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        this.store[key] = value;
    }
    /**
     * Remove a key from the store.
     * @template T
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        delete this.store[key];
    }
    /**
     * Test whether a key exists in the store.
     * @template T
     * @param {?} key
     * @return {?}
     */
    hasKey(key) {
        return this.store.hasOwnProperty(key);
    }
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     * @template T
     * @param {?} key
     * @param {?} callback
     * @return {?}
     */
    onSerialize(key, callback) {
        this.onSerializeCallbacks[key] = callback;
    }
    /**
     * Serialize the current state of the store to JSON.
     * @return {?}
     */
    toJson() {
        // Call the onSerialize callbacks and put those values into the store.
        for (const key in this.onSerializeCallbacks) {
            if (this.onSerializeCallbacks.hasOwnProperty(key)) {
                try {
                    this.store[key] = this.onSerializeCallbacks[key]();
                }
                catch (e) {
                    console.warn('Exception in onSerialize callback: ', e);
                }
            }
        }
        return JSON.stringify(this.store);
    }
}
TransferState.decorators = [
    { type: Injectable },
];
/** @nocollapse */ TransferState.ɵfac = function TransferState_Factory(t) { return new (t || TransferState)(); };
/** @nocollapse */ TransferState.ɵprov = i0.ɵɵdefineInjectable({ token: TransferState, factory: TransferState.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TransferState, [{
        type: Injectable
    }], null, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    TransferState.prototype.store;
    /**
     * @type {?}
     * @private
     */
    TransferState.prototype.onSerializeCallbacks;
}
/**
 * @param {?} doc
 * @param {?} appId
 * @return {?}
 */
export function initTransferState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    /** @type {?} */
    const script = doc.getElementById(appId + '-state');
    /** @type {?} */
    let initialState = {};
    if (script && script.textContent) {
        try {
            initialState = JSON.parse(unescapeHtml(script.textContent));
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return TransferState.init(initialState);
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * \@publicApi
 */
export class BrowserTransferStateModule {
}
BrowserTransferStateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
            },] },
];
/** @nocollapse */ BrowserTransferStateModule.ɵmod = i0.ɵɵdefineNgModule({ type: BrowserTransferStateModule });
/** @nocollapse */ BrowserTransferStateModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BrowserTransferStateModule_Factory(t) { return new (t || BrowserTransferStateModule)(); }, providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BrowserTransferStateModule, [{
        type: NgModule,
        args: [{
                providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQUUzRCxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVk7O1VBQy9CLFdBQVcsR0FBMEI7UUFDekMsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNYO0lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7Ozs7SUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0FBQ3ZELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUFZOztVQUNqQyxhQUFhLEdBQTBCO1FBQzNDLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVOzs7O0lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUN6RCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ0QsTUFBTSxVQUFVLFlBQVksQ0FBVyxHQUFXO0lBQ2hELE9BQU8sbUJBQUEsR0FBRyxFQUFlLENBQUM7QUFDNUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsTUFBTSxPQUFPLGFBQWE7SUFEMUI7UUFFVSxVQUFLLEdBQWdDLEVBQUUsQ0FBQztRQUN4Qyx5QkFBb0IsR0FBd0MsRUFBRSxDQUFDO0tBNER4RTs7Ozs7O0lBekRDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBYTs7Y0FDakIsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFO1FBQ3pDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7O0lBS0QsR0FBRyxDQUFJLEdBQWdCLEVBQUUsWUFBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM3RSxDQUFDOzs7Ozs7OztJQUtELEdBQUcsQ0FBSSxHQUFnQixFQUFFLEtBQVE7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7Ozs7OztJQUtELE1BQU0sQ0FBSSxHQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7OztJQUtELE1BQU0sQ0FBSSxHQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7Ozs7O0lBS0QsV0FBVyxDQUFJLEdBQWdCLEVBQUUsUUFBaUI7UUFDaEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUtELE1BQU07UUFDSixzRUFBc0U7UUFDdEUsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0MsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxJQUFJO29CQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQ3BEO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQXFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBOURGLFVBQVU7OzZGQUNFLGFBQWE7d0VBQWIsYUFBYSxXQUFiLGFBQWE7a0RBQWIsYUFBYTtjQUR6QixVQUFVOzs7Ozs7O0lBRVQsOEJBQWdEOzs7OztJQUNoRCw2Q0FBdUU7Ozs7Ozs7QUE4RHpFLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFhLEVBQUUsS0FBYTs7OztVQUd0RCxNQUFNLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOztRQUMvQyxZQUFZLEdBQUcsRUFBRTtJQUNyQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ2hDLElBQUk7WUFDRixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdFO0tBQ0Y7SUFDRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUMsQ0FBQzs7Ozs7OztBQVdELE1BQU0sT0FBTywwQkFBMEI7OztZQUh0QyxRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQzthQUMvRjs7aUZBQ1ksMEJBQTBCO3NKQUExQiwwQkFBMEIsbUJBRjFCLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQztrREFFbkYsMEJBQTBCO2NBSHRDLFFBQVE7ZUFBQztnQkFDUixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBQyxDQUFDO2FBQy9GIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIEluamVjdGFibGUsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJic6ICcmYTsnLFxuICAgICdcIic6ICcmcTsnLFxuICAgICdcXCcnOiAnJnM7JyxcbiAgICAnPCc6ICcmbDsnLFxuICAgICc+JzogJyZnOycsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1smXCInPD5dL2csIHMgPT4gZXNjYXBlZFRleHRbc10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVIdG1sKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHVuZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJmE7JzogJyYnLFxuICAgICcmcTsnOiAnXCInLFxuICAgICcmczsnOiAnXFwnJyxcbiAgICAnJmw7JzogJzwnLFxuICAgICcmZzsnOiAnPicsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoLyZbXjtdKzsvZywgcyA9PiB1bmVzY2FwZWRUZXh0W3NdKTtcbn1cblxuLyoqXG4gKiBBIHR5cGUtc2FmZSBrZXkgdG8gdXNlIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBTdGF0ZUtleTxUPiA9IHN0cmluZyZ7X19ub3RfYV9zdHJpbmc6IG5ldmVyfTtcblxuLyoqXG4gKiBDcmVhdGUgYSBgU3RhdGVLZXk8VD5gIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgdmFsdWUgb2YgdHlwZSBUIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YXRlS2V5PFQgPSB2b2lkPihrZXk6IHN0cmluZyk6IFN0YXRlS2V5PFQ+IHtcbiAgcmV0dXJuIGtleSBhcyBTdGF0ZUtleTxUPjtcbn1cblxuLyoqXG4gKiBBIGtleSB2YWx1ZSBzdG9yZSB0aGF0IGlzIHRyYW5zZmVycmVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBzZXJ2ZXIgc2lkZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIG9uIHRoZSBjbGllbnQgc2lkZS5cbiAqXG4gKiBgVHJhbnNmZXJTdGF0ZWAgd2lsbCBiZSBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSB0b2tlbi4gVG8gdXNlIGl0IGltcG9ydFxuICogYFNlcnZlclRyYW5zZmVyU3RhdGVNb2R1bGVgIG9uIHRoZSBzZXJ2ZXIgYW5kIGBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgb24gdGhlIGNsaWVudC5cbiAqXG4gKiBUaGUgdmFsdWVzIGluIHRoZSBzdG9yZSBhcmUgc2VyaWFsaXplZC9kZXNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnkvSlNPTi5wYXJzZS4gU28gb25seVxuICogYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmcsIG51bGwgYW5kIG5vbi1jbGFzcyBvYmplY3RzIHdpbGwgYmUgc2VyaWFsaXplZCBhbmQgZGVzZXJpYWx6aWVkIGluIGFcbiAqIG5vbi1sb3NzeSBtYW5uZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNmZXJTdGF0ZSB7XG4gIHByaXZhdGUgc3RvcmU6IHtbazogc3RyaW5nXToge318dW5kZWZpbmVkfSA9IHt9O1xuICBwcml2YXRlIG9uU2VyaWFsaXplQ2FsbGJhY2tzOiB7W2s6IHN0cmluZ106ICgpID0+IHt9IHwgdW5kZWZpbmVkfSA9IHt9O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIGluaXQoaW5pdFN0YXRlOiB7fSkge1xuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGUgPSBuZXcgVHJhbnNmZXJTdGF0ZSgpO1xuICAgIHRyYW5zZmVyU3RhdGUuc3RvcmUgPSBpbml0U3RhdGU7XG4gICAgcmV0dXJuIHRyYW5zZmVyU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LiBSZXR1cm4gYGRlZmF1bHRWYWx1ZWAgaWYga2V5IGlzIG5vdCBmb3VuZC5cbiAgICovXG4gIGdldDxUPihrZXk6IFN0YXRlS2V5PFQ+LCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldICE9PSB1bmRlZmluZWQgPyB0aGlzLnN0b3JlW2tleV0gYXMgVCA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuXG4gICAqL1xuICBzZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gICAqL1xuICByZW1vdmU8VD4oa2V5OiBTdGF0ZUtleTxUPik6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogVGVzdCB3aGV0aGVyIGEga2V5IGV4aXN0cyBpbiB0aGUgc3RvcmUuXG4gICAqL1xuICBoYXNLZXk8VD4oa2V5OiBTdGF0ZUtleTxUPikge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmhhc093blByb3BlcnR5KGtleSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBrZXkgd2hlbiBgdG9Kc29uYCBpcyBjYWxsZWQuXG4gICAqL1xuICBvblNlcmlhbGl6ZTxUPihrZXk6IFN0YXRlS2V5PFQ+LCBjYWxsYmFjazogKCkgPT4gVCk6IHZvaWQge1xuICAgIHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc3RvcmUgdG8gSlNPTi5cbiAgICovXG4gIHRvSnNvbigpOiBzdHJpbmcge1xuICAgIC8vIENhbGwgdGhlIG9uU2VyaWFsaXplIGNhbGxiYWNrcyBhbmQgcHV0IHRob3NlIHZhbHVlcyBpbnRvIHRoZSBzdG9yZS5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzKSB7XG4gICAgICBpZiAodGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrc1trZXldKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0V4Y2VwdGlvbiBpbiBvblNlcmlhbGl6ZSBjYWxsYmFjazogJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RvcmUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VHJhbnNmZXJTdGF0ZShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nKSB7XG4gIC8vIExvY2F0ZSB0aGUgc2NyaXB0IHRhZyB3aXRoIHRoZSBKU09OIGRhdGEgdHJhbnNmZXJyZWQgZnJvbSB0aGUgc2VydmVyLlxuICAvLyBUaGUgaWQgb2YgdGhlIHNjcmlwdCB0YWcgaXMgc2V0IHRvIHRoZSBBbmd1bGFyIGFwcElkICsgJ3N0YXRlJy5cbiAgY29uc3Qgc2NyaXB0ID0gZG9jLmdldEVsZW1lbnRCeUlkKGFwcElkICsgJy1zdGF0ZScpO1xuICBsZXQgaW5pdGlhbFN0YXRlID0ge307XG4gIGlmIChzY3JpcHQgJiYgc2NyaXB0LnRleHRDb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluaXRpYWxTdGF0ZSA9IEpTT04ucGFyc2UodW5lc2NhcGVIdG1sKHNjcmlwdC50ZXh0Q29udGVudCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXhjZXB0aW9uIHdoaWxlIHJlc3RvcmluZyBUcmFuc2ZlclN0YXRlIGZvciBhcHAgJyArIGFwcElkLCBlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFRyYW5zZmVyU3RhdGUuaW5pdChpbml0aWFsU3RhdGUpO1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIGNsaWVudCBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxuICogc2VydmVyIHRvIGNsaWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBUcmFuc2ZlclN0YXRlLCB1c2VGYWN0b3J5OiBpbml0VHJhbnNmZXJTdGF0ZSwgZGVwczogW0RPQ1VNRU5ULCBBUFBfSURdfV0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==