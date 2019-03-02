import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user.model';


@Component({
  selector: 'app-manage-users-detail',
  templateUrl: './manage-users-detail.component.html',
  styleUrls: ['./manage-users-detail.component.css']
})
export class ManageUsersDetailComponent implements OnInit {
  userId: number;
  user: User;
  hasBooks: boolean;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.userId = params.id;
        this.user = this.userService.getUser(this.userId);
        this.user.booksOnLoan.length === 0 ? this.hasBooks = false : this.hasBooks = true;
      }
    );
  }

  onEdit() {
    this.router.navigate(['/manageUsers', 'edit', this.userId]);
  }

  onRemove() {
    this.userService.removeUser(this.userId);
    this.router.navigate(['/manageUsers']);
  }
}
