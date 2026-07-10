import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBookDetailsComponent } from './day-book-details.component';

describe('DayBookDetailsComponent', () => {
  let component: DayBookDetailsComponent;
  let fixture: ComponentFixture<DayBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayBookDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
