/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core/index';
import { DOCUMENT } from './dom_tokens';
export class SharedStylesHost {
    constructor() {
        /** @internal */
        this._styles = [];
        /** @internal */
        this._stylesSet = new Set();
    }
    /**
     * @param {?} styles
     * @return {?}
     */
    addStyles(styles) {
        const /** @type {?} */ additions = [];
        styles.forEach(style => {
            if (!this._stylesSet.has(style)) {
                this._stylesSet.add(style);
                this._styles.push(style);
                additions.push(style);
            }
        });
        this.onStylesAdded(additions);
    }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) { }
    /**
     * @return {?}
     */
    getAllStyles() { return this._styles; }
}
SharedStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SharedStylesHost.ctorParameters = () => [];
function SharedStylesHost_tsickle_Closure_declarations() {
    /** @type {?} */
    SharedStylesHost.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    SharedStylesHost.ctorParameters;
    /**
     * \@internal
     * @type {?}
     */
    SharedStylesHost.prototype._styles;
    /**
     * \@internal
     * @type {?}
     */
    SharedStylesHost.prototype._stylesSet;
}
export class DomSharedStylesHost extends SharedStylesHost {
    /**
     * @param {?} doc
     */
    constructor(doc) {
        super();
        this._hostNodes = new Set();
        this._hostNodes.add(doc.head);
    }
    /**
     * \@internal
     * @param {?} styles
     * @param {?} host
     * @return {?}
     */
    _addStylesToHost(styles, host) {
        for (let /** @type {?} */ i = 0; i < styles.length; i++) {
            const /** @type {?} */ styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            host.appendChild(styleEl);
        }
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    addHost(hostNode) {
        this._addStylesToHost(this._styles, hostNode);
        this._hostNodes.add(hostNode);
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */
    removeHost(hostNode) { this._hostNodes.delete(hostNode); }
    /**
     * @param {?} additions
     * @return {?}
     */
    onStylesAdded(additions) {
        this._hostNodes.forEach((hostNode) => { this._addStylesToHost(additions, hostNode); });
    }
}
DomSharedStylesHost.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomSharedStylesHost.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
function DomSharedStylesHost_tsickle_Closure_declarations() {
    /** @type {?} */
    DomSharedStylesHost.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomSharedStylesHost.ctorParameters;
    /** @type {?} */
    DomSharedStylesHost.prototype._hostNodes;
}
//# sourceMappingURL=shared_styles_host.js.map