import { ɵDomRendererFactoryV2 } from '@angular/platform-browser';
import { AnimationStyleNormalizer } from './dsl/style_normalization/animation_style_normalizer';
import { WebAnimationsStyleNormalizer } from './dsl/style_normalization/web_animations_style_normalizer';
import { AnimationDriver, NoOpAnimationDriver } from './render/animation_driver';
import { AnimationEngine } from './render/animation_engine';
import { AnimationRendererFactory } from './render/animation_renderer';
export declare class InjectableAnimationEngine extends AnimationEngine {
    constructor(driver: AnimationDriver, normalizer: AnimationStyleNormalizer);
}
export declare function instantiateSupportedAnimationDriver(): NoOpAnimationDriver;
export declare function instantiateDefaultStyleNormalizer(): WebAnimationsStyleNormalizer;
export declare function instantiateRendererFactory(renderer: ɵDomRendererFactoryV2, engine: AnimationEngine): AnimationRendererFactory;
/**
 * @experimental Animation support is experimental.
 */
export declare class BrowserAnimationModule {
}
