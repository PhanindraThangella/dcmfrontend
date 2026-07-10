import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardHomeComponent } from './manager-dashboard-home.component';

describe('ManagerDashboardHomeComponent', () => {
  let component: ManagerDashboardHomeComponent;
  let fixture: ComponentFixture<ManagerDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDashboardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
