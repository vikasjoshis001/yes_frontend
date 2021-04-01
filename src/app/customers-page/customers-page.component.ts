import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})
export class CustomersPageComponent implements OnInit {

  private routeSub: any;
  title = "Customers"
  id = "string";
  text = '';
  totalCredit;
  totalDebit;
  totalPending;
  totalLength;
  csvdata;
  csvFile;
  page = 1;
  val;
  i = 1;
  my_transaction;
  show_customerEdit_form = false;
  show_customerAdd_form = false;
  show_customerDelete_form = false;
  show_transaction_form = false;
  show_copyCustomer_form = false;
  show_createExcel = false;
  customerEditName;
  customerEditContact;
  customerEditAadharNumber;
  customerEditPanNumber;
  customerEditAddress;
  customerEditCredit;
  customerEditDebit;
  customerEditPending;
  customerEditId;
  editedCustomer;
  deletedCustomer;
  addedCustomer;
  msg;
  
  customerList;
  businessList;
  headElements = ['Sr.No.', 'Name', 'Credit', 'Debit', 'Pending', 'Contact', 'Address', 'Aadhar No.', 'Pan No.', 'Actions'];
  newHead = ['Select','Name']
  transactionList;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { 
  }


  getCustomers(data) {
    console.log("Getting Customers List...")
    return this.authService.getCustomersList(data).subscribe((result) => {
      console.log("Customers List Fetched Successfully....")
      this.customerList = result
      this.csvdata = this.customerList.data
      this.totalCredit = this.customerList.total["totalCredit"]
      this.totalDebit = this.customerList.total["totalDebit"]
      this.totalPending = this.customerList.total["totalPending"]
      this.customerList = this.customerList.data['customersList'];
      console.log(this.customerList)
      this.totalLength = this.customerList.length
    })
  }

  editCustomerForm(data) {
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName;
    this.customerEditContact = data.customerContact;
    this.customerEditAddress = data.customerAddress;
    this.customerEditAadharNumber = data.customerAadharNumber;
    this.customerEditPanNumber = data.customerPanNumber;
    this.customerEditCredit = data.customerCredit;
    this.customerEditDebit = data.customerName;
    this.customerEditPending = data.customerPending;
    this.show_customerEdit_form = true;
    console.log(this.customerEditName)


  }

  editCustomer(data) {
    console.log("Editing Customer...")
    data.value['customerId'] = this.customerEditId;
    if (data.value['customerContact'] == '') {
      data.value['customerContact'] = this.customerEditContact
    }
    if (data.value['customerName'] == '') {
      data.value['customerName'] = this.customerEditName
    }
    if (data.value['customerAddress'] == '') {
      data.value['customerAddress'] = this.customerEditAddress
    }
    if (data.value['customerAadharNumber'] == '') {
      data.value['customerAadharNumber'] = this.customerEditAadharNumber
    }
    if (data.value['customerPanNumber'] == '') {
      data.value['customerPanNumber'] = this.customerEditPanNumber
    }
    return this.authService.editCustomer(data.value).subscribe((result) => {
      this.editedCustomer = result;
      console.log("Customer Edited...");
      this.show_customerEdit_form = false;
      location.assign(environment.frontend_url + "customers/" + this.id)
    })

  }

  
  deleteCustomer() {
    console.log("Deleting Customer...")
    return this.authService.deleteCustomer(this.customerEditId).subscribe((result) => {
      this.deletedCustomer = result;
      console.log(this.deletedCustomer)
      console.log("Customer Deleted...");
      location.assign(environment.frontend_url + "customers/" + this.id)
    })
  }

  createCSV() {
    this.show_createExcel = true;
    console.log("CSV Creating...")
    console.log(this.csvdata)
    return this.authService.createCSV(this.csvdata).subscribe((result) => {
      console.log("CSV Created....")
      this.csvFile = result
      console.log(this.csvFile);
      this.show_createExcel = false;
    })
  }

  transactionForm(data) {
    console.log(this.show_customerEdit_form)
    console.log(this.show_transaction_form)
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName;
    this.customerEditContact = data.customerContact;
    this.customerEditAddress = data.customerAddress;
    this.customerEditAadharNumber = data.customerAadharNumber;
    this.customerEditPanNumber = data.customerPanNumber;
    this.customerEditCredit = data.customerCredit;
    this.customerEditDebit = data.customerDebit;
    this.customerEditPending = data.customerPending;
    this.show_transaction_form = true;
    console.log(this.customerEditName)
  }


  transaction(data) {
    data.value['transactionName'] = this.customerEditName
    data.value['transactionContact'] = this.customerEditContact
    data.value['transactionAddress'] = this.customerEditAddress
    data.value['transactionAadharNumber'] = this.customerEditAadharNumber
    data.value['transactionPanNumber'] = this.customerEditPanNumber
    data.value['customerId'] = this.customerEditId
    data.value['businessId'] = this.id
    if (data.value['transactionNewDebit'] == '') {
      data.value['transactionNewDebit'] = this.customerEditDebit
    }
    if (data.value['transactionCredit'] == '') {
      data.value['transactionCredit'] = this.customerEditCredit
    }
    console.log("Transaction Ongoing...")
    console.log(data.value)
    return this.authService.transaction(data.value).subscribe((result) => {
      console.log("Transaction Done....")
      this.my_transaction = result
      this.show_transaction_form = false;
      console.log(this.my_transaction);
      location.assign(environment.frontend_url + "customers/" + this.id)

    })
  }

  addUser() {
    this.show_customerAdd_form = true
  }

  deleteCustomerForm(data) {
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName
    this.show_customerDelete_form = true
  }

  addCustomer(data) {
    data.value['businessId'] = this.id
    console.log(data.value)
    return this.authService.addCustomer(data.value).subscribe((result) => {
      console.log("Customer Added....")
      this.addedCustomer = result
      this.show_customerAdd_form = false;
      console.log(this.addedCustomer);
      location.assign(environment.frontend_url + "customers/" + this.id)

    })
  }

  onClose() {
    this.show_customerEdit_form = false;
    this.show_transaction_form = false;
    this.show_customerAdd_form = false;
    this.show_customerDelete_form = false;


  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.id = para['businessId']
      this.getCustomers(this.id)

    })


  }

}

