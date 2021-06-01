import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {ServerQueryService} from "./server-query.service";
import {Observable} from "rxjs";
import {exhaust, exhaustMap, take} from "rxjs/operators";


@Injectable()
export class ServerInterceptorService implements HttpInterceptor {
  constructor(private sq: ServerQueryService){ }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sq.user.pipe(
      take(1),
      exhaustMap(res => {
        if(!res){
          return next.handle(req);
        }

        const appendReq = req.clone({ params: new HttpParams().set('auth', res.token)});
        return next.handle(appendReq);
      }));
  }

}
