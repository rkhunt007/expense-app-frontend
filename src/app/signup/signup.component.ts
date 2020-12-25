import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { CustomValidators } from '../shared/custom-validators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    passwordForm: FormGroup;
    aDisabledBtn = false;
    apiSignupInProgress = false;

    constructor(private fb: FormBuilder, private api: ApiService,
        private toast: ToastrService, private router: Router) { }

    ngOnInit(): void {

        this.passwordForm = this.fb.group({
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', Validators.required)
        }, {
            validators: CustomValidators.equalTo('password', 'confirmPassword')
        })

        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passwordForm: this.passwordForm
        });
    }

    submitForm() {
        console.log(this.signupForm.value);

        if (!this.signupForm.valid) {
            return;
        }

        const { name, email, passwordForm } = this.signupForm.value;
        const password = passwordForm.password;

        this.aDisabledBtn = true;
        this.apiSignupInProgress = true;
        this.api.register(name, email, password).subscribe(
            res => {
                this.signupForm.reset();
                this.toast.success('Signup Success');
                this.aDisabledBtn = false;
                this.apiSignupInProgress = false;
                this.router.navigate(['/dashboard']);
            },
            err => {
                this.aDisabledBtn = false;
                this.apiSignupInProgress = false;
            }
        );

    }

}
