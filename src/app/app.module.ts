import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ExpenseReportComponent } from './components/expense-report/expense-report.component';
import { TableModule } from "primeng/table";
import { DatePipe } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { AuthModule } from '@auth0/auth0-angular';
import { MenubarModule } from 'primeng/menubar';
@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    DashboardComponent,
    ExpenseReportComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MenubarModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FontAwesomeModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    AuthModule.forRoot({
      domain: 'iamnaveenofficial.us.auth0.com',
      clientId: 'JjCw6guy8vWw5HUCtKNk3ZMKlhXq62Iq',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),

  ],
  providers: [MessageService, DatePipe, ConfirmationService,],
  bootstrap: [AppComponent]
})
export class AppModule {
}
