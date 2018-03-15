import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const TOKEN_AUTH_PASSWORD = 'XY7kmzoNzl100';
const TOKEN_AUTH_USERNAME = 'testjwtclientid';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.method);
        if (req.method == 'OPTIONS') {
            console.log("OPTIONS!");
        }
        console.log(req.body);
/*         if (req.url.startsWith("http://localhost:8080/")) {
            const newBody = this.toJsonString(req.body);
            const modified = req.clone({body: newBody});
            return next.handle(modified);
        } */
        console.log(req.url);
        return next.handle(req);
    }

/*     private toJsonString(object: Object) : string {
        let json = JSON.stringify(object);
        Object.keys(object).filter(key => key[0] === "_").forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return json;
    } */
}