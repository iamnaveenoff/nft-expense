import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from "./components/add-expense/add-expense.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExpenseReportComponent } from "./components/expense-report/expense-report.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'expense', component: AddExpenseComponent },
  { path: 'listexpense', component: ExpenseReportComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
