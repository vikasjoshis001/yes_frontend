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
  businessId = "string";
  text = '';
  totalCredit; totalDebit; totalPending; totalLength;
  csvdata; csvFile;pdfdata;pdfFile;
  page = 1; my_transaction;
  show_customerEdit_form = false;
  show_customerAdd_form = false;
  show_customerDelete_form = false;
  show_transaction_form = false;
  show_copyCustomer_form = false;
  show_createExcel = false;
  show_createPdf = false;
  customerEditName; customerEditContact; customerEditAadharNumber; customerEditPanNumber; customerEditAddress; customerEditDOB; customerEditCredit; customerEditDebit; customerEditPending; customerEditId;
  editedCustomer; deletedCustomer; addedCustomer;
  errorMessage;
  customerList;
  businessName;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
  }



  // getCustomers Api Call
  getCustomers(data) {
    return this.authService.getCustomersList(data).subscribe((result) => {
      console.log("Customers List Fetched Successfully....")
      this.customerList = result
      this.csvdata = this.customerList.data
      this.pdfdata = this.customerList.data
      console.log(this.customerList)
      this.totalCredit = this.customerList.total["totalCredit"]
      this.totalDebit = this.customerList.total["totalDebit"]
      this.totalPending = this.customerList.total["totalPending"]
      this.businessName = this.customerList.total["businessName"]
      this.customerList = this.customerList.data['customersList'];
      this.customerList = this.customerList.reverse();      
      this.totalLength = this.customerList.length
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // addCustomer Form
  addCustomerForm() {
    this.show_customerAdd_form = true
  }

  // addCustomer Api Call
  addCustomer(data) {
    if (data.value['customerDebit'] == '') {
      data.value['customerDebit'] = 0;
    }
    if (data.value['customerCredit'] == '') {
      data.value['customerCredit'] = 0
    }
    data.value['businessId'] = this.businessId
    return this.authService.addCustomer(data.value).subscribe((result) => {
      console.log("Customer Added Successfully....")
      this.addedCustomer = result
      console.log(this.addedCustomer)
      this.show_customerAdd_form = false;
      location.assign(environment.frontend_url + "customers/" + this.businessId)
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // addTransaction Form
  transactionForm(data) {
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName;
    this.customerEditPending = data.customerPending;
    this.show_transaction_form = true;
  }

  // addTransaction Api Call
  transaction(data) {
    data.value['transactionName'] = this.customerEditName
    data.value['customerId'] = this.customerEditId
    data.value['businessId'] = this.businessId
    if (data.value['transactionDebit'] == '') {
      data.value['transactionDebit'] = 0;
    }
    if (data.value['transactionCredit'] == '') {
      data.value['transactionCredit'] = 0
    }
    return this.authService.transaction(data.value).subscribe((result) => {
      console.log("Transaction Done Successfully....")
      this.my_transaction = result
      this.show_transaction_form = false;
      location.assign(environment.frontend_url + "customers/" + this.businessId)
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // editCustomer Form
  editCustomerForm(data) {
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName;
    this.customerEditContact = data.customerContact;
    this.customerEditAddress = data.customerAddress;
    this.customerEditAadharNumber = data.customerAadharNumber;
    this.customerEditPanNumber = data.customerPanNumber;
    this.customerEditDOB = data.customerDOB;
    this.show_customerEdit_form = true;
  }

  // editCustomer Api Call
  editCustomer(data) {
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
    if (data.value['customerDOB'] == '') {
      data.value['customerDOB'] = this.customerEditDOB
    }
    return this.authService.editCustomer(data.value).subscribe((result) => {
      this.editedCustomer = result;
      console.log("Customer Edited Successfully...");
      this.show_customerEdit_form = false;
      location.assign(environment.frontend_url + "customers/" + this.businessId)
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })

  }

  // deleteCustomer Form
  deleteCustomerForm(data) {
    this.customerEditId = data.customerId
    this.customerEditName = data.customerName
    this.show_customerDelete_form = true
  }

  // deleteCustomer Api Call
  deleteCustomer() {
    return this.authService.deleteCustomer(this.customerEditId).subscribe((result) => {
      this.deletedCustomer = result;
      console.log("Customer Deleted Successfully...");
      location.assign(environment.frontend_url + "customers/" + this.businessId)
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // createCustomersCSV Api Call
  createCustomersCSV() {
    this.show_createExcel = true;
    return this.authService.createCustomersCSV(this.csvdata).subscribe((result) => {
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

  // createCustomersPdf Api Call
  createCustomersPdf() {
    this.show_createPdf = true;
    return this.authService.createCustomersPdf(this.csvdata).subscribe((result) => {
      console.log("Pdf Created Successfully....")
      this.pdfFile = result
      this.show_createPdf = false;
    },
    (error) => {       
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }

  // onClose Form
  onClose() {
    this.show_customerEdit_form = false;
    this.show_transaction_form = false;
    this.show_customerAdd_form = false;
    this.show_customerDelete_form = false;
  }

  // Sorting Function
  key = 'id';
  reverse = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  // Searching Function
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

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.businessId = para['businessId']
      this.getCustomers(this.businessId)

    })


  }

}

