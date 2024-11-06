import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Interview_ReportComponent } from './Interview_Report.component';
describe('Interview_ReportComponent', () => {
let component: Interview_ReportComponent;
let fixture: ComponentFixture<Interview_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Interview_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Interview_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

