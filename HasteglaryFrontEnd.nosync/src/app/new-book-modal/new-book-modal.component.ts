import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-new-book-modal',
  templateUrl: './new-book-modal.component.html',
  styleUrls: ['./new-book-modal.component.css'],
})
export class NewBookModalComponent {
  @Input() book: Book | undefined;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  public onCloseModal(): void {
    this.closeModalEvent.emit(false);
  }
}
