import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiServerUr1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUr1}/books/get-all`).pipe(
      catchError((error) => {
        console.log(error);
        console.error("You don't have permission to access this resource");
        return [];
      })
    );
  }

  public findBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiServerUr1}/books/get/${isbn}`);
  }

  public addBook(book: Book): Observable<Book> {
    // convert date in readable format
    book.addedDate = new Date().toISOString().substring(0, 10);
    return this.http.post<Book>(`${this.apiServerUr1}/books/add`, book);
  }

  public deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUr1}/books/delete/${isbn}`);
  }

  public modifyReads(isbn: string, n: number): Observable<Book> {
    return this.http.post<Book>(
      `${this.apiServerUr1}/books/modify-reads/${isbn}/${n}`,
      null
    );
  }
}
