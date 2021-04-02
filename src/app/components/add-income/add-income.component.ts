import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { UtilService } from '../../services/utils.service';

@Component({
    selector: 'app-add-income',
    templateUrl: 'add-income.component.html'
})

export class AddIncomeComponent implements OnInit {

    @Output() hideModal = new EventEmitter();
    incomeForm: FormGroup;
    aDisabledBtn = false;
    apiLoginInProgress = false;
    editMode = false;
    @Input('income') income: any;

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private toast: ToastrService,
        private utils: UtilService,
    ) { }

    ngOnInit() {
        if (this.income) {
            this.editMode = true;
        }
        this.initForm();
    }

    initForm() {
        if (!this.editMode) {
            this.incomeForm = this.fb.group({
                amount: ['', [Validators.required]],
                category: ['', [Validators.required]],
                date: [null, [Validators.required]],
            });
        } else {

            const date = new Date(this.income.date);

            this.incomeForm = this.fb.group({
                amount: [this.income.amount, [Validators.required]],
                category: [this.income.category, [Validators.required]],
                date: [date, [Validators.required]],
            });
        }
    }

    submitForm() {
        if (!this.incomeForm.valid) {
            return;
        }
        this.aDisabledBtn = true;
        this.apiLoginInProgress = true;
        this.saveIncome().subscribe(
            res => {
                this.aDisabledBtn = false;
                this.onHideModal();
            },
            err => {
                this.aDisabledBtn = false;
            }
        );
    }

    saveIncome() {
        if (this.editMode) {
            return this.api.editIncome(this.incomeForm.value, this.income._id);
        } else {
            return this.api.createIncome(this.incomeForm.value);
        }
    }

    onHideModal() {
        this.hideModal.emit('afterSaved');
    }

}