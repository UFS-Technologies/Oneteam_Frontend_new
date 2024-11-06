import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Placed_ReportComponent } from './Placed_Report.component';
describe('Placed_ReportComponent', () => {
let component: Placed_ReportComponent;
let fixture: ComponentFixture<Placed_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Placed_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Placed_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

