import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldSalesComponent } from './gold-sales.component';

describe('GoldSalesComponent', () => {
  let component: GoldSalesComponent;
  let fixture: ComponentFixture<GoldSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
