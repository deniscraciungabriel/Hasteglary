import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';

/*
package hastega.interview.hasteglary.service;

import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hastega.interview.hasteglary.exceptions.BookNotFoundException;
import hastega.interview.hasteglary.models.Book;
import hastega.interview.hasteglary.repo.BookRepo;

@Service
public class BookService {
    private final BookRepo bookRepo;

    // @Autowired
    public BookService(BookRepo bookRepo){
        this.bookRepo = bookRepo;
    }

   

    // fetch all books form the database
    public List<Book> getAllBooks(){
        return bookRepo.findAll();
    }

    // find a book in the database
    public Book findBookByIsbn(String isbn){
        // the return type of that method is optional (as the book might not exist), so there's a need to handle that exception
        return bookRepo.findBookByIsbn(isbn).orElseThrow(() -> new BookNotFoundException("No book found"));
    }

    // add a new book to the database
    public Book addBook(Book book){ 
        Book existingBook = bookRepo.findBookByIsbn(book.getIsbn()).orElse(null);
        if(existingBook != null) {
            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setReads(book.getReads());
            return bookRepo.save(existingBook);
        } else {
            return bookRepo.save(book);
        }
    }

    // delete a book from the database
    public void deleteBook(String isbn){
        bookRepo.deleteBookByIsbn(isbn);
    }

    // modify number of reads for a book
    // public Book modifyReads(String isbn, int read){}


}


*/

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiServerUr1 = '';

  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUr1}/books/get-all`);
  }

  public findBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiServerUr1}/books/get/${isbn}`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUr1}/books/add`, book);
  }

  public deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUr1}/books/delete/${isbn}`);
  }

  //   public modifyReads(isbn: string, reads: number): Observable<Book> {
  //     return this.http.put<Book>(
  //       `${this.apiServerUr1}/books/modify-reads/${isbn}/${reads}`,
  //       null
  //     );
  //   }
}
