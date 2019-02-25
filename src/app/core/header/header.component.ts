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

  currentUser: number;
  currentName: string;
  usersList: User[];
  subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.usersList = this.userService.getUsers();
    // this.currentUser = this.userService.checkCurrent();
    this.subscription = this.userService.currentChanged.subscribe(
      (index: number) => {
        this.currentUser = index;
        index !== undefined ? this.currentName = this.usersList[index].name : this.currentName = undefined;
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
    this.subscription.unsubscribe();
  }
}
