import { Serializer } from '../shared/serializer';
import { EventEmitter } from '../../../src/facade/async';
export declare class EventDispatcher {
    private _sink;
    private _serializer;
    constructor(_sink: EventEmitter<any>, _serializer: Serializer);
    dispatchRenderEvent(element: any, eventTarget: string, eventName: string, event: any): boolean;
}
