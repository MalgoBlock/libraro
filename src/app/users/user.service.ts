import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserId: number;
  currentChanged = new Subject<number>();
  currentListChanged = new Subject<User>();
  currentLimitChanged = new Subject<number>();

  private userList: User[] = [
    new User ('Frank', 'user'),
    new User ('Bob', 'user'),
    new User ('Librarian', 'admin')
  ];

  getUsers() {
    return this.userList.slice();
  }

  getUser(index: number) {
    return this.userList[index];
  }

  setCurrent(index: number) {
    this.currentUserId = index;
    this.pushCurrentUpdate();
  }

  checkCurrent() {
    return this.currentUserId;
  }

  deselectCurrent() {
    this.currentUserId = undefined;
    this.pushCurrentUpdate();
  }

  private pushCurrentUpdate() {
    this.currentChanged.next(this.currentUserId);
  }

  checkUserBookLimit() {
    const user = this.userList[this.currentUserId];
    return user.bookLimit - user.booksOnLoan.length;
  }

  // manage books

  addNewBook(book: Book) {
    this.userList[this.currentUserId].booksOnLoan.push(book);
    this.pushUserUpdate();
  }

  checkBook(book: Book) { // find an id of a book on current user's list
    return this.userList[this.currentUserId].booksOnLoan.indexOf(book);
  }

  findBook(book: Book) { // find which user holds a particular book
    let userId;
    for (let i = 0; i < this.userList.length; i++) {
        const bookId = this.userList[i].booksOnLoan.indexOf(book);
        if (bookId !== -1) {
          userId = i;
          break;
        }
    }
    return userId;
  }

  removeBook(book: Book) {
    const index = this.checkBook(book);
    this.userList[this.currentUserId].booksOnLoan.splice(index, 1);
    this.pushUserUpdate();
  }

  private pushUserUpdate() {
    this.currentListChanged.next(this.userList[this.currentUserId]);
    this.currentLimitChanged.next(this.checkUserBookLimit());
  }



}
