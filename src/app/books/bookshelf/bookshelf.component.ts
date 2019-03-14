import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { UserService } from 'src/app/users/user.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html'
})
export class BookshelfComponent implements OnInit, OnDestroy {

  @ViewChild('form') sortByForm: NgForm;
  bookshelf: Book[];
  bookSubscription: Subscription;
  formSubscription: Subscription;
  sortSelect = 'title';
  filterString: string;
  filtered = false;
  selectedBook: number;

  constructor(private bookService: BookService,
              private userService: UserService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit() {
    this.bookshelf = this.bookService.getCollection();
    this.bookSubscription = this.bookService.listChanged.subscribe(
      (books: Book[]) => this.bookshelf = this.bookService.getSortedCollection(this.sortSelect)
    );
    this.formSubscription = this.sortByForm.form.valueChanges.subscribe(
      value => {
        this.router.navigate(['/bookshelf']);
        this.selectedBook = undefined;
        this.bookshelf = this.bookService.getSortedCollection(value.sortSelect);
      }
    );
  }

  checkLoan(book: Book) {
    const currentUid = this.userService.checkCurrent();
    if ( currentUid === undefined ) {
      return false;
    }
    const currentUser = this.userService.getUserByUid(currentUid);
    const index = currentUser.booksOnLoan.indexOf(book);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  onNavigate(index: number) {
    this.selectedBook = index;
    let finalIndex = index;
    if (this.filtered) {
      const book = this.bookshelf[index];
      finalIndex = this.bookService.checkIndex(book);
    }
    this.router.navigate(['/bookshelf', finalIndex]);
  }

  onFilter() {
    this.router.navigate(['/bookshelf']);
    this.selectedBook = undefined;
    const fullList = this.bookService.getCollection();
    this.bookshelf = this.sharedService.filterBy(this.sortSelect, this.filterString, fullList);
    this.filtered = true;
  }

  onClear() {
    this.router.navigate(['/bookshelf']);
    this.selectedBook = undefined;
    this.bookshelf = this.bookService.getSortedCollection(this.sortSelect);
    this.filterString = undefined;
    this.filtered = false;
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }

}
