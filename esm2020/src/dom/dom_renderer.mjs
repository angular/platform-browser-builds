/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Inject, Injectable, InjectionToken, RendererStyleFlags2, ViewEncapsulation } from '@angular/core';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
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
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
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
function decoratePreventDefault(eventHandler) {
    // `DebugNode.triggerEventHandler` needs to know if the listener was created with
    // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
    // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
    // the listener (see below).
    return (event) => {
        // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
        // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
        // can inspect the listener toString contents for the existence of this special token. Because
        // the token is a string literal, it is ensured to not be modified by compiled code.
        if (event === '__ngUnwrap__') {
            return eventHandler;
        }
        const allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
        return undefined;
    };
}
export class DomRendererFactory2 {
    constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestory) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestory = removeStylesOnCompDestory;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRenderer2(eventManager);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
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
            const eventManager = this.eventManager;
            const sharedStylesHost = this.sharedStylesHost;
            const removeStylesOnCompDestory = this.removeStylesOnCompDestory;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestory);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestory);
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
    begin() { }
    end() { }
}
DomRendererFactory2.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-637102d", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.DomSharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }], target: i0.ɵɵFactoryTarget.Injectable });
DomRendererFactory2.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-637102d", ngImport: i0, type: DomRendererFactory2 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.0+sha-637102d", ngImport: i0, type: DomRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.EventManager }, { type: i2.DomSharedStylesHost }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
                }] }]; } });
class DefaultDomRenderer2 {
    constructor(eventManager) {
        this.eventManager = eventManager;
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
            return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return document.createElement(name);
    }
    createComment(value) {
        return document.createComment(value);
    }
    createText(value) {
        return document.createTextNode(value);
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
        let el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
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
            el.style.removeProperty(style);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            el.style[style] = '';
        }
    }
    setProperty(el, name, value) {
        NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback) {
        NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
    }
}
const AT_CHARCODE = (() => '@'.charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === 'TEMPLATE' && node.content !== undefined;
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, hostEl, component) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = shimStylesContent(component.id, component.styles);
        for (const style of styles) {
            const styleEl = document.createElement('style');
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
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestory, compId = component.id) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestory = removeStylesOnCompDestory;
        this.rendererUsageCount = 0;
        this.styles = shimStylesContent(compId, component.styles);
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
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestory) {
        const compId = appId + '-' + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestory, compId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUEwQyxtQkFBbUIsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEssT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRXpELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0lBQ3hDLE1BQU0sRUFBRSxnQ0FBZ0M7Q0FDekMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUNsQyxNQUFNLFdBQVcsR0FBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUVwRSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsa0JBQWtCLEVBQUUsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsY0FBYyxrQkFBa0IsRUFBRSxDQUFDO0FBRS9EOztHQUVHO0FBQ0gsTUFBTSwwQ0FBMEMsR0FBRyxLQUFLLENBQUM7QUFFekQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0NBQWtDLEdBQzNDLElBQUksY0FBYyxDQUFVLDJC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QUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRVEsYUFBYSxDQUFDLE1BQVcsRUFBRSxJQUFZO1FBQzlDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSUQsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9uRGVzdHJveSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX1VSSVM6IHtbbnM6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdzdmcnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAneGh0bWwnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gICd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgJ3htbCc6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICAneG1sbnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLFxuICAnbWF0aCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGhNTC8nLFxufTtcblxuY29uc3QgQ09NUE9ORU5UX1JFR0VYID0gLyVDT01QJS9nO1xuY29uc3QgTkdfREVWX01PREUgPSB0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCAhIW5nRGV2TW9kZTtcblxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGBSRU1PVkVfU1RZTEVTX09OX0NPTVBPTkVOVF9ERVNUUk9ZYCBESSB0b2tlbi5cbiAqL1xuY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxUID0gZmFsc2U7XG5cbi8qKlxuICogQSBbREkgdG9rZW5dKGd1aWRlL2dsb3NzYXJ5I2RpLXRva2VuIFwiREkgdG9rZW4gZGVmaW5pdGlvblwiKSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHN0eWxlc1xuICogb2YgZGVzdHJveWVkIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBET00uXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHZhbHVlIGlzIHNldCB0byBgZmFsc2VgLiBUaGlzIHdpbGwgYmUgY2hhbmdlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdSZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5Jywge1xuICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgZmFjdG9yeTogKCkgPT4gUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWV9ERUZBVUxULFxuICAgIH0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1TdHlsZXNDb250ZW50KGNvbXBJZDogc3RyaW5nLCBzdHlsZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICByZXR1cm4gc3R5bGVzLm1hcChzID0+IHMucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBJZCkpO1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gIC8vIGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAgbmVlZHMgdG8ga25vdyBpZiB0aGUgbGlzdGVuZXIgd2FzIGNyZWF0ZWQgd2l0aFxuICAvLyBkZWNvcmF0ZVByZXZlbnREZWZhdWx0IG9yIGlzIGEgbGlzdGVuZXIgYWRkZWQgb3V0c2lkZSB0aGUgQW5ndWxhciBjb250ZXh0IHNvIGl0IGNhbiBoYW5kbGUgdGhlXG4gIC8vIHR3byBkaWZmZXJlbnRseS4gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBzcGVjaWFsICdfX25nVW53cmFwX18nIHRva2VuIGlzIHBhc3NlZCB0byB0aGUgdW53cmFwXG4gIC8vIHRoZSBsaXN0ZW5lciAoc2VlIGJlbG93KS5cbiAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgLy8gSXZ5IHVzZXMgJ19fbmdVbndyYXBfXycgYXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgYWxsb3dzIHVzIHRvIHVud3JhcCB0aGUgZnVuY3Rpb25cbiAgICAvLyBzbyB0aGF0IGl0IGNhbiBiZSBpbnZva2VkIHByb2dyYW1tYXRpY2FsbHkgYnkgYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYC4gVGhlIGRlYnVnX25vZGVcbiAgICAvLyBjYW4gaW5zcGVjdCB0aGUgbGlzdGVuZXIgdG9TdHJpbmcgY29udGVudHMgZm9yIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBzcGVjaWFsIHRva2VuLiBCZWNhdXNlXG4gICAgLy8gdGhlIHRva2VuIGlzIGEgc3RyaW5nIGxpdGVyYWwsIGl0IGlzIGVuc3VyZWQgdG8gbm90IGJlIG1vZGlmaWVkIGJ5IGNvbXBpbGVkIGNvZGUuXG4gICAgaWYgKGV2ZW50ID09PSAnX19uZ1Vud3JhcF9fJykge1xuICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlcjtcbiAgICB9XG5cbiAgICBjb25zdCBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHByZXZlbnREZWZhdWx0IGludG8gZXZlbnQgcGx1Z2lucy4uLlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlbmRlcmVyQnlDb21wSWQgPVxuICAgICAgbmV3IE1hcDxzdHJpbmcsIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMnxOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyPigpO1xuICBwcml2YXRlIGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgQEluamVjdChBUFBfSUQpIHByaXZhdGUgYXBwSWQ6IHN0cmluZyxcbiAgICAgIEBJbmplY3QoUkVNT1ZFX1NUWUxFU19PTl9DT01QT05FTlRfREVTVFJPWSkgcHJpdmF0ZSByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5OiBib29sZWFuKSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRPckNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQsIHR5cGUpO1xuXG4gICAgLy8gUmVuZGVyZXJzIGhhdmUgZGlmZmVyZW50IGxvZ2ljIGR1ZSB0byBkaWZmZXJlbnQgZW5jYXBzdWxhdGlvbiBiZWhhdmlvdXJzLlxuICAgIC8vIEV4OiBmb3IgZW11bGF0ZWQsIGFuIGF0dHJpYnV0ZSBpcyBhZGRlZCB0byB0aGUgZWxlbWVudC5cbiAgICBpZiAocmVuZGVyZXIgaW5zdGFuY2VvZiBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIpIHtcbiAgICAgIHJlbmRlcmVyLmFwcGx5VG9Ib3N0KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAocmVuZGVyZXIgaW5zdGFuY2VvZiBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5hcHBseVN0eWxlcygpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JDcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTIpOiBSZW5kZXJlcjIge1xuICAgIGNvbnN0IHJlbmRlcmVyQnlDb21wSWQgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQ7XG4gICAgbGV0IHJlbmRlcmVyID0gcmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG5cbiAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICBjb25zdCBldmVudE1hbmFnZXIgPSB0aGlzLmV2ZW50TWFuYWdlcjtcbiAgICAgIGNvbnN0IHNoYXJlZFN0eWxlc0hvc3QgPSB0aGlzLnNoYXJlZFN0eWxlc0hvc3Q7XG4gICAgICBjb25zdCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5ID0gdGhpcy5yZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5O1xuXG4gICAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMihcbiAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkLCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgICAgcmV0dXJuIG5ldyBTaGFkb3dEb21SZW5kZXJlcihldmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3QsIGVsZW1lbnQsIHR5cGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJlbmRlcmVyID0gbmV3IE5vbmVFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIoXG4gICAgICAgICAgICAgIGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSwgcmVtb3ZlU3R5bGVzT25Db21wRGVzdG9yeSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlbmRlcmVyLm9uRGVzdHJveSA9ICgpID0+IHJlbmRlcmVyQnlDb21wSWQuZGVsZXRlKHR5cGUuaWQpO1xuICAgICAgcmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5jbGVhcigpO1xuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxufVxuXG5jbGFzcyBEZWZhdWx0RG9tUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGUgPSBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIFRPRE86IGB8fCBuYW1lc3BhY2VgIHdhcyBhZGRlZCBpblxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9jb21taXQvMmI5Y2M4NTAzZDQ4MTczNDkyYzI5ZjVhMjcxYjYxMTI2MTA0ZmJkYiB0b1xuICAgICAgLy8gc3VwcG9ydCBob3cgSXZ5IHBhc3NlZCBhcm91bmQgdGhlIG5hbWVzcGFjZSBVUkkgcmF0aGVyIHRoYW4gc2hvcnQgbmFtZSBhdCB0aGUgdGltZS4gSXQgZGlkXG4gICAgICAvLyBub3QsIGhvd2V2ZXIgZXh0ZW5kIHRoZSBzdXBwb3J0IHRvIG90aGVyIHBhcnRzIG9mIHRoZSBzeXN0ZW0gKHNldEF0dHJpYnV0ZSwgc2V0QXR0cmlidXRlLFxuICAgICAgLy8gYW5kIHRoZSBTZXJ2ZXJSZW5kZXJlcikuIFdlIHNob3VsZCBkZWNpZGUgd2hhdCBleGFjdGx5IHRoZSBzZW1hbnRpY3MgZm9yIGRlYWxpbmcgd2l0aFxuICAgICAgLy8gbmFtZXNwYWNlcyBzaG91bGQgYmUgYW5kIG1ha2UgaXQgY29uc2lzdGVudC5cbiAgICAgIC8vIFJlbGF0ZWQgaXNzdWVzOlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQwMjhcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQ0ODgzXG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0gfHwgbmFtZXNwYWNlLCBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRQYXJlbnQgPSBpc1RlbXBsYXRlTm9kZShwYXJlbnQpID8gcGFyZW50LmNvbnRlbnQgOiBwYXJlbnQ7XG4gICAgdGFyZ2V0UGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICAgIHRhcmdldFBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGxldCBlbDogYW55ID0gdHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPck5vZGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgKFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UgfCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCkpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KHN0eWxlLCB2YWx1ZSwgZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgTkdfREVWX01PREUgJiYgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBOR19ERVZfTU9ERSAmJiBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzICgpID0+IHZvaWQ7XG4gIH1cbn1cblxuY29uc3QgQVRfQ0hBUkNPREUgPSAoKCkgPT4gJ0AnLmNoYXJDb2RlQXQoMCkpKCk7XG5mdW5jdGlvbiBjaGVja05vU3ludGhldGljUHJvcChuYW1lOiBzdHJpbmcsIG5hbWVLaW5kOiBzdHJpbmcpIHtcbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gQVRfQ0hBUkNPREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgc3ludGhldGljICR7bmFtZUtpbmR9ICR7bmFtZX0gZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdDpcbiAgLSBFaXRoZXIgXFxgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcXGAgb3IgXFxgTm9vcEFuaW1hdGlvbnNNb2R1bGVcXGAgYXJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24uXG4gIC0gVGhlcmUgaXMgY29ycmVzcG9uZGluZyBjb25maWd1cmF0aW9uIGZvciB0aGUgYW5pbWF0aW9uIG5hbWVkIFxcYCR7XG4gICAgICAgIG5hbWV9XFxgIGRlZmluZWQgaW4gdGhlIFxcYGFuaW1hdGlvbnNcXGAgZmllbGQgb2YgdGhlIFxcYEBDb21wb25lbnRcXGAgZGVjb3JhdG9yIChzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb3JlL0NvbXBvbmVudCNhbmltYXRpb25zKS5gKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVOb2RlKG5vZGU6IGFueSk6IG5vZGUgaXMgSFRNTFRlbXBsYXRlRWxlbWVudCB7XG4gIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURU1QTEFURScgJiYgbm9kZS5jb250ZW50ICE9PSB1bmRlZmluZWQ7XG59XG5cbmNsYXNzIFNoYWRvd0RvbVJlbmRlcmVyIGV4dGVuZHMgRGVmYXVsdERvbVJlbmRlcmVyMiB7XG4gIHByaXZhdGUgc2hhZG93Um9vdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgaG9zdEVsOiBhbnksIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMikge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlcik7XG4gICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkSG9zdCh0aGlzLnNoYWRvd1Jvb3QpO1xuICAgIGNvbnN0IHN0eWxlcyA9IHNoaW1TdHlsZXNDb250ZW50KGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcyk7XG5cbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIHN0eWxlcykge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGU7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IHRoaXMuaG9zdEVsID8gdGhpcy5zaGFkb3dSb290IDogbm9kZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICBvdmVycmlkZSByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgb2xkQ2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cbn1cblxuY2xhc3MgTm9uZUVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0eWxlczogc3RyaW5nW107XG4gIHByaXZhdGUgcmVuZGVyZXJVc2FnZUNvdW50ID0gMDtcbiAgb25EZXN0cm95OiBWb2lkRnVuY3Rpb258dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsXG4gICAgICBwcml2YXRlIHJlbW92ZVN0eWxlc09uQ29tcERlc3Rvcnk6IGJvb2xlYW4sXG4gICAgICBjb21wSWQgPSBjb21wb25lbnQuaWQsXG4gICkge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlcik7XG4gICAgdGhpcy5zdHlsZXMgPSBzaGltU3R5bGVzQ29udGVudChjb21wSWQsIGNvbXBvbmVudC5zdHlsZXMpO1xuICB9XG5cbiAgYXBwbHlTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gICAgdGhpcy5yZW5kZXJlclVzYWdlQ291bnQrKztcbiAgfVxuXG4gIG92ZXJyaWRlIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlbW92ZVN0eWxlc09uQ29tcERlc3RvcnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlU3R5bGVzKHRoaXMuc3R5bGVzKTtcbiAgICB0aGlzLnJlbmRlcmVyVXNhZ2VDb3VudC0tO1xuICAgIGlmICh0aGlzLnJlbmRlcmVyVXNhZ2VDb3VudCA9PT0gMCkge1xuICAgICAgdGhpcy5vbkRlc3Ryb3k/LigpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIgZXh0ZW5kcyBOb25lRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCwgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyLFxuICAgICAgYXBwSWQ6IHN0cmluZywgcmVtb3ZlU3R5bGVzT25Db21wRGVzdG9yeTogYm9vbGVhbikge1xuICAgIGNvbnN0IGNvbXBJZCA9IGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkO1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdCwgY29tcG9uZW50LCByZW1vdmVTdHlsZXNPbkNvbXBEZXN0b3J5LCBjb21wSWQpO1xuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wSWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wSWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5hcHBseVN0eWxlcygpO1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuIl19