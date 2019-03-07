import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../../books/book.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { BookService } from 'src/app/books/book.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit, OnDestroy {
  userBooks: Book[];
  waitingList: Book[];
  userId: number;
  currentUser: User;
  subscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private bookService: BookService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.userId = +params.id;
        this.currentUser = this.userService.getUserByUid(this.userId);
      }
    );
    this.userBooks = this.currentUser.booksOnLoan;
    this.waitingList = this.currentUser.waitingList;
    this.subscription = this.userService.currentListChanged.subscribe(
      (user: User) => {
        this.currentUser = user;
        this.userBooks = this.currentUser.booksOnLoan;
        this.waitingList = this.currentUser.waitingList;
      }
    );
  }

  getPosition(book: Book) {
    const position = book.waitingList.findIndex(x => x === this.userId) + 1;
    return position;
  }

  onReturn(book: Book) {
    this.userService.removeBook(book);
    this.bookService.returnBook(book);
    this.sharedService.checkIfWaitingAvailable(this.currentUser);

  }

  onRemove(book: Book) {
    this.userService.removeFromWaitingList(book);
    this.bookService.removeWaiting(book, this.userId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
