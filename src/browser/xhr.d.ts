/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XhrFactory } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */
export declare class BrowserXhr implements XhrFactory {
    build(): XMLHttpRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserXhr, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserXhr>;
}
