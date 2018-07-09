/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { APP_ID, Injectable, NgModule } from '@angular/core';
import { DOCUMENT } from '../dom/dom_tokens';
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
 * @experimental
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
 * @experimental
 */
let TransferState = TransferState_1 = class TransferState {
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
     * @experimental
     */
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
    set(key, value) { this.store[key] = value; }
    /**
     * Remove a key from the store.
     */
    remove(key) { delete this.store[key]; }
    /**
     * Test whether a key exists in the store.
     */
    hasKey(key) { return this.store.hasOwnProperty(key); }
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
TransferState = TransferState_1 = tslib_1.__decorate([
    Injectable()
], TransferState);
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
 * @experimental
 */
let BrowserTransferStateModule = class BrowserTransferStateModule {
};
BrowserTransferStateModule = tslib_1.__decorate([
    NgModule({
        providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
    })
], BrowserTransferStateModule);
export { BrowserTransferStateModule };
var TransferState_1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTNDLE1BQU0scUJBQXFCLElBQVk7SUFDckMsTUFBTSxXQUFXLEdBQTBCO1FBQ3pDLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7UUFDVixJQUFJLEVBQUUsS0FBSztRQUNYLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7S0FDWCxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLHVCQUF1QixJQUFZO0lBQ3ZDLE1BQU0sYUFBYSxHQUEwQjtRQUMzQyxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsR0FBRztRQUNWLEtBQUssRUFBRSxHQUFHO0tBQ1gsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBa0JEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLHVCQUFpQyxHQUFXO0lBQ2hELE9BQU8sR0FBa0IsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlH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SUFIdEMsUUFBUSxDQUFDO1FBQ1IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQztLQUMvRixDQUFDO0dBQ1csMEJBQTBCLENBQ3RDO1NBRFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0YWJsZSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnLi4vZG9tL2RvbV90b2tlbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBlc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmJzogJyZhOycsXG4gICAgJ1wiJzogJyZxOycsXG4gICAgJ1xcJyc6ICcmczsnLFxuICAgICc8JzogJyZsOycsXG4gICAgJz4nOiAnJmc7JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyZcIic8Pl0vZywgcyA9PiBlc2NhcGVkVGV4dFtzXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdW5lc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmYTsnOiAnJicsXG4gICAgJyZxOyc6ICdcIicsXG4gICAgJyZzOyc6ICdcXCcnLFxuICAgICcmbDsnOiAnPCcsXG4gICAgJyZnOyc6ICc+JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJlteO10rOy9nLCBzID0+IHVuZXNjYXBlZFRleHRbc10pO1xufVxuXG4vKipcbiAqIEEgdHlwZS1zYWZlIGtleSB0byB1c2Ugd2l0aCBgVHJhbnNmZXJTdGF0ZWAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IENPVU5URVJfS0VZID0gbWFrZVN0YXRlS2V5PG51bWJlcj4oJ2NvdW50ZXInKTtcbiAqIGxldCB2YWx1ZSA9IDEwO1xuICpcbiAqIHRyYW5zZmVyU3RhdGUuc2V0KENPVU5URVJfS0VZLCB2YWx1ZSk7XG4gKiBgYGBcbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCB0eXBlIFN0YXRlS2V5PFQ+ID0gc3RyaW5nICYge19fbm90X2Ffc3RyaW5nOiBuZXZlcn07XG5cbi8qKlxuICogQ3JlYXRlIGEgYFN0YXRlS2V5PFQ+YCB0aGF0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIHZhbHVlIG9mIHR5cGUgVCB3aXRoIGBUcmFuc2ZlclN0YXRlYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogY29uc3QgQ09VTlRFUl9LRVkgPSBtYWtlU3RhdGVLZXk8bnVtYmVyPignY291bnRlcicpO1xuICogbGV0IHZhbHVlID0gMTA7XG4gKlxuICogdHJhbnNmZXJTdGF0ZS5zZXQoQ09VTlRFUl9LRVksIHZhbHVlKTtcbiAqIGBgYFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VTdGF0ZUtleTxUID0gdm9pZD4oa2V5OiBzdHJpbmcpOiBTdGF0ZUtleTxUPiB7XG4gIHJldHVybiBrZXkgYXMgU3RhdGVLZXk8VD47XG59XG5cbi8qKlxuICogQSBrZXkgdmFsdWUgc3RvcmUgdGhhdCBpcyB0cmFuc2ZlcnJlZCBmcm9tIHRoZSBhcHBsaWNhdGlvbiBvbiB0aGUgc2VydmVyIHNpZGUgdG8gdGhlIGFwcGxpY2F0aW9uXG4gKiBvbiB0aGUgY2xpZW50IHNpZGUuXG4gKlxuICogYFRyYW5zZmVyU3RhdGVgIHdpbGwgYmUgYXZhaWxhYmxlIGFzIGFuIGluamVjdGFibGUgdG9rZW4uIFRvIHVzZSBpdCBpbXBvcnRcbiAqIGBTZXJ2ZXJUcmFuc2ZlclN0YXRlTW9kdWxlYCBvbiB0aGUgc2VydmVyIGFuZCBgQnJvd3NlclRyYW5zZmVyU3RhdGVNb2R1bGVgIG9uIHRoZSBjbGllbnQuXG4gKlxuICogVGhlIHZhbHVlcyBpbiB0aGUgc3RvcmUgYXJlIHNlcmlhbGl6ZWQvZGVzZXJpYWxpemVkIHVzaW5nIEpTT04uc3RyaW5naWZ5L0pTT04ucGFyc2UuIFNvIG9ubHlcbiAqIGJvb2xlYW4sIG51bWJlciwgc3RyaW5nLCBudWxsIGFuZCBub24tY2xhc3Mgb2JqZWN0cyB3aWxsIGJlIHNlcmlhbGl6ZWQgYW5kIGRlc2VyaWFsemllZCBpbiBhXG4gKiBub24tbG9zc3kgbWFubmVyLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyYW5zZmVyU3RhdGUge1xuICBwcml2YXRlIHN0b3JlOiB7W2s6IHN0cmluZ106IHt9IHwgdW5kZWZpbmVkfSA9IHt9O1xuICBwcml2YXRlIG9uU2VyaWFsaXplQ2FsbGJhY2tzOiB7W2s6IHN0cmluZ106ICgpID0+IHt9IHwgdW5kZWZpbmVkfSA9IHt9O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIGluaXQoaW5pdFN0YXRlOiB7fSkge1xuICAgIGNvbnN0IHRyYW5zZmVyU3RhdGUgPSBuZXcgVHJhbnNmZXJTdGF0ZSgpO1xuICAgIHRyYW5zZmVyU3RhdGUuc3RvcmUgPSBpbml0U3RhdGU7XG4gICAgcmV0dXJuIHRyYW5zZmVyU3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LiBSZXR1cm4gYGRlZmF1bHRWYWx1ZWAgaWYga2V5IGlzIG5vdCBmb3VuZC5cbiAgICovXG4gIGdldDxUPihrZXk6IFN0YXRlS2V5PFQ+LCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldICE9PSB1bmRlZmluZWQgPyB0aGlzLnN0b3JlW2tleV0gYXMgVCA6IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuXG4gICAqL1xuICBzZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgdmFsdWU6IFQpOiB2b2lkIHsgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7IH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEga2V5IGZyb20gdGhlIHN0b3JlLlxuICAgKi9cbiAgcmVtb3ZlPFQ+KGtleTogU3RhdGVLZXk8VD4pOiB2b2lkIHsgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTsgfVxuXG4gIC8qKlxuICAgKiBUZXN0IHdoZXRoZXIgYSBrZXkgZXhpc3RzIGluIHRoZSBzdG9yZS5cbiAgICovXG4gIGhhc0tleTxUPihrZXk6IFN0YXRlS2V5PFQ+KSB7IHJldHVybiB0aGlzLnN0b3JlLmhhc093blByb3BlcnR5KGtleSk7IH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayB0byBwcm92aWRlIHRoZSB2YWx1ZSBmb3IgYSBrZXkgd2hlbiBgdG9Kc29uYCBpcyBjYWxsZWQuXG4gICAqL1xuICBvblNlcmlhbGl6ZTxUPihrZXk6IFN0YXRlS2V5PFQ+LCBjYWxsYmFjazogKCkgPT4gVCk6IHZvaWQge1xuICAgIHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZSB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc3RvcmUgdG8gSlNPTi5cbiAgICovXG4gIHRvSnNvbigpOiBzdHJpbmcge1xuICAgIC8vIENhbGwgdGhlIG9uU2VyaWFsaXplIGNhbGxiYWNrcyBhbmQgcHV0IHRob3NlIHZhbHVlcyBpbnRvIHRoZSBzdG9yZS5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzKSB7XG4gICAgICBpZiAodGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrc1trZXldKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0V4Y2VwdGlvbiBpbiBvblNlcmlhbGl6ZSBjYWxsYmFjazogJywgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RvcmUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0VHJhbnNmZXJTdGF0ZShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nKSB7XG4gIC8vIExvY2F0ZSB0aGUgc2NyaXB0IHRhZyB3aXRoIHRoZSBKU09OIGRhdGEgdHJhbnNmZXJyZWQgZnJvbSB0aGUgc2VydmVyLlxuICAvLyBUaGUgaWQgb2YgdGhlIHNjcmlwdCB0YWcgaXMgc2V0IHRvIHRoZSBBbmd1bGFyIGFwcElkICsgJ3N0YXRlJy5cbiAgY29uc3Qgc2NyaXB0ID0gZG9jLmdldEVsZW1lbnRCeUlkKGFwcElkICsgJy1zdGF0ZScpO1xuICBsZXQgaW5pdGlhbFN0YXRlID0ge307XG4gIGlmIChzY3JpcHQgJiYgc2NyaXB0LnRleHRDb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluaXRpYWxTdGF0ZSA9IEpTT04ucGFyc2UodW5lc2NhcGVIdG1sKHNjcmlwdC50ZXh0Q29udGVudCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXhjZXB0aW9uIHdoaWxlIHJlc3RvcmluZyBUcmFuc2ZlclN0YXRlIGZvciBhcHAgJyArIGFwcElkLCBlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFRyYW5zZmVyU3RhdGUuaW5pdChpbml0aWFsU3RhdGUpO1xufVxuXG4vKipcbiAqIE5nTW9kdWxlIHRvIGluc3RhbGwgb24gdGhlIGNsaWVudCBzaWRlIHdoaWxlIHVzaW5nIHRoZSBgVHJhbnNmZXJTdGF0ZWAgdG8gdHJhbnNmZXIgc3RhdGUgZnJvbVxuICogc2VydmVyIHRvIGNsaWVudC5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBUcmFuc2ZlclN0YXRlLCB1c2VGYWN0b3J5OiBpbml0VHJhbnNmZXJTdGF0ZSwgZGVwczogW0RPQ1VNRU5ULCBBUFBfSURdfV0sXG59KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlIHtcbn1cbiJdfQ==