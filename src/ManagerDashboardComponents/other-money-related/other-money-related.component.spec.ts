import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMoneyRelatedComponent } from './other-money-related.component';

describe('OtherMoneyRelatedComponent', () => {
  let component: OtherMoneyRelatedComponent;
  let fixture: ComponentFixture<OtherMoneyRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherMoneyRelatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherMoneyRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
