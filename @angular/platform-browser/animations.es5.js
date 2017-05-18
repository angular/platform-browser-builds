var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license Angular v4.2.0-beta.1-0e13a59
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
var BrowserAnimationBuilder = (function (_super) {
    __extends(BrowserAnimationBuilder, _super);
    /**
     * @param {?} rootRenderer
     */
    function BrowserAnimationBuilder(rootRenderer) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        var typeData = {
            id: '0',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: { animation: [] }
        };
        _this._renderer = rootRenderer.createRenderer(document.body, typeData);
        return _this;
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    BrowserAnimationBuilder.prototype.build = function (animation) {
        var /** @type {?} */ id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        var /** @type {?} */ entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimation(id, this._renderer);
    };
    return BrowserAnimationBuilder;
}(AnimationBuilder));
BrowserAnimationBuilder.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
BrowserAnimationBuilder.ctorParameters = function () { return [
    { type: RendererFactory2, },
]; };
var BrowserAnimation = (function (_super) {
    __extends(BrowserAnimation, _super);
    /**
     * @param {?} _id
     * @param {?} _renderer
     */
    function BrowserAnimation(_id, _renderer) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this._renderer = _renderer;
        return _this;
    }
    /**
     * @param {?} element
     * @param {?=} options
     * @return {?}
     */
    BrowserAnimation.prototype.create = function (element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    };
    return BrowserAnimation;
}(Animation));
var RendererAnimationPlayer = (function () {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} options
     * @param {?} _renderer
     */
    function RendererAnimationPlayer(id, element, options, _renderer) {
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
    RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
        return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
    };
    /**
     * @param {?} command
     * @param {...?} args
     * @return {?}
     */
    RendererAnimationPlayer.prototype._command = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDone = function (fn) { this._listen('done', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onStart = function (fn) { this._listen('start', fn); };
    /**
     * @param {?} fn
     * @return {?}
     */
    RendererAnimationPlayer.prototype.onDestroy = function (fn) { this._listen('destroy', fn); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.init = function () { this._command('init'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.play = function () {
        this._command('play');
        this._started = true;
    };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.pause = function () { this._command('pause'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.restart = function () { this._command('restart'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.finish = function () { this._command('finish'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.destroy = function () { this._command('destroy'); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.reset = function () { this._command('reset'); };
    /**
     * @param {?} p
     * @return {?}
     */
    RendererAnimationPlayer.prototype.setPosition = function (p) { this._command('setPosition', p); };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.getPosition = function () { return 0; };
    return RendererAnimationPlayer;
}());
/**
 * @param {?} renderer
 * @param {?} element
 * @param {?} id
 * @param {?} command
 * @param {?} args
 * @return {?}
 */
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationRendererFactory = (function () {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?} _zone
     */
    function AnimationRendererFactory(delegate, _engine, _zone) {
        this.delegate = delegate;
        this._engine = _engine;
        this._zone = _zone;
        this._currentId = 0;
        _engine.onRemovalComplete = function (element, delegate) {
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
    AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
        var _this = this;
        var /** @type {?} */ delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation'])
            return delegate;
        var /** @type {?} */ componentId = type.id;
        var /** @type {?} */ namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        var /** @type {?} */ animationTriggers = (type.data['animation']);
        animationTriggers.forEach(function (trigger) { return _this._engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger); });
        return new AnimationRenderer(delegate, this._engine, this._zone, namespaceId);
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.begin = function () {
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.end = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () { return _this._engine.flush(); });
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    /**
     * @return {?}
     */
    AnimationRendererFactory.prototype.whenRenderingDone = function () { return this._engine.whenRenderingDone(); };
    return AnimationRendererFactory;
}());
AnimationRendererFactory.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AnimationRendererFactory.ctorParameters = function () { return [
    { type: RendererFactory2, },
    { type: ɵAnimationEngine, },
    { type: NgZone, },
]; };
var AnimationRenderer = (function () {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?} _zone
     * @param {?} _namespaceId
     */
    function AnimationRenderer(delegate, _engine, _zone, _namespaceId) {
        this.delegate = delegate;
        this._engine = _engine;
        this._zone = _zone;
        this._namespaceId = _namespaceId;
        this.destroyNode = null;
        this._animationCallbacksBuffer = [];
        this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
    }
    Object.defineProperty(AnimationRenderer.prototype, "data", {
        /**
         * @return {?}
         */
        get: function () { return this.delegate.data; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AnimationRenderer.prototype.destroy = function () {
        this._engine.destroy(this._namespaceId, this.delegate);
        this.delegate.destroy();
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    AnimationRenderer.prototype.createElement = function (name, namespace) {
        return this.delegate.createElement(name, namespace);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.createComment = function (value) { return this.delegate.createComment(value); };
    /**
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.createText = function (value) { return this.delegate.createText(value); };
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    AnimationRenderer.prototype.selectRootElement = function (selectorOrNode) {
        return this.delegate.selectRootElement(selectorOrNode);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AnimationRenderer.prototype.parentNode = function (node) { return this.delegate.parentNode(node); };
    /**
     * @param {?} node
     * @return {?}
     */
    AnimationRenderer.prototype.nextSibling = function (node) { return this.delegate.nextSibling(node); };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    AnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    AnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    AnimationRenderer.prototype.addClass = function (el, name) { this.delegate.addClass(el, name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    AnimationRenderer.prototype.removeClass = function (el, name) { this.delegate.removeClass(el, name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    AnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
    AnimationRenderer.prototype.removeStyle = function (el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.setValue = function (node, value) { this.delegate.setValue(node, value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    AnimationRenderer.prototype.appendChild = function (parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this._engine.onInsert(this._namespaceId, newChild, parent, false);
    };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    AnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this._engine.onInsert(this._namespaceId, newChild, parent, true);
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    AnimationRenderer.prototype.removeChild = function (parent, oldChild) {
        this._engine.onRemove(this._namespaceId, oldChild, this.delegate);
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    AnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == '@') {
            name = name.substr(1);
            this._engine.setProperty(this._namespaceId, el, name, value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    AnimationRenderer.prototype.listen = function (target, eventName, callback) {
        var _this = this;
        if (eventName.charAt(0) == '@') {
            var /** @type {?} */ element = resolveElementFromTarget(target);
            var /** @type {?} */ name = eventName.substr(1);
            var /** @type {?} */ phase = '';
            if (name.charAt(0) != '@') {
                _a = parseTriggerCallbackName(name), name = _a[0], phase = _a[1];
            }
            return this._engine.listen(this._namespaceId, element, name, phase, function (event) {
                _this._bufferMicrotaskIntoZone(callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
        var _a;
    };
    /**
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    AnimationRenderer.prototype._bufferMicrotaskIntoZone = function (fn, data) {
        var _this = this;
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(function () {
                _this._zone.run(function () {
                    _this._animationCallbacksBuffer.forEach(function (tuple) {
                        var fn = tuple[0], data = tuple[1];
                        fn(data);
                    });
                    _this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    };
    return AnimationRenderer;
}());
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
    var /** @type {?} */ dotIndex = triggerName.indexOf('.');
    var /** @type {?} */ trigger = triggerName.substring(0, dotIndex);
    var /** @type {?} */ phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var InjectableAnimationEngine = (function (_super) {
    __extends(InjectableAnimationEngine, _super);
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function InjectableAnimationEngine(driver, normalizer) {
        return _super.call(this, driver, normalizer) || this;
    }
    return InjectableAnimationEngine;
}(ɵAnimationEngine));
InjectableAnimationEngine.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
InjectableAnimationEngine.ctorParameters = function () { return [
    { type: AnimationDriver, },
    { type: ɵAnimationStyleNormalizer, },
]; };
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
var SHARED_ANIMATION_PROVIDERS = [
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
var BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver }
].concat(SHARED_ANIMATION_PROVIDERS);
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{ provide: AnimationDriver, useClass: ɵNoopAnimationDriver }].concat(SHARED_ANIMATION_PROVIDERS);
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
var BrowserAnimationsModule = (function () {
    function BrowserAnimationsModule() {
    }
    return BrowserAnimationsModule;
}());
BrowserAnimationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                providers: BROWSER_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
BrowserAnimationsModule.ctorParameters = function () { return []; };
/**
 * \@experimental Animation support is experimental.
 */
var NoopAnimationsModule = (function () {
    function NoopAnimationsModule() {
    }
    return NoopAnimationsModule;
}());
NoopAnimationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsModule.ctorParameters = function () { return []; };
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
//# sourceMappingURL=animations.es5.js.map
