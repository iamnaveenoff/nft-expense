import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from 'primeng/table';
import { Expense } from 'src/app/models/expense.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {
  expenses!: Expense[];
  expense!: Expense;
  loading: boolean = true;
  productDialog: boolean = false;
  submitted: boolean = false;
  selectedExpense!: Expense | null;
  selectedDate: Date | undefined;
  constructor(private messageService: MessageService, private apiService: ApiService, private datePipe: DatePipe, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.apiService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
      this.loading = false;
    });
  }
  clear(table: Table) {
    table.clear();
  }
  formatDate(timestamp: Timestamp): string {
    const jsDate: Date | null = timestamp.toDate();

    if (jsDate !== null) {
      const transformedDate: string | null = this.datePipe.transform(jsDate, 'd MMMM yyyy');
      return transformedDate !== null ? transformedDate : 'No Date Available';
    } else {
      return 'No Date Available';
    }
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true; // Trigger validation
    if (this.expense.type && this.expense.amount && this.expense.category && this.selectedDate) {
      // Convert selectedDate to Firebase Timestamp
      const firebaseDate = Timestamp.fromDate(this.selectedDate);
      this.expense.date = firebaseDate;

      // Call your service to update the expense in Firebase
      this.apiService.updateExpense(this.expense)
        .subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense updated', life: 3000 });
            this.productDialog = false;
          },
          (error) => {
            console.error('Error updating expense:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update expense', life: 3000 });
          }
        );
    }
  }


  editProduct(expense: Expense) {
    this.expense = { ...expense };
    this.selectedDate = expense.date.toDate();
    this.productDialog = true;
  }

  deleteProduct(expense: Expense) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete?`,
      header: 'Confirm',
      icon: 'fa-solid fa-triangle-exclamation',
      accept: async () => {
        try {
          await this.apiService.deleteExpense(expense);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Expense deleted`, life: 3000 });
        } catch (error) {
          console.error('Error deleting expense:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete expense', life: 3000 });
        }
      }
    });
  }

  onRowSelect(event: any) {
    console.log(event.data.id);
  }
}
