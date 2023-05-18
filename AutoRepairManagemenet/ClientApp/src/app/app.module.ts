import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MatTableModule } from '@angular/material/table';
import { ClientsComponent } from './clients/clients.component';
import { EmployersComponent } from './employers/employers.component';
import { AutoPartsComponent } from './autoparts/autoparts.component';
import { JobsComponent } from './jobs/jobs.component';
import { OrdersComponent } from './orders/orders.component';
import { DocumentsComponent } from './documents/documents.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { AddEmployerComponent } from './employers/add-employer/add-employer.component';
import { AddPartComponent } from './autoparts/add-part/add-part.component';
import { AddJobComponent } from './jobs/add-job/add-job.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { AddDocumentComponent } from './documents/add-document/add-document.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ClientsComponent,
    EmployersComponent,
    AutoPartsComponent,
    JobsComponent,
    OrdersComponent,
    DocumentsComponent,
    NotFoundComponent,
    ConfirmComponent,
    AddClientComponent,
    AddEmployerComponent,
    AddPartComponent,
    AddJobComponent,
    AddOrderComponent,
    AddDocumentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatStepperModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: ClientsComponent, pathMatch: 'full' },
      { path: 'clients', component: ClientsComponent },
      { path: 'employers', component: EmployersComponent },
      { path: 'autoparts', component: AutoPartsComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
