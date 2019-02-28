import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;

  constructor(private bookService: BookService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.books = this.bookService.getCollection();
    this.subscription = this.bookService.listChanged.subscribe(
      (newBooks: Book[]) => this.books = newBooks
    );
  }

  onEdit(index: number) {
    this.router.navigate(['/manageBooks', index]);
  }

  onDelete(index: number) {
    this.bookService.removeBook(index);
  }

  onCheck(index: number) {
    const book = this.bookService.getBook(index);
    const id = this.userService.findBook(book);
    this.router.navigate(['/manageUsers', id]);
  }

  onAdd() {
    this.router.navigate(['/manageBooks', 'new']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
