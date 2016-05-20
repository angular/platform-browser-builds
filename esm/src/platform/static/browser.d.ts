import { ComponentRef } from '@angular/core';
import { Type } from '../../facade/lang';
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates have been pre-compiled.
 */
export declare const BROWSER_APP_STATIC_PROVIDERS: Array<any>;
/**
 * See {@link bootstrap} for more information.
 */
export declare function bootstrapStatic(appComponentType: Type, customProviders?: Array<any>, initReflector?: Function): Promise<ComponentRef<any>>;
