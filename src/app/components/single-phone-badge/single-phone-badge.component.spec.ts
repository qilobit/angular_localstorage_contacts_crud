import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePhoneBadgeComponent } from './single-phone-badge.component';

describe('SinglePhoneBadgeComponent', () => {
  let component: SinglePhoneBadgeComponent;
  let fixture: ComponentFixture<SinglePhoneBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePhoneBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePhoneBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
