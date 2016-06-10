"use strict";
var dom_adapter = require('./src/dom/dom_adapter');
var dom_renderer = require('./src/dom/dom_renderer');
var shared_styles_host = require('./src/dom/shared_styles_host');
var __platform_browser_private__;
(function (__platform_browser_private__) {
    __platform_browser_private__.DomAdapter = dom_adapter.DomAdapter;
    function getDOM() {
        return dom_adapter.getDOM();
    }
    __platform_browser_private__.getDOM = getDOM;
    __platform_browser_private__.setRootDomAdapter = dom_adapter.setRootDomAdapter;
    __platform_browser_private__.DomRootRenderer = dom_renderer.DomRootRenderer;
    __platform_browser_private__.DomRootRenderer_ = dom_renderer.DomRootRenderer_;
    __platform_browser_private__.DomSharedStylesHost = shared_styles_host.DomSharedStylesHost;
    __platform_browser_private__.SharedStylesHost = shared_styles_host.SharedStylesHost;
})(__platform_browser_private__ = exports.__platform_browser_private__ || (exports.__platform_browser_private__ = {}));
//# sourceMappingURL=private_export.js.map