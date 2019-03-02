import { Book } from '../books/book.model';

export class User {
    public name: string;
    public booksOnLoan: Book[];
    public bookLimit: number;
    public accessLevel: string;

    constructor(name: string, bookLimit: number, accessLevel: string) {
        this.name = name;
        this.booksOnLoan = [];
        this.bookLimit = bookLimit;
        this.accessLevel = accessLevel;
    }
}
