/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
// The following values are here for cross-browser compatibility and to match the W3C standard
// cf https://www.w3.org/TR/DOM-Level-3-Events-key/
const _keyMap = {
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
    'Win': 'OS',
};
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey,
};
/**
 * A browser plug-in that provides support for handling of key events in Angular.
 */
export class KeyEventsPlugin extends EventManagerPlugin {
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
    /**
     * Parses the user provided full keyboard event definition and normalizes it for
     * later internal use. It ensures the string is all lowercase, converts special
     * characters to a standard spelling, and orders all the values consistently.
     *
     * @param eventName The name of the key event to listen for.
     * @returns an object with the full, normalized string, and the dom event name
     * or null in the case when the event doesn't match a keyboard event.
     */
    static parseEventName(eventName) {
        const parts = eventName.toLowerCase().split('.');
        const domEventName = parts.shift();
        if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
            return null;
        }
        const key = KeyEventsPlugin._normalizeKey(parts.pop());
        let fullKey = '';
        let codeIX = parts.indexOf('code');
        if (codeIX > -1) {
            parts.splice(codeIX, 1);
            fullKey = 'code.';
        }
        MODIFIER_KEYS.forEach((modifierName) => {
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
        // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
        //       The code must remain in the `result['domEventName']` form.
        // return {domEventName, fullKey};
        const result = {};
        result['domEventName'] = domEventName;
        result['fullKey'] = fullKey;
        return result;
    }
    /**
     * Determines whether the actual keys pressed match the configured key code string.
     * The `fullKeyCode` event is normalized in the `parseEventName` method when the
     * event is attached to the DOM during the `addEventListener` call. This is unseen
     * by the end user and is normalized for internal consistency and parsing.
     *
     * @param event The keyboard event.
     * @param fullKeyCode The normalized user defined expected key event string
     * @returns boolean.
     */
    static matchEventFullKeyCode(event, fullKeyCode) {
        let keycode = _keyMap[event.key] || event.key;
        let key = '';
        if (fullKeyCode.indexOf('code.') > -1) {
            keycode = event.code;
            key = 'code.';
        }
        // the keycode could be unidentified so we have to check here
        if (keycode == null || !keycode)
            return false;
        keycode = keycode.toLowerCase();
        if (keycode === ' ') {
            keycode = 'space'; // for readability
        }
        else if (keycode === '.') {
            keycode = 'dot'; // because '.' is used as a separator in event names
        }
        MODIFIER_KEYS.forEach((modifierName) => {
            if (modifierName !== keycode) {
                const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                if (modifierGetter(event)) {
                    key += modifierName + '.';
                }
            }
        });
        key += keycode;
        return key === fullKeyCode;
    }
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */
    static eventCallback(fullKey, handler, zone) {
        return (event) => {
            if (KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
                zone.runGuarded(() => handler(event));
            }
        };
    }
    /** @internal */
    static _normalizeKey(keyName) {
        return keyName === 'esc' ? 'escape' : keyName;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: KeyEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: KeyEventsPlugin }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.0-next.0+sha-f271021", ngImport: i0, type: KeyEventsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLE9BQU8sSUFBSSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTFELDhGQUE4RjtBQUM5RixtREFBbUQ7QUFDbkQsTUFBTSxPQUFPLEdBQTBCO0lBQ3JDLElBQUksRUFBRSxXQUFXO0lBQ2pCLElBQUksRUFBRSxLQUFLO0lBQ1gsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLFFBQVE7SUFDZixLQUFLLEVBQUUsUUFBUTtJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRSxTQUFTO0lBQ2YsTUFBTSxFQUFFLFdBQVc7SUFDbkIsTUFBTSxFQUFFLGFBQWE7SUFDckIsUUFBUSxFQUFFLFlBQVk7SUFDdEIsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLG9CQUFvQixHQUF1RDtJQUMvRSxLQUFLLEVBQUUsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTTtJQUM3QyxTQUFTLEVBQUUsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTztJ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R0FBRyxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQzVCLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxHQUFHLElBQUksT0FBTyxDQUFDO1FBQ2YsT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQWUsRUFBRSxPQUFpQixFQUFFLElBQVk7UUFDbkUsT0FBTyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtZQUM5QixJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGdCQUFnQjtJQUNoQixNQUFNLENBQUMsYUFBYSxDQUFDLE9BQWU7UUFDbEMsT0FBTyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNoRCxDQUFDO3lIQS9JVSxlQUFlLGtCQUtOLFFBQVE7NkhBTGpCLGVBQWU7O3NHQUFmLGVBQWU7a0JBRDNCLFVBQVU7OzBCQU1JLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCDJtWdldERPTSBhcyBnZXRET019IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogRGVmaW5lcyBzdXBwb3J0ZWQgbW9kaWZpZXJzIGZvciBrZXkgZXZlbnRzLlxuICovXG5jb25zdCBNT0RJRklFUl9LRVlTID0gWydhbHQnLCAnY29udHJvbCcsICdtZXRhJywgJ3NoaWZ0J107XG5cbi8vIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGFyZSBoZXJlIGZvciBjcm9zcy1icm93c2VyIGNvbXBhdGliaWxpdHkgYW5kIHRvIG1hdGNoIHRoZSBXM0Mgc3RhbmRhcmRcbi8vIGNmIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMta2V5L1xuY29uc3QgX2tleU1hcDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICAnRGVsJzogJ0RlbGV0ZScsXG4gICdFc2MnOiAnRXNjYXBlJyxcbiAgJ0xlZnQnOiAnQXJyb3dMZWZ0JyxcbiAgJ1JpZ2h0JzogJ0Fycm93UmlnaHQnLFxuICAnVXAnOiAnQXJyb3dVcCcsXG4gICdEb3duJzogJ0Fycm93RG93bicsXG4gICdNZW51JzogJ0NvbnRleHRNZW51JyxcbiAgJ1Njcm9sbCc6ICdTY3JvbGxMb2NrJyxcbiAgJ1dpbic6ICdPUycsXG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBtb2RpZmllcnMgZnJvbSBrZXktZXZlbnQgb2JqZWN0cy5cbiAqL1xuY29uc3QgTU9ESUZJRVJfS0VZX0dFVFRFUlM6IHtba2V5OiBzdHJpbmddOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGJvb2xlYW59ID0ge1xuICAnYWx0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5hbHRLZXksXG4gICdjb250cm9sJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5jdHJsS2V5LFxuICAnbWV0YSc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQubWV0YUtleSxcbiAgJ3NoaWZ0JzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5zaGlmdEtleSxcbn07XG5cbi8qKlxuICogQSBicm93c2VyIHBsdWctaW4gdGhhdCBwcm92aWRlcyBzdXBwb3J0IGZvciBoYW5kbGluZyBvZiBrZXkgZXZlbnRzIGluIEFuZ3VsYXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlFdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgcGx1Zy1pbi5cbiAgICogQHBhcmFtIGRvYyBUaGUgZG9jdW1lbnQgaW4gd2hpY2gga2V5IGV2ZW50cyB3aWxsIGJlIGRldGVjdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnkpIHtcbiAgICBzdXBlcihkb2MpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcG9ydHMgd2hldGhlciBhIG5hbWVkIGtleSBldmVudCBpcyBzdXBwb3J0ZWQuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gcXVlcnkuXG4gICAqIEByZXR1cm4gVHJ1ZSBpZiB0aGUgbmFtZWQga2V5IGV2ZW50IGlzIHN1cHBvcnRlZC5cbiAgICovXG4gIG92ZXJyaWRlIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpICE9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50IGFuZCBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVjZWl2ZSBldmVudCBub3RpZmljYXRpb25zLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBrZXkgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIGhhbmRsZXIgQSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIG5vdGlmaWNhdGlvbiBvY2N1cnMuIFJlY2VpdmVzIHRoZVxuICAgKiBldmVudCBvYmplY3QgYXMgYW4gYXJndW1lbnQuXG4gICAqIEByZXR1cm5zIFRoZSBrZXkgZXZlbnQgdGhhdCB3YXMgcmVnaXN0ZXJlZC5cbiAgICovXG4gIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCBwYXJzZWRFdmVudCA9IEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpITtcblxuICAgIGNvbnN0IG91dHNpZGVIYW5kbGVyID0gS2V5RXZlbnRzUGx1Z2luLmV2ZW50Q2FsbGJhY2soXG4gICAgICBwYXJzZWRFdmVudFsnZnVsbEtleSddLFxuICAgICAgaGFuZGxlcixcbiAgICAgIHRoaXMubWFuYWdlci5nZXRab25lKCksXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRET00oKS5vbkFuZENhbmNlbChlbGVtZW50LCBwYXJzZWRFdmVudFsnZG9tRXZlbnROYW1lJ10sIG91dHNpZGVIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIHVzZXIgcHJvdmlkZWQgZnVsbCBrZXlib2FyZCBldmVudCBkZWZpbml0aW9uIGFuZCBub3JtYWxpemVzIGl0IGZvclxuICAgKiBsYXRlciBpbnRlcm5hbCB1c2UuIEl0IGVuc3VyZXMgdGhlIHN0cmluZyBpcyBhbGwgbG93ZXJjYXNlLCBjb252ZXJ0cyBzcGVjaWFsXG4gICAqIGNoYXJhY3RlcnMgdG8gYSBzdGFuZGFyZCBzcGVsbGluZywgYW5kIG9yZGVycyBhbGwgdGhlIHZhbHVlcyBjb25zaXN0ZW50bHkuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGtleSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgZnVsbCwgbm9ybWFsaXplZCBzdHJpbmcsIGFuZCB0aGUgZG9tIGV2ZW50IG5hbWVcbiAgICogb3IgbnVsbCBpbiB0aGUgY2FzZSB3aGVuIHRoZSBldmVudCBkb2Vzbid0IG1hdGNoIGEga2V5Ym9hcmQgZXZlbnQuXG4gICAqL1xuICBzdGF0aWMgcGFyc2VFdmVudE5hbWUoZXZlbnROYW1lOiBzdHJpbmcpOiB7ZnVsbEtleTogc3RyaW5nOyBkb21FdmVudE5hbWU6IHN0cmluZ30gfCBudWxsIHtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnLicpO1xuXG4gICAgY29uc3QgZG9tRXZlbnROYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICBpZiAocGFydHMubGVuZ3RoID09PSAwIHx8ICEoZG9tRXZlbnROYW1lID09PSAna2V5ZG93bicgfHwgZG9tRXZlbnROYW1lID09PSAna2V5dXAnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gS2V5RXZlbnRzUGx1Z2luLl9ub3JtYWxpemVLZXkocGFydHMucG9wKCkhKTtcblxuICAgIGxldCBmdWxsS2V5ID0gJyc7XG4gICAgbGV0IGNvZGVJWCA9IHBhcnRzLmluZGV4T2YoJ2NvZGUnKTtcbiAgICBpZiAoY29kZUlYID4gLTEpIHtcbiAgICAgIHBhcnRzLnNwbGljZShjb2RlSVgsIDEpO1xuICAgICAgZnVsbEtleSA9ICdjb2RlLic7XG4gICAgfVxuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaCgobW9kaWZpZXJOYW1lKSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFydHMuaW5kZXhPZihtb2RpZmllck5hbWUpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcGFydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZnVsbEtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVsbEtleSArPSBrZXk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9IDAgfHwga2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gcmV0dXJuaW5nIG51bGwgaW5zdGVhZCBvZiB0aHJvd2luZyB0byBsZXQgYW5vdGhlciBwbHVnaW4gcHJvY2VzcyB0aGUgZXZlbnRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIE5PVEU6IFBsZWFzZSBkb24ndCByZXdyaXRlIHRoaXMgYXMgc28sIGFzIGl0IHdpbGwgYnJlYWsgSlNDb21waWxlciBwcm9wZXJ0eSByZW5hbWluZy5cbiAgICAvLyAgICAgICBUaGUgY29kZSBtdXN0IHJlbWFpbiBpbiB0aGUgYHJlc3VsdFsnZG9tRXZlbnROYW1lJ11gIGZvcm0uXG4gICAgLy8gcmV0dXJuIHtkb21FdmVudE5hbWUsIGZ1bGxLZXl9O1xuICAgIGNvbnN0IHJlc3VsdDoge2Z1bGxLZXk6IHN0cmluZzsgZG9tRXZlbnROYW1lOiBzdHJpbmd9ID0ge30gYXMgYW55O1xuICAgIHJlc3VsdFsnZG9tRXZlbnROYW1lJ10gPSBkb21FdmVudE5hbWU7XG4gICAgcmVzdWx0WydmdWxsS2V5J10gPSBmdWxsS2V5O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBhY3R1YWwga2V5cyBwcmVzc2VkIG1hdGNoIHRoZSBjb25maWd1cmVkIGtleSBjb2RlIHN0cmluZy5cbiAgICogVGhlIGBmdWxsS2V5Q29kZWAgZXZlbnQgaXMgbm9ybWFsaXplZCBpbiB0aGUgYHBhcnNlRXZlbnROYW1lYCBtZXRob2Qgd2hlbiB0aGVcbiAgICogZXZlbnQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSBkdXJpbmcgdGhlIGBhZGRFdmVudExpc3RlbmVyYCBjYWxsLiBUaGlzIGlzIHVuc2VlblxuICAgKiBieSB0aGUgZW5kIHVzZXIgYW5kIGlzIG5vcm1hbGl6ZWQgZm9yIGludGVybmFsIGNvbnNpc3RlbmN5IGFuZCBwYXJzaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgVGhlIGtleWJvYXJkIGV2ZW50LlxuICAgKiBAcGFyYW0gZnVsbEtleUNvZGUgVGhlIG5vcm1hbGl6ZWQgdXNlciBkZWZpbmVkIGV4cGVjdGVkIGtleSBldmVudCBzdHJpbmdcbiAgICogQHJldHVybnMgYm9vbGVhbi5cbiAgICovXG4gIHN0YXRpYyBtYXRjaEV2ZW50RnVsbEtleUNvZGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGZ1bGxLZXlDb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQga2V5Y29kZSA9IF9rZXlNYXBbZXZlbnQua2V5XSB8fCBldmVudC5rZXk7XG4gICAgbGV0IGtleSA9ICcnO1xuICAgIGlmIChmdWxsS2V5Q29kZS5pbmRleE9mKCdjb2RlLicpID4gLTEpIHtcbiAgICAgIGtleWNvZGUgPSBldmVudC5jb2RlO1xuICAgICAga2V5ID0gJ2NvZGUuJztcbiAgICB9XG4gICAgLy8gdGhlIGtleWNvZGUgY291bGQgYmUgdW5pZGVudGlmaWVkIHNvIHdlIGhhdmUgdG8gY2hlY2sgaGVyZVxuICAgIGlmIChrZXljb2RlID09IG51bGwgfHwgIWtleWNvZGUpIHJldHVybiBmYWxzZTtcbiAgICBrZXljb2RlID0ga2V5Y29kZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChrZXljb2RlID09PSAnICcpIHtcbiAgICAgIGtleWNvZGUgPSAnc3BhY2UnOyAvLyBmb3IgcmVhZGFiaWxpdHlcbiAgICB9IGVsc2UgaWYgKGtleWNvZGUgPT09ICcuJykge1xuICAgICAga2V5Y29kZSA9ICdkb3QnOyAvLyBiZWNhdXNlICcuJyBpcyB1c2VkIGFzIGEgc2VwYXJhdG9yIGluIGV2ZW50IG5hbWVzXG4gICAgfVxuICAgIE1PRElGSUVSX0tFWVMuZm9yRWFjaCgobW9kaWZpZXJOYW1lKSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXJOYW1lICE9PSBrZXljb2RlKSB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVyR2V0dGVyID0gTU9ESUZJRVJfS0VZX0dFVFRFUlNbbW9kaWZpZXJOYW1lXTtcbiAgICAgICAgaWYgKG1vZGlmaWVyR2V0dGVyKGV2ZW50KSkge1xuICAgICAgICAgIGtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBrZXkgKz0ga2V5Y29kZTtcbiAgICByZXR1cm4ga2V5ID09PSBmdWxsS2V5Q29kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgaGFuZGxlciBjYWxsYmFjayBmb3IgYSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBmdWxsS2V5IFRoZSBldmVudCBuYW1lIHRoYXQgY29tYmluZXMgYWxsIHNpbXVsdGFuZW91cyBrZXlzdHJva2VzLlxuICAgKiBAcGFyYW0gaGFuZGxlciBUaGUgZnVuY3Rpb24gdGhhdCByZXNwb25kcyB0byB0aGUga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gem9uZSBUaGUgem9uZSBpbiB3aGljaCB0aGUgZXZlbnQgb2NjdXJyZWQuXG4gICAqIEByZXR1cm5zIEEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgZXZlbnRDYWxsYmFjayhmdWxsS2V5OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uLCB6b25lOiBOZ1pvbmUpOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKEtleUV2ZW50c1BsdWdpbi5tYXRjaEV2ZW50RnVsbEtleUNvZGUoZXZlbnQsIGZ1bGxLZXkpKSB7XG4gICAgICAgIHpvbmUucnVuR3VhcmRlZCgoKSA9PiBoYW5kbGVyKGV2ZW50KSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9ub3JtYWxpemVLZXkoa2V5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4ga2V5TmFtZSA9PT0gJ2VzYycgPyAnZXNjYXBlJyA6IGtleU5hbWU7XG4gIH1cbn1cbiJdfQ==