import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

import { AddIncomeComponent } from './add-income.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        SharedModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [AddIncomeComponent],
    declarations: [AddIncomeComponent],
    providers: [],
})
export class AddIncomeModule { }
