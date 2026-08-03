import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverSalesComponent } from './silver-sales.component';

describe('SilverSalesComponent', () => {
  let component: SilverSalesComponent;
  let fixture: ComponentFixture<SilverSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilverSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilverSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
