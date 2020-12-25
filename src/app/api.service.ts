import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private toast: ToastrService) { }

    login(email: string, password: string) {
        const data = { email, password };
        return this.http.post(`${environment.apiUrl}auth`, data).pipe(catchError(this.handleError.bind(this)));
    }

    register(name: string, email: string, password: string) {
        const data = { name, email, password };
        return this.http.post(`${environment.apiUrl}users`, data).pipe(catchError(this.handleError.bind(this)));
    }

    handleError(error: HttpErrorResponse) {
        let errorMsg = 'Unknown Error';
        if (error.error && error.error.errors && error.error.errors.length > 0) {
            errorMsg = '';
            for (let i = 0; i < error.error.errors.length; i++) {
                const element = error.error.errors[i];
                for (const key in element) {
                    errorMsg += element[key] + '';
                }
            }
            this.toast.error(errorMsg);
        }
        return throwError(error);
    }
}
