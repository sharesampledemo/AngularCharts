import { NgModule, Component, ViewChild, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule, DxChartComponent, DxSelectBoxModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

import { Month, Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
    enableProdMode();
}

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
  providers: [Service]
})
export class ServerComponent {

  @ViewChild(DxChartComponent) chart: DxChartComponent;

  months: Month[];
  chartDataSource: any;

  constructor(service: Service) {
      this.months = service.getMonths();
      this.chartDataSource = new DataSource({
          store: {
              type: 'odata',
              url: 'https://js.devexpress.com/Demos/WidgetsGallery/odata/WeatherItems'
          },
          postProcess: (results) => {
            return results[0].DayItems;
          },
          expand: 'DayItems',
          filter: ['Id', '=', 1]
      });
  }
  customizeTooltip(arg) {
      return {
          text: arg.valueText + '&#176C'
      };
  }
  customizeText(arg) {
      return arg.valueText + '&#176C';
  }
  onValueChanged(data) {
      this.chartDataSource.filter(['Id', '=', data.value]);
      this.chartDataSource.load();
  }
}
