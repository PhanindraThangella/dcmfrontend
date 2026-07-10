import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingEmpTableComponent } from './top-performing-emp-table.component';

describe('TopPerformingEmpTableComponent', () => {
  let component: TopPerformingEmpTableComponent;
  let fixture: ComponentFixture<TopPerformingEmpTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPerformingEmpTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPerformingEmpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
