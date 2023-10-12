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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUEwRSxhQUFhLElBQUksWUFBWSxFQUFrRCxNQUFNLGVBQWUsQ0FBQztBQVN0TCxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUU3QixNQUFNLE9BQU8sNkJBQTZCO0lBR3hDOzs7T0FHRztJQUNILFlBQ1ksR0FBYSxFQUFVLFFBQTBCLEVBQVUsSUFBWSxFQUN2RSxhQUFrQyxFQUNsQyxVQUFtRDtRQUZuRCxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ3ZFLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUF5QztRQVR2RCw0QkFBdUIsR0FBMkMsSUFBSSxDQUFDO0lBU2IsQ0FBQztJQUVuRTs7T0FFRztJQUNLLFFBQVE7UUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBRTVFLE9BQU8sVUFBVTthQUNaLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1gsTUFBTSxJQUFJLFlBQVksdUVBRWxCLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQztnQkFDM0MsMkNBQTJDO29CQUN2Qyw4RUFBOEU7b0JBQzlFLHFFQUFxRSxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsRUFBQyxhQUFhLEVBQUUseUJBQXlCLEVBQUMsRUFBRSxFQUFF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RTtRQUMxRSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHR5cGUge8m1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5IGFzIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSwgybVBbmltYXRpb25SZW5kZXJlciBhcyBBbmltYXRpb25SZW5kZXJlciwgybVCYXNlQW5pbWF0aW9uUmVuZGVyZXIgYXMgQmFzZUFuaW1hdGlvblJlbmRlcmVyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtOZ1pvbmUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yLCDJtUFuaW1hdGlvblJlbmRlcmVyVHlwZSBhcyBBbmltYXRpb25SZW5kZXJlclR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtVJ1bnRpbWVFcnJvckNvZGUgYXMgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vKipcbiAqIFRoaXMgYWxpYXMgbmFycm93cyBkb3duIHRvIG9ubHkgdGhlIHByb3BlcnRpZXMgd2UgbmVlZCB3aGVuIGxhenkgbG9hZGluZyAob3IgbW9jaykgdGhlIG1vZHVsZVxuICovXG50eXBlIEFuaW1hdGlvbkJyb3dzZXJNb2R1bGVJbXBvcnRzID1cbiAgICBQaWNrPHR5cGVvZiBpbXBvcnQoJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3NlcicpLCAnybVjcmVhdGVFbmdpbmUnfCfJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSc+O1xuXG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5cbmV4cG9ydCBjbGFzcyBBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9yZW5kZXJlckZhY3RvcnlQcm9taXNlOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT58bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVJbXBsIGFsbG93cyB0byBwcm92aWRlIGEgbW9jayBpbXBsbWVudGF0aW9uIChvciB3aWxsIGxvYWQgdGhlIGFuaW1hdGlvbiBtb2R1bGUpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZG9jOiBEb2N1bWVudCwgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIGFuaW1hdGlvblR5cGU6ICdhbmltYXRpb25zJ3wnbm9vcCcsXG4gICAgICBwcml2YXRlIG1vZHVsZUltcGw/OiBQcm9taXNlPEFuaW1hdGlvbkJyb3dzZXJNb2R1bGVJbXBvcnRzPikge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIGxvYWRJbXBsKCk6IFByb21pc2U8QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5PiB7XG4gICAgY29uc3QgbW9kdWxlSW1wbCA9IHRoaXMubW9kdWxlSW1wbCA/PyBpbXBvcnQoJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3NlcicpO1xuXG4gICAgcmV0dXJuIG1vZHVsZUltcGxcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICAgICAgUnVudGltZUVycm9yQ29kZS5BTklNQVRJT05fUkVOREVSRVJfQVNZTkNfTE9BRElOR19GQUlMVVJFLFxuICAgICAgICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgJ0FzeW5jIGxvYWRpbmcgZm9yIGFuaW1hdGlvbnMgcGFja2FnZSB3YXMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgJ2VuYWJsZWQsIGJ1dCBsb2FkaW5nIGZhaWxlZC4gQW5ndWxhciBmYWxscyBiYWNrIHRvIHVzaW5nIHJlZ3VsYXIgcmVuZGVyaW5nLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAnTm8gYW5pbWF0aW9ucyB3aWxsIGJlIGRpc3BsYXllZCBhbmQgdGhlaXIgc3R5bGVzIHdvblxcJ3QgYmUgYXBwbGllZC4nKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHvJtWNyZWF0ZUVuZ2luZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9KSA9PiB7XG4gICAgICAgICAgLy8gV2UgY2FuJ3QgY3JlYXRlIHRoZSByZW5kZXJlciB5ZXQgYmVjYXVzZSB3ZSBtaWdodCBuZWVkIHRoZSBob3N0RWxlbWVudCBhbmQgdGhlIHR5cGVcbiAgICAgICAgICAvLyBCb3RoIGFyZSBwcm92aWRlZCBpbiBjcmVhdGVSZW5kZXJlcigpLlxuICAgICAgICAgIGNvbnN0IGVuZ2luZSA9IMm1Y3JlYXRlRW5naW5lKHRoaXMuYW5pbWF0aW9uVHlwZSwgdGhpcy5kb2MpO1xuICAgICAgICAgIGNvbnN0IHJlbmRlcmVyRmFjdG9yeSA9IG5ldyDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSh0aGlzLmRlbGVnYXRlLCBlbmdpbmUsIHRoaXMuem9uZSk7XG4gICAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyZXJGYWN0b3J5O1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBkZWxlZ2F0aW5nIHRoZSByZW5kZXJlciBjcmVhdGlvbiB0byB0aGUgZmFjdG9yaWVzLlxuICAgKiBJdCB1c2VzIGRlZmF1bHQgZmFjdG9yeSB3aGlsZSB0aGUgYW5pbWF0aW9uIGZhY3RvcnkgaXNuJ3QgbG9hZGVkXG4gICAqIGFuZCB3aWxsIHJlbHkgb24gdGhlIGFuaW1hdGlvbiBmYWN0b3J5IG9uY2UgaXQgaXMgbG9hZGVkLlxuICAgKlxuICAgKiBDYWxsaW5nIHRoaXMgbWV0aG9kIHdpbGwgdHJpZ2dlciBhcyBzaWRlIGVmZmVjdCB0aGUgbG9hZGluZyBvZiB0aGUgYW5pbWF0aW9uIG1vZHVsZVxuICAgKiBpZiB0aGUgcmVuZGVyZXJlZCBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zLlxuICAgKi9cbiAgY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQ6IGFueSwgcmVuZGVyZXJUeXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHJlbmRlcmVyVHlwZSk7XG5cbiAgICBpZiAoKHJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyKS7JtXR5cGUgPT09IEFuaW1hdGlvblJlbmRlcmVyVHlwZS5SZWd1bGFyKSB7XG4gICAgICAvLyBUaGUgZmFjdG9yeSBpcyBhbHJlYWR5IGxvYWRlZCwgdGhpcyBpcyBhbiBhbmltYXRpb24gcmVuZGVyZXJcbiAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHByZXZlbnQgdGhlIERvbVJlbmRlcmVyIHRvIHRocm93IGFuIGVycm9yIGJlY2F1c2Ugb2Ygc3ludGhldGljIHByb3BlcnRpZXNcbiAgICBpZiAodHlwZW9mIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAocmVuZGVyZXIgYXMgYW55KS50aHJvd09uU3ludGhldGljUHJvcHMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBVc2luZyBhIGR5bmFtaWMgcmVuZGVyZXIgdG8gc3dpdGNoIHRoZSByZW5kZXJlciBpbXBsZW1lbnRhdGlvbiBvbmNlIHRoZSBtb2R1bGUgaXMgbG9hZGVkLlxuICAgIGNvbnN0IGR5bmFtaWNSZW5kZXJlciA9IG5ldyBEeW5hbWljRGVsZWdhdGlvblJlbmRlcmVyKHJlbmRlcmVyKTtcblxuICAgIC8vIEtpY2sgb2ZmIHRoZSBtb2R1bGUgbG9hZGluZyBpZiB0aGUgY29tcG9uZW50IHVzZXMgYW5pbWF0aW9ucyBidXQgdGhlIG1vZHVsZSBoYXNuJ3QgYmVlblxuICAgIC8vIGxvYWRlZCB5ZXQuXG4gICAgaWYgKHJlbmRlcmVyVHlwZT8uZGF0YT8uWydhbmltYXRpb24nXSAmJiAhdGhpcy5fcmVuZGVyZXJGYWN0b3J5UHJvbWlzZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5UHJvbWlzZSA9IHRoaXMubG9hZEltcGwoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlXG4gICAgICAgID8udGhlbigoYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgYW5pbWF0aW9uUmVuZGVyZXIgPVxuICAgICAgICAgICAgICBhbmltYXRpb25SZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHJlbmRlcmVyVHlwZSk7XG4gICAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShhbmltYXRpb25SZW5kZXJlcik7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAvLyBQZXJtYW5lbnRseSB1c2UgcmVndWxhciByZW5kZXJlciB3aGVuIGxvYWRpbmcgZmFpbHMuXG4gICAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShyZW5kZXJlcik7XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGR5bmFtaWNSZW5kZXJlcjtcbiAgfVxuXG4gIGJlZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYmVnaW4/LigpO1xuICB9XG5cbiAgZW5kKCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuZW5kPy4oKTtcbiAgfVxuXG4gIHdoZW5SZW5kZXJpbmdEb25lPygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLndoZW5SZW5kZXJpbmdEb25lPy4oKSA/PyBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBjbGFzcyBhbGxvd3MgdG8gZHluYW1pY2x5IHN3aXRjaCBiZXR3ZWVuIGRpZmZlcmVudCByZW5kZXJlciBpbXBsZW1lbnRhdGlvbnNcbiAqIGJ5IGNoYW5naW5nIHRoZSBkZWxlZ2F0ZSByZW5kZXJlci5cbiAqL1xuZXhwb3J0IGNsYXNzIER5bmFtaWNEZWxlZ2F0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICAvLyBMaXN0IG9mIGNhbGxiYWNrcyB0aGF0IG5lZWQgdG8gYmUgcmVwbGF5ZWQgb24gdGhlIGFuaW1hdGlvbiByZW5kZXJlciBvbmNlIGl0cyBsb2FkZWRcbiAgcHJpdmF0ZSByZXBsYXk6ICgocmVuZGVyZXI6IFJlbmRlcmVyMikgPT4gdm9pZClbXXxudWxsID0gW107XG4gIHJlYWRvbmx5IMm1dHlwZSA9IEFuaW1hdGlvblJlbmRlcmVyVHlwZS5EZWxlZ2F0ZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXIyKSB7fVxuXG4gIHVzZShpbXBsOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gaW1wbDtcblxuICAgIGlmICh0aGlzLnJlcGxheSAhPT0gbnVsbCkge1xuICAgICAgLy8gUmVwbGF5IHF1ZXVlZCBhY3Rpb25zIHVzaW5nIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgdG8gYXBwbHlcbiAgICAgIC8vIGFsbCBldmVudHMgYW5kIHByb3BlcnRpZXMgY29sbGVjdGVkIHdoaWxlIGxvYWRpbmcgd2FzIGluIHByb2dyZXNzLlxuICAgICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLnJlcGxheSkge1xuICAgICAgICBmbihpbXBsKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCB0byBgbnVsbGAgdG8gaW5kaWNhdGUgdGhhdCB0aGUgcXVldWUgd2FzIHByb2Nlc3NlZFxuICAgICAgLy8gYW5kIHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzLlxuICAgICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxheSA9IG51bGw7XG4gICAgdGhpcy5kZWxlZ2F0ZS5kZXN0cm95KCk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGwpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgZGVzdHJveU5vZGUoKTogKChub2RlOiBhbnkpID0+IHZvaWQpfG51bGwge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmRlc3Ryb3lOb2RlO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFwcGVuZENoaWxkKHBhcmVudCwgbmV3Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55LCBpc01vdmU/OiBib29sZWFufHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkLCBpc01vdmUpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ/OiBib29sZWFufHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2hpbGQocGFyZW50LCBvbGRDaGlsZCwgaXNIb3N0RWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFufHVuZGVmaW5lZCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGUsIHByZXNlcnZlQ29udGVudCk7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUucGFyZW50Tm9kZShub2RlKTtcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubmV4dFNpYmxpbmcobm9kZSk7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbHx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVTdHlsZShlbCwgc3R5bGUsIGZsYWdzKTtcbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBhbmltYXRpb24gcHJvcGVydGllcyBzZXQgb24gZGVmYXVsdCByZW5kZXJlclxuICAgIC8vIFNvIHdlIGNhbiBhbHNvIHNldCB0aGVtIGFsc28gb24gdGhlIGFuaW1hdGlvbiByZW5kZXJlclxuICAgIGlmICh0aGlzLnNob3VsZFJlcGxheShuYW1lKSkge1xuICAgICAgdGhpcy5yZXBsYXkhLnB1c2goKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHJlbmRlcmVyLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSkpO1xuICAgIH1cbiAgICB0aGlzLmRlbGVnYXRlLnNldFByb3BlcnR5KGVsLCBuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKG5vZGUsIHZhbHVlKTtcbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgYW5pbWF0aW9uIGV2ZW50cyByZWdpc3RyZWQgYnkgdGhlIGRlZmF1bHQgcmVuZGVyZXJcbiAgICAvLyBTbyB3ZSBjYW4gYWxzbyByZWdpc3RlciB0aGVtIGFnYWluc3QgdGhlIGFuaW1hdGlvbiByZW5kZXJlclxuICAgIGlmICh0aGlzLnNob3VsZFJlcGxheShldmVudE5hbWUpKSB7XG4gICAgICB0aGlzLnJlcGxheSEucHVzaCgocmVuZGVyZXI6IFJlbmRlcmVyMikgPT4gcmVuZGVyZXIubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkUmVwbGF5KHByb3BPckV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy9gbnVsbGAgaW5kaWNhdGVzIHRoYXQgd2Ugbm8gbG9uZ2VyIG5lZWQgdG8gY29sbGVjdCBldmVudHMgYW5kIHByb3BlcnRpZXNcbiAgICByZXR1cm4gdGhpcy5yZXBsYXkgIT09IG51bGwgJiYgcHJvcE9yRXZlbnROYW1lLnN0YXJ0c1dpdGgoQU5JTUFUSU9OX1BSRUZJWCk7XG4gIH1cbn1cbiJdfQ==