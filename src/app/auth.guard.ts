import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private api: ApiService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            console.log('AuthGuard::canActivate');
            const token = localStorage.getItem('token');
            let oSubject = new Subject<boolean>();

            if (!token) {
                this.router.navigate(['/login']);
                oSubject.next(false);
            }

            this.api.auth(token).subscribe(
                res => {
                    oSubject.next(true);
                },
                err => {
                    this.router.navigate(['/login']);
                    oSubject.next(false);
                }
            );
            return oSubject;

    }

}
