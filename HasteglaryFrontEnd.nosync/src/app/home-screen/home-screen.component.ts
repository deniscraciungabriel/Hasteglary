import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { User } from '../user';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent {
  public books: Book[] | undefined;
  public displayModal: Boolean = false;
  public displayDeleteModal: Boolean = false;
  public empty: Boolean = false;
  public selectedBook: Book | undefined;
  public user: User | undefined;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log('USER: ', this.user);
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
    this.bookService
      .modifyReads(book.isbn, book.reads + n, this.user!)
      .subscribe({
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
    this.bookService.addBook(book, this.user!).subscribe({
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
    this.bookService.deleteBook(book.isbn, this.user!).subscribe({
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
    this.bookService
      .getAllBooks({ id: 2, username: 'deni', password: '123' })
      .subscribe({
        next: (response: Book[]) => {
          this.books = response;

          // if there are no books make empty true
          if (response.length === 0) {
            this.empty = true;
          }
        },
        error: (error: HttpErrorResponse) => {
          alert('200?');
        },
        complete: () => console.log('Fetched all books'),
      });
  }
}
