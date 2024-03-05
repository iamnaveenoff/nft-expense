import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { nanoid } from 'nanoid';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private apiService: ApiService) {
    this.expenseForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.maxLength(255)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      // this.firestore.collection('expenses').add(this.expenseForm.value);
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
      // this.expenseForm.reset();
      this.apiService.addExpense(this.expenseForm.value).then((result) => {
        console.log('Expense added successfully:', result);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
        this.expenseForm.reset();
      }).catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'ERROR', detail: error });
        console.error('Error adding expense:', error);
      });
    }
  }
}
