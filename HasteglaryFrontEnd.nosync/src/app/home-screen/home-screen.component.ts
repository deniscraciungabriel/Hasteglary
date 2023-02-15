import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public displayInfoModal: Boolean = false;
  public empty: Boolean = false;
  public selectedBook: Book | undefined;
  public user: User | undefined;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    // if there's no user, you can't be here
    if (!JSON.parse(localStorage.getItem('user')!)) {
      this.router.navigate(['/']);
    }

    this.user = JSON.parse(localStorage.getItem('user')!);

    this.getAllBooks();
  }

  public onLogout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
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

  // opens the modal that allows you to see the info of a book
  public onOpenInfoModal(book: Book): void {
    this.selectedBook = book;
    this.displayInfoModal = true;
  }

  // add or subtract reads
  public onAddReads(book: Book, n: number): void {
    if (book.reads + n < 0) return;
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
    this.displayInfoModal = false;
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
    this.bookService.getAllBooks(this.user!).subscribe({
      next: (response: Book[]) => {
        const books = response.filter((book) => {
          return book.owner === this.user?.username;
        });
        this.books = books;
        // if there are no books make empty true
        if (books.length === 0) {
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
