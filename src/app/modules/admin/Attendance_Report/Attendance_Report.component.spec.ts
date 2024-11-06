import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Attendance_ReportComponent } from './Attendance_Report.component';
describe('Attendance_ReportComponent', () => {
let component: Attendance_ReportComponent;
let fixture: ComponentFixture<Attendance_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Attendance_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Attendance_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

