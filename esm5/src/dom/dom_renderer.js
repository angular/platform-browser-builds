import * as tslib_1 from "tslib";
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
import * as i0 from "@angular/core";
import * as i1 from "./events/event_manager";
import * as i2 from "./shared_styles_host";
export var NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
};
var COMPONENT_REGEX = /%COMP%/g;
export var COMPONENT_VARIABLE = '%COMP%';
export var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
export var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
export function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
export function flattenStyles(compId, styles, target) {
    for (var i = 0; i < styles.length; i++) {
        var style = styles[i];
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
function decoratePreventDefault(eventHandler) {
    return function (event) {
        var allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            event.preventDefault();
            event.returnValue = false;
        }
    };
}
var DomRendererFactory2 = /** @class */ (function () {
    function DomRendererFactory2(eventManager, sharedStylesHost) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = new Map();
        this.defaultRenderer = new DefaultDomRenderer2(eventManager);
    }
    DomRendererFactory2.prototype.createRenderer = function (element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        switch (type.encapsulation) {
            case ViewEncapsulation.Emulated: {
                var renderer = this.rendererByCompId.get(type.id);
                if (!renderer) {
                    renderer =
                        new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type);
                    this.rendererByCompId.set(type.id, renderer);
                }
                renderer.applyToHost(element);
                return renderer;
            }
            case ViewEncapsulation.Native:
            case ViewEncapsulation.ShadowDom:
                return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
            default: {
                if (!this.rendererByCompId.has(type.id)) {
                    var styles = flattenStyles(type.id, type.styles, []);
                    this.sharedStylesHost.addStyles(styles);
                    this.rendererByCompId.set(type.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
        }
    };
    DomRendererFactory2.prototype.begin = function () { };
    DomRendererFactory2.prototype.end = function () { };
    DomRendererFactory2.ngInjectableDef = i0.defineInjectable({ token: DomRendererFactory2, factory: function DomRendererFactory2_Factory(t) { return new (t || DomRendererFactory2)(i0.inject(i1.EventManager), i0.inject(i2.DomSharedStylesHost)); }, providedIn: null });
    return DomRendererFactory2;
}());
export { DomRendererFactory2 };
/*@__PURE__*/ i0.ɵsetClassMetadata(DomRendererFactory2, [{
        type: Injectable
    }], function () { return [{ type: i1.EventManager }, { type: i2.DomSharedStylesHost }]; }, null);
var DefaultDomRenderer2 = /** @class */ (function () {
    function DefaultDomRenderer2(eventManager) {
        this.eventManager = eventManager;
        this.data = Object.create(null);
    }
    DefaultDomRenderer2.prototype.destroy = function () { };
    DefaultDomRenderer2.prototype.createElement = function (name, namespace) {
        if (namespace) {
            // In cases where Ivy (not ViewEngine) is giving us the actual namespace, the look up by key
            // will result in undefined, so we just return the namespace here.
            return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return document.createElement(name);
    };
    DefaultDomRenderer2.prototype.createComment = function (value) { return document.createComment(value); };
    DefaultDomRenderer2.prototype.createText = function (value) { return document.createTextNode(value); };
    DefaultDomRenderer2.prototype.appendChild = function (parent, newChild) { parent.appendChild(newChild); };
    DefaultDomRenderer2.prototype.insertBefore = function (parent, newChild, refChild) {
        if (parent) {
            parent.insertBefore(newChild, refChild);
        }
    };
    DefaultDomRenderer2.prototype.removeChild = function (parent, oldChild) {
        if (parent) {
            parent.removeChild(oldChild);
        }
    };
    DefaultDomRenderer2.prototype.selectRootElement = function (selectorOrNode, preserveContent) {
        var el = typeof selectorOrNode === 'string' ? document.querySelector(selectorOrNode) :
            selectorOrNode;
        if (!el) {
            throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
        }
        if (!preserveContent) {
            el.textContent = '';
        }
        return el;
    };
    DefaultDomRenderer2.prototype.parentNode = function (node) { return node.parentNode; };
    DefaultDomRenderer2.prototype.nextSibling = function (node) { return node.nextSibling; };
    DefaultDomRenderer2.prototype.setAttribute = function (el, name, value, namespace) {
        if (namespace) {
            name = namespace + ":" + name;
            // TODO(benlesh): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            var namespaceUri = NAMESPACE_URIS[namespace];
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
    };
    DefaultDomRenderer2.prototype.removeAttribute = function (el, name, namespace) {
        if (namespace) {
            // TODO(benlesh): Ivy may cause issues here because it's passing around
            // full URIs for namespaces, therefore this lookup will fail.
            var namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                // TODO(benlesh): Since ivy is passing around full URIs for namespaces
                // this could result in properties like `http://www.w3.org/2000/svg:cx="123"`,
                // which is wrong.
                el.removeAttribute(namespace + ":" + name);
            }
        }
        else {
            el.removeAttribute(name);
        }
    };
    DefaultDomRenderer2.prototype.addClass = function (el, name) { el.classList.add(name); };
    DefaultDomRenderer2.prototype.removeClass = function (el, name) { el.classList.remove(name); };
    DefaultDomRenderer2.prototype.setStyle = function (el, style, value, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.setProperty(style, value, !!(flags & RendererStyleFlags2.Important) ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    };
    DefaultDomRenderer2.prototype.removeStyle = function (el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            el.style.removeProperty(style);
        }
        else {
            // IE requires '' instead of null
            // see https://github.com/angular/angular/issues/7916
            el.style[style] = '';
        }
    };
    DefaultDomRenderer2.prototype.setProperty = function (el, name, value) {
        checkNoSyntheticProp(name, 'property');
        el[name] = value;
    };
    DefaultDomRenderer2.prototype.setValue = function (node, value) { node.nodeValue = value; };
    DefaultDomRenderer2.prototype.listen = function (target, event, callback) {
        checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
        }
        return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
    };
    return DefaultDomRenderer2;
}());
var AT_CHARCODE = '@'.charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new Error("Found the synthetic " + nameKind + " " + name + ". Please include either \"BrowserAnimationsModule\" or \"NoopAnimationsModule\" in your application.");
    }
}
var EmulatedEncapsulationDomRenderer2 = /** @class */ (function (_super) {
    tslib_1.__extends(EmulatedEncapsulationDomRenderer2, _super);
    function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component) {
        var _this = _super.call(this, eventManager) || this;
        _this.component = component;
        var styles = flattenStyles(component.id, component.styles, []);
        sharedStylesHost.addStyles(styles);
        _this.contentAttr = shimContentAttribute(component.id);
        _this.hostAttr = shimHostAttribute(component.id);
        return _this;
    }
    EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function (element) { _super.prototype.setAttribute.call(this, element, this.hostAttr, ''); };
    EmulatedEncapsulationDomRenderer2.prototype.createElement = function (parent, name) {
        var el = _super.prototype.createElement.call(this, parent, name);
        _super.prototype.setAttribute.call(this, el, this.contentAttr, '');
        return el;
    };
    return EmulatedEncapsulationDomRenderer2;
}(DefaultDomRenderer2));
var ShadowDomRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ShadowDomRenderer, _super);
    function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
        var _this = _super.call(this, eventManager) || this;
        _this.sharedStylesHost = sharedStylesHost;
        _this.hostEl = hostEl;
        _this.component = component;
        if (component.encapsulation === ViewEncapsulation.ShadowDom) {
            _this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        }
        else {
            _this.shadowRoot = hostEl.createShadowRoot();
        }
        _this.sharedStylesHost.addHost(_this.shadowRoot);
        var styles = flattenStyles(component.id, component.styles, []);
        for (var i = 0; i < styles.length; i++) {
            var styleEl = document.createElement('style');
            styleEl.textContent = styles[i];
            _this.shadowRoot.appendChild(styleEl);
        }
        return _this;
    }
    ShadowDomRenderer.prototype.nodeOrShadowRoot = function (node) { return node === this.hostEl ? this.shadowRoot : node; };
    ShadowDomRenderer.prototype.destroy = function () { this.sharedStylesHost.removeHost(this.shadowRoot); };
    ShadowDomRenderer.prototype.appendChild = function (parent, newChild) {
        return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
    };
    ShadowDomRenderer.prototype.insertBefore = function (parent, newChild, refChild) {
        return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
    };
    ShadowDomRenderer.prototype.removeChild = function (parent, oldChild) {
        return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
    };
    ShadowDomRenderer.prototype.parentNode = function (node) {
        return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
    };
    return ShadowDomRenderer;
}(DefaultDomRenderer2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2RvbV9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBK0IsbUJBQW1CLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUV6RCxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQTJCO0lBQ3BELEtBQUssRUFBRSw0QkFBNEI7SUFDbkMsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxPQUFPLEVBQUUsOEJBQThCO0lBQ3ZDLEtBQUssRUFBRSxzQ0FBc0M7SUFDN0MsT0FBTyxFQUFFLCtCQUErQjtDQUN6QyxDQUFDO0FBRUYsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztBQUMzQyxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsYUFBVyxrQkFBb0IsQ0FBQztBQUN6RCxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUcsZ0JBQWMsa0JBQW9CLENBQUM7QUFFL0QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLGdCQUF3QjtJQUMzRCxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxnQkFBd0I7SUFDeEQsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxD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QyxtQkFBbUIsR0FxQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIFJlbmRlcmVyMiwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSAnLi9ldmVudHMvZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJy4vc2hhcmVkX3N0eWxlc19ob3N0JztcblxuZXhwb3J0IGNvbnN0IE5BTUVTUEFDRV9VUklTOiB7W25zOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnc3ZnJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgJ3hodG1sJzogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnLFxuICAneGxpbmsnOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gICd4bWwnOiAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJyxcbiAgJ3htbG5zJzogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJyxcbn07XG5cbmNvbnN0IENPTVBPTkVOVF9SRUdFWCA9IC8lQ09NUCUvZztcbmV4cG9ydCBjb25zdCBDT01QT05FTlRfVkFSSUFCTEUgPSAnJUNPTVAlJztcbmV4cG9ydCBjb25zdCBIT1NUX0FUVFIgPSBgX25naG9zdC0ke0NPTVBPTkVOVF9WQVJJQUJMRX1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQVRUUiA9IGBfbmdjb250ZW50LSR7Q09NUE9ORU5UX1ZBUklBQkxFfWA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGltQ29udGVudEF0dHJpYnV0ZShjb21wb25lbnRTaG9ydElkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gQ09OVEVOVF9BVFRSLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wb25lbnRTaG9ydElkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoaW1Ib3N0QXR0cmlidXRlKGNvbXBvbmVudFNob3J0SWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBIT1NUX0FUVFIucmVwbGFjZShDT01QT05FTlRfUkVHRVgsIGNvbXBvbmVudFNob3J0SWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlblN0eWxlcyhcbiAgICBjb21wSWQ6IHN0cmluZywgc3R5bGVzOiBBcnJheTxhbnl8YW55W10+LCB0YXJnZXQ6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBzdHlsZSA9IHN0eWxlc1tpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlKSkge1xuICAgICAgZmxhdHRlblN0eWxlcyhjb21wSWQsIHN0eWxlLCB0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZSA9IHN0eWxlLnJlcGxhY2UoQ09NUE9ORU5UX1JFR0VYLCBjb21wSWQpO1xuICAgICAgdGFyZ2V0LnB1c2goc3R5bGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZVByZXZlbnREZWZhdWx0KGV2ZW50SGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gIHJldHVybiAoZXZlbnQ6IGFueSkgPT4ge1xuICAgIGNvbnN0IGFsbG93RGVmYXVsdEJlaGF2aW9yID0gZXZlbnRIYW5kbGVyKGV2ZW50KTtcbiAgICBpZiAoYWxsb3dEZWZhdWx0QmVoYXZpb3IgPT09IGZhbHNlKSB7XG4gICAgICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgcHJldmVudERlZmF1bHQgaW50byBldmVudCBwbHVnaW5zLi4uXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21SZW5kZXJlckZhY3RvcnkyIGltcGxlbWVudHMgUmVuZGVyZXJGYWN0b3J5MiB7XG4gIHByaXZhdGUgcmVuZGVyZXJCeUNvbXBJZCA9IG5ldyBNYXA8c3RyaW5nLCBSZW5kZXJlcjI+KCk7XG4gIHByaXZhdGUgZGVmYXVsdFJlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgcHJpdmF0ZSBzaGFyZWRTdHlsZXNIb3N0OiBEb21TaGFyZWRTdHlsZXNIb3N0KSB7XG4gICAgdGhpcy5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgRGVmYXVsdERvbVJlbmRlcmVyMihldmVudE1hbmFnZXIpO1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoZWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjIge1xuICAgIGlmICghZWxlbWVudCB8fCAhdHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdFJlbmRlcmVyO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUuZW5jYXBzdWxhdGlvbikge1xuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDoge1xuICAgICAgICBsZXQgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyQnlDb21wSWQuZ2V0KHR5cGUuaWQpO1xuICAgICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIgPVxuICAgICAgICAgICAgICBuZXcgRW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyKHRoaXMuZXZlbnRNYW5hZ2VyLCB0aGlzLnNoYXJlZFN0eWxlc0hvc3QsIHR5cGUpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXJCeUNvbXBJZC5zZXQodHlwZS5pZCwgcmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgICg8RW11bGF0ZWRFbmNhcHN1bGF0aW9uRG9tUmVuZGVyZXIyPnJlbmRlcmVyKS5hcHBseVRvSG9zdChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyO1xuICAgICAgfVxuICAgICAgY2FzZSBWaWV3RW5jYXBzdWxhdGlvbi5OYXRpdmU6XG4gICAgICBjYXNlIFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbTpcbiAgICAgICAgcmV0dXJuIG5ldyBTaGFkb3dEb21SZW5kZXJlcih0aGlzLmV2ZW50TWFuYWdlciwgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LCBlbGVtZW50LCB0eXBlKTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKCF0aGlzLnJlbmRlcmVyQnlDb21wSWQuaGFzKHR5cGUuaWQpKSB7XG4gICAgICAgICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyh0eXBlLmlkLCB0eXBlLnN0eWxlcywgW10pO1xuICAgICAgICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRTdHlsZXMoc3R5bGVzKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyQnlDb21wSWQuc2V0KHR5cGUuaWQsIHRoaXMuZGVmYXVsdFJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYmVnaW4oKSB7fVxuICBlbmQoKSB7fVxufVxuXG5jbGFzcyBEZWZhdWx0RG9tUmVuZGVyZXIyIGltcGxlbWVudHMgUmVuZGVyZXIyIHtcbiAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIpIHt9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHt9XG5cbiAgZGVzdHJveU5vZGU6IG51bGw7XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgLy8gSW4gY2FzZXMgd2hlcmUgSXZ5IChub3QgVmlld0VuZ2luZSkgaXMgZ2l2aW5nIHVzIHRoZSBhY3R1YWwgbmFtZXNwYWNlLCB0aGUgbG9vayB1cCBieSBrZXlcbiAgICAgIC8vIHdpbGwgcmVzdWx0IGluIHVuZGVmaW5lZCwgc28gd2UganVzdCByZXR1cm4gdGhlIG5hbWVzcGFjZSBoZXJlLlxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdIHx8IG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH1cblxuICBjcmVhdGVDb21tZW50KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2YWx1ZSk7IH1cblxuICBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpOyB9XG5cbiAgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkIHsgcGFyZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTsgfVxuXG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChvbGRDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIHByZXNlcnZlQ29udGVudD86IGJvb2xlYW4pOiBhbnkge1xuICAgIGxldCBlbDogYW55ID0gdHlwZW9mIHNlbGVjdG9yT3JOb2RlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPck5vZGUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvck9yTm9kZTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzZWxlY3RvciBcIiR7c2VsZWN0b3JPck5vZGV9XCIgZGlkIG5vdCBtYXRjaCBhbnkgZWxlbWVudHNgKTtcbiAgICB9XG4gICAgaWYgKCFwcmVzZXJ2ZUNvbnRlbnQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHsgcmV0dXJuIG5vZGUucGFyZW50Tm9kZTsgfVxuXG4gIG5leHRTaWJsaW5nKG5vZGU6IGFueSk6IGFueSB7IHJldHVybiBub2RlLm5leHRTaWJsaW5nOyB9XG5cbiAgc2V0QXR0cmlidXRlKGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgbmFtZSA9IGAke25hbWVzcGFjZX06JHtuYW1lfWA7XG4gICAgICAvLyBUT0RPKGJlbmxlc2gpOiBJdnkgbWF5IGNhdXNlIGlzc3VlcyBoZXJlIGJlY2F1c2UgaXQncyBwYXNzaW5nIGFyb3VuZFxuICAgICAgLy8gZnVsbCBVUklzIGZvciBuYW1lc3BhY2VzLCB0aGVyZWZvcmUgdGhpcyBsb29rdXAgd2lsbCBmYWlsLlxuICAgICAgY29uc3QgbmFtZXNwYWNlVXJpID0gTkFNRVNQQUNFX1VSSVNbbmFtZXNwYWNlXTtcbiAgICAgIGlmIChuYW1lc3BhY2VVcmkpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVXJpLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgIC8vIFRPRE8oYmVubGVzaCk6IEl2eSBtYXkgY2F1c2UgaXNzdWVzIGhlcmUgYmVjYXVzZSBpdCdzIHBhc3NpbmcgYXJvdW5kXG4gICAgICAvLyBmdWxsIFVSSXMgZm9yIG5hbWVzcGFjZXMsIHRoZXJlZm9yZSB0aGlzIGxvb2t1cCB3aWxsIGZhaWwuXG4gICAgICBjb25zdCBuYW1lc3BhY2VVcmkgPSBOQU1FU1BBQ0VfVVJJU1tuYW1lc3BhY2VdO1xuICAgICAgaWYgKG5hbWVzcGFjZVVyaSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVcmksIG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhiZW5sZXNoKTogU2luY2UgaXZ5IGlzIHBhc3NpbmcgYXJvdW5kIGZ1bGwgVVJJcyBmb3IgbmFtZXNwYWNlc1xuICAgICAgICAvLyB0aGlzIGNvdWxkIHJlc3VsdCBpbiBwcm9wZXJ0aWVzIGxpa2UgYGh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnOmN4PVwiMTIzXCJgLFxuICAgICAgICAvLyB3aGljaCBpcyB3cm9uZy5cbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGAke25hbWVzcGFjZX06JHtuYW1lfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7IGVsLmNsYXNzTGlzdC5hZGQobmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHsgZWwuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTsgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzOiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZCB7XG4gICAgaWYgKGZsYWdzICYgUmVuZGVyZXJTdHlsZUZsYWdzMi5EYXNoQ2FzZSkge1xuICAgICAgZWwuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgc3R5bGUsIHZhbHVlLCAhIShmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KSA/ICdpbXBvcnRhbnQnIDogJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZVtzdHlsZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTdHlsZShlbDogYW55LCBzdHlsZTogc3RyaW5nLCBmbGFnczogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQge1xuICAgIGlmIChmbGFncyAmIFJlbmRlcmVyU3R5bGVGbGFnczIuRGFzaENhc2UpIHtcbiAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KHN0eWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvNzkxNlxuICAgICAgZWwuc3R5bGVbc3R5bGVdID0gJyc7XG4gICAgfVxuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AobmFtZSwgJ3Byb3BlcnR5Jyk7XG4gICAgZWxbbmFtZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNldFZhbHVlKG5vZGU6IGFueSwgdmFsdWU6IHN0cmluZyk6IHZvaWQgeyBub2RlLm5vZGVWYWx1ZSA9IHZhbHVlOyB9XG5cbiAgbGlzdGVuKHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudDogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4pOlxuICAgICAgKCkgPT4gdm9pZCB7XG4gICAgY2hlY2tOb1N5bnRoZXRpY1Byb3AoZXZlbnQsICdsaXN0ZW5lcicpO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIDwoKSA9PiB2b2lkPnRoaXMuZXZlbnRNYW5hZ2VyLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgdGFyZ2V0LCBldmVudCwgZGVjb3JhdGVQcmV2ZW50RGVmYXVsdChjYWxsYmFjaykpO1xuICAgIH1cbiAgICByZXR1cm4gPCgpID0+IHZvaWQ+dGhpcy5ldmVudE1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgIHRhcmdldCwgZXZlbnQsIGRlY29yYXRlUHJldmVudERlZmF1bHQoY2FsbGJhY2spKSBhcygpID0+IHZvaWQ7XG4gIH1cbn1cblxuY29uc3QgQVRfQ0hBUkNPREUgPSAnQCcuY2hhckNvZGVBdCgwKTtcbmZ1bmN0aW9uIGNoZWNrTm9TeW50aGV0aWNQcm9wKG5hbWU6IHN0cmluZywgbmFtZUtpbmQ6IHN0cmluZykge1xuICBpZiAobmFtZS5jaGFyQ29kZUF0KDApID09PSBBVF9DSEFSQ09ERSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEZvdW5kIHRoZSBzeW50aGV0aWMgJHtuYW1lS2luZH0gJHtuYW1lfS4gUGxlYXNlIGluY2x1ZGUgZWl0aGVyIFwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcIiBvciBcIk5vb3BBbmltYXRpb25zTW9kdWxlXCIgaW4geW91ciBhcHBsaWNhdGlvbi5gKTtcbiAgfVxufVxuXG5jbGFzcyBFbXVsYXRlZEVuY2Fwc3VsYXRpb25Eb21SZW5kZXJlcjIgZXh0ZW5kcyBEZWZhdWx0RG9tUmVuZGVyZXIyIHtcbiAgcHJpdmF0ZSBjb250ZW50QXR0cjogc3RyaW5nO1xuICBwcml2YXRlIGhvc3RBdHRyOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlciwgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyKTtcbiAgICBjb25zdCBzdHlsZXMgPSBmbGF0dGVuU3R5bGVzKGNvbXBvbmVudC5pZCwgY29tcG9uZW50LnN0eWxlcywgW10pO1xuICAgIHNoYXJlZFN0eWxlc0hvc3QuYWRkU3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmNvbnRlbnRBdHRyID0gc2hpbUNvbnRlbnRBdHRyaWJ1dGUoY29tcG9uZW50LmlkKTtcbiAgICB0aGlzLmhvc3RBdHRyID0gc2hpbUhvc3RBdHRyaWJ1dGUoY29tcG9uZW50LmlkKTtcbiAgfVxuXG4gIGFwcGx5VG9Ib3N0KGVsZW1lbnQ6IGFueSkgeyBzdXBlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgdGhpcy5ob3N0QXR0ciwgJycpOyB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnQ6IGFueSwgbmFtZTogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgY29uc3QgZWwgPSBzdXBlci5jcmVhdGVFbGVtZW50KHBhcmVudCwgbmFtZSk7XG4gICAgc3VwZXIuc2V0QXR0cmlidXRlKGVsLCB0aGlzLmNvbnRlbnRBdHRyLCAnJyk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG59XG5cbmNsYXNzIFNoYWRvd0RvbVJlbmRlcmVyIGV4dGVuZHMgRGVmYXVsdERvbVJlbmRlcmVyMiB7XG4gIHByaXZhdGUgc2hhZG93Um9vdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsIHByaXZhdGUgc2hhcmVkU3R5bGVzSG9zdDogRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgICAgIHByaXZhdGUgaG9zdEVsOiBhbnksIHByaXZhdGUgY29tcG9uZW50OiBSZW5kZXJlclR5cGUyKSB7XG4gICAgc3VwZXIoZXZlbnRNYW5hZ2VyKTtcbiAgICBpZiAoY29tcG9uZW50LmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLlNoYWRvd0RvbSkge1xuICAgICAgdGhpcy5zaGFkb3dSb290ID0gKGhvc3RFbCBhcyBhbnkpLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdCA9IChob3N0RWwgYXMgYW55KS5jcmVhdGVTaGFkb3dSb290KCk7XG4gICAgfVxuICAgIHRoaXMuc2hhcmVkU3R5bGVzSG9zdC5hZGRIb3N0KHRoaXMuc2hhZG93Um9vdCk7XG4gICAgY29uc3Qgc3R5bGVzID0gZmxhdHRlblN0eWxlcyhjb21wb25lbnQuaWQsIGNvbXBvbmVudC5zdHlsZXMsIFtdKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsLnRleHRDb250ZW50ID0gc3R5bGVzW2ldO1xuICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm9kZU9yU2hhZG93Um9vdChub2RlOiBhbnkpOiBhbnkgeyByZXR1cm4gbm9kZSA9PT0gdGhpcy5ob3N0RWwgPyB0aGlzLnNoYWRvd1Jvb3QgOiBub2RlOyB9XG5cbiAgZGVzdHJveSgpIHsgdGhpcy5zaGFyZWRTdHlsZXNIb3N0LnJlbW92ZUhvc3QodGhpcy5zaGFkb3dSb290KTsgfVxuXG4gIGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZENoaWxkKHRoaXMubm9kZU9yU2hhZG93Um9vdChwYXJlbnQpLCBuZXdDaGlsZCk7XG4gIH1cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIHN1cGVyLmluc2VydEJlZm9yZSh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgbmV3Q2hpbGQsIHJlZkNoaWxkKTtcbiAgfVxuICByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5yZW1vdmVDaGlsZCh0aGlzLm5vZGVPclNoYWRvd1Jvb3QocGFyZW50KSwgb2xkQ2hpbGQpO1xuICB9XG4gIHBhcmVudE5vZGUobm9kZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5ub2RlT3JTaGFkb3dSb290KHN1cGVyLnBhcmVudE5vZGUodGhpcy5ub2RlT3JTaGFkb3dSb290KG5vZGUpKSk7XG4gIH1cbn1cbiJdfQ==