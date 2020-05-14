/**
 * @fileoverview added by tsickle
 * Generated from: packages/platform-browser/src/dom/dom_renderer.ts
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
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;
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
    // `DebugNode.triggerEventHandler` needs to know if the listener was created with
    // decoratePreventDefault or is a listener added outside the Angular context so it can handle the
    // two differently. In the first case, the special '__ngUnwrap__' token is passed to the unwrap
    // the listener (see below).
    return (/**
     * @param {?} event
     * @return {?}
     */
    (event) => {
        // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
        // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The debug_node
        // can inspect the listener toString contents for the existence of this special token. Because
        // the token is a string literal, it is ensured to not be modified by compiled code.
        if (event === '__ngUnwrap__') {
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
let DomRendererFactory2 = /** @class */ (() => {
    class DomRendererFactory2 {
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
    return DomRendererFactory2;
})();
export { DomRendererFactory2 };
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
    createComment(value) {
        return document.createComment(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    createText(value) {
        return document.createTextNode(value);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    appendChild(parent, newChild) {
        parent.appendChild(newChild);
    }
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
    parentNode(node) {
        return node.parentNode;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) {
        return node.nextSibling;
    }
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
            // TODO(FW-811): Ivy may cause issues here because it's passing around
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
            // TODO(FW-811): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            /** @type {?} */
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
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    addClass(el, name) {
        el.classList.add(name);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    removeClass(el, name) {
        el.classList.remove(name);
    }
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
        NG_DEV_MODE && checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    setValue(node, value) {
        node.nodeValue = value;
    }
    /**
     * @param {?} target
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    listen(target, event, callback) {
        NG_DEV_MODE && checkNoSyntheticProp(event, 'listener');
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
    applyToHost(element) {
        super.setAttribute(element, this.hostAttr, '');
    }
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
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    /**
     * @return {?}
     */
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQStCLG1CQUFtQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3SSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7O0FBRXpELE1BQU0sT0FBTyxjQUFjLEdBQTJCO0lBQ3BELEtBQUssRUFBRSw0QkFBNEI7SUFDbkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLEtBQUssRUFBRSxzQ0FBc0M7SUFDN0MsT0FBTyxFQUFFLCtCQUErQjtDQUN6Qzs7TUFFSyxlQUFlLEdBQUcsU0FBUzs7TUFDM0IsV0FBVyxHQUFHLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsU0FBUzs7QUFFbkUsTUFBTSxPQUFPLGtCQUFrQixHQUFHLFFBQVE7O0FBQzFDLE1BQU0sT0FBTyxTQUFTLEdBQUcsV0FBVyxrQkFBa0IsRUFBRTs7QUFDeEQsTUFBTSxPQUFPLFlBQVksR0FBRyxjQUFjLGtCQUFrQixFQUFFOzs7OztBQUU5RCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsZ0JBQXdCO0lBQzNELE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxnQkFBd0I7SUFDeEQsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFD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LENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxNQUFXLEVBQUUsUUFBYTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7Ozs7SUFDRCxZQUFZLENBQUMsTUFBVyxFQUFFLFFBQWEsRUFBRSxRQUFhO1FBQ3BELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Ozs7OztJQUNELFdBQVcsQ0FBQyxNQUFXLEVBQUUsUUFBYTtRQUNwQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7O0lBQ0QsVUFBVSxDQUFDLElBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRjs7Ozs7O0lBeENDLHVDQUF3Qjs7Ozs7SUFHUSw2Q0FBNkM7Ozs7O0lBQ3pFLG1DQUFtQjs7Ozs7SUFBRSxzQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QVBQX0lELCBJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSAnLi9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9VUklTOiB7W25zOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgJ3hodG1sJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAneGxpbmsnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICd4bWwnOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcbiAgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyxcbn07XG5cbmNvbnN0IENPTVBPTkVOVF9SRUdFWCA9IC8lQ09NUCUvZztcbmNvbnN0IE5HX0RFVl9NT0RFID0gdHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgISFuZ0Rldk1vZGU7XG5cbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gQ09OVEVOVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBIT1NUX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlblN0eWxlcyhcbiAgICBjb21wSWQ6IHN0cmluZywgc3R5bGVzOiBBcnJheTxhbnl8YW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzdHlsZSA9IHN0eWxlc1tpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlKSkge1xuICAgICAgZmxhdHRlblN0eWxlcyhjb21wSWQsIHN0eWxlLCB0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZSA9IHN0eWxlLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wSWQpO1xuICAgICAgdGFyZ2V0LnB1c2goc3R5bGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gIC8vIGBEZWJ1Z05vZGUudHJpZ2dlckV2ZW50SGFuZGxlcmAgbmVlZHMgdG8ga25vdyBpZiB0aGUgbGlzdGVuZXIgd2FzIGNyZWF0ZWQgd2l0aFxuICAvLyBkZWNvcmF0ZVByZXZlbnREZWZhdWx0IG9yIGlzIGEgbGlzdGVuZXIgYWRkZWQgb3V0c2lkZSB0aGUgQW5ndWxhciBjb250ZXh0IHNvIGl0IGNhbiBoYW5kbGUgdGhlXG4gIC8vIHR3byBkaWZmZXJlbnRseS4gSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBzcGVjaWFsICdfX25nVW53cmFwX18nIHRva2VuIGlzIHBhc3NlZCB0byB0aGUgdW53cmFwXG4gIC8vIHRoZSBsaXN0ZW5lciAoc2VlIGJlbG93KS5cbiAgcmV0dXJuIChldmVudDogYW55KSA9PiB7XG4gICAgLy8gSXZ5IHVzZXMgJ19fbmdVbndyYXBfXycgYXMgYSBzcGVjaWFsIHRva2VuIHRoYXQgYWxsb3dzIHVzIHRvIHVud3JhcCB0aGUgZnVuY3Rpb25cbiAgICAvLyBzbyB0aGF0IGl0IGNhbiBiZSBpbnZva2VkIHByb2dyYW1tYXRpY2FsbHkgYnkgYERlYnVnTm9kZS50cmlnZ2VyRXZlbnRIYW5kbGVyYC4gVGhlIGRlYnVnX25vZGVcbiAgICAvLyBjYW4gaW5zcGVjdCB0aGUgbGlzdGVuZXIgdG9TdHJpbmcgY29udGVudHMgZm9yIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBzcGVjaWFsIHRva2VuLiBCZWNhdXNlXG4gICAgLy8gdGhlIHRva2VuIGlzIGEgc3RyaW5nIGxpdGVyYWwsIGl0IGlzIGVuc3VyZWQgdG8gbm90IGJlIG1vZGlmaWVkIGJ5IGNvbXBpbGVkIGNvZGUuXG4gICAgaWYgKGV2ZW50ID09PSAnX19uZ1Vud3JhcF9fJykge1xuICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlcjtcbiAgICB9XG5cbiAgICBjb25zdCBhbGxvd0RlZmF1bHRCZWhhdmlvciA9IGV2ZW50SGFuZGxlcihldmVudCk7XG4gICAgaWYgKGFsbG93RGVmYXVsdEJlaGF2aW9yID09PSBmYWxzZSkge1xuICAgICAgLy8gVE9ETyh0Ym9zY2gpOiBtb3ZlIHByZXZlbnREZWZhdWx0IGludG8gZXZlbnQgcGx1Z2lucy4uLlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVJlbmRlcmVyRmFjdG9yeTIgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSByZW5kZXJlckJ5Q29tcElkID0gbmV3IE1hcDxzdHJpbmcsIFJlbmRlcmVyMj4oKTtcbiAgcHJpdmF0ZSBkZWZhdWx0UmVuZGVyZXI6IFJlbmRlcmVyMjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIEBJbmplY3QoQVBQX0lEKSBwcml2YXRlIGFwcElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBEZWZhdWx0RG9tUmVuZGVyZXIyKGV2ZW50TWFuYWdlcik7XG4gIH1cblxuICBjcmVhdGVSZW5kZXJlcihlbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMiB7XG4gICAgaWYgKCFlbGVtZW50IHx8ICF0eXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZS5lbmNhcHN1bGF0aW9uKSB7XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkOiB7XG4gICAgICAgIGxldCByZW5kZXJlciA9IHRoaXMucmVuZGVyZXJCeUNvbXBJZC5nZXQodHlwZS5pZCk7XG4gICAgICAgIGlmICghcmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlciA9IG5ldyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIoXG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIHR5cGUsIHRoaXMuYXBwSWQpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgICg8RW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyPnJlbmRlcmVyKS5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgICAgfVxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbTpcbiAgICAgICAgcmV0dXJuIG5ldyBTaGFkb3dEb21SZW5kZXJlcih0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCBlbGVtZW50LCB0eXBlKTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmVyQnlDb21wSWQuaGFzKHR5cGUuaWQpKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyh0eXBlLmlkLCB0eXBlLnN0eWxlcywgW10pO1xuICAgICAgICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHRoaXMuZGVmYXVsdFJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxufVxuXG5jbGFzcyBEZWZhdWx0RG9tUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGU6IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gSW4gY2FzZXMgd2hlcmUgSXZ5IChub3QgVmlld0VuZ2luZSkgaXMgZ2l2aW5nIHVzIHRoZSBhY3R1YWwgbmFtZXNwYWNlLCB0aGUgbG9vayB1cCBieSBrZXlcbiAgICAgIC8vIHdpbGwgcmVzdWx0IGluIHVuZGVmaW5lZCwgc28gd2UganVzdCByZXR1cm4gdGhlIG5hbWVzcGFjZSBoZXJlLlxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdIHx8IG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGxldCBlbDogYW55ID0gdHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPck5vZGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIG5hbWUgPSBuYW1lc3BhY2UgKyAnOicgKyBuYW1lO1xuICAgICAgLy8gVE9ETyhGVy04MTEpOiBJdnkgbWF5IGNhdXNlIGlzc3VlcyBoZXJlIGJlY2F1c2UgaXQncyBwYXNzaW5nIGFyb3VuZFxuICAgICAgLy8gZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzLCB0aGVyZWZvcmUgdGhpcyBsb29rdXAgd2lsbCBmYWlsLlxuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIFRPRE8oRlctODExKTogSXZ5IG1heSBjYXVzZSBpc3N1ZXMgaGVyZSBiZWNhdXNlIGl0J3MgcGFzc2luZyBhcm91bmRcbiAgICAgIC8vIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlcywgdGhlcmVmb3JlIHRoaXMgbG9va3VwIHdpbGwgZmFpbC5cbiAgICAgIGNvbnN0IG5hbWVzcGFjZVVyaSA9IE5BTUVTUEFDRV9VUklTW25hbWVzcGFjZV07XG4gICAgICBpZiAobmFtZXNwYWNlVXJpKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVyaSwgbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKEZXLTgxMSk6IFNpbmNlIGl2eSBpcyBwYXNzaW5nIGFyb3VuZCBmdWxsIFVSSXMgZm9yIG5hbWVzcGFjZXNcbiAgICAgICAgLy8gdGhpcyBjb3VsZCByZXN1bHQgaW4gcHJvcGVydGllcyBsaWtlIGBodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZzpjeD1cIjEyM1wiYCxcbiAgICAgICAgLy8gd2hpY2ggaXMgd3JvbmcuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShgJHtuYW1lc3BhY2V9OiR7bmFtZX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M6IFJlbmRlcmVyU3R5bGVGbGFnczIpOiB2b2lkIHtcbiAgICBpZiAoZmxhZ3MgJiBSZW5kZXJlclN0eWxlRmxhZ3MyLkRhc2hDYXNlKSB7XG4gICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICBzdHlsZSwgdmFsdWUsICEhKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5JbXBvcnRhbnQpID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoc3R5bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSByZXF1aXJlcyAnJyBpbnN0ZWFkIG9mIG51bGxcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy83OTE2XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSAnJztcbiAgICB9XG4gIH1cblxuICBzZXRQcm9wZXJ0eShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBOR19ERVZfTU9ERSAmJiBjaGVja05vU3ludGhldGljUHJvcChuYW1lLCAncHJvcGVydHknKTtcbiAgICBlbFtuYW1lXSA9IHZhbHVlO1xuICB9XG5cbiAgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbm9kZS5ub2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6ICd3aW5kb3cnfCdkb2N1bWVudCd8J2JvZHknfGFueSwgZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuKTpcbiAgICAgICgpID0+IHZvaWQge1xuICAgIE5HX0RFVl9NT0RFICYmIGNoZWNrTm9TeW50aGV0aWNQcm9wKGV2ZW50LCAnbGlzdGVuZXInKTtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiA8KCkgPT4gdm9pZD50aGlzLmV2ZW50TWFuYWdlci5hZGRHbG9iYWxFdmVudExpc3RlbmVyKFxuICAgICAgICAgIHRhcmdldCwgZXZlbnQsIGRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKTtcbiAgICB9XG4gICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICB0YXJnZXQsIGV2ZW50LCBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGNhbGxiYWNrKSkgYXMgKCkgPT4gdm9pZDtcbiAgfVxufVxuXG5jb25zdCBBVF9DSEFSQ09ERSA9ICgoKSA9PiAnQCcuY2hhckNvZGVBdCgwKSkoKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRm91bmQgdGhlIHN5bnRoZXRpYyAke25hbWVLaW5kfSAke1xuICAgICAgICBuYW1lfS4gUGxlYXNlIGluY2x1ZGUgZWl0aGVyIFwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcIiBvciBcIk5vb3BBbmltYXRpb25zTW9kdWxlXCIgaW4geW91ciBhcHBsaWNhdGlvbi5gKTtcbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyLCBhcHBJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkLCBjb21wb25lbnQuc3R5bGVzLCBbXSk7XG4gICAgc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcblxuICAgIHRoaXMuY29udGVudEF0dHIgPSBzaGltQ29udGVudEF0dHJpYnV0ZShhcHBJZCArICctJyArIGNvbXBvbmVudC5pZCk7XG4gICAgdGhpcy5ob3N0QXR0ciA9IHNoaW1Ib3N0QXR0cmlidXRlKGFwcElkICsgJy0nICsgY29tcG9uZW50LmlkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSkge1xuICAgIHN1cGVyLnNldEF0dHJpYnV0ZShlbGVtZW50LCB0aGlzLmhvc3RBdHRyLCAnJyk7XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KHBhcmVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBjb25zdCBlbCA9IHN1cGVyLmNyZWF0ZUVsZW1lbnQocGFyZW50LCBuYW1lKTtcbiAgICBzdXBlci5zZXRBdHRyaWJ1dGUoZWwsIHRoaXMuY29udGVudEF0dHIsICcnKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cbn1cblxuY2xhc3MgU2hhZG93RG9tUmVuZGVyZXIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBzaGFkb3dSb290OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICAgICAgcHJpdmF0ZSBob3N0RWw6IGFueSwgcHJpdmF0ZSBjb21wb25lbnQ6IFJlbmRlcmVyVHlwZTIpIHtcbiAgICBzdXBlcihldmVudE1hbmFnZXIpO1xuICAgIGlmIChjb21wb25lbnQuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QgPSAoaG9zdEVsIGFzIGFueSkuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmNyZWF0ZVNoYWRvd1Jvb3QoKTtcbiAgICB9XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LmFkZEhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXNbaV07XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBub2RlT3JTaGFkb3dSb290KG5vZGU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5vZGUgPT09IHRoaXMuaG9zdEVsID8gdGhpcy5zaGFkb3dSb290IDogbm9kZTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LnJlbW92ZUhvc3QodGhpcy5zaGFkb3dSb290KTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgb2xkQ2hpbGQpO1xuICB9XG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cbn1cbiJdfQ==