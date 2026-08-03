import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() title = '';


  @Input() icon = '';
  
  private _percent: string = '';
  percentageNumeric: number = 0;
  private _value: string = '';
  formattedValue: string = '';

  @Input()
  set percent(value: string) {
    this._percent = value;
    this.percentageNumeric = +value; // Converts instantly whenever value arrives
  }
  
  @Input()
  set value(val: string) {
    this._value = val;
    this.formattedValue = this.convertToIndianShorthand(val);
  }

  get percent(): string {
    return this._percent;
  }

  get value(): string {
    return this._value;
  }

  private convertToIndianShorthand(valStr: string): string {
    // Remove formatting characters like commas or currency symbols if present
    const cleanStr = valStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);

    if (isNaN(num)) return valStr; // Fallback if string is text

    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' Lakh';
    }
    
    // Fallback for smaller values under 1 Lakh
    return num.toLocaleString('en-IN'); 
  }
}