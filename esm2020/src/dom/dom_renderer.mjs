/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
    'math': 'http://www.w3.org/1998/MathML/',
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
export class DomRendererFactory2 {
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
DomRendererFactory2.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-73ad3bb", ngImport: i0, type: DomRendererFactory2, deps: [{ token: i1.EventManager }, { token: i2.DomSharedStylesHost }, { token: APP_ID }], target: i0.ɵɵFactoryTarget.Injectable });
DomRendererFactory2.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-73ad3bb", ngImport: i0, type: DomRendererFactory2 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.0-next.0+sha-73ad3bb", ngImport: i0, type: DomRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.EventManager }, { type: i2.DomSharedStylesHost }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
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
        this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQStCLG1CQUFtQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7QUFFekQsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7SUFDeEMsTUFBTSxFQUFFLGdDQUFnQztDQUN6QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sV0FBVyxHQUFHLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRSxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7QUFFL0QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGdCQUF3QjtJQUMzRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxp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SSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDUSxZQUFZLENBQUMsTUFBVyxFQUFFLFFBQWEsRUFBRSxRQUFhO1FBQzdELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDUSxXQUFXLENBQUMsTUFBVyxFQUFFLFFBQWE7UUFDN0MsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ1EsVUFBVSxDQUFDLElBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FQUF9JRCwgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG4gICdtYXRoJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aE1MLycsXG59O1xuXG5jb25zdCBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5jb25zdCBOR19ERVZfTU9ERSA9IHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8ICEhbmdEZXZNb2RlO1xuXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5TdHlsZXMoXG4gICAgY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55fGFueVtdPiwgdGFyZ2V0OiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc3R5bGUgPSBzdHlsZXNbaV07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIGZsYXR0ZW5TdHlsZXMoY29tcElkLCBzdHlsZSwgdGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUgPSBzdHlsZS5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKTtcbiAgICAgIHRhcmdldC5wdXNoKHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAvLyBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgIG5lZWRzIHRvIGtub3cgaWYgdGhlIGxpc3RlbmVyIHdhcyBjcmVhdGVkIHdpdGhcbiAgLy8gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdCBvciBpcyBhIGxpc3RlbmVyIGFkZGVkIG91dHNpZGUgdGhlIEFuZ3VsYXIgY29udGV4dCBzbyBpdCBjYW4gaGFuZGxlIHRoZVxuICAvLyB0d28gZGlmZmVyZW50bHkuIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgc3BlY2lhbCAnX19uZ1Vud3JhcF9fJyB0b2tlbiBpcyBwYXNzZWQgdG8gdGhlIHVud3JhcFxuICAvLyB0aGUgbGlzdGVuZXIgKHNlZSBiZWxvdykuXG4gIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIC8vIEl2eSB1c2VzICdfX25nVW53cmFwX18nIGFzIGEgc3BlY2lhbCB0b2tlbiB0aGF0IGFsbG93cyB1cyB0byB1bndyYXAgdGhlIGZ1bmN0aW9uXG4gICAgLy8gc28gdGhhdCBpdCBjYW4gYmUgaW52b2tlZCBwcm9ncmFtbWF0aWNhbGx5IGJ5IGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAuIFRoZSBkZWJ1Z19ub2RlXG4gICAgLy8gY2FuIGluc3BlY3QgdGhlIGxpc3RlbmVyIHRvU3RyaW5nIGNvbnRlbnRzIGZvciB0aGUgZXhpc3RlbmNlIG9mIHRoaXMgc3BlY2lhbCB0b2tlbi4gQmVjYXVzZVxuICAgIC8vIHRoZSB0b2tlbiBpcyBhIHN0cmluZyBsaXRlcmFsLCBpdCBpcyBlbnN1cmVkIHRvIG5vdCBiZSBtb2RpZmllZCBieSBjb21waWxlZCBjb2RlLlxuICAgIGlmIChldmVudCA9PT0gJ19fbmdVbndyYXBfXycpIHtcbiAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSBldmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIFRPRE8odGJvc2NoKTogbW92ZSBwcmV2ZW50RGVmYXVsdCBpbnRvIGV2ZW50IHBsdWdpbnMuLi5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSBhcHBJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKFxuICAgICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICAoPEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMj5yZW5kZXJlcikuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICByZXR1cm4gbmV3IFNoYWRvd0RvbVJlbmRlcmVyKHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIGVsZW1lbnQsIHR5cGUpO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZXJCeUNvbXBJZC5oYXModHlwZS5pZCkpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKHR5cGUuaWQsIHR5cGUuc3R5bGVzLCBbXSk7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgdGhpcy5kZWZhdWx0UmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG59XG5cbmNsYXNzIERlZmF1bHREb21SZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcikge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZSA9IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETzogYHx8IG5hbWVzcGFjZWAgd2FzIGFkZGVkIGluXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2NvbW1pdC8yYjljYzg1MDNkNDgxNzM0OTJjMjlmNWEyNzFiNjExMjYxMDRmYmRiIHRvXG4gICAgICAvLyBzdXBwb3J0IGhvdyBJdnkgcGFzc2VkIGFyb3VuZCB0aGUgbmFtZXNwYWNlIFVSSSByYXRoZXIgdGhhbiBzaG9ydCBuYW1lIGF0IHRoZSB0aW1lLiBJdCBkaWRcbiAgICAgIC8vIG5vdCwgaG93ZXZlciBleHRlbmQgdGhlIHN1cHBvcnQgdG8gb3RoZXIgcGFydHMgb2YgdGhlIHN5c3RlbSAoc2V0QXR0cmlidXRlLCBzZXRBdHRyaWJ1dGUsXG4gICAgICAvLyBhbmQgdGhlIFNlcnZlclJlbmRlcmVyKS4gV2Ugc2hvdWxkIGRlY2lkZSB3aGF0IGV4YWN0bHkgdGhlIHNlbWFudGljcyBmb3IgZGVhbGluZyB3aXRoXG4gICAgICAvLyBuYW1lc3BhY2VzIHNob3VsZCBiZSBhbmQgbWFrZSBpdCBjb25zaXN0ZW50LlxuICAgICAgLy8gUmVsYXRlZCBpc3N1ZXM6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy80NDAyOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNDQ4ODNcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2YWx1ZSk7XG4gIH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IGlzVGVtcGxhdGVOb2RlKHBhcmVudCkgPyBwYXJlbnQuY29udGVudCA6IHBhcmVudDtcbiAgICB0YXJnZXRQYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgY29uc3QgdGFyZ2V0UGFyZW50ID0gaXNUZW1wbGF0ZU5vZGUocGFyZW50KSA/IHBhcmVudC5jb250ZW50IDogcGFyZW50O1xuICAgICAgdGFyZ2V0UGFyZW50Lmluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgbGV0IGVsOiBhbnkgPSB0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yTm9kZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yT3JOb2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNlbGVjdG9yIFwiJHtzZWxlY3Rvck9yTm9kZX1cIiBkaWQgbm90IG1hdGNoIGFueSBlbGVtZW50c2ApO1xuICAgIH1cbiAgICBpZiAoIXByZXNlcnZlQ29udGVudCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLnBhcmVudE5vZGU7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xuICB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgbmFtZSA9IG5hbWVzcGFjZSArICc6JyArIG5hbWU7XG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShgJHtuYW1lc3BhY2V9OiR7bmFtZX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiAoUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSB8IFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KSkge1xuICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoc3R5bGUsIHZhbHVlLCBmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBOR19ERVZfTU9ERSAmJiBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbm9kZS5ub2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTpcbiAgICAgICgpID0+IHZvaWQge1xuICAgIE5HX0RFVl9NT0RFICYmIGNoZWNrTm9TeW50aGV0aWNQcm9wKGV2ZW50LCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnQsIGRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMgKCkgPT4gdm9pZDtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICgoKSA9PiAnQCcuY2hhckNvZGVBdCgwKSkoKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBzeW50aGV0aWMgJHtuYW1lS2luZH0gJHtuYW1lfSBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0OlxuICAtIEVpdGhlciBcXGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZVxcYCBvciBcXGBOb29wQW5pbWF0aW9uc01vZHVsZVxcYCBhcmUgaW1wb3J0ZWQgaW4geW91ciBhcHBsaWNhdGlvbi5cbiAgLSBUaGVyZSBpcyBjb3JyZXNwb25kaW5nIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhbmltYXRpb24gbmFtZWQgXFxgJHtcbiAgICAgICAgbmFtZX1cXGAgZGVmaW5lZCBpbiB0aGUgXFxgYW5pbWF0aW9uc1xcYCBmaWVsZCBvZiB0aGUgXFxgQENvbXBvbmVudFxcYCBkZWNvcmF0b3IgKHNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvcmUvQ29tcG9uZW50I2FuaW1hdGlvbnMpLmApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVGVtcGxhdGVOb2RlKG5vZGU6IGFueSk6IG5vZGUgaXMgSFRNTFRlbXBsYXRlRWxlbWVudCB7XG4gIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURU1QTEFURScgJiYgbm9kZS5jb250ZW50ICE9PSB1bmRlZmluZWQ7XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsIGFwcElkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXMoYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMsIFtdKTtcbiAgICBzaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuXG4gICAgdGhpcy5jb250ZW50QXR0ciA9IHNoaW1Db250ZW50QXR0cmlidXRlKGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkKTtcbiAgICB0aGlzLmhvc3RBdHRyID0gc2hpbUhvc3RBdHRyaWJ1dGUoYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KSB7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHRoaXMuaG9zdEF0dHIsICcnKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZUVsZW1lbnQocGFyZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xuICAgIGNvbnN0IGVsID0gc3VwZXIuY3JlYXRlRWxlbWVudChwYXJlbnQsIG5hbWUpO1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbCwgdGhpcy5jb250ZW50QXR0ciwgJycpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuXG5jbGFzcyBTaGFkb3dEb21SZW5kZXJlciBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIHNoYWRvd1Jvb3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBwcml2YXRlIGhvc3RFbDogYW55LCBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMsIFtdKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGVzW2ldO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7XG4gIH1cblxuICBvdmVycmlkZSBkZXN0cm95KCkge1xuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5yZW1vdmVIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gIH1cblxuICBvdmVycmlkZSBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hcHBlbmRDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQpO1xuICB9XG4gIG92ZXJyaWRlIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5pbnNlcnRCZWZvcmUodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gIH1cbiAgb3ZlcnJpZGUgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG9sZENoaWxkKTtcbiAgfVxuICBvdmVycmlkZSBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU9yU2hhZG93Um9vdChzdXBlci5wYXJlbnROb2RlKHRoaXMubm9kZU9yU2hhZG93Um9vdChub2RlKSkpO1xuICB9XG59XG4iXX0=