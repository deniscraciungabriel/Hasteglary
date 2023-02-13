import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewBookModalComponent } from './new-book-modal/new-book-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
  declarations: [AppComponent, NewBookModalComponent, DeleteModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
