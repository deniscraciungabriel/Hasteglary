import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public books: Book[] | undefined;
  public displayModal: Boolean = false;
  public selectedBook: Book | undefined;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // "newBook" is going to tell me wether the user is trying to add or edit a book
  public onOpenModal(book: Book | undefined): void {
    this.displayModal = true;
    if (book) {
      this.selectedBook = book;
    }
    console.log(this.displayModal);
    console.log(this.selectedBook);
  }

  public onCloseModal(): void {
    this.displayModal = false;
    this.selectedBook = undefined;
  }

  public getAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log('Fetched all books'),
    });
  }
}
