import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankOcrComponent } from './bank-ocr/bank-ocr.component';
import { FizzbuzzComponent } from './fizzbuzz/fizzbuzz.component';

const routes: Routes = [
  { path: 'bank-ocr', component: BankOcrComponent },
  { path: 'fizzbuzz', component: FizzbuzzComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
