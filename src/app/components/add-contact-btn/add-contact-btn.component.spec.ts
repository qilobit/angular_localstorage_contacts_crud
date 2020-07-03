import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactBtnComponent } from './add-contact-btn.component';

describe('AddContactBtnComponent', () => {
  let component: AddContactBtnComponent;
  let fixture: ComponentFixture<AddContactBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
