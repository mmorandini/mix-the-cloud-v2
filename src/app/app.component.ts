import { Component, OnInit } from '@angular/core';
import { Constants } from './app.constants';

declare let SC: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Mix the Cloud';
  
  ngOnInit(){
  	SC
  .initialize({
    client_id: Constants.API_KEY
  });

  }

}
