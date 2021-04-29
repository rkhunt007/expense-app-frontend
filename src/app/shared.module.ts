import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        NgbModule,
        ChartsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        NgbModule,
        ChartsModule
    ]
})
export class SharedModule { }
