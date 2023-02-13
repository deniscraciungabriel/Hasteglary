package hastega.interview.hasteglary.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hastega.interview.hasteglary.models.Book;
import jakarta.transaction.Transactional;

@Transactional
public interface BookRepo extends JpaRepository<Book, String>{

    // Spring understands this without further requirements, just from the name convention of the method
    void deleteBookByIsbn(String isbn);

    Optional<Book> findBookByIsbn(String isbn);

    List<Book> findAllByOrderByAddedDateDesc();
}
