import { inject, Injectable, NgZone, RendererFactory2, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵRuntimeError as RuntimeError, InjectionToken, } from '@angular/core';
import * as i0 from "@angular/core";
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
        this.scheduler = inject(ChangeDetectionScheduler, { optional: true });
        this.loadingSchedulerFn = inject(ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
            optional: true,
        });
    }
    /** @nodoc */
    ngOnDestroy() {
        // When the root view is removed, the renderer defers the actual work to the
        // `TransitionAnimationEngine` to do this, and the `TransitionAnimationEngine` doesn't actually
        // remove the DOM node, but just calls `markElementAsRemoved()`. The actual DOM node is not
        // removed until `TransitionAnimationEngine` "flushes".
        // Note: we already flush on destroy within the `InjectableAnimationEngine`. The injectable
        // engine is not provided when async animations are used.
        this._engine?.flush();
    }
    /**
     * @internal
     */
    loadImpl() {
        // Note on the `.then(m => m)` part below: Closure compiler optimizations in g3 require
        // `.then` to be present for a dynamic import (or an import should be `await`ed) to detect
        // the set of imported symbols.
        const loadFn = () => this.moduleImpl ?? import('@angular/animations/browser').then((m) => m);
        let moduleImplPromise;
        if (this.loadingSchedulerFn) {
            moduleImplPromise = this.loadingSchedulerFn(loadFn);
        }
        else {
            moduleImplPromise = loadFn();
        }
        return moduleImplPromise
            .catch((e) => {
            throw new RuntimeError(5300 /* RuntimeErrorCode.ANIMATION_RENDERER_ASYNC_LOADING_FAILURE */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                'Async loading for animations package was ' +
                    'enabled, but loading failed. Angular falls back to using regular rendering. ' +
                    "No animations will be displayed and their styles won't be applied.");
        })
            .then(({ ɵcreateEngine, ɵAnimationRendererFactory }) => {
            // We can't create the renderer yet because we might need the hostElement and the type
            // Both are provided in createRenderer().
            this._engine = ɵcreateEngine(this.animationType, this.doc);
            const rendererFactory = new ɵAnimationRendererFactory(this.delegate, this._engine, this.zone);
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
            this.scheduler?.notify(10 /* NotificationSource.AsyncAnimationsLoaded */);
        })
            .catch((e) => {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.2+sha-1853bbb", ngImport: i0, type: AsyncAnimationRendererFactory, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.2+sha-1853bbb", ngImport: i0, type: AsyncAnimationRendererFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.2+sha-1853bbb", ngImport: i0, type: AsyncAnimationRendererFactory, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: Document }, { type: i0.RendererFactory2 }, { type: i0.NgZone }, { type: undefined }, { type: Promise }] });
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
/**
 * Provides a custom scheduler function for the async loading of the animation package.
 *
 * Private token for investigation purposes
 */
export const ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(ngDevMode ? 'async_animation_loading_scheduler_fn' : '');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUdOLGdCQUFnQixFQUloQix5QkFBeUIsSUFBSSx3QkFBd0IsRUFFckQsYUFBYSxJQUFJLFlBQVksRUFFN0IsY0FBYyxHQUNmLE1BQU0sZUFBZSxDQUFDOztBQUd2QixNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUc3QixNQUFNLE9BQU8sNkJBQTZCO0lBUXhDOzs7T0FHRztJQUNILFlBQ1UsR0FBYSxFQUNiLFFBQTBCLEVBQzFCLElBQVksRUFDWixhQUFvQyxFQUNwQyxVQUdOO1FBUE0sUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUNiLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FHaEI7UUFuQkksNEJBQXVCLEdBQTZDLElBQUksQ0FBQztRQUNoRSxjQUFTLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0QsdUJBQWtCLEdBQUcsTUFBTSxDQUFDLHFDQUFxQyxFQUFFO1lBQ2xGLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBZ0JBLENBQUM7SUFFSixhQUFhO0lBQ2IsV0FBVztRQUNULDRFQUE0RTtRQUM1RSwrRkFBK0Y7UUFDL0YsMkZBQTJGO1FBQzNGLHVEQUF1RDtRQUN2RCwyRkFBMkY7UUFDM0YseURBQXlEO1FBQ3pELElBQUksQ0FBQyxPQUFPLEVB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QUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFDQUFxQyxHQUFHLElBQUksY0FBYyxDQUNyRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBhcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge1xuICBpbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczIsXG4gIFJlbmRlcmVyVHlwZTIsXG4gIMm1QW5pbWF0aW9uUmVuZGVyZXJUeXBlIGFzIEFuaW1hdGlvblJlbmRlcmVyVHlwZSxcbiAgybVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLFxuICDJtU5vdGlmaWNhdGlvblNvdXJjZSBhcyBOb3RpZmljYXRpb25Tb3VyY2UsXG4gIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcixcbiAgSW5qZWN0b3IsXG4gIEluamVjdGlvblRva2VuLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVSdW50aW1lRXJyb3JDb2RlIGFzIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBBTklNQVRJT05fUFJFRklYID0gJ0AnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXN5bmNBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9yZW5kZXJlckZhY3RvcnlQcm9taXNlOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBzY2hlZHVsZXIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLCB7b3B0aW9uYWw6IHRydWV9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2FkaW5nU2NoZWR1bGVyRm4gPSBpbmplY3QoybVBU1lOQ19BTklNQVRJT05fTE9BRElOR19TQ0hFRFVMRVJfRk4sIHtcbiAgICBvcHRpb25hbDogdHJ1ZSxcbiAgfSk7XG4gIHByaXZhdGUgX2VuZ2luZT86IEFuaW1hdGlvbkVuZ2luZTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZUltcGwgYWxsb3dzIHRvIHByb3ZpZGUgYSBtb2NrIGltcGxtZW50YXRpb24gKG9yIHdpbGwgbG9hZCB0aGUgYW5pbWF0aW9uIG1vZHVsZSlcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZG9jOiBEb2N1bWVudCxcbiAgICBwcml2YXRlIGRlbGVnYXRlOiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgYW5pbWF0aW9uVHlwZTogJ2FuaW1hdGlvbnMnIHwgJ25vb3AnLFxuICAgIHByaXZhdGUgbW9kdWxlSW1wbD86IFByb21pc2U8e1xuICAgICAgybVjcmVhdGVFbmdpbmU6ICh0eXBlOiAnYW5pbWF0aW9ucycgfCAnbm9vcCcsIGRvYzogRG9jdW1lbnQpID0+IEFuaW1hdGlvbkVuZ2luZTtcbiAgICAgIMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5OiB0eXBlb2YgQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5O1xuICAgIH0+LFxuICApIHt9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAvLyBXaGVuIHRoZSByb290IHZpZXcgaXMgcmVtb3ZlZCwgdGhlIHJlbmRlcmVyIGRlZmVycyB0aGUgYWN0dWFsIHdvcmsgdG8gdGhlXG4gICAgLy8gYFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmVgIHRvIGRvIHRoaXMsIGFuZCB0aGUgYFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmVgIGRvZXNuJ3QgYWN0dWFsbHlcbiAgICAvLyByZW1vdmUgdGhlIERPTSBub2RlLCBidXQganVzdCBjYWxscyBgbWFya0VsZW1lbnRBc1JlbW92ZWQoKWAuIFRoZSBhY3R1YWwgRE9NIG5vZGUgaXMgbm90XG4gICAgLy8gcmVtb3ZlZCB1bnRpbCBgVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZWAgXCJmbHVzaGVzXCIuXG4gICAgLy8gTm90ZTogd2UgYWxyZWFkeSBmbHVzaCBvbiBkZXN0cm95IHdpdGhpbiB0aGUgYEluamVjdGFibGVBbmltYXRpb25FbmdpbmVgLiBUaGUgaW5qZWN0YWJsZVxuICAgIC8vIGVuZ2luZSBpcyBub3QgcHJvdmlkZWQgd2hlbiBhc3luYyBhbmltYXRpb25zIGFyZSB1c2VkLlxuICAgIHRoaXMuX2VuZ2luZT8uZmx1c2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgbG9hZEltcGwoKTogUHJvbWlzZTxBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk+IHtcbiAgICAvLyBOb3RlIG9uIHRoZSBgLnRoZW4obSA9PiBtKWAgcGFydCBiZWxvdzogQ2xvc3VyZSBjb21waWxlciBvcHRpbWl6YXRpb25zIGluIGczIHJlcXVpcmVcbiAgICAvLyBgLnRoZW5gIHRvIGJlIHByZXNlbnQgZm9yIGEgZHluYW1pYyBpbXBvcnQgKG9yIGFuIGltcG9ydCBzaG91bGQgYmUgYGF3YWl0YGVkKSB0byBkZXRlY3RcbiAgICAvLyB0aGUgc2V0IG9mIGltcG9ydGVkIHN5bWJvbHMuXG4gICAgY29uc3QgbG9hZEZuID0gKCkgPT4gdGhpcy5tb2R1bGVJbXBsID8/IGltcG9ydCgnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJykudGhlbigobSkgPT4gbSk7XG5cbiAgICBsZXQgbW9kdWxlSW1wbFByb21pc2U6IHR5cGVvZiB0aGlzLm1vZHVsZUltcGw7XG4gICAgaWYgKHRoaXMubG9hZGluZ1NjaGVkdWxlckZuKSB7XG4gICAgICBtb2R1bGVJbXBsUHJvbWlzZSA9IHRoaXMubG9hZGluZ1NjaGVkdWxlckZuKGxvYWRGbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZHVsZUltcGxQcm9taXNlID0gbG9hZEZuKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZUltcGxQcm9taXNlXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLkFOSU1BVElPTl9SRU5ERVJFUl9BU1lOQ19MT0FESU5HX0ZBSUxVUkUsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICdBc3luYyBsb2FkaW5nIGZvciBhbmltYXRpb25zIHBhY2thZ2Ugd2FzICcgK1xuICAgICAgICAgICAgICAnZW5hYmxlZCwgYnV0IGxvYWRpbmcgZmFpbGVkLiBBbmd1bGFyIGZhbGxzIGJhY2sgdG8gdXNpbmcgcmVndWxhciByZW5kZXJpbmcuICcgK1xuICAgICAgICAgICAgICBcIk5vIGFuaW1hdGlvbnMgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHRoZWlyIHN0eWxlcyB3b24ndCBiZSBhcHBsaWVkLlwiLFxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh7ybVjcmVhdGVFbmdpbmUsIMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5fSkgPT4ge1xuICAgICAgICAvLyBXZSBjYW4ndCBjcmVhdGUgdGhlIHJlbmRlcmVyIHlldCBiZWNhdXNlIHdlIG1pZ2h0IG5lZWQgdGhlIGhvc3RFbGVtZW50IGFuZCB0aGUgdHlwZVxuICAgICAgICAvLyBCb3RoIGFyZSBwcm92aWRlZCBpbiBjcmVhdGVSZW5kZXJlcigpLlxuICAgICAgICB0aGlzLl9lbmdpbmUgPSDJtWNyZWF0ZUVuZ2luZSh0aGlzLmFuaW1hdGlvblR5cGUsIHRoaXMuZG9jKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXJGYWN0b3J5ID0gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KFxuICAgICAgICAgIHRoaXMuZGVsZWdhdGUsXG4gICAgICAgICAgdGhpcy5fZW5naW5lLFxuICAgICAgICAgIHRoaXMuem9uZSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGRlbGVnYXRpbmcgdGhlIHJlbmRlcmVyIGNyZWF0aW9uIHRvIHRoZSBmYWN0b3JpZXMuXG4gICAqIEl0IHVzZXMgZGVmYXVsdCBmYWN0b3J5IHdoaWxlIHRoZSBhbmltYXRpb24gZmFjdG9yeSBpc24ndCBsb2FkZWRcbiAgICogYW5kIHdpbGwgcmVseSBvbiB0aGUgYW5pbWF0aW9uIGZhY3Rvcnkgb25jZSBpdCBpcyBsb2FkZWQuXG4gICAqXG4gICAqIENhbGxpbmcgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIGFzIHNpZGUgZWZmZWN0IHRoZSBsb2FkaW5nIG9mIHRoZSBhbmltYXRpb24gbW9kdWxlXG4gICAqIGlmIHRoZSByZW5kZXJlcmVkIGNvbXBvbmVudCB1c2VzIGFuaW1hdGlvbnMuXG4gICAqL1xuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgcmVuZGVyZXJUeXBlKTtcblxuICAgIGlmICgocmVuZGVyZXIgYXMgQW5pbWF0aW9uUmVuZGVyZXIpLsm1dHlwZSA9PT0gQW5pbWF0aW9uUmVuZGVyZXJUeXBlLlJlZ3VsYXIpIHtcbiAgICAgIC8vIFRoZSBmYWN0b3J5IGlzIGFscmVhZHkgbG9hZGVkLCB0aGlzIGlzIGFuIGFuaW1hdGlvbiByZW5kZXJlclxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcHJldmVudCB0aGUgRG9tUmVuZGVyZXIgdG8gdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSBvZiBzeW50aGV0aWMgcHJvcGVydGllc1xuICAgIGlmICh0eXBlb2YgKHJlbmRlcmVyIGFzIGFueSkudGhyb3dPblN5bnRoZXRpY1Byb3BzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFVzaW5nIGEgZHluYW1pYyByZW5kZXJlciB0byBzd2l0Y2ggdGhlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9uIG9uY2UgdGhlIG1vZHVsZSBpcyBsb2FkZWQuXG4gICAgY29uc3QgZHluYW1pY1JlbmRlcmVyID0gbmV3IER5bmFtaWNEZWxlZ2F0aW9uUmVuZGVyZXIocmVuZGVyZXIpO1xuXG4gICAgLy8gS2ljayBvZmYgdGhlIG1vZHVsZSBsb2FkaW5nIGlmIHRoZSBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zIGJ1dCB0aGUgbW9kdWxlIGhhc24ndCBiZWVuXG4gICAgLy8gbG9hZGVkIHlldC5cbiAgICBpZiAocmVuZGVyZXJUeXBlPy5kYXRhPy5bJ2FuaW1hdGlvbiddICYmICF0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlID0gdGhpcy5sb2FkSW1wbCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2VcbiAgICAgID8udGhlbigoYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KSA9PiB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblJlbmRlcmVyID0gYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKFxuICAgICAgICAgIGhvc3RFbGVtZW50LFxuICAgICAgICAgIHJlbmRlcmVyVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShhbmltYXRpb25SZW5kZXJlcik7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyPy5ub3RpZnkoTm90aWZpY2F0aW9uU291cmNlLkFzeW5jQW5pbWF0aW9uc0xvYWRlZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIC8vIFBlcm1hbmVudGx5IHVzZSByZWd1bGFyIHJlbmRlcmVyIHdoZW4gbG9hZGluZyBmYWlscy5cbiAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShyZW5kZXJlcik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBkeW5hbWljUmVuZGVyZXI7XG4gIH1cblxuICBiZWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmJlZ2luPy4oKTtcbiAgfVxuXG4gIGVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmVuZD8uKCk7XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZT8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS53aGVuUmVuZGVyaW5nRG9uZT8uKCkgPz8gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgY2xhc3MgYWxsb3dzIHRvIGR5bmFtaWNseSBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zXG4gKiBieSBjaGFuZ2luZyB0aGUgZGVsZWdhdGUgcmVuZGVyZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljRGVsZWdhdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgLy8gTGlzdCBvZiBjYWxsYmFja3MgdGhhdCBuZWVkIHRvIGJlIHJlcGxheWVkIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgb25jZSBpdHMgbG9hZGVkXG4gIHByaXZhdGUgcmVwbGF5OiAoKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHZvaWQpW10gfCBudWxsID0gW107XG4gIHJlYWRvbmx5IMm1dHlwZSA9IEFuaW1hdGlvblJlbmRlcmVyVHlwZS5EZWxlZ2F0ZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXIyKSB7fVxuXG4gIHVzZShpbXBsOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gaW1wbDtcblxuICAgIGlmICh0aGlzLnJlcGxheSAhPT0gbnVsbCkge1xuICAgICAgLy8gUmVwbGF5IHF1ZXVlZCBhY3Rpb25zIHVzaW5nIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgdG8gYXBwbHlcbiAgICAgIC8vIGFsbCBldmVudHMgYW5kIHByb3BlcnRpZXMgY29sbGVjdGVkIHdoaWxlIGxvYWRpbmcgd2FzIGluIHByb2dyZXNzLlxuICAgICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLnJlcGxheSkge1xuICAgICAgICBmbihpbXBsKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCB0byBgbnVsbGAgdG8gaW5kaWNhdGUgdGhhdCB0aGUgcXVldWUgd2FzIHByb2Nlc3NlZFxuICAgICAgLy8gYW5kIHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzLlxuICAgICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxheSA9IG51bGw7XG4gICAgdGhpcy5kZWxlZ2F0ZS5kZXN0cm95KCk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nIHwgbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVUZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBkZXN0cm95Tm9kZSgpOiAoKG5vZGU6IGFueSkgPT4gdm9pZCkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kZXN0cm95Tm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSwgaXNNb3ZlPzogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkLCBpc01vdmUpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ/OiBib29sZWFuIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnQsIG9sZENoaWxkLCBpc0hvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4gfCB1bmRlZmluZWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnBhcmVudE5vZGUobm9kZSk7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm5leHRTaWJsaW5nKG5vZGUpO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgYW5pbWF0aW9uIHByb3BlcnRpZXMgc2V0IG9uIGRlZmF1bHQgcmVuZGVyZXJcbiAgICAvLyBTbyB3ZSBjYW4gYWxzbyBzZXQgdGhlbSBhbHNvIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkobmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpKTtcbiAgICB9XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBldmVudHMgcmVnaXN0cmVkIGJ5IHRoZSBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gcmVnaXN0ZXIgdGhlbSBhZ2FpbnN0IHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkoZXZlbnROYW1lKSkge1xuICAgICAgdGhpcy5yZXBsYXkhLnB1c2goKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFJlcGxheShwcm9wT3JFdmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vYG51bGxgIGluZGljYXRlcyB0aGF0IHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgcmV0dXJuIHRoaXMucmVwbGF5ICE9PSBudWxsICYmIHByb3BPckV2ZW50TmFtZS5zdGFydHNXaXRoKEFOSU1BVElPTl9QUkVGSVgpO1xuICB9XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjdXN0b20gc2NoZWR1bGVyIGZ1bmN0aW9uIGZvciB0aGUgYXN5bmMgbG9hZGluZyBvZiB0aGUgYW5pbWF0aW9uIHBhY2thZ2UuXG4gKlxuICogUHJpdmF0ZSB0b2tlbiBmb3IgaW52ZXN0aWdhdGlvbiBwdXJwb3Nlc1xuICovXG5leHBvcnQgY29uc3QgybVBU1lOQ19BTklNQVRJT05fTE9BRElOR19TQ0hFRFVMRVJfRk4gPSBuZXcgSW5qZWN0aW9uVG9rZW48PFQ+KGxvYWRGbjogKCkgPT4gVCkgPT4gVD4oXG4gIG5nRGV2TW9kZSA/ICdhc3luY19hbmltYXRpb25fbG9hZGluZ19zY2hlZHVsZXJfZm4nIDogJycsXG4pO1xuIl19