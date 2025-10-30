/**
 * @license Angular v21.0.0-rc.0+sha-fee4baf
 * (c) 2010-2025 Google LLC. https://angular.dev/
 * License: MIT
 */

import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Injector, ɵRuntimeError as _RuntimeError, ɵChangeDetectionScheduler as _ChangeDetectionScheduler, Injectable, InjectionToken, ɵperformanceMarkFeature as _performanceMarkFeature, makeEnvironmentProviders, RendererFactory2, NgZone, ANIMATION_MODULE_TYPE } from '@angular/core';
import { DomRendererFactory2 } from './_dom_renderer-chunk.mjs';

const ANIMATION_PREFIX = '@';
class AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  ngOnDestroy() {
    this._engine?.flush();
  }
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import('@angular/animations/browser').then(m => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch(e => {
      throw new _RuntimeError(5300, (typeof ngDevMode === 'undefined' || ngDevMode) && 'Async loading for animations package was ' + 'enabled, but loading failed. Angular falls back to using regular rendering. ' + "No animations will be displayed and their styles won't be applied.");
    }).then(({
      ɵcreateEngine,
      ɵAnimationRendererFactory
    }) => {
      this._engine = ɵcreateEngine(this.animationType, this.doc);
      const rendererFactory = new ɵAnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.ɵtype === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === 'boolean') {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.['animation'] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then(animationRendererFactory => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(_ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(10);
    }).catch(e => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "21.0.0-rc.0+sha-fee4baf",
    ngImport: i0,
    type: AsyncAnimationRendererFactory,
    deps: "invalid",
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "21.0.0-rc.0+sha-fee4baf",
    ngImport: i0,
    type: AsyncAnimationRendererFactory
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "21.0.0-rc.0+sha-fee4baf",
  ngImport: i0,
  type: AsyncAnimationRendererFactory,
  decorators: [{
    type: Injectable
  }],
  ctorParameters: () => [{
    type: Document
  }, {
    type: i0.RendererFactory2
  }, {
    type: i0.NgZone
  }, {
    type: undefined
  }, {
    type: Promise
  }]
});
class DynamicDelegationRenderer {
  delegate;
  replay = [];
  ɵtype = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval) {
    this.delegate.removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push(renderer => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push(renderer => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
}
const ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(typeof ngDevMode !== undefined && ngDevMode ? 'async_animation_loading_scheduler_fn' : '');

function provideAnimationsAsync(type = 'animations') {
  _performanceMarkFeature('NgAsyncAnimations');
  if (typeof ngServerMode !== 'undefined' && ngServerMode) {
    type = 'noop';
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: () => {
      return new AsyncAnimationRendererFactory(inject(DOCUMENT), inject(DomRendererFactory2), inject(NgZone), type);
    }
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === 'noop' ? 'NoopAnimations' : 'BrowserAnimations'
  }]);
}

export { provideAnimationsAsync, ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN, AsyncAnimationRendererFactory as ɵAsyncAnimationRendererFactory };
//# sourceMappingURL=animations-async.mjs.map
