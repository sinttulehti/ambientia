import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankOcrComponent } from './bank-ocr/bank-ocr.component';

const routes: Routes = [
  { path: 'bank-ocr', component: BankOcrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
