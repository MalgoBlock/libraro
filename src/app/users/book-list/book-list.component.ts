import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../../books/book.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { BookService } from 'src/app/books/book.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit, OnDestroy {
  userBooks: Book[];
  userId: number;
  currentUser: User;
  subscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.userId = params.id;
        this.currentUser = this.userService.getUser(this.userId);
      }
    );
    this.userBooks = this.currentUser.booksOnLoan;
    this.subscription = this.userService.currentListChanged.subscribe(
      (user: User) => {
        this.currentUser = user;
      }
    );
  }

  onReturn(book: Book) {
    this.userService.removeBook(book);
    book.onLoan = false;
    const index = this.bookService.checkIndex(book);
    this.bookService.editBook(index, book);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
