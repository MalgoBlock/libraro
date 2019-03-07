import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { Book } from '../books/book.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserId: number; // user.uid
  currentChanged = new Subject<number>();
  currentListChanged = new Subject<User>();
  currentLimitChanged = new Subject<number>();
  userListChanged = new Subject<User[]>();
  userIdcount = 3;

  private userList: User[] = [
    new User (1, 'Bob', 3, 'user'),
    new User (2, 'Frank', 2, 'user'),
    new User (3, 'Librarian', 0, 'admin')
  ];

  setId() {
    this.userIdcount += 1;
    return this.userIdcount;
  }

  getUsers() {
    return this.userList.slice();
  }

  getUserByUid(uid: number) {
    const index = this.findUserIndex(uid);
    return this.userList[index];
  }

  setCurrent(uid: number) {
    this.currentUserId = uid;
    this.pushCurrentUpdate();
  }

  checkCurrent() {
    return this.currentUserId;
  }

  checkCurrentRole() {
    if (this.currentUserId === undefined) {
      const noUser = 'none';
      return noUser;
    }
    const index = this.findUserIndex(this.currentUserId);
    return this.userList[index].accessLevel;
  }

  deselectCurrent() {
    this.currentUserId = undefined;
    this.pushCurrentUpdate();
  }

  private pushCurrentUpdate() {
    this.currentChanged.next(this.currentUserId);
  }

  checkUserBookLimit() {
    const index = this.findUserIndex(this.currentUserId);
    const user = this.userList[index];
    return user.bookLimit - user.booksOnLoan.length;
  }

  // manage books

  addNewBook(book: Book) {
    const index = this.findUserIndex(this.currentUserId);
    this.userList[index].booksOnLoan.push(book);
    this.pushUserUpdate();
  }

  addNewBookFromWaitingList(book: Book, uid: number) {
    const index = this.findUserIndex(uid);
    let status: string;
    if (this.userList[index].booksOnLoan.length < this.userList[index].bookLimit) {
      this.userList[index].booksOnLoan.push(book);
      const waitingListIndex = this.userList[index].waitingList.indexOf(book);
      this.userList[index].waitingList.splice(waitingListIndex, 1);
      this.pushUserUpdate();
      status = 'added';
    } else {
      status = 'rejected';
    }
    return status;
  }

  checkBook(book: Book) { // find an id of a book on current user's list
    const index = this.findUserIndex(this.currentUserId);
    return this.userList[index].booksOnLoan.indexOf(book);
  }

  findBook(book: Book) { // find which user holds a particular book
    let userId;
    for (let i = 0; i < this.userList.length; i++) {
        const bookId = this.userList[i].booksOnLoan.indexOf(book);
        if (bookId !== -1) {
          // userId = i;
          userId = this.userList[i].uid;
          break;
        }
    }
    return userId;
  }

  removeBook(book: Book) {
    const index = this.checkBook(book);
    const userIndex = this.findUserIndex(this.currentUserId);
    this.userList[userIndex].booksOnLoan.splice(index, 1);
    this.pushUserUpdate();
  }

  removeBookAsAdmin(book: Book, userId: number) {
    const userIndex = this.findUserIndex(userId);
    const index = this.userList[userIndex].booksOnLoan.indexOf(book);
    this.userList[userIndex].booksOnLoan.splice(index, 1);
    this.pushUserUpdate();
  }

  checkWaitingList(book: Book) {
    const userIndex = this.findUserIndex(this.currentUserId);
    return this.userList[userIndex].waitingList.indexOf(book);
  }

  addToWaitingList(book: Book) {
    const userIndex = this.findUserIndex(this.currentUserId);
    this.userList[userIndex].waitingList.push(book);
  }

  removeFromWaitingList(book: Book) {
    const bookId = this.checkWaitingList(book);
    const index = this.findUserIndex(this.currentUserId);
    this.userList[index].waitingList.splice(bookId, 1);
  }

  removeFromWaitingListAsAdmin(book: Book, uid: number) {
    const bookId = this.checkWaitingList(book);
    const index = this.findUserIndex(uid);
    this.userList[index].waitingList.splice(bookId, 1);
  }

  private pushUserUpdate() {
    const index = this.findUserIndex(this.currentUserId);
    this.currentListChanged.next(this.userList[index]);
    this.currentLimitChanged.next(this.checkUserBookLimit());
  }

  // manage users

  editUser(uid: number, user: User) {
    const index = this.findUserIndex(uid);
    this.userList[index] = user;
    this.pushListUpdate();
  }

  createUser(name: string, bookLimit: number, access: string) {
    const uid = this.setId();
    const user = new User (uid, name, bookLimit, access);
    this.userList.push(user);
    this.sortList();
    this.pushListUpdate();
  }

  removeUser(uid: number) {
    const index = this.findUserIndex(uid);
    this.userList.splice(index, 1);
    this.pushListUpdate();
  }

  findUserIndex(uid: number) { // find user index with particular uid
    return this.userList.findIndex(x => x.uid === uid); // will return -1 if not found
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
