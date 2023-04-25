import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */
class BrowserXhr {
    build() {
        return new XMLHttpRequest();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-f5dd3b4", ngImport: i0, type: BrowserXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-f5dd3b4", ngImport: i0, type: BrowserXhr }); }
}
export { BrowserXhr };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0-next.0+sha-f5dd3b4", ngImport: i0, type: BrowserXhr, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci94aHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekM7O0dBRUc7QUFDSCxNQUNhLFVBQVU7SUFDckIsS0FBSztRQUNILE9BQU8sSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUM5QixDQUFDO3lIQUhVLFVBQVU7NkhBQVYsVUFBVTs7U0FBVixVQUFVO3NHQUFWLFVBQVU7a0JBRHRCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtYaHJGYWN0b3J5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGBIdHRwWGhyQmFja2VuZGAgdGhhdCB1c2VzIHRoZSBgWE1MSHR0cFJlcXVlc3RgIGJyb3dzZXIgQVBJLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlclhociBpbXBsZW1lbnRzIFhockZhY3Rvcnkge1xuICBidWlsZCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB9XG59XG4iXX0=