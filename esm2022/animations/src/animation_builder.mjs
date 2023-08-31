/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationBuilder, AnimationFactory, sequence } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class BrowserAnimationBuilder extends AnimationBuilder {
    constructor(rootRenderer, doc) {
        super();
        this._nextAnimationId = 0;
        const typeData = { id: '0', encapsulation: ViewEncapsulation.None, styles: [], data: { animation: [] } };
        this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    }
    build(animation) {
        const id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        const entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.2+sha-0839885", ngImport: i0, type: BrowserAnimationBuilder, deps: [{ token: i0.RendererFactory2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0-next.2+sha-0839885", ngImport: i0, type: BrowserAnimationBuilder }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.2+sha-0839885", ngImport: i0, type: BrowserAnimationBuilder, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
export class BrowserAnimationFactory extends AnimationFactory {
    constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
    }
    create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
    }
}
export class RendererAnimationPlayer {
    constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this.parentPlayer = null;
        this._started = false;
        this.totalTime = 0;
        this._command('create', options);
    }
    _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
    }
    _command(command, ...args) {
        return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
    }
    onDone(fn) {
        this._listen('done', fn);
    }
    onStart(fn) {
        this._listen('start', fn);
    }
    onDestroy(fn) {
        this._listen('destroy', fn);
    }
    init() {
        this._command('init');
    }
    hasStarted() {
        return this._started;
    }
    play() {
        this._command('play');
        this._started = true;
    }
    pause() {
        this._command('pause');
    }
    restart() {
        this._command('restart');
    }
    finish() {
        this._command('finish');
    }
    destroy() {
        this._command('destroy');
    }
    reset() {
        this._command('reset');
        this._started = false;
    }
    setPosition(p) {
        this._command('setPosition', p);
    }
    getPosition() {
        return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
    }
}
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, `@@${id}:${command}`, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBd0QsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFLckcsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGdCQUFnQjtJQUkzRCxZQUFZLFlBQThCLEVBQW9CLEdBQWE7UUFDekUsS0FBSyxFQUFFLENBQUM7UUFKRixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFLM0IsTUFBTSxRQUFRLEdBQ1YsRUFBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFDLEVBQ3JFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFzQixDQUFDO0lBQ3hGLENBQUM7SUFFUSxLQUFLLENBQUMsU0FBZ0Q7UUFDN0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FB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O1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBR0Y7QUFFRCxTQUFTLHFCQUFxQixDQUMxQixRQUEyQixFQUFFLE9BQVksRUFBRSxFQUFVLEVBQUUsT0FBZSxFQUFFLElBQVc7SUFDckYsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXIsIEFuaW1hdGlvbkZhY3RvcnksIEFuaW1hdGlvbk1ldGFkYXRhLCBBbmltYXRpb25PcHRpb25zLCBBbmltYXRpb25QbGF5ZXIsIHNlcXVlbmNlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUmVuZGVyZXJGYWN0b3J5MiwgUmVuZGVyZXJUeXBlMiwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FuaW1hdGlvblJlbmRlcmVyfSBmcm9tICcuL2FuaW1hdGlvbl9yZW5kZXJlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uQnVpbGRlciBleHRlbmRzIEFuaW1hdGlvbkJ1aWxkZXIge1xuICBwcml2YXRlIF9uZXh0QW5pbWF0aW9uSWQgPSAwO1xuICBwcml2YXRlIF9yZW5kZXJlcjogQW5pbWF0aW9uUmVuZGVyZXI7XG5cbiAgY29uc3RydWN0b3Iocm9vdFJlbmRlcmVyOiBSZW5kZXJlckZhY3RvcnkyLCBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IERvY3VtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCB0eXBlRGF0YSA9XG4gICAgICAgIHtpZDogJzAnLCBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLCBzdHlsZXM6IFtdLCBkYXRhOiB7YW5pbWF0aW9uOiBbXX19IGFzXG4gICAgICAgIFJlbmRlcmVyVHlwZTI7XG4gICAgdGhpcy5fcmVuZGVyZXIgPSByb290UmVuZGVyZXIuY3JlYXRlUmVuZGVyZXIoZG9jLmJvZHksIHR5cGVEYXRhKSBhcyBBbmltYXRpb25SZW5kZXJlcjtcbiAgfVxuXG4gIG92ZXJyaWRlIGJ1aWxkKGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSk6IEFuaW1hdGlvbkZhY3Rvcnkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5fbmV4dEFuaW1hdGlvbklkLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fbmV4dEFuaW1hdGlvbklkKys7XG4gICAgY29uc3QgZW50cnkgPSBBcnJheS5pc0FycmF5KGFuaW1hdGlvbikgPyBzZXF1ZW5jZShhbmltYXRpb24pIDogYW5pbWF0aW9uO1xuICAgIGlzc3VlQW5pbWF0aW9uQ29tbWFuZCh0aGlzLl9yZW5kZXJlciwgbnVsbCwgaWQsICdyZWdpc3RlcicsIFtlbnRyeV0pO1xuICAgIHJldHVybiBuZXcgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkoaWQsIHRoaXMuX3JlbmRlcmVyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbkZhY3RvcnkgZXh0ZW5kcyBBbmltYXRpb25GYWN0b3J5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaWQ6IHN0cmluZywgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZShlbGVtZW50OiBhbnksIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyKHRoaXMuX2lkLCBlbGVtZW50LCBvcHRpb25zIHx8IHt9LCB0aGlzLl9yZW5kZXJlcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyQW5pbWF0aW9uUGxheWVyIGltcGxlbWVudHMgQW5pbWF0aW9uUGxheWVyIHtcbiAgcHVibGljIHBhcmVudFBsYXllcjogQW5pbWF0aW9uUGxheWVyfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9zdGFydGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIGVsZW1lbnQ6IGFueSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlcikge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2NyZWF0ZScsIG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50LCBgQEAke3RoaXMuaWR9OiR7ZXZlbnROYW1lfWAsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIHJldHVybiBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQodGhpcy5fcmVuZGVyZXIsIHRoaXMuZWxlbWVudCwgdGhpcy5pZCwgY29tbWFuZCwgYXJncyk7XG4gIH1cblxuICBvbkRvbmUoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW4oJ2RvbmUnLCBmbik7XG4gIH1cblxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuKCdzdGFydCcsIGZuKTtcbiAgfVxuXG4gIG9uRGVzdHJveShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbignZGVzdHJveScsIGZuKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnaW5pdCcpO1xuICB9XG5cbiAgaGFzU3RhcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRlZDtcbiAgfVxuXG4gIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGxheScpO1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcGF1c2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncGF1c2UnKTtcbiAgfVxuXG4gIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgncmVzdGFydCcpO1xuICB9XG5cbiAgZmluaXNoKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2ZpbmlzaCcpO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdkZXN0cm95Jyk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdyZXNldCcpO1xuICAgIHRoaXMuX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHA6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ3NldFBvc2l0aW9uJywgcCk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5lbmdpbmUucGxheWVyc1srdGhpcy5pZF0/LmdldFBvc2l0aW9uKCkgPz8gMDtcbiAgfVxuXG4gIHB1YmxpYyB0b3RhbFRpbWUgPSAwO1xufVxuXG5mdW5jdGlvbiBpc3N1ZUFuaW1hdGlvbkNvbW1hbmQoXG4gICAgcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyLCBlbGVtZW50OiBhbnksIGlkOiBzdHJpbmcsIGNvbW1hbmQ6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkge1xuICByZXR1cm4gcmVuZGVyZXIuc2V0UHJvcGVydHkoZWxlbWVudCwgYEBAJHtpZH06JHtjb21tYW5kfWAsIGFyZ3MpO1xufVxuIl19