import { Component, AfterViewInit, OnInit, NgModule } from '@angular/core';
import { WOW } from '../js/modules/wow.min.js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []

})
export class AppComponent implements AfterViewInit {
  title = 'OSU MSIS Alumni-Database';
  ngAfterViewInit() {

    new WOW().init();

  }

}

