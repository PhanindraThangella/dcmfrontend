import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagGeneratorHeaderComponent } from './tag-generator-header.component';

describe('TagGeneratorHeaderComponent', () => {
  let component: TagGeneratorHeaderComponent;
  let fixture: ComponentFixture<TagGeneratorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagGeneratorHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagGeneratorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
