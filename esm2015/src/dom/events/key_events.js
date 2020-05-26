/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
/**
 * Defines supported modifiers for key events.
 */
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
const DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
const _keyMap = {
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
const _chromeNumKeyPadMap = {
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
const ɵ0 = (event) => event.altKey, ɵ1 = (event) => event.ctrlKey, ɵ2 = (event) => event.metaKey, ɵ3 = (event) => event.shiftKey;
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': ɵ0,
    'control': ɵ1,
    'meta': ɵ2,
    'shift': ɵ3
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */
let KeyEventsPlugin = /** @class */ (() => {
    var KeyEventsPlugin_1;
    let KeyEventsPlugin = KeyEventsPlugin_1 = class KeyEventsPlugin extends EventManagerPlugin {
        /**
         * Initializes an instance of the browser plug-in.
         * @param doc The document in which key events will be detected.
         */
        constructor(doc) {
            super(doc);
        }
        /**
         * Reports whether a named key event is supported.
         * @param eventName The event name to query.
         * @return True if the named key event is supported.
         */
        supports(eventName) {
            return KeyEventsPlugin_1.parseEventName(eventName) != null;
        }
        /**
         * Registers a handler for a specific element and key event.
         * @param element The HTML element to receive event notifications.
         * @param eventName The name of the key event to listen for.
         * @param handler A function to call when the notification occurs. Receives the
         * event object as an argument.
         * @returns The key event that was registered.
         */
        addEventListener(element, eventName, handler) {
            const parsedEvent = KeyEventsPlugin_1.parseEventName(eventName);
            const outsideHandler = KeyEventsPlugin_1.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => {
                return getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler);
            });
        }
        static parseEventName(eventName) {
            const parts = eventName.toLowerCase().split('.');
            const domEventName = parts.shift();
            if ((parts.length === 0) || !(domEventName === 'keydown' || domEventName === 'keyup')) {
                return null;
            }
            const key = KeyEventsPlugin_1._normalizeKey(parts.pop());
            let fullKey = '';
            MODIFIER_KEYS.forEach(modifierName => {
                const index = parts.indexOf(modifierName);
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
            const result = {};
            result['domEventName'] = domEventName;
            result['fullKey'] = fullKey;
            return result;
        }
        static getEventFullKey(event) {
            let fullKey = '';
            let key = getEventKey(event);
            key = key.toLowerCase();
            if (key === ' ') {
                key = 'space'; // for readability
            }
            else if (key === '.') {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            MODIFIER_KEYS.forEach(modifierName => {
                if (modifierName != key) {
                    const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            fullKey += key;
            return fullKey;
        }
        /**
         * Configures a handler callback for a key event.
         * @param fullKey The event name that combines all simultaneous keystrokes.
         * @param handler The function that responds to the key event.
         * @param zone The zone in which the event occurred.
         * @returns A callback function.
         */
        static eventCallback(fullKey, handler, zone) {
            return (event /** TODO #9100 */) => {
                if (KeyEventsPlugin_1.getEventFullKey(event) === fullKey) {
                    zone.runGuarded(() => handler(event));
                }
            };
        }
        /** @internal */
        static _normalizeKey(keyName) {
            // TODO: switch to a Map if the mapping grows too much
            switch (keyName) {
                case 'esc':
                    return 'escape';
                default:
                    return keyName;
            }
        }
    };
    KeyEventsPlugin = KeyEventsPlugin_1 = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], KeyEventsPlugin);
    return KeyEventsPlugin;
})();
export { KeyEventsPlugin };
function getEventKey(event) {
    let key = event.key;
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
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTFELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLDBGQUEwRjtBQUMxRixNQUFNLE9BQU8sR0FBMEI7SUFDckMsOEZBQThGO0lBQzlGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0QsMENBQTBDO0FBQzFDLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJ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LFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLHVCQUF1QixJQUFJLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekYsb0RBQW9EO2dCQUNwRCw2REFBNkQ7Z0JBQzdELDBDQUEwQztnQkFDMUMsR0FBRyxHQUFJLG1CQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Y7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL2V2ZW50X21hbmFnZXInO1xuXG4vKipcbiAqIERlZmluZXMgc3VwcG9ydGVkIG1vZGlmaWVycyBmb3Iga2V5IGV2ZW50cy5cbiAqL1xuY29uc3QgTU9ESUZJRVJfS0VZUyA9IFsnYWx0JywgJ2NvbnRyb2wnLCAnbWV0YScsICdzaGlmdCddO1xuXG5jb25zdCBET01fS0VZX0xPQ0FUSU9OX05VTVBBRCA9IDM7XG5cbi8vIE1hcCB0byBjb252ZXJ0IHNvbWUga2V5IG9yIGtleUlkZW50aWZpZXIgdmFsdWVzIHRvIHdoYXQgd2lsbCBiZSByZXR1cm5lZCBieSBnZXRFdmVudEtleVxuY29uc3QgX2tleU1hcDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAvLyBUaGUgZm9sbG93aW5nIHZhbHVlcyBhcmUgaGVyZSBmb3IgY3Jvc3MtYnJvd3NlciBjb21wYXRpYmlsaXR5IGFuZCB0byBtYXRjaCB0aGUgVzNDIHN0YW5kYXJkXG4gIC8vIGNmIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy1rZXkvXG4gICdcXGInOiAnQmFja3NwYWNlJyxcbiAgJ1xcdCc6ICdUYWInLFxuICAnXFx4N0YnOiAnRGVsZXRlJyxcbiAgJ1xceDFCJzogJ0VzY2FwZScsXG4gICdEZWwnOiAnRGVsZXRlJyxcbiAgJ0VzYyc6ICdFc2NhcGUnLFxuICAnTGVmdCc6ICdBcnJvd0xlZnQnLFxuICAnUmlnaHQnOiAnQXJyb3dSaWdodCcsXG4gICdVcCc6ICdBcnJvd1VwJyxcbiAgJ0Rvd24nOiAnQXJyb3dEb3duJyxcbiAgJ01lbnUnOiAnQ29udGV4dE1lbnUnLFxuICAnU2Nyb2xsJzogJ1Njcm9sbExvY2snLFxuICAnV2luJzogJ09TJ1xufTtcblxuLy8gVGhlcmUgaXMgYSBidWcgaW4gQ2hyb21lIGZvciBudW1lcmljIGtleXBhZCBrZXlzOlxuLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG5jb25zdCBfY2hyb21lTnVtS2V5UGFkTWFwID0ge1xuICAnQSc6ICcxJyxcbiAgJ0InOiAnMicsXG4gICdDJzogJzMnLFxuICAnRCc6ICc0JyxcbiAgJ0UnOiAnNScsXG4gICdGJzogJzYnLFxuICAnRyc6ICc3JyxcbiAgJ0gnOiAnOCcsXG4gICdJJzogJzknLFxuICAnSic6ICcqJyxcbiAgJ0snOiAnKycsXG4gICdNJzogJy0nLFxuICAnTic6ICcuJyxcbiAgJ08nOiAnLycsXG4gICdcXHg2MCc6ICcwJyxcbiAgJ1xceDkwJzogJ051bUxvY2snXG59O1xuXG5cbi8qKlxuICogUmV0cmlldmVzIG1vZGlmaWVycyBmcm9tIGtleS1ldmVudCBvYmplY3RzLlxuICovXG5jb25zdCBNT0RJRklFUl9LRVlfR0VUVEVSUzoge1trZXk6IHN0cmluZ106IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gYm9vbGVhbn0gPSB7XG4gICdhbHQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmFsdEtleSxcbiAgJ2NvbnRyb2wnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmN0cmxLZXksXG4gICdtZXRhJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5tZXRhS2V5LFxuICAnc2hpZnQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LnNoaWZ0S2V5XG59O1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEEgYnJvd3NlciBwbHVnLWluIHRoYXQgcHJvdmlkZXMgc3VwcG9ydCBmb3IgaGFuZGxpbmcgb2Yga2V5IGV2ZW50cyBpbiBBbmd1bGFyLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5RXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHBsdWctaW4uXG4gICAqIEBwYXJhbSBkb2MgVGhlIGRvY3VtZW50IGluIHdoaWNoIGtleSBldmVudHMgd2lsbCBiZSBkZXRlY3RlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoZG9jKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBvcnRzIHdoZXRoZXIgYSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIHF1ZXJ5LlxuICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIG5hbWVkIGtleSBldmVudCBpcyBzdXBwb3J0ZWQuXG4gICAqL1xuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSAhPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGhhbmRsZXIgZm9yIGEgc3BlY2lmaWMgZWxlbWVudCBhbmQga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgSFRNTCBlbGVtZW50IHRvIHJlY2VpdmUgZXZlbnQgbm90aWZpY2F0aW9ucy5cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUga2V5IGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAqIEBwYXJhbSBoYW5kbGVyIEEgZnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBub3RpZmljYXRpb24gb2NjdXJzLiBSZWNlaXZlcyB0aGVcbiAgICogZXZlbnQgb2JqZWN0IGFzIGFuIGFyZ3VtZW50LlxuICAgKiBAcmV0dXJucyBUaGUga2V5IGV2ZW50IHRoYXQgd2FzIHJlZ2lzdGVyZWQuXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcGFyc2VkRXZlbnQgPSBLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSE7XG5cbiAgICBjb25zdCBvdXRzaWRlSGFuZGxlciA9XG4gICAgICAgIEtleUV2ZW50c1BsdWdpbi5ldmVudENhbGxiYWNrKHBhcnNlZEV2ZW50WydmdWxsS2V5J10sIGhhbmRsZXIsIHRoaXMubWFuYWdlci5nZXRab25lKCkpO1xuXG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXRab25lKCkucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIGdldERPTSgpLm9uQW5kQ2FuY2VsKGVsZW1lbnQsIHBhcnNlZEV2ZW50Wydkb21FdmVudE5hbWUnXSwgb3V0c2lkZUhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IHN0cmluZ318bnVsbCB7XG4gICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gZXZlbnROYW1lLnRvTG93ZXJDYXNlKCkuc3BsaXQoJy4nKTtcblxuICAgIGNvbnN0IGRvbUV2ZW50TmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKChwYXJ0cy5sZW5ndGggPT09IDApIHx8ICEoZG9tRXZlbnROYW1lID09PSAna2V5ZG93bicgfHwgZG9tRXZlbnROYW1lID09PSAna2V5dXAnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gS2V5RXZlbnRzUGx1Z2luLl9ub3JtYWxpemVLZXkocGFydHMucG9wKCkhKTtcblxuICAgIGxldCBmdWxsS2V5ID0gJyc7XG4gICAgTU9ESUZJRVJfS0VZUy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFydHMuaW5kZXhPZihtb2RpZmllck5hbWUpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcGFydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZnVsbEtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVsbEtleSArPSBrZXk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9IDAgfHwga2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gcmV0dXJuaW5nIG51bGwgaW5zdGVhZCBvZiB0aHJvd2luZyB0byBsZXQgYW5vdGhlciBwbHVnaW4gcHJvY2VzcyB0aGUgZXZlbnRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVzdWx0Wydkb21FdmVudE5hbWUnXSA9IGRvbUV2ZW50TmFtZTtcbiAgICByZXN1bHRbJ2Z1bGxLZXknXSA9IGZ1bGxLZXk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRFdmVudEZ1bGxLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xuICAgIGxldCBmdWxsS2V5ID0gJyc7XG4gICAgbGV0IGtleSA9IGdldEV2ZW50S2V5KGV2ZW50KTtcbiAgICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoa2V5ID09PSAnICcpIHtcbiAgICAgIGtleSA9ICdzcGFjZSc7ICAvLyBmb3IgcmVhZGFiaWxpdHlcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJy4nKSB7XG4gICAgICBrZXkgPSAnZG90JzsgIC8vIGJlY2F1c2UgJy4nIGlzIHVzZWQgYXMgYSBzZXBhcmF0b3IgaW4gZXZlbnQgbmFtZXNcbiAgICB9XG4gICAgTU9ESUZJRVJfS0VZUy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXJOYW1lICE9IGtleSkge1xuICAgICAgICBjb25zdCBtb2RpZmllckdldHRlciA9IE1PRElGSUVSX0tFWV9HRVRURVJTW21vZGlmaWVyTmFtZV07XG4gICAgICAgIGlmIChtb2RpZmllckdldHRlcihldmVudCkpIHtcbiAgICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuICAgIHJldHVybiBmdWxsS2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBoYW5kbGVyIGNhbGxiYWNrIGZvciBhIGtleSBldmVudC5cbiAgICogQHBhcmFtIGZ1bGxLZXkgVGhlIGV2ZW50IG5hbWUgdGhhdCBjb21iaW5lcyBhbGwgc2ltdWx0YW5lb3VzIGtleXN0cm9rZXMuXG4gICAqIEBwYXJhbSBoYW5kbGVyIFRoZSBmdW5jdGlvbiB0aGF0IHJlc3BvbmRzIHRvIHRoZSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSB6b25lIFRoZSB6b25lIGluIHdoaWNoIHRoZSBldmVudCBvY2N1cnJlZC5cbiAgICogQHJldHVybnMgQSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIHN0YXRpYyBldmVudENhbGxiYWNrKGZ1bGxLZXk6IGFueSwgaGFuZGxlcjogRnVuY3Rpb24sIHpvbmU6IE5nWm9uZSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gKGV2ZW50OiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pID0+IHtcbiAgICAgIGlmIChLZXlFdmVudHNQbHVnaW4uZ2V0RXZlbnRGdWxsS2V5KGV2ZW50KSA9PT0gZnVsbEtleSkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gaGFuZGxlcihldmVudCkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBfbm9ybWFsaXplS2V5KGtleU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogc3dpdGNoIHRvIGEgTWFwIGlmIHRoZSBtYXBwaW5nIGdyb3dzIHRvbyBtdWNoXG4gICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICBjYXNlICdlc2MnOlxuICAgICAgICByZXR1cm4gJ2VzY2FwZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ga2V5TmFtZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RXZlbnRLZXkoZXZlbnQ6IGFueSk6IHN0cmluZyB7XG4gIGxldCBrZXkgPSBldmVudC5rZXk7XG4gIGlmIChrZXkgPT0gbnVsbCkge1xuICAgIGtleSA9IGV2ZW50LmtleUlkZW50aWZpZXI7XG4gICAgLy8ga2V5SWRlbnRpZmllciBpcyBkZWZpbmVkIGluIHRoZSBvbGQgZHJhZnQgb2YgRE9NIExldmVsIDMgRXZlbnRzIGltcGxlbWVudGVkIGJ5IENocm9tZSBhbmRcbiAgICAvLyBTYWZhcmkgY2ZcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA3L1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDA3MTIyMS9ldmVudHMuaHRtbCNFdmVudHMtS2V5Ym9hcmRFdmVudHMtSW50ZXJmYWNlc1xuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdVbmlkZW50aWZpZWQnO1xuICAgIH1cbiAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ1UrJykpIHtcbiAgICAgIGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoa2V5LnN1YnN0cmluZygyKSwgMTYpKTtcbiAgICAgIGlmIChldmVudC5sb2NhdGlvbiA9PT0gRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgJiYgX2Nocm9tZU51bUtleVBhZE1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbiAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTE1NTY1NFxuICAgICAgICAvLyAxLCAyLCAzIC4uLiBhcmUgcmVwb3J0ZWQgYXMgQSwgQiwgQyAuLi5cbiAgICAgICAga2V5ID0gKF9jaHJvbWVOdW1LZXlQYWRNYXAgYXMgYW55KVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfa2V5TWFwW2tleV0gfHwga2V5O1xufVxuIl19