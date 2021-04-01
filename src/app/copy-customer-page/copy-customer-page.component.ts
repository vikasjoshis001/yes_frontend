import { Component, OnInit } from '@angular/core';
import { FormControl,FormArray, FormBuilder, FormGroup } from "@angular/forms";
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
  selectedOrderIds;
  form: FormGroup;
  webData = new Array();
  businessId;
  customerId;
  businessList;
  customerList;
  text = '';
  copied;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  private addCheckboxesToForm() {
    this.webData.forEach(() => this.ordersFormArray.push(new FormControl (false) ));
  }
  
  submit() {
     this.selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.webData[i].customerId : null)
      .filter(v => v !== null);
    console.log(this.selectedOrderIds);
  }

  copy(data){
    data.value['customersId'] = this.selectedOrderIds;
    console.log(data.value)
    return this.authService.copyCustomer(data.value).subscribe((result) => {
      this.copied = result;
      console.log(this.copied);
    })

  }

  copyCustomer(){
    console.log(this.webData)
    return this.authService.getBusinessList().subscribe((result) => {
      console.log("Business List Fetched Successfully....")
      this.businessList = result
      console.log(this.businessList);
      this.businessList = this.businessList.data['businessList']
      console.log(this.businessList);
      for(var i=0;i < this.customerList.length;i++){
        this.webData.push(this.customerList[i])
      }
      this.form = this.formBuilder.group({
        orders: new FormArray([])
      });
    
      this.addCheckboxesToForm();
    })
  }

  getCustomers(data) {
    console.log("Getting Customers List...")
    return this.authService.getCustomersList(data).subscribe((result) => {
      console.log("Customers List Fetched Successfully....")
      this.customerList = result
      this.customerList = this.customerList.data['customersList'];
      console.log(this.customerList)
    })
  }

 
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.businessId = para['businessId']
      this.getCustomers(this.businessId)
      this.copyCustomer()

    })
  }

}