import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSalesRequestsComponent } from './pending-sales-requests.component';

describe('PendingSalesRequestsComponent', () => {
  let component: PendingSalesRequestsComponent;
  let fixture: ComponentFixture<PendingSalesRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingSalesRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSalesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
