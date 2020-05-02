import { Component, AfterViewInit } from '@angular/core';
import { WOW } from '../js/modules/wow.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],

})
export class AppComponent implements AfterViewInit {
  title = 'OSU MSIS Alumni-Database';
  ngAfterViewInit() {
    console.timeEnd("ngOnViewInit");

    new WOW().init();

  }
}
