import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecentsComponent } from './view-recents.component';

describe('ViewRecentsComponent', () => {
  let component: ViewRecentsComponent;
  let fixture: ComponentFixture<ViewRecentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
