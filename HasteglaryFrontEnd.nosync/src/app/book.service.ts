import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Book } from './book';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiServerUr1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllBooks(user: User): Observable<Book[]> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
    });
    return this.http
      .get<Book[]>(`${this.apiServerUr1}/books/get-all`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('ERROR: ', error);
          return [];
        })
      );
  }

  public findBookByIsbn(isbn: string, user: User): Observable<Book> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
    });
    return this.http.get<Book>(`${this.apiServerUr1}/books/get/${isbn}`, {
      headers,
    });
  }

  public addBook(book: Book, user: User): Observable<Book> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
    });
    // convert date in readable format
    book.addedDate = new Date().toISOString().substring(0, 10);
    book.owner = user.username;
    return this.http.post<Book>(`${this.apiServerUr1}/books/add`, book, {
      headers,
    });
  }

  public deleteBook(isbn: string, user: User): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
    });
    return this.http.delete<void>(`${this.apiServerUr1}/books/delete/${isbn}`, {
      headers,
    });
  }

  public modifyReads(isbn: string, n: number, user: User): Observable<Book> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${user.username}:${user.password}`)}`,
    });
    return this.http.post<Book>(
      `${this.apiServerUr1}/books/modify-reads/${isbn}/${n}`,
      null,
      { headers }
    );
  }
}
