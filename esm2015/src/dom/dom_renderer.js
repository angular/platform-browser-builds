/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Inject, Injectable, RendererStyleFlags2, ViewEncapsulation } from '@angular/core';
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
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
export const COMPONENT_VARIABLE = '%COMP%';
export const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
export const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
export function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function flattenStyles(compId, styles, target) {
    for (let i = 0; i < styles.length; i++) {
        let style = styles[i];
        if (Array.isArray(style)) {
            flattenStyles(compId, style, target);
        }
        else {
            style = style.replace(COMPONENT_REGEX, compId);
            target.push(style);
        }
    }
    return target;
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
let DomRendererFactory2 = /** @class */ (() => {
    class DomRendererFactory2 {
        constructor(eventManager, sharedStylesHost, appId) {
            this.eventManager = eventManager;
            this.sharedStylesHost = sharedStylesHost;
            this.appId = appId;
            this.rendererByCompId = new Map();
            this.defaultRenderer = new DefaultDomRenderer2(eventManager);
        }
        createRenderer(element, type) {
            if (!element || !type) {
                return this.defaultRenderer;
            }
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated: {
                    let renderer = this.rendererByCompId.get(type.id);
                    if (!renderer) {
                        renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
                        this.rendererByCompId.set(type.id, renderer);
                    }
                    renderer.applyToHost(element);
                    return renderer;
                }
                case ViewEncapsulation.Native:
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
                default: {
                    if (!this.rendererByCompId.has(type.id)) {
                        const styles = flattenStyles(type.id, type.styles, []);
                        this.sharedStylesHost.addStyles(styles);
                        this.rendererByCompId.set(type.id, this.defaultRenderer);
                    }
                    return this.defaultRenderer;
                }
            }
        }
        begin() { }
        end() { }
    }
    DomRendererFactory2.ɵfac = function DomRendererFactory2_Factory(t) { return new (t || DomRendererFactory2)(i0.ɵɵinject(i1.EventManager), i0.ɵɵinject(i2.DomSharedStylesHost), i0.ɵɵinject(APP_ID)); };
    DomRendererFactory2.ɵprov = i0.ɵɵdefineInjectable({ token: DomRendererFactory2, factory: DomRendererFactory2.ɵfac });
    return DomRendererFactory2;
})();
export { DomRendererFactory2 };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DomRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.EventManager }, { type: i2.DomSharedStylesHost }, { type: undefined, decorators: [{
                type: Inject,
                args: [APP_ID]
            }] }]; }, null); })();
class DefaultDomRenderer2 {
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.data = Object.create(null);
    }
    destroy() { }
    createElement(name, namespace) {
        if (namespace) {
            // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
            // will result in undefined, so we just return the namespace here.
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
        parent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
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
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
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
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                // TODO(FW-811): Since ivy is passing around full URIs for namespaces
                // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
                // which is wrong.
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
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.setProperty(style, value, !!(flags & RendererStyleFlags2.Important) ? 'important' : '');
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
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, component, appId) {
        super(eventManager);
        this.component = component;
        const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(appId + '-' + component.id);
        this.hostAttr = shimHostAttribute(appId + '-' + component.id);
    }
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    constructor(eventManager, sharedStylesHost, hostEl, component) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.component = component;
        if (component.encapsulation === ViewEncapsulation.ShadowDom) {
            this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        }
        else {
            this.shadowRoot = hostEl.createShadowRoot();
        }
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = flattenStyles(component.id, component.styles, []);
        for (let i = 0; i < styles.length; i++) {
            const styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            this.shadowRoot.appendChild(styleEl);
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQStCLG1CQUFtQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFekQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7Q0FDekMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUNsQyxNQUFNLFdBQVcsR0FBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUVwRSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsa0JBQWtCLEVBQUUsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsY0FBYyxrQkFBa0IsRUFBRSxDQUFDO0FBRS9ELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxnQkFBd0I7SUFDM0QsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsZ0JBQXdCO0lBQ3hE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Z0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELFdBQVcsQ0FBQyxNQUFXLEVBQUUsUUFBYTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCxVQUFVLENBQUMsSUFBUztRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG59O1xuXG5jb25zdCBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5jb25zdCBOR19ERVZfTU9ERSA9IHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8ICEhbmdEZXZNb2RlO1xuXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5TdHlsZXMoXG4gICAgY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55fGFueVtdPiwgdGFyZ2V0OiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc3R5bGUgPSBzdHlsZXNbaV07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIGZsYXR0ZW5TdHlsZXMoY29tcElkLCBzdHlsZSwgdGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUgPSBzdHlsZS5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKTtcbiAgICAgIHRhcmdldC5wdXNoKHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAvLyBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgIG5lZWRzIHRvIGtub3cgaWYgdGhlIGxpc3RlbmVyIHdhcyBjcmVhdGVkIHdpdGhcbiAgLy8gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdCBvciBpcyBhIGxpc3RlbmVyIGFkZGVkIG91dHNpZGUgdGhlIEFuZ3VsYXIgY29udGV4dCBzbyBpdCBjYW4gaGFuZGxlIHRoZVxuICAvLyB0d28gZGlmZmVyZW50bHkuIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgc3BlY2lhbCAnX19uZ1Vud3JhcF9fJyB0b2tlbiBpcyBwYXNzZWQgdG8gdGhlIHVud3JhcFxuICAvLyB0aGUgbGlzdGVuZXIgKHNlZSBiZWxvdykuXG4gIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vIEl2eSB1c2VzICdfX25nVW53cmFwX18nIGFzIGEgc3BlY2lhbCB0b2tlbiB0aGF0IGFsbG93cyB1cyB0byB1bndyYXAgdGhlIGZ1bmN0aW9uXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuIFRoZSBkZWJ1Z19ub2RlXG4gICAgLy8gY2FuIGluc3BlY3QgdGhlIGxpc3RlbmVyIHRvU3RyaW5nIGNvbnRlbnRzIGZvciB0aGUgZXhpc3RlbmNlIG9mIHRoaXMgc3BlY2lhbCB0b2tlbi4gQmVjYXVzZVxuICAgIC8vIHRoZSB0b2tlbiBpcyBhIHN0cmluZyBsaXRlcmFsLCBpdCBpcyBlbnN1cmVkIHRvIG5vdCBiZSBtb2RpZmllZCBieSBjb21waWxlZCBjb2RlLlxuICAgIGlmIChldmVudCA9PT0gJ19fbmdVbndyYXBfXycpIHtcbiAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSBldmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIFRPRE8odGJvc2NoKTogbW92ZSBwcmV2ZW50RGVmYXVsdCBpbnRvIGV2ZW50IHBsdWdpbnMuLi5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSBhcHBJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKFxuICAgICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICAoPEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMj5yZW5kZXJlcikuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlOlxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIodGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlOiBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIEluIGNhc2VzIHdoZXJlIEl2eSAobm90IFZpZXdFbmdpbmUpIGlzIGdpdmluZyB1cyB0aGUgYWN0dWFsIG5hbWVzcGFjZSwgdGhlIGxvb2sgdXAgYnkga2V5XG4gICAgICAvLyB3aWxsIHJlc3VsdCBpbiB1bmRlZmluZWQsIHNvIHdlIGp1c3QgcmV0dXJuIHRoZSBuYW1lc3BhY2UgaGVyZS5cbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgZWw6IGFueSA9IHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JPck5vZGU7XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgfVxuICAgIGlmICghcHJlc2VydmVDb250ZW50KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTtcbiAgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7XG4gIH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBuYW1lID0gbmFtZXNwYWNlICsgJzonICsgbmFtZTtcbiAgICAgIC8vIFRPRE8oRlctODExKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAvLyBUT0RPKEZXLTgxMSk6IEl2eSBtYXkgY2F1c2UgaXNzdWVzIGhlcmUgYmVjYXVzZSBpdCdzIHBhc3NpbmcgYXJvdW5kXG4gICAgICAvLyBmdWxsIFVSSXMgZm9yIG5hbWVzcGFjZXMsIHRoZXJlZm9yZSB0aGlzIGxvb2t1cCB3aWxsIGZhaWwuXG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhGVy04MTEpOiBTaW5jZSBpdnkgaXMgcGFzc2luZyBhcm91bmQgZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzXG4gICAgICAgIC8vIHRoaXMgY291bGQgcmVzdWx0IGluIHByb3BlcnRpZXMgbGlrZSBgaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc6Y3g9XCIxMjNcImAsXG4gICAgICAgIC8vIHdoaWNoIGlzIHdyb25nLlxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgc3R5bGUsIHZhbHVlLCAhIShmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KSA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgTkdfREVWX01PREUgJiYgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIG5vZGUubm9kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBOR19ERVZfTU9ERSAmJiBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzICgpID0+IHZvaWQ7XG4gIH1cbn1cblxuY29uc3QgQVRfQ0hBUkNPREUgPSAoKCkgPT4gJ0AnLmNoYXJDb2RlQXQoMCkpKCk7XG5mdW5jdGlvbiBjaGVja05vU3ludGhldGljUHJvcChuYW1lOiBzdHJpbmcsIG5hbWVLaW5kOiBzdHJpbmcpIHtcbiAgaWYgKG5hbWUuY2hhckNvZGVBdCgwKSA9PT0gQVRfQ0hBUkNPREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEZvdW5kIHRoZSBzeW50aGV0aWMgJHtuYW1lS2luZH0gJHtcbiAgICAgICAgbmFtZX0uIFBsZWFzZSBpbmNsdWRlIGVpdGhlciBcIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlXCIgb3IgXCJOb29wQW5pbWF0aW9uc01vZHVsZVwiIGluIHlvdXIgYXBwbGljYXRpb24uYCk7XG4gIH1cbn1cblxuY2xhc3MgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyIGV4dGVuZHMgRGVmYXVsdERvbVJlbmRlcmVyMiB7XG4gIHByaXZhdGUgY29udGVudEF0dHI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3N0QXR0cjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBwcml2YXRlIGNvbXBvbmVudDogUmVuZGVyZXJUeXBlMiwgYXBwSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKGV2ZW50TWFuYWdlcik7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhhcHBJZCArICctJyArIGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIHNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShhcHBJZCArICctJyArIGNvbXBvbmVudC5pZCk7XG4gIH1cblxuICBhcHBseVRvSG9zdChlbGVtZW50OiBhbnkpIHtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG5cbmNsYXNzIFNoYWRvd0RvbVJlbmRlcmVyIGV4dGVuZHMgRGVmYXVsdERvbVJlbmRlcmVyMiB7XG4gIHByaXZhdGUgc2hhZG93Um9vdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgaG9zdEVsOiBhbnksIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyKTtcbiAgICBpZiAoY29tcG9uZW50LmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSkge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgfVxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMsIFtdKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGVzW2ldO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hcHBlbmRDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQpO1xuICB9XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRCZWZvcmUodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gIH1cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG9sZENoaWxkKTtcbiAgfVxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU9yU2hhZG93Um9vdChzdXBlci5wYXJlbnROb2RlKHRoaXMubm9kZU9yU2hhZG93Um9vdChub2RlKSkpO1xuICB9XG59XG4iXX0=