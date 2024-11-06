import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Fees_Collection_ReportComponent } from './Fees_Collection_Report.component';
describe('Fees_Collection_ReportComponent', () => {
let component: Fees_Collection_ReportComponent;
let fixture: ComponentFixture<Fees_Collection_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Fees_Collection_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Fees_Collection_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

