import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Student_Job_ReportComponent } from './Student_Job_Report.component';
describe('Student_Job_ReportComponent', () => {
let component: Student_Job_ReportComponent;
let fixture: ComponentFixture<Student_Job_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Student_Job_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Student_Job_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

