export class Book {
    public title: string;
    public author: string;
    public description: string;
    public onLoan: boolean;
    public waitingList: number[];

    constructor(title: string, author: string, description: string) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.onLoan = false;
        this.waitingList = [];
    }
}
