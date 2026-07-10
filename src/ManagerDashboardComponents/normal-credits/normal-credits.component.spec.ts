import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalCreditsComponent } from './normal-credits.component';

describe('NormalCreditsComponent', () => {
  let component: NormalCreditsComponent;
  let fixture: ComponentFixture<NormalCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
