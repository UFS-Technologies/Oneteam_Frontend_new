import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_Due_ReportComponent } from './Fees_Due_Report.component';
describe('Fees_Due_ReportComponent', () => {
let component: Fees_Due_ReportComponent;
let fixture: ComponentFixture<Fees_Due_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_Due_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_Due_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

