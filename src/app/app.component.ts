import { Component } from '@angular/core';
import { Beer } from './beer/beer.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'Hello World';
}
