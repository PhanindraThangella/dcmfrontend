import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyItemsComponent } from './verify-items.component';

describe('VerifyItemsComponent', () => {
  let component: VerifyItemsComponent;
  let fixture: ComponentFixture<VerifyItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
