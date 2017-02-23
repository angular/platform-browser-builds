/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone } from '@angular/core';
import { ɵDomRendererFactoryV2 } from '@angular/platform-browser';
import { AnimationEngine } from './animation_engine';
import { AnimationRendererFactory } from './render/animation_renderer';
export declare function instantiateRendererFactory(renderer: ɵDomRendererFactoryV2, engine: AnimationEngine, zone: NgZone): AnimationRendererFactory;
/**
 * @experimental Animation support is experimental.
 */
export declare class NoopBrowserAnimationModule {
}
