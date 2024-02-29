import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit{

  expenseForm: FormGroup;

  constructor(private fb: FormBuilder,private firestore: AngularFirestore,private messageService: MessageService) {
    this.expenseForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      description: ['', Validators.maxLength(255)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.firestore.collection('expenses').add(this.expenseForm.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added Successfully' });
      this.expenseForm.reset();
    }
  }
}
