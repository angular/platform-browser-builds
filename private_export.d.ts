/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ClassProvider, ExistingProvider, FactoryProvider, TypeProvider, ValueProvider } from '@angular/core';
import * as dom_adapter from './src/dom/dom_adapter';
import * as dom_renderer from './src/dom/dom_renderer';
import * as dom_events from './src/dom/events/dom_events';
import * as shared_styles_host from './src/dom/shared_styles_host';
export interface __platform_browser_private_types__ {
    DomAdapter: dom_adapter.DomAdapter;
    DomRootRenderer: dom_renderer.DomRootRenderer;
    DomRootRenderer_: dom_renderer.DomRootRenderer_;
    DomSharedStylesHost: shared_styles_host.DomSharedStylesHost;
    SharedStylesHost: shared_styles_host.SharedStylesHost;
    DomEventsPlugin: dom_events.DomEventsPlugin;
}
export declare var __platform_browser_private__: {
    DomAdapter: typeof dom_adapter.DomAdapter;
    getDOM: () => dom_adapter.DomAdapter;
    setRootDomAdapter: (adapter: dom_adapter.DomAdapter) => void;
    DomRootRenderer: typeof dom_renderer.DomRootRenderer;
    DomRootRenderer_: typeof dom_renderer.DomRootRenderer_;
    DomSharedStylesHost: typeof shared_styles_host.DomSharedStylesHost;
    SharedStylesHost: typeof shared_styles_host.SharedStylesHost;
    ELEMENT_PROBE_PROVIDERS: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[];
    DomEventsPlugin: typeof dom_events.DomEventsPlugin;
    initDomAdapter: () => void;
    INTERNAL_BROWSER_PLATFORM_PROVIDERS: (TypeProvider | ValueProvider | ClassProvider | ExistingProvider | FactoryProvider | any[])[];
};
