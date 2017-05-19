/**
 * @license Angular v4.2.0-beta.1-8a0e565
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { Injectable, NgModule, NgZone, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { BrowserModule, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { Animation, AnimationBuilder, sequence } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine, ɵAnimationStyleNormalizer, ɵNoopAnimationDriver, ɵWebAnimationsDriver, ɵWebAnimationsStyleNormalizer, ɵsupportsWebAnimations } from '@angular/animations/browser';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class BrowserAnimationBuilder extends AnimationBuilder {
    /**
     * @param {?} rootRenderer
     */
    constructor(rootRenderer) {
        super();
        this._nextAnimationId = 0;
        const typeData = {
            id: '0',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: { animation: [] }
        };
        this._renderer = rootRenderer.createRenderer(document.body, typeData);
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    build(animation) {
        const /** @type {?} */ id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        const /** @type {?} */ entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimation(id, this._renderer);
    }
}
BrowserAnimationBuilder.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BrowserAnimationBuilder.ctorParameters = () => [
    { type: RendererFactory2, },
];
class BrowserAnimation extends Animation {
    /**
     * @param {?} _id
     * @param {?} _renderer
     */
    constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
    }
    /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    }
}
class RendererAnimationPlayer {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} options
     * @param {?} _renderer
     */
    constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
    }
    /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    _command(command, ...args) {
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._listen('done', fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._listen('start', fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._listen('destroy', fn); }
    /**
     * @return {?}
     */
    init() { this._command('init'); }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    play() {
        this._command('play');
        this._started = true;
    }
    /**
     * @return {?}
     */
    pause() { this._command('pause'); }
    /**
     * @return {?}
     */
    restart() { this._command('restart'); }
    /**
     * @return {?}
     */
    finish() { this._command('finish'); }
    /**
     * @return {?}
     */
    destroy() { this._command('destroy'); }
    /**
     * @return {?}
     */
    reset() { this._command('reset'); }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { this._command('setPosition', p); }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
}
/**
 * @param {?} renderer
 * @param {?} element
 * @param {?} id
 * @param {?} command
 * @param {?} args
 * @return {?}
 */
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, `@@${id}:${command}`, args);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class AnimationRendererFactory {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?} _zone
     */
    constructor(delegate, _engine, _zone) {
        this.delegate = delegate;
        this._engine = _engine;
        this._zone = _zone;
        this._currentId = 0;
        _engine.onRemovalComplete = (element, delegate) => {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        };
    }
    /**
     * @param {?} hostElement
     * @param {?} type
     * @return {?}
     */
    createRenderer(hostElement, type) {
        let /** @type {?} */ delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation'])
            return delegate;
        const /** @type {?} */ componentId = type.id;
        const /** @type {?} */ namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        const /** @type {?} */ animationTriggers = (type.data['animation']);
        animationTriggers.forEach(trigger => this._engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger));
        return new AnimationRenderer(delegate, this._engine, this._zone, namespaceId);
    }
    /**
     * @return {?}
     */
    begin() {
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    }
    /**
     * @return {?}
     */
    end() {
        this._zone.runOutsideAngular(() => this._engine.flush());
        if (this.delegate.end) {
            this.delegate.end();
        }
    }
    /**
     * @return {?}
     */
    whenRenderingDone() { return this._engine.whenRenderingDone(); }
}
AnimationRendererFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AnimationRendererFactory.ctorParameters = () => [
    { type: RendererFactory2, },
    { type: ɵAnimationEngine, },
    { type: NgZone, },
];
class AnimationRenderer {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?} _zone
     * @param {?} _namespaceId
     */
    constructor(delegate, _engine, _zone, _namespaceId) {
        this.delegate = delegate;
        this._engine = _engine;
        this._zone = _zone;
        this._namespaceId = _namespaceId;
        this.destroyNode = null;
        this._animationCallbacksBuffer = [];
        this.destroyNode = this.delegate.destroyNode ? (n) => delegate.destroyNode(n) : null;
    }
    /**
     * @return {?}
     */
    get data() { return this.delegate.data; }
    /**
     * @return {?}
     */
    destroy() {
        this._engine.destroy(this._namespaceId, this.delegate);
        this.delegate.destroy();
    }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        return this.delegate.createElement(name, namespace);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) { return this.delegate.createComment(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) { return this.delegate.createText(value); }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return this.delegate.parentNode(node); }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return this.delegate.nextSibling(node); }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { this.delegate.addClass(el, name); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { this.delegate.removeClass(el, name); }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { this.delegate.setValue(node, value); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this._engine.onInsert(this._namespaceId, newChild, parent, false);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this._engine.onInsert(this._namespaceId, newChild, parent, true);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        this._engine.onRemove(this._namespaceId, oldChild, this.delegate);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name.charAt(0) == '@') {
            name = name.substr(1);
            this._engine.setProperty(this._namespaceId, el, name, value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) {
        if (eventName.charAt(0) == '@') {
            const /** @type {?} */ element = resolveElementFromTarget(target);
            let /** @type {?} */ name = eventName.substr(1);
            let /** @type {?} */ phase = '';
            if (name.charAt(0) != '@') {
                [name, phase] = parseTriggerCallbackName(name);
            }
            return this._engine.listen(this._namespaceId, element, name, phase, event => {
                this._bufferMicrotaskIntoZone(callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
    }
    /**
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    _bufferMicrotaskIntoZone(fn, data) {
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(() => {
                this._zone.run(() => {
                    this._animationCallbacksBuffer.forEach(tuple => {
                        const [fn, data] = tuple;
                        fn(data);
                    });
                    this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    }
}
/**
 * @param {?} target
 * @return {?}
 */
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
/**
 * @param {?} triggerName
 * @return {?}
 */
function parseTriggerCallbackName(triggerName) {
    const /** @type {?} */ dotIndex = triggerName.indexOf('.');
    const /** @type {?} */ trigger = triggerName.substring(0, dotIndex);
    const /** @type {?} */ phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class InjectableAnimationEngine extends ɵAnimationEngine {
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    constructor(driver, normalizer) {
        super(driver, normalizer);
    }
}
InjectableAnimationEngine.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InjectableAnimationEngine.ctorParameters = () => [
    { type: AnimationDriver, },
    { type: ɵAnimationStyleNormalizer, },
];
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    if (ɵsupportsWebAnimations()) {
        return new ɵWebAnimationsDriver();
    }
    return new ɵNoopAnimationDriver();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new ɵWebAnimationsStyleNormalizer();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
const SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [ɵDomRendererFactory2, ɵAnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{ provide: AnimationDriver, useClass: ɵNoopAnimationDriver }, ...SHARED_ANIMATION_PROVIDERS];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@experimental Animation support is experimental.
 */
class BrowserAnimationsModule {
}
BrowserAnimationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsModule.ctorParameters = () => [];
/**
 * \@experimental Animation support is experimental.
 */
class NoopAnimationsModule {
}
NoopAnimationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsModule.ctorParameters = () => [];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all animation APIs of the animation browser package.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the animation package.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BrowserAnimationsModule, NoopAnimationsModule, BrowserAnimation as ɵBrowserAnimation, BrowserAnimationBuilder as ɵBrowserAnimationBuilder, AnimationRenderer as ɵAnimationRenderer, AnimationRendererFactory as ɵAnimationRendererFactory, BROWSER_ANIMATIONS_PROVIDERS as ɵe, BROWSER_NOOP_ANIMATIONS_PROVIDERS as ɵf, InjectableAnimationEngine as ɵa, instantiateDefaultStyleNormalizer as ɵc, instantiateRendererFactory as ɵd, instantiateSupportedAnimationDriver as ɵb };
//# sourceMappingURL=animations.js.map
