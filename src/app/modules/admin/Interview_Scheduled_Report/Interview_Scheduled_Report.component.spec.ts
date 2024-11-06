import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Interview_Scheduled_ReportComponent } from './Interview_Scheduled_Report.component';
describe('Interview_Scheduled_ReportComponent', () => {
let component: Interview_Scheduled_ReportComponent;
let fixture: ComponentFixture<Interview_Scheduled_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Interview_Scheduled_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Interview_Scheduled_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

