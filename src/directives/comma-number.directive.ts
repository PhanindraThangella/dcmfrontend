import {
  Directive,
  ElementRef,
  HostListener,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCommaNumber]',
  standalone: true
})
export class CommaNumberDirective {

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Self() private ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    // Current cursor position
    const cursorPosition = input.selectionStart ?? input.value.length;

    // Remove commas and invalid characters
    let rawValue = input.value.replace(/,/g, '');
    rawValue = rawValue.replace(/[^\d.]/g, '');

    // Prevent multiple decimal points
    const parts = rawValue.split('.');
    if (parts.length > 2) {
      rawValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Update Reactive Form WITHOUT commas
    this.ngControl?.control?.setValue(rawValue, {
      emitEvent: false
    });

    // Format for display
    input.value = this.formatIndian(rawValue);

    // Restore cursor (approximate)
    const difference = input.value.length - rawValue.length;
    input.setSelectionRange(
      cursorPosition + difference,
      cursorPosition + difference
    );
  }

  @HostListener('blur')
  onBlur(): void {
    const value = this.ngControl?.control?.value;

    if (value) {
      this.elementRef.nativeElement.value = this.formatIndian(value);
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.elementRef.nativeElement.value =
      this.ngControl?.control?.value ?? '';
  }

  private formatIndian(value: string): string {

    if (!value) return '';

    const num = Number(value);

    if (isNaN(num)) return '';

    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2
    }).format(num);
  }

}