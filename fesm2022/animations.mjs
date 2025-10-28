/**
 * @license Angular v21.0.0-next.9+sha-3fbaaa0
 * (c) 2010-2025 Google LLC. https://angular.dev/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { Injectable, Inject, ANIMATION_MODULE_TYPE, RendererFactory2, inject, NgZone, NgModule, ɵperformanceMarkFeature as _performanceMarkFeature } from '@angular/core';
export { ANIMATION_MODULE_TYPE } from '@angular/core';
import * as i1 from '@angular/animations/browser';
import { ɵAnimationEngine as _AnimationEngine, AnimationDriver, NoopAnimationDriver, ɵWebAnimationsDriver as _WebAnimationsDriver, ɵAnimationStyleNormalizer as _AnimationStyleNormalizer, ɵWebAnimationsStyleNormalizer as _WebAnimationsStyleNormalizer, ɵAnimationRendererFactory as _AnimationRendererFactory } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';
import { DomRendererFactory2 } from './_dom_renderer-chunk.mjs';
import { BrowserModule } from './_browser-chunk.mjs';

class InjectableAnimationEngine extends _AnimationEngine {
  constructor(doc, driver, normalizer) {
    super(doc, driver, normalizer);
  }
  ngOnDestroy() {
    this.flush();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: InjectableAnimationEngine,
    deps: [{
      token: DOCUMENT
    }, {
      token: i1.AnimationDriver
    }, {
      token: i1.ɵAnimationStyleNormalizer
    }],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: InjectableAnimationEngine
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.0-next.9+sha-3fbaaa0",
  ngImport: i0,
  type: InjectableAnimationEngine,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: i1.AnimationDriver
  }, {
    type: i1.ɵAnimationStyleNormalizer
  }]
});
function instantiateDefaultStyleNormalizer() {
  return new _WebAnimationsStyleNormalizer();
}
function instantiateRendererFactory() {
  return new _AnimationRendererFactory(inject(DomRendererFactory2), inject(_AnimationEngine), inject(NgZone));
}
const SHARED_ANIMATION_PROVIDERS = [{
  provide: _AnimationStyleNormalizer,
  useFactory: instantiateDefaultStyleNormalizer
}, {
  provide: _AnimationEngine,
  useClass: InjectableAnimationEngine
}, {
  provide: RendererFactory2,
  useFactory: instantiateRendererFactory
}];
const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useClass: NoopAnimationDriver
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: 'NoopAnimations'
}, ...SHARED_ANIMATION_PROVIDERS];
const BROWSER_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useFactory: () => typeof ngServerMode !== 'undefined' && ngServerMode ? new NoopAnimationDriver() : new _WebAnimationsDriver()
}, {
  provide: ANIMATION_MODULE_TYPE,
  useFactory: () => typeof ngServerMode !== 'undefined' && ngServerMode ? 'NoopAnimations' : 'BrowserAnimations'
}, ...SHARED_ANIMATION_PROVIDERS];

class BrowserAnimationsModule {
  static withConfig(config) {
    return {
      ngModule: BrowserAnimationsModule,
      providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS : BROWSER_ANIMATIONS_PROVIDERS
    };
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: BrowserAnimationsModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: BrowserAnimationsModule,
    exports: [BrowserModule]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: BrowserAnimationsModule,
    providers: BROWSER_ANIMATIONS_PROVIDERS,
    imports: [BrowserModule]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.0-next.9+sha-3fbaaa0",
  ngImport: i0,
  type: BrowserAnimationsModule,
  decorators: [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_ANIMATIONS_PROVIDERS
    }]
  }]
});
function provideAnimations() {
  _performanceMarkFeature('NgEagerAnimations');
  return [...BROWSER_ANIMATIONS_PROVIDERS];
}
class NoopAnimationsModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: NoopAnimationsModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: NoopAnimationsModule,
    exports: [BrowserModule]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "21.0.0-next.9+sha-3fbaaa0",
    ngImport: i0,
    type: NoopAnimationsModule,
    providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
    imports: [BrowserModule]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.0-next.9+sha-3fbaaa0",
  ngImport: i0,
  type: NoopAnimationsModule,
  decorators: [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
    }]
  }]
});
function provideNoopAnimations() {
  return [...BROWSER_NOOP_ANIMATIONS_PROVIDERS];
}

export { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations, provideNoopAnimations, InjectableAnimationEngine as ɵInjectableAnimationEngine };
//# sourceMappingURL=animations.mjs.map
