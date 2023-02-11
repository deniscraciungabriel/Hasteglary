package hastega.interview.hasteglary;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hastega.interview.hasteglary.models.Book;
import hastega.interview.hasteglary.service.BookService;

@RestController
@RequestMapping("/books")
public class BookResource {
    private final BookService bookService;

    public BookResource(BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Book>> getAllBooks (){
        List<Book> books = bookService.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/get/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable("isbn") String isbn){
        Book book = bookService.findBookByIsbn(isbn);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        Book newBook = bookService.addBook(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<?> deleteBook(@PathVariable("isbn") String isbn){
        bookService.deleteBook(isbn);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

