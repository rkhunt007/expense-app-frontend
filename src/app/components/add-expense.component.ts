import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { UtilService } from '../services/utils.service';

@Component({
    selector: 'app-add-expense',
    templateUrl: 'add-expense.component.html'
})

export class AddExpenseComponent implements OnInit {

    @Output() hideModal = new EventEmitter();
    expenseForm: FormGroup;
    aDisabledBtn = false;
    apiLoginInProgress = false;
    editMode = false;
    @Input('expense') expense: any;

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private toast: ToastrService,
        private utils: UtilService,
    ) { }

    ngOnInit() {
        if (this.expense) {
            this.editMode = true;
        }
        this.initForm();
    }

    initForm() {
        if (!this.editMode) {
            this.expenseForm = this.fb.group({
                amount: ['', [Validators.required]],
                description: ['', [Validators.required]],
                category: ['', [Validators.required]],
                type: [1, [Validators.required]],
                date: [null, [Validators.required]],
            });
        } else {

            const typeId = this.utils.getIdFromType(this.expense.type);
            const date = new Date(this.expense.date);

            this.expenseForm = this.fb.group({
                amount: [this.expense.amount, [Validators.required]],
                description: [this.expense.description, [Validators.required]],
                category: [this.expense.category, [Validators.required]],
                type: [typeId, [Validators.required]],
                date: [date, [Validators.required]],
            });
        }
    }

    submitForm() {
        if (!this.expenseForm.valid) {
            return;
        }
        this.aDisabledBtn = true;
        this.apiLoginInProgress = true;
        this.saveExpense().subscribe(
            res => {
                this.aDisabledBtn = false;
                this.onHideModal();
            },
            err => {
                this.aDisabledBtn = false;
            }
        );
    }

    saveExpense() {
        if (this.editMode) {
            return this.api.editExpense(this.expenseForm.value, this.expense._id);
        } else {
            return this.api.createExpense(this.expenseForm.value);
        }
    }

    onHideModal() {
        this.hideModal.emit('afterSaved');
    }

}