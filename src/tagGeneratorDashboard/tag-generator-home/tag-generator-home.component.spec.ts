import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagGeneratorHomeComponent } from './tag-generator-home.component';

describe('TagGeneratorHomeComponent', () => {
  let component: TagGeneratorHomeComponent;
  let fixture: ComponentFixture<TagGeneratorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagGeneratorHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagGeneratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
