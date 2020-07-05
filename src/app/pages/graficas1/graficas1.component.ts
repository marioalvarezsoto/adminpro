import { Component, OnInit, NgZone } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

  /* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
// am4core.useTheme(function customTheme(object) {
//   // Identify the instances
//   if (object instanceof am4core.Tooltip && object.label) {
//       object.autoTextColor = false;
//       object.label.fill = am4core.color("#FFFFFF");
//   }
// });

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [
  ]
})
// tslint:disable: prefer-const
export class Graficas1Component implements OnInit {
  public barChartColors: Color[] = [
    { backgroundColor: [ "rgb(0, 153, 0)", "rgb(0, 153, 0)", "rgb(0, 153, 0)"] },
    { backgroundColor: [ "rgb(255, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 0, 0)"] },
    { backgroundColor: [ "rgb(0, 0, 153)", "rgb(0, 0, 153)", "rgb(0, 0, 153)"] },
  ];
  public lineChartColors: Color[] = [{ 
    // green
        backgroundColor: '',
        borderColor: 'green',
        pointBackgroundColor: '',
        pointBorderColor: '',
        pointHoverBackgroundColor: '',
        pointHoverBorderColor: ''
      },
      { // red
        backgroundColor: '',
        borderColor: 'red',
        pointBackgroundColor: '',
        pointBorderColor: '',
        pointHoverBackgroundColor: '',
        pointHoverBorderColor: ''
      }
  ];
  public data1: ChartDataSets[] = [
    { data: [100, 50, 30], label: 'Presupuesto' },
    { data: [80, 33, 22], label: 'Comprado' },
    { data: [20, 17, 8], label: 'Disponible' }
  ];
  public data2: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Planeado' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Real' }
  ];
  graficos: any = {
    grafico1: {
      labels: ['Acero', 'Soldadura', 'Tornilleria'],
      data: this.data1,
      type: 'bar',
      leyenda: 'Comparativo',
      colors: this.barChartColors
    },
    grafico2: {
      labels: ['SEM 1', 'SEM 2', 'SEM 3', 'SEM 4', 'SEM 5', 'SEM 6', 'SEM 7'],
      data: this.data2,
      type: 'line',
      leyenda: 'Acero',
      colors: this.lineChartColors
    }
  };
  datos1: any[] = [];
  private chart: am4charts.XYChart;
  series1: any;
  series2: any;
  categoryAxis: any;

  constructor( private zone: NgZone, public router: Router) {
    this.datos1 = this.data1[0].data;
    this.data1.map( (data: any, i: number) => {
      this.datos1.push(data.label);
      this.datos1.push(data.data[ i ]);
    } );
  }
  ngOnInit(): void {
    // Create chart instance
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    // this.chart.data = [
    //   { semana: '04/04/2020', Planeado: 1000, Real: 5000 },
    //   { semana: '11/04/2020', Planeado: 2000, Real: 2000 },
    //   { semana: '18/04/2020', Planeado: 2000, Real: 3000 },
    //   { semana: '25/04/2020', Planeado: 3000, Real: 4000 },
    //   { semana: '02/05/2020', Planeado: 5000, Real: 1000 },
    //   { semana: '09/05/2020', Planeado: 3000, Real: 2000 },
    //   { semana: '16/05/2020', Planeado: 1000, Real: 2000 },
    //   { semana: '23/05/2020', Planeado: 2000, Real: 1000 },
    //   { semana: '30/05/2020', Planeado: 3000, Real: 5000 },
    //   { semana: '06/06/2020', Planeado: 4000, Real: 3000 },
    //   { semana: '13/06/2020', Planeado: 1000, Real: 2000 }
    // ];

    this.chart.data = [
      { semana: '04/04/2020', Planeado: 1000, Real: 1100 },
      { semana: '11/04/2020', Planeado: 2000, Real: 2000 },
      { semana: '18/04/2020', Planeado: 2000, Real: 2000 },
      { semana: '25/04/2020', Planeado: 3000, Real: 3500 },
      { semana: '02/05/2020', Planeado: 5000, Real: 5100 },
      { semana: '09/05/2020', Planeado: 3000, Real: 2000 },
      { semana: '16/05/2020', Planeado: 1000, Real: 1000 },
      { semana: '23/05/2020', Planeado: 2000, Real: 1000 },
      { semana: '30/05/2020', Planeado: 3000, Real: 3500 },
      { semana: '06/06/2020', Planeado: 4000, Real: 3000 },
      { semana: '13/06/2020', Planeado: 1000, Real: 2000 }
    ];

    // Create category axis
    this.categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    this.categoryAxis.dataFields.category = 'semana';
    this.categoryAxis.title.text = 'SEMANAS';
    // categoryAxis.renderer.opposite = false;

    // Create value axis
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'COMPRAS (KG)';
    valueAxis.renderer.minLabelPosition = 0.01;
    // valueAxis.renderer.inversed = false;

    // Create series
    this.series1 = this.chart.series.push(new am4charts.LineSeries());
    this.series1.stroke = am4core.color('#008000');
    this.series1.fill = am4core.color('#008000');
    this.series1.tooltip.label.fill = am4core.color('#008000');
    this.series1.strokeWidth = 3;
    this.series1.dataFields.valueY = 'Planeado';
    this.series1.dataFields.categoryX = 'semana';
    this.series1.name = 'Planeado';
    this.series1.tooltipText = '{name} el {categoryX} \n {valueY} KG';
    this.series1.legendSettings.valueText = '{valueY}';

    let bullet1 = this.series1.bullets.push(new am4charts.CircleBullet());
    bullet1.circle.stroke = am4core.color('#008000');
    bullet1.circle.fill = am4core.color('#008000');
    bullet1.circle.strokeWidth = 5;

    this.series2 = this.chart.series.push(new am4charts.LineSeries());
    this.series2.stroke = am4core.color('#ff0000');
    this.series2.fill = am4core.color('#ff0000');
    this.series2.tooltip.label.fill = am4core.color('#ff0000');
    this.series2.strokeWidth = 3;
    this.series2.dataFields.valueY = 'Real';
    this.series2.dataFields.categoryX = 'semana';
    this.series2.name = 'Real';
    this.series2.tooltipText = '{name} el {categoryX} \n {valueY} KG';
    this.series2.legendSettings.valueText = '{valueY}';

    let bullet2 = this.series2.bullets.push(new am4charts.CircleBullet());
    bullet2.circle.stroke = am4core.color('#ff0000');
    bullet2.circle.fill = am4core.color('#ff0000');
    bullet2.circle.strokeWidth = 5;

    // Add chart cursor
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.behavior = 'none';

    // let bullet = series.bullets.push(new am4charts.CircleBullet());

    bullet1.events.on('hit', this.clickChart, this );
      // let semana = ev.target.dataItem.categories.categoryX;
      // this.router.navigate([ '/dashboard', semana ]);

    bullet2.events.on('hit', this.clickChart, this );
      // let semana = ev.target.dataItem.categories.categoryX;
      // this.router.navigate([ '/dashboard', semana ]);


    // Add legend
    this.chart.legend = new am4charts.Legend();
    this.chart.legend.position = 'top';


    let chart2 = am4core.create('chartdiv2', am4charts.XYChart);
    chart2.padding(40, 40, 40, 40);

    let categoryAxis = chart2.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'network';
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis2 = chart2.xAxes.push(new am4charts.ValueAxis());
    valueAxis2.min = 0;

    let series = chart2.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = 'network';
    series.dataFields.valueX = 'MAU';
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = 'left';
    labelBullet.label.dx = 10;
    labelBullet.label.text = '{values.valueX.workingValue}';
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', function (fill, target){
      return chart2.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart2.data = [
        {network: 'ACERO', MAU: 32552},
        {network: 'FLETES', MAU: 10000},
        {network: 'GASES', MAU: 11000},
        {network: 'TORNILLERIA', MAU: 14333},
        {network: 'SOLDADURA', MAU: 22000}
    ];

  }

  clickChart( event: any ){
    console.log('event', event);
    // console.log('CLICK: ', this.series1.tooltipDataItem.categories.categoryX);
    let semana = event.target.dataItem.categories.categoryX;
    this.router.navigate([ '/dashboard', semana ]);
  }

}
