import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './users/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { ManageBooksComponent } from './books/manage-books/manage-books.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ManageBooksDetailComponent } from './books/manage-books-detail/manage-books-detail.component';
import { ManageUsersDetailComponent } from './users/manage-users-detail/manage-users-detail.component';
import { ManageUsersEditComponent } from './users/manage-users-edit/manage-users-edit.component';
import { RoleGuardService } from './role-guard.service';
import { ManageDataComponent } from './data-manager/manage-data/manage-data.component';
import { LoggingComponent } from './data-manager/logging/logging.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'bookshelf', component: BookshelfComponent,
        children: [
            {path: ':id', component: BookDetailsComponent}
        ]},
    {path: 'booklist/:id', component: BookListComponent, canActivate: [RoleGuardService], data: {role: 'user'}},
    {path: 'manageBooks', component: ManageBooksComponent, canActivate: [RoleGuardService], data: {role: 'admin'},
        children: [
            {path: ':id', component: ManageBooksDetailComponent}
        ]},
    {path: 'manageUsers', component: ManageUsersComponent, canActivate: [RoleGuardService], data: {role: 'admin'},
        children: [
            {path: ':id', component: ManageUsersDetailComponent},
            {path: 'edit/:id', component: ManageUsersEditComponent}
        ]},
    {path: 'manageData', component: ManageDataComponent,
        children: [
            {path: ':id', component: LoggingComponent}
        ]},
    {path: '**' , redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
