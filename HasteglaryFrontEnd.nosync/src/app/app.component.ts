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
  public displayDeleteModal: Boolean = false;
  public empty: Boolean = false;
  public selectedBook: Book | undefined;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // opens the modal that allows you to save or edit a book
  public onOpenSaveModal(book: Book | undefined): void {
    this.displayModal = true;
    // if there's a book passed, we are editing it, so we are selecting it
    if (book) {
      this.selectedBook = book;
    }
  }

  // opens the modal that allows you to delete a book
  public onOpenDeleteModal(book: Book): void {
    this.displayDeleteModal = true;
    this.selectedBook = book;
  }

  public onAddReads(book: Book, n: number): void {
    this.bookService.modifyReads(book.isbn, book.reads + n).subscribe({
      next: (response: Book) => {
        console.log('modified successfully: ', response);
        // refreshes
        this.getAllBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log('Modified book'),
    });
  }

  // closes all modals
  public onCloseModal(): void {
    this.displayModal = false;
    this.displayDeleteModal = false;
    this.selectedBook = undefined;
  }

  public onBookSave(book: Book): void {
    this.bookService.addBook(book).subscribe({
      next: (response: Book) => {
        console.log('saved successfully: ', response);
        // refreshes
        this.getAllBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log('Saved book'),
    });
    this.onCloseModal();
  }

  public onBookDelete(book: Book): void {
    this.bookService.deleteBook(book.isbn).subscribe({
      next: () => {
        console.log('deleted successfully');
        // refreshes
        this.getAllBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log('Deleted book'),
    });
    this.onCloseModal();
  }

  public getAllBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;

        // if there are no books make empty true
        if (response.length === 0) {
          this.empty = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log('Fetched all books'),
    });
  }
}
