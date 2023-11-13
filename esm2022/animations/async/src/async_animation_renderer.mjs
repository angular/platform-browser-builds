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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUEySCxhQUFhLElBQUksWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3RMLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBRTdCLE1BQU0sT0FBTyw2QkFBNkI7SUFHeEM7OztPQUdHO0lBQ0gsWUFDWSxHQUFhLEVBQVUsUUFBMEIsRUFBVSxJQUFZLEVBQ3ZFLGFBQWtDLEVBQVUsVUFHbEQ7UUFKTSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3ZFLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBRzVEO1FBWEUsNEJBQXVCLEdBQTJDLElBQUksQ0FBQztJQVd0RSxDQUFDO0lBRVY7O09BRUc7SUFDSyxRQUFRO1FBQ2QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUU1RSxPQUFPLFVBQVU7YUFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNYLE1BQU0sSUFBSSxZQUFZLHVFQUVsQixDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUM7Z0JBQzNDLDJDQUEyQztvQkFDdkMsOEVBQThFO29CQUM5RSxxRUFBcUUsQ0FBQyxDQUFDO1FBQ3JGLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFFLHlCQUF5QixFQUFDLEVBQUUsRUFBRTtZQUNu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MUUsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lLCDJtUFuaW1hdGlvblJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyLCDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBhcyBBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge05nWm9uZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCDJtUFuaW1hdGlvblJlbmRlcmVyVHlwZSBhcyBBbmltYXRpb25SZW5kZXJlclR5cGUsIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1UnVudGltZUVycm9yQ29kZSBhcyBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgQU5JTUFUSU9OX1BSRUZJWCA9ICdAJztcblxuZXhwb3J0IGNsYXNzIEFzeW5jQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5IGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeVByb21pc2U6IFByb21pc2U8QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5PnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZUltcGwgYWxsb3dzIHRvIHByb3ZpZGUgYSBtb2NrIGltcGxtZW50YXRpb24gKG9yIHdpbGwgbG9hZCB0aGUgYW5pbWF0aW9uIG1vZHVsZSlcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkb2M6IERvY3VtZW50LCBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgIHByaXZhdGUgYW5pbWF0aW9uVHlwZTogJ2FuaW1hdGlvbnMnfCdub29wJywgcHJpdmF0ZSBtb2R1bGVJbXBsPzogUHJvbWlzZTx7XG4gICAgICAgIMm1Y3JlYXRlRW5naW5lOiAodHlwZTogJ2FuaW1hdGlvbnMnfCdub29wJywgZG9jOiBEb2N1bWVudCkgPT4gQW5pbWF0aW9uRW5naW5lLFxuICAgICAgICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeTogdHlwZW9mIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeVxuICAgICAgfT4pIHt9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkSW1wbCgpOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT4ge1xuICAgIGNvbnN0IG1vZHVsZUltcGwgPSB0aGlzLm1vZHVsZUltcGwgPz8gaW1wb3J0KCdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInKTtcblxuICAgIHJldHVybiBtb2R1bGVJbXBsXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuQU5JTUFUSU9OX1JFTkRFUkVSX0FTWU5DX0xPQURJTkdfRkFJTFVSRSxcbiAgICAgICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICdBc3luYyBsb2FkaW5nIGZvciBhbmltYXRpb25zIHBhY2thZ2Ugd2FzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICdlbmFibGVkLCBidXQgbG9hZGluZyBmYWlsZWQuIEFuZ3VsYXIgZmFsbHMgYmFjayB0byB1c2luZyByZWd1bGFyIHJlbmRlcmluZy4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgJ05vIGFuaW1hdGlvbnMgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHRoZWlyIHN0eWxlcyB3b25cXCd0IGJlIGFwcGxpZWQuJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7ybVjcmVhdGVFbmdpbmUsIMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5fSkgPT4ge1xuICAgICAgICAgIC8vIFdlIGNhbid0IGNyZWF0ZSB0aGUgcmVuZGVyZXIgeWV0IGJlY2F1c2Ugd2UgbWlnaHQgbmVlZCB0aGUgaG9zdEVsZW1lbnQgYW5kIHRoZSB0eXBlXG4gICAgICAgICAgLy8gQm90aCBhcmUgcHJvdmlkZWQgaW4gY3JlYXRlUmVuZGVyZXIoKS5cbiAgICAgICAgICBjb25zdCBlbmdpbmUgPSDJtWNyZWF0ZUVuZ2luZSh0aGlzLmFuaW1hdGlvblR5cGUsIHRoaXMuZG9jKTtcbiAgICAgICAgICBjb25zdCByZW5kZXJlckZhY3RvcnkgPSBuZXcgybVBbmltYXRpb25SZW5kZXJlckZhY3RvcnkodGhpcy5kZWxlZ2F0ZSwgZW5naW5lLCB0aGlzLnpvbmUpO1xuICAgICAgICAgIHRoaXMuZGVsZWdhdGUgPSByZW5kZXJlckZhY3Rvcnk7XG4gICAgICAgICAgcmV0dXJuIHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgZGVsZWdhdGluZyB0aGUgcmVuZGVyZXIgY3JlYXRpb24gdG8gdGhlIGZhY3Rvcmllcy5cbiAgICogSXQgdXNlcyBkZWZhdWx0IGZhY3Rvcnkgd2hpbGUgdGhlIGFuaW1hdGlvbiBmYWN0b3J5IGlzbid0IGxvYWRlZFxuICAgKiBhbmQgd2lsbCByZWx5IG9uIHRoZSBhbmltYXRpb24gZmFjdG9yeSBvbmNlIGl0IGlzIGxvYWRlZC5cbiAgICpcbiAgICogQ2FsbGluZyB0aGlzIG1ldGhvZCB3aWxsIHRyaWdnZXIgYXMgc2lkZSBlZmZlY3QgdGhlIGxvYWRpbmcgb2YgdGhlIGFuaW1hdGlvbiBtb2R1bGVcbiAgICogaWYgdGhlIHJlbmRlcmVyZWQgY29tcG9uZW50IHVzZXMgYW5pbWF0aW9ucy5cbiAgICovXG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHJlbmRlcmVyVHlwZTogUmVuZGVyZXJUeXBlMik6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmRlbGVnYXRlLmNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50LCByZW5kZXJlclR5cGUpO1xuXG4gICAgaWYgKChyZW5kZXJlciBhcyBBbmltYXRpb25SZW5kZXJlcikuybV0eXBlID09PSBBbmltYXRpb25SZW5kZXJlclR5cGUuUmVndWxhcikge1xuICAgICAgLy8gVGhlIGZhY3RvcnkgaXMgYWxyZWFkeSBsb2FkZWQsIHRoaXMgaXMgYW4gYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgICByZXR1cm4gcmVuZGVyZXI7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0byBwcmV2ZW50IHRoZSBEb21SZW5kZXJlciB0byB0aHJvdyBhbiBlcnJvciBiZWNhdXNlIG9mIHN5bnRoZXRpYyBwcm9wZXJ0aWVzXG4gICAgaWYgKHR5cGVvZiAocmVuZGVyZXIgYXMgYW55KS50aHJvd09uU3ludGhldGljUHJvcHMgPT09ICdib29sZWFuJykge1xuICAgICAgKHJlbmRlcmVyIGFzIGFueSkudGhyb3dPblN5bnRoZXRpY1Byb3BzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVXNpbmcgYSBkeW5hbWljIHJlbmRlcmVyIHRvIHN3aXRjaCB0aGUgcmVuZGVyZXIgaW1wbGVtZW50YXRpb24gb25jZSB0aGUgbW9kdWxlIGlzIGxvYWRlZC5cbiAgICBjb25zdCBkeW5hbWljUmVuZGVyZXIgPSBuZXcgRHluYW1pY0RlbGVnYXRpb25SZW5kZXJlcihyZW5kZXJlcik7XG5cbiAgICAvLyBLaWNrIG9mZiB0aGUgbW9kdWxlIGxvYWRpbmcgaWYgdGhlIGNvbXBvbmVudCB1c2VzIGFuaW1hdGlvbnMgYnV0IHRoZSBtb2R1bGUgaGFzbid0IGJlZW5cbiAgICAvLyBsb2FkZWQgeWV0LlxuICAgIGlmIChyZW5kZXJlclR5cGU/LmRhdGE/LlsnYW5pbWF0aW9uJ10gJiYgIXRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2UpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2UgPSB0aGlzLmxvYWRJbXBsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5UHJvbWlzZVxuICAgICAgICA/LnRoZW4oKGFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFuaW1hdGlvblJlbmRlcmVyID1cbiAgICAgICAgICAgICAgYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50LCByZW5kZXJlclR5cGUpO1xuICAgICAgICAgIGR5bmFtaWNSZW5kZXJlci51c2UoYW5pbWF0aW9uUmVuZGVyZXIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgLy8gUGVybWFuZW50bHkgdXNlIHJlZ3VsYXIgcmVuZGVyZXIgd2hlbiBsb2FkaW5nIGZhaWxzLlxuICAgICAgICAgIGR5bmFtaWNSZW5kZXJlci51c2UocmVuZGVyZXIpO1xuICAgICAgICB9KTtcblxuICAgIHJldHVybiBkeW5hbWljUmVuZGVyZXI7XG4gIH1cblxuICBiZWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmJlZ2luPy4oKTtcbiAgfVxuXG4gIGVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmVuZD8uKCk7XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZT8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS53aGVuUmVuZGVyaW5nRG9uZT8uKCkgPz8gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgY2xhc3MgYWxsb3dzIHRvIGR5bmFtaWNseSBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zXG4gKiBieSBjaGFuZ2luZyB0aGUgZGVsZWdhdGUgcmVuZGVyZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljRGVsZWdhdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgLy8gTGlzdCBvZiBjYWxsYmFja3MgdGhhdCBuZWVkIHRvIGJlIHJlcGxheWVkIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgb25jZSBpdHMgbG9hZGVkXG4gIHByaXZhdGUgcmVwbGF5OiAoKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHZvaWQpW118bnVsbCA9IFtdO1xuICByZWFkb25seSDJtXR5cGUgPSBBbmltYXRpb25SZW5kZXJlclR5cGUuRGVsZWdhdGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVsZWdhdGU6IFJlbmRlcmVyMikge31cblxuICB1c2UoaW1wbDogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGltcGw7XG5cbiAgICBpZiAodGhpcy5yZXBsYXkgIT09IG51bGwpIHtcbiAgICAgIC8vIFJlcGxheSBxdWV1ZWQgYWN0aW9ucyB1c2luZyB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIHRvIGFwcGx5XG4gICAgICAvLyBhbGwgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzIGNvbGxlY3RlZCB3aGlsZSBsb2FkaW5nIHdhcyBpbiBwcm9ncmVzcy5cbiAgICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5yZXBsYXkpIHtcbiAgICAgICAgZm4oaW1wbCk7XG4gICAgICB9XG4gICAgICAvLyBTZXQgdG8gYG51bGxgIHRvIGluZGljYXRlIHRoYXQgdGhlIHF1ZXVlIHdhcyBwcm9jZXNzZWRcbiAgICAgIC8vIGFuZCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllcy5cbiAgICAgIHRoaXMucmVwbGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgZGF0YSgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGF0YTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlRWxlbWVudChuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZVRleHQodmFsdWUpO1xuICB9XG5cbiAgZ2V0IGRlc3Ryb3lOb2RlKCk6ICgobm9kZTogYW55KSA9PiB2b2lkKXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kZXN0cm95Tm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSwgaXNNb3ZlPzogYm9vbGVhbnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmluc2VydEJlZm9yZShwYXJlbnQsIG5ld0NoaWxkLCByZWZDaGlsZCwgaXNNb3ZlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50PzogYm9vbGVhbnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUNoaWxkKHBhcmVudCwgb2xkQ2hpbGQsIGlzSG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbnx1bmRlZmluZWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnBhcmVudE5vZGUobm9kZSk7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm5leHRTaWJsaW5nKG5vZGUpO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGx8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFkZENsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0U3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgYW5pbWF0aW9uIHByb3BlcnRpZXMgc2V0IG9uIGRlZmF1bHQgcmVuZGVyZXJcbiAgICAvLyBTbyB3ZSBjYW4gYWxzbyBzZXQgdGhlbSBhbHNvIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkobmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpKTtcbiAgICB9XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBldmVudHMgcmVnaXN0cmVkIGJ5IHRoZSBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gcmVnaXN0ZXIgdGhlbSBhZ2FpbnN0IHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkoZXZlbnROYW1lKSkge1xuICAgICAgdGhpcy5yZXBsYXkhLnB1c2goKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFJlcGxheShwcm9wT3JFdmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vYG51bGxgIGluZGljYXRlcyB0aGF0IHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgcmV0dXJuIHRoaXMucmVwbGF5ICE9PSBudWxsICYmIHByb3BPckV2ZW50TmFtZS5zdGFydHNXaXRoKEFOSU1BVElPTl9QUkVGSVgpO1xuICB9XG59XG4iXX0=