/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NoOpAnimationPlayer } from '../private_import_core';
/**
 * \@experimental
 */
export class NoOpAnimationDriver {
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers = []) {
        return new NoOpAnimationPlayer();
    }
}
/**
 * \@experimental
 * @abstract
 */
export class AnimationDriver {
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { }
}
AnimationDriver.NOOP = new NoOpAnimationDriver();
function AnimationDriver_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationDriver.NOOP;
}
//# sourceMappingURL=animation_driver.js.map