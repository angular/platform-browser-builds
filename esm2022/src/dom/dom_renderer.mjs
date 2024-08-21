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
    'math': 'http://www.w3.org/1998/Math/MathML',
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-d1d4adc", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-d1d4adc", ngImport: i0, type: DomRendererFactory2 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-d1d4adc", ngImport: i0, type: DomRendererFactory2, decorators: [{
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
    removeChild(_parent, oldChild) {
        oldChild.remove();
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
    removeChild(_parent, oldChild) {
        return super.removeChild(null, oldChild);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUNWLGNBQWMsRUFDZCxNQUFNLEVBRU4sV0FBVyxFQUdYLG1CQUFtQixFQUVuQixpQkFBaUIsRUFDakIsYUFBYSxJQUFJLFlBQVksR0FDOUIsTUFBTSxlQUFlLENBQUM7QUFJdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXRELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDLE1BQU0sRUFBRSxvQ0FBb0M7Q0FDN0MsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUVsQyxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsa0JBQWtCLEVBQUUsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsY0FBYyxrQkFBa0IsRUFBRSxDQUFDO0FBRS9EOztHQUVHO0FBQ0gsTUFBTSwwQ0FBMEMsR0FBRyxJQUFJLENBQUM7QUFFeEQ7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QVk7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVRLGFBQWEsQ0FBQyxNQUFXLEVBQUUsSUFBWTtRQUM5QyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXIsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFQUF9JRCxcbiAgQ1NQX05PTkNFLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIEluamVjdGlvblRva2VuLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJGYWN0b3J5MixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMixcbiAgUmVuZGVyZXJUeXBlMixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG4gICdtYXRoJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnLFxufTtcblxuY29uc3QgQ09NUE9ORU5UX1JFR0VYID0gLyVDT01QJS9nO1xuXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgYFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1lgIERJIHRva2VuLlxuICovXG5jb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZX0RFRkFVTFQgPSB0cnVlO1xuXG4vKipcbiAqIEEgREkgdG9rZW4gdGhhdCBpbmRpY2F0ZXMgd2hldGhlciBzdHlsZXNcbiAqIG9mIGRlc3Ryb3llZCBjb21wb25lbnRzIHNob3VsZCBiZSByZW1vdmVkIGZyb20gRE9NLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRoZSB2YWx1ZSBpcyBzZXQgdG8gYHRydWVgLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPihcbiAgbmdEZXZNb2RlID8gJ1JlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3knIDogJycsXG4gIHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogKCkgPT4gUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxULFxuICB9LFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBDT05URU5UX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIEhPU1RfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltU3R5bGVzQ29udGVudChjb21wSWQ6IHN0cmluZywgc3R5bGVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHN0eWxlcy5tYXAoKHMpID0+IHMucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBJZCkpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8XG4gICAgc3RyaW5nLFxuICAgIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiB8IE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXJcbiAgPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgQEluamVjdChBUFBfSUQpIHByaXZhdGUgcmVhZG9ubHkgYXBwSWQ6IHN0cmluZyxcbiAgICBASW5qZWN0KFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1kpIHByaXZhdGUgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveTogYm9vbGVhbixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIHJlYWRvbmx5IGRvYzogRG9jdW1lbnQsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcmVhZG9ubHkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgIEBJbmplY3QoQ1NQX05PTkNFKSBwcml2YXRlIHJlYWRvbmx5IG5vbmNlOiBzdHJpbmcgfCBudWxsID0gbnVsbCxcbiAgKSB7XG4gICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKFxuICAgICAgZXZlbnRNYW5hZ2VyLFxuICAgICAgZG9jLFxuICAgICAgbmdab25lLFxuICAgICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyLFxuICAgICk7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIgfCBudWxsKTogUmVuZGVyZXIyIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIXR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGF0Zm9ybUlzU2VydmVyICYmIHR5cGUuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tKSB7XG4gICAgICAvLyBEb21pbm8gZG9lcyBub3Qgc3VwcG9ydCBzaGFkb3cgRE9NLlxuICAgICAgdHlwZSA9IHsuLi50eXBlLCBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZH07XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldE9yQ3JlYXRlUmVuZGVyZXIoZWxlbWVudCwgdHlwZSk7XG4gICAgLy8gUmVuZGVyZXJzIGhhdmUgZGlmZmVyZW50IGxvZ2ljIGR1ZSB0byBkaWZmZXJlbnQgZW5jYXBzdWxhdGlvbiBiZWhhdmlvdXJzLlxuICAgIC8vIEV4OiBmb3IgZW11bGF0ZWQsIGFuIGF0dHJpYnV0ZSBpcyBhZGRlZCB0byB0aGUgZWxlbWVudC5cbiAgICBpZiAocmVuZGVyZXIgaW5zdGFuY2VvZiBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIpIHtcbiAgICAgIHJlbmRlcmVyLmFwcGx5VG9Ib3N0KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAocmVuZGVyZXIgaW5zdGFuY2VvZiBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5hcHBseVN0eWxlcygpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JDcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyQnlDb21wSWQgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQ7XG4gICAgbGV0IHJlbmRlcmVyID0gcmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG5cbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICBjb25zdCBkb2MgPSB0aGlzLmRvYztcbiAgICAgIGNvbnN0IG5nWm9uZSA9IHRoaXMubmdab25lO1xuICAgICAgY29uc3QgZXZlbnRNYW5hZ2VyID0gdGhpcy5ldmVudE1hbmFnZXI7XG4gICAgICBjb25zdCBzaGFyZWRTdHlsZXNIb3N0ID0gdGhpcy5zaGFyZWRTdHlsZXNIb3N0O1xuICAgICAgY29uc3QgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSA9IHRoaXMucmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveTtcbiAgICAgIGNvbnN0IHBsYXRmb3JtSXNTZXJ2ZXIgPSB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXI7XG5cbiAgICAgIHN3aXRjaCAodHlwZS5lbmNhcHN1bGF0aW9uKSB7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ6XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKFxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLFxuICAgICAgICAgICAgc2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB0aGlzLmFwcElkLFxuICAgICAgICAgICAgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSxcbiAgICAgICAgICAgIGRvYyxcbiAgICAgICAgICAgIG5nWm9uZSxcbiAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgICAgcmV0dXJuIG5ldyBTaGFkb3dEb21SZW5kZXJlcihcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlcixcbiAgICAgICAgICAgIHNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGRvYyxcbiAgICAgICAgICAgIG5nWm9uZSxcbiAgICAgICAgICAgIHRoaXMubm9uY2UsXG4gICAgICAgICAgICBwbGF0Zm9ybUlzU2VydmVyLFxuICAgICAgICAgICk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcihcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlcixcbiAgICAgICAgICAgIHNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSxcbiAgICAgICAgICAgIGRvYyxcbiAgICAgICAgICAgIG5nWm9uZSxcbiAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5jbGVhcigpO1xuICB9XG59XG5cbmNsYXNzIERlZmF1bHREb21SZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgdGhpcyByZW5kZXJlciB0aHJvd3Mgd2hlbiBlbmNvdW50ZXJpbmcgc3ludGhldGljIHByb3BlcnRpZXNcbiAgICogVGhpcyBjYW4gYmUgZGlzYWJsZWQgZm9yIGV4YW1wbGUgYnkgdGhlIEFzeW5jQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5XG4gICAqL1xuICB0aHJvd09uU3ludGhldGljUHJvcHMgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGUgPSBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIFRPRE86IGB8fCBuYW1lc3BhY2VgIHdhcyBhZGRlZCBpblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9jb21taXQvMmI5Y2M4NTAzZDQ4MTczNDkyYzI5ZjVhMjcxYjYxMTI2MTA0ZmJkYiB0b1xuICAgICAgLy8gc3VwcG9ydCBob3cgSXZ5IHBhc3NlZCBhcm91bmQgdGhlIG5hbWVzcGFjZSBVUkkgcmF0aGVyIHRoYW4gc2hvcnQgbmFtZSBhdCB0aGUgdGltZS4gSXQgZGlkXG4gICAgICAvLyBub3QsIGhvd2V2ZXIgZXh0ZW5kIHRoZSBzdXBwb3J0IHRvIG90aGVyIHBhcnRzIG9mIHRoZSBzeXN0ZW0gKHNldEF0dHJpYnV0ZSwgc2V0QXR0cmlidXRlLFxuICAgICAgLy8gYW5kIHRoZSBTZXJ2ZXJSZW5kZXJlcikuIFdlIHNob3VsZCBkZWNpZGUgd2hhdCBleGFjdGx5IHRoZSBzZW1hbnRpY3MgZm9yIGRlYWxpbmcgd2l0aFxuICAgICAgLy8gbmFtZXNwYWNlcyBzaG91bGQgYmUgYW5kIG1ha2UgaXQgY29uc2lzdGVudC5cbiAgICAgIC8vIFJlbGF0ZWQgaXNzdWVzOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQwMjhcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ0ODgzXG4gICAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0gfHwgbmFtZXNwYWNlLCBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudChuYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlVGV4dE5vZGUodmFsdWUpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRQYXJlbnQgPSBpc1RlbXBsYXRlTm9kZShwYXJlbnQpID8gcGFyZW50LmNvbnRlbnQgOiBwYXJlbnQ7XG4gICAgdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICAgIHRhcmdldFBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChfcGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBvbGRDaGlsZC5yZW1vdmUoKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmcgfCBhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGxldCBlbDogYW55ID1cbiAgICAgIHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycgPyB0aGlzLmRvYy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKSA6IHNlbGVjdG9yT3JOb2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuUk9PVF9OT0RFX05PVF9GT1VORCxcbiAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICBgVGhlIHNlbGVjdG9yIFwiJHtzZWxlY3Rvck9yTm9kZX1cIiBkaWQgbm90IG1hdGNoIGFueSBlbGVtZW50c2AsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXByZXNlcnZlQ29udGVudCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgbmFtZSA9IG5hbWVzcGFjZSArICc6JyArIG5hbWU7XG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShgJHtuYW1lc3BhY2V9OiR7bmFtZX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiAoUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSB8IFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KSkge1xuICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoc3R5bGUsIHZhbHVlLCBmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgLy8gcmVtb3ZlUHJvcGVydHkgaGFzIG5vIGVmZmVjdCB3aGVuIHVzZWQgb24gY2FtZWxDYXNlZCBwcm9wZXJ0aWVzLlxuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoZWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICB0aGlzLnRocm93T25TeW50aGV0aWNQcm9wcyAmJlxuICAgICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBsaXN0ZW4oXG4gICAgdGFyZ2V0OiAnd2luZG93JyB8ICdkb2N1bWVudCcgfCAnYm9keScgfCBhbnksXG4gICAgZXZlbnQ6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4sXG4gICk6ICgpID0+IHZvaWQge1xuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICB0aGlzLnRocm93T25TeW50aGV0aWNQcm9wcyAmJlxuICAgICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnQsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGFyZ2V0ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5kb2MsIHRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGV2ZW50IHRhcmdldCAke3RhcmdldH0gZm9yIGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICB0YXJnZXQsXG4gICAgICBldmVudCxcbiAgICAgIHRoaXMuZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjayksXG4gICAgKSBhcyBWb2lkRnVuY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvLyBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgIG5lZWRzIHRvIGtub3cgaWYgdGhlIGxpc3RlbmVyIHdhcyBjcmVhdGVkIHdpdGhcbiAgICAvLyBkZWNvcmF0ZVByZXZlbnREZWZhdWx0IG9yIGlzIGEgbGlzdGVuZXIgYWRkZWQgb3V0c2lkZSB0aGUgQW5ndWxhciBjb250ZXh0IHNvIGl0IGNhbiBoYW5kbGVcbiAgICAvLyB0aGUgdHdvIGRpZmZlcmVudGx5LiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIHNwZWNpYWwgJ19fbmdVbndyYXBfXycgdG9rZW4gaXMgcGFzc2VkIHRvIHRoZVxuICAgIC8vIHVud3JhcCB0aGUgbGlzdGVuZXIgKHNlZSBiZWxvdykuXG4gICAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyBJdnkgdXNlcyAnX19uZ1Vud3JhcF9fJyBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBhbGxvd3MgdXMgdG8gdW53cmFwIHRoZSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuIFRoZVxuICAgICAgLy8gZGVidWdfbm9kZSBjYW4gaW5zcGVjdCB0aGUgbGlzdGVuZXIgdG9TdHJpbmcgY29udGVudHMgZm9yIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBzcGVjaWFsXG4gICAgICAvLyB0b2tlbi4gQmVjYXVzZSB0aGUgdG9rZW4gaXMgYSBzdHJpbmcgbGl0ZXJhbCwgaXQgaXMgZW5zdXJlZCB0byBub3QgYmUgbW9kaWZpZWQgYnkgY29tcGlsZWRcbiAgICAgIC8vIGNvZGUuXG4gICAgICBpZiAoZXZlbnQgPT09ICdfX25nVW53cmFwX18nKSB7XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZXZlbnQgaGFuZGxlciBpbnNpZGUgdGhlIG5nWm9uZSBiZWNhdXNlIGV2ZW50IGhhbmRsZXJzIGFyZSBub3QgcGF0Y2hlZFxuICAgICAgLy8gYnkgWm9uZSBvbiB0aGUgc2VydmVyLiBUaGlzIGlzIHJlcXVpcmVkIG9ubHkgZm9yIHRlc3RzLlxuICAgICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXJcbiAgICAgICAgPyB0aGlzLm5nWm9uZS5ydW5HdWFyZGVkKCgpID0+IGV2ZW50SGFuZGxlcihldmVudCkpXG4gICAgICAgIDogZXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gKCgpID0+ICdAJy5jaGFyQ29kZUF0KDApKSgpO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5FWFBFQ1RFRF9TWU5USEVUSUNfUFJPUEVSVFksXG4gICAgICBgVW5leHBlY3RlZCBzeW50aGV0aWMgJHtuYW1lS2luZH0gJHtuYW1lfSBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0OlxuICAtIEVpdGhlciBcXGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZVxcYCBvciBcXGBOb29wQW5pbWF0aW9uc01vZHVsZVxcYCBhcmUgaW1wb3J0ZWQgaW4geW91ciBhcHBsaWNhdGlvbi5cbiAgLSBUaGVyZSBpcyBjb3JyZXNwb25kaW5nIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhbmltYXRpb24gbmFtZWQgXFxgJHtuYW1lfVxcYCBkZWZpbmVkIGluIHRoZSBcXGBhbmltYXRpb25zXFxgIGZpZWxkIG9mIHRoZSBcXGBAQ29tcG9uZW50XFxgIGRlY29yYXRvciAoc2VlIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29yZS9Db21wb25lbnQjYW5pbWF0aW9ucykuYCxcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVOb2RlKG5vZGU6IGFueSk6IG5vZGUgaXMgSFRNTFRlbXBsYXRlRWxlbWVudCB7XG4gIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURU1QTEFURScgJiYgbm9kZS5jb250ZW50ICE9PSB1bmRlZmluZWQ7XG59XG5cbmNsYXNzIFNoYWRvd0RvbVJlbmRlcmVyIGV4dGVuZHMgRGVmYXVsdERvbVJlbmRlcmVyMiB7XG4gIHByaXZhdGUgc2hhZG93Um9vdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICBwcml2YXRlIGhvc3RFbDogYW55LFxuICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICBkb2M6IERvY3VtZW50LFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIG5vbmNlOiBzdHJpbmcgfCBudWxsLFxuICAgIHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW4sXG4gICkge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBzaGltU3R5bGVzQ29udGVudChjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMpO1xuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IHRoaXMuaG9zdEVsID8gdGhpcy5zaGFkb3dSb290IDogbm9kZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICBvdmVycmlkZSByZW1vdmVDaGlsZChfcGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQobnVsbCwgb2xkQ2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cbn1cblxuY2xhc3MgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICBwcml2YXRlIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sXG4gICAgZG9jOiBEb2N1bWVudCxcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICAgIGNvbXBJZD86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyLCBkb2MsIG5nWm9uZSwgcGxhdGZvcm1Jc1NlcnZlcik7XG4gICAgdGhpcy5zdHlsZXMgPSBjb21wSWQgPyBzaGltU3R5bGVzQ29udGVudChjb21wSWQsIGNvbXBvbmVudC5zdHlsZXMpIDogY29tcG9uZW50LnN0eWxlcztcbiAgfVxuXG4gIGFwcGx5U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXModGhpcy5zdHlsZXMpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVTdHlsZXModGhpcy5zdHlsZXMpO1xuICB9XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICBhcHBJZDogc3RyaW5nLFxuICAgIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sXG4gICAgZG9jOiBEb2N1bWVudCxcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHtcbiAgICBjb25zdCBjb21wSWQgPSBhcHBJZCArICctJyArIGNvbXBvbmVudC5pZDtcbiAgICBzdXBlcihcbiAgICAgIGV2ZW50TWFuYWdlcixcbiAgICAgIHNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBjb21wb25lbnQsXG4gICAgICByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95LFxuICAgICAgZG9jLFxuICAgICAgbmdab25lLFxuICAgICAgcGxhdGZvcm1Jc1NlcnZlcixcbiAgICAgIGNvbXBJZCxcbiAgICApO1xuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wSWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wSWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hcHBseVN0eWxlcygpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIl19