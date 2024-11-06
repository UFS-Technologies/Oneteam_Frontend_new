import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_Outstanding_ReportComponent } from './Fees_Outstanding_Report.component';
describe('Fees_Outstanding_ReportComponent', () => {
let component: Fees_Outstanding_ReportComponent;
let fixture: ComponentFixture<Fees_Outstanding_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_Outstanding_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_Outstanding_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

