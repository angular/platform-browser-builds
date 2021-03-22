import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
export declare class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc: any);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    removeEventListener(target: any, eventName: string, callback: Function): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomEventsPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDef<DomEventsPlugin>;
}
