import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/*
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  fecha: any;
  constructor( private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe( params => {
      this.fecha =  params['fecha'];
    });
  }

  ngOnInit(): void {

  }
}
