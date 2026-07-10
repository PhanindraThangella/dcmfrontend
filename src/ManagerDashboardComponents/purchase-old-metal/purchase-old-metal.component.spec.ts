import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOldMetalComponent } from './purchase-old-metal.component';

describe('PurchaseOldMetalComponent', () => {
  let component: PurchaseOldMetalComponent;
  let fixture: ComponentFixture<PurchaseOldMetalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOldMetalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOldMetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
