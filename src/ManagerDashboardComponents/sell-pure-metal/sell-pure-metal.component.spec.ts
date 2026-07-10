import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPureMetalComponent } from './sell-pure-metal.component';

describe('SellPureMetalComponent', () => {
  let component: SellPureMetalComponent;
  let fixture: ComponentFixture<SellPureMetalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellPureMetalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellPureMetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
