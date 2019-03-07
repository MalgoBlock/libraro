import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserIndex: number;
  currentUser: User;
  currentLimit: number;
  isAdmin = false;

  usersList: User[];
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
    this.subscription1 = this.userService.currentChanged.subscribe(
      (uid: number) => {
        this.currentUserIndex = uid;
        if (uid !== undefined) {
          this.currentUser = this.userService.getUserByUid(uid);
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
    this.subscription3 = this.userService.userListChanged.subscribe(
      (newList: User[]) => {
        this.usersList = newList;
      }
    );
  }

  onSelect(index: number) {
    const userId = this.usersList[index].uid;
    this.userService.setCurrent(userId);
    this.router.navigate(['/']);
  }

  onDeselect() {
    this.userService.deselectCurrent();
    this.router.navigate(['/']);
    this.isAdmin = false;
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
