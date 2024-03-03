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



}
