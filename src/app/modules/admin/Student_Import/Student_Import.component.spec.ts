import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Student_ImportComponent } from './Student_Import.component';
describe('Student_ImportComponent', () => {
let component: Student_ImportComponent;
let fixture: ComponentFixture<Student_ImportComponent>;
beforeEach(async(() => {
TestBed.configureTestingModule({
declarations: [ Student_ImportComponent ]
})
.compileComponents();
}));
beforeEach(() => {
fixture = TestBed.createComponent(Student_ImportComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it('should create', () => {
expect(component).toBeTruthy();
});
});

