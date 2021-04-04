import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-profit-page',
  templateUrl: './customer-profit-page.component.html',
  styleUrls: ['./customer-profit-page.component.css']
})
export class CustomerProfitPageComponent implements OnInit {

  private routeSub: any;
  businessId; customerId;
  data;
  profitList;
  page = 1;
  text = "";
  show_createExcel = false;
  csvdata; csvFile;
  totalRecords;
  totalCredit;
  totalDebit;
  totalPending;
  headElements = ['Sr.No.', 'Business', 'Name', 'Credit', 'Debit', 'Pending'];
  errorMessage;
  customerName;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  // getCustomerProfit Api Call
  getCustomerProfit() {
    return this.authService.getCustomerProfit(this.businessId, this.customerId).subscribe((result) => {
      console.log("Customer Profit List fetched...");
      this.profitList = result;
      this.csvdata = this.profitList.data
      this.totalCredit = this.profitList.total["totalCredit"]
      this.totalDebit = this.profitList.total["totalDebit"]
      this.totalPending = this.profitList.total["totalPending"]
      this.customerName = this.profitList.total["customerName"]
      this.profitList = this.profitList.data['profitList'];
      console.log(this.profitList)
      this.totalRecords = this.profitList.length;
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // createProfitCSV Api Call
  createProfitCSV() {
    this.show_createExcel = true;
    return this.authService.createProfitCSV(this.csvdata).subscribe((result) => {
      console.log("CSV Created Successfully....")
      this.csvFile = result
      this.show_createExcel = false;
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
      this.customerId = para['customerId']
      this.getCustomerProfit()

    })
  }

}
