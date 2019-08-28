import { Component, OnInit } from '@angular/core';
import { GpsService } from './services/gps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private gpsService: GpsService) { }

  ngOnInit() {
    this.gpsService.fetchtData();
  }

}
