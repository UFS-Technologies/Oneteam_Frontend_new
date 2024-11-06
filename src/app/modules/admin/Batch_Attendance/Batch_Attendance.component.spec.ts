import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Batch_AttendanceComponent } from './Batch_Attendance.component';
describe('Batch_AttendanceComponent', () => {
let component: Batch_AttendanceComponent;
let fixture: ComponentFixture<Batch_AttendanceComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Batch_AttendanceComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Batch_AttendanceComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

