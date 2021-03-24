import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    aDisabledBtn = false;
    apiLoginInProgress = false;

    constructor(private fb: FormBuilder, private api: ApiService,
        private toast: ToastrService, private router: Router) { }

    ngOnInit(): void {

        this.api.autoLogin();

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    submitForm() {
        if (!this.loginForm.valid) {
            return;
        }

        const { email, password } = this.loginForm.value;

        this.aDisabledBtn = true;
        this.apiLoginInProgress = true;
        this.api.login(email, password).subscribe(
            res => {
                this.loginForm.reset();
                this.toast.success('Login Success');
                this.aDisabledBtn = false;
                this.apiLoginInProgress = false;
                this.router.navigate(['/dashboard']);
            },
            err => {
                this.aDisabledBtn = false;
                this.apiLoginInProgress = false;
            }
        );

    }

}
