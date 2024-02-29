import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Expense} from "../models/expense.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: AngularFirestore) {}

  addExpense(expense: Expense): Promise<any> {
    return this.firestore.collection('expenses').add(expense);
  }

  getExpenses(): Observable<Expense[]> {
    return this.firestore.collection<Expense>('expenses').valueChanges();
  }
}
