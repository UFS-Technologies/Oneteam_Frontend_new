import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Batch_ReportComponent } from './Batch_Report.component';
describe('Batch_ReportComponent', () => {
let component: Batch_ReportComponent;
let fixture: ComponentFixture<Batch_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Batch_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Batch_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

