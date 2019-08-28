import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { GpsService } from '../../services/gps.service';

@Component({
  selector: 'app-satellite-graph',
  templateUrl: './satellite-graph.component.html',
  styleUrls: ['./satellite-graph.component.scss']
})
export class SatelliteGraphComponent implements OnInit {

  constructor(private service: GpsService) { }


  currentGps;

  chart = new Chart({
    chart: {
      type: 'column',
      animation: false
    },
    title: {
      text: 'SNR graph'
    },
    tooltip: {
      style: {
        fontSize: '20px',
        fontFamily: 'Verdana, sans-serif'
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -90,
        style: {
          fontSize: '20px'

        }
      }
    },
    legend: {
      enabled: false
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'SNR value',
        style: {
          fontSize: '20px'

        }
      }
    },
    series: [
      {
        type: 'column',
        color: 'black',
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: 'black',
          align: 'center',
          format: '{point.y}',
          y: -10,
          style: {
            fontSize: '16px'
          }
        },
        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: '<b>SNR: {point.y}</b>'

        },
        data: []
      },
    ]
  });

  ngOnInit() {

    this.service.getData().subscribe(
      values => {

        this.currentGps = values;
        for (let i = 0; i < 12; i++) {
          this.chart.removePoint(i);
        }

        values.forEach(data => {

        this.renderBar(data.id, data.type, data.snr);
        });
      }
    );

  }


  renderBar(id: number, type: string, snr: number) {
    // @ts-ignore

    this.chart.addPoint( ['ID: ' + id, snr]);

  }

}
