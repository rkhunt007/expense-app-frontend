import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        NgbModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        NgbModule
    ]
})
export class SharedModule { }
