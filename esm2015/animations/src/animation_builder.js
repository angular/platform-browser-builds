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
}
BrowserAnimationBuilder.ɵfac = function BrowserAnimationBuilder_Factory(t) { return new (t || BrowserAnimationBuilder)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(DOCUMENT)); };
BrowserAnimationBuilder.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BrowserAnimationBuilder, factory: BrowserAnimationBuilder.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserAnimationBuilder, [{
        type: Injectable
    }], function () { return [{ type: i0.RendererFactory2 }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
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
    }
    setPosition(p) {
        this._command('setPosition', p);
    }
    getPosition() {
        var _a, _b;
        return (_b = (_a = this._renderer.engine.players[+this.id]) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : 0;
    }
}
function issueAnimationCommand(renderer, element, id, command, args) {
    return renderer.setProperty(element, `@@${id}:${command}`, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMvc3JjL2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBd0QsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkksT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFLckcsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGdCQUFnQjtJQUkzRCxZQUFZLFlBQThCLEVBQW9CLEdBQVE7UUFDcEUsS0FBSyxFQUFFLENBQUM7UUFKRixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFLM0IsTUFBTSxRQUFRLEdBQ1YsRUFBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFDLEVBQ3JFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFzQixDQUFDO0lBQ3hGLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBZ0Q7UUFDcEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FB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QUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVzs7UUFDVCxPQUFPLE1BQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDBDQUFFLFdBQVcsRUFBRSxtQ0FBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUdGO0FBRUQsU0FBUyxxQkFBcUIsQ0FDMUIsUUFBMkIsRUFBRSxPQUFZLEVBQUUsRUFBVSxFQUFFLE9BQWUsRUFBRSxJQUFXO0lBQ3JGLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5LCBBbmltYXRpb25NZXRhZGF0YSwgQW5pbWF0aW9uT3B0aW9ucywgQW5pbWF0aW9uUGxheWVyLCBzZXF1ZW5jZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyVHlwZTIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBbmltYXRpb25SZW5kZXJlcn0gZnJvbSAnLi9hbmltYXRpb25fcmVuZGVyZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlckFuaW1hdGlvbkJ1aWxkZXIgZXh0ZW5kcyBBbmltYXRpb25CdWlsZGVyIHtcbiAgcHJpdmF0ZSBfbmV4dEFuaW1hdGlvbklkID0gMDtcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKHJvb3RSZW5kZXJlcjogUmVuZGVyZXJGYWN0b3J5MiwgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHR5cGVEYXRhID1cbiAgICAgICAge2lkOiAnMCcsIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsIHN0eWxlczogW10sIGRhdGE6IHthbmltYXRpb246IFtdfX0gYXNcbiAgICAgICAgUmVuZGVyZXJUeXBlMjtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJvb3RSZW5kZXJlci5jcmVhdGVSZW5kZXJlcihkb2MuYm9keSwgdHlwZURhdGEpIGFzIEFuaW1hdGlvblJlbmRlcmVyO1xuICB9XG5cbiAgYnVpbGQoYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdKTogQW5pbWF0aW9uRmFjdG9yeSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9uZXh0QW5pbWF0aW9uSWQudG9TdHJpbmcoKTtcbiAgICB0aGlzLl9uZXh0QW5pbWF0aW9uSWQrKztcbiAgICBjb25zdCBlbnRyeSA9IEFycmF5LmlzQXJyYXkoYW5pbWF0aW9uKSA/IHNlcXVlbmNlKGFuaW1hdGlvbikgOiBhbmltYXRpb247XG4gICAgaXNzdWVBbmltYXRpb25Db21tYW5kKHRoaXMuX3JlbmRlcmVyLCBudWxsLCBpZCwgJ3JlZ2lzdGVyJywgW2VudHJ5XSk7XG4gICAgcmV0dXJuIG5ldyBCcm93c2VyQW5pbWF0aW9uRmFjdG9yeShpZCwgdGhpcy5fcmVuZGVyZXIpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCcm93c2VyQW5pbWF0aW9uRmFjdG9yeSBleHRlbmRzIEFuaW1hdGlvbkZhY3Rvcnkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pZDogc3RyaW5nLCBwcml2YXRlIF9yZW5kZXJlcjogQW5pbWF0aW9uUmVuZGVyZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgY3JlYXRlKGVsZW1lbnQ6IGFueSwgb3B0aW9ucz86IEFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25QbGF5ZXIge1xuICAgIHJldHVybiBuZXcgUmVuZGVyZXJBbmltYXRpb25QbGF5ZXIodGhpcy5faWQsIGVsZW1lbnQsIG9wdGlvbnMgfHwge30sIHRoaXMuX3JlbmRlcmVyKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJBbmltYXRpb25QbGF5ZXIgaW1wbGVtZW50cyBBbmltYXRpb25QbGF5ZXIge1xuICBwdWJsaWMgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXJ8bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3N0YXJ0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgZWxlbWVudDogYW55LCBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IEFuaW1hdGlvblJlbmRlcmVyKSB7XG4gICAgdGhpcy5fY29tbWFuZCgnY3JlYXRlJywgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnQsIGBAQCR7dGhpcy5pZH06JHtldmVudE5hbWV9YCwgY2FsbGJhY2spO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tbWFuZChjb21tYW5kOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgcmV0dXJuIGlzc3VlQW5pbWF0aW9uQ29tbWFuZCh0aGlzLl9yZW5kZXJlciwgdGhpcy5lbGVtZW50LCB0aGlzLmlkLCBjb21tYW5kLCBhcmdzKTtcbiAgfVxuXG4gIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3RlbignZG9uZScsIGZuKTtcbiAgfVxuXG4gIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0ZW4oJ3N0YXJ0JywgZm4pO1xuICB9XG5cbiAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdGVuKCdkZXN0cm95JywgZm4pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdpbml0Jyk7XG4gIH1cblxuICBoYXNTdGFydGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zdGFydGVkO1xuICB9XG5cbiAgcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdwbGF5Jyk7XG4gICAgdGhpcy5fc3RhcnRlZCA9IHRydWU7XG4gIH1cblxuICBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdwYXVzZScpO1xuICB9XG5cbiAgcmVzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdyZXN0YXJ0Jyk7XG4gIH1cblxuICBmaW5pc2goKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZCgnZmluaXNoJyk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ2Rlc3Ryb3knKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmQoJ3Jlc2V0Jyk7XG4gIH1cblxuICBzZXRQb3NpdGlvbihwOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kKCdzZXRQb3NpdGlvbicsIHApO1xuICB9XG5cbiAgZ2V0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIuZW5naW5lLnBsYXllcnNbK3RoaXMuaWRdPy5nZXRQb3NpdGlvbigpID8/IDA7XG4gIH1cblxuICBwdWJsaWMgdG90YWxUaW1lID0gMDtcbn1cblxuZnVuY3Rpb24gaXNzdWVBbmltYXRpb25Db21tYW5kKFxuICAgIHJlbmRlcmVyOiBBbmltYXRpb25SZW5kZXJlciwgZWxlbWVudDogYW55LCBpZDogc3RyaW5nLCBjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IGFueVtdKTogYW55IHtcbiAgcmV0dXJuIHJlbmRlcmVyLnNldFByb3BlcnR5KGVsZW1lbnQsIGBAQCR7aWR9OiR7Y29tbWFuZH1gLCBhcmdzKTtcbn1cbiJdfQ==