import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPaginatorComponent } from './post-paginator.component';

describe('PostPaginatorComponent', () => {
  let component: PostPaginatorComponent;
  let fixture: ComponentFixture<PostPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
