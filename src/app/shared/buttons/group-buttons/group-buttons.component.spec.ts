import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupButtonsComponent } from './group-buttons.component';

describe('GroupButtonsComponent', () => {
  let component: GroupButtonsComponent;
  let fixture: ComponentFixture<GroupButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
