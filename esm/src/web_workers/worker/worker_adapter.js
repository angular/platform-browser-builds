import { DomAdapter, setRootDomAdapter } from '../../dom/dom_adapter';
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
export class WorkerDomAdapter extends DomAdapter {
    static makeCurrent() { setRootDomAdapter(new WorkerDomAdapter()); }
    logError(error) {
        if (console.error) {
            console.error(error);
        }
        else {
            console.log(error);
        }
    }
    log(error) { console.log(error); }
    logGroup(error) {
        if (console.group) {
            console.group(error);
            this.logError(error);
        }
        else {
            console.log(error);
        }
    }
    logGroupEnd() {
        if (console.groupEnd) {
            console.groupEnd();
        }
    }
    hasProperty(element, name) { throw "not implemented"; }
    setProperty(el, name, value) { throw "not implemented"; }
    getProperty(el, name) { throw "not implemented"; }
    invoke(el, methodName, args) { throw "not implemented"; }
    getXHR() { throw "not implemented"; }
    get attrToPropMap() { throw "not implemented"; }
    set attrToPropMap(value) { throw "not implemented"; }
    parse(templateHtml) { throw "not implemented"; }
    query(selector) { throw "not implemented"; }
    querySelector(el, selector) { throw "not implemented"; }
    querySelectorAll(el, selector) { throw "not implemented"; }
    on(el, evt, listener) { throw "not implemented"; }
    onAndCancel(el, evt, listener) { throw "not implemented"; }
    dispatchEvent(el, evt) { throw "not implemented"; }
    createMouseEvent(eventType) { throw "not implemented"; }
    createEvent(eventType) { throw "not implemented"; }
    preventDefault(evt) { throw "not implemented"; }
    isPrevented(evt) { throw "not implemented"; }
    getInnerHTML(el) { throw "not implemented"; }
    getTemplateContent(el) { throw "not implemented"; }
    getOuterHTML(el) { throw "not implemented"; }
    nodeName(node) { throw "not implemented"; }
    nodeValue(node) { throw "not implemented"; }
    type(node) { throw "not implemented"; }
    content(node) { throw "not implemented"; }
    firstChild(el) { throw "not implemented"; }
    nextSibling(el) { throw "not implemented"; }
    parentElement(el) { throw "not implemented"; }
    childNodes(el) { throw "not implemented"; }
    childNodesAsList(el) { throw "not implemented"; }
    clearNodes(el) { throw "not implemented"; }
    appendChild(el, node) { throw "not implemented"; }
    removeChild(el, node) { throw "not implemented"; }
    replaceChild(el, newNode, oldNode) { throw "not implemented"; }
    remove(el) { throw "not implemented"; }
    insertBefore(el, node) { throw "not implemented"; }
    insertAllBefore(el, nodes) { throw "not implemented"; }
    insertAfter(el, node) { throw "not implemented"; }
    setInnerHTML(el, value) { throw "not implemented"; }
    getText(el) { throw "not implemented"; }
    setText(el, value) { throw "not implemented"; }
    getValue(el) { throw "not implemented"; }
    setValue(el, value) { throw "not implemented"; }
    getChecked(el) { throw "not implemented"; }
    setChecked(el, value) { throw "not implemented"; }
    createComment(text) { throw "not implemented"; }
    createTemplate(html) { throw "not implemented"; }
    createElement(tagName, doc) { throw "not implemented"; }
    createElementNS(ns, tagName, doc) { throw "not implemented"; }
    createTextNode(text, doc) { throw "not implemented"; }
    createScriptTag(attrName, attrValue, doc) {
        throw "not implemented";
    }
    createStyleElement(css, doc) { throw "not implemented"; }
    createShadowRoot(el) { throw "not implemented"; }
    getShadowRoot(el) { throw "not implemented"; }
    getHost(el) { throw "not implemented"; }
    getDistributedNodes(el) { throw "not implemented"; }
    clone(node) { throw "not implemented"; }
    getElementsByClassName(element, name) { throw "not implemented"; }
    getElementsByTagName(element, name) { throw "not implemented"; }
    classList(element) { throw "not implemented"; }
    addClass(element, className) { throw "not implemented"; }
    removeClass(element, className) { throw "not implemented"; }
    hasClass(element, className) { throw "not implemented"; }
    setStyle(element, styleName, styleValue) { throw "not implemented"; }
    removeStyle(element, styleName) { throw "not implemented"; }
    getStyle(element, styleName) { throw "not implemented"; }
    hasStyle(element, styleName, styleValue) { throw "not implemented"; }
    tagName(element) { throw "not implemented"; }
    attributeMap(element) { throw "not implemented"; }
    hasAttribute(element, attribute) { throw "not implemented"; }
    hasAttributeNS(element, ns, attribute) { throw "not implemented"; }
    getAttribute(element, attribute) { throw "not implemented"; }
    getAttributeNS(element, ns, attribute) { throw "not implemented"; }
    setAttribute(element, name, value) { throw "not implemented"; }
    setAttributeNS(element, ns, name, value) { throw "not implemented"; }
    removeAttribute(element, attribute) { throw "not implemented"; }
    removeAttributeNS(element, ns, attribute) { throw "not implemented"; }
    templateAwareRoot(el) { throw "not implemented"; }
    createHtmlDocument() { throw "not implemented"; }
    defaultDoc() { throw "not implemented"; }
    getBoundingClientRect(el) { throw "not implemented"; }
    getTitle() { throw "not implemented"; }
    setTitle(newTitle) { throw "not implemented"; }
    elementMatches(n, selector) { throw "not implemented"; }
    isTemplateElement(el) { throw "not implemented"; }
    isTextNode(node) { throw "not implemented"; }
    isCommentNode(node) { throw "not implemented"; }
    isElementNode(node) { throw "not implemented"; }
    hasShadowRoot(node) { throw "not implemented"; }
    isShadowRoot(node) { throw "not implemented"; }
    importIntoDoc(node) { throw "not implemented"; }
    adoptNode(node) { throw "not implemented"; }
    getHref(element) { throw "not implemented"; }
    getEventKey(event) { throw "not implemented"; }
    resolveAndSetHref(element, baseUrl, href) { throw "not implemented"; }
    supportsDOMEvents() { throw "not implemented"; }
    supportsNativeShadowDOM() { throw "not implemented"; }
    getGlobalEventTarget(target) { throw "not implemented"; }
    getHistory() { throw "not implemented"; }
    getLocation() { throw "not implemented"; }
    getBaseHref() { throw "not implemented"; }
    resetBaseElement() { throw "not implemented"; }
    getUserAgent() { throw "not implemented"; }
    setData(element, name, value) { throw "not implemented"; }
    getComputedStyle(element) { throw "not implemented"; }
    getData(element, name) { throw "not implemented"; }
    setGlobalVar(name, value) { throw "not implemented"; }
    requestAnimationFrame(callback) { throw "not implemented"; }
    cancelAnimationFrame(id) { throw "not implemented"; }
    performanceNow() { throw "not implemented"; }
    getAnimationPrefix() { throw "not implemented"; }
    getTransitionEnd() { throw "not implemented"; }
    supportsAnimation() { throw "not implemented"; }
}
//# sourceMappingURL=worker_adapter.js.map