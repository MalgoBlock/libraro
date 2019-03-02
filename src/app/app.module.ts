import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './core/home/home.component';
import { FooterComponent } from './core/footer/footer.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './users/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DropdownDirective } from './core/dropdown.directive';
import { ManageBooksComponent } from './books/manage-books/manage-books.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ManageBooksDetailComponent } from './books/manage-books-detail/manage-books-detail.component';
import { ManageUsersDetailComponent } from './users/manage-users-detail/manage-users-detail.component';
import { ManageUsersEditComponent } from './users/manage-users-edit/manage-users-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BookshelfComponent,
    BookListComponent,
    BookDetailsComponent,
    DropdownDirective,
    ManageBooksComponent,
    ManageUsersComponent,
    ManageBooksDetailComponent,
    ManageUsersDetailComponent,
    ManageUsersEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
