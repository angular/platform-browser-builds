/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as core from '@angular/core/index';
import { StringMapWrapper } from '../../facade/collection';
import { DebugDomRendererV2, DebugDomRootRenderer } from '../../private_import_core';
import { getDOM } from '../dom_adapter';
import { DomRootRenderer } from '../dom_renderer';
const /** @type {?} */ CORE_TOKENS = {
    'ApplicationRef': core.ApplicationRef,
    'NgZone': core.NgZone,
};
const /** @type {?} */ INSPECT_GLOBAL_NAME = 'ng.probe';
const /** @type {?} */ CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {\@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 * @param {?} element
 * @return {?}
 */
export function inspectNativeElement(element) {
    return core.getDebugNode(element);
}
/**
 * Deprecated. Use the one from '\@angular/core'.
 * @deprecated
 */
export class NgProbeToken {
    /**
     * @param {?} name
     * @param {?} token
     */
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
function NgProbeToken_tsickle_Closure_declarations() {
    /** @type {?} */
    NgProbeToken.prototype.name;
    /** @type {?} */
    NgProbeToken.prototype.token;
}
/**
 * @param {?} rootRenderer
 * @param {?} extraTokens
 * @param {?} coreTokens
 * @return {?}
 */
export function _createConditionalRootRenderer(rootRenderer, extraTokens, coreTokens) {
    return core.isDevMode() ?
        _createRootRenderer(rootRenderer, (extraTokens || []).concat(coreTokens || [])) :
        rootRenderer;
}
/**
 * @param {?} rootRenderer
 * @param {?} extraTokens
 * @return {?}
 */
function _createRootRenderer(rootRenderer, extraTokens) {
    getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, StringMapWrapper.merge(CORE_TOKENS, _ngProbeTokensToMap(extraTokens || [])));
    return new DebugDomRootRenderer(rootRenderer);
}
/**
 * @param {?} tokens
 * @return {?}
 */
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * @param {?} renderer
 * @return {?}
 */
export function _createDebugRendererV2(renderer) {
    return core.isDevMode() ? new DebugDomRendererV2(renderer) : renderer;
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export const /** @type {?} */ ELEMENT_PROBE_PROVIDERS = [
    {
        provide: core.RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [
            DomRootRenderer,
            [NgProbeToken, new core.Optional()],
            [core.NgProbeToken, new core.Optional()],
        ],
    },
    {
        provide: core.RendererV2,
        useFactory: _createDebugRendererV2,
        deps: [core.RENDERER_V2_DIRECT],
    }
];
//# sourceMappingURL=ng_probe.js.map