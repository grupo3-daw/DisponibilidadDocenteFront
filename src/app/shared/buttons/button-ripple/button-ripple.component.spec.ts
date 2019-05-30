import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRippleComponent } from './button-ripple.component';

describe('ButtonRippleComponent', () => {
  let component: ButtonRippleComponent;
  let fixture: ComponentFixture<ButtonRippleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRippleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRippleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
