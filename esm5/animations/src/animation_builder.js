import * as tslib_1 from "tslib";
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
    tslib_1.__extends(BrowserAnimationBuilder, _super);
    function BrowserAnimationBuilder(rootRenderer, doc) {
        var _this = _super.call(this) || this;
        _this._nextAnimationId = 0;
        var typeData = {
            id: '0',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: { animation: [] }
        };
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
    BrowserAnimationBuilder.ngInjectableDef = i0.defineInjectable({ token: BrowserAnimationBuilder, factory: function BrowserAnimationBuilder_Factory(t) { return new (t || BrowserAnimationBuilder)(i0.inject(i0.RendererFactory2), i0.inject(DOCUMENT)); }, providedIn: null });
    return BrowserAnimationBuilder;
}(AnimationBuilder));
export { BrowserAnimationBuilder };
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserAnimationBuilder, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null);
var BrowserAnimationFactory = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserAnimationFactory, _super);
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
    RendererAnimationPlayer.prototype.onDone = function (fn) { this._listen('done', fn); };
    RendererAnimationPlayer.prototype.onStart = function (fn) { this._listen('start', fn); };
    RendererAnimationPlayer.prototype.onDestroy = function (fn) { this._listen('destroy', fn); };
    RendererAnimationPlayer.prototype.init = function () { this._command('init'); };
    RendererAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    RendererAnimationPlayer.prototype.play = function () {
        this._command('play');
        this._started = true;
    };
    RendererAnimationPlayer.prototype.pause = function () { this._command('pause'); };
    RendererAnimationPlayer.prototype.restart = function () { this._command('restart'); };
    RendererAnimationPlayer.prototype.finish = function () { this._command('finish'); };
    RendererAnimationPlayer.prototype.destroy = function () { this._command('destroy'); };
    RendererAnimationPlayer.prototype.reset = function () { this._command('reset'); };
    RendererAnimationPlayer.prototype.setPosition = function (p) { this._command('setPosition', p); };
    RendererAnimationPlayer.prototype.getPosition = function () { return 0; };
    return RendererAnimationPlayer;
}());
export { RendererAnimationPlayer };
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, "@@" + id + ":" + command, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQXdELFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZJLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBaUIsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBSXJHO0lBQzZDLG1EQUFnQjtJQUkzRCxpQ0FBWSxZQUE4QixFQUFvQixHQUFRO1FBQXRFLFlBQ0UsaUJBQU8sU0FRUjtRQVpPLHNCQUFnQixHQUFHLENBQUMsQ0FBQztRQUszQixJQUFNLFFBQVEsR0FBRztZQUNmLEVBQUUsRUFBRSxHQUFHO1lBQ1AsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsTUFBTSxFQUFFLEVBQUU7WUFDVixJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFDO1NBQ0wsQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQXNCLENBQUM7O0lBQ3hGLENBQUM7SUFFRCx1Q0FBSyxHQUFMLFVBQU0sU0FBZ0Q7UUFDcEQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENB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LEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBSyxHQUFMLGNBQWdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpDLHlDQUFPLEdBQVAsY0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0Msd0NBQU0sR0FBTixjQUFpQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzQyx5Q0FBTyxHQUFQLGNBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdDLHVDQUFLLEdBQUwsY0FBZ0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsNkNBQVcsR0FBWCxVQUFZLENBQVMsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakUsNkNBQVcsR0FBWCxjQUF3QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHckMsOEJBQUM7QUFBRCxDQUFDLEFBaERELElBZ0RDOztBQUVELFNBQVMscUJBQXFCLENBQzFCLFFBQTJCLEVBQUUsT0FBWSxFQUFFLEVBQVUsRUFBRSxPQUFlLEVBQUUsSUFBVztJQUNyRixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQUssRUFBRSxTQUFJLE9BQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5LCBBbmltYXRpb25NZXRhZGF0YSwgQW5pbWF0aW9uT3B0aW9ucywgQW5pbWF0aW9uUGxheWVyLCBzZXF1ZW5jZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBbmltYXRpb25SZW5kZXJlcn0gZnJvbSAnLi9hbmltYXRpb25fcmVuZGVyZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbkJ1aWxkZXIgZXh0ZW5kcyBBbmltYXRpb25CdWlsZGVyIHtcbiAgcHJpdmF0ZSBfbmV4dEFuaW1hdGlvbklkID0gMDtcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKHJvb3RSZW5kZXJlcjogUmVuZGVyZXJGYWN0b3J5MiwgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHR5cGVEYXRhID0ge1xuICAgICAgaWQ6ICcwJyxcbiAgICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgICBzdHlsZXM6IFtdLFxuICAgICAgZGF0YToge2FuaW1hdGlvbjogW119XG4gICAgfSBhcyBSZW5kZXJlclR5cGUyO1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcm9vdFJlbmRlcmVyLmNyZWF0ZVJlbmRlcmVyKGRvYy5ib2R5LCB0eXBlRGF0YSkgYXMgQW5pbWF0aW9uUmVuZGVyZXI7XG4gIH1cblxuICBidWlsZChhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW10pOiBBbmltYXRpb25GYWN0b3J5IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX25leHRBbmltYXRpb25JZC50b1N0cmluZygpO1xuICAgIHRoaXMuX25leHRBbmltYXRpb25JZCsrO1xuICAgIGNvbnN0IGVudHJ5ID0gQXJyYXkuaXNBcnJheShhbmltYXRpb24pID8gc2VxdWVuY2UoYW5pbWF0aW9uKSA6IGFuaW1hdGlvbjtcbiAgICBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQodGhpcy5fcmVuZGVyZXIsIG51bGwsIGlkLCAncmVnaXN0ZXInLCBbZW50cnldKTtcbiAgICByZXR1cm4gbmV3IEJyb3dzZXJBbmltYXRpb25GYWN0b3J5KGlkLCB0aGlzLl9yZW5kZXJlcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJBbmltYXRpb25GYWN0b3J5IGV4dGVuZHMgQW5pbWF0aW9uRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2lkOiBzdHJpbmcsIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcikgeyBzdXBlcigpOyB9XG5cbiAgY3JlYXRlKGVsZW1lbnQ6IGFueSwgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25QbGF5ZXIge1xuICAgIHJldHVybiBuZXcgUmVuZGVyZXJBbmltYXRpb25QbGF5ZXIodGhpcy5faWQsIGVsZW1lbnQsIG9wdGlvbnMgfHwge30sIHRoaXMuX3JlbmRlcmVyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJBbmltYXRpb25QbGF5ZXIgaW1wbGVtZW50cyBBbmltYXRpb25QbGF5ZXIge1xuICBwdWJsaWMgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXJ8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3N0YXJ0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgZWxlbWVudDogYW55LCBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyKSB7XG4gICAgdGhpcy5fY29tbWFuZCgnY3JlYXRlJywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnQsIGBAQCR7dGhpcy5pZH06JHtldmVudE5hbWV9YCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWFuZChjb21tYW5kOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgcmV0dXJuIGlzc3VlQW5pbWF0aW9uQ29tbWFuZCh0aGlzLl9yZW5kZXJlciwgdGhpcy5lbGVtZW50LCB0aGlzLmlkLCBjb21tYW5kLCBhcmdzKTtcbiAgfVxuXG4gIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9saXN0ZW4oJ2RvbmUnLCBmbik7IH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX2xpc3Rlbignc3RhcnQnLCBmbik7IH1cblxuICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fbGlzdGVuKCdkZXN0cm95JywgZm4pOyB9XG5cbiAgaW5pdCgpOiB2b2lkIHsgdGhpcy5fY29tbWFuZCgnaW5pdCcpOyB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3N0YXJ0ZWQ7IH1cblxuICBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ3BsYXknKTtcbiAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHBhdXNlKCk6IHZvaWQgeyB0aGlzLl9jb21tYW5kKCdwYXVzZScpOyB9XG5cbiAgcmVzdGFydCgpOiB2b2lkIHsgdGhpcy5fY29tbWFuZCgncmVzdGFydCcpOyB9XG5cbiAgZmluaXNoKCk6IHZvaWQgeyB0aGlzLl9jb21tYW5kKCdmaW5pc2gnKTsgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7IHRoaXMuX2NvbW1hbmQoJ2Rlc3Ryb3knKTsgfVxuXG4gIHJlc2V0KCk6IHZvaWQgeyB0aGlzLl9jb21tYW5kKCdyZXNldCcpOyB9XG5cbiAgc2V0UG9zaXRpb24ocDogbnVtYmVyKTogdm9pZCB7IHRoaXMuX2NvbW1hbmQoJ3NldFBvc2l0aW9uJywgcCk7IH1cblxuICBnZXRQb3NpdGlvbigpOiBudW1iZXIgeyByZXR1cm4gMDsgfVxuXG4gIHB1YmxpYyB0b3RhbFRpbWUgPSAwO1xufVxuXG5mdW5jdGlvbiBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQoXG4gICAgcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyLCBlbGVtZW50OiBhbnksIGlkOiBzdHJpbmcsIGNvbW1hbmQ6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkge1xuICByZXR1cm4gcmVuZGVyZXIuc2V0UHJvcGVydHkoZWxlbWVudCwgYEBAJHtpZH06JHtjb21tYW5kfWAsIGFyZ3MpO1xufVxuIl19