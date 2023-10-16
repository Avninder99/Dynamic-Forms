import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

export const userLoggedInCanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
):
Observable<boolean | UrlTree> |
Promise<boolean | UrlTree> |
boolean |
UrlTree => {

    const tokenService = inject(TokenService);
    const router = inject(Router);

    if(tokenService.getToken()){
        return true;
    }
    return router.createUrlTree(['/register']);
};