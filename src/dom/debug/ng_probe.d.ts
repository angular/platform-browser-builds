/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as core from '@angular/core';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
export declare function inspectNativeElement(element: any): core.DebugNode | null;
export declare function _createNgProbe(coreTokens: core.NgProbeToken[]): any;
/**
 * In Ivy, we don't support NgProbe because we have our own set of testing utilities
 * with more robust functionality.
 *
 * We shouldn't bring in NgProbe because it prevents DebugNode and friends from
 * tree-shaking properly.
 */
export declare const ELEMENT_PROBE_PROVIDERS__POST_R3__: never[];
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
export declare const ELEMENT_PROBE_PROVIDERS__PRE_R3__: core.Provider[];
export declare const ELEMENT_PROBE_PROVIDERS: core.Provider[];
