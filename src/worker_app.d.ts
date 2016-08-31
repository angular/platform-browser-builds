import { ErrorHandler, NgZone, PlatformRef, Provider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * @experimental
 */
export declare const platformWorkerApp: (extraProviders?: Provider[]) => PlatformRef;
/**
 * Exception handler factory function.
 *
 * @experimental
 */
export declare function errorHandler(): ErrorHandler;
/**
 * MessageBus factory function.
 *
 * @experimental
 */
export declare function createMessageBus(zone: NgZone): MessageBus;
/**
 * Application initializer for web workers.
 *
 * @experimental
 */
export declare function setupWebWorker(): void;
/**
 * The ng module for the worker app side.
 *
 * @experimental
 */
export declare class WorkerAppModule {
}
