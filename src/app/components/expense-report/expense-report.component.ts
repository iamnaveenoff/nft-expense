import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { MessageService } from "primeng/api";
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
  loading: boolean = true;
  constructor(private messageService: MessageService, private apiService: ApiService, private datePipe: DatePipe) { }
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

}
