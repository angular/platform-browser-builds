/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/animations/src/animation_renderer.ts
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
let AnimationRendererFactory = /** @class */ (() => {
    class AnimationRendererFactory {
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
            () => {
                this._microtaskId++;
            }));
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
        whenRenderingDone() {
            return this.engine.whenRenderingDone();
        }
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
    return AnimationRendererFactory;
})();
export { AnimationRendererFactory };
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
    get data() {
        return this.delegate.data;
    }
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
    createComment(value) {
        return this.delegate.createComment(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) {
        return this.delegate.createText(value);
    }
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
    parentNode(node) {
        return this.delegate.parentNode(node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) {
        return this.delegate.nextSibling(node);
    }
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
    addClass(el, name) {
        this.delegate.addClass(el, name);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) {
        this.delegate.removeClass(el, name);
    }
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
    setValue(node, value) {
        this.delegate.setValue(node, value);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxPQUFPLEVBQUMsZ0JBQWdCLElBQUksZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDaEYsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQWEsZ0JBQWdCLEVBQXFDLE1BQU0sZUFBZSxDQUFDOztNQUU1RyxnQkFBZ0IsR0FBRyxHQUFHOztNQUN0Qix1QkFBdUIsR0FBRyxZQUFZOzs7O0FBTTVDLGdEQUE0RjtBQUU1RjtJQUFBLE1BQ2Esd0JBQXdCOzs7Ozs7UUFRbkMsWUFDWSxRQUEwQixFQUFVLE1BQXVCLEVBQVUsS0FBYTtZQUFsRixhQUFRLEdBQVIsUUFBUSxDQUFrQjtZQUFVLFdBQU0sR0FBTixNQUFNLENBQWlCO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVJ0RixlQUFVLEdBQVcsQ0FBQyxDQUFDO1lBQ3ZCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1lBQ3pCLDhCQUF5QixHQUE2QixFQUFFLENBQUM7WUFDekQsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztZQUM3RCxrQkFBYSxHQUFHLENBQUMsQ0FBQztZQUNsQixZQUFPLEdBQWlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFJakQsTUFBTSxDQUFDLGlCQUFpQjs7Ozs7WUFBRyxDQUFDLE9BQVksRUFBRSxRQUFtQixFQUFFLEVBQUU7Z0JBQy9ELHlFQUF5RTtnQkFDekUsaUZBQWlGO2dCQUNqRixrRUFBa0U7Z0JBQ2xFLGlFQUFpRTtnQkFDakUsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDNUMsUUFBUSxD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QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5jb25zdCBESVNBQkxFX0FOSU1BVElPTlNfRkxBRyA9ICdALmRpc2FibGVkJztcblxuLy8gRGVmaW5lIGEgcmVjdXJzaXZlIHR5cGUgdG8gYWxsb3cgZm9yIG5lc3RlZCBhcnJheXMgb2YgYEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YWAuIE5vdGUgdGhhdCBhblxuLy8gaW50ZXJmYWNlIGRlY2xhcmF0aW9uIGlzIHVzZWQgYXMgVHlwZVNjcmlwdCBwcmlvciB0byAzLjcgZG9lcyBub3Qgc3VwcG9ydCByZWN1cnNpdmUgdHlwZVxuLy8gcmVmZXJlbmNlcywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9wdWxsLzMzMDUwIGZvciBkZXRhaWxzLlxudHlwZSBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGF8UmVjdXJzaXZlQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuaW50ZXJmYWNlIFJlY3Vyc2l2ZUFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFycmF5PE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YT4ge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9jdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pY3JvdGFza0lkOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9hbmltYXRpb25DYWxsYmFja3NCdWZmZXI6IFsoZTogYW55KSA9PiBhbnksIGFueV1bXSA9IFtdO1xuICBwcml2YXRlIF9yZW5kZXJlckNhY2hlID0gbmV3IE1hcDxSZW5kZXJlcjIsIEJhc2VBbmltYXRpb25SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSBfY2RSZWN1ckRlcHRoID0gMDtcbiAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICBlbmdpbmUub25SZW1vdmFsQ29tcGxldGUgPSAoZWxlbWVudDogYW55LCBkZWxlZ2F0ZTogUmVuZGVyZXIyKSA9PiB7XG4gICAgICAvLyBOb3RlOiBpZiBhbiBjb21wb25lbnQgZWxlbWVudCBoYXMgYSBsZWF2ZSBhbmltYXRpb24sIGFuZCB0aGUgY29tcG9uZW50XG4gICAgICAvLyBhIGhvc3QgbGVhdmUgYW5pbWF0aW9uLCB0aGUgdmlldyBlbmdpbmUgd2lsbCBjYWxsIGByZW1vdmVDaGlsZGAgZm9yIHRoZSBwYXJlbnRcbiAgICAgIC8vIGNvbXBvbmVudCByZW5kZXJlciBhcyB3ZWxsIGFzIGZvciB0aGUgY2hpbGQgY29tcG9uZW50IHJlbmRlcmVyLlxuICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFscmVhZHkgcmVtb3ZlZCB0aGUgZWxlbWVudC5cbiAgICAgIGlmIChkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5wYXJlbnROb2RlKGVsZW1lbnQpKSB7XG4gICAgICAgIGRlbGVnYXRlLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50Tm9kZSwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IEVNUFRZX05BTUVTUEFDRV9JRCA9ICcnO1xuXG4gICAgLy8gY2FjaGUgdGhlIGRlbGVnYXRlcyB0byBmaW5kIG91dCB3aGljaCBjYWNoZWQgZGVsZWdhdGUgY2FuXG4gICAgLy8gYmUgdXNlZCBieSB3aGljaCBjYWNoZWQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHR5cGUpO1xuICAgIGlmICghaG9zdEVsZW1lbnQgfHwgIXR5cGUgfHwgIXR5cGUuZGF0YSB8fCAhdHlwZS5kYXRhWydhbmltYXRpb24nXSkge1xuICAgICAgbGV0IHJlbmRlcmVyOiBCYXNlQW5pbWF0aW9uUmVuZGVyZXJ8dW5kZWZpbmVkID0gdGhpcy5fcmVuZGVyZXJDYWNoZS5nZXQoZGVsZWdhdGUpO1xuICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlciA9IG5ldyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIoRU1QVFlfTkFNRVNQQUNFX0lELCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICAgICAgICAvLyBvbmx5IGNhY2hlIHRoaXMgcmVzdWx0IHdoZW4gdGhlIGJhc2UgcmVuZGVyZXIgaXMgdXNlZFxuICAgICAgICB0aGlzLl9yZW5kZXJlckNhY2hlLnNldChkZWxlZ2F0ZSwgcmVuZGVyZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gdHlwZS5pZDtcbiAgICBjb25zdCBuYW1lc3BhY2VJZCA9IHR5cGUuaWQgKyAnLScgKyB0aGlzLl9jdXJyZW50SWQ7XG4gICAgdGhpcy5fY3VycmVudElkKys7XG5cbiAgICB0aGlzLmVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJUcmlnZ2VyID0gKHRyaWdnZXI6IE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodHJpZ2dlcikpIHtcbiAgICAgICAgdHJpZ2dlci5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuZ2luZS5yZWdpc3RlclRyaWdnZXIoY29tcG9uZW50SWQsIG5hbWVzcGFjZUlkLCBob3N0RWxlbWVudCwgdHJpZ2dlci5uYW1lLCB0cmlnZ2VyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvblRyaWdnZXJzID0gdHlwZS5kYXRhWydhbmltYXRpb24nXSBhcyBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFbXTtcbiAgICBhbmltYXRpb25UcmlnZ2Vycy5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG5cbiAgICByZXR1cm4gbmV3IEFuaW1hdGlvblJlbmRlcmVyKHRoaXMsIG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICB9XG5cbiAgYmVnaW4oKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoKys7XG4gICAgaWYgKHRoaXMuZGVsZWdhdGUuYmVnaW4pIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY2hlZHVsZUNvdW50VGFzaygpIHtcbiAgICAvLyBhbHdheXMgdXNlIHByb21pc2UgdG8gc2NoZWR1bGUgbWljcm90YXNrIGluc3RlYWQgb2YgdXNlIFpvbmVcbiAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9taWNyb3Rhc2tJZCsrO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnQ6IG51bWJlciwgZm46IChlOiBhbnkpID0+IGFueSwgZGF0YTogYW55KSB7XG4gICAgaWYgKGNvdW50ID49IDAgJiYgY291bnQgPCB0aGlzLl9taWNyb3Rhc2tJZCkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gZm4oZGF0YSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5mb3JFYWNoKHR1cGxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtmbiwgZGF0YV0gPSB0dXBsZTtcbiAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlciA9IFtdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5wdXNoKFtmbiwgZGF0YV0pO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIHRoaXMuX2NkUmVjdXJEZXB0aC0tO1xuXG4gICAgLy8gdGhpcyBpcyB0byBwcmV2ZW50IGFuaW1hdGlvbnMgZnJvbSBydW5uaW5nIHR3aWNlIHdoZW4gYW4gaW5uZXJcbiAgICAvLyBjb21wb25lbnQgZG9lcyBDRCB3aGVuIGEgcGFyZW50IGNvbXBvbmVudCBpbnN0ZWFkIGhhcyBpbnNlcnRlZCBpdFxuICAgIGlmICh0aGlzLl9jZFJlY3VyRGVwdGggPT0gMCkge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlQ291bnRUYXNrKCk7XG4gICAgICAgIHRoaXMuZW5naW5lLmZsdXNoKHRoaXMuX21pY3JvdGFza0lkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbmQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUud2hlblJlbmRlcmluZ0RvbmUoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUFuaW1hdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgbmFtZXNwYWNlSWQ6IHN0cmluZywgcHVibGljIGRlbGVnYXRlOiBSZW5kZXJlcjIsIHB1YmxpYyBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHRoaXMuZGVzdHJveU5vZGUgPSB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlID8gKG4pID0+IGRlbGVnYXRlLmRlc3Ryb3lOb2RlIShuKSA6IG51bGw7XG4gIH1cblxuICBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhO1xuICB9XG5cbiAgZGVzdHJveU5vZGU6ICgobjogYW55KSA9PiB2b2lkKXxudWxsO1xuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUuZGVzdHJveSh0aGlzLm5hbWVzcGFjZUlkLCB0aGlzLmRlbGVnYXRlKTtcbiAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZVRleHQodmFsdWUpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpO1xuICAgIHRoaXMuZW5naW5lLm9uSW5zZXJ0KHRoaXMubmFtZXNwYWNlSWQsIG5ld0NoaWxkLCBwYXJlbnQsIGZhbHNlKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCB0cnVlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUub25SZW1vdmUodGhpcy5uYW1lc3BhY2VJZCwgb2xkQ2hpbGQsIHRoaXMuZGVsZWdhdGUsIGlzSG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubmV4dFNpYmxpbmcobm9kZSk7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsICEhdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudDogYW55LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZW5naW5lLmRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uUmVuZGVyZXIgZXh0ZW5kcyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBmYWN0b3J5OiBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGRlbGVnYXRlOiBSZW5kZXJlcjIsXG4gICAgICBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHN1cGVyKG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgZW5naW5lKTtcbiAgICB0aGlzLm5hbWVzcGFjZUlkID0gbmFtZXNwYWNlSWQ7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDEpID09ICcuJyAmJiBuYW1lID09IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAhIXZhbHVlO1xuICAgICAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsLCB2YWx1ZSBhcyBib29sZWFuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5naW5lLnByb2Nlc3ModGhpcy5uYW1lc3BhY2VJZCwgZWwsIG5hbWUuc3Vic3RyKDEpLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBpZiAoZXZlbnROYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcmVzb2x2ZUVsZW1lbnRGcm9tVGFyZ2V0KHRhcmdldCk7XG4gICAgICBsZXQgbmFtZSA9IGV2ZW50TmFtZS5zdWJzdHIoMSk7XG4gICAgICBsZXQgcGhhc2UgPSAnJztcbiAgICAgIC8vIEBsaXN0ZW5lci5waGFzZSBpcyBmb3IgdHJpZ2dlciBhbmltYXRpb24gY2FsbGJhY2tzXG4gICAgICAvLyBAQGxpc3RlbmVyIGlzIGZvciBhbmltYXRpb24gYnVpbGRlciBjYWxsYmFja3NcbiAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSAhPSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICAgIFtuYW1lLCBwaGFzZV0gPSBwYXJzZVRyaWdnZXJDYWxsYmFja05hbWUobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbmdpbmUubGlzdGVuKHRoaXMubmFtZXNwYWNlSWQsIGVsZW1lbnQsIG5hbWUsIHBoYXNlLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50SWQgPSAoZXZlbnQgYXMgYW55KVsnX2RhdGEnXSB8fCAtMTtcbiAgICAgICAgdGhpcy5mYWN0b3J5LnNjaGVkdWxlTGlzdGVuZXJDYWxsYmFjayhjb3VudElkLCBjYWxsYmFjaywgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbGVtZW50RnJvbVRhcmdldCh0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSk6IGFueSB7XG4gIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgY2FzZSAnYm9keSc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgY2FzZSAnd2luZG93JzpcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUcmlnZ2VyQ2FsbGJhY2tOYW1lKHRyaWdnZXJOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZG90SW5kZXggPSB0cmlnZ2VyTmFtZS5pbmRleE9mKCcuJyk7XG4gIGNvbnN0IHRyaWdnZXIgPSB0cmlnZ2VyTmFtZS5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICBjb25zdCBwaGFzZSA9IHRyaWdnZXJOYW1lLnN1YnN0cihkb3RJbmRleCArIDEpO1xuICByZXR1cm4gW3RyaWdnZXIsIHBoYXNlXTtcbn1cbiJdfQ==