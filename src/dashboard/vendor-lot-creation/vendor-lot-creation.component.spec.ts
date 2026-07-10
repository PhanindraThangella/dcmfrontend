import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorLotCreationComponent } from './vendor-lot-creation.component';

describe('VendorLotCreationComponent', () => {
  let component: VendorLotCreationComponent;
  let fixture: ComponentFixture<VendorLotCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorLotCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorLotCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
