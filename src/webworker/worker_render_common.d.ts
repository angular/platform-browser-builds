import { Injector, OpaqueToken } from '@angular/core';
export declare const WORKER_SCRIPT: OpaqueToken;
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 */
export declare const WORKER_RENDER_STARTABLE_MESSAGING_SERVICE: OpaqueToken;
export declare const WORKER_RENDER_PLATFORM_MARKER: OpaqueToken;
export declare const WORKER_RENDER_PLATFORM_PROVIDERS: Array<any>;
export declare const WORKER_RENDER_APPLICATION_COMMON_PROVIDERS: Array<any>;
export declare function initializeGenericWorkerRenderer(injector: Injector): void;
export declare function initWebWorkerRenderPlatform(): void;
