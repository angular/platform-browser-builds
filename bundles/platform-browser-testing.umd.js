/**
 * @license Angular v4.0.0-rc.2-ad3b44a
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('@angular/platform-browser/testing', ['exports', '@angular/core', '@angular/platform-browser'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('@angular/core'), require('@angular/platform-browser'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.ng.core, global.ng.platformBrowser);
        global.ng = global.ng || {};
        global.ng.platformBrowser = global.ng.platformBrowser || {};
        global.ng.platformBrowser.testing = mod.exports;
    }
})(this, function (exports, _core, _platformBrowser) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BrowserTestingModule = exports.platformBrowserTesting = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var browserDetection = void 0;

    var BrowserDetection = function () {
        _createClass(BrowserDetection, [{
            key: '_ua',
            get: function get() {
                if (typeof this._overrideUa === 'string') {
                    return this._overrideUa;
                }
                return (0, _platformBrowser.ɵgetDOM)() ? (0, _platformBrowser.ɵgetDOM)().getUserAgent() : '';
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
        }, {
            key: 'supportsNativeIntlApi',
            get: function get() {
                return !!_core.ɵglobal.Intl && _core.ɵglobal.Intl !== _core.ɵglobal.IntlPolyfill;
            }
        }, {
            key: 'isChromeDesktop',
            get: function get() {
                return this._ua.indexOf('Chrome') > -1 && this._ua.indexOf('Mobile Safari') == -1 && this._ua.indexOf('Edge') == -1;
            }
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
        return new _core.NgZone({ enableLongStackTrace: true });
    }

    function initBrowserTests() {
        _platformBrowser.ɵBrowserDomAdapter.makeCurrent();
        BrowserDetection.setup();
    }
    var _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: _core.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
    /**
     * Platform for testing
     *
     * @stable
     */
    var platformBrowserTesting = (0, _core.createPlatformFactory)(_core.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
    /**
     * NgModule for testing.
     *
     * @stable
     */

    var BrowserTestingModule = function BrowserTestingModule() {
        _classCallCheck(this, BrowserTestingModule);
    };

    BrowserTestingModule.decorators = [{ type: _core.NgModule, args: [{
            exports: [_platformBrowser.BrowserModule],
            providers: [{ provide: _core.APP_ID, useValue: 'a' }, _platformBrowser.ɵELEMENT_PROBE_PROVIDERS, { provide: _core.NgZone, useFactory: createNgZone }]
        }] }];
    /** @nocollapse */
    BrowserTestingModule.ctorParameters = function () {
        return [];
    };

    exports.platformBrowserTesting = platformBrowserTesting;
    exports.BrowserTestingModule = BrowserTestingModule;
});
