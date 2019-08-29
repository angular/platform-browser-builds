/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone } from '@angular/core';
export declare let browserDetection: BrowserDetection;
export declare class BrowserDetection {
    private _overrideUa;
    private readonly _ua;
    static setup(): void;
    constructor(ua: string | null);
    readonly isFirefox: boolean;
    readonly isAndroid: boolean;
    readonly isEdge: boolean;
    readonly isIE: boolean;
    readonly isWebkit: boolean;
    readonly isIOS7: boolean;
    readonly isSlow: boolean;
    readonly supportsNativeIntlApi: boolean;
    readonly isChromeDesktop: boolean;
    readonly isOldChrome: boolean;
    readonly supportsCustomElements: boolean;
    readonly supportsDeprecatedCustomCustomElementsV0: boolean;
    readonly supportsRegExUnicodeFlag: boolean;
    readonly supportsShadowDom: boolean;
    readonly supportsDeprecatedShadowDomV0: boolean;
}
export declare function dispatchEvent(element: any, eventType: any): void;
export declare function createMouseEvent(eventType: string): MouseEvent;
export declare function el(html: string): HTMLElement;
export declare function normalizeCSS(css: string): string;
export declare function stringifyElement(el: any /** TODO #9100 */): string;
export declare function createNgZone(): NgZone;
export declare function isCommentNode(node: Node): boolean;
export declare function isTextNode(node: Node): boolean;
export declare function getContent(node: Node): Node;
export declare function templateAwareRoot(el: Node): any;
export declare function setCookie(name: string, value: string): void;
export declare function supportsWebAnimation(): boolean;
export declare function hasStyle(element: any, styleName: string, styleValue?: string | null): boolean;
export declare function hasClass(element: any, className: string): boolean;
export declare function sortedClassList(element: any): any[];
export declare function createTemplate(html: any): HTMLElement;
export declare function childNodesAsList(el: Node): any[];
