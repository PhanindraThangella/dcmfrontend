import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsubmitComponent } from './billsubmit.component';

describe('BillsubmitComponent', () => {
  let component: BillsubmitComponent;
  let fixture: ComponentFixture<BillsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillsubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
