import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprimedButtonsComponent } from './comprimed-buttons.component';

describe('ComprimedButtonsComponent', () => {
  let component: ComprimedButtonsComponent;
  let fixture: ComponentFixture<ComprimedButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprimedButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprimedButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
