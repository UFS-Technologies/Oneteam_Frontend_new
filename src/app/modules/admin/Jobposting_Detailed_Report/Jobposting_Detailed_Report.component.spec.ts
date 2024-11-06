import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Jobposting_Detailed_ReportComponent } from './Jobposting_Detailed_Report.component';
describe('Jobposting_Detailed_ReportComponent', () => {
let component: Jobposting_Detailed_ReportComponent;
let fixture: ComponentFixture<Jobposting_Detailed_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Jobposting_Detailed_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Jobposting_Detailed_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

