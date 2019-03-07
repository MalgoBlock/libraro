import { Injectable } from '@angular/core';
import { BookService } from '../books/book.service';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private bookService: BookService,
              private userService: UserService) { }

  checkIfWaitingAvailable(user: User) {
    if (user.waitingList.length > 0) {
      for (let i = 0; i < user.waitingList.length; i++) {
        const book = user.waitingList[i];
        if (!book.onLoan) {
          const status = this.userService.addNewBookFromWaitingList(book, user.uid);
          if (status === 'added') {
            const waitIndex = book.waitingList.findIndex(x => x === user.uid);
            book.waitingList.splice(waitIndex, 1);
            book.onLoan = true;
            const index = this.bookService.checkIndex(book);
            this.bookService.editBook(index, book);
          }
        }
      }
    }
  }
}
