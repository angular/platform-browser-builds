import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationBuilder, AnimationFactory, sequence } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
var BrowserAnimationBuilder = /** @class */ (function (_super) {
    __extends(BrowserAnimationBuilder, _super);
    function BrowserAnimationBuilder(rootRenderer, doc) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        var typeData = { id: '0', encapsulation: ViewEncapsulation.None, styles: [], data: { animation: [] } };
        _this._renderer = rootRenderer.createRenderer(doc.body, typeData);
        return _this;
    }
    BrowserAnimationBuilder.prototype.build = function (animation) {
        var id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        var entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    };
    BrowserAnimationBuilder.ɵfac = function BrowserAnimationBuilder_Factory(t) { return new (t || BrowserAnimationBuilder)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(DOCUMENT)); };
    BrowserAnimationBuilder.ɵprov = i0.ɵɵdefineInjectable({ token: BrowserAnimationBuilder, factory: BrowserAnimationBuilder.ɵfac });
    return BrowserAnimationBuilder;
}(AnimationBuilder));
export { BrowserAnimationBuilder };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BrowserAnimationBuilder, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
var BrowserAnimationFactory = /** @class */ (function (_super) {
    __extends(BrowserAnimationFactory, _super);
    function BrowserAnimationFactory(_id, _renderer) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this._renderer = _renderer;
        return _this;
    }
    BrowserAnimationFactory.prototype.create = function (element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    };
    return BrowserAnimationFactory;
}(AnimationFactory));
export { BrowserAnimationFactory };
var RendererAnimationPlayer = /** @class */ (function () {
    function RendererAnimationPlayer(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    RendererAnimationPlayer.prototype._listen = function (eventName, callback) {
        return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
    };
    RendererAnimationPlayer.prototype._command = function (command) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    };
    RendererAnimationPlayer.prototype.onDone = function (fn) {
        this._listen('done', fn);
    };
    RendererAnimationPlayer.prototype.onStart = function (fn) {
        this._listen('start', fn);
    };
    RendererAnimationPlayer.prototype.onDestroy = function (fn) {
        this._listen('destroy', fn);
    };
    RendererAnimationPlayer.prototype.init = function () {
        this._command('init');
    };
    RendererAnimationPlayer.prototype.hasStarted = function () {
        return this._started;
    };
    RendererAnimationPlayer.prototype.play = function () {
        this._command('play');
        this._started = true;
    };
    RendererAnimationPlayer.prototype.pause = function () {
        this._command('pause');
    };
    RendererAnimationPlayer.prototype.restart = function () {
        this._command('restart');
    };
    RendererAnimationPlayer.prototype.finish = function () {
        this._command('finish');
    };
    RendererAnimationPlayer.prototype.destroy = function () {
        this._command('destroy');
    };
    RendererAnimationPlayer.prototype.reset = function () {
        this._command('reset');
    };
    RendererAnimationPlayer.prototype.setPosition = function (p) {
        this._command('setPosition', p);
    };
    RendererAnimationPlayer.prototype.getPosition = function () {
        return 0;
    };
    return RendererAnimationPlayer;
}());
export { RendererAnimationPlayer };
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQXdELFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZJLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBSXJHO0lBQzZDLDJDQUFnQjtJQUkzRCxpQ0FBWSxZQUE4QixFQUFvQixHQUFRO1FBQXRFLFlBQ0UsaUJBQU8sU0FLUjtRQVRPLHNCQUFnQixHQUFHLENBQUMsQ0FBQztRQUszQixJQUFNLFFBQVEsR0FDVixFQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUMsRUFDckUsQ0FBQztRQUNsQixLQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQXNCLENBQUM7O0lBQ3hGLENBQUM7SUFFRCx1Q0FBSyxHQUFMLFVBQU0sU0FBZ0Q7UUFDcEQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENB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QUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsdUNBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELHVDQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw2Q0FBVyxHQUFYLFVBQVksQ0FBUztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNkNBQVcsR0FBWDtRQUNFLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdILDhCQUFDO0FBQUQsQ0FBQyxBQXhFRCxJQXdFQzs7QUFFRCxTQUFTLHFCQUFxQixDQUMxQixRQUEyQixFQUFFLE9BQVksRUFBRSxFQUFVLEVBQUUsT0FBZSxFQUFFLElBQVc7SUFDckYsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFLLEVBQUUsU0FBSSxPQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlciwgQW5pbWF0aW9uRmFjdG9yeSwgQW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvbk9wdGlvbnMsIEFuaW1hdGlvblBsYXllciwgc2VxdWVuY2V9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclR5cGUyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QW5pbWF0aW9uUmVuZGVyZXJ9IGZyb20gJy4vYW5pbWF0aW9uX3JlbmRlcmVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJBbmltYXRpb25CdWlsZGVyIGV4dGVuZHMgQW5pbWF0aW9uQnVpbGRlciB7XG4gIHByaXZhdGUgX25leHRBbmltYXRpb25JZCA9IDA7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcjtcblxuICBjb25zdHJ1Y3Rvcihyb290UmVuZGVyZXI6IFJlbmRlcmVyRmFjdG9yeTIsIEBJbmplY3QoRE9DVU1FTlQpIGRvYzogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCB0eXBlRGF0YSA9XG4gICAgICAgIHtpZDogJzAnLCBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLCBzdHlsZXM6IFtdLCBkYXRhOiB7YW5pbWF0aW9uOiBbXX19IGFzXG4gICAgICAgIFJlbmRlcmVyVHlwZTI7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByb290UmVuZGVyZXIuY3JlYXRlUmVuZGVyZXIoZG9jLmJvZHksIHR5cGVEYXRhKSBhcyBBbmltYXRpb25SZW5kZXJlcjtcbiAgfVxuXG4gIGJ1aWxkKGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSk6IEFuaW1hdGlvbkZhY3Rvcnkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5fbmV4dEFuaW1hdGlvbklkLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbmV4dEFuaW1hdGlvbklkKys7XG4gICAgY29uc3QgZW50cnkgPSBBcnJheS5pc0FycmF5KGFuaW1hdGlvbikgPyBzZXF1ZW5jZShhbmltYXRpb24pIDogYW5pbWF0aW9uO1xuICAgIGlzc3VlQW5pbWF0aW9uQ29tbWFuZCh0aGlzLl9yZW5kZXJlciwgbnVsbCwgaWQsICdyZWdpc3RlcicsIFtlbnRyeV0pO1xuICAgIHJldHVybiBuZXcgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkoaWQsIHRoaXMuX3JlbmRlcmVyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkgZXh0ZW5kcyBBbmltYXRpb25GYWN0b3J5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaWQ6IHN0cmluZywgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZShlbGVtZW50OiBhbnksIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyKHRoaXMuX2lkLCBlbGVtZW50LCBvcHRpb25zIHx8IHt9LCB0aGlzLl9yZW5kZXJlcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHVibGljIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9zdGFydGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIGVsZW1lbnQ6IGFueSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcikge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2NyZWF0ZScsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50LCBgQEAke3RoaXMuaWR9OiR7ZXZlbnROYW1lfWAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIHJldHVybiBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQodGhpcy5fcmVuZGVyZXIsIHRoaXMuZWxlbWVudCwgdGhpcy5pZCwgY29tbWFuZCwgYXJncyk7XG4gIH1cblxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW4oJ2RvbmUnLCBmbik7XG4gIH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuKCdzdGFydCcsIGZuKTtcbiAgfVxuXG4gIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbignZGVzdHJveScsIGZuKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnaW5pdCcpO1xuICB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRlZDtcbiAgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGxheScpO1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGF1c2UnKTtcbiAgfVxuXG4gIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncmVzdGFydCcpO1xuICB9XG5cbiAgZmluaXNoKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2ZpbmlzaCcpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdkZXN0cm95Jyk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdyZXNldCcpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnc2V0UG9zaXRpb24nLCBwKTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBwdWJsaWMgdG90YWxUaW1lID0gMDtcbn1cblxuZnVuY3Rpb24gaXNzdWVBbmltYXRpb25Db21tYW5kKFxuICAgIHJlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlciwgZWxlbWVudDogYW55LCBpZDogc3RyaW5nLCBjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIHJlbmRlcmVyLnNldFByb3BlcnR5KGVsZW1lbnQsIGBAQCR7aWR9OiR7Y29tbWFuZH1gLCBhcmdzKTtcbn1cbiJdfQ==