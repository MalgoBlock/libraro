import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  index: number;
  enableBorrowing = false;
  enableReturn = false;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.index = params.id;
        this.book = this.bookService.getBook(this.index);
        if (this.userService.checkCurrent() !== undefined) { // check if any user is selected
          const limit: number = this.userService.checkUserBookLimit();
          if ( !this.book.onLoan && limit > 0 ) { // this book is available & user limit != 0
            this.enableBorrowing = true;
            this.enableReturn = false;
          } else if (this.userService.checkBook(this.book) !== -1) { // this book is on users list
            this.enableBorrowing = false;
            this.enableReturn = true;
          } else { // book not available and not on users list
            this.enableBorrowing = false;
            this.enableReturn = false;
          }
        } else { // no user is selected
          this.enableBorrowing = false;
          this.enableReturn = false;
        }
      }
    );
  }

  onBorrow() {
    this.userService.addNewBook(this.book);
    this.book.onLoan = true;
    this.enableBorrowing = false;
    this.enableReturn = true;
    this.bookService.editBook(this.index, this.book);
  }

  onReturn() {
    this.userService.removeBook(this.book);
    this.book.onLoan = false;
    this.enableReturn = false;
    this.enableBorrowing = true;
    this.bookService.editBook(this.index, this.book);
  }

}
