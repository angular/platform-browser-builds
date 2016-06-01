import * as dom_adapter from './src/dom/dom_adapter';
import * as dom_renderer from './src/dom/dom_renderer';
import * as shared_styles_host from './src/dom/shared_styles_host';
export declare namespace __platform_browser_private__ {
    type DomAdapter = dom_adapter.DomAdapter;
    var DomAdapter: typeof dom_adapter.DomAdapter;
    function getDOM(): DomAdapter;
    var setRootDomAdapter: typeof dom_adapter.setRootDomAdapter;
    type DomRootRenderer = dom_renderer.DomRootRenderer;
    var DomRootRenderer: typeof dom_renderer.DomRootRenderer;
    type DomRootRenderer_ = dom_renderer.DomRootRenderer_;
    var DomRootRenderer_: typeof dom_renderer.DomRootRenderer_;
    type DomSharedStylesHost = shared_styles_host.DomSharedStylesHost;
    var DomSharedStylesHost: typeof shared_styles_host.DomSharedStylesHost;
    type SharedStylesHost = shared_styles_host.SharedStylesHost;
    var SharedStylesHost: typeof shared_styles_host.SharedStylesHost;
}
