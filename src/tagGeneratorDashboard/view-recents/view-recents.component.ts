import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TagRelatedServiceService } from '../../services/tag-related-service.service';
export interface Transaction {
  tagNumber:number,
  grossWeight:number;
  netWeight:number;
  itemType:string;
  ProductName:string;
  stoneWeight:number;
  stoneAmount:number;
  peices:number;
}
@Component({
  selector: 'app-view-recents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recents.component.html',
  styleUrl: './view-recents.component.css'
})
export class ViewRecentsComponent implements OnInit{
  transactions:Transaction[]=[];
  private tagService=inject(TagRelatedServiceService);
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.tagService.getRecentItems().subscribe({
      next:(response)=>{
        this.transactions=response.data;
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
