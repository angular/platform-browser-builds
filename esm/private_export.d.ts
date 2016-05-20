import * as dom_adapter from './src/dom/dom_adapter';
export declare namespace __platform_browser_private__ {
    type DomAdapter = dom_adapter.DomAdapter;
    var DomAdapter: typeof dom_adapter.DomAdapter;
    function getDOM(): DomAdapter;
    var setRootDomAdapter: typeof dom_adapter.setRootDomAdapter;
}
