/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RenderComponentType, Renderer, RendererV2, RootRenderer } from '@angular/core';
import { AnimationKeyframe, AnimationPlayer, AnimationStyles, DirectRenderer, RenderDebugInfo } from '../private_import_core';
import { AnimationDriver } from './animation_driver';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
export declare const NAMESPACE_URIS: {
    [ns: string]: string;
};
export declare abstract class DomRootRenderer implements RootRenderer {
    document: Document;
    eventManager: EventManager;
    sharedStylesHost: DomSharedStylesHost;
    animationDriver: AnimationDriver;
    appId: string;
    protected registeredComponents: Map<string, DomRenderer>;
    constructor(document: Document, eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, animationDriver: AnimationDriver, appId: string);
    renderComponent(componentProto: RenderComponentType): Renderer;
}
export declare class DomRootRenderer_ extends DomRootRenderer {
    constructor(_document: any, _eventManager: EventManager, sharedStylesHost: DomSharedStylesHost, animationDriver: AnimationDriver, appId: string);
}
export declare const DIRECT_DOM_RENDERER: DirectRenderer;
export declare class DomRenderer implements Renderer {
    private _rootRenderer;
    private componentProto;
    private _animationDriver;
    private _contentAttr;
    private _hostAttr;
    private _styles;
    directRenderer: DirectRenderer;
    constructor(_rootRenderer: DomRootRenderer, componentProto: RenderComponentType, _animationDriver: AnimationDriver, styleShimId: string);
    selectRootElement(selectorOrNode: string | Element, debugInfo: RenderDebugInfo): Element;
    createElement(parent: Element | DocumentFragment, name: string, debugInfo: RenderDebugInfo): Element;
    createViewRoot(hostElement: Element): Element | DocumentFragment;
    createTemplateAnchor(parentElement: Element | DocumentFragment, debugInfo: RenderDebugInfo): Comment;
    createText(parentElement: Element | DocumentFragment, value: string, debugInfo: RenderDebugInfo): any;
    projectNodes(parentElement: Element | DocumentFragment, nodes: Node[]): void;
    attachViewAfter(node: Node, viewRootNodes: Node[]): void;
    detachView(viewRootNodes: (Element | Text | Comment)[]): void;
    destroyView(hostElement: Element | DocumentFragment, viewAllNodes: Node[]): void;
    listen(renderElement: any, name: string, callback: Function): Function;
    listenGlobal(target: string, name: string, callback: Function): Function;
    setElementProperty(renderElement: Element | DocumentFragment, propertyName: string, propertyValue: any): void;
    setElementAttribute(renderElement: Element, attributeName: string, attributeValue: string): void;
    setBindingDebugInfo(renderElement: Element, propertyName: string, propertyValue: string): void;
    setElementClass(renderElement: Element, className: string, isAdd: boolean): void;
    setElementStyle(renderElement: HTMLElement, styleName: string, styleValue: string): void;
    invokeElementMethod(renderElement: Element, methodName: string, args: any[]): void;
    setText(renderNode: Text, text: string): void;
    animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[]): AnimationPlayer;
}
export declare const COMPONENT_VARIABLE = "%COMP%";
export declare const HOST_ATTR: string;
export declare const CONTENT_ATTR: string;
export declare function shimContentAttribute(componentShortId: string): string;
export declare function shimHostAttribute(componentShortId: string): string;
export declare function flattenStyles(compId: string, styles: Array<any | any[]>, target: string[]): string[];
export declare function isNamespaced(name: string): boolean;
export declare function splitNamespace(name: string): string[];
export declare class DomRendererV2 implements RendererV2 {
    private eventManager;
    constructor(eventManager: EventManager);
    createElement(name: string, namespace?: string, debugInfo?: any): any;
    createComment(value: string, debugInfo?: any): any;
    createText(value: string, debugInfo?: any): any;
    appendChild(parent: any, newChild: any): void;
    insertBefore(parent: any, newChild: any, refChild: any): void;
    removeChild(parent: any, oldChild: any): void;
    selectRootElement(selectorOrNode: string | any, debugInfo?: any): any;
    parentNode(node: any): any;
    nextSibling(node: any): any;
    setAttribute(el: any, name: string, value: string, namespace?: string): void;
    removeAttribute(el: any, name: string, namespace?: string): void;
    setBindingDebugInfo(el: any, propertyName: string, propertyValue: string): void;
    removeBindingDebugInfo(el: any, propertyName: string): void;
    addClass(el: any, name: string): void;
    removeClass(el: any, name: string): void;
    setStyle(el: any, style: string, value: any, hasVendorPrefix: boolean, hasImportant: boolean): void;
    removeStyle(el: any, style: string, hasVendorPrefix: boolean): void;
    setProperty(el: any, name: string, value: any): void;
    setText(node: any, value: string): void;
    listen(target: 'window' | 'document' | 'body' | any, event: string, callback: (event: any) => boolean): () => void;
}
