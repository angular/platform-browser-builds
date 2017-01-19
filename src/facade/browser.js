/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
const /** @type {?} */ win = typeof window !== 'undefined' && window || ({});
export { win as window };
export const /** @type {?} */ document = win.document;
export const /** @type {?} */ location = win.location;
export const /** @type {?} */ gc = win['gc'] ? () => win['gc']() : () => null;
export const /** @type {?} */ performance = win['performance'] ? win['performance'] : null;
export const /** @type {?} */ Event = win['Event'];
export const /** @type {?} */ MouseEvent = win['MouseEvent'];
export const /** @type {?} */ KeyboardEvent = win['KeyboardEvent'];
export const /** @type {?} */ EventTarget = win['EventTarget'];
export const /** @type {?} */ History = win['History'];
export const /** @type {?} */ Location = win['Location'];
export const /** @type {?} */ EventListener = win['EventListener'];
//# sourceMappingURL=browser.js.map