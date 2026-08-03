import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { TagRelatedServiceService } from '../../services/tag-related-service.service';
export interface ItemDetails {
  tagNumber: string;
  grossWeight: number;
  peices: number;
  lessWeight: number;
  stoneWeight: number;
  netWeight: number;
  stoneAmount: number;
  tagPrint: boolean;
}
@Component({
  selector: 'app-modify-tag-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modify-tag-details.component.html',
  styleUrl: './modify-tag-details.component.css'
})
export class ModifyTagDetailsComponent {
  loading = false;
  private tagService=inject(TagRelatedServiceService);
  form: FormGroup;
  constructor(private fb: FormBuilder,)
  {

    this.form = this.fb.group({

      tagNumber: ['', Validators.required],

      grossWeight: [0],
      peices: [0],
      lessWeight: [0],
      stoneWeight: [0],
      netWeight: [0],
      stoneAmount: [0],

      tagPrint: [false]

    });
    this.calculateNetWeight();
    this.updateNetWeight();

  }
    calculateNetWeight() {

    this.form.get('grossWeight')?.valueChanges.subscribe(() => {
      this.updateNetWeight();
    });

    this.form.get('lessWeight')?.valueChanges.subscribe(() => {
      this.updateNetWeight();
    });

  }

  updateNetWeight() {

    const gross =
      Number(this.form.get('grossWeight')?.value) || 0;

    const less =
      Number(this.form.get('lessWeight')?.value) || 0;

    this.form
      .get('netWeight')
      ?.setValue(gross - less, { emitEvent: false });

  }
  fetchDetails() {

    const tag = this.form.value.tagNumber;

    if (!tag) return;

    this.loading = true;

    this.tagService.fetchTagDetails(tag).subscribe({

      next: data => {

        this.form.patchValue(data.data);
        this.form.patchValue({
          tagNumber:tag
        });
        this.loading = false;
        console.log(data);

      },

      error: () => {

        this.loading = false;
        alert('Tag not found');

      }

    });

  }

  save() {

    if (this.form.invalid) return;
    // console.log(this.form.value);
    this.tagService.updateTagDetails(this.form.value).subscribe({

      next: () => {

        alert('Saved Successfully');

      },

      error: () => {

        alert('Save Failed');

      }

    });
    this.cancel();

  }

  cancel() {
    this.form.reset({
      tagPrint: false
    });

  }
}
