import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employer_FollowupComponent } from './Employer_Followup.component';
describe('Employer_FollowupComponent', () => {
let component: Employer_FollowupComponent;
let fixture: ComponentFixture<Employer_FollowupComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employer_FollowupComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employer_FollowupComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

