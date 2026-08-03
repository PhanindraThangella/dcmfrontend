import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagRelatedServiceService } from '../../services/tag-related-service.service';
interface Tag {
  tagNumber: number;
  peices: number;
  grossWeight: number;
  netWeight: number;
}
@Component({
  selector: 'app-verify-items',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './verify-items.component.html',
  styleUrl: './verify-items.component.css'
})
export class VerifyItemsComponent implements OnInit{
  private itemsService=inject(TagRelatedServiceService);
  private cdr=inject(ChangeDetectorRef);
  tagNumber:number=0;
  productName='';
  productNames=[
    'Baby Rings',
    'Small Chains',
    'Medium Chains',
    'Big Chains',
    'Tadu',
    'Matilu',
    'Anji Rings',    
  ]
  // Comes from backend
  availableTags: Tag[] = [];

  verifiedTags: Tag[] = [];
  ngOnInit(): void {
    this.cdr.detectChanges();
  }
  verifyTag() {

    const index = this.availableTags.findIndex(
      x => x.tagNumber == this.tagNumber
    );

    if (index === -1) {
      alert('Tag No does not exist');
      return;
    }

    // Add to right side
    this.verifiedTags.push(this.availableTags[index]);

    // Remove from left side (optional)
    this.availableTags.splice(index, 1);

    // Clear textbox
    this.tagNumber = 0;
  }
  onProductNameChange(name:string){
    this.verifiedTags=[];
    this.itemsService.getItemsByProductName(name).subscribe({
      next:(response)=>{
        this.availableTags=response.data;
        console.log(response);
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }
}
