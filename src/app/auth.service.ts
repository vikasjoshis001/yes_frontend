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
  my_token;
  header;
  businessList;
  url;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {

  }

  login(data) {
    return this.http.post(environment.url + "login/", data)
  }

  public isAuthenticated(): boolean {
    this.my_token = sessionStorage.getItem('token');
    console.log(this.my_token)
    if (this.my_token == null) {
      console.log("false");
      return false;
    }
    console.log("true");
    return true
  }


  logout() {
    console.log("Logout Successfull...");
    sessionStorage.removeItem('token');
    this.router.navigate(['/home']);

  }

  getToken() {
    console.log("fetching token....");
    this.header = new HttpHeaders().set(
        'Authorization', 'Token ' + this.my_token
    );
    return this.header
  }

  getBusinessList() {
    console.log("fetching business list....");
    return this.http.get(environment.url + "getBusiness/", {headers:this.getToken()})
  }

  deleteBusiness(data) {
    return this.http.get(environment.url + "deleteBusiness/?businessId="+data, {headers:this.getToken()})
  }

  backupData() {
    console.log("backuping Data...");
    return this.http.get(environment.url + "backup/", {headers:this.getToken()})
  }

  getCustomersList(data){
  console.log("fetching customers list....");
  return this.http.get(environment.url + "getCustomer/?businessId="+data, {headers:this.getToken()})
}

getTransactionHistory(transactionCustomer){
  return this.http.get(environment.url + "getTransaction/?customerId="+transactionCustomer, {headers:this.getToken()})

}

createCSV(data){
  return this.http.post(environment.url + "createCSV/",data, {headers:this.getToken()})
}

editCustomer(data){
  console.log("Customer is Editing...")
  return this.http.post(environment.url + "editCustomer/",data, {headers:this.getToken()})

}

deleteCustomer(data){
  console.log("Customer Deleting...")
  return this.http.get(environment.url + "deleteCustomer/?customerId="+data, {headers:this.getToken()})

}

transaction(data){
  console.log("Customer is Editing...")
  return this.http.post(environment.url + "addTransaction/",data, {headers:this.getToken()})

}

addCustomer(data){
  console.log("Adding Customer...")
  return this.http.post(environment.url + "addCustomer/",data, {headers:this.getToken()})
}

}
