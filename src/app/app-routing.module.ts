import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './users/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'bookshelf', component: BookshelfComponent,
        children: [
            {path: ':id', component: BookDetailsComponent}
        ]},
    {path: 'booklist/:id', component: BookListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
