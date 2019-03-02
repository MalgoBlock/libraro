import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/books/book.model';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/books/book.service';

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

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private bookService: BookService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params.id === 'new') {
          this.isNew = true;
          this.userId = undefined;
          this.name = '';
          this.bookLimit = 2;
          this.hasBooks = false;
        } else {
          this.isNew = false;
          this.userId = params.id;
          this.user = this.userService.getUser(this.userId);
          this.name = this.user.name;
          this.bookLimit = this.user.bookLimit;
          this.user.booksOnLoan.length === 0 ? this.hasBooks = false : this.hasBooks = true;
        }
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.isNew) {
      const newUser = new User(form.value.name, form.value.bookLimit, 'user');
      this.userService.addUser(newUser);
    } else {
      this.user.name = form.value.name;
      this.user.bookLimit = form.value.bookLimit;
      this.userService.editUser(this.userId, this.user);
    }
  }

  onReturn(book: Book) {
    this.userService.removeBookAsAdmin(book, this.userId);
    book.onLoan = false;
    const index = this.bookService.checkIndex(book);
    this.bookService.editBook(index, book);
  }

}
