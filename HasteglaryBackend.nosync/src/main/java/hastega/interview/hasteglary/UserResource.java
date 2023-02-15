package hastega.interview.hasteglary;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hastega.interview.hasteglary.models.Registration;
import hastega.interview.hasteglary.models.User;
import hastega.interview.hasteglary.service.RegistrationService;
import hastega.interview.hasteglary.service.UserService;

@RestController
@RequestMapping("/users")
public class UserResource {
    
    private final UserService userService;
    private final RegistrationService registrationService;

    public UserResource(UserService userService, RegistrationService registrationService){
        this.userService = userService;
        this.registrationService = registrationService;
    }

    // get all users
    @GetMapping("/get-all")
    public ResponseEntity<List<User>> getAllUsers (){
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @PostMapping("/registration")
    public String register(@RequestBody Registration request){
        return registrationService.register(request);
    }



}
