import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
/**
 * Defines supported modifiers for key events.
 */
var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
var DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var _keyMap = {
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
var _chromeNumKeyPadMap = {
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
/**
 * Retrieves modifiers from key-event objects.
 */
var MODIFIER_KEY_GETTERS = {
    'alt': function (event) { return event.altKey; },
    'control': function (event) { return event.ctrlKey; },
    'meta': function (event) { return event.metaKey; },
    'shift': function (event) { return event.shiftKey; }
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */
var KeyEventsPlugin = /** @class */ (function (_super) {
    __extends(KeyEventsPlugin, _super);
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    function KeyEventsPlugin(doc) {
        return _super.call(this, doc) || this;
    }
    /**
      * Reports whether a named key event is supported.
      * @param eventName The event name to query.
      * @return True if the named key event is supported.
     */
    KeyEventsPlugin.prototype.supports = function (eventName) { return KeyEventsPlugin.parseEventName(eventName) != null; };
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
    */
    KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        var outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(function () {
            return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
        });
    };
    KeyEventsPlugin.parseEventName = function (eventName) {
        var parts = eventName.toLowerCase().split('.');
        var domEventName = parts.shift();
        if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
            return null;
        }
        var key = KeyEventsPlugin._normalizeKey(parts.pop());
        var fullKey = '';
        MODIFIER_KEYS.forEach(function (modifierName) {
            var index = parts.indexOf(modifierName);
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
        var result = {};
        result['domEventName'] = domEventName;
        result['fullKey'] = fullKey;
        return result;
    };
    KeyEventsPlugin.getEventFullKey = function (event) {
        var fullKey = '';
        var key = getEventKey(event);
        key = key.toLowerCase();
        if (key === ' ') {
            key = 'space'; // for readability
        }
        else if (key === '.') {
            key = 'dot'; // because '.' is used as a separator in event names
        }
        MODIFIER_KEYS.forEach(function (modifierName) {
            if (modifierName != key) {
                var modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                if (modifierGetter(event)) {
                    fullKey += modifierName + '.';
                }
            }
        });
        fullKey += key;
        return fullKey;
    };
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */
    KeyEventsPlugin.eventCallback = function (fullKey, handler, zone) {
        return function (event /** TODO #9100 */) {
            if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                zone.runGuarded(function () { return handler(event); });
            }
        };
    };
    /** @internal */
    KeyEventsPlugin._normalizeKey = function (keyName) {
        // TODO: switch to a Map if the mapping grows too much
        switch (keyName) {
            case 'esc':
                return 'escape';
            default:
                return keyName;
        }
    };
    KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) { return new (t || KeyEventsPlugin)(i0.ɵɵinject(DOCUMENT)); };
    KeyEventsPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: KeyEventsPlugin, factory: KeyEventsPlugin.ɵfac });
    return KeyEventsPlugin;
}(EventManagerPlugin));
export { KeyEventsPlugin };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(KeyEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
function getEventKey(event) {
    var key = event.key;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRW5EOztHQUVHO0FBQ0gsSUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUxRCxJQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQUVsQywwRkFBMEY7QUFDMUYsSUFBTSxPQUFPLEdBQTBCO0lBQ3JDLDhGQUE4RjtJQUM5RixrREFBa0Q7SUFDbEQsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLEtBQUs7SUFDWCxNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFdBQVc7SUFDbkIsT0FBTyxFQUFFLFlBQVk7SUFDckIsSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixNQUFNLEVBQUUsYUFBYTtJQUNyQixRQUFRLEVBQUUsWUFBWTtJQUN0QixLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRixvREFBb0Q7QUFDcEQsNkRBQTZEO0FBQzdELDBDQUEwQztBQUMxQyxJQUFNLG1CQUFtQixHQUFHO0lBQzFCLEdBQUcsRUFBRSxHQUFHO0lBQ1IsR0FBRyxF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QyxDQUFDO1lBQzFELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyx1QkFBdUIsSUFBSSxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pGLG9EQUFvRDtnQkFDcEQsNkRBQTZEO2dCQUM3RCwwQ0FBMEM7Z0JBQzFDLEdBQUcsR0FBSSxtQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QztTQUNGO0tBQ0Y7SUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZWZpbmVzIHN1cHBvcnRlZCBtb2RpZmllcnMgZm9yIGtleSBldmVudHMuXG4gKi9cbmNvbnN0IE1PRElGSUVSX0tFWVMgPSBbJ2FsdCcsICdjb250cm9sJywgJ21ldGEnLCAnc2hpZnQnXTtcblxuY29uc3QgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAzO1xuXG4vLyBNYXAgdG8gY29udmVydCBzb21lIGtleSBvciBrZXlJZGVudGlmaWVyIHZhbHVlcyB0byB3aGF0IHdpbGwgYmUgcmV0dXJuZWQgYnkgZ2V0RXZlbnRLZXlcbmNvbnN0IF9rZXlNYXA6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgLy8gVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIGhlcmUgZm9yIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJpbGl0eSBhbmQgdG8gbWF0Y2ggdGhlIFczQyBzdGFuZGFyZFxuICAvLyBjZiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMta2V5L1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICAnRGVsJzogJ0RlbGV0ZScsXG4gICdFc2MnOiAnRXNjYXBlJyxcbiAgJ0xlZnQnOiAnQXJyb3dMZWZ0JyxcbiAgJ1JpZ2h0JzogJ0Fycm93UmlnaHQnLFxuICAnVXAnOiAnQXJyb3dVcCcsXG4gICdEb3duJzogJ0Fycm93RG93bicsXG4gICdNZW51JzogJ0NvbnRleHRNZW51JyxcbiAgJ1Njcm9sbCc6ICdTY3JvbGxMb2NrJyxcbiAgJ1dpbic6ICdPUydcbn07XG5cbi8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbi8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuY29uc3QgX2Nocm9tZU51bUtleVBhZE1hcCA9IHtcbiAgJ0EnOiAnMScsXG4gICdCJzogJzInLFxuICAnQyc6ICczJyxcbiAgJ0QnOiAnNCcsXG4gICdFJzogJzUnLFxuICAnRic6ICc2JyxcbiAgJ0cnOiAnNycsXG4gICdIJzogJzgnLFxuICAnSSc6ICc5JyxcbiAgJ0onOiAnKicsXG4gICdLJzogJysnLFxuICAnTSc6ICctJyxcbiAgJ04nOiAnLicsXG4gICdPJzogJy8nLFxuICAnXFx4NjAnOiAnMCcsXG4gICdcXHg5MCc6ICdOdW1Mb2NrJ1xufTtcblxuXG4vKipcbiAqIFJldHJpZXZlcyBtb2RpZmllcnMgZnJvbSBrZXktZXZlbnQgb2JqZWN0cy5cbiAqL1xuY29uc3QgTU9ESUZJRVJfS0VZX0dFVFRFUlM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGJvb2xlYW59ID0ge1xuICAnYWx0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5hbHRLZXksXG4gICdjb250cm9sJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5jdHJsS2V5LFxuICAnbWV0YSc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQubWV0YUtleSxcbiAgJ3NoaWZ0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5zaGlmdEtleVxufTtcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBBIGJyb3dzZXIgcGx1Zy1pbiB0aGF0IHByb3ZpZGVzIHN1cHBvcnQgZm9yIGhhbmRsaW5nIG9mIGtleSBldmVudHMgaW4gQW5ndWxhci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtleUV2ZW50c1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhbiBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciBwbHVnLWluLlxuICAgKiBAcGFyYW0gZG9jIFRoZSBkb2N1bWVudCBpbiB3aGljaCBrZXkgZXZlbnRzIHdpbGwgYmUgZGV0ZWN0ZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkgeyBzdXBlcihkb2MpOyB9XG5cbiAgLyoqXG4gICAgKiBSZXBvcnRzIHdoZXRoZXIgYSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxuICAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSB0byBxdWVyeS5cbiAgICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgbmFtZWQga2V5IGV2ZW50IGlzIHN1cHBvcnRlZC5cbiAgICovXG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSAhPSBudWxsOyB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgSFRNTCBlbGVtZW50IHRvIHJlY2VpdmUgZXZlbnQgbm90aWZpY2F0aW9ucy5cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUga2V5IGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcbiAgICogZXZlbnQgb2JqZWN0IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJucyBUaGUga2V5IGV2ZW50IHRoYXQgd2FzIHJlZ2lzdGVyZWQuXG4gICovXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCBwYXJzZWRFdmVudCA9IEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpICE7XG5cbiAgICBjb25zdCBvdXRzaWRlSGFuZGxlciA9XG4gICAgICAgIEtleUV2ZW50c1BsdWdpbi5ldmVudENhbGxiYWNrKHBhcnNlZEV2ZW50WydmdWxsS2V5J10sIGhhbmRsZXIsIHRoaXMubWFuYWdlci5nZXRab25lKCkpO1xuXG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXRab25lKCkucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIGdldERPTSgpLm9uQW5kQ2FuY2VsKGVsZW1lbnQsIHBhcnNlZEV2ZW50Wydkb21FdmVudE5hbWUnXSwgb3V0c2lkZUhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IHN0cmluZ318bnVsbCB7XG4gICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCkuc3BsaXQoJy4nKTtcblxuICAgIGNvbnN0IGRvbUV2ZW50TmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKChwYXJ0cy5sZW5ndGggPT09IDApIHx8ICEoZG9tRXZlbnROYW1lID09PSAna2V5ZG93bicgfHwgZG9tRXZlbnROYW1lID09PSAna2V5dXAnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gS2V5RXZlbnRzUGx1Z2luLl9ub3JtYWxpemVLZXkocGFydHMucG9wKCkgISk7XG5cbiAgICBsZXQgZnVsbEtleSA9ICcnO1xuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaChtb2RpZmllck5hbWUgPT4ge1xuICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHBhcnRzLmluZGV4T2YobW9kaWZpZXJOYW1lKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHBhcnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZ1bGxLZXkgKz0gbW9kaWZpZXJOYW1lICsgJy4nO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPSAwIHx8IGtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHJldHVybmluZyBudWxsIGluc3RlYWQgb2YgdGhyb3dpbmcgdG8gbGV0IGFub3RoZXIgcGx1Z2luIHByb2Nlc3MgdGhlIGV2ZW50XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlc3VsdFsnZG9tRXZlbnROYW1lJ10gPSBkb21FdmVudE5hbWU7XG4gICAgcmVzdWx0WydmdWxsS2V5J10gPSBmdWxsS2V5O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXZlbnRGdWxsS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcbiAgICBsZXQgZnVsbEtleSA9ICcnO1xuICAgIGxldCBrZXkgPSBnZXRFdmVudEtleShldmVudCk7XG4gICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGtleSA9PT0gJyAnKSB7XG4gICAgICBrZXkgPSAnc3BhY2UnOyAgLy8gZm9yIHJlYWRhYmlsaXR5XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICcuJykge1xuICAgICAga2V5ID0gJ2RvdCc7ICAvLyBiZWNhdXNlICcuJyBpcyB1c2VkIGFzIGEgc2VwYXJhdG9yIGluIGV2ZW50IG5hbWVzXG4gICAgfVxuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaChtb2RpZmllck5hbWUgPT4ge1xuICAgICAgaWYgKG1vZGlmaWVyTmFtZSAhPSBrZXkpIHtcbiAgICAgICAgY29uc3QgbW9kaWZpZXJHZXR0ZXIgPSBNT0RJRklFUl9LRVlfR0VUVEVSU1ttb2RpZmllck5hbWVdO1xuICAgICAgICBpZiAobW9kaWZpZXJHZXR0ZXIoZXZlbnQpKSB7XG4gICAgICAgICAgZnVsbEtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdWxsS2V5ICs9IGtleTtcbiAgICByZXR1cm4gZnVsbEtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgaGFuZGxlciBjYWxsYmFjayBmb3IgYSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBmdWxsS2V5IFRoZSBldmVudCBuYW1lIHRoYXQgY29tYmluZXMgYWxsIHNpbXVsdGFuZW91cyBrZXlzdHJva2VzLlxuICAgKiBAcGFyYW0gaGFuZGxlciBUaGUgZnVuY3Rpb24gdGhhdCByZXNwb25kcyB0byB0aGUga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gem9uZSBUaGUgem9uZSBpbiB3aGljaCB0aGUgZXZlbnQgb2NjdXJyZWQuXG4gICAqIEByZXR1cm5zIEEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgZXZlbnRDYWxsYmFjayhmdWxsS2V5OiBhbnksIGhhbmRsZXI6IEZ1bmN0aW9uLCB6b25lOiBOZ1pvbmUpOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudDogYW55IC8qKiBUT0RPICM5MTAwICovKSA9PiB7XG4gICAgICBpZiAoS2V5RXZlbnRzUGx1Z2luLmdldEV2ZW50RnVsbEtleShldmVudCkgPT09IGZ1bGxLZXkpIHtcbiAgICAgICAgem9uZS5ydW5HdWFyZGVkKCgpID0+IGhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX25vcm1hbGl6ZUtleShrZXlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFRPRE86IHN3aXRjaCB0byBhIE1hcCBpZiB0aGUgbWFwcGluZyBncm93cyB0b28gbXVjaFxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgY2FzZSAnZXNjJzpcbiAgICAgICAgcmV0dXJuICdlc2NhcGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGtleU5hbWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcge1xuICBsZXQga2V5ID0gZXZlbnQua2V5O1xuICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICBrZXkgPSBldmVudC5rZXlJZGVudGlmaWVyO1xuICAgIC8vIGtleUlkZW50aWZpZXIgaXMgZGVmaW5lZCBpbiB0aGUgb2xkIGRyYWZ0IG9mIERPTSBMZXZlbCAzIEV2ZW50cyBpbXBsZW1lbnRlZCBieSBDaHJvbWUgYW5kXG4gICAgLy8gU2FmYXJpIGNmXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnVW5pZGVudGlmaWVkJztcbiAgICB9XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCdVKycpKSB7XG4gICAgICBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGtleS5zdWJzdHJpbmcoMiksIDE2KSk7XG4gICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAvLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4gICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbiAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgIGtleSA9IChfY2hyb21lTnVtS2V5UGFkTWFwIGFzIGFueSlba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2tleU1hcFtrZXldIHx8IGtleTtcbn1cbiJdfQ==