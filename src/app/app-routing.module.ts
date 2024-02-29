import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddExpenseComponent} from "./components/add-expense/add-expense.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'expense', pathMatch: 'full'},
  {path: 'expense', component: AddExpenseComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
