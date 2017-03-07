var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license Angular v4.0.0-rc.2-07122f0
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { PlatformLocation, ɵPLATFORM_BROWSER_ID, CommonModule } from '@angular/common';
import { PLATFORM_INITIALIZER, PLATFORM_ID, Sanitizer, platformCore, createPlatformFactory, ErrorHandler, APP_ID, ApplicationModule, Testability, RendererFactoryV2, NgModule, SkipSelf, Optional, ɵglobal, Injectable, Inject, InjectionToken, APP_INITIALIZER, setTestabilityGetter, ViewEncapsulation, NgZone, SecurityContext, isDevMode, ApplicationRef, Version } from '@angular/core';
import * as core from '@angular/core';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */_DOM = null;
/**
 * @return {?}
 */
function getDOM() {
  return _DOM;
}
/**
 * @param {?} adapter
 * @return {?}
 */
function setRootDomAdapter(adapter) {
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

var DomAdapter = function () {
  function DomAdapter() {
    _classCallCheck(this, DomAdapter);

    this.resourceLoaderType = null;
  }
  /**
   * @abstract
   * @param {?} element
   * @param {?} name
   * @return {?}
   */


  _createClass(DomAdapter, [{
    key: 'hasProperty',
    value: function hasProperty(element, name) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setProperty',
    value: function setProperty(el, name, value) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getProperty',
    value: function getProperty(el, name) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */

  }, {
    key: 'invoke',
    value: function invoke(el, methodName, args) {}
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'logError',
    value: function logError(error) {}
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'log',
    value: function log(error) {}
    /**
     * @abstract
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'logGroup',
    value: function logGroup(error) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'logGroupEnd',
    value: function logGroupEnd() {}
    /**
     * Maps attribute names to their corresponding property names for cases
     * where attribute name doesn't match property name.
     * @return {?}
     */

  }, {
    key: 'parse',

    /**
     * @abstract
     * @param {?} templateHtml
     * @return {?}
     */
    value: function parse(templateHtml) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'querySelector',
    value: function querySelector(el, selector) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'querySelectorAll',
    value: function querySelectorAll(el, selector) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */

  }, {
    key: 'on',
    value: function on(el, evt, listener) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */

  }, {
    key: 'onAndCancel',
    value: function onAndCancel(el, evt, listener) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(el, evt) {}
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */

  }, {
    key: 'createMouseEvent',
    value: function createMouseEvent(eventType) {}
    /**
     * @abstract
     * @param {?} eventType
     * @return {?}
     */

  }, {
    key: 'createEvent',
    value: function createEvent(eventType) {}
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'preventDefault',
    value: function preventDefault(evt) {}
    /**
     * @abstract
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'isPrevented',
    value: function isPrevented(evt) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getInnerHTML',
    value: function getInnerHTML(el) {}
    /**
     * Returns content if el is a <template> element, null otherwise.
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getTemplateContent',
    value: function getTemplateContent(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getOuterHTML',
    value: function getOuterHTML(el) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'nodeName',
    value: function nodeName(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'nodeValue',
    value: function nodeValue(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'type',
    value: function type(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'content',
    value: function content(node) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'firstChild',
    value: function firstChild(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'nextSibling',
    value: function nextSibling(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'parentElement',
    value: function parentElement(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'childNodes',
    value: function childNodes(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'childNodesAsList',
    value: function childNodesAsList(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'clearNodes',
    value: function clearNodes(el) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'appendChild',
    value: function appendChild(el, node) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'removeChild',
    value: function removeChild(el, node) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */

  }, {
    key: 'replaceChild',
    value: function replaceChild(el, newNode, oldNode) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'remove',
    value: function remove(el) {}
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(parent, ref, node) {}
    /**
     * @abstract
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */

  }, {
    key: 'insertAllBefore',
    value: function insertAllBefore(parent, ref, nodes) {}
    /**
     * @abstract
     * @param {?} parent
     * @param {?} el
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'insertAfter',
    value: function insertAfter(parent, el, node) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setInnerHTML',
    value: function setInnerHTML(el, value) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getText',
    value: function getText(el) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setText',
    value: function setText(el, value) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getValue',
    value: function getValue(el) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setValue',
    value: function setValue(el, value) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getChecked',
    value: function getChecked(el) {}
    /**
     * @abstract
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setChecked',
    value: function setChecked(el, value) {}
    /**
     * @abstract
     * @param {?} text
     * @return {?}
     */

  }, {
    key: 'createComment',
    value: function createComment(text) {}
    /**
     * @abstract
     * @param {?} html
     * @return {?}
     */

  }, {
    key: 'createTemplate',
    value: function createTemplate(html) {}
    /**
     * @abstract
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createElement',
    value: function createElement(tagName, doc) {}
    /**
     * @abstract
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createElementNS',
    value: function createElementNS(ns, tagName, doc) {}
    /**
     * @abstract
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createTextNode',
    value: function createTextNode(text, doc) {}
    /**
     * @abstract
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createScriptTag',
    value: function createScriptTag(attrName, attrValue, doc) {}
    /**
     * @abstract
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createStyleElement',
    value: function createStyleElement(css, doc) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'createShadowRoot',
    value: function createShadowRoot(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getShadowRoot',
    value: function getShadowRoot(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getHost',
    value: function getHost(el) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getDistributedNodes',
    value: function getDistributedNodes(el) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'clone',
    value: function clone( /*<T extends Node>*/node) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getElementsByClassName',
    value: function getElementsByClassName(element, name) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getElementsByTagName',
    value: function getElementsByTagName(element, name) {}
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'classList',
    value: function classList(element) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'addClass',
    value: function addClass(element, className) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'removeClass',
    value: function removeClass(element, className) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'hasClass',
    value: function hasClass(element, className) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */

  }, {
    key: 'setStyle',
    value: function setStyle(element, styleName, styleValue) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */

  }, {
    key: 'removeStyle',
    value: function removeStyle(element, styleName) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */

  }, {
    key: 'getStyle',
    value: function getStyle(element, styleName) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */

  }, {
    key: 'hasStyle',
    value: function hasStyle(element, styleName, styleValue) {}
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'tagName',
    value: function tagName(element) {}
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'attributeMap',
    value: function attributeMap(element) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'hasAttribute',
    value: function hasAttribute(element, attribute) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'hasAttributeNS',
    value: function hasAttributeNS(element, ns, attribute) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'getAttribute',
    value: function getAttribute(element, attribute) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'getAttributeNS',
    value: function getAttributeNS(element, ns, attribute) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setAttribute',
    value: function setAttribute(element, name, value) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setAttributeNS',
    value: function setAttributeNS(element, ns, name, value) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(element, attribute) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'removeAttributeNS',
    value: function removeAttributeNS(element, ns, attribute) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'templateAwareRoot',
    value: function templateAwareRoot(el) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'createHtmlDocument',
    value: function createHtmlDocument() {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getBoundingClientRect',
    value: function getBoundingClientRect(el) {}
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */

  }, {
    key: 'getTitle',
    value: function getTitle(doc) {}
    /**
     * @abstract
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */

  }, {
    key: 'setTitle',
    value: function setTitle(doc, newTitle) {}
    /**
     * @abstract
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'elementMatches',
    value: function elementMatches(n, selector) {}
    /**
     * @abstract
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'isTemplateElement',
    value: function isTemplateElement(el) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isTextNode',
    value: function isTextNode(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isCommentNode',
    value: function isCommentNode(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isElementNode',
    value: function isElementNode(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'hasShadowRoot',
    value: function hasShadowRoot(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isShadowRoot',
    value: function isShadowRoot(node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'importIntoDoc',
    value: function importIntoDoc( /*<T extends Node>*/node) {}
    /**
     * @abstract
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'adoptNode',
    value: function adoptNode( /*<T extends Node>*/node) {}
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'getHref',
    value: function getHref(element) {}
    /**
     * @abstract
     * @param {?} event
     * @return {?}
     */

  }, {
    key: 'getEventKey',
    value: function getEventKey(event) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */

  }, {
    key: 'resolveAndSetHref',
    value: function resolveAndSetHref(element, baseUrl, href) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'supportsDOMEvents',
    value: function supportsDOMEvents() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'supportsNativeShadowDOM',
    value: function supportsNativeShadowDOM() {}
    /**
     * @abstract
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */

  }, {
    key: 'getGlobalEventTarget',
    value: function getGlobalEventTarget(doc, target) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'getHistory',
    value: function getHistory() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'getLocation',
    value: function getLocation() {}
    /**
     * @abstract
     * @param {?} doc
     * @return {?}
     */

  }, {
    key: 'getBaseHref',
    value: function getBaseHref(doc) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'resetBaseElement',
    value: function resetBaseElement() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'getUserAgent',
    value: function getUserAgent() {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setData',
    value: function setData(element, name, value) {}
    /**
     * @abstract
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'getComputedStyle',
    value: function getComputedStyle(element) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getData',
    value: function getData(element, name) {}
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setGlobalVar',
    value: function setGlobalVar(name, value) {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'supportsWebAnimation',
    value: function supportsWebAnimation() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'performanceNow',
    value: function performanceNow() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'getAnimationPrefix',
    value: function getAnimationPrefix() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'getTransitionEnd',
    value: function getTransitionEnd() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'supportsAnimation',
    value: function supportsAnimation() {}
    /**
     * @abstract
     * @return {?}
     */

  }, {
    key: 'supportsCookies',
    value: function supportsCookies() {}
    /**
     * @abstract
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getCookie',
    value: function getCookie(name) {}
    /**
     * @abstract
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setCookie',
    value: function setCookie(name, value) {}
  }, {
    key: 'attrToPropMap',
    get: function get() {
      return this._attrToPropMap;
    },

    /**
     * @param {?} value
     * @return {?}
     */
    set: function set(value) {
      this._attrToPropMap = value;
    }
  }]);

  return DomAdapter;
}();

/**
 * Provides DOM operations in any browser environment.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 * @abstract
 */


var GenericBrowserDomAdapter = function (_DomAdapter) {
  _inherits(GenericBrowserDomAdapter, _DomAdapter);

  function GenericBrowserDomAdapter() {
    _classCallCheck(this, GenericBrowserDomAdapter);

    var _this = _possibleConstructorReturn(this, (GenericBrowserDomAdapter.__proto__ || Object.getPrototypeOf(GenericBrowserDomAdapter)).call(this));

    _this._animationPrefix = null;
    _this._transitionEnd = null;
    try {
      var element = _this.createElement('div', document);
      if (_this.getStyle(element, 'animationName') != null) {
        _this._animationPrefix = '';
      } else {
        var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
        for (var i = 0; i < domPrefixes.length; i++) {
          if (_this.getStyle(element, domPrefixes[i] + 'AnimationName') != null) {
            _this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
            break;
          }
        }
      }
      var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
      };
      Object.keys(transEndEventNames).forEach(function (key) {
        if (_this.getStyle(element, key) != null) {
          _this._transitionEnd = transEndEventNames[key];
        }
      });
    } catch (e) {
      _this._animationPrefix = null;
      _this._transitionEnd = null;
    }
    return _this;
  }
  /**
   * @param {?} el
   * @return {?}
   */


  _createClass(GenericBrowserDomAdapter, [{
    key: 'getDistributedNodes',
    value: function getDistributedNodes(el) {
      return el.getDistributedNodes();
    }
    /**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */

  }, {
    key: 'resolveAndSetHref',
    value: function resolveAndSetHref(el, baseUrl, href) {
      el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'supportsDOMEvents',
    value: function supportsDOMEvents() {
      return true;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'supportsNativeShadowDOM',
    value: function supportsNativeShadowDOM() {
      return typeof document.body.createShadowRoot === 'function';
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getAnimationPrefix',
    value: function getAnimationPrefix() {
      return this._animationPrefix ? this._animationPrefix : '';
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getTransitionEnd',
    value: function getTransitionEnd() {
      return this._transitionEnd ? this._transitionEnd : '';
    }
    /**
     * @return {?}
     */

  }, {
    key: 'supportsAnimation',
    value: function supportsAnimation() {
      return this._animationPrefix != null && this._transitionEnd != null;
    }
  }]);

  return GenericBrowserDomAdapter;
}(DomAdapter);

var /** @type {?} */_attrToPropMap = {
  'class': 'className',
  'innerHtml': 'innerHTML',
  'readonly': 'readOnly',
  'tabindex': 'tabIndex'
};
var /** @type {?} */DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var /** @type {?} */_keyMap = {
  // The following values are here for cross-browser compatibility and to match the W3C standard
  // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
  '\b': 'Backspace',
  '\t': 'Tab',
  '\x7F': 'Delete',
  '\x1B': 'Escape',
  'Del': 'Delete',
  'Esc': 'Escape',
  'Left': 'ArrowLeft',
  'Right': 'ArrowRight',
  'Up': 'ArrowUp',
  'Down': 'ArrowDown',
  'Menu': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var /** @type {?} */_chromeNumKeyPadMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6',
  'G': '7',
  'H': '8',
  'I': '9',
  'J': '*',
  'K': '+',
  'M': '-',
  'N': '.',
  'O': '/',
  '\x60': '0',
  '\x90': 'NumLock'
};

var BrowserDomAdapter = function (_GenericBrowserDomAda) {
  _inherits(BrowserDomAdapter, _GenericBrowserDomAda);

  function BrowserDomAdapter() {
    _classCallCheck(this, BrowserDomAdapter);

    return _possibleConstructorReturn(this, (BrowserDomAdapter.__proto__ || Object.getPrototypeOf(BrowserDomAdapter)).apply(this, arguments));
  }

  _createClass(BrowserDomAdapter, [{
    key: 'parse',

    /**
     * @param {?} templateHtml
     * @return {?}
     */
    value: function parse(templateHtml) {
      throw new Error('parse not implemented');
    }
    /**
     * @return {?}
     */

  }, {
    key: 'hasProperty',

    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    value: function hasProperty(element, name) {
      return name in element;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setProperty',
    value: function setProperty(el, name, value) {
      el[name] = value;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getProperty',
    value: function getProperty(el, name) {
      return el[name];
    }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */

  }, {
    key: 'invoke',
    value: function invoke(el, methodName, args) {
      el[methodName].apply(el, _toConsumableArray(args));
    }
    /**
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'logError',
    value: function logError(error) {
      if (window.console) {
        if (console.error) {
          console.error(error);
        } else {
          console.log(error);
        }
      }
    }
    /**
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'log',
    value: function log(error) {
      if (window.console) {
        window.console.log && window.console.log(error);
      }
    }
    /**
     * @param {?} error
     * @return {?}
     */

  }, {
    key: 'logGroup',
    value: function logGroup(error) {
      if (window.console) {
        window.console.group && window.console.group(error);
      }
    }
    /**
     * @return {?}
     */

  }, {
    key: 'logGroupEnd',
    value: function logGroupEnd() {
      if (window.console) {
        window.console.groupEnd && window.console.groupEnd();
      }
    }
    /**
     * @return {?}
     */

  }, {
    key: 'querySelector',

    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    value: function querySelector(el, selector) {
      return el.querySelector(selector);
    }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'querySelectorAll',
    value: function querySelectorAll(el, selector) {
      return el.querySelectorAll(selector);
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */

  }, {
    key: 'on',
    value: function on(el, evt, listener) {
      el.addEventListener(evt, listener, false);
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */

  }, {
    key: 'onAndCancel',
    value: function onAndCancel(el, evt, listener) {
      el.addEventListener(evt, listener, false);
      // Needed to follow Dart's subscription semantic, until fix of
      // https://code.google.com/p/dart/issues/detail?id=17406
      return function () {
        el.removeEventListener(evt, listener, false);
      };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(el, evt) {
      el.dispatchEvent(evt);
    }
    /**
     * @param {?} eventType
     * @return {?}
     */

  }, {
    key: 'createMouseEvent',
    value: function createMouseEvent(eventType) {
      var /** @type {?} */evt = document.createEvent('MouseEvent');
      evt.initEvent(eventType, true, true);
      return evt;
    }
    /**
     * @param {?} eventType
     * @return {?}
     */

  }, {
    key: 'createEvent',
    value: function createEvent(eventType) {
      var /** @type {?} */evt = document.createEvent('Event');
      evt.initEvent(eventType, true, true);
      return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'preventDefault',
    value: function preventDefault(evt) {
      evt.preventDefault();
      evt.returnValue = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */

  }, {
    key: 'isPrevented',
    value: function isPrevented(evt) {
      return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getInnerHTML',
    value: function getInnerHTML(el) {
      return el.innerHTML;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getTemplateContent',
    value: function getTemplateContent(el) {
      return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getOuterHTML',
    value: function getOuterHTML(el) {
      return el.outerHTML;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'nodeName',
    value: function nodeName(node) {
      return node.nodeName;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'nodeValue',
    value: function nodeValue(node) {
      return node.nodeValue;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'type',
    value: function type(node) {
      return node.type;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'content',
    value: function content(node) {
      if (this.hasProperty(node, 'content')) {
        return node.content;
      } else {
        return node;
      }
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'firstChild',
    value: function firstChild(el) {
      return el.firstChild;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'nextSibling',
    value: function nextSibling(el) {
      return el.nextSibling;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'parentElement',
    value: function parentElement(el) {
      return el.parentNode;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'childNodes',
    value: function childNodes(el) {
      return el.childNodes;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'childNodesAsList',
    value: function childNodesAsList(el) {
      var /** @type {?} */childNodes = el.childNodes;
      var /** @type {?} */res = new Array(childNodes.length);
      for (var /** @type {?} */i = 0; i < childNodes.length; i++) {
        res[i] = childNodes[i];
      }
      return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'clearNodes',
    value: function clearNodes(el) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'appendChild',
    value: function appendChild(el, node) {
      el.appendChild(node);
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'removeChild',
    value: function removeChild(el, node) {
      el.removeChild(node);
    }
    /**
     * @param {?} el
     * @param {?} newChild
     * @param {?} oldChild
     * @return {?}
     */

  }, {
    key: 'replaceChild',
    value: function replaceChild(el, newChild, oldChild) {
      el.replaceChild(newChild, oldChild);
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'remove',
    value: function remove(node) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
      return node;
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(parent, ref, node) {
      parent.insertBefore(node, ref);
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */

  }, {
    key: 'insertAllBefore',
    value: function insertAllBefore(parent, ref, nodes) {
      nodes.forEach(function (n) {
        return parent.insertBefore(n, ref);
      });
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'insertAfter',
    value: function insertAfter(parent, ref, node) {
      parent.insertBefore(node, ref.nextSibling);
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setInnerHTML',
    value: function setInnerHTML(el, value) {
      el.innerHTML = value;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getText',
    value: function getText(el) {
      return el.textContent;
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setText',
    value: function setText(el, value) {
      el.textContent = value;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getValue',
    value: function getValue(el) {
      return el.value;
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setValue',
    value: function setValue(el, value) {
      el.value = value;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getChecked',
    value: function getChecked(el) {
      return el.checked;
    }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setChecked',
    value: function setChecked(el, value) {
      el.checked = value;
    }
    /**
     * @param {?} text
     * @return {?}
     */

  }, {
    key: 'createComment',
    value: function createComment(text) {
      return document.createComment(text);
    }
    /**
     * @param {?} html
     * @return {?}
     */

  }, {
    key: 'createTemplate',
    value: function createTemplate(html) {
      var /** @type {?} */t = document.createElement('template');
      t.innerHTML = html;
      return t;
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createElement',
    value: function createElement(tagName) {
      var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return doc.createElement(tagName);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createElementNS',
    value: function createElementNS(ns, tagName) {
      var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      return doc.createElementNS(ns, tagName);
    }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createTextNode',
    value: function createTextNode(text) {
      var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return doc.createTextNode(text);
    }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createScriptTag',
    value: function createScriptTag(attrName, attrValue) {
      var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

      var /** @type {?} */el = doc.createElement('SCRIPT');
      el.setAttribute(attrName, attrValue);
      return el;
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */

  }, {
    key: 'createStyleElement',
    value: function createStyleElement(css) {
      var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      var /** @type {?} */style = doc.createElement('style');
      this.appendChild(style, this.createTextNode(css));
      return style;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'createShadowRoot',
    value: function createShadowRoot(el) {
      return el.createShadowRoot();
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getShadowRoot',
    value: function getShadowRoot(el) {
      return el.shadowRoot;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getHost',
    value: function getHost(el) {
      return el.host;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'clone',
    value: function clone(node) {
      return node.cloneNode(true);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getElementsByClassName',
    value: function getElementsByClassName(element, name) {
      return element.getElementsByClassName(name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getElementsByTagName',
    value: function getElementsByTagName(element, name) {
      return element.getElementsByTagName(name);
    }
    /**
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'classList',
    value: function classList(element) {
      return Array.prototype.slice.call(element.classList, 0);
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'addClass',
    value: function addClass(element, className) {
      element.classList.add(className);
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'removeClass',
    value: function removeClass(element, className) {
      element.classList.remove(className);
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */

  }, {
    key: 'hasClass',
    value: function hasClass(element, className) {
      return element.classList.contains(className);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */

  }, {
    key: 'setStyle',
    value: function setStyle(element, styleName, styleValue) {
      element.style[styleName] = styleValue;
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */

  }, {
    key: 'removeStyle',
    value: function removeStyle(element, stylename) {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      element.style[stylename] = '';
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */

  }, {
    key: 'getStyle',
    value: function getStyle(element, stylename) {
      return element.style[stylename];
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */

  }, {
    key: 'hasStyle',
    value: function hasStyle(element, styleName) {
      var styleValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var /** @type {?} */value = this.getStyle(element, styleName) || '';
      return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'tagName',
    value: function tagName(element) {
      return element.tagName;
    }
    /**
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'attributeMap',
    value: function attributeMap(element) {
      var /** @type {?} */res = new Map();
      var /** @type {?} */elAttrs = element.attributes;
      for (var /** @type {?} */i = 0; i < elAttrs.length; i++) {
        var /** @type {?} */attrib = elAttrs[i];
        res.set(attrib.name, attrib.value);
      }
      return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'hasAttribute',
    value: function hasAttribute(element, attribute) {
      return element.hasAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'hasAttributeNS',
    value: function hasAttributeNS(element, ns, attribute) {
      return element.hasAttributeNS(ns, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'getAttribute',
    value: function getAttribute(element, attribute) {
      return element.getAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getAttributeNS',
    value: function getAttributeNS(element, ns, name) {
      return element.getAttributeNS(ns, name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setAttribute',
    value: function setAttribute(element, name, value) {
      element.setAttribute(name, value);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setAttributeNS',
    value: function setAttributeNS(element, ns, name, value) {
      element.setAttributeNS(ns, name, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(element, attribute) {
      element.removeAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'removeAttributeNS',
    value: function removeAttributeNS(element, ns, name) {
      element.removeAttributeNS(ns, name);
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'templateAwareRoot',
    value: function templateAwareRoot(el) {
      return this.isTemplateElement(el) ? this.content(el) : el;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'createHtmlDocument',
    value: function createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getBoundingClientRect',
    value: function getBoundingClientRect(el) {
      try {
        return el.getBoundingClientRect();
      } catch (e) {
        return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
      }
    }
    /**
     * @param {?} doc
     * @return {?}
     */

  }, {
    key: 'getTitle',
    value: function getTitle(doc) {
      return document.title;
    }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */

  }, {
    key: 'setTitle',
    value: function setTitle(doc, newTitle) {
      document.title = newTitle || '';
    }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'elementMatches',
    value: function elementMatches(n, selector) {
      if (n instanceof HTMLElement) {
        return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
      }
      return false;
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'isTemplateElement',
    value: function isTemplateElement(el) {
      return el instanceof HTMLElement && el.nodeName == 'TEMPLATE';
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isTextNode',
    value: function isTextNode(node) {
      return node.nodeType === Node.TEXT_NODE;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isCommentNode',
    value: function isCommentNode(node) {
      return node.nodeType === Node.COMMENT_NODE;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isElementNode',
    value: function isElementNode(node) {
      return node.nodeType === Node.ELEMENT_NODE;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'hasShadowRoot',
    value: function hasShadowRoot(node) {
      return node.shadowRoot != null && node instanceof HTMLElement;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'isShadowRoot',
    value: function isShadowRoot(node) {
      return node instanceof DocumentFragment;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'importIntoDoc',
    value: function importIntoDoc(node) {
      return document.importNode(this.templateAwareRoot(node), true);
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'adoptNode',
    value: function adoptNode(node) {
      return document.adoptNode(node);
    }
    /**
     * @param {?} el
     * @return {?}
     */

  }, {
    key: 'getHref',
    value: function getHref(el) {
      return el.href;
    }
    /**
     * @param {?} event
     * @return {?}
     */

  }, {
    key: 'getEventKey',
    value: function getEventKey(event) {
      var /** @type {?} */key = event.key;
      if (key == null) {
        key = event.keyIdentifier;
        // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
        // Safari cf
        // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
        if (key == null) {
          return 'Unidentified';
        }
        if (key.startsWith('U+')) {
          key = String.fromCharCode(parseInt(key.substring(2), 16));
          if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
            // There is a bug in Chrome for numeric keypad keys:
            // https://code.google.com/p/chromium/issues/detail?id=155654
            // 1, 2, 3 ... are reported as A, B, C ...
            key = _chromeNumKeyPadMap[key];
          }
        }
      }
      return _keyMap[key] || key;
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */

  }, {
    key: 'getGlobalEventTarget',
    value: function getGlobalEventTarget(doc, target) {
      if (target === 'window') {
        return window;
      }
      if (target === 'document') {
        return document;
      }
      if (target === 'body') {
        return document.body;
      }
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getHistory',
    value: function getHistory() {
      return window.history;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getLocation',
    value: function getLocation() {
      return window.location;
    }
    /**
     * @param {?} doc
     * @return {?}
     */

  }, {
    key: 'getBaseHref',
    value: function getBaseHref(doc) {
      var /** @type {?} */href = getBaseElementHref();
      return href == null ? null : relativePath(href);
    }
    /**
     * @return {?}
     */

  }, {
    key: 'resetBaseElement',
    value: function resetBaseElement() {
      baseElement = null;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getUserAgent',
    value: function getUserAgent() {
      return window.navigator.userAgent;
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setData',
    value: function setData(element, name, value) {
      this.setAttribute(element, 'data-' + name, value);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getData',
    value: function getData(element, name) {
      return this.getAttribute(element, 'data-' + name);
    }
    /**
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'getComputedStyle',
    value: function (_getComputedStyle) {
      function getComputedStyle(_x) {
        return _getComputedStyle.apply(this, arguments);
      }

      getComputedStyle.toString = function () {
        return _getComputedStyle.toString();
      };

      return getComputedStyle;
    }(function (element) {
      return getComputedStyle(element);
    })
    /**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setGlobalVar',
    value: function setGlobalVar(path, value) {
      setValueOnPath(ɵglobal, path, value);
    }
    /**
     * @return {?}
     */

  }, {
    key: 'supportsWebAnimation',
    value: function supportsWebAnimation() {
      return typeof Element.prototype['animate'] === 'function';
    }
    /**
     * @return {?}
     */

  }, {
    key: 'performanceNow',
    value: function performanceNow() {
      // performance.now() is not available in all browsers, see
      // http://caniuse.com/#search=performance.now
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }
    /**
     * @return {?}
     */

  }, {
    key: 'supportsCookies',
    value: function supportsCookies() {
      return true;
    }
    /**
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      return parseCookieValue(document.cookie, name);
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setCookie',
    value: function setCookie(name, value) {
      // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
      // not clear other cookies.
      document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
  }, {
    key: 'attrToPropMap',
    get: function get() {
      return _attrToPropMap;
    }
  }], [{
    key: 'makeCurrent',
    value: function makeCurrent() {
      setRootDomAdapter(new BrowserDomAdapter());
    }
  }]);

  return BrowserDomAdapter;
}(GenericBrowserDomAdapter);

var /** @type {?} */baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
  if (!baseElement) {
    baseElement = document.querySelector('base');
    if (!baseElement) {
      return null;
    }
  }
  return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
var /** @type {?} */urlParsingNode = void 0;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
  if (!urlParsingNode) {
    urlParsingNode = document.createElement('a');
  }
  urlParsingNode.setAttribute('href', url);
  return urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname;
}
/**
 * @param {?} cookieStr
 * @param {?} name
 * @return {?}
 */
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cookieStr.split(';')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var cookie = _step.value;

      var /** @type {?} */eqIndex = cookie.indexOf('=');

      var _ref = eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)],
          _ref2 = _slicedToArray(_ref, 2),
          cookieName = _ref2[0],
          cookieValue = _ref2[1];

      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}
/**
 * @param {?} global
 * @param {?} path
 * @param {?} value
 * @return {?}
 */
function setValueOnPath(global, path, value) {
  var /** @type {?} */parts = path.split('.');
  var /** @type {?} */obj = global;
  while (parts.length > 1) {
    var /** @type {?} */name = parts.shift();
    if (obj.hasOwnProperty(name) && obj[name] != null) {
      obj = obj[name];
    } else {
      obj = obj[name] = {};
    }
  }
  if (obj === undefined || obj === null) {
    obj = {};
  }
  obj[parts.shift()] = value;
}

/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application into a Web Worker).
 *
 * @stable
 */
var /** @type {?} */DOCUMENT = new InjectionToken('DocumentToken');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * @return {?}
 */
function supportsState() {
  return !!window.history.pushState;
}

/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {\@link Location}.
 */

var BrowserPlatformLocation = function (_PlatformLocation) {
  _inherits(BrowserPlatformLocation, _PlatformLocation);

  /**
   * @param {?} _doc
   */
  function BrowserPlatformLocation(_doc) {
    _classCallCheck(this, BrowserPlatformLocation);

    var _this3 = _possibleConstructorReturn(this, (BrowserPlatformLocation.__proto__ || Object.getPrototypeOf(BrowserPlatformLocation)).call(this));

    _this3._doc = _doc;
    _this3._init();
    return _this3;
  }
  /**
   * \@internal
   * @return {?}
   */


  _createClass(BrowserPlatformLocation, [{
    key: '_init',
    value: function _init() {
      this._location = getDOM().getLocation();
      this._history = getDOM().getHistory();
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getBaseHrefFromDOM',

    /**
     * @return {?}
     */
    value: function getBaseHrefFromDOM() {
      return getDOM().getBaseHref(this._doc);
    }
    /**
     * @param {?} fn
     * @return {?}
     */

  }, {
    key: 'onPopState',
    value: function onPopState(fn) {
      getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('popstate', fn, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */

  }, {
    key: 'onHashChange',
    value: function onHashChange(fn) {
      getDOM().getGlobalEventTarget(this._doc, 'window').addEventListener('hashchange', fn, false);
    }
    /**
     * @return {?}
     */

  }, {
    key: 'pushState',

    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */
    value: function pushState(state, title, url) {
      if (supportsState()) {
        this._history.pushState(state, title, url);
      } else {
        this._location.hash = url;
      }
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @return {?}
     */

  }, {
    key: 'replaceState',
    value: function replaceState(state, title, url) {
      if (supportsState()) {
        this._history.replaceState(state, title, url);
      } else {
        this._location.hash = url;
      }
    }
    /**
     * @return {?}
     */

  }, {
    key: 'forward',
    value: function forward() {
      this._history.forward();
    }
    /**
     * @return {?}
     */

  }, {
    key: 'back',
    value: function back() {
      this._history.back();
    }
  }, {
    key: 'location',
    get: function get() {
      return this._location;
    }
  }, {
    key: 'pathname',
    get: function get() {
      return this._location.pathname;
    }
    /**
     * @return {?}
     */
    ,

    /**
     * @param {?} newPath
     * @return {?}
     */
    set: function set(newPath) {
      this._location.pathname = newPath;
    }
  }, {
    key: 'search',
    get: function get() {
      return this._location.search;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'hash',
    get: function get() {
      return this._location.hash;
    }
  }]);

  return BrowserPlatformLocation;
}(PlatformLocation);

BrowserPlatformLocation.decorators = [{ type: Injectable }];
/** @nocollapse */
BrowserPlatformLocation.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

/**
 * A service that can be used to get and add meta tags.
 *
 * \@experimental
 */

var Meta = function () {
  /**
   * @param {?} _doc
   */
  function Meta(_doc) {
    _classCallCheck(this, Meta);

    this._doc = _doc;
    this._dom = getDOM();
  }
  /**
   * @param {?} tag
   * @param {?=} forceCreation
   * @return {?}
   */


  _createClass(Meta, [{
    key: 'addTag',
    value: function addTag(tag) {
      var forceCreation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!tag) return null;
      return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * @param {?} tags
     * @param {?=} forceCreation
     * @return {?}
     */

  }, {
    key: 'addTags',
    value: function addTags(tags) {
      var _this4 = this;

      var forceCreation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!tags) return [];
      return tags.reduce(function (result, tag) {
        if (tag) {
          result.push(_this4._getOrCreateElement(tag, forceCreation));
        }
        return result;
      }, []);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */

  }, {
    key: 'getTag',
    value: function getTag(attrSelector) {
      if (!attrSelector) return null;
      return this._dom.querySelector(this._doc, 'meta[' + attrSelector + ']');
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */

  }, {
    key: 'getTags',
    value: function getTags(attrSelector) {
      if (!attrSelector) return [];
      var /** @type {?} */list /*NodeList*/ = this._dom.querySelectorAll(this._doc, 'meta[' + attrSelector + ']');
      return list ? [].slice.call(list) : [];
    }
    /**
     * @param {?} tag
     * @param {?=} selector
     * @return {?}
     */

  }, {
    key: 'updateTag',
    value: function updateTag(tag, selector) {
      if (!tag) return null;
      selector = selector || this._parseSelector(tag);
      var /** @type {?} */meta = this.getTag(selector);
      if (meta) {
        return this._setMetaElementAttributes(tag, meta);
      }
      return this._getOrCreateElement(tag, true);
    }
    /**
     * @param {?} attrSelector
     * @return {?}
     */

  }, {
    key: 'removeTag',
    value: function removeTag(attrSelector) {
      this.removeTagElement(this.getTag(attrSelector));
    }
    /**
     * @param {?} meta
     * @return {?}
     */

  }, {
    key: 'removeTagElement',
    value: function removeTagElement(meta) {
      if (meta) {
        this._dom.remove(meta);
      }
    }
    /**
     * @param {?} meta
     * @param {?=} forceCreation
     * @return {?}
     */

  }, {
    key: '_getOrCreateElement',
    value: function _getOrCreateElement(meta) {
      var forceCreation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!forceCreation) {
        var /** @type {?} */selector = this._parseSelector(meta);
        var /** @type {?} */elem = this.getTag(selector);
        // It's allowed to have multiple elements with the same name so it's not enough to
        // just check that element with the same name already present on the page. We also need to
        // check if element has tag attributes
        if (elem && this._containsAttributes(meta, elem)) return elem;
      }
      var /** @type {?} */element = this._dom.createElement('meta');
      this._setMetaElementAttributes(meta, element);
      var /** @type {?} */head = this._dom.getElementsByTagName(this._doc, 'head')[0];
      this._dom.appendChild(head, element);
      return element;
    }
    /**
     * @param {?} tag
     * @param {?} el
     * @return {?}
     */

  }, {
    key: '_setMetaElementAttributes',
    value: function _setMetaElementAttributes(tag, el) {
      var _this5 = this;

      Object.keys(tag).forEach(function (prop) {
        return _this5._dom.setAttribute(el, prop, tag[prop]);
      });
      return el;
    }
    /**
     * @param {?} tag
     * @return {?}
     */

  }, {
    key: '_parseSelector',
    value: function _parseSelector(tag) {
      var /** @type {?} */attr = tag.name ? 'name' : 'property';
      return attr + '="' + tag[attr] + '"';
    }
    /**
     * @param {?} tag
     * @param {?} elem
     * @return {?}
     */

  }, {
    key: '_containsAttributes',
    value: function _containsAttributes(tag, elem) {
      var _this6 = this;

      return Object.keys(tag).every(function (key) {
        return _this6._dom.getAttribute(elem, key) === tag[key];
      });
    }
  }]);

  return Meta;
}();

Meta.decorators = [{ type: Injectable }];
/** @nocollapse */
Meta.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

/**
 * An id that identifies a particular application being bootstrapped, that should
 * match across the client/server boundary.
 */
var /** @type {?} */TRANSITION_ID = new InjectionToken('TRANSITION_ID');
/**
 * @param {?} transitionId
 * @param {?} document
 * @return {?}
 */
function bootstrapListenerFactory(transitionId, document) {
  var /** @type {?} */factory = function factory() {
    var /** @type {?} */dom = getDOM();
    var /** @type {?} */styles = Array.prototype.slice.apply(dom.querySelectorAll(document, 'style[ng-transition]'));
    styles.filter(function (el) {
      return dom.getAttribute(el, 'ng-transition') === transitionId;
    }).forEach(function (el) {
      return dom.remove(el);
    });
  };
  return factory;
}
var /** @type {?} */SERVER_TRANSITION_PROVIDERS = [{
  provide: APP_INITIALIZER,
  useFactory: bootstrapListenerFactory,
  deps: [TRANSITION_ID, DOCUMENT],
  multi: true
}];

var BrowserGetTestability = function () {
  function BrowserGetTestability() {
    _classCallCheck(this, BrowserGetTestability);
  }

  _createClass(BrowserGetTestability, [{
    key: 'addToWindow',

    /**
     * @param {?} registry
     * @return {?}
     */
    value: function addToWindow(registry) {
      ɵglobal['getAngularTestability'] = function (elem) {
        var findInAncestors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var /** @type {?} */testability = registry.findTestabilityInTree(elem, findInAncestors);
        if (testability == null) {
          throw new Error('Could not find testability for element.');
        }
        return testability;
      };
      ɵglobal['getAllAngularTestabilities'] = function () {
        return registry.getAllTestabilities();
      };
      ɵglobal['getAllAngularRootElements'] = function () {
        return registry.getAllRootElements();
      };
      var /** @type {?} */whenAllStable = function whenAllStable(callback /** TODO #9100 */) {
        var /** @type {?} */testabilities = ɵglobal['getAllAngularTestabilities']();
        var /** @type {?} */count = testabilities.length;
        var /** @type {?} */didWork = false;
        var /** @type {?} */decrement = function decrement(didWork_ /** TODO #9100 */) {
          didWork = didWork || didWork_;
          count--;
          if (count == 0) {
            callback(didWork);
          }
        };
        testabilities.forEach(function (testability /** TODO #9100 */) {
          testability.whenStable(decrement);
        });
      };
      if (!ɵglobal['frameworkStabilizers']) {
        ɵglobal['frameworkStabilizers'] = [];
      }
      ɵglobal['frameworkStabilizers'].push(whenAllStable);
    }
    /**
     * @param {?} registry
     * @param {?} elem
     * @param {?} findInAncestors
     * @return {?}
     */

  }, {
    key: 'findTestabilityInTree',
    value: function findTestabilityInTree(registry, elem, findInAncestors) {
      if (elem == null) {
        return null;
      }
      var /** @type {?} */t = registry.getTestability(elem);
      if (t != null) {
        return t;
      } else if (!findInAncestors) {
        return null;
      }
      if (getDOM().isShadowRoot(elem)) {
        return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
      }
      return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
    }
  }], [{
    key: 'init',

    /**
     * @return {?}
     */
    value: function init() {
      setTestabilityGetter(new BrowserGetTestability());
    }
  }]);

  return BrowserGetTestability;
}();

/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * \@experimental
 */


var Title = function () {
  /**
   * @param {?} _doc
   */
  function Title(_doc) {
    _classCallCheck(this, Title);

    this._doc = _doc;
  }
  /**
   * Get the title of the current HTML document.
   * @return {?}
   */


  _createClass(Title, [{
    key: 'getTitle',
    value: function getTitle() {
      return getDOM().getTitle(this._doc);
    }
    /**
     * Set the title of the current HTML document.
     * @param {?} newTitle
     * @return {?}
     */

  }, {
    key: 'setTitle',
    value: function setTitle(newTitle) {
      getDOM().setTitle(this._doc, newTitle);
    }
  }]);

  return Title;
}();

Title.decorators = [{ type: Injectable }];
/** @nocollapse */
Title.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

var /** @type {?} */CORE_TOKENS = {
  'ApplicationRef': core.ApplicationRef,
  'NgZone': core.NgZone
};
var /** @type {?} */INSPECT_GLOBAL_NAME = 'ng.probe';
var /** @type {?} */CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {\@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 * @param {?} element
 * @return {?}
 */
function inspectNativeElement(element) {
  return core.getDebugNode(element);
}
/**
 * Deprecated. Use the one from '\@angular/core'.
 * @deprecated
 */

var NgProbeToken =
/**
 * @param {?} name
 * @param {?} token
 */
function NgProbeToken(name, token) {
  _classCallCheck(this, NgProbeToken);

  this.name = name;
  this.token = token;
};
/**
 * @param {?} extraTokens
 * @param {?} coreTokens
 * @return {?}
 */


function _createNgProbe(extraTokens, coreTokens) {
  var /** @type {?} */tokens = (extraTokens || []).concat(coreTokens || []);
  getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
  getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, core.ɵmerge(CORE_TOKENS, _ngProbeTokensToMap(tokens || [])));
  return function () {
    return inspectNativeElement;
  };
}
/**
 * @param {?} tokens
 * @return {?}
 */
function _ngProbeTokensToMap(tokens) {
  return tokens.reduce(function (prev, t) {
    return prev[t.name] = t.token, prev;
  }, {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
var /** @type {?} */ELEMENT_PROBE_PROVIDERS = [{
  provide: core.APP_INITIALIZER,
  useFactory: _createNgProbe,
  deps: [[NgProbeToken, new core.Optional()], [core.NgProbeToken, new core.Optional()]],
  multi: true
}];

/**
 * @stable
 */
var /** @type {?} */EVENT_MANAGER_PLUGINS = new InjectionToken('EventManagerPlugins');
/**
 * \@stable
 */

var EventManager = function () {
  /**
   * @param {?} plugins
   * @param {?} _zone
   */
  function EventManager(plugins, _zone) {
    var _this7 = this;

    _classCallCheck(this, EventManager);

    this._zone = _zone;
    this._eventNameToPlugin = new Map();
    plugins.forEach(function (p) {
      return p.manager = _this7;
    });
    this._plugins = plugins.slice().reverse();
  }
  /**
   * @param {?} element
   * @param {?} eventName
   * @param {?} handler
   * @return {?}
   */


  _createClass(EventManager, [{
    key: 'addEventListener',
    value: function addEventListener(element, eventName, handler) {
      var /** @type {?} */plugin = this._findPluginFor(eventName);
      return plugin.addEventListener(element, eventName, handler);
    }
    /**
     * @param {?} target
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addGlobalEventListener',
    value: function addGlobalEventListener(target, eventName, handler) {
      var /** @type {?} */plugin = this._findPluginFor(eventName);
      return plugin.addGlobalEventListener(target, eventName, handler);
    }
    /**
     * @return {?}
     */

  }, {
    key: 'getZone',
    value: function getZone() {
      return this._zone;
    }
    /**
     * \@internal
     * @param {?} eventName
     * @return {?}
     */

  }, {
    key: '_findPluginFor',
    value: function _findPluginFor(eventName) {
      var /** @type {?} */plugin = this._eventNameToPlugin.get(eventName);
      if (plugin) {
        return plugin;
      }
      var /** @type {?} */plugins = this._plugins;
      for (var /** @type {?} */i = 0; i < plugins.length; i++) {
        var /** @type {?} */_plugin = plugins[i];
        if (_plugin.supports(eventName)) {
          this._eventNameToPlugin.set(eventName, _plugin);
          return _plugin;
        }
      }
      throw new Error('No event manager plugin found for event ' + eventName);
    }
  }]);

  return EventManager;
}();

EventManager.decorators = [{ type: Injectable }];
/** @nocollapse */
EventManager.ctorParameters = function () {
  return [{ type: Array, decorators: [{ type: Inject, args: [EVENT_MANAGER_PLUGINS] }] }, { type: NgZone }];
};
/**
 * @abstract
 */

var EventManagerPlugin = function () {
  /**
   * @param {?} _doc
   */
  function EventManagerPlugin(_doc) {
    _classCallCheck(this, EventManagerPlugin);

    this._doc = _doc;
  }
  /**
   * @abstract
   * @param {?} eventName
   * @return {?}
   */


  _createClass(EventManagerPlugin, [{
    key: 'supports',
    value: function supports(eventName) {}
    /**
     * @abstract
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(element, eventName, handler) {}
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addGlobalEventListener',
    value: function addGlobalEventListener(element, eventName, handler) {
      var /** @type {?} */target = getDOM().getGlobalEventTarget(this._doc, element);
      if (!target) {
        throw new Error('Unsupported event target ' + target + ' for event ' + eventName);
      }
      return this.addEventListener(target, eventName, handler);
    }
  }]);

  return EventManagerPlugin;
}();

var SharedStylesHost = function () {
  function SharedStylesHost() {
    _classCallCheck(this, SharedStylesHost);

    /** @internal */
    this._stylesSet = new Set();
  }
  /**
   * @param {?} styles
   * @return {?}
   */


  _createClass(SharedStylesHost, [{
    key: 'addStyles',
    value: function addStyles(styles) {
      var _this8 = this;

      var /** @type {?} */additions = new Set();
      styles.forEach(function (style) {
        if (!_this8._stylesSet.has(style)) {
          _this8._stylesSet.add(style);
          additions.add(style);
        }
      });
      this.onStylesAdded(additions);
    }
    /**
     * @param {?} additions
     * @return {?}
     */

  }, {
    key: 'onStylesAdded',
    value: function onStylesAdded(additions) {}
    /**
     * @return {?}
     */

  }, {
    key: 'getAllStyles',
    value: function getAllStyles() {
      return Array.from(this._stylesSet);
    }
  }]);

  return SharedStylesHost;
}();

SharedStylesHost.decorators = [{ type: Injectable }];
/** @nocollapse */
SharedStylesHost.ctorParameters = function () {
  return [];
};

var DomSharedStylesHost = function (_SharedStylesHost) {
  _inherits(DomSharedStylesHost, _SharedStylesHost);

  /**
   * @param {?} _doc
   */
  function DomSharedStylesHost(_doc) {
    _classCallCheck(this, DomSharedStylesHost);

    var _this9 = _possibleConstructorReturn(this, (DomSharedStylesHost.__proto__ || Object.getPrototypeOf(DomSharedStylesHost)).call(this));

    _this9._doc = _doc;
    _this9._hostNodes = new Set();
    _this9._styleNodes = new Set();
    _this9._hostNodes.add(_doc.head);
    return _this9;
  }
  /**
   * @param {?} styles
   * @param {?} host
   * @return {?}
   */


  _createClass(DomSharedStylesHost, [{
    key: '_addStylesToHost',
    value: function _addStylesToHost(styles, host) {
      var _this10 = this;

      styles.forEach(function (style) {
        var /** @type {?} */styleEl = _this10._doc.createElement('style');
        styleEl.textContent = style;
        _this10._styleNodes.add(host.appendChild(styleEl));
      });
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */

  }, {
    key: 'addHost',
    value: function addHost(hostNode) {
      this._addStylesToHost(this._stylesSet, hostNode);
      this._hostNodes.add(hostNode);
    }
    /**
     * @param {?} hostNode
     * @return {?}
     */

  }, {
    key: 'removeHost',
    value: function removeHost(hostNode) {
      this._hostNodes.delete(hostNode);
    }
    /**
     * @param {?} additions
     * @return {?}
     */

  }, {
    key: 'onStylesAdded',
    value: function onStylesAdded(additions) {
      var _this11 = this;

      this._hostNodes.forEach(function (hostNode) {
        return _this11._addStylesToHost(additions, hostNode);
      });
    }
    /**
     * @return {?}
     */

  }, {
    key: 'ngOnDestroy',
    value: function ngOnDestroy() {
      this._styleNodes.forEach(function (styleNode) {
        return getDOM().remove(styleNode);
      });
    }
  }]);

  return DomSharedStylesHost;
}(SharedStylesHost);

DomSharedStylesHost.decorators = [{ type: Injectable }];
/** @nocollapse */
DomSharedStylesHost.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

var /** @type {?} */NAMESPACE_URIS = {
  'xlink': 'http://www.w3.org/1999/xlink',
  'svg': 'http://www.w3.org/2000/svg',
  'xhtml': 'http://www.w3.org/1999/xhtml',
  'xml': 'http://www.w3.org/XML/1998/namespace'
};
var /** @type {?} */COMPONENT_REGEX = /%COMP%/g;
var /** @type {?} */COMPONENT_VARIABLE = '%COMP%';
var /** @type {?} */HOST_ATTR = '_nghost-' + COMPONENT_VARIABLE;
var /** @type {?} */CONTENT_ATTR = '_ngcontent-' + COMPONENT_VARIABLE;
/**
 * @param {?} componentShortId
 * @return {?}
 */
function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} componentShortId
 * @return {?}
 */
function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
/**
 * @param {?} compId
 * @param {?} styles
 * @param {?} target
 * @return {?}
 */
function flattenStyles(compId, styles, target) {
  for (var /** @type {?} */i = 0; i < styles.length; i++) {
    var /** @type {?} */style = styles[i];
    if (Array.isArray(style)) {
      flattenStyles(compId, style, target);
    } else {
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
  return function (event) {
    var /** @type {?} */allowDefaultBehavior = eventHandler(event);
    if (allowDefaultBehavior === false) {
      // TODO(tbosch): move preventDefault into event plugins...
      event.preventDefault();
      event.returnValue = false;
    }
  };
}

var DomRendererFactoryV2 = function () {
  /**
   * @param {?} eventManager
   * @param {?} sharedStylesHost
   */
  function DomRendererFactoryV2(eventManager, sharedStylesHost) {
    _classCallCheck(this, DomRendererFactoryV2);

    this.eventManager = eventManager;
    this.sharedStylesHost = sharedStylesHost;
    this.rendererByCompId = new Map();
    this.defaultRenderer = new DefaultDomRendererV2(eventManager);
  }

  _createClass(DomRendererFactoryV2, [{
    key: 'createRenderer',

    /**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */
    value: function createRenderer(element, type) {
      if (!element || !type) {
        return this.defaultRenderer;
      }
      switch (type.encapsulation) {
        case ViewEncapsulation.Emulated:
          {
            var /** @type {?} */renderer = this.rendererByCompId.get(type.id);
            if (!renderer) {
              renderer = new EmulatedEncapsulationDomRendererV2(this.eventManager, this.sharedStylesHost, type);
              this.rendererByCompId.set(type.id, renderer);
            }
            renderer.applyToHost(element);
            return renderer;
          }
        case ViewEncapsulation.Native:
          return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
        default:
          {
            if (!this.rendererByCompId.has(type.id)) {
              var /** @type {?} */styles = flattenStyles(type.id, type.styles, []);
              this.sharedStylesHost.addStyles(styles);
              this.rendererByCompId.set(type.id, this.defaultRenderer);
            }
            return this.defaultRenderer;
          }
      }
    }
  }]);

  return DomRendererFactoryV2;
}();

DomRendererFactoryV2.decorators = [{ type: Injectable }];
/** @nocollapse */
DomRendererFactoryV2.ctorParameters = function () {
  return [{ type: EventManager }, { type: DomSharedStylesHost }];
};

var DefaultDomRendererV2 = function () {
  /**
   * @param {?} eventManager
   */
  function DefaultDomRendererV2(eventManager) {
    _classCallCheck(this, DefaultDomRendererV2);

    this.eventManager = eventManager;
    this.data = Object.create(null);
  }
  /**
   * @return {?}
   */


  _createClass(DefaultDomRendererV2, [{
    key: 'destroy',
    value: function destroy() {}
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */

  }, {
    key: 'createElement',
    value: function createElement(name, namespace) {
      if (namespace) {
        return document.createElementNS(NAMESPACE_URIS[namespace], name);
      }
      return document.createElement(name);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'createComment',
    value: function createComment(value) {
      return document.createComment(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'createText',
    value: function createText(value) {
      return document.createTextNode(value);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */

  }, {
    key: 'appendChild',
    value: function appendChild(parent, newChild) {
      parent.appendChild(newChild);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(parent, newChild, refChild) {
      if (parent) {
        parent.insertBefore(newChild, refChild);
      }
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */

  }, {
    key: 'removeChild',
    value: function removeChild(parent, oldChild) {
      if (parent) {
        parent.removeChild(oldChild);
      }
    }
    /**
     * @param {?} selectorOrNode
     * @return {?}
     */

  }, {
    key: 'selectRootElement',
    value: function selectRootElement(selectorOrNode) {
      var /** @type {?} */el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) : selectorOrNode;
      if (!el) {
        throw new Error('The selector "' + selectorOrNode + '" did not match any elements');
      }
      el.textContent = '';
      return el;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'parentNode',
    value: function parentNode(node) {
      return node.parentNode;
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'nextSibling',
    value: function nextSibling(node) {
      return node.nextSibling;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */

  }, {
    key: 'setAttribute',
    value: function setAttribute(el, name, value, namespace) {
      if (namespace) {
        el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ':' + name, value);
      } else {
        el.setAttribute(name, value);
      }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */

  }, {
    key: 'removeAttribute',
    value: function removeAttribute(el, name, namespace) {
      if (namespace) {
        el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
      } else {
        el.removeAttribute(name);
      }
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'addClass',
    value: function addClass(el, name) {
      el.classList.add(name);
    }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'removeClass',
    value: function removeClass(el, name) {
      el.classList.remove(name);
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */

  }, {
    key: 'setStyle',
    value: function setStyle(el, style, value, hasVendorPrefix, hasImportant) {
      if (hasVendorPrefix || hasImportant) {
        el.style.setProperty(style, value, hasImportant ? 'important' : '');
      } else {
        el.style[style] = value;
      }
    }
    /**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */

  }, {
    key: 'removeStyle',
    value: function removeStyle(el, style, hasVendorPrefix) {
      if (hasVendorPrefix) {
        el.style.removeProperty(style);
      } else {
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

  }, {
    key: 'setProperty',
    value: function setProperty(el, name, value) {
      checkNoSyntheticProp(name, 'property');
      el[name] = value;
    }
    /**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'setValue',
    value: function setValue(node, value) {
      node.nodeValue = value;
    }
    /**
     * @param {?} target
     * @param {?} event
     * @param {?} callback
     * @return {?}
     */

  }, {
    key: 'listen',
    value: function listen(target, event, callback) {
      checkNoSyntheticProp(event, 'listener');
      if (typeof target === 'string') {
        return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
      }
      return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
    }
  }]);

  return DefaultDomRendererV2;
}();

var /** @type {?} */AT_CHARCODE = '@'.charCodeAt(0);
/**
 * @param {?} name
 * @param {?} nameKind
 * @return {?}
 */
function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error('Found the synthetic ' + nameKind + ' ' + name + '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.');
  }
}

var EmulatedEncapsulationDomRendererV2 = function (_DefaultDomRendererV) {
  _inherits(EmulatedEncapsulationDomRendererV2, _DefaultDomRendererV);

  /**
   * @param {?} eventManager
   * @param {?} sharedStylesHost
   * @param {?} component
   */
  function EmulatedEncapsulationDomRendererV2(eventManager, sharedStylesHost, component) {
    _classCallCheck(this, EmulatedEncapsulationDomRendererV2);

    var _this12 = _possibleConstructorReturn(this, (EmulatedEncapsulationDomRendererV2.__proto__ || Object.getPrototypeOf(EmulatedEncapsulationDomRendererV2)).call(this, eventManager));

    _this12.component = component;
    var styles = flattenStyles(component.id, component.styles, []);
    sharedStylesHost.addStyles(styles);
    _this12.contentAttr = shimContentAttribute(component.id);
    _this12.hostAttr = shimHostAttribute(component.id);
    return _this12;
  }
  /**
   * @param {?} element
   * @return {?}
   */


  _createClass(EmulatedEncapsulationDomRendererV2, [{
    key: 'applyToHost',
    value: function applyToHost(element) {
      _get(EmulatedEncapsulationDomRendererV2.prototype.__proto__ || Object.getPrototypeOf(EmulatedEncapsulationDomRendererV2.prototype), 'setAttribute', this).call(this, element, this.hostAttr, '');
    }
    /**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */

  }, {
    key: 'createElement',
    value: function createElement(parent, name) {
      var /** @type {?} */el = _get(EmulatedEncapsulationDomRendererV2.prototype.__proto__ || Object.getPrototypeOf(EmulatedEncapsulationDomRendererV2.prototype), 'createElement', this).call(this, parent, name);
      _get(EmulatedEncapsulationDomRendererV2.prototype.__proto__ || Object.getPrototypeOf(EmulatedEncapsulationDomRendererV2.prototype), 'setAttribute', this).call(this, el, this.contentAttr, '');
      return el;
    }
  }]);

  return EmulatedEncapsulationDomRendererV2;
}(DefaultDomRendererV2);

var ShadowDomRenderer = function (_DefaultDomRendererV2) {
  _inherits(ShadowDomRenderer, _DefaultDomRendererV2);

  /**
   * @param {?} eventManager
   * @param {?} sharedStylesHost
   * @param {?} hostEl
   * @param {?} component
   */
  function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
    _classCallCheck(this, ShadowDomRenderer);

    var _this13 = _possibleConstructorReturn(this, (ShadowDomRenderer.__proto__ || Object.getPrototypeOf(ShadowDomRenderer)).call(this, eventManager));

    _this13.sharedStylesHost = sharedStylesHost;
    _this13.hostEl = hostEl;
    _this13.component = component;
    _this13.shadowRoot = hostEl.createShadowRoot();
    _this13.sharedStylesHost.addHost(_this13.shadowRoot);
    var styles = flattenStyles(component.id, component.styles, []);
    for (var i = 0; i < styles.length; i++) {
      var styleEl = document.createElement('style');
      styleEl.textContent = styles[i];
      _this13.shadowRoot.appendChild(styleEl);
    }
    return _this13;
  }
  /**
   * @param {?} node
   * @return {?}
   */


  _createClass(ShadowDomRenderer, [{
    key: 'nodeOrShadowRoot',
    value: function nodeOrShadowRoot(node) {
      return node === this.hostEl ? this.shadowRoot : node;
    }
    /**
     * @return {?}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */

  }, {
    key: 'appendChild',
    value: function appendChild(parent, newChild) {
      return _get(ShadowDomRenderer.prototype.__proto__ || Object.getPrototypeOf(ShadowDomRenderer.prototype), 'appendChild', this).call(this, this.nodeOrShadowRoot(parent), newChild);
    }
    /**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(parent, newChild, refChild) {
      return _get(ShadowDomRenderer.prototype.__proto__ || Object.getPrototypeOf(ShadowDomRenderer.prototype), 'insertBefore', this).call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    /**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */

  }, {
    key: 'removeChild',
    value: function removeChild(parent, oldChild) {
      return _get(ShadowDomRenderer.prototype.__proto__ || Object.getPrototypeOf(ShadowDomRenderer.prototype), 'removeChild', this).call(this, this.nodeOrShadowRoot(parent), oldChild);
    }
    /**
     * @param {?} node
     * @return {?}
     */

  }, {
    key: 'parentNode',
    value: function parentNode(node) {
      return this.nodeOrShadowRoot(_get(ShadowDomRenderer.prototype.__proto__ || Object.getPrototypeOf(ShadowDomRenderer.prototype), 'parentNode', this).call(this, this.nodeOrShadowRoot(node)));
    }
  }]);

  return ShadowDomRenderer;
}(DefaultDomRendererV2);

var DomEventsPlugin = function (_EventManagerPlugin) {
  _inherits(DomEventsPlugin, _EventManagerPlugin);

  /**
   * @param {?} doc
   */
  function DomEventsPlugin(doc) {
    _classCallCheck(this, DomEventsPlugin);

    return _possibleConstructorReturn(this, (DomEventsPlugin.__proto__ || Object.getPrototypeOf(DomEventsPlugin)).call(this, doc));
  }
  /**
   * @param {?} eventName
   * @return {?}
   */


  _createClass(DomEventsPlugin, [{
    key: 'supports',
    value: function supports(eventName) {
      return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(element, eventName, handler) {
      element.addEventListener(eventName, /** @type {?} */handler, false);
      return function () {
        return element.removeEventListener(eventName, /** @type {?} */handler, false);
      };
    }
  }]);

  return DomEventsPlugin;
}(EventManagerPlugin);

DomEventsPlugin.decorators = [{ type: Injectable }];
/** @nocollapse */
DomEventsPlugin.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

var /** @type {?} */EVENT_NAMES = {
  // pan
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  // pinch
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  // press
  'press': true,
  'pressup': true,
  // rotate
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  // swipe
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  // tap
  'tap': true
};
/**
 * A DI token that you can use to provide{@link HammerGestureConfig} to Angular. Use it to configure
 * Hammer gestures.
 *
 * @experimental
 */
var /** @type {?} */HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * \@experimental
 */

var HammerGestureConfig = function () {
  function HammerGestureConfig() {
    _classCallCheck(this, HammerGestureConfig);

    this.events = [];
    this.overrides = {};
  }
  /**
   * @param {?} element
   * @return {?}
   */


  _createClass(HammerGestureConfig, [{
    key: 'buildHammer',
    value: function buildHammer(element) {
      var /** @type {?} */mc = new Hammer(element);
      mc.get('pinch').set({ enable: true });
      mc.get('rotate').set({ enable: true });
      for (var /** @type {?} */eventName in this.overrides) {
        mc.get(eventName).set(this.overrides[eventName]);
      }
      return mc;
    }
  }]);

  return HammerGestureConfig;
}();

HammerGestureConfig.decorators = [{ type: Injectable }];
/** @nocollapse */
HammerGestureConfig.ctorParameters = function () {
  return [];
};

var HammerGesturesPlugin = function (_EventManagerPlugin2) {
  _inherits(HammerGesturesPlugin, _EventManagerPlugin2);

  /**
   * @param {?} doc
   * @param {?} _config
   */
  function HammerGesturesPlugin(doc, _config) {
    _classCallCheck(this, HammerGesturesPlugin);

    var _this15 = _possibleConstructorReturn(this, (HammerGesturesPlugin.__proto__ || Object.getPrototypeOf(HammerGesturesPlugin)).call(this, doc));

    _this15._config = _config;
    return _this15;
  }
  /**
   * @param {?} eventName
   * @return {?}
   */


  _createClass(HammerGesturesPlugin, [{
    key: 'supports',
    value: function supports(eventName) {
      if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
        return false;
      }
      if (!window.Hammer) {
        throw new Error('Hammer.js is not loaded, can not bind ' + eventName + ' event');
      }
      return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(element, eventName, handler) {
      var _this16 = this;

      var /** @type {?} */zone = this.manager.getZone();
      eventName = eventName.toLowerCase();
      return zone.runOutsideAngular(function () {
        // Creating the manager bind events, must be done outside of angular
        var /** @type {?} */mc = _this16._config.buildHammer(element);
        var /** @type {?} */callback = function callback(eventObj) {
          zone.runGuarded(function () {
            handler(eventObj);
          });
        };
        mc.on(eventName, callback);
        return function () {
          return mc.off(eventName, callback);
        };
      });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */

  }, {
    key: 'isCustomEvent',
    value: function isCustomEvent(eventName) {
      return this._config.events.indexOf(eventName) > -1;
    }
  }]);

  return HammerGesturesPlugin;
}(EventManagerPlugin);

HammerGesturesPlugin.decorators = [{ type: Injectable }];
/** @nocollapse */
HammerGesturesPlugin.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }, { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG] }] }];
};

var /** @type {?} */MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
var /** @type {?} */MODIFIER_KEY_GETTERS = {
  'alt': function alt(event) {
    return event.altKey;
  },
  'control': function control(event) {
    return event.ctrlKey;
  },
  'meta': function meta(event) {
    return event.metaKey;
  },
  'shift': function shift(event) {
    return event.shiftKey;
  }
};
/**
 * \@experimental
 */

var KeyEventsPlugin = function (_EventManagerPlugin3) {
  _inherits(KeyEventsPlugin, _EventManagerPlugin3);

  /**
   * @param {?} doc
   */
  function KeyEventsPlugin(doc) {
    _classCallCheck(this, KeyEventsPlugin);

    return _possibleConstructorReturn(this, (KeyEventsPlugin.__proto__ || Object.getPrototypeOf(KeyEventsPlugin)).call(this, doc));
  }
  /**
   * @param {?} eventName
   * @return {?}
   */


  _createClass(KeyEventsPlugin, [{
    key: 'supports',
    value: function supports(eventName) {
      return KeyEventsPlugin.parseEventName(eventName) != null;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */

  }, {
    key: 'addEventListener',
    value: function addEventListener(element, eventName, handler) {
      var /** @type {?} */parsedEvent = KeyEventsPlugin.parseEventName(eventName);
      var /** @type {?} */outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
      return this.manager.getZone().runOutsideAngular(function () {
        return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
      });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */

  }], [{
    key: 'parseEventName',
    value: function parseEventName(eventName) {
      var /** @type {?} */parts = eventName.toLowerCase().split('.');
      var /** @type {?} */domEventName = parts.shift();
      if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
        return null;
      }
      var /** @type {?} */key = KeyEventsPlugin._normalizeKey(parts.pop());
      var /** @type {?} */fullKey = '';
      MODIFIER_KEYS.forEach(function (modifierName) {
        var /** @type {?} */index = parts.indexOf(modifierName);
        if (index > -1) {
          parts.splice(index, 1);
          fullKey += modifierName + '.';
        }
      });
      fullKey += key;
      if (parts.length != 0 || key.length === 0) {
        // returning null instead of throwing to let another plugin process the event
        return null;
      }
      var /** @type {?} */result = {};
      result['domEventName'] = domEventName;
      result['fullKey'] = fullKey;
      return result;
    }
    /**
     * @param {?} event
     * @return {?}
     */

  }, {
    key: 'getEventFullKey',
    value: function getEventFullKey(event) {
      var /** @type {?} */fullKey = '';
      var /** @type {?} */key = getDOM().getEventKey(event);
      key = key.toLowerCase();
      if (key === ' ') {
        key = 'space'; // for readability
      } else if (key === '.') {
        key = 'dot'; // because '.' is used as a separator in event names
      }
      MODIFIER_KEYS.forEach(function (modifierName) {
        if (modifierName != key) {
          var /** @type {?} */modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
          if (modifierGetter(event)) {
            fullKey += modifierName + '.';
          }
        }
      });
      fullKey += key;
      return fullKey;
    }
    /**
     * @param {?} fullKey
     * @param {?} handler
     * @param {?} zone
     * @return {?}
     */

  }, {
    key: 'eventCallback',
    value: function eventCallback(fullKey, handler, zone) {
      return function (event /** TODO #9100 */) {
        if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
          zone.runGuarded(function () {
            return handler(event);
          });
        }
      };
    }
    /**
     * \@internal
     * @param {?} keyName
     * @return {?}
     */

  }, {
    key: '_normalizeKey',
    value: function _normalizeKey(keyName) {
      // TODO: switch to a Map if the mapping grows too much
      switch (keyName) {
        case 'esc':
          return 'escape';
        default:
          return keyName;
      }
    }
  }]);

  return KeyEventsPlugin;
}(EventManagerPlugin);

KeyEventsPlugin.decorators = [{ type: Injectable }];
/** @nocollapse */
KeyEventsPlugin.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either a protocol in a whitelist (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
var /** @type {?} */SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
/** A pattern that matches safe data URLs. Only matches image, video and audio types. */
var /** @type {?} */DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
/**
 * @param {?} url
 * @return {?}
 */
function sanitizeUrl(url) {
  url = String(url);
  if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;
  if (isDevMode()) {
    getDOM().log('WARNING: sanitizing unsafe URL value ' + url + ' (see http://g.co/ng/security#xss)');
  }
  return 'unsafe:' + url;
}
/**
 * @param {?} srcset
 * @return {?}
 */
function sanitizeSrcset(srcset) {
  srcset = String(srcset);
  return srcset.split(',').map(function (srcset) {
    return sanitizeUrl(srcset.trim());
  }).join(', ');
}

/** A <body> element that can be safely used to parse untrusted HTML. Lazily initialized below. */
var /** @type {?} */inertElement = null;
/** Lazily initialized to make sure the DOM adapter gets set before use. */
var /** @type {?} */DOM = null;
/**
 * Returns an HTML element that is guaranteed to not execute code when creating elements in it.
 * @return {?}
 */
function getInertElement() {
  if (inertElement) return inertElement;
  DOM = getDOM();
  // Prefer using <template> element if supported.
  var /** @type {?} */templateEl = DOM.createElement('template');
  if ('content' in templateEl) return templateEl;
  var /** @type {?} */doc = DOM.createHtmlDocument();
  inertElement = DOM.querySelector(doc, 'body');
  if (inertElement == null) {
    // usually there should be only one body element in the document, but IE doesn't have any, so we
    // need to create one.
    var /** @type {?} */html = DOM.createElement('html', doc);
    inertElement = DOM.createElement('body', doc);
    DOM.appendChild(html, inertElement);
    DOM.appendChild(doc, html);
  }
  return inertElement;
}
/**
 * @param {?} tags
 * @return {?}
 */
function tagSet(tags) {
  var /** @type {?} */res = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = tags.split(',')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var t = _step2.value;

      res[t] = true;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return res;
}
/**
 * @param {...?} sets
 * @return {?}
 */
function merge() {
  var /** @type {?} */res = {};

  for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
    sets[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = sets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var s = _step3.value;

      for (var /** @type {?} */v in s) {
        if (s.hasOwnProperty(v)) res[v] = true;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return res;
}
// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements
// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
var /** @type {?} */VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
var /** @type {?} */OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
var /** @type {?} */OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
var /** @type {?} */OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
// Safe Block Elements - HTML5
var /** @type {?} */BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' + 'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' + 'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
// Inline Elements - HTML5
var /** @type {?} */INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' + 'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' + 'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
var /** @type {?} */VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
// Attributes that have href and hence need to be sanitized
var /** @type {?} */URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
// Attributes that have special href set hence need to be sanitized
var /** @type {?} */SRCSET_ATTRS = tagSet('srcset');
var /** @type {?} */HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' + 'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' + 'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' + 'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' + 'valign,value,vspace,width');
// NB: This currently conciously doesn't support SVG. SVG sanitization has had several security
// issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
// innerHTML is required, SVG attributes should be added here.
// NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
// can be sanitized, but they increase security surface area without a legitimate use case, so they
// are left out here.
var /** @type {?} */VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
/**
 * SanitizingHtmlSerializer serializes a DOM fragment, stripping out any unsafe elements and unsafe
 * attributes.
 */

var SanitizingHtmlSerializer = function () {
  function SanitizingHtmlSerializer() {
    _classCallCheck(this, SanitizingHtmlSerializer);

    this.sanitizedSomething = false;
    this.buf = [];
  }
  /**
   * @param {?} el
   * @return {?}
   */


  _createClass(SanitizingHtmlSerializer, [{
    key: 'sanitizeChildren',
    value: function sanitizeChildren(el) {
      // This cannot use a TreeWalker, as it has to run on Angular's various DOM adapters.
      // However this code never accesses properties off of `document` before deleting its contents
      // again, so it shouldn't be vulnerable to DOM clobbering.
      var /** @type {?} */current = el.firstChild;
      while (current) {
        if (DOM.isElementNode(current)) {
          this.startElement( /** @type {?} */current);
        } else if (DOM.isTextNode(current)) {
          this.chars(DOM.nodeValue(current));
        } else {
          // Strip non-element, non-text nodes.
          this.sanitizedSomething = true;
        }
        if (DOM.firstChild(current)) {
          current = DOM.firstChild(current);
          continue;
        }
        while (current) {
          // Leaving the element. Walk up and to the right, closing tags as we go.
          if (DOM.isElementNode(current)) {
            this.endElement( /** @type {?} */current);
          }
          if (DOM.nextSibling(current)) {
            current = DOM.nextSibling(current);
            break;
          }
          current = DOM.parentElement(current);
        }
      }
      return this.buf.join('');
    }
    /**
     * @param {?} element
     * @return {?}
     */

  }, {
    key: 'startElement',
    value: function startElement(element) {
      var _this18 = this;

      var /** @type {?} */tagName = DOM.nodeName(element).toLowerCase();
      if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
        this.sanitizedSomething = true;
        return;
      }
      this.buf.push('<');
      this.buf.push(tagName);
      DOM.attributeMap(element).forEach(function (value, attrName) {
        var /** @type {?} */lower = attrName.toLowerCase();
        if (!VALID_ATTRS.hasOwnProperty(lower)) {
          _this18.sanitizedSomething = true;
          return;
        }
        // TODO(martinprobst): Special case image URIs for data:image/...
        if (URI_ATTRS[lower]) value = sanitizeUrl(value);
        if (SRCSET_ATTRS[lower]) value = sanitizeSrcset(value);
        _this18.buf.push(' ');
        _this18.buf.push(attrName);
        _this18.buf.push('="');
        _this18.buf.push(encodeEntities(value));
        _this18.buf.push('"');
      });
      this.buf.push('>');
    }
    /**
     * @param {?} current
     * @return {?}
     */

  }, {
    key: 'endElement',
    value: function endElement(current) {
      var /** @type {?} */tagName = DOM.nodeName(current).toLowerCase();
      if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
        this.buf.push('</');
        this.buf.push(tagName);
        this.buf.push('>');
      }
    }
    /**
     * @param {?} chars
     * @return {?}
     */

  }, {
    key: 'chars',
    value: function chars(_chars /** TODO #9100 */) {
      this.buf.push(encodeEntities(_chars));
    }
  }]);

  return SanitizingHtmlSerializer;
}();
// Regular Expressions for parsing tags and attributes


var /** @type {?} */SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
var /** @type {?} */NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param {?} value
 * @return {?}
 */
function encodeEntities(value) {
  return value.replace(/&/g, '&amp;').replace(SURROGATE_PAIR_REGEXP, function (match) {
    var /** @type {?} */hi = match.charCodeAt(0);
    var /** @type {?} */low = match.charCodeAt(1);
    return '&#' + ((hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000) + ';';
  }).replace(NON_ALPHANUMERIC_REGEXP, function (match) {
    return '&#' + match.charCodeAt(0) + ';';
  }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/**
 * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1'
 * attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo').
 *
 * This is undesirable since we don't want to allow any of these custom attributes. This method
 * strips them all.
 * @param {?} el
 * @return {?}
 */
function stripCustomNsAttrs(el) {
  DOM.attributeMap(el).forEach(function (_, attrName) {
    if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
      DOM.removeAttribute(el, attrName);
    }
  });
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = DOM.childNodesAsList(el)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var n = _step4.value;

      if (DOM.isElementNode(n)) stripCustomNsAttrs( /** @type {?} */n);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}
/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 * @param {?} defaultDoc
 * @param {?} unsafeHtmlInput
 * @return {?}
 */
function sanitizeHtml(defaultDoc, unsafeHtmlInput) {
  try {
    var /** @type {?} */containerEl = getInertElement();
    // Make sure unsafeHtml is actually a string (TypeScript types are not enforced at runtime).
    var /** @type {?} */unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : '';
    // mXSS protection. Repeatedly parse the document to make sure it stabilizes, so that a browser
    // trying to auto-correct incorrect HTML cannot cause formerly inert HTML to become dangerous.
    var /** @type {?} */mXSSAttempts = 5;
    var /** @type {?} */parsedHtml = unsafeHtml;
    do {
      if (mXSSAttempts === 0) {
        throw new Error('Failed to sanitize html because the input is unstable');
      }
      mXSSAttempts--;
      unsafeHtml = parsedHtml;
      DOM.setInnerHTML(containerEl, unsafeHtml);
      if (defaultDoc.documentMode) {
        // strip custom-namespaced attributes on IE<=11
        stripCustomNsAttrs(containerEl);
      }
      parsedHtml = DOM.getInnerHTML(containerEl);
    } while (unsafeHtml !== parsedHtml);
    var /** @type {?} */sanitizer = new SanitizingHtmlSerializer();
    var /** @type {?} */safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(containerEl) || containerEl);
    // Clear out the body element.
    var /** @type {?} */parent = DOM.getTemplateContent(containerEl) || containerEl;
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = DOM.childNodesAsList(parent)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var child = _step5.value;

        DOM.removeChild(parent, child);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    if (isDevMode() && sanitizer.sanitizedSomething) {
      DOM.log('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).');
    }
    return safeHtml;
  } catch (e) {
    // In case anything goes wrong, clear out inertElement to reset the entire DOM structure.
    inertElement = null;
    throw e;
  }
}

/**
 * Regular expression for safe style values.
 *
 * Quotes (" and ') are allowed, but a check must be done elsewhere to ensure they're balanced.
 *
 * ',' allows multiple values to be assigned to the same property (e.g. background-attachment or
 * font-family) and hence could allow multiple values to get injected, but that should pose no risk
 * of XSS.
 *
 * The function expression checks only for XSS safety, not for CSS validity.
 *
 * This regular expression was taken from the Closure sanitization library, and augmented for
 * transformation values.
 */
var /** @type {?} */VALUES = '[-,."\'%_!# a-zA-Z0-9]+';
var /** @type {?} */TRANSFORMATION_FNS = '(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?';
var /** @type {?} */COLOR_FNS = '(?:rgb|hsl)a?';
var /** @type {?} */GRADIENTS = '(?:repeating-)?(?:linear|radial)-gradient';
var /** @type {?} */CSS3_FNS = '(?:calc|attr)';
var /** @type {?} */FN_ARGS = '\\([-0-9.%, #a-zA-Z]+\\)';
var /** @type {?} */SAFE_STYLE_VALUE = new RegExp('^(' + VALUES + '|' + ('(?:' + TRANSFORMATION_FNS + '|' + COLOR_FNS + '|' + GRADIENTS + '|' + CSS3_FNS + ')') + (FN_ARGS + ')$'), 'g');
/**
 * Matches a `url(...)` value with an arbitrary argument as long as it does
 * not contain parentheses.
 *
 * The URL value still needs to be sanitized separately.
 *
 * `url(...)` values are a very common use case, e.g. for `background-image`. With carefully crafted
 * CSS style rules, it is possible to construct an information leak with `url` values in CSS, e.g.
 * by observing whether scroll bars are displayed, or character ranges used by a font face
 * definition.
 *
 * Angular only allows binding CSS values (as opposed to entire CSS rules), so it is unlikely that
 * binding a URL value without further cooperation from the page will cause an information leak, and
 * if so, it is just a leak, not a full blown XSS vulnerability.
 *
 * Given the common use case, low likelihood of attack vector, and low impact of an attack, this
 * code is permissive and allows URLs that sanitize otherwise.
 */
var /** @type {?} */URL_RE = /^url\(([^)]+)\)$/;
/**
 * Checks that quotes (" and ') are properly balanced inside a string. Assumes
 * that neither escape (\) nor any other character that could result in
 * breaking out of a string parsing context are allowed;
 * see http://www.w3.org/TR/css3-syntax/#string-token-diagram.
 *
 * This code was taken from the Closure sanitization library.
 * @param {?} value
 * @return {?}
 */
function hasBalancedQuotes(value) {
  var /** @type {?} */outsideSingle = true;
  var /** @type {?} */outsideDouble = true;
  for (var /** @type {?} */i = 0; i < value.length; i++) {
    var /** @type {?} */c = value.charAt(i);
    if (c === '\'' && outsideDouble) {
      outsideSingle = !outsideSingle;
    } else if (c === '"' && outsideSingle) {
      outsideDouble = !outsideDouble;
    }
  }
  return outsideSingle && outsideDouble;
}
/**
 * Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single
 * value) and returns a value that is safe to use in a browser environment.
 * @param {?} value
 * @return {?}
 */
function sanitizeStyle(value) {
  value = String(value).trim(); // Make sure it's actually a string.
  if (!value) return '';
  // Single url(...) values are supported, but only for URLs that sanitize cleanly. See above for
  // reasoning behind this.
  var /** @type {?} */urlMatch = value.match(URL_RE);
  if (urlMatch && sanitizeUrl(urlMatch[1]) === urlMatch[1] || value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) {
    return value; // Safe style values.
  }
  if (isDevMode()) {
    getDOM().log('WARNING: sanitizing unsafe style value ' + value + ' (see http://g.co/ng/security#xss).');
  }
  return 'unsafe';
}

/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * \@security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * \@stable
 * @abstract
 */

var DomSanitizer = function () {
  function DomSanitizer() {
    _classCallCheck(this, DomSanitizer);
  }

  _createClass(DomSanitizer, [{
    key: 'sanitize',

    /**
     * Sanitizes a value for use in the given SecurityContext.
     *
     * If value is trusted for the context, this method will unwrap the contained safe value and use
     * it directly. Otherwise, value will be sanitized to be safe in the given context, for example
     * by replacing URLs that have an unsafe protocol part (such as `javascript:`). The implementation
     * is responsible to make sure that the value can definitely be safely used in the given context.
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    value: function sanitize(context, value) {}
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustHtml',
    value: function bypassSecurityTrustHtml(value) {}
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustStyle',
    value: function bypassSecurityTrustStyle(value) {}
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustScript',
    value: function bypassSecurityTrustScript(value) {}
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustUrl',
    value: function bypassSecurityTrustUrl(value) {}
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustResourceUrl',
    value: function bypassSecurityTrustResourceUrl(value) {}
  }]);

  return DomSanitizer;
}();

var DomSanitizerImpl = function (_DomSanitizer) {
  _inherits(DomSanitizerImpl, _DomSanitizer);

  /**
   * @param {?} _doc
   */
  function DomSanitizerImpl(_doc) {
    _classCallCheck(this, DomSanitizerImpl);

    var _this19 = _possibleConstructorReturn(this, (DomSanitizerImpl.__proto__ || Object.getPrototypeOf(DomSanitizerImpl)).call(this));

    _this19._doc = _doc;
    return _this19;
  }
  /**
   * @param {?} ctx
   * @param {?} value
   * @return {?}
   */


  _createClass(DomSanitizerImpl, [{
    key: 'sanitize',
    value: function sanitize(ctx, value) {
      if (value == null) return null;
      switch (ctx) {
        case SecurityContext.NONE:
          return value;
        case SecurityContext.HTML:
          if (value instanceof SafeHtmlImpl) return value.changingThisBreaksApplicationSecurity;
          this.checkNotSafeValue(value, 'HTML');
          return sanitizeHtml(this._doc, String(value));
        case SecurityContext.STYLE:
          if (value instanceof SafeStyleImpl) return value.changingThisBreaksApplicationSecurity;
          this.checkNotSafeValue(value, 'Style');
          return sanitizeStyle(value);
        case SecurityContext.SCRIPT:
          if (value instanceof SafeScriptImpl) return value.changingThisBreaksApplicationSecurity;
          this.checkNotSafeValue(value, 'Script');
          throw new Error('unsafe value used in a script context');
        case SecurityContext.URL:
          if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
            // Allow resource URLs in URL contexts, they are strictly more trusted.
            return value.changingThisBreaksApplicationSecurity;
          }
          this.checkNotSafeValue(value, 'URL');
          return sanitizeUrl(String(value));
        case SecurityContext.RESOURCE_URL:
          if (value instanceof SafeResourceUrlImpl) {
            return value.changingThisBreaksApplicationSecurity;
          }
          this.checkNotSafeValue(value, 'ResourceURL');
          throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
        default:
          throw new Error('Unexpected SecurityContext ' + ctx + ' (see http://g.co/ng/security#xss)');
      }
    }
    /**
     * @param {?} value
     * @param {?} expectedType
     * @return {?}
     */

  }, {
    key: 'checkNotSafeValue',
    value: function checkNotSafeValue(value, expectedType) {
      if (value instanceof SafeValueImpl) {
        throw new Error('Required a safe ' + expectedType + ', got a ' + value.getTypeName() + ' ' + '(see http://g.co/ng/security#xss)');
      }
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustHtml',
    value: function bypassSecurityTrustHtml(value) {
      return new SafeHtmlImpl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustStyle',
    value: function bypassSecurityTrustStyle(value) {
      return new SafeStyleImpl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustScript',
    value: function bypassSecurityTrustScript(value) {
      return new SafeScriptImpl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustUrl',
    value: function bypassSecurityTrustUrl(value) {
      return new SafeUrlImpl(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */

  }, {
    key: 'bypassSecurityTrustResourceUrl',
    value: function bypassSecurityTrustResourceUrl(value) {
      return new SafeResourceUrlImpl(value);
    }
  }]);

  return DomSanitizerImpl;
}(DomSanitizer);

DomSanitizerImpl.decorators = [{ type: Injectable }];
/** @nocollapse */
DomSanitizerImpl.ctorParameters = function () {
  return [{ type: undefined, decorators: [{ type: Inject, args: [DOCUMENT] }] }];
};
/**
 * @abstract
 */

var SafeValueImpl = function () {
  /**
   * @param {?} changingThisBreaksApplicationSecurity
   */
  function SafeValueImpl(changingThisBreaksApplicationSecurity) {
    _classCallCheck(this, SafeValueImpl);

    this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
    // empty
  }
  /**
   * @abstract
   * @return {?}
   */


  _createClass(SafeValueImpl, [{
    key: 'getTypeName',
    value: function getTypeName() {}
    /**
     * @return {?}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return 'SafeValue must use [property]=binding: ' + this.changingThisBreaksApplicationSecurity + ' (see http://g.co/ng/security#xss)';
    }
  }]);

  return SafeValueImpl;
}();

var SafeHtmlImpl = function (_SafeValueImpl) {
  _inherits(SafeHtmlImpl, _SafeValueImpl);

  function SafeHtmlImpl() {
    _classCallCheck(this, SafeHtmlImpl);

    return _possibleConstructorReturn(this, (SafeHtmlImpl.__proto__ || Object.getPrototypeOf(SafeHtmlImpl)).apply(this, arguments));
  }

  _createClass(SafeHtmlImpl, [{
    key: 'getTypeName',

    /**
     * @return {?}
     */
    value: function getTypeName() {
      return 'HTML';
    }
  }]);

  return SafeHtmlImpl;
}(SafeValueImpl);

var SafeStyleImpl = function (_SafeValueImpl2) {
  _inherits(SafeStyleImpl, _SafeValueImpl2);

  function SafeStyleImpl() {
    _classCallCheck(this, SafeStyleImpl);

    return _possibleConstructorReturn(this, (SafeStyleImpl.__proto__ || Object.getPrototypeOf(SafeStyleImpl)).apply(this, arguments));
  }

  _createClass(SafeStyleImpl, [{
    key: 'getTypeName',

    /**
     * @return {?}
     */
    value: function getTypeName() {
      return 'Style';
    }
  }]);

  return SafeStyleImpl;
}(SafeValueImpl);

var SafeScriptImpl = function (_SafeValueImpl3) {
  _inherits(SafeScriptImpl, _SafeValueImpl3);

  function SafeScriptImpl() {
    _classCallCheck(this, SafeScriptImpl);

    return _possibleConstructorReturn(this, (SafeScriptImpl.__proto__ || Object.getPrototypeOf(SafeScriptImpl)).apply(this, arguments));
  }

  _createClass(SafeScriptImpl, [{
    key: 'getTypeName',

    /**
     * @return {?}
     */
    value: function getTypeName() {
      return 'Script';
    }
  }]);

  return SafeScriptImpl;
}(SafeValueImpl);

var SafeUrlImpl = function (_SafeValueImpl4) {
  _inherits(SafeUrlImpl, _SafeValueImpl4);

  function SafeUrlImpl() {
    _classCallCheck(this, SafeUrlImpl);

    return _possibleConstructorReturn(this, (SafeUrlImpl.__proto__ || Object.getPrototypeOf(SafeUrlImpl)).apply(this, arguments));
  }

  _createClass(SafeUrlImpl, [{
    key: 'getTypeName',

    /**
     * @return {?}
     */
    value: function getTypeName() {
      return 'URL';
    }
  }]);

  return SafeUrlImpl;
}(SafeValueImpl);

var SafeResourceUrlImpl = function (_SafeValueImpl5) {
  _inherits(SafeResourceUrlImpl, _SafeValueImpl5);

  function SafeResourceUrlImpl() {
    _classCallCheck(this, SafeResourceUrlImpl);

    return _possibleConstructorReturn(this, (SafeResourceUrlImpl.__proto__ || Object.getPrototypeOf(SafeResourceUrlImpl)).apply(this, arguments));
  }

  _createClass(SafeResourceUrlImpl, [{
    key: 'getTypeName',

    /**
     * @return {?}
     */
    value: function getTypeName() {
      return 'ResourceURL';
    }
  }]);

  return SafeResourceUrlImpl;
}(SafeValueImpl);

var /** @type {?} */INTERNAL_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_ID, useValue: ɵPLATFORM_BROWSER_ID }, { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true }, { provide: PlatformLocation, useClass: BrowserPlatformLocation }, { provide: DOCUMENT, useFactory: _document, deps: [] }];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
var /** @type {?} */BROWSER_SANITIZATION_PROVIDERS = [{ provide: Sanitizer, useExisting: DomSanitizer }, { provide: DomSanitizer, useClass: DomSanitizerImpl }];
/**
 * @stable
 */
var /** @type {?} */platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
/**
 * @return {?}
 */
function initDomAdapter() {
  BrowserDomAdapter.makeCurrent();
  BrowserGetTestability.init();
}
/**
 * @return {?}
 */
function errorHandler() {
  return new ErrorHandler();
}
/**
 * @return {?}
 */
function _document() {
  return document;
}
/**
 * The ng module for the browser.
 *
 * \@stable
 */

var BrowserModule = function () {
  /**
   * @param {?} parentModule
   */
  function BrowserModule(parentModule) {
    _classCallCheck(this, BrowserModule);

    if (parentModule) {
      throw new Error('BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.');
    }
  }
  /**
   * Configures a browser-based application to transition from a server-rendered app, if
   * one is present on the page. The specified parameters must include an application id,
   * which must match between the client and server applications.
   *
   * \@experimental
   * @param {?} params
   * @return {?}
   */


  _createClass(BrowserModule, null, [{
    key: 'withServerTransition',
    value: function withServerTransition(params) {
      return {
        ngModule: BrowserModule,
        providers: [{ provide: APP_ID, useValue: params.appId }, { provide: TRANSITION_ID, useExisting: APP_ID }, SERVER_TRANSITION_PROVIDERS]
      };
    }
  }]);

  return BrowserModule;
}();

BrowserModule.decorators = [{ type: NgModule, args: [{
    providers: [BROWSER_SANITIZATION_PROVIDERS, { provide: ErrorHandler, useFactory: errorHandler, deps: [] }, { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true }, { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true }, { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true }, { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }, DomRendererFactoryV2, { provide: RendererFactoryV2, useExisting: DomRendererFactoryV2 }, { provide: SharedStylesHost, useExisting: DomSharedStylesHost }, DomSharedStylesHost, Testability, EventManager, ELEMENT_PROBE_PROVIDERS, Meta, Title],
    exports: [CommonModule, ApplicationModule]
  }] }];
/** @nocollapse */
BrowserModule.ctorParameters = function () {
  return [{ type: BrowserModule, decorators: [{ type: Optional }, { type: SkipSelf }] }];
};

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var /** @type {?} */win = typeof window !== 'undefined' && window || {};

var ChangeDetectionPerfRecord =
/**
 * @param {?} msPerTick
 * @param {?} numTicks
 */
function ChangeDetectionPerfRecord(msPerTick, numTicks) {
  _classCallCheck(this, ChangeDetectionPerfRecord);

  this.msPerTick = msPerTick;
  this.numTicks = numTicks;
};
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */


var AngularProfiler = function () {
  /**
   * @param {?} ref
   */
  function AngularProfiler(ref) {
    _classCallCheck(this, AngularProfiler);

    this.appRef = ref.injector.get(ApplicationRef);
  }
  /**
   * Exercises change detection in a loop and then prints the average amount of
   * time in milliseconds how long a single round of change detection takes for
   * the current state of the UI. It runs a minimum of 5 rounds for a minimum
   * of 500 milliseconds.
   *
   * Optionally, a user may pass a `config` parameter containing a map of
   * options. Supported options are:
   *
   * `record` (boolean) - causes the profiler to record a CPU profile while
   * it exercises the change detector. Example:
   *
   * ```
   * ng.profiler.timeChangeDetection({record: true})
   * ```
   * @param {?} config
   * @return {?}
   */


  _createClass(AngularProfiler, [{
    key: 'timeChangeDetection',
    value: function timeChangeDetection(config) {
      var /** @type {?} */record = config && config['record'];
      var /** @type {?} */profileName = 'Change Detection';
      // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
      var /** @type {?} */isProfilerAvailable = win.console.profile != null;
      if (record && isProfilerAvailable) {
        win.console.profile(profileName);
      }
      var /** @type {?} */start = getDOM().performanceNow();
      var /** @type {?} */numTicks = 0;
      while (numTicks < 5 || getDOM().performanceNow() - start < 500) {
        this.appRef.tick();
        numTicks++;
      }
      var /** @type {?} */end = getDOM().performanceNow();
      if (record && isProfilerAvailable) {
        // need to cast to <any> because type checker thinks there's no argument
        // while in fact there is:
        //
        // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
        win.console.profileEnd(profileName);
      }
      var /** @type {?} */msPerTick = (end - start) / numTicks;
      win.console.log('ran ' + numTicks + ' change detection cycles');
      win.console.log(msPerTick.toFixed(2) + ' ms per check');
      return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
  }]);

  return AngularProfiler;
}();

var /** @type {?} */PROFILER_GLOBAL_NAME = 'ng.profiler';
/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * \@experimental All debugging apis are currently experimental.
 * @param {?} ref
 * @return {?}
 */
function enableDebugTools(ref) {
  getDOM().setGlobalVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
/**
 * Disables Angular tools.
 *
 * \@experimental All debugging apis are currently experimental.
 * @return {?}
 */
function disableDebugTools() {
  getDOM().setGlobalVar(PROFILER_GLOBAL_NAME, null);
}

/**
 * Predicates for use with {\@link DebugElement}'s query functions.
 *
 * \@experimental All debugging apis are currently experimental.
 */

var By = function () {
  function By() {
    _classCallCheck(this, By);
  }

  _createClass(By, null, [{
    key: 'all',

    /**
     * Match all elements.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     * @return {?}
     */
    value: function all() {
      return function (debugElement) {
        return true;
      };
    }
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     * @param {?} selector
     * @return {?}
     */

  }, {
    key: 'css',
    value: function css(selector) {
      return function (debugElement) {
        return debugElement.nativeElement != null ? getDOM().elementMatches(debugElement.nativeElement, selector) : false;
      };
    }
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {\@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     * @param {?} type
     * @return {?}
     */

  }, {
    key: 'directive',
    value: function directive(type) {
      return function (debugElement) {
        return debugElement.providerTokens.indexOf(type) !== -1;
      };
    }
  }]);

  return By;
}();

/**
 * @stable
 */


var /** @type {?} */VERSION = new Version('4.0.0-rc.2-07122f0');

export { BrowserModule, platformBrowser, Meta, Title, disableDebugTools, enableDebugTools, By, NgProbeToken, DOCUMENT, EVENT_MANAGER_PLUGINS, EventManager, HAMMER_GESTURE_CONFIG, HammerGestureConfig, DomSanitizer, VERSION, BROWSER_SANITIZATION_PROVIDERS as ɵBROWSER_SANITIZATION_PROVIDERS, INTERNAL_BROWSER_PLATFORM_PROVIDERS as ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS, initDomAdapter as ɵinitDomAdapter, BrowserDomAdapter as ɵBrowserDomAdapter, setValueOnPath as ɵsetValueOnPath, BrowserPlatformLocation as ɵBrowserPlatformLocation, TRANSITION_ID as ɵTRANSITION_ID, BrowserGetTestability as ɵBrowserGetTestability, ELEMENT_PROBE_PROVIDERS as ɵELEMENT_PROBE_PROVIDERS, DomAdapter as ɵDomAdapter, getDOM as ɵgetDOM, setRootDomAdapter as ɵsetRootDomAdapter, DomRendererFactoryV2 as ɵDomRendererFactoryV2, NAMESPACE_URIS as ɵNAMESPACE_URIS, flattenStyles as ɵflattenStyles, shimContentAttribute as ɵshimContentAttribute, shimHostAttribute as ɵshimHostAttribute, DomEventsPlugin as ɵDomEventsPlugin, HammerGesturesPlugin as ɵHammerGesturesPlugin, KeyEventsPlugin as ɵKeyEventsPlugin, DomSharedStylesHost as ɵDomSharedStylesHost, SharedStylesHost as ɵSharedStylesHost, _document as ɵb, errorHandler as ɵa, GenericBrowserDomAdapter as ɵh, SERVER_TRANSITION_PROVIDERS as ɵg, bootstrapListenerFactory as ɵf, _createNgProbe as ɵc, EventManagerPlugin as ɵd, DomSanitizerImpl as ɵe };
