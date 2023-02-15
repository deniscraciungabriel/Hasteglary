package hastega.interview.hasteglary.models;

public class Registration {
    private final String username;
    private final String password;

    public Registration(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
