import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-manage-books-detail',
  templateUrl: './manage-books-detail.component.html',
  styleUrls: ['./manage-books-detail.component.css']
})
export class ManageBooksDetailComponent implements OnInit {
  isNew = false;
  id: number;
  book: Book;
  title: string;
  author: string;
  description: string;

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params.id === 'new') {
          this.isNew = true;
          this.id = undefined;
          this.title = '';
          this.author = '';
          this.description = '';
        } else {
          this.isNew = false;
          this.id = params.id;
          this.book = this.bookService.getBook(this.id);
          this.title = this.book.title;
          this.author = this.book.author;
          this.description = this.book.description;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    if (!this.isNew) {
      this.book.title = form.value.title;
      this.book.author = form.value.author;
      this.book.description = form.value.description;
      this.bookService.editBook(this.id, this.book);
    } else {
      this.book = new Book(form.value.title, form.value.author, form.value.description);
      this.bookService.addBook(this.book);
    }
    this.router.navigate(['/manageBooks']);
  }
}
