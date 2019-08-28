import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SatelliteMapComponent } from './components/satellite-map/satellite-map.component';
import { SatelliteGraphComponent } from './components/satellite-graph/satellite-graph.component';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    SatelliteMapComponent,
    SatelliteGraphComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
