/**
 * @license Angular v6.1.4+5.sha-72ed2e9
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@angular/platform-browser/testing', ['exports', '@angular/core', '@angular/platform-browser'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.testing = {}),global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,i0,platformBrowser) { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var BrowserDetection = /** @class */ (function () {
        function BrowserDetection(ua) {
            this._overrideUa = ua;
        }
        Object.defineProperty(BrowserDetection.prototype, "_ua", {
            get: function () {
                if (typeof this._overrideUa === 'string') {
                    return this._overrideUa;
                }
                return platformBrowser.ɵgetDOM() ? platformBrowser.ɵgetDOM().getUserAgent() : '';
            },
            enumerable: true,
            configurable: true
        });
        BrowserDetection.setup = function () { };
        Object.defineProperty(BrowserDetection.prototype, "isFirefox", {
            get: function () { return this._ua.indexOf('Firefox') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isAndroid", {
            get: function () {
                return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 &&
                    this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isEdge", {
            get: function () { return this._ua.indexOf('Edge') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isIE", {
            get: function () { return this._ua.indexOf('Trident') > -1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isWebkit", {
            get: function () {
                return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isIOS7", {
            get: function () {
                return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) &&
                    this._ua.indexOf('IEMobile') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isSlow", {
            get: function () { return this.isAndroid || this.isIE || this.isIOS7; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "supportsNativeIntlApi", {
            // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
            // This detector is needed in tests to make the difference between:
            // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
            // 2) IE9/IE10: they use the polyfill, and so no discrepancies
            get: function () {
                return !!i0.ɵglobal.Intl && i0.ɵglobal.Intl !== i0.ɵglobal.IntlPolyfill;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isChromeDesktop", {
            get: function () {
                return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 &&
                    this._ua.indexOf('Edge') == -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserDetection.prototype, "isOldChrome", {
            // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
            // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).
            get: function () {
                return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 &&
                    this._ua.indexOf('Edge') == -1;
            },
            enumerable: true,
            configurable: true
        });
        return BrowserDetection;
    }());
    BrowserDetection.setup();
    function createNgZone() {
        return new i0.NgZone({ enableLongStackTrace: true });
    }

    function initBrowserTests() {
        platformBrowser.ɵBrowserDomAdapter.makeCurrent();
        BrowserDetection.setup();
    }
    var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: i0.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
    /**
     * Platform for testing
     *
     *
     */
    var platformBrowserTesting = i0.createPlatformFactory(i0.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
    /**
     * NgModule for testing.
     *
     *
     */
    var BrowserTestingModule = /** @class */ (function () {
        function BrowserTestingModule() {
        }
        BrowserTestingModule.ngModuleDef = i0.ɵdefineNgModule({ type: BrowserTestingModule, bootstrap: [], declarations: [], imports: [], exports: [platformBrowser.BrowserModule] });
        BrowserTestingModule.ngInjectorDef = i0.defineInjector({ factory: function BrowserTestingModule_Factory() { return new BrowserTestingModule(); }, providers: [
                { provide: i0.APP_ID, useValue: 'a' },
                platformBrowser.ɵELEMENT_PROBE_PROVIDERS,
                { provide: i0.NgZone, useFactory: createNgZone },
            ], imports: [[platformBrowser.BrowserModule]] });
        return BrowserTestingModule;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    exports.platformBrowserTesting = platformBrowserTesting;
    exports.BrowserTestingModule = BrowserTestingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=platform-browser-testing.umd.js.map
