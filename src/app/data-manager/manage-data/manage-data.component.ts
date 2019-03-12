import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.component.html'
})
export class ManageDataComponent {

  constructor(private router: Router,
              private dataService: DataService) { }

  onRegister() {
    this.router.navigate(['/manageData', 'register']);
  }

  onLogin() {
    this.router.navigate(['/manageData', 'login']);
  }

  onSave() {
    this.dataService.saveBooks().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.dataService.saveUsers().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFetch() {
    this.dataService.fetchData();
  }

  onLogout() {
    this.dataService.logout();
  }
}
