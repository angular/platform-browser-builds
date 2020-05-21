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
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey
};
/**
 * @publicApi
 * A browser plug-in that provides support for handling of key events in Angular.
 */
let KeyEventsPlugin = /** @class */ (() => {
    class KeyEventsPlugin extends EventManagerPlugin {
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
            return KeyEventsPlugin.parseEventName(eventName) != null;
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
            const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
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
            const key = KeyEventsPlugin._normalizeKey(parts.pop());
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
                if (KeyEventsPlugin.getEventFullKey(event) === fullKey) {
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
    }
    KeyEventsPlugin.ɵfac = function KeyEventsPlugin_Factory(t) { return new (t || KeyEventsPlugin)(i0.ɵɵinject(DOCUMENT)); };
    KeyEventsPlugin.ɵprov = i0.ɵɵdefineInjectable({ token: KeyEventsPlugin, factory: KeyEventsPlugin.ɵfac });
    return KeyEventsPlugin;
})();
export { KeyEventsPlugin };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(KeyEventsPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTFELE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLDBGQUEwRjtBQUMxRixNQUFNLE9BQU8sR0FBMEI7SUFDckMsOEZBQThGO0lBQzlGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0QsMENBQTBDO0FBQzFDLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUsR0FBRztJ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QUMsQ0FBQyxDQUFDO1lBQzFELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyx1QkFBdUIsSUFBSSxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pGLG9EQUFvRDtnQkFDcEQsNkRBQTZEO2dCQUM3RCwwQ0FBMEM7Z0JBQzFDLEdBQUcsR0FBSSxtQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QztTQUNGO0tBQ0Y7SUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZWZpbmVzIHN1cHBvcnRlZCBtb2RpZmllcnMgZm9yIGtleSBldmVudHMuXG4gKi9cbmNvbnN0IE1PRElGSUVSX0tFWVMgPSBbJ2FsdCcsICdjb250cm9sJywgJ21ldGEnLCAnc2hpZnQnXTtcblxuY29uc3QgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAzO1xuXG4vLyBNYXAgdG8gY29udmVydCBzb21lIGtleSBvciBrZXlJZGVudGlmaWVyIHZhbHVlcyB0byB3aGF0IHdpbGwgYmUgcmV0dXJuZWQgYnkgZ2V0RXZlbnRLZXlcbmNvbnN0IF9rZXlNYXA6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgLy8gVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIGhlcmUgZm9yIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJpbGl0eSBhbmQgdG8gbWF0Y2ggdGhlIFczQyBzdGFuZGFyZFxuICAvLyBjZiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMta2V5L1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICAnRGVsJzogJ0RlbGV0ZScsXG4gICdFc2MnOiAnRXNjYXBlJyxcbiAgJ0xlZnQnOiAnQXJyb3dMZWZ0JyxcbiAgJ1JpZ2h0JzogJ0Fycm93UmlnaHQnLFxuICAnVXAnOiAnQXJyb3dVcCcsXG4gICdEb3duJzogJ0Fycm93RG93bicsXG4gICdNZW51JzogJ0NvbnRleHRNZW51JyxcbiAgJ1Njcm9sbCc6ICdTY3JvbGxMb2NrJyxcbiAgJ1dpbic6ICdPUydcbn07XG5cbi8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbi8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuY29uc3QgX2Nocm9tZU51bUtleVBhZE1hcCA9IHtcbiAgJ0EnOiAnMScsXG4gICdCJzogJzInLFxuICAnQyc6ICczJyxcbiAgJ0QnOiAnNCcsXG4gICdFJzogJzUnLFxuICAnRic6ICc2JyxcbiAgJ0cnOiAnNycsXG4gICdIJzogJzgnLFxuICAnSSc6ICc5JyxcbiAgJ0onOiAnKicsXG4gICdLJzogJysnLFxuICAnTSc6ICctJyxcbiAgJ04nOiAnLicsXG4gICdPJzogJy8nLFxuICAnXFx4NjAnOiAnMCcsXG4gICdcXHg5MCc6ICdOdW1Mb2NrJ1xufTtcblxuXG4vKipcbiAqIFJldHJpZXZlcyBtb2RpZmllcnMgZnJvbSBrZXktZXZlbnQgb2JqZWN0cy5cbiAqL1xuY29uc3QgTU9ESUZJRVJfS0VZX0dFVFRFUlM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGJvb2xlYW59ID0ge1xuICAnYWx0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5hbHRLZXksXG4gICdjb250cm9sJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5jdHJsS2V5LFxuICAnbWV0YSc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQubWV0YUtleSxcbiAgJ3NoaWZ0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5zaGlmdEtleVxufTtcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKiBBIGJyb3dzZXIgcGx1Zy1pbiB0aGF0IHByb3ZpZGVzIHN1cHBvcnQgZm9yIGhhbmRsaW5nIG9mIGtleSBldmVudHMgaW4gQW5ndWxhci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEtleUV2ZW50c1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhbiBpbnN0YW5jZSBvZiB0aGUgYnJvd3NlciBwbHVnLWluLlxuICAgKiBAcGFyYW0gZG9jIFRoZSBkb2N1bWVudCBpbiB3aGljaCBrZXkgZXZlbnRzIHdpbGwgYmUgZGV0ZWN0ZWQuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICAvKipcbiAgICogUmVwb3J0cyB3aGV0aGVyIGEgbmFtZWQga2V5IGV2ZW50IGlzIHN1cHBvcnRlZC5cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSB0byBxdWVyeS5cbiAgICogQHJldHVybiBUcnVlIGlmIHRoZSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxuICAgKi9cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkgIT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIGZvciBhIHNwZWNpZmljIGVsZW1lbnQgYW5kIGtleSBldmVudC5cbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB0byByZWNlaXZlIGV2ZW50IG5vdGlmaWNhdGlvbnMuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGtleSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXG4gICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybnMgVGhlIGtleSBldmVudCB0aGF0IHdhcyByZWdpc3RlcmVkLlxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBhcnNlZEV2ZW50ID0gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkhO1xuXG4gICAgY29uc3Qgb3V0c2lkZUhhbmRsZXIgPVxuICAgICAgICBLZXlFdmVudHNQbHVnaW4uZXZlbnRDYWxsYmFjayhwYXJzZWRFdmVudFsnZnVsbEtleSddLCBoYW5kbGVyLCB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpKTtcblxuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRET00oKS5vbkFuZENhbmNlbChlbGVtZW50LCBwYXJzZWRFdmVudFsnZG9tRXZlbnROYW1lJ10sIG91dHNpZGVIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUV2ZW50TmFtZShldmVudE5hbWU6IHN0cmluZyk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9fG51bGwge1xuICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcuJyk7XG5cbiAgICBjb25zdCBkb21FdmVudE5hbWUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIGlmICgocGFydHMubGVuZ3RoID09PSAwKSB8fCAhKGRvbUV2ZW50TmFtZSA9PT0gJ2tleWRvd24nIHx8IGRvbUV2ZW50TmFtZSA9PT0gJ2tleXVwJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IEtleUV2ZW50c1BsdWdpbi5fbm9ybWFsaXplS2V5KHBhcnRzLnBvcCgpISk7XG5cbiAgICBsZXQgZnVsbEtleSA9ICcnO1xuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaChtb2RpZmllck5hbWUgPT4ge1xuICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHBhcnRzLmluZGV4T2YobW9kaWZpZXJOYW1lKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHBhcnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZ1bGxLZXkgKz0gbW9kaWZpZXJOYW1lICsgJy4nO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPSAwIHx8IGtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHJldHVybmluZyBudWxsIGluc3RlYWQgb2YgdGhyb3dpbmcgdG8gbGV0IGFub3RoZXIgcGx1Z2luIHByb2Nlc3MgdGhlIGV2ZW50XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQ6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHJlc3VsdFsnZG9tRXZlbnROYW1lJ10gPSBkb21FdmVudE5hbWU7XG4gICAgcmVzdWx0WydmdWxsS2V5J10gPSBmdWxsS2V5O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXZlbnRGdWxsS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcbiAgICBsZXQgZnVsbEtleSA9ICcnO1xuICAgIGxldCBrZXkgPSBnZXRFdmVudEtleShldmVudCk7XG4gICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGtleSA9PT0gJyAnKSB7XG4gICAgICBrZXkgPSAnc3BhY2UnOyAgLy8gZm9yIHJlYWRhYmlsaXR5XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICcuJykge1xuICAgICAga2V5ID0gJ2RvdCc7ICAvLyBiZWNhdXNlICcuJyBpcyB1c2VkIGFzIGEgc2VwYXJhdG9yIGluIGV2ZW50IG5hbWVzXG4gICAgfVxuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaChtb2RpZmllck5hbWUgPT4ge1xuICAgICAgaWYgKG1vZGlmaWVyTmFtZSAhPSBrZXkpIHtcbiAgICAgICAgY29uc3QgbW9kaWZpZXJHZXR0ZXIgPSBNT0RJRklFUl9LRVlfR0VUVEVSU1ttb2RpZmllck5hbWVdO1xuICAgICAgICBpZiAobW9kaWZpZXJHZXR0ZXIoZXZlbnQpKSB7XG4gICAgICAgICAgZnVsbEtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdWxsS2V5ICs9IGtleTtcbiAgICByZXR1cm4gZnVsbEtleTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgaGFuZGxlciBjYWxsYmFjayBmb3IgYSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBmdWxsS2V5IFRoZSBldmVudCBuYW1lIHRoYXQgY29tYmluZXMgYWxsIHNpbXVsdGFuZW91cyBrZXlzdHJva2VzLlxuICAgKiBAcGFyYW0gaGFuZGxlciBUaGUgZnVuY3Rpb24gdGhhdCByZXNwb25kcyB0byB0aGUga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gem9uZSBUaGUgem9uZSBpbiB3aGljaCB0aGUgZXZlbnQgb2NjdXJyZWQuXG4gICAqIEByZXR1cm5zIEEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgZXZlbnRDYWxsYmFjayhmdWxsS2V5OiBhbnksIGhhbmRsZXI6IEZ1bmN0aW9uLCB6b25lOiBOZ1pvbmUpOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudDogYW55IC8qKiBUT0RPICM5MTAwICovKSA9PiB7XG4gICAgICBpZiAoS2V5RXZlbnRzUGx1Z2luLmdldEV2ZW50RnVsbEtleShldmVudCkgPT09IGZ1bGxLZXkpIHtcbiAgICAgICAgem9uZS5ydW5HdWFyZGVkKCgpID0+IGhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX25vcm1hbGl6ZUtleShrZXlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFRPRE86IHN3aXRjaCB0byBhIE1hcCBpZiB0aGUgbWFwcGluZyBncm93cyB0b28gbXVjaFxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgY2FzZSAnZXNjJzpcbiAgICAgICAgcmV0dXJuICdlc2NhcGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGtleU5hbWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcge1xuICBsZXQga2V5ID0gZXZlbnQua2V5O1xuICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICBrZXkgPSBldmVudC5rZXlJZGVudGlmaWVyO1xuICAgIC8vIGtleUlkZW50aWZpZXIgaXMgZGVmaW5lZCBpbiB0aGUgb2xkIGRyYWZ0IG9mIERPTSBMZXZlbCAzIEV2ZW50cyBpbXBsZW1lbnRlZCBieSBDaHJvbWUgYW5kXG4gICAgLy8gU2FmYXJpIGNmXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnVW5pZGVudGlmaWVkJztcbiAgICB9XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCdVKycpKSB7XG4gICAgICBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGtleS5zdWJzdHJpbmcoMiksIDE2KSk7XG4gICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAvLyBUaGVyZSBpcyBhIGJ1ZyBpbiBDaHJvbWUgZm9yIG51bWVyaWMga2V5cGFkIGtleXM6XG4gICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbiAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgIGtleSA9IChfY2hyb21lTnVtS2V5UGFkTWFwIGFzIGFueSlba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2tleU1hcFtrZXldIHx8IGtleTtcbn1cbiJdfQ==