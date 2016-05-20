import { ComponentRef } from '@angular/core';
import { Type } from '../../../src/facade/lang';
export declare const WORKER_APP_STATIC_APPLICATION_PROVIDERS: Array<any>;
export declare function bootstrapStaticApp(appComponentType: Type, customProviders?: Array<any>): Promise<ComponentRef<any>>;
