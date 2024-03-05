import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Expense } from "../models/expense.model";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user$: Observable<any>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
  }


  addExpense(expense: Expense): Promise<any> {
    return this.firestore.collection('expenses').add(expense);
  }

  getExpenses(): Observable<Expense[]> {
    return this.firestore.collection<Expense>('expenses').valueChanges();
  }

  async deleteExpense(expense: Expense): Promise<string | undefined> {
    try {
      console.log("ExpenseId: " + expense.expenseId);
      this.firestore.doc('/Students/' + expense.expenseId).delete();
      // await this.firestore.collection('/expenses').doc(expenseId).delete();
      return "Expense deleted successfully";
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }


}
