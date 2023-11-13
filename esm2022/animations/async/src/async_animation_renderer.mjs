/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵRuntimeError as RuntimeError } from '@angular/core';
const ANIMATION_PREFIX = '@';
export class AsyncAnimationRendererFactory {
    /**
     *
     * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
     */
    constructor(doc, delegate, zone, animationType, moduleImpl) {
        this.doc = doc;
        this.delegate = delegate;
        this.zone = zone;
        this.animationType = animationType;
        this.moduleImpl = moduleImpl;
        this._rendererFactoryPromise = null;
    }
    /**
     * @internal
     */
    loadImpl() {
        const moduleImpl = this.moduleImpl ?? import('@angular/animations/browser');
        return moduleImpl
            .catch((e) => {
            throw new RuntimeError(5300 /* RuntimeErrorCode.ANIMATION_RENDERER_ASYNC_LOADING_FAILURE */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                'Async loading for animations package was ' +
                    'enabled, but loading failed. Angular falls back to using regular rendering. ' +
                    'No animations will be displayed and their styles won\'t be applied.');
        })
            .then(({ ɵcreateEngine, ɵAnimationRendererFactory }) => {
            // We can't create the renderer yet because we might need the hostElement and the type
            // Both are provided in createRenderer().
            const engine = ɵcreateEngine(this.animationType, this.doc);
            const rendererFactory = new ɵAnimationRendererFactory(this.delegate, engine, this.zone);
            this.delegate = rendererFactory;
            return rendererFactory;
        });
    }
    /**
     * This method is delegating the renderer creation to the factories.
     * It uses default factory while the animation factory isn't loaded
     * and will rely on the animation factory once it is loaded.
     *
     * Calling this method will trigger as side effect the loading of the animation module
     * if the renderered component uses animations.
     */
    createRenderer(hostElement, rendererType) {
        const renderer = this.delegate.createRenderer(hostElement, rendererType);
        if (renderer.ɵtype === 0 /* AnimationRendererType.Regular */) {
            // The factory is already loaded, this is an animation renderer
            return renderer;
        }
        // We need to prevent the DomRenderer to throw an error because of synthetic properties
        if (typeof renderer.throwOnSyntheticProps === 'boolean') {
            renderer.throwOnSyntheticProps = false;
        }
        // Using a dynamic renderer to switch the renderer implementation once the module is loaded.
        const dynamicRenderer = new DynamicDelegationRenderer(renderer);
        // Kick off the module loading if the component uses animations but the module hasn't been
        // loaded yet.
        if (rendererType?.data?.['animation'] && !this._rendererFactoryPromise) {
            this._rendererFactoryPromise = this.loadImpl();
        }
        this._rendererFactoryPromise
            ?.then((animationRendererFactory) => {
            const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
            dynamicRenderer.use(animationRenderer);
        })
            .catch(e => {
            // Permanently use regular renderer when loading fails.
            dynamicRenderer.use(renderer);
        });
        return dynamicRenderer;
    }
    begin() {
        this.delegate.begin?.();
    }
    end() {
        this.delegate.end?.();
    }
    whenRenderingDone() {
        return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
    }
}
/**
 * The class allows to dynamicly switch between different renderer implementations
 * by changing the delegate renderer.
 */
export class DynamicDelegationRenderer {
    constructor(delegate) {
        this.delegate = delegate;
        // List of callbacks that need to be replayed on the animation renderer once its loaded
        this.replay = [];
        this.ɵtype = 1 /* AnimationRendererType.Delegated */;
    }
    use(impl) {
        this.delegate = impl;
        if (this.replay !== null) {
            // Replay queued actions using the animation renderer to apply
            // all events and properties collected while loading was in progress.
            for (const fn of this.replay) {
                fn(impl);
            }
            // Set to `null` to indicate that the queue was processed
            // and we no longer need to collect events and properties.
            this.replay = null;
        }
    }
    get data() {
        return this.delegate.data;
    }
    destroy() {
        this.replay = null;
        this.delegate.destroy();
    }
    createElement(name, namespace) {
        return this.delegate.createElement(name, namespace);
    }
    createComment(value) {
        return this.delegate.createComment(value);
    }
    createText(value) {
        return this.delegate.createText(value);
    }
    get destroyNode() {
        return this.delegate.destroyNode;
    }
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
    }
    insertBefore(parent, newChild, refChild, isMove) {
        this.delegate.insertBefore(parent, newChild, refChild, isMove);
    }
    removeChild(parent, oldChild, isHostElement) {
        this.delegate.removeChild(parent, oldChild, isHostElement);
    }
    selectRootElement(selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    }
    parentNode(node) {
        return this.delegate.parentNode(node);
    }
    nextSibling(node) {
        return this.delegate.nextSibling(node);
    }
    setAttribute(el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    }
    removeAttribute(el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    }
    addClass(el, name) {
        this.delegate.addClass(el, name);
    }
    removeClass(el, name) {
        this.delegate.removeClass(el, name);
    }
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    setProperty(el, name, value) {
        // We need to keep track of animation properties set on default renderer
        // So we can also set them also on the animation renderer
        if (this.shouldReplay(name)) {
            this.replay.push((renderer) => renderer.setProperty(el, name, value));
        }
        this.delegate.setProperty(el, name, value);
    }
    setValue(node, value) {
        this.delegate.setValue(node, value);
    }
    listen(target, eventName, callback) {
        // We need to keep track of animation events registred by the default renderer
        // So we can also register them against the animation renderer
        if (this.shouldReplay(eventName)) {
            this.replay.push((renderer) => renderer.listen(target, eventName, callback));
        }
        return this.delegate.listen(target, eventName, callback);
    }
    shouldReplay(propOrEventName) {
        //`null` indicates that we no longer need to collect events and properties
        return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUEySCxhQUFhLElBQUksWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3RMLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBRTdCLE1BQU0sT0FBTyw2QkFBNkI7SUFHeEM7OztPQUdHO0lBQ0gsWUFDWSxHQUFhLEVBQVUsUUFBMEIsRUFBVSxJQUFZLEVBQ3ZFLGFBQWtDLEVBQVUsVUFHbEQ7UUFKTSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3ZFLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBRzVEO1FBWEUsNEJBQXVCLEdBQTJDLElBQUksQ0FBQztJQVd0RSxDQUFDO0lBRVY7O09BRUc7SUFDSyxRQUFRO1FBQ2QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUU1RSxPQUFPLFVBQVU7YUFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLE1BQU0sSUFBSSxZQUFZLHVFQUVsQixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUM7Z0JBQzNDLDJDQUEyQztvQkFDdkMsOEVBQThFO29CQUM5RSxxRUFBcUUsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFFLHlCQUF5QixFQUFDLEVBQUUsRUFBRTtZQUNu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UyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxZQUFZLENBQUMsZUFBdUI7UUFDMUMsMEVBQTBFO1FBQzFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZSwgybVBbmltYXRpb25SZW5kZXJlciBhcyBBbmltYXRpb25SZW5kZXJlciwgybVBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgYXMgQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgybVBbmltYXRpb25SZW5kZXJlclR5cGUgYXMgQW5pbWF0aW9uUmVuZGVyZXJUeXBlLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtVJ1bnRpbWVFcnJvckNvZGUgYXMgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5cbmV4cG9ydCBjbGFzcyBBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9yZW5kZXJlckZhY3RvcnlQcm9taXNlOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT58bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVJbXBsIGFsbG93cyB0byBwcm92aWRlIGEgbW9jayBpbXBsbWVudGF0aW9uIChvciB3aWxsIGxvYWQgdGhlIGFuaW1hdGlvbiBtb2R1bGUpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZG9jOiBEb2N1bWVudCwgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIGFuaW1hdGlvblR5cGU6ICdhbmltYXRpb25zJ3wnbm9vcCcsIHByaXZhdGUgbW9kdWxlSW1wbD86IFByb21pc2U8e1xuICAgICAgICDJtWNyZWF0ZUVuZ2luZTogKHR5cGU6ICdhbmltYXRpb25zJ3wnbm9vcCcsIGRvYzogRG9jdW1lbnQpID0+IEFuaW1hdGlvbkVuZ2luZSxcbiAgICAgICAgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk6IHR5cGVvZiBBbmltYXRpb25SZW5kZXJlckZhY3RvcnlcbiAgICAgIH0+KSB7fVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgbG9hZEltcGwoKTogUHJvbWlzZTxBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk+IHtcbiAgICBjb25zdCBtb2R1bGVJbXBsID0gdGhpcy5tb2R1bGVJbXBsID8/IGltcG9ydCgnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJyk7XG5cbiAgICByZXR1cm4gbW9kdWxlSW1wbFxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLkFOSU1BVElPTl9SRU5ERVJFUl9BU1lOQ19MT0FESU5HX0ZBSUxVUkUsXG4gICAgICAgICAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgICAgICAgICAgICAnQXN5bmMgbG9hZGluZyBmb3IgYW5pbWF0aW9ucyBwYWNrYWdlIHdhcyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCwgYnV0IGxvYWRpbmcgZmFpbGVkLiBBbmd1bGFyIGZhbGxzIGJhY2sgdG8gdXNpbmcgcmVndWxhciByZW5kZXJpbmcuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICdObyBhbmltYXRpb25zIHdpbGwgYmUgZGlzcGxheWVkIGFuZCB0aGVpciBzdHlsZXMgd29uXFwndCBiZSBhcHBsaWVkLicpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoe8m1Y3JlYXRlRW5naW5lLCDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0pID0+IHtcbiAgICAgICAgICAvLyBXZSBjYW4ndCBjcmVhdGUgdGhlIHJlbmRlcmVyIHlldCBiZWNhdXNlIHdlIG1pZ2h0IG5lZWQgdGhlIGhvc3RFbGVtZW50IGFuZCB0aGUgdHlwZVxuICAgICAgICAgIC8vIEJvdGggYXJlIHByb3ZpZGVkIGluIGNyZWF0ZVJlbmRlcmVyKCkuXG4gICAgICAgICAgY29uc3QgZW5naW5lID0gybVjcmVhdGVFbmdpbmUodGhpcy5hbmltYXRpb25UeXBlLCB0aGlzLmRvYyk7XG4gICAgICAgICAgY29uc3QgcmVuZGVyZXJGYWN0b3J5ID0gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KHRoaXMuZGVsZWdhdGUsIGVuZ2luZSwgdGhpcy56b25lKTtcbiAgICAgICAgICB0aGlzLmRlbGVnYXRlID0gcmVuZGVyZXJGYWN0b3J5O1xuICAgICAgICAgIHJldHVybiByZW5kZXJlckZhY3Rvcnk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGRlbGVnYXRpbmcgdGhlIHJlbmRlcmVyIGNyZWF0aW9uIHRvIHRoZSBmYWN0b3JpZXMuXG4gICAqIEl0IHVzZXMgZGVmYXVsdCBmYWN0b3J5IHdoaWxlIHRoZSBhbmltYXRpb24gZmFjdG9yeSBpc24ndCBsb2FkZWRcbiAgICogYW5kIHdpbGwgcmVseSBvbiB0aGUgYW5pbWF0aW9uIGZhY3Rvcnkgb25jZSBpdCBpcyBsb2FkZWQuXG4gICAqXG4gICAqIENhbGxpbmcgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIGFzIHNpZGUgZWZmZWN0IHRoZSBsb2FkaW5nIG9mIHRoZSBhbmltYXRpb24gbW9kdWxlXG4gICAqIGlmIHRoZSByZW5kZXJlcmVkIGNvbXBvbmVudCB1c2VzIGFuaW1hdGlvbnMuXG4gICAqL1xuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgcmVuZGVyZXJUeXBlKTtcblxuICAgIGlmICgocmVuZGVyZXIgYXMgQW5pbWF0aW9uUmVuZGVyZXIpLsm1dHlwZSA9PT0gQW5pbWF0aW9uUmVuZGVyZXJUeXBlLlJlZ3VsYXIpIHtcbiAgICAgIC8vIFRoZSBmYWN0b3J5IGlzIGFscmVhZHkgbG9hZGVkLCB0aGlzIGlzIGFuIGFuaW1hdGlvbiByZW5kZXJlclxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcHJldmVudCB0aGUgRG9tUmVuZGVyZXIgdG8gdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSBvZiBzeW50aGV0aWMgcHJvcGVydGllc1xuICAgIGlmICh0eXBlb2YgKHJlbmRlcmVyIGFzIGFueSkudGhyb3dPblN5bnRoZXRpY1Byb3BzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFVzaW5nIGEgZHluYW1pYyByZW5kZXJlciB0byBzd2l0Y2ggdGhlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9uIG9uY2UgdGhlIG1vZHVsZSBpcyBsb2FkZWQuXG4gICAgY29uc3QgZHluYW1pY1JlbmRlcmVyID0gbmV3IER5bmFtaWNEZWxlZ2F0aW9uUmVuZGVyZXIocmVuZGVyZXIpO1xuXG4gICAgLy8gS2ljayBvZmYgdGhlIG1vZHVsZSBsb2FkaW5nIGlmIHRoZSBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zIGJ1dCB0aGUgbW9kdWxlIGhhc24ndCBiZWVuXG4gICAgLy8gbG9hZGVkIHlldC5cbiAgICBpZiAocmVuZGVyZXJUeXBlPy5kYXRhPy5bJ2FuaW1hdGlvbiddICYmICF0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlID0gdGhpcy5sb2FkSW1wbCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2VcbiAgICAgICAgPy50aGVuKChhbmltYXRpb25SZW5kZXJlckZhY3RvcnkpID0+IHtcbiAgICAgICAgICBjb25zdCBhbmltYXRpb25SZW5kZXJlciA9XG4gICAgICAgICAgICAgIGFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgcmVuZGVyZXJUeXBlKTtcbiAgICAgICAgICBkeW5hbWljUmVuZGVyZXIudXNlKGFuaW1hdGlvblJlbmRlcmVyKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgIC8vIFBlcm1hbmVudGx5IHVzZSByZWd1bGFyIHJlbmRlcmVyIHdoZW4gbG9hZGluZyBmYWlscy5cbiAgICAgICAgICBkeW5hbWljUmVuZGVyZXIudXNlKHJlbmRlcmVyKTtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gZHluYW1pY1JlbmRlcmVyO1xuICB9XG5cbiAgYmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbj8uKCk7XG4gIH1cblxuICBlbmQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5lbmQ/LigpO1xuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmU/KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUud2hlblJlbmRlcmluZ0RvbmU/LigpID8/IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGNsYXNzIGFsbG93cyB0byBkeW5hbWljbHkgc3dpdGNoIGJldHdlZW4gZGlmZmVyZW50IHJlbmRlcmVyIGltcGxlbWVudGF0aW9uc1xuICogYnkgY2hhbmdpbmcgdGhlIGRlbGVnYXRlIHJlbmRlcmVyLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0RlbGVnYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIC8vIExpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgbmVlZCB0byBiZSByZXBsYXllZCBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIG9uY2UgaXRzIGxvYWRlZFxuICBwcml2YXRlIHJlcGxheTogKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiB2b2lkKVtdfG51bGwgPSBbXTtcbiAgcmVhZG9ubHkgybV0eXBlID0gQW5pbWF0aW9uUmVuZGVyZXJUeXBlLkRlbGVnYXRlZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlcjIpIHt9XG5cbiAgdXNlKGltcGw6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZGVsZWdhdGUgPSBpbXBsO1xuXG4gICAgaWYgKHRoaXMucmVwbGF5ICE9PSBudWxsKSB7XG4gICAgICAvLyBSZXBsYXkgcXVldWVkIGFjdGlvbnMgdXNpbmcgdGhlIGFuaW1hdGlvbiByZW5kZXJlciB0byBhcHBseVxuICAgICAgLy8gYWxsIGV2ZW50cyBhbmQgcHJvcGVydGllcyBjb2xsZWN0ZWQgd2hpbGUgbG9hZGluZyB3YXMgaW4gcHJvZ3Jlc3MuXG4gICAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMucmVwbGF5KSB7XG4gICAgICAgIGZuKGltcGwpO1xuICAgICAgfVxuICAgICAgLy8gU2V0IHRvIGBudWxsYCB0byBpbmRpY2F0ZSB0aGF0IHRoZSBxdWV1ZSB3YXMgcHJvY2Vzc2VkXG4gICAgICAvLyBhbmQgd2Ugbm8gbG9uZ2VyIG5lZWQgdG8gY29sbGVjdCBldmVudHMgYW5kIHByb3BlcnRpZXMuXG4gICAgICB0aGlzLnJlcGxheSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRhdGEoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmRhdGE7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVwbGF5ID0gbnVsbDtcbiAgICB0aGlzLmRlbGVnYXRlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVUZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBkZXN0cm95Tm9kZSgpOiAoKG5vZGU6IGFueSkgPT4gdm9pZCl8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGVzdHJveU5vZGU7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50LCBuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnksIGlzTW92ZT86IGJvb2xlYW58dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5pbnNlcnRCZWZvcmUocGFyZW50LCBuZXdDaGlsZCwgcmVmQ2hpbGQsIGlzTW92ZSk7XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSwgaXNIb3N0RWxlbWVudD86IGJvb2xlYW58dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnQsIG9sZENoaWxkLCBpc0hvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW58dW5kZWZpbmVkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZSwgcHJlc2VydmVDb250ZW50KTtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hZGRDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBwcm9wZXJ0aWVzIHNldCBvbiBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gc2V0IHRoZW0gYWxzbyBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KG5hbWUpKSB7XG4gICAgICB0aGlzLnJlcGxheSEucHVzaCgocmVuZGVyZXI6IFJlbmRlcmVyMikgPT4gcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0VmFsdWUobm9kZSwgdmFsdWUpO1xuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBhbmltYXRpb24gZXZlbnRzIHJlZ2lzdHJlZCBieSB0aGUgZGVmYXVsdCByZW5kZXJlclxuICAgIC8vIFNvIHdlIGNhbiBhbHNvIHJlZ2lzdGVyIHRoZW0gYWdhaW5zdCB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KGV2ZW50TmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRSZXBsYXkocHJvcE9yRXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvL2BudWxsYCBpbmRpY2F0ZXMgdGhhdCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgIHJldHVybiB0aGlzLnJlcGxheSAhPT0gbnVsbCAmJiBwcm9wT3JFdmVudE5hbWUuc3RhcnRzV2l0aChBTklNQVRJT05fUFJFRklYKTtcbiAgfVxufVxuIl19