import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-generator-header',
  standalone: true,
  imports: [],
  templateUrl: './tag-generator-header.component.html',
  styleUrl: './tag-generator-header.component.css'
})
export class TagGeneratorHeaderComponent {
  ngOnInit(): void {
  }
  username=localStorage.getItem('nickname');
}
