import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employer_DetailsComponent } from './Employer_Details.component';
describe('Employer_DetailsComponent', () => {
let component: Employer_DetailsComponent;
let fixture: ComponentFixture<Employer_DetailsComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employer_DetailsComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employer_DetailsComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

