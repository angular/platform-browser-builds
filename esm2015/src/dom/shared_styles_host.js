/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata, __param } from "tslib";
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
let SharedStylesHost = /** @class */ (() => {
    let SharedStylesHost = class SharedStylesHost {
        constructor() {
            /** @internal */
            this._stylesSet = new Set();
        }
        addStyles(styles) {
            const additions = new Set();
            styles.forEach(style => {
                if (!this._stylesSet.has(style)) {
                    this._stylesSet.add(style);
                    additions.add(style);
                }
            });
            this.onStylesAdded(additions);
        }
        onStylesAdded(additions) { }
        getAllStyles() {
            return Array.from(this._stylesSet);
        }
    };
    SharedStylesHost = __decorate([
        Injectable()
    ], SharedStylesHost);
    return SharedStylesHost;
})();
export { SharedStylesHost };
let DomSharedStylesHost = /** @class */ (() => {
    let DomSharedStylesHost = class DomSharedStylesHost extends SharedStylesHost {
        constructor(_doc) {
            super();
            this._doc = _doc;
            this._hostNodes = new Set();
            this._styleNodes = new Set();
            this._hostNodes.add(_doc.head);
        }
        _addStylesToHost(styles, host) {
            styles.forEach((style) => {
                const styleEl = this._doc.createElement('style');
                styleEl.textContent = style;
                this._styleNodes.add(host.appendChild(styleEl));
            });
        }
        addHost(hostNode) {
            this._addStylesToHost(this._stylesSet, hostNode);
            this._hostNodes.add(hostNode);
        }
        removeHost(hostNode) {
            this._hostNodes.delete(hostNode);
        }
        onStylesAdded(additions) {
            this._hostNodes.forEach(hostNode => this._addStylesToHost(additions, hostNode));
        }
        ngOnDestroy() {
            this._styleNodes.forEach(styleNode => getDOM().remove(styleNode));
        }
    };
    DomSharedStylesHost = __decorate([
        Injectable(),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], DomSharedStylesHost);
    return DomSharedStylesHost;
})();
export { DomSharedStylesHost };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL3NoYXJlZF9zdHlsZXNfaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFHNUQ7SUFBQSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtRQUE3QjtZQUNFLGdCQUFnQjtZQUNOLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBa0IzQyxDQUFDO1FBaEJDLFNBQVMsQ0FBQyxNQUFnQjtZQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxhQUFhLENBQUMsU0FBc0IsSUFBUyxDQUFDO1FBRTlDLFlBQVk7WUFDVixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FDRixDQUFBO0lBcEJZLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0FvQjVCO0lBQUQsdUJBQUM7S0FBQTtTQXBCWSxnQkFBZ0I7QUF1QjdCO0lBQUEsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxnQkFBZ0I7UUFHdkQsWUFBc0MsSUFBUztZQUM3QyxLQUFLLEVBQUUsQ0FBQztZQUQ0QixTQUFJLEdBQUosSUFBSSxDQUFLO1lBRnZDLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1lBQzdCLGdCQUFXLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztZQUdwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVPLGdCQUFnQixDQUFDLE1BQW1CLEVBQUUsSUFBVTtZQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sQ0FBQyxRQUFjO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxVQUFVLENBQUMsUUFBYztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsYUFBYSxDQUFDLFNBQXNCO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO0tBQ0YsQ0FBQTtJQWhDWSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO1FBSUUsV0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O09BSGxCLG1CQUFtQixDQWdDL0I7SUFBRCwwQkFBQztLQUFBO1NBaENZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTdHlsZXNIb3N0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgX3N0eWxlc1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGFkZFN0eWxlcyhzdHlsZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgYWRkaXRpb25zID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9zdHlsZXNTZXQuaGFzKHN0eWxlKSkge1xuICAgICAgICB0aGlzLl9zdHlsZXNTZXQuYWRkKHN0eWxlKTtcbiAgICAgICAgYWRkaXRpb25zLmFkZChzdHlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vblN0eWxlc0FkZGVkKGFkZGl0aW9ucyk7XG4gIH1cblxuICBvblN0eWxlc0FkZGVkKGFkZGl0aW9uczogU2V0PHN0cmluZz4pOiB2b2lkIHt9XG5cbiAgZ2V0QWxsU3R5bGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9zdHlsZXNTZXQpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21TaGFyZWRTdHlsZXNIb3N0IGV4dGVuZHMgU2hhcmVkU3R5bGVzSG9zdCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2hvc3ROb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgcHJpdmF0ZSBfc3R5bGVOb2RlcyA9IG5ldyBTZXQ8Tm9kZT4oKTtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5hZGQoX2RvYy5oZWFkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFN0eWxlc1RvSG9zdChzdHlsZXM6IFNldDxzdHJpbmc+LCBob3N0OiBOb2RlKTogdm9pZCB7XG4gICAgc3R5bGVzLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlRWwgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICAgIHRoaXMuX3N0eWxlTm9kZXMuYWRkKGhvc3QuYXBwZW5kQ2hpbGQoc3R5bGVFbCkpO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkSG9zdChob3N0Tm9kZTogTm9kZSk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFN0eWxlc1RvSG9zdCh0aGlzLl9zdHlsZXNTZXQsIGhvc3ROb2RlKTtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuYWRkKGhvc3ROb2RlKTtcbiAgfVxuXG4gIHJlbW92ZUhvc3QoaG9zdE5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLl9ob3N0Tm9kZXMuZGVsZXRlKGhvc3ROb2RlKTtcbiAgfVxuXG4gIG9uU3R5bGVzQWRkZWQoYWRkaXRpb25zOiBTZXQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX2hvc3ROb2Rlcy5mb3JFYWNoKGhvc3ROb2RlID0+IHRoaXMuX2FkZFN0eWxlc1RvSG9zdChhZGRpdGlvbnMsIGhvc3ROb2RlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHlsZU5vZGVzLmZvckVhY2goc3R5bGVOb2RlID0+IGdldERPTSgpLnJlbW92ZShzdHlsZU5vZGUpKTtcbiAgfVxufVxuIl19