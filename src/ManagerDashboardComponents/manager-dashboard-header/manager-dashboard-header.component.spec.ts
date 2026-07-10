import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardHeaderComponent } from './manager-dashboard-header.component';

describe('ManagerDashboardHeaderComponent', () => {
  let component: ManagerDashboardHeaderComponent;
  let fixture: ComponentFixture<ManagerDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDashboardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
