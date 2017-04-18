/**
 * @license Angular v4.1.0-beta.1-b46aba9
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/animations'), require('@angular/animations/browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/animations', '@angular/animations/browser'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.animations = global.ng.platformBrowser.animations || {}),global.ng.core,global.ng.platformBrowser,global.ng.animations,global.ng.animations.browser));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_animations,_angular_animations_browser) { 'use strict';

var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @license Angular v4.1.0-beta.1-b46aba9
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
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
            encapsulation: null,
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
        var /** @type {?} */ entry = Array.isArray(animation) ? _angular_animations.sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimation(id, this._renderer);
    };
    return BrowserAnimationBuilder;
}(_angular_animations.AnimationBuilder));
BrowserAnimationBuilder.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
BrowserAnimationBuilder.ctorParameters = function () { return [
    { type: _angular_core.RendererFactory2, },
]; };
var NoopAnimationBuilder = (function (_super) {
    __extends(NoopAnimationBuilder, _super);
    function NoopAnimationBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} animation
     * @return {?}
     */
    NoopAnimationBuilder.prototype.build = function (animation) { return new NoopAnimation(); };
    return NoopAnimationBuilder;
}(BrowserAnimationBuilder));
NoopAnimationBuilder.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
NoopAnimationBuilder.ctorParameters = function () { return []; };
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
     * @param {?=} locals
     * @return {?}
     */
    BrowserAnimation.prototype.create = function (element, locals) {
        return new RendererAnimationPlayer(this._id, element, locals || {}, this._renderer);
    };
    return BrowserAnimation;
}(_angular_animations.Animation));
var NoopAnimation = (function (_super) {
    __extends(NoopAnimation, _super);
    function NoopAnimation() {
        return _super.call(this, null, null) || this;
    }
    /**
     * @param {?} element
     * @param {?=} locals
     * @return {?}
     */
    NoopAnimation.prototype.create = function (element, locals) {
        if (locals === void 0) { locals = {}; }
        return new _angular_animations.NoopAnimationPlayer();
    };
    return NoopAnimation;
}(BrowserAnimation));
var RendererAnimationPlayer = (function () {
    /**
     * @param {?} id
     * @param {?} element
     * @param {?} locals
     * @param {?} _renderer
     */
    function RendererAnimationPlayer(id, element, locals, _renderer) {
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
    RendererAnimationPlayer.prototype.hasStarted = function () { return undefined; };
    /**
     * @return {?}
     */
    RendererAnimationPlayer.prototype.play = function () { this._command('play'); };
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
    return AnimationRendererFactory;
}());
AnimationRendererFactory.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
AnimationRendererFactory.ctorParameters = function () { return [
    { type: _angular_core.RendererFactory2, },
    { type: _angular_animations_browser.ɵAnimationEngine, },
    { type: _angular_core.NgZone, },
]; };
var AnimationRenderer = (function () {
    /**
     * @param {?} delegate
     * @param {?} _engine
     * @param {?} _zone
     * @param {?} _namespaceId
     */
    function AnimationRenderer(delegate, _engine, _zone, _namespaceId) {
        var _this = this;
        this.delegate = delegate;
        this._engine = _engine;
        this._zone = _zone;
        this._namespaceId = _namespaceId;
        this.destroyNode = null;
        this._flushPending = false;
        this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
        _zone.onMicrotaskEmpty.subscribe(function () {
            if (_this._flushPending) {
                _this._flushPending = false;
                _this._engine.flush();
            }
        });
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
        this._queueFlush();
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
        this._queueFlush();
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    AnimationRenderer.prototype.removeChild = function (parent, oldChild) {
        this._engine.onRemove(this._namespaceId, oldChild, this.delegate);
        this._queueFlush();
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
            var /** @type {?} */ doFlush = this._engine.setProperty(this._namespaceId, el, name, value);
            if (doFlush) {
                this._queueFlush();
            }
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
                _this._zone.run(function () { return callback(event); });
            });
        }
        return this.delegate.listen(target, eventName, callback);
        var _a;
    };
    /**
     * @return {?}
     */
    AnimationRenderer.prototype._queueFlush = function () { this._flushPending = true; };
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
}(_angular_animations_browser.ɵDomAnimationEngine));
InjectableAnimationEngine.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
InjectableAnimationEngine.ctorParameters = function () { return [
    { type: _angular_animations_browser.AnimationDriver, },
    { type: _angular_animations_browser.ɵAnimationStyleNormalizer, },
]; };
var InjectableNoopAnimationEngine = (function (_super) {
    __extends(InjectableNoopAnimationEngine, _super);
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    function InjectableNoopAnimationEngine(driver, normalizer) {
        return _super.call(this, driver, normalizer) || this;
    }
    return InjectableNoopAnimationEngine;
}(_angular_animations_browser.ɵNoopAnimationEngine));
InjectableNoopAnimationEngine.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
InjectableNoopAnimationEngine.ctorParameters = function () { return [
    { type: _angular_animations_browser.AnimationDriver, },
    { type: _angular_animations_browser.ɵAnimationStyleNormalizer, },
]; };
/**
 * @return {?}
 */
function instantiateSupportedAnimationDriver() {
    if (_angular_animations_browser.ɵsupportsWebAnimations()) {
        return new _angular_animations_browser.ɵWebAnimationsDriver();
    }
    return new _angular_animations_browser.ɵNoopAnimationDriver();
}
/**
 * @return {?}
 */
function instantiateDefaultStyleNormalizer() {
    return new _angular_animations_browser.ɵWebAnimationsStyleNormalizer();
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
var BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: _angular_animations.AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: _angular_animations_browser.AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: _angular_animations_browser.ɵAnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: _angular_animations_browser.ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: _angular_core.RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [_angular_platformBrowser.ɵDomRendererFactory2, _angular_animations_browser.ɵAnimationEngine, _angular_core.NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: _angular_animations_browser.AnimationDriver, useClass: _angular_animations_browser.ɵNoopAnimationDriver },
    { provide: _angular_animations_browser.ɵAnimationStyleNormalizer, useClass: _angular_animations_browser.ɵNoopAnimationStyleNormalizer },
    { provide: _angular_animations.AnimationBuilder, useClass: NoopAnimationBuilder },
    { provide: _angular_animations_browser.ɵAnimationEngine, useClass: InjectableNoopAnimationEngine }, {
        provide: _angular_core.RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [_angular_platformBrowser.ɵDomRendererFactory2, _angular_animations_browser.ɵAnimationEngine, _angular_core.NgZone]
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
var BrowserAnimationsModule = (function () {
    function BrowserAnimationsModule() {
    }
    return BrowserAnimationsModule;
}());
BrowserAnimationsModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_platformBrowser.BrowserModule],
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
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_platformBrowser.BrowserModule],
                providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
            },] },
];
/**
 * @nocollapse
 */
NoopAnimationsModule.ctorParameters = function () { return []; };

exports.BrowserAnimationsModule = BrowserAnimationsModule;
exports.NoopAnimationsModule = NoopAnimationsModule;
exports.ɵNoopAnimation = NoopAnimation;
exports.ɵNoopAnimationBuilder = NoopAnimationBuilder;
exports.ɵBrowserAnimation = BrowserAnimation;
exports.ɵBrowserAnimationBuilder = BrowserAnimationBuilder;
exports.ɵAnimationRenderer = AnimationRenderer;
exports.ɵAnimationRendererFactory = AnimationRendererFactory;
exports.ɵf = BROWSER_ANIMATIONS_PROVIDERS;
exports.ɵg = BROWSER_NOOP_ANIMATIONS_PROVIDERS;
exports.ɵa = InjectableAnimationEngine;
exports.ɵb = InjectableNoopAnimationEngine;
exports.ɵd = instantiateDefaultStyleNormalizer;
exports.ɵe = instantiateRendererFactory;
exports.ɵc = instantiateSupportedAnimationDriver;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-animations.umd.js.map
