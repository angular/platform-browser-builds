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
            renderer.onDestroy = () => rendererByCompId.delete(type.id);
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0-next.0+sha-452a3e9", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.0-next.0+sha-452a3e9", ngImport: i0, type: DomRendererFactory2 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0-next.0+sha-452a3e9", ngImport: i0, type: DomRendererFactory2, decorators: [{
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
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, compId) {
        super(eventManager, doc, ngZone, platformIsServer);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.rendererUsageCount = 0;
        this.styles = compId ? shimStylesContent(compId, component.styles) : component.styles;
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles);
        this.rendererUsageCount++;
    }
    destroy() {
        if (!this.removeStylesOnCompDestroy) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUErQixtQkFBbUIsRUFBaUIsaUJBQWlCLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFdEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeEMsTUFBTSxFQUFFLGdDQUFnQztDQUN6QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLDBDQUEwQyxHQUFHLEtBQUssQ0FBQztBQUV6RDs7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QUUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXIsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBDU1BfTk9OQ0UsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbiwgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSAnLi9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge1NoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9VUklTOiB7W25zOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgJ3hodG1sJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAneGxpbmsnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICd4bWwnOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcbiAgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyxcbiAgJ21hdGgnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoTUwvJyxcbn07XG5cbmNvbnN0IENPTVBPTkVOVF9SRUdFWCA9IC8lQ09NUCUvZztcblxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZYCBESSB0b2tlbi5cbiAqL1xuY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxUID0gZmFsc2U7XG5cbi8qKlxuICogQSBbREkgdG9rZW5dKGd1aWRlL2dsb3NzYXJ5I2RpLXRva2VuIFwiREkgdG9rZW4gZGVmaW5pdGlvblwiKSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHN0eWxlc1xuICogb2YgZGVzdHJveWVkIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBET00uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHZhbHVlIGlzIHNldCB0byBgZmFsc2VgLiBUaGlzIHdpbGwgYmUgY2hhbmdlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdSZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95Jywge1xuICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgZmFjdG9yeTogKCkgPT4gUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxULFxuICAgIH0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZDogc3RyaW5nLCBzdHlsZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICByZXR1cm4gc3R5bGVzLm1hcChzID0+IHMucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBJZCkpO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXJCeUNvbXBJZCA9XG4gICAgICBuZXcgTWFwPHN0cmluZywgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyfE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXI+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSByZWFkb25seSBhcHBJZDogc3RyaW5nLFxuICAgICAgQEluamVjdChSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZKSBwcml2YXRlIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIHJlYWRvbmx5IGRvYzogRG9jdW1lbnQsXG4gICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSByZWFkb25seSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgICByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIEBJbmplY3QoQ1NQX05PTkNFKSBwcml2YXRlIHJlYWRvbmx5IG5vbmNlOiBzdHJpbmd8bnVsbCA9IG51bGwsXG4gICkge1xuICAgIHRoaXMucGxhdGZvcm1Jc1NlcnZlciA9IGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCk7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPVxuICAgICAgICBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgJiYgdHlwZS5lbmNhcHN1bGF0aW9uID09PSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb20pIHtcbiAgICAgIC8vIERvbWlubyBkb2VzIG5vdCBzdXBwb3J0IHNoYWRvdyBET00uXG4gICAgICB0eXBlID0gey4uLnR5cGUsIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkfTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0T3JDcmVhdGVSZW5kZXJlcihlbGVtZW50LCB0eXBlKTtcbiAgICAvLyBSZW5kZXJlcnMgaGF2ZSBkaWZmZXJlbnQgbG9naWMgZHVlIHRvIGRpZmZlcmVudCBlbmNhcHN1bGF0aW9uIGJlaGF2aW91cnMuXG4gICAgLy8gRXg6IGZvciBlbXVsYXRlZCwgYW4gYXR0cmlidXRlIGlzIGFkZGVkIHRvIHRoZSBlbGVtZW50LlxuICAgIGlmIChyZW5kZXJlciBpbnN0YW5jZW9mIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMikge1xuICAgICAgcmVuZGVyZXIuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChyZW5kZXJlciBpbnN0YW5jZW9mIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLmFwcGx5U3R5bGVzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMik6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgcmVuZGVyZXJCeUNvbXBJZCA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZDtcbiAgICBsZXQgcmVuZGVyZXIgPSByZW5kZXJlckJ5Q29tcElkLmdldCh0eXBlLmlkKTtcblxuICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jO1xuICAgICAgY29uc3Qgbmdab25lID0gdGhpcy5uZ1pvbmU7XG4gICAgICBjb25zdCBldmVudE1hbmFnZXIgPSB0aGlzLmV2ZW50TWFuYWdlcjtcbiAgICAgIGNvbnN0IHNoYXJlZFN0eWxlc0hvc3QgPSB0aGlzLnNoYXJlZFN0eWxlc0hvc3Q7XG4gICAgICBjb25zdCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95ID0gdGhpcy5yZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95O1xuICAgICAgY29uc3QgcGxhdGZvcm1Jc1NlcnZlciA9IHRoaXMucGxhdGZvcm1Jc1NlcnZlcjtcblxuICAgICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDpcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSwgdGhpcy5hcHBJZCwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSwgZG9jLFxuICAgICAgICAgICAgICBuZ1pvbmUsIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbTpcbiAgICAgICAgICByZXR1cm4gbmV3IFNoYWRvd0RvbVJlbmRlcmVyKFxuICAgICAgICAgICAgICBldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIGVsZW1lbnQsIHR5cGUsIGRvYywgbmdab25lLCB0aGlzLm5vbmNlLFxuICAgICAgICAgICAgICBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyKFxuICAgICAgICAgICAgICBldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIHR5cGUsIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3ksIGRvYywgbmdab25lLFxuICAgICAgICAgICAgICBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIub25EZXN0cm95ID0gKCkgPT4gcmVuZGVyZXJCeUNvbXBJZC5kZWxldGUodHlwZS5pZCk7XG4gICAgICByZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLmNsZWFyKCk7XG4gIH1cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbikge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZSA9IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETzogYHx8IG5hbWVzcGFjZWAgd2FzIGFkZGVkIGluXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2NvbW1pdC8yYjljYzg1MDNkNDgxNzM0OTJjMjlmNWEyNzFiNjExMjYxMDRmYmRiIHRvXG4gICAgICAvLyBzdXBwb3J0IGhvdyBJdnkgcGFzc2VkIGFyb3VuZCB0aGUgbmFtZXNwYWNlIFVSSSByYXRoZXIgdGhhbiBzaG9ydCBuYW1lIGF0IHRoZSB0aW1lLiBJdCBkaWRcbiAgICAgIC8vIG5vdCwgaG93ZXZlciBleHRlbmQgdGhlIHN1cHBvcnQgdG8gb3RoZXIgcGFydHMgb2YgdGhlIHN5c3RlbSAoc2V0QXR0cmlidXRlLCBzZXRBdHRyaWJ1dGUsXG4gICAgICAvLyBhbmQgdGhlIFNlcnZlclJlbmRlcmVyKS4gV2Ugc2hvdWxkIGRlY2lkZSB3aGF0IGV4YWN0bHkgdGhlIHNlbWFudGljcyBmb3IgZGVhbGluZyB3aXRoXG4gICAgICAvLyBuYW1lc3BhY2VzIHNob3VsZCBiZSBhbmQgbWFrZSBpdCBjb25zaXN0ZW50LlxuICAgICAgLy8gUmVsYXRlZCBpc3N1ZXM6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDAyOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQ4ODNcbiAgICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICB0YXJnZXRQYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgICAgdGFyZ2V0UGFyZW50Lmluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgbGV0IGVsOiBhbnkgPSB0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnID8gdGhpcy5kb2MucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yTm9kZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yT3JOb2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgICAgUnVudGltZUVycm9yQ29kZS5ST09UX05PREVfTk9UX0ZPVU5ELFxuICAgICAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmXG4gICAgICAgICAgICAgIGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgfVxuICAgIGlmICghcHJlc2VydmVDb250ZW50KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBuYW1lID0gbmFtZXNwYWNlICsgJzonICsgbmFtZTtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGAke25hbWVzcGFjZX06JHtuYW1lfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gIH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIChSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlIHwgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShzdHlsZSwgdmFsdWUsIGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICAvLyByZW1vdmVQcm9wZXJ0eSBoYXMgbm8gZWZmZWN0IHdoZW4gdXNlZCBvbiBjYW1lbENhc2VkIHByb3BlcnRpZXMuXG4gICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWUsICdwcm9wZXJ0eScpO1xuICAgIGVsW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBub2RlLm5vZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgbGlzdGVuKHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOlxuICAgICAgKCkgPT4gdm9pZCB7XG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnQsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGFyZ2V0ID0gZ2V0RE9NKCkuZ2V0R2xvYmFsRXZlbnRUYXJnZXQodGhpcy5kb2MsIHRhcmdldCk7XG4gICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGV2ZW50IHRhcmdldCAke3RhcmdldH0gZm9yIGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50LCB0aGlzLmRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKSBhcyBWb2lkRnVuY3Rpb247XG4gIH1cblxuICBwcml2YXRlIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICAvLyBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgIG5lZWRzIHRvIGtub3cgaWYgdGhlIGxpc3RlbmVyIHdhcyBjcmVhdGVkIHdpdGhcbiAgICAvLyBkZWNvcmF0ZVByZXZlbnREZWZhdWx0IG9yIGlzIGEgbGlzdGVuZXIgYWRkZWQgb3V0c2lkZSB0aGUgQW5ndWxhciBjb250ZXh0IHNvIGl0IGNhbiBoYW5kbGVcbiAgICAvLyB0aGUgdHdvIGRpZmZlcmVudGx5LiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIHNwZWNpYWwgJ19fbmdVbndyYXBfXycgdG9rZW4gaXMgcGFzc2VkIHRvIHRoZVxuICAgIC8vIHVud3JhcCB0aGUgbGlzdGVuZXIgKHNlZSBiZWxvdykuXG4gICAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyBJdnkgdXNlcyAnX19uZ1Vud3JhcF9fJyBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBhbGxvd3MgdXMgdG8gdW53cmFwIHRoZSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuIFRoZVxuICAgICAgLy8gZGVidWdfbm9kZSBjYW4gaW5zcGVjdCB0aGUgbGlzdGVuZXIgdG9TdHJpbmcgY29udGVudHMgZm9yIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBzcGVjaWFsXG4gICAgICAvLyB0b2tlbi4gQmVjYXVzZSB0aGUgdG9rZW4gaXMgYSBzdHJpbmcgbGl0ZXJhbCwgaXQgaXMgZW5zdXJlZCB0byBub3QgYmUgbW9kaWZpZWQgYnkgY29tcGlsZWRcbiAgICAgIC8vIGNvZGUuXG4gICAgICBpZiAoZXZlbnQgPT09ICdfX25nVW53cmFwX18nKSB7XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgICB9XG5cbiAgICAgIC8vIFJ1biB0aGUgZXZlbnQgaGFuZGxlciBpbnNpZGUgdGhlIG5nWm9uZSBiZWNhdXNlIGV2ZW50IGhhbmRsZXJzIGFyZSBub3QgcGF0Y2hlZFxuICAgICAgLy8gYnkgWm9uZSBvbiB0aGUgc2VydmVyLiBUaGlzIGlzIHJlcXVpcmVkIG9ubHkgZm9yIHRlc3RzLlxuICAgICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXIgP1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bkd1YXJkZWQoKCkgPT4gZXZlbnRIYW5kbGVyKGV2ZW50KSkgOlxuICAgICAgICAgIGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgICBpZiAoYWxsb3dEZWZhdWx0QmVoYXZpb3IgPT09IGZhbHNlKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICgoKSA9PiAnQCcuY2hhckNvZGVBdCgwKSkoKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICAgIFJ1bnRpbWVFcnJvckNvZGUuVU5FWFBFQ1RFRF9TWU5USEVUSUNfUFJPUEVSVFksXG4gICAgICAgIGBVbmV4cGVjdGVkIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9IGZvdW5kLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQ6XG4gIC0gRWl0aGVyIFxcYEJyb3dzZXJBbmltYXRpb25zTW9kdWxlXFxgIG9yIFxcYE5vb3BBbmltYXRpb25zTW9kdWxlXFxgIGFyZSBpbXBvcnRlZCBpbiB5b3VyIGFwcGxpY2F0aW9uLlxuICAtIFRoZXJlIGlzIGNvcnJlc3BvbmRpbmcgY29uZmlndXJhdGlvbiBmb3IgdGhlIGFuaW1hdGlvbiBuYW1lZCBcXGAke1xuICAgICAgICAgICAgbmFtZX1cXGAgZGVmaW5lZCBpbiB0aGUgXFxgYW5pbWF0aW9uc1xcYCBmaWVsZCBvZiB0aGUgXFxgQENvbXBvbmVudFxcYCBkZWNvcmF0b3IgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvQ29tcG9uZW50I2FuaW1hdGlvbnMpLmApO1xuICB9XG59XG5cblxuZnVuY3Rpb24gaXNUZW1wbGF0ZU5vZGUobm9kZTogYW55KTogbm9kZSBpcyBIVE1MVGVtcGxhdGVFbGVtZW50IHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJyAmJiBub2RlLmNvbnRlbnQgIT09IHVuZGVmaW5lZDtcbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgaG9zdEVsOiBhbnksXG4gICAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgICBkb2M6IERvY3VtZW50LFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBub25jZTogc3RyaW5nfG51bGwsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcblxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gc2hpbVN0eWxlc0NvbnRlbnQoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzKTtcblxuICAgIGZvciAoY29uc3Qgc3R5bGUgb2Ygc3R5bGVzKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgICAgIH1cblxuICAgICAgc3R5bGVFbC50ZXh0Q29udGVudCA9IHN0eWxlO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7XG4gIH1cblxuICBvdmVycmlkZSBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hcHBlbmRDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRCZWZvcmUodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG9sZENoaWxkKTtcbiAgfVxuICBvdmVycmlkZSBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU9yU2hhZG93Um9vdChzdXBlci5wYXJlbnROb2RlKHRoaXMubm9kZU9yU2hhZG93Um9vdChub2RlKSkpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZGVzdHJveSgpIHtcbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpO1xuICB9XG59XG5cbmNsYXNzIE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdHlsZXM6IHN0cmluZ1tdO1xuICBwcml2YXRlIHJlbmRlcmVyVXNhZ2VDb3VudCA9IDA7XG4gIG9uRGVzdHJveTogVm9pZEZ1bmN0aW9ufHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyLFxuICAgICAgcHJpdmF0ZSByZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95OiBib29sZWFuLFxuICAgICAgZG9jOiBEb2N1bWVudCxcbiAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbixcbiAgICAgIGNvbXBJZD86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyLCBkb2MsIG5nWm9uZSwgcGxhdGZvcm1Jc1NlcnZlcik7XG4gICAgdGhpcy5zdHlsZXMgPSBjb21wSWQgPyBzaGltU3R5bGVzQ29udGVudChjb21wSWQsIGNvbXBvbmVudC5zdHlsZXMpIDogY29tcG9uZW50LnN0eWxlcztcbiAgfVxuXG4gIGFwcGx5U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXModGhpcy5zdHlsZXMpO1xuICAgIHRoaXMucmVuZGVyZXJVc2FnZUNvdW50Kys7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZW1vdmVTdHlsZXNPbkNvbXBEZXN0cm95KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LnJlbW92ZVN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gICAgdGhpcy5yZW5kZXJlclVzYWdlQ291bnQtLTtcbiAgICBpZiAodGhpcy5yZW5kZXJlclVzYWdlQ291bnQgPT09IDApIHtcbiAgICAgIHRoaXMub25EZXN0cm95Py4oKTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyIGV4dGVuZHMgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIGFwcElkOiBzdHJpbmcsIHJlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sIGRvYzogRG9jdW1lbnQsIG5nWm9uZTogTmdab25lLFxuICAgICAgcGxhdGZvcm1Jc1NlcnZlcjogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbXBJZCA9IGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkO1xuICAgIHN1cGVyKFxuICAgICAgICBldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIGNvbXBvbmVudCwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdHJveSwgZG9jLCBuZ1pvbmUsXG4gICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIsIGNvbXBJZCk7XG4gICAgdGhpcy5jb250ZW50QXR0ciA9IHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBJZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpO1xuICB9XG5cbiAgb3ZlcnJpZGUgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG4iXX0=