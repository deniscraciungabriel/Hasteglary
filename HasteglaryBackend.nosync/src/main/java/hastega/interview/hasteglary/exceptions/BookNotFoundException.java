package hastega.interview.hasteglary.exceptions;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String message){
        // calls constructor of upper class with the message recieved
        super(message);
    }
}
