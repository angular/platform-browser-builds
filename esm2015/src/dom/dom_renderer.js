/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, RendererStyleFlags2, ViewEncapsulation } from '@angular/core';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
export const NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
};
/** @type {?} */
const COMPONENT_REGEX = /%COMP%/g;
/** @type {?} */
export const COMPONENT_VARIABLE = '%COMP%';
/** @type {?} */
export const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
/** @type {?} */
export const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
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
    for (let i = 0; i < styles.length; i++) {
        /** @type {?} */
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
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return (event) => {
        /** @type {?} */
        const allowDefaultBehavior = eventHandler(event);
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
                /** @type {?} */
                let renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer =
                        new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((/** @type {?} */ (renderer))).applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
            case ViewEncapsulation.ShadowDom:
                return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    /** @type {?} */
                    const styles = flattenStyles(type.id, type.styles, []);
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
    { type: Injectable },
];
/** @nocollapse */
DomRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: DomSharedStylesHost }
];
/** @nocollapse */ DomRendererFactory2.ngInjectableDef = i0.defineInjectable({ token: DomRendererFactory2, factory: function DomRendererFactory2_Factory(t) { return new (t || DomRendererFactory2)(i0.inject(EventManager), i0.inject(DomSharedStylesHost)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(DomRendererFactory2, [{
        type: Injectable
    }], function () { return [{
        type: EventManager
    }, {
        type: DomSharedStylesHost
    }]; }, null);
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomRendererFactory2.prototype.rendererByCompId;
    /**
     * @type {?}
     * @private
     */
    DomRendererFactory2.prototype.defaultRenderer;
    /**
     * @type {?}
     * @private
     */
    DomRendererFactory2.prototype.eventManager;
    /**
     * @type {?}
     * @private
     */
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
            // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
            // will result in undefined, so we just return the namespace here.
            return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
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
     * @param {?=} preserveContent
     * @return {?}
     */
    selectRootElement(selectorOrNode, preserveContent) {
        /** @type {?} */
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
            // TODO(benlesh): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            /** @type {?} */
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
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(el, name, namespace) {
        if (namespace) {
            // TODO(benlesh): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            /** @type {?} */
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                // TODO(benlesh): Since ivy is passing around full URIs for namespaces
                // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
                // which is wrong.
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
            return (/** @type {?} */ (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback))));
        }
        return (/** @type {?} */ ((/** @type {?} */ (this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))))));
    }
}
if (false) {
    /** @type {?} */
    DefaultDomRenderer2.prototype.data;
    /** @type {?} */
    DefaultDomRenderer2.prototype.destroyNode;
    /**
     * @type {?}
     * @private
     */
    DefaultDomRenderer2.prototype.eventManager;
}
/** @type {?} */
const AT_CHARCODE = '@'.charCodeAt(0);
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
        /** @type {?} */
        const styles = flattenStyles(component.id, component.styles, []);
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
        /** @type {?} */
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    EmulatedEncapsulationDomRenderer2.prototype.contentAttr;
    /**
     * @type {?}
     * @private
     */
    EmulatedEncapsulationDomRenderer2.prototype.hostAttr;
    /**
     * @type {?}
     * @private
     */
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
            this.shadowRoot = ((/** @type {?} */ (hostEl))).attachShadow({ mode: 'open' });
        }
        else {
            this.shadowRoot = ((/** @type {?} */ (hostEl))).createShadowRoot();
        }
        this.sharedStylesHost.addHost(this.shadowRoot);
        /** @type {?} */
        const styles = flattenStyles(component.id, component.styles, []);
        for (let i = 0; i < styles.length; i++) {
            /** @type {?} */
            const styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            this.shadowRoot.appendChild(styleEl);
        }
    }
    /**
     * @private
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShadowDomRenderer.prototype.shadowRoot;
    /**
     * @type {?}
     * @private
     */
    ShadowDomRenderer.prototype.sharedStylesHost;
    /**
     * @type {?}
     * @private
     */
    ShadowDomRenderer.prototype.hostEl;
    /**
     * @type {?}
     * @private
     */
    ShadowDomRenderer.prototype.component;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBK0IsbUJBQW1CLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7OztBQUV6RCxNQUFNLE9BQU8sY0FBYyxHQUEyQjtJQUNwRCxLQUFLLEVBQUUsNEJBQTRCO0lBQ25DLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsc0NBQXNDO0lBQzdDLE9BQU8sRUFBRSwrQkFBK0I7Q0FDekM7O01BRUssZUFBZSxHQUFHLFNBQVM7O0FBQ2pDLE1BQU0sT0FBTyxrQkFBa0IsR0FBRyxRQUFROztBQUMxQyxNQUFNLE9BQU8sU0FBUyxHQUFHLFdBQVcsa0JBQWtCLEVBQUU7O0FBQ3hELE1BQU0sT0FBTyxZQUFZLEdBQUcsY0FBYyxrQkFBa0IsRUFBRTs7Ozs7QUFFOUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGdCQUF3QjtJQUMzRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDakUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsZ0JBQXdCO0lBQ3hELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDekIsTUFBYyxFQUFFLE1BQXdCLEVBQUUsTUFBZ0I7SUFDNUQs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QVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRjs7Ozs7O0lBcENDLHVDQUF3Qjs7Ozs7SUFHUSw2Q0FBNkM7Ozs7O0lBQ3pFLG1DQUFtQjs7Ozs7SUFBRSxzQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX1VSSVM6IHtbbnM6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdzdmcnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAneGh0bWwnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gICd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgJ3htbCc6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICAneG1sbnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLFxufTtcblxuY29uc3QgQ09NUE9ORU5UX1JFR0VYID0gLyVDT01QJS9nO1xuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBDT05URU5UX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIEhPU1RfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuU3R5bGVzKFxuICAgIGNvbXBJZDogc3RyaW5nLCBzdHlsZXM6IEFycmF5PGFueXxhbnlbXT4sIHRhcmdldDogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHN0eWxlID0gc3R5bGVzW2ldO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICBmbGF0dGVuU3R5bGVzKGNvbXBJZCwgc3R5bGUsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlID0gc3R5bGUucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBJZCk7XG4gICAgICB0YXJnZXQucHVzaChzdHlsZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSBldmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIFRPRE8odGJvc2NoKTogbW92ZSBwcmV2ZW50RGVmYXVsdCBpbnRvIGV2ZW50IHBsdWdpbnMuLi5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSByZW5kZXJlckJ5Q29tcElkID0gbmV3IE1hcDxzdHJpbmcsIFJlbmRlcmVyMj4oKTtcbiAgcHJpdmF0ZSBkZWZhdWx0UmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QpIHtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKGV2ZW50TWFuYWdlcik7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZS5lbmNhcHN1bGF0aW9uKSB7XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOiB7XG4gICAgICAgIGxldCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG4gICAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlciA9XG4gICAgICAgICAgICAgIG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIodGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgdHlwZSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCByZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgKDxFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjI+cmVuZGVyZXIpLmFwcGx5VG9Ib3N0KGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcmVuZGVyZXI7XG4gICAgICB9XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZTpcbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tOlxuICAgICAgICByZXR1cm4gbmV3IFNoYWRvd0RvbVJlbmRlcmVyKHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIGVsZW1lbnQsIHR5cGUpO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZXJCeUNvbXBJZC5oYXModHlwZS5pZCkpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKHR5cGUuaWQsIHR5cGUuc3R5bGVzLCBbXSk7XG4gICAgICAgICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgdGhpcy5kZWZhdWx0UmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRSZW5kZXJlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiZWdpbigpIHt9XG4gIGVuZCgpIHt9XG59XG5cbmNsYXNzIERlZmF1bHREb21SZW5kZXJlcjIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcikge31cblxuICBkZXN0cm95KCk6IHZvaWQge31cblxuICBkZXN0cm95Tm9kZTogbnVsbDtcblxuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogYW55IHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAvLyBJbiBjYXNlcyB3aGVyZSBJdnkgKG5vdCBWaWV3RW5naW5lKSBpcyBnaXZpbmcgdXMgdGhlIGFjdHVhbCBuYW1lc3BhY2UsIHRoZSBsb29rIHVwIGJ5IGtleVxuICAgICAgLy8gd2lsbCByZXN1bHQgaW4gdW5kZWZpbmVkLCBzbyB3ZSBqdXN0IHJldHVybiB0aGUgbmFtZXNwYWNlIGhlcmUuXG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV0gfHwgbmFtZXNwYWNlLCBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IGFueSB7IHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHZhbHVlKTsgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7IHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSk7IH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQgeyBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKG9sZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSwgcHJlc2VydmVDb250ZW50PzogYm9vbGVhbik6IGFueSB7XG4gICAgbGV0IGVsOiBhbnkgPSB0eXBlb2Ygc2VsZWN0b3JPck5vZGUgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yTm9kZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yT3JOb2RlO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNlbGVjdG9yIFwiJHtzZWxlY3Rvck9yTm9kZX1cIiBkaWQgbm90IG1hdGNoIGFueSBlbGVtZW50c2ApO1xuICAgIH1cbiAgICBpZiAoIXByZXNlcnZlQ29udGVudCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gbm9kZS5wYXJlbnROb2RlOyB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHsgcmV0dXJuIG5vZGUubmV4dFNpYmxpbmc7IH1cblxuICBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICBuYW1lID0gYCR7bmFtZXNwYWNlfToke25hbWV9YDtcbiAgICAgIC8vIFRPRE8oYmVubGVzaCk6IEl2eSBtYXkgY2F1c2UgaXNzdWVzIGhlcmUgYmVjYXVzZSBpdCdzIHBhc3NpbmcgYXJvdW5kXG4gICAgICAvLyBmdWxsIFVSSXMgZm9yIG5hbWVzcGFjZXMsIHRoZXJlZm9yZSB0aGlzIGxvb2t1cCB3aWxsIGZhaWwuXG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gVE9ETyhiZW5sZXNoKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKGJlbmxlc2gpOiBTaW5jZSBpdnkgaXMgcGFzc2luZyBhcm91bmQgZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzXG4gICAgICAgIC8vIHRoaXMgY291bGQgcmVzdWx0IGluIHByb3BlcnRpZXMgbGlrZSBgaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc6Y3g9XCIxMjNcImAsXG4gICAgICAgIC8vIHdoaWNoIGlzIHdyb25nLlxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpOyB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBzdHlsZSwgdmFsdWUsICEhKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IG5vZGUubm9kZVZhbHVlID0gdmFsdWU7IH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzKCkgPT4gdm9pZDtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICdAJy5jaGFyQ29kZUF0KDApO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9LiBQbGVhc2UgaW5jbHVkZSBlaXRoZXIgXCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZVwiIG9yIFwiTm9vcEFuaW1hdGlvbnNNb2R1bGVcIiBpbiB5b3VyIGFwcGxpY2F0aW9uLmApO1xuICB9XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXMoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KSB7IHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7IH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGlmIChjb21wb25lbnQuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbiAgICB9XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7IH1cblxuICBkZXN0cm95KCkgeyB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkKTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuaW5zZXJ0QmVmb3JlKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICB9XG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBvbGRDaGlsZCk7XG4gIH1cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm5vZGVPclNoYWRvd1Jvb3Qoc3VwZXIucGFyZW50Tm9kZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3Qobm9kZSkpKTtcbiAgfVxufVxuIl19