var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { PLATFORM_INITIALIZER, platformCore, createPlatformFactory, NgZone, APP_ID, NgModule } from '@angular/core';
import { ɵBrowserDomAdapter, ɵELEMENT_PROBE_PROVIDERS, BrowserModule, ɵgetDOM } from '@angular/platform-browser';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope = void 0;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = self;
    } else {
        globalScope = global;
    }
} else {
    globalScope = window;
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};

var browserDetection = void 0;

var BrowserDetection = function () {
    _createClass(BrowserDetection, [{
        key: '_ua',
        get: function get() {
            if (typeof this._overrideUa === 'string') {
                return this._overrideUa;
            }
            return ɵgetDOM() ? ɵgetDOM().getUserAgent() : '';
        }
    }], [{
        key: 'setup',
        value: function setup() {
            browserDetection = new BrowserDetection(null);
        }
    }]);

    function BrowserDetection(ua) {
        _classCallCheck(this, BrowserDetection);

        this._overrideUa = ua;
    }

    _createClass(BrowserDetection, [{
        key: 'isFirefox',
        get: function get() {
            return this._ua.indexOf('Firefox') > -1;
        }
    }, {
        key: 'isAndroid',
        get: function get() {
            return this._ua.indexOf('Mozilla/5.0') > -1 && this._ua.indexOf('Android') > -1 && this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Chrome') == -1 && this._ua.indexOf('IEMobile') == -1;
        }
    }, {
        key: 'isEdge',
        get: function get() {
            return this._ua.indexOf('Edge') > -1;
        }
    }, {
        key: 'isIE',
        get: function get() {
            return this._ua.indexOf('Trident') > -1;
        }
    }, {
        key: 'isWebkit',
        get: function get() {
            return this._ua.indexOf('AppleWebKit') > -1 && this._ua.indexOf('Edge') == -1 && this._ua.indexOf('IEMobile') == -1;
        }
    }, {
        key: 'isIOS7',
        get: function get() {
            return (this._ua.indexOf('iPhone OS 7') > -1 || this._ua.indexOf('iPad OS 7') > -1) && this._ua.indexOf('IEMobile') == -1;
        }
    }, {
        key: 'isSlow',
        get: function get() {
            return this.isAndroid || this.isIE || this.isIOS7;
        }
        // The Intl API is only natively supported in Chrome, Firefox, IE11 and Edge.
        // This detector is needed in tests to make the difference between:
        // 1) IE11/Edge: they have a native Intl API, but with some discrepancies
        // 2) IE9/IE10: they use the polyfill, and so no discrepancies

    }, {
        key: 'supportsNativeIntlApi',
        get: function get() {
            return !!_global.Intl && _global.Intl !== _global.IntlPolyfill;
        }
    }, {
        key: 'isChromeDesktop',
        get: function get() {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 && this._ua.indexOf('Edge') == -1;
        }
        // "Old Chrome" means Chrome 3X, where there are some discrepancies in the Intl API.
        // Android 4.4 and 5.X have such browsers by default (respectively 30 and 39).

    }, {
        key: 'isOldChrome',
        get: function get() {
            return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Chrome/3') > -1 && this._ua.indexOf('Edge') == -1;
        }
    }]);

    return BrowserDetection;
}();

BrowserDetection.setup();
function createNgZone() {
    return new NgZone({ enableLongStackTrace: true });
}

function initBrowserTests() {
    ɵBrowserDomAdapter.makeCurrent();
    BrowserDetection.setup();
}
var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
/**
 * Platform for testing
 *
 * @stable
 */
var platformBrowserTesting = createPlatformFactory(platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @stable
 */

var BrowserTestingModule = function BrowserTestingModule() {
    _classCallCheck(this, BrowserTestingModule);
};

BrowserTestingModule.decorators = [{ type: NgModule, args: [{
        exports: [BrowserModule],
        providers: [{ provide: APP_ID, useValue: 'a' }, ɵELEMENT_PROBE_PROVIDERS, { provide: NgZone, useFactory: createNgZone }]
    }] }];
/** @nocollapse */
BrowserTestingModule.ctorParameters = function () {
    return [];
};

export { platformBrowserTesting, BrowserTestingModule };
