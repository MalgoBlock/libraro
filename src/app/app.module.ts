import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BookshelfComponent } from './books/bookshelf/bookshelf.component';
import { BookListComponent } from './users/book-list/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { DropdownDirective } from './layout/dropdown.directive';
import { ManageBooksComponent } from './books/manage-books/manage-books.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ManageBooksDetailComponent } from './books/manage-books-detail/manage-books-detail.component';
import { ManageUsersDetailComponent } from './users/manage-users-detail/manage-users-detail.component';
import { ManageUsersEditComponent } from './users/manage-users-edit/manage-users-edit.component';
import { ManageDataComponent } from './data-manager/manage-data/manage-data.component';
import { LoggingComponent } from './data-manager/logging/logging.component';
import { HttpClientModule } from '@angular/common/http';

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
    ManageUsersEditComponent,
    ManageDataComponent,
    LoggingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
