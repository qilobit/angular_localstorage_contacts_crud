import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContactsBtnComponent } from './import-contacts-btn.component';

describe('ImportContactsBtnComponent', () => {
  let component: ImportContactsBtnComponent;
  let fixture: ComponentFixture<ImportContactsBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportContactsBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContactsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
