import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfesorComponent } from './layout.component';

describe('LayoutProfesorComponent', () => {
  let component: LayoutProfesorComponent;
  let fixture: ComponentFixture<LayoutProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutProfesorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
