/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
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
        const animationTriggers = /** @type {?} */ (type.data['animation']);
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
        // component does CD when a parent component insted has inserted it
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
    { type: Injectable }
];
/** @nocollapse */
AnimationRendererFactory.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: AnimationEngine },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    AnimationRendererFactory.prototype._currentId;
    /** @type {?} */
    AnimationRendererFactory.prototype._microtaskId;
    /** @type {?} */
    AnimationRendererFactory.prototype._animationCallbacksBuffer;
    /** @type {?} */
    AnimationRendererFactory.prototype._rendererCache;
    /** @type {?} */
    AnimationRendererFactory.prototype._cdRecurDepth;
    /** @type {?} */
    AnimationRendererFactory.prototype.promise;
    /** @type {?} */
    AnimationRendererFactory.prototype.delegate;
    /** @type {?} */
    AnimationRendererFactory.prototype.engine;
    /** @type {?} */
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
        this.destroyNode = this.delegate.destroyNode ? (n) => /** @type {?} */ ((delegate.destroyNode))(n) : null;
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
     * @return {?}
     */
    selectRootElement(selectorOrNode) { return this.delegate.selectRootElement(selectorOrNode); }
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
    /** @type {?} */
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
                this.disableAnimations(el, /** @type {?} */ (value));
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
                const countId = (/** @type {?} */ (event))['_data'] || -1;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBYSxnQkFBZ0IsRUFBcUMsTUFBTSxlQUFlLENBQUM7O0FBRWxILE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDOztBQUM3QixNQUFNLHVCQUF1QixHQUFHLFlBQVksQ0FBQztBQUc3QyxNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7SUFRbkMsWUFDWSxVQUFvQyxNQUF1QixFQUFVLEtBQWE7UUFBbEYsYUFBUSxHQUFSLFFBQVE7UUFBNEIsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFROzBCQVJqRSxDQUFDOzRCQUNDLENBQUM7eUNBQzhCLEVBQUU7OEJBQ3ZDLElBQUksR0FBRyxFQUFvQzs2QkFDNUMsQ0FBQzt1QkFDTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUloRCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxPQUFZLEVBQUUsUUFBbUIsRUFBRSxFQUFFOzs7OztZQUsvRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1QyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDbkQ7U0FDRixDQUFDO0tBQ0g7Ozs7OztJQUVELGNBQWMsQ0FBQyxXQUFnQixFQUFFLElBQW1COztRQUNsRCxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzs7UUFJOUIsTUFBTSxRQUFR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LENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBBTklNQVRJT05fUFJFRklYID0gJ0AnO1xuY29uc3QgRElTQUJMRV9BTklNQVRJT05TX0ZMQUcgPSAnQC5kaXNhYmxlZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSBfY3VycmVudElkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taWNyb3Rhc2tJZDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyOiBbKGU6IGFueSkgPT4gYW55LCBhbnldW10gPSBbXTtcbiAgcHJpdmF0ZSBfcmVuZGVyZXJDYWNoZSA9IG5ldyBNYXA8UmVuZGVyZXIyLCBCYXNlQW5pbWF0aW9uUmVuZGVyZXI+KCk7XG4gIHByaXZhdGUgX2NkUmVjdXJEZXB0aCA9IDA7XG4gIHByaXZhdGUgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKDApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgZW5naW5lLm9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgZGVsZWdhdGU6IFJlbmRlcmVyMikgPT4ge1xuICAgICAgLy8gTm90ZTogaWYgYW4gY29tcG9uZW50IGVsZW1lbnQgaGFzIGEgbGVhdmUgYW5pbWF0aW9uLCBhbmQgdGhlIGNvbXBvbmVudFxuICAgICAgLy8gYSBob3N0IGxlYXZlIGFuaW1hdGlvbiwgdGhlIHZpZXcgZW5naW5lIHdpbGwgY2FsbCBgcmVtb3ZlQ2hpbGRgIGZvciB0aGUgcGFyZW50XG4gICAgICAvLyBjb21wb25lbnQgcmVuZGVyZXIgYXMgd2VsbCBhcyBmb3IgdGhlIGNoaWxkIGNvbXBvbmVudCByZW5kZXJlci5cbiAgICAgIC8vIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBhbHJlYWR5IHJlbW92ZWQgdGhlIGVsZW1lbnQuXG4gICAgICBpZiAoZGVsZWdhdGUgJiYgZGVsZWdhdGUucGFyZW50Tm9kZShlbGVtZW50KSkge1xuICAgICAgICBkZWxlZ2F0ZS5yZW1vdmVDaGlsZChlbGVtZW50LnBhcmVudE5vZGUsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCBFTVBUWV9OQU1FU1BBQ0VfSUQgPSAnJztcblxuICAgIC8vIGNhY2hlIHRoZSBkZWxlZ2F0ZXMgdG8gZmluZCBvdXQgd2hpY2ggY2FjaGVkIGRlbGVnYXRlIGNhblxuICAgIC8vIGJlIHVzZWQgYnkgd2hpY2ggY2FjaGVkIHJlbmRlcmVyXG4gICAgY29uc3QgZGVsZWdhdGUgPSB0aGlzLmRlbGVnYXRlLmNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50LCB0eXBlKTtcbiAgICBpZiAoIWhvc3RFbGVtZW50IHx8ICF0eXBlIHx8ICF0eXBlLmRhdGEgfHwgIXR5cGUuZGF0YVsnYW5pbWF0aW9uJ10pIHtcbiAgICAgIGxldCByZW5kZXJlcjogQmFzZUFuaW1hdGlvblJlbmRlcmVyfHVuZGVmaW5lZCA9IHRoaXMuX3JlbmRlcmVyQ2FjaGUuZ2V0KGRlbGVnYXRlKTtcbiAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIgPSBuZXcgQmFzZUFuaW1hdGlvblJlbmRlcmVyKEVNUFRZX05BTUVTUEFDRV9JRCwgZGVsZWdhdGUsIHRoaXMuZW5naW5lKTtcbiAgICAgICAgLy8gb25seSBjYWNoZSB0aGlzIHJlc3VsdCB3aGVuIHRoZSBiYXNlIHJlbmRlcmVyIGlzIHVzZWRcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJDYWNoZS5zZXQoZGVsZWdhdGUsIHJlbmRlcmVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRJZCA9IHR5cGUuaWQ7XG4gICAgY29uc3QgbmFtZXNwYWNlSWQgPSB0eXBlLmlkICsgJy0nICsgdGhpcy5fY3VycmVudElkO1xuICAgIHRoaXMuX2N1cnJlbnRJZCsrO1xuXG4gICAgdGhpcy5lbmdpbmUucmVnaXN0ZXIobmFtZXNwYWNlSWQsIGhvc3RFbGVtZW50KTtcbiAgICBjb25zdCBhbmltYXRpb25UcmlnZ2VycyA9IHR5cGUuZGF0YVsnYW5pbWF0aW9uJ10gYXMgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhW107XG4gICAgYW5pbWF0aW9uVHJpZ2dlcnMuZm9yRWFjaChcbiAgICAgICAgdHJpZ2dlciA9PiB0aGlzLmVuZ2luZS5yZWdpc3RlclRyaWdnZXIoXG4gICAgICAgICAgICBjb21wb25lbnRJZCwgbmFtZXNwYWNlSWQsIGhvc3RFbGVtZW50LCB0cmlnZ2VyLm5hbWUsIHRyaWdnZXIpKTtcbiAgICByZXR1cm4gbmV3IEFuaW1hdGlvblJlbmRlcmVyKHRoaXMsIG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICB9XG5cbiAgYmVnaW4oKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoKys7XG4gICAgaWYgKHRoaXMuZGVsZWdhdGUuYmVnaW4pIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY2hlZHVsZUNvdW50VGFzaygpIHtcbiAgICAvLyBhbHdheXMgdXNlIHByb21pc2UgdG8gc2NoZWR1bGUgbWljcm90YXNrIGluc3RlYWQgb2YgdXNlIFpvbmVcbiAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB7IHRoaXMuX21pY3JvdGFza0lkKys7IH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnQ6IG51bWJlciwgZm46IChlOiBhbnkpID0+IGFueSwgZGF0YTogYW55KSB7XG4gICAgaWYgKGNvdW50ID49IDAgJiYgY291bnQgPCB0aGlzLl9taWNyb3Rhc2tJZCkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gZm4oZGF0YSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5mb3JFYWNoKHR1cGxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtmbiwgZGF0YV0gPSB0dXBsZTtcbiAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlciA9IFtdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5wdXNoKFtmbiwgZGF0YV0pO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIHRoaXMuX2NkUmVjdXJEZXB0aC0tO1xuXG4gICAgLy8gdGhpcyBpcyB0byBwcmV2ZW50IGFuaW1hdGlvbnMgZnJvbSBydW5uaW5nIHR3aWNlIHdoZW4gYW4gaW5uZXJcbiAgICAvLyBjb21wb25lbnQgZG9lcyBDRCB3aGVuIGEgcGFyZW50IGNvbXBvbmVudCBpbnN0ZWQgaGFzIGluc2VydGVkIGl0XG4gICAgaWYgKHRoaXMuX2NkUmVjdXJEZXB0aCA9PSAwKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVDb3VudFRhc2soKTtcbiAgICAgICAgdGhpcy5lbmdpbmUuZmx1c2godGhpcy5fbWljcm90YXNrSWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlbGVnYXRlLmVuZCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5lbmQoKTtcbiAgICB9XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4geyByZXR1cm4gdGhpcy5lbmdpbmUud2hlblJlbmRlcmluZ0RvbmUoKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUFuaW1hdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgbmFtZXNwYWNlSWQ6IHN0cmluZywgcHVibGljIGRlbGVnYXRlOiBSZW5kZXJlcjIsIHB1YmxpYyBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHRoaXMuZGVzdHJveU5vZGUgPSB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlID8gKG4pID0+IGRlbGVnYXRlLmRlc3Ryb3lOb2RlICEobikgOiBudWxsO1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7IHJldHVybiB0aGlzLmRlbGVnYXRlLmRhdGE7IH1cblxuICBkZXN0cm95Tm9kZTogKChuOiBhbnkpID0+IHZvaWQpfG51bGw7XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmVuZ2luZS5kZXN0cm95KHRoaXMubmFtZXNwYWNlSWQsIHRoaXMuZGVsZWdhdGUpO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZykgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTsgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZykgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVUZXh0KHZhbHVlKTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTtcbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCBmYWxzZSk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmluc2VydEJlZm9yZShwYXJlbnQsIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgdGhpcy5lbmdpbmUub25JbnNlcnQodGhpcy5uYW1lc3BhY2VJZCwgbmV3Q2hpbGQsIHBhcmVudCwgdHJ1ZSk7XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZW5naW5lLm9uUmVtb3ZlKHRoaXMubmFtZXNwYWNlSWQsIG9sZENoaWxkLCB0aGlzLmRlbGVnYXRlKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBhbnkpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGUpOyB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpIHsgcmV0dXJuIHRoaXMuZGVsZWdhdGUucGFyZW50Tm9kZShub2RlKTsgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSkgeyByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpOyB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCAmJiBuYW1lID09IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHKSB7XG4gICAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsLCAhIXZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKG5vZGUsIHZhbHVlKTsgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5lbmdpbmUuZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudCwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlciBleHRlbmRzIEJhc2VBbmltYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGZhY3Rvcnk6IEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSwgbmFtZXNwYWNlSWQ6IHN0cmluZywgZGVsZWdhdGU6IFJlbmRlcmVyMixcbiAgICAgIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lKSB7XG4gICAgc3VwZXIobmFtZXNwYWNlSWQsIGRlbGVnYXRlLCBlbmdpbmUpO1xuICAgIHRoaXMubmFtZXNwYWNlSWQgPSBuYW1lc3BhY2VJZDtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMSkgPT0gJy4nICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhdmFsdWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsIHZhbHVlIGFzIGJvb2xlYW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmdpbmUucHJvY2Vzcyh0aGlzLm5hbWVzcGFjZUlkLCBlbCwgbmFtZS5zdWJzdHIoMSksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTpcbiAgICAgICgpID0+IHZvaWQge1xuICAgIGlmIChldmVudE5hbWUuY2hhckF0KDApID09IEFOSU1BVElPTl9QUkVGSVgpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXNvbHZlRWxlbWVudEZyb21UYXJnZXQodGFyZ2V0KTtcbiAgICAgIGxldCBuYW1lID0gZXZlbnROYW1lLnN1YnN0cigxKTtcbiAgICAgIGxldCBwaGFzZSA9ICcnO1xuICAgICAgLy8gQGxpc3RlbmVyLnBoYXNlIGlzIGZvciB0cmlnZ2VyIGFuaW1hdGlvbiBjYWxsYmFja3NcbiAgICAgIC8vIEBAbGlzdGVuZXIgaXMgZm9yIGFuaW1hdGlvbiBidWlsZGVyIGNhbGxiYWNrc1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDApICE9IEFOSU1BVElPTl9QUkVGSVgpIHtcbiAgICAgICAgW25hbWUsIHBoYXNlXSA9IHBhcnNlVHJpZ2dlckNhbGxiYWNrTmFtZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVuZ2luZS5saXN0ZW4odGhpcy5uYW1lc3BhY2VJZCwgZWxlbWVudCwgbmFtZSwgcGhhc2UsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY291bnRJZCA9IChldmVudCBhcyBhbnkpWydfZGF0YSddIHx8IC0xO1xuICAgICAgICB0aGlzLmZhY3Rvcnkuc2NoZWR1bGVMaXN0ZW5lckNhbGxiYWNrKGNvdW50SWQsIGNhbGxiYWNrLCBldmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVsZW1lbnRGcm9tVGFyZ2V0KHRhcmdldDogJ3dpbmRvdycgfCAnZG9jdW1lbnQnIHwgJ2JvZHknIHwgYW55KTogYW55IHtcbiAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICBjYXNlICdib2R5JzpcbiAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVRyaWdnZXJDYWxsYmFja05hbWUodHJpZ2dlck5hbWU6IHN0cmluZykge1xuICBjb25zdCBkb3RJbmRleCA9IHRyaWdnZXJOYW1lLmluZGV4T2YoJy4nKTtcbiAgY29uc3QgdHJpZ2dlciA9IHRyaWdnZXJOYW1lLnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG4gIGNvbnN0IHBoYXNlID0gdHJpZ2dlck5hbWUuc3Vic3RyKGRvdEluZGV4ICsgMSk7XG4gIHJldHVybiBbdHJpZ2dlciwgcGhhc2VdO1xufVxuIl19