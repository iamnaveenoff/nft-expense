import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, from, map } from "rxjs";
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

  updateExpense(expense: Expense) {
    try {
      const expenseRef = this.firestore.collection('expenses').doc(expense.id);
      return from(expenseRef.update(expense));
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  getExpenses(): Observable<Expense[]> {
    return this.firestore.collection<Expense>('expenses')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((change) => ({
            ...change.payload.doc.data(),
            id: change.payload.doc.id,
          }))
        )
      );
  }
  async deleteExpense(expense: Expense): Promise<string | undefined> {
    console.log(expense)
    try {
      await this.firestore.collection('/expenses').doc(expense.id).delete();
      return "Expense deleted successfully";
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }


}
