import { PlatformRef, Type, ComponentRef } from "@angular/core";
export declare const WORKER_APP_PLATFORM_PROVIDERS: Array<any>;
export declare const WORKER_APP_APPLICATION_PROVIDERS: Array<any>;
export declare function workerAppPlatform(): PlatformRef;
export declare function bootstrapApp(appComponentType: Type, customProviders?: Array<any>): Promise<ComponentRef<any>>;
