import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Transaction_ReportComponent } from './Transaction_Report.component';
describe('Transaction_ReportComponent', () => {
let component: Transaction_ReportComponent;
let fixture: ComponentFixture<Transaction_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Transaction_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Transaction_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

