import { __extends, __read } from "tslib";
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
var ANIMATION_PREFIX = '@';
var DISABLE_ANIMATIONS_FLAG = '@.disabled';
var AnimationRendererFactory = /** @class */ (function () {
    function AnimationRendererFactory(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        this._cdRecurDepth = 0;
        this.promise = Promise.resolve(0);
        engine.onRemovalComplete = function (element, delegate) {
            // Note: if an component element has a leave animation, and the component
            // a host leave animation, the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            if (delegate && delegate.parentNode(element)) {
                delegate.removeChild(element.parentNode, element);
            }
        };
    }
    AnimationRendererFactory.prototype.createRenderer = function (hostElement, type) {
        var _this = this;
        var EMPTY_NAMESPACE_ID = '';
        // cache the delegates to find out which cached delegate can
        // be used by which cached renderer
        var delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            var renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        var componentId = type.id;
        var namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        var registerTrigger = function (trigger) {
            if (Array.isArray(trigger)) {
                trigger.forEach(registerTrigger);
            }
            else {
                _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
            }
        };
        var animationTriggers = type.data['animation'];
        animationTriggers.forEach(registerTrigger);
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    };
    AnimationRendererFactory.prototype.begin = function () {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    };
    AnimationRendererFactory.prototype._scheduleCountTask = function () {
        var _this = this;
        // always use promise to schedule microtask instead of use Zone
        this.promise.then(function () {
            _this._microtaskId++;
        });
    };
    /** @internal */
    AnimationRendererFactory.prototype.scheduleListenerCallback = function (count, fn, data) {
        var _this = this;
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(function () { return fn(data); });
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(function () {
                _this._zone.run(function () {
                    _this._animationCallbacksBuffer.forEach(function (tuple) {
                        var _a = __read(tuple, 2), fn = _a[0], data = _a[1];
                        fn(data);
                    });
                    _this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    };
    AnimationRendererFactory.prototype.end = function () {
        var _this = this;
        this._cdRecurDepth--;
        // this is to prevent animations from running twice when an inner
        // component does CD when a parent component instead has inserted it
        if (this._cdRecurDepth == 0) {
            this._zone.runOutsideAngular(function () {
                _this._scheduleCountTask();
                _this.engine.flush(_this._microtaskId);
            });
        }
        if (this.delegate.end) {
            this.delegate.end();
        }
    };
    AnimationRendererFactory.prototype.whenRenderingDone = function () {
        return this.engine.whenRenderingDone();
    };
    AnimationRendererFactory.ɵfac = function AnimationRendererFactory_Factory(t) { return new (t || AnimationRendererFactory)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ɵAnimationEngine), i0.ɵɵinject(i0.NgZone)); };
    AnimationRendererFactory.ɵprov = i0.ɵɵdefineInjectable({ token: AnimationRendererFactory, factory: AnimationRendererFactory.ɵfac });
    return AnimationRendererFactory;
}());
export { AnimationRendererFactory };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AnimationRendererFactory, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }, { type: i1.ɵAnimationEngine }, { type: i0.NgZone }]; }, null); })();
var BaseAnimationRenderer = /** @class */ (function () {
    function BaseAnimationRenderer(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? function (n) { return delegate.destroyNode(n); } : null;
    }
    Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
        get: function () {
            return this.delegate.data;
        },
        enumerable: true,
        configurable: true
    });
    BaseAnimationRenderer.prototype.destroy = function () {
        this.engine.destroy(this.namespaceId, this.delegate);
        this.delegate.destroy();
    };
    BaseAnimationRenderer.prototype.createElement = function (name, namespace) {
        return this.delegate.createElement(name, namespace);
    };
    BaseAnimationRenderer.prototype.createComment = function (value) {
        return this.delegate.createComment(value);
    };
    BaseAnimationRenderer.prototype.createText = function (value) {
        return this.delegate.createText(value);
    };
    BaseAnimationRenderer.prototype.appendChild = function (parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    };
    BaseAnimationRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
        this.delegate.insertBefore(parent, newChild, refChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, true);
    };
    BaseAnimationRenderer.prototype.removeChild = function (parent, oldChild, isHostElement) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
    };
    BaseAnimationRenderer.prototype.selectRootElement = function (selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    };
    BaseAnimationRenderer.prototype.parentNode = function (node) {
        return this.delegate.parentNode(node);
    };
    BaseAnimationRenderer.prototype.nextSibling = function (node) {
        return this.delegate.nextSibling(node);
    };
    BaseAnimationRenderer.prototype.setAttribute = function (el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    };
    BaseAnimationRenderer.prototype.removeAttribute = function (el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    };
    BaseAnimationRenderer.prototype.addClass = function (el, name) {
        this.delegate.addClass(el, name);
    };
    BaseAnimationRenderer.prototype.removeClass = function (el, name) {
        this.delegate.removeClass(el, name);
    };
    BaseAnimationRenderer.prototype.setStyle = function (el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    };
    BaseAnimationRenderer.prototype.removeStyle = function (el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    };
    BaseAnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    BaseAnimationRenderer.prototype.setValue = function (node, value) {
        this.delegate.setValue(node, value);
    };
    BaseAnimationRenderer.prototype.listen = function (target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    };
    BaseAnimationRenderer.prototype.disableAnimations = function (element, value) {
        this.engine.disableAnimations(element, value);
    };
    return BaseAnimationRenderer;
}());
export { BaseAnimationRenderer };
var AnimationRenderer = /** @class */ (function (_super) {
    __extends(AnimationRenderer, _super);
    function AnimationRenderer(factory, namespaceId, delegate, engine) {
        var _this = _super.call(this, namespaceId, delegate, engine) || this;
        _this.factory = factory;
        _this.namespaceId = namespaceId;
        return _this;
    }
    AnimationRenderer.prototype.setProperty = function (el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, value);
            }
            else {
                this.engine.process(this.namespaceId, el, name.substr(1), value);
            }
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    };
    AnimationRenderer.prototype.listen = function (target, eventName, callback) {
        var _a;
        var _this = this;
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            var element = resolveElementFromTarget(target);
            var name_1 = eventName.substr(1);
            var phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name_1.charAt(0) != ANIMATION_PREFIX) {
                _a = __read(parseTriggerCallbackName(name_1), 2), name_1 = _a[0], phase = _a[1];
            }
            return this.engine.listen(this.namespaceId, element, name_1, phase, function (event) {
                var countId = event['_data'] || -1;
                _this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
    };
    return AnimationRenderer;
}(BaseAnimationRenderer));
export { AnimationRenderer };
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
function parseTriggerCallbackName(triggerName) {
    var dotIndex = triggerName.indexOf('.');
    var trigger = triggerName.substring(0, dotIndex);
    var phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVFBLE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxlQUFlLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBYSxnQkFBZ0IsRUFBcUMsTUFBTSxlQUFlLENBQUM7OztBQUVsSCxJQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUM3QixJQUFNLHVCQUF1QixHQUFHLFlBQVksQ0FBQztBQVE3QztJQVNFLGtDQUNZLFFBQTBCLEVBQVUsTUFBdUIsRUFBVSxLQUFhO1FBQWxGLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUnRGLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsOEJBQXlCLEdBQTZCLEVBQUUsQ0FBQztRQUN6RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFvQyxDQUFDO1FBQzdELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFlBQU8sR0FBaUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlqRCxNQUFNLENBQUMsaUJBQWlCLEdBQUcsVUFBQyxPQUFZLEVBQUUsUUFBbUI7WUFDM0QseUVBQXlFO1lBQ3pFLGlGQUFpRjtZQUNqRixrRUFBa0U7WUFDbEUsaUVBQWlFO1lBQ2pFLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUs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QUNyRSxJQUFNLE9BQU8sR0FBSSxLQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEtBQUksQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUF2Q0QsQ0FBdUMscUJBQXFCLEdBdUMzRDs7QUFFRCxTQUFTLHdCQUF3QixDQUFDLE1BQXNDO0lBQ3RFLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxNQUFNO1lBQ1QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLEtBQUssVUFBVTtZQUNiLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLEtBQUssUUFBUTtZQUNYLE9BQU8sTUFBTSxDQUFDO1FBQ2hCO1lBQ0UsT0FBTyxNQUFNLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBRUQsU0FBUyx3QkFBd0IsQ0FBQyxXQUFtQjtJQUNuRCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5jb25zdCBESVNBQkxFX0FOSU1BVElPTlNfRkxBRyA9ICdALmRpc2FibGVkJztcblxuLy8gRGVmaW5lIGEgcmVjdXJzaXZlIHR5cGUgdG8gYWxsb3cgZm9yIG5lc3RlZCBhcnJheXMgb2YgYEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YWAuIE5vdGUgdGhhdCBhblxuLy8gaW50ZXJmYWNlIGRlY2xhcmF0aW9uIGlzIHVzZWQgYXMgVHlwZVNjcmlwdCBwcmlvciB0byAzLjcgZG9lcyBub3Qgc3VwcG9ydCByZWN1cnNpdmUgdHlwZVxuLy8gcmVmZXJlbmNlcywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9wdWxsLzMzMDUwIGZvciBkZXRhaWxzLlxudHlwZSBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGF8UmVjdXJzaXZlQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xuaW50ZXJmYWNlIFJlY3Vyc2l2ZUFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFycmF5PE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YT4ge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9jdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21pY3JvdGFza0lkOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9hbmltYXRpb25DYWxsYmFja3NCdWZmZXI6IFsoZTogYW55KSA9PiBhbnksIGFueV1bXSA9IFtdO1xuICBwcml2YXRlIF9yZW5kZXJlckNhY2hlID0gbmV3IE1hcDxSZW5kZXJlcjIsIEJhc2VBbmltYXRpb25SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSBfY2RSZWN1ckRlcHRoID0gMDtcbiAgcHJpdmF0ZSBwcm9taXNlOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoMCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICBlbmdpbmUub25SZW1vdmFsQ29tcGxldGUgPSAoZWxlbWVudDogYW55LCBkZWxlZ2F0ZTogUmVuZGVyZXIyKSA9PiB7XG4gICAgICAvLyBOb3RlOiBpZiBhbiBjb21wb25lbnQgZWxlbWVudCBoYXMgYSBsZWF2ZSBhbmltYXRpb24sIGFuZCB0aGUgY29tcG9uZW50XG4gICAgICAvLyBhIGhvc3QgbGVhdmUgYW5pbWF0aW9uLCB0aGUgdmlldyBlbmdpbmUgd2lsbCBjYWxsIGByZW1vdmVDaGlsZGAgZm9yIHRoZSBwYXJlbnRcbiAgICAgIC8vIGNvbXBvbmVudCByZW5kZXJlciBhcyB3ZWxsIGFzIGZvciB0aGUgY2hpbGQgY29tcG9uZW50IHJlbmRlcmVyLlxuICAgICAgLy8gVGhlcmVmb3JlLCB3ZSBuZWVkIHRvIGNoZWNrIGlmIHdlIGFscmVhZHkgcmVtb3ZlZCB0aGUgZWxlbWVudC5cbiAgICAgIGlmIChkZWxlZ2F0ZSAmJiBkZWxlZ2F0ZS5wYXJlbnROb2RlKGVsZW1lbnQpKSB7XG4gICAgICAgIGRlbGVnYXRlLnJlbW92ZUNoaWxkKGVsZW1lbnQucGFyZW50Tm9kZSwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IEVNUFRZX05BTUVTUEFDRV9JRCA9ICcnO1xuXG4gICAgLy8gY2FjaGUgdGhlIGRlbGVnYXRlcyB0byBmaW5kIG91dCB3aGljaCBjYWNoZWQgZGVsZWdhdGUgY2FuXG4gICAgLy8gYmUgdXNlZCBieSB3aGljaCBjYWNoZWQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHR5cGUpO1xuICAgIGlmICghaG9zdEVsZW1lbnQgfHwgIXR5cGUgfHwgIXR5cGUuZGF0YSB8fCAhdHlwZS5kYXRhWydhbmltYXRpb24nXSkge1xuICAgICAgbGV0IHJlbmRlcmVyOiBCYXNlQW5pbWF0aW9uUmVuZGVyZXJ8dW5kZWZpbmVkID0gdGhpcy5fcmVuZGVyZXJDYWNoZS5nZXQoZGVsZWdhdGUpO1xuICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlciA9IG5ldyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIoRU1QVFlfTkFNRVNQQUNFX0lELCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICAgICAgICAvLyBvbmx5IGNhY2hlIHRoaXMgcmVzdWx0IHdoZW4gdGhlIGJhc2UgcmVuZGVyZXIgaXMgdXNlZFxuICAgICAgICB0aGlzLl9yZW5kZXJlckNhY2hlLnNldChkZWxlZ2F0ZSwgcmVuZGVyZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudElkID0gdHlwZS5pZDtcbiAgICBjb25zdCBuYW1lc3BhY2VJZCA9IHR5cGUuaWQgKyAnLScgKyB0aGlzLl9jdXJyZW50SWQ7XG4gICAgdGhpcy5fY3VycmVudElkKys7XG5cbiAgICB0aGlzLmVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJUcmlnZ2VyID0gKHRyaWdnZXI6IE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodHJpZ2dlcikpIHtcbiAgICAgICAgdHJpZ2dlci5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuZ2luZS5yZWdpc3RlclRyaWdnZXIoY29tcG9uZW50SWQsIG5hbWVzcGFjZUlkLCBob3N0RWxlbWVudCwgdHJpZ2dlci5uYW1lLCB0cmlnZ2VyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvblRyaWdnZXJzID0gdHlwZS5kYXRhWydhbmltYXRpb24nXSBhcyBOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFbXTtcbiAgICBhbmltYXRpb25UcmlnZ2Vycy5mb3JFYWNoKHJlZ2lzdGVyVHJpZ2dlcik7XG5cbiAgICByZXR1cm4gbmV3IEFuaW1hdGlvblJlbmRlcmVyKHRoaXMsIG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgdGhpcy5lbmdpbmUpO1xuICB9XG5cbiAgYmVnaW4oKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoKys7XG4gICAgaWYgKHRoaXMuZGVsZWdhdGUuYmVnaW4pIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuYmVnaW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY2hlZHVsZUNvdW50VGFzaygpIHtcbiAgICAvLyBhbHdheXMgdXNlIHByb21pc2UgdG8gc2NoZWR1bGUgbWljcm90YXNrIGluc3RlYWQgb2YgdXNlIFpvbmVcbiAgICB0aGlzLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9taWNyb3Rhc2tJZCsrO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnQ6IG51bWJlciwgZm46IChlOiBhbnkpID0+IGFueSwgZGF0YTogYW55KSB7XG4gICAgaWYgKGNvdW50ID49IDAgJiYgY291bnQgPCB0aGlzLl9taWNyb3Rhc2tJZCkge1xuICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gZm4oZGF0YSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hbmltYXRpb25DYWxsYmFja3NCdWZmZXIubGVuZ3RoID09IDApIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShudWxsKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5mb3JFYWNoKHR1cGxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtmbiwgZGF0YV0gPSB0dXBsZTtcbiAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlciA9IFtdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5wdXNoKFtmbiwgZGF0YV0pO1xuICB9XG5cbiAgZW5kKCkge1xuICAgIHRoaXMuX2NkUmVjdXJEZXB0aC0tO1xuXG4gICAgLy8gdGhpcyBpcyB0byBwcmV2ZW50IGFuaW1hdGlvbnMgZnJvbSBydW5uaW5nIHR3aWNlIHdoZW4gYW4gaW5uZXJcbiAgICAvLyBjb21wb25lbnQgZG9lcyBDRCB3aGVuIGEgcGFyZW50IGNvbXBvbmVudCBpbnN0ZWFkIGhhcyBpbnNlcnRlZCBpdFxuICAgIGlmICh0aGlzLl9jZFJlY3VyRGVwdGggPT0gMCkge1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlQ291bnRUYXNrKCk7XG4gICAgICAgIHRoaXMuZW5naW5lLmZsdXNoKHRoaXMuX21pY3JvdGFza0lkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5lbmQpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5lbmdpbmUud2hlblJlbmRlcmluZ0RvbmUoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQmFzZUFuaW1hdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgbmFtZXNwYWNlSWQ6IHN0cmluZywgcHVibGljIGRlbGVnYXRlOiBSZW5kZXJlcjIsIHB1YmxpYyBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHRoaXMuZGVzdHJveU5vZGUgPSB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlID8gKG4pID0+IGRlbGVnYXRlLmRlc3Ryb3lOb2RlIShuKSA6IG51bGw7XG4gIH1cblxuICBnZXQgZGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhO1xuICB9XG5cbiAgZGVzdHJveU5vZGU6ICgobjogYW55KSA9PiB2b2lkKXxudWxsO1xuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUuZGVzdHJveSh0aGlzLm5hbWVzcGFjZUlkLCB0aGlzLmRlbGVnYXRlKTtcbiAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZVRleHQodmFsdWUpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpO1xuICAgIHRoaXMuZW5naW5lLm9uSW5zZXJ0KHRoaXMubmFtZXNwYWNlSWQsIG5ld0NoaWxkLCBwYXJlbnQsIGZhbHNlKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCB0cnVlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmUub25SZW1vdmUodGhpcy5uYW1lc3BhY2VJZCwgb2xkQ2hpbGQsIHRoaXMuZGVsZWdhdGUsIGlzSG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubmV4dFNpYmxpbmcobm9kZSk7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsICEhdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlbGVnYXRlLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudDogYW55LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuZW5naW5lLmRpc2FibGVBbmltYXRpb25zKGVsZW1lbnQsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uUmVuZGVyZXIgZXh0ZW5kcyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBmYWN0b3J5OiBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGRlbGVnYXRlOiBSZW5kZXJlcjIsXG4gICAgICBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSkge1xuICAgIHN1cGVyKG5hbWVzcGFjZUlkLCBkZWxlZ2F0ZSwgZW5naW5lKTtcbiAgICB0aGlzLm5hbWVzcGFjZUlkID0gbmFtZXNwYWNlSWQ7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgaWYgKG5hbWUuY2hhckF0KDEpID09ICcuJyAmJiBuYW1lID09IERJU0FCTEVfQU5JTUFUSU9OU19GTEFHKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiAhIXZhbHVlO1xuICAgICAgICB0aGlzLmRpc2FibGVBbmltYXRpb25zKGVsLCB2YWx1ZSBhcyBib29sZWFuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5naW5lLnByb2Nlc3ModGhpcy5uYW1lc3BhY2VJZCwgZWwsIG5hbWUuc3Vic3RyKDEpLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBpZiAoZXZlbnROYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcmVzb2x2ZUVsZW1lbnRGcm9tVGFyZ2V0KHRhcmdldCk7XG4gICAgICBsZXQgbmFtZSA9IGV2ZW50TmFtZS5zdWJzdHIoMSk7XG4gICAgICBsZXQgcGhhc2UgPSAnJztcbiAgICAgIC8vIEBsaXN0ZW5lci5waGFzZSBpcyBmb3IgdHJpZ2dlciBhbmltYXRpb24gY2FsbGJhY2tzXG4gICAgICAvLyBAQGxpc3RlbmVyIGlzIGZvciBhbmltYXRpb24gYnVpbGRlciBjYWxsYmFja3NcbiAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSAhPSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICAgIFtuYW1lLCBwaGFzZV0gPSBwYXJzZVRyaWdnZXJDYWxsYmFja05hbWUobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbmdpbmUubGlzdGVuKHRoaXMubmFtZXNwYWNlSWQsIGVsZW1lbnQsIG5hbWUsIHBoYXNlLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50SWQgPSAoZXZlbnQgYXMgYW55KVsnX2RhdGEnXSB8fCAtMTtcbiAgICAgICAgdGhpcy5mYWN0b3J5LnNjaGVkdWxlTGlzdGVuZXJDYWxsYmFjayhjb3VudElkLCBjYWxsYmFjaywgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFbGVtZW50RnJvbVRhcmdldCh0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSk6IGFueSB7XG4gIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgY2FzZSAnYm9keSc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgY2FzZSAnd2luZG93JzpcbiAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VUcmlnZ2VyQ2FsbGJhY2tOYW1lKHRyaWdnZXJOYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgZG90SW5kZXggPSB0cmlnZ2VyTmFtZS5pbmRleE9mKCcuJyk7XG4gIGNvbnN0IHRyaWdnZXIgPSB0cmlnZ2VyTmFtZS5zdWJzdHJpbmcoMCwgZG90SW5kZXgpO1xuICBjb25zdCBwaGFzZSA9IHRyaWdnZXJOYW1lLnN1YnN0cihkb3RJbmRleCArIDEpO1xuICByZXR1cm4gW3RyaWdnZXIsIHBoYXNlXTtcbn1cbiJdfQ==