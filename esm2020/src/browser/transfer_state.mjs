/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { APP_ID, inject, Injectable, NgModule } from '@angular/core';
import * as i0 from "@angular/core";
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
 * The `TransferState` is available as an injectable token.
 * On the client, just inject this token using DI and use it, it will be lazily initialized.
 * On the server it's already included if `renderApplication` function is used. Otherwise, import
 * the `ServerTransferStateModule` module to make the `TransferState` available.
 *
 * The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
 * boolean, number, string, null and non-class objects will be serialized and deserialized in a
 * non-lossy manner.
 *
 * @publicApi
 */
export class TransferState {
    constructor() {
        this.store = {};
        this.onSerializeCallbacks = {};
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
}
TransferState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: TransferState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TransferState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: TransferState, providedIn: 'root', useFactory: () => {
        const doc = inject(DOCUMENT);
        const appId = inject(APP_ID);
        const state = new TransferState();
        state.store = retrieveTransferredState(doc, appId);
        return state;
    } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: TransferState, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => {
                        const doc = inject(DOCUMENT);
                        const appId = inject(APP_ID);
                        const state = new TransferState();
                        state.store = retrieveTransferredState(doc, appId);
                        return state;
                    }
                }]
        }] });
export function retrieveTransferredState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    const script = doc.getElementById(appId + '-state');
    let initialState = {};
    if (script && script.textContent) {
        try {
            // Avoid using any here as it triggers lint errors in google3 (any is not allowed).
            initialState = JSON.parse(unescapeHtml(script.textContent));
        }
        catch (e) {
            console.warn('Exception while restoring TransferState for app ' + appId, e);
        }
    }
    return initialState;
}
/**
 * NgModule to install on the client side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @publicApi
 * @deprecated no longer needed, you can inject the `TransferState` in an app without providing
 *     this module.
 */
export class BrowserTransferStateModule {
}
BrowserTransferStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: BrowserTransferStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BrowserTransferStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: BrowserTransferStateModule });
BrowserTransferStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: BrowserTransferStateModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.3+sha-eaaa294", ngImport: i0, type: BrowserTransferStateModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUVuRSxNQUFNLFVBQVUsVUFBVSxDQUFDLElBQVk7SUFDckMsTUFBTSxXQUFXLEdBQTBCO1FBQ3pDLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7UUFDVixJQUFJLEVBQUUsS0FBSztRQUNYLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7S0FDWCxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQVk7SUFDdkMsTUFBTSxhQUFhLEdBQTBCO1FBQzNDLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFxQkQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQVcsR0FBVztJQUNoRCxPQUFPLEdBQWtCLENB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UUFBUSxDQUFDLENBQUM7SUFDcEQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDaEMsSUFBSTtZQUNGLG1GQUFtRjtZQUNuRixZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFPLENBQUM7U0FDbkU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdFO0tBQ0Y7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUVILE1BQU0sT0FBTywwQkFBMEI7O2tJQUExQiwwQkFBMEI7bUlBQTFCLDBCQUEwQjttSUFBMUIsMEJBQTBCO3NHQUExQiwwQkFBMEI7a0JBRHRDLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIGluamVjdCwgSW5qZWN0YWJsZSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBlc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmJzogJyZhOycsXG4gICAgJ1wiJzogJyZxOycsXG4gICAgJ1xcJyc6ICcmczsnLFxuICAgICc8JzogJyZsOycsXG4gICAgJz4nOiAnJmc7JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvWyZcIic8Pl0vZywgcyA9PiBlc2NhcGVkVGV4dFtzXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdW5lc2NhcGVkVGV4dDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAgICcmYTsnOiAnJicsXG4gICAgJyZxOyc6ICdcIicsXG4gICAgJyZzOyc6ICdcXCcnLFxuICAgICcmbDsnOiAnPCcsXG4gICAgJyZnOyc6ICc+JyxcbiAgfTtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSgvJlteO10rOy9nLCBzID0+IHVuZXNjYXBlZFRleHRbc10pO1xufVxuXG4vKipcbiAqIEEgdHlwZS1zYWZlIGtleSB0byB1c2Ugd2l0aCBgVHJhbnNmZXJTdGF0ZWAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IENPVU5URVJfS0VZID0gbWFrZVN0YXRlS2V5PG51bWJlcj4oJ2NvdW50ZXInKTtcbiAqIGxldCB2YWx1ZSA9IDEwO1xuICpcbiAqIHRyYW5zZmVyU3RhdGUuc2V0KENPVU5URVJfS0VZLCB2YWx1ZSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFN0YXRlS2V5PFQ+ID0gc3RyaW5nJntcbiAgX19ub3RfYV9zdHJpbmc6IG5ldmVyLFxuICBfX3ZhbHVlX3R5cGU/OiBULFxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBgU3RhdGVLZXk8VD5gIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgdmFsdWUgb2YgdHlwZSBUIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVN0YXRlS2V5PFQgPSB2b2lkPihrZXk6IHN0cmluZyk6IFN0YXRlS2V5PFQ+IHtcbiAgcmV0dXJuIGtleSBhcyBTdGF0ZUtleTxUPjtcbn1cblxuLyoqXG4gKiBBIGtleSB2YWx1ZSBzdG9yZSB0aGF0IGlzIHRyYW5zZmVycmVkIGZyb20gdGhlIGFwcGxpY2F0aW9uIG9uIHRoZSBzZXJ2ZXIgc2lkZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIG9uIHRoZSBjbGllbnQgc2lkZS5cbiAqXG4gKiBUaGUgYFRyYW5zZmVyU3RhdGVgIGlzIGF2YWlsYWJsZSBhcyBhbiBpbmplY3RhYmxlIHRva2VuLlxuICogT24gdGhlIGNsaWVudCwganVzdCBpbmplY3QgdGhpcyB0b2tlbiB1c2luZyBESSBhbmQgdXNlIGl0LCBpdCB3aWxsIGJlIGxhemlseSBpbml0aWFsaXplZC5cbiAqIE9uIHRoZSBzZXJ2ZXIgaXQncyBhbHJlYWR5IGluY2x1ZGVkIGlmIGByZW5kZXJBcHBsaWNhdGlvbmAgZnVuY3Rpb24gaXMgdXNlZC4gT3RoZXJ3aXNlLCBpbXBvcnRcbiAqIHRoZSBgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgbW9kdWxlIHRvIG1ha2UgdGhlIGBUcmFuc2ZlclN0YXRlYCBhdmFpbGFibGUuXG4gKlxuICogVGhlIHZhbHVlcyBpbiB0aGUgc3RvcmUgYXJlIHNlcmlhbGl6ZWQvZGVzZXJpYWxpemVkIHVzaW5nIEpTT04uc3RyaW5naWZ5L0pTT04ucGFyc2UuIFNvIG9ubHlcbiAqIGJvb2xlYW4sIG51bWJlciwgc3RyaW5nLCBudWxsIGFuZCBub24tY2xhc3Mgb2JqZWN0cyB3aWxsIGJlIHNlcmlhbGl6ZWQgYW5kIGRlc2VyaWFsaXplZCBpbiBhXG4gKiBub24tbG9zc3kgbWFubmVyLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICBjb25zdCBkb2MgPSBpbmplY3QoRE9DVU1FTlQpO1xuICAgIGNvbnN0IGFwcElkID0gaW5qZWN0KEFQUF9JRCk7XG4gICAgY29uc3Qgc3RhdGUgPSBuZXcgVHJhbnNmZXJTdGF0ZSgpO1xuICAgIHN0YXRlLnN0b3JlID0gcmV0cmlldmVUcmFuc2ZlcnJlZFN0YXRlKGRvYywgYXBwSWQpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2ZlclN0YXRlIHtcbiAgcHJpdmF0ZSBzdG9yZToge1trOiBzdHJpbmddOiB1bmtub3dufHVuZGVmaW5lZH0gPSB7fTtcbiAgcHJpdmF0ZSBvblNlcmlhbGl6ZUNhbGxiYWNrczoge1trOiBzdHJpbmddOiAoKSA9PiB1bmtub3duIHwgdW5kZWZpbmVkfSA9IHt9O1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gYSBrZXkuIFJldHVybiBgZGVmYXVsdFZhbHVlYCBpZiBrZXkgaXMgbm90IGZvdW5kLlxuICAgKi9cbiAgZ2V0PFQ+KGtleTogU3RhdGVLZXk8VD4sIGRlZmF1bHRWYWx1ZTogVCk6IFQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlW2tleV0gIT09IHVuZGVmaW5lZCA/IHRoaXMuc3RvcmVba2V5XSBhcyBUIDogZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byBhIGtleS5cbiAgICovXG4gIHNldDxUPihrZXk6IFN0YXRlS2V5PFQ+LCB2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAgICovXG4gIHJlbW92ZTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IHdoZXRoZXIgYSBrZXkgZXhpc3RzIGluIHRoZSBzdG9yZS5cbiAgICovXG4gIGhhc0tleTxUPihrZXk6IFN0YXRlS2V5PFQ+KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGNhbGxiYWNrIHRvIHByb3ZpZGUgdGhlIHZhbHVlIGZvciBhIGtleSB3aGVuIGB0b0pzb25gIGlzIGNhbGxlZC5cbiAgICovXG4gIG9uU2VyaWFsaXplPFQ+KGtleTogU3RhdGVLZXk8VD4sIGNhbGxiYWNrOiAoKSA9PiBUKTogdm9pZCB7XG4gICAgdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrc1trZXldID0gY2FsbGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzdG9yZSB0byBKU09OLlxuICAgKi9cbiAgdG9Kc29uKCk6IHN0cmluZyB7XG4gICAgLy8gQ2FsbCB0aGUgb25TZXJpYWxpemUgY2FsbGJhY2tzIGFuZCBwdXQgdGhvc2UgdmFsdWVzIGludG8gdGhlIHN0b3JlLlxuICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMub25TZXJpYWxpemVDYWxsYmFja3MpIHtcbiAgICAgIGlmICh0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLnN0b3JlW2tleV0gPSB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzW2tleV0oKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignRXhjZXB0aW9uIGluIG9uU2VyaWFsaXplIGNhbGxiYWNrOiAnLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5zdG9yZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlVHJhbnNmZXJyZWRTdGF0ZShkb2M6IERvY3VtZW50LCBhcHBJZDogc3RyaW5nKSB7XG4gIC8vIExvY2F0ZSB0aGUgc2NyaXB0IHRhZyB3aXRoIHRoZSBKU09OIGRhdGEgdHJhbnNmZXJyZWQgZnJvbSB0aGUgc2VydmVyLlxuICAvLyBUaGUgaWQgb2YgdGhlIHNjcmlwdCB0YWcgaXMgc2V0IHRvIHRoZSBBbmd1bGFyIGFwcElkICsgJ3N0YXRlJy5cbiAgY29uc3Qgc2NyaXB0ID0gZG9jLmdldEVsZW1lbnRCeUlkKGFwcElkICsgJy1zdGF0ZScpO1xuICBsZXQgaW5pdGlhbFN0YXRlID0ge307XG4gIGlmIChzY3JpcHQgJiYgc2NyaXB0LnRleHRDb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEF2b2lkIHVzaW5nIGFueSBoZXJlIGFzIGl0IHRyaWdnZXJzIGxpbnQgZXJyb3JzIGluIGdvb2dsZTMgKGFueSBpcyBub3QgYWxsb3dlZCkuXG4gICAgICBpbml0aWFsU3RhdGUgPSBKU09OLnBhcnNlKHVuZXNjYXBlSHRtbChzY3JpcHQudGV4dENvbnRlbnQpKSBhcyB7fTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0V4Y2VwdGlvbiB3aGlsZSByZXN0b3JpbmcgVHJhbnNmZXJTdGF0ZSBmb3IgYXBwICcgKyBhcHBJZCwgZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59XG5cbi8qKlxuICogTmdNb2R1bGUgdG8gaW5zdGFsbCBvbiB0aGUgY2xpZW50IHNpZGUgd2hpbGUgdXNpbmcgdGhlIGBUcmFuc2ZlclN0YXRlYCB0byB0cmFuc2ZlciBzdGF0ZSBmcm9tXG4gKiBzZXJ2ZXIgdG8gY2xpZW50LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqIEBkZXByZWNhdGVkIG5vIGxvbmdlciBuZWVkZWQsIHlvdSBjYW4gaW5qZWN0IHRoZSBgVHJhbnNmZXJTdGF0ZWAgaW4gYW4gYXBwIHdpdGhvdXQgcHJvdmlkaW5nXG4gKiAgICAgdGhpcyBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XG59XG4iXX0=