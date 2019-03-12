import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Book } from '../books/book.model';
import { BookService } from '../books/book.service';
import { UserService } from '../users/user.service';
import { User } from '../users/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string;

  constructor(private http: HttpClient,
              private bookService: BookService,
              private userService: UserService) { }

  register(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch( error => console.log(error) );
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( response => {
        console.log(response);
        firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
    .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  getUid() {
    return firebase.auth().currentUser.uid;
  }

  isAuthenticated() {
    return this.token != null;
  }

  bookUrl() {
    const token = this.getToken();
    const uid = this.getUid();
    return 'https://libraro-f1d1b.firebaseio.com/' + uid + '/books.json?auth=' + token;
  }

  userUrl() {
    const token = this.getToken();
    const uid = this.getUid();
    return 'https://libraro-f1d1b.firebaseio.com/' + uid + '/users.json?auth=' + token;
  }

  saveBooks() {
    const books = this.bookService.getCollection();
    return this.http.put(this.bookUrl(), books);
  }

  saveUsers() {
    const users = this.userService.getUsers();
    return this.http.put(this.userUrl(), users);
  }

  fetchData() {
    this.http.get<Book[]>(this.bookUrl())
      .pipe(map(
        (response) => {
          if (response != null) {
            for (const book of response) {
              if (!book['waitingList']) {
                book.waitingList = [];
              }
            }
          }
          return response;
        }
      ))
      .subscribe(
          (response: Book[]) => {
            if (response != null) {
            this.bookService.replaceCollection(response);
          }
        });
    this.http.get<User[]>(this.userUrl())
      .pipe(map(
      (response) => {
        if (response != null) {
        for (const user of response) {
          if (!user['booksOnLoan']) {
            user.booksOnLoan = [];
          } else {
            for (const book of user.booksOnLoan) {
              if (!book['waitingList']) {
                book.waitingList = [];
              }
            }
          }
          if (!user['waitingList']) {
            user.waitingList = [];
          }
        }}
        return response;
      }
    ))
    .subscribe(
      (response: User[]) => {
        if (response != null) {
          this.userService.replaceUsers(response);
        }}
    );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
