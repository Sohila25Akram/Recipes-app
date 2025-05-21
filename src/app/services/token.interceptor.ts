import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
    export class TokenInterceptor implements HttpInterceptor{
        
        constructor(private authService: AuthService){}

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            return this.authService.user.pipe(take(1), exhaustMap(user => {
                console.log('User from AuthService:', user);
                if(!user){
                    return next.handle(req)
                }

                const updatedParams = req.params.set('auth', user.accessToken);

                const cloned = req.clone({ params: updatedParams });

                return next.handle(cloned);
                // const cloned = req.clone({
                //     params: new HttpParams().set('auth', user.accessToken)
                // })
                // console.log('Intercepted request URL:', cloned.urlWithParams);
                // return next.handle(cloned)
            }))
        }
        
    }
