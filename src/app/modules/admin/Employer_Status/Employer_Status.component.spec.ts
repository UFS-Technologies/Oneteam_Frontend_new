import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Employer_StatusComponent } from './Employer_Status.component';
describe('Employer_StatusComponent', () => {
let component: Employer_StatusComponent;
let fixture: ComponentFixture<Employer_StatusComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Employer_StatusComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Employer_StatusComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

