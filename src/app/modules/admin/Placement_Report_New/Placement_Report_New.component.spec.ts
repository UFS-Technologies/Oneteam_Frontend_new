import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Placement_Report_NewComponent } from './Placement_Report_New.component';
describe('Placement_Report_NewComponent', () => {
let component: Placement_Report_NewComponent;
let fixture: ComponentFixture<Placement_Report_NewComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Placement_Report_NewComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Placement_Report_NewComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

