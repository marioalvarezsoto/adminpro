import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

  @Input() chartLabels: Label[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
