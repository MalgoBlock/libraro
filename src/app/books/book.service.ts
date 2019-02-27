import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  listChanged = new Subject<Book[]>();

  private bookCollection: Book[] = [
    new Book('The lord of the rings',
      'J.R.R. Tolkien',
      'Epic high fantasy novel'),
    new Book('The gift of rain',
      'Tan Twan Eng',
      'Set in Penang, 1939, this book presents a story of betrayal, cruelty, courage and love.'),
    new Book('The colour of magic',
    'Terry Pratchett',
    'Fantasy novel. First of the Discworld series')
  ];

  private sortCollection(property: string) {
    console.log(this.bookCollection);
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

  getBook(index: number) {
    return this.bookCollection[index];
  }

  addBook(book: Book) {
    this.bookCollection.push(book);
    this.pushUpdate();
  }

  editBook(index: number, book: Book) {
    this.bookCollection[index] = book;
    this.pushUpdate();
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
}
