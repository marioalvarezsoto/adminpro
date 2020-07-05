import { Component, OnInit, Input } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  @Input() chartLabels: Label[] = [];
  @Input() chartData: ChartDataSets[] = [];
  @Input() chartType: string = '';
  @Input() chartColors: Color[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
