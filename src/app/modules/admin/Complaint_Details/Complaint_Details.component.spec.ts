import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Complaint_DetailsComponent } from './Complaint_Details.component';
describe('Complaint_DetailsComponent', () => {
let component: Complaint_DetailsComponent;
let fixture: ComponentFixture<Complaint_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Complaint_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Complaint_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

