import { MessageBus } from "./web_workers/shared/message_bus";
import { Injector, OpaqueToken, PlatformRef, ApplicationRef } from "@angular/core";
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
export declare const WORKER_SCRIPT: OpaqueToken;
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 */
export declare const WORKER_RENDER_STARTABLE_MESSAGING_SERVICE: OpaqueToken;
export declare const WORKER_RENDER_PLATFORM_PROVIDERS: Array<any>;
export declare const WORKER_RENDER_APPLICATION_PROVIDERS: Array<any>;
export declare function initializeGenericWorkerRenderer(injector: Injector): void;
export declare function bootstrapRender(workerScriptUri: string, customProviders?: Array<any>): Promise<ApplicationRef>;
export declare function workerRenderPlatform(): PlatformRef;
