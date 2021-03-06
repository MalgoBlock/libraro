import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/books/book.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-manage-users-edit',
  templateUrl: './manage-users-edit.component.html',
  styleUrls: ['./manage-users-edit.component.css']
})
export class ManageUsersEditComponent implements OnInit {
  isNew: boolean;
  userId: number;
  name: string;
  bookLimit: number;
  user: User;
  hasBooks: boolean;
  hasWait: boolean;
  pattern = '[1-9]';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private bookService: BookService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params.id === 'new') {
          this.isNew = true;
          this.userId = undefined;
          this.name = '';
          this.bookLimit = 2;
          this.hasBooks = false;
          this.hasWait = false;
          this.pattern = '[1-9]';
        } else {
          this.isNew = false;
          this.userId = +params.id;
          this.user = this.userService.getUserByUid(this.userId);
          this.name = this.user.name;
          this.bookLimit = this.user.bookLimit;
          this.setHasBooksAndHasWait();
        }
      }
    );
    this.userService.currentListChanged.subscribe(
      (user: User) => {
        this.user = user;
        this.setHasBooksAndHasWait();
      }
    );
  }

  private setHasBooksAndHasWait() {
    if ( this.user.booksOnLoan.length === 0 ) {
      this.hasBooks = false;
      this.pattern = '[1-9]';
    } else {
      this.hasBooks = true;
      this.pattern = '[' + this.user.booksOnLoan.length + '-9]';
    }
    this.user.waitingList.length === 0 ? this.hasWait = false : this.hasWait = true;
  }

  onSubmit(form: NgForm) {
    if (this.isNew) {
      this.userService.createUser(form.value.name, form.value.bookLimit, 'user');
    } else {
      this.user.name = form.value.name;
      if (this.user.booksOnLoan.length > form.value.bookLimit) {
        console.log('ha ha!');
      } else {
        this.user.bookLimit = form.value.bookLimit;
        this.userService.editUser(this.userId, this.user);
      }
    }
    this.sharedService.checkIfWaitingAvailable(this.user);
  }

  onReturn(book: Book) {
    this.userService.removeBookAsAdmin(book, this.user.uid);
    this.bookService.returnBook(book);
    this.sharedService.checkIfWaitingAvailable(this.user);
  }

  onRemoveWait(book: Book) {
    this.userService.removeFromWaitingListAsAdmin(book, this.userId);
    this.bookService.removeWaiting(book, this.userId);
  }
}
