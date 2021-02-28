import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankOcrComponent } from './bank-ocr/bank-ocr.component';
import { FizzbuzzComponent } from './fizzbuzz/fizzbuzz.component';

@NgModule({
  declarations: [
    AppComponent,
    BankOcrComponent,
    FizzbuzzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
