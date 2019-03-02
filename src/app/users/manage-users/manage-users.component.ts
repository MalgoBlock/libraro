import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.subscription = this.userService.userListChanged.subscribe(
      (newList: User[]) => {
        this.users = newList;
      }
    );
  }

  onDetails(index: number) {
    this.router.navigate(['/manageUsers', index]);
  }

  onAdd() {
    this.router.navigate(['/manageUsers', 'edit', 'new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
