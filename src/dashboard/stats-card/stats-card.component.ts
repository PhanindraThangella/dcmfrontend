import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() title = '';

  @Input() value = '';

  @Input() icon = '';
  
  @Input() percent='';
}