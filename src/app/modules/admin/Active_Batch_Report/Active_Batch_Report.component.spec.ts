import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Active_Batch_ReportComponent } from './Active_Batch_Report.component';
describe('Active_Batch_ReportComponent', () => {
let component: Active_Batch_ReportComponent;
let fixture: ComponentFixture<Active_Batch_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Active_Batch_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Active_Batch_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

