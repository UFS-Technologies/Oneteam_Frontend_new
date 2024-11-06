import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Conversion_ReportComponent } from './Conversion_Report.component';
describe('Conversion_ReportComponent', () => {
let component: Conversion_ReportComponent;
let fixture: ComponentFixture<Conversion_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Conversion_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Conversion_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

