/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
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
    { type: Injectable }
];
/** @nocollapse */
AnimationRendererFactory.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: AnimationEngine },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBYSxnQkFBZ0IsRUFBcUMsTUFBTSxlQUFlLENBQUM7O01BRTVHLGdCQUFnQixHQUFHLEdBQUc7O01BQ3RCLHVCQUF1QixHQUFHLFlBQVk7Ozs7QUFNNUMsZ0RBQTRGO0FBRzVGLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQVFuQyxZQUNZLFFBQTBCLEVBQVUsTUFBdUIsRUFBVSxLQUFhO1FBQWxGLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUnRGLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsOEJBQXlCLEdBQTZCLEVBQUUsQ0FBQztRQUN6RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBQzdELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBaUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlqRCxNQUFNLENBQUMsaUJBQWlCOzs7OztRQUFHLENBQUMsT0FBWSxFQUFFLFFBQW1CLEVBQUUsRUFBRTtZQUMvRCx5RUFBeUU7WUFDekUsaUZBQWlGO1lBQ2pGLGtFQUFrRTtZQUNsRSxpRUFBaUU7WUFDakUsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUMsUUFBUSxDQUFDLFdB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IEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHvJtUFuaW1hdGlvbkVuZ2luZSBhcyBBbmltYXRpb25FbmdpbmV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge0luamVjdGFibGUsIE5nWm9uZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgQU5JTUFUSU9OX1BSRUZJWCA9ICdAJztcbmNvbnN0IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHID0gJ0AuZGlzYWJsZWQnO1xuXG4vLyBEZWZpbmUgYSByZWN1cnNpdmUgdHlwZSB0byBhbGxvdyBmb3IgbmVzdGVkIGFycmF5cyBvZiBgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhYC4gTm90ZSB0aGF0IGFuXG4vLyBpbnRlcmZhY2UgZGVjbGFyYXRpb24gaXMgdXNlZCBhcyBUeXBlU2NyaXB0IHByaW9yIHRvIDMuNyBkb2VzIG5vdCBzdXBwb3J0IHJlY3Vyc2l2ZSB0eXBlXG4vLyByZWZlcmVuY2VzLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L3B1bGwvMzMwNTAgZm9yIGRldGFpbHMuXG50eXBlIE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSA9IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSB8IFJlY3Vyc2l2ZUFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbmludGVyZmFjZSBSZWN1cnNpdmVBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgZXh0ZW5kcyBBcnJheTxOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE+IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSBfY3VycmVudElkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taWNyb3Rhc2tJZDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyOiBbKGU6IGFueSkgPT4gYW55LCBhbnldW10gPSBbXTtcbiAgcHJpdmF0ZSBfcmVuZGVyZXJDYWNoZSA9IG5ldyBNYXA8UmVuZGVyZXIyLCBCYXNlQW5pbWF0aW9uUmVuZGVyZXI+KCk7XG4gIHByaXZhdGUgX2NkUmVjdXJEZXB0aCA9IDA7XG4gIHByaXZhdGUgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKDApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgZW5naW5lLm9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgZGVsZWdhdGU6IFJlbmRlcmVyMikgPT4ge1xuICAgICAgLy8gTm90ZTogaWYgYW4gY29tcG9uZW50IGVsZW1lbnQgaGFzIGEgbGVhdmUgYW5pbWF0aW9uLCBhbmQgdGhlIGNvbXBvbmVudFxuICAgICAgLy8gYSBob3N0IGxlYXZlIGFuaW1hdGlvbiwgdGhlIHZpZXcgZW5naW5lIHdpbGwgY2FsbCBgcmVtb3ZlQ2hpbGRgIGZvciB0aGUgcGFyZW50XG4gICAgICAvLyBjb21wb25lbnQgcmVuZGVyZXIgYXMgd2VsbCBhcyBmb3IgdGhlIGNoaWxkIGNvbXBvbmVudCByZW5kZXJlci5cbiAgICAgIC8vIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBhbHJlYWR5IHJlbW92ZWQgdGhlIGVsZW1lbnQuXG4gICAgICBpZiAoZGVsZWdhdGUgJiYgZGVsZWdhdGUucGFyZW50Tm9kZShlbGVtZW50KSkge1xuICAgICAgICBkZWxlZ2F0ZS5yZW1vdmVDaGlsZChlbGVtZW50LnBhcmVudE5vZGUsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCBFTVBUWV9OQU1FU1BBQ0VfSUQgPSAnJztcblxuICAgIC8vIGNhY2hlIHRoZSBkZWxlZ2F0ZXMgdG8gZmluZCBvdXQgd2hpY2ggY2FjaGVkIGRlbGVnYXRlIGNhblxuICAgIC8vIGJlIHVzZWQgYnkgd2hpY2ggY2FjaGVkIHJlbmRlcmVyXG4gICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlLmNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50LCB0eXBlKTtcbiAgICBpZiAoIWhvc3RFbGVtZW50IHx8ICF0eXBlIHx8ICF0eXBlLmRhdGEgfHwgIXR5cGUuZGF0YVsnYW5pbWF0aW9uJ10pIHtcbiAgICAgIGxldCByZW5kZXJlcjogQmFzZUFuaW1hdGlvblJlbmRlcmVyfHVuZGVmaW5lZCA9IHRoaXMuX3JlbmRlcmVyQ2FjaGUuZ2V0KGRlbGVnYXRlKTtcbiAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIgPSBuZXcgQmFzZUFuaW1hdGlvblJlbmRlcmVyKEVNUFRZX05BTUVTUEFDRV9JRCwgZGVsZWdhdGUsIHRoaXMuZW5naW5lKTtcbiAgICAgICAgLy8gb25seSBjYWNoZSB0aGlzIHJlc3VsdCB3aGVuIHRoZSBiYXNlIHJlbmRlcmVyIGlzIHVzZWRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJDYWNoZS5zZXQoZGVsZWdhdGUsIHJlbmRlcmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRJZCA9IHR5cGUuaWQ7XG4gICAgY29uc3QgbmFtZXNwYWNlSWQgPSB0eXBlLmlkICsgJy0nICsgdGhpcy5fY3VycmVudElkO1xuICAgIHRoaXMuX2N1cnJlbnRJZCsrO1xuXG4gICAgdGhpcy5lbmdpbmUucmVnaXN0ZXIobmFtZXNwYWNlSWQsIGhvc3RFbGVtZW50KTtcblxuICAgIGNvbnN0IHJlZ2lzdGVyVHJpZ2dlciA9ICh0cmlnZ2VyOiBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRyaWdnZXIpKSB7XG4gICAgICAgIHRyaWdnZXIuZm9yRWFjaChyZWdpc3RlclRyaWdnZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmdpbmUucmVnaXN0ZXJUcmlnZ2VyKGNvbXBvbmVudElkLCBuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQsIHRyaWdnZXIubmFtZSwgdHJpZ2dlcik7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBhbmltYXRpb25UcmlnZ2VycyA9IHR5cGUuZGF0YVsnYW5pbWF0aW9uJ10gYXMgTmVzdGVkQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhW107XG4gICAgYW5pbWF0aW9uVHJpZ2dlcnMuZm9yRWFjaChyZWdpc3RlclRyaWdnZXIpO1xuXG4gICAgcmV0dXJuIG5ldyBBbmltYXRpb25SZW5kZXJlcih0aGlzLCBuYW1lc3BhY2VJZCwgZGVsZWdhdGUsIHRoaXMuZW5naW5lKTtcbiAgfVxuXG4gIGJlZ2luKCkge1xuICAgIHRoaXMuX2NkUmVjdXJEZXB0aCsrO1xuICAgIGlmICh0aGlzLmRlbGVnYXRlLmJlZ2luKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmJlZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2NoZWR1bGVDb3VudFRhc2soKSB7XG4gICAgLy8gYWx3YXlzIHVzZSBwcm9taXNlIHRvIHNjaGVkdWxlIG1pY3JvdGFzayBpbnN0ZWFkIG9mIHVzZSBab25lXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oKCkgPT4geyB0aGlzLl9taWNyb3Rhc2tJZCsrOyB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc2NoZWR1bGVMaXN0ZW5lckNhbGxiYWNrKGNvdW50OiBudW1iZXIsIGZuOiAoZTogYW55KSA9PiBhbnksIGRhdGE6IGFueSkge1xuICAgIGlmIChjb3VudCA+PSAwICYmIGNvdW50IDwgdGhpcy5fbWljcm90YXNrSWQpIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IGZuKGRhdGEpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyLmxlbmd0aCA9PSAwKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIuZm9yRWFjaCh0dXBsZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbZm4sIGRhdGFdID0gdHVwbGU7XG4gICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIucHVzaChbZm4sIGRhdGFdKTtcbiAgfVxuXG4gIGVuZCgpIHtcbiAgICB0aGlzLl9jZFJlY3VyRGVwdGgtLTtcblxuICAgIC8vIHRoaXMgaXMgdG8gcHJldmVudCBhbmltYXRpb25zIGZyb20gcnVubmluZyB0d2ljZSB3aGVuIGFuIGlubmVyXG4gICAgLy8gY29tcG9uZW50IGRvZXMgQ0Qgd2hlbiBhIHBhcmVudCBjb21wb25lbnQgaW5zdGVhZCBoYXMgaW5zZXJ0ZWQgaXRcbiAgICBpZiAodGhpcy5fY2RSZWN1ckRlcHRoID09IDApIHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zY2hlZHVsZUNvdW50VGFzaygpO1xuICAgICAgICB0aGlzLmVuZ2luZS5mbHVzaCh0aGlzLl9taWNyb3Rhc2tJZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGVsZWdhdGUuZW5kKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLmVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIHdoZW5SZW5kZXJpbmdEb25lKCk6IFByb21pc2U8YW55PiB7IHJldHVybiB0aGlzLmVuZ2luZS53aGVuUmVuZGVyaW5nRG9uZSgpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCBuYW1lc3BhY2VJZDogc3RyaW5nLCBwdWJsaWMgZGVsZWdhdGU6IFJlbmRlcmVyMiwgcHVibGljIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lKSB7XG4gICAgdGhpcy5kZXN0cm95Tm9kZSA9IHRoaXMuZGVsZWdhdGUuZGVzdHJveU5vZGUgPyAobikgPT4gZGVsZWdhdGUuZGVzdHJveU5vZGUgIShuKSA6IG51bGw7XG4gIH1cblxuICBnZXQgZGF0YSgpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGF0YTsgfVxuXG4gIGRlc3Ryb3lOb2RlOiAoKG46IGFueSkgPT4gdm9pZCl8bnVsbDtcblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZW5naW5lLmRlc3Ryb3kodGhpcy5uYW1lc3BhY2VJZCwgdGhpcy5kZWxlZ2F0ZSk7XG4gICAgdGhpcy5kZWxlZ2F0ZS5kZXN0cm95KCk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGx8dW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlRWxlbWVudChuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUNvbW1lbnQodmFsdWUpOyB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZVRleHQodmFsdWUpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpO1xuICAgIHRoaXMuZW5naW5lLm9uSW5zZXJ0KHRoaXMubmFtZXNwYWNlSWQsIG5ld0NoaWxkLCBwYXJlbnQsIGZhbHNlKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCB0cnVlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUub25SZW1vdmUodGhpcy5uYW1lc3BhY2VJZCwgb2xkQ2hpbGQsIHRoaXMuZGVsZWdhdGUsIGlzSG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUucGFyZW50Tm9kZShub2RlKTsgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCAmJiBuYW1lID09IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHKSB7XG4gICAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsLCAhIXZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKG5vZGUsIHZhbHVlKTsgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5lbmdpbmUuZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudCwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlciBleHRlbmRzIEJhc2VBbmltYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGZhY3Rvcnk6IEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSwgbmFtZXNwYWNlSWQ6IHN0cmluZywgZGVsZWdhdGU6IFJlbmRlcmVyMixcbiAgICAgIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lKSB7XG4gICAgc3VwZXIobmFtZXNwYWNlSWQsIGRlbGVnYXRlLCBlbmdpbmUpO1xuICAgIHRoaXMubmFtZXNwYWNlSWQgPSBuYW1lc3BhY2VJZDtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMSkgPT0gJy4nICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhdmFsdWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsIHZhbHVlIGFzIGJvb2xlYW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmdpbmUucHJvY2Vzcyh0aGlzLm5hbWVzcGFjZUlkLCBlbCwgbmFtZS5zdWJzdHIoMSksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTpcbiAgICAgICgpID0+IHZvaWQge1xuICAgIGlmIChldmVudE5hbWUuY2hhckF0KDApID09IEFOSU1BVElPTl9QUkVGSVgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXNvbHZlRWxlbWVudEZyb21UYXJnZXQodGFyZ2V0KTtcbiAgICAgIGxldCBuYW1lID0gZXZlbnROYW1lLnN1YnN0cigxKTtcbiAgICAgIGxldCBwaGFzZSA9ICcnO1xuICAgICAgLy8gQGxpc3RlbmVyLnBoYXNlIGlzIGZvciB0cmlnZ2VyIGFuaW1hdGlvbiBjYWxsYmFja3NcbiAgICAgIC8vIEBAbGlzdGVuZXIgaXMgZm9yIGFuaW1hdGlvbiBidWlsZGVyIGNhbGxiYWNrc1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDApICE9IEFOSU1BVElPTl9QUkVGSVgpIHtcbiAgICAgICAgW25hbWUsIHBoYXNlXSA9IHBhcnNlVHJpZ2dlckNhbGxiYWNrTmFtZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVuZ2luZS5saXN0ZW4odGhpcy5uYW1lc3BhY2VJZCwgZWxlbWVudCwgbmFtZSwgcGhhc2UsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY291bnRJZCA9IChldmVudCBhcyBhbnkpWydfZGF0YSddIHx8IC0xO1xuICAgICAgICB0aGlzLmZhY3Rvcnkuc2NoZWR1bGVMaXN0ZW5lckNhbGxiYWNrKGNvdW50SWQsIGNhbGxiYWNrLCBldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnRGcm9tVGFyZ2V0KHRhcmdldDogJ3dpbmRvdycgfCAnZG9jdW1lbnQnIHwgJ2JvZHknIHwgYW55KTogYW55IHtcbiAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICBjYXNlICdib2R5JzpcbiAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRyaWdnZXJDYWxsYmFja05hbWUodHJpZ2dlck5hbWU6IHN0cmluZykge1xuICBjb25zdCBkb3RJbmRleCA9IHRyaWdnZXJOYW1lLmluZGV4T2YoJy4nKTtcbiAgY29uc3QgdHJpZ2dlciA9IHRyaWdnZXJOYW1lLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gIGNvbnN0IHBoYXNlID0gdHJpZ2dlck5hbWUuc3Vic3RyKGRvdEluZGV4ICsgMSk7XG4gIHJldHVybiBbdHJpZ2dlciwgcGhhc2VdO1xufVxuIl19