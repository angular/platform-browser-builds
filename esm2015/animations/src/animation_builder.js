/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AnimationBuilder, AnimationFactory, sequence } from '@angular/animations';
import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
export class BrowserAnimationBuilder extends AnimationBuilder {
    /**
     * @param {?} rootRenderer
     * @param {?} doc
     */
    constructor(rootRenderer, doc) {
        super();
        this._nextAnimationId = 0;
        const /** @type {?} */ typeData = /** @type {?} */ ({
            id: '0',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: { animation: [] }
        });
        this._renderer = /** @type {?} */ (rootRenderer.createRenderer(doc.body, typeData));
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
        return new BrowserAnimationFactory(id, this._renderer);
    }
}
BrowserAnimationBuilder.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BrowserAnimationBuilder.ctorParameters = () => [
    { type: RendererFactory2, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
function BrowserAnimationBuilder_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BrowserAnimationBuilder.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BrowserAnimationBuilder.ctorParameters;
    /** @type {?} */
    BrowserAnimationBuilder.prototype._nextAnimationId;
    /** @type {?} */
    BrowserAnimationBuilder.prototype._renderer;
}
export class BrowserAnimationFactory extends AnimationFactory {
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
function BrowserAnimationFactory_tsickle_Closure_declarations() {
    /** @type {?} */
    BrowserAnimationFactory.prototype._id;
    /** @type {?} */
    BrowserAnimationFactory.prototype._renderer;
}
export class RendererAnimationPlayer {
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
function RendererAnimationPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    RendererAnimationPlayer.prototype.parentPlayer;
    /** @type {?} */
    RendererAnimationPlayer.prototype._started;
    /** @type {?} */
    RendererAnimationPlayer.prototype.totalTime;
    /** @type {?} */
    RendererAnimationPlayer.prototype.id;
    /** @type {?} */
    RendererAnimationPlayer.prototype.element;
    /** @type {?} */
    RendererAnimationPlayer.prototype._renderer;
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
//# sourceMappingURL=animation_builder.js.map