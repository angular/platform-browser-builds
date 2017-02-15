/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { APP_ID, Inject, Injectable, ViewEncapsulation } from '@angular/core';
import { isPresent, stringify } from '../facade/lang';
import { NoOpAnimationPlayer } from '../private_import_core';
import { AnimationDriver } from './animation_driver';
import { DOCUMENT } from './dom_tokens';
import { EventManager } from './events/event_manager';
import { DomSharedStylesHost } from './shared_styles_host';
export var /** @type {?} */ NAMESPACE_URIS = {
    'xlink': 'http://www.w3.org/1999/xlink',
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml'
};
var /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
var /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
/**
 * @abstract
 */
var DomRootRenderer = (function () {
    /**
     * @param {?} document
     * @param {?} eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    function DomRootRenderer(document, eventManager, sharedStylesHost, animationDriver, appId) {
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
    DomRootRenderer.prototype.renderComponent = function (componentProto) {
        var /** @type {?} */ renderer = this.registeredComponents.get(componentProto.id);
        if (!renderer) {
            renderer = new DomRenderer(this, componentProto, this.animationDriver, this.appId + "-" + componentProto.id);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    };
    return DomRootRenderer;
}());
export { DomRootRenderer };
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
var DomRootRenderer_ = (function (_super) {
    __extends(DomRootRenderer_, _super);
    /**
     * @param {?} _document
     * @param {?} _eventManager
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     */
    function DomRootRenderer_(_document, _eventManager, sharedStylesHost, animationDriver, appId) {
        return _super.call(this, _document, _eventManager, sharedStylesHost, animationDriver, appId) || this;
    }
    return DomRootRenderer_;
}(DomRootRenderer));
export { DomRootRenderer_ };
DomRootRenderer_.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRootRenderer_.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: EventManager, },
    { type: DomSharedStylesHost, },
    { type: AnimationDriver, },
    { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
]; };
function DomRootRenderer__tsickle_Closure_declarations() {
    /** @type {?} */
    DomRootRenderer_.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomRootRenderer_.ctorParameters;
}
export var /** @type {?} */ DIRECT_DOM_RENDERER = {
    /**
     * @param {?} node
     * @return {?}
     */
    remove: function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    },
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    appendChild: function (node, parent) { parent.appendChild(node); },
    /**
     * @param {?} node
     * @param {?} refNode
     * @return {?}
     */
    insertBefore: function (node, refNode) { refNode.parentNode.insertBefore(node, refNode); },
    /**
     * @param {?} node
     * @return {?}
     */
    nextSibling: function (node) { return node.nextSibling; },
    /**
     * @param {?} node
     * @return {?}
     */
    parentElement: function (node) { return (node.parentNode); }
};
var DomRenderer = (function () {
    /**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     */
    function DomRenderer(_rootRenderer, componentProto, _animationDriver, styleShimId) {
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
    DomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ el;
        if (typeof selectorOrNode === 'string') {
            el = this._rootRenderer.document.querySelector(selectorOrNode);
            if (!el) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
        return el;
    };
    /**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */
    DomRenderer.prototype.createElement = function (parent, name, debugInfo) {
        var /** @type {?} */ el;
        if (isNamespaced(name)) {
            var /** @type {?} */ nsAndName = splitNamespace(name);
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
    };
    /**
     * @param {?} hostElement
     * @return {?}
     */
    DomRenderer.prototype.createViewRoot = function (hostElement) {
        var /** @type {?} */ nodesParent;
        if (this.componentProto.encapsulation === ViewEncapsulation.Native) {
            nodesParent = ((hostElement)).createShadowRoot();
            for (var /** @type {?} */ i = 0; i < this._styles.length; i++) {
                var /** @type {?} */ styleEl = document.createElement('style');
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
    };
    /**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */
    DomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var /** @type {?} */ comment = document.createComment(TEMPLATE_COMMENT_TEXT);
        if (parentElement) {
            parentElement.appendChild(comment);
        }
        return comment;
    };
    /**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */
    DomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var /** @type {?} */ node = document.createTextNode(value);
        if (parentElement) {
            parentElement.appendChild(node);
        }
        return node;
    };
    /**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    DomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        if (!parentElement)
            return;
        appendNodes(parentElement, nodes);
    };
    /**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    DomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); };
    /**
     * @param {?} viewRootNodes
     * @return {?}
     */
    DomRenderer.prototype.detachView = function (viewRootNodes) {
        for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
            var /** @type {?} */ node = viewRootNodes[i];
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
    };
    /**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    DomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        if (this.componentProto.encapsulation === ViewEncapsulation.Native && hostElement) {
            this._rootRenderer.sharedStylesHost.removeHost(((hostElement)).shadowRoot);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    DomRenderer.prototype.listen = function (renderElement, name, callback) {
        return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
    };
    /**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    DomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        ((renderElement))[propertyName] = propertyValue;
    };
    /**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    DomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var /** @type {?} */ attrNs;
        var /** @type {?} */ attrNameWithoutNs = attributeName;
        if (isNamespaced(attributeName)) {
            var /** @type {?} */ nsAndName = splitNamespace(attributeName);
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
    };
    /**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        if (renderElement.nodeType === Node.COMMENT_NODE) {
            var /** @type {?} */ existingBindings = renderElement.nodeValue.replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            var /** @type {?} */ parsedBindings = JSON.parse(existingBindings[1]);
            parsedBindings[propertyName] = propertyValue;
            renderElement.nodeValue =
                TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(parsedBindings, null, 2));
        }
        else {
            // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
            if (propertyName[propertyName.length - 1] === '$') {
                var /** @type {?} */ attrNode = (createAttributeNode(propertyName).cloneNode(true));
                attrNode.value = propertyValue;
                renderElement.setAttributeNode(attrNode);
            }
            else {
                this.setElementAttribute(renderElement, propertyName, propertyValue);
            }
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    DomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    DomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        if (isPresent(styleValue)) {
            ((renderElement.style))[styleName] = stringify(styleValue);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            ((renderElement.style))[styleName] = '';
        }
    };
    /**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    DomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        ((renderElement))[methodName].apply(renderElement, args);
    };
    /**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    DomRenderer.prototype.setText = function (renderNode, text) { renderNode.nodeValue = text; };
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
    DomRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        if (this._rootRenderer.document.body.contains(element)) {
            return this._animationDriver.animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers);
        }
        return new NoOpAnimationPlayer();
    };
    return DomRenderer;
}());
export { DomRenderer };
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
    var /** @type {?} */ parent = sibling.parentNode;
    if (nodes.length > 0 && parent) {
        var /** @type {?} */ nextSibling = sibling.nextSibling;
        if (nextSibling) {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                parent.insertBefore(nodes[i], nextSibling);
            }
        }
        else {
            for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
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
    for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
        parent.appendChild(nodes[i]);
    }
}
/**
 * @param {?} eventHandler
 * @return {?}
 */
function decoratePreventDefault(eventHandler) {
    return function (event) {
        var /** @type {?} */ allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
    };
}
var /** @type {?} */ COMPONENT_REGEX = /%COMP%/g;
export var /** @type {?} */ COMPONENT_VARIABLE = '%COMP%';
export var /** @type {?} */ HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
export var /** @type {?} */ CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
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
    for (var /** @type {?} */ i = 0; i < styles.length; i++) {
        var /** @type {?} */ style = styles[i];
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
var /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)$/;
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
    var /** @type {?} */ match = name.match(NS_PREFIX_RE);
    return [match[1], match[2]];
}
var /** @type {?} */ attrCache;
/**
 * @param {?} name
 * @return {?}
 */
function createAttributeNode(name) {
    if (!attrCache) {
        attrCache = new Map();
    }
    if (attrCache.has(name)) {
        return attrCache.get(name);
    }
    var /** @type {?} */ div = document.createElement('div');
    div.innerHTML = "<div " + name + ">";
    var /** @type {?} */ attr = div.firstChild.attributes[0];
    attrCache.set(name, attr);
    return attr;
}
var DomRendererV2 = (function () {
    /**
     * @param {?} eventManager
     */
    function DomRendererV2(eventManager) {
        this.eventManager = eventManager;
    }
    ;
    /**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */
    DomRendererV2.prototype.createElement = function (name, namespace, debugInfo) {
        if (namespace) {
            return document.createElementNS(NAMESPACE_URIS[namespace], name);
        }
        return document.createElement(name);
    };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DomRendererV2.prototype.createComment = function (value, debugInfo) { return document.createComment(value); };
    /**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    DomRendererV2.prototype.createText = function (value, debugInfo) { return document.createTextNode(value); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */
    DomRendererV2.prototype.appendChild = function (parent, newChild) { parent.appendChild(newChild); };
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */
    DomRendererV2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    };
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */
    DomRendererV2.prototype.removeChild = function (parent, oldChild) { parent.removeChild(oldChild); };
    /**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    DomRendererV2.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var /** @type {?} */ el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        el.textContent = '';
        return el;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    DomRendererV2.prototype.parentNode = function (node) { return node.parentNode; };
    /**
     * @param {?} node
     * @return {?}
     */
    DomRendererV2.prototype.nextSibling = function (node) { return node.nextSibling; };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    DomRendererV2.prototype.setAttribute = function (el, name, value, namespace) {
        if (namespace) {
            el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
        }
        else {
            el.setAttribute(name, value);
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    DomRendererV2.prototype.removeAttribute = function (el, name, namespace) {
        if (namespace) {
            el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
        }
        else {
            el.removeAttribute(name);
        }
    };
    /**
     * @param {?} el
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    DomRendererV2.prototype.setBindingDebugInfo = function (el, propertyName, propertyValue) {
        if (el.nodeType === Node.COMMENT_NODE) {
            var /** @type {?} */ m = el.nodeValue.replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            var /** @type {?} */ obj = m === null ? {} : JSON.parse(m[1]);
            obj[propertyName] = propertyValue;
            el.nodeValue = TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(obj, null, 2));
        }
        else {
            // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
            if (propertyName[propertyName.length - 1] === '$') {
                var /** @type {?} */ attrNode = (createAttributeNode(propertyName).cloneNode(true));
                attrNode.value = propertyValue;
                el.setAttributeNode(attrNode);
            }
            else {
                this.setAttribute(el, propertyName, propertyValue);
            }
        }
    };
    /**
     * @param {?} el
     * @param {?} propertyName
     * @return {?}
     */
    DomRendererV2.prototype.removeBindingDebugInfo = function (el, propertyName) {
        if (el.nodeType === Node.COMMENT_NODE) {
            var /** @type {?} */ m = el.nodeValue.replace(/\n/g, '').match(TEMPLATE_BINDINGS_EXP);
            var /** @type {?} */ obj = m === null ? {} : JSON.parse(m[1]);
            delete obj[propertyName];
            el.nodeValue = TEMPLATE_COMMENT_TEXT.replace('{}', JSON.stringify(obj, null, 2));
        }
        else {
            // Attribute names with `$` (eg `x-y$`) are valid per spec, but unsupported by some browsers
            if (propertyName[propertyName.length - 1] === '$') {
                var /** @type {?} */ attrNode = (createAttributeNode(propertyName).cloneNode(true));
                attrNode.value = '';
                el.setAttributeNode(attrNode);
            }
            else {
                this.removeAttribute(el, propertyName);
            }
        }
    };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DomRendererV2.prototype.addClass = function (el, name) { el.classList.add(name); };
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    DomRendererV2.prototype.removeClass = function (el, name) { el.classList.remove(name); };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */
    DomRendererV2.prototype.setStyle = function (el, style, value, hasVendorPrefix, hasImportant) {
        el.style[style] = value;
    };
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */
    DomRendererV2.prototype.removeStyle = function (el, style, hasVendorPrefix) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        el.style[style] = '';
    };
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    DomRendererV2.prototype.setProperty = function (el, name, value) { el[name] = value; };
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */
    DomRendererV2.prototype.setText = function (node, value) { node.nodeValue = value; };
    /**
     * @param {?} target
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */
    DomRendererV2.prototype.listen = function (target, event, callback) {
        if (typeof target === 'string') {
            return (this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)));
        }
        return ((this.eventManager.addEventListener(target, event, decoratePreventDefault(callback))));
    };
    return DomRendererV2;
}());
export { DomRendererV2 };
DomRendererV2.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DomRendererV2.ctorParameters = function () { return [
    { type: EventManager, },
]; };
function DomRendererV2_tsickle_Closure_declarations() {
    /** @type {?} */
    DomRendererV2.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    DomRendererV2.ctorParameters;
    /** @type {?} */
    DomRendererV2.prototype.eventManager;
}
//# sourceMappingURL=dom_renderer.js.map