import { ExceptionHandler, NgZone, PlatformRef } from '@angular/core';
import { print } from './facade/lang';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Logger for web workers.
 *
 * @experimental
 */
export declare class PrintLogger {
    log: typeof print;
    logError: typeof print;
    logGroup: typeof print;
    logGroupEnd(): void;
}
/**
 * @experimental
 */
export declare const platformWorkerApp: (extraProviders?: any[]) => PlatformRef;
/**
 * Exception handler factory function.
 *
 * @experimental
 */
export declare function exceptionHandler(): ExceptionHandler;
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
