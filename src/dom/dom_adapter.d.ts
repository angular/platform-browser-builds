/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare function getDOM(): DomAdapter;
export declare function setDOM(adapter: DomAdapter): void;
export declare function setRootDomAdapter(adapter: DomAdapter): void;
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export declare abstract class DomAdapter {
    abstract hasProperty(element: any, name: string): boolean;
    abstract setProperty(el: Element, name: string, value: any): any;
    abstract getProperty(el: Element, name: string): any;
    abstract invoke(el: Element, methodName: string, args: any[]): any;
    abstract logError(error: any): any;
    abstract log(error: any): any;
    abstract logGroup(error: any): any;
    abstract logGroupEnd(): any;
    abstract contains(nodeA: any, nodeB: any): boolean;
    abstract parse(templateHtml: string): any;
    abstract querySelector(el: any, selector: string): any;
    abstract querySelectorAll(el: any, selector: string): any[];
    abstract on(el: any, evt: any, listener: any): any;
    abstract onAndCancel(el: any, evt: any, listener: any): Function;
    abstract dispatchEvent(el: any, evt: any): any;
    abstract createMouseEvent(eventType: any): any;
    abstract createEvent(eventType: string): any;
    abstract preventDefault(evt: any): any;
    abstract isPrevented(evt: any): boolean;
    abstract nodeName(node: any): string;
    abstract nodeValue(node: any): string | null;
    abstract type(node: any): string;
    abstract firstChild(el: any): Node | null;
    abstract nextSibling(el: any): Node | null;
    abstract parentElement(el: any): Node | null;
    abstract childNodes(el: any): Node[];
    abstract childNodesAsList(el: any): Node[];
    abstract clearNodes(el: any): any;
    abstract appendChild(el: any, node: any): any;
    abstract removeChild(el: any, node: any): any;
    abstract remove(el: any): Node;
    abstract insertBefore(parent: any, ref: any, node: any): any;
    abstract getText(el: any): string | null;
    abstract setText(el: any, value: string): any;
    abstract getValue(el: any): string;
    abstract setValue(el: any, value: string): any;
    abstract getChecked(el: any): boolean;
    abstract createComment(text: string): any;
    abstract createTemplate(html: any): HTMLElement;
    abstract createElement(tagName: any, doc?: any): HTMLElement;
    abstract createElementNS(ns: string, tagName: string, doc?: any): Element;
    abstract createTextNode(text: string, doc?: any): Text;
    abstract getHost(el: any): any;
    abstract getDistributedNodes(el: any): Node[];
    abstract clone(node: Node): Node;
    abstract getElementsByTagName(element: any, name: string): HTMLElement[];
    abstract classList(element: any): any[];
    abstract addClass(element: any, className: string): any;
    abstract removeClass(element: any, className: string): any;
    abstract hasClass(element: any, className: string): boolean;
    abstract setStyle(element: any, styleName: string, styleValue: string): any;
    abstract removeStyle(element: any, styleName: string): any;
    abstract getStyle(element: any, styleName: string): string;
    abstract hasStyle(element: any, styleName: string, styleValue?: string): boolean;
    abstract getAttribute(element: any, attribute: string): string | null;
    abstract setAttribute(element: any, name: string, value: string): any;
    abstract setAttributeNS(element: any, ns: string, name: string, value: string): any;
    abstract removeAttribute(element: any, attribute: string): any;
    abstract removeAttributeNS(element: any, ns: string, attribute: string): any;
    abstract createHtmlDocument(): HTMLDocument;
    abstract getDefaultDocument(): Document;
    abstract getTitle(doc: Document): string;
    abstract setTitle(doc: Document, newTitle: string): any;
    abstract elementMatches(n: any, selector: string): boolean;
    abstract isElementNode(node: any): boolean;
    abstract isShadowRoot(node: any): boolean;
    abstract getEventKey(event: any): string;
    abstract supportsDOMEvents(): boolean;
    abstract getGlobalEventTarget(doc: Document, target: string): any;
    abstract getHistory(): History;
    abstract getLocation(): Location;
    abstract getBaseHref(doc: Document): string | null;
    abstract resetBaseElement(): void;
    abstract getUserAgent(): string;
    abstract performanceNow(): number;
    abstract supportsCookies(): boolean;
    abstract getCookie(name: string): string | null;
}
