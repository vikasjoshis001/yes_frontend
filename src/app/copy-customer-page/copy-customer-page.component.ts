import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-copy-customer-page',
  templateUrl: './copy-customer-page.component.html',
  styleUrls: ['./copy-customer-page.component.css']
})
export class CopyCustomerPageComponent implements OnInit {

  private routeSub: any;
  businessId; customerId;
  businessList; customerList;
  text = '';
  copied; length;
  selectedCustomerIds = [1, 2];
  page = 1;
  totalLength;
  show_copy = false
  errorMessage;
  businessName;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }


  // Sorting Function
  key = 'id';
  reverse = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  // Add CustomerIds Function
  addCustomerIds(data) {
    this.selectedCustomerIds.push[0]
    var i = 0;
    for (i = 0; i < this.selectedCustomerIds.length; i++) {
      if (data.customerId == this.selectedCustomerIds[i]) {
        data.customerStatus = false;
        this.selectedCustomerIds = this.selectedCustomerIds.filter(item => item !== data.customerId)
        return;
      }
    }
    this.selectedCustomerIds.push(data.customerId)
    data.customerStatus = true;
    console.log(this.selectedCustomerIds)
  }

  // Search Function
  Search() {
    if (this.text == "") {
      this.ngOnInit()
    }
    else {
      this.customerList = this.customerList.filter((res) => {
        return res.customerName.toLocaleLowerCase().match(this.text.toLocaleLowerCase())
      })
    }
  }

  // copyCustomersApi Call
  copy(data) {
    this.show_copy = true
    this.selectedCustomerIds = this.selectedCustomerIds.filter(item => item !== 1)
    this.selectedCustomerIds = this.selectedCustomerIds.filter(item => item !== 2)
    data.value['customersId'] = this.selectedCustomerIds;
    return this.authService.copyCustomer(data.value).subscribe((result) => {
      this.copied = result;
      this.show_copy = false;
      this.changeCustomerStatus();     
      this.selectedCustomerIds = [1, 2];
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })

  }

  // changeCustomerStatus Function
  changeCustomerStatus(){
    var i =0;
    for(i=0;i<this.customerList.length;i++){
      this.customerList[i].customerStatus = false;
    }
  }
 
  // getBusiness Api Call
  getBusinessList() {
    return this.authService.getBusinessList().subscribe((result) => {
      console.log("Business List Fetched Successfully....")
      this.businessList = result
      this.businessList = this.businessList.data['businessList']
    }),
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    }
  }

  // getCustomers Api Call
  getCustomers(data) {
    return this.authService.getCustomersList(data).subscribe((result) => {
      console.log("Customers List Fetched Successfully....")
      this.customerList = result
      this.businessName = this.customerList.total['businessName'];
      this.customerList = this.customerList.data['customersList'];
      this.customerList = this.customerList.reverse();      
      this.totalLength = this.customerList.length;
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.businessId = para['businessId']
      this.getCustomers(this.businessId)
      this.getBusinessList()
      this.changeCustomerStatus();     

    })
  }

}