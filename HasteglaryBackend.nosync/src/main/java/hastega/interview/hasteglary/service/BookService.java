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

    /*
     * Functionalities:
     *      - Add a book
     *      - Edit a book
     *      - Delete a book
     *      - Add, subtract number of reads from a book
     */

    // fetch all books form the database
    public List<Book> getAllBooks(){
        return bookRepo.findAllByOrderByAddedDateDesc();
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
    public Book modifyReads(String isbn, int read){
        Book book = bookRepo.findBookByIsbn(isbn).orElseThrow(() -> new BookNotFoundException("No book found"));
        book.setReads(read);
        return bookRepo.save(book);
    }


}
