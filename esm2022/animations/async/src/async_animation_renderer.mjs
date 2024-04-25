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
            this._engine = ɵcreateEngine(this.animationType, this.doc, this.scheduler);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6+sha-5ad2f5f", ngImport: i0, type: AsyncAnimationRendererFactory, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6+sha-5ad2f5f", ngImport: i0, type: AsyncAnimationRendererFactory }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6+sha-5ad2f5f", ngImport: i0, type: AsyncAnimationRendererFactory, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL2FzeW5jL3NyYy9hc3luY19hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUdOLGdCQUFnQixFQUloQix5QkFBeUIsSUFBSSx3QkFBd0IsRUFDckQsYUFBYSxJQUFJLFlBQVksR0FDOUIsTUFBTSxlQUFlLENBQUM7O0FBR3ZCLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBRzdCLE1BQU0sT0FBTyw2QkFBNkI7SUFLeEM7OztPQUdHO0lBQ0gsWUFDVSxHQUFhLEVBQ2IsUUFBMEIsRUFDMUIsSUFBWSxFQUNaLGFBQW9DLEVBQ3BDLFVBT047UUFYTSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQU9oQjtRQXBCSSw0QkFBdUIsR0FBNkMsSUFBSSxDQUFDO1FBQ2hFLGNBQVMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQW9CN0UsQ0FBQztJQUVKLGFBQWE7SUFDYixXQUFXO1FBQ1QsNEVBQTRFO1FBQzVFLCtGQUErRjtRQUMvRiwyRkFBMkY7UUFDM0YsdURBQXVEO1FBQ3ZELDJGQUEyRjtRQUMzRix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxRQUFRO1FBQ2QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUs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QUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFXLEVBQUUsU0FBaUIsRUFBRSxRQUF3QztRQUM3RSw4RUFBOEU7UUFDOUUsOERBQThEO1FBQzlELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBbUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sWUFBWSxDQUFDLGVBQXVCO1FBQzFDLDBFQUEwRTtRQUMxRSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgybVBbmltYXRpb25FbmdpbmUgYXMgQW5pbWF0aW9uRW5naW5lLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyIGFzIEFuaW1hdGlvblJlbmRlcmVyLFxuICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBhcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnksXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3Nlcic7XG5pbXBvcnQge1xuICBpbmplY3QsXG4gIEluamVjdGFibGUsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFJlbmRlcmVyU3R5bGVGbGFnczIsXG4gIFJlbmRlcmVyVHlwZTIsXG4gIMm1QW5pbWF0aW9uUmVuZGVyZXJUeXBlIGFzIEFuaW1hdGlvblJlbmRlcmVyVHlwZSxcbiAgybVDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgYXMgQ2hhbmdlRGV0ZWN0aW9uU2NoZWR1bGVyLFxuICDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtVJ1bnRpbWVFcnJvckNvZGUgYXMgUnVudGltZUVycm9yQ29kZX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IEFOSU1BVElPTl9QUkVGSVggPSAnQCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc3luY0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgX3JlbmRlcmVyRmFjdG9yeVByb21pc2U6IFByb21pc2U8QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJlYWRvbmx5IHNjaGVkdWxlciA9IGluamVjdChDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIsIHtvcHRpb25hbDogdHJ1ZX0pO1xuICBwcml2YXRlIF9lbmdpbmU/OiBBbmltYXRpb25FbmdpbmU7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBtb2R1bGVJbXBsIGFsbG93cyB0byBwcm92aWRlIGEgbW9jayBpbXBsbWVudGF0aW9uIChvciB3aWxsIGxvYWQgdGhlIGFuaW1hdGlvbiBtb2R1bGUpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRvYzogRG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGFuaW1hdGlvblR5cGU6ICdhbmltYXRpb25zJyB8ICdub29wJyxcbiAgICBwcml2YXRlIG1vZHVsZUltcGw/OiBQcm9taXNlPHtcbiAgICAgIMm1Y3JlYXRlRW5naW5lOiAoXG4gICAgICAgIHR5cGU6ICdhbmltYXRpb25zJyB8ICdub29wJyxcbiAgICAgICAgZG9jOiBEb2N1bWVudCxcbiAgICAgICAgc2NoZWR1bGVyOiBDaGFuZ2VEZXRlY3Rpb25TY2hlZHVsZXIgfCBudWxsLFxuICAgICAgKSA9PiBBbmltYXRpb25FbmdpbmU7XG4gICAgICDJtUFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeTogdHlwZW9mIEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeTtcbiAgICB9PixcbiAgKSB7fVxuXG4gIC8qKiBAbm9kb2MgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgLy8gV2hlbiB0aGUgcm9vdCB2aWV3IGlzIHJlbW92ZWQsIHRoZSByZW5kZXJlciBkZWZlcnMgdGhlIGFjdHVhbCB3b3JrIHRvIHRoZVxuICAgIC8vIGBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lYCB0byBkbyB0aGlzLCBhbmQgdGhlIGBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lYCBkb2Vzbid0IGFjdHVhbGx5XG4gICAgLy8gcmVtb3ZlIHRoZSBET00gbm9kZSwgYnV0IGp1c3QgY2FsbHMgYG1hcmtFbGVtZW50QXNSZW1vdmVkKClgLiBUaGUgYWN0dWFsIERPTSBub2RlIGlzIG5vdFxuICAgIC8vIHJlbW92ZWQgdW50aWwgYFRyYW5zaXRpb25BbmltYXRpb25FbmdpbmVgIFwiZmx1c2hlc1wiLlxuICAgIC8vIE5vdGU6IHdlIGFscmVhZHkgZmx1c2ggb24gZGVzdHJveSB3aXRoaW4gdGhlIGBJbmplY3RhYmxlQW5pbWF0aW9uRW5naW5lYC4gVGhlIGluamVjdGFibGVcbiAgICAvLyBlbmdpbmUgaXMgbm90IHByb3ZpZGVkIHdoZW4gYXN5bmMgYW5pbWF0aW9ucyBhcmUgdXNlZC5cbiAgICB0aGlzLl9lbmdpbmU/LmZsdXNoKCk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwcml2YXRlIGxvYWRJbXBsKCk6IFByb21pc2U8QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5PiB7XG4gICAgY29uc3QgbW9kdWxlSW1wbCA9IHRoaXMubW9kdWxlSW1wbCA/PyBpbXBvcnQoJ0Bhbmd1bGFyL2FuaW1hdGlvbnMvYnJvd3NlcicpO1xuXG4gICAgcmV0dXJuIG1vZHVsZUltcGxcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuQU5JTUFUSU9OX1JFTkRFUkVSX0FTWU5DX0xPQURJTkdfRkFJTFVSRSxcbiAgICAgICAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgICAgICAgJ0FzeW5jIGxvYWRpbmcgZm9yIGFuaW1hdGlvbnMgcGFja2FnZSB3YXMgJyArXG4gICAgICAgICAgICAgICdlbmFibGVkLCBidXQgbG9hZGluZyBmYWlsZWQuIEFuZ3VsYXIgZmFsbHMgYmFjayB0byB1c2luZyByZWd1bGFyIHJlbmRlcmluZy4gJyArXG4gICAgICAgICAgICAgIFwiTm8gYW5pbWF0aW9ucyB3aWxsIGJlIGRpc3BsYXllZCBhbmQgdGhlaXIgc3R5bGVzIHdvbid0IGJlIGFwcGxpZWQuXCIsXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKHvJtWNyZWF0ZUVuZ2luZSwgybVBbmltYXRpb25SZW5kZXJlckZhY3Rvcnl9KSA9PiB7XG4gICAgICAgIC8vIFdlIGNhbid0IGNyZWF0ZSB0aGUgcmVuZGVyZXIgeWV0IGJlY2F1c2Ugd2UgbWlnaHQgbmVlZCB0aGUgaG9zdEVsZW1lbnQgYW5kIHRoZSB0eXBlXG4gICAgICAgIC8vIEJvdGggYXJlIHByb3ZpZGVkIGluIGNyZWF0ZVJlbmRlcmVyKCkuXG4gICAgICAgIHRoaXMuX2VuZ2luZSA9IMm1Y3JlYXRlRW5naW5lKHRoaXMuYW5pbWF0aW9uVHlwZSwgdGhpcy5kb2MsIHRoaXMuc2NoZWR1bGVyKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXJGYWN0b3J5ID0gbmV3IMm1QW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KFxuICAgICAgICAgIHRoaXMuZGVsZWdhdGUsXG4gICAgICAgICAgdGhpcy5fZW5naW5lLFxuICAgICAgICAgIHRoaXMuem9uZSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyRmFjdG9yeTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGRlbGVnYXRpbmcgdGhlIHJlbmRlcmVyIGNyZWF0aW9uIHRvIHRoZSBmYWN0b3JpZXMuXG4gICAqIEl0IHVzZXMgZGVmYXVsdCBmYWN0b3J5IHdoaWxlIHRoZSBhbmltYXRpb24gZmFjdG9yeSBpc24ndCBsb2FkZWRcbiAgICogYW5kIHdpbGwgcmVseSBvbiB0aGUgYW5pbWF0aW9uIGZhY3Rvcnkgb25jZSBpdCBpcyBsb2FkZWQuXG4gICAqXG4gICAqIENhbGxpbmcgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIGFzIHNpZGUgZWZmZWN0IHRoZSBsb2FkaW5nIG9mIHRoZSBhbmltYXRpb24gbW9kdWxlXG4gICAqIGlmIHRoZSByZW5kZXJlcmVkIGNvbXBvbmVudCB1c2VzIGFuaW1hdGlvbnMuXG4gICAqL1xuICBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgcmVuZGVyZXJUeXBlKTtcblxuICAgIGlmICgocmVuZGVyZXIgYXMgQW5pbWF0aW9uUmVuZGVyZXIpLsm1dHlwZSA9PT0gQW5pbWF0aW9uUmVuZGVyZXJUeXBlLlJlZ3VsYXIpIHtcbiAgICAgIC8vIFRoZSBmYWN0b3J5IGlzIGFscmVhZHkgbG9hZGVkLCB0aGlzIGlzIGFuIGFuaW1hdGlvbiByZW5kZXJlclxuICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gcHJldmVudCB0aGUgRG9tUmVuZGVyZXIgdG8gdGhyb3cgYW4gZXJyb3IgYmVjYXVzZSBvZiBzeW50aGV0aWMgcHJvcGVydGllc1xuICAgIGlmICh0eXBlb2YgKHJlbmRlcmVyIGFzIGFueSkudGhyb3dPblN5bnRoZXRpY1Byb3BzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIChyZW5kZXJlciBhcyBhbnkpLnRocm93T25TeW50aGV0aWNQcm9wcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFVzaW5nIGEgZHluYW1pYyByZW5kZXJlciB0byBzd2l0Y2ggdGhlIHJlbmRlcmVyIGltcGxlbWVudGF0aW9uIG9uY2UgdGhlIG1vZHVsZSBpcyBsb2FkZWQuXG4gICAgY29uc3QgZHluYW1pY1JlbmRlcmVyID0gbmV3IER5bmFtaWNEZWxlZ2F0aW9uUmVuZGVyZXIocmVuZGVyZXIpO1xuXG4gICAgLy8gS2ljayBvZmYgdGhlIG1vZHVsZSBsb2FkaW5nIGlmIHRoZSBjb21wb25lbnQgdXNlcyBhbmltYXRpb25zIGJ1dCB0aGUgbW9kdWxlIGhhc24ndCBiZWVuXG4gICAgLy8gbG9hZGVkIHlldC5cbiAgICBpZiAocmVuZGVyZXJUeXBlPy5kYXRhPy5bJ2FuaW1hdGlvbiddICYmICF0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlckZhY3RvcnlQcm9taXNlID0gdGhpcy5sb2FkSW1wbCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVyRmFjdG9yeVByb21pc2VcbiAgICAgID8udGhlbigoYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5KSA9PiB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblJlbmRlcmVyID0gYW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKFxuICAgICAgICAgIGhvc3RFbGVtZW50LFxuICAgICAgICAgIHJlbmRlcmVyVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShhbmltYXRpb25SZW5kZXJlcik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIC8vIFBlcm1hbmVudGx5IHVzZSByZWd1bGFyIHJlbmRlcmVyIHdoZW4gbG9hZGluZyBmYWlscy5cbiAgICAgICAgZHluYW1pY1JlbmRlcmVyLnVzZShyZW5kZXJlcik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBkeW5hbWljUmVuZGVyZXI7XG4gIH1cblxuICBiZWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmJlZ2luPy4oKTtcbiAgfVxuXG4gIGVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLmVuZD8uKCk7XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZT8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS53aGVuUmVuZGVyaW5nRG9uZT8uKCkgPz8gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgY2xhc3MgYWxsb3dzIHRvIGR5bmFtaWNseSBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgcmVuZGVyZXIgaW1wbGVtZW50YXRpb25zXG4gKiBieSBjaGFuZ2luZyB0aGUgZGVsZWdhdGUgcmVuZGVyZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljRGVsZWdhdGlvblJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgLy8gTGlzdCBvZiBjYWxsYmFja3MgdGhhdCBuZWVkIHRvIGJlIHJlcGxheWVkIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgb25jZSBpdHMgbG9hZGVkXG4gIHByaXZhdGUgcmVwbGF5OiAoKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHZvaWQpW10gfCBudWxsID0gW107XG4gIHJlYWRvbmx5IMm1dHlwZSA9IEFuaW1hdGlvblJlbmRlcmVyVHlwZS5EZWxlZ2F0ZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXIyKSB7fVxuXG4gIHVzZShpbXBsOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmRlbGVnYXRlID0gaW1wbDtcblxuICAgIGlmICh0aGlzLnJlcGxheSAhPT0gbnVsbCkge1xuICAgICAgLy8gUmVwbGF5IHF1ZXVlZCBhY3Rpb25zIHVzaW5nIHRoZSBhbmltYXRpb24gcmVuZGVyZXIgdG8gYXBwbHlcbiAgICAgIC8vIGFsbCBldmVudHMgYW5kIHByb3BlcnRpZXMgY29sbGVjdGVkIHdoaWxlIGxvYWRpbmcgd2FzIGluIHByb2dyZXNzLlxuICAgICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLnJlcGxheSkge1xuICAgICAgICBmbihpbXBsKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCB0byBgbnVsbGAgdG8gaW5kaWNhdGUgdGhhdCB0aGUgcXVldWUgd2FzIHByb2Nlc3NlZFxuICAgICAgLy8gYW5kIHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzLlxuICAgICAgdGhpcy5yZXBsYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkYXRhKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kYXRhO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcGxheSA9IG51bGw7XG4gICAgdGhpcy5kZWxlZ2F0ZS5kZXN0cm95KCk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nIHwgbnVsbCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVUZXh0KHZhbHVlKTtcbiAgfVxuXG4gIGdldCBkZXN0cm95Tm9kZSgpOiAoKG5vZGU6IGFueSkgPT4gdm9pZCkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kZXN0cm95Tm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hcHBlbmRDaGlsZChwYXJlbnQsIG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSwgaXNNb3ZlPzogYm9vbGVhbiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuaW5zZXJ0QmVmb3JlKHBhcmVudCwgbmV3Q2hpbGQsIHJlZkNoaWxkLCBpc01vdmUpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ/OiBib29sZWFuIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnQsIG9sZENoaWxkLCBpc0hvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4gfCB1bmRlZmluZWQpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlLCBwcmVzZXJ2ZUNvbnRlbnQpO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnBhcmVudE5vZGUobm9kZSk7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLm5leHRTaWJsaW5nKG5vZGUpO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUF0dHJpYnV0ZShlbCwgbmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkQ2xhc3MoZWwsIG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5yZW1vdmVDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlU3R5bGUoZWwsIHN0eWxlLCBmbGFncyk7XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgYW5pbWF0aW9uIHByb3BlcnRpZXMgc2V0IG9uIGRlZmF1bHQgcmVuZGVyZXJcbiAgICAvLyBTbyB3ZSBjYW4gYWxzbyBzZXQgdGhlbSBhbHNvIG9uIHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkobmFtZSkpIHtcbiAgICAgIHRoaXMucmVwbGF5IS5wdXNoKChyZW5kZXJlcjogUmVuZGVyZXIyKSA9PiByZW5kZXJlci5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpKTtcbiAgICB9XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5zZXRWYWx1ZShub2RlLCB2YWx1ZSk7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byBrZWVwIHRyYWNrIG9mIGFuaW1hdGlvbiBldmVudHMgcmVnaXN0cmVkIGJ5IHRoZSBkZWZhdWx0IHJlbmRlcmVyXG4gICAgLy8gU28gd2UgY2FuIGFsc28gcmVnaXN0ZXIgdGhlbSBhZ2FpbnN0IHRoZSBhbmltYXRpb24gcmVuZGVyZXJcbiAgICBpZiAodGhpcy5zaG91bGRSZXBsYXkoZXZlbnROYW1lKSkge1xuICAgICAgdGhpcy5yZXBsYXkhLnB1c2goKHJlbmRlcmVyOiBSZW5kZXJlcjIpID0+IHJlbmRlcmVyLmxpc3Rlbih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubGlzdGVuKHRhcmdldCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cblxuICBwcml2YXRlIHNob3VsZFJlcGxheShwcm9wT3JFdmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vYG51bGxgIGluZGljYXRlcyB0aGF0IHdlIG5vIGxvbmdlciBuZWVkIHRvIGNvbGxlY3QgZXZlbnRzIGFuZCBwcm9wZXJ0aWVzXG4gICAgcmV0dXJuIHRoaXMucmVwbGF5ICE9PSBudWxsICYmIHByb3BPckV2ZW50TmFtZS5zdGFydHNXaXRoKEFOSU1BVElPTl9QUkVGSVgpO1xuICB9XG59XG4iXX0=