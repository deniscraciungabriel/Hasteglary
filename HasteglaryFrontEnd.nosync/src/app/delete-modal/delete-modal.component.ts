import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() book: Book | undefined;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() deleteBookEvent = new EventEmitter<Book>();

  public onCloseModal(): void {
    this.closeModalEvent.emit(false);
  }

  public onDeleteBook(): void {
    this.deleteBookEvent.emit(this.book);
  }
}
