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
    getProperty(el: Node, name: string): any;
    log(error: string): void;
    logGroup(error: string): void;
    logGroupEnd(): void;
    onAndCancel(el: Node, evt: any, listener: any): Function;
    dispatchEvent(el: Node, evt: any): void;
    remove(node: Node): Node;
    getValue(el: any): string;
    createElement(tagName: string, doc?: Document): HTMLElement;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: Node): boolean;
    isShadowRoot(node: any): boolean;
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
