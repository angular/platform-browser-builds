/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, RendererStyleFlags2, ViewEncapsulation } from '@angular/core';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
export const /** @type {?} */ NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
};
const /** @type {?} */ COMPONENT_REGEX = /%COMP%/g;
export const /** @type {?} */ COMPONENT_VARIABLE = '%COMP%';
export const /** @type {?} */ HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
export const /** @type {?} */ CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * @param {?} componentShortId
 * @return {?}
 */
export function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} componentShortId
 * @return {?}
 */
export function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} compId
 * @param {?} styles
 * @param {?} target
 * @return {?}
 */
export function flattenStyles(compId, styles, target) {
    for (let /** @type {?} */ i = 0; i < styles.length; i++) {
        let /** @type {?} */ style = styles[i];
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
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return (event) => {
        const /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
    };
}
export class DomRendererFactory2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     */
    constructor(eventManager, sharedStylesHost) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRenderer2(eventManager);
    }
    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Emulated: {
                let /** @type {?} */ renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer =
                        new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                (/** @type {?} */ (renderer)).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
            case ViewEncapsulation.ShadowDom:
                return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    const /** @type {?} */ styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    }
    /**
     * @return {?}
     */
    begin() { }
    /**
     * @return {?}
     */
    end() { }
}
DomRendererFactory2.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: DomSharedStylesHost }
];
function DomRendererFactory2_tsickle_Closure_declarations() {
    /** @type {?} */
    DomRendererFactory2.prototype.rendererByCompId;
    /** @type {?} */
    DomRendererFactory2.prototype.defaultRenderer;
    /** @type {?} */
    DomRendererFactory2.prototype.eventManager;
    /** @type {?} */
    DomRendererFactory2.prototype.sharedStylesHost;
}
class DefaultDomRenderer2 {
    /**
     * @param {?} eventManager
     */
    constructor(eventManager) {
        this.eventManager = eventManager;
        this.data = Object.create(null);
    }
    /**
     * @return {?}
     */
    destroy() { }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    createElement(name, namespace) {
        if (namespace) {
            return document.createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return document.createElement(name);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createComment(value) { return document.createComment(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) { return document.createTextNode(value); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) { parent.appendChild(newChild); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */
    selectRootElement(selectorOrNode) {
        let /** @type {?} */ el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
        }
        el.textContent = '';
        return el;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) { return node.parentNode; }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return node.nextSibling; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = `${namespace}:${name}`;
            const /** @type {?} */ namespaceUri = NAMESPACE_URIS[namespace];
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
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        if (namespace) {
            const /** @type {?} */ namespaceUri = NAMESPACE_URIS[namespace];
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
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) { el.classList.add(name); }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) { el.classList.remove(name); }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} flags
     * @return {?}
     */
    setStyle(el, style, value, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.setProperty(style, value, !!(flags & RendererStyleFlags2.Important) ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} flags
     * @return {?}
     */
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
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) {
        checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) { node.nodeValue = value; }
    /**
     * @param {?} target
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    listen(target, event, callback) {
        checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            return /** @type {?} */ (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)));
        }
        return /** @type {?} */ ((this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))));
    }
}
function DefaultDomRenderer2_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultDomRenderer2.prototype.data;
    /** @type {?} */
    DefaultDomRenderer2.prototype.destroyNode;
    /** @type {?} */
    DefaultDomRenderer2.prototype.eventManager;
}
const /** @type {?} */ AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error(`Found the synthetic ${nameKind} ${name}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`);
    }
}
class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} component
     */
    constructor(eventManager, sharedStylesHost, component) {
        super(eventManager);
        this.component = component;
        const /** @type {?} */ styles = flattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(component.id);
        this.hostAttr = shimHostAttribute(component.id);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    applyToHost(element) { super.setAttribute(element, this.hostAttr, ''); }
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */
    createElement(parent, name) {
        const /** @type {?} */ el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
function EmulatedEncapsulationDomRenderer2_tsickle_Closure_declarations() {
    /** @type {?} */
    EmulatedEncapsulationDomRenderer2.prototype.contentAttr;
    /** @type {?} */
    EmulatedEncapsulationDomRenderer2.prototype.hostAttr;
    /** @type {?} */
    EmulatedEncapsulationDomRenderer2.prototype.component;
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} hostEl
     * @param {?} component
     */
    constructor(eventManager, sharedStylesHost, hostEl, component) {
        super(eventManager);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.component = component;
        if (component.encapsulation === ViewEncapsulation.ShadowDom) {
            this.shadowRoot = (/** @type {?} */ (hostEl)).attachShadow({ mode: 'open' });
        }
        else {
            this.shadowRoot = (/** @type {?} */ (hostEl)).createShadowRoot();
        }
        this.sharedStylesHost.addHost(this.shadowRoot);
        const /** @type {?} */ styles = flattenStyles(component.id, component.styles, []);
        for (let /** @type {?} */ i = 0; i < styles.length; i++) {
            const /** @type {?} */ styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            this.shadowRoot.appendChild(styleEl);
        }
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeOrShadowRoot(node) { return node === this.hostEl ? this.shadowRoot : node; }
    /**
     * @return {?}
     */
    destroy() { this.sharedStylesHost.removeHost(this.shadowRoot); }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    removeChild(parent, oldChild) {
        return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
}
function ShadowDomRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ShadowDomRenderer.prototype.shadowRoot;
    /** @type {?} */
    ShadowDomRenderer.prototype.sharedStylesHost;
    /** @type {?} */
    ShadowDomRenderer.prototype.hostEl;
    /** @type {?} */
    ShadowDomRenderer.prototype.component;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQStCLG1CQUFtQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsTUFBTSxDQUFDLHVCQUFNLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0NBQ3pDLENBQUM7QUFFRix1QkFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyx1QkFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLHVCQUFNLFNBQVMsR0FBRyxXQUFXLGtCQUFrQixFQUFFLENBQUM7QUFDekQsTUFBTSxDQUFDLHVCQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7Ozs7O0FBRS9ELE1BQU0sK0JBQStCLGdCQUF3QjtJQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztDQUNoRTs7Ozs7QUFFRCxNQUFNLDRCQUE0QixnQkFBd0I7SUFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Q0FDN0Q7Ozs7Ozs7QUFFRCxNQUFNLHdCQUNGLE1BQWMsRUFBRSxNQUF3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TUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0U7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gJy4vZXZlbnRzL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtEb21TaGFyZWRTdHlsZXNIb3N0fSBmcm9tICcuL3NoYXJlZF9zdHlsZXNfaG9zdCc7XG5cbmV4cG9ydCBjb25zdCBOQU1FU1BBQ0VfVVJJUzoge1tuczogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgJ3N2Zyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICd4aHRtbCc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyxcbiAgJ3hsaW5rJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICAneG1sJzogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScsXG4gICd4bWxucyc6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsXG59O1xuXG5jb25zdCBDT01QT05FTlRfUkVHRVggPSAvJUNPTVAlL2c7XG5leHBvcnQgY29uc3QgQ09NUE9ORU5UX1ZBUklBQkxFID0gJyVDT01QJSc7XG5leHBvcnQgY29uc3QgSE9TVF9BVFRSID0gYF9uZ2hvc3QtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcbmV4cG9ydCBjb25zdCBDT05URU5UX0FUVFIgPSBgX25nY29udGVudC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIENPTlRFTlRfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gSE9TVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5TdHlsZXMoXG4gICAgY29tcElkOiBzdHJpbmcsIHN0eWxlczogQXJyYXk8YW55fGFueVtdPiwgdGFyZ2V0OiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgc3R5bGUgPSBzdHlsZXNbaV07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIGZsYXR0ZW5TdHlsZXMoY29tcElkLCBzdHlsZSwgdGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUgPSBzdHlsZS5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcElkKTtcbiAgICAgIHRhcmdldC5wdXNoKHN0eWxlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChldmVudEhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICByZXR1cm4gKGV2ZW50OiBhbnkpID0+IHtcbiAgICBjb25zdCBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHByZXZlbnREZWZhdWx0IGludG8gZXZlbnQgcGx1Z2lucy4uLlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRG9tUmVuZGVyZXJGYWN0b3J5MiBpbXBsZW1lbnRzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBwcml2YXRlIHJlbmRlcmVyQnlDb21wSWQgPSBuZXcgTWFwPHN0cmluZywgUmVuZGVyZXIyPigpO1xuICBwcml2YXRlIGRlZmF1bHRSZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCkge1xuICAgIHRoaXMuZGVmYXVsdFJlbmRlcmVyID0gbmV3IERlZmF1bHREb21SZW5kZXJlcjIoZXZlbnRNYW5hZ2VyKTtcbiAgfVxuXG4gIGNyZWF0ZVJlbmRlcmVyKGVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIyIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIXR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICB9XG4gICAgc3dpdGNoICh0eXBlLmVuY2Fwc3VsYXRpb24pIHtcbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ6IHtcbiAgICAgICAgbGV0IHJlbmRlcmVyID0gdGhpcy5yZW5kZXJlckJ5Q29tcElkLmdldCh0eXBlLmlkKTtcbiAgICAgICAgaWYgKCFyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyID1cbiAgICAgICAgICAgICAgbmV3IEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMih0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0eXBlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICAoPEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMj5yZW5kZXJlcikuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlOlxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIodGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlOiBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHsgcGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTsgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBhbnkge1xuICAgIGxldCBlbDogYW55ID0gdHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPck5vZGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlLnBhcmVudE5vZGU7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gbm9kZS5uZXh0U2libGluZzsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBgJHtuYW1lc3BhY2V9OiR7bmFtZX1gO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpOyB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBzdHlsZSwgdmFsdWUsICEhKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IG5vZGUubm9kZVZhbHVlID0gdmFsdWU7IH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzKCkgPT4gdm9pZDtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICdAJy5jaGFyQ29kZUF0KDApO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9LiBQbGVhc2UgaW5jbHVkZSBlaXRoZXIgXCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZVwiIG9yIFwiTm9vcEFuaW1hdGlvbnNNb2R1bGVcIiBpbiB5b3VyIGFwcGxpY2F0aW9uLmApO1xuICB9XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXMoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KSB7IHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7IH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGlmIChjb21wb25lbnQuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbiAgICB9XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7IH1cblxuICBkZXN0cm95KCkgeyB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkKTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuaW5zZXJ0QmVmb3JlKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICB9XG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBvbGRDaGlsZCk7XG4gIH1cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm5vZGVPclNoYWRvd1Jvb3Qoc3VwZXIucGFyZW50Tm9kZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3Qobm9kZSkpKTtcbiAgfVxufVxuIl19