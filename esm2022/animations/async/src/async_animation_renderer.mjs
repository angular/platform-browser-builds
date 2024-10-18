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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8+sha-b0ab653", ngImport: i0, type: AsyncAnimationRendererFactory, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8+sha-b0ab653", ngImport: i0, type: AsyncAnimationRendererFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8+sha-b0ab653", ngImport: i0, type: AsyncAnimationRendererFactory, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUdOLGdCQUFnQixFQUloQix5QkFBeUIsSUFBSSx3QkFBd0IsRUFFckQsYUFBYSxJQUFJLFlBQVksRUFFN0IsY0FBYyxHQUNmLE1BQU0sZUFBZSxDQUFDOztBQUd2QixNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUc3QixNQUFNLE9BQU8sNkJBQTZCO0lBUXhDOzs7T0FHRztJQUNILFlBQ1UsR0FBYSxFQUNiLFFBQTBCLEVBQzFCLElBQVksRUFDWixhQUFvQyxFQUNwQyxVQUdOO1FBUE0sUUFBRyxHQUFILEdBQUcsQ0FBVTtRQUNiLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7UUFDcEMsZUFBVSxHQUFWLFVBQVUsQ0FHaEI7UUFuQkksNEJBQXVCLEdBQTZDLElBQUksQ0FBQztRQUNoRSxjQUFTLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0QsdUJBQWtCLEdBQUcsTUFBTSxDQUFDLHFDQUFxQyxFQUFFO1lBQ2xGLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBZ0JBLENBQUM7SUFFSixhQUFhO0lBQ2IsV0FBVztRQUNULDRFQUE0RTtRQUM1RSwrRkFBK0Y7UUFDL0YsMkZBQTJGO1FBQzNGLHVEQUF1RDtRQUN2RCwyRkFBMkY7UUFDM0YseURBQXlEO1FBQ3pELElBQUksQ0FBQyxPQUFPLEVB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QUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFDQUFxQyxHQUFHLElBQUksY0FBYyxDQUNyRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIMm1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZSxcbiAgybVBbmltYXRpb25SZW5kZXJlciBhcyBBbmltYXRpb25SZW5kZXJlcixcbiAgybVBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgYXMgQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInO1xuaW1wb3J0IHtcbiAgaW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBSZW5kZXJlckZhY3RvcnkyLFxuICBSZW5kZXJlclN0eWxlRmxhZ3MyLFxuICBSZW5kZXJlclR5cGUyLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyVHlwZSBhcyBBbmltYXRpb25SZW5kZXJlclR5cGUsXG4gIMm1Q2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyIGFzIENoYW5nZURldGVjdGlvblNjaGVkdWxlcixcbiAgybVOb3RpZmljYXRpb25Tb3VyY2UgYXMgTm90aWZpY2F0aW9uU291cmNlLFxuICDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3IsXG4gIEluamVjdG9yLFxuICBJbmplY3Rpb25Ub2tlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1UnVudGltZUVycm9yQ29kZSBhcyBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgQU5JTUFUSU9OX1BSRUZJWCA9ICdAJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzeW5jQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5IGltcGxlbWVudHMgT25EZXN0cm95LCBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSBfcmVuZGVyZXJGYWN0b3J5UHJvbWlzZTogUHJvbWlzZTxBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2NoZWR1bGVyID0gaW5qZWN0KENoYW5nZURldGVjdGlvblNjaGVkdWxlciwge29wdGlvbmFsOiB0cnVlfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9hZGluZ1NjaGVkdWxlckZuID0gaW5qZWN0KMm1QVNZTkNfQU5JTUFUSU9OX0xPQURJTkdfU0NIRURVTEVSX0ZOLCB7XG4gICAgb3B0aW9uYWw6IHRydWUsXG4gIH0pO1xuICBwcml2YXRlIF9lbmdpbmU/OiBBbmltYXRpb25FbmdpbmU7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVJbXBsIGFsbG93cyB0byBwcm92aWRlIGEgbW9jayBpbXBsbWVudGF0aW9uIChvciB3aWxsIGxvYWQgdGhlIGFuaW1hdGlvbiBtb2R1bGUpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRvYzogRG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGFuaW1hdGlvblR5cGU6ICdhbmltYXRpb25zJyB8ICdub29wJyxcbiAgICBwcml2YXRlIG1vZHVsZUltcGw/OiBQcm9taXNlPHtcbiAgICAgIMm1Y3JlYXRlRW5naW5lOiAodHlwZTogJ2FuaW1hdGlvbnMnIHwgJ25vb3AnLCBkb2M6IERvY3VtZW50KSA9PiBBbmltYXRpb25FbmdpbmU7XG4gICAgICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeTogdHlwZW9mIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeTtcbiAgICB9PixcbiAgKSB7fVxuXG4gIC8qKiBAbm9kb2MgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gV2hlbiB0aGUgcm9vdCB2aWV3IGlzIHJlbW92ZWQsIHRoZSByZW5kZXJlciBkZWZlcnMgdGhlIGFjdHVhbCB3b3JrIHRvIHRoZVxuICAgIC8vIGBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lYCB0byBkbyB0aGlzLCBhbmQgdGhlIGBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lYCBkb2Vzbid0IGFjdHVhbGx5XG4gICAgLy8gcmVtb3ZlIHRoZSBET00gbm9kZSwgYnV0IGp1c3QgY2FsbHMgYG1hcmtFbGVtZW50QXNSZW1vdmVkKClgLiBUaGUgYWN0dWFsIERPTSBub2RlIGlzIG5vdFxuICAgIC8vIHJlbW92ZWQgdW50aWwgYFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmVgIFwiZmx1c2hlc1wiLlxuICAgIC8vIE5vdGU6IHdlIGFscmVhZHkgZmx1c2ggb24gZGVzdHJveSB3aXRoaW4gdGhlIGBJbmplY3RhYmxlQW5pbWF0aW9uRW5naW5lYC4gVGhlIGluamVjdGFibGVcbiAgICAvLyBlbmdpbmUgaXMgbm90IHByb3ZpZGVkIHdoZW4gYXN5bmMgYW5pbWF0aW9ucyBhcmUgdXNlZC5cbiAgICB0aGlzLl9lbmdpbmU/LmZsdXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIGxvYWRJbXBsKCk6IFByb21pc2U8QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5PiB7XG4gICAgLy8gTm90ZSBvbiB0aGUgYC50aGVuKG0gPT4gbSlgIHBhcnQgYmVsb3c6IENsb3N1cmUgY29tcGlsZXIgb3B0aW1pemF0aW9ucyBpbiBnMyByZXF1aXJlXG4gICAgLy8gYC50aGVuYCB0byBiZSBwcmVzZW50IGZvciBhIGR5bmFtaWMgaW1wb3J0IChvciBhbiBpbXBvcnQgc2hvdWxkIGJlIGBhd2FpdGBlZCkgdG8gZGV0ZWN0XG4gICAgLy8gdGhlIHNldCBvZiBpbXBvcnRlZCBzeW1ib2xzLlxuICAgIGNvbnN0IGxvYWRGbiA9ICgpID0+IHRoaXMubW9kdWxlSW1wbCA/PyBpbXBvcnQoJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3NlcicpLnRoZW4oKG0pID0+IG0pO1xuXG4gICAgbGV0IG1vZHVsZUltcGxQcm9taXNlOiB0eXBlb2YgdGhpcy5tb2R1bGVJbXBsO1xuICAgIGlmICh0aGlzLmxvYWRpbmdTY2hlZHVsZXJGbikge1xuICAgICAgbW9kdWxlSW1wbFByb21pc2UgPSB0aGlzLmxvYWRpbmdTY2hlZHVsZXJGbihsb2FkRm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2R1bGVJbXBsUHJvbWlzZSA9IGxvYWRGbigpO1xuICAgIH1cblxuICAgIHJldHVybiBtb2R1bGVJbXBsUHJvbWlzZVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5BTklNQVRJT05fUkVOREVSRVJfQVNZTkNfTE9BRElOR19GQUlMVVJFLFxuICAgICAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgICAgICAnQXN5bmMgbG9hZGluZyBmb3IgYW5pbWF0aW9ucyBwYWNrYWdlIHdhcyAnICtcbiAgICAgICAgICAgICAgJ2VuYWJsZWQsIGJ1dCBsb2FkaW5nIGZhaWxlZC4gQW5ndWxhciBmYWxscyBiYWNrIHRvIHVzaW5nIHJlZ3VsYXIgcmVuZGVyaW5nLiAnICtcbiAgICAgICAgICAgICAgXCJObyBhbmltYXRpb25zIHdpbGwgYmUgZGlzcGxheWVkIGFuZCB0aGVpciBzdHlsZXMgd29uJ3QgYmUgYXBwbGllZC5cIixcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoe8m1Y3JlYXRlRW5naW5lLCDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0pID0+IHtcbiAgICAgICAgLy8gV2UgY2FuJ3QgY3JlYXRlIHRoZSByZW5kZXJlciB5ZXQgYmVjYXVzZSB3ZSBtaWdodCBuZWVkIHRoZSBob3N0RWxlbWVudCBhbmQgdGhlIHR5cGVcbiAgICAgICAgLy8gQm90aCBhcmUgcHJvdmlkZWQgaW4gY3JlYXRlUmVuZGVyZXIoKS5cbiAgICAgICAgdGhpcy5fZW5naW5lID0gybVjcmVhdGVFbmdpbmUodGhpcy5hbmltYXRpb25UeXBlLCB0aGlzLmRvYyk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyRmFjdG9yeSA9IG5ldyDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeShcbiAgICAgICAgICB0aGlzLmRlbGVnYXRlLFxuICAgICAgICAgIHRoaXMuX2VuZ2luZSxcbiAgICAgICAgICB0aGlzLnpvbmUsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSByZW5kZXJlckZhY3Rvcnk7XG4gICAgICAgIHJldHVybiByZW5kZXJlckZhY3Rvcnk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBkZWxlZ2F0aW5nIHRoZSByZW5kZXJlciBjcmVhdGlvbiB0byB0aGUgZmFjdG9yaWVzLlxuICAgKiBJdCB1c2VzIGRlZmF1bHQgZmFjdG9yeSB3aGlsZSB0aGUgYW5pbWF0aW9uIGZhY3RvcnkgaXNuJ3QgbG9hZGVkXG4gICAqIGFuZCB3aWxsIHJlbHkgb24gdGhlIGFuaW1hdGlvbiBmYWN0b3J5IG9uY2UgaXQgaXMgbG9hZGVkLlxuICAgKlxuICAgKiBDYWxsaW5nIHRoaXMgbWV0aG9kIHdpbGwgdHJpZ2dlciBhcyBzaWRlIGVmZmVjdCB0aGUgbG9hZGluZyBvZiB0aGUgYW5pbWF0aW9uIG1vZHVsZVxuICAgKiBpZiB0aGUgcmVuZGVyZXJlZCBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zLlxuICAgKi9cbiAgY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQ6IGFueSwgcmVuZGVyZXJUeXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZGVsZWdhdGUuY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQsIHJlbmRlcmVyVHlwZSk7XG5cbiAgICBpZiAoKHJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyKS7JtXR5cGUgPT09IEFuaW1hdGlvblJlbmRlcmVyVHlwZS5SZWd1bGFyKSB7XG4gICAgICAvLyBUaGUgZmFjdG9yeSBpcyBhbHJlYWR5IGxvYWRlZCwgdGhpcyBpcyBhbiBhbmltYXRpb24gcmVuZGVyZXJcbiAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHByZXZlbnQgdGhlIERvbVJlbmRlcmVyIHRvIHRocm93IGFuIGVycm9yIGJlY2F1c2Ugb2Ygc3ludGhldGljIHByb3BlcnRpZXNcbiAgICBpZiAodHlwZW9mIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAocmVuZGVyZXIgYXMgYW55KS50aHJvd09uU3ludGhldGljUHJvcHMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBVc2luZyBhIGR5bmFtaWMgcmVuZGVyZXIgdG8gc3dpdGNoIHRoZSByZW5kZXJlciBpbXBsZW1lbnRhdGlvbiBvbmNlIHRoZSBtb2R1bGUgaXMgbG9hZGVkLlxuICAgIGNvbnN0IGR5bmFtaWNSZW5kZXJlciA9IG5ldyBEeW5hbWljRGVsZWdhdGlvblJlbmRlcmVyKHJlbmRlcmVyKTtcblxuICAgIC8vIEtpY2sgb2ZmIHRoZSBtb2R1bGUgbG9hZGluZyBpZiB0aGUgY29tcG9uZW50IHVzZXMgYW5pbWF0aW9ucyBidXQgdGhlIG1vZHVsZSBoYXNuJ3QgYmVlblxuICAgIC8vIGxvYWRlZCB5ZXQuXG4gICAgaWYgKHJlbmRlcmVyVHlwZT8uZGF0YT8uWydhbmltYXRpb24nXSAmJiAhdGhpcy5fcmVuZGVyZXJGYWN0b3J5UHJvbWlzZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJGYWN0b3J5UHJvbWlzZSA9IHRoaXMubG9hZEltcGwoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlXG4gICAgICA/LnRoZW4oKGFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSkgPT4ge1xuICAgICAgICBjb25zdCBhbmltYXRpb25SZW5kZXJlciA9IGFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihcbiAgICAgICAgICBob3N0RWxlbWVudCxcbiAgICAgICAgICByZW5kZXJlclR5cGUsXG4gICAgICAgICk7XG4gICAgICAgIGR5bmFtaWNSZW5kZXJlci51c2UoYW5pbWF0aW9uUmVuZGVyZXIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlcj8ubm90aWZ5KE5vdGlmaWNhdGlvblNvdXJjZS5Bc3luY0FuaW1hdGlvbnNMb2FkZWQpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAvLyBQZXJtYW5lbnRseSB1c2UgcmVndWxhciByZW5kZXJlciB3aGVuIGxvYWRpbmcgZmFpbHMuXG4gICAgICAgIGR5bmFtaWNSZW5kZXJlci51c2UocmVuZGVyZXIpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gZHluYW1pY1JlbmRlcmVyO1xuICB9XG5cbiAgYmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbj8uKCk7XG4gIH1cblxuICBlbmQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5lbmQ/LigpO1xuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmU/KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUud2hlblJlbmRlcmluZ0RvbmU/LigpID8/IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGNsYXNzIGFsbG93cyB0byBkeW5hbWljbHkgc3dpdGNoIGJldHdlZW4gZGlmZmVyZW50IHJlbmRlcmVyIGltcGxlbWVudGF0aW9uc1xuICogYnkgY2hhbmdpbmcgdGhlIGRlbGVnYXRlIHJlbmRlcmVyLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0RlbGVnYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIC8vIExpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgbmVlZCB0byBiZSByZXBsYXllZCBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIG9uY2UgaXRzIGxvYWRlZFxuICBwcml2YXRlIHJlcGxheTogKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiB2b2lkKVtdIHwgbnVsbCA9IFtdO1xuICByZWFkb25seSDJtXR5cGUgPSBBbmltYXRpb25SZW5kZXJlclR5cGUuRGVsZWdhdGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVsZWdhdGU6IFJlbmRlcmVyMikge31cblxuICB1c2UoaW1wbDogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGltcGw7XG5cbiAgICBpZiAodGhpcy5yZXBsYXkgIT09IG51bGwpIHtcbiAgICAgIC8vIFJlcGxheSBxdWV1ZWQgYWN0aW9ucyB1c2luZyB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIHRvIGFwcGx5XG4gICAgICAvLyBhbGwgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzIGNvbGxlY3RlZCB3aGlsZSBsb2FkaW5nIHdhcyBpbiBwcm9ncmVzcy5cbiAgICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5yZXBsYXkpIHtcbiAgICAgICAgZm4oaW1wbCk7XG4gICAgICB9XG4gICAgICAvLyBTZXQgdG8gYG51bGxgIHRvIGluZGljYXRlIHRoYXQgdGhlIHF1ZXVlIHdhcyBwcm9jZXNzZWRcbiAgICAgIC8vIGFuZCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllcy5cbiAgICAgIHRoaXMucmVwbGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgZGF0YSgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGF0YTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgZGVzdHJveU5vZGUoKTogKChub2RlOiBhbnkpID0+IHZvaWQpIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGVzdHJveU5vZGU7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50LCBuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnksIGlzTW92ZT86IGJvb2xlYW4gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmluc2VydEJlZm9yZShwYXJlbnQsIG5ld0NoaWxkLCByZWZDaGlsZCwgaXNNb3ZlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50PzogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2hpbGQocGFyZW50LCBvbGRDaGlsZCwgaXNIb3N0RWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZSwgcHJlc2VydmVDb250ZW50KTtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFkZENsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBwcm9wZXJ0aWVzIHNldCBvbiBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gc2V0IHRoZW0gYWxzbyBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KG5hbWUpKSB7XG4gICAgICB0aGlzLnJlcGxheSEucHVzaCgocmVuZGVyZXI6IFJlbmRlcmVyMikgPT4gcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0VmFsdWUobm9kZSwgdmFsdWUpO1xuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBhbmltYXRpb24gZXZlbnRzIHJlZ2lzdHJlZCBieSB0aGUgZGVmYXVsdCByZW5kZXJlclxuICAgIC8vIFNvIHdlIGNhbiBhbHNvIHJlZ2lzdGVyIHRoZW0gYWdhaW5zdCB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KGV2ZW50TmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRSZXBsYXkocHJvcE9yRXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvL2BudWxsYCBpbmRpY2F0ZXMgdGhhdCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgIHJldHVybiB0aGlzLnJlcGxheSAhPT0gbnVsbCAmJiBwcm9wT3JFdmVudE5hbWUuc3RhcnRzV2l0aChBTklNQVRJT05fUFJFRklYKTtcbiAgfVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGEgY3VzdG9tIHNjaGVkdWxlciBmdW5jdGlvbiBmb3IgdGhlIGFzeW5jIGxvYWRpbmcgb2YgdGhlIGFuaW1hdGlvbiBwYWNrYWdlLlxuICpcbiAqIFByaXZhdGUgdG9rZW4gZm9yIGludmVzdGlnYXRpb24gcHVycG9zZXNcbiAqL1xuZXhwb3J0IGNvbnN0IMm1QVNZTkNfQU5JTUFUSU9OX0xPQURJTkdfU0NIRURVTEVSX0ZOID0gbmV3IEluamVjdGlvblRva2VuPDxUPihsb2FkRm46ICgpID0+IFQpID0+IFQ+KFxuICBuZ0Rldk1vZGUgPyAnYXN5bmNfYW5pbWF0aW9uX2xvYWRpbmdfc2NoZWR1bGVyX2ZuJyA6ICcnLFxuKTtcbiJdfQ==