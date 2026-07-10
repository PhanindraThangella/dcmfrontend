import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDashboardSidebarComponent } from './manager-dashboard-sidebar.component';

describe('ManagerDashboardSidebarComponent', () => {
  let component: ManagerDashboardSidebarComponent;
  let fixture: ComponentFixture<ManagerDashboardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDashboardSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDashboardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
