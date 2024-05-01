/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformServer, ɵgetDOM as getDOM } from '@angular/common';
import { APP_ID, CSP_NONCE, Inject, Injectable, InjectionToken, NgZone, PLATFORM_ID, RendererStyleFlags2, ViewEncapsulation, ɵRuntimeError as RuntimeError, } from '@angular/core';
import { EventManager } from './events/event_manager';
import { SharedStylesHost } from './shared_styles_host';
import * as i0 from "@angular/core";
import * as i1 from "./events/event_manager";
import * as i2 from "./shared_styles_host";
export const NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
    'math': 'http://www.w3.org/1998/MathML/',
};
const COMPONENT_REGEX = /%COMP%/g;
export const COMPONENT_VARIABLE = '%COMP%';
export const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
export const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * The default value for the `REMOVE_STYLES_ON_COMPONENT_DESTROY` DI token.
 */
const REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
/**
 * A DI token that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `true`.
 * @publicApi
 */
export const REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(ngDevMode ? 'RemoveStylesOnCompDestroy' : '', {
    providedIn: 'root',
    factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT,
});
export function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function shimStylesContent(compId, styles) {
    return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
export class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.doc = doc;
        this.platformId = platformId;
        this.ngZone = ngZone;
        this.nonce = nonce;
        this.rendererByCompId = new Map();
        this.platformIsServer = isPlatformServer(platformId);
        this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        if (this.platformIsServer && type.encapsulation === ViewEncapsulation.ShadowDom) {
            // Domino does not support shadow DOM.
            type = { ...type, encapsulation: ViewEncapsulation.Emulated };
        }
        const renderer = this.getOrCreateRenderer(element, type);
        // Renderers have different logic due to different encapsulation behaviours.
        // Ex: for emulated, an attribute is added to the element.
        if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
            renderer.applyToHost(element);
        }
        else if (renderer instanceof NoneEncapsulationDomRenderer) {
            renderer.applyStyles();
        }
        return renderer;
    }
    getOrCreateRenderer(element, type) {
        const rendererByCompId = this.rendererByCompId;
        let renderer = rendererByCompId.get(type.id);
        if (!renderer) {
            const doc = this.doc;
            const ngZone = this.ngZone;
            const eventManager = this.eventManager;
            const sharedStylesHost = this.sharedStylesHost;
            const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
            const platformIsServer = this.platformIsServer;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer);
                    break;
            }
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.0+sha-a0ec2d8", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.0-next.0+sha-a0ec2d8", ngImport: i0, type: DomRendererFactory2 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.0+sha-a0ec2d8", ngImport: i0, type: DomRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.EventManager }, { type: i2.SharedStylesHost }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }] }] });
class DefaultDomRenderer2 {
    constructor(eventManager, doc, ngZone, platformIsServer) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platformIsServer = platformIsServer;
        this.data = Object.create(null);
        /**
         * By default this renderer throws when encountering synthetic properties
         * This can be disabled for example by the AsyncAnimationRendererFactory
         */
        this.throwOnSyntheticProps = true;
        this.destroyNode = null;
    }
    destroy() { }
    createElement(name, namespace) {
        if (namespace) {
            // TODO: `|| namespace` was added in
            // https://github.com/angular/angular/commit/2b9cc8503d48173492c29f5a271b61126104fbdb to
            // support how Ivy passed around the namespace URI rather than short name at the time. It did
            // not, however extend the support to other parts of the system (setAttribute, setAttribute,
            // and the ServerRenderer). We should decide what exactly the semantics for dealing with
            // namespaces should be and make it consistent.
            // Related issues:
            // https://github.com/angular/angular/issues/44028
            // https://github.com/angular/angular/issues/44883
            return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return this.doc.createElement(name);
    }
    createComment(value) {
        return this.doc.createComment(value);
    }
    createText(value) {
        return this.doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            const targetParent = isTemplateNode(parent) ? parent.content : parent;
            targetParent.insertBefore(newChild, refChild);
        }
    }
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === 'string' ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
            throw new RuntimeError(-5104 /* RuntimeErrorCode.ROOT_NODE_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            el.textContent = '';
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = namespace + ':' + name;
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.setAttributeNS(namespaceUri, name, value);
            }
            else {
                el.setAttribute(name, value);
            }
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                el.removeAttribute(`${namespace}:${name}`);
            }
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
            el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    removeStyle(el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            // removeProperty has no effect when used on camelCased properties.
            el.style.removeProperty(style);
        }
        else {
            el.style[style] = '';
        }
    }
    setProperty(el, name, value) {
        if (el == null) {
            return;
        }
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback) {
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            target = getDOM().getGlobalEventTarget(this.doc, target);
            if (!target) {
                throw new Error(`Unsupported event target ${target} for event ${event}`);
            }
        }
        return this.eventManager.addEventListener(target, event, this.decoratePreventDefault(callback));
    }
    decoratePreventDefault(eventHandler) {
        // `DebugNode.triggerEventHandler` needs to know if the listener was created with
        // decoratePreventDefault or is a listener added outside the Angular context so it can handle
        // the two differently. In the first case, the special '__ngUnwrap__' token is passed to the
        // unwrap the listener (see below).
        return (event) => {
            // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The
            // debug_node can inspect the listener toString contents for the existence of this special
            // token. Because the token is a string literal, it is ensured to not be modified by compiled
            // code.
            if (event === '__ngUnwrap__') {
                return eventHandler;
            }
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            const allowDefaultBehavior = this.platformIsServer
                ? this.ngZone.runGuarded(() => eventHandler(event))
                : eventHandler(event);
            if (allowDefaultBehavior === false) {
                event.preventDefault();
            }
            return undefined;
        };
    }
}
const AT_CHARCODE = (() => '@'.charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new RuntimeError(5105 /* RuntimeErrorCode.UNEXPECTED_SYNTHETIC_PROPERTY */, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === 'TEMPLATE' && node.content !== undefined;
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer) {
        super(eventManager, doc, ngZone, platformIsServer);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = shimStylesContent(component.id, component.styles);
        for (const style of styles) {
            const styleEl = document.createElement('style');
            if (nonce) {
                styleEl.setAttribute('nonce', nonce);
            }
            styleEl.textContent = style;
            this.shadowRoot.appendChild(styleEl);
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    removeChild(parent, oldChild) {
        return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
    }
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
    }
}
class NoneEncapsulationDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, compId) {
        super(eventManager, doc, ngZone, platformIsServer);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.styles = compId ? shimStylesContent(compId, component.styles) : component.styles;
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
        if (!this.removeStylesOnCompDestroy) {
            return;
        }
        this.sharedStylesHost.removeStyles(this.styles);
    }
}
class EmulatedEncapsulationDomRenderer2 extends NoneEncapsulationDomRenderer {
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer) {
        const compId = appId + '-' + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, compId);
        this.contentAttr = shimContentAttribute(compId);
        this.hostAttr = shimHostAttribute(compId);
    }
    applyToHost(element) {
        this.applyStyles();
        this.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxNQUFNLEVBRU4sV0FBVyxFQUdYLG1CQUFtQixFQUVuQixpQkFBaUIsRUFDakIsYUFBYSxJQUFJLFlBQVksR0FDOUIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXRELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDLE1BQU0sRUFBRSxnQ0FBZ0M7Q0FDekMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUVsQyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsa0JBQWtCLEVBQUUsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsY0FBYyxrQkFBa0IsRUFBRSxDQUFDO0FBRS9EOztHQUVHO0FBQ0gsTUFBTSwwQ0FBMEMsR0FBRyxJQUFJLENBQUM7QUFFeEQ7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SSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQVk7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVRLGFBQWEsQ0FBQyxNQUFXLEVBQUUsSUFBWTtRQUM5QyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXIsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFQUF9JRCxcbiAgQ1NQX05PTkNFLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIEluamVjdGlvblRva2VuLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMixcbiAgUmVuZGVyZXJUeXBlMixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG4gICdtYXRoJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aE1MLycsXG59O1xuXG5jb25zdCBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5cbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWWAgREkgdG9rZW4uXG4gKi9cbmNvbnN0IFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1lfREVGQVVMVCA9IHRydWU7XG5cbi8qKlxuICogQSBESSB0b2tlbiB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHN0eWxlc1xuICogb2YgZGVzdHJveWVkIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBET00uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHZhbHVlIGlzIHNldCB0byBgdHJ1ZWAuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KFxuICBuZ0Rldk1vZGUgPyAnUmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveScgOiAnJyxcbiAge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiAoKSA9PiBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZX0RFRkFVTFQsXG4gIH0sXG4pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZDogc3RyaW5nLCBzdHlsZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICByZXR1cm4gc3R5bGVzLm1hcCgocykgPT4gcy5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlckJ5Q29tcElkID0gbmV3IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyIHwgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlclxuICA+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSByZWFkb25seSBhcHBJZDogc3RyaW5nLFxuICAgIEBJbmplY3QoUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSkgcHJpdmF0ZSByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95OiBib29sZWFuLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSByZWFkb25seSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChDU1BfTk9OQ0UpIHByaXZhdGUgcmVhZG9ubHkgbm9uY2U6IHN0cmluZyB8IG51bGwgPSBudWxsLFxuICApIHtcbiAgICB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgPSBpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpO1xuICAgIHRoaXMuZGVmYXVsdFJlbmRlcmVyID0gbmV3IERlZmF1bHREb21SZW5kZXJlcjIoXG4gICAgICBldmVudE1hbmFnZXIsXG4gICAgICBkb2MsXG4gICAgICBuZ1pvbmUsXG4gICAgICB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIsXG4gICAgKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMiB8IG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgJiYgdHlwZS5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb20pIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IHNoYWRvdyBET00uXG4gICAgICB0eXBlID0gey4uLnR5cGUsIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkfTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0T3JDcmVhdGVSZW5kZXJlcihlbGVtZW50LCB0eXBlKTtcbiAgICAvLyBSZW5kZXJlcnMgaGF2ZSBkaWZmZXJlbnQgbG9naWMgZHVlIHRvIGRpZmZlcmVudCBlbmNhcHN1bGF0aW9uIGJlaGF2aW91cnMuXG4gICAgLy8gRXg6IGZvciBlbXVsYXRlZCwgYW4gYXR0cmlidXRlIGlzIGFkZGVkIHRvIHRoZSBlbGVtZW50LlxuICAgIGlmIChyZW5kZXJlciBpbnN0YW5jZW9mIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMikge1xuICAgICAgcmVuZGVyZXIuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChyZW5kZXJlciBpbnN0YW5jZW9mIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLmFwcGx5U3R5bGVzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMik6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgcmVuZGVyZXJCeUNvbXBJZCA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZDtcbiAgICBsZXQgcmVuZGVyZXIgPSByZW5kZXJlckJ5Q29tcElkLmdldCh0eXBlLmlkKTtcblxuICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jO1xuICAgICAgY29uc3Qgbmdab25lID0gdGhpcy5uZ1pvbmU7XG4gICAgICBjb25zdCBldmVudE1hbmFnZXIgPSB0aGlzLmV2ZW50TWFuYWdlcjtcbiAgICAgIGNvbnN0IHNoYXJlZFN0eWxlc0hvc3QgPSB0aGlzLnNoYXJlZFN0eWxlc0hvc3Q7XG4gICAgICBjb25zdCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95ID0gdGhpcy5yZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95O1xuICAgICAgY29uc3QgcGxhdGZvcm1Jc1NlcnZlciA9IHRoaXMucGxhdGZvcm1Jc1NlcnZlcjtcblxuICAgICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDpcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIoXG4gICAgICAgICAgICBldmVudE1hbmFnZXIsXG4gICAgICAgICAgICBzaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRoaXMuYXBwSWQsXG4gICAgICAgICAgICByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95LFxuICAgICAgICAgICAgZG9jLFxuICAgICAgICAgICAgbmdab25lLFxuICAgICAgICAgICAgcGxhdGZvcm1Jc1NlcnZlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbTpcbiAgICAgICAgICByZXR1cm4gbmV3IFNoYWRvd0RvbVJlbmRlcmVyKFxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLFxuICAgICAgICAgICAgc2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgZG9jLFxuICAgICAgICAgICAgbmdab25lLFxuICAgICAgICAgICAgdGhpcy5ub25jZSxcbiAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyKFxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLFxuICAgICAgICAgICAgc2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95LFxuICAgICAgICAgICAgZG9jLFxuICAgICAgICAgICAgbmdab25lLFxuICAgICAgICAgICAgcGxhdGZvcm1Jc1NlcnZlcixcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLmNsZWFyKCk7XG4gIH1cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvKipcbiAgICogQnkgZGVmYXVsdCB0aGlzIHJlbmRlcmVyIHRocm93cyB3aGVuIGVuY291bnRlcmluZyBzeW50aGV0aWMgcHJvcGVydGllc1xuICAgKiBUaGlzIGNhbiBiZSBkaXNhYmxlZCBmb3IgZXhhbXBsZSBieSB0aGUgQXN5bmNBbmltYXRpb25SZW5kZXJlckZhY3RvcnlcbiAgICovXG4gIHRocm93T25TeW50aGV0aWNQcm9wcyA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRvYzogRG9jdW1lbnQsXG4gICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW4sXG4gICkge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZSA9IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETzogYHx8IG5hbWVzcGFjZWAgd2FzIGFkZGVkIGluXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2NvbW1pdC8yYjljYzg1MDNkNDgxNzM0OTJjMjlmNWEyNzFiNjExMjYxMDRmYmRiIHRvXG4gICAgICAvLyBzdXBwb3J0IGhvdyBJdnkgcGFzc2VkIGFyb3VuZCB0aGUgbmFtZXNwYWNlIFVSSSByYXRoZXIgdGhhbiBzaG9ydCBuYW1lIGF0IHRoZSB0aW1lLiBJdCBkaWRcbiAgICAgIC8vIG5vdCwgaG93ZXZlciBleHRlbmQgdGhlIHN1cHBvcnQgdG8gb3RoZXIgcGFydHMgb2YgdGhlIHN5c3RlbSAoc2V0QXR0cmlidXRlLCBzZXRBdHRyaWJ1dGUsXG4gICAgICAvLyBhbmQgdGhlIFNlcnZlclJlbmRlcmVyKS4gV2Ugc2hvdWxkIGRlY2lkZSB3aGF0IGV4YWN0bHkgdGhlIHNlbWFudGljcyBmb3IgZGVhbGluZyB3aXRoXG4gICAgICAvLyBuYW1lc3BhY2VzIHNob3VsZCBiZSBhbmQgbWFrZSBpdCBjb25zaXN0ZW50LlxuICAgICAgLy8gUmVsYXRlZCBpc3N1ZXM6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDAyOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQ4ODNcbiAgICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICB0YXJnZXRQYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgICAgdGFyZ2V0UGFyZW50Lmluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nIHwgYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgZWw6IGFueSA9XG4gICAgICB0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnID8gdGhpcy5kb2MucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yTm9kZSkgOiBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlJPT1RfTk9ERV9OT1RfRk9VTkQsXG4gICAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgICAgYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgKFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UgfCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KHN0eWxlLCB2YWx1ZSwgZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIC8vIHJlbW92ZVByb3BlcnR5IGhhcyBubyBlZmZlY3Qgd2hlbiB1c2VkIG9uIGNhbWVsQ2FzZWQgcHJvcGVydGllcy5cbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKGVsID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgdGhpcy50aHJvd09uU3ludGhldGljUHJvcHMgJiZcbiAgICAgIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWUsICdwcm9wZXJ0eScpO1xuICAgIGVsW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBub2RlLm5vZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgbGlzdGVuKFxuICAgIHRhcmdldDogJ3dpbmRvdycgfCAnZG9jdW1lbnQnIHwgJ2JvZHknIHwgYW55LFxuICAgIGV2ZW50OiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuLFxuICApOiAoKSA9PiB2b2lkIHtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJlxuICAgICAgdGhpcy50aHJvd09uU3ludGhldGljUHJvcHMgJiZcbiAgICAgIGNoZWNrTm9TeW50aGV0aWNQcm9wKGV2ZW50LCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRhcmdldCA9IGdldERPTSgpLmdldEdsb2JhbEV2ZW50VGFyZ2V0KHRoaXMuZG9jLCB0YXJnZXQpO1xuICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBldmVudCB0YXJnZXQgJHt0YXJnZXR9IGZvciBldmVudCAke2V2ZW50fWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgdGFyZ2V0LFxuICAgICAgZXZlbnQsXG4gICAgICB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spLFxuICAgICkgYXMgVm9pZEZ1bmN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgLy8gYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYCBuZWVkcyB0byBrbm93IGlmIHRoZSBsaXN0ZW5lciB3YXMgY3JlYXRlZCB3aXRoXG4gICAgLy8gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdCBvciBpcyBhIGxpc3RlbmVyIGFkZGVkIG91dHNpZGUgdGhlIEFuZ3VsYXIgY29udGV4dCBzbyBpdCBjYW4gaGFuZGxlXG4gICAgLy8gdGhlIHR3byBkaWZmZXJlbnRseS4gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBzcGVjaWFsICdfX25nVW53cmFwX18nIHRva2VuIGlzIHBhc3NlZCB0byB0aGVcbiAgICAvLyB1bndyYXAgdGhlIGxpc3RlbmVyIChzZWUgYmVsb3cpLlxuICAgIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgLy8gSXZ5IHVzZXMgJ19fbmdVbndyYXBfXycgYXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgYWxsb3dzIHVzIHRvIHVud3JhcCB0aGUgZnVuY3Rpb25cbiAgICAgIC8vIHNvIHRoYXQgaXQgY2FuIGJlIGludm9rZWQgcHJvZ3JhbW1hdGljYWxseSBieSBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgLiBUaGVcbiAgICAgIC8vIGRlYnVnX25vZGUgY2FuIGluc3BlY3QgdGhlIGxpc3RlbmVyIHRvU3RyaW5nIGNvbnRlbnRzIGZvciB0aGUgZXhpc3RlbmNlIG9mIHRoaXMgc3BlY2lhbFxuICAgICAgLy8gdG9rZW4uIEJlY2F1c2UgdGhlIHRva2VuIGlzIGEgc3RyaW5nIGxpdGVyYWwsIGl0IGlzIGVuc3VyZWQgdG8gbm90IGJlIG1vZGlmaWVkIGJ5IGNvbXBpbGVkXG4gICAgICAvLyBjb2RlLlxuICAgICAgaWYgKGV2ZW50ID09PSAnX19uZ1Vud3JhcF9fJykge1xuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyO1xuICAgICAgfVxuXG4gICAgICAvLyBSdW4gdGhlIGV2ZW50IGhhbmRsZXIgaW5zaWRlIHRoZSBuZ1pvbmUgYmVjYXVzZSBldmVudCBoYW5kbGVycyBhcmUgbm90IHBhdGNoZWRcbiAgICAgIC8vIGJ5IFpvbmUgb24gdGhlIHNlcnZlci4gVGhpcyBpcyByZXF1aXJlZCBvbmx5IGZvciB0ZXN0cy5cbiAgICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gdGhpcy5wbGF0Zm9ybUlzU2VydmVyXG4gICAgICAgID8gdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKVxuICAgICAgICA6IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgICBpZiAoYWxsb3dEZWZhdWx0QmVoYXZpb3IgPT09IGZhbHNlKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICgoKSA9PiAnQCcuY2hhckNvZGVBdCgwKSkoKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICBSdW50aW1lRXJyb3JDb2RlLlVORVhQRUNURURfU1lOVEhFVElDX1BST1BFUlRZLFxuICAgICAgYFVuZXhwZWN0ZWQgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0gZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdDpcbiAgLSBFaXRoZXIgXFxgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcXGAgb3IgXFxgTm9vcEFuaW1hdGlvbnNNb2R1bGVcXGAgYXJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24uXG4gIC0gVGhlcmUgaXMgY29ycmVzcG9uZGluZyBjb25maWd1cmF0aW9uIGZvciB0aGUgYW5pbWF0aW9uIG5hbWVkIFxcYCR7bmFtZX1cXGAgZGVmaW5lZCBpbiB0aGUgXFxgYW5pbWF0aW9uc1xcYCBmaWVsZCBvZiB0aGUgXFxgQENvbXBvbmVudFxcYCBkZWNvcmF0b3IgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvQ29tcG9uZW50I2FuaW1hdGlvbnMpLmAsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTm9kZShub2RlOiBhbnkpOiBub2RlIGlzIEhUTUxUZW1wbGF0ZUVsZW1lbnQge1xuICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVNUExBVEUnICYmIG5vZGUuY29udGVudCAhPT0gdW5kZWZpbmVkO1xufVxuXG5jbGFzcyBTaGFkb3dEb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHNoYWRvd1Jvb3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgcHJpdmF0ZSBob3N0RWw6IGFueSxcbiAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgZG9jOiBEb2N1bWVudCxcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBub25jZTogc3RyaW5nIHwgbnVsbCxcbiAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gc2hpbVN0eWxlc0NvbnRlbnQoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzKTtcblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7XG4gIH1cblxuICBvdmVycmlkZSBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hcHBlbmRDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRCZWZvcmUodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG9sZENoaWxkKTtcbiAgfVxuICBvdmVycmlkZSBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU9yU2hhZG93Um9vdChzdXBlci5wYXJlbnROb2RlKHRoaXMubm9kZU9yU2hhZG93Um9vdChub2RlKSkpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGVzdHJveSgpIHtcbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpO1xuICB9XG59XG5cbmNsYXNzIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95OiBib29sZWFuLFxuICAgIGRvYzogRG9jdW1lbnQsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbixcbiAgICBjb21wSWQ/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgIHRoaXMuc3R5bGVzID0gY29tcElkID8gc2hpbVN0eWxlc0NvbnRlbnQoY29tcElkLCBjb21wb25lbnQuc3R5bGVzKSA6IGNvbXBvbmVudC5zdHlsZXM7XG4gIH1cblxuICBhcHBseVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3kpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIgZXh0ZW5kcyBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgYXBwSWQ6IHN0cmluZyxcbiAgICByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95OiBib29sZWFuLFxuICAgIGRvYzogRG9jdW1lbnQsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbixcbiAgKSB7XG4gICAgY29uc3QgY29tcElkID0gYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQ7XG4gICAgc3VwZXIoXG4gICAgICBldmVudE1hbmFnZXIsXG4gICAgICBzaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgY29tcG9uZW50LFxuICAgICAgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSxcbiAgICAgIGRvYyxcbiAgICAgIG5nWm9uZSxcbiAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsXG4gICAgICBjb21wSWQsXG4gICAgKTtcbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcElkKTtcbiAgICB0aGlzLmhvc3RBdHRyID0gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcElkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7XG4gIH1cblxuICBvdmVycmlkZSBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cbiJdfQ==