import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pending_FollowUpComponent } from './Pending_FollowUp.component';

describe('Pending_FollowUpComponent', () => {
  let component: Pending_FollowUpComponent;
  let fixture: ComponentFixture<Pending_FollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pending_FollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pending_FollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
