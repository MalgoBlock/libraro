import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Libraro';
  description1 = 'Virtual library app developed by Malgo Block';
  description2 = 'Select users to assign books, select Librarian to manage books and users.';
  description3 = 'Use Manage Data feature to save and fetch data from the server.';

}
