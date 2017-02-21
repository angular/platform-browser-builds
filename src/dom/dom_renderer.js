/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APP_ID, Inject, Injectable, ViewEncapsulation } from '@angular/core/index';
import { isPresent, stringify } from '../facade/lang';
import { NoOpAnimationPlayer } from '../private_import_core';
import { AnimationDriver } from './animation_driver';
import { DOCUMENT } from './dom_tokens';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
export const /** @type {?} */ NAMESPACE_URIS = {
    'xlink': 'http://www.w3.org/1999/xlink',
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml'
};
const /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
const /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
/**
 * @abstract
 */
export class DomRootRenderer {
    /**
     * @param {?} document
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    constructor(document, eventManager, sharedStylesHost, animationDriver, appId) {
        this.document = document;
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.animationDriver = animationDriver;
        this.appId = appId;
        this.registeredComponents = new Map();
    }
    /**
     * @param {?} componentProto
     * @return {?}
     */
    renderComponent(componentProto) {
        let /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new DomRenderer(this, componentProto, this.animationDriver, `${this.appId}-${componentProto.id}`);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    }
}
function DomRootRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    DomRootRenderer.prototype.registeredComponents;
    /** @type {?} */
    DomRootRenderer.prototype.document;
    /** @type {?} */
    DomRootRenderer.prototype.eventManager;
    /** @type {?} */
    DomRootRenderer.prototype.sharedStylesHost;
    /** @type {?} */
    DomRootRenderer.prototype.animationDriver;
    /** @type {?} */
    DomRootRenderer.prototype.appId;
}
export class DomRootRenderer_ extends DomRootRenderer {
    /**
     * @param {?} _document
     * @param {?} _eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    constructor(_document, _eventManager, sharedStylesHost, animationDriver, appId) {
        super(_document, _eventManager, sharedStylesHost, animationDriver, appId);
    }
}
DomRootRenderer_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRootRenderer_.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: EventManager, },
    { type: DomSharedStylesHost, },
    { type: AnimationDriver, },
    { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
];
function DomRootRenderer__tsickle_Closure_declarations() {
    /** @type {?} */
    DomRootRenderer_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomRootRenderer_.ctorParameters;
}
export const /** @type {?} */ DIRECT_DOM_RENDERER = {
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    },
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    appendChild(node, parent) { parent.appendChild(node); },
    /**
     * @param {?} node
     * @param {?} refNode
     * @return {?}
     */
    insertBefore(node, refNode) { refNode.parentNode.insertBefore(node, refNode); },
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling(node) { return node.nextSibling; },
    /**
     * @param {?} node
     * @return {?}
     */
    parentElement(node) { return (node.parentNode); }
};
export class DomRenderer {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     */
    constructor(_rootRenderer, componentProto, _animationDriver, styleShimId) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this.directRenderer = DIRECT_DOM_RENDERER;
        this._styles = flattenStyles(styleShimId, componentProto.styles, []);
        if (componentProto.encapsulation !== ViewEncapsulation.Native) {
            this._rootRenderer.sharedStylesHost.addStyles(this._styles);
        }
        if (this.componentProto.encapsulation === ViewEncapsulation.Emulated) {
            this._contentAttr = shimContentAttribute(styleShimId);
            this._hostAttr = shimHostAttribute(styleShimId);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    /**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */
    selectRootElement(selectorOrNode, debugInfo) {
        let /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = this._rootRenderer.document.querySelector(selectorOrNode);
            if (!el) {
                throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
            }
        }
        else {
            el = selectorOrNode;
        }
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    }
    /**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    createElement(parent, name, debugInfo) {
        let /** @type {?} */ el;
        if (isNamespaced(name)) {
            const /** @type {?} */ nsAndName = splitNamespace(name);
            el = document.createElementNS((NAMESPACE_URIS)[nsAndName[0]], nsAndName[1]);
        }
        else {
            el = document.createElement(name);
        }
        if (this._contentAttr) {
            el.setAttribute(this._contentAttr, '');
        }
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }
    /**
     * @param {?} hostElement
     * @return {?}
     */
    createViewRoot(hostElement) {
        let /** @type {?} */ nodesParent;
        if (this.componentProto.encapsulation === ViewEncapsulation.Native) {
            nodesParent = ((hostElement)).createShadowRoot();
            this._rootRenderer.sharedStylesHost.addHost(nodesParent);
            for (let /** @type {?} */ i = 0; i < this._styles.length; i++) {
                const /** @type {?} */ styleEl = document.createElement('style');
                styleEl.textContent = this._styles[i];
                nodesParent.appendChild(styleEl);
            }
        }
        else {
            if (this._hostAttr) {
                hostElement.setAttribute(this._hostAttr, '');
            }
            nodesParent = hostElement;
        }
        return nodesParent;
    }
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    createTemplateAnchor(parentElement, debugInfo) {
        const /** @type {?} */ comment = document.createComment(TEMPLATE_COMMENT_TEXT);
        if (parentElement) {
            parentElement.appendChild(comment);
        }
        return comment;
    }
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    createText(parentElement, value, debugInfo) {
        const /** @type {?} */ node = document.createTextNode(value);
        if (parentElement) {
            parentElement.appendChild(node);
        }
        return node;
    }
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    projectNodes(parentElement, nodes) {
        if (!parentElement)
            return;
        appendNodes(parentElement, nodes);
    }
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    attachViewAfter(node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); }
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    detachView(viewRootNodes) {
        for (let /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            const /** @type {?} */ node = viewRootNodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    }
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    destroyView(hostElement, viewAllNodes) {
        if (this.componentProto.encapsulation === ViewEncapsulation.Native && hostElement) {
            this._rootRenderer.sharedStylesHost.removeHost(((hostElement)).shadowRoot);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listen(renderElement, name, callback) {
        return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    listenGlobal(target, name, callback) {
        return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setElementProperty(renderElement, propertyName, propertyValue) {
        ((renderElement))[propertyName] = propertyValue;
    }
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    setElementAttribute(renderElement, attributeName, attributeValue) {
        let /** @type {?} */ attrNs;
        let /** @type {?} */ attrNameWithoutNs = attributeName;
        if (isNamespaced(attributeName)) {
            const /** @type {?} */ nsAndName = splitNamespace(attributeName);
            attrNameWithoutNs = nsAndName[1];
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (isPresent(attributeValue)) {
            if (attrNs) {
                renderElement.setAttributeNS(attrNs, attributeName, attributeValue);
            }
            else {
                renderElement.setAttribute(attributeName, attributeValue);
            }
        }
        else {
            if (isPresent(attrNs)) {
                renderElement.removeAttributeNS(attrNs, attrNameWithoutNs);
            }
            else {
                renderElement.removeAttribute(attributeName);
            }
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    setBindingDebugInfo(renderElement, propertyName, propertyValue) {
        if (renderElement.nodeType === Node.COMMENT_NODE) {
            const /** @type {?} */ existingBindings = renderElement.nodeValue.replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            const /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
            parsedBindings[propertyName] = propertyValue;
            renderElement.nodeValue =
                TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2));
        }
        else {
            // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
            propertyName = propertyName.replace(/\$/g, '_');
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setElementStyle(renderElement, styleName, styleValue) {
        if (isPresent(styleValue)) {
            ((renderElement.style))[styleName] = stringify(styleValue);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            ((renderElement.style))[styleName] = '';
        }
    }
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invokeElementMethod(renderElement, methodName, args) {
        ((renderElement))[methodName].apply(renderElement, args);
    }
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    setText(renderNode, text) { renderNode.nodeValue = text; }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        if (this._rootRenderer.document.body.contains(element)) {
            return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
        }
        return new NoOpAnimationPlayer();
    }
}
function DomRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    DomRenderer.prototype._contentAttr;
    /** @type {?} */
    DomRenderer.prototype._hostAttr;
    /** @type {?} */
    DomRenderer.prototype._styles;
    /** @type {?} */
    DomRenderer.prototype.directRenderer;
    /** @type {?} */
    DomRenderer.prototype._rootRenderer;
    /** @type {?} */
    DomRenderer.prototype.componentProto;
    /** @type {?} */
    DomRenderer.prototype._animationDriver;
}
/**
 * @param {?} sibling
 * @param {?} nodes
 * @return {?}
 */
function moveNodesAfterSibling(sibling, nodes) {
    const /** @type {?} */ parent = sibling.parentNode;
    if (nodes.length > 0 && parent) {
        const /** @type {?} */ nextSibling = sibling.nextSibling;
        if (nextSibling) {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                parent.insertBefore(nodes[i], nextSibling);
            }
        }
        else {
            for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
                parent.appendChild(nodes[i]);
            }
        }
    }
}
/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */
function appendNodes(parent, nodes) {
    for (let /** @type {?} */ i = 0; i < nodes.length; i++) {
        parent.appendChild(nodes[i]);
    }
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
const /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)$/;
/**
 * @param {?} name
 * @return {?}
 */
export function isNamespaced(name) {
    return name[0] === ':';
}
/**
 * @param {?} name
 * @return {?}
 */
export function splitNamespace(name) {
    const /** @type {?} */ match = name.match(NS_PREFIX_RE);
    return [match[1], match[2]];
}
export class DomRendererFactoryV2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     */
    constructor(eventManager, sharedStylesHost) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRendererV2(eventManager);
    }
    ;
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
                    renderer = new EmulatedEncapsulationDomRendererV2(this.eventManager, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                ((renderer)).applyToHost(element);
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
}
DomRendererFactoryV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRendererFactoryV2.ctorParameters = () => [
    { type: EventManager, },
    { type: DomSharedStylesHost, },
];
function DomRendererFactoryV2_tsickle_Closure_declarations() {
    /** @type {?} */
    DomRendererFactoryV2.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomRendererFactoryV2.ctorParameters;
    /** @type {?} */
    DomRendererFactoryV2.prototype.rendererByCompId;
    /** @type {?} */
    DomRendererFactoryV2.prototype.defaultRenderer;
    /** @type {?} */
    DomRendererFactoryV2.prototype.eventManager;
    /** @type {?} */
    DomRendererFactoryV2.prototype.sharedStylesHost;
}
class DefaultDomRendererV2 {
    /**
     * @param {?} eventManager
     */
    constructor(eventManager) {
        this.eventManager = eventManager;
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
            el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
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
            el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
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
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    setStyle(el, style, value, hasVendorPrefix, hasImportant) {
        if (hasVendorPrefix || hasImportant) {
            el.style.setProperty(style, value, hasImportant ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    removeStyle(el, style, hasVendorPrefix) {
        if (hasVendorPrefix) {
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
    setProperty(el, name, value) { el[name] = value; }
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
        if (typeof target === 'string') {
            return (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)));
        }
        return ((this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))));
    }
}
function DefaultDomRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultDomRendererV2.prototype.destroyNode;
    /** @type {?} */
    DefaultDomRendererV2.prototype.eventManager;
}
class EmulatedEncapsulationDomRendererV2 extends DefaultDomRendererV2 {
    /**
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} component
     */
    constructor(eventManager, sharedStylesHost, component) {
        super(eventManager);
        this.component = component;
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
        const /** @type {?} */ el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}
function EmulatedEncapsulationDomRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    EmulatedEncapsulationDomRendererV2.prototype.contentAttr;
    /** @type {?} */
    EmulatedEncapsulationDomRendererV2.prototype.hostAttr;
    /** @type {?} */
    EmulatedEncapsulationDomRendererV2.prototype.component;
}
class ShadowDomRenderer extends DefaultDomRendererV2 {
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
        this.shadowRoot = hostEl.createShadowRoot();
        this.sharedStylesHost.addHost(this.shadowRoot);
        const styles = flattenStyles(component.id, component.styles, []);
        for (let i = 0; i < styles.length; i++) {
            const styleEl = document.createElement('style');
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
//# sourceMappingURL=dom_renderer.js.map