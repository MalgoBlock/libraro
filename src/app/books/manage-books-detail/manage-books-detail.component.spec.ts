import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBooksDetailComponent } from './manage-books-detail.component';

describe('ManageBooksDetailComponent', () => {
  let component: ManageBooksDetailComponent;
  let fixture: ComponentFixture<ManageBooksDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBooksDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBooksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
