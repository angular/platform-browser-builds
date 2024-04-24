import { inject, Injectable, NgZone, RendererFactory2, ɵChangeDetectionScheduler as ChangeDetectionScheduler, ɵRuntimeError as RuntimeError, } from '@angular/core';
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
        const moduleImpl = this.moduleImpl ?? import('@angular/animations/browser');
        return moduleImpl
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
            // Applying animations might result in new DOM state and should rerun render hooks
            this.scheduler?.notify(1 /* NotificationType.AfterRenderHooks */);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.5+sha-ac863de", ngImport: i0, type: AsyncAnimationRendererFactory, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.5+sha-ac863de", ngImport: i0, type: AsyncAnimationRendererFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.5+sha-ac863de", ngImport: i0, type: AsyncAnimationRendererFactory, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUdOLGdCQUFnQixFQUloQix5QkFBeUIsSUFBSSx3QkFBd0IsRUFFckQsYUFBYSxJQUFJLFlBQVksR0FDOUIsTUFBTSxlQUFlLENBQUM7O0FBR3ZCLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBRzdCLE1BQU0sT0FBTyw2QkFBNkI7SUFLeEM7OztPQUdHO0lBQ0gsWUFDVSxHQUFhLEVBQ2IsUUFBMEIsRUFDMUIsSUFBWSxFQUNaLGFBQW9DLEVBQ3BDLFVBR047UUFQTSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUdoQjtRQWhCSSw0QkFBdUIsR0FBNkMsSUFBSSxDQUFDO1FBQ2hFLGNBQVMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQWdCN0UsQ0FBQztJQUVKLGFBQWE7SUFDYixXQUFXO1FBQ1QsNEVBQTRFO1FBQzVFLCtGQUErRjtRQUMvRiwyRkFBMkY7UUFDM0YsdURBQXVEO1FBQ3ZELDJGQUEyRjtRQUMzRix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxRQUFRO1FBQ2QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUs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QUVELFFBQVEsQ0FBQyxJQUFTLEVBQUUsS0FBYTtRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxRQUF3QztRQUM3RSw4RUFBOEU7UUFDOUUsOERBQThEO1FBQzlELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sWUFBWSxDQUFDLGVBQXVCO1FBQzFDLDBFQUEwRTtRQUMxRSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBhcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge1xuICBpbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczIsXG4gIFJlbmRlcmVyVHlwZTIsXG4gIMm1QW5pbWF0aW9uUmVuZGVyZXJUeXBlIGFzIEFuaW1hdGlvblJlbmRlcmVyVHlwZSxcbiAgybVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLFxuICDJtU5vdGlmaWNhdGlvblR5cGUgYXMgTm90aWZpY2F0aW9uVHlwZSxcbiAgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVSdW50aW1lRXJyb3JDb2RlIGFzIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBBTklNQVRJT05fUFJFRklYID0gJ0AnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXN5bmNBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIF9yZW5kZXJlckZhY3RvcnlQcm9taXNlOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByZWFkb25seSBzY2hlZHVsZXIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLCB7b3B0aW9uYWw6IHRydWV9KTtcbiAgcHJpdmF0ZSBfZW5naW5lPzogQW5pbWF0aW9uRW5naW5lO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gbW9kdWxlSW1wbCBhbGxvd3MgdG8gcHJvdmlkZSBhIG1vY2sgaW1wbG1lbnRhdGlvbiAob3Igd2lsbCBsb2FkIHRoZSBhbmltYXRpb24gbW9kdWxlKVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkb2M6IERvY3VtZW50LFxuICAgIHByaXZhdGUgZGVsZWdhdGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBhbmltYXRpb25UeXBlOiAnYW5pbWF0aW9ucycgfCAnbm9vcCcsXG4gICAgcHJpdmF0ZSBtb2R1bGVJbXBsPzogUHJvbWlzZTx7XG4gICAgICDJtWNyZWF0ZUVuZ2luZTogKHR5cGU6ICdhbmltYXRpb25zJyB8ICdub29wJywgZG9jOiBEb2N1bWVudCkgPT4gQW5pbWF0aW9uRW5naW5lO1xuICAgICAgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk6IHR5cGVvZiBBbmltYXRpb25SZW5kZXJlckZhY3Rvcnk7XG4gICAgfT4sXG4gICkge31cblxuICAvKiogQG5vZG9jICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIFdoZW4gdGhlIHJvb3QgdmlldyBpcyByZW1vdmVkLCB0aGUgcmVuZGVyZXIgZGVmZXJzIHRoZSBhY3R1YWwgd29yayB0byB0aGVcbiAgICAvLyBgVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZWAgdG8gZG8gdGhpcywgYW5kIHRoZSBgVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZWAgZG9lc24ndCBhY3R1YWxseVxuICAgIC8vIHJlbW92ZSB0aGUgRE9NIG5vZGUsIGJ1dCBqdXN0IGNhbGxzIGBtYXJrRWxlbWVudEFzUmVtb3ZlZCgpYC4gVGhlIGFjdHVhbCBET00gbm9kZSBpcyBub3RcbiAgICAvLyByZW1vdmVkIHVudGlsIGBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lYCBcImZsdXNoZXNcIi5cbiAgICAvLyBOb3RlOiB3ZSBhbHJlYWR5IGZsdXNoIG9uIGRlc3Ryb3kgd2l0aGluIHRoZSBgSW5qZWN0YWJsZUFuaW1hdGlvbkVuZ2luZWAuIFRoZSBpbmplY3RhYmxlXG4gICAgLy8gZW5naW5lIGlzIG5vdCBwcm92aWRlZCB3aGVuIGFzeW5jIGFuaW1hdGlvbnMgYXJlIHVzZWQuXG4gICAgdGhpcy5fZW5naW5lPy5mbHVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkSW1wbCgpOiBQcm9taXNlPEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeT4ge1xuICAgIGNvbnN0IG1vZHVsZUltcGwgPSB0aGlzLm1vZHVsZUltcGwgPz8gaW1wb3J0KCdAYW5ndWxhci9hbmltYXRpb25zL2Jyb3dzZXInKTtcblxuICAgIHJldHVybiBtb2R1bGVJbXBsXG4gICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLkFOSU1BVElPTl9SRU5ERVJFUl9BU1lOQ19MT0FESU5HX0ZBSUxVUkUsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICdBc3luYyBsb2FkaW5nIGZvciBhbmltYXRpb25zIHBhY2thZ2Ugd2FzICcgK1xuICAgICAgICAgICAgICAnZW5hYmxlZCwgYnV0IGxvYWRpbmcgZmFpbGVkLiBBbmd1bGFyIGZhbGxzIGJhY2sgdG8gdXNpbmcgcmVndWxhciByZW5kZXJpbmcuICcgK1xuICAgICAgICAgICAgICBcIk5vIGFuaW1hdGlvbnMgd2lsbCBiZSBkaXNwbGF5ZWQgYW5kIHRoZWlyIHN0eWxlcyB3b24ndCBiZSBhcHBsaWVkLlwiLFxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKCh7ybVjcmVhdGVFbmdpbmUsIMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5fSkgPT4ge1xuICAgICAgICAvLyBXZSBjYW4ndCBjcmVhdGUgdGhlIHJlbmRlcmVyIHlldCBiZWNhdXNlIHdlIG1pZ2h0IG5lZWQgdGhlIGhvc3RFbGVtZW50IGFuZCB0aGUgdHlwZVxuICAgICAgICAvLyBCb3RoIGFyZSBwcm92aWRlZCBpbiBjcmVhdGVSZW5kZXJlcigpLlxuICAgICAgICB0aGlzLl9lbmdpbmUgPSDJtWNyZWF0ZUVuZ2luZSh0aGlzLmFuaW1hdGlvblR5cGUsIHRoaXMuZG9jKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXJGYWN0b3J5ID0gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KFxuICAgICAgICAgIHRoaXMuZGVsZWdhdGUsXG4gICAgICAgICAgdGhpcy5fZW5naW5lLFxuICAgICAgICAgIHRoaXMuem9uZSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGRlbGVnYXRpbmcgdGhlIHJlbmRlcmVyIGNyZWF0aW9uIHRvIHRoZSBmYWN0b3JpZXMuXG4gICAqIEl0IHVzZXMgZGVmYXVsdCBmYWN0b3J5IHdoaWxlIHRoZSBhbmltYXRpb24gZmFjdG9yeSBpc24ndCBsb2FkZWRcbiAgICogYW5kIHdpbGwgcmVseSBvbiB0aGUgYW5pbWF0aW9uIGZhY3Rvcnkgb25jZSBpdCBpcyBsb2FkZWQuXG4gICAqXG4gICAqIENhbGxpbmcgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIGFzIHNpZGUgZWZmZWN0IHRoZSBsb2FkaW5nIG9mIHRoZSBhbmltYXRpb24gbW9kdWxlXG4gICAqIGlmIHRoZSByZW5kZXJlcmVkIGNvbXBvbmVudCB1c2VzIGFuaW1hdGlvbnMuXG4gICAqL1xuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgcmVuZGVyZXJUeXBlKTtcblxuICAgIGlmICgocmVuZGVyZXIgYXMgQW5pbWF0aW9uUmVuZGVyZXIpLsm1dHlwZSA9PT0gQW5pbWF0aW9uUmVuZGVyZXJUeXBlLlJlZ3VsYXIpIHtcbiAgICAgIC8vIFRoZSBmYWN0b3J5IGlzIGFscmVhZHkgbG9hZGVkLCB0aGlzIGlzIGFuIGFuaW1hdGlvbiByZW5kZXJlclxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcHJldmVudCB0aGUgRG9tUmVuZGVyZXIgdG8gdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSBvZiBzeW50aGV0aWMgcHJvcGVydGllc1xuICAgIGlmICh0eXBlb2YgKHJlbmRlcmVyIGFzIGFueSkudGhyb3dPblN5bnRoZXRpY1Byb3BzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFVzaW5nIGEgZHluYW1pYyByZW5kZXJlciB0byBzd2l0Y2ggdGhlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9uIG9uY2UgdGhlIG1vZHVsZSBpcyBsb2FkZWQuXG4gICAgY29uc3QgZHluYW1pY1JlbmRlcmVyID0gbmV3IER5bmFtaWNEZWxlZ2F0aW9uUmVuZGVyZXIocmVuZGVyZXIpO1xuXG4gICAgLy8gS2ljayBvZmYgdGhlIG1vZHVsZSBsb2FkaW5nIGlmIHRoZSBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zIGJ1dCB0aGUgbW9kdWxlIGhhc24ndCBiZWVuXG4gICAgLy8gbG9hZGVkIHlldC5cbiAgICBpZiAocmVuZGVyZXJUeXBlPy5kYXRhPy5bJ2FuaW1hdGlvbiddICYmICF0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlID0gdGhpcy5sb2FkSW1wbCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2VcbiAgICAgID8udGhlbigoYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KSA9PiB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblJlbmRlcmVyID0gYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKFxuICAgICAgICAgIGhvc3RFbGVtZW50LFxuICAgICAgICAgIHJlbmRlcmVyVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShhbmltYXRpb25SZW5kZXJlcik7XG4gICAgICAgIC8vIEFwcGx5aW5nIGFuaW1hdGlvbnMgbWlnaHQgcmVzdWx0IGluIG5ldyBET00gc3RhdGUgYW5kIHNob3VsZCByZXJ1biByZW5kZXIgaG9va3NcbiAgICAgICAgdGhpcy5zY2hlZHVsZXI/Lm5vdGlmeShOb3RpZmljYXRpb25UeXBlLkFmdGVyUmVuZGVySG9va3MpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAvLyBQZXJtYW5lbnRseSB1c2UgcmVndWxhciByZW5kZXJlciB3aGVuIGxvYWRpbmcgZmFpbHMuXG4gICAgICAgIGR5bmFtaWNSZW5kZXJlci51c2UocmVuZGVyZXIpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gZHluYW1pY1JlbmRlcmVyO1xuICB9XG5cbiAgYmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbj8uKCk7XG4gIH1cblxuICBlbmQoKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5lbmQ/LigpO1xuICB9XG5cbiAgd2hlblJlbmRlcmluZ0RvbmU/KCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUud2hlblJlbmRlcmluZ0RvbmU/LigpID8/IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGNsYXNzIGFsbG93cyB0byBkeW5hbWljbHkgc3dpdGNoIGJldHdlZW4gZGlmZmVyZW50IHJlbmRlcmVyIGltcGxlbWVudGF0aW9uc1xuICogYnkgY2hhbmdpbmcgdGhlIGRlbGVnYXRlIHJlbmRlcmVyLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0RlbGVnYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIC8vIExpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgbmVlZCB0byBiZSByZXBsYXllZCBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIG9uY2UgaXRzIGxvYWRlZFxuICBwcml2YXRlIHJlcGxheTogKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiB2b2lkKVtdIHwgbnVsbCA9IFtdO1xuICByZWFkb25seSDJtXR5cGUgPSBBbmltYXRpb25SZW5kZXJlclR5cGUuRGVsZWdhdGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVsZWdhdGU6IFJlbmRlcmVyMikge31cblxuICB1c2UoaW1wbDogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGltcGw7XG5cbiAgICBpZiAodGhpcy5yZXBsYXkgIT09IG51bGwpIHtcbiAgICAgIC8vIFJlcGxheSBxdWV1ZWQgYWN0aW9ucyB1c2luZyB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyIHRvIGFwcGx5XG4gICAgICAvLyBhbGwgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzIGNvbGxlY3RlZCB3aGlsZSBsb2FkaW5nIHdhcyBpbiBwcm9ncmVzcy5cbiAgICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5yZXBsYXkpIHtcbiAgICAgICAgZm4oaW1wbCk7XG4gICAgICB9XG4gICAgICAvLyBTZXQgdG8gYG51bGxgIHRvIGluZGljYXRlIHRoYXQgdGhlIHF1ZXVlIHdhcyBwcm9jZXNzZWRcbiAgICAgIC8vIGFuZCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllcy5cbiAgICAgIHRoaXMucmVwbGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgZGF0YSgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGF0YTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVFbGVtZW50KG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gIH1cblxuICBnZXQgZGVzdHJveU5vZGUoKTogKChub2RlOiBhbnkpID0+IHZvaWQpIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuZGVzdHJveU5vZGU7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50LCBuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnksIGlzTW92ZT86IGJvb2xlYW4gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmluc2VydEJlZm9yZShwYXJlbnQsIG5ld0NoaWxkLCByZWZDaGlsZCwgaXNNb3ZlKTtcbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55LCBpc0hvc3RFbGVtZW50PzogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2hpbGQocGFyZW50LCBvbGRDaGlsZCwgaXNIb3N0RWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5zZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZSwgcHJlc2VydmVDb250ZW50KTtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5wYXJlbnROb2RlKG5vZGUpO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldEF0dHJpYnV0ZShlbCwgbmFtZSwgdmFsdWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVBdHRyaWJ1dGUoZWwsIG5hbWUsIG5hbWVzcGFjZSk7XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmFkZENsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRTdHlsZShlbCwgc3R5bGUsIHZhbHVlLCBmbGFncyk7XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBwcm9wZXJ0aWVzIHNldCBvbiBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gc2V0IHRoZW0gYWxzbyBvbiB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KG5hbWUpKSB7XG4gICAgICB0aGlzLnJlcGxheSEucHVzaCgocmVuZGVyZXI6IFJlbmRlcmVyMikgPT4gcmVuZGVyZXIuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKSk7XG4gICAgfVxuICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0VmFsdWUobm9kZSwgdmFsdWUpO1xuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogYW55LCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBhbmltYXRpb24gZXZlbnRzIHJlZ2lzdHJlZCBieSB0aGUgZGVmYXVsdCByZW5kZXJlclxuICAgIC8vIFNvIHdlIGNhbiBhbHNvIHJlZ2lzdGVyIHRoZW0gYWdhaW5zdCB0aGUgYW5pbWF0aW9uIHJlbmRlcmVyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVwbGF5KGV2ZW50TmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRSZXBsYXkocHJvcE9yRXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvL2BudWxsYCBpbmRpY2F0ZXMgdGhhdCB3ZSBubyBsb25nZXIgbmVlZCB0byBjb2xsZWN0IGV2ZW50cyBhbmQgcHJvcGVydGllc1xuICAgIHJldHVybiB0aGlzLnJlcGxheSAhPT0gbnVsbCAmJiBwcm9wT3JFdmVudE5hbWUuc3RhcnRzV2l0aChBTklNQVRJT05fUFJFRklYKTtcbiAgfVxufVxuIl19