import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA2SgmHBEAD0Kjl_gsV3k9pVZUgU_LhQ-U',
      authDomain: 'libraro-f1d1b.firebaseapp.com'
    });
  }

}
