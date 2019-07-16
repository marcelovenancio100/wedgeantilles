import { Injectable } from "@angular/core";
import { Router, CanActivate, CanLoad } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthJWTService } from './auth-jwt.service';

@Injectable()
export class AuthJWTGuard implements CanActivate, CanLoad {

    constructor(private authJWTService: AuthJWTService,
        private router: Router) { }

    canActivate() {
        return this.authJWTService.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['/login']);
                    }
                }),
            );
    }

    canLoad() {
        return this.authJWTService.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['/login']);
                    }
                }),
            );
    }
}
