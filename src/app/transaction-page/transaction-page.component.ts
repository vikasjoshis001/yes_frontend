import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {

  private routeSub: any;
  transactionList;
  businessId;
  customerId;
  page = 1;
  totalRecords;
  totalCredit;
  totalDebit;
  totalPending;
  show_createExcel = false;
  text = '';
  csvdata;
  csvFile;
  headElements = ['Sr.No.', 'Date', 'Name', 'Credit', 'Debit', 'Pending'];

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  // getTransactionHistory Api Call
  getTransactionHistory(data) {
    return this.authService.getTransactionHistory(data).subscribe((result) => {
      console.log("Transaction History Fetched Successfully....")
      this.transactionList = result
      console.log(this.transactionList)
      this.csvdata = this.transactionList.data
      this.totalCredit = this.transactionList.total["totalCredit"]
      this.totalDebit = this.transactionList.total["totalDebit"]
      this.totalPending = this.transactionList.total["totalPending"]
      this.transactionList = this.transactionList.data['transactionHistory']
      this.totalRecords = this.transactionList.length
      return this.transactionList;
    })
  }


  // createTransactionCSV Api Call
  createTransactionCSV() {
    this.show_createExcel = true;
    return this.authService.createTransactionCSV(this.csvdata).subscribe((result) => {
      console.log("CSV Created Successfully...")
      this.csvFile = result
      this.show_createExcel = false;
    })
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.businessId = para['businessId']
      this.customerId = para['customerId']
      this.getTransactionHistory(this.customerId)

    })
  }

}
