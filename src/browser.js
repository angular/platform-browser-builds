"use strict";
var core_1 = require("@angular/core");
var lang_1 = require("./facade/lang");
var core_private_1 = require('../core_private');
var web_animations_driver_1 = require('../src/dom/web_animations_driver');
var common_1 = require("@angular/common");
var dom_sanitization_service_1 = require("./security/dom_sanitization_service");
var browser_adapter_1 = require("./browser/browser_adapter");
var testability_1 = require("./browser/testability");
var dom_adapter_1 = require("./dom/dom_adapter");
var dom_tokens_1 = require("./dom/dom_tokens");
var event_manager_1 = require("./dom/events/event_manager");
var dom_renderer_1 = require("./dom/dom_renderer");
var shared_styles_host_1 = require("./dom/shared_styles_host");
var key_events_1 = require("./dom/events/key_events");
var ng_probe_1 = require("./dom/debug/ng_probe");
var dom_events_1 = require("./dom/events/dom_events");
var hammer_gestures_1 = require("./dom/events/hammer_gestures");
var browser_platform_location_1 = require("./browser/location/browser_platform_location");
var compiler_1 = require("@angular/compiler");
var xhr_cache_1 = require("./xhr/xhr_cache");
var xhr_impl_1 = require("./xhr/xhr_impl");
var core_private_2 = require('../core_private');
exports.CACHED_TEMPLATE_PROVIDER = [{ provide: compiler_1.XHR, useClass: xhr_cache_1.CachedXHR }];
var BROWSER_PLATFORM_MARKER = new core_1.OpaqueToken('BrowserPlatformMarker');
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
exports.BROWSER_PLATFORM_PROVIDERS = [
    { provide: BROWSER_PLATFORM_MARKER, useValue: true },
    core_1.PLATFORM_COMMON_PROVIDERS,
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: browser_platform_location_1.BrowserPlatformLocation }
];
exports.BROWSER_SANITIZATION_PROVIDERS = [
    { provide: core_private_1.SanitizationService, useExisting: dom_sanitization_service_1.DomSanitizationService },
    { provide: dom_sanitization_service_1.DomSanitizationService, useClass: dom_sanitization_service_1.DomSanitizationServiceImpl },
];
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
exports.BROWSER_APP_PROVIDERS = [
    core_1.APPLICATION_COMMON_PROVIDERS,
    common_1.FORM_PROVIDERS,
    exports.BROWSER_SANITIZATION_PROVIDERS,
    { provide: core_1.PLATFORM_PIPES, useValue: common_1.COMMON_PIPES, multi: true },
    { provide: core_1.PLATFORM_DIRECTIVES, useValue: common_1.COMMON_DIRECTIVES, multi: true },
    { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
    { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
    { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
    { provide: core_private_1.AnimationDriver, useFactory: _resolveDefaultAnimationDriver },
    shared_styles_host_1.DomSharedStylesHost,
    core_1.Testability,
    event_manager_1.EventManager,
    ng_probe_1.ELEMENT_PROBE_PROVIDERS
];
exports.BROWSER_APP_COMPILER_PROVIDERS = [
    compiler_1.COMPILER_PROVIDERS,
    { provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl },
];
function browserPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(exports.BROWSER_PLATFORM_PROVIDERS));
    }
    return core_1.assertPlatform(BROWSER_PLATFORM_MARKER);
}
exports.browserPlatform = browserPlatform;
/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use
 * as the root component for your application via the `bootstrap()` method.
 *
 * ## Simple Example
 *
 * Assuming this `index.html`:
 *
 * ```html
 * <html>
 *   <!-- load Angular script tags here. -->
 *   <body>
 *     <my-app>loading...</my-app>
 *   </body>
 * </html>
 * ```
 *
 * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
 * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
 * mainly for security reasons, as well as architectural changes in Angular 2. This means
 * that `index.html` can safely be processed using server-side technologies such as
 * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
 * Angular 2 component double-curly `{{ syntax }}`.
 *
 * We can use this script code:
 *
 * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
 *
 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
 * argument, Angular performs the following tasks:
 *
 *  1. It uses the component's `selector` property to locate the DOM element which needs
 *     to be upgraded into the angular component.
 *  2. It creates a new child injector (from the platform injector). Optionally, you can
 *     also override the injector configuration for an app by invoking `bootstrap` with the
 *     `componentInjectableBindings` argument.
 *  3. It creates a new `Zone` and connects it to the angular application's change detection
 *     domain instance.
 *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
 *     template into it.
 *  5. It instantiates the specified component.
 *  6. Finally, Angular performs change detection to apply the initial data providers for the
 *     application.
 *
 *
 * ## Bootstrapping Multiple Applications
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others. Angular services that represent these resources must likewise be
 * shared across all Angular applications that occupy the same browser window. For this
 * reason, Angular creates exactly one global platform object which stores all shared
 * services, and each angular application injector has the platform injector as its parent.
 *
 * Each application has its own private injector as well. When there are multiple
 * applications on a page, Angular treats each application injector's services as private
 * to that application.
 *
 * ## API
 *
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `customProviders`: An additional set of providers that can be added to the
 *   app injector to override default injection behavior.
 *
 * Returns a `Promise` of {@link ComponentRef}.
 */
function bootstrap(appComponentType, customProviders) {
    core_private_2.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
    var providers = [
        exports.BROWSER_APP_PROVIDERS,
        exports.BROWSER_APP_COMPILER_PROVIDERS,
        lang_1.isPresent(customProviders) ? customProviders : []
    ];
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(providers, browserPlatform().injector);
    return core_1.coreLoadAndBootstrap(appComponentType, appInjector);
}
exports.bootstrap = bootstrap;
function initDomAdapter() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    core_private_1.wtfInit();
    testability_1.BrowserGetTestability.init();
}
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM());
}
function _document() {
    return dom_adapter_1.getDOM().defaultDoc();
}
function _resolveDefaultAnimationDriver() {
    if (dom_adapter_1.getDOM().supportsWebAnimation()) {
        return new web_animations_driver_1.WebAnimationsDriver();
    }
    return new core_private_1.NoOpAnimationDriver();
}
//# sourceMappingURL=browser.js.map