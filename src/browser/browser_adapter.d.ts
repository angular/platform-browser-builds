/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export declare class BrowserDomAdapter extends GenericBrowserDomAdapter {
    static makeCurrent(): void;
    setProperty(el: Node, name: string, value: any): void;
    getProperty(el: Node, name: string): any;
    log(error: string): void;
    logGroup(error: string): void;
    logGroupEnd(): void;
    querySelector(el: HTMLElement, selector: string): any;
    querySelectorAll(el: any, selector: string): any[];
    onAndCancel(el: Node, evt: any, listener: any): Function;
    dispatchEvent(el: Node, evt: any): void;
    nextSibling(el: Node): Node | null;
    parentElement(el: Node): Node | null;
    clearNodes(el: Node): void;
    appendChild(el: Node, node: Node): void;
    removeChild(el: Node, node: Node): void;
    remove(node: Node): Node;
    insertBefore(parent: Node, ref: Node, node: Node): void;
    setText(el: Node, value: string): void;
    getValue(el: any): string;
    createComment(text: string): Comment;
    createElement(tagName: string, doc?: Document): HTMLElement;
    createElementNS(ns: string, tagName: string, doc?: Document): Element;
    createTextNode(text: string, doc?: Document): Text;
    getHost(el: HTMLElement): HTMLElement;
    getElementsByTagName(element: any, name: string): HTMLElement[];
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    setStyle(element: any, styleName: string, styleValue: string): void;
    removeStyle(element: any, stylename: string): void;
    getStyle(element: any, stylename: string): string;
    getAttribute(element: Element, attribute: string): string | null;
    setAttribute(element: Element, name: string, value: string): void;
    setAttributeNS(element: Element, ns: string, name: string, value: string): void;
    removeAttribute(element: Element, attribute: string): void;
    removeAttributeNS(element: Element, ns: string, name: string): void;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    getTitle(doc: Document): string;
    setTitle(doc: Document, newTitle: string): void;
    elementMatches(n: any, selector: string): boolean;
    isElementNode(node: Node): boolean;
    isShadowRoot(node: any): boolean;
    getEventKey(event: any): string;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getHistory(): History;
    getLocation(): Location;
    getBaseHref(doc: Document): string | null;
    resetBaseElement(): void;
    getUserAgent(): string;
    performanceNow(): number;
    supportsCookies(): boolean;
    getCookie(name: string): string | null;
}
