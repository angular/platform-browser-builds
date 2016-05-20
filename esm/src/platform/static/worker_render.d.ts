import { MessageBus } from '../../web_workers/shared/message_bus';
import { ApplicationRef } from '@angular/core';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * An array of providers that should be passed into `application()` when initializing a new Worker.
 */
export declare const WORKER_RENDER_STATIC_APPLICATION_PROVIDERS: Array<any>;
export declare function bootstrapStaticRender(workerScriptUri: string, customProviders?: Array<any>): Promise<ApplicationRef>;
