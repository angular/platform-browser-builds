import { TestComponentRenderer } from '@angular/compiler/testing';
import { Inject, Injectable } from '@angular/core';
import { getDOM } from '../src/dom/dom_adapter';
import { DOCUMENT } from '../src/dom/dom_tokens';
import { el } from './browser_util';
export class DOMTestComponentRenderer extends TestComponentRenderer {
    constructor(_doc /** TODO #9100 */) {
        super();
        this._doc = _doc;
    }
    insertRootElement(rootElId) {
        let rootEl = el(`<div id="${rootElId}"></div>`);
        // TODO(juliemr): can/should this be optional?
        let oldRoots = getDOM().querySelectorAll(this._doc, '[id^=root]');
        for (let i = 0; i < oldRoots.length; i++) {
            getDOM().remove(oldRoots[i]);
        }
        getDOM().appendChild(this._doc.body, rootEl);
    }
}
/** @nocollapse */
DOMTestComponentRenderer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DOMTestComponentRenderer.ctorParameters = [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
//# sourceMappingURL=dom_test_component_renderer.js.map