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
        this.shadowRoot = (/** @type {?} */ (hostEl)).createShadowRoot();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQStCLG1CQUFtQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsTUFBTSxDQUFDLHVCQUFNLGNBQWMsR0FBMkI7SUFDcEQsS0FBSyxFQUFFLDRCQUE0QjtJQUNuQyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLHNDQUFzQztJQUM3QyxPQUFPLEVBQUUsK0JBQStCO0NBQ3pDLENBQUM7QUFFRix1QkFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyx1QkFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUM7QUFDM0MsTUFBTSxDQUFDLHVCQUFNLFNBQVMsR0FBRyxXQUFXLGtCQUFrQixFQUFFLENBQUM7QUFDekQsTUFBTSxDQUFDLHVCQUFNLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFLENBQUM7Ozs7O0FBRS9ELE1BQU0sK0JBQStCLGdCQUF3QjtJQUMzRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Q0FDaEU7Ozs7O0FBRUQsTUFBTSw0QkFBNEIsZ0JBQXdCO0lBQ3hELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztDQUM3RDs7Ozs7OztBQUVELE1BQU0sd0JBQ0YsTUFBYyxFQUFFLE1BQXdCLEVBQUUsTUFBZ0I7SUFDNUQsS0FBSyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLHFCQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsT0FBTyxNQUFNLENBQUM7Q0FDZjs7Ozs7QUFFRCxnQ0FBZ0MsWUFBc0I7SUFDcEQsT0FBTyxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ3BCLHVCQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLG9CQUFvQixLQUFLLEtBQUssRUFBRTs7WUFFbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzNCO0tBQ0YsQ0FBQztDQUNIO0FBR0QsTUFBTTs7Ozs7SUFJSixZQUFvQixZQUEwQixFQUFVLGdCQUFxQztRQUF6RSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBcUI7Z0NBSGxFLElBQUksR0FBRyxFQUFxQjtRQUlyRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDOUQ7Ozs7OztJQUVELGNBQWMsQ0FBQyxPQUFZLEVBQUUsSUFBd0I7UUFDbkQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDN0I7UUFDRCxRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDMUIsS0FBSyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLFFBQVE7d0JBQ0osSUFBSSxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDMUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUM5QztnQkFDRCxtQkFBb0MsUUFBUSxFQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELEtBQUssaUJBQWlCLENBQUMsTUFBTTtnQkFDM0IsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RixPQUFPLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3ZDLHVCQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUMxRDtnQkFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDN0I7U0FDRjtLQUNGOzs7O0lBRUQsS0FBSyxNQUFLOzs7O0lBQ1YsR0FBRyxNQUFLOzs7WUF0Q1QsVUFBVTs7OztZQWxESCxZQUFZO1lBQ1osbUJBQW1COzs7Ozs7Ozs7Ozs7QUEwRjNCOzs7O0lBR0UsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7b0JBRmpCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBRUU7Ozs7SUFFbEQsT0FBTyxNQUFXOzs7Ozs7SUFJbEIsYUFBYSxDQUFDLElBQVksRUFBRSxTQUFrQjtRQUM1QyxJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7UUFFRCxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckM7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQWEsSUFBUyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7Ozs7SUFFM0UsVUFBVSxDQUFDLEtBQWEsSUFBUyxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs7Ozs7O0lBRXpFLFdBQVcsQ0FBQyxNQUFXLEVBQUUsUUFBYSxJQUFVLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTs7Ozs7OztJQUUvRSxZQUFZLENBQUMsTUFBVyxFQUFFLFFBQWEsRUFBRSxRQUFhO1FBQ3BELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekM7S0FDRjs7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQVcsRUFBRSxRQUFhO1FBQ3BDLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtLQUNGOzs7OztJQUVELGlCQUFpQixDQUFDLGNBQTBCO1FBQzFDLHFCQUFJLEVBQUUsR0FBUSxPQUFPLGNBQWMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QyxjQUFjLENBQUM7UUFDbEUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLGNBQWMsOEJBQThCLENBQUMsQ0FBQztTQUNoRjtRQUNELEVBQUUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQVMsSUFBUyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTs7Ozs7SUFFdEQsV0FBVyxDQUFDLElBQVMsSUFBUyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTs7Ozs7Ozs7SUFFeEQsWUFBWSxDQUFDLEVBQU8sRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLFNBQWtCO1FBQ25FLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxHQUFHLEdBQUcsU0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzlCLHVCQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0MsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM5QjtTQUNGO2FBQU07WUFDTCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QjtLQUNGOzs7Ozs7O0lBRUQsZUFBZSxDQUFDLEVBQU8sRUFBRSxJQUFZLEVBQUUsU0FBa0I7UUFDdkQsSUFBSSxTQUFTLEVBQUU7WUFDYix1QkFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLElBQUksWUFBWSxFQUFFO2dCQUNoQixFQUFFLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFDO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQzthQUM1QztTQUNGO2FBQU07WUFDTCxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7Ozs7OztJQUVELFFBQVEsQ0FBQyxFQUFPLEVBQUUsSUFBWSxJQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Ozs7OztJQUVqRSxXQUFXLENBQUMsRUFBTyxFQUFFLElBQVksSUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFOzs7Ozs7OztJQUV2RSxRQUFRLENBQUMsRUFBTyxFQUFFLEtBQWEsRUFBRSxLQUFVLEVBQUUsS0FBMEI7UUFDckUsSUFBSSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxFQUFFO1lBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUNoQixLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDekI7S0FDRjs7Ozs7OztJQUVELFdBQVcsQ0FBQyxFQUFPLEVBQUUsS0FBYSxFQUFFLEtBQTBCO1FBQzVELElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsRUFBRTtZQUN4QyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUFNOzs7WUFHTCxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtLQUNGOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLEVBQU8sRUFBRSxJQUFZLEVBQUUsS0FBVTtRQUMzQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNsQjs7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVMsRUFBRSxLQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBRTs7Ozs7OztJQUVwRSxNQUFNLENBQUMsTUFBc0MsRUFBRSxLQUFhLEVBQUUsUUFBaUM7UUFFN0Ysb0JBQW9CLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLHlCQUFtQixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUN2RCxNQUFNLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUM7U0FDdEQ7UUFDRCwwQkFBbUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FDMUMsTUFBTSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFjO0tBQzFFO0NBQ0Y7Ozs7Ozs7OztBQUVELHVCQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7QUFDdEMsOEJBQThCLElBQVksRUFBRSxRQUFnQjtJQUMxRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUJBQXVCLFFBQVEsSUFBSSxJQUFJLGtHQUFrRyxDQUFDLENBQUM7S0FDaEo7Q0FDRjtBQUVELHVDQUF3QyxTQUFRLG1CQUFtQjs7Ozs7O0lBSWpFLFlBQ0ksWUFBMEIsRUFBRSxnQkFBcUMsRUFDekQ7UUFDVixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFEVixjQUFTLEdBQVQsU0FBUztRQUVuQix1QkFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDakQ7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Ozs7OztJQUU3RSxhQUFhLENBQUMsTUFBVyxFQUFFLElBQVk7UUFDckMsdUJBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUM7S0FDWDtDQUNGOzs7Ozs7Ozs7QUFFRCx1QkFBd0IsU0FBUSxtQkFBbUI7Ozs7Ozs7SUFHakQsWUFDSSxZQUEwQixFQUFVLGdCQUFxQyxFQUNqRSxRQUFxQixTQUF3QjtRQUN2RCxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFGa0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNqRSxXQUFNLEdBQU4sTUFBTTtRQUFlLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFFdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLHVCQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLEtBQUsscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0Qyx1QkFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QztLQUNGOzs7OztJQUVPLGdCQUFnQixDQUFDLElBQVMsSUFBUyxPQUFPLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7SUFFaEcsT0FBTyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7Ozs7OztJQUVoRSxXQUFXLENBQUMsTUFBVyxFQUFFLFFBQWE7UUFDcEMsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNuRTs7Ozs7OztJQUNELFlBQVksQ0FBQyxNQUFXLEVBQUUsUUFBYSxFQUFFLFFBQWE7UUFDcEQsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUU7Ozs7OztJQUNELFdBQVcsQ0FBQyxNQUFXLEVBQUUsUUFBYTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ25FOzs7OztJQUNELFVBQVUsQ0FBQyxJQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RTtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSAnLi9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9VUklTOiB7W25zOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgJ3hodG1sJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAneGxpbmsnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICd4bWwnOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcbiAgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyxcbn07XG5cbmNvbnN0IENPTVBPTkVOVF9SRUdFWCA9IC8lQ09NUCUvZztcbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gQ09OVEVOVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBIT1NUX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlblN0eWxlcyhcbiAgICBjb21wSWQ6IHN0cmluZywgc3R5bGVzOiBBcnJheTxhbnl8YW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzdHlsZSA9IHN0eWxlc1tpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlKSkge1xuICAgICAgZmxhdHRlblN0eWxlcyhjb21wSWQsIHN0eWxlLCB0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZSA9IHN0eWxlLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wSWQpO1xuICAgICAgdGFyZ2V0LnB1c2goc3R5bGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gZXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICBpZiAoYWxsb3dEZWZhdWx0QmVoYXZpb3IgPT09IGZhbHNlKSB7XG4gICAgICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgcHJldmVudERlZmF1bHQgaW50byBldmVudCBwbHVnaW5zLi4uXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0KSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPVxuICAgICAgICAgICAgICBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIHR5cGUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgICg8RW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyPnJlbmRlcmVyKS5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgICAgfVxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICAgIHJldHVybiBuZXcgU2hhZG93RG9tUmVuZGVyZXIodGhpcy5ldmVudE1hbmFnZXIsIHRoaXMuc2hhcmVkU3R5bGVzSG9zdCwgZWxlbWVudCwgdHlwZSk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGlmICghdGhpcy5yZW5kZXJlckJ5Q29tcElkLmhhcyh0eXBlLmlkKSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXModHlwZS5pZCwgdHlwZS5zdHlsZXMsIFtdKTtcbiAgICAgICAgICB0aGlzLnNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlckJ5Q29tcElkLnNldCh0eXBlLmlkLCB0aGlzLmRlZmF1bHRSZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJlZ2luKCkge31cbiAgZW5kKCkge31cbn1cblxuY2xhc3MgRGVmYXVsdERvbVJlbmRlcmVyMiBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyKSB7fVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7fVxuXG4gIGRlc3Ryb3lOb2RlOiBudWxsO1xuXG4gIGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHsgcGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTsgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBhbnkge1xuICAgIGxldCBlbDogYW55ID0gdHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPck5vZGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlLnBhcmVudE5vZGU7IH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gbm9kZS5uZXh0U2libGluZzsgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBgJHtuYW1lc3BhY2V9OiR7bmFtZX1gO1xuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYCR7bmFtZXNwYWNlfToke25hbWV9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZWwuY2xhc3NMaXN0LmFkZChuYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQgeyBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpOyB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBzdHlsZSwgdmFsdWUsICEhKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7IG5vZGUubm9kZVZhbHVlID0gdmFsdWU7IH1cblxuICBsaXN0ZW4odGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbik6XG4gICAgICAoKSA9PiB2b2lkIHtcbiAgICBjaGVja05vU3ludGhldGljUHJvcChldmVudCwgJ2xpc3RlbmVyJyk7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpIGFzKCkgPT4gdm9pZDtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICdAJy5jaGFyQ29kZUF0KDApO1xuZnVuY3Rpb24gY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZTogc3RyaW5nLCBuYW1lS2luZDogc3RyaW5nKSB7XG4gIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IEFUX0NIQVJDT0RFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke25hbWV9LiBQbGVhc2UgaW5jbHVkZSBlaXRoZXIgXCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZVwiIG9yIFwiTm9vcEFuaW1hdGlvbnNNb2R1bGVcIiBpbiB5b3VyIGFwcGxpY2F0aW9uLmApO1xuICB9XG59XG5cbmNsYXNzIEVtdWxhdGVkRW5jYXBzdWxhdGlvbkRvbVJlbmRlcmVyMiBleHRlbmRzIERlZmF1bHREb21SZW5kZXJlcjIge1xuICBwcml2YXRlIGNvbnRlbnRBdHRyOiBzdHJpbmc7XG4gIHByaXZhdGUgaG9zdEF0dHI6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLCBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsYXR0ZW5TdHlsZXMoY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICAgIHRoaXMuaG9zdEF0dHIgPSBzaGltSG9zdEF0dHJpYnV0ZShjb21wb25lbnQuaWQpO1xuICB9XG5cbiAgYXBwbHlUb0hvc3QoZWxlbWVudDogYW55KSB7IHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7IH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlID09PSB0aGlzLmhvc3RFbCA/IHRoaXMuc2hhZG93Um9vdCA6IG5vZGU7IH1cblxuICBkZXN0cm95KCkgeyB0aGlzLnNoYXJlZFN0eWxlc0hvc3QucmVtb3ZlSG9zdCh0aGlzLnNoYWRvd1Jvb3QpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kQ2hpbGQodGhpcy5ub2RlT3JTaGFkb3dSb290KHBhcmVudCksIG5ld0NoaWxkKTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIuaW5zZXJ0QmVmb3JlKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICB9XG4gIHJlbW92ZUNoaWxkKHBhcmVudDogYW55LCBvbGRDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBvbGRDaGlsZCk7XG4gIH1cbiAgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm5vZGVPclNoYWRvd1Jvb3Qoc3VwZXIucGFyZW50Tm9kZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3Qobm9kZSkpKTtcbiAgfVxufVxuIl19