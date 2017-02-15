/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable } from '@angular/core/index';
import { getDOM } from '../dom/dom_adapter';
import { DOCUMENT } from '../dom/dom_tokens';
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * \@experimental
 */
export class Title {
    /**
     * @param {?} _doc
     */
    constructor(_doc) {
        this._doc = _doc;
    }
    /**
     * Get the title of the current HTML document.
     * @return {?}
     */
    getTitle() { return getDOM().getTitle(this._doc); }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(newTitle) { getDOM().setTitle(this._doc, newTitle); }
}
Title.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Title.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
function Title_tsickle_Closure_declarations() {
    /** @type {?} */
    Title.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    Title.ctorParameters;
    /** @type {?} */
    Title.prototype._doc;
}
//# sourceMappingURL=title.js.map