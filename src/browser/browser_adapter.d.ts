/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
    onAndCancel(el: Node, evt: any, listener: any): Function;
    dispatchEvent(el: Node, evt: any): void;
    remove(node: Node): void;
    createElement(tagName: string, doc?: Document): HTMLElement;
    createHtmlDocument(): HTMLDocument;
    getDefaultDocument(): Document;
    isElementNode(node: Node): boolean;
    isShadowRoot(node: any): boolean;
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getBaseHref(doc: Document): string | null;
    resetBaseElement(): void;
    getUserAgent(): string;
    getCookie(name: string): string | null;
}
