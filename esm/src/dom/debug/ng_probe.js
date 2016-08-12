/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, NgZone, Optional, RootRenderer, getDebugNode, isDevMode } from '@angular/core';
import { DebugDomRootRenderer } from '../../../core_private';
import { StringMapWrapper } from '../../facade/collection';
import { getDOM } from '../dom_adapter';
import { DomRootRenderer } from '../dom_renderer';
const CORE_TOKENS = {
    'ApplicationRef': ApplicationRef,
    'NgZone': NgZone
};
const INSPECT_GLOBAL_NAME = 'ng.probe';
const CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
export function inspectNativeElement(element /** TODO #9100 */) {
    return getDebugNode(element);
}
/**
 * @experimental
 */
export class NgProbeToken {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
export function _createConditionalRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    if (isDevMode()) {
        return _createRootRenderer(rootRenderer, extraTokens);
    }
    return rootRenderer;
}
function _createRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, StringMapWrapper.merge(CORE_TOKENS, _ngProbeTokensToMap(extraTokens || [])));
    return new DebugDomRootRenderer(rootRenderer);
}
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce((prev, t) => (prev[t.name] = t.token, prev), {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export const ELEMENT_PROBE_PROVIDERS = [{
        provide: RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [DomRootRenderer, [NgProbeToken, new Optional()]]
    }];
export const ELEMENT_PROBE_PROVIDERS_PROD_MODE = [{
        provide: RootRenderer,
        useFactory: _createRootRenderer,
        deps: [DomRootRenderer, [NgProbeToken, new Optional()]]
    }];
//# sourceMappingURL=ng_probe.js.map