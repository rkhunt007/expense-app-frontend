import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    user = new BehaviorSubject<Object>(null);

    constructor(private http: HttpClient, private toast: ToastrService,
        private router: Router) { }

    login(email: string, password: string) {
        const data = { email, password };
        return this.http.post(`${environment.apiUrl}auth`, data)
        .pipe(
            catchError(this.handleError.bind(this)),
            tap(res => {
                localStorage.setItem('token', res.token);
            })
        );
    }

    autoLogin() {
        console.log('ApiService::autoLogin');
        const token = localStorage.getItem('token');
        if (token) {
            this.auth(token).subscribe(
                res => {
                    this.router.navigate(['/dashboard']);
                }
            );
        }
    }

    register(name: string, email: string, password: string) {
        const data = { name, email, password };
        return this.http.post(`${environment.apiUrl}users`, data).pipe(catchError(this.handleError.bind(this)));
    }

    auth(token) {
        const headers = new HttpHeaders({'x-auth-token': token});
        return this.http.get(
            `${environment.apiUrl}auth`, {headers: headers}
        ).pipe(catchError(this.handleError.bind(this)));
    }

    getAllExpenses(date?: any) {
        return this.http.get(
            `${environment.apiUrl}expense?date=${date}`
        ).pipe(catchError(this.handleError.bind(this)));
    }

    createExpense(data) {
        return this.http.post(
            `${environment.apiUrl}expense`, data
        ).pipe(catchError(this.handleError.bind(this)));
    }

    editExpense(data: any, id: string) {
        return this.http.put(
            `${environment.apiUrl}expense/${id}`, data
        ).pipe(catchError(this.handleError.bind(this)));
    }

    deleteExpense(id) {
        return this.http.delete(
            `${environment.apiUrl}expense/${id}`
        ).pipe(catchError(this.handleError.bind(this)));
    }

    getAllIncomes(date?: any) {
        return this.http.get(
            `${environment.apiUrl}income?date=${date}`
        ).pipe(catchError(this.handleError.bind(this)));
    }

    createIncome(data) {
        return this.http.post(
            `${environment.apiUrl}income`, data
        ).pipe(catchError(this.handleError.bind(this)));
    }

    editIncome(data: any, id: string) {
        return this.http.put(
            `${environment.apiUrl}income/${id}`, data
        ).pipe(catchError(this.handleError.bind(this)));
    }

    deleteIncome(id) {
        return this.http.delete(
            `${environment.apiUrl}expense/${id}`
        ).pipe(catchError(this.handleError.bind(this)));
    }

    handleError(error: HttpErrorResponse) {
        let errorMsg = 'Unknown Error';
        if (error.status == 401) {
            this.toast.error(error.statusText);
            localStorage.removeItem('token');
        } else if (error.error && error.error.errors && error.error.errors.length > 0) {
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
