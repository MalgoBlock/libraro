import { Injectable } from '@angular/core';

import { Book } from '../books/book.model';

@Injectable()
export class User {
    public uid: number;
    public name: string;
    public booksOnLoan: Book[];
    public bookLimit: number;
    public accessLevel: string;
    public waitingList: Book[];

    constructor(uid: number, name: string, bookLimit: number, accessLevel: string) {
        this.uid = uid;
        this.name = name;
        this.booksOnLoan = [];
        this.bookLimit = bookLimit;
        this.accessLevel = accessLevel;
        this.waitingList = [];
    }
}
