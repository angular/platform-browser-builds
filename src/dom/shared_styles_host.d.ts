import { OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SharedStylesHost {
    addStyles(styles: string[]): void;
    onStylesAdded(additions: Set<string>): void;
    getAllStyles(): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SharedStylesHost, never>;
    static ɵprov: i0.ɵɵInjectableDef<SharedStylesHost>;
}
export declare class DomSharedStylesHost extends SharedStylesHost implements OnDestroy {
    private _doc;
    private _hostNodes;
    private _styleNodes;
    constructor(_doc: any);
    private _addStylesToHost;
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    onStylesAdded(additions: Set<string>): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomSharedStylesHost, never>;
    static ɵprov: i0.ɵɵInjectableDef<DomSharedStylesHost>;
}
