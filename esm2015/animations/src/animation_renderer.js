import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const ANIMATION_PREFIX = '@';
/** @type {?} */
const DISABLE_ANIMATIONS_FLAG = '@.disabled';
export class AnimationRendererFactory {
    /**
     * @param {?} delegate
     * @param {?} engine
     * @param {?} _zone
     */
    constructor(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        this._cdRecurDepth = 0;
        this.promise = Promise.resolve(0);
        engine.onRemovalComplete = (element, delegate) => {
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
        /** @type {?} */
        const EMPTY_NAMESPACE_ID = '';
        // cache the delegates to find out which cached delegate can
        // be used by which cached renderer
        /** @type {?} */
        const delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            /** @type {?} */
            let renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        /** @type {?} */
        const componentId = type.id;
        /** @type {?} */
        const namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        /** @type {?} */
        const animationTriggers = (/** @type {?} */ (type.data['animation']));
        animationTriggers.forEach(trigger => this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger));
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    }
    /**
     * @return {?}
     */
    begin() {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _scheduleCountTask() {
        // always use promise to schedule microtask instead of use Zone
        this.promise.then(() => { this._microtaskId++; });
    }
    /**
     * \@internal
     * @param {?} count
     * @param {?} fn
     * @param {?} data
     * @return {?}
     */
    scheduleListenerCallback(count, fn, data) {
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(() => fn(data));
            return;
        }
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
    /**
     * @return {?}
     */
    end() {
        this._cdRecurDepth--;
        // this is to prevent animations from running twice when an inner
        // component does CD when a parent component instead has inserted it
        if (this._cdRecurDepth == 0) {
            this._zone.runOutsideAngular(() => {
                this._scheduleCountTask();
                this.engine.flush(this._microtaskId);
            });
        }
        if (this.delegate.end) {
            this.delegate.end();
        }
    }
    /**
     * @return {?}
     */
    whenRenderingDone() { return this.engine.whenRenderingDone(); }
}
AnimationRendererFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AnimationRendererFactory.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: AnimationEngine },
    { type: NgZone }
];
AnimationRendererFactory.ngInjectableDef = i0.defineInjectable({ token: AnimationRendererFactory, factory: function AnimationRendererFactory_Factory(t) { return new (t || AnimationRendererFactory)(i0.inject(RendererFactory2), i0.inject(AnimationEngine), i0.inject(NgZone)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(AnimationRendererFactory, [{
        type: Injectable
    }], function () { return [{
        type: RendererFactory2
    }, {
        type: AnimationEngine
    }, {
        type: NgZone
    }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._currentId;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._microtaskId;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._animationCallbacksBuffer;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._rendererCache;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._cdRecurDepth;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype.promise;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype.delegate;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype.engine;
    /**
     * @type {?}
     * @private
     */
    AnimationRendererFactory.prototype._zone;
}
export class BaseAnimationRenderer {
    /**
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    constructor(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? (n) => (/** @type {?} */ (delegate.destroyNode))(n) : null;
    }
    /**
     * @return {?}
     */
    get data() { return this.delegate.data; }
    /**
     * @return {?}
     */
    destroy() {
        this.engine.destroy(this.namespaceId, this.delegate);
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
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, true);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
    }
    /**
     * @param {?} selectorOrNode
     * @param {?=} preserveContent
     * @return {?}
     */
    selectRootElement(selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
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
     * @param {?=} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?=} flags
     * @return {?}
     */
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { this.delegate.setValue(node, value); }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    listen(target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    }
    /**
     * @protected
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    disableAnimations(element, value) {
        this.engine.disableAnimations(element, value);
    }
}
if (false) {
    /** @type {?} */
    BaseAnimationRenderer.prototype.destroyNode;
    /**
     * @type {?}
     * @protected
     */
    BaseAnimationRenderer.prototype.namespaceId;
    /** @type {?} */
    BaseAnimationRenderer.prototype.delegate;
    /** @type {?} */
    BaseAnimationRenderer.prototype.engine;
}
export class AnimationRenderer extends BaseAnimationRenderer {
    /**
     * @param {?} factory
     * @param {?} namespaceId
     * @param {?} delegate
     * @param {?} engine
     */
    constructor(factory, namespaceId, delegate, engine) {
        super(namespaceId, delegate, engine);
        this.factory = factory;
        this.namespaceId = namespaceId;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, (/** @type {?} */ (value)));
            }
            else {
                this.engine.process(this.namespaceId, el, name.substr(1), value);
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
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            /** @type {?} */
            const element = resolveElementFromTarget(target);
            /** @type {?} */
            let name = eventName.substr(1);
            /** @type {?} */
            let phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name.charAt(0) != ANIMATION_PREFIX) {
                [name, phase] = parseTriggerCallbackName(name);
            }
            return this.engine.listen(this.namespaceId, element, name, phase, event => {
                /** @type {?} */
                const countId = ((/** @type {?} */ (event)))['_data'] || -1;
                this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
    }
}
if (false) {
    /** @type {?} */
    AnimationRenderer.prototype.factory;
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
    /** @type {?} */
    const dotIndex = triggerName.indexOf('.');
    /** @type {?} */
    const trigger = triggerName.substring(0, dotIndex);
    /** @type {?} */
    const phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLGdCQUFnQixJQUFJLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFhLGdCQUFnQixFQUFxQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztNQUU1RyxnQkFBZ0IsR0FBRyxHQUFHOztNQUN0Qix1QkFBdUIsR0FBRyxZQUFZO0FBRzVDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQVFuQyxZQUNZLFFBQTBCLEVBQVUsTUFBdUIsRUFBVSxLQUFhO1FBQWxGLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUnRGLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsOEJBQXlCLEdBQTZCLEVBQUUsQ0FBQztRQUN6RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBQzdELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBaUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlqRCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxPQUFZLEVBQUUsUUFBbUIsRUFBRSxFQUFFO1lBQy9ELHlFQUF5RTtZQUN6RSxpRkFBaUY7WUFDakYsa0VBQWtFO1lBQ2xFLGlFQUFpRTtZQUNqRSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1QyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxV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O3NCQUNsRSxPQUFPLEdBQUcsQ0FBQyxtQkFBQSxLQUFLLEVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGOzs7SUFyQ0ssb0NBQXdDOzs7Ozs7QUF1QzlDLFNBQVMsd0JBQXdCLENBQUMsTUFBNEM7SUFDNUUsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLE1BQU07WUFDVCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsS0FBSyxVQUFVO1lBQ2IsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxNQUFNLENBQUM7UUFDaEI7WUFDRSxPQUFPLE1BQU0sQ0FBQztLQUNqQjtBQUNILENBQUM7Ozs7O0FBRUQsU0FBUyx3QkFBd0IsQ0FBQyxXQUFtQjs7VUFDN0MsUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztVQUNuQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDOztVQUM1QyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5jb25zdCBESVNBQkxFX0FOSU1BVElPTlNfRkxBRyA9ICdALmRpc2FibGVkJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9jdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pY3JvdGFza0lkOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9hbmltYXRpb25DYWxsYmFja3NCdWZmZXI6IFsoZTogYW55KSA9PiBhbnksIGFueV1bXSA9IFtdO1xuICBwcml2YXRlIF9yZW5kZXJlckNhY2hlID0gbmV3IE1hcDxSZW5kZXJlcjIsIEJhc2VBbmltYXRpb25SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSBfY2RSZWN1ckRlcHRoID0gMDtcbiAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICBlbmdpbmUub25SZW1vdmFsQ29tcGxldGUgPSAoZWxlbWVudDogYW55LCBkZWxlZ2F0ZTogUmVuZGVyZXIyKSA9PiB7XG4gICAgICAvLyBOb3RlOiBpZiBhbiBjb21wb25lbnQgZWxlbWVudCBoYXMgYSBsZWF2ZSBhbmltYXRpb24sIGFuZCB0aGUgY29tcG9uZW50XG4gICAgICAvLyBhIGhvc3QgbGVhdmUgYW5pbWF0aW9uLCB0aGUgdmlldyBlbmdpbmUgd2lsbCBjYWxsIGByZW1vdmVDaGlsZGAgZm9yIHRoZSBwYXJlbnRcbiAgICAgIC8vIGNvbXBvbmVudCByZW5kZXJlciBhcyB3ZWxsIGFzIGZvciB0aGUgY2hpbGQgY29tcG9uZW50IHJlbmRlcmVyLlxuICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFscmVhZHkgcmVtb3ZlZCB0aGUgZWxlbWVudC5cbiAgICAgIGlmIChkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5wYXJlbnROb2RlKGVsZW1lbnQpKSB7XG4gICAgICAgIGRlbGVnYXRlLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50Tm9kZSwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IEVNUFRZX05BTUVTUEFDRV9JRCA9ICcnO1xuXG4gICAgLy8gY2FjaGUgdGhlIGRlbGVnYXRlcyB0byBmaW5kIG91dCB3aGljaCBjYWNoZWQgZGVsZWdhdGUgY2FuXG4gICAgLy8gYmUgdXNlZCBieSB3aGljaCBjYWNoZWQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHR5cGUpO1xuICAgIGlmICghaG9zdEVsZW1lbnQgfHwgIXR5cGUgfHwgIXR5cGUuZGF0YSB8fCAhdHlwZS5kYXRhWydhbmltYXRpb24nXSkge1xuICAgICAgbGV0IHJlbmRlcmVyOiBCYXNlQW5pbWF0aW9uUmVuZGVyZXJ8dW5kZWZpbmVkID0gdGhpcy5fcmVuZGVyZXJDYWNoZS5nZXQoZGVsZWdhdGUpO1xuICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlciA9IG5ldyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIoRU1QVFlfTkFNRVNQQUNFX0lELCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICAgICAgICAvLyBvbmx5IGNhY2hlIHRoaXMgcmVzdWx0IHdoZW4gdGhlIGJhc2UgcmVuZGVyZXIgaXMgdXNlZFxuICAgICAgICB0aGlzLl9yZW5kZXJlckNhY2hlLnNldChkZWxlZ2F0ZSwgcmVuZGVyZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gdHlwZS5pZDtcbiAgICBjb25zdCBuYW1lc3BhY2VJZCA9IHR5cGUuaWQgKyAnLScgKyB0aGlzLl9jdXJyZW50SWQ7XG4gICAgdGhpcy5fY3VycmVudElkKys7XG5cbiAgICB0aGlzLmVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuICAgIGNvbnN0IGFuaW1hdGlvblRyaWdnZXJzID0gdHlwZS5kYXRhWydhbmltYXRpb24nXSBhcyBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFbXTtcbiAgICBhbmltYXRpb25UcmlnZ2Vycy5mb3JFYWNoKFxuICAgICAgICB0cmlnZ2VyID0+IHRoaXMuZW5naW5lLnJlZ2lzdGVyVHJpZ2dlcihcbiAgICAgICAgICAgIGNvbXBvbmVudElkLCBuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQsIHRyaWdnZXIubmFtZSwgdHJpZ2dlcikpO1xuICAgIHJldHVybiBuZXcgQW5pbWF0aW9uUmVuZGVyZXIodGhpcywgbmFtZXNwYWNlSWQsIGRlbGVnYXRlLCB0aGlzLmVuZ2luZSk7XG4gIH1cblxuICBiZWdpbigpIHtcbiAgICB0aGlzLl9jZFJlY3VyRGVwdGgrKztcbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5iZWdpbikge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NjaGVkdWxlQ291bnRUYXNrKCkge1xuICAgIC8vIGFsd2F5cyB1c2UgcHJvbWlzZSB0byBzY2hlZHVsZSBtaWNyb3Rhc2sgaW5zdGVhZCBvZiB1c2UgWm9uZVxuICAgIHRoaXMucHJvbWlzZS50aGVuKCgpID0+IHsgdGhpcy5fbWljcm90YXNrSWQrKzsgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHNjaGVkdWxlTGlzdGVuZXJDYWxsYmFjayhjb3VudDogbnVtYmVyLCBmbjogKGU6IGFueSkgPT4gYW55LCBkYXRhOiBhbnkpIHtcbiAgICBpZiAoY291bnQgPj0gMCAmJiBjb3VudCA8IHRoaXMuX21pY3JvdGFza0lkKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBmbihkYXRhKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5sZW5ndGggPT0gMCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyLmZvckVhY2godHVwbGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2ZuLCBkYXRhXSA9IHR1cGxlO1xuICAgICAgICAgICAgZm4oZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyID0gW107XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyLnB1c2goW2ZuLCBkYXRhXSk7XG4gIH1cblxuICBlbmQoKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoLS07XG5cbiAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgYW5pbWF0aW9ucyBmcm9tIHJ1bm5pbmcgdHdpY2Ugd2hlbiBhbiBpbm5lclxuICAgIC8vIGNvbXBvbmVudCBkb2VzIENEIHdoZW4gYSBwYXJlbnQgY29tcG9uZW50IGluc3RlYWQgaGFzIGluc2VydGVkIGl0XG4gICAgaWYgKHRoaXMuX2NkUmVjdXJEZXB0aCA9PSAwKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVDb3VudFRhc2soKTtcbiAgICAgICAgdGhpcy5lbmdpbmUuZmx1c2godGhpcy5fbWljcm90YXNrSWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlbGVnYXRlLmVuZCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5lbmQoKTtcbiAgICB9XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4geyByZXR1cm4gdGhpcy5lbmdpbmUud2hlblJlbmRlcmluZ0RvbmUoKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUFuaW1hdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgbmFtZXNwYWNlSWQ6IHN0cmluZywgcHVibGljIGRlbGVnYXRlOiBSZW5kZXJlcjIsIHB1YmxpYyBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHRoaXMuZGVzdHJveU5vZGUgPSB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlID8gKG4pID0+IGRlbGVnYXRlLmRlc3Ryb3lOb2RlICEobikgOiBudWxsO1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLmRhdGE7IH1cblxuICBkZXN0cm95Tm9kZTogKChuOiBhbnkpID0+IHZvaWQpfG51bGw7XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmVuZ2luZS5kZXN0cm95KHRoaXMubmFtZXNwYWNlSWQsIHRoaXMuZGVsZWdhdGUpO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZykgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTsgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZykgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVUZXh0KHZhbHVlKTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTtcbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCBmYWxzZSk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmluc2VydEJlZm9yZShwYXJlbnQsIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgdGhpcy5lbmdpbmUub25JbnNlcnQodGhpcy5uYW1lc3BhY2VJZCwgbmV3Q2hpbGQsIHBhcmVudCwgdHJ1ZSk7XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZW5naW5lLm9uUmVtb3ZlKHRoaXMubmFtZXNwYWNlSWQsIG9sZENoaWxkLCB0aGlzLmRlbGVnYXRlKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZSwgcHJlc2VydmVDb250ZW50KTtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLnBhcmVudE5vZGUobm9kZSk7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUubmV4dFNpYmxpbmcobm9kZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLmFkZENsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTsgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKG5hbWUuY2hhckF0KDApID09IEFOSU1BVElPTl9QUkVGSVggJiYgbmFtZSA9PSBESVNBQkxFX0FOSU1BVElPTlNfRkxBRykge1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9ucyhlbCwgISF2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7IH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudDogYW55LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZW5naW5lLmRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uUmVuZGVyZXIgZXh0ZW5kcyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBmYWN0b3J5OiBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGRlbGVnYXRlOiBSZW5kZXJlcjIsXG4gICAgICBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHN1cGVyKG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgZW5naW5lKTtcbiAgICB0aGlzLm5hbWVzcGFjZUlkID0gbmFtZXNwYWNlSWQ7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDEpID09ICcuJyAmJiBuYW1lID09IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAhIXZhbHVlO1xuICAgICAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsLCB2YWx1ZSBhcyBib29sZWFuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5naW5lLnByb2Nlc3ModGhpcy5uYW1lc3BhY2VJZCwgZWwsIG5hbWUuc3Vic3RyKDEpLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBpZiAoZXZlbnROYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcmVzb2x2ZUVsZW1lbnRGcm9tVGFyZ2V0KHRhcmdldCk7XG4gICAgICBsZXQgbmFtZSA9IGV2ZW50TmFtZS5zdWJzdHIoMSk7XG4gICAgICBsZXQgcGhhc2UgPSAnJztcbiAgICAgIC8vIEBsaXN0ZW5lci5waGFzZSBpcyBmb3IgdHJpZ2dlciBhbmltYXRpb24gY2FsbGJhY2tzXG4gICAgICAvLyBAQGxpc3RlbmVyIGlzIGZvciBhbmltYXRpb24gYnVpbGRlciBjYWxsYmFja3NcbiAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSAhPSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICAgIFtuYW1lLCBwaGFzZV0gPSBwYXJzZVRyaWdnZXJDYWxsYmFja05hbWUobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbmdpbmUubGlzdGVuKHRoaXMubmFtZXNwYWNlSWQsIGVsZW1lbnQsIG5hbWUsIHBoYXNlLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50SWQgPSAoZXZlbnQgYXMgYW55KVsnX2RhdGEnXSB8fCAtMTtcbiAgICAgICAgdGhpcy5mYWN0b3J5LnNjaGVkdWxlTGlzdGVuZXJDYWxsYmFjayhjb3VudElkLCBjYWxsYmFjaywgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbGVtZW50RnJvbVRhcmdldCh0YXJnZXQ6ICd3aW5kb3cnIHwgJ2RvY3VtZW50JyB8ICdib2R5JyB8IGFueSk6IGFueSB7XG4gIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgY2FzZSAnYm9keSc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgY2FzZSAnd2luZG93JzpcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUcmlnZ2VyQ2FsbGJhY2tOYW1lKHRyaWdnZXJOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZG90SW5kZXggPSB0cmlnZ2VyTmFtZS5pbmRleE9mKCcuJyk7XG4gIGNvbnN0IHRyaWdnZXIgPSB0cmlnZ2VyTmFtZS5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICBjb25zdCBwaGFzZSA9IHRyaWdnZXJOYW1lLnN1YnN0cihkb3RJbmRleCArIDEpO1xuICByZXR1cm4gW3RyaWdnZXIsIHBoYXNlXTtcbn1cbiJdfQ==