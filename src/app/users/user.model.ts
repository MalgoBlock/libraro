import { Book } from '../books/book.model';

export class User {
    public name: string;
    public booksOnLoan: Book[];
    public bookLimit: number;
    public accessLevel: string;

    constructor(name: string, accessLevel: string) {
        this.name = name;
        this.booksOnLoan = [];
        this.accessLevel = accessLevel;
        accessLevel === 'admin' ? this.bookLimit = 0 : this.bookLimit = 2;
    }
}
