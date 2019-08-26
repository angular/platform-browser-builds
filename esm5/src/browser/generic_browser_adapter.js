/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { DomAdapter } from '../dom/dom_adapter';
/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
var GenericBrowserDomAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(GenericBrowserDomAdapter, _super);
    function GenericBrowserDomAdapter() {
        return _super.call(this) || this;
    }
    GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
    GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
    return GenericBrowserDomAdapter;
}(DomAdapter));
export { GenericBrowserDomAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJOUM7Ozs7O0dBS0c7QUFDSDtJQUF1RCxvREFBVTtJQUMvRDtlQUFnQixpQkFBTztJQUFFLENBQUM7SUFFMUIsc0RBQW1CLEdBQW5CLFVBQW9CLEVBQWUsSUFBWSxPQUFhLEVBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixvREFBaUIsR0FBakIsY0FBK0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLCtCQUFDO0FBQUQsQ0FBQyxBQUxELENBQXVELFVBQVUsR0FLaEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RG9tQWRhcHRlcn0gZnJvbSAnLi4vZG9tL2RvbV9hZGFwdGVyJztcblxuXG5cbi8qKlxuICogUHJvdmlkZXMgRE9NIG9wZXJhdGlvbnMgaW4gYW55IGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gKlxuICogQHNlY3VyaXR5IFRyZWFkIGNhcmVmdWxseSEgSW50ZXJhY3Rpbmcgd2l0aCB0aGUgRE9NIGRpcmVjdGx5IGlzIGRhbmdlcm91cyBhbmRcbiAqIGNhbiBpbnRyb2R1Y2UgWFNTIHJpc2tzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogSFRNTEVsZW1lbnQpOiBOb2RlW10geyByZXR1cm4gKDxhbnk+ZWwpLmdldERpc3RyaWJ1dGVkTm9kZXMoKTsgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cbn1cbiJdfQ==