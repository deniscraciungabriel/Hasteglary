package hastega.interview.hasteglary.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import hastega.interview.hasteglary.models.User;
import jakarta.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface UserRepo extends JpaRepository<User, Long>{
    public Optional<User> findByUsername(String username);
}
