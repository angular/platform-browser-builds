import { NgZone } from '@angular/core';
import { EventManagerPlugin } from './event_manager';
import * as i0 from "@angular/core";
export declare class DomEventsPlugin extends EventManagerPlugin {
    private ngZone;
    constructor(doc: any, ngZone: NgZone, platformId: {} | null);
    private patchEvent;
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    removeEventListener(target: any, eventName: string, callback: Function): void;
    static ɵfac: i0.ɵɵFactoryDef<DomEventsPlugin>;
    static ɵprov: i0.ɵɵInjectableDef<DomEventsPlugin>;
}
