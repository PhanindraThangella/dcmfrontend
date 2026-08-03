import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTagDetailsComponent } from './modify-tag-details.component';

describe('ModifyTagDetailsComponent', () => {
  let component: ModifyTagDetailsComponent;
  let fixture: ComponentFixture<ModifyTagDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTagDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTagDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
