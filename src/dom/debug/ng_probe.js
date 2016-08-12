/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../../../core_private');
var collection_1 = require('../../facade/collection');
var dom_adapter_1 = require('../dom_adapter');
var dom_renderer_1 = require('../dom_renderer');
var CORE_TOKENS = {
    'ApplicationRef': core_1.ApplicationRef,
    'NgZone': core_1.NgZone
};
var INSPECT_GLOBAL_NAME = 'ng.probe';
var CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element /** TODO #9100 */) {
    return core_1.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
/**
 * @experimental
 */
var NgProbeToken = (function () {
    function NgProbeToken(name, token) {
        this.name = name;
        this.token = token;
    }
    return NgProbeToken;
}());
exports.NgProbeToken = NgProbeToken;
function _createConditionalRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    if (core_1.isDevMode()) {
        return _createRootRenderer(rootRenderer, extraTokens);
    }
    return rootRenderer;
}
exports._createConditionalRootRenderer = _createConditionalRootRenderer;
function _createRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    dom_adapter_1.getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    dom_adapter_1.getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, collection_1.StringMapWrapper.merge(CORE_TOKENS, _ngProbeTokensToMap(extraTokens || [])));
    return new core_private_1.DebugDomRootRenderer(rootRenderer);
}
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce(function (prev, t) { return (prev[t.name] = t.token, prev); }, {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = [{
        provide: core_1.RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer, [NgProbeToken, new core_1.Optional()]]
    }];
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = [{
        provide: core_1.RootRenderer,
        useFactory: _createRootRenderer,
        deps: [dom_renderer_1.DomRootRenderer, [NgProbeToken, new core_1.Optional()]]
    }];
//# sourceMappingURL=ng_probe.js.map