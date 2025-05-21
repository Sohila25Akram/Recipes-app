import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService : AuthService, private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree>{
        return this.authService.user.pipe(
            map(user => {
               return !!user ? true : this.router.createUrlTree(['/auth']);
        }))
        // tap(isAuth => {
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // }))
    }

}