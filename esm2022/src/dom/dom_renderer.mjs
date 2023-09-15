/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformServer, ɵgetDOM as getDOM } from '@angular/common';
import { APP_ID, CSP_NONCE, Inject, Injectable, InjectionToken, NgZone, PLATFORM_ID, RendererStyleFlags2, ViewEncapsulation, ɵRuntimeError as RuntimeError } from '@angular/core';
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
 * A [DI token](guide/glossary#di-token "DI token definition") that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `true`.
 * @publicApi
 */
export const REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken('RemoveStylesOnCompDestroy', {
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
    return styles.map(s => s.replace(COMPONENT_REGEX, compId));
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
        this.defaultRenderer =
            new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.4+sha-0c5b34b", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.4+sha-0c5b34b", ngImport: i0, type: DomRendererFactory2 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.4+sha-0c5b34b", ngImport: i0, type: DomRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.EventManager }, { type: i2.SharedStylesHost }, { type: undefined, decorators: [{
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
                }] }]; } });
class DefaultDomRenderer2 {
    constructor(eventManager, doc, ngZone, platformIsServer) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platformIsServer = platformIsServer;
        this.data = Object.create(null);
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
        let el = typeof selectorOrNode === 'string' ? this.doc.querySelector(selectorOrNode) :
            selectorOrNode;
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
        (typeof ngDevMode === 'undefined' || ngDevMode) && checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback) {
        (typeof ngDevMode === 'undefined' || ngDevMode) && checkNoSyntheticProp(event, 'listener');
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
            const allowDefaultBehavior = this.platformIsServer ?
                this.ngZone.runGuarded(() => eventHandler(event)) :
                eventHandler(event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUErQixtQkFBbUIsRUFBaUIsaUJBQWlCLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFdEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeEMsTUFBTSxFQUFFLGdDQUFnQztDQUN6QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLDBDQUEwQyxHQUFHLElBQUksQ0FBQztBQUV4RDs7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LENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQUVELE1BQU0saUNBQWtDLFNBQVEsNEJBQTRCO0lBSTFFLFlBQ0ksWUFBMEIsRUFBRSxnQkFBa0MsRUFBRSxTQUF3QixFQUN4RixLQUFhLEVBQUUseUJBQWtDLEVBQUUsR0FBYSxFQUFFLE1BQWMsRUFDaEYsZ0JBQXlCO1FBQzNCLE1BQU0sTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxLQUFLLENBQ0QsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUNqRixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFZO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFUSxhQUFhLENBQUMsTUFBVyxFQUFFLElBQVk7UUFDOUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtU2VydmVyLCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0FQUF9JRCwgQ1NQX05PTkNFLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9uRGVzdHJveSwgUExBVEZPUk1fSUQsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgVmlld0VuY2Fwc3VsYXRpb24sIMm1UnVudGltZUVycm9yIGFzIFJ1bnRpbWVFcnJvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG4gICdtYXRoJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aE1MLycsXG59O1xuXG5jb25zdCBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5cbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWWAgREkgdG9rZW4uXG4gKi9cbmNvbnN0IFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1lfREVGQVVMVCA9IHRydWU7XG5cbi8qKlxuICogQSBbREkgdG9rZW5dKGd1aWRlL2dsb3NzYXJ5I2RpLXRva2VuIFwiREkgdG9rZW4gZGVmaW5pdGlvblwiKSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHN0eWxlc1xuICogb2YgZGVzdHJveWVkIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBET00uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHZhbHVlIGlzIHNldCB0byBgdHJ1ZWAuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ1JlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3knLCB7XG4gICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICBmYWN0b3J5OiAoKSA9PiBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZX0RFRkFVTFQsXG4gICAgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gQ09OVEVOVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBIT1NUX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVN0eWxlc0NvbnRlbnQoY29tcElkOiBzdHJpbmcsIHN0eWxlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIHJldHVybiBzdHlsZXMubWFwKHMgPT4gcy5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlckJ5Q29tcElkID1cbiAgICAgIG5ldyBNYXA8c3RyaW5nLCBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjJ8Tm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0UmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIEBJbmplY3QoQVBQX0lEKSBwcml2YXRlIHJlYWRvbmx5IGFwcElkOiBzdHJpbmcsXG4gICAgICBASW5qZWN0KFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1kpIHByaXZhdGUgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveTogYm9vbGVhbixcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHJlYWRvbmx5IHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAgIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgQEluamVjdChDU1BfTk9OQ0UpIHByaXZhdGUgcmVhZG9ubHkgbm9uY2U6IHN0cmluZ3xudWxsID0gbnVsbCxcbiAgKSB7XG4gICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9XG4gICAgICAgIG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHRoaXMucGxhdGZvcm1Jc1NlcnZlcik7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhdGZvcm1Jc1NlcnZlciAmJiB0eXBlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSkge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgc2hhZG93IERPTS5cbiAgICAgIHR5cGUgPSB7Li4udHlwZSwgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWR9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQsIHR5cGUpO1xuICAgIC8vIFJlbmRlcmVycyBoYXZlIGRpZmZlcmVudCBsb2dpYyBkdWUgdG8gZGlmZmVyZW50IGVuY2Fwc3VsYXRpb24gYmVoYXZpb3Vycy5cbiAgICAvLyBFeDogZm9yIGVtdWxhdGVkLCBhbiBhdHRyaWJ1dGUgaXMgYWRkZWQgdG8gdGhlIGVsZW1lbnQuXG4gICAgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKSB7XG4gICAgICByZW5kZXJlci5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuYXBwbHlTdHlsZXMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBwcml2YXRlIGdldE9yQ3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlckJ5Q29tcElkID0gdGhpcy5yZW5kZXJlckJ5Q29tcElkO1xuICAgIGxldCByZW5kZXJlciA9IHJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuXG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2M7XG4gICAgICBjb25zdCBuZ1pvbmUgPSB0aGlzLm5nWm9uZTtcbiAgICAgIGNvbnN0IGV2ZW50TWFuYWdlciA9IHRoaXMuZXZlbnRNYW5hZ2VyO1xuICAgICAgY29uc3Qgc2hhcmVkU3R5bGVzSG9zdCA9IHRoaXMuc2hhcmVkU3R5bGVzSG9zdDtcbiAgICAgIGNvbnN0IHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3kgPSB0aGlzLnJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k7XG4gICAgICBjb25zdCBwbGF0Zm9ybUlzU2VydmVyID0gdGhpcy5wbGF0Zm9ybUlzU2VydmVyO1xuXG4gICAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMihcbiAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkLCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95LCBkb2MsXG4gICAgICAgICAgICAgIG5nWm9uZSwgcGxhdGZvcm1Jc1NlcnZlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSwgZG9jLCBuZ1pvbmUsIHRoaXMubm9uY2UsXG4gICAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSwgZG9jLCBuZ1pvbmUsXG4gICAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLmNsZWFyKCk7XG4gIH1cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbikge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZSA9IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETzogYHx8IG5hbWVzcGFjZWAgd2FzIGFkZGVkIGluXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2NvbW1pdC8yYjljYzg1MDNkNDgxNzM0OTJjMjlmNWEyNzFiNjExMjYxMDRmYmRiIHRvXG4gICAgICAvLyBzdXBwb3J0IGhvdyBJdnkgcGFzc2VkIGFyb3VuZCB0aGUgbmFtZXNwYWNlIFVSSSByYXRoZXIgdGhhbiBzaG9ydCBuYW1lIGF0IHRoZSB0aW1lLiBJdCBkaWRcbiAgICAgIC8vIG5vdCwgaG93ZXZlciBleHRlbmQgdGhlIHN1cHBvcnQgdG8gb3RoZXIgcGFydHMgb2YgdGhlIHN5c3RlbSAoc2V0QXR0cmlidXRlLCBzZXRBdHRyaWJ1dGUsXG4gICAgICAvLyBhbmQgdGhlIFNlcnZlclJlbmRlcmVyKS4gV2Ugc2hvdWxkIGRlY2lkZSB3aGF0IGV4YWN0bHkgdGhlIHNlbWFudGljcyBmb3IgZGVhbGluZyB3aXRoXG4gICAgICAvLyBuYW1lc3BhY2VzIHNob3VsZCBiZSBhbmQgbWFrZSBpdCBjb25zaXN0ZW50LlxuICAgICAgLy8gUmVsYXRlZCBpc3N1ZXM6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDAyOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQ4ODNcbiAgICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICB0YXJnZXRQYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgICAgdGFyZ2V0UGFyZW50Lmluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgbGV0IGVsOiBhbnkgPSB0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnID8gdGhpcy5kb2MucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yTm9kZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yT3JOb2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5ST09UX05PREVfTk9UX0ZPVU5ELFxuICAgICAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgICAgICAgIGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgfVxuICAgIGlmICghcHJlc2VydmVDb250ZW50KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBuYW1lID0gbmFtZXNwYWNlICsgJzonICsgbmFtZTtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGAke25hbWVzcGFjZX06JHtuYW1lfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIChSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlIHwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZSwgdmFsdWUsIGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICAvLyByZW1vdmVQcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IHdoZW4gdXNlZCBvbiBjYW1lbENhc2VkIHByb3BlcnRpZXMuXG4gICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWUsICdwcm9wZXJ0eScpO1xuICAgIGVsW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBub2RlLm5vZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOlxuICAgICAgKCkgPT4gdm9pZCB7XG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnQsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGFyZ2V0ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5kb2MsIHRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGV2ZW50IHRhcmdldCAke3RhcmdldH0gZm9yIGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50LCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKSBhcyBWb2lkRnVuY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvLyBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgIG5lZWRzIHRvIGtub3cgaWYgdGhlIGxpc3RlbmVyIHdhcyBjcmVhdGVkIHdpdGhcbiAgICAvLyBkZWNvcmF0ZVByZXZlbnREZWZhdWx0IG9yIGlzIGEgbGlzdGVuZXIgYWRkZWQgb3V0c2lkZSB0aGUgQW5ndWxhciBjb250ZXh0IHNvIGl0IGNhbiBoYW5kbGVcbiAgICAvLyB0aGUgdHdvIGRpZmZlcmVudGx5LiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIHNwZWNpYWwgJ19fbmdVbndyYXBfXycgdG9rZW4gaXMgcGFzc2VkIHRvIHRoZVxuICAgIC8vIHVud3JhcCB0aGUgbGlzdGVuZXIgKHNlZSBiZWxvdykuXG4gICAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyBJdnkgdXNlcyAnX19uZ1Vud3JhcF9fJyBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBhbGxvd3MgdXMgdG8gdW53cmFwIHRoZSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuIFRoZVxuICAgICAgLy8gZGVidWdfbm9kZSBjYW4gaW5zcGVjdCB0aGUgbGlzdGVuZXIgdG9TdHJpbmcgY29udGVudHMgZm9yIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBzcGVjaWFsXG4gICAgICAvLyB0b2tlbi4gQmVjYXVzZSB0aGUgdG9rZW4gaXMgYSBzdHJpbmcgbGl0ZXJhbCwgaXQgaXMgZW5zdXJlZCB0byBub3QgYmUgbW9kaWZpZWQgYnkgY29tcGlsZWRcbiAgICAgIC8vIGNvZGUuXG4gICAgICBpZiAoZXZlbnQgPT09ICdfX25nVW53cmFwX18nKSB7XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZXZlbnQgaGFuZGxlciBpbnNpZGUgdGhlIG5nWm9uZSBiZWNhdXNlIGV2ZW50IGhhbmRsZXJzIGFyZSBub3QgcGF0Y2hlZFxuICAgICAgLy8gYnkgWm9uZSBvbiB0aGUgc2VydmVyLiBUaGlzIGlzIHJlcXVpcmVkIG9ubHkgZm9yIHRlc3RzLlxuICAgICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgP1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bkd1YXJkZWQoKCkgPT4gZXZlbnRIYW5kbGVyKGV2ZW50KSkgOlxuICAgICAgICAgIGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgICBpZiAoYWxsb3dEZWZhdWx0QmVoYXZpb3IgPT09IGZhbHNlKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICgoKSA9PiAnQCcuY2hhckNvZGVBdCgwKSkoKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5FWFBFQ1RFRF9TWU5USEVUSUNfUFJPUEVSVFksXG4gICAgICAgIGBVbmV4cGVjdGVkIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9IGZvdW5kLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQ6XG4gIC0gRWl0aGVyIFxcYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXFxgIG9yIFxcYE5vb3BBbmltYXRpb25zTW9kdWxlXFxgIGFyZSBpbXBvcnRlZCBpbiB5b3VyIGFwcGxpY2F0aW9uLlxuICAtIFRoZXJlIGlzIGNvcnJlc3BvbmRpbmcgY29uZmlndXJhdGlvbiBmb3IgdGhlIGFuaW1hdGlvbiBuYW1lZCBcXGAke1xuICAgICAgICAgICAgbmFtZX1cXGAgZGVmaW5lZCBpbiB0aGUgXFxgYW5pbWF0aW9uc1xcYCBmaWVsZCBvZiB0aGUgXFxgQENvbXBvbmVudFxcYCBkZWNvcmF0b3IgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvQ29tcG9uZW50I2FuaW1hdGlvbnMpLmApO1xuICB9XG59XG5cblxuZnVuY3Rpb24gaXNUZW1wbGF0ZU5vZGUobm9kZTogYW55KTogbm9kZSBpcyBIVE1MVGVtcGxhdGVFbGVtZW50IHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJyAmJiBub2RlLmNvbnRlbnQgIT09IHVuZGVmaW5lZDtcbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgaG9zdEVsOiBhbnksXG4gICAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgICBkb2M6IERvY3VtZW50LFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBub25jZTogc3RyaW5nfG51bGwsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gc2hpbVN0eWxlc0NvbnRlbnQoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzKTtcblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7XG4gIH1cblxuICBvdmVycmlkZSBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hcHBlbmRDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRCZWZvcmUodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG9sZENoaWxkKTtcbiAgfVxuICBvdmVycmlkZSBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU9yU2hhZG93Um9vdChzdXBlci5wYXJlbnROb2RlKHRoaXMubm9kZU9yU2hhZG93Um9vdChub2RlKSkpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGVzdHJveSgpIHtcbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpO1xuICB9XG59XG5cbmNsYXNzIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgICBwcml2YXRlIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sXG4gICAgICBkb2M6IERvY3VtZW50LFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICAgICAgY29tcElkPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnN0eWxlcyA9IGNvbXBJZCA/IHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZCwgY29tcG9uZW50LnN0eWxlcykgOiBjb21wb25lbnQuc3R5bGVzO1xuICB9XG5cbiAgYXBwbHlTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LnJlbW92ZVN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyIGV4dGVuZHMgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIGFwcElkOiBzdHJpbmcsIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sIGRvYzogRG9jdW1lbnQsIG5nWm9uZTogTmdab25lLFxuICAgICAgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbXBJZCA9IGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkO1xuICAgIHN1cGVyKFxuICAgICAgICBldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIGNvbXBvbmVudCwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSwgZG9jLCBuZ1pvbmUsXG4gICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsIGNvbXBJZCk7XG4gICAgdGhpcy5jb250ZW50QXR0ciA9IHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBJZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpO1xuICB9XG5cbiAgb3ZlcnJpZGUgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG4iXX0=