import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';

// My Modules
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BusinessPageComponent } from './business-page/business-page.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyCustomerPageComponent } from './copy-customer-page/copy-customer-page.component';
import { AngularDataTableModule } from 'angular-data-table-library'
import { OrderModule } from 'ngx-order-pipe';
import { CustomerProfitPageComponent } from './customer-profit-page/customer-profit-page.component';
// My Modules

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BusinessPageComponent,
    CustomersPageComponent,
    TransactionPageComponent,
    CopyCustomerPageComponent,
    CustomerProfitPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    AngularDataTableModule,
    OrderModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
