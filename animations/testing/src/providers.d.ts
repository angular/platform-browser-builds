/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Provider } from '@angular/core';
export declare function linkAnimationFlushFn(engine: AnimationEngine): () => void;
export declare const PLATFORM_BROWSER_ANIMATIONS_TOKENS: Provider[];
