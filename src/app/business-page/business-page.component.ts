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
  constructor(private authService: AuthService) { }

  getBusiness(){
    return this.authService.getBusinessList().subscribe((result) => {
      console.log("Business List Fetched Successfully....")
      this.businessList = result
      console.log(this.businessList);
      this.businessList = this.businessList.data['businessList']
      console.log(this.businessList);
      this.totalRecords = this.businessList.length
      return this.businessList;
    })
  }

  deleteBusiness(){
    console.log("Deleting Business...")
    return this.authService.deleteBusiness(this.businessEditId).subscribe((result) => {
      console.log("Business Deleted Successfully....")
      location.assign(environment.frontend_url + "business")
    })
  }

  editBusinessForm(data) {
    this.businessEditId = data.businessId
    this.businessEditName = data.businessName;
    this.show_businessEdit_form = true;
    console.log(this.businessEditName)


  }

  editBusiness(data) {
    console.log("Editing Business...")
    data.value['businessId'] = this.businessEditId;
    return this.authService.editBusiness(data.value).subscribe((result) => {
      this.editedBusiness = result;
      console.log("Customer Edited...");
      this.show_businessEdit_form = false;
      location.assign(environment.frontend_url + "business/")
    })

  }

//   onChangePage(pageOfItems: Array<any>) {
//     // update current page of items
//     this.pageOfItems = pageOfItems;
// }
addUser() {
  this.show_businessAdd_form = true
}

deleteBusinessForm(data){
  this.businessEditId = data.businessId
  this.businessEditName = data.businessName
  this.show_businessDelete_form = true
}

addBusiness(data) {
  return this.authService.addBusiness(data.value).subscribe((result) => {
    console.log("Customer Added....")
    this.addedBusiness = result
    this.show_businessAdd_form = false;
    console.log(this.addedBusiness);
    location.assign(environment.frontend_url + "business/")

  })}


onClose() {
  this.show_businessEdit_form = false;
  this.show_businessAdd_form = false;
  this.show_businessDelete_form = false;



}

  ngOnInit(): void {
    console.log(this.text)
    this.getBusiness()
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

}
