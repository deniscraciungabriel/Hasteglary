import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css'],
})
export class InfoModalComponent {
  @Input() book: Book | undefined;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  public onCloseModal(): void {
    this.closeModalEvent.emit(false);
  }
}
