import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Registration_ReportComponent} from './Registration_Report.component';
describe('Home_PageComponent', () => {
let component: Registration_ReportComponent;
let fixture: ComponentFixture<Registration_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Registration_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Registration_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

