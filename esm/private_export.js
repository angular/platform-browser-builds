import * as dom_adapter from './src/dom/dom_adapter';
export var __platform_browser_private__;
(function (__platform_browser_private__) {
    __platform_browser_private__.DomAdapter = dom_adapter.DomAdapter;
    function getDOM() { return dom_adapter.getDOM(); }
    __platform_browser_private__.getDOM = getDOM;
    __platform_browser_private__.setRootDomAdapter = dom_adapter.setRootDomAdapter;
})(__platform_browser_private__ || (__platform_browser_private__ = {}));
//# sourceMappingURL=private_export.js.map