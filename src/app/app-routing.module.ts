import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './users/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { ManageBooksComponent } from './books/manage-books/manage-books.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ManageBooksDetailComponent } from './books/manage-books-detail/manage-books-detail.component';
import { ManageUsersDetailComponent } from './users/manage-users-detail/manage-users-detail.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'bookshelf', component: BookshelfComponent,
        children: [
            {path: ':id', component: BookDetailsComponent}
        ]},
    {path: 'booklist/:id', component: BookListComponent},
    {path: 'manageBooks', component: ManageBooksComponent,
        children: [
            {path: ':id', component: ManageBooksDetailComponent}
        ]},
    {path: 'manageUsers', component: ManageUsersComponent,
        children: [
            {path: ':id', component: ManageUsersDetailComponent}
        ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
