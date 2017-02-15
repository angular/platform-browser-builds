/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let /** @type {?} */ _DOM = null;
/**
 * @return {?}
 */
export function getDOM() {
    return _DOM;
}
/**
 * @param {?} adapter
 * @return {?}
 */
export function setDOM(adapter) {
    _DOM = adapter;
}
/**
 * @param {?} adapter
 * @return {?}
 */
export function setRootDomAdapter(adapter) {
    if (!_DOM) {
        _DOM = adapter;
    }
}
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */
export class DomAdapter {
    constructor() {
        this.resourceLoaderType = null;
    }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    logError(error) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    log(error) { }
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */
    logGroup(error) { }
    /**
     * @abstract
     * @return {?}
     */
    logGroupEnd() { }
    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     * @return {?}
     */
    get attrToPropMap() { return this._attrToPropMap; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set attrToPropMap(value) { this._attrToPropMap = value; }
    ;
    /**
     * @abstract
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { }
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) { }
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) { }
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) { }
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { }
    /**
     * Returns content if el is a <template> element, null otherwise.
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    type(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    content(node) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */
    replaceChild(el, newNode, oldNode) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    remove(el) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, ref, node) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, ref, nodes) { }
    /**
     * @abstract
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, el, node) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getText(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getValue(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { }
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { }
    /**
     * @abstract
     * @param {?} text
     * @return {?}
     */
    createComment(text) { }
    /**
     * @abstract
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) { }
    /**
     * @abstract
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) { }
    /**
     * @abstract
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) { }
    /**
     * @abstract
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) { }
    /**
     * @abstract
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc) { }
    /**
     * @abstract
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getHost(el) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getDistributedNodes(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    clone /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    classList(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    removeStyle(element, styleName) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */
    getStyle(element, styleName) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    tagName(element) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    getAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    removeAttributeNS(element, ns, attribute) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { }
    /**
     * @abstract
     * @return {?}
     */
    createHtmlDocument() { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) { }
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { }
    /**
     * @abstract
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { }
    /**
     * @abstract
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) { }
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    importIntoDoc /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */
    adoptNode /*<T extends Node>*/(node) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    getHref(element) { }
    /**
     * @abstract
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */
    resolveAndSetHref(element, baseUrl, href) { }
    /**
     * @abstract
     * @return {?}
     */
    supportsDOMEvents() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsNativeShadowDOM() { }
    /**
     * @abstract
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) { }
    /**
     * @abstract
     * @return {?}
     */
    getHistory() { }
    /**
     * @abstract
     * @return {?}
     */
    getLocation() { }
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) { }
    /**
     * @abstract
     * @return {?}
     */
    resetBaseElement() { }
    /**
     * @abstract
     * @return {?}
     */
    getUserAgent() { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) { }
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { }
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setGlobalVar(name, value) { }
    /**
     * @abstract
     * @return {?}
     */
    supportsWebAnimation() { }
    /**
     * @abstract
     * @return {?}
     */
    performanceNow() { }
    /**
     * @abstract
     * @return {?}
     */
    getAnimationPrefix() { }
    /**
     * @abstract
     * @return {?}
     */
    getTransitionEnd() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsAnimation() { }
    /**
     * @abstract
     * @return {?}
     */
    supportsCookies() { }
    /**
     * @abstract
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { }
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) { }
}
function DomAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    DomAdapter.prototype.resourceLoaderType;
    /**
     * \@internal
     * @type {?}
     */
    DomAdapter.prototype._attrToPropMap;
}
//# sourceMappingURL=dom_adapter.js.map