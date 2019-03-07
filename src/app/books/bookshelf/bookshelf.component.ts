import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html'
})
export class BookshelfComponent implements OnInit, OnDestroy {

  bookshelf: Book[];
  subscription: Subscription;

  constructor(private bookService: BookService,
              private userService: UserService) { }

  ngOnInit() {
    this.bookshelf = this.bookService.getCollection();
    this.subscription = this.bookService.listChanged.subscribe(
      (books: Book[]) => this.bookshelf = books
    );
  }

  checkLoan(book: Book) {
    const currentUid = this.userService.checkCurrent();
    const currentUser = this.userService.getUserByUid(currentUid);
    const index = currentUser.booksOnLoan.indexOf(book);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
