/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/animations/src/animation_renderer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
/** @type {?} */
const ANIMATION_PREFIX = '@';
/** @type {?} */
const DISABLE_ANIMATIONS_FLAG = '@.disabled';
/**
 * @record
 */
function RecursiveAnimationTriggerMetadata() { }
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
        engine.onRemovalComplete = (/**
         * @param {?} element
         * @param {?} delegate
         * @return {?}
         */
        (element, delegate) => {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        });
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
        const registerTrigger = (/**
         * @param {?} trigger
         * @return {?}
         */
        (trigger) => {
            if (Array.isArray(trigger)) {
                trigger.forEach(registerTrigger);
            }
            else {
                this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
            }
        });
        /** @type {?} */
        const animationTriggers = (/** @type {?} */ (type.data['animation']));
        animationTriggers.forEach(registerTrigger);
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
        this.promise.then((/**
         * @return {?}
         */
        () => { this._microtaskId++; }));
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
            this._zone.run((/**
             * @return {?}
             */
            () => fn(data)));
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then((/**
             * @return {?}
             */
            () => {
                this._zone.run((/**
                 * @return {?}
                 */
                () => {
                    this._animationCallbacksBuffer.forEach((/**
                     * @param {?} tuple
                     * @return {?}
                     */
                    tuple => {
                        const [fn, data] = tuple;
                        fn(data);
                    }));
                    this._animationCallbacksBuffer = [];
                }));
            }));
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
            this._zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this._scheduleCountTask();
                this.engine.flush(this._microtaskId);
            }));
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
/** @nocollapse */ AnimationRendererFactory.ɵfac = function AnimationRendererFactory_Factory(t) { return new (t || AnimationRendererFactory)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ɵAnimationEngine), i0.ɵɵinject(i0.NgZone)); };
/** @nocollapse */ AnimationRendererFactory.ɵprov = i0.ɵɵdefineInjectable({ token: AnimationRendererFactory, factory: AnimationRendererFactory.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AnimationRendererFactory, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }, { type: i1.ɵAnimationEngine }, { type: i0.NgZone }]; }, null); })();
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
        this.destroyNode = this.delegate.destroyNode ? (/**
         * @param {?} n
         * @return {?}
         */
        (n) => (/** @type {?} */ (delegate.destroyNode))(n)) : null;
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
     * @param {?} isHostElement
     * @return {?}
     */
    removeChild(parent, oldChild, isHostElement) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
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
            return this.engine.listen(this.namespaceId, element, name, phase, (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                /** @type {?} */
                const countId = ((/** @type {?} */ (event)))['_data'] || -1;
                this.factory.scheduleListenerCallback(countId, callback, event);
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsZ0JBQWdCLElBQUksZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDOzs7O01BRTVHLGdCQUFnQixHQUFHLEdBQUc7O01BQ3RCLHVCQUF1QixHQUFHLFlBQVk7Ozs7QUFNNUMsZ0RBQTRGO0FBRzVGLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQVFuQyxZQUNZLFFBQTBCLEVBQVUsTUFBdUIsRUFBVSxLQUFhO1FBQWxGLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUnRGLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsOEJBQXlCLEdBQTZCLEVBQUUsQ0FBQztRQUN6RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBQzdELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBaUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlqRCxNQUFNLENBQUMsaUJBQWlCOzs7OztRQUFHLENBQUMsT0FBWSxFQUFFLFFBQW1CLEVBQUUsRUFBRTtZQUMvRCx5RUFBeUU7WUFDekUsaUZBQWlGO1lBQ2pGLGtFQUFrRTtZQUNsRSxpRUFBaUU7WUFDakUsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUMsUUFBUSxDQUFD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LENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBBTklNQVRJT05fUFJFRklYID0gJ0AnO1xuY29uc3QgRElTQUJMRV9BTklNQVRJT05TX0ZMQUcgPSAnQC5kaXNhYmxlZCc7XG5cbi8vIERlZmluZSBhIHJlY3Vyc2l2ZSB0eXBlIHRvIGFsbG93IGZvciBuZXN0ZWQgYXJyYXlzIG9mIGBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFgLiBOb3RlIHRoYXQgYW5cbi8vIGludGVyZmFjZSBkZWNsYXJhdGlvbiBpcyB1c2VkIGFzIFR5cGVTY3JpcHQgcHJpb3IgdG8gMy43IGRvZXMgbm90IHN1cHBvcnQgcmVjdXJzaXZlIHR5cGVcbi8vIHJlZmVyZW5jZXMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC8zMzA1MCBmb3IgZGV0YWlscy5cbnR5cGUgTmVzdGVkQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHwgUmVjdXJzaXZlQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuaW50ZXJmYWNlIFJlY3Vyc2l2ZUFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFycmF5PE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YT4ge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9jdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pY3JvdGFza0lkOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9hbmltYXRpb25DYWxsYmFja3NCdWZmZXI6IFsoZTogYW55KSA9PiBhbnksIGFueV1bXSA9IFtdO1xuICBwcml2YXRlIF9yZW5kZXJlckNhY2hlID0gbmV3IE1hcDxSZW5kZXJlcjIsIEJhc2VBbmltYXRpb25SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSBfY2RSZWN1ckRlcHRoID0gMDtcbiAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICBlbmdpbmUub25SZW1vdmFsQ29tcGxldGUgPSAoZWxlbWVudDogYW55LCBkZWxlZ2F0ZTogUmVuZGVyZXIyKSA9PiB7XG4gICAgICAvLyBOb3RlOiBpZiBhbiBjb21wb25lbnQgZWxlbWVudCBoYXMgYSBsZWF2ZSBhbmltYXRpb24sIGFuZCB0aGUgY29tcG9uZW50XG4gICAgICAvLyBhIGhvc3QgbGVhdmUgYW5pbWF0aW9uLCB0aGUgdmlldyBlbmdpbmUgd2lsbCBjYWxsIGByZW1vdmVDaGlsZGAgZm9yIHRoZSBwYXJlbnRcbiAgICAgIC8vIGNvbXBvbmVudCByZW5kZXJlciBhcyB3ZWxsIGFzIGZvciB0aGUgY2hpbGQgY29tcG9uZW50IHJlbmRlcmVyLlxuICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFscmVhZHkgcmVtb3ZlZCB0aGUgZWxlbWVudC5cbiAgICAgIGlmIChkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5wYXJlbnROb2RlKGVsZW1lbnQpKSB7XG4gICAgICAgIGRlbGVnYXRlLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50Tm9kZSwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IEVNUFRZX05BTUVTUEFDRV9JRCA9ICcnO1xuXG4gICAgLy8gY2FjaGUgdGhlIGRlbGVnYXRlcyB0byBmaW5kIG91dCB3aGljaCBjYWNoZWQgZGVsZWdhdGUgY2FuXG4gICAgLy8gYmUgdXNlZCBieSB3aGljaCBjYWNoZWQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHR5cGUpO1xuICAgIGlmICghaG9zdEVsZW1lbnQgfHwgIXR5cGUgfHwgIXR5cGUuZGF0YSB8fCAhdHlwZS5kYXRhWydhbmltYXRpb24nXSkge1xuICAgICAgbGV0IHJlbmRlcmVyOiBCYXNlQW5pbWF0aW9uUmVuZGVyZXJ8dW5kZWZpbmVkID0gdGhpcy5fcmVuZGVyZXJDYWNoZS5nZXQoZGVsZWdhdGUpO1xuICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlciA9IG5ldyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIoRU1QVFlfTkFNRVNQQUNFX0lELCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICAgICAgICAvLyBvbmx5IGNhY2hlIHRoaXMgcmVzdWx0IHdoZW4gdGhlIGJhc2UgcmVuZGVyZXIgaXMgdXNlZFxuICAgICAgICB0aGlzLl9yZW5kZXJlckNhY2hlLnNldChkZWxlZ2F0ZSwgcmVuZGVyZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gdHlwZS5pZDtcbiAgICBjb25zdCBuYW1lc3BhY2VJZCA9IHR5cGUuaWQgKyAnLScgKyB0aGlzLl9jdXJyZW50SWQ7XG4gICAgdGhpcy5fY3VycmVudElkKys7XG5cbiAgICB0aGlzLmVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJUcmlnZ2VyID0gKHRyaWdnZXI6IE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodHJpZ2dlcikpIHtcbiAgICAgICAgdHJpZ2dlci5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuZ2luZS5yZWdpc3RlclRyaWdnZXIoY29tcG9uZW50SWQsIG5hbWVzcGFjZUlkLCBob3N0RWxlbWVudCwgdHJpZ2dlci5uYW1lLCB0cmlnZ2VyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvblRyaWdnZXJzID0gdHlwZS5kYXRhWydhbmltYXRpb24nXSBhcyBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFbXTtcbiAgICBhbmltYXRpb25UcmlnZ2Vycy5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG5cbiAgICByZXR1cm4gbmV3IEFuaW1hdGlvblJlbmRlcmVyKHRoaXMsIG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICB9XG5cbiAgYmVnaW4oKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoKys7XG4gICAgaWYgKHRoaXMuZGVsZWdhdGUuYmVnaW4pIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY2hlZHVsZUNvdW50VGFzaygpIHtcbiAgICAvLyBhbHdheXMgdXNlIHByb21pc2UgdG8gc2NoZWR1bGUgbWljcm90YXNrIGluc3RlYWQgb2YgdXNlIFpvbmVcbiAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB7IHRoaXMuX21pY3JvdGFza0lkKys7IH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnQ6IG51bWJlciwgZm46IChlOiBhbnkpID0+IGFueSwgZGF0YTogYW55KSB7XG4gICAgaWYgKGNvdW50ID49IDAgJiYgY291bnQgPCB0aGlzLl9taWNyb3Rhc2tJZCkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gZm4oZGF0YSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5mb3JFYWNoKHR1cGxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtmbiwgZGF0YV0gPSB0dXBsZTtcbiAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlciA9IFtdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5wdXNoKFtmbiwgZGF0YV0pO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIHRoaXMuX2NkUmVjdXJEZXB0aC0tO1xuXG4gICAgLy8gdGhpcyBpcyB0byBwcmV2ZW50IGFuaW1hdGlvbnMgZnJvbSBydW5uaW5nIHR3aWNlIHdoZW4gYW4gaW5uZXJcbiAgICAvLyBjb21wb25lbnQgZG9lcyBDRCB3aGVuIGEgcGFyZW50IGNvbXBvbmVudCBpbnN0ZWFkIGhhcyBpbnNlcnRlZCBpdFxuICAgIGlmICh0aGlzLl9jZFJlY3VyRGVwdGggPT0gMCkge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlQ291bnRUYXNrKCk7XG4gICAgICAgIHRoaXMuZW5naW5lLmZsdXNoKHRoaXMuX21pY3JvdGFza0lkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbmQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmUoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRoaXMuZW5naW5lLndoZW5SZW5kZXJpbmdEb25lKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VBbmltYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIG5hbWVzcGFjZUlkOiBzdHJpbmcsIHB1YmxpYyBkZWxlZ2F0ZTogUmVuZGVyZXIyLCBwdWJsaWMgZW5naW5lOiBBbmltYXRpb25FbmdpbmUpIHtcbiAgICB0aGlzLmRlc3Ryb3lOb2RlID0gdGhpcy5kZWxlZ2F0ZS5kZXN0cm95Tm9kZSA/IChuKSA9PiBkZWxlZ2F0ZS5kZXN0cm95Tm9kZSAhKG4pIDogbnVsbDtcbiAgfVxuXG4gIGdldCBkYXRhKCkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhOyB9XG5cbiAgZGVzdHJveU5vZGU6ICgobjogYW55KSA9PiB2b2lkKXxudWxsO1xuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUuZGVzdHJveSh0aGlzLm5hbWVzcGFjZUlkLCB0aGlzLmRlbGVnYXRlKTtcbiAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7IH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50LCBuZXdDaGlsZCk7XG4gICAgdGhpcy5lbmdpbmUub25JbnNlcnQodGhpcy5uYW1lc3BhY2VJZCwgbmV3Q2hpbGQsIHBhcmVudCwgZmFsc2UpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5pbnNlcnRCZWZvcmUocGFyZW50LCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIHRoaXMuZW5naW5lLm9uSW5zZXJ0KHRoaXMubmFtZXNwYWNlSWQsIG5ld0NoaWxkLCBwYXJlbnQsIHRydWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmVuZ2luZS5vblJlbW92ZSh0aGlzLm5hbWVzcGFjZUlkLCBvbGRDaGlsZCwgdGhpcy5kZWxlZ2F0ZSwgaXNIb3N0RWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGUsIHByZXNlcnZlQ29udGVudCk7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpOyB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLm5leHRTaWJsaW5nKG5vZGUpOyB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5kZWxlZ2F0ZS5hZGRDbGFzcyhlbCwgbmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7IH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsICEhdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuZGVsZWdhdGUuc2V0VmFsdWUobm9kZSwgdmFsdWUpOyB9XG5cbiAgbGlzdGVuKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQ6IGFueSwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmVuZ2luZS5kaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblJlbmRlcmVyIGV4dGVuZHMgQmFzZUFuaW1hdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZmFjdG9yeTogQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LCBuYW1lc3BhY2VJZDogc3RyaW5nLCBkZWxlZ2F0ZTogUmVuZGVyZXIyLFxuICAgICAgZW5naW5lOiBBbmltYXRpb25FbmdpbmUpIHtcbiAgICBzdXBlcihuYW1lc3BhY2VJZCwgZGVsZWdhdGUsIGVuZ2luZSk7XG4gICAgdGhpcy5uYW1lc3BhY2VJZCA9IG5hbWVzcGFjZUlkO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKG5hbWUuY2hhckF0KDApID09IEFOSU1BVElPTl9QUkVGSVgpIHtcbiAgICAgIGlmIChuYW1lLmNoYXJBdCgxKSA9PSAnLicgJiYgbmFtZSA9PSBESVNBQkxFX0FOSU1BVElPTlNfRkxBRykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSB1bmRlZmluZWQgPyB0cnVlIDogISF2YWx1ZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9ucyhlbCwgdmFsdWUgYXMgYm9vbGVhbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuZ2luZS5wcm9jZXNzKHRoaXMubmFtZXNwYWNlSWQsIGVsLCBuYW1lLnN1YnN0cigxKSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBhbnkpOlxuICAgICAgKCkgPT4gdm9pZCB7XG4gICAgaWYgKGV2ZW50TmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHJlc29sdmVFbGVtZW50RnJvbVRhcmdldCh0YXJnZXQpO1xuICAgICAgbGV0IG5hbWUgPSBldmVudE5hbWUuc3Vic3RyKDEpO1xuICAgICAgbGV0IHBoYXNlID0gJyc7XG4gICAgICAvLyBAbGlzdGVuZXIucGhhc2UgaXMgZm9yIHRyaWdnZXIgYW5pbWF0aW9uIGNhbGxiYWNrc1xuICAgICAgLy8gQEBsaXN0ZW5lciBpcyBmb3IgYW5pbWF0aW9uIGJ1aWxkZXIgY2FsbGJhY2tzXG4gICAgICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgICBbbmFtZSwgcGhhc2VdID0gcGFyc2VUcmlnZ2VyQ2FsbGJhY2tOYW1lKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZW5naW5lLmxpc3Rlbih0aGlzLm5hbWVzcGFjZUlkLCBlbGVtZW50LCBuYW1lLCBwaGFzZSwgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudElkID0gKGV2ZW50IGFzIGFueSlbJ19kYXRhJ10gfHwgLTE7XG4gICAgICAgIHRoaXMuZmFjdG9yeS5zY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnRJZCwgY2FsbGJhY2ssIGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlRWxlbWVudEZyb21UYXJnZXQodGFyZ2V0OiAnd2luZG93JyB8ICdkb2N1bWVudCcgfCAnYm9keScgfCBhbnkpOiBhbnkge1xuICBzd2l0Y2ggKHRhcmdldCkge1xuICAgIGNhc2UgJ2JvZHknOlxuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHJpZ2dlckNhbGxiYWNrTmFtZSh0cmlnZ2VyTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRvdEluZGV4ID0gdHJpZ2dlck5hbWUuaW5kZXhPZignLicpO1xuICBjb25zdCB0cmlnZ2VyID0gdHJpZ2dlck5hbWUuc3Vic3RyaW5nKDAsIGRvdEluZGV4KTtcbiAgY29uc3QgcGhhc2UgPSB0cmlnZ2VyTmFtZS5zdWJzdHIoZG90SW5kZXggKyAxKTtcbiAgcmV0dXJuIFt0cmlnZ2VyLCBwaGFzZV07XG59XG4iXX0=