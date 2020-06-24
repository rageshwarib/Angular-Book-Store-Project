import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcartComponent } from './bookcart.component';

describe('BookcartComponent', () => {
  let component: BookcartComponent;
  let fixture: ComponentFixture<BookcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
