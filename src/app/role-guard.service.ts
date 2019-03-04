import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './users/user.service';


@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const userRole = this.userService.checkCurrentRole(); // options: none / user / admin
        const requiredRole = route.data.role;
        if (userRole !== requiredRole) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
