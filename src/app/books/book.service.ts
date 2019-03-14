import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  listChanged = new Subject<Book[]>();

  private bookCollection: Book[] = [
    new Book('Return of the king',
      'J.R.R. Tolkien',
      'Epic high fantasy novel. Third part of Lord of the Rings trilogy.'),
    new Book('The gift of rain',
      'Tan Twan Eng',
      'Set in Penang, 1939, this book presents a story of betrayal, cruelty, courage and love.'),
    new Book('Equal rites',
    'Terry Pratchett',
    'Comic fantasy novel. Third of the Discworld series'),
    new Book('Snow Crash',
    'Neal Stephenson',
    'Science fiction novel.')
  ];

  constructor (private userService: UserService) {}

  private sortCollection(property: string) {
    return this.bookCollection.sort((a, b) => {
      let propertyA: any;
      let propertyB: any;

      switch (property) {
        case 'title':
          propertyA = a.title;
          propertyB = b.title;
          break;
        case 'author':
          propertyA = a.author;
          propertyB = b.author;
          break;
      }

      if (propertyA < propertyB) { return -1; }
      if (propertyA > propertyB) { return 1; }
      return 0;
    });
  }

  getCollection() {
    return this.sortCollection('title').slice();
  }

  getSortedCollection(sortBy: string) {
    return this.sortCollection(sortBy).slice();
  }

  getBook(index: number) {
    return this.bookCollection[index];
  }

  addBook(book: Book) {
    this.bookCollection.push(book);
    this.pushUpdate();
  }

  replaceCollection(books: Book[]) {
    this.bookCollection = books;
    this.pushUpdate();
  }

  editBook(index: number, book: Book) {
    this.bookCollection[index] = book;
    this.pushUpdate();
  }

  returnBook(book: Book) {
    const bookIndex = this.checkIndex(book);
    let passedOn = false;
    if (book.waitingList.length > 0) {
      for (let i = 0; i < book.waitingList.length; i++) {
        const newBorrowerUid = +book.waitingList.slice(i, i + 1);
        const status = this.userService.addNewBookFromWaitingList(book, newBorrowerUid);
        if (status === 'added') {
          book.waitingList.splice(i, 1);
          passedOn = true;
          break;
        }
      }
    }
    passedOn === false ? book.onLoan = false : book.onLoan = true;
    this.editBook(bookIndex, book); // this will also push updates
  }

  removeBook(index: number) {
    this.bookCollection.splice(index, 1);
    this.pushUpdate();
  }

  checkIndex(book: Book) {
    return this.bookCollection.indexOf(book);
  }

  private pushUpdate() {
    this.listChanged.next(this.sortCollection('title').slice());
  }

  addWaiting(book: Book, uid: number) {
    const index = this.checkIndex(book);
    this.bookCollection[index].waitingList.push(uid);
    this.pushUpdate();
  }

  removeWaiting(book: Book, uid: number) {
    const bookIndex = this.checkIndex(book);
    const userIndex = this.bookCollection[bookIndex].waitingList.findIndex(x => x === uid);
    this.bookCollection[bookIndex].waitingList.splice(userIndex, 1);
    this.pushUpdate();
  }
}
