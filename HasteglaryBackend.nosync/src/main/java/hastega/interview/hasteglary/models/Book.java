package hastega.interview.hasteglary.models;


import java.io.Serializable;


import jakarta.persistence.*;


// Serializable helps the class beings transformed into different types of streams
@Entity
public class Book implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String isbn;
    private String title;
    private String author;
    @Column(nullable = false, updatable = false)
    // the isbn will never change, and mustn't change.
    private String addedDate;
    private String story;
    private int reads;

    public Book(){}

    // constructor
    public Book(Long id, String title, String author, String isbn, String addedDate, String deletedDate, String story, int reads) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.addedDate = addedDate;
        this.story = story;
        this.reads = reads;
    }

    // getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(String addedDate) {
        this.addedDate = addedDate;
    }

    public String getStory() {
        return story;
    }

    public void setStory(String story) {
        this.story = story;
    }

    public int getReads() {
        return reads;
    }

    public void setReads(int reads) {
        this.reads = reads;
    }

}