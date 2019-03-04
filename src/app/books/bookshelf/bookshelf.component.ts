import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html'
})
export class BookshelfComponent implements OnInit, OnDestroy {

  bookshelf: Book[];
  subscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookshelf = this.bookService.getCollection();
    this.subscription = this.bookService.listChanged.subscribe(
      (books: Book[]) => this.bookshelf = books
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
