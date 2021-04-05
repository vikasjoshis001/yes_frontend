import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token;
  auth_token;
  header;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {

  }

  // Login Api Call
  login(data) {
    console.log("Logging in...");
    return this.http.post(environment.url + "login/", data);
  }

  public isAuthenticated(): boolean {
    this.auth_token = sessionStorage.getItem('token');
    console.log(this.auth_token)
    if (this.auth_token == null) {
      console.log("false");
      return false;
    }
    console.log("true");
    return true
  }


  // Logout Function
  logout() {
    console.log("Logout Successfull...");
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  // Function for fetching Token
  getToken() {
    console.log("Fetching Token....");
    this.header = new HttpHeaders().set(
      'Authorization', 'Token ' + this.auth_token
    );
    return this.header
  }

  // Business Apis
  getBusinessList() {
    console.log("Fetching Business List....");
    return this.http.get(environment.url + "getBusiness/", { headers: this.getToken() })
  }

  deleteBusiness(data) {
    console.log("Deleting Business..")
    return this.http.get(environment.url + "deleteBusiness/?businessId=" + data, { headers: this.getToken() })
  }

  editBusiness(data) {
    console.log("Editing. Business..")
    return this.http.post(environment.url + "editBusiness/", data, { headers: this.getToken() })
  }

  addBusiness(data) {
    console.log("Adding Business...")
    return this.http.post(environment.url + "addBusiness/", data, { headers: this.getToken() })
  }

  // Customer Apis
  getCustomersList(data) {
    console.log("Fetching Customers List....");
    return this.http.get(environment.url + "getCustomer/?businessId=" + data, { headers: this.getToken() })
  }

  editCustomer(data) {
    console.log("Editing Customer...")
    return this.http.post(environment.url + "editCustomer/", data, { headers: this.getToken() })

  }

  deleteCustomer(data) {
    console.log("Deleting Customer...")
    return this.http.get(environment.url + "deleteCustomer/?customerId=" + data, { headers: this.getToken() })
  }

  addCustomer(data) {
    console.log("Adding Customer...")
    return this.http.post(environment.url + "addCustomer/", data, { headers: this.getToken() })
  }

  copyCustomer(data) {
    console.log("Copying Customer...")
    return this.http.post(environment.url + "copyCustomers/", data, { headers: this.getToken() })
  }

  getCustomerProfit(businessId, customerId) {
    console.log("Fetching Customer Profit...")
    return this.http.get(environment.url + "getCustomerProfit/?businessId=" + businessId + "&&customerId=" + customerId, { headers: this.getToken() })
  }

  DeleteAllCustomers(data){
    console.log("Deleting All Customers...")
    return this.http.post(environment.url + "deleteAllCustomers/", data, { headers: this.getToken() })
  }

  createCustomersCSV(data) {
    console.log("Creating Customers CSV...")
    return this.http.post(environment.url + "createCustomersCSV/", data, { headers: this.getToken() })
  }

  createProfitCSV(data) {
    console.log("Creating Customers Profit CSV...")
    return this.http.post(environment.url + "createProfitCSV/", data, { headers: this.getToken() })
  }

  createCustomersPdf(data) {
    console.log("Creating Customers Pdf...")
    return this.http.post(environment.url + "createCustomersPdf/", data, { headers: this.getToken() })
  }

  createProfitPdf(data) {
    console.log("Creating Customers Profit Pdf...")
    return this.http.post(environment.url + "createProfitPdf/", data, { headers: this.getToken() })
  }

  // Transaction Apis
  transaction(data) {
    console.log("Transaction on the way...")
    return this.http.post(environment.url + "addTransaction/", data, { headers: this.getToken() })
  }

  getTransactionHistory(transactionCustomer) {
    console.log("Fetching Transaction History...")
    return this.http.get(environment.url + "getTransaction/?customerId=" + transactionCustomer, { headers: this.getToken() })
  }

  createTransactionCSV(data) {
    console.log("Creating Transaction CSV...")
    return this.http.post(environment.url + "createTransactionCSV/", data, { headers: this.getToken() })
  }

  createTransactionPdf(data) {
    console.log("Creating Transaction Pdf...")
    return this.http.post(environment.url + "createTransactionPdf/", data, { headers: this.getToken() })
  }

  // Finance Apis
  backupData() {
    console.log("Backuping Data...");
    return this.http.get(environment.url + "backup/", { headers: this.getToken() })
  }













}
