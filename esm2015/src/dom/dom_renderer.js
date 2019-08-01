/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    return (/**
     * @param {?} event
     * @return {?}
     */
    (event) => {
        // Ivy uses `Function` as a special token that allows us to unwrap the function
        // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`.
        if (event === Function) {
            return eventHandler;
        }
        /** @type {?} */
        const allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
        return undefined;
    });
}
export class DomRendererFactory2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} appId
     */
    constructor(eventManager, sharedStylesHost, appId) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
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
                    renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
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
    { type: Injectable }
];
/** @nocollapse */
DomRendererFactory2.ctorParameters = () => [
    { type: EventManager },
    { type: DomSharedStylesHost },
    { type: String, decorators: [{ type: Inject, args: [APP_ID,] }] }
];
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
    /**
     * @type {?}
     * @private
     */
    DomRendererFactory2.prototype.appId;
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
            name = namespace + ':' + name;
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
const ɵ0 = /**
 * @return {?}
 */
() => '@'.charCodeAt(0);
/** @type {?} */
const AT_CHARCODE = ((ɵ0))();
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
     * @param {?} appId
     */
    constructor(eventManager, sharedStylesHost, component, appId) {
        super(eventManager);
        this.component = component;
        /** @type {?} */
        const styles = flattenStyles(appId + '-' + component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        this.contentAttr = shimContentAttribute(appId + '-' + component.id);
        this.hostAttr = shimHostAttribute(appId + '-' + component.id);
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBK0IsbUJBQW1CLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFekQsTUFBTSxPQUFPLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0NBQ3pDOztNQUVLLGVBQWUsR0FBRyxTQUFTOztBQUNqQyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsUUFBUTs7QUFDMUMsTUFBTSxPQUFPLFNBQVMsR0FBRyxXQUFXLGtCQUFrQixFQUFFOztBQUN4RCxNQUFNLE9BQU8sWUFBWSxHQUFHLGNBQWMsa0JBQWtCLEVBQUU7Ozs7O0FBRTlELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxnQkFBd0I7SUFDM0QsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLGdCQUF3QjtJQUN4RCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQ3pCLE1BQWMsRUFBRSxNQUF3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QUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7Ozs7O0lBQ0QsV0FBVyxDQUFDLE1BQVcsRUFBRSxRQUFhO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7SUFDRCxVQUFVLENBQUMsSUFBUztRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUNGOzs7Ozs7SUFwQ0MsdUNBQXdCOzs7OztJQUdRLDZDQUE2Qzs7Ozs7SUFDekUsbUNBQW1COzs7OztJQUFFLHNDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBUFBfSUQsIEluamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclN0eWxlRmxhZ3MyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tICcuL2V2ZW50cy9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnLi9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuXG5leHBvcnQgY29uc3QgTkFNRVNQQUNFX1VSSVM6IHtbbnM6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICdzdmcnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAneGh0bWwnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcsXG4gICd4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgJ3htbCc6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnLFxuICAneG1sbnMnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLFxufTtcblxuY29uc3QgQ09NUE9ORU5UX1JFR0VYID0gLyVDT01QJS9nO1xuZXhwb3J0IGNvbnN0IENPTVBPTkVOVF9WQVJJQUJMRSA9ICclQ09NUCUnO1xuZXhwb3J0IGNvbnN0IEhPU1RfQVRUUiA9IGBfbmdob3N0LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9BVFRSID0gYF9uZ2NvbnRlbnQtJHtDT01QT05FTlRfVkFSSUFCTEV9YDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Db250ZW50QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBDT05URU5UX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50U2hvcnRJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIEhPU1RfQVRUUi5yZXBsYWNlKENPTVBPTkVOVF9SRUdFWCwgY29tcG9uZW50U2hvcnRJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuU3R5bGVzKFxuICAgIGNvbXBJZDogc3RyaW5nLCBzdHlsZXM6IEFycmF5PGFueXxhbnlbXT4sIHRhcmdldDogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHN0eWxlID0gc3R5bGVzW2ldO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGUpKSB7XG4gICAgICBmbGF0dGVuU3R5bGVzKGNvbXBJZCwgc3R5bGUsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlID0gc3R5bGUucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBJZCk7XG4gICAgICB0YXJnZXQucHVzaChzdHlsZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlUHJldmVudERlZmF1bHQoZXZlbnRIYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgLy8gSXZ5IHVzZXMgYEZ1bmN0aW9uYCBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBhbGxvd3MgdXMgdG8gdW53cmFwIHRoZSBmdW5jdGlvblxuICAgIC8vIHNvIHRoYXQgaXQgY2FuIGJlIGludm9rZWQgcHJvZ3JhbW1hdGljYWxseSBieSBgRGVidWdOb2RlLnRyaWdnZXJFdmVudEhhbmRsZXJgLlxuICAgIGlmIChldmVudCA9PT0gRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiBldmVudEhhbmRsZXI7XG4gICAgfVxuXG4gICAgY29uc3QgYWxsb3dEZWZhdWx0QmVoYXZpb3IgPSBldmVudEhhbmRsZXIoZXZlbnQpO1xuICAgIGlmIChhbGxvd0RlZmF1bHRCZWhhdmlvciA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIFRPRE8odGJvc2NoKTogbW92ZSBwcmV2ZW50RGVmYXVsdCBpbnRvIGV2ZW50IHBsdWdpbnMuLi5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHNoYXJlZFN0eWxlc0hvc3Q6IERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgICBASW5qZWN0KEFQUF9JRCkgcHJpdmF0ZSBhcHBJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPSBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKFxuICAgICAgICAgICAgICB0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCB0eXBlLCB0aGlzLmFwcElkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICAoPEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMj5yZW5kZXJlcikuYXBwbHlUb0hvc3QoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiByZW5kZXJlcjtcbiAgICAgIH1cbiAgICAgIGNhc2UgVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlOlxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb206XG4gICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIodGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlOiBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIEluIGNhc2VzIHdoZXJlIEl2eSAobm90IFZpZXdFbmdpbmUpIGlzIGdpdmluZyB1cyB0aGUgYWN0dWFsIG5hbWVzcGFjZSwgdGhlIGxvb2sgdXAgYnkga2V5XG4gICAgICAvLyB3aWxsIHJlc3VsdCBpbiB1bmRlZmluZWQsIHNvIHdlIGp1c3QgcmV0dXJuIHRoZSBuYW1lc3BhY2UgaGVyZS5cbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSB8fCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICB9XG5cbiAgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodmFsdWUpOyB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7IHBhcmVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7IH1cblxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCByZWZDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQob2xkQ2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKTogYW55IHtcbiAgICBsZXQgZWw6IGFueSA9IHR5cGVvZiBzZWxlY3Rvck9yTm9kZSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JOb2RlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JPck5vZGU7XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgc2VsZWN0b3IgXCIke3NlbGVjdG9yT3JOb2RlfVwiIGRpZCBub3QgbWF0Y2ggYW55IGVsZW1lbnRzYCk7XG4gICAgfVxuICAgIGlmICghcHJlc2VydmVDb250ZW50KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlLnBhcmVudE5vZGU7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gbm9kZS5uZXh0U2libGluZzsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgLy8gVE9ETyhiZW5sZXNoKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAvLyBUT0RPKGJlbmxlc2gpOiBJdnkgbWF5IGNhdXNlIGlzc3VlcyBoZXJlIGJlY2F1c2UgaXQncyBwYXNzaW5nIGFyb3VuZFxuICAgICAgLy8gZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzLCB0aGVyZWZvcmUgdGhpcyBsb29rdXAgd2lsbCBmYWlsLlxuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8oYmVubGVzaCk6IFNpbmNlIGl2eSBpcyBwYXNzaW5nIGFyb3VuZCBmdWxsIFVSSXMgZm9yIG5hbWVzcGFjZXNcbiAgICAgICAgLy8gdGhpcyBjb3VsZCByZXN1bHQgaW4gcHJvcGVydGllcyBsaWtlIGBodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZzpjeD1cIjEyM1wiYCxcbiAgICAgICAgLy8gd2hpY2ggaXMgd3JvbmcuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShgJHtuYW1lc3BhY2V9OiR7bmFtZX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBlbC5jbGFzc0xpc3QuYWRkKG5hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7IH1cblxuICBzZXRTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCB2YWx1ZTogYW55LCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgIHN0eWxlLCB2YWx1ZSwgISEoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCkgPyAnaW1wb3J0YW50JyA6ICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShzdHlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIHJlcXVpcmVzICcnIGluc3RlYWQgb2YgbnVsbFxuICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzc5MTZcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWUsICdwcm9wZXJ0eScpO1xuICAgIGVsW25hbWVdID0gdmFsdWU7XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgbm9kZS5ub2RlVmFsdWUgPSB2YWx1ZTsgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTpcbiAgICAgICgpID0+IHZvaWQge1xuICAgIGNoZWNrTm9TeW50aGV0aWNQcm9wKGV2ZW50LCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnQsIGRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMoKSA9PiB2b2lkO1xuICB9XG59XG5cbmNvbnN0IEFUX0NIQVJDT0RFID0gKCgpID0+ICdAJy5jaGFyQ29kZUF0KDApKSgpO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9LiBQbGVhc2UgaW5jbHVkZSBlaXRoZXIgXCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZVwiIG9yIFwiTm9vcEFuaW1hdGlvbnNNb2R1bGVcIiBpbiB5b3VyIGFwcGxpY2F0aW9uLmApO1xuICB9XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIsIGFwcElkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXMoYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMsIFtdKTtcbiAgICBzaGFyZWRTdHlsZXNIb3N0LmFkZFN0eWxlcyhzdHlsZXMpO1xuXG4gICAgdGhpcy5jb250ZW50QXR0ciA9IHNoaW1Db250ZW50QXR0cmlidXRlKGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkKTtcbiAgICB0aGlzLmhvc3RBdHRyID0gc2hpbUhvc3RBdHRyaWJ1dGUoYXBwSWQgKyAnLScgKyBjb21wb25lbnQuaWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KSB7IHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7IH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGlmIChjb21wb25lbnQuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbiAgICB9XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7IH1cblxuICBkZXN0cm95KCkgeyB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkKTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuaW5zZXJ0QmVmb3JlKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICB9XG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBvbGRDaGlsZCk7XG4gIH1cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm5vZGVPclNoYWRvd1Jvb3Qoc3VwZXIucGFyZW50Tm9kZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3Qobm9kZSkpKTtcbiAgfVxufVxuIl19