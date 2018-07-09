/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { getDOM } from '../dom_adapter';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
/**
 * Defines supported modifiers for key events.
 */
var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
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
 * @experimental
 * A browser plug-in that provides support for handling of key events in Angular.
 */
var KeyEventsPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(KeyEventsPlugin, _super);
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    function KeyEventsPlugin(doc) {
        return _super.call(this, doc) || this;
    }
    KeyEventsPlugin_1 = KeyEventsPlugin;
    /**
      * Reports whether a named key event is supported.
      * @param eventName The event name to query.
      * @return True if the named key event is supported.
     */
    KeyEventsPlugin.prototype.supports = function (eventName) { return KeyEventsPlugin_1.parseEventName(eventName) != null; };
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
    */
    KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var parsedEvent = KeyEventsPlugin_1.parseEventName(eventName);
        var outsideHandler = KeyEventsPlugin_1.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
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
        var key = KeyEventsPlugin_1._normalizeKey(parts.pop());
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
        var key = getDOM().getEventKey(event);
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
            if (KeyEventsPlugin_1.getEventFullKey(event) === fullKey) {
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
    KeyEventsPlugin = KeyEventsPlugin_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], KeyEventsPlugin);
    return KeyEventsPlugin;
    var KeyEventsPlugin_1;
}(EventManagerPlugin));
export { KeyEventsPlugin };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxJQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTFEOztHQUVHO0FBQ0gsSUFBTSxvQkFBb0IsR0FBdUQ7SUFDL0UsS0FBSyxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEVBQVosQ0FBWTtJQUM3QyxTQUFTLEVBQUUsVUFBQyxLQUFvQixJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sRUFBYixDQUFhO0lBQ2xELE1BQU0sRUFBRSxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFiLENBQWE7SUFDL0MsT0FBTyxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQWQsQ0FBYztDQUNsRCxDQUFDO0FBRUY7OztHQUdHO0FBRUg7SUFBcUMsMkNBQWtCO0lBQ3JEOzs7T0FHRztJQUNILHlCQUE4QixHQUFRO2VBQUksa0JBQU0sR0FBRyxDQUFDO0lBQUUsQ0FBQzt3QkFMNUMsZUFBZTtJQU8xQjs7OztPQUlHO0lBQ0gsa0NBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsTUFB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QkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O09BTGxCLGVBQWUsQ0E4RzNCO0lBQUQsc0JBQUM7O0NBQUEsQUE5R0QsQ0FBcUMsa0JBQWtCLEdBOEd0RDtTQTlHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtnZXRET019IGZyb20gJy4uL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbV90b2tlbnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBEZWZpbmVzIHN1cHBvcnRlZCBtb2RpZmllcnMgZm9yIGtleSBldmVudHMuXG4gKi9cbmNvbnN0IE1PRElGSUVSX0tFWVMgPSBbJ2FsdCcsICdjb250cm9sJywgJ21ldGEnLCAnc2hpZnQnXTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgbW9kaWZpZXJzIGZyb20ga2V5LWV2ZW50IG9iamVjdHMuXG4gKi9cbmNvbnN0IE1PRElGSUVSX0tFWV9HRVRURVJTOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBib29sZWFufSA9IHtcbiAgJ2FsdCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuYWx0S2V5LFxuICAnY29udHJvbCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuY3RybEtleSxcbiAgJ21ldGEnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50Lm1ldGFLZXksXG4gICdzaGlmdCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuc2hpZnRLZXlcbn07XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICogQSBicm93c2VyIHBsdWctaW4gdGhhdCBwcm92aWRlcyBzdXBwb3J0IGZvciBoYW5kbGluZyBvZiBrZXkgZXZlbnRzIGluIEFuZ3VsYXIuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlFdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGJyb3dzZXIgcGx1Zy1pbi5cbiAgICogQHBhcmFtIGRvYyBUaGUgZG9jdW1lbnQgaW4gd2hpY2gga2V5IGV2ZW50cyB3aWxsIGJlIGRldGVjdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnkpIHsgc3VwZXIoZG9jKTsgfVxuXG4gIC8qKlxuICAgICogUmVwb3J0cyB3aGV0aGVyIGEgbmFtZWQga2V5IGV2ZW50IGlzIHN1cHBvcnRlZC5cbiAgICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgdG8gcXVlcnkuXG4gICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIG5hbWVkIGtleSBldmVudCBpcyBzdXBwb3J0ZWQuXG4gICAqL1xuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkgIT0gbnVsbDsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIGZvciBhIHNwZWNpZmljIGVsZW1lbnQgYW5kIGtleSBldmVudC5cbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB0byByZWNlaXZlIGV2ZW50IG5vdGlmaWNhdGlvbnMuXG4gICAqIEBwYXJhbSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGtleSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gaGFuZGxlciBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgbm90aWZpY2F0aW9uIG9jY3Vycy4gUmVjZWl2ZXMgdGhlXG4gICAqIGV2ZW50IG9iamVjdCBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybnMgVGhlIGtleSBldmVudCB0aGF0IHdhcyByZWdpc3RlcmVkLlxuICAqL1xuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgY29uc3QgcGFyc2VkRXZlbnQgPSBLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSAhO1xuXG4gICAgY29uc3Qgb3V0c2lkZUhhbmRsZXIgPVxuICAgICAgICBLZXlFdmVudHNQbHVnaW4uZXZlbnRDYWxsYmFjayhwYXJzZWRFdmVudFsnZnVsbEtleSddLCBoYW5kbGVyLCB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpKTtcblxuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBnZXRET00oKS5vbkFuZENhbmNlbChlbGVtZW50LCBwYXJzZWRFdmVudFsnZG9tRXZlbnROYW1lJ10sIG91dHNpZGVIYW5kbGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUV2ZW50TmFtZShldmVudE5hbWU6IHN0cmluZyk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9fG51bGwge1xuICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcuJyk7XG5cbiAgICBjb25zdCBkb21FdmVudE5hbWUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIGlmICgocGFydHMubGVuZ3RoID09PSAwKSB8fCAhKGRvbUV2ZW50TmFtZSA9PT0gJ2tleWRvd24nIHx8IGRvbUV2ZW50TmFtZSA9PT0gJ2tleXVwJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IEtleUV2ZW50c1BsdWdpbi5fbm9ybWFsaXplS2V5KHBhcnRzLnBvcCgpICEpO1xuXG4gICAgbGV0IGZ1bGxLZXkgPSAnJztcbiAgICBNT0RJRklFUl9LRVlTLmZvckVhY2gobW9kaWZpZXJOYW1lID0+IHtcbiAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSBwYXJ0cy5pbmRleE9mKG1vZGlmaWVyTmFtZSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBwYXJ0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdWxsS2V5ICs9IGtleTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT0gMCB8fCBrZXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyByZXR1cm5pbmcgbnVsbCBpbnN0ZWFkIG9mIHRocm93aW5nIHRvIGxldCBhbm90aGVyIHBsdWdpbiBwcm9jZXNzIHRoZSBldmVudFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICByZXN1bHRbJ2RvbUV2ZW50TmFtZSddID0gZG9tRXZlbnROYW1lO1xuICAgIHJlc3VsdFsnZnVsbEtleSddID0gZnVsbEtleTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3RhdGljIGdldEV2ZW50RnVsbEtleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHN0cmluZyB7XG4gICAgbGV0IGZ1bGxLZXkgPSAnJztcbiAgICBsZXQga2V5ID0gZ2V0RE9NKCkuZ2V0RXZlbnRLZXkoZXZlbnQpO1xuICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChrZXkgPT09ICcgJykge1xuICAgICAga2V5ID0gJ3NwYWNlJzsgIC8vIGZvciByZWFkYWJpbGl0eVxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnLicpIHtcbiAgICAgIGtleSA9ICdkb3QnOyAgLy8gYmVjYXVzZSAnLicgaXMgdXNlZCBhcyBhIHNlcGFyYXRvciBpbiBldmVudCBuYW1lc1xuICAgIH1cbiAgICBNT0RJRklFUl9LRVlTLmZvckVhY2gobW9kaWZpZXJOYW1lID0+IHtcbiAgICAgIGlmIChtb2RpZmllck5hbWUgIT0ga2V5KSB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVyR2V0dGVyID0gTU9ESUZJRVJfS0VZX0dFVFRFUlNbbW9kaWZpZXJOYW1lXTtcbiAgICAgICAgaWYgKG1vZGlmaWVyR2V0dGVyKGV2ZW50KSkge1xuICAgICAgICAgIGZ1bGxLZXkgKz0gbW9kaWZpZXJOYW1lICsgJy4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVsbEtleSArPSBrZXk7XG4gICAgcmV0dXJuIGZ1bGxLZXk7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlcyBhIGhhbmRsZXIgY2FsbGJhY2sgZm9yIGEga2V5IGV2ZW50LlxuICAgKiBAcGFyYW0gZnVsbEtleSBUaGUgZXZlbnQgbmFtZSB0aGF0IGNvbWJpbmVzIGFsbCBzaW11bHRhbmVvdXMga2V5c3Ryb2tlcy5cbiAgICogQHBhcmFtIGhhbmRsZXIgVGhlIGZ1bmN0aW9uIHRoYXQgcmVzcG9uZHMgdG8gdGhlIGtleSBldmVudC5cbiAgICogQHBhcmFtIHpvbmUgVGhlIHpvbmUgaW4gd2hpY2ggdGhlIGV2ZW50IG9jY3VycmVkLlxuICAgKiBAcmV0dXJucyBBIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgc3RhdGljIGV2ZW50Q2FsbGJhY2soZnVsbEtleTogYW55LCBoYW5kbGVyOiBGdW5jdGlvbiwgem9uZTogTmdab25lKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiAoZXZlbnQ6IGFueSAvKiogVE9ETyAjOTEwMCAqLykgPT4ge1xuICAgICAgaWYgKEtleUV2ZW50c1BsdWdpbi5nZXRFdmVudEZ1bGxLZXkoZXZlbnQpID09PSBmdWxsS2V5KSB7XG4gICAgICAgIHpvbmUucnVuR3VhcmRlZCgoKSA9PiBoYW5kbGVyKGV2ZW50KSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9ub3JtYWxpemVLZXkoa2V5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPOiBzd2l0Y2ggdG8gYSBNYXAgaWYgdGhlIG1hcHBpbmcgZ3Jvd3MgdG9vIG11Y2hcbiAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgIGNhc2UgJ2VzYyc6XG4gICAgICAgIHJldHVybiAnZXNjYXBlJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBrZXlOYW1lO1xuICAgIH1cbiAgfVxufVxuIl19