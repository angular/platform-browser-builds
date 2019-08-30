/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
/**
 * Defines supported modifiers for key events.
 */
var MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
var ɵ0 = function (event) { return event.altKey; }, ɵ1 = function (event) { return event.ctrlKey; }, ɵ2 = function (event) { return event.metaKey; }, ɵ3 = function (event) { return event.shiftKey; };
/**
 * Retrieves modifiers from key-event objects.
 */
var MODIFIER_KEY_GETTERS = {
    'alt': ɵ0,
    'control': ɵ1,
    'meta': ɵ2,
    'shift': ɵ3
};
/**
 * @publicApi
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
    var KeyEventsPlugin_1;
    KeyEventsPlugin = KeyEventsPlugin_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], KeyEventsPlugin);
    return KeyEventsPlugin;
}(EventManagerPlugin));
export { KeyEventsPlugin };
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxJQUFNLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBTWpELFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEVBQVosQ0FBWSxPQUNsQyxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFiLENBQWEsT0FDMUMsVUFBQyxLQUFvQixJQUFLLE9BQUEsS0FBSyxDQUFDLE9BQU8sRUFBYixDQUFhLE9BQ3RDLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQWQsQ0FBYztBQVBuRDs7R0FFRztBQUNILElBQU0sb0JBQW9CLEdBQXVEO0lBQy9FLEtBQUssSUFBd0M7SUFDN0MsU0FBUyxJQUF5QztJQUNsRCxNQUFNLElBQXlDO0lBQy9DLE9BQU8sSUFBMEM7Q0FDbEQsQ0FBQztBQUVGOzs7R0FHRztBQUVIO0lBQXFDLDJDQUFrQjtJQUNyRDs7O09BR0c7SUFDSCx5QkFBOEIsR0FBUTtlQUFJLGtCQUFNLEdBQUcsQ0FBQztJQUFFLENBQUM7d0JBTDVDLGVBQWU7SUFPMUI7Ozs7T0FJRztJQUNILGtDQUFRLEdBQVIsVUFBUyxTQUFpQixJ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Q0FBQyxDQUFDO2dCQUMxRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDekIsT0FBTyxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUM7aUJBQy9CO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxHQUFHLENBQUM7UUFDZixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksNkJBQWEsR0FBcEIsVUFBcUIsT0FBWSxFQUFFLE9BQWlCLEVBQUUsSUFBWTtRQUNoRSxPQUFPLFVBQUMsS0FBVSxDQUFDLGlCQUFpQjtZQUNsQyxJQUFJLGlCQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLE9BQU8sRUFBRTtnQkFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGdCQUFnQjtJQUNULDZCQUFhLEdBQXBCLFVBQXFCLE9BQWU7UUFDbEMsc0RBQXNEO1FBQ3RELFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxLQUFLO2dCQUNSLE9BQU8sUUFBUSxDQUFDO1lBQ2xCO2dCQUNFLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQzs7SUE3R1UsZUFBZTtRQUQzQixVQUFVLEVBQUU7UUFNRSxtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O09BTGxCLGVBQWUsQ0E4RzNCO0lBQUQsc0JBQUM7Q0FBQSxBQTlHRCxDQUFxQyxrQkFBa0IsR0E4R3REO1NBOUdZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogRGVmaW5lcyBzdXBwb3J0ZWQgbW9kaWZpZXJzIGZvciBrZXkgZXZlbnRzLlxuICovXG5jb25zdCBNT0RJRklFUl9LRVlTID0gWydhbHQnLCAnY29udHJvbCcsICdtZXRhJywgJ3NoaWZ0J107XG5cbi8qKlxuICogUmV0cmlldmVzIG1vZGlmaWVycyBmcm9tIGtleS1ldmVudCBvYmplY3RzLlxuICovXG5jb25zdCBNT0RJRklFUl9LRVlfR0VUVEVSUzoge1trZXk6IHN0cmluZ106IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gYm9vbGVhbn0gPSB7XG4gICdhbHQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmFsdEtleSxcbiAgJ2NvbnRyb2wnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmN0cmxLZXksXG4gICdtZXRhJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5tZXRhS2V5LFxuICAnc2hpZnQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LnNoaWZ0S2V5XG59O1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqIEEgYnJvd3NlciBwbHVnLWluIHRoYXQgcHJvdmlkZXMgc3VwcG9ydCBmb3IgaGFuZGxpbmcgb2Yga2V5IGV2ZW50cyBpbiBBbmd1bGFyLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5RXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGFuIGluc3RhbmNlIG9mIHRoZSBicm93c2VyIHBsdWctaW4uXG4gICAqIEBwYXJhbSBkb2MgVGhlIGRvY3VtZW50IGluIHdoaWNoIGtleSBldmVudHMgd2lsbCBiZSBkZXRlY3RlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7IHN1cGVyKGRvYyk7IH1cblxuICAvKipcbiAgICAqIFJlcG9ydHMgd2hldGhlciBhIG5hbWVkIGtleSBldmVudCBpcyBzdXBwb3J0ZWQuXG4gICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIHF1ZXJ5LlxuICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBuYW1lZCBrZXkgZXZlbnQgaXMgc3VwcG9ydGVkLlxuICAgKi9cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpICE9IG51bGw7IH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgaGFuZGxlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50IGFuZCBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBIVE1MIGVsZW1lbnQgdG8gcmVjZWl2ZSBldmVudCBub3RpZmljYXRpb25zLlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBrZXkgZXZlbnQgdG8gbGlzdGVuIGZvci5cbiAgICogQHBhcmFtIGhhbmRsZXIgQSBmdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIG5vdGlmaWNhdGlvbiBvY2N1cnMuIFJlY2VpdmVzIHRoZVxuICAgKiBldmVudCBvYmplY3QgYXMgYW4gYXJndW1lbnQuXG4gICAqIEByZXR1cm5zIFRoZSBrZXkgZXZlbnQgdGhhdCB3YXMgcmVnaXN0ZXJlZC5cbiAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHBhcnNlZEV2ZW50ID0gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkgITtcblxuICAgIGNvbnN0IG91dHNpZGVIYW5kbGVyID1cbiAgICAgICAgS2V5RXZlbnRzUGx1Z2luLmV2ZW50Q2FsbGJhY2socGFyc2VkRXZlbnRbJ2Z1bGxLZXknXSwgaGFuZGxlciwgdGhpcy5tYW5hZ2VyLmdldFpvbmUoKSk7XG5cbiAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLmdldFpvbmUoKS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICByZXR1cm4gZ2V0RE9NKCkub25BbmRDYW5jZWwoZWxlbWVudCwgcGFyc2VkRXZlbnRbJ2RvbUV2ZW50TmFtZSddLCBvdXRzaWRlSGFuZGxlcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VFdmVudE5hbWUoZXZlbnROYW1lOiBzdHJpbmcpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfXxudWxsIHtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnLicpO1xuXG4gICAgY29uc3QgZG9tRXZlbnROYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICBpZiAoKHBhcnRzLmxlbmd0aCA9PT0gMCkgfHwgIShkb21FdmVudE5hbWUgPT09ICdrZXlkb3duJyB8fCBkb21FdmVudE5hbWUgPT09ICdrZXl1cCcpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBLZXlFdmVudHNQbHVnaW4uX25vcm1hbGl6ZUtleShwYXJ0cy5wb3AoKSAhKTtcblxuICAgIGxldCBmdWxsS2V5ID0gJyc7XG4gICAgTU9ESUZJRVJfS0VZUy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFydHMuaW5kZXhPZihtb2RpZmllck5hbWUpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgcGFydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZnVsbEtleSArPSBtb2RpZmllck5hbWUgKyAnLic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVsbEtleSArPSBrZXk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoICE9IDAgfHwga2V5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gcmV0dXJuaW5nIG51bGwgaW5zdGVhZCBvZiB0aHJvd2luZyB0byBsZXQgYW5vdGhlciBwbHVnaW4gcHJvY2VzcyB0aGUgZXZlbnRcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgcmVzdWx0Wydkb21FdmVudE5hbWUnXSA9IGRvbUV2ZW50TmFtZTtcbiAgICByZXN1bHRbJ2Z1bGxLZXknXSA9IGZ1bGxLZXk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRFdmVudEZ1bGxLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xuICAgIGxldCBmdWxsS2V5ID0gJyc7XG4gICAgbGV0IGtleSA9IGdldERPTSgpLmdldEV2ZW50S2V5KGV2ZW50KTtcbiAgICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoa2V5ID09PSAnICcpIHtcbiAgICAgIGtleSA9ICdzcGFjZSc7ICAvLyBmb3IgcmVhZGFiaWxpdHlcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJy4nKSB7XG4gICAgICBrZXkgPSAnZG90JzsgIC8vIGJlY2F1c2UgJy4nIGlzIHVzZWQgYXMgYSBzZXBhcmF0b3IgaW4gZXZlbnQgbmFtZXNcbiAgICB9XG4gICAgTU9ESUZJRVJfS0VZUy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXJOYW1lICE9IGtleSkge1xuICAgICAgICBjb25zdCBtb2RpZmllckdldHRlciA9IE1PRElGSUVSX0tFWV9HRVRURVJTW21vZGlmaWVyTmFtZV07XG4gICAgICAgIGlmIChtb2RpZmllckdldHRlcihldmVudCkpIHtcbiAgICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuICAgIHJldHVybiBmdWxsS2V5O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgYSBoYW5kbGVyIGNhbGxiYWNrIGZvciBhIGtleSBldmVudC5cbiAgICogQHBhcmFtIGZ1bGxLZXkgVGhlIGV2ZW50IG5hbWUgdGhhdCBjb21iaW5lcyBhbGwgc2ltdWx0YW5lb3VzIGtleXN0cm9rZXMuXG4gICAqIEBwYXJhbSBoYW5kbGVyIFRoZSBmdW5jdGlvbiB0aGF0IHJlc3BvbmRzIHRvIHRoZSBrZXkgZXZlbnQuXG4gICAqIEBwYXJhbSB6b25lIFRoZSB6b25lIGluIHdoaWNoIHRoZSBldmVudCBvY2N1cnJlZC5cbiAgICogQHJldHVybnMgQSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIHN0YXRpYyBldmVudENhbGxiYWNrKGZ1bGxLZXk6IGFueSwgaGFuZGxlcjogRnVuY3Rpb24sIHpvbmU6IE5nWm9uZSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gKGV2ZW50OiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pID0+IHtcbiAgICAgIGlmIChLZXlFdmVudHNQbHVnaW4uZ2V0RXZlbnRGdWxsS2V5KGV2ZW50KSA9PT0gZnVsbEtleSkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoKCkgPT4gaGFuZGxlcihldmVudCkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHN0YXRpYyBfbm9ybWFsaXplS2V5KGtleU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy8gVE9ETzogc3dpdGNoIHRvIGEgTWFwIGlmIHRoZSBtYXBwaW5nIGdyb3dzIHRvbyBtdWNoXG4gICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICBjYXNlICdlc2MnOlxuICAgICAgICByZXR1cm4gJ2VzY2FwZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ga2V5TmFtZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==