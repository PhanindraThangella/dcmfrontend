import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() message: string = 'Action completed successfully!';
  @Input() isVisible: boolean = false;
  @Input() icon:string="";
  @Input() textColor:string="";
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
}
