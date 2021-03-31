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

  deleteBusiness(data){
    console.log("Deleting Business...")
    return this.authService.deleteBusiness(data['businessId']).subscribe((result) => {
      console.log("Business Deleted Successfully....")
      location.assign(environment.frontend_url + "business")
    })
  }

//   onChangePage(pageOfItems: Array<any>) {
//     // update current page of items
//     this.pageOfItems = pageOfItems;
// }

  ngOnInit(): void {
    console.log(this.text)
    this.getBusiness()
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

}
