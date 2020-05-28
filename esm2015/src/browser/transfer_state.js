/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { APP_ID, Injectable, NgModule } from '@angular/core';
export function escapeHtml(text) {
    const escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;',
    };
    return text.replace(/[&"'<>]/g, s => escapedText[s]);
}
export function unescapeHtml(text) {
    const unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>',
    };
    return text.replace(/&[^;]+;/g, s => unescapedText[s]);
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
 * @publicApi
 */
export function makeStateKey(key) {
    return key;
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
 * @publicApi
 */
let TransferState = /** @class */ (() => {
    var TransferState_1;
    let TransferState = TransferState_1 = class TransferState {
        constructor() {
            this.store = {};
            this.onSerializeCallbacks = {};
        }
        /** @internal */
        static init(initState) {
            const transferState = new TransferState_1();
            transferState.store = initState;
            return transferState;
        }
        /**
         * Get the value corresponding to a key. Return `defaultValue` if key is not found.
         */
        get(key, defaultValue) {
            return this.store[key] !== undefined ? this.store[key] : defaultValue;
        }
        /**
         * Set the value corresponding to a key.
         */
        set(key, value) {
            this.store[key] = value;
        }
        /**
         * Remove a key from the store.
         */
        remove(key) {
            delete this.store[key];
        }
        /**
         * Test whether a key exists in the store.
         */
        hasKey(key) {
            return this.store.hasOwnProperty(key);
        }
        /**
         * Register a callback to provide the value for a key when `toJson` is called.
         */
        onSerialize(key, callback) {
            this.onSerializeCallbacks[key] = callback;
        }
        /**
         * Serialize the current state of the store to JSON.
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
    };
    TransferState = TransferState_1 = __decorate([
        Injectable()
    ], TransferState);
    return TransferState;
})();
export { TransferState };
export function initTransferState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
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
 * @publicApi
 */
let BrowserTransferStateModule = /** @class */ (() => {
    let BrowserTransferStateModule = class BrowserTransferStateModule {
    };
    BrowserTransferStateModule = __decorate([
        NgModule({
            providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
        })
    ], BrowserTransferStateModule);
    return BrowserTransferStateModule;
})();
export { BrowserTransferStateModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxNQUFNLFdBQVcsR0FBMEI7UUFDekMsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNYLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBWTtJQUN2QyxNQUFNLGFBQWEsR0FBMEI7UUFDM0MsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsR0FBRztLQUNYLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQWtCRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBVyxHQUFXO0lBQ2hELE9BQU8sR0FBa0IsQ0FBQztBQUM1QixD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O0dBS0c7QUFJSDtJQUFBLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0tBQ3RDLENBQUE7SUFEWSwwQkFBMEI7UUFIdEMsUUFBUSxDQUFDO1lBQ1IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQztTQUMvRixDQUFDO09BQ1csMEJBQTBCLENBQ3RDO0lBQUQsaUNBQUM7S0FBQTtTQURZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIEluamVjdGFibGUsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJic6ICcmYTsnLFxuICAgICdcIic6ICcmcTsnLFxuICAgICdcXCcnOiAnJnM7JyxcbiAgICAnPCc6ICcmbDsnLFxuICAgICc+JzogJyZnOycsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1smXCInPD5dL2csIHMgPT4gZXNjYXBlZFRleHRbc10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVIdG1sKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHVuZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJmE7JzogJyYnLFxuICAgICcmcTsnOiAnXCInLFxuICAgICcmczsnOiAnXFwnJyxcbiAgICAnJmw7JzogJzwnLFxuICAgICcmZzsnOiAnPicsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoLyZbXjtdKzsvZywgcyA9PiB1bmVzY2FwZWRUZXh0W3NdKTtcbn1cblxuLyoqXG4gKiBBIHR5cGUtc2FmZSBrZXkgdG8gdXNlIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBTdGF0ZUtleTxUPiA9IHN0cmluZyZ7X19ub3RfYV9zdHJpbmc6IG5ldmVyfTtcblxuLyoqXG4gKiBDcmVhdGUgYSBgU3RhdGVLZXk8VD5gIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgdmFsdWUgb2YgdHlwZSBUIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YXRlS2V5PFQgPSB2b2lkPihrZXk6IHN0cmluZyk6IFN0YXRlS2V5PFQ+IHtcbiAgcmV0dXJuIGtleSBhcyBTdGF0ZUtleTxUPjtcbn1cblxuLyoqXG4gKiBBIGtleSB2YWx1ZSBzdG9yZSB0aGF0IGlzIHRyYW5zZmVycmVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBzZXJ2ZXIgc2lkZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIG9uIHRoZSBjbGllbnQgc2lkZS5cbiAqXG4gKiBgVHJhbnNmZXJTdGF0ZWAgd2lsbCBiZSBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSB0b2tlbi4gVG8gdXNlIGl0IGltcG9ydFxuICogYFNlcnZlclRyYW5zZmVyU3RhdGVNb2R1bGVgIG9uIHRoZSBzZXJ2ZXIgYW5kIGBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgb24gdGhlIGNsaWVudC5cbiAqXG4gKiBUaGUgdmFsdWVzIGluIHRoZSBzdG9yZSBhcmUgc2VyaWFsaXplZC9kZXNlcmlhbGl6ZWQgdXNpbmcgSlNPTi5zdHJpbmdpZnkvSlNPTi5wYXJzZS4gU28gb25seVxuICogYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmcsIG51bGwgYW5kIG5vbi1jbGFzcyBvYmplY3RzIHdpbGwgYmUgc2VyaWFsaXplZCBhbmQgZGVzZXJpYWx6aWVkIGluIGFcbiAqIG5vbi1sb3NzeSBtYW5uZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJhbnNmZXJTdGF0ZSB7XG4gIHByaXZhdGUgc3RvcmU6IHtbazogc3RyaW5nXToge318dW5kZWZpbmVkfSA9IHt9O1xuICBwcml2YXRlIG9uU2VyaWFsaXplQ2FsbGJhY2tzOiB7W2s6IHN0cmluZ106ICgpID0+IHt9IHwgdW5kZWZpbmVkfSA9IHt9O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIGluaXQoaW5pdFN0YXRlOiB7fSkge1xuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGUgPSBuZXcgVHJhbnNmZXJTdGF0ZSgpO1xuICAgIHRyYW5zZmVyU3RhdGUuc3RvcmUgPSBpbml0U3RhdGU7XG4gICAgcmV0dXJuIHRyYW5zZmVyU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LiBSZXR1cm4gYGRlZmF1bHRWYWx1ZWAgaWYga2V5IGlzIG5vdCBmb3VuZC5cbiAgICovXG4gIGdldDxUPihrZXk6IFN0YXRlS2V5PFQ+LCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldICE9PSB1bmRlZmluZWQgPyB0aGlzLnN0b3JlW2tleV0gYXMgVCA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuXG4gICAqL1xuICBzZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBrZXkgZnJvbSB0aGUgc3RvcmUuXG4gICAqL1xuICByZW1vdmU8VD4oa2V5OiBTdGF0ZUtleTxUPik6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogVGVzdCB3aGV0aGVyIGEga2V5IGV4aXN0cyBpbiB0aGUgc3RvcmUuXG4gICAqL1xuICBoYXNLZXk8VD4oa2V5OiBTdGF0ZUtleTxUPikge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmhhc093blByb3BlcnR5KGtleSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBrZXkgd2hlbiBgdG9Kc29uYCBpcyBjYWxsZWQuXG4gICAqL1xuICBvblNlcmlhbGl6ZTxUPihrZXk6IFN0YXRlS2V5PFQ+LCBjYWxsYmFjazogKCkgPT4gVCk6IHZvaWQge1xuICAgIHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc3RvcmUgdG8gSlNPTi5cbiAgICovXG4gIHRvSnNvbigpOiBzdHJpbmcge1xuICAgIC8vIENhbGwgdGhlIG9uU2VyaWFsaXplIGNhbGxiYWNrcyBhbmQgcHV0IHRob3NlIHZhbHVlcyBpbnRvIHRoZSBzdG9yZS5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzKSB7XG4gICAgICBpZiAodGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrc1trZXldKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0V4Y2VwdGlvbiBpbiBvblNlcmlhbGl6ZSBjYWxsYmFjazogJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RvcmUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VHJhbnNmZXJTdGF0ZShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nKSB7XG4gIC8vIExvY2F0ZSB0aGUgc2NyaXB0IHRhZyB3aXRoIHRoZSBKU09OIGRhdGEgdHJhbnNmZXJyZWQgZnJvbSB0aGUgc2VydmVyLlxuICAvLyBUaGUgaWQgb2YgdGhlIHNjcmlwdCB0YWcgaXMgc2V0IHRvIHRoZSBBbmd1bGFyIGFwcElkICsgJ3N0YXRlJy5cbiAgY29uc3Qgc2NyaXB0ID0gZG9jLmdldEVsZW1lbnRCeUlkKGFwcElkICsgJy1zdGF0ZScpO1xuICBsZXQgaW5pdGlhbFN0YXRlID0ge307XG4gIGlmIChzY3JpcHQgJiYgc2NyaXB0LnRleHRDb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluaXRpYWxTdGF0ZSA9IEpTT04ucGFyc2UodW5lc2NhcGVIdG1sKHNjcmlwdC50ZXh0Q29udGVudCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXhjZXB0aW9uIHdoaWxlIHJlc3RvcmluZyBUcmFuc2ZlclN0YXRlIGZvciBhcHAgJyArIGFwcElkLCBlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFRyYW5zZmVyU3RhdGUuaW5pdChpbml0aWFsU3RhdGUpO1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIGNsaWVudCBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxuICogc2VydmVyIHRvIGNsaWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBUcmFuc2ZlclN0YXRlLCB1c2VGYWN0b3J5OiBpbml0VHJhbnNmZXJTdGF0ZSwgZGVwczogW0RPQ1VNRU5ULCBBUFBfSURdfV0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==