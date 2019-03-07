import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { UserService } from 'src/app/users/user.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  index: number;
  enableBorrowing = false;
  enableReturn = false;
  enableWaitingListAdd = false;
  enableWaitingListRemove = false;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private userService: UserService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.index = params.id;
        this.book = this.bookService.getBook(this.index);
        this.switchState();
      }
    );
  }

  switchState() {
    if (this.userService.checkCurrent() !== undefined) { // check if any user is selected
      const role: string = this.userService.checkCurrentRole();
      const limit: number = this.userService.checkUserBookLimit();
      if ( role === 'admin' ) {
        this.enableBorrowing = false;
        this.enableReturn = false;
        this.enableWaitingListAdd = false;
        this.enableWaitingListRemove = false;
      } else if ( !this.book.onLoan && limit > 0 ) { // this book is available & user limit != 0
        this.enableBorrowing = true;
        this.enableReturn = false;
        this.enableWaitingListAdd = false;
        this.enableWaitingListRemove = false;
      } else if (this.userService.checkBook(this.book) !== -1) { // this book is on users list
        this.enableBorrowing = false;
        this.enableReturn = true;
        this.enableWaitingListAdd = false;
        this.enableWaitingListRemove = false;
      } else { // book not available and not on users list
        this.enableBorrowing = false;
        this.enableReturn = false;
        // check if already on the waiting list
        if (this.userService.checkWaitingList(this.book) !== -1) {
          this.enableWaitingListAdd = false;
          this.enableWaitingListRemove = true;
        } else {
          this.enableWaitingListAdd = true;
          this.enableWaitingListRemove = false;
        }
      }
    } else { // no user is selected
      this.enableBorrowing = false;
      this.enableReturn = false;
      this.enableWaitingListAdd = false;
      this.enableWaitingListRemove = false;
    }
  }

  onBorrow() {
    this.userService.addNewBook(this.book);
    this.book.onLoan = true;
    this.bookService.editBook(this.index, this.book);
    this.switchState();
  }

  onReturn() {
    this.userService.removeBook(this.book);
    this.bookService.returnBook(this.book);
    const uid = this.userService.checkCurrent();
    const user = this.userService.getUserByUid(uid);
    this.sharedService.checkIfWaitingAvailable(user);
    this.switchState();
  }

  onAddWait() {
    this.userService.addToWaitingList(this.book);
    const uid = this.userService.checkCurrent();
    this.bookService.addWaiting(this.book, uid);
    this.switchState();
  }

  onRemoveWait() {
    this.userService.removeFromWaitingList(this.book);
    const uid = this.userService.checkCurrent();
    this.bookService.removeWaiting(this.book, uid);
    this.switchState();
  }

}
