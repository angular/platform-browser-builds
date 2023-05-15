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
const REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = false;
/**
 * A [DI token](guide/glossary#di-token "DI token definition") that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `false`. This will be changed in the next major version.
 * @publicApi
 */
export const REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken('RemoveStylesOnCompDestory', {
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
class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestory, doc, platformId, ngZone, nonce = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestory = removeStylesOnCompDestory;
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
            const removeStylesOnCompDestory = this.removeStylesOnCompDestory;
            const platformIsServer = this.platformIsServer;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestory, doc, ngZone, platformIsServer);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestory, doc, ngZone, platformIsServer);
                    break;
            }
            renderer.onDestroy = () => rendererByCompId.delete(type.id);
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1+sha-37acd37", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1+sha-37acd37", ngImport: i0, type: DomRendererFactory2 }); }
}
export { DomRendererFactory2 };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1+sha-37acd37", ngImport: i0, type: DomRendererFactory2, decorators: [{
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
            throw new RuntimeError(5104 /* RuntimeErrorCode.ROOT_NODE_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
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
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestory, doc, ngZone, platformIsServer, compId) {
        super(eventManager, doc, ngZone, platformIsServer);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestory = removeStylesOnCompDestory;
        this.rendererUsageCount = 0;
        this.styles = compId ? shimStylesContent(compId, component.styles) : component.styles;
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles);
        this.rendererUsageCount++;
    }
    destroy() {
        if (!this.removeStylesOnCompDestory) {
            return;
        }
        this.sharedStylesHost.removeStyles(this.styles);
        this.rendererUsageCount--;
        if (this.rendererUsageCount === 0) {
            this.onDestroy?.();
        }
    }
}
class EmulatedEncapsulationDomRenderer2 extends NoneEncapsulationDomRenderer {
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestory, doc, ngZone, platformIsServer) {
        const compId = appId + '-' + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestory, doc, ngZone, platformIsServer, compId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUErQixtQkFBbUIsRUFBaUIsaUJBQWlCLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFdEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeEMsTUFBTSxFQUFFLGdDQUFnQztDQUN6QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLDBDQUEwQyxHQUFHLEtBQUssQ0FBQztBQUV6RDs7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LE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgaXNQbGF0Zm9ybVNlcnZlciwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSUQsIENTUF9OT05DRSwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgTmdab25lLCBPbkRlc3Ryb3ksIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9uLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1J1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX1VSSVM6IHtbbnM6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdzdmcnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAneGh0bWwnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gICd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgJ3htbCc6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICAneG1sbnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLFxuICAnbWF0aCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGhNTC8nLFxufTtcblxuY29uc3QgQ09NUE9ORU5UX1JFR0VYID0gLyVDT01QJS9nO1xuXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgYFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1lgIERJIHRva2VuLlxuICovXG5jb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZX0RFRkFVTFQgPSBmYWxzZTtcblxuLyoqXG4gKiBBIFtESSB0b2tlbl0oZ3VpZGUvZ2xvc3NhcnkjZGktdG9rZW4gXCJESSB0b2tlbiBkZWZpbml0aW9uXCIpIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgc3R5bGVzXG4gKiBvZiBkZXN0cm95ZWQgY29tcG9uZW50cyBzaG91bGQgYmUgcmVtb3ZlZCBmcm9tIERPTS5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0aGUgdmFsdWUgaXMgc2V0IHRvIGBmYWxzZWAuIFRoaXMgd2lsbCBiZSBjaGFuZ2VkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ1JlbW92ZVN0eWxlc09uQ29tcERlc3RvcnknLCB7XG4gICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICBmYWN0b3J5OiAoKSA9PiBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZX0RFRkFVTFQsXG4gICAgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gQ09OVEVOVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBIT1NUX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbVN0eWxlc0NvbnRlbnQoY29tcElkOiBzdHJpbmcsIHN0eWxlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIHJldHVybiBzdHlsZXMubWFwKHMgPT4gcy5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJlckJ5Q29tcElkID1cbiAgICAgIG5ldyBNYXA8c3RyaW5nLCBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjJ8Tm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcj4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0UmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIEBJbmplY3QoQVBQX0lEKSBwcml2YXRlIHJlYWRvbmx5IGFwcElkOiBzdHJpbmcsXG4gICAgICBASW5qZWN0KFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1kpIHByaXZhdGUgcmVtb3ZlU3R5bGVzT25Db21wRGVzdG9yeTogYm9vbGVhbixcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHJlYWRvbmx5IHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAgIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgQEluamVjdChDU1BfTk9OQ0UpIHByaXZhdGUgcmVhZG9ubHkgbm9uY2U6IHN0cmluZ3xudWxsID0gbnVsbCxcbiAgKSB7XG4gICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9XG4gICAgICAgIG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHRoaXMucGxhdGZvcm1Jc1NlcnZlcik7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhdGZvcm1Jc1NlcnZlciAmJiB0eXBlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSkge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgc2hhZG93IERPTS5cbiAgICAgIHR5cGUgPSB7Li4udHlwZSwgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWR9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQsIHR5cGUpO1xuICAgIC8vIFJlbmRlcmVycyBoYXZlIGRpZmZlcmVudCBsb2dpYyBkdWUgdG8gZGlmZmVyZW50IGVuY2Fwc3VsYXRpb24gYmVoYXZpb3Vycy5cbiAgICAvLyBFeDogZm9yIGVtdWxhdGVkLCBhbiBhdHRyaWJ1dGUgaXMgYWRkZWQgdG8gdGhlIGVsZW1lbnQuXG4gICAgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKSB7XG4gICAgICByZW5kZXJlci5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuYXBwbHlTdHlsZXMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBwcml2YXRlIGdldE9yQ3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlckJ5Q29tcElkID0gdGhpcy5yZW5kZXJlckJ5Q29tcElkO1xuICAgIGxldCByZW5kZXJlciA9IHJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuXG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2M7XG4gICAgICBjb25zdCBuZ1pvbmUgPSB0aGlzLm5nWm9uZTtcbiAgICAgIGNvbnN0IGV2ZW50TWFuYWdlciA9IHRoaXMuZXZlbnRNYW5hZ2VyO1xuICAgICAgY29uc3Qgc2hhcmVkU3R5bGVzSG9zdCA9IHRoaXMuc2hhcmVkU3R5bGVzSG9zdDtcbiAgICAgIGNvbnN0IHJlbW92ZVN0eWxlc09uQ29tcERlc3RvcnkgPSB0aGlzLnJlbW92ZVN0eWxlc09uQ29tcERlc3Rvcnk7XG4gICAgICBjb25zdCBwbGF0Zm9ybUlzU2VydmVyID0gdGhpcy5wbGF0Zm9ybUlzU2VydmVyO1xuXG4gICAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMihcbiAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkLCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5LCBkb2MsXG4gICAgICAgICAgICAgIG5nWm9uZSwgcGxhdGZvcm1Jc1NlcnZlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSwgZG9jLCBuZ1pvbmUsIHRoaXMubm9uY2UsXG4gICAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdG9yeSwgZG9jLCBuZ1pvbmUsXG4gICAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5vbkRlc3Ryb3kgPSAoKSA9PiByZW5kZXJlckJ5Q29tcElkLmRlbGV0ZSh0eXBlLmlkKTtcbiAgICAgIHJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuY2xlYXIoKTtcbiAgfVxufVxuXG5jbGFzcyBEZWZhdWx0RG9tUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlID0gbnVsbDtcblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogYW55IHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAvLyBUT0RPOiBgfHwgbmFtZXNwYWNlYCB3YXMgYWRkZWQgaW5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvY29tbWl0LzJiOWNjODUwM2Q0ODE3MzQ5MmMyOWY1YTI3MWI2MTEyNjEwNGZiZGIgdG9cbiAgICAgIC8vIHN1cHBvcnQgaG93IEl2eSBwYXNzZWQgYXJvdW5kIHRoZSBuYW1lc3BhY2UgVVJJIHJhdGhlciB0aGFuIHNob3J0IG5hbWUgYXQgdGhlIHRpbWUuIEl0IGRpZFxuICAgICAgLy8gbm90LCBob3dldmVyIGV4dGVuZCB0aGUgc3VwcG9ydCB0byBvdGhlciBwYXJ0cyBvZiB0aGUgc3lzdGVtIChzZXRBdHRyaWJ1dGUsIHNldEF0dHJpYnV0ZSxcbiAgICAgIC8vIGFuZCB0aGUgU2VydmVyUmVuZGVyZXIpLiBXZSBzaG91bGQgZGVjaWRlIHdoYXQgZXhhY3RseSB0aGUgc2VtYW50aWNzIGZvciBkZWFsaW5nIHdpdGhcbiAgICAgIC8vIG5hbWVzcGFjZXMgc2hvdWxkIGJlIGFuZCBtYWtlIGl0IGNvbnNpc3RlbnQuXG4gICAgICAvLyBSZWxhdGVkIGlzc3VlczpcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ0MDI4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDg4M1xuICAgICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnROUyhOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdIHx8IG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRQYXJlbnQgPSBpc1RlbXBsYXRlTm9kZShwYXJlbnQpID8gcGFyZW50LmNvbnRlbnQgOiBwYXJlbnQ7XG4gICAgICB0YXJnZXRQYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgZWw6IGFueSA9IHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycgPyB0aGlzLmRvYy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JPck5vZGU7XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlJPT1RfTk9ERV9OT1RfRk9VTkQsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICAgYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgKFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UgfCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KHN0eWxlLCB2YWx1ZSwgZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIC8vIHJlbW92ZVByb3BlcnR5IGhhcyBubyBlZmZlY3Qgd2hlbiB1c2VkIG9uIGNhbWVsQ2FzZWQgcHJvcGVydGllcy5cbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0YXJnZXQgPSBnZXRET00oKS5nZXRHbG9iYWxFdmVudFRhcmdldCh0aGlzLmRvYywgdGFyZ2V0KTtcbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZXZlbnQgdGFyZ2V0ICR7dGFyZ2V0fSBmb3IgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgIHRhcmdldCwgZXZlbnQsIHRoaXMuZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzIFZvaWRGdW5jdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIC8vIGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAgbmVlZHMgdG8ga25vdyBpZiB0aGUgbGlzdGVuZXIgd2FzIGNyZWF0ZWQgd2l0aFxuICAgIC8vIGRlY29yYXRlUHJldmVudERlZmF1bHQgb3IgaXMgYSBsaXN0ZW5lciBhZGRlZCBvdXRzaWRlIHRoZSBBbmd1bGFyIGNvbnRleHQgc28gaXQgY2FuIGhhbmRsZVxuICAgIC8vIHRoZSB0d28gZGlmZmVyZW50bHkuIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgc3BlY2lhbCAnX19uZ1Vud3JhcF9fJyB0b2tlbiBpcyBwYXNzZWQgdG8gdGhlXG4gICAgLy8gdW53cmFwIHRoZSBsaXN0ZW5lciAoc2VlIGJlbG93KS5cbiAgICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIC8vIEl2eSB1c2VzICdfX25nVW53cmFwX18nIGFzIGEgc3BlY2lhbCB0b2tlbiB0aGF0IGFsbG93cyB1cyB0byB1bndyYXAgdGhlIGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IGl0IGNhbiBiZSBpbnZva2VkIHByb2dyYW1tYXRpY2FsbHkgYnkgYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYC4gVGhlXG4gICAgICAvLyBkZWJ1Z19ub2RlIGNhbiBpbnNwZWN0IHRoZSBsaXN0ZW5lciB0b1N0cmluZyBjb250ZW50cyBmb3IgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzIHNwZWNpYWxcbiAgICAgIC8vIHRva2VuLiBCZWNhdXNlIHRoZSB0b2tlbiBpcyBhIHN0cmluZyBsaXRlcmFsLCBpdCBpcyBlbnN1cmVkIHRvIG5vdCBiZSBtb2RpZmllZCBieSBjb21waWxlZFxuICAgICAgLy8gY29kZS5cbiAgICAgIGlmIChldmVudCA9PT0gJ19fbmdVbndyYXBfXycpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlcjtcbiAgICAgIH1cblxuICAgICAgLy8gUnVuIHRoZSBldmVudCBoYW5kbGVyIGluc2lkZSB0aGUgbmdab25lIGJlY2F1c2UgZXZlbnQgaGFuZGxlcnMgYXJlIG5vdCBwYXRjaGVkXG4gICAgICAvLyBieSBab25lIG9uIHRoZSBzZXJ2ZXIuIFRoaXMgaXMgcmVxdWlyZWQgb25seSBmb3IgdGVzdHMuXG4gICAgICBjb25zdCBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IHRoaXMucGxhdGZvcm1Jc1NlcnZlciA/XG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKSA6XG4gICAgICAgICAgZXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gKCgpID0+ICdAJy5jaGFyQ29kZUF0KDApKSgpO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5VTkVYUEVDVEVEX1NZTlRIRVRJQ19QUk9QRVJUWSxcbiAgICAgICAgYFVuZXhwZWN0ZWQgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0gZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdDpcbiAgLSBFaXRoZXIgXFxgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcXGAgb3IgXFxgTm9vcEFuaW1hdGlvbnNNb2R1bGVcXGAgYXJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24uXG4gIC0gVGhlcmUgaXMgY29ycmVzcG9uZGluZyBjb25maWd1cmF0aW9uIGZvciB0aGUgYW5pbWF0aW9uIG5hbWVkIFxcYCR7XG4gICAgICAgICAgICBuYW1lfVxcYCBkZWZpbmVkIGluIHRoZSBcXGBhbmltYXRpb25zXFxgIGZpZWxkIG9mIHRoZSBcXGBAQ29tcG9uZW50XFxgIGRlY29yYXRvciAoc2VlIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29yZS9Db21wb25lbnQjYW5pbWF0aW9ucykuYCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTm9kZShub2RlOiBhbnkpOiBub2RlIGlzIEhUTUxUZW1wbGF0ZUVsZW1lbnQge1xuICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVNUExBVEUnICYmIG5vZGUuY29udGVudCAhPT0gdW5kZWZpbmVkO1xufVxuXG5jbGFzcyBTaGFkb3dEb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHNoYWRvd1Jvb3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSxcbiAgICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIGRvYzogRG9jdW1lbnQsXG4gICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIG5vbmNlOiBzdHJpbmd8bnVsbCxcbiAgICAgIHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW4sXG4gICkge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBzaGltU3R5bGVzQ29udGVudChjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMpO1xuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IHRoaXMuaG9zdEVsID8gdGhpcy5zaGFkb3dSb290IDogbm9kZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICBvdmVycmlkZSByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgb2xkQ2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cbn1cblxuY2xhc3MgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlczogc3RyaW5nW107XG4gIHByaXZhdGUgcmVuZGVyZXJVc2FnZUNvdW50ID0gMDtcbiAgb25EZXN0cm95OiBWb2lkRnVuY3Rpb258dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgICBwcml2YXRlIHJlbW92ZVN0eWxlc09uQ29tcERlc3Rvcnk6IGJvb2xlYW4sXG4gICAgICBkb2M6IERvY3VtZW50LFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICAgICAgY29tcElkPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnN0eWxlcyA9IGNvbXBJZCA/IHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZCwgY29tcG9uZW50LnN0eWxlcykgOiBjb21wb25lbnQuc3R5bGVzO1xuICB9XG5cbiAgYXBwbHlTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gICAgdGhpcy5yZW5kZXJlclVzYWdlQ291bnQrKztcbiAgfVxuXG4gIG92ZXJyaWRlIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlbW92ZVN0eWxlc09uQ29tcERlc3RvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgICB0aGlzLnJlbmRlcmVyVXNhZ2VDb3VudC0tO1xuICAgIGlmICh0aGlzLnJlbmRlcmVyVXNhZ2VDb3VudCA9PT0gMCkge1xuICAgICAgdGhpcy5vbkRlc3Ryb3k/LigpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIgZXh0ZW5kcyBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCwgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyLFxuICAgICAgYXBwSWQ6IHN0cmluZywgcmVtb3ZlU3R5bGVzT25Db21wRGVzdG9yeTogYm9vbGVhbiwgZG9jOiBEb2N1bWVudCwgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuKSB7XG4gICAgY29uc3QgY29tcElkID0gYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQ7XG4gICAgc3VwZXIoXG4gICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgY29tcG9uZW50LCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5LCBkb2MsIG5nWm9uZSxcbiAgICAgICAgcGxhdGZvcm1Jc1NlcnZlciwgY29tcElkKTtcbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcElkKTtcbiAgICB0aGlzLmhvc3RBdHRyID0gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcElkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7XG4gIH1cblxuICBvdmVycmlkZSBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cbiJdfQ==