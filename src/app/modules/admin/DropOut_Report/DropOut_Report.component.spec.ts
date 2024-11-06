import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropOut_ReportComponent } from './DropOut_Report.component';
describe('DropOut_ReportComponent', () => {
let component: DropOut_ReportComponent;
let fixture: ComponentFixture<DropOut_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ DropOut_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(DropOut_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

