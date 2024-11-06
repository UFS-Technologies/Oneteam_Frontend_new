import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Syllabus_CoverageComponent } from './Syllabus_Coverage.component';
describe('Syllabus_CoverageComponent', () => {
let component: Syllabus_CoverageComponent;
let fixture: ComponentFixture<Syllabus_CoverageComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Syllabus_CoverageComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Syllabus_CoverageComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

