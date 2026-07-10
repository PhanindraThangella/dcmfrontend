import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldsilversalesComponent } from './goldsilversales.component';

describe('GoldsilversalesComponent', () => {
  let component: GoldsilversalesComponent;
  let fixture: ComponentFixture<GoldsilversalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldsilversalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldsilversalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
