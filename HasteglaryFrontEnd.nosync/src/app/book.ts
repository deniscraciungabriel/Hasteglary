/*
    private Long id;
    private String isbn;
    private String title;
    private String author;
    private String addedDate;
    private String story;
    private int reads;
*/

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  addedDate: string;
  story: string;
  reads: number;
}
