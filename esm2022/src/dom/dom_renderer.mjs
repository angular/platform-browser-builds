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
 * of destroyed components should be disabled.
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
    return styles.map(s => s.replace(COMPONENT_REGEX, compId));
}
export class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId, disableStylesOnCompDestroy, doc, platformId, ngZone, nonce = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.disableStylesOnCompDestroy = disableStylesOnCompDestroy;
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
            const disableStylesOnCompDestroy = this.disableStylesOnCompDestroy;
            const platformIsServer = this.platformIsServer;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, disableStylesOnCompDestroy, doc, ngZone, platformIsServer);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, disableStylesOnCompDestroy, doc, ngZone, platformIsServer);
                    break;
            }
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: DomRendererFactory2 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.7+sha-229331e", ngImport: i0, type: DomRendererFactory2, decorators: [{
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
        (typeof ngDevMode === 'undefined' || ngDevMode) && this.throwOnSyntheticProps &&
            checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback) {
        (typeof ngDevMode === 'undefined' || ngDevMode) && this.throwOnSyntheticProps &&
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
    constructor(eventManager, sharedStylesHost, component, disableStylesOnCompDestroy, doc, ngZone, platformIsServer) {
        super(eventManager, doc, ngZone, platformIsServer);
        this.sharedStylesHost = sharedStylesHost;
        this.disableStylesOnCompDestroy = disableStylesOnCompDestroy;
        this.styles = component.styles;
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
        if (this.disableStylesOnCompDestroy) {
            this.sharedStylesHost.disableStyles(this.styles);
        }
    }
}
class EmulatedEncapsulationDomRenderer2 extends NoneEncapsulationDomRenderer {
    constructor(eventManager, sharedStylesHost, component, appId, disableStylesOnCompDestroy, doc, ngZone, platformIsServer) {
        super(eventManager, sharedStylesHost, component, disableStylesOnCompDestroy, doc, ngZone, platformIsServer);
        const compId = appId + '-' + component.id;
        this.styles = shimStylesContent(compId, component.styles);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWEsV0FBVyxFQUErQixtQkFBbUIsRUFBaUIsaUJBQWlCLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl2TyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFdEQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeEMsTUFBTSxFQUFFLGdDQUFnQztDQUN6QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLDBDQUEwQyxHQUFHLElBQUksQ0FBQztBQUV4RDs7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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1TZXJ2ZXIsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QVBQX0lELCBDU1BfTk9OQ0UsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbiwgybVSdW50aW1lRXJyb3IgYXMgUnVudGltZUVycm9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSAnLi9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge1NoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9VUklTOiB7W25zOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgJ3hodG1sJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAneGxpbmsnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICd4bWwnOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcbiAgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyxcbiAgJ21hdGgnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoTUwvJyxcbn07XG5cbmNvbnN0IENPTVBPTkVOVF9SRUdFWCA9IC8lQ09NUCUvZztcblxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZYCBESSB0b2tlbi5cbiAqL1xuY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxUID0gdHJ1ZTtcblxuLyoqXG4gKiBBIFtESSB0b2tlbl0oZ3VpZGUvZ2xvc3NhcnkjZGktdG9rZW4gXCJESSB0b2tlbiBkZWZpbml0aW9uXCIpIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgc3R5bGVzXG4gKiBvZiBkZXN0cm95ZWQgY29tcG9uZW50cyBzaG91bGQgYmUgZGlzYWJsZWQuXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHZhbHVlIGlzIHNldCB0byBgdHJ1ZWAuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4obmdEZXZNb2RlID8gJ1JlbW92ZVN0eWxlc09uQ29tcERlc3Ryb3knIDogJycsIHtcbiAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgIGZhY3Rvcnk6ICgpID0+IFJFTU9WRV9TVFlMRVNfT05fQ09NUE9ORU5UX0RFU1RST1lfREVGQVVMVCxcbiAgICB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBDT05URU5UX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIEhPU1RfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltU3R5bGVzQ29udGVudChjb21wSWQ6IHN0cmluZywgc3R5bGVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIHN0eWxlcy5tYXAocyA9PiBzLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wSWQpKTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlcmVyQnlDb21wSWQgPVxuICAgICAgbmV3IE1hcDxzdHJpbmcsIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMnxOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgQEluamVjdChBUFBfSUQpIHByaXZhdGUgcmVhZG9ubHkgYXBwSWQ6IHN0cmluZyxcbiAgICAgIEBJbmplY3QoUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSkgcHJpdmF0ZSBkaXNhYmxlU3R5bGVzT25Db21wRGVzdHJveTogYm9vbGVhbixcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgcmVhZG9ubHkgZG9jOiBEb2N1bWVudCxcbiAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHJlYWRvbmx5IHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICAgIHJlYWRvbmx5IG5nWm9uZTogTmdab25lLFxuICAgICAgQEluamVjdChDU1BfTk9OQ0UpIHByaXZhdGUgcmVhZG9ubHkgbm9uY2U6IHN0cmluZ3xudWxsID0gbnVsbCxcbiAgKSB7XG4gICAgdGhpcy5wbGF0Zm9ybUlzU2VydmVyID0gaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKTtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9XG4gICAgICAgIG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHRoaXMucGxhdGZvcm1Jc1NlcnZlcik7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxhdGZvcm1Jc1NlcnZlciAmJiB0eXBlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSkge1xuICAgICAgLy8gRG9taW5vIGRvZXMgbm90IHN1cHBvcnQgc2hhZG93IERPTS5cbiAgICAgIHR5cGUgPSB7Li4udHlwZSwgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWR9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQsIHR5cGUpO1xuICAgIC8vIFJlbmRlcmVycyBoYXZlIGRpZmZlcmVudCBsb2dpYyBkdWUgdG8gZGlmZmVyZW50IGVuY2Fwc3VsYXRpb24gYmVoYXZpb3Vycy5cbiAgICAvLyBFeDogZm9yIGVtdWxhdGVkLCBhbiBhdHRyaWJ1dGUgaXMgYWRkZWQgdG8gdGhlIGVsZW1lbnQuXG4gICAgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKSB7XG4gICAgICByZW5kZXJlci5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHJlbmRlcmVyIGluc3RhbmNlb2YgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuYXBwbHlTdHlsZXMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICBwcml2YXRlIGdldE9yQ3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyKTogUmVuZGVyZXIyIHtcbiAgICBjb25zdCByZW5kZXJlckJ5Q29tcElkID0gdGhpcy5yZW5kZXJlckJ5Q29tcElkO1xuICAgIGxldCByZW5kZXJlciA9IHJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuXG4gICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgY29uc3QgZG9jID0gdGhpcy5kb2M7XG4gICAgICBjb25zdCBuZ1pvbmUgPSB0aGlzLm5nWm9uZTtcbiAgICAgIGNvbnN0IGV2ZW50TWFuYWdlciA9IHRoaXMuZXZlbnRNYW5hZ2VyO1xuICAgICAgY29uc3Qgc2hhcmVkU3R5bGVzSG9zdCA9IHRoaXMuc2hhcmVkU3R5bGVzSG9zdDtcbiAgICAgIGNvbnN0IGRpc2FibGVTdHlsZXNPbkNvbXBEZXN0cm95ID0gdGhpcy5kaXNhYmxlU3R5bGVzT25Db21wRGVzdHJveTtcbiAgICAgIGNvbnN0IHBsYXRmb3JtSXNTZXJ2ZXIgPSB0aGlzLnBsYXRmb3JtSXNTZXJ2ZXI7XG5cbiAgICAgIHN3aXRjaCAodHlwZS5lbmNhcHN1bGF0aW9uKSB7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ6XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKFxuICAgICAgICAgICAgICBldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIHR5cGUsIHRoaXMuYXBwSWQsIGRpc2FibGVTdHlsZXNPbkNvbXBEZXN0cm95LCBkb2MsXG4gICAgICAgICAgICAgIG5nWm9uZSwgcGxhdGZvcm1Jc1NlcnZlcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSwgZG9jLCBuZ1pvbmUsIHRoaXMubm9uY2UsXG4gICAgICAgICAgICAgIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSwgZGlzYWJsZVN0eWxlc09uQ29tcERlc3Ryb3ksIGRvYywgbmdab25lLFxuICAgICAgICAgICAgICBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5jbGVhcigpO1xuICB9XG59XG5cbmNsYXNzIERlZmF1bHREb21SZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgdGhpcyByZW5kZXJlciB0aHJvd3Mgd2hlbiBlbmNvdW50ZXJpbmcgc3ludGhldGljIHByb3BlcnRpZXNcbiAgICogVGhpcyBjYW4gYmUgZGlzYWJsZWQgZm9yIGV4YW1wbGUgYnkgdGhlIEFzeW5jQW5pbWF0aW9uUmVuZGVyZXJGYWN0b3J5XG4gICAqL1xuICB0aHJvd09uU3ludGhldGljUHJvcHMgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSByZWFkb25seSBkb2M6IERvY3VtZW50LFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlID0gbnVsbDtcblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogYW55IHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAvLyBUT0RPOiBgfHwgbmFtZXNwYWNlYCB3YXMgYWRkZWQgaW5cbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvY29tbWl0LzJiOWNjODUwM2Q0ODE3MzQ5MmMyOWY1YTI3MWI2MTEyNjEwNGZiZGIgdG9cbiAgICAgIC8vIHN1cHBvcnQgaG93IEl2eSBwYXNzZWQgYXJvdW5kIHRoZSBuYW1lc3BhY2UgVVJJIHJhdGhlciB0aGFuIHNob3J0IG5hbWUgYXQgdGhlIHRpbWUuIEl0IGRpZFxuICAgICAgLy8gbm90LCBob3dldmVyIGV4dGVuZCB0aGUgc3VwcG9ydCB0byBvdGhlciBwYXJ0cyBvZiB0aGUgc3lzdGVtIChzZXRBdHRyaWJ1dGUsIHNldEF0dHJpYnV0ZSxcbiAgICAgIC8vIGFuZCB0aGUgU2VydmVyUmVuZGVyZXIpLiBXZSBzaG91bGQgZGVjaWRlIHdoYXQgZXhhY3RseSB0aGUgc2VtYW50aWNzIGZvciBkZWFsaW5nIHdpdGhcbiAgICAgIC8vIG5hbWVzcGFjZXMgc2hvdWxkIGJlIGFuZCBtYWtlIGl0IGNvbnNpc3RlbnQuXG4gICAgICAvLyBSZWxhdGVkIGlzc3VlczpcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ0MDI4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDg4M1xuICAgICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnROUyhOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdIHx8IG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmRvYy5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgIHRhcmdldFBhcmVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRQYXJlbnQgPSBpc1RlbXBsYXRlTm9kZShwYXJlbnQpID8gcGFyZW50LmNvbnRlbnQgOiBwYXJlbnQ7XG4gICAgICB0YXJnZXRQYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgZWw6IGFueSA9IHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycgPyB0aGlzLmRvYy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JPck5vZGU7XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlJPT1RfTk9ERV9OT1RfRk9VTkQsXG4gICAgICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiZcbiAgICAgICAgICAgICAgYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgKFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UgfCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KHN0eWxlLCB2YWx1ZSwgZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIC8vIHJlbW92ZVByb3BlcnR5IGhhcyBubyBlZmZlY3Qgd2hlbiB1c2VkIG9uIGNhbWVsQ2FzZWQgcHJvcGVydGllcy5cbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgJiYgdGhpcy50aHJvd09uU3ludGhldGljUHJvcHMgJiZcbiAgICAgICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiB0aGlzLnRocm93T25TeW50aGV0aWNQcm9wcyAmJlxuICAgICAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0YXJnZXQgPSBnZXRET00oKS5nZXRHbG9iYWxFdmVudFRhcmdldCh0aGlzLmRvYywgdGFyZ2V0KTtcbiAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZXZlbnQgdGFyZ2V0ICR7dGFyZ2V0fSBmb3IgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgIHRhcmdldCwgZXZlbnQsIHRoaXMuZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzIFZvaWRGdW5jdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIC8vIGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAgbmVlZHMgdG8ga25vdyBpZiB0aGUgbGlzdGVuZXIgd2FzIGNyZWF0ZWQgd2l0aFxuICAgIC8vIGRlY29yYXRlUHJldmVudERlZmF1bHQgb3IgaXMgYSBsaXN0ZW5lciBhZGRlZCBvdXRzaWRlIHRoZSBBbmd1bGFyIGNvbnRleHQgc28gaXQgY2FuIGhhbmRsZVxuICAgIC8vIHRoZSB0d28gZGlmZmVyZW50bHkuIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgc3BlY2lhbCAnX19uZ1Vud3JhcF9fJyB0b2tlbiBpcyBwYXNzZWQgdG8gdGhlXG4gICAgLy8gdW53cmFwIHRoZSBsaXN0ZW5lciAoc2VlIGJlbG93KS5cbiAgICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIC8vIEl2eSB1c2VzICdfX25nVW53cmFwX18nIGFzIGEgc3BlY2lhbCB0b2tlbiB0aGF0IGFsbG93cyB1cyB0byB1bndyYXAgdGhlIGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IGl0IGNhbiBiZSBpbnZva2VkIHByb2dyYW1tYXRpY2FsbHkgYnkgYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYC4gVGhlXG4gICAgICAvLyBkZWJ1Z19ub2RlIGNhbiBpbnNwZWN0IHRoZSBsaXN0ZW5lciB0b1N0cmluZyBjb250ZW50cyBmb3IgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzIHNwZWNpYWxcbiAgICAgIC8vIHRva2VuLiBCZWNhdXNlIHRoZSB0b2tlbiBpcyBhIHN0cmluZyBsaXRlcmFsLCBpdCBpcyBlbnN1cmVkIHRvIG5vdCBiZSBtb2RpZmllZCBieSBjb21waWxlZFxuICAgICAgLy8gY29kZS5cbiAgICAgIGlmIChldmVudCA9PT0gJ19fbmdVbndyYXBfXycpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlcjtcbiAgICAgIH1cblxuICAgICAgLy8gUnVuIHRoZSBldmVudCBoYW5kbGVyIGluc2lkZSB0aGUgbmdab25lIGJlY2F1c2UgZXZlbnQgaGFuZGxlcnMgYXJlIG5vdCBwYXRjaGVkXG4gICAgICAvLyBieSBab25lIG9uIHRoZSBzZXJ2ZXIuIFRoaXMgaXMgcmVxdWlyZWQgb25seSBmb3IgdGVzdHMuXG4gICAgICBjb25zdCBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IHRoaXMucGxhdGZvcm1Jc1NlcnZlciA/XG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiBldmVudEhhbmRsZXIoZXZlbnQpKSA6XG4gICAgICAgICAgZXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gKCgpID0+ICdAJy5jaGFyQ29kZUF0KDApKSgpO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgUnVudGltZUVycm9yQ29kZS5VTkVYUEVDVEVEX1NZTlRIRVRJQ19QUk9QRVJUWSxcbiAgICAgICAgYFVuZXhwZWN0ZWQgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0gZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdDpcbiAgLSBFaXRoZXIgXFxgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcXGAgb3IgXFxgTm9vcEFuaW1hdGlvbnNNb2R1bGVcXGAgYXJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24uXG4gIC0gVGhlcmUgaXMgY29ycmVzcG9uZGluZyBjb25maWd1cmF0aW9uIGZvciB0aGUgYW5pbWF0aW9uIG5hbWVkIFxcYCR7XG4gICAgICAgICAgICBuYW1lfVxcYCBkZWZpbmVkIGluIHRoZSBcXGBhbmltYXRpb25zXFxgIGZpZWxkIG9mIHRoZSBcXGBAQ29tcG9uZW50XFxgIGRlY29yYXRvciAoc2VlIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvY29yZS9Db21wb25lbnQjYW5pbWF0aW9ucykuYCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBpc1RlbXBsYXRlTm9kZShub2RlOiBhbnkpOiBub2RlIGlzIEhUTUxUZW1wbGF0ZUVsZW1lbnQge1xuICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVNUExBVEUnICYmIG5vZGUuY29udGVudCAhPT0gdW5kZWZpbmVkO1xufVxuXG5jbGFzcyBTaGFkb3dEb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHNoYWRvd1Jvb3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBTaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSxcbiAgICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIGRvYzogRG9jdW1lbnQsXG4gICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIG5vbmNlOiBzdHJpbmd8bnVsbCxcbiAgICAgIHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW4sXG4gICkge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlciwgZG9jLCBuZ1pvbmUsIHBsYXRmb3JtSXNTZXJ2ZXIpO1xuICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBzaGltU3R5bGVzQ29udGVudChjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMpO1xuXG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBzdHlsZXMpIHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgfVxuXG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IHRoaXMuaG9zdEVsID8gdGhpcy5zaGFkb3dSb290IDogbm9kZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICBvdmVycmlkZSByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgb2xkQ2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cbn1cblxuY2xhc3MgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcm90ZWN0ZWQgc3R5bGVzOiBzdHJpbmdbXTtcbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgc2hhcmVkU3R5bGVzSG9zdDogU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIHByaXZhdGUgZGlzYWJsZVN0eWxlc09uQ29tcERlc3Ryb3k6IGJvb2xlYW4sXG4gICAgICBkb2M6IERvY3VtZW50LFxuICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwbGF0Zm9ybUlzU2VydmVyOiBib29sZWFuLFxuICApIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIsIGRvYywgbmdab25lLCBwbGF0Zm9ybUlzU2VydmVyKTtcbiAgICB0aGlzLnN0eWxlcyA9IGNvbXBvbmVudC5zdHlsZXM7XG4gIH1cblxuICBhcHBseVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZVN0eWxlc09uQ29tcERlc3Ryb3kpIHtcbiAgICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5kaXNhYmxlU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyIGV4dGVuZHMgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3Q6IFNoYXJlZFN0eWxlc0hvc3QsIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMixcbiAgICAgIGFwcElkOiBzdHJpbmcsIGRpc2FibGVTdHlsZXNPbkNvbXBEZXN0cm95OiBib29sZWFuLCBkb2M6IERvY3VtZW50LCBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgIHBsYXRmb3JtSXNTZXJ2ZXI6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihcbiAgICAgICAgZXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0LCBjb21wb25lbnQsIGRpc2FibGVTdHlsZXNPbkNvbXBEZXN0cm95LCBkb2MsIG5nWm9uZSxcbiAgICAgICAgcGxhdGZvcm1Jc1NlcnZlcik7XG5cbiAgICBjb25zdCBjb21wSWQgPSBhcHBJZCArICctJyArIGNvbXBvbmVudC5pZDtcbiAgICB0aGlzLnN0eWxlcyA9IHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZCwgY29tcG9uZW50LnN0eWxlcyk7XG4gICAgdGhpcy5jb250ZW50QXR0ciA9IHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBJZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBJZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpO1xuICB9XG5cbiAgb3ZlcnJpZGUgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG4iXX0=