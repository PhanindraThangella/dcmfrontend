import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagGeneratorSidebarComponent } from './tag-generator-sidebar.component';

describe('TagGeneratorSidebarComponent', () => {
  let component: TagGeneratorSidebarComponent;
  let fixture: ComponentFixture<TagGeneratorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagGeneratorSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagGeneratorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
