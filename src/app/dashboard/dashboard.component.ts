import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { UtilService } from '../services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    expenses = {
        upfront: [],
        onCredit: []
    };
    modalRef: BsModalRef;
    incomeModalRef: BsModalRef;
    deleteModalRef: BsModalRef;
    selectedExpense: any;
    selectedIncome: any;
    selectedDate = new Date();
    oldSelectedDate = new Date();
    total: any = {};
    @ViewChild('amount', { static: true }) amount: TemplateRef<any>;
    @ViewChild('date', { static: true }) date: TemplateRef<any>;
    @ViewChild('actions', { static: true }) actions: TemplateRef<any>;
    @ViewChild('incomeActions', { static: true }) incomeActions: TemplateRef<any>;
    columns = [];
    rows = [];
    incomes: any = {};

    public pieChartLabels = [];
    public pieChartData = [];
    public pieChartType = 'pie';
    public pieChartColors = [
        {
          backgroundColor: [],
        },
    ];

    constructor(private apiService: ApiService,
        private util: UtilService, private toast: ToastrService,
        private bsModalService: BsModalService) { }

    ngOnInit(): void {
        this.getAllExpenses();
        this.getAllIncomes();
        this.columns = [
            { name: 'Amount', cellTemplate: this.amount, width: 100 },
            { prop: 'category', name: 'Category' },
            { prop: 'description', name: 'Description' },
            { name: 'Date', cellTemplate: this.date },
            { name: 'Action', cellTemplate: this.actions }
        ];
        this.incomes.columns = [
            { name: 'Amount', cellTemplate: this.amount, width: 100 },
            { prop: 'category', name: 'Category' },
            { name: 'Date', cellTemplate: this.date },
            { name: 'Action', cellTemplate: this.incomeActions }
        ];
    }

    getAllExpenses() {
        this.apiService.getAllExpenses(this.selectedDate).subscribe(res => {
            this.expenses.onCredit = res.expenses.filter((ex) => ex.type == 1);
            this.expenses.upfront = res.expenses.filter((ex) => ex.type == 2);
            res.expenses.forEach(exp => {
                exp.type = this.util.getTypeFromId(exp.type);
                this.pieChartLabels.push(exp.category);
                this.pieChartData.push(exp.amount);
                this.pieChartColors[0].backgroundColor.push(this.getRandomColor());
            });
            this.rows = this.expenses.onCredit;
            this.total = res.total;
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getAllIncomes() {
        this.apiService.getAllIncomes(this.selectedDate).subscribe(res => {
            this.incomes.income = res.incomes;
            this.incomes.total = res.total.income;
        });
    }

    initAddExpenseModal(template: TemplateRef<any>, expense = null) {
        this.selectedExpense = expense;
        this.modalRef = this.bsModalService.show(template);
    }

    initAddIncomeModal(template: TemplateRef<any>, income = null) {
        this.selectedIncome = income;
        this.incomeModalRef = this.bsModalService.show(template);
    }

    hideModal(event) {
        this.modalRef.hide();
        if (event === 'afterSaved') {
            this.getAllExpenses();
        }
    }

    hideIncomeModal(event) {
        this.incomeModalRef.hide();
        if (event === 'afterSaved') {
            this.getAllIncomes();
        }
    }

    deleteExpense() {
        return this.apiService.deleteExpense(this.selectedExpense._id);
    }

    openDeleteExpenseModal(template: TemplateRef<any>, expense: any) {
        this.selectedExpense = expense;
        this.deleteModalRef = this.bsModalService.show(template, { class: 'modal-sm' });
    }

    confirm(): void {
        this.deleteExpense().subscribe(
            res => {
                this.toast.success('Expense deleted');
                this.deleteModalRef.hide();
                this.getAllExpenses();
            }
        );
    }

    decline(): void {
        this.deleteModalRef.hide();
    }

    onHidden() {
        if (this.oldSelectedDate != this.selectedDate) {
            this.oldSelectedDate = this.selectedDate;
            this.getAllExpenses();
            this.getAllIncomes();
        }
    }

}
