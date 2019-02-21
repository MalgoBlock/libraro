import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Libraro';
  description = 'Virtual library app developed by Malgo Block';
  
  constructor() { }

  ngOnInit() {
  }

}
