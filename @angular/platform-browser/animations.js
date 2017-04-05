/**
 * @license Angular v4.1.0-beta.0-f4f621a
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { Injectable, NgModule, NgZone, RendererFactory2 } from '@angular/core';
import { BrowserModule, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { Animation, AnimationBuilder, NoopAnimationPlayer } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine, ɵAnimationStyleNormalizer, ɵDomAnimationEngine, ɵNoopAnimationDriver, ɵNoopAnimationEngine, ɵWebAnimationsDriver, ɵWebAnimationsStyleNormalizer, ɵsupportsWebAnimations } from '@angular/animations/browser';

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
            encapsulation: null,
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
        issueAnimationCommand(this._renderer, null, id, 'register', [animation]);
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
class NoopAnimationBuilder extends BrowserAnimationBuilder {
    constructor() { super(null); }
    /**
     * @param {?} animation
     * @return {?}
     */
    build(animation) { return new NoopAnimation(); }
}
NoopAnimationBuilder.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NoopAnimationBuilder.ctorParameters = () => [];
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
     * @param {?=} locals
     * @return {?}
     */
    create(element, locals = {}) {
        return new RendererAnimationPlayer(this._id, element, locals, this._renderer);
    }
}
class NoopAnimation extends BrowserAnimation {
    constructor() { super(null, null); }
    /**
     * @param {?} element
     * @param {?=} locals
     * @return {?}
     */
    create(element, locals = {}) {
        return new NoopAnimationPlayer();
    }
}
class RendererAnimationPlayer {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} locals
     * @param {?} _renderer
     */
    constructor(id, element, locals, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this.totalTime = 0;
        this._command('create', locals);
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
    onDone(fn) { this._listen('onDone', fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._listen('onStart', fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._listen('onDestroy', fn); }
    /**
     * @return {?}
     */
    init() { this._command('init'); }
    /**
     * @return {?}
     */
    hasStarted() { return undefined; }
    /**
     * @return {?}
     */
    play() { this._command('play'); }
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
        this._flushPending = false;
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
        this._queueFlush();
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
        this._queueFlush();
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        this._engine.onRemove(this._namespaceId, oldChild, this.delegate);
        this._queueFlush();
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
            const /** @type {?} */ doFlush = this._engine.setProperty(this._namespaceId, el, name, value);
            if (doFlush) {
                this._queueFlush();
            }
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
            return this._engine.listen(this._namespaceId, element, name, phase, (event) => {
                this._zone.run(() => callback(event));
            });
        }
        return this.delegate.listen(target, eventName, callback);
    }
    /**
     * @return {?}
     */
    _queueFlush() {
        if (!this._flushPending) {
            this._flushPending = true;
            Zone.current.scheduleMicroTask('AnimationRenderer queue flush', () => {
                this._flushPending = false;
                this._engine.flush();
            });
        }
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
class InjectableAnimationEngine extends ɵDomAnimationEngine {
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
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [ɵDomRendererFactory2, ɵAnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationBuilder, useClass: NoopAnimationBuilder },
    { provide: ɵAnimationEngine, useClass: ɵNoopAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [ɵDomRendererFactory2, ɵAnimationEngine, NgZone]
    }
];

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

export { BrowserAnimationsModule, NoopAnimationsModule, NoopAnimation as ɵNoopAnimation, NoopAnimationBuilder as ɵNoopAnimationBuilder, BrowserAnimation as ɵBrowserAnimation, BrowserAnimationBuilder as ɵBrowserAnimationBuilder, AnimationRenderer as ɵAnimationRenderer, AnimationRendererFactory as ɵAnimationRendererFactory, BROWSER_ANIMATIONS_PROVIDERS as ɵe, BROWSER_NOOP_ANIMATIONS_PROVIDERS as ɵf, InjectableAnimationEngine as ɵa, instantiateDefaultStyleNormalizer as ɵc, instantiateRendererFactory as ɵd, instantiateSupportedAnimationDriver as ɵb };
//# sourceMappingURL=animations.js.map
