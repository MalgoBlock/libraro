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
  userListChanged = new Subject<User[]>();

  private userList: User[] = [
    new User ('Bob', 3, 'user'),
    new User ('Frank', 2, 'user'),
    new User ('Librarian', 0, 'admin')
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

  removeBookAsAdmin(book: Book, userId: number) {
    const index = this.userList[userId].booksOnLoan.indexOf(book);
    this.userList[userId].booksOnLoan.splice(index, 1);
    this.pushUserUpdate();
  }

  private pushUserUpdate() {
    this.currentListChanged.next(this.userList[this.currentUserId]);
    this.currentLimitChanged.next(this.checkUserBookLimit());
  }

  // manage users

  editUser(index: number, user: User) {
    this.userList[index] = user;
    this.pushListUpdate();
  }

  addUser(user: User) {
    this.userList.push(user);
    this.sortList();
    this.pushListUpdate();
  }

  removeUser(index: number) {
    this.userList.splice(index, 1);
    this.pushListUpdate();
  }

  private pushListUpdate() {
    this.userListChanged.next(this.userList.slice());
  }

  private sortList() {
    this.userList.sort(
      (a, b) => {
        if (a.accessLevel < b.accessLevel) { return 1; }
        if (a.accessLevel > b.accessLevel) { return -1; }
        if (a.name < b.name ) { return -1; }
        if (a.name > b.name ) { return 1; }
        return 0;
      }
    );
  }

}
