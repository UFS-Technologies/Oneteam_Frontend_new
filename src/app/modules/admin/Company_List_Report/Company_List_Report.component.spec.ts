import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Company_List_ReportComponent } from './Company_List_Report.component';
describe('Company_List_ReportComponent', () => {
let component: Company_List_ReportComponent;
let fixture: ComponentFixture<Company_List_ReportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Company_List_ReportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Company_List_ReportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

