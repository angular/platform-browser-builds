/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Renderer2, RendererFactory2, RendererType2 } from '@angular/core';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
import * as i0 from "@angular/core";
export declare const NAMESPACE_URIS: {
    [ns: string]: string;
};
export declare const COMPONENT_VARIABLE = "%COMP%";
export declare const HOST_ATTR: string;
export declare const CONTENT_ATTR: string;
export declare function shimContentAttribute(componentShortId: string): string;
export declare function shimHostAttribute(componentShortId: string): string;
export declare function flattenStyles(compId: string, styles: Array<any | any[]>, target: string[]): string[];
export declare class DomRendererFactory2 implements RendererFactory2 {
    private eventManager;
    private sharedStylesHost;
    private appId;
    private rendererByCompId;
    private defaultRenderer;
    constructor(eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, appId: string);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    begin(): void;
    end(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomRendererFactory2, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomRendererFactory2>;
}
