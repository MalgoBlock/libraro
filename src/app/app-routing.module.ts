import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'bookshelf', component: BookshelfComponent},
    {path: 'booklist', component: BookListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
