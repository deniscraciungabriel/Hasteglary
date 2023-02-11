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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
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
