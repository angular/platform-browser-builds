/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Injectable, NgModule } from '@angular/core';
import { DOCUMENT } from '../dom/dom_tokens';
import * as i0 from "@angular/core";
export function escapeHtml(text) {
    var escapedText = {
        '&': '&a;',
        '"': '&q;',
        '\'': '&s;',
        '<': '&l;',
        '>': '&g;',
    };
    return text.replace(/[&"'<>]/g, function (s) { return escapedText[s]; });
}
export function unescapeHtml(text) {
    var unescapedText = {
        '&a;': '&',
        '&q;': '"',
        '&s;': '\'',
        '&l;': '<',
        '&g;': '>',
    };
    return text.replace(/&[^;]+;/g, function (s) { return unescapedText[s]; });
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
var TransferState = /** @class */ (function () {
    function TransferState() {
        this.store = {};
        this.onSerializeCallbacks = {};
    }
    /** @internal */
    TransferState.init = function (initState) {
        var transferState = new TransferState();
        transferState.store = initState;
        return transferState;
    };
    /**
     * Get the value corresponding to a key. Return `defaultValue` if key is not found.
     */
    TransferState.prototype.get = function (key, defaultValue) {
        return this.store[key] !== undefined ? this.store[key] : defaultValue;
    };
    /**
     * Set the value corresponding to a key.
     */
    TransferState.prototype.set = function (key, value) { this.store[key] = value; };
    /**
     * Remove a key from the store.
     */
    TransferState.prototype.remove = function (key) { delete this.store[key]; };
    /**
     * Test whether a key exists in the store.
     */
    TransferState.prototype.hasKey = function (key) { return this.store.hasOwnProperty(key); };
    /**
     * Register a callback to provide the value for a key when `toJson` is called.
     */
    TransferState.prototype.onSerialize = function (key, callback) {
        this.onSerializeCallbacks[key] = callback;
    };
    /**
     * Serialize the current state of the store to JSON.
     */
    TransferState.prototype.toJson = function () {
        // Call the onSerialize callbacks and put those values into the store.
        for (var key in this.onSerializeCallbacks) {
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
    };
    TransferState.ngInjectableDef = i0.defineInjectable({ token: TransferState, factory: function TransferState_Factory(t) { return new (t || TransferState)(); }, providedIn: null });
    return TransferState;
}());
export { TransferState };
/*@__PURE__*/ i0.ɵsetClassMetadata(TransferState, [{
        type: Injectable
    }], null, null);
export function initTransferState(doc, appId) {
    // Locate the script tag with the JSON data transferred from the server.
    // The id of the script tag is set to the Angular appId + 'state'.
    var script = doc.getElementById(appId + '-state');
    var initialState = {};
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
var BrowserTransferStateModule = /** @class */ (function () {
    function BrowserTransferStateModule() {
    }
    BrowserTransferStateModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserTransferStateModule, bootstrap: [], declarations: [], imports: [], exports: [] });
    BrowserTransferStateModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserTransferStateModule_Factory(t) { return new (t || BrowserTransferStateModule)(); }, providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }], imports: [] });
    return BrowserTransferStateModule;
}());
export { BrowserTransferStateModule };
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserTransferStateModule, [{
        type: NgModule,
        args: [{
                providers: [{ provide: TransferState, useFactory: initTransferState, deps: [DOCUMENT, APP_ID] }],
            }]
    }], null, null);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3RyYW5zZmVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7O0FBRTNDLE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxJQUFNLFdBQVcsR0FBMEI7UUFDekMsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNYLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQVk7SUFDdkMsSUFBTSxhQUFhLEdBQTBCO1FBQzNDLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsS0FBSyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFrQkQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQVcsR0FB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QUFDMUMsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0g7SUFBQTtLQUlDO3dFQURZLDBCQUEwQjs4SUFBMUIsMEJBQTBCLG1CQUYxQixDQUFDLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFDLENBQUM7cUNBaktoRztDQW9LQyxBQUpELElBSUM7U0FEWSwwQkFBMEI7bUNBQTFCLDBCQUEwQjtjQUh0QyxRQUFRO2VBQUM7Z0JBQ1IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUMsQ0FBQzthQUMvRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSUQsIEluamVjdGFibGUsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbS9kb21fdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUh0bWwodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJic6ICcmYTsnLFxuICAgICdcIic6ICcmcTsnLFxuICAgICdcXCcnOiAnJnM7JyxcbiAgICAnPCc6ICcmbDsnLFxuICAgICc+JzogJyZnOycsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoL1smXCInPD5dL2csIHMgPT4gZXNjYXBlZFRleHRbc10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5lc2NhcGVIdG1sKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHVuZXNjYXBlZFRleHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAnJmE7JzogJyYnLFxuICAgICcmcTsnOiAnXCInLFxuICAgICcmczsnOiAnXFwnJyxcbiAgICAnJmw7JzogJzwnLFxuICAgICcmZzsnOiAnPicsXG4gIH07XG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoLyZbXjtdKzsvZywgcyA9PiB1bmVzY2FwZWRUZXh0W3NdKTtcbn1cblxuLyoqXG4gKiBBIHR5cGUtc2FmZSBrZXkgdG8gdXNlIHdpdGggYFRyYW5zZmVyU3RhdGVgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBDT1VOVEVSX0tFWSA9IG1ha2VTdGF0ZUtleTxudW1iZXI+KCdjb3VudGVyJyk7XG4gKiBsZXQgdmFsdWUgPSAxMDtcbiAqXG4gKiB0cmFuc2ZlclN0YXRlLnNldChDT1VOVEVSX0tFWSwgdmFsdWUpO1xuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgdHlwZSBTdGF0ZUtleTxUPiA9IHN0cmluZyAmIHtfX25vdF9hX3N0cmluZzogbmV2ZXJ9O1xuXG4vKipcbiAqIENyZWF0ZSBhIGBTdGF0ZUtleTxUPmAgdGhhdCBjYW4gYmUgdXNlZCB0byBzdG9yZSB2YWx1ZSBvZiB0eXBlIFQgd2l0aCBgVHJhbnNmZXJTdGF0ZWAuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IENPVU5URVJfS0VZID0gbWFrZVN0YXRlS2V5PG51bWJlcj4oJ2NvdW50ZXInKTtcbiAqIGxldCB2YWx1ZSA9IDEwO1xuICpcbiAqIHRyYW5zZmVyU3RhdGUuc2V0KENPVU5URVJfS0VZLCB2YWx1ZSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlU3RhdGVLZXk8VCA9IHZvaWQ+KGtleTogc3RyaW5nKTogU3RhdGVLZXk8VD4ge1xuICByZXR1cm4ga2V5IGFzIFN0YXRlS2V5PFQ+O1xufVxuXG4vKipcbiAqIEEga2V5IHZhbHVlIHN0b3JlIHRoYXQgaXMgdHJhbnNmZXJyZWQgZnJvbSB0aGUgYXBwbGljYXRpb24gb24gdGhlIHNlcnZlciBzaWRlIHRvIHRoZSBhcHBsaWNhdGlvblxuICogb24gdGhlIGNsaWVudCBzaWRlLlxuICpcbiAqIGBUcmFuc2ZlclN0YXRlYCB3aWxsIGJlIGF2YWlsYWJsZSBhcyBhbiBpbmplY3RhYmxlIHRva2VuLiBUbyB1c2UgaXQgaW1wb3J0XG4gKiBgU2VydmVyVHJhbnNmZXJTdGF0ZU1vZHVsZWAgb24gdGhlIHNlcnZlciBhbmQgYEJyb3dzZXJUcmFuc2ZlclN0YXRlTW9kdWxlYCBvbiB0aGUgY2xpZW50LlxuICpcbiAqIFRoZSB2YWx1ZXMgaW4gdGhlIHN0b3JlIGFyZSBzZXJpYWxpemVkL2Rlc2VyaWFsaXplZCB1c2luZyBKU09OLnN0cmluZ2lmeS9KU09OLnBhcnNlLiBTbyBvbmx5XG4gKiBib29sZWFuLCBudW1iZXIsIHN0cmluZywgbnVsbCBhbmQgbm9uLWNsYXNzIG9iamVjdHMgd2lsbCBiZSBzZXJpYWxpemVkIGFuZCBkZXNlcmlhbHppZWQgaW4gYVxuICogbm9uLWxvc3N5IG1hbm5lci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmFuc2ZlclN0YXRlIHtcbiAgcHJpdmF0ZSBzdG9yZToge1trOiBzdHJpbmddOiB7fSB8IHVuZGVmaW5lZH0gPSB7fTtcbiAgcHJpdmF0ZSBvblNlcmlhbGl6ZUNhbGxiYWNrczoge1trOiBzdHJpbmddOiAoKSA9PiB7fSB8IHVuZGVmaW5lZH0gPSB7fTtcblxuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBpbml0KGluaXRTdGF0ZToge30pIHtcbiAgICBjb25zdCB0cmFuc2ZlclN0YXRlID0gbmV3IFRyYW5zZmVyU3RhdGUoKTtcbiAgICB0cmFuc2ZlclN0YXRlLnN0b3JlID0gaW5pdFN0YXRlO1xuICAgIHJldHVybiB0cmFuc2ZlclN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgY29ycmVzcG9uZGluZyB0byBhIGtleS4gUmV0dXJuIGBkZWZhdWx0VmFsdWVgIGlmIGtleSBpcyBub3QgZm91bmQuXG4gICAqL1xuICBnZXQ8VD4oa2V5OiBTdGF0ZUtleTxUPiwgZGVmYXVsdFZhbHVlOiBUKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmVba2V5XSAhPT0gdW5kZWZpbmVkID8gdGhpcy5zdG9yZVtrZXldIGFzIFQgOiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB2YWx1ZSBjb3JyZXNwb25kaW5nIHRvIGEga2V5LlxuICAgKi9cbiAgc2V0PFQ+KGtleTogU3RhdGVLZXk8VD4sIHZhbHVlOiBUKTogdm9pZCB7IHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGtleSBmcm9tIHRoZSBzdG9yZS5cbiAgICovXG4gIHJlbW92ZTxUPihrZXk6IFN0YXRlS2V5PFQ+KTogdm9pZCB7IGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07IH1cblxuICAvKipcbiAgICogVGVzdCB3aGV0aGVyIGEga2V5IGV4aXN0cyBpbiB0aGUgc3RvcmUuXG4gICAqL1xuICBoYXNLZXk8VD4oa2V5OiBTdGF0ZUtleTxUPikgeyByZXR1cm4gdGhpcy5zdG9yZS5oYXNPd25Qcm9wZXJ0eShrZXkpOyB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgdG8gcHJvdmlkZSB0aGUgdmFsdWUgZm9yIGEga2V5IHdoZW4gYHRvSnNvbmAgaXMgY2FsbGVkLlxuICAgKi9cbiAgb25TZXJpYWxpemU8VD4oa2V5OiBTdGF0ZUtleTxUPiwgY2FsbGJhY2s6ICgpID0+IFQpOiB2b2lkIHtcbiAgICB0aGlzLm9uU2VyaWFsaXplQ2FsbGJhY2tzW2tleV0gPSBjYWxsYmFjaztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemUgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHN0b3JlIHRvIEpTT04uXG4gICAqL1xuICB0b0pzb24oKTogc3RyaW5nIHtcbiAgICAvLyBDYWxsIHRoZSBvblNlcmlhbGl6ZSBjYWxsYmFja3MgYW5kIHB1dCB0aG9zZSB2YWx1ZXMgaW50byB0aGUgc3RvcmUuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5vblNlcmlhbGl6ZUNhbGxiYWNrcykge1xuICAgICAgaWYgKHRoaXMub25TZXJpYWxpemVDYWxsYmFja3MuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHRoaXMub25TZXJpYWxpemVDYWxsYmFja3Nba2V5XSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdFeGNlcHRpb24gaW4gb25TZXJpYWxpemUgY2FsbGJhY2s6ICcsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0b3JlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRyYW5zZmVyU3RhdGUoZG9jOiBEb2N1bWVudCwgYXBwSWQ6IHN0cmluZykge1xuICAvLyBMb2NhdGUgdGhlIHNjcmlwdCB0YWcgd2l0aCB0aGUgSlNPTiBkYXRhIHRyYW5zZmVycmVkIGZyb20gdGhlIHNlcnZlci5cbiAgLy8gVGhlIGlkIG9mIHRoZSBzY3JpcHQgdGFnIGlzIHNldCB0byB0aGUgQW5ndWxhciBhcHBJZCArICdzdGF0ZScuXG4gIGNvbnN0IHNjcmlwdCA9IGRvYy5nZXRFbGVtZW50QnlJZChhcHBJZCArICctc3RhdGUnKTtcbiAgbGV0IGluaXRpYWxTdGF0ZSA9IHt9O1xuICBpZiAoc2NyaXB0ICYmIHNjcmlwdC50ZXh0Q29udGVudCkge1xuICAgIHRyeSB7XG4gICAgICBpbml0aWFsU3RhdGUgPSBKU09OLnBhcnNlKHVuZXNjYXBlSHRtbChzY3JpcHQudGV4dENvbnRlbnQpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0V4Y2VwdGlvbiB3aGlsZSByZXN0b3JpbmcgVHJhbnNmZXJTdGF0ZSBmb3IgYXBwICcgKyBhcHBJZCwgZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBUcmFuc2ZlclN0YXRlLmluaXQoaW5pdGlhbFN0YXRlKTtcbn1cblxuLyoqXG4gKiBOZ01vZHVsZSB0byBpbnN0YWxsIG9uIHRoZSBjbGllbnQgc2lkZSB3aGlsZSB1c2luZyB0aGUgYFRyYW5zZmVyU3RhdGVgIHRvIHRyYW5zZmVyIHN0YXRlIGZyb21cbiAqIHNlcnZlciB0byBjbGllbnQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogVHJhbnNmZXJTdGF0ZSwgdXNlRmFjdG9yeTogaW5pdFRyYW5zZmVyU3RhdGUsIGRlcHM6IFtET0NVTUVOVCwgQVBQX0lEXX1dLFxufSlcbmV4cG9ydCBjbGFzcyBCcm93c2VyVHJhbnNmZXJTdGF0ZU1vZHVsZSB7XG59XG4iXX0=