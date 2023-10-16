import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";
import { RouteService } from "../services/route.service";

export const userLoggedOutCanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
):
Observable<boolean | UrlTree> |
Promise<boolean | UrlTree> |
boolean |
UrlTree => {

    const tokenService = inject(TokenService);
    const router = inject(Router);
    const routeService = inject(RouteService);

    if(tokenService.getToken()){
        return router.createUrlTree([ `${ routeService.getPrevURL() }` ]);
    }
    return true;
};