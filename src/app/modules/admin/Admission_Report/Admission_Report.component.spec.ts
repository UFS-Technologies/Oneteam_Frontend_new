import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Admission_ReportComponent } from './Admission_Report.component';
describe('Admission_ReportComponent', () => {
let component: Admission_ReportComponent;
let fixture: ComponentFixture<Admission_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Admission_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Admission_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

