import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserIndex: number;
  currentUser: User;
  currentLimit: number;
  isAdmin = false;

  usersList: User[];
  subscription1: Subscription;
  subscription2: Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
    this.subscription1 = this.userService.currentChanged.subscribe(
      (index: number) => {
        this.currentUserIndex = index;
        if (index !== undefined) {
          this.currentUser = this.userService.getUser(index);
          this.currentUser.accessLevel === 'admin' ? this.isAdmin = true : this.isAdmin = false;
          this.currentLimit = this.currentUser.bookLimit - this.userService.checkUserBookLimit();
        } else {
          this.currentUser = undefined;
          this.currentLimit = undefined;
        }
      }
    );
    this.subscription2 = this.userService.currentLimitChanged.subscribe(
      (borrowed: number) => {
        this.currentLimit = this.currentUser.bookLimit - borrowed;
      }
    );
  }

  onSelect(index: number) {
    this.userService.setCurrent(index);
    this.router.navigate(['/']);
  }

  onDeselect() {
    this.userService.deselectCurrent();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
