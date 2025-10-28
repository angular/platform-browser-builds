/**
 * @license Angular v21.1.0-next.0+sha-97e5f57
 * (c) 2010-2025 Google LLC. https://angular.dev/
 * License: MIT
 */

import { ɵprovideFakePlatformNavigation as _provideFakePlatformNavigation } from '@angular/common/testing';
import * as i0 from '@angular/core';
import { Injectable, Inject, createPlatformFactory, APP_ID, NgModule } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';
import { ɵgetDOM as _getDOM, DOCUMENT } from '@angular/common';
import { platformBrowser, BrowserModule } from './_browser-chunk.mjs';
import './_dom_renderer-chunk.mjs';

class DOMTestComponentRenderer extends TestComponentRenderer {
  _doc;
  constructor(_doc) {
    super();
    this._doc = _doc;
  }
  insertRootElement(rootElId, tagName = 'div') {
    this.removeAllRootElementsImpl();
    const rootElement = _getDOM().getDefaultDocument().createElement(tagName);
    rootElement.setAttribute('id', rootElId);
    this._doc.body.appendChild(rootElement);
  }
  removeAllRootElements() {
    if (typeof this._doc.querySelectorAll === 'function') {
      this.removeAllRootElementsImpl();
    }
  }
  removeAllRootElementsImpl() {
    const oldRoots = this._doc.querySelectorAll('[id^=root]');
    for (let i = 0; i < oldRoots.length; i++) {
      _getDOM().remove(oldRoots[i]);
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.1.0-next.0+sha-97e5f57",
    ngImport: i0,
    type: DOMTestComponentRenderer,
    deps: [{
      token: DOCUMENT
    }],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.1.0-next.0+sha-97e5f57",
    ngImport: i0,
    type: DOMTestComponentRenderer
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.1.0-next.0+sha-97e5f57",
  ngImport: i0,
  type: DOMTestComponentRenderer,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }]
});

const platformBrowserTesting = createPlatformFactory(platformBrowser, 'browserTesting');
class BrowserTestingModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.1.0-next.0+sha-97e5f57",
    ngImport: i0,
    type: BrowserTestingModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "21.1.0-next.0+sha-97e5f57",
    ngImport: i0,
    type: BrowserTestingModule,
    exports: [BrowserModule]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "21.1.0-next.0+sha-97e5f57",
    ngImport: i0,
    type: BrowserTestingModule,
    providers: [{
      provide: APP_ID,
      useValue: 'a'
    }, _provideFakePlatformNavigation(), {
      provide: TestComponentRenderer,
      useClass: DOMTestComponentRenderer
    }],
    imports: [BrowserModule]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.1.0-next.0+sha-97e5f57",
  ngImport: i0,
  type: BrowserTestingModule,
  decorators: [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: [{
        provide: APP_ID,
        useValue: 'a'
      }, _provideFakePlatformNavigation(), {
        provide: TestComponentRenderer,
        useClass: DOMTestComponentRenderer
      }]
    }]
  }]
});

export { BrowserTestingModule, platformBrowserTesting };
//# sourceMappingURL=testing.mjs.map
