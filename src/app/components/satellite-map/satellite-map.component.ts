import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { GpsService } from '../../services/gps.service';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-satellite-map',
  templateUrl: './satellite-map.component.html',
  styleUrls: ['./satellite-map.component.scss']
})
export class SatelliteMapComponent implements OnInit {

  private center = [100, 100];
  color = 'green';

  constructor(private service: GpsService) {

  }


  chart = new Chart({

    title: {
      text: 'Satellites map'
    },
    xAxis: {
      min: 0,
      max: 200
    },
    yAxis: {
      min: 0,
      max: 200
    },
    legend: {
      enabled: false
    },
    tooltip: {
      style: { fontSize: '18px' }
    },
    series: [
      {
        type: 'scatter',
        color: 'rgba(100,100,100,.5)',
        marker: {
          radius: 200,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgba(100,100,100,.5)'
            }
          }
        },
        data: [[100, 100]]

      },
      {
        type: 'scatter',
        color: 'black',
        marker: {
          radius: 10,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        data: [[100, 100]]

      },
      {
        type: 'scatter',
        color: 'black',
        marker: {
          radius: 10,
          symbol: 'url(/assets/images/west.png)',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        data: [[10, 100]]

      },
      {
        type: 'scatter',
        color: 'black',
        marker: {
          radius: 10,
          symbol: 'url(/assets/images/north.png)',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        data: [[100, 190]]

      },
      {
        type: 'scatter',
        color: 'black',
        marker: {
          radius: 10,
          symbol: 'url(/assets/images/east.png)',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        data: [[190, 100]]

      },
      {
        type: 'scatter',
        color: 'black',
        marker: {
          radius: 10,
          symbol: 'url(/assets/images/south.png)',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        data: [[100, 10]]

      }
    ]
  });


  ngOnInit() {

    this.service.getData().subscribe(
      values => {
        this.chart.removeSeries(6);
        values.forEach(data => {
          data.coords = this.calcCoordinates([data.azimuth, data.elevation]);
        });

        values.forEach(
          data => this.renderSatellite(data)
        );
      });


  }


  calcCoordinates(data: Array<number>): Array<number> {
    const [delX, delY] = this.center;
    const [deg, h] = data;
    const k = 180 / deg;
    const x = Math.cos(Math.PI / k) * h + delX;
    const y = Math.sin(Math.PI / k) * h + delY;

    return [x, y];
  }


  renderSatellite(it: Message) {





    this.chart.addSeries({
      type: 'scatter',
      name: it.id.toString(),
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>ID:</b> {series.name}<br><b>Type:</b>{point.name} '
      },
      color: it.type === 'GSV' ? 'red' : 'green',
      marker: {
        symbol: 'circle',
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'red'
          }
        },

      },

      data: [

        {
          x: it.coords[0],
          y: it.coords[1],
          name: it.type
        }
      ]

    }, true, false);
  }
}




