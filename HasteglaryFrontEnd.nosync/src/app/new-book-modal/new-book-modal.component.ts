import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrls: ['./new-book-modal.component.css'],
})
export class NewBookModalComponent {
  @Input() book: Book | undefined;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() saveBookEvent = new EventEmitter<Book>();

  public onCloseModal(): void {
    this.closeModalEvent.emit(false);
  }

  public onAddBook(bookForm: NgForm): void {
    this.saveBookEvent.emit(bookForm.value);
  }
}
