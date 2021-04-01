import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { BusinessPageComponent } from './business-page/business-page.component';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { CopyCustomerPageComponent } from './copy-customer-page/copy-customer-page.component';

const routes: Routes = [
  {
    path: "copy/:businessId",
    component: CopyCustomerPageComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "transaction/:businessId/:customerId",
    component: TransactionPageComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "customers/:businessId",
    component: CustomersPageComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "business",
    component: BusinessPageComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "",
    component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
