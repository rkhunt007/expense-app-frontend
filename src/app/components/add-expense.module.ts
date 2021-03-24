import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { AddExpenseComponent } from './add-expense.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        SharedModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [AddExpenseComponent],
    declarations: [AddExpenseComponent],
    providers: [],
})
export class AddExpenseModule { }
