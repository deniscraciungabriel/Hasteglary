/*
    private Long id;
    private String isbn;
    private String title;
    private String author;
    private String addedDate;
    private String deletedDate;
    private String story;
    private int reads;
*/

export interface Book {
  id: number;
  isbn: string;
  title: string;
  addedDate: string;
  deletedDate: string;
  story: string;
  reads: number;
}
