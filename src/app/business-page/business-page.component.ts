import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.css']
})
export class BusinessPageComponent implements OnInit {

  businessList;
  title = "My Businesses";
  private req: any;
  text = '';
  totalRecords;
  page = 1;
  show_businessEdit_form = false;
  show_businessAdd_form = false;
  show_businessDelete_form = false;
  businessEditName;
  businessEditId;
  editedBusiness;
  addedBusiness;
  errorMessage;
  constructor(private authService: AuthService) { }

  // getBusiness Api Call
  getBusiness() {
    return this.authService.getBusinessList().subscribe((result) => {
      console.log("Business List Fetched Successfully....");
      this.businessList = result;
      this.businessList = this.businessList.data['businessList'];
      this.businessList = this.businessList.reverse();
      this.totalRecords = this.businessList.length;
      return this.businessList;
    },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage)
        alert("Network Error")
      })
  }

  // addBusiness Form
  addBusinessForm() {
    this.show_businessAdd_form = true
  }

  //  addBusiness Api Call
  addBusiness(data) {
    return this.authService.addBusiness(data.value).subscribe((result) => {
      console.log("Customer Added Successfully....")
      this.addedBusiness = result
      this.show_businessAdd_form = false;
      location.assign(environment.frontend_url + "business/")
    },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage)
        alert("Network Error")
      })
  }

  // editBusiness Form
  editBusinessForm(data) {
    this.businessEditId = data.businessId
    this.businessEditName = data.businessName;
    this.show_businessEdit_form = true;
  }

  // editBusiness Api Call
  editBusiness(data) {
    data.value['businessId'] = this.businessEditId;
    return this.authService.editBusiness(data.value).subscribe((result) => {
      console.log("Customer Edited Successfully...");
      this.editedBusiness = result;
      this.show_businessEdit_form = false;
      location.assign(environment.frontend_url + "business/")
    },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage)
        alert("Network Error")
      })
  }
  // Business Delete Api Call
  deleteBusiness() {
    this.authService.deleteBusiness(this.businessEditId).subscribe((result) => {
      console.log("Business Deleted Successfully....");
      location.assign(environment.frontend_url + "business");
    },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage)
        alert("Network Error")
      })
  }

  // deleteBusiness Form
  deleteBusinessForm(data) {
    this.businessEditId = data.businessId
    this.businessEditName = data.businessName
    this.show_businessDelete_form = true
  }

  // onClose Function
  onClose() {
    this.show_businessEdit_form = false;
    this.show_businessAdd_form = false;
    this.show_businessDelete_form = false;
  }

  ngOnInit(): void {
    this.getBusiness()
  }

}