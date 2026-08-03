import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagRelatedServiceService } from '../../services/tag-related-service.service';
import { ModalComponent } from '../../modal/modal.component';
export interface ItemDetails {
  ProductName:string;
  id: number;
  grossWeight: number;
  peices: number;
  stoneWeight: number;
  netWeight: number;
  stoneAmount: number;
}
@Component({
  selector: 'app-delete-items',
  standalone: true,
  imports: [FormsModule,ModalComponent],
  templateUrl: './delete-items.component.html',
  styleUrl: './delete-items.component.css'
})
export class DeleteItemsComponent {
  private itemsService=inject(TagRelatedServiceService);
  tagNumber:number=0;
  item?:ItemDetails;
  isModalOpen=false;
  validMessage="";
  iconValue="";
  textColor="";
  fetchTag() {
    this.itemsService.fetchTagDetails(this.tagNumber).subscribe({
      next:(response)=>{
        console.log("success",response);
        this.item=response.data;
      },
      error:(err)=>{
        console.log(err);
        this.isModalOpen=true;
        // const errorObj = JSON.parse(err.error);
        this.validMessage= err.error.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";
      }
    })
  }
  cancel(){
    this.item=undefined;
    this.tagNumber=0;
  }
  delete(id:number){
    this.itemsService.deleteItem(id).subscribe({
      next:()=>{
        this.isModalOpen=true;
        this.validMessage="Item Deleted Successfully.";
        this.iconValue="bi bi-check-circle text-success";
        this.textColor="success";
        this.cancel();
      },
      error:(err)=>{
        this.isModalOpen=true;
        const errorObj = JSON.parse(err.error);
        this.validMessage= errorObj.message;
        this.iconValue="bi bi-esclamation-circle-fill text-danger";
        this.textColor="danger";
      }
    })
  }
}
