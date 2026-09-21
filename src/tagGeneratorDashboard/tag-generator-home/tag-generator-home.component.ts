import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagGeneratorHeaderComponent } from '../tag-generator-header/tag-generator-header.component';
import { TagGeneratorSidebarComponent } from '../tag-generator-sidebar/tag-generator-sidebar.component';
import { TagGeneratorComponent } from '../tag-generator/tag-generator.component';
import { ModifyTagDetailsComponent } from '../modify-tag-details/modify-tag-details.component';
import { VerifyItemsComponent } from '../verify-items/verify-items.component';
import { DeleteItemsComponent } from '../delete-items/delete-items.component';
import { ViewRecentsComponent } from '../view-recents/view-recents.component';

@Component({
  selector: 'app-tag-generator-home',
  standalone: true,
  imports: [ViewRecentsComponent,DeleteItemsComponent,VerifyItemsComponent,ModifyTagDetailsComponent,CommonModule,TagGeneratorHeaderComponent,TagGeneratorSidebarComponent,TagGeneratorComponent],
  templateUrl: './tag-generator-home.component.html',
  styleUrl: './tag-generator-home.component.css'
})
export class TagGeneratorHomeComponent {
  selectedComponent:string='generateTag';
  assignSelectedComponent(option:string){
    this.selectedComponent=option;
    console.log(option);
  }
  enableSidebarOptions(option:string){
    this.selectedComponent=option;
  }
}
