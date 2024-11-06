import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Job_Opening_Pending_Followups_ReportComponent } from './Job_Opening_Pending_Followups_Report.component';

describe('Job_Opening_Pending_Followups_ReportComponent', () => {
  let component: Job_Opening_Pending_Followups_ReportComponent;
  let fixture: ComponentFixture<Job_Opening_Pending_Followups_ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Job_Opening_Pending_Followups_ReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Job_Opening_Pending_Followups_ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
