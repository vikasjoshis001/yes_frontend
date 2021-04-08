import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private routeSub: any;
  title = "Customers"
  businessId;
  total;
  totalCredit = 300;
  totalDebit = 100;
  totalPending = 20;
  pieChartLabels
  pieChartData
  pieChartType
  pieChartPlugins
  pieChartLegend
  pieChartOptions
  businessName;
  businessCreatedAt;
  totalCustomers;
  pieChartColor;
  constructor(private authService: AuthService, private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  BusinessManagement() {
    this.authService.BusinessManagement(this.businessId).subscribe((result) => {
      this.total = result
      this.total = this.total.data['totalList']
      this.businessName = this.total['businessName']
      this.businessCreatedAt = this.total['businessCreatedAt']
      this.totalCustomers = this.total['totalCustomers']
      this.totalCredit = this.total['totalCredit']
      this.totalDebit = this.total['totalDebit']
      this.totalPending = this.total['totalPending']
      // Pie
      this.pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      this.pieChartLabels = [['Total Debit'], ['Total Pending']];
      this.pieChartData= [this.totalDebit, this.totalPending];
      this.pieChartColor = [{
        backgroundColor: ['green', 'red'],
        borderColor: ['green', 'red']
     }];
      this.pieChartType= 'pie';
      this.pieChartLegend = true;
      this.pieChartPlugins = [];
    })
  }

  

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(para => {
      this.businessId = para['businessId']
      this.BusinessManagement()

    })


  }

}
