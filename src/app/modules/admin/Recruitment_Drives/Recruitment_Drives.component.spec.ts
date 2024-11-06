import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Recruitment_DrivesComponent } from './Recruitment_Drives.component';
describe('Recruitment_DrivesComponent', () => {
let component: Recruitment_DrivesComponent;
let fixture: ComponentFixture<Recruitment_DrivesComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Recruitment_DrivesComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Recruitment_DrivesComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

