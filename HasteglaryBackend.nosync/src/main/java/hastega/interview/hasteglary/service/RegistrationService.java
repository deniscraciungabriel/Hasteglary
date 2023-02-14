package hastega.interview.hasteglary.service;




// import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import hastega.interview.hasteglary.models.Registration;
import hastega.interview.hasteglary.models.User;
import hastega.interview.hasteglary.repo.UserRepo;

@Service
public class RegistrationService {  

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepo userRepo;

    public RegistrationService(BCryptPasswordEncoder bCryptPasswordEncoder, UserRepo userRepo){
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepo = userRepo;
    }
    
    public String register(Registration request){
        // I won't complicate myself with stuff like email validation, checking if username is unique... bla bla 
        // I will add password encryption tho because that's too important to avoid
        final String password = bCryptPasswordEncoder.encode(request.getPassword());
        final User user = new User(request.getUsername(), password);
        // user.setId(UUID.randomUUID().toString());
        userRepo.save(user);
        return password;
        // return "works";
    }

}
