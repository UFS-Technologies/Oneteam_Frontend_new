import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Followup_ReportComponent } from './Followup_Report.component';
describe('Followup_ReportComponent', () => {
let component: Followup_ReportComponent;
let fixture: ComponentFixture<Followup_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Followup_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Followup_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

