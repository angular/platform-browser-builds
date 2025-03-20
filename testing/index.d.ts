/**
 * @license Angular v19.2.3+sha-c13c53f
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import { TestComponentRenderer } from '@angular/core/testing';

/**
 * Platform for testing
 *
 * @publicApi
 */
declare const platformBrowserTesting: (extraProviders?: StaticProvider[]) => i0.PlatformRef;
/**
 * NgModule for testing.
 *
 * @publicApi
 */
declare class BrowserTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserTestingModule, never, never, [typeof i1.BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserTestingModule>;
}

/**
 * A DOM based implementation of the TestComponentRenderer.
 */
declare class DOMTestComponentRenderer extends TestComponentRenderer {
    private _doc;
    constructor(_doc: any);
    insertRootElement(rootElId: string): void;
    removeAllRootElements(): void;
    private removeAllRootElementsImpl;
    static ɵfac: i0.ɵɵFactoryDeclaration<DOMTestComponentRenderer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DOMTestComponentRenderer>;
}

export { BrowserTestingModule, platformBrowserTesting, DOMTestComponentRenderer as ɵDOMTestComponentRenderer };
