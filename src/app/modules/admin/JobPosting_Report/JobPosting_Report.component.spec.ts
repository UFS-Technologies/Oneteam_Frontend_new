import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobPosting_ReportComponent } from './JobPosting_Report.component';
describe('JobPosting_ReportComponent', () => {
let component: JobPosting_ReportComponent;
let fixture: ComponentFixture<JobPosting_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ JobPosting_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(JobPosting_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

